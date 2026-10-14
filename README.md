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
