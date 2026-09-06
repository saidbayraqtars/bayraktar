import { test, expect } from '@playwright/test'

test('handwriting cycles, pauses, resumes and keeps the chosen theme', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('html')).toHaveClass(/dark/)
  const writing = page.locator('.hero-script svg')
  await expect(writing).toHaveAttribute('aria-label', 'gerçek ürünlere')
  await expect(writing).toHaveAttribute('aria-label', 'web deneyimlerine', { timeout: 7500 })
  await page.getByRole('button', { name: 'Yazı animasyonunu duraklat' }).click()
  await expect(writing).toHaveAttribute('data-paused', 'true')
  const pausedWord = await writing.getAttribute('aria-label')
  // Advance time after pausing to prove it stops, without a wall-clock delay.
  await page.clock.install()
  await page.clock.fastForward(5000)
  await expect(writing).toHaveAttribute('aria-label', pausedWord!)
  await page.getByRole('button', { name: 'Yazı animasyonunu sürdür' }).click()
  await page.clock.fastForward(4300)
  await expect(writing).not.toHaveAttribute('aria-label', pausedWord!)
  await page.getByRole('button', { name: 'Temayı değiştir' }).click()
  await expect(page.locator('html')).not.toHaveClass(/dark/)
  await page.reload()
  await expect(page.locator('html')).not.toHaveClass(/dark/)
})

test('full-height panels overlap in short desktop and mobile viewports and reverse correctly', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 700 })
  await page.goto('/')
  const panel = page.locator('.project-stage').first()
  const scrollToPanel = async (index: number, offset: number) => {
    await page.locator('[data-scroll-marker]').nth(index).evaluate((marker, offset) => {
      window.scrollTo(0, marker.getBoundingClientRect().top + window.scrollY - offset)
    }, offset)
  }
  const scale = () => panel.evaluate((element) => new DOMMatrixReadOnly(getComputedStyle(element).transform).a)
  await expect(panel).toHaveCSS('position', 'sticky')
  await scrollToPanel(0, 102)
  await expect.poll(scale).toBe(1)
  await scrollToPanel(1, 350)
  await expect.poll(scale).toBeLessThan(0.99)
  await expect.poll(() => panel.evaluate((element) => element.getBoundingClientRect().top)).toBeLessThan(110)
  await page.screenshot({ path: 'docs/scroll-stack-desktop.png' })
  await scrollToPanel(1, 102)
  await expect.poll(scale).toBeLessThan(0.94)
  await scrollToPanel(0, 102)
  await expect.poll(scale).toBe(1)

  await page.setViewportSize({ width: 390, height: 844 })
  await expect(panel).toHaveCSS('position', 'sticky')
  await scrollToPanel(1, 422)
  await expect.poll(scale).toBeLessThan(0.99)
  await page.screenshot({ path: 'docs/scroll-stack-mobile.png' })
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390)
  for (const item of await page.locator('.project-stage').all()) {
    expect(await item.evaluate((element) => element.scrollHeight <= element.clientHeight)).toBeTruthy()
  }
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(panel).toHaveCSS('position', 'relative')
  await expect(panel).toHaveCSS('transform', 'none')
})
