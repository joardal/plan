# Plan – Inspeksjon ukesplan

Statisk nettside (én `index.html`) for vaktplan / inspeksjon.

## Cloudflare Pages

Dette repoet er klargjort for Cloudflare Pages som et statisk nettsted uten byggesteg:

- **Framework preset:** None
- **Build command:** (tom – ingen)
- **Build output directory:** `/` (rot)
- `index.html` ligger i roten og serveres automatisk.

Hver push til `main` trigger automatisk ny deploy når GitHub-integrasjonen er koblet til i Cloudflare.

## Generer PDF

Knappen «Generer PDF» lager en ekte PDF-rapport i nettleseren (jsPDF + autotable under `vendor/`, ingen eksterne avhengigheter) og åpner den i en ny fane. Dersom nettleseren blokkerer nye faner, lastes PDF-en ned i stedet.

## Felles lagring (Cloudflare KV)

Planen kan deles mellom flere brukere via Cloudflare Pages Functions og KV:
1. Gå til **Storage & Databases** > **KV** i Cloudflare Dashboard og opprett et namespace (f.eks. `PLAN_KV`).
2. Gå til **Workers & Pages** > velg Pages-prosjektet > **Settings** > **Functions**.
3. Under **KV namespace bindings**, legg til:
   - **Variable name:** `PLAN_KV`
   - **KV namespace:** Velg `PLAN_KV` (eller det du kalte det).

