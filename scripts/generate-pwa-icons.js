// Simple script to generate PNG versions of SVG icons for PWA
// This can be run manually with Node.js when needed

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

console.log('Generating PNG versions of SVG icons for PWA...');

// Get current directory in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if Inkscape is installed (common SVG to PNG converter)
const hasInkscape = () => {
  try {
    execSync('inkscape --version', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
};

// Check if ImageMagick is installed (alternative converter)
const hasImageMagick = () => {
  try {
    execSync('convert --version', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
};

// Paths
const publicDir = path.join(__dirname, '..', 'public');
const iconsDir = path.join(publicDir, 'icons');

// Create icons directory if it doesn't exist
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Icon sizes and files
const icons = [
  { src: 'icon-192x192.svg', dest: 'icon-192x192.png', size: 192 },
  { src: 'icon-512x512.svg', dest: 'icon-512x512.png', size: 512 },
];

// Convert SVG to PNG
const convertWithInkscape = (svgPath, pngPath, size) => {
  execSync(`inkscape --export-filename=${pngPath} --export-width=${size} --export-height=${size} ${svgPath}`);
};

const convertWithImageMagick = (svgPath, pngPath, size) => {
  execSync(`convert -background none -size ${size}x${size} ${svgPath} ${pngPath}`);
};

// Manual instructions if automatic conversion fails
const manualInstructions = () => {
  console.log('\nCould not find Inkscape or ImageMagick for automatic conversion.');
  console.log('Please manually convert the SVG icons to PNG using one of these methods:');
  console.log('\n1. Use an online converter like https://svgtopng.com/');
  console.log('2. Open the SVG files in a browser and take screenshots');
  console.log('3. Install Inkscape or ImageMagick and run this script again');
  console.log('\nPlace the resulting PNG files in the public/icons directory with these names:');
  icons.forEach(icon => {
    console.log(`- ${icon.dest} (${icon.size}x${icon.size})`);
  });
};

// Main conversion logic
const convertIcons = () => {
  const useInkscape = hasInkscape();
  const useImageMagick = !useInkscape && hasImageMagick();
  
  if (!useInkscape && !useImageMagick) {
    manualInstructions();
    return;
  }
  
  icons.forEach(icon => {
    const svgPath = path.join(iconsDir, icon.src);
    const pngPath = path.join(iconsDir, icon.dest);
    
    if (!fs.existsSync(svgPath)) {
      console.error(`Error: Source SVG file not found: ${svgPath}`);
      return;
    }
    
    try {
      if (useInkscape) {
        convertWithInkscape(svgPath, pngPath, icon.size);
      } else {
        convertWithImageMagick(svgPath, pngPath, icon.size);
      }
      console.log(`✓ Generated ${icon.dest}`);
    } catch (error) {
      console.error(`Error converting ${icon.src} to PNG:`, error.message);
    }
  });
  
  console.log('\nIcon generation complete!');
};

// Run the conversion
convertIcons();