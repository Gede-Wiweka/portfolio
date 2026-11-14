# Gede Wiweka – Engineering Portfolio

One-page portfolio website. Static HTML, CSS and JavaScript, no build step. Live at https://gede-wiweka.github.io/portfolio/

## Structure
```
index.html            page structure and section text
css/style.css         all styling (layout, colours, responsive rules, animations)
js/data.js            content: skills, proficiency %, journey, case studies, CAD models, documentation
js/main.js            renders the content, lightbox, menu, scroll reveal, active nav, back-to-top, CV toast
assets/               photos, logos, drawings
cv/I_Gede_Putu_Wiweka_Legawa_CV.pdf   the CV visitors download
.nojekyll             tells GitHub Pages to serve files as-is
```

## Update the live site (browser only)
1. Open the repository and click **Add file → Upload files**.
2. Drag in **everything inside this folder**: `index.html`, `README.md`, `.nojekyll`, and the folders `css`, `js`, `cv`, `assets`. Same-name files are replaced; new ones are added.
3. Commit message: `Split into HTML/CSS/JS and add CV download`, then **Commit changes**.
4. Wait for the green tick under **Actions** (1–3 minutes), then reload the site with **Ctrl + F5** / **Cmd + Shift + R**.

`.nojekyll` starts with a dot, so Windows/macOS may hide it. If you cannot see it, skip it: the site still works without it.

## Replace the CV later
Upload a new PDF with exactly the same name, `cv/I_Gede_Putu_Wiweka_Legawa_CV.pdf`, and commit. All download buttons pick it up automatically.

## Edit content
Text in sections: `index.html`. Skills, % bars, projects, CAD and documentation lists: `js/data.js`. Colours and layout: `css/style.css`.
