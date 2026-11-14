# Gede Wiweka – Engineering Portfolio

One-page portfolio website. Static HTML/CSS/JS, no build step.

## First deployment (GitHub Pages, browser only)
1. Sign in to GitHub and click **New repository**. Name it `gede-wiweka-portfolio`, set it to **Public**, tick nothing else, then **Create repository**.
2. On the empty repo page click **uploading an existing file**.
3. Unzip `Gede-Wiweka-Portfolio-site.zip` on your computer, open the `Gede-Wiweka-Portfolio` folder, select **everything inside it** (`index.html`, `README.md`, `assets` folder) and drag it into the upload area. `index.html` must sit at the top level of the repo, not inside a sub-folder.
4. Write a commit message such as `Initial portfolio` and click **Commit changes**.
5. Go to **Settings → Pages**. Under **Build and deployment** choose **Source: Deploy from a branch**, **Branch: main**, folder **/ (root)**, then **Save**.
6. Wait 1–3 minutes and refresh the Pages screen. Your site is live at `https://<your-username>.github.io/gede-wiweka-portfolio/`.

## Updating an existing deployment
1. Open the repository and click **Add file → Upload files**.
2. Drag in the new `index.html` and the whole `assets` folder. Files with the same name are replaced; new files (such as the `sw-*.png` software logos) are added.
3. Commit. GitHub Pages redeploys automatically in 1–3 minutes (progress shows under the **Actions** tab).
4. Open the site and press **Ctrl + F5** (Windows) or **Cmd + Shift + R** (Mac) to bypass the browser cache.

## Alternative: command line
```bash
git clone https://github.com/<your-username>/gede-wiweka-portfolio.git
cd gede-wiweka-portfolio
# copy the new index.html and assets/ into this folder, then:
git add .
git commit -m "Update portfolio: software logos and proficiency bars"
git push
```

## Check after each deploy
- Skills section shows 10 software logos with % bars and the Languages row.
- CAD gallery tags show the Inventor / SolidWorks logos.
- Open the site on your phone: no sideways scrolling, menu button works.
- Click a documentation image: the lightbox opens and closes.

## Editing
All text lives in `index.html`. Skill percentages are the `prof` array; skills chips are `skills`; case studies, CAD models, journey and documentation entries are the arrays `cases`, `cad`, `journey`, `docs` near the bottom. Add an image to `assets/` and reference it by file name.
