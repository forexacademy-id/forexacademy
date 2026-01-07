import { auth, db } from "./firebase.js";
import { onAuthStateChanged }
from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
import { doc, getDoc }
from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {

  if (!user) {
    window.location.href = "../login.html";
    return;
  }

  const snap = await getDoc(doc(db, "users", user.uid));
  if (!snap.exists()) return;

  const data = snap.data();

  // ===== PAGE CONTENT =====
  const namaUser = document.getElementById("namaUser");
  if (namaUser) namaUser.innerText = data.nama;

  // ===== MENU =====
  const menuNama = document.getElementById("menuNama");
  const menuEmail = document.getElementById("menuEmail");
  const avatar = document.getElementById("avatar");

  if (menuNama) menuNama.innerText = data.nama;
  if (menuEmail) menuEmail.innerText = data.email;
  if (avatar) avatar.innerText =
    data.nama.charAt(0).toUpperCase();

});

onAuthStateChanged(auth, async (user) => {

  console.log("AUTH USER:", user);

  if (!user) {
    console.log("BELUM LOGIN");
    window.location.href = "../login.html";
    return;
  }

  const snap = await getDoc(doc(db, "users", user.uid));
  console.log("FIRESTORE SNAP:", snap.exists());

  if (!snap.exists()) {
    console.log("DOC USERS TIDAK ADA");
    return;
  }

  const data = snap.data();
  console.log("DATA USER:", data);

  document.getElementById("menuNama").innerText = data.nama;
  document.getElementById("menuEmail").innerText = data.email;
  document.getElementById("avatar").innerText =
    data.nama.charAt(0).toUpperCase();
});
