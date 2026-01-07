import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut }
from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
import { doc, getDoc }
from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {

  const menuBtn = document.getElementById("menuBtn");
  const menu = document.getElementById("menuDropdown");
  const logoutBtn = document.getElementById("logoutBtn");

  const menuNama = document.getElementById("menuNama");
  const menuEmail = document.getElementById("menuEmail");
  const avatar = document.getElementById("avatar");

  // =========================
  // AUTH CHECK + USER DATA
  // =========================
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      window.location.replace("login.html");
      return;
    }

    try {
      const snap = await getDoc(doc(db, "users", user.uid));

      const nama = snap.exists()
        ? snap.data().nama
        : "User";

      if (menuNama) menuNama.innerText = nama;
      if (menuEmail) menuEmail.innerText = user.email;
      if (avatar) avatar.innerText = nama.charAt(0).toUpperCase();

    } catch (err) {
      console.error("Load user error:", err);
    }
  });

  // =========================
  // MENU TOGGLE
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
      window.location.replace("login.html");
    });
  }

});
