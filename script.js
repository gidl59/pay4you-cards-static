// Lettura parametri
const params = new URLSearchParams(window.location.search);

const nome = params.get("nome") || "";
const cognome = params.get("cognome") || "";
const telefono = params.get("telefono") || "";
const email = params.get("email") || "";
const indirizzo = params.get("indirizzo") || "";

// Popolamento card
document.getElementById("nomeCompleto").textContent = `${nome} ${cognome}`;
document.getElementById("emailPiccolo").textContent = email || "";

document.getElementById("infoTel").textContent = telefono;
document.getElementById("infoMail").textContent = email;
document.getElementById("infoAddr").textContent = indirizzo;
