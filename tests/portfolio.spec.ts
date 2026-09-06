import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('home, typography, responsive layouts and accessible light/dark themes', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto('/')
  await expect(page.locator('html')).toHaveClass(/dark/)
  await page.getByRole('button', { name: 'Temayı değiştir' }).click()
  await expect(page.locator('.header-cv')).toHaveCSS('background-color', 'rgb(247, 249, 251)')
  await expect(page.locator('.hero-script svg')).toBeVisible()
  await expect(page.locator('.hero-script .handwriting-fill')).toHaveCSS('opacity', '1')
  await page.getByRole('button', { name: 'Yazı animasyonunu duraklat' }).click()
  await expect(page.locator('h1')).toHaveCount(1)
  await page.screenshot({ path: 'docs/desktop-preview.png' })
  await page.locator('#projects').scrollIntoViewIfNeeded()
  await page.screenshot({ path: 'docs/projects-preview.png' })
  const light = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
  expect(light.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) }))).toEqual([])
  await page.getByRole('button', { name: 'Temayı değiştir' }).click()
  await expect(page.locator('html')).toHaveClass(/dark/)
  await expect(page.locator('.language-button')).toHaveCSS('color', 'rgb(237, 242, 248)')
  await expect(page.locator('.header-cv')).toHaveCSS('background-color', 'rgb(17, 29, 41)')
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.screenshot({ path: 'docs/dark-preview.png' })
  const dark = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
  expect(dark.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) }))).toEqual([])
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 844 })
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Overflow at ' + width).toBeTruthy()
  }
  expect(errors).toEqual([])
})

test('mobile menu, persistent English, CV selection and download', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await expect(page.locator('.hero-script svg')).toBeVisible()
  await expect(page.locator('.hero-script .handwriting-fill')).toHaveCSS('opacity', '1')
  await page.getByRole('button', { name: 'Yazı animasyonunu duraklat' }).click()
  await page.screenshot({ path: 'docs/mobile-hero.png' })
  await page.getByRole('button', { name: 'Menüyü aç' }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.getByRole('dialog').getByRole('link', { name: 'CV indir' }).click()
  await expect(page.getByRole('dialog')).toBeHidden()
  await page.getByRole('radio', { name: 'IT destek', exact: true }).click()
  await page.getByRole('radiogroup', { name: 'CV dili' }).getByRole('radio', { name: 'EN', exact: true }).click()
  await expect(page.getByRole('link', { name: 'PDF indir', exact: true })).toHaveAttribute('href', '/cv/Said_Bayraktar_IT_Support_Specialist_EN.pdf')
  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('link', { name: 'PDF indir', exact: true }).click()
  expect((await downloadPromise).suggestedFilename()).toBe('Said_Bayraktar_IT_Support_Specialist_EN.pdf')
  await page.getByRole('button', { name: 'Switch to English' }).click()
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await page.reload()
  await expect(page.locator('h1')).toContainText('Turning good ideas')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await page.screenshot({ path: 'docs/english-mobile.png' })
})

test('project filters, detail navigation and return anchors', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('radio', { name: 'Masaüstü', exact: true }).click()
  await expect(page.locator('.archive-item')).toHaveCount(3)
  await page.locator('.archive-item').filter({ hasText: 'Vega Ticket' }).click()
  await expect(page).toHaveURL(/projects\/vega-ticket/)
  await expect(page.locator('h1')).toHaveText('Destek operasyonu, tek yerde.')
  await expect(page.getByRole('link', { name: 'Sürümler', exact: true })).toHaveAttribute('href', /vega-ticket-sistem-releases/)
  await page.getByRole('link', { name: 'Tüm projelere dön' }).click()
  await expect(page).toHaveURL(/#projects/)
  await expect(page.locator('#projects')).toBeInViewport()
})

test('all project routes, CVs, SEO and real GitHub response', async ({ request }) => {
  for (const slug of ['neva-qr','b2b-order-system','vega-ticket','seawatch','galya-panel','hizli-belge','damrenur-gunel','expert-bilisim','pdf-xlsx','teknoklinik-toner']) {
    const response = await request.get('/projects/' + slug)
    expect(response.status()).toBe(200)
    expect(await response.text()).toContain('rel="canonical"')
  }
  for (const role of ['FullStack_Developer','IT_Support_Specialist']) {
    for (const lang of ['TR','EN']) {
      const response = await request.get('/cv/Said_Bayraktar_' + role + '_' + lang + '.pdf')
      expect(response.status()).toBe(200)
      expect((await response.body()).subarray(0, 4).toString()).toBe('%PDF')
    }
  }
  for (const path of ['/sitemap.xml','/robots.txt','/opengraph-image','/icon.svg']) expect((await request.get(path)).status()).toBe(200)
  expect((await request.get('/projects/nonexistent')).status()).toBe(404)
  const github = await request.get('/api/github')
  expect(github.status()).toBe(200)
  expect((await github.json()).repos.length).toBeGreaterThan(0)
})

test('GitHub unavailable state and retry', async ({ page }) => {
  let count = 0
  await page.route('**/api/github', (route) => {
    count++
    return route.fulfill(count === 1 ? { status: 503, json: { error: 'unavailable' } } : { status: 200, json: { repos: [{ name: 'example-repo', url: 'https://github.com/saidbayraqtars/b2b-order-system', language: 'TypeScript', stars: 0 }] } })
  })
  await page.goto('/')
  await page.locator('.github-section').scrollIntoViewIfNeeded()
  await expect(page.getByText('GitHub listesi şu anda yüklenemedi.', { exact: false })).toBeVisible()
  await page.getByRole('button', { name: 'Tekrar dene' }).click()
  await expect(page.getByText('example-repo', { exact: true })).toBeVisible()
})

test('reduced motion, local-font fallback, brief validation and contact destinations', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.route('**/fonts/Kalam-Regular.ttf', (route) => route.abort())
  await page.goto('/')
  await expect(page.locator('.hero-script')).toContainText('gerçek ürünlere')
  await expect(page.locator('.project-stage').first()).toHaveCSS('position', 'relative')
  await page.locator('#contact').scrollIntoViewIfNeeded()
  await page.getByRole('button', { name: 'E-posta taslağı oluştur' }).click()
  expect(await page.locator('#contact-name').evaluate((e: HTMLInputElement) => e.validity.valid)).toBeFalsy()
  await page.getByLabel('Adınız', { exact: true }).fill('Test Kullanıcı')
  await page.getByLabel('E-posta adresiniz', { exact: true }).fill('test@example.com')
  await page.getByLabel('Projenizden bahsedin', { exact: true }).fill('Siparişlerimizi takip etmek için bir bayi portalı geliştirmek istiyoruz.')
  expect(await page.locator('.project-form').evaluate((e: HTMLFormElement) => e.checkValidity())).toBeTruthy()
  await expect(page.getByRole('link', { name: 'WhatsApp’ta konuşalım' })).toHaveAttribute('href', /https:\/\/wa.me\/905350786101\?text=/)
  await expect(page.locator('.big-email')).toHaveAttribute('href', 'mailto:saidbayraktar9@gmail.com')
  await page.getByRole('button', { name: 'Samsun dışında da çalışabilir miyiz?' }).click()
  await expect(page.getByText('Evet. İhtiyaç görüşmesi', { exact: false })).toBeVisible()
})

