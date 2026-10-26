import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOWNLOADS_DIR = 'e:/RAMANA SAFETY NETS/downloads';
const PUBLIC_DIR = path.join(__dirname, '../public/assets');
const SERVICES_DEST = path.join(PUBLIC_DIR, 'services');

// Mapping of service slug to download folder names
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

// Descriptive alt templates per service
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

async function getImagesFromFolders(folderNames) {
  const images = [];
  for (const folderName of folderNames) {
    const folderPath = path.join(DOWNLOADS_DIR, folderName);
    if (!fs.existsSync(folderPath)) continue;
    
    const files = fs.readdirSync(folderPath);
    for (const file of files) {
      if (/\.(jpe?g|png|webp|avif)$/i.test(file)) {
        const fullPath = path.join(folderPath, file);
        try {
          const stat = fs.statSync(fullPath);
          if (stat.size > 8000) { // filter out tiny icons or broken files
            images.push({ fullPath, file, folderName, size: stat.size });
          }
        } catch (e) {}
      }
    }
  }
  return images;
}

async function processServiceImages() {
  console.log('--- Starting Service Images Optimization & WebP Conversion ---');
  if (!fs.existsSync(SERVICES_DEST)) {
    fs.mkdirSync(SERVICES_DEST, { recursive: true });
  }

  const serviceImageManifest = {};

  for (const [slug, folderNames] of Object.entries(SERVICE_FOLDER_MAPPINGS)) {
    const destDir = path.join(SERVICES_DEST, slug);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    const rawImages = await getImagesFromFolders(folderNames);
    console.log(`Processing ${slug}: Found ${rawImages.length} candidate images across [${folderNames.join(', ')}]`);

    // Sort by file size descending to prioritize higher resolution images
    rawImages.sort((a, b) => b.size - a.size);

    const selected = [];
    const baseAlt = ALT_DESCRIPTIONS[slug] || `${slug.replace(/-/g, ' ')} installation in Bangalore`;

    for (let i = 0; i < rawImages.length && selected.length < 8; i++) {
      const img = rawImages[i];
      try {
        const outFileName = `img-${selected.length + 1}.webp`;
        const outThumbName = `thumb-${selected.length + 1}.webp`;
        const outPath = path.join(destDir, outFileName);
        const outThumbPath = path.join(destDir, outThumbName);

        // Standard high-res webp (max 1200x900)
        await sharp(img.fullPath)
          .resize(1200, 900, { fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 82 })
          .toFile(outPath);

        // Thumbnail webp (max 400x300)
        await sharp(img.fullPath)
          .resize(400, 300, { fit: 'cover' })
          .webp({ quality: 78 })
          .toFile(outThumbPath);

        const altText = `${baseAlt} - View ${selected.length + 1}`;

        selected.push({
          url: `/assets/services/${slug}/${outFileName}`,
          thumbUrl: `/assets/services/${slug}/${outThumbName}`,
          alt: altText,
          originalFolder: img.folderName,
          index: selected.length + 1
        });
      } catch (err) {
        // Skip corrupt image
      }
    }

    // Ensure hero image is available as hero.webp
    let heroUrl = selected[0]?.url || '';
    if (rawImages.length > 0) {
      try {
        const heroOut = path.join(destDir, 'hero.webp');
        await sharp(rawImages[0].fullPath)
          .resize(1400, 900, { fit: 'cover', position: 'center' })
          .webp({ quality: 85 })
          .toFile(heroOut);
        heroUrl = `/assets/services/${slug}/hero.webp`;
      } catch (e) {}
    }

    serviceImageManifest[slug] = {
      hero: heroUrl,
      heroAlt: `${baseAlt} - Professional installation by Ramana Safety Nets`,
      images: selected
    };
    console.log(`✓ Completed ${slug}: Generated ${selected.length} webp images`);
  }

  // Save manifest
  const manifestPath = path.join(__dirname, '../src/data/serviceImagesManifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(serviceImageManifest, null, 2));
  console.log(`\nSaved manifest to ${manifestPath}`);
}

processServiceImages().catch(console.error);
