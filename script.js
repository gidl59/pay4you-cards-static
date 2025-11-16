/* ============================================
   CONFIG
============================================ */
const DASHBOARD_PASSWORD = "test";
const STORAGE_KEY = "pay4you_card_dati";

/* ============================================
   LOGIN
============================================ */
function loginDashboard() {
  const pwd = document.getElementById("pwd").value.trim();
  if (pwd === DASHBOARD_PASSWORD) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    caricaDatiSalvati();
  } else {
    alert("Password errata");
  }
}

function esciDashboard() {
  document.getElementById("dashboard").style.display = "none";
  document.getElementById("loginBox").style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("pwd");
  if (el) {
    el.addEventListener("keyup", e => {
      if (e.key === "Enter") loginDashboard();
    });
  }
});

/* ============================================
   SALVA / CARICA
============================================ */
function salvaDati() {
  const ids = [
    "slug","telMobile","nomeCompleto","telUfficio",
    "azienda","emails","posizione","websites","bio",
    "facebook","whatsapp","fotoProfilo",
    "gallery1","gallery2","gallery3","gallery4",
    "pdf1","pdf2","pdf3","pdf4",
    "indirizzo1","indirizzo2"
  ];

  const data = {};
  ids.forEach(id => {
    data[id] = document.getElementById(id).value.trim();
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  alert("Dati salvati!");
}

function caricaDatiSalvati() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  const data = JSON.parse(raw);

  Object.entries(data).forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el) el.value = value;
  });
}

/* ============================================
   GENERA CARD
============================================ */
function generaCardLuxury() {
  const params = new URLSearchParams();

  [
    "slug","telMobile","nomeCompleto","telUfficio",
    "azienda","emails","posizione","websites","bio",
    "facebook","whatsapp","fotoProfilo",
    "gallery1","gallery2","gallery3","gallery4",
    "pdf1","pdf2","pdf3","pdf4",
    "indirizzo1","indirizzo2"
  ].forEach(id => {
    const val = document.getElementById(id).value.trim();
    if (val) params.set(id, val);
  });

  window.location.href = "card.html?" + params.toString();
}

