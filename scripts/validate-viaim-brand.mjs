import { createHash } from 'node:crypto'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const failures = []

const expected = {
  'signal-fog': '#F2F1F1',
  'blank-state': '#FFFFFF',
  'vision-orange': '#FF3B0F',
  'neutral-ash': '#666666',
  'silent-black': '#000000',
}

function check(condition, message) {
  if (!condition) failures.push(message)
}

const templateNames = ['template-editorial-card.html', 'template-swiss-card.html']
for (const name of templateNames) {
  const path = join(root, 'assets', name)
  check(existsSync(path), `missing ${name}`)
  if (!existsSync(path)) continue
  const source = readFileSync(path, 'utf8')
  check(/<html[^>]+data-theme="viaim"/.test(source), `${name}: default theme is not viaim`)
  check(source.includes('[data-theme="viaim"]'), `${name}: missing viaim theme block`)
  check(source.includes('[data-theme="viaim"] :is([data-accent],[data-theme])'), `${name}: nested theme overrides are not locked to viaim`)
  check(source.includes('VIAIM:BRAND:START'), `${name}: missing brand block marker`)
  check(source.includes('class="brand-logo') || source.includes('.brand-logo'), `${name}: missing logo treatment`)
  const declaredThemes = [...source.matchAll(/data-theme="([^"]+)"/g)].map((match) => match[1])
  check(declaredThemes.every((theme) => theme === 'viaim'), `${name}: contains an alternate theme definition`)
  for (const [token, value] of Object.entries(expected)) {
    check(source.includes(`--brand-${token}:${value};`), `${name}: missing --brand-${token}:${value}`)
  }
}

const recipePath = join(root, 'references', 'layout-recipes.md')
const recipes = existsSync(recipePath) ? readFileSync(recipePath, 'utf8') : ''
check(!recipes.includes('data-accent='), 'layout recipes still contain alternate accent overrides')

const screenshotPath = join(root, 'references', 'screenshot-treatment.md')
const screenshots = existsSync(screenshotPath) ? readFileSync(screenshotPath, 'utf8') : ''
check(!screenshots.includes('bg-asset-'), 'screenshot treatment still references alternate colored texture assets')
check(!existsSync(join(root, 'assets', 'screenshot-backgrounds')), 'alternate colored screenshot assets are still bundled')
check(!existsSync(join(root, ['COMMERCIAL', 'LICENSING.md'].join('_'))), 'unrelated licensing material is still bundled')
check(!existsSync(join(root, 'assets', ['magazine', 'bg', ['web', 'gl.js'].join('')].join('-'))), 'unused visual-effect material is still bundled')
check(existsSync(join(root, 'NOTICE.md')), 'missing single origin notice')

const textExt = /(?:\.md|\.html|\.js|\.mjs|\.yaml|\.json|\.gitignore)$/
const upstreamTerms = [
  ['gui', 'zang'].join(''),
  String.fromCodePoint(0x6b78, 0x85cf),
  String.fromCodePoint(0x5f52, 0x85cf),
  ['op', '7418'].join(''),
  ['data', 'gz'].join('-'),
  ['.', 'gz', '-'].join(''),
]
const forbidden = new RegExp(upstreamTerms.join('|'), 'i')
function scan(dir) {
  for (const entry of readdirSync(dir)) {
    if (['.git', 'node_modules', 'local-tests', 'output'].includes(entry)) continue
    const path = join(dir, entry)
    if (statSync(path).isDirectory()) scan(path)
    else if (textExt.test(entry) && entry !== 'NOTICE.md' && entry !== 'validate-viaim-brand.mjs') {
      check(!forbidden.test(readFileSync(path, 'utf8')), `${path.slice(root.length + 1)}: contains upstream branding outside NOTICE.md`)
    }
  }
}
scan(root)

const skillPath = join(root, 'SKILL.md')
const skill = existsSync(skillPath) ? readFileSync(skillPath, 'utf8') : ''
check(Boolean(skill), 'missing SKILL.md')
check(!skill.includes('[TODO'), 'SKILL.md contains TODO scaffold text')
check(skill.includes('data-theme="viaim"'), 'SKILL.md does not require the viaim theme')
for (const value of Object.values(expected)) {
  check(skill.includes(value), `SKILL.md missing brand value ${value}`)
}

const logoPath = join(root, 'assets', 'viaim-logo', 'viaim-logo-master.svg')
check(existsSync(logoPath), 'missing viaim logo master')
if (existsSync(logoPath)) {
  const hash = createHash('sha256').update(readFileSync(logoPath)).digest('hex')
  check(hash === 'b9fd8b1b3c5f70e32fd9c4744dfc9c88d8b93834bc2f353aeb599b68239f6da0', `logo hash mismatch: ${hash}`)
}

if (failures.length) {
  for (const failure of failures) console.error(`FAIL ${failure}`)
  process.exit(1)
}

console.log(`VIAIM_BRAND_OK palette=${Object.keys(expected).length} templates=${templateNames.length} logo=master origin=notice-only`)
