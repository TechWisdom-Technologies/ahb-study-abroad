--
-- PostgreSQL database dump
--

\restrict W5QDn1aMyDai6afg1BP0ECatJfwHFbO0GZGpK7AohHOnAatFXRG8Q5tYtHY4fgj

-- Dumped from database version 17.10
-- Dumped by pg_dump version 17.10

-- Started on 2026-07-31 16:35:39

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 855 (class 1247 OID 28541)
-- Name: AppRole; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."AppRole" AS ENUM (
    'ADMIN',
    'USER'
);


ALTER TYPE public."AppRole" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 28614)
-- Name: announcements; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.announcements (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    text text NOT NULL,
    link_url text,
    link_text text,
    is_active boolean DEFAULT true NOT NULL,
    sort_order integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.announcements OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 28545)
-- Name: countries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.countries (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    flag_code text NOT NULL,
    description text,
    is_active boolean DEFAULT true NOT NULL,
    sort_order integer DEFAULT 1 NOT NULL,
    flag_image_url text,
    university_count integer DEFAULT 0 NOT NULL,
    expense_range text,
    special_feature text,
    tagline text,
    hero_image_url text,
    card_image_url text,
    living_cost text,
    work_rights text,
    visa_info text,
    highlights jsonb DEFAULT '[]'::jsonb NOT NULL,
    "whyChoose" jsonb DEFAULT '[]'::jsonb NOT NULL,
    "popularCourses" jsonb DEFAULT '[]'::jsonb NOT NULL,
    intakes jsonb DEFAULT '[]'::jsonb NOT NULL,
    english_requirements jsonb DEFAULT '[]'::jsonb NOT NULL,
    tuition_details jsonb DEFAULT '[]'::jsonb NOT NULL,
    document_checklist jsonb DEFAULT '{}'::jsonb NOT NULL,
    special_notes jsonb DEFAULT '[]'::jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.countries OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 28579)
-- Name: english_tests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.english_tests (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    description text,
    test_type text DEFAULT 'exam'::text NOT NULL,
    fee text,
    duration text,
    is_active boolean DEFAULT true NOT NULL,
    image_url text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.english_tests OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 28626)
-- Name: leads; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.leads (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    destination text,
    course text,
    status text DEFAULT 'new'::text NOT NULL,
    notes text,
    lead_type text DEFAULT 'general'::text NOT NULL,
    details jsonb,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.leads OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 28591)
-- Name: scholarships; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.scholarships (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    description text,
    country_id uuid,
    university_id uuid,
    amount text,
    deadline text,
    eligibility text,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.scholarships OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 28602)
-- Name: testimonials; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.testimonials (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    university text,
    country text,
    flag_code text,
    quote text,
    image_url text,
    media_type text DEFAULT 'text'::text NOT NULL,
    media_url text,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.testimonials OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 28566)
-- Name: universities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.universities (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    country_id uuid NOT NULL,
    tuition_fee_range text,
    scholarship_available boolean DEFAULT false NOT NULL,
    requirements text,
    logo_url text,
    website_url text,
    is_partner boolean DEFAULT false NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.universities OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 28648)
-- Name: user_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_roles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    role public."AppRole" NOT NULL
);


