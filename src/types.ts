/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface College {
  id: string;
  college_id: number;
  name: string;
  state: 'Andhra Pradesh' | 'Telangana' | 'Karnataka' | 'Tamil Nadu' | 'Maharashtra' | 'Delhi' | 'Other';
  district: string;
  city: string;
  type: string;
  ownership: string;
  autonomous: boolean;
  affiliation: string;
  branches: string[];
  fees_min: number;
  fees_max: number;
  cutoff_eamcet: number; // numeric value for comparative queries
  placement_rate: number; // percentage (0-100)
  naac_grade: 'A++' | 'A+' | 'A' | 'B++' | 'B+' | 'B' | 'C' | 'N/A';
  website: string;

  // Backward-compatibility properties
  location: string;
  fees: number; // mapped to fees_max or avg fees
  cutoff: number; // mapped to cutoff_eamcet
  courses_offered: string[]; // mapped to support course IDs
  image_url?: string;
  tier: 'Top Tier' | 'Mid Tier' | 'Local/Regional';
}

export interface Course {
  id: string;
  name: string;
  demand_score: number; // (0-100)
  difficulty_level: 'Low' | 'Medium' | 'High';
  salary_range: string; // e.g., "6 LPA - 24 LPA"
  level: 'Diploma' | 'Undergraduate' | 'Postgraduate' | 'Professional Certification';
  field_category:
    | 'Engineering'
    | 'Medical'
    | 'Management'
    | 'Science'
    | 'Arts & Humanities'
    | 'Law'
    | 'Commerce'
    | 'Design & Creative'
    | 'Government'
    | 'Emerging Tech';
}

export interface Career {
  id: string;
  course_id: string;
  job_roles: string[];
  avg_salary: number; // average salary in LPA (e.g., 12)
  future_scope_score: number; // (0-100)
  growth_trend: 'Rising' | 'Stable' | 'Declining';
}

export interface DomainDegrees {
  ug: string[];
  pg: string[];
  diploma: string[];
  certifications: string[];
}

export interface DomainBreakdown {
  domain_name: string;
  degrees_available: DomainDegrees;
  major_job_roles: string[];
  skill_requirements: string[];
  salary_range_india: string;
}

export interface CollegeOption {
  name: string;
  tier: 'Top Tier' | 'Mid Tier' | 'Local/Regional';
  location: string;
  fees: string; // e.g. "₹2.5 Lakhs / Year"
  expected_cutoff: string; // e.g. "92% / JEE percentile"
  placement_rate: string; // e.g. "95% placement rate"
}

export interface RankedOption {
  rank: number;
  college_name: string;
  course_name: string;
  match_score: number; // 0 - 100
  admission_probability: 'Low' | 'Medium' | 'High';
  career_outcome_rating: number; // 0 - 100
  roi_score: number; // 0 - 100
  reason: string;
  details?: string[];
  why_ranked_high?: string;
  why_lost_points?: string;
  comparison_verdict?: string;
  confidence_score?: 'High' | 'Medium' | 'Low';
}

export interface WrongChoiceWarning {
  is_mismatch_detected: boolean;
  why_risky: string;
  suggested_alternative: string;
}

export interface FinalRecommendation {
  best_option: string;
  why_best: string;
  roi_score_analysis: string;
}

export interface FuturePathSimulation {
  year_1_path: string;
  year_4_path: string;
  job_outcome_range: string; // e.g. "8 LPA - 12 LPA"
}

export interface AdvancedCareerGrowth {
  short_term: string;
  mid_term: string;
  long_term_potential: string;
}

export interface AnalysisResponse {
  profile_summary: string[];
  stage_classification?: string;
  domain_identification: string;
  domain_breakdown: DomainBreakdown;
  college_options_mapped: CollegeOption[];
  ranked_options: RankedOption[];
  wrong_choice_warning: WrongChoiceWarning;
  final_recommendation: FinalRecommendation;
  future_path_simulation: FuturePathSimulation;
  future_career_growth_path: AdvancedCareerGrowth;
}
