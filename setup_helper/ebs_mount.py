import os
import subprocess
from pathlib import Path

EBS_MOUNT_PATH = Path("/mnt/ebs-postgres-data")
EBS_PGDATA_PATH = EBS_MOUNT_PATH / "pgdata"


def get_ebs_device() -> str | None:
    """Find the attached secondary EBS volume."""

    possible_devices = [
        "/dev/nvme1n1",
        "/dev/nvme2n1",
        "/dev/sdb",
        "/dev/sdc",
        "/dev/sdf",
        "/dev/xvdf",
    ]

    for device in possible_devices:
        if os.path.exists(device):
            return device

    return None


def prepare_ebs_storage() -> str | None:
    """
    Prepare AWS EBS storage.

    Returns:
        str  -> Host path to PostgreSQL data directory (AWS)
        None -> Local environment
    """

    ebs_device = get_ebs_device()

    if not ebs_device and not EBS_MOUNT_PATH.exists():
        print("✓ Local environment detected.")
        return None

    print(f"AWS environment detected (Device: {ebs_device or 'Existing Mount'}).")

    try:
        EBS_MOUNT_PATH.mkdir(parents=True, exist_ok=True)

        mount_check = subprocess.run(
            ["mountpoint", "-q", str(EBS_MOUNT_PATH)]
        )

        if mount_check.returncode != 0:

            if not ebs_device:
                raise RuntimeError(
                    "EBS mount directory exists but no EBS device was found."
                )

            print("Checking filesystem...")

            fs_check = subprocess.run(
                ["sudo", "blkid", ebs_device],
                capture_output=True,
                text=True,
                check=True,
            )

            if not fs_check.stdout.strip():
                print(f"Formatting {ebs_device} as ext4...")

                subprocess.run(
                    ["sudo", "mkfs", "-t", "ext4", ebs_device],
                    check=True,
                )

            print("Mounting EBS volume...")

            subprocess.run(
                [
                    "sudo",
                    "mount",
                    ebs_device,
                    str(EBS_MOUNT_PATH),
                ],
                check=True,
            )

            print("✓ EBS mounted successfully.")

        else:
            print("✓ EBS already mounted.")

        EBS_PGDATA_PATH.mkdir(parents=True, exist_ok=True)

        print(f"✓ PostgreSQL data directory ready: {EBS_PGDATA_PATH}")

        return str(EBS_PGDATA_PATH)

    except subprocess.CalledProcessError as e:
        raise RuntimeError(f"EBS preparation failed: {e}") from e