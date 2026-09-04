import urllib.request

def verify():
    url = "http://localhost:3002"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            html = response.read().decode('utf-8')
            print(f"Server Status: {response.status} OK")
            print(f"HTML Response Size: {len(html)} bytes")
            
            checks = [
                "Nishant",
                "Trivedi",
                "LaunchPilot AI",
                "Top 10 Runner-Up",
                "QBX Arena Hackathon 2026",
                "TodoPro",
                "Astrospacious",
                "Techdock Labs",
                "StaxTech",
                "Open Source Connect Global",
                "LeetCode",
                "355+",
                "1415",
                "Oracle Cloud Infrastructure",
                "HackerRank",
                "trivedinishant880@gmail.com",
                "linkedin.com/in/nishant-trivedi-363ba3249",
                "nt-emblem.png",
                "frame_000.webp"
            ]
            
            all_passed = True
            print("\n--- Integrity Verification ---")
            for item in checks:
                present = item in html
                if not present:
                    all_passed = False
                status = "PASS" if present else "FAIL"
                print(f"[{status}] \"{item}\"")
                
            print(f"\nFinal Site Verification: {'ALL CHECKS PASSED' if all_passed else 'SOME CHECKS FAILED'}")
    except Exception as e:
        print(f"Verification Error: {e}")

if __name__ == "__main__":
    verify()
