import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import tesseract from 'tesseract.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOWNLOADS_DIR = 'e:/RAMANA SAFETY NETS/downloads';
const PUBLIC_DIR = path.join(__dirname, '../public/assets');
const SERVICES_DEST = path.join(PUBLIC_DIR, 'services');

const SERVICE_FOLDER_MAPPINGS = {
  'nylon-safety-nets': ['Nylon Safety Nets'],
  'balcony-safety-nets': ['Balcony Safety Nets', 'balcony safety net'],
  'children-safety-nets': ['Children Safety Nets'],
  'anti-bird-nets': ['Anti Bird Nets', 'Agricultural Bird Nets', 'Warehouse Bird Protection Nets', 'Pond Bird Protection Nets'],
  'bird-protection-nets': ['Bird Protection Nets'],
  'pigeon-safety-nets': ['Pigeon Safety Nets'],
  'bird-spikes': ['Bird Spikes'],
  'monkey-safety-nets': ['Monkey Safety Nets', 'Animal Protection Nets'],
  'duct-area-safety-nets': ['Duct Area Safety Nets'],
  'inner-house-safety-nets': ['Inner House Safety Nets'],
  'steps-safety-nets': ['Staircase Safety Nets'],
  'coconut-safety-nets': ['Coconut Safety Nets'],
  'glass-protection-nets': ['Glass Protection Nets', 'Facade Protection Nets'],
  'building-covering-nets': ['Building Covering Nets', 'Scaffold Nets'],
  'construction-safety-nets': ['Construction Safety Nets', 'Construction Debris Nets', 'Industrial Safety Nets', 'Factory Safety Nets'],
  'cricket-practice-nets': ['Cricket Practice Nets'],
  'sports-safety-nets': ['Sports Safety Nets', 'Multi Sport Nets', 'Football Nets', 'Badminton Nets', 'Basketball Protection Nets', 'Tennis Court Nets', 'Volleyball Nets', 'Golf Practice Nets', 'Hockey Nets', 'Playground Safety Nets', 'Spectator Protection Nets'],
  'all-sports-nets': ['All Sports Nets', 'Sports Safety Nets', 'Multi Sport Nets', 'Cricket Practice Nets', 'Football Nets', 'Badminton Nets', 'Tennis Court Nets'],
  'mosquito-nets': ['Mosquito Nets', 'Door Mosquito Screens', 'Window Mosquito Screens', 'Pleated Mosquito Mesh', 'Magnetic Mosquito Screens', 'Sliding Mosquito Screens'],
  'swimming-pool-safety-nets': ['Swimming Pool Safety Nets', 'Pool Covers', 'Pool Safety Barriers'],
  'invisible-grills': ['Invisible Grills', 'Balcony Invisible Grills', 'SS304 Invisible Grills', 'SS316 Invisible Grills', 'Staircase Invisible Grills', 'Openable Invisible Grills']
};

const ALT_DESCRIPTIONS = {
  'nylon-safety-nets': 'High-tenacity nylon safety net installation with reinforced border rope in Bangalore',
  'balcony-safety-nets': 'UV-resistant balcony safety netting protecting high-rise apartment in Bangalore',
  'children-safety-nets': 'Toddler and child safety net installed on open apartment balcony',
  'anti-bird-nets': 'Transparent anti-bird netting preventing pigeons and birds on window ledge',
  'bird-protection-nets': 'Heavy-duty bird protection netting installed on residential facade',
  'pigeon-safety-nets': 'Pigeon exclusion safety netting on apartment balcony and AC duct',
  'bird-spikes': 'SS304 stainless steel bird spikes on polycarbonate base mounted on parapet ledge',
  'monkey-safety-nets': 'High-tensile monkey deterrence safety netting with steel reinforcement',
  'duct-area-safety-nets': 'Full-height duct area safety netting covering multi-storey building shaft',
  'inner-house-safety-nets': 'Interior atrium and staircase safety net for residential duplex',
  'steps-safety-nets': 'Staircase railing safety netting preventing falls in villa',
  'coconut-safety-nets': 'Coconut tree fall protection safety net protecting vehicles and pedestrians',
  'glass-protection-nets': 'High-rise glass facade and window safety containment net',
  'building-covering-nets': 'Green construction building covering and dust debris containment net',
  'construction-safety-nets': 'IS 11057 certified heavy-duty personnel fall-arrest construction safety net',
  'cricket-practice-nets': 'UV-treated nylon cricket practice net cage for club and terrace academy',
  'sports-safety-nets': 'Outdoor sports court perimeter enclosure netting in Bangalore',
  'all-sports-nets': 'Multi-sport high-impact ball containment netting for indoor and outdoor turf',
  'mosquito-nets': 'Custom sliding and pleated mosquito mesh screen for doors and windows',
  'swimming-pool-safety-nets': 'Reinforced swimming pool safety cover net with brass anchor system',
  'invisible-grills': 'Marine-grade SS316 high-tensile invisible grill with transparent nylon membrane'
};

