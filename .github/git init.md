# Обычный

echo "# Real-estate-guide" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:Studnow/Real-estate-guide.git
git push -u origin main

## Существующий

git remote add origin git@github.com:Studnow/Real-estate-guide.git
git branch -M main
git push -u origin main

## Deploy on github pages

in static.yml change path to relative project folder path: './path-to-root'
in vite.config.js change outDir to project folder name 'folder-name'
