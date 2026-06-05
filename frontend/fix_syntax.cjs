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
  if (content.includes('\\${import.meta.env.VITE_API_URL}')) {
    content = content.replace(/\\\$\{import\.meta\.env\.VITE_API_URL\}/g, '${import.meta.env.VITE_API_URL}');
    fs.writeFileSync(file, content);
  }
});
console.log("Fixed backslashes!");
