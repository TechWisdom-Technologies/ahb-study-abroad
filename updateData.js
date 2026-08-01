const fs = require('fs');

const requiredCountries = {
  canada: { name: "Canada", flagCode: "ca" },
  uk: { name: "United Kingdom", flagCode: "gb" },
  usa: { name: "United States", flagCode: "us" },
  australia: { name: "Australia", flagCode: "au" },
  ireland: { name: "Ireland", flagCode: "ie" },
  "new-zealand": { name: "New Zealand", flagCode: "nz" },
  france: { name: "France", flagCode: "fr" },
  germany: { name: "Germany", flagCode: "de" },
  netherlands: { name: "Netherlands", flagCode: "nl" },
  sweden: { name: "Sweden", flagCode: "se" },
  finland: { name: "Finland", flagCode: "fi" },
  denmark: { name: "Denmark", flagCode: "dk" },
  hungary: { name: "Hungary", flagCode: "hu" },
  malta: { name: "Malta", flagCode: "mt" },
  malaysia: { name: "Malaysia", flagCode: "my" },
  china: { name: "China", flagCode: "cn" }
};

// 1. Update universityListData.json
const uniDataPath = './src/data/universityListData.json';
let uniData = {};
try {
  uniData = require(uniDataPath);
} catch (e) {
  console.log('Error reading uniData', e);
}

const newUniData = {};

for (const [slug, info] of Object.entries(requiredCountries)) {
  // If exists in old data (some old keys might be different, like 'us' instead of 'usa', let's check)
  // Look for it by name if slug fails
  let found = uniData[slug];
  if (!found) {
    for (const [oldSlug, oldData] of Object.entries(uniData)) {
      if (oldData.name === info.name) {
        found = oldData;
        break;
      }
    }
  }

  if (found) {
    newUniData[slug] = {
      name: info.name,
      flagCode: info.flagCode,
      slug: slug,
      universities: found.universities || []
    };
  } else {
    newUniData[slug] = {
      name: info.name,
      flagCode: info.flagCode,
      slug: slug,
      universities: []
    };
  }
}

fs.writeFileSync(uniDataPath, JSON.stringify(newUniData, null, 2));
console.log('Updated universityListData.json');


// 2. Generate new destinationDetails.ts
const tsContent = `export type EnglishRequirement = {
  level: string;
  ielts: string;
  pte?: string;
  toefl?: string;
  duolingo?: string;
  oietc?: string;
};

export type TuitionDetail = {
  program: string;
  fee: string;
};

export type PartnerInstitution = {
  name: string;
  campus?: string;
  category?: string;
  rank?: string;
  scholarship?: string;
  offerTime?: string;
  url?: string;
};

export type DestinationInfo = {
  slug: string;
  name: string;
  flagCode: string;
  tagline: string;
  description: string;
  highlights: string[];
  whyChoose: string[];
  tuitionRange: string;
  livingCost: string;
  popularCourses: string[];
  workRights: string;
  intakes: string[];
  visaInfo: string;
  universities: { name: string; rank?: string; url?: string }[];
  englishRequirements?: EnglishRequirement[];
  tuitionDetails?: TuitionDetail[];
  partnerInstitutions?: PartnerInstitution[];
  documentChecklist?: { undergraduate: string[]; postgraduate: string[] };
  specialNotes?: string[];
};

export const destinationData: Record<string, DestinationInfo> = {
${Object.entries(requiredCountries).map(([slug, info]) => `  "${slug}": {
    slug: "${slug}",
    name: "${info.name}",
    flagCode: "${info.flagCode}",
    tagline: "Study in ${info.name}",
    description: "Discover world-class education opportunities in ${info.name}.",
    highlights: ["Quality Education", "International Community", "Great Lifestyle"],
    whyChoose: ["Globally recognized degrees", "Vibrant student life", "Excellent research facilities"],
    tuitionRange: "Varies by program",
    livingCost: "Varies by city",
    popularCourses: ["Business", "Engineering", "IT", "Arts"],
    workRights: "Subject to visa conditions",
    intakes: ["Fall", "Spring"],
    visaInfo: "Student Visa required",
    universities: [],
    documentChecklist: {
      undergraduate: ["Passport", "Transcripts", "Language Test"],
      postgraduate: ["Passport", "Bachelor's Degree", "Language Test", "SOP"]
    },
  }`).join(',\n')}
};
`;

fs.writeFileSync('./src/data/destinationDetails.ts', tsContent);
console.log('Updated destinationDetails.ts');
