from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.set_viewport_size({"width": 1920, "height": 1080})

        # Navigate to the hero section
        page.goto("http://localhost:3000")
        page.wait_for_selector("#HERO_GLOBAL_01")

        # Screenshot top
        page.screenshot(path="hero_top.png")
        print("Captured hero_top.png")

        # Scroll down
        page.evaluate("window.scrollTo(0, 500)")
        page.wait_for_timeout(1000) # Wait for animations

        # Screenshot scrolled
        page.screenshot(path="hero_scrolled.png")
        print("Captured hero_scrolled.png")

        browser.close()

if __name__ == "__main__":
    run()
