/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { College, Course, Career } from './types';

export const COURSES: Course[] = [
  // Emerging Tech
  {
    id: 'btech_cs',
    name: 'B.Tech. in Computer Science (AI & Machine Learning)',
    demand_score: 98,
    difficulty_level: 'High',
    salary_range: '12 LPA - 45 LPA',
    level: 'Undergraduate',
    field_category: 'Emerging Tech',
  },
  {
    id: 'btech_cse_aiml',
    name: 'B.Tech. in Computer Science & Engineering (Artificial Intelligence & Machine Learning)',
    demand_score: 98,
    difficulty_level: 'High',
    salary_range: '10 LPA - 42 LPA',
    level: 'Undergraduate',
    field_category: 'Emerging Tech',
  },
  {
    id: 'btech_cse_ds',
    name: 'B.Tech. in Computer Science & Engineering (Data Science)',
    demand_score: 96,
    difficulty_level: 'High',
    salary_range: '9 LPA - 38 LPA',
    level: 'Undergraduate',
    field_category: 'Emerging Tech',
  },
  {
    id: 'btech_cse_cyber',
    name: 'B.Tech. in Computer Science & Engineering (Cybersecurity)',
    demand_score: 94,
    difficulty_level: 'High',
    salary_range: '8 LPA - 36 LPA',
    level: 'Undergraduate',
    field_category: 'Emerging Tech',
  },
  {
    id: 'btech_cse_iot',
    name: 'B.Tech. in Computer Science & Engineering (IoT & Blockchain)',
    demand_score: 90,
    difficulty_level: 'High',
    salary_range: '7.5 LPA - 32 LPA',
    level: 'Undergraduate',
    field_category: 'Emerging Tech',
  },
  {
    id: 'btech_it',
    name: 'B.Tech. in Information Technology',
    demand_score: 93,
    difficulty_level: 'Medium',
    salary_range: '8 LPA - 35 LPA',
    level: 'Undergraduate',
    field_category: 'Emerging Tech',
  },
  {
    id: 'btech_robotics',
    name: 'B.Tech. in Robotics & Automation Engineering',
    demand_score: 89,
    difficulty_level: 'High',
    salary_range: '7 LPA - 28 LPA',
    level: 'Undergraduate',
    field_category: 'Emerging Tech',
  },
  {
    id: 'btech_cloud',
    name: 'B.Tech. in Computer Science (Cloud Computing)',
    demand_score: 92,
    difficulty_level: 'Medium',
    salary_range: '8.5 LPA - 34 LPA',
    level: 'Undergraduate',
    field_category: 'Emerging Tech',
  },
  {
    id: 'mtech_ds',
    name: 'M.Tech. in Data Science & Advanced Computing',
    demand_score: 95,
    difficulty_level: 'High',
    salary_range: '15 LPA - 50 LPA',
    level: 'Postgraduate',
    field_category: 'Emerging Tech',
  },
  {
    id: 'cert_cyber',
    name: 'Certified Professional in Cybersecurity (CISO Pathway)',
    demand_score: 92,
    difficulty_level: 'Medium',
    salary_range: '8 LPA - 28 LPA',
    level: 'Professional Certification',
    field_category: 'Emerging Tech',
  },

  // Medical & Healthcare
  {
    id: 'mbbs',
    name: 'MBBS (Bachelor of Medicine, Bachelor of Surgery)',
    demand_score: 97,
    difficulty_level: 'High',
    salary_range: '15 LPA - 60 LPA (up to 120 LPA after specialized PG)',
    level: 'Undergraduate',
    field_category: 'Medical',
  },
  {
    id: 'md_cardio',
    name: 'MD in General Medicine / Cardiology Specialization',
    demand_score: 99,
    difficulty_level: 'High',
    salary_range: '24 LPA - 85 LPA',
    level: 'Postgraduate',
    field_category: 'Medical',
  },
  {
    id: 'dip_nurse',
    name: 'Diploma in General Nursing and Midwifery (GNM)',
    demand_score: 85,
    difficulty_level: 'Medium',
    salary_range: '3 LPA - 8 LPA',
    level: 'Diploma',
    field_category: 'Medical',
  },

  // Engineering & Core
  {
    id: 'btech_cse',
    name: 'B.Tech. in Computer Science and Engineering (CSE)',
    demand_score: 97,
    difficulty_level: 'High',
    salary_range: '8 LPA - 38 LPA',
    level: 'Undergraduate',
    field_category: 'Engineering',
  },
  {
    id: 'btech_ece',
    name: 'B.Tech. in Electronics & Communication Engineering (ECE)',
    demand_score: 91,
    difficulty_level: 'High',
    salary_range: '7 LPA - 28 LPA',
    level: 'Undergraduate',
    field_category: 'Engineering',
  },
  {
    id: 'btech_eee',
    name: 'B.Tech. in Electrical & Electronics Engineering (EEE)',
    demand_score: 85,
    difficulty_level: 'High',
    salary_range: '6 LPA - 20 LPA',
    level: 'Undergraduate',
    field_category: 'Engineering',
  },
  {
    id: 'btech_mechanical',
    name: 'B.Tech. in Mechanical & Robotics Engineering',
    demand_score: 83,
    difficulty_level: 'High',
    salary_range: '6 LPA - 18 LPA',
    level: 'Undergraduate',
    field_category: 'Engineering',
  },
  {
    id: 'btech_mech',
    name: 'B.Tech. in Mechanical Engineering',
    demand_score: 80,
    difficulty_level: 'High',
    salary_range: '5.5 LPA - 16 LPA',
    level: 'Undergraduate',
    field_category: 'Engineering',
  },
  {
    id: 'btech_civil',
    name: 'B.Tech. in Civil Engineering',
    demand_score: 78,
    difficulty_level: 'Medium',
    salary_range: '5 LPA - 15 LPA',
    level: 'Undergraduate',
    field_category: 'Engineering',
  },
  {
    id: 'btech_chem',
    name: 'B.Tech. in Chemical Engineering',
    demand_score: 82,
    difficulty_level: 'High',
    salary_range: '6 LPA - 22 LPA',
    level: 'Undergraduate',
    field_category: 'Engineering',
  },
  {
    id: 'dip_cse',
    name: 'Diploma in Computer Science & Engineering (Polytechnic)',
    demand_score: 87,
    difficulty_level: 'Medium',
    salary_range: '2.5 LPA - 6 LPA',
    level: 'Diploma',
    field_category: 'Engineering',
  },

  // Management & Business
  {
    id: 'bba_fin',
    name: 'BBA in Financial Markets & Corporate Valuation',
    demand_score: 88,
    difficulty_level: 'Medium',
    salary_range: '6 LPA - 16 LPA',
    level: 'Undergraduate',
    field_category: 'Management',
  },
  {
    id: 'mba_gen',
    name: 'MBA in Strategic Leadership & MBA-Ex',
    demand_score: 93,
    difficulty_level: 'High',
    salary_range: '14 LPA - 48 LPA',
    level: 'Postgraduate',
    field_category: 'Management',
  },

  // Science & Research
  {
    id: 'bsc_phys',
    name: 'B.Sc. (Hons) in Interdisciplinary Physics & Computing',
    demand_score: 75,
    difficulty_level: 'High',
    salary_range: '4.5 LPA - 12 LPA',
    level: 'Undergraduate',
    field_category: 'Science',
  },
  {
    id: 'msc_chem',
    name: 'M.Sc. in Applied Organic Chemistry & Materials',
    demand_score: 80,
    difficulty_level: 'Medium',
    salary_range: '5.5 LPA - 14 LPA',
    level: 'Postgraduate',
    field_category: 'Science',
  },

  // Commerce & FinTech
  {
    id: 'bcom_com',
    name: 'B.Com. (Hons) in Financial Accounting & Tax Law',
    demand_score: 82,
    difficulty_level: 'Low',
    salary_range: '4 LPA - 10 LPA',
    level: 'Undergraduate',
    field_category: 'Commerce',
  },
  {
    id: 'ca',
    name: 'Chartered Accountancy (ICAI Professional Certification)',
    demand_score: 94,
    difficulty_level: 'High',
    salary_range: '12 LPA - 35 LPA',
    level: 'Professional Certification',
    field_category: 'Commerce',
  },

  // Law, Humanities & Arts
  {
    id: 'llb',
    name: 'B.A. LLB (Hons) Integrated Corporate Jurist Program',
    demand_score: 89,
    difficulty_level: 'High',
    salary_range: '8 LPA - 28 LPA',
    level: 'Undergraduate',
    field_category: 'Law',
  },
  {
    id: 'bdes_animation',
    name: 'B.Des. in UI/UX & Visual Experience',
    demand_score: 86,
    difficulty_level: 'Medium',
    salary_range: '6 LPA - 22 LPA',
    level: 'Undergraduate',
    field_category: 'Design & Creative',
  },

  // Government Routes
  {
    id: 'gov_civil',
    name: 'Civil Services Track (UPSC CSE IAS/IPS Foundation)',
    demand_score: 96,
    difficulty_level: 'High',
    salary_range: '10 LPA - 18 LPA + Government Allowances',
    level: 'Professional Certification',
    field_category: 'Government',
  }
];

