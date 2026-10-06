import { test, expect, type Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const skipIntro = (page: Page) => page.addInitScript(() => sessionStorage.setItem('sb-intro', '1'))

test('intro builds the logo on the first visit of a session, then the hero takes over', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.intro')).toBeVisible()
  await expect(page.locator('.intro-name')).toHaveText('Said Bayraktar', { timeout: 4000 })
  await expect(page.locator('.intro')).toHaveCount(0, { timeout: 6000 })
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Ekrandan')
  await page.reload()
  await expect(page.locator('.intro')).toBeHidden()
})

test('projects run from the biggest to the smallest', async ({ page }) => {
  await skipIntro(page)
  await page.goto('/')
  const names = await page.locator('.feature-name, .pan-name, .row-name').allTextContents()
  expect(names.slice(0, 4)).toEqual(['B2B Sipariş', 'Okka ERP', 'Vega WhatsApp', 'Neva QR'])
  expect(names).toHaveLength(19)
  expect(names.at(-1)).toBe('Reklam Paneli')
  const neva = page.locator('.feature').filter({ hasText: 'Neva QR' }).getByRole('link', { name: 'Siteyi aç' })
  await expect(neva).toHaveAttribute('href', 'https://nevaqr.com')
  await expect(neva).toHaveAttribute('target', '_blank')
})

test('a project without a website opens its case study page', async ({ page }) => {
  await skipIntro(page)
  await page.goto('/')
  await page.locator('.feature').filter({ hasText: 'B2B Sipariş' }).getByRole('link', { name: 'İncele' }).click()
  await expect(page).toHaveURL(/\/p\/b2b-order-system$/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('B2B Sipariş')
  await expect(page.getByText('Sıradaki iş')).toBeVisible()
  await page.getByRole('link', { name: 'Tüm işler' }).click()
  await expect(page).toHaveURL(/\/#work$/)
})

test('scrolling the opening walks through the four layers', async ({ page }) => {
  await skipIntro(page)
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')
  const height = await page.locator('.opening').evaluate((element) => element.getBoundingClientRect().height - innerHeight)
  for (const [ratio, name] of [[0.25, 'Arayüz'], [0.45, 'Sunucu'], [0.7, 'Veri'], [0.92, 'Altyapı']] as const) {
    await page.evaluate((y) => window.scrollTo(0, y), Math.round(height * ratio))
    await expect(page.locator('.layer-name')).toContainText(name)
  }
  await expect(page.locator('.hero-copy')).toHaveCSS('opacity', '0')
})

test('mobile menu opens, navigates and closes', async ({ page }) => {
  await skipIntro(page)
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Menü' }).click()
  const menu = page.getByRole('dialog', { name: 'Menü' })
  await expect(menu).toBeVisible()
  await menu.getByRole('link', { name: 'İletişim' }).click()
  await expect(menu).toBeHidden()
  await expect(page.getByRole('heading', { name: 'Konuşalım.' })).toBeInViewport({ timeout: 4000 })
})

test('contact offers mail, WhatsApp and resumes', async ({ page }) => {
  await skipIntro(page)
  await page.goto('/')
  const contact = page.locator('#contact')
  await expect(contact.getByRole('link', { name: 'saidbayraktar9@gmail.com' })).toHaveAttribute('href', 'mailto:saidbayraktar9@gmail.com')
  await expect(contact.locator('a[href^="https://wa.me/905350786101"]')).toHaveCount(1)
  await expect(contact.locator('a[download]')).toHaveCount(4)
  await expect(page.locator('#about')).toContainText('uzaktan destek')
  await expect(page.locator('#about')).toContainText('02/2026 - 10/2026')
})

test('theme and language persist, layouts fit and pass axe', async ({ page }) => {
  await skipIntro(page)
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.emulateMedia({ colorScheme: 'light' })
  await page.goto('/')
  await expect(page.locator('html')).not.toHaveClass(/dark/)
  await page.waitForTimeout(1500)
  for (const pass of ['light', 'dark']) {
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
    expect(result.violations.map((v) => ({ pass, id: v.id, nodes: v.nodes.map((n) => n.target) }))).toEqual([])
    if (pass === 'light') { await page.getByRole('button', { name: 'Temayı değiştir' }).click(); await page.waitForTimeout(600) }
  }
  await expect(page.locator('html')).toHaveClass(/dark/)
  await page.getByRole('button', { name: 'Switch to English' }).click()
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page.locator('html')).toHaveClass(/dark/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Screen')
  for (const width of [320, 390, 768, 1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 })
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Overflow at ' + width).toBeTruthy()
  }
  expect(errors).toEqual([])
})

test('reduced motion skips the intro', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.locator('.intro')).toBeHidden()
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
})

test('old project URLs redirect', async ({ request }) => {
  const live = await request.get('/projects/neva-qr', { maxRedirects: 0 })
  expect(live.status()).toBe(308)
  expect(live.headers().location).toMatch(/^https:\/\/nevaqr\.com\/?$/)
  const showcase = await request.get('/projects/galya-panel', { maxRedirects: 0 })
  expect(showcase.headers().location).toBe('/p/galya-panel')
})
