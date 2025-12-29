document.getElementById("closeBtn").addEventListener("click", () => {
  onExit();
});

async function onExit() {
  try {
    await window.go.pkg.Exit.ExitApp();
  } catch (e) {
    console.error("Exit failed:", e);
  }
}
