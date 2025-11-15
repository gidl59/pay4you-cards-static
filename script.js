// Prepara URL con parametri
function generaCard() {
  const nome = document.getElementById("nome").value.trim();
  const cognome = document.getElementById("cognome").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const email = document.getElementById("email").value.trim();
  const indirizzo = document.getElementById("indirizzo").value.trim();

  const url = `card.html?nome=${encodeURIComponent(nome)}&cognome=${encodeURIComponent(
    cognome
  )}&telefono=${encodeURIComponent(telefono)}&email=${encodeURIComponent(
    email
  )}&indirizzo=${encodeURIComponent(indirizzo)}`;

  window.location.href = url;
}

// Se siamo su card.html → mostra dati
const params = new URLSearchParams(window.location.search);

if (params.has("nome")) {
  document.getElementById("nomeCompleto").textContent =
    params.get("nome") + " " + params.get("cognome");

  document.getElementById("infoTel").textContent = params.get("telefono");
  document.getElementById("infoMail").textContent = params.get("email");
  document.getElementById("infoAddr").textContent = params.get("indirizzo");
}
