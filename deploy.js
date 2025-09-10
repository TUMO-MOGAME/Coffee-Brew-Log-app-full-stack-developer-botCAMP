
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting deployment process...');

try {
  console.log('Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  console.log('Running TypeScript check...');
  execSync('npx tsc -b', { stdio: 'inherit' });

  console.log('Building application...');
  execSync('npm run build', { stdio: 'inherit' });

  console.log('Build completed successfully!');
  
  const distPath = path.join(__dirname, 'dist');
  if (fs.existsSync(distPath)) {
    const files = fs.readdirSync(distPath);
    console.log('Generated files:');
    files.forEach(file => {
      const filePath = path.join(distPath, file);
      const stats = fs.statSync(filePath);
      if (stats.isFile()) {
        const sizeKB = (stats.size / 1024).toFixed(2);
        console.log(`   ${file} (${sizeKB} KB)`);
      }
    });
  }

  console.log('Ready for Vercel deployment!');
  console.log(' Run: vercel --prod');

} catch (error) {
  console.error('Deployment failed:', error.message);
  process.exit(1);
}
