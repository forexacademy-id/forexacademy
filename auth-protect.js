import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
import { doc, getDoc } from
  "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.replace("/forexacademy/login.html");
    return;
  }

  try {
    const snap = await getDoc(doc(db, "users", user.uid));
    if (!snap.exists()) return;

    const nama = snap.data().nama || "User";

    document.getElementById("menuNama")?.innerText = nama;
    document.getElementById("menuEmail")?.innerText = user.email;
    document.getElementById("avatar")?.innerText =
      nama.charAt(0).toUpperCase();

  } catch (err) {
    console.error(err);
  }
});