const SEED_COLLEGES: College[] = [
  // 1. Top Tier - National & State Elite (Telangana Focus)
  {
    id: 'iit_hyd',
    college_id: 1001,
    name: 'Indian Institute of Technology (IIT), Hyderabad',
    state: 'Telangana',
    district: 'Sangareddy',
    city: 'Kandi',
    type: 'Govt',
    ownership: 'Public',
    autonomous: true,
    affiliation: 'Autonomous (Autonomous Institute)',
    branches: ['CSE', 'RDS', 'MECH'],
    fees_min: 200000,
    fees_max: 220000,
    cutoff_eamcet: 95,
    placement_rate: 98,
    naac_grade: 'A++',
    website: 'iith.ac.in',
    location: 'Kandi, Sangareddy, Telangana',
    fees: 220000,
    cutoff: 95,
    courses_offered: ['btech_cs', 'mtech_ds', 'btech_mechanical'],
    tier: 'Top Tier'
  },
  {
    id: 'iiit_hyd',
    college_id: 1002,
    name: 'International Institute of Information Technology (IIIT), Hyderabad',
    state: 'Telangana',
    district: 'Hyderabad',
    city: 'Gachibowli',
    type: 'Private',
    ownership: 'Trust/PPP',
    autonomous: true,
    affiliation: 'Deemed University',
    branches: ['CSE', 'ECE'],
    fees_min: 300000,
    fees_max: 360000,
    cutoff_eamcet: 97,
    placement_rate: 100,
    naac_grade: 'A++',
    website: 'iiit.ac.in',
    location: 'Gachibowli, Hyderabad, Telangana',
    fees: 360000,
    cutoff: 97,
    courses_offered: ['btech_cs', 'mtech_ds'],
    tier: 'Top Tier'
  },
  {
    id: 'jntu_hyd',
    college_id: 1003,
    name: 'JNTUH University College of Engineering',
    state: 'Telangana',
    district: 'Hyderabad',
    city: 'Kukatpally',
    type: 'Govt',
    ownership: 'Public',
    autonomous: true,
    affiliation: 'JNTU Hyderabad',
    branches: ['CSE', 'ECE', 'MECH', 'CIVIL'],
    fees_min: 35000,
    fees_max: 50000,
    cutoff_eamcet: 86,
    placement_rate: 90,
    naac_grade: 'A+',
    website: 'jntuhceh.ac.in',
    location: 'Kukatpally, Hyderabad, Telangana',
    fees: 50000,
    cutoff: 86,
    courses_offered: ['btech_cs', 'mtech_ds', 'btech_mechanical'],
    tier: 'Top Tier'
  },
  {
    id: 'nalsar',
    college_id: 1004,
    name: 'NALSAR University of Law',
    state: 'Telangana',
    district: 'Malkajgiri',
    city: 'Shameerpet',
    type: 'Govt',
    ownership: 'Public',
    autonomous: true,
    affiliation: 'NALSAR University',
    branches: ['LLB', 'BL'],
    fees_min: 220000,
    fees_max: 250000,
    cutoff_eamcet: 92,
    placement_rate: 94,
    naac_grade: 'A++',
    website: 'nalsar.ac.in',
    location: 'Shameerpet, Hyderabad, Telangana',
    fees: 250000,
    cutoff: 92,
    courses_offered: ['llb'],
    tier: 'Top Tier'
  },
  {
    id: 'osmania_chem',
    college_id: 1005,
    name: 'Osmania University College of Engineering (OUCE)',
    state: 'Telangana',
    district: 'Hyderabad',
    city: 'Amberpet',
    type: 'Govt',
    ownership: 'Public',
    autonomous: true,
    affiliation: 'Osmania University',
    branches: ['CSE', 'ECE', 'MECH', 'CHEM'],
    fees_min: 12000,
    fees_max: 35000,
    cutoff_eamcet: 84,
    placement_rate: 86,
    naac_grade: 'A++',
    website: 'uceou.edu',
    location: 'Amberpet, Hyderabad, Telangana',
    fees: 12000,
    cutoff: 84,
    courses_offered: ['bsc_phys', 'msc_chem', 'btech_mechanical', 'btech_cs'],
    tier: 'Mid Tier'
  },

  // 2. Mid Tier - Progressive Private Colleges (Telangana & AP EAPCET Highlights)
  {
    id: 'cbit_hyd',
    college_id: 1006,
    name: 'Chaitanya Bharathi Institute of Technology (CBIT)',
    state: 'Telangana',
    district: 'Hyderabad',
    city: 'Gandipet',
    type: 'Private',
    ownership: 'Private Society',
    autonomous: true,
    affiliation: 'Osmania University',
    branches: ['CSE', 'ECE', 'MECH', 'CIVIL'],
    fees_min: 140000,
    fees_max: 140000,
    cutoff_eamcet: 78,
    placement_rate: 87,
    naac_grade: 'A++',
    website: 'cbit.ac.in',
    location: 'Gandipet, Hyderabad, Telangana',
    fees: 140000,
    cutoff: 72,
    courses_offered: ['btech_cs', 'btech_mechanical', 'bba_fin', 'mba_gen'],
    tier: 'Local/Regional'
  },
  {
    id: 'vnr_vjiet',
    college_id: 1007,
    name: 'VNR Vignana Jyothi Institute of Engineering and Technology',
    state: 'Telangana',
    district: 'Hyderabad',
    city: 'Bachupally',
    type: 'Private',
    ownership: 'Private Trust',
    autonomous: true,
    affiliation: 'JNTU Hyderabad',
    branches: ['CSE', 'ECE', 'IT', 'MECH'],
    fees_min: 135000,
    fees_max: 135000,
    cutoff_eamcet: 75,
    placement_rate: 88,
    naac_grade: 'A++',
    website: 'vnrvjiet.ac.in',
    location: 'Bachupally, Hyderabad, Telangana',
    fees: 135000,
    cutoff: 70,
    courses_offered: ['btech_cs', 'btech_mechanical'],
    tier: 'Local/Regional'
  },
  {
    id: 'vasavi_hyd',
    college_id: 1008,
    name: 'Vasavi College of Engineering (VCE)',
    state: 'Telangana',
    district: 'Hyderabad',
    city: 'Ibrahimbagh',
    type: 'Private',
    ownership: 'Private Trust',
    autonomous: true,
    affiliation: 'Osmania University',
    branches: ['CSE', 'ECE', 'MECH'],
    fees_min: 130000,
    fees_max: 130000,
    cutoff_eamcet: 82,
    placement_rate: 91,
    naac_grade: 'A++',
    website: 'vce.ac.in',
    location: 'Ibrahimbagh, Hyderabad, Telangana',
    fees: 130000,
    cutoff: 82,
    courses_offered: ['btech_cs', 'btech_mechanical'],
    tier: 'Mid Tier'
  },
  {
    id: 'griet_hyd',
    college_id: 1009,
    name: 'Gokaraju Rangaraju Institute of Engineering and Technology',
    state: 'Telangana',
    district: 'Hyderabad',
    city: 'Bachupally',
    type: 'Private',
    ownership: 'Private Trust',
    autonomous: true,
    affiliation: 'JNTU Hyderabad',
    branches: ['CSE', 'ECE', 'MECH'],
    fees_min: 122000,
    fees_max: 122000,
    cutoff_eamcet: 68,
    placement_rate: 84,
    naac_grade: 'A++',
    website: 'griet.ac.in',
    location: 'Bachupally, Hyderabad, Telangana',
    fees: 122000,
    cutoff: 68,
    courses_offered: ['btech_cs', 'btech_mechanical'],
    tier: 'Local/Regional'
  },
  {
    id: 'kits_warangal',
    college_id: 1010,
    name: 'Kakatiya Institute of Technology & Science (KITS)',
    state: 'Telangana',
    district: 'Warangal',
    city: 'Warangal',
    type: 'Private',
    ownership: 'Private Society',
    autonomous: true,
    affiliation: 'Kakatiya University',
    branches: ['CSE', 'ECE', 'MECH'],
    fees_min: 125000,
    fees_max: 125000,
    cutoff_eamcet: 67,
    placement_rate: 81,
    naac_grade: 'A',
    website: 'kitsw.ac.in',
    location: 'Yerragattu Hillock, Warangal, Telangana',
    fees: 125000,
    cutoff: 67,
    courses_offered: ['btech_cs', 'btech_mechanical'],
    tier: 'Local/Regional'
  },

  // 3. AP State Elite & Top Contenders (APSCHE Highlighted)
  {
    id: 'andhra_univ',
    college_id: 1011,
    name: 'Andhra University College of Engineering (AUCET)',
    state: 'Andhra Pradesh',
    district: 'Visakhapatnam',
    city: 'Visakhapatnam',
    type: 'Govt',
    ownership: 'Public',
    autonomous: true,
    affiliation: 'Andhra University',
    branches: ['CSE', 'ECE', 'MECH', 'CHEM'],
    fees_min: 35000,
    fees_max: 55000,
    cutoff_eamcet: 82,
    placement_rate: 84,
    naac_grade: 'A++',
    website: 'andhrauniversity.edu.in',
    location: 'Visakhapatnam, Andhra Pradesh',
    fees: 55000,
    cutoff: 80,
    courses_offered: ['btech_mechanical', 'btech_cs', 'msc_chem'],
    tier: 'Mid Tier'
  },
  {
    id: 'jntu_anantapur',
    college_id: 1012,
    name: 'JNTUA College of Engineering',
    state: 'Andhra Pradesh',
    district: 'Anantapur',
    city: 'Ananthapuramu',
    type: 'Govt',
    ownership: 'Public',
    autonomous: true,
    affiliation: 'JNTU Anantapur',
    branches: ['CSE', 'ECE', 'MECH', 'EE'],
    fees_min: 30000,
    fees_max: 40000,
    cutoff_eamcet: 76,
    placement_rate: 78,
    naac_grade: 'A',
    website: 'jntuaceaj.ac.in',
    location: 'Ananthapuramu, Andhra Pradesh',
    fees: 40000,
    cutoff: 76,
    courses_offered: ['btech_mechanical', 'btech_cs', 'dip_cse'],
    tier: 'Mid Tier'
  },
  {
    id: 'srm_ap',
    college_id: 1013,
    name: 'SRM University AP',
    state: 'Andhra Pradesh',
    district: 'Guntur',
    city: 'Amaravati',
    type: 'Private',
    ownership: 'Private Trust',
    autonomous: true,
    affiliation: 'SRM University',
    branches: ['CSE', 'ECE', 'BBA'],
    fees_min: 150000,
    fees_max: 250000,
    cutoff_eamcet: 77,
    placement_rate: 89,
    naac_grade: 'A++',
    website: 'srmap.edu.in',
    location: 'Amaravati, Andhra Pradesh',
    fees: 250000,
    cutoff: 77,
    courses_offered: ['btech_cs', 'bba_fin'],
    tier: 'Mid Tier'
  },
  {
    id: 'vit_ap',
    college_id: 1014,
    name: 'VIT-AP University',
    state: 'Andhra Pradesh',
    district: 'Guntur',
    city: 'Amaravati',
    type: 'Private',
    ownership: 'Private Trust',
    autonomous: true,
    affiliation: 'VIT University',
    branches: ['CSE', 'ECE', 'MECH'],
    fees_min: 150000,
    fees_max: 180000,
    cutoff_eamcet: 78,
    placement_rate: 88,
    naac_grade: 'A++',
    website: 'vitap.ac.in',
    location: 'Inavolu, Amaravati, Andhra Pradesh',
    fees: 180000,
    cutoff: 78,
    courses_offered: ['btech_cs', 'bba_fin', 'bdes_animation'],
    tier: 'Mid Tier'
  },
  {
    id: 'gvp_vizag',
    college_id: 1015,
    name: 'Gayatri Vidya Parishad College of Engineering (GVPCE)',
    state: 'Andhra Pradesh',
    district: 'Visakhapatnam',
    city: 'Madhurawada',
    type: 'Private',
    ownership: 'Private Society',
    autonomous: true,
    affiliation: 'JNTU Kakinada',
    branches: ['CSE', 'ECE', 'MECH'],
    fees_min: 80000,
    fees_max: 100000,
    cutoff_eamcet: 72,
    placement_rate: 81,
    naac_grade: 'A',
    website: 'gvpce.ac.in',
    location: 'Madhurawada, Visakhapatnam, Andhra Pradesh',
    fees: 85000,
    cutoff: 69,
    courses_offered: ['btech_cs', 'btech_mechanical'],
    tier: 'Local/Regional'
  },
  {
    id: 'vrsiddhartha',
    college_id: 1016,
    name: 'VR Siddhartha Engineering College',
    state: 'Andhra Pradesh',
    district: 'Krishna',
    city: 'Vijayawada',
    type: 'Private',
    ownership: 'Private Trust',
    autonomous: true,
    affiliation: 'JNTU Kakinada',
    branches: ['CSE', 'ECE', 'MECH', 'CIVIL'],
    fees_min: 70000,
    fees_max: 90000,
    cutoff_eamcet: 71,
    placement_rate: 82,
    naac_grade: 'A++',
    website: 'vrseconline.in',
    location: 'Kanuru, Vijayawada, Andhra Pradesh',
    fees: 70000,
    cutoff: 68,
    courses_offered: ['btech_cs', 'btech_mechanical', 'dip_cse'],
    tier: 'Local/Regional'
  },
  {
    id: 'gpullareddy_kurnool',
    college_id: 1017,
    name: 'G. Pulla Reddy Engineering College',
    state: 'Andhra Pradesh',
    district: 'Kurnool',
    city: 'Kurnool',
    type: 'Private',
    ownership: 'Private Trust',
    autonomous: true,
    affiliation: 'JNTU Anantapur',
    branches: ['CSE', 'ECE', 'MECH'],
    fees_min: 80000,
    fees_max: 80000,
    cutoff_eamcet: 66,
    placement_rate: 78,
    naac_grade: 'A+',
    website: 'gprec.ac.in',
    location: 'Kurnool, Andhra Pradesh',
    fees: 80000,
    cutoff: 66,
    courses_offered: ['btech_cs', 'btech_mechanical'],
    tier: 'Local/Regional'
  },
  {
    id: 'sreevidyanikethan_tirupati',
    college_id: 1018,
    name: 'Sree Vidyanikethan Engineering College (MBU)',
    state: 'Andhra Pradesh',
    district: 'Chittoor',
    city: 'Tirupati',
    type: 'Private',
    ownership: 'Private Trust',
    autonomous: true,
    affiliation: 'Mohan Babu University',
    branches: ['CSE', 'ECE', 'MECH'],
    fees_min: 95000,
    fees_max: 110000,
    cutoff_eamcet: 67,
    placement_rate: 81,
    naac_grade: 'A+',
    website: 'svec.education',
    location: 'A. Rangampet, Tirupati, Andhra Pradesh',
    fees: 95000,
    cutoff: 67,
    courses_offered: ['btech_cs', 'btech_mechanical', 'dip_cse'],
    tier: 'Local/Regional'
  },
  {
    id: 'vishnu_bhimavaram',
    college_id: 1050,
    name: 'Vishnu Institute of Technology (VITB)',
    state: 'Andhra Pradesh',
    district: 'West Godavari',
    city: 'Bhimavaram',
    type: 'Private',
    ownership: 'Private Trust',
    autonomous: true,
    affiliation: 'JNTU Kakinada',
    branches: ['CSE', 'ECE', 'MECH', 'IT', 'AI&ML'],
    fees_min: 75000,
    fees_max: 75000,
    cutoff_eamcet: 81,
    placement_rate: 89,
    naac_grade: 'A++',
    website: 'vishnu.edu.in',
    location: 'Bhimavaram, West Godavari, Andhra Pradesh',
    fees: 75000,
    cutoff: 81,
    courses_offered: ['btech_cs', 'btech_mechanical'],
    tier: 'Mid Tier'
  },
  {
    id: 'vishnu_women_bhimavaram',
    college_id: 1051,
    name: 'Shri Vishnu Engineering College for Women (SVECW)',
    state: 'Andhra Pradesh',
    district: 'West Godavari',
    city: 'Bhimavaram',
    type: 'Private',
    ownership: 'Private Trust',
    autonomous: true,
    affiliation: 'JNTU Kakinada',
    branches: ['CSE', 'ECE', 'IT', 'AI&DS'],
    fees_min: 78000,
    fees_max: 78000,
    cutoff_eamcet: 83,
    placement_rate: 91,
    naac_grade: 'A++',
    website: 'svecw.edu.in',
    location: 'Bhimavaram, West Godavari, Andhra Pradesh',
    fees: 78000,
    cutoff: 83,
    courses_offered: ['btech_cs'],
    tier: 'Mid Tier'
  },
  {
    id: 'cr_reddy_eluru',
    college_id: 1052,
    name: 'Sir C.R. Reddy College of Engineering',
    state: 'Andhra Pradesh',
    district: 'West Godavari',
    city: 'Eluru',
    type: 'Private',
    ownership: 'Private Society',
    autonomous: true,
    affiliation: 'Andhra University',
    branches: ['CSE', 'ECE', 'MECH', 'CIVIL', 'EEE'],
    fees_min: 65000,
    fees_max: 70000,
    cutoff_eamcet: 74,
    placement_rate: 76,
    naac_grade: 'A',
    website: 'sircrrengg.ac.in',
    location: 'Eluru, West Godavari, Andhra Pradesh',
    fees: 70000,
    cutoff: 74,
    courses_offered: ['btech_cs', 'btech_mechanical'],
    tier: 'Mid Tier'
  },
  {
    id: 'swarnandhra_narsapur',
    college_id: 1053,
    name: 'Swarnandhra College of Engineering and Technology',
    state: 'Andhra Pradesh',
    district: 'West Godavari',
    city: 'Narsapur',
    type: 'Private',
    ownership: 'Private Society',
    autonomous: true,
    affiliation: 'JNTU Kakinada',
    branches: ['CSE', 'ECE', 'MECH', 'CIVIL', 'IT'],
    fees_min: 62000,
    fees_max: 62000,
    cutoff_eamcet: 68,
    placement_rate: 74,
    naac_grade: 'A',
    website: 'swarnandhra.ac.in',
    location: 'Narsapur, West Godavari, Andhra Pradesh',
    fees: 62000,
    cutoff: 68,
    courses_offered: ['btech_cs', 'btech_mechanical', 'dip_cse'],
    tier: 'Local/Regional'
  },
  {
    id: 'sri_vasavi_tadepalligudem',
    college_id: 1054,
    name: 'Sri Vasavi Engineering College',
    state: 'Andhra Pradesh',
    district: 'West Godavari',
    city: 'Tadepalligudem',
    type: 'Private',
    ownership: 'Private Society',
    autonomous: true,
    affiliation: 'JNTU Kakinada',
    branches: ['CSE', 'ECE', 'MECH', 'CIVIL', 'IT', 'AI&ML'],
    fees_min: 68000,
    fees_max: 68000,
    cutoff_eamcet: 72,
    placement_rate: 82,
    naac_grade: 'A',
    website: 'srivasaviengg.ac.in',
    location: 'Pedatadepalli, Tadepalligudem, West Godavari, Andhra Pradesh',
    fees: 68000,
    cutoff: 72,
    courses_offered: ['btech_cs', 'btech_mechanical'],
    tier: 'Local/Regional'
  },
  {
    id: 'sasi_institute_tadepalligudem',
    college_id: 1055,
    name: 'Sasi Institute of Technology & Engineering (Sasi Institutions)',
    state: 'Andhra Pradesh',
    district: 'West Godavari',
    city: 'Tadepalligudem',
    type: 'Private',
    ownership: 'Private Society',
    autonomous: true,
    affiliation: 'JNTU Kakinada',
    branches: ['CSE', 'ECE', 'MECH', 'EEE', 'CIVIL', 'IT', 'AI&ML'],
    fees_min: 65000,
    fees_max: 65000,
    cutoff_eamcet: 70,
    placement_rate: 80,
    naac_grade: 'A',
    website: 'sasi.edu.in',
    location: 'Tadepalligudem, West Godavari, Andhra Pradesh',
    fees: 65000,
    cutoff: 70,
    courses_offered: ['btech_cs', 'btech_mechanical', 'dip_cse'],
    tier: 'Local/Regional'
  },

  // 4. Polytechnic & Technical Diploma Access (AP / TS Key Gateways)
  {
    id: 'govt_poly_masab',
    college_id: 1019,
    name: 'Government Polytechnic Masab Tank',
    state: 'Telangana',
    district: 'Hyderabad',
    city: 'Masab Tank',
    type: 'Govt',
    ownership: 'Public',
    autonomous: false,
    affiliation: 'State Board of Technical Education',
    branches: ['CSE', 'ECE', 'CIVIL'],
    fees_min: 4000,
    fees_max: 4500,
    cutoff_eamcet: 60,
    placement_rate: 68,
    naac_grade: 'B++',
    website: 'gptmasabtank.ac.in',
    location: 'Masab Tank, Hyderabad, Telangana',
    fees: 4500,
    cutoff: 60,
    courses_offered: ['dip_cse'],
    tier: 'Local/Regional'
  },
  {
    id: 'govt_poly_vij',
    college_id: 1020,
    name: 'Government Polytechnic Vijayawada',
    state: 'Andhra Pradesh',
    district: 'Krishna',
    city: 'Vijayawada',
    type: 'Govt',
    ownership: 'Public',
    autonomous: false,
    affiliation: 'SBTET Andhra Pradesh',
    branches: ['CSE', 'ECE', 'MECH'],
    fees_min: 4000,
    fees_max: 4800,
    cutoff_eamcet: 58,
    placement_rate: 65,
    naac_grade: 'B++',
    website: 'gptvijayawada.ac.in',
    location: 'Near Benz Circle, Vijayawada, Andhra Pradesh',
    fees: 4800,
    cutoff: 58,
    courses_offered: ['dip_cse'],
    tier: 'Local/Regional'
  },

  // 5. Special National / Out of State Fallbacks (Keep references clean)
  {
    id: 'aiims_delhi',
    college_id: 1021,
    name: 'All India Institute of Medical Sciences (AIIMS)',
    state: 'Delhi',
    district: 'New Delhi',
    city: 'Ansari Nagar',
    type: 'Govt',
    ownership: 'Public',
    autonomous: true,
    affiliation: 'Autonomous National Center',
    branches: ['MBBS', 'MD'],
    fees_min: 1628,
    fees_max: 1628,
    cutoff_eamcet: 99,
    placement_rate: 100,
    naac_grade: 'A++',
    website: 'aiims.edu',
    location: 'Ansari Nagar, New Delhi',
    fees: 1628,
    cutoff: 99,
    courses_offered: ['mbbs', 'md_cardio'],
    tier: 'Top Tier'
  },
  {
    id: 'iim_bangalore',
    college_id: 1022,
    name: 'Indian Institute of Management (IIM), Bangalore',
    state: 'Karnataka',
    district: 'Bengaluru',
    city: 'Bannerghatta Road',
    type: 'Govt',
    ownership: 'Public',
    autonomous: true,
    affiliation: 'Autonomous INI',
    branches: ['MBA', 'PGP'],
    fees_min: 1100000,
    fees_max: 1150000,
    cutoff_eamcet: 98,
    placement_rate: 99,
    naac_grade: 'A++',
    website: 'iimb.ac.in',
    location: 'Bannerghatta Road, Bengaluru, Karnataka',
    fees: 1150000,
    cutoff: 98,
    courses_offered: ['mba_gen'],
    tier: 'Top Tier'
  },
  {
    id: 'vit_vellore',
    college_id: 1023,
    name: 'Vellore Institute of Technology (VIT)',
    state: 'Tamil Nadu',
    district: 'Vellore',
    city: 'Katpadi',
    type: 'Private',
    ownership: 'Private Trust',
    autonomous: true,
    affiliation: 'Deemed University',
    branches: ['CSE', 'ECE', 'MECH', 'ANIM'],
    fees_min: 195000,
    fees_max: 198000,
    cutoff_eamcet: 82,
    placement_rate: 92,
    naac_grade: 'A++',
    website: 'vit.ac.in',
    location: 'Katpadi, Vellore, Tamil Nadu',
    fees: 198000,
    cutoff: 82,
    courses_offered: ['btech_cs', 'mtech_ds', 'btech_mechanical', 'bdes_animation'],
    tier: 'Mid Tier'
  },
  {
    id: 'icai_corp',
    college_id: 1024,
    name: 'Institute of Chartered Accountants (ICAI National Stream)',
    state: 'Other',
    district: 'All Councils',
    city: 'Hyderabad/Bengaluru Regional Councils',
    type: 'Govt',
    ownership: 'Statutory Body',
    autonomous: true,
    affiliation: 'Statutory Professional Body',
    branches: ['CA', 'AC'],
    fees_min: 50000,
    fees_max: 55000,
    cutoff_eamcet: 55,
    placement_rate: 90,
    naac_grade: 'N/A',
    website: 'icai.org',
    location: 'Bengaluru / Hyderabad Regional Councils',
    fees: 55000,
    cutoff: 55,
    courses_offered: ['ca', 'bcom_com'],
    tier: 'Local/Regional'
  },
  {
    id: 'upsc_track',
    college_id: 1025,
    name: 'National Civil Services Academy Ecosystem',
    state: 'Delhi',
    district: 'Delhi Center',
    city: 'New Delhi',
    type: 'Govt',
    ownership: 'Public',
    autonomous: true,
    affiliation: 'Union Public Service Commission',
    branches: ['Civil Service'],
    fees_min: 45000,
    fees_max: 45000,
    cutoff_eamcet: 50,
    placement_rate: 10,
    naac_grade: 'N/A',
    website: 'upsc.gov.in',
    location: 'New Delhi & Regional Centers',
    fees: 45000,
    cutoff: 50,
    courses_offered: ['gov_civil'],
    tier: 'Top Tier'
  }
];

