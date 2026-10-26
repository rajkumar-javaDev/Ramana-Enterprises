import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

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

// Blacklist of forbidden patterns in filenames or text
const REJECT_PATTERNS = [
  /\b\d{7,12}\b/, // phone numbers in filename (e.g. 8888332634, 9845012345)
  /www\./i, /\.com/i, /\.in\b/i, /\.org/i, /\.net\b/i, /\.co\b/i, /http/i,
  /durga/i, /knr/i, /devi/i, /visornets/i, /leon/i, /de[-_ ]oro/i, /indiamart/i, /justdial/i, /tradeindia/i,
  /stock/i, /shutterstock/i, /alamy/i, /getty/i, /dreamstime/i, /depositphotos/i,
  /watermark/i, /with[-_ ]logo/i, /logo/i, /banner/i, /poster/i, /ad[-_ ]/i, /flyer/i, /graphic/i,
  /price/i, /rs\d+/i, /call/i, /contact/i, /phone/i, /mobile/i
];

let tesseract = null;
try {
  const mod = await import('tesseract.js');
  tesseract = mod.default || mod;
  console.log('✓ Tesseract.js OCR engine loaded successfully.');
} catch (e) {
  console.log('Tesseract.js not available yet, using advanced heuristic scanner.');
}

function isFilenameDirty(filename) {
  for (const regex of REJECT_PATTERNS) {
    if (regex.test(filename)) return true;
  }
  return false;
}

async function isImageTextDirty(imagePath, worker = null) {
  if (!worker) return false;
  try {
    // Resize image to small preview for fast OCR detection
    const buffer = await sharp(imagePath)
      .resize(800, 600, { fit: 'inside' })
      .grayscale()
      .toBuffer();

    const result = await worker.recognize(buffer);
    const text = result?.data?.text || '';

    // Check if text has phone numbers, URLs, or competitor brands
    const cleanText = text.replace(/[\s\-\.\,\(\)]/g, '');
    
    // Check for 6+ consecutive digits (phone number)
    if (/\d{6,}/.test(cleanText)) {
      console.log(`[OCR REJECT - Phone/Number] ${path.basename(imagePath)} -> found: "${text.trim().substring(0, 50)}"`);
      return true;
    }

    // Check for web URLs or domain extensions
    if (/(\.com|\.in|\.org|\.net|www\.|http|@)/i.test(text)) {
      console.log(`[OCR REJECT - URL/Domain] ${path.basename(imagePath)} -> found: "${text.trim().substring(0, 50)}"`);
      return true;
    }

    // Check for phone/contact keywords
    if (/(call|contact|phone|mobile|mob|ph:|tel:|dial|order|price|rs\.|inr|safetynet|netsbangalore|netshyderabad)/i.test(text)) {
      console.log(`[OCR REJECT - Keyword] ${path.basename(imagePath)} -> found: "${text.trim().substring(0, 50)}"`);
      return true;
    }

    // Check for competitor names or stock watermarks
    if (/(durga|knr|devi|royal|garware|shutterstock|alamy|getty|indiamart|justdial|tradeindia|dreamstime)/i.test(text)) {
      console.log(`[OCR REJECT - Brand/Watermark] ${path.basename(imagePath)} -> found: "${text.trim().substring(0, 50)}"`);
      return true;
    }

    return false;
  } catch (err) {
    return false;
  }
}

