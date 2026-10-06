import { test } from '@playwright/test'

// Not an assertion suite: captures the key scenes into docs/screens for review. Run with SCREENS=1.
test.skip(!process.env.SCREENS, 'set SCREENS=1 to capture')

const scenes: [string, string, number][] = [
  ['3-work', '#work', 0], ['4-stack', '.feature-stack', 2.2], ['5-pan', '.pan', 1],
  ['6-index', '.index', 0], ['7-stats', '.stats', 0], ['8-about', '#about', 0], ['9-contact', '#contact', 0],
]

for (const device of [{ name: 'desktop', width: 1440, height: 900 }, { name: 'mobile', width: 390, height: 844 }]) {
  test(`scenes on ${device.name}`, async ({ page }) => {
    test.setTimeout(90000)
    await page.setViewportSize({ width: device.width, height: device.height })
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.goto('/')
    await page.waitForTimeout(1300)
    await page.screenshot({ path: `docs/screens/${device.name}-0-intro.png` })
    await page.waitForTimeout(3200)
    await page.screenshot({ path: `docs/screens/${device.name}-1-hero.png` })
    const opening = await page.locator('.opening').evaluate((element) => element.getBoundingClientRect().height - innerHeight)
    await page.evaluate((y) => window.scrollTo(0, y), Math.round(opening * 0.47))
    await page.waitForTimeout(1600)
    await page.screenshot({ path: `docs/screens/${device.name}-2-layers.png` })
    for (const [name, selector, screens] of scenes) {
      await page.evaluate(([sel, n]) => {
        const element = document.querySelector(String(sel))!
        window.scrollTo(0, element.getBoundingClientRect().top + scrollY + innerHeight * Number(n))
      }, [selector, screens])
      await page.waitForTimeout(1800)
      await page.screenshot({ path: `docs/screens/${device.name}-${name}.png` })
    }
    await page.evaluate(() => { localStorage.setItem('sb-theme', 'light'); sessionStorage.setItem('sb-intro', '1') })
    await page.goto('/')
    await page.waitForTimeout(2200)
    await page.screenshot({ path: `docs/screens/${device.name}-light-hero.png` })
  })
}