const generateExpandedColleges = (): College[] => {
  const list = [...SEED_COLLEGES];
  const numToGenerate = 500; // Generate exactly 500 more colleges for a total of 525!
  
  const prefixes = [
    "Vagdevi", "Samskruti", "Mallareddy", "Geethanjali", "Talla Padmavathi", 
    "Holy Mary", "Babu Banarasi", "Sree Chaitanya", "Centurion", "Srinivasa", 
    "Audisankara", "RVR & JC", "Vignan", "Anurag", "CVR", "Sridevi", "Arjun", 
    "Bharat", "Pragati", "St. Martin's", "St. Mary's", "Jyothishmathi", "Sphoorthy", 
    "Scient", "Mahaveer", "Kasturba", "Avanti", "Narayana", "Konaseema", "Gouthami", 
    "Sree Rama", "Aditya", "Amrita", "Krupapanidhi", "Prerna", "Kshatriya", "Vikas", 
    "Abhinav", "Nalla Malla Reddy", "Vaageswari", "Balaji", "Chaitanya", "Kamala", 
    "Kakatiya", "Priyadarshini", "Gnanodaya", "Nalanda", "Hasvita", "Aurora", "Bandari"
  ];
  
  const suffixes = [
    "Institute of Technology", "College of Engineering", 
    "Institute of Science & Technology", "Engineering College for Women",
    "Technical Research Campus", "Global Academy of Technology"
  ];

  const districtsTS = [
    "Hyderabad", "Rangareddy", "Medchal-Malkajgiri", "Warangal", "Sangareddy", 
    "Nalgonda", "Karimnagar", "Khammam", "Nizamabad", "Mahabubnagar", "Adilabad"
  ];
  
  const districtsAP = [
    "Visakhapatnam", "East Godavari", "West Godavari", "Krishna", "Guntur", 
    "NTR", "Chittoor", "Anantapur", "Kurnool", "Nellore", "Srikakulam"
  ];

  const affiliationsTS = ["JNTU Hyderabad", "Osmania University", "Kakatiya University"];
  const affiliationsAP = ["JNTU Kakinada", "JNTU Anantapur", "Andhra University", "Sri Venkateswara University"];
  const grades: ('A++' | 'A+' | 'A' | 'B++' | 'B+' | 'B')[] = ["A++", "A+", "A", "B++", "B+", "B"];

  for (let i = 0; i < numToGenerate; i++) {
    const isTS = i % 2 === 0;
    const finalState: 'Andhra Pradesh' | 'Telangana' = isTS ? "Telangana" : "Andhra Pradesh";
    const type = i % 12 === 0 ? "Govt" : "Private";
    const ownership = type === "Govt" ? "Public" : (i % 3 === 0 ? "Private Trust" : "Private Society");
    const autonomous = i % 3 !== 0;
    
    const pref = prefixes[i % prefixes.length];
    const suff = suffixes[(i + Math.floor(i / prefixes.length)) % suffixes.length];
    const name = `${pref} ${suff} (Campus ${i + 1})`;
    
    let district = "";
    let city = "";
    let affiliation = "";
    
    if (isTS) {
      district = districtsTS[i % districtsTS.length];
      city = (district === "Hyderabad" || district === "Medchal-Malkajgiri" || district === "Rangareddy") 
        ? "Hyderabad" : district;
      affiliation = affiliationsTS[i % affiliationsTS.length];
    } else {
      district = districtsAP[i % districtsAP.length];
      city = (district === "Visakhapatnam") ? "Visakhapatnam" : (district === "Krishna" || district === "NTR" ? "Vijayawada" : district);
      affiliation = affiliationsAP[i % affiliationsAP.length];
    }
    
    const branchesSets = [
      ["CSE", "ECE", "MECH", "CIVIL", "EEE", "IT", "AI&ML"],
      ["CSE", "ECE", "IT"],
      ["CSE", "AI&ML", "IT"],
      ["CSE", "ECE", "EEE", "CIVIL"],
      ["CSE", "AI&ML", "Data Science", "Cybersecurity", "IoT", "IT"],
      ["CSE", "ECE", "MECH"],
      ["CSE", "AI&ML", "Data Science", "IT"]
    ];
    const branches = branchesSets[i % branchesSets.length];
    const feesBase = [35000, 45000, 75000, 85000, 110000, 125000, 135000][i % 7];
    const feesMin = feesBase;
    const feesMax = feesBase + (i % 7 === 0 ? 15000 : 0);
    const cutoff = 55 + (i % 35);
    const placementRate = 60 + (i % 29);
    const naacGrade = grades[i % grades.length];
    
    const websitePrefix = pref.toLowerCase().replace(/[^a-z]/g, "");
    const website = `${websitePrefix}-campus${i + 1}.edu.in`;
    
    const id = `col_${2000 + i}`;
    const collegeId = 2000 + i;
    
    const location = `${city}, ${district}, ${finalState}`;
    
    // Map of mock courses_offered dynamically based on branches
    const coursesOffered: string[] = [];
    if (branches.includes("CSE")) {
      coursesOffered.push("btech_cse");
      coursesOffered.push("btech_cs");
    }
    if (branches.includes("AI&ML")) {
      coursesOffered.push("btech_cse_aiml");
    }
    if (branches.includes("Data Science")) {
      coursesOffered.push("btech_cse_ds");
    }
    if (branches.includes("Cybersecurity")) {
      coursesOffered.push("btech_cse_cyber");
    }
    if (branches.includes("IoT")) {
      coursesOffered.push("btech_cse_iot");
    }
    if (branches.includes("IT")) {
      coursesOffered.push("btech_it");
    }
    if (branches.includes("ECE")) {
      coursesOffered.push("btech_ece");
    }
    if (branches.includes("EEE")) {
      coursesOffered.push("btech_eee");
    }
    if (branches.includes("MECH")) {
      coursesOffered.push("btech_mech");
      coursesOffered.push("btech_mechanical");
    }
    if (branches.includes("CIVIL")) {
      coursesOffered.push("btech_civil");
    }
    if (i % 5 === 0) {
      coursesOffered.push("btech_robotics");
    }
    if (i % 7 === 0) {
      coursesOffered.push("btech_cloud");
    }
    if (i % 12 === 0) {
      coursesOffered.push("bba_fin");
    }
    if (i % 18 === 0) {
      coursesOffered.push("dip_cse");
    }
    if (coursesOffered.length === 0) {
      coursesOffered.push("btech_cse");
    }

    list.push({
      id,
      college_id: collegeId,
      name,
      state: finalState,
      district,
      city,
      type,
      ownership,
      autonomous,
      affiliation,
      branches,
      fees_min: feesMin,
      fees_max: feesMax,
      cutoff_eamcet: cutoff,
      placement_rate: placementRate,
      naac_grade: naacGrade,
      website,
      location,
      fees: feesMax,
      cutoff,
      courses_offered: coursesOffered,
      tier: cutoff > 85 ? "Top Tier" : (cutoff > 70 ? "Mid Tier" : "Local/Regional")
    });
  }
  return list;
};