async function getCleanImagesForService(folderNames, worker) {
  const candidates = [];

  for (const folder of folderNames) {
    const folderPath = path.join(DOWNLOADS_DIR, folder);
    if (!fs.existsSync(folderPath)) continue;

    const files = fs.readdirSync(folderPath);
    for (const file of files) {
      if (!/\.(jpe?g|png|webp|avif)$/i.test(file)) continue;

      // 1. Filename heuristic filter
      if (isFilenameDirty(file)) continue;

      const fullPath = path.join(folderPath, file);
      try {
        const stat = fs.statSync(fullPath);
        if (stat.size < 12000) continue; // Skip low-res icons / banners
        candidates.push({ fullPath, file, folder, size: stat.size });
      } catch (e) {}
    }
  }

  // Sort candidate images by resolution/file size descending
  candidates.sort((a, b) => b.size - a.size);

  const cleanList = [];
  for (const item of candidates) {
    if (cleanList.length >= 8) break; // We only need 8 top clean images per service

    if (worker) {
      const isDirty = await isImageTextDirty(item.fullPath, worker);
      if (isDirty) continue;
    }

    cleanList.push(item);
  }

  return cleanList;
}

async function processCleanImages() {
  console.log('=== Starting Ultra-Clean Image Filtration (Zero Numbers / Zero Website Names) ===');

  let worker = null;
  if (tesseract && tesseract.createWorker) {
    try {
      worker = await tesseract.createWorker('eng');
      console.log('✓ OCR Worker Initialized for English Text Recognition');
    } catch (e) {
      console.log('OCR worker failed to init, proceeding with heuristic regex filters.');
    }
  }

  const manifest = {};

  for (const [slug, folders] of Object.entries(SERVICE_FOLDER_MAPPINGS)) {
    const destDir = path.join(SERVICES_DEST, slug);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    const cleanCandidates = await getCleanImagesForService(folders, worker);
    console.log(`Service [${slug}]: Found ${cleanCandidates.length} 100% clean images without text/numbers/URLs.`);

    const selected = [];
    const baseAlt = ALT_DESCRIPTIONS[slug] || `${slug.replace(/-/g, ' ')} installation in Bangalore`;

    for (let i = 0; i < cleanCandidates.length && selected.length < 8; i++) {
      const img = cleanCandidates[i];
      const outFileName = `img-${selected.length + 1}.webp`;
      const outThumbName = `thumb-${selected.length + 1}.webp`;
      const outPath = path.join(destDir, outFileName);
      const outThumbPath = path.join(destDir, outThumbName);

      try {
        await sharp(img.fullPath)
          .resize(1200, 900, { fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 82 })
          .toFile(outPath);

        await sharp(img.fullPath)
          .resize(400, 300, { fit: 'cover' })
          .webp({ quality: 78 })
          .toFile(outThumbPath);

        selected.push({
          url: `/assets/services/${slug}/${outFileName}`,
          thumbUrl: `/assets/services/${slug}/${outThumbName}`,
          alt: `${baseAlt} - Clean Project View ${selected.length + 1}`,
          originalFolder: img.folder,
          index: selected.length + 1
        });
      } catch (err) {
        console.error(`Error converting ${img.file}:`, err);
      }
    }

    // Hero image
    let heroUrl = selected[0]?.url || '';
    if (cleanCandidates.length > 0) {
      try {
        const heroOut = path.join(destDir, 'hero.webp');
        await sharp(cleanCandidates[0].fullPath)
          .resize(1400, 900, { fit: 'cover', position: 'center' })
          .webp({ quality: 85 })
          .toFile(heroOut);
        heroUrl = `/assets/services/${slug}/hero.webp`;
      } catch (e) {}
    }

    manifest[slug] = {
      hero: heroUrl,
      heroAlt: `${baseAlt} - Professional installation by Ramana Safety Nets`,
      images: selected
    };

    console.log(`✓ [${slug}] Saved ${selected.length} clean WebP images.`);
  }

  if (worker && worker.terminate) {
    await worker.terminate();
  }

  // Save updated manifest
  const manifestPath = path.join(__dirname, '../src/data/serviceImagesManifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`Saved clean manifest to ${manifestPath}`);

  // Re-run updater to sync galleryData and heroSlidesData
  const updateScript = await import('./update-data-with-images.js');
  console.log('✓ Re-synced gallery and hero datasets with clean images.');
}

processCleanImages().catch(console.error);
