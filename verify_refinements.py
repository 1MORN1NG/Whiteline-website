import time
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            page.goto("http://localhost:3000")
            page.wait_for_selector("#HERO_GLOBAL_01")

            # 1. Verify Section Height (approx 150vh)
            # 150vh means 1.5 * viewport height
            viewport_height = page.viewport_size['height']
            section_box = page.locator("#HERO_GLOBAL_01").bounding_box()
            print(f"Viewport height: {viewport_height}, Section height: {section_box['height']}")
            # Allow some tolerance
            if section_box['height'] < viewport_height * 1.4:
                print("FAILURE: Section height seems too small for 150vh")

            # 2. Verify Padding (pl-12 md:pl-40)
            # We can check computed style of the container.
            # The left column is the first child of the grid.
            left_col = page.locator("#HERO_GLOBAL_01 .grid > div").first
            padding_left = left_col.evaluate("el => getComputedStyle(el).paddingLeft")
            print(f"Left Column Padding: {padding_left}")

            # 3. Verify Stroke Width of LightningW
            stroke_width = page.locator("#lightning-w").get_attribute("stroke-width")
            print(f"LightningW stroke-width: {stroke_width}")
            if stroke_width != "8":
                print("FAILURE: Stroke width is not 8")

            # 4. Verify GlitchText on PRESENCE
            # Find the text "PRESENCE" and check if it has the GlitchText structure or behavior.
            # GlitchText renders a span. We added class `font-mono`.
            presence_locator = page.locator("span", has_text="PRESENCE")
            # There might be multiple spans (the initial text).
            # We specifically look for the one with font-mono.
            presence_el = page.locator("span.font-mono", has_text="PRESENCE").first
            if presence_el.count() > 0:
                print("SUCCESS: Found PRESENCE with font-mono (GlitchText)")
                classes = presence_el.get_attribute("class")
                print(f"PRESENCE classes: {classes}")
                if "min-w-" in classes and "inline-block" in classes:
                    print("SUCCESS: PRESENCE has min-width and inline-block")
                else:
                    print("FAILURE: PRESENCE missing layout classes")
            else:
                print("FAILURE: Could not find PRESENCE with font-mono")

            # 5. Verify Scroll Opacity Logic
            # Initially overlay opacity should be 1.
            overlay = page.locator("#HERO_GLOBAL_01 .absolute.inset-0.bg-black").last
            opacity_start = overlay.evaluate("el => getComputedStyle(el).opacity")
            print(f"Overlay Opacity at 0 scroll: {opacity_start}")

            # Scroll down
            page.mouse.wheel(0, 500)
            time.sleep(1) # wait for animation
            opacity_scrolled = overlay.evaluate("el => getComputedStyle(el).opacity")
            print(f"Overlay Opacity at 500 scroll: {opacity_scrolled}")

            if float(opacity_start) > 0.9 and float(opacity_scrolled) < 0.1:
                print("SUCCESS: Opacity transition seems correct (1 -> 0)")
            else:
                print("FAILURE: Opacity transition incorrect")

            # Take screenshots
            page.screenshot(path="refinement_top.png")
            page.mouse.wheel(0, 500) # Scroll more
            page.screenshot(path="refinement_scrolled.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
