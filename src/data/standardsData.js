export const safetyClassification = [
  {
    family: "Nylon Safety Net",
    purpose: "High-strength containment / specialized barriers",
    canMarketAsFallProtection: "Only if complete system is certified/designed",
    mainConcern: "Material polymer grade, elongation, yarn construction and system rating"
  },
  {
    family: "Balcony Safety Net",
    purpose: "Residential containment (children, pets, objects)",
    canMarketAsFallProtection: "No (Supplementary guard containment)",
    mainConcern: "Edge gaps, anchor pull-out, child/pet access, UV degradation"
  },
  {
    family: "Children Safety Net",
    purpose: "Child & toddler containment",
    canMarketAsFallProtection: "Not a replacement for code-required guards",
    mainConcern: "Climbability, mesh opening size (25mm), anchor capacity"
  },
  {
    family: "Anti-Bird / Pigeon Net",
    purpose: "Humane avian physical exclusion",
    canMarketAsFallProtection: "No",
    mainConcern: "Target species aperture, perimeter sealing, non-entanglement"
  },
  {
    family: "304 SS Bird Spikes",
    purpose: "Narrow ledge landing & perch deterrence",
    canMarketAsFallProtection: "No",
    mainConcern: "Ledge coverage, flexible UV base, zero-corrosion SS needles"
  },
  {
    family: "Monkey Safety Net",
    purpose: "Heavy-duty animal exclusion",
    canMarketAsFallProtection: "No (Unless separately engineered)",
    mainConcern: "Dynamic pulling loads, biting resistance, 3.0mm+ cord gauge"
  },
  {
    family: "Duct Area Safety Net",
    purpose: "Shaft void, pigeon, and object containment",
    canMarketAsFallProtection: "Depends on project risk & structural engineering",
    mainConcern: "Shaft geometry, vertical access, ventilation & plumbing access"
  },
  {
    family: "Inner House / Stair Net",
    purpose: "Stair banister & interior void containment",
    canMarketAsFallProtection: "Supplementary containment only",
    mainConcern: "Stair geometry, spindle gap closure, aesthetic integration"
  },
  {
    family: "Coconut Safety Net",
    purpose: "Fruit drop capture & property protection",
    canMarketAsFallProtection: "No (Fruit collection only)",
    mainConcern: "30kg impact absorption, trunk growth rigging, tree condition"
  },
  {
    family: "Glass Protection Net",
    purpose: "Secondary containment behind glass railings",
    canMarketAsFallProtection: "No",
    mainConcern: "Anchoring into solid RCC, non-contact with glass panes"
  },
  {
    family: "Building Covering Net",
    purpose: "Debris containment, dust control & scaffolding wrap",
    canMarketAsFallProtection: "No (Separate from certified fall-arrest nets)",
    mainConcern: "Wind permeability, flame retardancy (NFPA 701), scaffold attachment"
  },
  {
    family: "Construction Safety Net",
    purpose: "Collective worker fall arrest & heavy debris containment",
    canMarketAsFallProtection: "Yes (Only with complete compliant certified system)",
    mainConcern: "IS 11057 / EN 1263 / OSHA standards, 5000 lb border rope, drop testing"
  },
  {
    family: "Cricket / Sports Net",
    purpose: "High-velocity ball containment",
    canMarketAsFallProtection: "No",
    mainConcern: "150 km/h leather ball impact, roof net tension, pole rigging"
  },
  {
    family: "Mosquito Net",
    purpose: "Vector & insect exclusion",
    canMarketAsFallProtection: "No (Zero fall protection capacity)",
    mainConcern: "Fabric aperture (0.8-1.2mm), frame seal, optical clarity"
  },
  {
    family: "Swimming Pool Net",
    purpose: "Multi-layered water access deterrent",
    canMarketAsFallProtection: "Never the only anti-drowning measure",
    mainConcern: "Tension retention, flush deck anchors, active adult supervision"
  },
  {
    family: "316 SS Invisible Grill",
    purpose: "Tensioned cable barrier for balconies & windows",
    canMarketAsFallProtection: "No (Balcony barrier; not an industrial fall arrest system)",
    mainConcern: "Marine-grade SS316 wire, track rigidity, vertical orientation (no ladder effect)"
  }
];

export const standardsBaseline = [
  {
    code: "IS 11057:1984",
    title: "Specification for Industrial Safety Nets",
    organization: "Bureau of Indian Standards (BIS)",
    scope: "Covers requirements for man-made fibre nets designed to catch personnel and/or falling debris during work on high buildings, structural and industrial sites.",
    keyCriteria: "Energy absorption, border rope strength, test method with dynamic drop bags."
  },
  {
    code: "IS 4912:2024",
    title: "Safety Requirements for Floor and Wall Openings, Railings and Toe Boards",
    organization: "Bureau of Indian Standards (BIS)",
    scope: "Defines construction workplace safety measures where persons or objects could fall through elevated openings or perimeter edges.",
    keyCriteria: "Perimeter barriers, edge retention, collective protection integration."
  },
  {
    code: "IS 13415:1992",
    title: "Code of Safety for Protective Barriers in and around Buildings",
    organization: "Bureau of Indian Standards (BIS)",
    scope: "Guidelines for assessing permanent and supplementary protective barriers in residential, commercial, and public buildings.",
    keyCriteria: "Height, aperture, climbability prevention, anchor integrity."
  },
  {
    code: "EN 1263-1 / EN 1263-2",
    title: "Safety Nets — Safety Requirements, Test Methods & Positioning Limits",
    organization: "European Committee for Standardization (CEN)",
    scope: "Defines System S (horizontal border-rope nets), System T (bracket cantilever nets), System U (vertical scaffolding nets), and System V (support-frame nets).",
    keyCriteria: "Dynamic drop testing, test energy ratings (Class A1/A2/B1/B2), test mesh cords for aging."
  },
  {
    code: "OSHA 29 CFR 1926.502 / 1926.105",
    title: "Fall Protection Systems Criteria & Practices",
    organization: "Occupational Safety and Health Administration (USA)",
    scope: "Regulates construction safety net installations when working over 25 feet above ground.",
    keyCriteria: "Installed no more than 30 ft below work level, 5,000 lb border ropes, max 36 sq.in mesh opening, on-site drop test verification."
  },
  {
    code: "NFPA 701",
    title: "Standard Methods of Fire Tests for Flame Propagation of Textiles and Films",
    organization: "National Fire Protection Association",
    scope: "Test standard specified for flame-retardant scaffolding debris netting and building wrap screens in urban construction zones.",
    keyCriteria: "Self-extinguishing behavior, minimal melt dripping, flame spread resistance."
  }
];
