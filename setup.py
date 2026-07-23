import os
import shutil
import subprocess
import time
import requests
import sys

# -----------------------------
# Create .env if missing
# -----------------------------
if not os.path.exists(".env"):
    shutil.copy(".env.example", ".env")
    print("✓ Created .env")

# -----------------------------
# Start Docker
# -----------------------------
print("Starting Docker containers...")

try:
    subprocess.run(
        ["docker", "compose", "up", "--build", "-d"],
        check=True
    )
except subprocess.CalledProcessError:
    print("\nFailed to start Docker.")
    print("Make sure Docker Desktop is running and required ports are free.")
    sys.exit(1)

# -----------------------------
# Wait for backend
# -----------------------------
print("Waiting for backend...")

backend_url = "http://localhost:9000/docs"

for _ in range(30):          # wait up to 60 seconds
    try:
        r = requests.get(backend_url, timeout=2)
        if r.status_code == 200:
            print("✓ Backend Ready")
            break
    except requests.RequestException:
        pass

    print("Backend starting...")
    time.sleep(2)
else:
    print("Backend failed to start.")
    sys.exit(1)

# -----------------------------
# Import demo products
# -----------------------------
print("Importing demo products...")

subprocess.run([
    "docker",
    "compose",
    "exec",
    "-T",
    "backend",
    "python",
    "/code/scripts/product_import.py"
])

# -----------------------------
# Verify products
# -----------------------------
try:
    products = requests.get(
        "http://localhost:9000/api/products/",
        timeout=5
    ).json()

    print(f"✓ {len(products)} products available")

except Exception:
    print("Couldn't verify imported products.")

print("\nSetup completed successfully.")