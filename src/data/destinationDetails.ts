export type EnglishRequirement = {
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
  "canada": {
  "slug": "canada",
  "name": "Canada",
  "flagCode": "ca",
  "tagline": "Quality education with immigration-friendly policies",
  "description": "Canada is one of the most popular destinations for international students, offering high-quality education, a safe multicultural environment, and excellent post-graduation work and immigration opportunities.",
  "highlights": [
    "3-year post-graduation work permit",
    "Pathway to permanent residency",
    "Affordable tuition",
    "Safe & multicultural"
  ],
  "whyChoose": [
    "World-class universities and colleges with globally recognized degrees",
    "Affordable tuition fees compared to other Western countries",
    "Diverse and inclusive multicultural society",
    "Safe, peaceful, and student-friendly environment",
    "Strong post-graduation work opportunities (PGWP up to 3 years)",
    "Pathway to permanent residency and immigration",
    "Wide range of scholarship programs",
    "Innovative research and advanced technology facilities",
    "Beautiful natural landscapes and vibrant cities"
  ],
  "tuitionRange": "CAD 7,000 - 60,000/year",
  "livingCost": "CAD 10,000 - 15,000/year",
  "popularCourses": [
    "Computer Science & IT",
    "Engineering",
    "Business & MBA",
    "Health Sciences & Nursing",
    "Hospitality & Tourism",
    "Social Sciences",
    "Law & Legal Studies",
    "Education & Teaching"
  ],
  "workRights": "20 hours/week during studies, full-time during scheduled breaks",
  "intakes": [
    "September (Fall)",
    "January (Winter)",
    "May (Summer)"
  ],
  "visaInfo": "Study Permit - PGWP up to 3 years, pathway to PR",
  "englishRequirements": [
    {
      "level": "Bachelor/Diploma",
      "ielts": "6.0/5.5",
      "pte": "55-58",
      "toefl": "80-88",
      "duolingo": "95-105"
    },
    {
      "level": "Master's",
      "ielts": "6.5/5.5",
      "pte": "60-65+",
      "toefl": "90-100",
      "duolingo": "115-125+"
    }
  ],
  "tuitionDetails": [
    {
      "program": "Diploma / Certificate (Colleges)",
      "fee": "CAD 7,000 - 20,000"
    },
    {
      "program": "Bachelor's Degree (Universities)",
      "fee": "CAD 15,000 - 35,000"
    },
    {
      "program": "Master's Degree",
      "fee": "CAD 18,000 - 40,000"
    },
    {
      "program": "MBA Programs",
      "fee": "CAD 30,000 - 60,000"
    }
  ],
  "partnerInstitutions": [
    {
      "name": "University of Toronto",
      "category": "Public University",
      "rank": "Top 25",
      "url": "https://www.utoronto.ca"
    },
    {
      "name": "University of British Columbia (UBC)",
      "category": "Public University",
      "rank": "Top 40",
      "url": "https://www.ubc.ca"
    },
    {
      "name": "McGill University",
      "category": "Public University",
      "rank": "Top Ranked",
      "url": "https://www.mcgill.ca"
    },
    {
      "name": "University of Waterloo",
      "category": "Public University",
      "url": "https://uwaterloo.ca"
    },
    {
      "name": "University of Alberta",
      "category": "Public University",
      "url": "https://www.ualberta.ca"
    },
    {
      "name": "York University",
      "category": "Public University",
      "url": "https://www.yorku.ca"
    },
    {
      "name": "Simon Fraser University (SFU)",
      "category": "Public University",
      "url": "https://www.sfu.ca"
    },
    {
      "name": "University of Ottawa",
      "category": "Public University",
      "url": "https://www.uottawa.ca"
    },
    {
      "name": "University of Calgary",
      "category": "Public University",
      "url": "https://www.ucalgary.ca"
    },
    {
      "name": "Dalhousie University",
      "category": "Public University",
      "url": "https://www.dal.ca"
    },
    {
      "name": "Toronto Metropolitan University (TMU)",
      "category": "Public University",
      "url": "https://www.torontomu.ca"
    },
    {
      "name": "Carleton University",
      "category": "Public University",
      "url": "https://carleton.ca"
    },
    {
      "name": "Thompson Rivers University (TRU)",
      "category": "Public University",
      "url": "https://www.tru.ca"
    },
    {
      "name": "Cape Breton University (CBU)",
      "category": "Public University",
      "url": "https://www.cbu.ca"
    },
    {
      "name": "Seneca Polytechnic",
      "category": "Public College",
      "url": "https://www.senecapolytechnic.ca"
    },
    {
      "name": "Humber Polytechnic",
      "category": "Public College",
      "url": "https://humber.ca"
    },
    {
      "name": "Conestoga College",
      "category": "Public College",
      "url": "https://www.conestogac.on.ca"
    },
    {
      "name": "George Brown College",
      "category": "Public College",
      "url": "https://www.georgebrown.ca"
    },
    {
      "name": "Fanshawe College",
      "category": "Public College",
      "url": "https://www.fanshawec.ca"
    },
    {
      "name": "Sheridan College",
      "category": "Public College",
      "url": "https://www.sheridancollege.ca"
    },
    {
      "name": "Douglas College",
      "category": "Public College",
      "url": "https://www.douglascollege.ca"
    },
    {
      "name": "BCIT",
      "category": "Public College",
      "url": "https://www.bcit.ca"
    },
    {
      "name": "SAIT",
      "category": "Public College",
      "url": "https://www.sait.ca"
    },
    {
      "name": "Durham College",
      "category": "Public College",
      "url": "https://durhamcollege.ca"
    }
  ],
  "universities": [
    {
      "name": "University of Toronto",
      "rank": "Top 25",
      "url": "https://www.utoronto.ca"
    },
    {
      "name": "University of British Columbia",
      "rank": "Top 40",
      "url": "https://www.ubc.ca"
    },
    {
      "name": "McGill University",
      "rank": "Top Ranked",
      "url": "https://www.mcgill.ca"
    },
    {
      "name": "University of Waterloo",
      "url": "https://uwaterloo.ca"
    },
    {
      "name": "Simon Fraser University",
      "url": "https://www.sfu.ca"
    },
    {
      "name": "Seneca Polytechnic",
      "url": "https://www.senecapolytechnic.ca"
    },
    {
      "name": "Conestoga College",
      "url": "https://www.conestogac.on.ca"
    },
    {
      "name": "Fanshawe College",
      "url": "https://www.fanshawec.ca"
    }
  ],
  "documentChecklist": {
    "undergraduate": [
      "Passport (Front & Last page)",
      "English Proficiency Test (DET/IELTS/TOEFL/PTE)",
      "SSC & HSC Transcript and Certificate",
      "Letter of Recommendation - 1 copy (on letterpad with Teacher's details and Seal)",
      "Statement of Purpose (SOP)",
      "Updated CV (educational information in MM/YY format)",
      "GAP Evidence (If Any)",
      "Work Experience Certificate (If Any)"
    ],
    "postgraduate": [
      "Passport (Front & Last page)",
      "English Proficiency Test (MOI/DET/IELTS/TOEFL/PTE)",
      "SSC & HSC Transcript and Certificate",
      "Bachelor Certificate and Transcript",
      "Letter of Recommendation - 2 copies from 2 different teachers",
      "Statement of Purpose (SOP)",
      "Updated CV (educational information in MM/YY format)",
      "Work Experience Certificate (If Any)",
      "GAP Evidence (If Any)"
    ]
  }
},
  "uk": {
  "slug": "uk",
  "name": "United Kingdom",
  "flagCode": "gb",
  "tagline": "World-class education with centuries of academic excellence",
  "description": "The UK is home to some of the world's oldest and most prestigious universities. With shorter degree programs and globally recognized qualifications, studying in the UK offers exceptional value and career prospects.",
  "highlights": [
    "1-year Master's programs",
    "Post-study work visa (2 years)",
    "Duolingo & OIETC accepted",
    "No Pre-CAS interview at many universities"
  ],
  "whyChoose": [
    "Globally recognized degrees from centuries-old institutions",
    "Shorter degree programs - 3 years for Bachelor's, 1 year for Master's",
    "2-year post-study Graduate Route work visa",
    "Many universities accept Duolingo and OIETC scores",
    "MOI (Medium of Instruction) accepted at several universities",
    "Quick offer turnaround - some universities respond within 24-48 hours"
  ],
  "tuitionRange": "£10,000 - £38,000/year",
  "livingCost": "£9,000 - £15,000/year",
  "popularCourses": [
    "Business & Management",
    "Engineering",
    "Computer Science",
    "Law",
    "Medicine",
    "Arts & Design"
  ],
  "workRights": "20 hours/week during term, full-time during holidays",
  "intakes": [
    "September (Main)",
    "January",
    "May (Limited)"
  ],
  "visaInfo": "Student Visa (formerly Tier 4) - 2-year post-study Graduate Route visa available",
  "englishRequirements": [
    {
      "level": "Foundation (UKVI)",
      "ielts": "5.0/4.5",
      "pte": "-",
      "oietc": "-",
      "duolingo": "-"
    },
    {
      "level": "Undergraduate",
      "ielts": "6.0/5.5",
      "pte": "58/50",
      "oietc": "6.0/5.0",
      "duolingo": "105/95"
    },
    {
      "level": "Postgraduate",
      "ielts": "6.0/5.5 or 6.5/5.5",
      "pte": "62/50",
      "oietc": "6.0/5.0 or 7.0/6.0",
      "duolingo": "115/100"
    }
  ],
  "tuitionDetails": [
    {
      "program": "Foundation",
      "fee": "£8,000 - £15,000"
    },
    {
      "program": "Undergraduate (Bachelor's)",
      "fee": "£10,000 - £25,000"
    },
    {
      "program": "Postgraduate (Master's)",
      "fee": "£12,000 - £38,000"
    },
    {
      "program": "MBA Programs",
      "fee": "£15,000 - £45,000+"
    }
  ],
  "partnerInstitutions": [
    {
      "name": "University of Huddersfield London",
      "offerTime": "24-48 Hrs",
      "category": "Quick Offer",
      "url": "https://www.hud.ac.uk"
    },
    {
      "name": "University of Surrey",
      "offerTime": "3-4 Days",
      "category": "Quick Offer",
      "url": "https://www.surrey.ac.uk"
    },
    {
      "name": "University of Leicester",
      "offerTime": "1-2 Weeks",
      "category": "Quick Offer",
      "url": "https://le.ac.uk"
    },
    {
      "name": "Swansea University",
      "offerTime": "1-2 Weeks",
      "category": "Quick Offer",
      "url": "https://www.swansea.ac.uk"
    },
    {
      "name": "Royal Holloway University of London",
      "offerTime": "1-2 Weeks",
      "category": "Quick Offer",
      "url": "https://www.royalholloway.ac.uk"
    },
    {
      "name": "Aston University Birmingham",
      "offerTime": "1-2 Weeks",
      "category": "Quick Offer",
      "url": "https://www.aston.ac.uk"
    },
    {
      "name": "University of Portsmouth",
      "offerTime": "1-2 Weeks",
      "category": "Quick Offer",
      "url": "https://www.port.ac.uk"
    },
    {
      "name": "University of Hull",
      "offerTime": "1-2 Weeks",
      "category": "Quick Offer",
      "url": "https://www.hull.ac.uk"
    },
    {
      "name": "Northumbria University Newcastle",
      "offerTime": "1-2 Weeks",
      "category": "Quick Offer",
      "url": "https://www.northumbria.ac.uk"
    },
    {
      "name": "Manchester Metropolitan University",
      "offerTime": "1-2 Weeks",
      "category": "Quick Offer",
      "url": "https://www.mmu.ac.uk"
    },
    {
      "name": "Kingston University London",
      "offerTime": "1-2 Weeks",
      "category": "Quick Offer",
      "url": "https://www.kingston.ac.uk"
    },
    {
      "name": "Middlesex University",
      "offerTime": "1-2 Weeks",
      "category": "Quick Offer",
      "url": "https://www.mdx.ac.uk"
    },
    {
      "name": "University of Greenwich",
      "offerTime": "1-2 Weeks",
      "category": "Quick Offer",
      "url": "https://www.gre.ac.uk"
    },
    {
      "name": "Edinburgh Napier University",
      "offerTime": "1-2 Weeks",
      "category": "Quick Offer",
      "url": "https://www.napier.ac.uk"
    },
    {
      "name": "London South Bank University",
      "offerTime": "1-2 Weeks",
      "category": "Quick Offer",
      "url": "https://www.lsbu.ac.uk"
    },
    {
      "name": "University of Hertfordshire",
      "offerTime": "1-2 Weeks",
      "category": "Quick Offer",
      "url": "https://www.herts.ac.uk"
    },
    {
      "name": "London Metropolitan University",
      "offerTime": "1-2 Weeks",
      "category": "Quick Offer",
      "url": "https://www.londonmet.ac.uk"
    },
    {
      "name": "University of Sunderland",
      "offerTime": "1-2 Weeks",
      "category": "Quick Offer",
      "url": "https://www.sunderland.ac.uk"
    },
    {
      "name": "University College Birmingham",
      "offerTime": "1-2 Weeks",
      "category": "Quick Offer",
      "url": "https://www.ucb.ac.uk"
    },
    {
      "name": "The University of Law",
      "offerTime": "1-2 Weeks",
      "category": "Quick Offer",
      "url": "https://www.law.ac.uk"
    }
  ],
  "universities": [
    {
      "name": "University of Leeds",
      "rank": "Top 100",
      "url": "https://www.leeds.ac.uk"
    },
    {
      "name": "University of Manchester",
      "rank": "Top 30",
      "url": "https://www.manchester.ac.uk"
    },
    {
      "name": "University of Exeter",
      "url": "https://www.exeter.ac.uk"
    },
    {
      "name": "University of York",
      "url": "https://www.york.ac.uk"
    },
    {
      "name": "University of East Anglia",
      "url": "https://www.uea.ac.uk"
    },
    {
      "name": "Coventry University",
      "url": "https://www.coventry.ac.uk"
    },
    {
      "name": "Middlesex University London",
      "url": "https://www.mdx.ac.uk"
    },
    {
      "name": "University of Sunderland",
      "url": "https://www.sunderland.ac.uk"
    },
    {
      "name": "Sheffield Hallam University",
      "url": "https://www.shu.ac.uk"
    },
    {
      "name": "University of Surrey",
      "url": "https://www.surrey.ac.uk"
    },
    {
      "name": "Oxford Brookes University",
      "url": "https://www.brookes.ac.uk"
    },
    {
      "name": "Queen Mary University of London",
      "url": "https://www.qmul.ac.uk"
    },
    {
      "name": "Brunel University London",
      "url": "https://www.brunel.ac.uk"
    },
    {
      "name": "Nottingham Trent University",
      "url": "https://www.ntu.ac.uk"
    },
    {
      "name": "University of Strathclyde",
      "url": "https://www.strath.ac.uk"
    },
    {
      "name": "Cardiff Metropolitan University",
      "url": "https://www.cardiffmet.ac.uk"
    }
  ],
  "documentChecklist": {
    "undergraduate": [
      "Passport (Front & Last page)",
      "English Proficiency Test (OIETC/DET/IELTS/TOEFL/PTE)",
      "SSC & HSC / O-Level & A-Level Transcript and Certificate",
      "Letter of Recommendation - 1 copy (on letterpad with Teacher's Name, Email, Contact Details and Seal)",
      "Statement of Purpose (SOP)",
      "Updated CV (educational information in MM/YY format)",
      "GAP Evidence (If Any)",
      "Work Experience Certificate (If Any)"
    ],
    "postgraduate": [
      "Passport (Front & Last page)",
      "English Proficiency Test (MOI/OIETC/DET/IELTS/TOEFL/PTE)",
      "SSC & HSC / O-Level & A-Level Transcript and Certificate",
      "Bachelor Certificate and Transcript (Completion Letter for Provisional Certificate)",
      "Letter of Recommendation - 2 copies from 2 different teachers",
      "Statement of Purpose (SOP)",
      "Updated CV (educational information in MM/YY format)",
      "Work Experience Certificate (If Any)",
      "GAP Evidence (If Any)"
    ]
  },
  "specialNotes": [
    "Many UK universities accept MOI (Medium of Instruction) - no English test needed",
    "Duolingo accepted at 16+ partner universities",
    "Several universities offer No Pre-CAS Interview",
    "Quick offers available - some as fast as 24-48 hours"
  ]
},
  "usa": {
  "slug": "usa",
  "name": "United States",
  "flagCode": "us",
  "tagline": "Study in United States",
  "description": "Discover world-class education opportunities in United States.",
  "highlights": [
    "Quality Education",
    "International Community",
    "Great Lifestyle"
  ],
  "whyChoose": [
    "Globally recognized degrees",
    "Vibrant student life",
    "Excellent research facilities"
  ],
  "tuitionRange": "Varies by program",
  "livingCost": "Varies by city",
  "popularCourses": [
    "Business",
    "Engineering",
    "IT",
    "Arts"
  ],
  "workRights": "Subject to visa conditions",
  "intakes": [
    "Fall",
    "Spring"
  ],
  "visaInfo": "Student Visa required",
  "universities": [],
  "documentChecklist": {
    "undergraduate": [
      "Passport",
      "Transcripts",
      "Language Test"
    ],
    "postgraduate": [
      "Passport",
      "Bachelor's Degree",
      "Language Test",
      "SOP"
    ]
  }
},
  "australia": {
  "slug": "australia",
  "name": "Australia",
  "flagCode": "au",
  "tagline": "Innovation-driven education in a stunning environment",
  "description": "Australia boasts 7 of the world's top 100 universities and offers a relaxed yet academically rigorous environment. With post-study work rights up to 5 years and a high quality of life, it's a top choice for ambitious students.",
  "highlights": [
    "Post-study work visa (up to 5 years)",
    "50+ partner institutions",
    "Top 15 QS-ranked universities",
    "Lucrative scholarships available"
  ],
  "whyChoose": [
    "World-class education system with globally recognized degrees",
    "Wide range of study options across all disciplines",
    "Cutting-edge research opportunities and innovation",
    "Multicultural environment with a large Bangladeshi community",
    "Scholarships and financial support for international students",
    "Pathways to permanent residency for eligible graduates",
    "Geographically closer to Bangladesh than US/UK"
  ],
  "tuitionRange": "AUD 4,000 - 70,000+/year",
  "livingCost": "AUD 21,000 - 27,000/year",
  "popularCourses": [
    "Business & MBA",
    "IT & Computer Science",
    "Engineering",
    "Nursing & Health Sciences",
    "Hospitality & Tourism",
    "Education & Teaching",
    "Agricultural & Environmental Sciences",
    "Creative Arts & Design"
  ],
  "workRights": "48 hours/fortnight during studies, unlimited during breaks",
  "intakes": [
    "February (Main)",
    "July"
  ],
  "visaInfo": "Student Visa (Subclass 500) - Post-study work visa (Subclass 485) up to 5 years",
  "englishRequirements": [
    {
      "level": "Foundation / VET",
      "ielts": "5.5/5.0",
      "pte": "42-49",
      "toefl": "46-59"
    },
    {
      "level": "Undergraduate",
      "ielts": "6.0/5.5",
      "pte": "50",
      "toefl": "60-78"
    },
    {
      "level": "Postgraduate",
      "ielts": "6.5/6.0",
      "pte": "58",
      "toefl": "79-93"
    },
    {
      "level": "Research (PhD)",
      "ielts": "6.5-7.0/6.0",
      "pte": "62+",
      "toefl": "90+"
    },
    {
      "level": "Nursing / Health / Teaching",
      "ielts": "7.0 Overall",
      "pte": "65+",
      "toefl": "94-100"
    },
    {
      "level": "Medicine / Dentistry",
      "ielts": "7.0-7.5/7.0",
      "pte": "73+",
      "toefl": "100+"
    }
  ],
  "tuitionDetails": [
    {
      "program": "VET (Vocational Education)",
      "fee": "AUD 4,000 - 22,000"
    },
    {
      "program": "Undergraduate (Bachelor's)",
      "fee": "AUD 20,000 - 45,000"
    },
    {
      "program": "Postgraduate (Master's)",
      "fee": "AUD 22,000 - 50,000"
    },
    {
      "program": "Doctoral (PhD / Research)",
      "fee": "AUD 20,000 - 42,000"
    },
    {
      "program": "Medicine / Dentistry",
      "fee": "AUD 50,000 - 70,000+"
    },
    {
      "program": "MBA (Top Ranked)",
      "fee": "AUD 45,000 - 65,000"
    }
  ],
  "partnerInstitutions": [
    {
      "name": "UNSW (University of New South Wales)",
      "campus": "Sydney",
      "category": "Public University",
      "rank": "#19",
      "scholarship": "Up to 15%",
      "url": "https://www.unsw.edu.au"
    },
    {
      "name": "University of Queensland (UQ)",
      "campus": "Brisbane",
      "category": "Public University",
      "rank": "#43",
      "scholarship": "Up to 20%",
      "url": "https://www.uq.edu.au"
    },
    {
      "name": "University of Technology Sydney (UTS)",
      "campus": "Sydney",
      "category": "Public University",
      "url": "https://www.uts.edu.au"
    },
    {
      "name": "University of Adelaide",
      "campus": "Adelaide",
      "category": "Public University",
      "url": "https://www.adelaide.edu.au"
    },
    {
      "name": "University of Wollongong",
      "campus": "Wollongong, Sydney",
      "category": "Public University",
      "rank": "#162",
      "scholarship": "Up to 30%",
      "url": "https://www.uow.edu.au"
    },
    {
      "name": "University of Newcastle",
      "campus": "Newcastle",
      "category": "Public University",
      "rank": "#173",
      "scholarship": "AUD 10,000-15,000",
      "url": "https://www.newcastle.edu.au"
    },
    {
      "name": "Swinburne University of Technology",
      "campus": "Melbourne",
      "category": "Public University",
      "rank": "#285",
      "scholarship": "Up to 30%",
      "url": "https://www.swinburne.edu.au"
    },
    {
      "name": "Deakin University",
      "campus": "Melbourne, Geelong",
      "category": "Public University",
      "url": "https://www.deakin.edu.au"
    },
    {
      "name": "La Trobe University",
      "campus": "Melbourne",
      "category": "Public University",
      "rank": "#242",
      "scholarship": "Up to 25%",
      "url": "https://www.latrobe.edu.au"
    },
    {
      "name": "James Cook University",
      "campus": "Townsville, Cairns, Brisbane",
      "category": "Public University",
      "rank": "#375",
      "scholarship": "Up to 25%",
      "url": "https://www.jcu.edu.au"
    },
    {
      "name": "Queensland University of Technology (QUT)",
      "campus": "Brisbane",
      "category": "Public University",
      "url": "https://www.qut.edu.au"
    },
    {
      "name": "University of Western Australia (UWA)",
      "campus": "Perth",
      "category": "Public University",
      "url": "https://www.uwa.edu.au"
    },
    {
      "name": "Macquarie University",
      "campus": "Sydney",
      "category": "Public University",
      "url": "https://www.mq.edu.au"
    },
    {
      "name": "Griffith University",
      "campus": "Brisbane, Gold Coast",
      "category": "Public University",
      "url": "https://www.griffith.edu.au"
    },
    {
      "name": "Western Sydney University",
      "campus": "Sydney",
      "category": "Public University",
      "rank": "#415",
      "scholarship": "Up to AUD 6,000",
      "url": "https://www.westernsydney.edu.au"
    },
    {
      "name": "University of Tasmania (UTAS)",
      "campus": "Hobart, Launceston",
      "category": "Public University",
      "url": "https://www.utas.edu.au"
    },
    {
      "name": "Flinders University",
      "campus": "Adelaide",
      "category": "Public University",
      "url": "https://www.flinders.edu.au"
    },
    {
      "name": "University of South Australia (UniSA)",
      "campus": "Adelaide",
      "category": "Public University",
      "url": "https://www.unisa.edu.au"
    },
    {
      "name": "University of Canberra",
      "campus": "Canberra",
      "category": "Public University",
      "url": "https://www.canberra.edu.au"
    },
    {
      "name": "CQ University",
      "campus": "Brisbane, Sydney, Melbourne",
      "category": "Public University",
      "url": "https://www.cqu.edu.au"
    },
    {
      "name": "Victoria University",
      "campus": "Melbourne, Sydney",
      "category": "Public University",
      "url": "https://www.vu.edu.au"
    },
    {
      "name": "Charles Sturt University",
      "campus": "Sydney, Melbourne",
      "category": "Public University",
      "rank": "#801-850",
      "scholarship": "Up to 25%",
      "url": "https://www.csu.edu.au"
    },
    {
      "name": "Torrens University Australia",
      "campus": "Multiple Cities",
      "category": "Private University",
      "url": "https://www.torrens.edu.au"
    },
    {
      "name": "Kaplan Business School",
      "campus": "Sydney, Melbourne, Adelaide",
      "category": "Private College",
      "url": "https://www.kbs.edu.au"
    }
  ],
  "universities": [
    {
      "name": "UNSW Sydney",
      "rank": "#19 World",
      "url": "https://www.unsw.edu.au"
    },
    {
      "name": "University of Queensland",
      "rank": "#43 World",
      "url": "https://www.uq.edu.au"
    },
    {
      "name": "University of Wollongong",
      "rank": "#162",
      "url": "https://www.uow.edu.au"
    },
    {
      "name": "University of Newcastle",
      "rank": "#173",
      "url": "https://www.newcastle.edu.au"
    },
    {
      "name": "UTS Sydney",
      "url": "https://www.uts.edu.au"
    },
    {
      "name": "Deakin University",
      "url": "https://www.deakin.edu.au"
    },
    {
      "name": "La Trobe University",
      "rank": "#242",
      "url": "https://www.latrobe.edu.au"
    },
    {
      "name": "Swinburne University",
      "rank": "#285",
      "url": "https://www.swinburne.edu.au"
    }
  ],
  "documentChecklist": {
    "undergraduate": [
      "Passport (Information Page)",
      "English Proficiency Test Certificate (IELTS/TOEFL/PTE)",
      "SSC & HSC / O-Level & A-Level Transcript and Certificate",
      "Letter of Recommendation - 1 copy (on letterpad with Teacher's details and Seal)",
      "Statement of Purpose (SOP)",
      "Updated CV (educational information in MM/YY format)",
      "GAP Evidence (If Any)",
      "Work Experience Certificate (If Any)"
    ],
    "postgraduate": [
      "Passport (Information Page)",
      "English Proficiency Test Certificate (IELTS/TOEFL/PTE)",
      "SSC & HSC / O-Level & A-Level Transcript and Certificate",
      "Bachelor Certificate and Transcript",
      "Letter of Recommendation - 2 copies from 2 different teachers",
      "Statement of Purpose (SOP)",
      "Updated CV (educational information in MM/YY format)",
      "Work Experience Certificate (If Any)",
      "GAP Evidence (If Any)"
    ]
  },
  "specialNotes": [
    "Free admission services with 18+ years of education",
    "50+ partner institutions across Australia",
    "Academic and English Language Pathways available",
    "Flexible entry requirements at several universities"
  ]
},
  "ireland": {
  "slug": "ireland",
  "name": "Ireland",
  "flagCode": "ie",
  "tagline": "Study in Ireland",
  "description": "Discover world-class education opportunities in Ireland.",
  "highlights": [
    "Quality Education",
    "International Community",
    "Great Lifestyle"
  ],
  "whyChoose": [
    "Globally recognized degrees",
    "Vibrant student life",
    "Excellent research facilities"
  ],
  "tuitionRange": "Varies by program",
  "livingCost": "Varies by city",
  "popularCourses": [
    "Business",
    "Engineering",
    "IT",
    "Arts"
  ],
  "workRights": "Subject to visa conditions",
  "intakes": [
    "Fall",
    "Spring"
  ],
  "visaInfo": "Student Visa required",
  "universities": [],
  "documentChecklist": {
    "undergraduate": [
      "Passport",
      "Transcripts",
      "Language Test"
    ],
    "postgraduate": [
      "Passport",
      "Bachelor's Degree",
      "Language Test",
      "SOP"
    ]
  }
},
  "new-zealand": {
  "slug": "new-zealand",
  "name": "New Zealand",
  "flagCode": "nz",
  "tagline": "World-renowned education in a breathtaking setting",
  "description": "New Zealand offers an excellent education system recognized worldwide, combined with stunning natural beauty and a welcoming culture. It's perfect for students seeking quality education in a safe, peaceful environment.",
  "highlights": [
    "3-year post-study work visa",
    "Scholarships up to NZD 20,000",
    "MOI accepted at top universities",
    "Courses under NZD 30,000"
  ],
  "whyChoose": [
    "Globally recognized degrees from top-ranked institutions",
    "Post-study work visa up to 3 years",
    "Scholarships available up to NZD 20,000 at multiple institutions",
    "Several universities accept MOI (no English test required)",
    "Safe, peaceful environment with stunning natural beauty",
    "Quick offer letters - within 2 weeks at many institutions"
  ],
  "tuitionRange": "NZD 22,000 - 35,000/year",
  "livingCost": "NZD 15,000 - 20,000/year",
  "popularCourses": [
    "Agriculture",
    "Environmental Science",
    "IT",
    "Business",
    "Tourism & Hospitality",
    "Engineering"
  ],
  "workRights": "20 hours/week during term, full-time during holidays",
  "intakes": [
    "February (Main)",
    "July"
  ],
  "visaInfo": "Student Visa - Post-study work visa up to 3 years",
  "englishRequirements": [
    {
      "level": "Undergraduate",
      "ielts": "6.0/5.5",
      "pte": "50/42"
    },
    {
      "level": "Postgraduate",
      "ielts": "6.5/5.5",
      "pte": "58/50"
    }
  ],
  "partnerInstitutions": [
    {
      "name": "University of Auckland",
      "category": "University",
      "scholarship": "Up to NZD 20,000",
      "url": "https://www.auckland.ac.nz"
    },
    {
      "name": "University of Otago",
      "category": "University",
      "scholarship": "Up to NZD 20,000",
      "url": "https://www.otago.ac.nz"
    },
    {
      "name": "Massey University",
      "category": "University",
      "scholarship": "Up to NZD 20,000",
      "url": "https://www.massey.ac.nz"
    },
    {
      "name": "Lincoln University",
      "category": "University",
      "scholarship": "Up to NZD 20,000",
      "url": "https://www.lincoln.ac.nz"
    },
    {
      "name": "Auckland University of Technology",
      "category": "University",
      "scholarship": "Up to NZD 20,000",
      "url": "https://www.aut.ac.nz"
    },
    {
      "name": "University of Waikato",
      "category": "University",
      "scholarship": "Up to NZD 20,000",
      "url": "https://www.waikato.ac.nz"
    },
    {
      "name": "University of Canterbury",
      "category": "University",
      "scholarship": "Up to NZD 20,000",
      "url": "https://www.canterbury.ac.nz"
    },
    {
      "name": "Victoria University of Wellington",
      "category": "University",
      "scholarship": "Up to NZD 20,000",
      "url": "https://www.wgtn.ac.nz"
    },
    {
      "name": "Southern Institute of Technology",
      "category": "Institute",
      "url": "https://www.sit.ac.nz"
    },
    {
      "name": "Unitec Institute of Technology",
      "category": "Institute",
      "url": "https://www.unitec.ac.nz"
    },
    {
      "name": "Otago Polytechnic",
      "category": "Institute",
      "url": "https://www.op.ac.nz"
    },
    {
      "name": "Nelson Marlborough Institute of Technology",
      "category": "Institute",
      "url": "https://www.nmit.ac.nz"
    },
    {
      "name": "New Zealand Tertiary College (NZTC)",
      "category": "Institute",
      "url": "https://www.nztertiarycollege.ac.nz"
    }
  ],
  "universities": [
    {
      "name": "University of Auckland",
      "rank": "Top 70",
      "url": "https://www.auckland.ac.nz"
    },
    {
      "name": "University of Canterbury",
      "url": "https://www.canterbury.ac.nz"
    },
    {
      "name": "Victoria University of Wellington",
      "url": "https://www.wgtn.ac.nz"
    },
    {
      "name": "University of Otago",
      "url": "https://www.otago.ac.nz"
    },
    {
      "name": "AUT University",
      "url": "https://www.aut.ac.nz"
    },
    {
      "name": "Lincoln University",
      "url": "https://www.lincoln.ac.nz"
    },
    {
      "name": "Massey University",
      "url": "https://www.massey.ac.nz"
    },
    {
      "name": "University of Waikato",
      "url": "https://www.waikato.ac.nz"
    }
  ],
  "documentChecklist": {
    "undergraduate": [
      "Passport (Front & Last page)",
      "English Proficiency Test (OIETC/DET/IELTS/TOEFL/PTE)",
      "SSC & HSC / O-Level & A-Level Transcript and Certificate",
      "Letter of Recommendation - 1 copy (on letterpad with Teacher's details and Seal)",
      "Statement of Purpose (SOP)",
      "Updated CV (educational information in MM/YY format)",
      "GAP Evidence (If Any)",
      "Work Experience Certificate (If Any)"
    ],
    "postgraduate": [
      "Passport (Front & Last page)",
      "English Proficiency Test (MOI/OIETC/DET/IELTS/TOEFL/PTE)",
      "SSC & HSC / O-Level & A-Level Transcript and Certificate",
      "Bachelor Certificate and Transcript",
      "Letter of Recommendation - 2 copies from 2 different teachers",
      "Statement of Purpose (SOP)",
      "Updated CV (educational information in MM/YY format)",
      "Work Experience Certificate (If Any)",
      "GAP Evidence (If Any)"
    ]
  },
  "specialNotes": [
    "MOI accepted at University of Auckland, Massey, Lincoln, and AUT",
    "Quick offer letters within 2 weeks for Master's courses",
    "Several institutions offer courses under NZD 30,000"
  ]
},
  "france": {
  "slug": "france",
  "name": "France",
  "flagCode": "fr",
  "tagline": "Study in France",
  "description": "Discover world-class education opportunities in France.",
  "highlights": [
    "Quality Education",
    "International Community",
    "Great Lifestyle"
  ],
  "whyChoose": [
    "Globally recognized degrees",
    "Vibrant student life",
    "Excellent research facilities"
  ],
  "tuitionRange": "Varies by program",
  "livingCost": "Varies by city",
  "popularCourses": [
    "Business",
    "Engineering",
    "IT",
    "Arts"
  ],
  "workRights": "Subject to visa conditions",
  "intakes": [
    "Fall",
    "Spring"
  ],
  "visaInfo": "Student Visa required",
  "universities": [],
  "documentChecklist": {
    "undergraduate": [
      "Passport",
      "Transcripts",
      "Language Test"
    ],
    "postgraduate": [
      "Passport",
      "Bachelor's Degree",
      "Language Test",
      "SOP"
    ]
  }
},
  "germany": {
  "slug": "germany",
  "name": "Germany",
  "flagCode": "de",
  "tagline": "Study in Germany",
  "description": "Discover world-class education opportunities in Germany.",
  "highlights": [
    "Quality Education",
    "International Community",
    "Great Lifestyle"
  ],
  "whyChoose": [
    "Globally recognized degrees",
    "Vibrant student life",
    "Excellent research facilities"
  ],
  "tuitionRange": "Varies by program",
  "livingCost": "Varies by city",
  "popularCourses": [
    "Business",
    "Engineering",
    "IT",
    "Arts"
  ],
  "workRights": "Subject to visa conditions",
  "intakes": [
    "Fall",
    "Spring"
  ],
  "visaInfo": "Student Visa required",
  "universities": [],
  "documentChecklist": {
    "undergraduate": [
      "Passport",
      "Transcripts",
      "Language Test"
    ],
    "postgraduate": [
      "Passport",
      "Bachelor's Degree",
      "Language Test",
      "SOP"
    ]
  }
},
  "netherlands": {
  "slug": "netherlands",
  "name": "Netherlands",
  "flagCode": "nl",
  "tagline": "Study in Netherlands",
  "description": "Discover world-class education opportunities in Netherlands.",
  "highlights": [
    "Quality Education",
    "International Community",
    "Great Lifestyle"
  ],
  "whyChoose": [
    "Globally recognized degrees",
    "Vibrant student life",
    "Excellent research facilities"
  ],
  "tuitionRange": "Varies by program",
  "livingCost": "Varies by city",
  "popularCourses": [
    "Business",
    "Engineering",
    "IT",
    "Arts"
  ],
  "workRights": "Subject to visa conditions",
  "intakes": [
    "Fall",
    "Spring"
  ],
  "visaInfo": "Student Visa required",
  "universities": [],
  "documentChecklist": {
    "undergraduate": [
      "Passport",
      "Transcripts",
      "Language Test"
    ],
    "postgraduate": [
      "Passport",
      "Bachelor's Degree",
      "Language Test",
      "SOP"
    ]
  }
},
  "sweden": {
  "slug": "sweden",
  "name": "Sweden",
  "flagCode": "se",
  "tagline": "Study in Sweden",
  "description": "Discover world-class education opportunities in Sweden.",
  "highlights": [
    "Quality Education",
    "International Community",
    "Great Lifestyle"
  ],
  "whyChoose": [
    "Globally recognized degrees",
    "Vibrant student life",
    "Excellent research facilities"
  ],
  "tuitionRange": "Varies by program",
  "livingCost": "Varies by city",
  "popularCourses": [
    "Business",
    "Engineering",
    "IT",
    "Arts"
  ],
  "workRights": "Subject to visa conditions",
  "intakes": [
    "Fall",
    "Spring"
  ],
  "visaInfo": "Student Visa required",
  "universities": [],
  "documentChecklist": {
    "undergraduate": [
      "Passport",
      "Transcripts",
      "Language Test"
    ],
    "postgraduate": [
      "Passport",
      "Bachelor's Degree",
      "Language Test",
      "SOP"
    ]
  }
},
  "finland": {
  "slug": "finland",
  "name": "Finland",
  "flagCode": "fi",
  "tagline": "World's best education system meets Nordic innovation",
  "description": "Finland is renowned for having one of the best education systems in the world. With a focus on innovation, research, and sustainability, Finnish universities offer cutting-edge programs in a safe Nordic environment.",
  "highlights": [
    "Top-ranked education system",
    "Innovation & sustainability focus",
    "Safe Nordic society",
    "Northern Lights & nature"
  ],
  "whyChoose": [
    "Consistently ranked #1 education system in the world",
    "Strong focus on innovation, sustainability, and research",
    "Safe, clean, and well-organized Nordic society",
    "High quality of life with excellent public services",
    "Growing tech startup ecosystem (home of Nokia, Supercell)",
    "Unique cultural experience with Northern Lights"
  ],
  "tuitionRange": "EUR 6,000 - 18,000/year",
  "livingCost": "EUR 700 - 1,100/month",
  "popularCourses": [
    "IT & Technology",
    "Environmental Science",
    "Business",
    "Design",
    "Engineering",
    "Education"
  ],
  "workRights": "Unlimited during term if related to studies",
  "intakes": [
    "August/September (Main)",
    "January"
  ],
  "visaInfo": "Residence Permit for Studies - renewable annually",
  "englishRequirements": [
    {
      "level": "Undergraduate",
      "ielts": "6.0",
      "toefl": "80",
      "pte": "54"
    },
    {
      "level": "Postgraduate",
      "ielts": "6.5",
      "toefl": "90",
      "pte": "62"
    }
  ],
  "tuitionDetails": [
    {
      "program": "Undergraduate (UAS)",
      "fee": "EUR 6,000 - 12,000/year"
    },
    {
      "program": "Undergraduate (University)",
      "fee": "EUR 8,000 - 15,000/year"
    },
    {
      "program": "Postgraduate",
      "fee": "EUR 10,000 - 18,000/year"
    }
  ],
  "universities": [
    {
      "name": "University of Helsinki",
      "rank": "Top 100",
      "url": "https://www.helsinki.fi/en"
    },
    {
      "name": "Aalto University",
      "rank": "Top 150",
      "url": "https://www.aalto.fi/en"
    },
    {
      "name": "University of Turku",
      "url": "https://www.utu.fi/en"
    },
    {
      "name": "Tampere University",
      "url": "https://www.tuni.fi/en"
    },
    {
      "name": "LUT University",
      "url": "https://www.lut.fi/en"
    },
    {
      "name": "University of Oulu",
      "url": "https://www.oulu.fi/en"
    }
  ],
  "documentChecklist": {
    "undergraduate": [
      "Passport",
      "English Proficiency Test",
      "Academic transcripts and certificates",
      "Motivation Letter",
      "CV/Resume",
      "Financial proof (EUR 6,720/year)"
    ],
    "postgraduate": [
      "Passport",
      "English Proficiency Test",
      "Bachelor's degree and transcripts",
      "Motivation Letter",
      "CV/Resume",
      "Letters of Recommendation",
      "Financial proof"
    ]
  }
},
  "denmark": {
  "slug": "denmark",
  "name": "Denmark",
  "flagCode": "dk",
  "tagline": "Study in Denmark",
  "description": "Discover world-class education opportunities in Denmark.",
  "highlights": [
    "Quality Education",
    "International Community",
    "Great Lifestyle"
  ],
  "whyChoose": [
    "Globally recognized degrees",
    "Vibrant student life",
    "Excellent research facilities"
  ],
  "tuitionRange": "Varies by program",
  "livingCost": "Varies by city",
  "popularCourses": [
    "Business",
    "Engineering",
    "IT",
    "Arts"
  ],
  "workRights": "Subject to visa conditions",
  "intakes": [
    "Fall",
    "Spring"
  ],
  "visaInfo": "Student Visa required",
  "universities": [],
  "documentChecklist": {
    "undergraduate": [
      "Passport",
      "Transcripts",
      "Language Test"
    ],
    "postgraduate": [
      "Passport",
      "Bachelor's Degree",
      "Language Test",
      "SOP"
    ]
  }
},
  "hungary": {
  "slug": "hungary",
  "name": "Hungary",
  "flagCode": "hu",
  "tagline": "Study in Hungary",
  "description": "Discover world-class education opportunities in Hungary.",
  "highlights": [
    "Quality Education",
    "International Community",
    "Great Lifestyle"
  ],
  "whyChoose": [
    "Globally recognized degrees",
    "Vibrant student life",
    "Excellent research facilities"
  ],
  "tuitionRange": "Varies by program",
  "livingCost": "Varies by city",
  "popularCourses": [
    "Business",
    "Engineering",
    "IT",
    "Arts"
  ],
  "workRights": "Subject to visa conditions",
  "intakes": [
    "Fall",
    "Spring"
  ],
  "visaInfo": "Student Visa required",
  "universities": [],
  "documentChecklist": {
    "undergraduate": [
      "Passport",
      "Transcripts",
      "Language Test"
    ],
    "postgraduate": [
      "Passport",
      "Bachelor's Degree",
      "Language Test",
      "SOP"
    ]
  }
},
  "malta": {
  "slug": "malta",
  "name": "Malta",
  "flagCode": "mt",
  "tagline": "Mediterranean charm with European education standards",
  "description": "Malta offers English-medium education in a warm Mediterranean setting. As an EU member state, Malta provides access to European career opportunities while offering a relaxed island lifestyle.",
  "highlights": [
    "English-speaking country",
    "EU member state",
    "Affordable tuition",
    "Mediterranean lifestyle"
  ],
  "whyChoose": [
    "English is an official language - no language barrier",
    "EU member state with access to European opportunities",
    "Affordable tuition fees compared to other EU countries",
    "Warm Mediterranean climate year-round",
    "Small, safe, and welcoming community",
    "Strategic location for travel across Europe and North Africa"
  ],
  "tuitionRange": "EUR 5,000 - 15,000/year",
  "livingCost": "EUR 700 - 1,000/month",
  "popularCourses": [
    "Business",
    "IT",
    "Tourism",
    "Healthcare",
    "English Language",
    "Marine Biology"
  ],
  "workRights": "20 hours/week during term",
  "intakes": [
    "October (Main)",
    "February"
  ],
  "visaInfo": "Student Visa - access to Schengen area",
  "englishRequirements": [
    {
      "level": "Undergraduate",
      "ielts": "5.5-6.0",
      "toefl": "60-80"
    },
    {
      "level": "Postgraduate",
      "ielts": "6.0-6.5",
      "toefl": "80-90"
    }
  ],
  "tuitionDetails": [
    {
      "program": "Undergraduate",
      "fee": "EUR 5,000 - 10,000/year"
    },
    {
      "program": "Postgraduate",
      "fee": "EUR 7,000 - 15,000/year"
    }
  ],
  "universities": [
    {
      "name": "University of Malta",
      "url": "https://www.um.edu.mt"
    },
    {
      "name": "MCAST",
      "url": "https://www.mcast.edu.mt"
    },
    {
      "name": "Global College Malta",
      "url": "https://www.globalcollegemalta.com"
    }
  ],
  "documentChecklist": {
    "undergraduate": [
      "Passport",
      "English Proficiency Test",
      "Academic transcripts and certificates",
      "Statement of Purpose",
      "CV/Resume",
      "Financial proof"
    ],
    "postgraduate": [
      "Passport",
      "English Proficiency Test",
      "Bachelor's degree and transcripts",
      "Statement of Purpose",
      "CV/Resume",
      "Letters of Recommendation",
      "Financial proof"
    ]
  }
},
  "malaysia": {
  "slug": "malaysia",
  "name": "Malaysia",
  "flagCode": "my",
  "tagline": "Affordable excellence in a vibrant Asian hub",
  "description": "Malaysia offers high-quality education at a fraction of the cost compared to Western countries. With many UK/Australian branch campuses, students can earn internationally recognized degrees while enjoying a rich cultural experience.",
  "highlights": [
    "Very affordable tuition & living",
    "UK/Australian branch campuses",
    "English-medium instruction",
    "EMGS visa processing"
  ],
  "whyChoose": [
    "Extremely affordable tuition fees compared to Western countries",
    "UK and Australian branch campuses (Monash, Nottingham, Swinburne, etc.)",
    "English-medium instruction at most universities",
    "Multicultural society with a large Bangladeshi community",
    "MOI may be accepted - no English test needed in some cases",
    "Foundation and pathway programs available for flexible entry"
  ],
  "tuitionRange": "RM 5,000 - 60,000/year",
  "livingCost": "RM 12,000 - 18,000/year",
  "popularCourses": [
    "Business & MBA",
    "Engineering & IT",
    "Medicine (MBBS)",
    "Hospitality & Culinary Arts",
    "Health Sciences",
    "Arts & Design",
    "Education",
    "Environmental Science"
  ],
  "workRights": "20 hours/week during term",
  "intakes": [
    "January",
    "May",
    "September"
  ],
  "visaInfo": "Student Pass - issued through university via EMGS (RM 2,900 - 3,600 processing fee)",
  "englishRequirements": [
    {
      "level": "Foundation / Diploma",
      "ielts": "5.0",
      "pte": "40.8",
      "toefl": "37-50"
    },
    {
      "level": "Bachelor's",
      "ielts": "5.5",
      "pte": "45.4",
      "toefl": "51-66"
    },
    {
      "level": "Master's",
      "ielts": "6.0",
      "pte": "51.6",
      "toefl": "67-80"
    },
    {
      "level": "PhD",
      "ielts": "6.0",
      "pte": "51.6",
      "toefl": "67-80"
    }
  ],
  "tuitionDetails": [
    {
      "program": "Foundation",
      "fee": "RM 5,000 - 25,000"
    },
    {
      "program": "Diploma",
      "fee": "RM 5,000 - 25,000"
    },
    {
      "program": "Bachelor's (Public)",
      "fee": "RM 7,000 - 20,000/year"
    },
    {
      "program": "Bachelor's (Private)",
      "fee": "RM 15,000 - 50,000/year"
    },
    {
      "program": "Master's (Public)",
      "fee": "RM 11,000 - 30,000/year"
    },
    {
      "program": "Master's (Private)",
      "fee": "RM 25,000 - 60,000/year"
    }
  ],
  "partnerInstitutions": [
    {
      "name": "Monash University Malaysia",
      "category": "Branch Campus",
      "url": "https://www.monash.edu.my"
    },
    {
      "name": "University of Nottingham Malaysia",
      "category": "Branch Campus",
      "url": "https://www.nottingham.edu.my"
    },
    {
      "name": "Heriot-Watt University Malaysia",
      "category": "Branch Campus",
      "url": "https://www.hw.ac.uk/malaysia"
    },
    {
      "name": "University of Southampton Malaysia",
      "category": "Branch Campus",
      "url": "https://www.southampton.ac.uk/my"
    },
    {
      "name": "Swinburne University of Technology Sarawak",
      "category": "Branch Campus",
      "url": "https://www.swinburne.edu.my"
    },
    {
      "name": "Taylor's University",
      "category": "Private University",
      "url": "https://university.taylors.edu.my"
    },
    {
      "name": "UCSI University",
      "category": "Private University",
      "url": "https://www.ucsiuniversity.edu.my"
    },
    {
      "name": "Asia Pacific University (APU)",
      "category": "Private University",
      "url": "https://www.apu.edu.my"
    },
    {
      "name": "MAHSA University",
      "category": "Private University",
      "url": "https://www.mahsa.edu.my"
    },
    {
      "name": "SEGi University",
      "category": "Private University",
      "url": "https://www.segi.edu.my"
    },
    {
      "name": "Multimedia University (MMU)",
      "category": "Private University",
      "url": "https://www.mmu.edu.my"
    },
    {
      "name": "INTI International University",
      "category": "Private University",
      "url": "https://newinti.edu.my"
    },
    {
      "name": "Management & Science University (MSU)",
      "category": "Private University",
      "url": "https://www.msu.edu.my"
    },
    {
      "name": "Universiti Malaya",
      "category": "Public University",
      "rank": "Top 60",
      "url": "https://www.um.edu.my"
    },
    {
      "name": "Universiti Putra Malaysia (UPM)",
      "category": "Public University",
      "url": "https://www.upm.edu.my"
    },
    {
      "name": "Universiti Teknologi Malaysia (UTM)",
      "category": "Public University",
      "url": "https://www.utm.my"
    },
    {
      "name": "International Islamic University Malaysia",
      "category": "Public University",
      "url": "https://www.iium.edu.my"
    },
    {
      "name": "Lincoln University College",
      "category": "Private University",
      "url": "https://www.lincoln.edu.my"
    },
    {
      "name": "Raffles University",
      "category": "Private University",
      "url": "https://raffles-university.edu.my"
    },
    {
      "name": "UTAR (Universiti Tunku Abdul Rahman)",
      "category": "Private University",
      "url": "https://www.utar.edu.my"
    }
  ],
  "universities": [
    {
      "name": "University of Malaya",
      "rank": "Top 60",
      "url": "https://www.um.edu.my"
    },
    {
      "name": "Taylor's University",
      "rank": "Top 300",
      "url": "https://university.taylors.edu.my"
    },
    {
      "name": "Monash University Malaysia",
      "url": "https://www.monash.edu.my"
    },
    {
      "name": "UCSI University",
      "url": "https://www.ucsiuniversity.edu.my"
    },
    {
      "name": "Asia Pacific University",
      "url": "https://www.apu.edu.my"
    },
    {
      "name": "University of Nottingham Malaysia",
      "url": "https://www.nottingham.edu.my"
    }
  ],
  "documentChecklist": {
    "undergraduate": [
      "Passport (Full Passport Scan Copy)",
      "English Proficiency Test (IELTS/TOEFL/PTE)",
      "SSC & HSC / O-Level & A-Level Transcript and Certificate (Main Copy)",
      "Statement of Purpose (SOP)",
      "Updated CV (educational information in MM/YY format)",
      "GAP Evidence (If Any)",
      "Work Experience Certificate (If Any)",
      "Formal Photo (35mm x 50mm)"
    ],
    "postgraduate": [
      "Passport (Full Passport Scan Copy)",
      "English Proficiency Test (IELTS/TOEFL/PTE/MOI)",
      "Bachelor, SSC & HSC / O-Level & A-Level Transcript and Certificate (Main Copy)",
      "Statement of Purpose (SOP)",
      "Updated CV (educational information in MM/YY format)",
      "GAP Evidence (If Any)",
      "Work Experience Certificate (If Any)",
      "Formal Photo (35mm x 50mm)"
    ]
  },
  "specialNotes": [
    "English Preparatory / Intensive English Programs available if you don't meet requirements",
    "EMGS processing fee: RM 2,900 - 3,600",
    "All documents must have exactly matching name spelling across documents",
    "MOI (Medium of Instruction) accepted at some universities"
  ]
},
  "china": {
  "slug": "china",
  "name": "China",
  "flagCode": "cn",
  "tagline": "Study in China",
  "description": "Discover world-class education opportunities in China.",
  "highlights": [
    "Quality Education",
    "International Community",
    "Great Lifestyle"
  ],
  "whyChoose": [
    "Globally recognized degrees",
    "Vibrant student life",
    "Excellent research facilities"
  ],
  "tuitionRange": "Varies by program",
  "livingCost": "Varies by city",
  "popularCourses": [
    "Business",
    "Engineering",
    "IT",
    "Arts"
  ],
  "workRights": "Subject to visa conditions",
  "intakes": [
    "Fall",
    "Spring"
  ],
  "visaInfo": "Student Visa required",
  "universities": [],
  "documentChecklist": {
    "undergraduate": [
      "Passport",
      "Transcripts",
      "Language Test"
    ],
    "postgraduate": [
      "Passport",
      "Bachelor's Degree",
      "Language Test",
      "SOP"
    ]
  }
},
};
