import platform
import subprocess
import sys
import os

def run_command(command, shell=True):
    """Run a shell command and handle errors."""
    print(f"Running: {command}")
    result = subprocess.run(command, shell=shell)
    if result.returncode != 0:
        print(f"Error executing command: {command}", file=sys.stderr)
        sys.exit(result.returncode)

def setup_linux_user():
    """Add the user who invoked sudo to the docker group."""
    real_user = os.environ.get("SUDO_USER")
    if real_user:
        print(f"Adding user '{real_user}' to the docker group...")
        run_command(f"usermod -aG docker {real_user}")
        print(f"Success! User '{real_user}' added to the docker group.")
        print("Note: You will need to log out and log back in for this group change to take effect.")

def install_ubuntu_debian():
    print("Detected Ubuntu/Debian-based system.")
    
    # 1. Always update apt lists first so it knows about the packages
    run_command("apt-get update")
    
    # 2. Remove old packages safely (ignoring errors if they aren't installed)
    old_packages = ["docker.io", "docker-doc", "docker-compose", "docker-compose-v2", "podman-docker", "containerd", "runc"]
    run_command(f"apt-get remove -y {' '.join(old_packages)} || true")
    
    # 3. Continue with prerequisites
    run_command("apt-get install -y ca-certificates curl")
    run_command("install -m 0755 -d /etc/apt/keyrings")
    run_command("curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc")
    run_command("chmod a+r /etc/apt/keyrings/docker.asc")
    
    arch = subprocess.check_output("dpkg --print-architecture", shell=True).decode().strip()
    os_release = subprocess.check_output(". /etc/os-release && echo ${UBUNTU_CODENAME:-$VERSION_CODENAME}", shell=True).decode().strip()
    
    repo_line = f"deb [arch={arch} signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu {os_release} stable"
    with open("/etc/apt/sources.list.d/docker.list", "w") as f:
        f.write(repo_line + "\n")
    
    run_command("apt-get update")
    run_command("apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin")
    run_command("systemctl enable --now docker")
    setup_linux_user()

def install_fedora_rhel():
    print("Detected Fedora/RHEL-based system.")
    run_command("dnf -y remove docker docker-client docker-client-latest docker-common docker-latest docker-latest-logrotate docker-logrotate docker-engine")
    run_command("dnf -y install dnf-plugins-core")
    run_command("dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo")
    run_command("dnf install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin")
    run_command("systemctl enable --now docker")
    
    setup_linux_user()

def install_macos():
    print("Detected macOS.")
    if subprocess.run("which brew", shell=True, capture_output=True).returncode != 0:
        print("Homebrew is required to install Docker on macOS. Please install Homebrew first: https://brew.sh/", file=sys.stderr)
        sys.exit(1)
    
    print("Installing Docker Desktop via Homebrew Cask...")
    run_command("brew install --cask docker")
    print("Please open Docker Desktop from your Applications folder to complete initialization.")

def install_windows():
    print("Detected Windows.")
    if subprocess.run("winget --version", shell=True, capture_output=True).returncode != 0:
        print("winget is required to automate installation on Windows.", file=sys.stderr)
        sys.exit(1)
        
    print("Installing Docker Desktop via winget...")
    run_command("winget install -e --id Docker.DockerDesktop")
    print("Please restart your computer after installation completes to enable WSL 2 backend.")

def main():
    current_os = platform.system()

    if current_os == "Linux":
        if os.geteuid() != 0:
            print("Linux installations require root privileges. Please run with sudo.", file=sys.stderr)
            sys.exit(1)
            
        if os.path.exists("/etc/debian_version"):
            install_ubuntu_debian()
        elif os.path.exists("/etc/redhat-release"):
            install_fedora_rhel()
        else:
            print("Unsupported Linux distribution.", file=sys.stderr)
            sys.exit(1)
            
    elif current_os == "Darwin":
        install_macos()
    elif current_os == "Windows":
        install_windows()
    else:
        print(f"Unsupported operating system: {current_os}", file=sys.stderr)
        sys.exit(1)

    print("\nDocker installation routine finished successfully!")

if __name__ == "__main__":
    main()