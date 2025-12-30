document.addEventListener("DOMContentLoaded", async () => {
  // Desired window size
  const width = 350;
  const height = 400;

  try {
    // Get primary display info
    const screens = await window.runtime.ScreenGetAll(); // all screens
    const primary = screens.find(s => s.Primary) || screens[0];

    // Get work area (avoids taskbar/dock)
    const workArea = primary.WorkArea;

    // Calculate bottom-right
    const x = workArea.X + workArea.Width - width;
    const y = workArea.Y + workArea.Height - height;

    // Set window size
    await window.runtime.WindowSetSize(width, height);

    // Set window position bottom-right
    await window.runtime.WindowSetPosition(x, y);

    console.log(`Window positioned at bottom-right: (${x}, ${y})`);
  } catch (err) {
    console.error("Failed to position window:", err);
  }
});

const connectBtn = document.getElementById("connectBtn");
const licenseInput = document.getElementById("licenseInput");
const statusText = document.getElementById("statusText");
const errorBox = document.getElementById("errorBox");
const btnText = document.getElementById("btnText");
const btnSpinner = document.getElementById("btnSpinner");

let isLoading = false;

function showError(message) {
  errorBox.textContent = message;
  errorBox.classList.remove("d-none");
}

function clearError() {
  errorBox.classList.add("d-none");
  errorBox.textContent = "";
}

function setLoading(state) {
  isLoading = state;
  connectBtn.disabled = state;
  btnSpinner.classList.toggle("d-none", !state);
  btnText.textContent = state ? "CONNECTING..." : "CONNECT";
}

function setStatus(state) {
  if (state === "connected") {
    statusText.textContent = "CONNECTED";
    statusText.classList.remove("text-danger");
    statusText.classList.add("text-success");
  } else {
    statusText.textContent = "DISCONNECTED";
    statusText.classList.add("text-danger");
    statusText.classList.remove("text-success");
  }
}

connectBtn.addEventListener("click", () => {
  if (isLoading) return;

  clearError();

  const licenseKey = licenseInput.value.trim();

  if (!licenseKey) {
    showError("License key is required.");
    return;
  }

  if (licenseKey.length < 10) {
    showError("Invalid license key format.");
    return;
  }

  setLoading(true);

  // Simulated API request (replace with real fetch later)
  setTimeout(() => {
    setLoading(false);

    // Example logic
    if (licenseKey.startsWith("IW-")) {
      setStatus("connected");
    } else {
      showError("License verification failed.");
      setStatus("disconnected");
    }
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 2000);
  }, 1800);
});

// Accessibility: Enter key submits
licenseInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    connectBtn.click();
  }
});
