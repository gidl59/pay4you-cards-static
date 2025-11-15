// ------- Parte 1: usata su index.html --------
function generaCard() {
  const nome = document.getElementById("nome").value.trim();
  const cognome = document.getElementById("cognome").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const email = document.getElementById("email").value.trim();
  const indirizzo = document.getElementById("indirizzo").value.trim();

  const url =
    "card.html?" +
    "nome=" + encodeURIComponent(nome) +
    "&cognome=" + encodeURIComponent(cognome) +
    "&telefono=" + encodeURIComponent(telefono) +
    "&email=" + encodeURIComponent(email) +
    "&indirizzo=" + encodeURIComponent(indirizzo);

  window.location.href = url;
}

// ------- Parte 2: usata su card.html --------
document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);

  if (!document.getElementById("nomeCompleto")) {
    // siamo su index, non su card
    return;
  }

  const nome = params.get("nome") || "";
  const cognome = params.get("cognome") || "";
  const telefono = params.get("telefono") || "";
  const email = params.get("email") || "";
  const indirizzo = params.get("indirizzo") || "";

  document.getElementById("nomeCompleto").textContent =
    (nome + " " + cognome).trim();
  document.getElementById("emailPiccolo").textContent = email || "";
  document.getElementById("infoTel").textContent = telefono;
  document.getElementById("infoMail").textContent = email;
  document.getElementById("infoAddr").textContent = indirizzo;

  // Avatar: se un giorno vorrai passare una foto via URL (param "foto"),
  // la useremo, altrimenti resta il gradient elegante.
  const avatar = document.getElementById("avatarCircle");
  const foto = params.get("foto");
  if (foto) {
    avatar.style.backgroundImage = `url(${foto})`;
    avatar.style.backgroundSize = "cover";
    avatar.style.backgroundPosition = "center";
  }

  // QR che punta all'URL attuale della card
  const qrImg = document.getElementById("qrImage");
  if (qrImg) {
    const currentUrl = window.location.href;
    const qrUrl =
      "https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=" +
      encodeURIComponent(currentUrl);
    qrImg.src = qrUrl;
  }
});
