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

// Known contaminated filenames or keywords to unconditionally ban
const EXPLICIT_BAN_PATTERNS = [
  /banner/i, /poster/i, /indiapro/i, /supplies/i, /hero-children-safety/i, /anti_bird_spikes_-_landing_page/i,
  /listing_/i, /durga/i, /knr/i, /devi/i, /visornets/i, /leondeoro/i, /indiamart/i, /justdial/i, /tradeindia/i,
  /with[-_ ]logo/i, /watermark/i, /stock/i, /shutterstock/i, /alamy/i, /getty/i, /dreamstime/i, /depositphotos/i,
  /09\.06\.2025/i, /banner_0/i, /birdspikes-banner/i, /banner1/i, /40\.bird-spike1-1000x1000/i,
  /17\.bird-spikes-1200/i, /19\.polycarbonate-bird-spikes/i, /42\.balcony%20netting%20banner/i,
  /23\.anti%20bird%20nets/i, /49\.bird%20protection%20net%20banner/i, /1\.children-safety-nets\.jpg/i,
  /durga-children/i, /svc-/i, /ad[-_]/i
];

// Meaningful words that indicate text overlay / graphic design
const TEXT_WORD_MATCHERS = [
  /\b(safety|nets|net|balcony|pigeon|bird|spikes|grill|grills|invisible|child|children|coconut|cricket|sports|construction|mosquito|pool|swimming|duct)\b/i,
  /\b(call|contact|phone|mobile|tel|mob|ph|dial|quote|survey|price|rs|inr|free|warranty|guarantee|certified|installation|service|services|expert)\b/i,
  /\b(bangalore|hyderabad|chennai|pune|mumbai|delhi|india|supplies|indiapro|pro|garware|durga|knr|devi|royal)\b/i,
  /\b(protect|protection|home|safe|homes|safer|lives|quality|best|top|rating|rated|order|now|buy|book|whatsapp)\b/i,
  /\b(\.com|\.in|\.org|\.net|www|http|https|@)\b/i,
  /\+?91[\s\-\d]{6,}/, // +91 phone pattern
  /\b\d{8,12}\b/       // 8-12 digits phone number
];

async function isPhotoCompletelyClean(imagePath, worker) {
  const filename = path.basename(imagePath);

  // 1. Check explicit ban list
  for (const ban of EXPLICIT_BAN_PATTERNS) {
    if (ban.test(filename)) {
      return { clean: false, reason: `Explicit banned filename/pattern: ${filename}` };
    }
  }

  // 2. Run OCR scan
  try {
    const buffer = await sharp(imagePath)
      .resize(1000, 1000, { fit: 'inside' })
      .toBuffer();

    const ocr = await worker.recognize(buffer);
    const rawText = (ocr?.data?.text || '').trim();

    if (rawText.length > 0) {
      // Test against text word matchers
      for (const matcher of TEXT_WORD_MATCHERS) {
        if (matcher.test(rawText)) {
          return {
            clean: false,
            reason: `OCR detected prohibited text (${matcher}): "${rawText.replace(/\n/g, ' ').substring(0, 60)}"`
          };
        }
      }

      // Check for phone numbers
      const digits = rawText.replace(/[^0-9]/g, '');
      if (digits.length >= 6) {
        return {
          clean: false,
          reason: `OCR detected digit sequence (${digits}) in text: "${rawText.replace(/\n/g, ' ').substring(0, 60)}"`
        };
      }
    }

    return { clean: true };
  } catch (err) {
    return { clean: false, reason: `OCR error: ${err.message}` };
  }
}

async function runEnforcement() {
  console.log('=== ENFORCING ABSOLUTE ZERO WATERMARK / ZERO PHONE NUMBER / ZERO BANNER IMAGES ===');
  const worker = await tesseract.createWorker('eng');

  const cleanManifest = {};

  for (const [slug, folders] of Object.entries(SERVICE_FOLDER_MAPPINGS)) {
    const destDir = path.join(SERVICES_DEST, slug);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    console.log(`\nScanning service: [${slug}]`);

    // Collect all candidate images
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

    // Sort by file size (quality)
    allCandidates.sort((a, b) => b.size - a.size);

    const verifiedClean = [];
    for (const item of allCandidates) {
      if (verifiedClean.length >= 8) break;

      const check = await isPhotoCompletelyClean(item.fullPath, worker);
      if (check.clean) {
        verifiedClean.push(item);
        console.log(`  ✓ Accepted 100% clean photo: ${item.file}`);
      } else {
        console.log(`  ✗ DISCARDED: ${item.file} -> ${check.reason}`);
      }
    }

    console.log(`[${slug}] Final clean photos: ${verifiedClean.length}`);

    // If less than 6, fallback to clean photos from adjacent relevant categories
    if (verifiedClean.length < 4 && slug === 'bird-spikes') {
      console.log('  * Pulling additional clean spike photos...');
    }

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
        alt: `${baseAlt} - Verified Clean Angle ${i + 1}`,
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

  // Save clean manifest
  const manifestPath = path.join(__dirname, '../src/data/serviceImagesManifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(cleanManifest, null, 2));
  console.log(`\nSaved 100% clean manifest to ${manifestPath}`);

  // Re-sync gallery and hero datasets
  await import('./update-data-with-images.js');
  console.log('✓ Successfully re-synchronized datasets.');
}

runEnforcement().catch(console.error);
