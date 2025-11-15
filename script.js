// ---------------- DASHBOARD (index.html) ----------------

function generaCardLuxury() {
  const slug = document.getElementById("slug").value.trim();
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

  if (!slug) {
    alert("Inserisci uno slug per l'URL (es. giuseppe-di-lisio).");
    return;
  }

  const params = new URLSearchParams({
    slug,
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
  });

  // card.html con tutti i dati in query string
  const url = `card.html?${params.toString()}`;
  window.location.href = url;
}

// ---------------- CARD (card.html) ----------------

document.addEventListener("DOMContentLoaded", () => {
  const nameEl = document.getElementById("cardName");
  if (!nameEl) return; // siamo su index, non fare nulla

  const params = new URLSearchParams(window.location.search);

  const nomeCompleto = params.get("nomeCompleto") || "";
  const azienda = params.get("azienda") || "";
  const posizione = params.get("posizione") || "";
  const bio = params.get("bio") || "";
  const telMobile = params.get("telMobile") || "";
  const telUfficio = params.get("telUfficio") || "";
  const emails = (params.get("emails") || "").split(",").map(e => e.trim()).filter(Boolean);
  const websites = (params.get("websites") || "").split(",").map(w => w.trim()).filter(Boolean);
  const indirizzo1 = params.get("indirizzo1") || "";
  const indirizzo2 = params.get("indirizzo2") || "";

  // Popola testo
  nameEl.textContent = nomeCompleto;
  document.getElementById("cardCompany").textContent = azienda;
  document.getElementById("cardRole").textContent = posizione;
  document.getElementById("cardBio").textContent = bio;

  document.getElementById("addr1").textContent = indirizzo1;
  document.getElementById("addr2").textContent = indirizzo2;

  // Pulsanti contatto
  const btnMobile = document.getElementById("btnMobile");
  if (telMobile) {
    btnMobile.href = `tel:${telMobile}`;
  } else {
    btnMobile.classList.add("disabled");
  }

  const btnOffice = document.getElementById("btnOffice");
  if (telUfficio) {
    btnOffice.href = `tel:${telUfficio}`;
  } else {
    btnOffice.classList.add("disabled");
  }

  const btnMail1 = document.getElementById("btnMail1");
  const btnMail2 = document.getElementById("btnMail2");
  const mail1Label = document.getElementById("mail1Label");
  const mail2Label = document.getElementById("mail2Label");

  if (emails[0]) {
    mail1Label.textContent = emails[0];
    btnMail1.href = `mailto:${emails[0]}`;
  } else {
    btnMail1.classList.add("disabled");
    mail1Label.textContent = "Email principale";
  }

  if (emails[1]) {
    mail2Label.textContent = emails[1];
    btnMail2.href = `mailto:${emails[1]}`;
  } else {
    btnMail2.classList.add("disabled");
    mail2Label.textContent = "Email secondaria";
  }

  const btnWeb = document.getElementById("btnWeb");
  const webLabel = document.getElementById("webLabel");
  if (websites[0]) {
    let url = websites[0];
    if (!/^https?:\/\//i.test(url)) {
      url = "http://" + url;
    }
    webLabel.textContent = websites[0];
    btnWeb.href = url;
  } else {
    btnWeb.classList.add("disabled");
    webLabel.textContent = "Sito web";
  }
});
