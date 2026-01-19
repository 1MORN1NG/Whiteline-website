from playwright.sync_api import sync_playwright

def verify_field_marketing():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            # We assume the app is running on localhost:3000
            page.goto("http://localhost:3000")

            # Wait for the section to be attached to DOM
            section_selector = "#FIELD_MKT_PRECISION"
            page.wait_for_selector(section_selector)

            # Scroll to the section to trigger animations
            section_element = page.locator(section_selector)
            section_element.scroll_into_view_if_needed()
            page.wait_for_timeout(1000) # Wait for animations/tickers

            # 1. Verify Structure & Layout
            # Check grid existence
            grid = page.locator(f"{section_selector} .grid")
            if grid.count() > 0:
                print("SUCCESS: Bento Grid found.")
                classes = grid.get_attribute("class")
                if "grid-cols-1" in classes and "md:grid-cols-12" in classes:
                    print("SUCCESS: Grid has correct responsive columns.")
                else:
                    print(f"FAILURE: Grid classes incorrect: {classes}")
            else:
                print("FAILURE: Bento Grid not found.")

            # 2. Verify Text Content
            # Headline
            headline = page.locator("h2", has_text="PRECISION WARFARE")
            if headline.count() > 0:
                print("SUCCESS: Headline found.")
                # Verify skew
                if "skew-x-[-6deg]" in headline.get_attribute("class"):
                    print("SUCCESS: Headline is skewed.")
                else:
                    print("FAILURE: Headline missing skew class.")
            else:
                 print("FAILURE: Headline 'PRECISION WARFARE' not found.")

            # Stats
            if page.locator("text=200+").count() > 0:
                print("SUCCESS: Stat '200+' found.")
            else:
                print("FAILURE: Stat '200+' not found.")

            # 3. Verify Map & Animations
            # Check for map SVG
            if page.locator(f"{section_selector} svg").count() > 0:
                 print("SUCCESS: Map SVG found.")

            # Check for pings
            pings = page.locator(f"{section_selector} .animate-ping")
            # They appear over time, wait a bit if needed, but 1s wait earlier should suffice for at least one
            if pings.count() > 0:
                 print("SUCCESS: Map pings detected.")
            else:
                 print("WARNING: No map pings detected (might be timing issue).")

            # 4. Screenshots
            page.screenshot(path="field_marketing_desktop.png")

            # Mobile View
            page.set_viewport_size({"width": 375, "height": 812})
            page.reload()
            page.locator(section_selector).scroll_into_view_if_needed()
            page.wait_for_timeout(1000)
            page.screenshot(path="field_marketing_mobile.png")
            print("Screenshots saved.")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_field_marketing()
