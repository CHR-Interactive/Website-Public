/* Site-wide extras: a greeting for devs who open the console, and a
   Konami-code easter egg (pixel confetti + an achievement toast). */
(() => {
  "use strict";

  // --- Console greeting for the curious ---
  console.log(
    "%c CHR INTERACTIVE ",
    "background:#0f0f1b;color:#00e5a0;font-family:monospace;font-size:22px;" +
    "font-weight:bold;padding:8px 6px;text-shadow:2px 2px 0 #ff5ca8;"
  );
  console.log("%cPeeking under the hood? We like you already. 👾", "color:#ffd23f;font-size:13px;");
  console.log(
    "%cMaking a game? Pitch us → https://chrinteractive.com/submit.html   ·   Discord → https://discord.gg/XTZpM9Cbn4",
    "color:#9a9ac0;font-size:12px;"
  );

  // --- Konami code: ↑ ↑ ↓ ↓ ← → ← → B A ---
  const CODE = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
  let pos = 0;

  window.addEventListener("keydown", (e) => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (key === CODE[pos]) {
      pos++;
      if (pos === CODE.length) { pos = 0; unlock(); }
    } else {
      pos = key === CODE[0] ? 1 : 0;
    }
  });

  function unlock() {
    if (document.querySelector(".konami-toast")) return; // don't stack
    dropConfetti();
    showToast();
  }

  function showToast() {
    const t = document.createElement("div");
    t.className = "konami-toast";
    t.innerHTML = "🏆 ACHIEVEMENT UNLOCKED<span>KONAMI CODE</span>";
    document.body.appendChild(t);
    requestAnimationFrame(() => t.classList.add("show"));
    setTimeout(() => {
      t.classList.remove("show");
      setTimeout(() => t.remove(), 400);
    }, 3200);
  }

  function dropConfetti() {
    const colors = ["#00e5a0", "#ff5ca8", "#ffd23f", "#e8e8f0"];
    for (let i = 0; i < 80; i++) {
      const p = document.createElement("div");
      p.className = "konami-pixel";
      const size = 6 + Math.floor(Math.random() * 10);
      p.style.cssText =
        `left:${Math.random() * 100}vw;width:${size}px;height:${size}px;` +
        `background:${colors[Math.floor(Math.random() * colors.length)]};` +
        `animation-delay:${Math.random() * 0.6}s;` +
        `animation-duration:${1.6 + Math.random() * 1.4}s;`;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 3400);
    }
  }
})();
