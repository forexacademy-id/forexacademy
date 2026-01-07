import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
import { doc, getDoc } from
  "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.replace("../index.html");
    return;
  }

  try {
    const snap = await getDoc(doc(db, "users", user.uid));
    if (!snap.exists()) return;

    const data = snap.data();
    const nama = data.nama || "User";

    const namaUser = document.getElementById("namaUser");
    if (namaUser) namaUser.innerText = nama;

    const menuNama = document.getElementById("menuNama");
    const menuEmail = document.getElementById("menuEmail");
    const avatar = document.getElementById("avatar");

    if (menuNama) menuNama.innerText = nama;
    if (menuEmail) menuEmail.innerText = data.email || user.email;
    if (avatar) avatar.innerText = nama.charAt(0).toUpperCase();

  } catch (err) {
    console.error("Auth protect error:", err);
  }
});
