import * as fs from 'fs';
import * as path from 'path';
import { destinationData, DestinationInfo } from './src/data/destinationDetails';

const requiredCountries: Record<string, { name: string; flagCode: string }> = {
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
const uniDataPath = path.join(__dirname, 'src/data/universityListData.json');
let uniData: any = {};
try {
  uniData = require(uniDataPath);
} catch (e) {
  console.log('Error reading uniData', e);
}

const newUniData: any = {};

for (const [slug, info] of Object.entries(requiredCountries)) {
  let found = uniData[slug];
  if (!found) {
    for (const [oldSlug, oldData] of Object.entries(uniData)) {
      if ((oldData as any).name === info.name) {
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

// 2. Build new destinationData string
let tsContent = `export type EnglishRequirement = {
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
`;

for (const [slug, reqInfo] of Object.entries(requiredCountries)) {
  let info = destinationData[slug];
  
  if (!info) {
    // Attempt to find by name if slug doesn't match
    for (const data of Object.values(destinationData)) {
      if (data.name === reqInfo.name) {
        info = data;
        break;
      }
    }
  }

  if (info) {
    // Preserve existing rich data, update flag code and name just in case
    info.flagCode = reqInfo.flagCode;
    info.name = reqInfo.name;
    info.slug = slug;
    // Dump back to TS format via JSON stringify, but JSON doesn't do JS object literal well.
    // Let's use JSON.stringify but remove quotes from keys for clean output
    let jsonStr = JSON.stringify(info, null, 2);
    // basic cleanup to make it look like JS object
    // Note: this might convert some strings to double quotes, which is fine for TS
    tsContent += `  "${slug}": ${jsonStr},\n`;
  } else {
    // Generate dummy data
    const dummy: DestinationInfo = {
      slug: slug,
      name: reqInfo.name,
      flagCode: reqInfo.flagCode,
      tagline: `Study in ${reqInfo.name}`,
      description: `Discover world-class education opportunities in ${reqInfo.name}.`,
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
    };
    tsContent += `  "${slug}": ${JSON.stringify(dummy, null, 2)},\n`;
  }
}

tsContent += `};\n`;

fs.writeFileSync(path.join(__dirname, 'src/data/destinationDetails.ts'), tsContent);
console.log('Updated destinationDetails.ts');
