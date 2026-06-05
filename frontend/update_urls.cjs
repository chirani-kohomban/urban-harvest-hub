const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), filelist)
      : filelist.concat(path.join(dir, file));
  });
  return filelist;
}

const files = walkSync('src').filter(f => f.endsWith('.jsx'));
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('http://localhost:5000')) {
    // Replace hardcoded localhost with the Vite environment variable
    content = content.replace(/http:\/\/localhost:5000/g, '${import.meta.env.VITE_API_URL}');
    
    // Fix syntax for template literals if it was a plain string
    // e.g., "http://localhost:5000/stats" -> `${import.meta.env.VITE_API_URL}/stats`
    content = content.replace(/"\$\{import\.meta\.env\.VITE_API_URL\}(.*?)"/g, '`\\${import.meta.env.VITE_API_URL}$1`');
    content = content.replace(/'\$\{import\.meta\.env\.VITE_API_URL\}(.*?)'/g, '`\\${import.meta.env.VITE_API_URL}$1`');

    fs.writeFileSync(file, content);
  }
});
console.log("URLs updated!");