// Strict forbidden keywords
const FORBIDDEN_WORDS = [
  'supplies', 'indiapro', 'durga', 'knr', 'devi', 'royal', 'garware', 'shutterstock', 'alamy', 'getty', 'indiamart',
  'justdial', 'tradeindia', 'dreamstime', 'stock', 'watermark', 'copyright', 'call', 'contact', 'phone', 'mobile',
  'tel:', 'mob:', 'ph:', 'dial', 'price', 'inr', 'rs.', 'safetynet', 'netshyderabad', 'netsbangalore', 'safety nets',
  'anti bird nets', 'balcony safety nets', 'pigeon nets', 'invisible grills', 'protect your', 'free survey', 'best price',
  'discount', 'order', 'book now', 'whatsapp', 'services', 'expert', 'installation', 'hyderabad', 'chennai', 'pune',
  'mumbai', 'delhi', 'iso certified', 'warranty', 'discount', 'offer', 'deal', 'quote', 'enquiry', 'enquire'
];

async function isImageClean(imagePath, worker) {
  try {
    const filename = path.basename(imagePath).toLowerCase();

    // Check filename
    if (/\b\d{6,}\b/.test(filename) || /www\./i.test(filename) || /\.com/i.test(filename) || /durga/i.test(filename) || /knr/i.test(filename) || /banner/i.test(filename) || /poster/i.test(filename) || /ad[-_]/i.test(filename) || /logo/i.test(filename)) {
      return { clean: false, reason: `Filename matched forbidden pattern: ${filename}` };
    }

    // Run OCR on full resolution & high contrast
    const imgBuffer = await sharp(imagePath)
      .resize(1000, 1000, { fit: 'inside' })
      .toBuffer();

    const ocrResult = await worker.recognize(imgBuffer);
    const text = (ocrResult?.data?.text || '').toLowerCase().trim();

    if (text.length === 0) {
      return { clean: true };
    }

    // Check for any phone numbers / 5+ consecutive digits
    const digitsOnly = text.replace(/[^0-9]/g, '');
    if (digitsOnly.length >= 5) {
      return { clean: false, reason: `OCR detected digits: "${digitsOnly}" in text: "${text.substring(0, 50)}"` };
    }

    // Check for domain/url indicators
    if (text.includes('.com') || text.includes('.in') || text.includes('.org') || text.includes('.net') || text.includes('www.') || text.includes('http') || text.includes('@')) {
      return { clean: false, reason: `OCR detected URL/Email: "${text.substring(0, 50)}"` };
    }

    // Check for forbidden keywords
    for (const word of FORBIDDEN_WORDS) {
      if (text.includes(word)) {
        return { clean: false, reason: `OCR detected keyword "${word}" in text: "${text.substring(0, 50)}"` };
      }
    }

    // If text has more than 8 alphanumeric characters, it's likely a caption or graphic overlay
    const alphaCount = text.replace(/[^a-z0-9]/gi, '').length;
    if (alphaCount > 10) {
      return { clean: false, reason: `OCR detected overlay text (${alphaCount} chars): "${text.substring(0, 50)}"` };
    }

    return { clean: true };
  } catch (err) {
    return { clean: false, reason: `Error reading image: ${err.message}` };
  }
}

