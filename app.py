import os
from flask import Flask, render_template, request, redirect, url_for, session, send_file, abort
from werkzeug.utils import secure_filename
import qrcode
import io
import json

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "PAY4YOU-DEFAULT-SECRET")

DATA_FILE = "agents.json"

UPLOAD_FOLDER = "static/uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


#######################################################
# Utility
#######################################################

def load_agents():
    if not os.path.exists(DATA_FILE):
        return {}
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def save_agents(agents):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(agents, f, indent=4, ensure_ascii=False)


#######################################################
# Login Amministratore
#######################################################

ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "test")


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        pwd = request.form.get("password")
        if pwd == ADMIN_PASSWORD:
            session["admin"] = True
            return redirect(url_for("admin_home"))
        return render_template("login.html", error="Password errata")
    return render_template("login.html")


@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("login"))


#######################################################
# Dashboard Amministratore
#######################################################

@app.route("/admin")
def admin_home():
    if not session.get("admin"):
        return redirect(url_for("login"))
    agents = load_agents()
    return render_template("admin_list.html", agents=agents.values())


@app.route("/admin/new", methods=["GET", "POST"])
def admin_new():
    if not session.get("admin"):
        return redirect(url_for("login"))

    agents = load_agents()

    if request.method == "POST":
        slug = request.form.get("slug").strip().lower()
        if slug in agents:
            return render_template("admin_edit.html", agent=None, error="Slug già esistente")

        agent = read_agent_form()
        agents[slug] = agent
        save_agents(agents)
        return redirect(url_for("admin_home"))

    return render_template("admin_edit.html", agent=None)


@app.route("/admin/edit/<slug>", methods=["GET", "POST"])
def admin_edit(slug):
    if not session.get("admin"):
        return redirect(url_for("login"))

    agents = load_agents()

    if slug not in agents:
        return "Agente non trovato", 404

    if request.method == "POST":
        agent = read_agent_form()
        agents[slug] = agent
        save_agents(agents)
        return redirect(url_for("admin_home"))

    return render_template("admin_edit.html", agent=agents[slug])


@app.route("/admin/delete/<slug>", methods=["POST"])
def admin_delete(slug):
    if not session.get("admin"):
        return redirect(url_for("login"))

    agents = load_agents()
    if slug in agents:
        del agents[slug]
        save_agents(agents)

    return redirect(url_for("admin_home"))


#######################################################
# Raccolta dati form agente + Upload file
#######################################################

def save_upload(fieldname):
    f = request.files.get(fieldname)
    if not f or f.filename == "":
        return None
    filename = secure_filename(f.filename)
    path = os.path.join(UPLOAD_FOLDER, filename)
    f.save(path)
    return path.replace("static/", "")


def read_agent_form():
    return {
        "slug": request.form.get("slug"),
        "name": request.form.get("name"),
        "surname": request.form.get("surname"),
        "company": request.form.get("company"),
        "role": request.form.get("role"),
        "bio": request.form.get("bio"),

        "phone_mobile": request.form.get("phone_mobile"),
        "phone_office": request.form.get("phone_office"),
        "emails": request.form.get("emails"),
        "websites": request.form.get("websites"),

        "facebook": request.form.get("facebook"),
        "instagram": request.form.get("instagram"),
        "linkedin": request.form.get("linkedin"),
        "tiktok": request.form.get("tiktok"),
        "telegram": request.form.get("telegram"),
        "whatsapp": request.form.get("whatsapp"),

        "pec": request.form.get("pec"),
        "piva": request.form.get("piva"),
        "sdi": request.form.get("sdi"),
        "addresses": request.form.get("addresses"),

        "photo": save_upload("photo") or request.form.get("photo_old"),
        "pdf1": save_upload("pdf1") or request.form.get("pdf1_old"),
        "pdf2": save_upload("pdf2") or request.form.get("pdf2_old"),

        "gallery": []
    }


#######################################################
# Card pubblica
#######################################################

@app.route("/<slug>")
def public_card(slug):
    agents = load_agents()
    if slug not in agents:
        return render_template("404.html"), 404
    return render_template("card.html", agent=agents[slug])


#######################################################
# QR CODE PNG
#######################################################

@app.route("/qr/<slug>.png")
def qr_png(slug):
    base_url = os.environ.get("BASE_URL", "https://pay4you-cards-luxury.onrender.com")
    url = f"{base_url}/{slug}"

    img = qrcode.make(url)
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    buf.seek(0)
    return send_file(buf, mimetype="image/png")


#######################################################
# vCard
#######################################################

@app.route("/vcard/<slug>.vcf")
def vcard(slug):
    agents = load_agents()
    if slug not in agents:
        return abort(404)

    a = agents[slug]

    v = f"""BEGIN:VCARD
VERSION:3.0
N:{a['surname']};{a['name']};;;
FN:{a['name']} {a['surname']}
ORG:{a['company']}
TITLE:{a['role']}
TEL;TYPE=CELL:{a['phone_mobile']}
TEL;TYPE=WORK:{a['phone_office']}
EMAIL:{a['emails']}
URL:{a['websites']}
END:VCARD
"""

    buf = io.BytesIO(v.encode("utf-8"))
    return send_file(buf, mimetype="text/vcard", as_attachment=True, download_name=f"{slug}.vcf")


#######################################################
# Health check (Render)
#######################################################

@app.route("/health")
def health():
    return "OK"


#######################################################

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)
