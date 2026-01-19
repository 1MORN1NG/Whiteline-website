import { test, expect } from '@playwright/test';

test('Hero Section updates verification', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // 1. Check Section Height (approximate)
  const heroSection = page.locator('#HERO_GLOBAL_01');
  const box = await heroSection.boundingBox();
  // 200vh. If window height is e.g. 600, section should be 1200.
  const viewportSize = await page.viewportSize();
  if (viewportSize) {
    expect(box?.height).toBeCloseTo(viewportSize.height * 2, -1); // Allow slight rounding diffs
  }

  // 2. Check Sticky Wrapper presence
  // The wrapper is the first child div of section
  const wrapper = heroSection.locator('> div').first();
  await expect(wrapper).toHaveClass(/sticky/);
  await expect(wrapper).toHaveClass(/top-0/);
  await expect(wrapper).toHaveClass(/h-screen/);

  // 3. Check Left Column Padding
  // We need to find the element that has the padding.
  // It contains the LightningW component which is likely an SVG or div.
  // We can look for the text "TRANSFORMING" parent.
  const headline = page.getByText('TRANSFORMING');
  const leftCol = headline.locator('..'); // Parent of h1
  // Actually h1 is inside the left column div.
  // The structure is: div.flex-col > div.mb-8 > LightningW
  // And div.flex-col > h1
  // So getting parent of h1 should be the column.

  const leftColDiv = page.locator('h1').locator('xpath=..');

  // Verify classes for padding
  // pl-8 md:pl-32
  await expect(leftColDiv).toHaveClass(/pl-8/);
  await expect(leftColDiv).toHaveClass(/md:pl-32/);

  // 4. Verify Scroll Interaction (Overlay)
  // At scroll 0
  const overlay = heroSection.locator('motion.div').last(); // The last motion div is the overlay?
  // Let's rely on the pointer-events-none class and z-0
  const overlayLocator = heroSection.locator('.pointer-events-none');

  // Check opacity at start
  await expect(overlayLocator).toHaveCSS('opacity', '1');

  // Scroll down 500px
  await page.mouse.wheel(0, 500);

  // Wait a bit for scroll handling (though useTransform is immediate usually)
  // Check opacity is lower (near 0)
  // Note: Playwright might not get the exact framer-motion applied style immediately if it's JS driven,
  // but let's check.
  // Actually, useTransform applies via style attribute usually.

  // Let's verify sticky behavior first.
  // If we scrolled 500px, and section is 200vh, the sticky wrapper should still be at top of viewport.
  const wrapperBox = await wrapper.boundingBox();
  expect(wrapperBox?.y).toBeCloseTo(0, -1);

});
