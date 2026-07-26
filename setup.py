# import os
# import shutil
# import subprocess
# import time
# import requests
# import sys
# from pathlib import Path

# # -----------------------------
# # Configuration Paths for EBS
# # -----------------------------
# EBS_MOUNT_PATH = Path("/mnt/ebs-postgres-data")

# def get_ebs_device():
#     """Dynamically finds the attached secondary EBS volume (NVMe or traditional)"""
#     possible_devices = ["/dev/nvme1n1", "/dev/nvme2n1", "/dev/sdb", "/dev/sdc", "/dev/sdf", "/dev/xvdf"]
#     for dev in possible_devices:
#         if os.path.exists(dev):
#             return dev
#     return None

# DEVICE_NAME = get_ebs_device()

# def mount_ebs_volume_if_needed():
#     """Automatically checks and mounts the AWS EBS volume if a secondary drive or existing mount is found."""
#     # Automatically detect AWS if a valid EBS block device is present OR the mount path already exists
#     is_aws_environment = DEVICE_NAME is not None or os.path.exists("/mnt/ebs-postgres-data")
    
#     if not is_aws_environment:
#         print("✓ Local environment detected (or no secondary EBS drive found). Skipping cloud EBS mount, using Docker volumes.")
#         return True

#     print(f"AWS EC2 environment/EBS volume detected (Device: {DEVICE_NAME or 'Existing Mount'}). Checking storage mount status...")
    
#     # Ensure mount directory exists
#     if not EBS_MOUNT_PATH.exists():
#         try:
#             subprocess.run(["sudo", "mkdir", "-p", str(EBS_MOUNT_PATH)], check=True)
#         except subprocess.CalledProcessError as e:
#             print(f"Failed to create mount directory: {e}", file=sys.stderr)
#             return False

#     # Check if anything is currently mounted at that path
#     mount_check = subprocess.run(["mountpoint", "-q", str(EBS_MOUNT_PATH)])
    
#     if mount_check.returncode != 0:
#         if not DEVICE_NAME:
#             print("Error: EBS mount path is not mounted and no secondary device was found.", file=sys.stderr)
#             return False

#         print("EBS volume not mounted yet. Checking filesystem...")
        
#         # Check if the device has a filesystem
#         fs_check = subprocess.run(["sudo", "blkid", DEVICE_NAME], capture_output=True, text=True)
        
#         if not fs_check.stdout.strip():
#             print(f"Raw device detected at {DEVICE_NAME}. Formatting to ext4...")
#             try:
#                 subprocess.run(["sudo", "mkfs", "-t", "ext4", DEVICE_NAME], check=True)
#                 print("✓ Successfully formatted device to ext4.")
#             except subprocess.CalledProcessError as e:
#                 print(f"Error formatting EBS volume: {e}", file=sys.stderr)
#                 return False

#         print("Mounting EBS volume...")
#         try:
#             subprocess.run(["sudo", "mount", DEVICE_NAME, str(EBS_MOUNT_PATH)], check=True)
#             current_user = os.getenv("SUDO_USER", "ubuntu")
#             subprocess.run(["sudo", "chown", "-R", f"{current_user}:{current_user}", str(EBS_MOUNT_PATH)], check=True)
#             print("✓ EBS volume successfully mounted.")
#         except subprocess.CalledProcessError as e:
#             print(f"Error mounting EBS volume: {e}", file=sys.stderr)
#             return False
#     else:
#         print("✓ EBS volume is already mounted and ready.")
    
#     return True

# # -----------------------------
# # Step 0: Mount EBS Storage (if applicable)
# # -----------------------------
# if not mount_ebs_volume_if_needed():
#     print("EBS mounting step failed. Exiting.", file=sys.stderr)
#     sys.exit(1)

# # -----------------------------
# # Ensure Docker is Installed
# # -----------------------------
# def is_docker_ready():
#     if not shutil.which("docker"):
#         return False
#     result = subprocess.run(["docker", "compose", "version"], capture_output=True)
#     return result.returncode == 0

