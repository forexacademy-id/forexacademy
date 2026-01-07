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
  // AUTH CHECK & INJECT USER
  // =========================
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "../login.html";
      return;
    }

    const nama = user.displayName || "User";
    const email = user.email || "-";

    menuNama.innerText = nama;
    menuEmail.innerText = email;
    avatar.innerText = nama.charAt(0).toUpperCase();
  });

  // =========================
  // MENU TOGGLE
  // =========================
  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("hidden");
  });

  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
      menu.classList.add("hidden");
    }
  });

  // =========================
  // LOGOUT
  // =========================
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "../login.html";
  });

});
