import { auth } from "./firebase.js";
import { onAuthStateChanged, signOut }
from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {

  const menuBtn = document.getElementById("menuBtn");
  const menu = document.getElementById("menuDropdown");
  const logoutBtn = document.getElementById("logoutBtn");

  const menuNama = document.getElementById("menuNama");
  const menuEmail = document.getElementById("menuEmail");
  const avatar = document.getElementById("avatar");

  // =========================
  // AUTH CHECK (AMAN)
  // =========================
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.replace("../login.html");
      return;
    }

    const nama = user.displayName || "User";
    const email = user.email || user.providerData?.[0]?.email || "-";

    if (menuNama) menuNama.innerText = nama;
    if (menuEmail) menuEmail.innerText = email;
    if (avatar) avatar.innerText = nama.charAt(0).toUpperCase();
  });

  // =========================
  // MENU TOGGLE (SAFE)
  // =========================
  if (menuBtn && menu) {
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      menu.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
        menu.classList.add("hidden");
      }
    });
  }

  // =========================
  // LOGOUT
  // =========================
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      await signOut(auth);
      window.location.replace("../login.html");
    });
  }

});