# if not is_docker_ready():
#     print("Docker or Docker Compose not found. Running external installation script...")
#     install_result = subprocess.run([sys.executable, "docker_install.py"])
#     if install_result.returncode != 0:
#         print("Docker installation failed.", file=sys.stderr)
#         sys.exit(1)
# else:
#     print("✓ Docker and Docker Compose are already installed.")

# # -----------------------------
# # Create .env if missing & Inject/Update Dynamic Volume Path
# # -----------------------------
# if not os.path.exists(".env"):
#     if os.path.exists(".env.example"):
#         shutil.copy(".env.example", ".env")
#         print("✓ Created .env from .env.example")
#     else:
#         print("Warning: .env.example not found, skipping .env creation.")

# is_aws_environment = DEVICE_NAME is not None or os.path.exists("/mnt/ebs-postgres-data")
# target_volume_path = str(EBS_MOUNT_PATH) if is_aws_environment else "postgres_data"

# # Read existing .env lines to update or append DB_VOLUME_PATH correctly
# env_lines = []
# db_path_found = False

# if os.path.exists(".env"):
#     with open(".env", "r", encoding="utf-8") as f:
#         for line in f:
#             if line.startswith("DB_VOLUME_PATH="):
#                 env_lines.append(f"DB_VOLUME_PATH={target_volume_path}\n")
#                 db_path_found = True
#             else:
#                 env_lines.append(line)

# # If it wasn't in the file at all, append it
# if not db_path_found:
#     env_lines.append(f"\n# Dynamic Database Volume Path\nDB_VOLUME_PATH={target_volume_path}\n")

# with open(".env", "w", encoding="utf-8") as f:
#     f.writelines(env_lines)

# print(f"✓ Configured DB_VOLUME_PATH={target_volume_path} in .env")

# # -----------------------------
# # Start Docker
# # -----------------------------
# print("Starting Docker containers...")
# try:
#     subprocess.run(
#         ["docker", "compose", "up", "--build", "-d"],
#         check=True
#     )
# except subprocess.CalledProcessError:
#     print("\nFailed to start Docker.")
#     print("Make sure Docker daemon / Docker Desktop is running and required ports are free.")
#     sys.exit(1)

# # -----------------------------
# # Wait for backend
# # -----------------------------
# print("Waiting for backend...")
# backend_url = "http://localhost:9000/docs"

# for _ in range(30):
#     try:
#         r = requests.get(backend_url, timeout=2)
#         if r.status_code == 200:
#             print("✓ Backend Ready")
#             break
#     except requests.RequestException:
#         pass

#     print("Backend starting...")
#     time.sleep(2)
# else:
#     print("Backend failed to start.")
#     sys.exit(1)

# # -----------------------------
# # Import demo products
# # -----------------------------
# print("Importing demo products...")
# subprocess.run([
#     "docker",
#     "compose",
#     "exec",
#     "-T",
#     "backend",
#     "python",
#     "/code/scripts/product_import.py"
# ])

# # -----------------------------
# # Verify products
# # -----------------------------
# try:
#     products = requests.get(
#         "http://localhost:9000/api/products/",
#         timeout=5
#     ).json()

#     print(f"✓ {len(products)} products available")

# except Exception:
#     print("Couldn't verify imported products.")

# print("\nSetup completed successfully.")







import shutil
import subprocess
import sys
import time
from pathlib import Path

import requests

from setup_helper.docker_install import install_docker
from setup_helper.ebs_mount import prepare_ebs_storage
from setup_helper.env_config import create_environment_file


ROOT_DIR = Path(__file__).resolve().parent
ENV_FILE = ROOT_DIR / ".env"


def is_docker_ready():
    """Check whether Docker and Docker Compose are available."""
    if not shutil.which("docker"):
        return False

    result = subprocess.run(
        ["docker", "compose", "version"],
        capture_output=True,
    )

    return result.returncode == 0


