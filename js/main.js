// Handles the "Submit Your Game" form: posts to Web3Forms via fetch so the
// visitor stays on-page and sees a themed success/error message.
// The form still works without JS (it falls back to a normal POST).

const form = document.getElementById("submit-form");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const status = document.getElementById("form-status");
    const btn = form.querySelector('button[type="submit"]');

    status.textContent = "SENDING…";
    status.className = "form-status sending";
    btn.disabled = true;

    try {
      const data = new FormData(form);
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();

      if (json.success) {
        // Swap the form out for the success screen.
        document.getElementById("form-intro")?.remove();
        document.getElementById("form-card")?.remove();
        const success = document.getElementById("submit-success");
        if (success) success.hidden = false;
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        throw new Error(json.message || "submit failed");
      }
    } catch (err) {
      status.textContent = "✗ Something went wrong. Please try again, or reach us on Discord.";
      status.className = "form-status err";
      btn.disabled = false;
    }
  });
}
