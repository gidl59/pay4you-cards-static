// ---------------- DASHBOARD (index.html) ----------------

function generaCardLuxury() {
  // lo slug lo leggiamo ma NON è obbligatorio e NON lo usiamo nell'URL
  const slug = document.getElementById("slug")?.value.trim() || "";

  const nomeCompleto = document.getElementById("nomeCompleto").value.trim();
  const azienda = document.getElementById("azienda").value.trim();
  const posizione = document.getElementById("posizione").value.trim();
  const bio = document.getElementById("bio").value.trim();
  const telMobile = document.getElementById("telMobile").value.trim();
  const telUfficio = document.getElementById("telUfficio").value.trim();
  const emails = document.getElementById("emails").value.trim();
  const websites = document.getElementById("websites").value.trim();
  const indirizzo1 = document.getElementById("indirizzo1").value.trim();
  const indirizzo2 = document.getElementById("indirizzo2").value.trim();

  const facebook = document.getElementById("facebook").value.trim();
  const whatsapp = document.getElementById("whatsapp").value.trim();
  const fotoProfilo = document.getElementById("fotoProfilo").value.trim();

  const gallery1 = document.getElementById("gallery1").value.trim();
  const gallery2 = document.getElementById("gallery2").value.trim();
  const gallery3 = document.getElementById("gallery3").value.trim();
  const gallery4 = document.getElementById("gallery4").value.trim();

  const pdf1 = document.getElementById("pdf1").value.trim();
  const pdf2 = document.getElementById("pdf2").value.trim();
  const pdf3 = document.getElementById("pdf3").value.trim();
  const pdf4 = document.getElementById("pdf4").value.trim();

  // NESSUN controllo sullo slug: puoi lasciarlo vuoto
  const params = new URLSearchParams({
    nomeCompleto,
    azienda,
    posizione,
    bio,
    telMobile,
    telUfficio,
    emails,
    websites,
    indirizzo1,
    indirizzo2,
    facebook,
    whatsapp,
    fotoProfilo,
    gallery1,
    gallery2,
    gallery3,
    gallery4,
    pdf1,
    pdf2,
    pdf3,
    pdf4,
  });

  const url = `card.html?${params.toString()}`;
  window.location.href = url;
}

// ---------------- CARD (card.html) ----------------

document.addEventListener("DOMContentLoaded", () => {
  const nameEl = document.getElementById("cardName");
  if (!nameEl) return; // siamo su index

  const params = new URLSearchParams(window.locatio