async function auditAndClean() {
  console.log('=== STARTING STRICT ZERO-TEXT / ZERO-WATERMARK IMAGE AUDIT ===');
  const worker = await tesseract.createWorker('eng');

  const cleanManifest = {};

  for (const [slug, folders] of Object.entries(SERVICE_FOLDER_MAPPINGS)) {
    const destDir = path.join(SERVICES_DEST, slug);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    console.log(`\nScanning service [${slug}]...`);

    // Collect all candidates
    const allCandidates = [];
    for (const folder of folders) {
      const folderPath = path.join(DOWNLOADS_DIR, folder);
      if (!fs.existsSync(folderPath)) continue;

      const files = fs.readdirSync(folderPath);
      for (const file of files) {
        if (!/\.(jpe?g|png|webp|avif)$/i.test(file)) continue;
        const fullPath = path.join(folderPath, file);
        try {
          const stat = fs.statSync(fullPath);
          if (stat.size > 15000) {
            allCandidates.push({ fullPath, file, folder, size: stat.size });
          }
        } catch (e) {}
      }
    }

    // Sort by file size descending
    allCandidates.sort((a, b) => b.size - a.size);

    const verifiedClean = [];
    for (const item of allCandidates) {
      if (verifiedClean.length >= 8) break;

      const check = await isImageClean(item.fullPath, worker);
      if (check.clean) {
        verifiedClean.push(item);
        console.log(`  ✓ Accepted clean photo: ${item.file}`);
      } else {
        console.log(`  ✗ REJECTED: ${item.file} -> ${check.reason}`);
      }
    }

    console.log(`Service [${slug}]: Selected ${verifiedClean.length} 100% clean images.`);

    // Convert to webp
    const selectedImages = [];
    const baseAlt = ALT_DESCRIPTIONS[slug] || `${slug.replace(/-/g, ' ')} installation in Bangalore`;

    for (let i = 0; i < verifiedClean.length; i++) {
      const img = verifiedClean[i];
      const outName = `img-${i + 1}.webp`;
      const outThumbName = `thumb-${i + 1}.webp`;
      const outPath = path.join(destDir, outName);
      const outThumbPath = path.join(destDir, outThumbName);

      await sharp(img.fullPath)
        .resize(1200, 900, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 84 })
        .toFile(outPath);

      await sharp(img.fullPath)
        .resize(400, 300, { fit: 'cover' })
        .webp({ quality: 78 })
        .toFile(outThumbPath);

      selectedImages.push({
        url: `/assets/services/${slug}/${outName}`,
        thumbUrl: `/assets/services/${slug}/${outThumbName}`,
        alt: `${baseAlt} - View ${i + 1}`,
        originalFolder: img.folder,
        index: i + 1
      });
    }

    // Hero image
    let heroUrl = selectedImages[0]?.url || '';
    if (verifiedClean.length > 0) {
      const heroOut = path.join(destDir, 'hero.webp');
      await sharp(verifiedClean[0].fullPath)
        .resize(1400, 900, { fit: 'cover', position: 'center' })
        .webp({ quality: 85 })
        .toFile(heroOut);
      heroUrl = `/assets/services/${slug}/hero.webp`;
    }

    cleanManifest[slug] = {
      hero: heroUrl,
      heroAlt: `${baseAlt} - Professional installation by Ramana Safety Nets`,
      images: selectedImages
    };
  }

  await worker.terminate();

  // Save manifest
  const manifestPath = path.join(__dirname, '../src/data/serviceImagesManifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(cleanManifest, null, 2));
  console.log(`\nSaved 100% clean manifest to ${manifestPath}`);

  // Re-sync gallery and hero datasets
  await import('./update-data-with-images.js');
  console.log('✓ Re-synced gallery and hero datasets.');
}

auditAndClean().catch(console.error);
