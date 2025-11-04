from playwright.sync_api import sync_playwright
import time
import sys

frontend_url = "http://127.0.0.1:8000/index.html"
expected_text = "1"
max_retries = 5
retry_delay = 2

try:
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Log browser console messages
        page.on("console", lambda msg: print(f"[Browser Console] {msg.type}: {msg.text}"))

        # Navigate to frontend
        page.goto(frontend_url, timeout=10000)

        success = False
        for attempt in range(max_retries):
            try:
                page.wait_for_selector("#user-count-display", timeout=3000)
                user_count = page.inner_text("#user-count-display").strip()
                if user_count == expected_text:
                    print("--- PLAYWRIGHT_SUCCESS ---")
                    print(f" Frontend Check Passed: User count is {user_count}.")
                    success = True
                    break
                else:
                    print(f"Attempt {attempt+1}: Found '{{user_count}}', expected '{{expected_text}}'. Retrying...")
            except Exception as e:
                print(f"Attempt {attempt+1}: Selector not ready or wait timed out. Error: {{e}}")
            time.sleep(retry_delay)

        if not success:
            print(" Frontend Check Failed: Could not confirm 'User count = 1' after retries.")
            # Print page content for debugging network/JS issues
            print("Final HTML Snapshot:")
            print(page.content())
            sys.exit(1)

        browser.close()
        sys.exit(0)

except Exception as e:
    print(f" Verification Failed (Runtime Error): {e}")
    sys.exit(1)