ALTER TABLE public.user_roles OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 28638)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 28654)
-- Name: visa_approvals; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.visa_approvals (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    student_name text NOT NULL,
    country text NOT NULL,
    visa_type text DEFAULT ''::text,
    is_active boolean DEFAULT true NOT NULL,
    sort_order integer DEFAULT 0 NOT NULL,
    flag_url text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.visa_approvals OWNER TO postgres;

--
-- TOC entry 5011 (class 0 OID 28614)
-- Dependencies: 222
-- Data for Name: announcements; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5006 (class 0 OID 28545)
-- Dependencies: 217
-- Data for Name: countries; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.countries VALUES ('05c1cca6-8a65-4037-9958-ff6df037b574', 'Canada', 'ca', 'Canada is one of the most popular destinations for international students, offering high-quality education, a safe multicultural environment, and excellent post-graduation work and immigration opportunities.', true, 2, NULL, 25, 'CAD 7,000 - 60,000/year', NULL, 'Quality education with immigration-friendly policies', NULL, NULL, 'CAD 10,000 - 15,000/year', '20 hours/week during studies, full-time during scheduled breaks', 'Study Permit - PGWP up to 3 years, pathway to PR', '["3-year post-graduation work permit", "Pathway to permanent residency", "Affordable tuition", "Safe & multicultural"]', '["World-class universities and colleges with globally recognized degrees", "Affordable tuition fees compared to other Western countries", "Diverse and inclusive multicultural society", "Safe, peaceful, and student-friendly environment", "Strong post-graduation work opportunities (PGWP up to 3 years)", "Pathway to permanent residency and immigration", "Wide range of scholarship programs", "Innovative research and advanced technology facilities", "Beautiful natural landscapes and vibrant cities"]', '["Computer Science & IT", "Engineering", "Business & MBA", "Health Sciences & Nursing", "Hospitality & Tourism", "Social Sciences", "Law & Legal Studies", "Education & Teaching"]', '["September (Fall)", "January (Winter)", "May (Summer)"]', '[{"pte": "55-58", "ielts": "6.0/5.5", "level": "Bachelor/Diploma", "toefl": "80-88", "duolingo": "95-105"}, {"pte": "60-65+", "ielts": "6.5/5.5", "level": "Master''s", "toefl": "90-100", "duolingo": "115-125+"}]', '[{"fee": "CAD 7,000 - 20,000", "program": "Diploma / Certificate (Colleges)"}, {"fee": "CAD 15,000 - 35,000", "program": "Bachelor''s Degree (Universities)"}, {"fee": "CAD 18,000 - 40,000", "program": "Master''s Degree"}, {"fee": "CAD 30,000 - 60,000", "program": "MBA Programs"}]', '{"postgraduate": ["Passport (Front & Last page)", "English Proficiency Test (MOI/DET/IELTS/TOEFL/PTE)", "SSC & HSC Transcript and Certificate", "Bachelor Certificate and Transcript", "Letter of Recommendation - 2 copies from 2 different teachers", "Statement of Purpose (SOP)", "Updated CV (educational information in MM/YY format)", "Work Experience Certificate (If Any)", "GAP Evidence (If Any)"], "undergraduate": ["Passport (Front & Last page)", "English Proficiency Test (DET/IELTS/TOEFL/PTE)", "SSC & HSC Transcript and Certificate", "Letter of Recommendation - 1 copy (on letterpad with Teacher''s details and Seal)", "Statement of Purpose (SOP)", "Updated CV (educational information in MM/YY format)", "GAP Evidence (If Any)", "Work Experience Certificate (If Any)"]}', '[]', '2026-07-21 15:42:49.426+06', '2026-07-30 19:24:28.847+06');
INSERT INTO public.countries VALUES ('29b10031-6e4a-4838-9522-d17bc7dc83b0', 'Australia', 'au', 'Australia boasts 7 of the world''s top 100 universities and offers a relaxed yet academically rigorous environment. With post-study work rights up to 5 years and a high quality of life, it''s a top choice for ambitious students.', true, 4, NULL, 30, 'AUD 4,000 - 70,000+/year', NULL, 'Innovation-driven education in a stunning environment', NULL, NULL, 'AUD 21,000 - 27,000/year', '48 hours/fortnight during studies, unlimited during breaks', 'Student Visa (Subclass 500) - Post-study work visa (Subclass 485) up to 5 years', '["Post-study work visa (up to 5 years)", "50+ partner institutions", "Top 15 QS-ranked universities", "Lucrative scholarships available"]', '["World-class education system with globally recognized degrees", "Wide range of study options across all disciplines", "Cutting-edge research opportunities and innovation", "Multicultural environment with a large Bangladeshi community", "Scholarships and financial support for international students", "Pathways to permanent residency for eligible graduates", "Geographically closer to Bangladesh than US/UK"]', '["Business & MBA", "IT & Computer Science", "Engineering", "Nursing & Health Sciences", "Hospitality & Tourism", "Education & Teaching", "Agricultural & Environmental Sciences", "Creative Arts & Design"]', '["February (Main)", "July"]', '[{"pte": "42-49", "ielts": "5.5/5.0", "level": "Foundation / VET", "toefl": "46-59"}, {"pte": "50", "ielts": "6.0/5.5", "level": "Undergraduate", "toefl": "60-78"}, {"pte": "58", "ielts": "6.5/6.0", "level": "Postgraduate", "toefl": "79-93"}, {"pte": "62+", "ielts": "6.5-7.0/6.0", "level": "Research (PhD)", "toefl": "90+"}, {"pte": "65+", "ielts": "7.0 Overall", "level": "Nursing / Health / Teaching", "toefl": "94-100"}, {"pte": "73+", "ielts": "7.0-7.5/7.0", "level": "Medicine / Dentistry", "toefl": "100+"}]', '[{"fee": "AUD 4,000 - 22,000", "program": "VET (Vocational Education)"}, {"fee": "AUD 20,000 - 45,000", "program": "Undergraduate (Bachelor''s)"}, {"fee": "AUD 22,000 - 50,000", "program": "Postgraduate (Master''s)"}, {"fee": "AUD 20,000 - 42,000", "program": "Doctoral (PhD / Research)"}, {"fee": "AUD 50,000 - 70,000+", "program": "Medicine / Dentistry"}, {"fee": "AUD 45,000 - 65,000", "program": "MBA (Top Ranked)"}]', '{"postgraduate": ["Passport (Information Page)", "English Proficiency Test Certificate (IELTS/TOEFL/PTE)", "SSC & HSC / O-Level & A-Level Transcript and Certificate", "Bachelor Certificate and Transcript", "Letter of Recommendation - 2 copies from 2 different teachers", "Statement of Purpose (SOP)", "Updated CV (educational information in MM/YY format)", "Work Experience Certificate (If Any)", "GAP Evidence (If Any)"], "undergraduate": ["Passport (Information Page)", "English Proficiency Test Certificate (IELTS/TOEFL/PTE)", "SSC & HSC / O-Level & A-Level Transcript and Certificate", "Letter of Recommendation - 1 copy (on letterpad with Teacher''s details and Seal)", "Statement of Purpose (SOP)", "Updated CV (educational information in MM/YY format)", "GAP Evidence (If Any)", "Work Experience Certificate (If Any)"]}', '["Free admission services with 18+ years of education", "50+ partner institutions across Australia", "Academic and English Language Pathways available", "Flexible entry requirements at several universities"]', '2026-07-21 15:42:49.542+06', '2026-07-30 19:24:28.815+06');
INSERT INTO public.countries VALUES ('7eb12b40-f7f6-4d04-9558-767b27684400', 'New Zealand', 'nz', 'New Zealand offers an excellent education system recognized worldwide, combined with stunning natural beauty and a welcoming culture. It''s perfect for students seeking quality education in a safe, peaceful environment.', true, 6, NULL, 36, 'NZD 22,000 - 35,000/year', NULL, 'World-renowned education in a breathtaking setting', NULL, NULL, 'NZD 15,000 - 20,000/year', '20 hours/week during term, full-time during holidays', 'Student Visa - Post-study work visa up to 3 years', '["3-year post-study work visa", "Scholarships up to NZD 20,000", "MOI accepted at top universities", "Courses under NZD 30,000"]', '["Globally recognized degrees from top-ranked institutions", "Post-study work visa up to 3 years", "Scholarships available up to NZD 20,000 at multiple institutions", "Several universities accept MOI (no English test required)", "Safe, peaceful environment with stunning natural beauty", "Quick offer letters - within 2 weeks at many institutions"]', '["Agriculture", "Environmental Science", "IT", "Business", "Tourism & Hospitality", "Engineering"]', '["February (Main)", "July"]', '[{"pte": "50/42", "ielts": "6.0/5.5", "level": "Undergraduate"}, {"pte": "58/50", "ielts": "6.5/5.5", "level": "Postgraduate"}]', '[]', '{"postgraduate": ["Passport (Front & Last page)", "English Proficiency Test (MOI/OIETC/DET/IELTS/TOEFL/PTE)", "SSC & HSC / O-Level & A-Level Transcript and Certificate", "Bachelor Certificate and Transcript", "Letter of Recommendation - 2 copies from 2 different teachers", "Statement of Purpose (SOP)", "Updated CV (educational information in MM/YY format)", "Work Experience Certificate (If Any)", "GAP Evidence (If Any)"], "undergraduate": ["Passport (Front & Last page)", "English Proficiency Test (OIETC/DET/IELTS/TOEFL/PTE)", "SSC & HSC / O-Level & A-Level Transcript and Certificate", "Letter of Recommendation - 1 copy (on letterpad with Teacher''s details and Seal)", "Statement of Purpose (SOP)", "Updated CV (educational information in MM/YY format)", "GAP Evidence (If Any)", "Work Experience Certificate (If Any)"]}', '["MOI accepted at University of Auckland, Massey, Lincoln, and AUT", "Quick offer letters within 2 weeks for Master''s courses", "Several institutions offer courses under NZD 30,000"]', '2026-07-21 15:42:49.658+06', '2026-07-30 19:24:28.671+06');
INSERT INTO public.countries VALUES ('cc2aa77a-fcc0-4763-ad10-8057435a7b3d', 'South Korea', 'kr', 'South Korea is rapidly becoming a top education destination with globally ranked universities, generous scholarships, and a thriving tech industry. Experience cutting-edge education in one of Asia''s most dynamic countries.', true, 10, NULL, 2, 'KRW 4,000,000 - 8,000,000/year', NULL, 'K-innovation meets world-class academia', NULL, NULL, 'KRW 6,000,000 - 10,000,000/year', '20 hours/week during term', 'D-2 Student Visa - part-time work allowed after 6 months', '["Generous government scholarships (GKS)", "Tech & innovation hub", "Affordable living", "Rich cultural experience"]', '["World-class universities with strong global rankings", "Korean Government Scholarship (GKS) covers tuition + living", "Thriving tech industry with internship opportunities", "Affordable cost of living compared to Western countries", "Rich cultural experience blending tradition and modernity", "Growing demand for bilingual professionals globally"]', '["Engineering", "IT & AI", "Korean Studies", "Business", "Design", "Biotechnology"]', '["March (Spring)", "September (Fall)"]', '[{"pte": "50-58", "ielts": "5.5-6.0", "level": "Undergraduate", "toefl": "60-80"}, {"pte": "58-65", "ielts": "6.0-6.5", "level": "Postgraduate", "toefl": "80-90"}]', '[{"fee": "KRW 2,500,000 - 5,000,000", "program": "Undergraduate (Public)"}, {"fee": "KRW 5,000,000 - 10,000,000", "program": "Undergraduate (Private)"}, {"fee": "KRW 4,000,000 - 8,000,000", "program": "Postgraduate"}]', '{"postgraduate": ["Passport", "English Proficiency Test or TOPIK score", "Bachelor''s degree certificate and transcripts", "Letters of Recommendation - 2 copies", "Research proposal (for research programs)", "Statement of Purpose (SOP)", "Updated CV"], "undergraduate": ["Passport", "English Proficiency Test (IELTS/TOEFL/PTE)", "Academic transcripts and certificates", "Letter of Recommendation", "Statement of Purpose (SOP)", "Updated CV", "Financial proof"]}', '[]', '2026-07-21 15:42:49.818+06', '2026-07-30 19:24:28.549+06');
INSERT INTO public.countries VALUES ('6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', 'United Kingdom', 'gb', 'The UK is home to some of the world''s oldest and most prestigious universities. With shorter degree programs and globally recognized qualifications, studying in the UK offers exceptional value and career prospects.', true, 0, NULL, 110, '£10,000 - £38,000/year', NULL, 'World-class education with centuries of academic excellence', NULL, NULL, '£9,000 - £15,000/year', '20 hours/week during term, full-time during holidays', 'Student Visa (formerly Tier 4) - 2-year post-study Graduate Route visa available', '["1-year Master''s programs", "Post-study work visa (2 years)", "Duolingo & OIETC accepted", "No Pre-CAS interview at many universities"]', '["Globally recognized degrees from centuries-old institutions", "Shorter degree programs - 3 years for Bachelor''s, 1 year for Master''s", "2-year post-study Graduate Route work visa", "Many universities accept Duolingo and OIETC scores", "MOI (Medium of Instruction) accepted at several universities", "Quick offer turnaround - some universities respond within 24-48 hours"]', '["Business & Management", "Engineering", "Computer Science", "Law", "Medicine", "Arts & Design"]', '["September (Main)", "January", "May (Limited)"]', '[{"pte": "-", "ielts": "5.0/4.5", "level": "Foundation (UKVI)", "oietc": "-", "duolingo": "-"}, {"pte": "58/50", "ielts": "6.0/5.5", "level": "Undergraduate", "oietc": "6.0/5.0", "duolingo": "105/95"}, {"pte": "62/50", "ielts": "6.0/5.5 or 6.5/5.5", "level": "Postgraduate", "oietc": "6.0/5.0 or 7.0/6.0", "duolingo": "115/100"}]', '[{"fee": "£8,000 - £15,000", "program": "Foundation"}, {"fee": "£10,000 - £25,000", "program": "Undergraduate (Bachelor''s)"}, {"fee": "£12,000 - £38,000", "program": "Postgraduate (Master''s)"}, {"fee": "£15,000 - £45,000+", "program": "MBA Programs"}]', '{"postgraduate": ["Passport (Front & Last page)", "English Proficiency Test (MOI/OIETC/DET/IELTS/TOEFL/PTE)", "SSC & HSC / O-Level & A-Level Transcript and Certificate", "Bachelor Certificate and Transcript (Completion Letter for Provisional Certificate)", "Letter of Recommendation - 2 copies from 2 different teachers", "Statement of Purpose (SOP)", "Updated CV (educational information in MM/YY format)", "Work Experience Certificate (If Any)", "GAP Evidence (If Any)"], "undergraduate": ["Passport (Front & Last page)", "English Proficiency Test (OIETC/DET/IELTS/TOEFL/PTE)", "SSC & HSC / O-Level & A-Level Transcript and Certificate", "Letter of Recommendation - 1 copy (on letterpad with Teacher''s Name, Email, Contact Details and Seal)", "Statement of Purpose (SOP)", "Updated CV (educational information in MM/YY format)", "GAP Evidence (If Any)", "Work Experience Certificate (If Any)"]}', '["Many UK universities accept MOI (Medium of Instruction) - no English test needed", "Duolingo accepted at 16+ partner universities", "Several universities offer No Pre-CAS Interview", "Quick offers available - some as fast as 24-48 hours"]', '2026-07-21 15:42:49.26+06', '2026-07-30 19:24:28.526+06');
INSERT INTO public.countries VALUES ('2ec270de-1dba-46de-9f1a-5b4ed6821b82', 'Ireland', 'ie', 'Study in Ireland with AHB Study Abroad. Full admission and visa guidance available.', true, 22, NULL, 20, NULL, NULL, 'Top study destination: Ireland', NULL, NULL, NULL, NULL, NULL, '[]', '[]', '[]', '[]', '[]', '[]', '{}', '[]', '2026-07-30 19:24:28.329+06', '2026-07-30 19:24:28.391+06');
INSERT INTO public.countries VALUES ('13d00a8e-8e15-4bf3-8f17-5e147bf730a0', 'Hungary', 'hu', 'Study in Hungary with AHB Study Abroad. Full admission and visa guidance available.', true, 26, NULL, 5, NULL, NULL, 'Top study destination: Hungary', NULL, NULL, NULL, NULL, NULL, '[]', '[]', '[]', '[]', '[]', '[]', '{}', '[]', '2026-07-30 19:24:28.551+06', '2026-07-30 19:24:28.562+06');
INSERT INTO public.countries VALUES ('cec2081b-fe14-4a9d-8c71-c70649b0a518', 'Malta', 'mt', 'Malta offers English-medium education in a warm Mediterranean setting. As an EU member state, Malta provides access to European career opportunities while offering a relaxed island lifestyle.', true, 16, NULL, 9, 'EUR 5,000 - 15,000/year', NULL, 'Mediterranean charm with European education standards', NULL, NULL, 'EUR 700 - 1,000/month', '20 hours/week during term', 'Student Visa - access to Schengen area', '["English-speaking country", "EU member state", "Affordable tuition", "Mediterranean lifestyle"]', '["English is an official language - no language barrier", "EU member state with access to European opportunities", "Affordable tuition fees compared to other EU countries", "Warm Mediterranean climate year-round", "Small, safe, and welcoming community", "Strategic location for travel across Europe and North Africa"]', '["Business", "IT", "Tourism", "Healthcare", "English Language", "Marine Biology"]', '["October (Main)", "February"]', '[{"ielts": "5.5-6.0", "level": "Undergraduate", "toefl": "60-80"}, {"ielts": "6.0-6.5", "level": "Postgraduate", "toefl": "80-90"}]', '[{"fee": "EUR 5,000 - 10,000/year", "program": "Undergraduate"}, {"fee": "EUR 7,000 - 15,000/year", "program": "Postgraduate"}]', '{"postgraduate": ["Passport", "English Proficiency Test", "Bachelor''s degree and transcripts", "Statement of Purpose", "CV/Resume", "Letters of Recommendation", "Financial proof"], "undergraduate": ["Passport", "English Proficiency Test", "Academic transcripts and certificates", "Statement of Purpose", "CV/Resume", "Financial proof"]}', '[]', '2026-07-21 15:42:49.901+06', '2026-07-30 19:24:28.542+06');
INSERT INTO public.countries VALUES ('12ffe705-8a43-4c7a-9a0a-c14025d330ac', 'Malaysia', 'my', 'Malaysia offers high-quality education at a fraction of the cost compared to Western countries. With many UK/Australian branch campuses, students can earn internationally recognized degrees while enjoying a rich cultural experience.', true, 8, NULL, 12, 'RM 5,000 - 60,000/year', NULL, 'Affordable excellence in a vibrant Asian hub', NULL, NULL, 'RM 12,000 - 18,000/year', '20 hours/week during term', 'Student Pass - issued through university via EMGS (RM 2,900 - 3,600 processing fee)', '["Very affordable tuition & living", "UK/Australian branch campuses", "English-medium instruction", "EMGS visa processing"]', '["Extremely affordable tuition fees compared to Western countries", "UK and Australian branch campuses (Monash, Nottingham, Swinburne, etc.)", "English-medium instruction at most universities", "Multicultural society with a large Bangladeshi community", "MOI may be accepted - no English test needed in some cases", "Foundation and pathway programs available for flexible entry"]', '["Business & MBA", "Engineering & IT", "Medicine (MBBS)", "Hospitality & Culinary Arts", "Health Sciences", "Arts & Design", "Education", "Environmental Science"]', '["January", "May", "September"]', '[{"pte": "40.8", "ielts": "5.0", "level": "Foundation / Diploma", "toefl": "37-50"}, {"pte": "45.4", "ielts": "5.5", "level": "Bachelor''s", "toefl": "51-66"}, {"pte": "51.6", "ielts": "6.0", "level": "Master''s", "toefl": "67-80"}, {"pte": "51.6", "ielts": "6.0", "level": "PhD", "toefl": "67-80"}]', '[{"fee": "RM 5,000 - 25,000", "program": "Foundation"}, {"fee": "RM 5,000 - 25,000", "program": "Diploma"}, {"fee": "RM 7,000 - 20,000/year", "program": "Bachelor''s (Public)"}, {"fee": "RM 15,000 - 50,000/year", "program": "Bachelor''s (Private)"}, {"fee": "RM 11,000 - 30,000/year", "program": "Master''s (Public)"}, {"fee": "RM 25,000 - 60,000/year", "program": "Master''s (Private)"}]', '{"postgraduate": ["Passport (Full Passport Scan Copy)", "English Proficiency Test (IELTS/TOEFL/PTE/MOI)", "Bachelor, SSC & HSC / O-Level & A-Level Transcript and Certificate (Main Copy)", "Statement of Purpose (SOP)", "Updated CV (educational information in MM/YY format)", "GAP Evidence (If Any)", "Work Experience Certificate (If Any)", "Formal Photo (35mm x 50mm)"], "undergraduate": ["Passport (Full Passport Scan Copy)", "English Proficiency Test (IELTS/TOEFL/PTE)", "SSC & HSC / O-Level & A-Level Transcript and Certificate (Main Copy)", "Statement of Purpose (SOP)", "Updated CV (educational information in MM/YY format)", "GAP Evidence (If Any)", "Work Experience Certificate (If Any)", "Formal Photo (35mm x 50mm)"]}', '["English Preparatory / Intensive English Programs available if you don''t meet requirements", "EMGS processing fee: RM 2,900 - 3,600", "All documents must have exactly matching name spelling across documents", "MOI (Medium of Instruction) accepted at some universities"]', '2026-07-21 15:42:49.725+06', '2026-07-30 19:24:28.767+06');
INSERT INTO public.countries VALUES ('bf9714fa-a14b-49ba-b92b-25c21e462b87', 'Finland', 'fi', 'Finland is renowned for having one of the best education systems in the world. With a focus on innovation, research, and sustainability, Finnish universities offer cutting-edge programs in a safe Nordic environment.', true, 20, NULL, 7, 'EUR 6,000 - 18,000/year', NULL, 'World''s best education system meets Nordic innovation', NULL, NULL, 'EUR 700 - 1,100/month', 'Unlimited during term if related to studies', 'Residence Permit for Studies - renewable annually', '["Top-ranked education system", "Innovation & sustainability focus", "Safe Nordic society", "Northern Lights & nature"]', '["Consistently ranked #1 education system in the world", "Strong focus on innovation, sustainability, and research", "Safe, clean, and well-organized Nordic society", "High quality of life with excellent public services", "Growing tech startup ecosystem (home of Nokia, Supercell)", "Unique cultural experience with Northern Lights"]', '["IT & Technology", "Environmental Science", "Business", "Design", "Engineering", "Education"]', '["August/September (Main)", "January"]', '[{"pte": "54", "ielts": "6.0", "level": "Undergraduate", "toefl": "80"}, {"pte": "62", "ielts": "6.5", "level": "Postgraduate", "toefl": "90"}]', '[{"fee": "EUR 6,000 - 12,000/year", "program": "Undergraduate (UAS)"}, {"fee": "EUR 8,000 - 15,000/year", "program": "Undergraduate (University)"}, {"fee": "EUR 10,000 - 18,000/year", "program": "Postgraduate"}]', '{"postgraduate": ["Passport", "English Proficiency Test", "Bachelor''s degree and transcripts", "Motivation Letter", "CV/Resume", "Letters of Recommendation", "Financial proof"], "undergraduate": ["Passport", "English Proficiency Test", "Academic transcripts and certificates", "Motivation Letter", "CV/Resume", "Financial proof (EUR 6,720/year)"]}', '[]', '2026-07-21 15:42:49.935+06', '2026-07-30 19:24:28.581+06');
INSERT INTO public.countries VALUES ('d5b809a2-82f5-460f-b413-e0c009bda29e', 'Denmark', 'dk', 'Study in Denmark with AHB Study Abroad. Full admission and visa guidance available.', true, 28, NULL, 2, NULL, NULL, 'Top study destination: Denmark', NULL, NULL, NULL, NULL, NULL, '[]', '[]', '[]', '[]', '[]', '[]', '{}', '[]', '2026-07-30 19:24:28.582+06', '2026-07-30 19:24:28.588+06');
INSERT INTO public.countries VALUES ('7ec32596-d89c-4d2d-a28a-8c034ba1154d', 'Germany', 'de', 'Study in Germany with AHB Study Abroad. Full admission and visa guidance available.', true, 29, NULL, 24, NULL, NULL, 'Top study destination: Germany', NULL, NULL, NULL, NULL, NULL, '[]', '[]', '[]', '[]', '[]', '[]', '{}', '[]', '2026-07-30 19:24:28.59+06', '2026-07-30 19:24:28.623+06');
INSERT INTO public.countries VALUES ('33bbe9a8-eb95-4125-b388-78f27631ca50', 'France', 'fr', 'Study in France with AHB Study Abroad. Full admission and visa guidance available.', true, 31, NULL, 18, NULL, NULL, 'Top study destination: France', NULL, NULL, NULL, NULL, NULL, '[]', '[]', '[]', '[]', '[]', '[]', '{}', '[]', '2026-07-30 19:24:28.672+06', '2026-07-30 19:24:28.696+06');
INSERT INTO public.countries VALUES ('3eb390ed-d659-4445-8bde-47131bab30f6', 'Sweden', 'se', 'Study in Sweden with AHB Study Abroad. Full admission and visa guidance available.', true, 32, NULL, 5, NULL, NULL, 'Top study destination: Sweden', NULL, NULL, NULL, NULL, NULL, '[]', '[]', '[]', '[]', '[]', '[]', '{}', '[]', '2026-07-30 19:24:28.698+06', '2026-07-30 19:24:28.708+06');
INSERT INTO public.countries VALUES ('6a43b800-c1b7-4f34-9082-38011da84e5a', 'China', 'cn', 'Study in China with AHB Study Abroad. Full admission and visa guidance available.', true, 33, NULL, 25, NULL, NULL, 'Top study destination: China', NULL, NULL, NULL, NULL, NULL, '[]', '[]', '[]', '[]', '[]', '[]', '{}', '[]', '2026-07-30 19:24:28.71+06', '2026-07-30 19:24:28.744+06');
INSERT INTO public.countries VALUES ('067b5f25-c228-45bf-acd5-6d9afb8a7ef7', 'Belgium', 'be', 'Study in Belgium with AHB Study Abroad. Full admission and visa guidance available.', true, 35, NULL, 2, NULL, NULL, 'Top study destination: Belgium', NULL, NULL, NULL, NULL, NULL, '[]', '[]', '[]', '[]', '[]', '[]', '{}', '[]', '2026-07-30 19:24:28.768+06', '2026-07-30 19:24:28.774+06');
INSERT INTO public.countries VALUES ('880db315-ecff-4e91-9c91-bd346c013dcf', 'United States', 'us', 'Study in United States with AHB Study Abroad. Full admission and visa guidance available.', true, 38, NULL, 29, NULL, NULL, 'Top study destination: United States', NULL, NULL, NULL, NULL, NULL, '[]', '[]', '[]', '[]', '[]', '[]', '{}', '[]', '2026-07-30 19:24:28.848+06', '2026-07-30 19:24:28.88+06');


--
-- TOC entry 5008 (class 0 OID 28579)
-- Dependencies: 219
-- Data for Name: english_tests; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5012 (class 0 OID 28626)
-- Dependencies: 223
-- Data for Name: leads; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5009 (class 0 OID 28591)
-- Dependencies: 220
-- Data for Name: scholarships; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5010 (class 0 OID 28602)
-- Dependencies: 221
-- Data for Name: testimonials; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5007 (class 0 OID 28566)
-- Dependencies: 218
-- Data for Name: universities; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.universities VALUES ('04ebfe65-81cc-4532-97d1-9a86f100277b', 'Trinity College Dublin, Dublin', '2ec270de-1dba-46de-9f1a-5b4ed6821b82', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.335+06', '2026-07-30 19:24:28.335+06');
INSERT INTO public.universities VALUES ('93d6e29f-2e36-4813-b1e0-2b71996dd67d', 'University College Dublin, Dublin', '2ec270de-1dba-46de-9f1a-5b4ed6821b82', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.338+06', '2026-07-30 19:24:28.338+06');
INSERT INTO public.universities VALUES ('6e867bd9-a02c-443d-b39d-59f00a07b763', '(Study Group) - University College Dublin Pathways', '2ec270de-1dba-46de-9f1a-5b4ed6821b82', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.341+06', '2026-07-30 19:24:28.341+06');
INSERT INTO public.universities VALUES ('94ee26af-7f3c-481b-a068-f192416e67e7', 'University of Galway, Galway', '2ec270de-1dba-46de-9f1a-5b4ed6821b82', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.344+06', '2026-07-30 19:24:28.344+06');
INSERT INTO public.universities VALUES ('82365d57-80c4-4f94-a555-df45f54ae38b', 'University College Cork, Cork', '2ec270de-1dba-46de-9f1a-5b4ed6821b82', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.346+06', '2026-07-30 19:24:28.346+06');
INSERT INTO public.universities VALUES ('9ca82ef1-8192-45c2-847c-fdb1ecf309da', 'University of Limerick, Limerick', '2ec270de-1dba-46de-9f1a-5b4ed6821b82', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.348+06', '2026-07-30 19:24:28.348+06');
INSERT INTO public.universities VALUES ('81c3857a-c35b-4214-8d2c-9cbc95c14152', 'Dublin City University, Dublin', '2ec270de-1dba-46de-9f1a-5b4ed6821b82', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.351+06', '2026-07-30 19:24:28.351+06');
INSERT INTO public.universities VALUES ('880163d7-e16e-4bdc-8279-23a9f2ed06b1', 'Maynooth University, Maynooth', '2ec270de-1dba-46de-9f1a-5b4ed6821b82', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.354+06', '2026-07-30 19:24:28.354+06');
INSERT INTO public.universities VALUES ('6bfbcffa-788e-48b0-9081-205a3f9e8be2', 'Technological University Dublin (Pathway as well as UG & PG Direct Entry)', '2ec270de-1dba-46de-9f1a-5b4ed6821b82', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.357+06', '2026-07-30 19:24:28.357+06');
INSERT INTO public.universities VALUES ('b67d0f5f-7d04-486f-9f3b-e55998269b75', 'South East Technological University (Waterford and Carlow Campus)', '2ec270de-1dba-46de-9f1a-5b4ed6821b82', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.359+06', '2026-07-30 19:24:28.359+06');
INSERT INTO public.universities VALUES ('934415dd-2d3a-4335-a4e9-9529197af2d8', 'Atlantic Technological University, Galway and Letterkenny Campus', '2ec270de-1dba-46de-9f1a-5b4ed6821b82', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.361+06', '2026-07-30 19:24:28.361+06');
INSERT INTO public.universities VALUES ('c591d0b4-6727-47ee-a47e-af5304b4703d', 'Technological University of the Shannon: Midlands Midwest, Shannon (Limerick and Athlone Campus)', '2ec270de-1dba-46de-9f1a-5b4ed6821b82', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.363+06', '2026-07-30 19:24:28.363+06');
INSERT INTO public.universities VALUES ('1b03b884-56f1-4a40-b928-431960b9c9e0', 'National College of Ireland, Dublin', '2ec270de-1dba-46de-9f1a-5b4ed6821b82', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.365+06', '2026-07-30 19:24:28.365+06');
INSERT INTO public.universities VALUES ('6c14adb4-57df-425f-9a65-6f1362426827', 'Galway Business School, Galway', '2ec270de-1dba-46de-9f1a-5b4ed6821b82', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.367+06', '2026-07-30 19:24:28.367+06');
INSERT INTO public.universities VALUES ('94b55bd0-6c3d-42cb-8fff-e04217bc3461', 'Dublin Business School, Dublin', '2ec270de-1dba-46de-9f1a-5b4ed6821b82', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.369+06', '2026-07-30 19:24:28.369+06');
INSERT INTO public.universities VALUES ('7f718032-b185-4ec5-bc24-8565682bad49', 'Shannon College of Hotel Management, A college of NUI Galway, Galway', '2ec270de-1dba-46de-9f1a-5b4ed6821b82', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.371+06', '2026-07-30 19:24:28.371+06');
INSERT INTO public.universities VALUES ('c39a2284-e8d7-4fc7-a8fa-c889e7ce6ce8', 'Dublin International Foundation College, Dublin', '2ec270de-1dba-46de-9f1a-5b4ed6821b82', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.373+06', '2026-07-30 19:24:28.373+06');
INSERT INTO public.universities VALUES ('4b4b1baf-0200-4fae-8411-aefc6a33a56d', 'IBAT College Dublin, Dublin', '2ec270de-1dba-46de-9f1a-5b4ed6821b82', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.374+06', '2026-07-30 19:24:28.374+06');
INSERT INTO public.universities VALUES ('96d4b46d-ebbd-4e87-906c-08e10d83bf7e', 'Independent College, Dublin', '2ec270de-1dba-46de-9f1a-5b4ed6821b82', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.375+06', '2026-07-30 19:24:28.375+06');
INSERT INTO public.universities VALUES ('fb4f1cdc-c49e-4e75-8874-26ee55f33dc0', 'Munster Technological University, Cork and Kerry Campus', '2ec270de-1dba-46de-9f1a-5b4ed6821b82', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.377+06', '2026-07-30 19:24:28.377+06');
INSERT INTO public.universities VALUES ('78002538-bf0d-420b-8281-0bd882184e13', 'University of Bristol, Bristol, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.394+06', '2026-07-30 19:24:28.394+06');
INSERT INTO public.universities VALUES ('c3bd49a6-9457-4f34-8e9c-4fb907fc92eb', 'Durham University, Durham, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.396+06', '2026-07-30 19:24:28.396+06');
INSERT INTO public.universities VALUES ('dab252ce-609d-4441-8a62-e273c12d738e', 'University of Sheffield, Sheffield, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.397+06', '2026-07-30 19:24:28.397+06');
INSERT INTO public.universities VALUES ('b0ff3a00-a59f-44d9-aa83-88953ff99601', 'University of Southampton, Southampton, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.399+06', '2026-07-30 19:24:28.399+06');
INSERT INTO public.universities VALUES ('61f042e1-2ca3-4c26-8acc-bc5506de069c', 'Cranfield University, Cranfield, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.401+06', '2026-07-30 19:24:28.401+06');
INSERT INTO public.universities VALUES ('bf26dbbc-0b4b-46ec-a496-e23be140683f', 'University of York, York, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.402+06', '2026-07-30 19:24:28.402+06');
INSERT INTO public.universities VALUES ('e918b4d3-199d-430b-be4e-79037953fb33', 'University of Bath, Bath, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.404+06', '2026-07-30 19:24:28.404+06');
INSERT INTO public.universities VALUES ('2738221f-6357-4368-a49a-53b1b17fe5d1', 'University of Liverpool, Liverpool and London Campus', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.405+06', '2026-07-30 19:24:28.405+06');
INSERT INTO public.universities VALUES ('36c8c80c-bb21-4671-bdd5-50b6248ad64b', 'Queen Mary University of London, London, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.407+06', '2026-07-30 19:24:28.407+06');
INSERT INTO public.universities VALUES ('3b459b0b-3e08-43ae-9d37-3f976d3f6db2', 'University of Aberdeen, Aberdeen, Scotland', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.408+06', '2026-07-30 19:24:28.408+06');
INSERT INTO public.universities VALUES ('bee10bad-ca41-49df-a2a0-b8b1a9cc0945', 'Loughborough University, Loughborough, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.41+06', '2026-07-30 19:24:28.41+06');
INSERT INTO public.universities VALUES ('87bfd311-9cbf-4bc5-8e1f-21c5c85762f5', 'Newcastle University, Newcastle upon Tyne, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.412+06', '2026-07-30 19:24:28.412+06');
INSERT INTO public.universities VALUES ('e78ef0a3-aa46-48c9-9971-fba0131ec095', 'The University of Exeter, Exeter, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.413+06', '2026-07-30 19:24:28.413+06');
INSERT INTO public.universities VALUES ('364d86df-fc8e-4a09-b66a-c66eaf6e7589', 'University of Reading, Reading, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.415+06', '2026-07-30 19:24:28.415+06');
INSERT INTO public.universities VALUES ('87c51722-b3c5-4792-b506-97af101d49a7', 'Queen`s University Belfast, Belfast, Northern Ireland', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.417+06', '2026-07-30 19:24:28.417+06');
INSERT INTO public.universities VALUES ('c814692a-b621-4d7f-9246-9a1fa823fb55', 'University of Leicester, Leicester, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.418+06', '2026-07-30 19:24:28.418+06');
INSERT INTO public.universities VALUES ('60d777c0-eacb-444e-bb08-ed6f376bd8cf', 'University of Surrey, Guildford, Surrey', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.419+06', '2026-07-30 19:24:28.419+06');
INSERT INTO public.universities VALUES ('57f82f42-6667-415a-93fe-bd8de2bd5355', 'University of Strathclyde , Glasgow, Scotland', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.421+06', '2026-07-30 19:24:28.421+06');
INSERT INTO public.universities VALUES ('7f6caa3e-5a29-4329-bfe3-70bdc39e6203', 'University of Sussex, Sussex, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.422+06', '2026-07-30 19:24:28.422+06');
INSERT INTO public.universities VALUES ('6767b3d1-143f-457d-ba64-265985364cb4', 'Heriot Watt University, Edinburg and Edinburgh Business School (No Commission for All Erasmus -Mundus Masters Programs, Distance Learning Programs and Short Programs) Note: Commission will be paid for students on  MSc Petroleum Engineering  at  Dubai and Orkney Campus.', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.423+06', '2026-07-30 19:24:28.423+06');
INSERT INTO public.universities VALUES ('e1cdb313-dfcd-485f-a3c4-92c4c4e171ed', '(Study Group) Royal Holloway, University of London , Egham, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.424+06', '2026-07-30 19:24:28.424+06');
INSERT INTO public.universities VALUES ('29f2ba69-a520-451a-bd44-a96e349b2461', 'University of Derby, Derby, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.426+06', '2026-07-30 19:24:28.426+06');
INSERT INTO public.universities VALUES ('29a16b20-e05e-4392-85a7-a35815328240', 'University of Chichester, Chichester, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.427+06', '2026-07-30 19:24:28.427+06');
INSERT INTO public.universities VALUES ('09c399db-77c9-4b3a-92f0-7dfc3e0ed139', 'University of Dundee, Dundee, Scotland', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.428+06', '2026-07-30 19:24:28.428+06');
INSERT INTO public.universities VALUES ('5ff660b8-0961-478d-b613-331776c457dd', '(INTO) City University London (Except PG Courses of Bussines), London, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.43+06', '2026-07-30 19:24:28.43+06');
INSERT INTO public.universities VALUES ('1694b1ac-1e05-4d1d-ac6b-2aacf9226663', 'Brunel University London, Uxbridge, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.431+06', '2026-07-30 19:24:28.431+06');
INSERT INTO public.universities VALUES ('55e3716a-7e36-4502-8e62-c04ac0c160c7', 'Oxford Brookes University, Oxford, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.433+06', '2026-07-30 19:24:28.433+06');
INSERT INTO public.universities VALUES ('54595708-ecd3-4e28-a31b-dad6e185bc88', 'University of Essex, Colchester, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.434+06', '2026-07-30 19:24:28.434+06');
INSERT INTO public.universities VALUES ('07c52bd2-16a9-43af-8bb4-433766eb4de4', 'Swansea University, Swansea, Wales', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.435+06', '2026-07-30 19:24:28.435+06');
INSERT INTO public.universities VALUES ('3604cc99-40a1-42e5-94f9-2a02036761b4', 'Aberystwyth University, Aberystwyth, Wales', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.437+06', '2026-07-30 19:24:28.437+06');
INSERT INTO public.universities VALUES ('2dd8725d-6e98-4651-8978-be5b3c68b52d', 'Aston University, Birmingham, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.438+06', '2026-07-30 19:24:28.438+06');
INSERT INTO public.universities VALUES ('2ca71bab-7e57-4660-b07a-c8f48d7676f0', 'Aston University, London Campus, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.439+06', '2026-07-30 19:24:28.439+06');
INSERT INTO public.universities VALUES ('82b361a8-52e7-42f9-b2ea-7fbf53e9575a', 'Coventry University, Coventry, Scarborough & London, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.44+06', '2026-07-30 19:24:28.44+06');
INSERT INTO public.universities VALUES ('e0c4bc7f-0326-4518-9c8a-c5ffef78c449', 'Kingston University, Kingston, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.441+06', '2026-07-30 19:24:28.441+06');
INSERT INTO public.universities VALUES ('2ee77980-aacf-41c1-a697-744efe030516', 'Bangor University, Bangor, Wales', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.441+06', '2026-07-30 19:24:28.441+06');
INSERT INTO public.universities VALUES ('64f37f56-1368-4d8d-8722-6a49c785da1c', 'University of Bradford, Bradford, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.443+06', '2026-07-30 19:24:28.443+06');
INSERT INTO public.universities VALUES ('2001effe-ae97-45cf-9dfb-304eed92ac60', 'St George''s University of London, London, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.444+06', '2026-07-30 19:24:28.444+06');
INSERT INTO public.universities VALUES ('966995b6-2936-4349-bd69-332dd380f6ee', 'University of Portsmouth, Portsmouth Campus (Except Sylhet )', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.445+06', '2026-07-30 19:24:28.445+06');
INSERT INTO public.universities VALUES ('e04b4871-46ad-4e26-adad-0dffd9561718', 'University of Portsmouth, London Campus', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.446+06', '2026-07-30 19:24:28.446+06');
INSERT INTO public.universities VALUES ('b2d57bba-4165-45be-93af-24d14b69f86b', 'SOAS University of London, London, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.448+06', '2026-07-30 19:24:28.448+06');
INSERT INTO public.universities VALUES ('d2a4d246-2434-4e6a-9c0a-930a5edf4677', 'Northumbria University, Newcastle', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.449+06', '2026-07-30 19:24:28.449+06');
INSERT INTO public.universities VALUES ('e586c717-a9d6-4642-a84a-2e1208cef2cc', 'QAHE- Northumbria University, London Campus (Except Sylhet)', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.45+06', '2026-07-30 19:24:28.45+06');
INSERT INTO public.universities VALUES ('fd870667-382c-4933-952a-669e0be7c3aa', 'Leeds Arts University, Leeds, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.451+06', '2026-07-30 19:24:28.451+06');
INSERT INTO public.universities VALUES ('e8d70799-7822-4066-b006-5be0a111b555', 'University of Plymouth, Plymouth, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.452+06', '2026-07-30 19:24:28.452+06');
INSERT INTO public.universities VALUES ('0c904b83-44ff-48fd-9630-85193b56652c', 'University of Hull, Hull, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.453+06', '2026-07-30 19:24:28.453+06');
INSERT INTO public.universities VALUES ('51847d00-3067-4e18-b1b6-8c18332c2c77', 'University of Hull, London Campus, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.454+06', '2026-07-30 19:24:28.454+06');
INSERT INTO public.universities VALUES ('a4013396-94f3-4dff-a881-e1e38a99c009', 'Middlesex University, London, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.455+06', '2026-07-30 19:24:28.455+06');
INSERT INTO public.universities VALUES ('374fc8a1-cc1c-4f15-9a4b-661cf36eea24', 'University of Greenwich, London', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.456+06', '2026-07-30 19:24:28.456+06');
INSERT INTO public.universities VALUES ('696f3c69-44a2-4bfb-81f4-41b0f6c1b249', 'The University of Huddersfield, London, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.457+06', '2026-07-30 19:24:28.457+06');
INSERT INTO public.universities VALUES ('938b672f-4f1f-4324-97b3-1f081f632e61', 'Keele University, Keele, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.458+06', '2026-07-30 19:24:28.458+06');
INSERT INTO public.universities VALUES ('055cdb6a-2ff2-4a56-bf13-be06307ca846', 'London South Bank University, London, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.46+06', '2026-07-30 19:24:28.46+06');
INSERT INTO public.universities VALUES ('1016b5b9-311a-4d0b-97e0-6a42f79cfef4', 'Nottingham Trent University , Nottingham, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.461+06', '2026-07-30 19:24:28.461+06');
INSERT INTO public.universities VALUES ('4fcdc044-1e8a-422c-bdc9-50862924711c', 'De MontFort University, Leicester, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.463+06', '2026-07-30 19:24:28.463+06');
INSERT INTO public.universities VALUES ('0331c4c5-983c-4536-8b07-9a19380268a3', 'Edinburgh Napier University, Edinburgh, Scotland', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.465+06', '2026-07-30 19:24:28.465+06');
INSERT INTO public.universities VALUES ('778877d6-6c5f-493c-b667-8ad450c13414', 'Manchester Metropolitan University, Manchester, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.466+06', '2026-07-30 19:24:28.466+06');
INSERT INTO public.universities VALUES ('fe549cf4-c754-4f52-8468-7dcdfb6be322', 'Sheffield Hallam University, Sheffield, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.467+06', '2026-07-30 19:24:28.467+06');
INSERT INTO public.universities VALUES ('d5e41ce2-3308-4788-892a-fad3a5177608', 'University of Brighton, Brighton, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.468+06', '2026-07-30 19:24:28.468+06');
INSERT INTO public.universities VALUES ('2daafd14-70c8-4028-a211-4089fb7e05b8', 'University of Lancashire, Preston, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.469+06', '2026-07-30 19:24:28.469+06');
INSERT INTO public.universities VALUES ('acd1b01f-c425-42ea-b9ec-16fe1ce9e262', 'University of East London, London, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.47+06', '2026-07-30 19:24:28.47+06');
INSERT INTO public.universities VALUES ('d3a0e19d-b3c6-48a4-b141-759aac657322', 'University of Hertfordshire, Hatfield, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.471+06', '2026-07-30 19:24:28.471+06');
INSERT INTO public.universities VALUES ('a75a8c8b-0c68-4814-a786-c2890f44ebcf', 'Birmingham City University, Birmingham', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.472+06', '2026-07-30 19:24:28.472+06');
INSERT INTO public.universities VALUES ('f33af6a4-4b44-444c-b5e1-45e998e4c306', 'University of Salford, Manchester, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.473+06', '2026-07-30 19:24:28.473+06');
INSERT INTO public.universities VALUES ('39678b77-fc36-4cdb-853f-5058218ecf52', 'St. Mary’s University, Twickenham, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.474+06', '2026-07-30 19:24:28.474+06');
INSERT INTO public.universities VALUES ('2faf26ee-88ed-4dd3-a928-b197ee9cb927', 'University of Lincoln, Lincoln, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.475+06', '2026-07-30 19:24:28.475+06');
INSERT INTO public.universities VALUES ('1bb45c11-cde6-428d-8650-b1c033b9ec66', 'University of the West of England, Bristol, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.475+06', '2026-07-30 19:24:28.475+06');
INSERT INTO public.universities VALUES ('6d2b461a-41e6-4aba-8689-a84349d0279b', 'University of West London, London, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.476+06', '2026-07-30 19:24:28.476+06');
INSERT INTO public.universities VALUES ('bf4a8ca0-6007-48a4-a230-e507c3160687', 'University of Bedfordshire, Luton, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.477+06', '2026-07-30 19:24:28.477+06');
INSERT INTO public.universities VALUES ('fa9f149e-2929-4b8a-b5f4-b119dfc979d1', 'University of Staffordshire, Stoke-on-Trent, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.478+06', '2026-07-30 19:24:28.478+06');
INSERT INTO public.universities VALUES ('c428e809-33d5-4081-9e88-a6a93c815249', 'QAHE- Ulster University, Birmingham  London & Manchester, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.48+06', '2026-07-30 19:24:28.48+06');
INSERT INTO public.universities VALUES ('bd50f4b5-9d34-4855-a30b-d37897f8f167', 'Teesside University (Except Namakkal & Punjab), Middlesbrough and London Campus (Teesside University will not accept any students if they have Namakkal and Punjab address mentioned in their Passport)', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.481+06', '2026-07-30 19:24:28.481+06');
INSERT INTO public.universities VALUES ('7c2d3d4e-a876-4c21-90a4-af5e1ebb0dc5', 'Cardiff Metropolitan University, Cardiff , Wales', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.482+06', '2026-07-30 19:24:28.482+06');
INSERT INTO public.universities VALUES ('a02ad857-6df0-438a-95df-4f862bd5262b', 'Anglia Ruskin University, Cambridge & Chelmsford, England (Except Punjab and Harayana)', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.483+06', '2026-07-30 19:24:28.483+06');
INSERT INTO public.universities VALUES ('a866bd70-8af6-45e2-8ce6-d08e3ac73266', 'University of East Anglia, Norwich, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.484+06', '2026-07-30 19:24:28.484+06');
INSERT INTO public.universities VALUES ('58a01055-8034-4feb-955b-3923309ce5ae', 'University of Kent, Canterbury, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.485+06', '2026-07-30 19:24:28.485+06');
INSERT INTO public.universities VALUES ('71302e03-08f8-49c7-ac34-07221742588a', 'Liverpool Hope University, Liverpool, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.486+06', '2026-07-30 19:24:28.486+06');
INSERT INTO public.universities VALUES ('62f3e067-3bfb-472b-a3b2-8568bc403544', 'University of Sunderland, Sunderland & London, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.488+06', '2026-07-30 19:24:28.488+06');
INSERT INTO public.universities VALUES ('4eef51fb-fda8-44d3-abc2-efee96079f9b', 'University of Gloucestershire, Gloucester, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.489+06', '2026-07-30 19:24:28.489+06');
INSERT INTO public.universities VALUES ('bdb45daf-3d5b-4612-b718-44cf77b59443', 'Canterbury Christ Church University, Canterbury, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.49+06', '2026-07-30 19:24:28.49+06');
INSERT INTO public.universities VALUES ('0d129bc6-7a78-47d2-a47f-945ee3644a6b', 'Abertay University, Dundee, Scotland', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.491+06', '2026-07-30 19:24:28.491+06');
INSERT INTO public.universities VALUES ('0a8772d2-1ef8-43da-b3b2-ebe61aa00763', 'University of Roehampton, London, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.492+06', '2026-07-30 19:24:28.492+06');
INSERT INTO public.universities VALUES ('e2ac713e-276e-47fa-86f2-bb55da3866f0', 'University College Birmingham, Birmingham, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.493+06', '2026-07-30 19:24:28.493+06');
INSERT INTO public.universities VALUES ('0db27830-4075-45de-bb96-6c43df1d9747', 'BIMM University, Brighton, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.494+06', '2026-07-30 19:24:28.494+06');
INSERT INTO public.universities VALUES ('b250ab77-f04d-486b-bf78-8e398c2aba8c', 'University of Wales Trinity Saint David,', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.495+06', '2026-07-30 19:24:28.495+06');
INSERT INTO public.universities VALUES ('7f4cbae0-9ca7-4ce8-969a-2b1d741cdd9d', 'London, Birmingham and Swansea Campus', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.496+06', '2026-07-30 19:24:28.496+06');
INSERT INTO public.universities VALUES ('a524c976-c1ed-4e4b-b105-32609cf0c7a9', 'University of Law, Guildford, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.497+06', '2026-07-30 19:24:28.497+06');
INSERT INTO public.universities VALUES ('0a20973f-3740-41b8-8ee3-567b3268923a', 'Hult International Business School, London, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.498+06', '2026-07-30 19:24:28.498+06');
INSERT INTO public.universities VALUES ('533502cb-a298-4fa4-b2c1-67e94cbb38ee', 'SP Jain London School of Management, London, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.499+06', '2026-07-30 19:24:28.499+06');
INSERT INTO public.universities VALUES ('5b216d65-cce9-45dd-88cc-2a29e8166a45', 'Regent’s University London, London, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.5+06', '2026-07-30 19:24:28.5+06');
INSERT INTO public.universities VALUES ('2ff1cafe-0e36-47aa-93c2-b9506e0ae701', 'London Metropolitan University, London, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.501+06', '2026-07-30 19:24:28.501+06');
INSERT INTO public.universities VALUES ('6f5f7029-44a4-42e1-85f9-55dfc79bdd55', 'Norwich University of Arts, Norwich, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.502+06', '2026-07-30 19:24:28.502+06');
INSERT INTO public.universities VALUES ('8c20d261-2457-44c7-892e-14942c5e505b', 'Bath Spa University, Bath, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.503+06', '2026-07-30 19:24:28.503+06');
INSERT INTO public.universities VALUES ('889613d9-8720-4c3f-b4b7-a79e197cde48', 'Bath Spa University, London Campus', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.504+06', '2026-07-30 19:24:28.504+06');
INSERT INTO public.universities VALUES ('741f0203-c7cc-46f3-acf0-1b00b49916e1', 'University of Worcester, Worcester, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.505+06', '2026-07-30 19:24:28.505+06');
INSERT INTO public.universities VALUES ('aa1921f6-f185-4a52-a48f-ed69a3cad953', 'Istituto Marangoni, London, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.506+06', '2026-07-30 19:24:28.506+06');
INSERT INTO public.universities VALUES ('b0b22822-030f-465e-9a33-38aaec8c162d', 'Regent College London, Middlesex, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.507+06', '2026-07-30 19:24:28.507+06');
INSERT INTO public.universities VALUES ('c351783d-ac1a-4445-bc0d-e320776d41d7', 'Ravensbourne University London, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.508+06', '2026-07-30 19:24:28.508+06');
INSERT INTO public.universities VALUES ('6e4ee5de-ef76-48f0-8147-be786cdba3be', 'Arden University, Coventry, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.509+06', '2026-07-30 19:24:28.509+06');
INSERT INTO public.universities VALUES ('8205bc26-4417-42e6-9cd3-8559d409af2f', 'Leeds Trinity University, Leeds, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.51+06', '2026-07-30 19:24:28.51+06');
INSERT INTO public.universities VALUES ('3ef3e951-ff7e-4cb0-bdaf-7382debae32b', 'Bloomsbury Institute, London, England (Foundation Year and UG 3 Years programs)', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.511+06', '2026-07-30 19:24:28.511+06');
INSERT INTO public.universities VALUES ('e63180ee-18a6-4ae0-aa6d-49999918d0ae', 'Bloomsbury Institute, London, England (UG Top Up courses &', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.512+06', '2026-07-30 19:24:28.512+06');
INSERT INTO public.universities VALUES ('bc7293f1-12c5-4e0d-88b4-45ba46ce8d7a', 'MBA, MSc Management, MSc Accounting and Finance & MSc Finance and Wealth Management)', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.513+06', '2026-07-30 19:24:28.513+06');
INSERT INTO public.universities VALUES ('f4463cae-f40b-4b96-9c34-d0a9cdec4f42', 'University Academy 92, Manchester', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.514+06', '2026-07-30 19:24:28.514+06');
INSERT INTO public.universities VALUES ('5b1c0271-9f66-4d34-ba9f-ba5d2c6e47a4', 'Cambridge School of Visual & Performing Arts (CSVPA), Cambridge, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.515+06', '2026-07-30 19:24:28.515+06');
INSERT INTO public.universities VALUES ('c5a1b1f5-47f0-4d02-8eed-3047738a72df', 'Goldsmiths, University of London, London, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.516+06', '2026-07-30 19:24:28.516+06');
INSERT INTO public.universities VALUES ('b8d64a19-9779-48e7-8002-32055605c691', 'The Glasgow School of Art, Glasgow, Scotland', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.517+06', '2026-07-30 19:24:28.517+06');
INSERT INTO public.universities VALUES ('df6e71fc-4458-4440-b31e-926f4e0c7782', 'The Engineering & Design Institute London (TEDI-London), England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.518+06', '2026-07-30 19:24:28.518+06');
INSERT INTO public.universities VALUES ('9b34a4a8-77fe-44f2-9a54-40aa3cd8ef0c', 'Online Business School,Conventry,England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.519+06', '2026-07-30 19:24:28.519+06');
INSERT INTO public.universities VALUES ('af20952d-a29c-481f-aa6e-67c3fc494988', 'OIEG - Health Sciences University, London, England', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.52+06', '2026-07-30 19:24:28.52+06');
INSERT INTO public.universities VALUES ('55685983-4888-4a30-b142-fd8a1e98a030', 'University of Oxford, England (Summer Programs)', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.522+06', '2026-07-30 19:24:28.522+06');
INSERT INTO public.universities VALUES ('2c756caa-424f-478f-8d95-606c4e78af2c', 'University of Cambridge, England (Summer Programs)', '6a2a2fde-e019-49c8-a7ea-88f76d1a8d0d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.523+06', '2026-07-30 19:24:28.523+06');
INSERT INTO public.universities VALUES ('17c208f0-05f2-42d5-be7b-1f530d087ceb', 'Queen Mary University of London (Malta Campus)', 'cec2081b-fe14-4a9d-8c71-c70649b0a518', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.529+06', '2026-07-30 19:24:28.529+06');
INSERT INTO public.universities VALUES ('f3d47271-17d1-44c6-ac4c-4f1ef02d6820', 'Idea Academy, Malta (Except Students from Punjab and Haryana)', 'cec2081b-fe14-4a9d-8c71-c70649b0a518', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.53+06', '2026-07-30 19:24:28.53+06');
INSERT INTO public.universities VALUES ('3f7245e0-066b-4a87-8c41-779a331ef567', 'Ascencia Business School Malta', 'cec2081b-fe14-4a9d-8c71-c70649b0a518', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.531+06', '2026-07-30 19:24:28.531+06');
INSERT INTO public.universities VALUES ('bf40e39b-1295-4ebb-b960-2ad8d078bead', 'London School of Commerce Malta', 'cec2081b-fe14-4a9d-8c71-c70649b0a518', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.532+06', '2026-07-30 19:24:28.532+06');
INSERT INTO public.universities VALUES ('2931dbb5-38e5-4fab-a57b-0ac4196665aa', 'Saint Martin’s Institute of Higher Education', 'cec2081b-fe14-4a9d-8c71-c70649b0a518', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.534+06', '2026-07-30 19:24:28.534+06');
INSERT INTO public.universities VALUES ('45fdc75a-aae1-4b0d-a708-d5df7c14221d', 'Global Business Studies-GBS Malta Campus', 'cec2081b-fe14-4a9d-8c71-c70649b0a518', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.535+06', '2026-07-30 19:24:28.535+06');
INSERT INTO public.universities VALUES ('e0a0f0b1-b14c-49b9-bac5-2f02ec6f90a7', 'Learnkey Training Institute', 'cec2081b-fe14-4a9d-8c71-c70649b0a518', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.536+06', '2026-07-30 19:24:28.536+06');
INSERT INTO public.universities VALUES ('e9c19f94-557f-4cae-82b2-2ea216a218b9', 'Yhank Institute, Malta', 'cec2081b-fe14-4a9d-8c71-c70649b0a518', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.538+06', '2026-07-30 19:24:28.538+06');
INSERT INTO public.universities VALUES ('5248e310-9970-4095-837e-ba85cdac6c47', 'European Business School, St. Julian''s', 'cec2081b-fe14-4a9d-8c71-c70649b0a518', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.539+06', '2026-07-30 19:24:28.539+06');
INSERT INTO public.universities VALUES ('9525d058-1193-491e-80a9-7b40620ff00e', 'George Mason University- (Korea Campus) INTO- George Mason University- (Korea Campus)', 'cc2aa77a-fcc0-4763-ad10-8057435a7b3d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.545+06', '2026-07-30 19:24:28.545+06');
INSERT INTO public.universities VALUES ('d24f46c0-ee11-4125-94f5-8fba987f37dc', 'Woosong University, Daejeon', 'cc2aa77a-fcc0-4763-ad10-8057435a7b3d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.546+06', '2026-07-30 19:24:28.546+06');
INSERT INTO public.universities VALUES ('f6c50dae-e188-4cf9-8627-601e5714c3fd', 'University of Debrecen, Debrecen', '13d00a8e-8e15-4bf3-8f17-5e147bf730a0', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.552+06', '2026-07-30 19:24:28.552+06');
INSERT INTO public.universities VALUES ('ea37841a-f78b-45ee-ba4e-b23cf75d9f32', 'Budapest Metropolitan University of Applied Science, Budapest', '13d00a8e-8e15-4bf3-8f17-5e147bf730a0', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.554+06', '2026-07-30 19:24:28.554+06');
INSERT INTO public.universities VALUES ('0d7d5c4e-9de4-45ea-a25a-dd80e91f0acc', 'University of Pecs, Pécs', '13d00a8e-8e15-4bf3-8f17-5e147bf730a0', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.555+06', '2026-07-30 19:24:28.555+06');
INSERT INTO public.universities VALUES ('506ae1c9-b95f-405f-a0a1-67df17ccae11', 'Wekerle Business School, Budapest', '13d00a8e-8e15-4bf3-8f17-5e147bf730a0', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.557+06', '2026-07-30 19:24:28.557+06');
INSERT INTO public.universities VALUES ('b8a2aa36-091a-47f0-b917-f72a8afbf4b9', 'Hungarian University of Sports Science, Budapest', '13d00a8e-8e15-4bf3-8f17-5e147bf730a0', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.559+06', '2026-07-30 19:24:28.559+06');
INSERT INTO public.universities VALUES ('5acb5c5d-c974-4e0b-bbd3-8be84c35207d', 'University of Vaasa, Vaasa', 'bf9714fa-a14b-49ba-b92b-25c21e462b87', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.567+06', '2026-07-30 19:24:28.567+06');
INSERT INTO public.universities VALUES ('d42eca44-c87f-4553-9ccc-77dacb03ea46', 'Metropolia University of Applied Sciences, Helsinki', 'bf9714fa-a14b-49ba-b92b-25c21e462b87', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.569+06', '2026-07-30 19:24:28.569+06');
INSERT INTO public.universities VALUES ('54ecbde3-d5c7-4985-8deb-f019d0f9e9bf', 'University of Jyväskylä, Jyväskylä', 'bf9714fa-a14b-49ba-b92b-25c21e462b87', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.571+06', '2026-07-30 19:24:28.571+06');
INSERT INTO public.universities VALUES ('7e19cbf1-2fe1-4ad1-9b7f-7f40e10e1b92', 'Tampere University', 'bf9714fa-a14b-49ba-b92b-25c21e462b87', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.573+06', '2026-07-30 19:24:28.573+06');
INSERT INTO public.universities VALUES ('5553c567-056c-469c-93d5-8c6e4c9ee209', 'Tampere University of Applied Sciences (TAMK), Tampere', 'bf9714fa-a14b-49ba-b92b-25c21e462b87', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.575+06', '2026-07-30 19:24:28.575+06');
INSERT INTO public.universities VALUES ('89948398-a484-4fa8-b74d-df5063ac5f82', 'Turku University of Applied Sciences, Turku', 'bf9714fa-a14b-49ba-b92b-25c21e462b87', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.577+06', '2026-07-30 19:24:28.577+06');
INSERT INTO public.universities VALUES ('b9bdd3d7-8638-495c-a1ed-94448e985d6b', 'Hanken School of Economics, Helsinki', 'bf9714fa-a14b-49ba-b92b-25c21e462b87', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.578+06', '2026-07-30 19:24:28.578+06');
INSERT INTO public.universities VALUES ('d63ea379-4d33-4959-a8ab-eeb46139f062', 'University of Southern Denmark, Odense and Sonderborg Campus', 'd5b809a2-82f5-460f-b413-e0c009bda29e', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.584+06', '2026-07-30 19:24:28.584+06');
INSERT INTO public.universities VALUES ('4c28d889-ec8e-40b5-bb02-d3ac2e702091', 'International Business Academy, Kolding', 'd5b809a2-82f5-460f-b413-e0c009bda29e', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.586+06', '2026-07-30 19:24:28.586+06');
INSERT INTO public.universities VALUES ('dbd102a2-8260-4290-8e06-284a8de2c7fc', 'Constructor University, Bremen', '7ec32596-d89c-4d2d-a28a-8c034ba1154d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.591+06', '2026-07-30 19:24:28.591+06');
INSERT INTO public.universities VALUES ('eab35804-0d28-49c7-b389-f174269af6d2', 'Steinbeis University, Berlin (Only PG)', '7ec32596-d89c-4d2d-a28a-8c034ba1154d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.593+06', '2026-07-30 19:24:28.593+06');
INSERT INTO public.universities VALUES ('6ddac881-c50c-4d76-aaa5-df821b17c527', 'SRH University, Berlin, Hamburg, Leipzig, Dresden, Munich and Heidelberg Campuses', '7ec32596-d89c-4d2d-a28a-8c034ba1154d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.594+06', '2026-07-30 19:24:28.594+06');
INSERT INTO public.universities VALUES ('7cce9afd-58d4-468a-9800-5b35fc15f33d', 'SRH Fernhochschule – The Distance Learning University, Riedlingen', '7ec32596-d89c-4d2d-a28a-8c034ba1154d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.595+06', '2026-07-30 19:24:28.595+06');
INSERT INTO public.universities VALUES ('91b5f279-7d48-4bba-b72b-a829c95f2329', 'Northern Institute of Technology Management (NIT), Hamburg', '7ec32596-d89c-4d2d-a28a-8c034ba1154d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.596+06', '2026-07-30 19:24:28.596+06');
INSERT INTO public.universities VALUES ('42f0fb76-9706-4bb1-9c3c-ade25c25e7c1', 'FOM Hochschule - University of Applied Sciences for Economics and Management, Essen', '7ec32596-d89c-4d2d-a28a-8c034ba1154d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.598+06', '2026-07-30 19:24:28.598+06');
INSERT INTO public.universities VALUES ('7df71aa4-f3ba-4d5b-9484-9cc02a312a63', 'EBS University, Wiesbaden', '7ec32596-d89c-4d2d-a28a-8c034ba1154d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.6+06', '2026-07-30 19:24:28.6+06');
INSERT INTO public.universities VALUES ('4700c74b-6457-45f2-98fd-e0e83e0f7358', 'International School of Management ISM (GmBH), Dortmund,', '7ec32596-d89c-4d2d-a28a-8c034ba1154d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.601+06', '2026-07-30 19:24:28.601+06');
INSERT INTO public.universities VALUES ('0661401d-8652-4ec2-a811-d603b70867d9', 'International University of Applied Sciences, Berlin and Bad Honnef', '7ec32596-d89c-4d2d-a28a-8c034ba1154d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.603+06', '2026-07-30 19:24:28.603+06');
INSERT INTO public.universities VALUES ('3a3c09b7-a015-406d-a2eb-f4890f21f0e1', 'CBS International Business School, Cologne', '7ec32596-d89c-4d2d-a28a-8c034ba1154d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.604+06', '2026-07-30 19:24:28.604+06');
INSERT INTO public.universities VALUES ('ce9d2f54-38cd-44eb-9d6d-4af39f1b0d7c', 'Arden University, Berlin', '7ec32596-d89c-4d2d-a28a-8c034ba1154d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.605+06', '2026-07-30 19:24:28.605+06');
INSERT INTO public.universities VALUES ('40a0e0f4-cdda-4141-9c29-989a0f273e15', 'GISMA University of Applied Sciences GmbH, Berlin', '7ec32596-d89c-4d2d-a28a-8c034ba1154d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.607+06', '2026-07-30 19:24:28.607+06');
INSERT INTO public.universities VALUES ('16c12f3b-5b08-4df2-ac48-0b8827fa3063', 'New European College, Munich', '7ec32596-d89c-4d2d-a28a-8c034ba1154d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.608+06', '2026-07-30 19:24:28.608+06');
INSERT INTO public.universities VALUES ('7b1b8c3d-f6a3-48ca-9aba-24867c48c98d', 'EU Business School, Munich', '7ec32596-d89c-4d2d-a28a-8c034ba1154d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.609+06', '2026-07-30 19:24:28.609+06');
INSERT INTO public.universities VALUES ('cc9bc863-2875-4c2b-a6e4-6bb8aaff2a4f', 'Munich University of Digital Technology & Applied Science, Munich', '7ec32596-d89c-4d2d-a28a-8c034ba1154d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.61+06', '2026-07-30 19:24:28.61+06');
INSERT INTO public.universities VALUES ('0868f54c-a7bc-4f04-b448-bddcdfa47826', 'Munich Business School, Munich', '7ec32596-d89c-4d2d-a28a-8c034ba1154d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.612+06', '2026-07-30 19:24:28.612+06');
INSERT INTO public.universities VALUES ('895a678a-bd42-4195-acdb-a2010d703e6c', 'Berlin School of Business and Innovation, Berlin', '7ec32596-d89c-4d2d-a28a-8c034ba1154d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.613+06', '2026-07-30 19:24:28.613+06');
INSERT INTO public.universities VALUES ('d727240a-d228-405b-87d1-97dd6fa375eb', 'Hochschule Macromedia University of Applied Sciences, Munich', '7ec32596-d89c-4d2d-a28a-8c034ba1154d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.614+06', '2026-07-30 19:24:28.614+06');
INSERT INTO public.universities VALUES ('9d813f31-15c0-4467-8f4b-f0f2a752ff91', 'ICN Business School, Berlin Campus', '7ec32596-d89c-4d2d-a28a-8c034ba1154d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.615+06', '2026-07-30 19:24:28.615+06');
INSERT INTO public.universities VALUES ('c628acd7-685a-43d3-a864-4e20270994d2', 'Navitas- Lancaster University, Lipzing (Foundations and UG Programs)', '7ec32596-d89c-4d2d-a28a-8c034ba1154d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.617+06', '2026-07-30 19:24:28.617+06');
INSERT INTO public.universities VALUES ('b3478d83-2ede-4b95-9d7b-9a6e9cc1c747', 'EIIE Eurasia Institute for International Education GmbH, Berlin', '7ec32596-d89c-4d2d-a28a-8c034ba1154d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.618+06', '2026-07-30 19:24:28.618+06');
INSERT INTO public.universities VALUES ('a3c1f54d-e7ab-4088-94ee-e568cd72077f', 'Media Design University of Applied Sciences, Berlin', '7ec32596-d89c-4d2d-a28a-8c034ba1154d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.619+06', '2026-07-30 19:24:28.619+06');
INSERT INTO public.universities VALUES ('4dfb3b17-6cd6-45bb-b5d5-171c0a2091e9', 'Schiller International University, Heidelberg', '7ec32596-d89c-4d2d-a28a-8c034ba1154d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.62+06', '2026-07-30 19:24:28.62+06');
INSERT INTO public.universities VALUES ('29e415f9-4851-4c1c-848e-e590ac0a0352', 'PFH – Private University of Applied Sciences, Göttingen', '7ec32596-d89c-4d2d-a28a-8c034ba1154d', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.622+06', '2026-07-30 19:24:28.622+06');
INSERT INTO public.universities VALUES ('8e0f1347-523a-4dd1-9f68-cace93d08de3', 'University of Auckland, Auckland', '7eb12b40-f7f6-4d04-9558-767b27684400', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.626+06', '2026-07-30 19:24:28.626+06');
INSERT INTO public.universities VALUES ('bef97524-34d0-4f8f-b9f8-becde1c1e424', 'University of Otago, Dunedin', '7eb12b40-f7f6-4d04-9558-767b27684400', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.628+06', '2026-07-30 19:24:28.628+06');
INSERT INTO public.universities VALUES ('bbdb00a8-0ccc-4c41-88ab-2a29727e552c', 'Victoria University of Wellington, Wellington', '7eb12b40-f7f6-4d04-9558-767b27684400', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.629+06', '2026-07-30 19:24:28.629+06');
INSERT INTO public.universities VALUES ('a9ab999a-75cc-4bec-b8f9-934d871606dd', 'University of Canterbury, Christchurch', '7eb12b40-f7f6-4d04-9558-767b27684400', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.63+06', '2026-07-30 19:24:28.63+06');
INSERT INTO public.universities VALUES ('b45435a8-e26a-4b04-870e-e1726e14cad7', 'Massey University, Palmerston North', '7eb12b40-f7f6-4d04-9558-767b27684400', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.631+06', '2026-07-30 19:24:28.631+06');
INSERT INTO public.universities VALUES ('539e7f85-b17e-408f-beb5-a05fb174e872', '(Kaplan) Massey University College, Palmerston North', '7eb12b40-f7f6-4d04-9558-767b27684400', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.633+06', '2026-07-30 19:24:28.633+06');
INSERT INTO public.universities VALUES ('1c1c96e3-f18c-4374-9706-1908ff031326', 'University of Waikato, Hamilton, North Island', '7eb12b40-f7f6-4d04-9558-767b27684400', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.635+06', '2026-07-30 19:24:28.635+06');
INSERT INTO public.universities VALUES ('e047944b-9d93-4cba-b72c-f8d815c1c4b1', 'Lincoln University, Lincoln', '7eb12b40-f7f6-4d04-9558-767b27684400', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.637+06', '2026-07-30 19:24:28.637+06');
INSERT INTO public.universities VALUES ('d2c35159-e25c-46af-a5fb-eaeac03a55fb', 'Auckland University of Technology, Auckland', '7eb12b40-f7f6-4d04-9558-767b27684400', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.638+06', '2026-07-30 19:24:28.638+06');
INSERT INTO public.universities VALUES ('85f0e1d0-e4e8-4e8e-8192-807340d18824', 'Unitec Institute of Technology- Te Pūkenga, Auckland', '7eb12b40-f7f6-4d04-9558-767b27684400', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.64+06', '2026-07-30 19:24:28.64+06');
INSERT INTO public.universities VALUES ('65dd2543-95d1-41ee-b44f-e111c1e082d8', 'Otago Polytechnic- Te Pūkenga, Dunedin & Auckland', '7eb12b40-f7f6-4d04-9558-767b27684400', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.642+06', '2026-07-30 19:24:28.642+06');
INSERT INTO public.universities VALUES ('ae419d23-2fec-40df-b806-69b8521d52aa', 'Manukau Institute of Technology- Te Pūkenga, Auckland', '7eb12b40-f7f6-4d04-9558-767b27684400', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.644+06', '2026-07-30 19:24:28.644+06');
INSERT INTO public.universities VALUES ('ae8f767e-f8c5-40bb-b054-bacc4f8c19b0', 'Ara Institute of Canterbury - Te Pūkenga, Christchurch', '7eb12b40-f7f6-4d04-9558-767b27684400', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.645+06', '2026-07-30 19:24:28.645+06');
INSERT INTO public.universities VALUES ('6f1ce693-390d-4c59-9bd8-b10de8487f4a', 'Eastern Institute of Technology- Te Pūkenga, Napier', '7eb12b40-f7f6-4d04-9558-767b27684400', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.647+06', '2026-07-30 19:24:28.647+06');
INSERT INTO public.universities VALUES ('3f5d3937-c784-4205-b0b8-0b331be29563', 'Waikato Institute of Technology (Wintec) - Te Pūkenga, Hamilton', '7eb12b40-f7f6-4d04-9558-767b27684400', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.648+06', '2026-07-30 19:24:28.648+06');
INSERT INTO public.universities VALUES ('fdeb05eb-9054-425f-bf7e-2ad08159e1d5', 'Nelson Marlborough Institute of Technology-  Nelson & Blenheim', '7eb12b40-f7f6-4d04-9558-767b27684400', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.65+06', '2026-07-30 19:24:28.65+06');
INSERT INTO public.universities VALUES ('12e0f71a-bd51-4f91-933f-9593e639e46b', 'Whitireia (Whitireia Community Polytechnic)- Te Pūkenga, Wellington & Auckland and Wellington Institute of Technology (WelTec), Wellington', '7eb12b40-f7f6-4d04-9558-767b27684400', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.651+06', '2026-07-30 19:24:28.651+06');
INSERT INTO public.universities VALUES ('995aa166-57ba-4772-961e-22f77a4839ef', 'Southern Institute of Technology- Te Pūkenga, Invercargill', '7eb12b40-f7f6-4d04-9558-767b27684400', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.652+06', '2026-07-30 19:24:28.652+06');
INSERT INTO public.universities VALUES ('92d443b4-da7f-48c1-8376-626a4f601de7', 'Western Institute of Technology at Taranaki (WITT) - Te Pūkenga, New Plymouth', '7eb12b40-f7f6-4d04-9558-767b27684400', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.653+06', '2026-07-30 19:24:28.653+06');
INSERT INTO public.universities VALUES ('cac8c17c-6b8a-4730-b8df-a78b8ba1d8de', 'The Universal College of Learning (UCOL)-Te Pūkenga, Palmerston North', '7eb12b40-f7f6-4d04-9558-767b27684400', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.654+06', '2026-07-30 19:24:28.654+06');
INSERT INTO public.universities VALUES ('0d218e4d-65c0-47f9-927f-6e631a93fc8f', 'Toi Ohomai Institute of Technology - Te Pūkenga', '7eb12b40-f7f6-4d04-9558-767b27684400', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.655+06', '2026-07-30 19:24:28.655+06');
INSERT INTO public.universities VALUES ('7e681282-338f-4ab8-9615-0ce918c1e3ea', 'New Zealand Skills and Education Group, Auckland', '7eb12b40-f7f6-4d04-9558-767b27684400', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.656+06', '2026-07-30 19:24:28.656+06');
INSERT INTO public.universities VALUES ('80b9a290-0f50-4eff-a012-cd2d7e124db9', 'Pacific International Hotel Management School, (New Plymouth) (PIHMS)', '7eb12b40-f7f6-4d04-9558-767b27684400', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.657+06', '2026-07-30 19:24:28.657+06');
INSERT INTO public.universities VALUES ('2700b3fa-e26d-4100-b400-eb2bfb061d89', 'Future Skills Academy, Auckland', '7eb12b40-f7f6-4d04-9558-767b27684400', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.658+06', '2026-07-30 19:24:28.658+06');
INSERT INTO public.universities VALUES ('203ed693-eae4-4472-a930-12fcf67c9ebf', 'Navitas- UC International College, Christchurch', '7eb12b40-f7f6-4d04-9558-767b27684400', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.659+06', '2026-07-30 19:24:28.659+06');
INSERT INTO public.universities VALUES ('955fd9a5-a804-4fa9-938a-8dcb74598c49', 'University of Waikato College, Hamilton, North Island', '7eb12b40-f7f6-4d04-9558-767b27684400', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.66+06', '2026-07-30 19:24:28.66+06');
INSERT INTO public.universities VALUES ('136d155f-4847-448b-831f-f32b7011c90d', 'Whitecliffe College of Arts and Design, Auckland & Christchurch', '7eb12b40-f7f6-4d04-9558-767b27684400', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.661+06', '2026-07-30 19:24:28.661+06');
INSERT INTO public.universities VALUES ('dc080af0-4ed0-4a9a-b42e-8d379f70dc49', 'Whitecliffe College of Fashion and Sustainability, Auckland & Wellington', '7eb12b40-f7f6-4d04-9558-767b27684400', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.661+06', '2026-07-30 19:24:28.661+06');
INSERT INTO public.universities VALUES ('edfdf1f0-62ea-443f-b00b-c0bad6db0cfb', 'Whitecliffe College of Technology & Innovation, Auckland, Wellington & Christchurch', '7eb12b40-f7f6-4d04-9558-767b27684400', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.662+06', '2026-07-30 19:24:28.662+06');
INSERT INTO public.universities VALUES ('346b8302-034f-48e0-ad02-86e57275edc9', 'Le Cordon Bleu, Wellington', '7eb12b40-f7f6-4d04-9558-767b27684400', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.663+06', '2026-07-30 19:24:28.663+06');
INSERT INTO public.universities VALUES ('92da3dd0-6525-4804-b79f-72e59efd6d07', 'The University of Auckland International College - Previously known as Taylors College, Auckland', '7eb12b40-f7f6-4d04-9558-767b27684400', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.664+06', '2026-07-30 19:24:28.664+06');
INSERT INTO public.universities VALUES ('3e2d28a7-4021-4610-976b-61081df83929', 'New Zealand Airline Academy, Oamaru', '7eb12b40-f7f6-4d04-9558-767b27684400', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.665+06', '2026-07-30 19:24:28.665+06');
INSERT INTO public.universities VALUES ('e616f96c-cc52-4a3d-b233-b78f0fe50510', 'New Zealand Management Academies (NZMA), Auckland', '7eb12b40-f7f6-4d04-9558-767b27684400', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.666+06', '2026-07-30 19:24:28.666+06');
INSERT INTO public.universities VALUES ('3c0bcf73-5c5e-48dc-95a0-d4f25cf83a6c', 'New Zealand Tertiary College (NZTC), Auckland', '7eb12b40-f7f6-4d04-9558-767b27684400', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.667+06', '2026-07-30 19:24:28.667+06');
INSERT INTO public.universities VALUES ('42c08760-b475-48b1-95d8-15c856e21b2c', 'New Zealand Industry Training Enterprise (NZITE), Auckland', '7eb12b40-f7f6-4d04-9558-767b27684400', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.668+06', '2026-07-30 19:24:28.668+06');
INSERT INTO public.universities VALUES ('a6ac1b42-2fa9-4d2f-a858-77456f486543', 'International College of Auckland, Auckland', '7eb12b40-f7f6-4d04-9558-767b27684400', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.669+06', '2026-07-30 19:24:28.669+06');
INSERT INTO public.universities VALUES ('f141953e-6c6d-41a4-a261-b96899237607', 'NEOMA Business Schoo', '33bbe9a8-eb95-4125-b388-78f27631ca50', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.673+06', '2026-07-30 19:24:28.673+06');
INSERT INTO public.universities VALUES ('166d5146-f18d-4f1d-b49a-5a1417eb9d5a', 'Skema Business School', '33bbe9a8-eb95-4125-b388-78f27631ca50', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.675+06', '2026-07-30 19:24:28.675+06');
INSERT INTO public.universities VALUES ('2b14acb8-851f-4130-86e9-bc74f8ac429b', 'ESCE International Business School', '33bbe9a8-eb95-4125-b388-78f27631ca50', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.677+06', '2026-07-30 19:24:28.677+06');
INSERT INTO public.universities VALUES ('3577d6fd-a2e2-4f28-b5af-b46f794b64d2', 'ESSCA School of Management', '33bbe9a8-eb95-4125-b388-78f27631ca50', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.678+06', '2026-07-30 19:24:28.678+06');
INSERT INTO public.universities VALUES ('565477a8-e4c7-4592-9587-0d5b62764b90', 'INSEEC Business School', '33bbe9a8-eb95-4125-b388-78f27631ca50', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.679+06', '2026-07-30 19:24:28.679+06');
INSERT INTO public.universities VALUES ('347d4ff7-1ebf-4c15-bc71-a1b731435873', 'Emlyon Business School', '33bbe9a8-eb95-4125-b388-78f27631ca50', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.681+06', '2026-07-30 19:24:28.681+06');
INSERT INTO public.universities VALUES ('2af2231f-8d35-43a3-b337-58e9b3e34f51', 'Montpellier Business School', '33bbe9a8-eb95-4125-b388-78f27631ca50', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.682+06', '2026-07-30 19:24:28.682+06');
INSERT INTO public.universities VALUES ('9d65998e-532c-4384-92d6-24a691208987', 'Istituto Marangoni, Paris', '33bbe9a8-eb95-4125-b388-78f27631ca50', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.684+06', '2026-07-30 19:24:28.684+06');
INSERT INTO public.universities VALUES ('ac146bbc-f64f-4b49-a50e-d86831d93c3c', 'Rennes School of Business', '33bbe9a8-eb95-4125-b388-78f27631ca50', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.685+06', '2026-07-30 19:24:28.685+06');
INSERT INTO public.universities VALUES ('2b6e74d8-7795-4bc1-ad7f-7293f1375a2a', 'De Vinci Higher Education', '33bbe9a8-eb95-4125-b388-78f27631ca50', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.686+06', '2026-07-30 19:24:28.686+06');
INSERT INTO public.universities VALUES ('f92ecba4-aa63-45db-a55a-2519dcb6ec42', 'ECE Engineering School', '33bbe9a8-eb95-4125-b388-78f27631ca50', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.688+06', '2026-07-30 19:24:28.688+06');
INSERT INTO public.universities VALUES ('7d558fa4-93fc-4b7b-946c-56a7b264e25f', 'Burgundy School of Business', '33bbe9a8-eb95-4125-b388-78f27631ca50', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.689+06', '2026-07-30 19:24:28.689+06');
INSERT INTO public.universities VALUES ('b4d7de3b-326a-428b-b428-e955e6059551', 'Paris School of Business', '33bbe9a8-eb95-4125-b388-78f27631ca50', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.69+06', '2026-07-30 19:24:28.69+06');
INSERT INTO public.universities VALUES ('dbc4ee74-d347-4f4c-a66e-6ca6de6c1eaf', 'ICN Business School', '33bbe9a8-eb95-4125-b388-78f27631ca50', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.691+06', '2026-07-30 19:24:28.691+06');
INSERT INTO public.universities VALUES ('e6614090-60b7-4387-add0-3a5defef231e', 'EPITECH, Paris', '33bbe9a8-eb95-4125-b388-78f27631ca50', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.692+06', '2026-07-30 19:24:28.692+06');
INSERT INTO public.universities VALUES ('972869eb-e749-4bad-a211-7bb4c8687aa1', 'EM Normandie', '33bbe9a8-eb95-4125-b388-78f27631ca50', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.693+06', '2026-07-30 19:24:28.693+06');
INSERT INTO public.universities VALUES ('a2ddeea7-6830-4fea-8f8f-f03f1de49842', 'PPA Business School (BSBI, Paris)', '33bbe9a8-eb95-4125-b388-78f27631ca50', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.694+06', '2026-07-30 19:24:28.694+06');
INSERT INTO public.universities VALUES ('f20fcaa8-f73b-406c-abd0-5fe70a266c46', 'Esigelec Graduate School of Engineering', '33bbe9a8-eb95-4125-b388-78f27631ca50', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.694+06', '2026-07-30 19:24:28.694+06');
INSERT INTO public.universities VALUES ('db0344a5-350f-4b40-a0d4-dd65f75c411e', 'Linnaeus University', '3eb390ed-d659-4445-8bde-47131bab30f6', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.699+06', '2026-07-30 19:24:28.699+06');
INSERT INTO public.universities VALUES ('4b4a92f9-fb70-411c-83ea-7d1352a02903', 'University of Skövde', '3eb390ed-d659-4445-8bde-47131bab30f6', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.701+06', '2026-07-30 19:24:28.701+06');
INSERT INTO public.universities VALUES ('5e8e61c2-7298-4a7c-8908-d6d4a377971e', 'University West', '3eb390ed-d659-4445-8bde-47131bab30f6', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.702+06', '2026-07-30 19:24:28.702+06');
INSERT INTO public.universities VALUES ('a4a07060-aec2-4391-8abb-c08e8f5d9167', 'Karlstad University, Karlstad', '3eb390ed-d659-4445-8bde-47131bab30f6', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.704+06', '2026-07-30 19:24:28.704+06');
INSERT INTO public.universities VALUES ('0a3a4d65-04d7-4747-92f3-3d740012f852', 'Kristianstad University', '3eb390ed-d659-4445-8bde-47131bab30f6', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.706+06', '2026-07-30 19:24:28.706+06');
INSERT INTO public.universities VALUES ('9668860f-68ee-4d26-ba2b-d54959f45536', 'Chonging university', '6a43b800-c1b7-4f34-9082-38011da84e5a', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.712+06', '2026-07-30 19:24:28.712+06');
INSERT INTO public.universities VALUES ('ba0c33b3-70a0-45e4-96fb-aae14f577f21', 'East china university of science & technology', '6a43b800-c1b7-4f34-9082-38011da84e5a', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.714+06', '2026-07-30 19:24:28.714+06');
INSERT INTO public.universities VALUES ('7a5a27e3-5c5e-48a2-a69f-4f362abadf1c', 'Zhenzhou university', '6a43b800-c1b7-4f34-9082-38011da84e5a', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.716+06', '2026-07-30 19:24:28.716+06');
INSERT INTO public.universities VALUES ('45a314cc-d9e4-47ae-ba61-0624cb6949e2', 'North polytechnical university', '6a43b800-c1b7-4f34-9082-38011da84e5a', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.718+06', '2026-07-30 19:24:28.718+06');
INSERT INTO public.universities VALUES ('6d64c8db-8915-4f2a-a4c9-2cf5a672103a', 'Chonging university of technology', '6a43b800-c1b7-4f34-9082-38011da84e5a', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.72+06', '2026-07-30 19:24:28.72+06');
INSERT INTO public.universities VALUES ('6191a3e5-0e63-47d0-add9-76d670f1971c', 'Civil Aviation university of china', '6a43b800-c1b7-4f34-9082-38011da84e5a', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.721+06', '2026-07-30 19:24:28.721+06');
INSERT INTO public.universities VALUES ('7e5c1e9c-6c25-4664-8c89-01fe7e3b2d92', 'Shanghai University of engineering  science', '6a43b800-c1b7-4f34-9082-38011da84e5a', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.723+06', '2026-07-30 19:24:28.723+06');
INSERT INTO public.universities VALUES ('f42ae10d-1330-4b73-8542-dcf1e8e604f8', 'Three Gorges university', '6a43b800-c1b7-4f34-9082-38011da84e5a', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.724+06', '2026-07-30 19:24:28.724+06');
INSERT INTO public.universities VALUES ('ce317c79-ea2d-4e03-abeb-0a25e244dc0f', 'Tianggong university', '6a43b800-c1b7-4f34-9082-38011da84e5a', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.725+06', '2026-07-30 19:24:28.725+06');
INSERT INTO public.universities VALUES ('e0f7591e-e33f-43a8-8b8c-cc2fa3128aaa', 'Hubei University', '6a43b800-c1b7-4f34-9082-38011da84e5a', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.727+06', '2026-07-30 19:24:28.727+06');
INSERT INTO public.universities VALUES ('59ad7331-12a0-4944-9404-fc53a6debf42', 'Donghua university', '6a43b800-c1b7-4f34-9082-38011da84e5a', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.728+06', '2026-07-30 19:24:28.728+06');
INSERT INTO public.universities VALUES ('2446f0b3-ee7f-43f9-9e61-e63021000dd2', 'Zhejiang University (Hangzhou)', '6a43b800-c1b7-4f34-9082-38011da84e5a', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.729+06', '2026-07-30 19:24:28.729+06');
INSERT INTO public.universities VALUES ('ca1bfb3a-e759-419d-9480-af9502064ae6', 'University of Electronic Science and Technology of China (UESTC) (Chengdu)', '6a43b800-c1b7-4f34-9082-38011da84e5a', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.73+06', '2026-07-30 19:24:28.73+06');
INSERT INTO public.universities VALUES ('f603af89-8ef2-408e-a13b-8a4acc056b7d', 'Nanjing University of Science and Technology (NJUST)', '6a43b800-c1b7-4f34-9082-38011da84e5a', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.731+06', '2026-07-30 19:24:28.731+06');
INSERT INTO public.universities VALUES ('8c29cc82-0fea-4cab-9adb-02abcd61491a', 'Sichuan University (SCU)', '6a43b800-c1b7-4f34-9082-38011da84e5a', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.733+06', '2026-07-30 19:24:28.733+06');
INSERT INTO public.universities VALUES ('633ada63-a8b8-4a43-82d8-e1ead03f2ed7', 'Wuhan University of  16-Shanghai Jiao Tong University (Shanghai)', '6a43b800-c1b7-4f34-9082-38011da84e5a', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.734+06', '2026-07-30 19:24:28.734+06');
INSERT INTO public.universities VALUES ('7bec5896-2cf3-4de5-8a1a-f6529c7927bf', 'Southeast University (Jiangsu)', '6a43b800-c1b7-4f34-9082-38011da84e5a', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.735+06', '2026-07-30 19:24:28.735+06');
INSERT INTO public.universities VALUES ('222bec40-6ac5-45cf-bc5d-168e1e9fd228', 'Tianjin University (Tianjin)', '6a43b800-c1b7-4f34-9082-38011da84e5a', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.736+06', '2026-07-30 19:24:28.736+06');
INSERT INTO public.universities VALUES ('3b8020c0-de38-412a-9d0d-60f976c096ba', 'South China University of Technology (Guangdong)', '6a43b800-c1b7-4f34-9082-38011da84e5a', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.737+06', '2026-07-30 19:24:28.737+06');
INSERT INTO public.universities VALUES ('7150a9ed-f7a5-4620-9522-421dbc5874a6', 'Nanjing tech university', '6a43b800-c1b7-4f34-9082-38011da84e5a', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.738+06', '2026-07-30 19:24:28.738+06');
INSERT INTO public.universities VALUES ('d532e6e8-f8f2-4ace-a75d-476067e21a66', 'Nanjing Normal University', '6a43b800-c1b7-4f34-9082-38011da84e5a', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.739+06', '2026-07-30 19:24:28.739+06');
INSERT INTO public.universities VALUES ('dd6f1a8d-43ea-4762-9054-fc2f82135296', 'Nanjing University of Aeronautics and Astronautics', '6a43b800-c1b7-4f34-9082-38011da84e5a', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.739+06', '2026-07-30 19:24:28.739+06');
INSERT INTO public.universities VALUES ('48da5639-1a6a-411d-9c5e-d2e116ae46e7', 'Nanjing University of the Arts', '6a43b800-c1b7-4f34-9082-38011da84e5a', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.74+06', '2026-07-30 19:24:28.74+06');
INSERT INTO public.universities VALUES ('021b4ef4-23a6-45e5-a29f-e43e00f9198e', 'Chengdu university of technology', '6a43b800-c1b7-4f34-9082-38011da84e5a', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.741+06', '2026-07-30 19:24:28.741+06');
INSERT INTO public.universities VALUES ('79b08b5a-6d97-4171-acb0-8a1013919a34', 'Kunming medical university (Kunming)', '6a43b800-c1b7-4f34-9082-38011da84e5a', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.742+06', '2026-07-30 19:24:28.742+06');
INSERT INTO public.universities VALUES ('2e09af99-b53c-4be4-aeff-005ce031d691', 'University of Nottingham, Malaysia Campus', '12ffe705-8a43-4c7a-9a0a-c14025d330ac', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.747+06', '2026-07-30 19:24:28.747+06');
INSERT INTO public.universities VALUES ('c4dcd9b3-fcf2-4324-a015-9398a64a7118', 'University of Wollongong, Malaysia Campus', '12ffe705-8a43-4c7a-9a0a-c14025d330ac', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.75+06', '2026-07-30 19:24:28.75+06');
INSERT INTO public.universities VALUES ('7a093325-6af6-4155-aad2-f15e90a73344', 'Taylor`s University, Malaysia', '12ffe705-8a43-4c7a-9a0a-c14025d330ac', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.751+06', '2026-07-30 19:24:28.751+06');
INSERT INTO public.universities VALUES ('fd1e1ae9-29a4-4c14-b648-a93fc7c3d4ee', 'Heriot-Watt University, Malaysia Campus', '12ffe705-8a43-4c7a-9a0a-c14025d330ac', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.753+06', '2026-07-30 19:24:28.753+06');
INSERT INTO public.universities VALUES ('695c9eb2-4f1e-4a0b-b75d-6b98828cd567', 'Sunway University, Petaling Jaya', '12ffe705-8a43-4c7a-9a0a-c14025d330ac', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.754+06', '2026-07-30 19:24:28.754+06');
INSERT INTO public.universities VALUES ('96e043a3-04ba-4416-b054-58e46319ebe1', 'Swinburne University of Technology, Sarawak Campus', '12ffe705-8a43-4c7a-9a0a-c14025d330ac', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.755+06', '2026-07-30 19:24:28.755+06');
INSERT INTO public.universities VALUES ('d60d4885-3d38-4c84-9234-c83d9d53fbac', 'UCSI University Kuala Lumpur', '12ffe705-8a43-4c7a-9a0a-c14025d330ac', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.757+06', '2026-07-30 19:24:28.757+06');
INSERT INTO public.universities VALUES ('636595a0-4428-4c54-b55f-b0247d9a5050', 'Asia Pacific University of Technology And Innovation, Kuala Lumpur', '12ffe705-8a43-4c7a-9a0a-c14025d330ac', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.759+06', '2026-07-30 19:24:28.759+06');
INSERT INTO public.universities VALUES ('e91d3d0a-eeb6-4e1d-be87-b90028361398', 'Sunway Le Cordon Bleu, Malaysia', '12ffe705-8a43-4c7a-9a0a-c14025d330ac', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.761+06', '2026-07-30 19:24:28.761+06');
INSERT INTO public.universities VALUES ('36a54f7e-8d12-4667-946c-eaade40ec1ac', 'Raffles University, Malaysia Campus', '12ffe705-8a43-4c7a-9a0a-c14025d330ac', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.763+06', '2026-07-30 19:24:28.763+06');
INSERT INTO public.universities VALUES ('86fa8e12-7f2a-4b90-9974-fc1024da0469', 'Raffles College of Higher Education, Malaysia Campus', '12ffe705-8a43-4c7a-9a0a-c14025d330ac', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.764+06', '2026-07-30 19:24:28.764+06');
INSERT INTO public.universities VALUES ('1158c6b5-639c-4c89-9322-52a9effdbd7f', 'Lincoln University College, Kota Bharu', '12ffe705-8a43-4c7a-9a0a-c14025d330ac', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.765+06', '2026-07-30 19:24:28.765+06');
INSERT INTO public.universities VALUES ('59e6ecdb-3b5d-4ff7-8a2a-194fbad06ddb', 'University of Antwerp, Antwerp', '067b5f25-c228-45bf-acd5-6d9afb8a7ef7', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.77+06', '2026-07-30 19:24:28.77+06');
INSERT INTO public.universities VALUES ('fff67315-8999-4415-9714-86f893b78eea', 'Thomas More, University of Applied Science, Antwerp', '067b5f25-c228-45bf-acd5-6d9afb8a7ef7', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.771+06', '2026-07-30 19:24:28.771+06');
INSERT INTO public.universities VALUES ('90b981ff-2687-4b41-8fba-e112966ecc2a', 'The University of New South Wales, Sydney (CRICOS Code 00098G)', '29b10031-6e4a-4838-9522-d17bc7dc83b0', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.778+06', '2026-07-30 19:24:28.778+06');
INSERT INTO public.universities VALUES ('aee1201d-8e5d-475e-9a21-bbe2c5daec99', 'University of Queensland, Brisbane (CRICOS Code 00025B)', '29b10031-6e4a-4838-9522-d17bc7dc83b0', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.78+06', '2026-07-30 19:24:28.78+06');
INSERT INTO public.universities VALUES ('bf6615c7-faaf-4366-9f3c-fa8a48660d2f', '(INTO) University of Western Australia College, Perth (CRICOS Code: 00126G)', '29b10031-6e4a-4838-9522-d17bc7dc83b0', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.782+06', '2026-07-30 19:24:28.782+06');
INSERT INTO public.universities VALUES ('62aa2130-7169-4fca-a1cb-b95f9fb5e9e7', 'The University of Adelaide, Adelaide (CRICOS Code 00123M)', '29b10031-6e4a-4838-9522-d17bc7dc83b0', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.784+06', '2026-07-30 19:24:28.784+06');
INSERT INTO public.universities VALUES ('2df5947d-4aac-4ea9-80d0-487fe7b7770b', 'University of Wollongong, Wollongong (CRICOS Code 00102E )', '29b10031-6e4a-4838-9522-d17bc7dc83b0', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.785+06', '2026-07-30 19:24:28.785+06');
INSERT INTO public.universities VALUES ('866cd1e6-2e74-47a4-a84c-3af51f7f691e', 'Griffith University, Gold Coast & Brisbane (CRICOS Code 00233E)', '29b10031-6e4a-4838-9522-d17bc7dc83b0', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.787+06', '2026-07-30 19:24:28.787+06');
INSERT INTO public.universities VALUES ('c2c480a2-078b-4868-a21b-5ceb82b8c397', 'University of Tasmania, Hobart & Launceston (CRICOS Code 00586B)', '29b10031-6e4a-4838-9522-d17bc7dc83b0', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.789+06', '2026-07-30 19:24:28.789+06');
INSERT INTO public.universities VALUES ('84ceee60-dc73-4e2a-920c-81a27fedc66a', 'The University of Newcastle, Newcastle (CRICOS Code 00109J)', '29b10031-6e4a-4838-9522-d17bc7dc83b0', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.79+06', '2026-07-30 19:24:28.79+06');
INSERT INTO public.universities VALUES ('b4b44b23-35e9-48cc-a773-78ff91309a9c', 'Russo Business School, Brisbane (CRICOS Code – 03441F)', '29b10031-6e4a-4838-9522-d17bc7dc83b0', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.791+06', '2026-07-30 19:24:28.791+06');
INSERT INTO public.universities VALUES ('a99ad0da-12e3-41b8-8799-27edba3e9803', 'James Cook University, Townsville, Cairns (CRICOS Code: 00117J)', '29b10031-6e4a-4838-9522-d17bc7dc83b0', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.792+06', '2026-07-30 19:24:28.792+06');
INSERT INTO public.universities VALUES ('4c5c1dd5-4409-4ba7-83c9-0c4cf41daea5', 'James Cook University, Brisbane (CRICOS Code 00117J)', '29b10031-6e4a-4838-9522-d17bc7dc83b0', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.793+06', '2026-07-30 19:24:28.793+06');
INSERT INTO public.universities VALUES ('62f4b560-efd9-4788-b935-1856c2f27bc6', 'The University of Notre Dame Australia, Fremantle (CRICOS Code 01032F)', '29b10031-6e4a-4838-9522-d17bc7dc83b0', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.794+06', '2026-07-30 19:24:28.794+06');
INSERT INTO public.universities VALUES ('871de8ae-b3dd-44d3-8d5a-f0383d033d5d', 'CQUniversity Australia, Sydney, Melbourne, Brisbane & Perth (CRICOS Code 00219C)', '29b10031-6e4a-4838-9522-d17bc7dc83b0', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.796+06', '2026-07-30 19:24:28.796+06');
INSERT INTO public.universities VALUES ('4d273a17-aba9-40fd-9f79-1004e0a5f130', 'Charles Darwin University International College (CRICOS Codes  0100739; 0100740)', '29b10031-6e4a-4838-9522-d17bc7dc83b0', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.797+06', '2026-07-30 19:24:28.797+06');
INSERT INTO public.universities VALUES ('7fb01649-7b4c-4cf2-95fa-649d64c8aa88', 'Le Cordon Bleu, Adelaide, Sydney, Melbourne & Perth (CRICOS Code 02380M)', '29b10031-6e4a-4838-9522-d17bc7dc83b0', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.798+06', '2026-07-30 19:24:28.798+06');
INSERT INTO public.universities VALUES ('35042f78-18b5-40cc-82de-4616483ad4d5', 'UTS College, Sydney, New South Wales (CRICOS Provider Codes: UTS College  00859D, UTS 00099F)', '29b10031-6e4a-4838-9522-d17bc7dc83b0', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.799+06', '2026-07-30 19:24:28.799+06');
INSERT INTO public.universities VALUES ('c75fe2d0-9177-4bb6-8973-06604c80d0bd', 'S P Jain School of Global Management, Sydney Campus (CRICOS Code 03335G)', '29b10031-6e4a-4838-9522-d17bc7dc83b0', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.801+06', '2026-07-30 19:24:28.801+06');
INSERT INTO public.universities VALUES ('446471df-2e92-4780-a04c-979ceeea3543', 'Academy of Interactive Technology, Sydney (CRICOS Code: 02155J) (formerly known as Academy of Information Technology)', '29b10031-6e4a-4838-9522-d17bc7dc83b0', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.802+06', '2026-07-30 19:24:28.802+06');
INSERT INTO public.universities VALUES ('802ceb21-ad8b-448c-bfe3-4e059ab20143', 'Ironwood Institute Adelaide, Adelaide (CRICOS Code: 03039E)', '29b10031-6e4a-4838-9522-d17bc7dc83b0', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.803+06', '2026-07-30 19:24:28.803+06');
INSERT INTO public.universities VALUES ('63f5eca9-c5e8-465c-af09-307835baf497', 'University of Adelaide College (CRICOS Code: 00123M)', '29b10031-6e4a-4838-9522-d17bc7dc83b0', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.805+06', '2026-07-30 19:24:28.805+06');
INSERT INTO public.universities VALUES ('5d119d50-3a44-4df3-a349-f00cca8859da', 'UNSW College, Sydney (CRICOS Code 00098G)', '29b10031-6e4a-4838-9522-d17bc7dc83b0', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.805+06', '2026-07-30 19:24:28.805+06');
INSERT INTO public.universities VALUES ('59e94690-4b17-41ed-b5d6-65db853982f1', 'University of Western Australia College, Perth (CRICOS Code: 00126G)', '29b10031-6e4a-4838-9522-d17bc7dc83b0', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.806+06', '2026-07-30 19:24:28.806+06');
INSERT INTO public.universities VALUES ('5efe8682-852b-4ca7-9c56-85575b2d3ace', 'Engineering Institute oF Technology, Australia (CRICOS Code: 03567C)', '29b10031-6e4a-4838-9522-d17bc7dc83b0', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.807+06', '2026-07-30 19:24:28.807+06');
INSERT INTO public.universities VALUES ('a016709b-4045-45cd-80e4-c680273c8306', 'LCI Melbourne (CRICOS Code 02201G)', '29b10031-6e4a-4838-9522-d17bc7dc83b0', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.808+06', '2026-07-30 19:24:28.808+06');
INSERT INTO public.universities VALUES ('01b85b13-4e11-4da5-9599-fc8dd2c45c91', 'Analytics Institute of Australia, Melbourne (CRICOS Code 04059D)', '29b10031-6e4a-4838-9522-d17bc7dc83b0', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.809+06', '2026-07-30 19:24:28.809+06');
INSERT INTO public.universities VALUES ('bc36ae5e-faf9-4471-a783-597461f1ccce', 'ELICOS Courses CELUSA (CRICOS Code: 00121B) WESTERN SYDNEY UNIVERSITY ‘THE COLLEGE’ CRICOS Provider Code 02851GK', '29b10031-6e4a-4838-9522-d17bc7dc83b0', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.81+06', '2026-07-30 19:24:28.81+06');
INSERT INTO public.universities VALUES ('a587dda7-7499-474c-9cbd-7c4edcd7d268', 'Eynesbury (CRICOS Code: 00561M)', '29b10031-6e4a-4838-9522-d17bc7dc83b0', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.811+06', '2026-07-30 19:24:28.811+06');
INSERT INTO public.universities VALUES ('6030f5c2-66db-46ac-b384-225a1817fcf9', 'Curtin College', '29b10031-6e4a-4838-9522-d17bc7dc83b0', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.812+06', '2026-07-30 19:24:28.812+06');
INSERT INTO public.universities VALUES ('f17adeec-ce08-48a2-aadf-e12b02d4deb5', 'Deakin College', '29b10031-6e4a-4838-9522-d17bc7dc83b0', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.812+06', '2026-07-30 19:24:28.812+06');
INSERT INTO public.universities VALUES ('868ed4bd-c94a-4971-b078-23471e2f300f', 'SAIBT (CRICOS Code: 01576G)', '29b10031-6e4a-4838-9522-d17bc7dc83b0', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.813+06', '2026-07-30 19:24:28.813+06');
INSERT INTO public.universities VALUES ('2008de18-ba4c-4223-8348-0896d2e1a49a', 'Queen''s University, Kingston, Ontario (Only UG)', '05c1cca6-8a65-4037-9958-ff6df037b574', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.818+06', '2026-07-30 19:24:28.818+06');
INSERT INTO public.universities VALUES ('8d2e0b59-72ce-4816-9959-8fe7aaf7d792', 'University of Ottawa, Ottawa, Ontario', '05c1cca6-8a65-4037-9958-ff6df037b574', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.819+06', '2026-07-30 19:24:28.819+06');
INSERT INTO public.universities VALUES ('d23c830a-31e5-4fdf-b362-9853e1015777', 'University of Victoria in Partnership with Kaplan, Victoria, British Columbia', '05c1cca6-8a65-4037-9958-ff6df037b574', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.822+06', '2026-07-30 19:24:28.822+06');
INSERT INTO public.universities VALUES ('35024aac-e6bb-4fe7-8aed-e6c649277f27', 'York University, School of Continuing Education, Toronto, Ontario', '05c1cca6-8a65-4037-9958-ff6df037b574', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.823+06', '2026-07-30 19:24:28.823+06');
INSERT INTO public.universities VALUES ('87137729-bc13-4d11-b26b-6307d4e0e3ba', 'University of Guelph, Guelph and Ridgetown Campus, Ontario', '05c1cca6-8a65-4037-9958-ff6df037b574', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.824+06', '2026-07-30 19:24:28.824+06');
INSERT INTO public.universities VALUES ('4cdf2fa1-2258-458d-88aa-3921610dd24c', 'University of Waterloo, Waterloo, Ontario', '05c1cca6-8a65-4037-9958-ff6df037b574', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.826+06', '2026-07-30 19:24:28.826+06');
INSERT INTO public.universities VALUES ('e6125209-336e-4d82-bfd0-feb6b0792074', 'University of Calgary Continuing Education, Calgary, Alberta', '05c1cca6-8a65-4037-9958-ff6df037b574', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.827+06', '2026-07-30 19:24:28.827+06');
INSERT INTO public.universities VALUES ('9366c792-d05c-4805-9ee0-fa77be9f5264', 'Dalhousie University, Halifax, Nova Scotia', '05c1cca6-8a65-4037-9958-ff6df037b574', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.828+06', '2026-07-30 19:24:28.828+06');
INSERT INTO public.universities VALUES ('82220e27-a946-4484-a7d7-a3170342a50b', 'Memorial University of Newfoundland, St. John''s, Newfoundland and Labrador (Only PG)', '05c1cca6-8a65-4037-9958-ff6df037b574', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.829+06', '2026-07-30 19:24:28.829+06');
INSERT INTO public.universities VALUES ('945e5dde-3f4f-46bc-b844-64690a4b86ea', 'Carleton University, Ottawa, Ontario', '05c1cca6-8a65-4037-9958-ff6df037b574', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.83+06', '2026-07-30 19:24:28.83+06');
INSERT INTO public.universities VALUES ('36222373-cc0c-44a1-aeba-d9ccead4197e', 'University of Manitoba, Winnipeg, Manitoba', '05c1cca6-8a65-4037-9958-ff6df037b574', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.831+06', '2026-07-30 19:24:28.831+06');
INSERT INTO public.universities VALUES ('18c03a0b-0c72-4bf7-8799-870612c07069', 'University of Windsor, Windsor, Ontario', '05c1cca6-8a65-4037-9958-ff6df037b574', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.831+06', '2026-07-30 19:24:28.831+06');
INSERT INTO public.universities VALUES ('d8f8801f-5318-44a6-bdff-6cda6c37cdf6', 'University of Windsor, Windsor, Ontario (PG Programs)', '05c1cca6-8a65-4037-9958-ff6df037b574', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.832+06', '2026-07-30 19:24:28.832+06');
INSERT INTO public.universities VALUES ('f041883d-3ccd-40b2-a83d-a942c118476f', 'University of New Brunswick, Fredericton, New Brunswick', '05c1cca6-8a65-4037-9958-ff6df037b574', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.833+06', '2026-07-30 19:24:28.833+06');
INSERT INTO public.universities VALUES ('e236e5aa-8942-49c7-88c0-db281709d53d', 'University of New Brunswick, Saint John,New Brunswick (Except students from India)', '05c1cca6-8a65-4037-9958-ff6df037b574', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.834+06', '2026-07-30 19:24:28.834+06');
INSERT INTO public.universities VALUES ('fc071ed3-9624-42a9-a900-e5ccfcb44de6', 'University of Regina, Regina, Saskatchewan', '05c1cca6-8a65-4037-9958-ff6df037b574', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.835+06', '2026-07-30 19:24:28.835+06');
INSERT INTO public.universities VALUES ('bc3d8cbd-3d47-435b-8d53-a1c6842c23f2', 'Brock University, St. Catharine’s, Ontario', '05c1cca6-8a65-4037-9958-ff6df037b574', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.837+06', '2026-07-30 19:24:28.837+06');
INSERT INTO public.universities VALUES ('83843fa2-9457-4fc0-8ed9-138f762e8f0c', 'Wilfrid Laurier University, Waterloo, Ontario (Only UG)', '05c1cca6-8a65-4037-9958-ff6df037b574', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.838+06', '2026-07-30 19:24:28.838+06');
INSERT INTO public.universities VALUES ('510ba827-619e-486a-ac85-6d9ec3120518', 'University of Lethbridge, Lethbridge, Alberta (Only UG)', '05c1cca6-8a65-4037-9958-ff6df037b574', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.839+06', '2026-07-30 19:24:28.839+06');
INSERT INTO public.universities VALUES ('c485d97b-8063-4bcc-b79a-5662a229ceea', 'Lakehead University, Thunder Bay, Ontario', '05c1cca6-8a65-4037-9958-ff6df037b574', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.841+06', '2026-07-30 19:24:28.841+06');
INSERT INTO public.universities VALUES ('eb690910-d4bf-4ca2-b7be-983e56d76a05', 'University of Winnipeg, Winnipeg, Manitoba', '05c1cca6-8a65-4037-9958-ff6df037b574', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.842+06', '2026-07-30 19:24:28.842+06');
INSERT INTO public.universities VALUES ('a832659f-f82a-483c-bf5d-83671d94bc14', 'University of Prince Edward Island, Charlottetown, Prince Edward Island', '05c1cca6-8a65-4037-9958-ff6df037b574', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.843+06', '2026-07-30 19:24:28.843+06');
INSERT INTO public.universities VALUES ('92504521-cfe0-4848-9353-2f8a04f34517', 'Acadia University, Wolfville, Nova Scotia (Only UG)', '05c1cca6-8a65-4037-9958-ff6df037b574', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.844+06', '2026-07-30 19:24:28.844+06');
INSERT INTO public.universities VALUES ('cef2ec0a-ecd3-4c48-b085-1f96c18dbbc2', 'St. Francis Xavier University, Antigonish, Nova Scotia', '05c1cca6-8a65-4037-9958-ff6df037b574', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.845+06', '2026-07-30 19:24:28.845+06');
INSERT INTO public.universities VALUES ('c9a9149e-a8ef-4554-84e6-f3606754eb6a', 'University of Northern British Columbia (UNBC), Prince George, British Columbia.', '05c1cca6-8a65-4037-9958-ff6df037b574', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.846+06', '2026-07-30 19:24:28.846+06');
INSERT INTO public.universities VALUES ('677b9734-81db-46b4-a97d-3259d01f4067', 'Kaplan-University of Connecticut, Connecticut (Public Ivy)', '880db315-ecff-4e91-9c91-bd346c013dcf', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.849+06', '2026-07-30 19:24:28.849+06');
INSERT INTO public.universities VALUES ('44207f7f-ef3b-495a-847b-d6b33cf0e95a', 'Shorelight- Johns Hopkins University, Baltimore, Maryland (PG Programs Only)', '880db315-ecff-4e91-9c91-bd346c013dcf', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.851+06', '2026-07-30 19:24:28.851+06');
INSERT INTO public.universities VALUES ('114edf44-835c-4bc8-84fd-75ba62e3e0fb', 'Kaplan- Arizona State University, Phoenix, Arizona', '880db315-ecff-4e91-9c91-bd346c013dcf', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.852+06', '2026-07-30 19:24:28.852+06');
INSERT INTO public.universities VALUES ('972ba17b-c795-4713-b73a-2f4398c74325', 'Kaplan- Arizona State University, Los Angeles, California', '880db315-ecff-4e91-9c91-bd346c013dcf', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.853+06', '2026-07-30 19:24:28.853+06');
INSERT INTO public.universities VALUES ('6a1f50af-853d-4508-9d8f-a6357f552b74', 'University of California, Riverside, California (Graduate Business Programs & College of Engineering and UCR Extension)', '880db315-ecff-4e91-9c91-bd346c013dcf', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.854+06', '2026-07-30 19:24:28.854+06');
INSERT INTO public.universities VALUES ('05c86946-ac22-487a-83dc-fb0544c09e1b', 'Virginia Tech Language and Culture Institute, Blacksburg, Virginia (UG and PG Pathways)', '880db315-ecff-4e91-9c91-bd346c013dcf', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.855+06', '2026-07-30 19:24:28.855+06');
INSERT INTO public.universities VALUES ('c49c78c5-a34d-417a-a809-f1c895d324c2', 'University of South Florida, Tampa, Florida (Only UG)', '880db315-ecff-4e91-9c91-bd346c013dcf', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.856+06', '2026-07-30 19:24:28.856+06');
INSERT INTO public.universities VALUES ('f4bea7f9-c586-46cc-b63f-e97d1b45754f', 'University of Oregon, Eugene, Oregon (Only UG)', '880db315-ecff-4e91-9c91-bd346c013dcf', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.857+06', '2026-07-30 19:24:28.857+06');
INSERT INTO public.universities VALUES ('a5dbfcbb-0765-4247-b289-59c1bd0a97ef', 'Southern Methodist University, Dallas, Texas (Only MS)', '880db315-ecff-4e91-9c91-bd346c013dcf', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.858+06', '2026-07-30 19:24:28.858+06');
INSERT INTO public.universities VALUES ('496cee04-edcf-4f59-9431-68bd60d5c8e2', 'University of Arizona, Tucon, Arizona (Direct)', '880db315-ecff-4e91-9c91-bd346c013dcf', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.859+06', '2026-07-30 19:24:28.859+06');
INSERT INTO public.universities VALUES ('575287bb-93b0-442f-bb97-9086d6bf975b', 'Drexel University, Philadelphia, Pennsylvania (College of Engg. UG Gateways and IEP)', '880db315-ecff-4e91-9c91-bd346c013dcf', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.86+06', '2026-07-30 19:24:28.86+06');
INSERT INTO public.universities VALUES ('278a9db4-61cc-49ef-aaf7-4127d9d14681', 'University of Delaware, Newark, Delaware (Only UG)', '880db315-ecff-4e91-9c91-bd346c013dcf', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.861+06', '2026-07-30 19:24:28.861+06');
INSERT INTO public.universities VALUES ('192b9a22-c0b9-4f3c-8613-d99673d4d875', 'Miami University, Oxford, Ohio', '880db315-ecff-4e91-9c91-bd346c013dcf', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.862+06', '2026-07-30 19:24:28.862+06');
INSERT INTO public.universities VALUES ('92e1359e-91cf-4af1-b37f-31d05e3a8f3b', 'University of Vermont, Burlington, Vermont (Only UG)', '880db315-ecff-4e91-9c91-bd346c013dcf', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.863+06', '2026-07-30 19:24:28.863+06');
INSERT INTO public.universities VALUES ('1f88d115-75dd-40bf-a199-e765dcaa1f32', 'Colorado State University, Fort Collins, Colorado', '880db315-ecff-4e91-9c91-bd346c013dcf', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.863+06', '2026-07-30 19:24:28.863+06');
INSERT INTO public.universities VALUES ('39fd1bb8-86d4-4981-baf8-9b7aa4055a8a', 'Shorelight- University of Illinois at Chicago, Illinois', '880db315-ecff-4e91-9c91-bd346c013dcf', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.864+06', '2026-07-30 19:24:28.864+06');
INSERT INTO public.universities VALUES ('86f8dea2-8b13-4b77-ba80-efaf06960cdc', 'The University of Alabama Tuscaloosa, Alabama', '880db315-ecff-4e91-9c91-bd346c013dcf', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.865+06', '2026-07-30 19:24:28.865+06');
INSERT INTO public.universities VALUES ('a54a667c-af20-45a3-829b-bc2910422a34', 'Claremont Graduate University, Claremont, California', '880db315-ecff-4e91-9c91-bd346c013dcf', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.866+06', '2026-07-30 19:24:28.866+06');
INSERT INTO public.universities VALUES ('69fd9631-09e7-47b8-ba52-5fc9e21e84ee', 'Keck Graduate Institute (KGI), Claremont, California', '880db315-ecff-4e91-9c91-bd346c013dcf', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.868+06', '2026-07-30 19:24:28.868+06');
INSERT INTO public.universities VALUES ('594d98d7-4143-4044-8b54-c2ace82d6892', 'Shorelight- University of Utah, Salt Lake City, Utah (Only UG)', '880db315-ecff-4e91-9c91-bd346c013dcf', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.869+06', '2026-07-30 19:24:28.869+06');
INSERT INTO public.universities VALUES ('bac99a73-8983-410f-97db-8e8f87876f1b', 'University of Cincinnati, Ohio (Only UG – Pathway and Direct entry)', '880db315-ecff-4e91-9c91-bd346c013dcf', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.87+06', '2026-07-30 19:24:28.87+06');
INSERT INTO public.universities VALUES ('87ceed95-c192-47f1-b4b2-f7fc3866ad81', 'Ohio University, Athens, Ohio (Only UG)', '880db315-ecff-4e91-9c91-bd346c013dcf', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.871+06', '2026-07-30 19:24:28.871+06');
INSERT INTO public.universities VALUES ('0712bc59-e5d0-4465-9a55-6f67747d8de2', 'University of the Pacific, Stockton, California (Direct tie-up)', '880db315-ecff-4e91-9c91-bd346c013dcf', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.872+06', '2026-07-30 19:24:28.872+06');
INSERT INTO public.universities VALUES ('0470a8d7-ecab-4218-adb8-6841ef11dd01', 'University of Kansas, Lawrence, Kansas (Only UG)', '880db315-ecff-4e91-9c91-bd346c013dcf', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.873+06', '2026-07-30 19:24:28.873+06');
INSERT INTO public.universities VALUES ('044dea7c-5e3b-4443-a0b5-18eac53e5136', 'University of Tulsa, Tulsa, Okhlohma', '880db315-ecff-4e91-9c91-bd346c013dcf', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.875+06', '2026-07-30 19:24:28.875+06');
INSERT INTO public.universities VALUES ('21f1c78e-e842-4c8f-a761-48b6e5484c9c', 'University of Maryland, Baltimore County, Maryland', '880db315-ecff-4e91-9c91-bd346c013dcf', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.876+06', '2026-07-30 19:24:28.876+06');
INSERT INTO public.universities VALUES ('02450a15-d049-490d-9698-eef722a35a58', 'University of Albany, The State University of New York, Albany (SUNY Albany)', '880db315-ecff-4e91-9c91-bd346c013dcf', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.877+06', '2026-07-30 19:24:28.877+06');
INSERT INTO public.universities VALUES ('76434100-4f49-4317-9209-34dfa9c65e8a', 'Shorelight- University of Dayton, Dayton, Ohio', '880db315-ecff-4e91-9c91-bd346c013dcf', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.878+06', '2026-07-30 19:24:28.878+06');
INSERT INTO public.universities VALUES ('1001d486-964e-4853-9a4c-575a0294e096', 'University of Colorado Denver, Colorado', '880db315-ecff-4e91-9c91-bd346c013dcf', NULL, false, NULL, NULL, NULL, true, true, '2026-07-30 19:24:28.878+06', '2026-07-30 19:24:28.878+06');


--
-- TOC entry 5014 (class 0 OID 28648)
-- Dependencies: 225
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.user_roles VALUES ('3dcb2e33-5225-4a77-a63a-aaaaf924f6fb', '2612a50c-4e58-4d4a-b3df-2daa1e9459bb', 'ADMIN');
INSERT INTO public.user_roles VALUES ('1d79443a-5eea-45a7-ac87-3a05a768867e', '33156a38-4164-4e9c-a2d0-3c9affad9984', 'ADMIN');


--
-- TOC entry 5013 (class 0 OID 28638)
-- Dependencies: 224
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES ('33156a38-4164-4e9c-a2d0-3c9affad9984', 'admin@ahbstudy.com', '$2b$10$Zbx94/y4hYGKJ2T3NRBrx.pOBaL1JwGpjKPlOJFkiNEmYgfmgofcq', '2026-07-30 19:24:28.231+06', '2026-07-30 19:24:28.231+06');
INSERT INTO public.users VALUES ('2612a50c-4e58-4d4a-b3df-2daa1e9459bb', 'admin@cambry.com', '$2b$10$Zbx94/y4hYGKJ2T3NRBrx.pOBaL1JwGpjKPlOJFkiNEmYgfmgofcq', '2026-07-21 15:42:49.195+06', '2026-07-30 19:24:28.254+06');


--
-- TOC entry 5015 (class 0 OID 28654)
-- Dependencies: 226
-- Data for Name: visa_approvals; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4846 (class 2606 OID 28625)
-- Name: announcements announcements_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.announcements
    ADD CONSTRAINT announcements_pkey PRIMARY KEY (id);


--
-- TOC entry 4836 (class 2606 OID 28565)
-- Name: countries countries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (id);


--
-- TOC entry 4840 (class 2606 OID 28590)
-- Name: english_tests english_tests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.english_tests
    ADD CONSTRAINT english_tests_pkey PRIMARY KEY (id);


--
-- TOC entry 4848 (class 2606 OID 28637)
-- Name: leads leads_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leads
    ADD CONSTRAINT leads_pkey PRIMARY KEY (id);


--
-- TOC entry 4842 (class 2606 OID 28601)
-- Name: scholarships scholarships_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scholarships
    ADD CONSTRAINT scholarships_pkey PRIMARY KEY (id);


--
-- TOC entry 4844 (class 2606 OID 28613)
-- Name: testimonials testimonials_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.testimonials
    ADD CONSTRAINT testimonials_pkey PRIMARY KEY (id);


--
-- TOC entry 4838 (class 2606 OID 28578)
-- Name: universities universities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universities
    ADD CONSTRAINT universities_pkey PRIMARY KEY (id);


--
-- TOC entry 4853 (class 2606 OID 28653)
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (id);


--
-- TOC entry 4851 (class 2606 OID 28647)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4856 (class 2606 OID 28666)
-- Name: visa_approvals visa_approvals_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.visa_approvals
    ADD CONSTRAINT visa_approvals_pkey PRIMARY KEY (id);


--
-- TOC entry 4834 (class 1259 OID 28667)
-- Name: countries_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX countries_name_key ON public.countries USING btree (name);


--
-- TOC entry 4854 (class 1259 OID 28669)
-- Name: user_roles_user_id_role_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX user_roles_user_id_role_key ON public.user_roles USING btree (user_id, role);


--
-- TOC entry 4849 (class 1259 OID 28668)
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- TOC entry 4858 (class 2606 OID 28675)
-- Name: scholarships scholarships_country_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scholarships
    ADD CONSTRAINT scholarships_country_id_fkey FOREIGN KEY (country_id) REFERENCES public.countries(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4859 (class 2606 OID 28680)
-- Name: scholarships scholarships_university_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scholarships
    ADD CONSTRAINT scholarships_university_id_fkey FOREIGN KEY (university_id) REFERENCES public.universities(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4857 (class 2606 OID 28670)
-- Name: universities universities_country_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universities
    ADD CONSTRAINT universities_country_id_fkey FOREIGN KEY (country_id) REFERENCES public.countries(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4860 (class 2606 OID 28685)
-- Name: user_roles user_roles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2026-07-31 16:35:39

--
-- PostgreSQL database dump complete
--

\unrestrict W5QDn1aMyDai6afg1BP0ECatJfwHFbO0GZGpK7AohHOnAatFXRG8Q5tYtHY4fgj

