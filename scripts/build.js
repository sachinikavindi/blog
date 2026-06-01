const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const dist = path.join(root, 'dist');

const header = fs.readFileSync(path.join(root, 'includes', 'header.php'), 'utf8');
const footer = fs.readFileSync(path.join(root, 'includes', 'footer.php'), 'utf8');

const pages = ['index.php', 'article-1.php', 'article-2.php', 'article-3.php'];

function stripPhpIncludes(content) {
  return content
    .replace(/<\?php\s+include\s*\(\s*['"]includes\/header\.php['"]\s*\)\s*;\?>\s*/gi, '')
    .replace(/<\?php\s+include\s*\(\s*['"]includes\/footer\.php['"]\s*\)\s*;\?>\s*/gi, '')
    .trim();
}

function toHtmlLinks(content) {
  return content
    .replace(/href="index\.php"/g, 'href="/"')
    .replace(/href="article-1\.php"/g, 'href="/article-1.html"')
    .replace(/href="article-2\.php"/g, 'href="/article-2.html"')
    .replace(/href="article-3\.php"/g, 'href="/article-3.html"');
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

if (fs.existsSync(dist)) {
  fs.rmSync(dist, { recursive: true, force: true });
}
fs.mkdirSync(dist, { recursive: true });

for (const page of pages) {
  const body = stripPhpIncludes(fs.readFileSync(path.join(root, page), 'utf8'));
  const html = toHtmlLinks(`${header}\n${body}\n${footer}`);
  const outName = page === 'index.php' ? 'index.html' : page.replace('.php', '.html');
  fs.writeFileSync(path.join(dist, outName), html);
}

copyDir(path.join(root, 'assets'), path.join(dist, 'assets'));

console.log('Built static site in dist/');
