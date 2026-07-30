import shutil
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
ENV_PATH = ROOT_DIR / ".env"
EXAMPLE_PATH = ROOT_DIR / ".env.example"


def create_environment_file() -> None:
    """
    Create .env from .env.example if it doesn't already exist.
    """

    if ENV_PATH.exists():
        print("✓ .env already exists")
        return

    if not EXAMPLE_PATH.exists():
        raise FileNotFoundError(
            f".env.example not found in {ROOT_DIR}"
        )

    shutil.copy(EXAMPLE_PATH, ENV_PATH)
    print("✓ Created .env from .env.example")