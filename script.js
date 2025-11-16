// ================== CONFIGURAZIONE ==================

const DASHBOARD_PASSWORD = "test";          // password login
const STORAGE_KEY = "pay4you_card_dati";   // chiave localStorage

// ================== LOGIN / LOGOUT ==================

function loginDashboard() {
  const loginBox = document.getElementById("loginBox");
  const dashboard = document.getElementById("dashboard");
  const input = document.getElementById("pwd");

  if (!loginBox || !dashboard || !input) return;

  const value = (input.value || "").trim();

  if (value === DASHBOARD_PASSWORD) {
    loginBox.style.display = "none";
    dashboard.style.display = "block";
    input.value = "";
    caricaDatiSalvati();
  } else {
    alert("Password errata");
  }
}

function esciDashboard() {
  const loginBox = document.getElementById("loginBox");
  const dashboard = document.getElementById("dashboard");
  if (!loginBox || !dashboard) return;
  dashboard.style.display = "none";
  loginBox.style.display = "block";
}

// tasto Invio sulla password
document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("pwd");
  if (input) {
    input.addEventListener("keyup", function (e) {
      if (e.key === "Enter") {
        loginDashboard();
      }
    });
  }
});

// ================== SALVA / CARICA (localStorage) ==================

function salvaDati() {
  const ids = [
    "slug", "telMobile", "nomeCompleto", "telUfficio",
    "azienda", "emails", "posizione", "websites", "bio",
    "facebook", "whatsapp", "fotoProfilo",
    "gallery1", "gallery2", "gallery3", "gallery4",
    "pdf1", "pdf2", "pdf3", "pdf4",
    "indirizzo1", "indirizzo2"
  ];

  const data = {};
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) data[id] = el.value;
  });

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    alert("Dati salvati nel browser.");
  } catch (e) {
    console.error(e);
    alert("Impossibile salvare i dati (controlla lo spazio del browser).");
  }
}

function caricaDatiSalvati() {
  let raw = null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    return;
  }
  if (!raw) return;

  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    return;
  }

  Object.entries(data).forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el && typeof value === "string") {
      el.value = value;
    }
  });
}

// ================== GENERAZIONE CARD ==================

function generaCardLuxury() {
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

// ================== POPOLAMENTO CARD ==================

document.addEventListener("DOMContentLoaded", () => {
  const nameEl = document.getElementById("cardName");
  if (!nameEl) return; // siamo sulla dashboard

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

  const facebook = params.get("facebook") || "";
  const whatsapp = params.get("whatsapp") || "";
  const fotoProfilo = params.get("fotoProfilo") || "";

  const galleryUrls = [
    params.get("gallery1") || "",
    params.get("gallery2") || "",
    params.get("gallery3") || "",
    params.get("gallery4") || "",
  ].filter(Boolean);

  const pdfUrls = [
    params.get("pdf1") || "",
    params.get("pdf2") || "",
    params.get("pdf3") || "",
    params.get("pdf4") || "",
  ].filter(Boolean);

  // Testi base
  nameEl.textContent = nomeCompleto;
  document.getElementById("cardCompany").textContent = azienda;
  document.getElementById("cardRole").textContent = posizione;
  document.getElementById("cardBio").textContent = bio;

  document.getElementById("addr1").textContent = indirizzo1;
  document.getElementById("addr2").textContent = indirizzo2;

  // Foto profilo
  const photoWrapper = document.getElementById("photoWrapper");
  const photoText = document.getElementById("photoText");
  if (fotoProfilo) {
    photoWrapper.style.backgroundImage = `url(${fotoProfilo})`;
    photoWrapper.style.backgroundSize = "cover";
    photoWrapper.style.backgroundPosition = "center";
    photoText.textContent = "";
  }

  // Pulsanti telefono
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

  // Email
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

  // Web
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

  // Facebook
  const btnFacebook = document.getElementById("btnFacebook");
  if (facebook) {
    let fbUrl = facebook;
    if (!/^https?:\/\//i.test(fbUrl)) {
      fbUrl = "https://" + fbUrl;
    }
    btnFacebook.href = fbUrl;
  } else {
    btnFacebook.classList.add("disabled");
  }

  // WhatsApp
  const btnWhatsapp = document.getElementById("btnWhatsapp");
  if (whatsapp) {
    const clean = whatsapp.replace(/\s+/g, "");
    btnWhatsapp.href = `https://wa.me/${clean}`;
  } else {
    btnWhatsapp.classList.add("disabled");
  }

  // Galleria
  const galleryContainer = document.getElementById("galleryContainer");
  if (galleryUrls.length === 0) {
    galleryContainer.innerHTML =
      '<p style="font-size:13px;opacity:0.6;">Nessuna immagine caricata.</p>';
  } else {
    galleryUrls.forEach(url => {
      const img = document.createElement("img");
      img.src = url;
      galleryContainer.appendChild(img);
    });
  }

  // PDF
  const pdfContainer = document.getElementById("pdfContainer");
  if (pdfUrls.length === 0) {
    pdfContainer.innerHTML =
      '<div class="btn contact-btn disabled"><span class="icon">📄</span><span>Nessun documento</span></div>';
  } else {
    pdfUrls.forEach((url, idx) => {
      const a = document.createElement("a");
      a.className = "btn contact-btn";
      a.href = url;
      a.target = "_blank";
      a.innerHTML = `<span class="icon">📄</span><span>Apri documento ${idx + 1}</span>`;
      pdfContainer.appendChild(a);
    });
  }

  // VCF (vCard) - Salva contatto
  const btnVcf = document.getElementById("btnVcf");
  if (btnVcf && (nomeCompleto || telMobile || emails[0])) {
    const vcardLines = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${nomeCompleto}`,
      azienda ? `ORG:${azienda}` : "",
      posizione ? `TITLE:${posizione}` : "",
      telMobile ? `TEL;TYPE=CELL:${telMobile}` : "",
      telUfficio ? `TEL;TYPE=WORK:${telUfficio}` : "",
      emails[0] ? `EMAIL;TYPE=INTERNET,WORK:${emails[0]}` : "",
      emails[1] ? `EMAIL;TYPE=INTERNET,HOME:${emails[1]}` : "",
      indirizzo1 ? `ADR;TYPE=WORK:;;${indirizzo1}` : "",
      indirizzo2 ? `ADR;TYPE=HOME:;;${indirizzo2}` : "",
      websites[0] ? `URL:${websites[0]}` : "",
      "END:VCARD"
    ].filter(Boolean);

    const vcardText = vcardLines.join("\n");
    const encoded = encodeURIComponent(vcardText);
    const filenameSafe = (nomeCompleto || "contatto").replace(/\s+/g, "_");

    btnVcf.href = `data:text/vcard;charset=utf-8,${encoded}`;
    btnVcf.download = `${filenameSafe}.vcf`;
  } else if (btnVcf) {
    btnVcf.classList.add("disabled");
  }

  // QR CODE della card (URL corrente)
  const qrImg = document.getElementById("qrImage");
  if (qrImg) {
    const currentUrl = window.location.href;
    qrImg.src =
      "https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=" +
      encodeURIComponent(currentUrl);
  }
});
