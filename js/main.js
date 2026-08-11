// Handles the "Submit Your Game" form: posts to Web3Forms via fetch so the
// visitor stays on-page and sees a themed success/error message.
// The form still works without JS (it falls back to a normal POST).

const form = document.getElementById("submit-form");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const status = document.getElementById("form-status");
    const btn = form.querySelector('button[type="submit"]');

    // Require the hCaptcha challenge before sending.
    const captcha = form.querySelector('textarea[name="h-captcha-response"]');
    if (!captcha || !captcha.value) {
      status.textContent = "✗ Please complete the CAPTCHA first.";
      status.className = "form-status err";
      return;
    }

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
        form.reset();
        form.style.display = "none";
        status.textContent = "✓ SUBMITTED! We'll be in touch soon. A copy is on its way to your email.";
        status.className = "form-status ok";
        status.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        throw new Error(json.message || "submit failed");
      }
    } catch (err) {
      status.textContent = "✗ Something went wrong. Please try again, or reach us on Discord.";
      status.className = "form-status err";
      btn.disabled = false;
      // Reset the CAPTCHA so the visitor can try again.
      if (window.hcaptcha) {
        try { window.hcaptcha.reset(); } catch (e) {}
      }
    }
  });
}