/* ============================================
   POPOLA CARD
============================================ */
document.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById("cardName")) return;

  const q = new URLSearchParams(window.location.search);

  const nomeCompleto = q.get("nomeCompleto") || "";
  const azienda = q.get("azienda") || "";
  const posizione = q.get("posizione") || "";
  const bio = q.get("bio") || "";
  const telMobile = q.get("telMobile") || "";
  const telUfficio = q.get("telUfficio") || "";

  const emails = (q.get("emails") || "").split(",").map(e=>e.trim()).filter(Boolean);
  const websites = (q.get("websites") || "").split(",").map(e=>e.trim()).filter(Boolean);

  const indirizzo1 = q.get("indirizzo1") || "";
  const indirizzo2 = q.get("indirizzo2") || "";

  const facebook = q.get("facebook") || "";
  const whatsapp = q.get("whatsapp") || "";
  const fotoProfilo = q.get("fotoProfilo") || "";

  const gallery = [
    q.get("gallery1"), q.get("gallery2"), q.get("gallery3"), q.get("gallery4")
  ].filter(Boolean);

  const pdfs = [
    q.get("pdf1"), q.get("pdf2"), q.get("pdf3"), q.get("pdf4")
  ].filter(Boolean);

  /* --- DATI BASE --- */
  document.getElementById("cardName").textContent = nomeCompleto;
  document.getElementById("cardCompany").textContent = azienda;
  document.getElementById("cardRole").textContent = posizione;
  document.getElementById("cardBio").textContent = bio;

  document.getElementById("addr1").textContent = indirizzo1;
  document.getElementById("addr2").textContent = indirizzo2;

  /* --- FOTO PROFILO --- */
  if (fotoProfilo) {
    const ph = document.getElementById("photoWrapper");
    ph.style.backgroundImage = `url(${fotoProfilo})`;
    ph.style.backgroundSize = "cover";
    ph.style.backgroundPosition = "center";
    document.getElementById("photoText").textContent = "";
  }

  /* --- TEL --- */
  const btnMobile = document.getElementById("btnMobile");
  const btnOffice = document.getElementById("btnOffice");
  if (telMobile) btnMobile.href = `tel:${telMobile}`;
  else btnMobile.classList.add("disabled");
  if (telUfficio) btnOffice.href = `tel:${telUfficio}`;
  else btnOffice.classList.add("disabled");

  /* --- EMAIL --- */
  const btnMail1 = document.getElementById("btnMail1");
  const btnMail2 = document.getElementById("btnMail2");
  if (emails[0]) {
    document.getElementById("mail1Label").textContent = emails[0];
    btnMail1.href = `mailto:${emails[0]}`;
  } else btnMail1.classList.add("disabled");

  if (emails[1]) {
    document.getElementById("mail2Label").textContent = emails[1];
    btnMail2.href = `mailto:${emails[1]}`;
  } else btnMail2.classList.add("disabled");

  /* --- WEB --- */
  const btnWeb = document.getElementById("btnWeb");
  if (websites[0]) {
    let w = websites[0];
    if (!/^https?:\/\//i.test(w)) w = "http://" + w;
    document.getElementById("webLabel").textContent = websites[0];
    btnWeb.href = w;
  } else btnWeb.classList.add("disabled");

  /* --- FACEBOOK --- */
  const btnFb = document.getElementById("btnFacebook");
  if (facebook) {
    let f = facebook;
    if (!/^https?:\/\//i.test(f)) f = "https://" + f;
    btnFb.href = f;
  } else btnFb.classList.add("disabled");

  /* --- WHATSAPP --- */
  const btnWa = document.getElementById("btnWhatsapp");
  if (whatsapp) {
    const n = whatsapp.replace(/\s+/g, "");
    btnWa.href = `https://wa.me/${n}`;
  } else btnWa.classList.add("disabled");

  /* --- GALLERY --- */
  const gc = document.getElementById("galleryContainer");
  gallery.forEach(url => {
    const img = document.createElement("img");
    img.src = url;
    gc.appendChild(img);
  });

  /* --- PDF --- */
  const pdfc = document.getElementById("pdfContainer");
  pdfs.forEach((url, i) => {
    const a = document.createElement("a");
    a.className = "btn contact-btn";
    a.href = url;
    a.target = "_blank";
    a.innerHTML = `📄 Documento ${i+1}`;
    pdfc.appendChild(a);
  });

  /* --- VCF --- */
  const btnVcf = document.getElementById("btnVcf");

  if (nomeCompleto || telMobile || emails[0]) {
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${nomeCompleto}`,
      azienda ? `ORG:${azienda}` : "",
      posizione ? `TITLE:${posizione}` : "",
      telMobile ? `TEL;TYPE=CELL:${telMobile}` : "",
      telUfficio ? `TEL;TYPE=WORK:${telUfficio}` : "",
      emails[0] ? `EMAIL;TYPE=WORK:${emails[0]}` : "",
      emails[1] ? `EMAIL;TYPE=HOME:${emails[1]}` : "",
      indirizzo1 ? `ADR;TYPE=WORK:;;${indirizzo1}` : "",
      indirizzo2 ? `ADR;TYPE=HOME:;;${indirizzo2}` : "",
      websites[0] ? `URL:${websites[0]}` : "",
      "END:VCARD"
    ].filter(Boolean).join("\n");

    const encoded = encodeURIComponent(vcard);
    const fname = nomeCompleto.replace(/\s+/g, "_") || "contatto";

    btnVcf.href = "data:text/vcard;charset=utf-8," + encoded;
    btnVcf.download = fname + ".vcf";
  } else {
    btnVcf.classList.add("disabled");
  }

  /* --- QR CODE --- */
  const qrImg = document.getElementById("qrImage");
  qrImg.src =
    "https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=" +
    encodeURIComponent(window.location.href);
});
