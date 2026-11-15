# Gede Wiweka – Engineering Portfolio

One-page portfolio website. Static HTML, CSS and JavaScript, no build step. Live at https://gede-wiweka.github.io/portfolio/

## Structure
```
index.html   page structure: hero, KPI bento, about, workflow, work, skills, journey, documentation, contact
styles.css   light/dark themes, bento grid, glass navigation, drawer, lightbox, responsive rules
script.js    content data (case studies, skills, journey, CAD, documentation, glossary) and all interactions:
             theme toggle, count-up KPIs, case filters, insight drawer with SVG charts, zoom/pan lightbox
assets/      photos, logos, drawings
cv/I_Gede_Putu_Wiweka_Legawa_CV.pdf   the CV visitors download
.nojekyll    tells GitHub Pages to serve files as-is
```

To change text or numbers in a case study, edit the `CASES` list near the top of `script.js`.