export const COLLEGES: College[] = generateExpandedColleges();

export const CAREERS: Career[] = [
  // Emerging Tech / AI
  {
    id: 'ai_engineer',
    course_id: 'btech_cs',
    job_roles: ['Machine Learning Engineer', 'Data Scientist', 'AI Platform Engineer', 'Data Analyst', 'NLP Engineer', 'Research Scientist'],
    avg_salary: 16, // LPA
    future_scope_score: 99,
    growth_trend: 'Rising'
  },
  {
    id: 'data_consultant',
    course_id: 'mtech_ds',
    job_roles: ['Big Data Architect', 'Lead AI Scientist', 'Quantitative Data Analyst', 'Computer Vision Specialty Engineer'],
    avg_salary: 22, // LPA
    future_scope_score: 98,
    growth_trend: 'Rising'
  },
  {
    id: 'ethical_hacker',
    course_id: 'cert_cyber',
    job_roles: ['Information Security Manager', 'Penetration Tester', 'Ethical Hacker', 'Cyber Threat Analyst'],
    avg_salary: 11, // LPA
    future_scope_score: 93,
    growth_trend: 'Rising'
  },

  // Medical
  {
    id: 'physician',
    course_id: 'mbbs',
    job_roles: ['General Physician', 'Resident Doctor', 'Clinical Officer', 'Health Consultant'],
    avg_salary: 18,
    future_scope_score: 97,
    growth_trend: 'Rising'
  },
  {
    id: 'cardiologist',
    course_id: 'md_cardio',
    job_roles: ['Consultant Cardiologist', 'Heart Specialist Surgeon', 'Medical School Professor'],
    avg_salary: 45,
    future_scope_score: 99,
    growth_trend: 'Rising'
  },
  {
    id: 'registered_nurse',
    course_id: 'dip_nurse',
    job_roles: ['Senior Clinical Nurse', 'ICU Nurse Coordinator', 'Home Healthcare Supervisor'],
    avg_salary: 4.5,
    future_scope_score: 88,
    growth_trend: 'Stable'
  },

  // Core Engineering
  {
    id: 'software_engineer_cse',
    course_id: 'btech_cse',
    job_roles: ['Full-Stack Software Engineer', 'System Architect', 'Backend Developer', 'Frontend Developer', 'Application Engineer'],
    avg_salary: 10,
    future_scope_score: 96,
    growth_trend: 'Rising'
  },
  {
    id: 'electronics_engineer_ece',
    course_id: 'btech_ece',
    job_roles: ['Embedded Systems Engineer', 'VLSI Design Engineer', 'Telecom Engineer', 'Network Administrator', 'Hardware Architect'],
    avg_salary: 8,
    future_scope_score: 92,
    growth_trend: 'Rising'
  },
  {
    id: 'electrical_engineer_eee',
    course_id: 'btech_eee',
    job_roles: ['Power Systems Engineer', 'Control Electrical Engineer', 'Grid Operator', 'Renewable Energy Analyst', 'Microgrid Planner'],
    avg_salary: 7.5,
    future_scope_score: 88,
    growth_trend: 'Stable'
  },
  {
    id: 'mechanical_engineer_mech',
    course_id: 'btech_mech',
    job_roles: ['Design Engineer (CAD/CAM)', 'Thermal Analyst', 'Automotive Systems Engineer', 'Manufacturing Consultant', 'HVAC Engineer'],
    avg_salary: 6.8,
    future_scope_score: 82,
    growth_trend: 'Stable'
  },
  {
    id: 'civil_engineer_civil',
    course_id: 'btech_civil',
    job_roles: ['Structural Engineer', 'Site Construction Manager', 'Transportation Planner', 'Geotechnical Analyst', 'Urban Planner'],
    avg_salary: 6.5,
    future_scope_score: 81,
    growth_trend: 'Stable'
  },
  {
    id: 'chemical_engineer_chem',
    course_id: 'btech_chem',
    job_roles: ['Process Optimization Engineer', 'Petroleum Technologist', 'Bioprocess Specialist', 'Environmental Safety Lead'],
    avg_salary: 7.8,
    future_scope_score: 84,
    growth_trend: 'Stable'
  },
  {
    id: 'aiml_specialist_aiml',
    course_id: 'btech_cse_aiml',
    job_roles: ['Machine Learning Practitioner', 'Computer Vision Specialist', 'NLP Developer', 'AI Algorithms Engineer', 'Cognitive Solutions Engineer'],
    avg_salary: 14,
    future_scope_score: 99,
    growth_trend: 'Rising'
  },
  {
    id: 'data_scientist_ds',
    course_id: 'btech_cse_ds',
    job_roles: ['Data Scientist', 'Business Intelligence Analyst', 'Data Engineer', 'Quantitative Modeling Analyst'],
    avg_salary: 13,
    future_scope_score: 98,
    growth_trend: 'Rising'
  },
  {
    id: 'cybersecurity_expert',
    course_id: 'btech_cse_cyber',
    job_roles: ['Security Operations Center (SOC) Analyst', 'Penetration Tester', 'Network Security Architect', 'Incident Responder'],
    avg_salary: 11,
    future_scope_score: 96,
    growth_trend: 'Rising'
  },
  {
    id: 'iot_iot_eng',
    course_id: 'btech_cse_iot',
    job_roles: ['IoT Solutions Architect', 'Smart Systems Integration Developer', 'Firmware Engineer', 'Sensor Technologies Specialist'],
    avg_salary: 10,
    future_scope_score: 94,
    growth_trend: 'Rising'
  },
  {
    id: 'it_solutions_architect',
    course_id: 'btech_it',
    job_roles: ['Systems Analyst', 'Enterprise Programmer', 'IT Infrastructure Lead', 'Database Administrator'],
    avg_salary: 9.5,
    future_scope_score: 93,
    growth_trend: 'Stable'
  },
  {
    id: 'robotics_automation_expert',
    course_id: 'btech_robotics',
    job_roles: ['Robotics Engineer', 'Industrial Automation Integrator', 'HRI Design Researcher', 'Kinematics Analyst'],
    avg_salary: 11,
    future_scope_score: 95,
    growth_trend: 'Rising'
  },
  {
    id: 'cloud_consultant_cloud',
    course_id: 'btech_cloud',
    job_roles: ['Cloud DevOps Solutions Architect', 'AWS/Azure System Operator', 'Kubernetes/Docker Administrator', 'Site Reliability Engineer'],
    avg_salary: 12,
    future_scope_score: 97,
    growth_trend: 'Rising'
  },
  {
    id: 'robotics_engineer',
    course_id: 'btech_mechanical',
    job_roles: ['Robotics Automation Specialist', 'Mechatronics Engineer', 'CAD Layout Designer', 'Control Systems Engineer'],
    avg_salary: 8.5,
    future_scope_score: 91,
    growth_trend: 'Rising'
  },
  {
    id: 'poly_swe',
    course_id: 'dip_cse',
    job_roles: ['Junior Code Engineer', 'Associate IT Support Specialist', 'System Maintenance Engineer'],
    avg_salary: 3.8,
    future_scope_score: 80,
    growth_trend: 'Stable'
  },

  // Business / Finance
  {
    id: 'portfolio_analyst',
    course_id: 'bba_fin',
    job_roles: ['Equity Research Analyst', 'FinTech Sales Lead', 'Treasury Executive'],
    avg_salary: 7.2,
    future_scope_score: 87,
    growth_trend: 'Stable'
  },
  {
    id: 'corp_executive',
    course_id: 'mba_gen',
    job_roles: ['Corporate Strategy Consultant', 'Operations Director', 'Brand Manager', 'Product Business Lead'],
    avg_salary: 20,
    future_scope_score: 94,
    growth_trend: 'Rising'
  },

  // Law & Commerce
  {
    id: 'jurist',
    course_id: 'llb',
    job_roles: ['Corporate Legal Associate', 'Litigation Council', 'Legal Advisor', 'Compliance Officer'],
    avg_salary: 11,
    future_scope_score: 90,
    growth_trend: 'Stable'
  },
  {
    id: 'ca_finance',
    course_id: 'ca',
    job_roles: ['Statutory Auditor', 'Tax Consultant', 'Insolvency Specialist', 'Chief Financial Officer (CFO)'],
    avg_salary: 15,
    future_scope_score: 96,
    growth_trend: 'Rising'
  },

  // Creative & Gov
  {
    id: 'experience_designer',
    course_id: 'bdes_animation',
    job_roles: ['UX Designer', 'Interaction Architect', 'Creative Director', 'Brand Identity Lead'],
    avg_salary: 12,
    future_scope_score: 91,
    growth_trend: 'Rising'
  },
  {
    id: 'ias_officer',
    course_id: 'gov_civil',
    job_roles: ['Sub-divisional Magistrate (SDM)', 'District Collector', 'Ministry Secretary', 'Policy Director'],
    avg_salary: 14,
    future_scope_score: 98,
    growth_trend: 'Stable'
  }
];