def update_env_variable(key: str, value: str):
    """
    Update or append a variable in the .env file.
    """

    lines = []

    with open(ENV_FILE, "r", encoding="utf-8") as f:
        lines = f.readlines()

    found = False
    updated = []

    for line in lines:
        if line.startswith(f"{key}="):
            updated.append(f"{key}={value}\n")
            found = True
        else:
            updated.append(line)

    if not found:
        if updated and updated[-1].strip():
            updated.append("\n")

        updated.append(f"{key}={value}\n")

    with open(ENV_FILE, "w", encoding="utf-8") as f:
        f.writelines(updated)

    print(f"✓ {key}={value}")


def wait_for_backend(
    url="http://localhost:9000/docs",
    retries=30,
    delay=2,
):
    """Wait until backend becomes available."""

    print("Waiting for backend service...")

    for _ in range(retries):

        try:
            response = requests.get(url, timeout=2)

            if response.status_code == 200:
                print("✓ Backend is ready.")
                return

        except requests.RequestException:
            pass

        time.sleep(delay)

    raise RuntimeError("Backend failed to start.")


def import_demo_products():
    """Import demo product data."""

    print("Importing demo products...")

    subprocess.run(
        [
            "docker",
            "compose",
            "exec",
            "-T",
            "backend",
            "python",
            "/code/scripts/product_import.py",
        ],
        check=True,
    )


def verify_products():
    """Verify that demo products were imported successfully."""

    try:
        response = requests.get(
            "http://localhost:9000/api/products/",
            timeout=5,
        )

        response.raise_for_status()

        products = response.json()

        if not products:
            raise RuntimeError("No products found in the database.")

        print(f"✓ Verified {len(products)} products.")

    except requests.RequestException as e:
        raise RuntimeError(
            f"Failed to connect to the backend: {e}"
        )

    except ValueError:
        raise RuntimeError(
            "Backend returned an invalid JSON response."
        )

    except Exception as e:
        raise RuntimeError(
            f"Product verification failed: {e}"
        )

def main():

    print("\n========== AnantBuy Setup ==========\n")

    # ------------------------------------------------------------------
    # Step 1 - Create .env
    # ------------------------------------------------------------------

    create_environment_file()

    # ------------------------------------------------------------------
    # Step 2 - Prepare storage
    # ------------------------------------------------------------------

    ebs_path = prepare_ebs_storage()

    if ebs_path:
        print("Configuring PostgreSQL storage permissions...")

        subprocess.run(
            ["sudo", "chown", "-R", "999:999", ebs_path],
            check=True,
        )

        subprocess.run(
            ["sudo", "chmod", "700", ebs_path],
            check=True,
        )

        db_volume_path = ebs_path
    else:
        db_volume_path = "postgres_data"

    update_env_variable("DB_VOLUME_PATH", db_volume_path)

    # ------------------------------------------------------------------
    # Step 3 - Ensure Docker exists
    # ------------------------------------------------------------------

    if not is_docker_ready():

        print("Docker not detected. Installing...")

        install_docker()

        if not is_docker_ready():
            raise RuntimeError(
                "Docker installation completed but Docker is still unavailable."
            )

    else:
        print("✓ Docker is already installed.")

    # ------------------------------------------------------------------
    # Step 4 - Start containers
    # ------------------------------------------------------------------

    print("Starting Docker containers...")

    subprocess.run(
        [
            "docker",
            "compose",
            "up",
            "--build",
            "-d",
        ],
        check=True,
    )

    # ------------------------------------------------------------------
    # Step 5 - Wait for backend
    # ------------------------------------------------------------------

    wait_for_backend()

    # ------------------------------------------------------------------
    # Step 6 - Import products
    # ------------------------------------------------------------------

    import_demo_products()

    # ------------------------------------------------------------------
    # Step 7 - Verify
    # ------------------------------------------------------------------

    verify_products()

    print("\n✓ Setup completed successfully.\n")


if __name__ == "__main__":

    try:
        main()

    except Exception as e:
        print(f"\nSetup failed: {e}", file=sys.stderr)
        sys.exit(1)