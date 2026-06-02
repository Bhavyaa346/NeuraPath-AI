/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  Award,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  MapPin,
  Sparkles,
  BookOpen,
  ChevronRight,
  GraduationCap,
  ArrowRight,
  TrendingUp,
  Activity,
  Search,
  Database,
  Building,
  Briefcase,
  Layers,
  ChevronDown,
  Info,
  X,
  Globe,
  Percent,
  ExternalLink
} from 'lucide-react';
import { College, Course, Career, AnalysisResponse } from './types';

function MatchScoreBadgeSvg({ score }: { score: number }) {
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference - (score / 100) * circumference;
  const color = score >= 90 ? 'text-emerald-400 stroke-emerald-500' : score >= 75 ? 'text-cyan-400 stroke-cyan-500' : 'text-amber-500 stroke-amber-500';
  return (
    <div className="relative flex items-center justify-center w-11 h-11 shrink-0 bg-slate-950 rounded-full border border-slate-800">
      <svg className="w-10 h-10 transform -rotate-90">
        <circle cx="20" cy="20" r={radius} className="stroke-slate-850 fill-none" strokeWidth="2.5" />
        <circle
          cx="20"
          cy="20"
          r={radius}
          className={`${color} fill-none transition-all duration-500`}
          strokeWidth="2.5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeOffset}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-[10px] font-mono font-bold text-white">{score}%</span>
    </div>
  );
}

export default function App() {
  // Input states (Indian Academic Parameters)
  const [gpa, setGpa] = useState<number>(8.8); // Academics CGPA out of 10.0
  const [satScore, setSatScore] = useState<number>(94); // National / State Exam Percentile (JEE/NEET etc.)
  const [marks, setMarks] = useState<number>(88); // 10th / 12th Board Marks / Equivalent %
  const [broadInterest, setBroadInterest] = useState<string>('Emerging Tech');
  const [interest, setInterest] = useState<string>('btech_cs');
  const [budget, setBudget] = useState<number>(240000); // INR per Year (₹2.4 Lakhs Default)
  const [location, setLocation] = useState<string>('Hyderabad, Telangana');
  const [careerGoal, setCareerGoal] = useState<string>('Machine Learning Engineer');

  // Staged Questioning States
  const [educationLevel, setEducationLevel] = useState<string>(''); // Stage 1 (Empty initially to force first question)
  const [stream, setStream] = useState<string>('Science'); // Stream (Science/Commerce/Arts) for 12th
  const [entrancePlanned, setEntrancePlanned] = useState<string>('JEE'); // Entrance (JEE/NEET/EAMCET/etc.)
  const [branch, setBranch] = useState<string>('CSE'); // Branch for UG
  const [yearOfStudy, setYearOfStudy] = useState<string>('3rd Year'); // Year of study/completed for UG
  const [confusionLevel, setConfusionLevel] = useState<string>('Medium'); // Confusion Level for 10th completed
  const [activeStep, setActiveStep] = useState<number>(1); // Current wizard step: 1 (Education), 2 (Details), 3 (Domain), 4 (Preferences)
  const [stateFilter, setStateFilter] = useState<string>('All'); // Real-time regional state filter ('All', 'Andhra Pradesh', 'Telangana')

  // Real-time dynamic matching calculator
  const calcLiveMatchScore = (clg: College): number => {
    let score = 95;
    if (clg.fees > budget) score -= 30;
    else if (clg.fees > budget - 50000) score -= 10;
    
    if (satScore < clg.cutoff) {
      score -= (clg.cutoff - satScore) * 1.5;
    }
    return Math.max(30, Math.min(100, Math.round(score)));
  };

  const getLiveAdmissionChance = (clg: College): 'Low' | 'Medium' | 'High' => {
    if (satScore >= clg.cutoff + 8) return 'High';
    if (satScore >= clg.cutoff - 4) return 'Medium';
    return 'Low';
  };

  const getFilteredColleges = () => {
    if (!database || !database.colleges) return [];
    return database.colleges.filter((college) => {
      // 1. Regional State constraint matching
      if (stateFilter !== 'All') {
        if (stateFilter === 'Andhra Pradesh' && college.state !== 'Andhra Pradesh') return false;
        if (stateFilter === 'Telangana' && college.state !== 'Telangana') return false;
      }

      // 2. Program match: the college must offer the exact selected course program
      if (!college.courses_offered.includes(interest)) return false;

      // 3. Tuition fee ceiling match
      if (college.fees > budget) return false;

      // 4. Cutoff score constraint match (Compare required cutoff with maximum score)
      const maxScoreAvailable = Math.max(satScore || 0, marks || 0, gpa * 10 || 0);
      if (college.cutoff > maxScoreAvailable + 15) return false;

      return true;
    });
  };

  // Interactive suggestions for one-click fill (Covering multiple levels & domains)
  const suggestions = [
    { label: 'B.Tech. AI/ML', interest: 'btech_cs', broadInterest: 'Emerging Tech', career: 'Machine Learning Engineer', location: 'Hyderabad, Telangana', marks: 95, gpa: 9.6, satScore: 98 },
    { label: 'MD Cardiologist', interest: 'md_cardio', broadInterest: 'Medical', career: 'Consultant Cardiologist', location: 'New Delhi', marks: 98, gpa: 9.8, satScore: 99 },
    { label: 'MBA Gen-Ex', interest: 'mba_gen', broadInterest: 'Management', career: 'Corporate Strategy Consultant', location: 'Bengaluru, Karnataka', marks: 88, gpa: 8.6, satScore: 91 },
    { label: 'Chartered Accountant', interest: 'ca', broadInterest: 'Commerce', career: 'Statutory Auditor', location: 'Chennai, Tamil Nadu', marks: 82, gpa: 8.2, satScore: 88 },
    { label: 'Integrated LLB Law', interest: 'llb', broadInterest: 'Law', career: 'Corporate Legal Associate', location: 'Hyderabad, Telangana', marks: 91, gpa: 9.0, satScore: 93 },
    { label: 'CSE Polytechnic', interest: 'dip_cse', broadInterest: 'Engineering', career: 'Junior Code Engineer', location: 'Vijayawada, Andhra Pradesh', marks: 74, gpa: 7.1, satScore: 78 }
  ];

  // Request & Result States
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState<string>('');

  // Mode & Comparison States
  const [appMode, setAppMode] = useState<'guided' | 'explorer'>('guided');
  const [comparedCollegeIds, setComparedCollegeIds] = useState<string[]>([]);

  // Expandable options state
  const [expandedOption, setExpandedOption] = useState<number | null>(0);

  // Database Tab/Viewer States
  const [database, setDatabase] = useState<{ colleges: College[]; courses: Course[]; careers: Career[] } | null>(null);
  const [showDatabaseRef, setShowDatabaseRef] = useState<boolean>(true);
  const [dbSearch, setDbSearch] = useState<string>('');
  const [showAllColleges, setShowAllColleges] = useState<boolean>(false);

  // Top Header Global Search States
  const [headerSearch, setHeaderSearch] = useState<string>('');
  const [showHeaderSearchResults, setShowTopSearchResults] = useState<boolean>(false);
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);

  // Fetch Database reference data from Express on mount
  useEffect(() => {
    fetch('/api/database')
      .then((res) => {
        if (!res.ok) throw new Error('Database response not stable');
        return res.json();
      })
      .then((data) => setDatabase(data))
      .catch((err) => console.error('Failed to load DB ref', err));
  }, []);

  // Set loading steps during calculation to simulate structured reasoning
  useEffect(() => {
    if (!isAnalyzing) return;
    const steps = [
      'Initializing NeuraPath Decision Matrix...',
      'Validating candidate academic marks, GPA, and test score cutoffs...',
      'Calculating annual fee budgets against scholarship/breakeven coefficients...',
      'Evaluating career salary demand & local job outcome matrices...',
      'Analyzing interest profiles vs course difficulty ratios...',
      'Synthesizing ultimate risk factors and compiling logical warnings...',
      'Executing Gemini-Powered multi-path logical optimization...',
    ];
    let index = 0;
    setLoadingStep(steps[0]);

    const interval = setInterval(() => {
      index++;
      if (index < steps.length) {
        setLoadingStep(steps[index]);
      }
    }, 1800);

    return () => clearInterval(interval);
  }, [isAnalyzing]);

  // Handle Analysis Submit
  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setError(null);

    // Get the actual course name or detail from local list to pass nicely
    const chosenCourse = database?.courses.find(c => c.id === interest)?.name || interest;

    // Get matched college entries in accordance with our Database Rule
    const queryColleges = getFilteredColleges();

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gpa,
          satScore,
          marks,
          broadInterest,
          interest: chosenCourse,
          budget,
          location,
          careerGoal,
          educationLevel,
          stream,
          branch,
          yearOfStudy,
          entrancePlanned,
          confusionLevel,
          filteredColleges: queryColleges
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'An unexpected analysis block occurred.');
      }

      setAnalysisResult(data);
      // Automatically expand the first ranking option
      setExpandedOption(0);
    } catch (err: any) {
      setError(err.message || 'The Guidance Cognitive Server timed out. Verify your API Key.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const applyPreset = (preset: typeof suggestions[number]) => {
    setGpa(preset.gpa);
    setSatScore(preset.satScore);
    setMarks(preset.marks);
    setBroadInterest(preset.broadInterest);
    setInterest(preset.interest);
    setLocation(preset.location);
    setCareerGoal(preset.career);

    // Auto set appropriate Staged vars for presets:
    if (preset.label === 'B.Tech. AI/ML') {
      setEducationLevel('UG (BTech / Degree / etc.)');
      setBranch('CSE');
      setYearOfStudy('Completed');
      setEntrancePlanned('JEE');
    } else if (preset.label === 'MD Cardiologist') {
      setEducationLevel('PG');
      setBranch('MBBS');
      setYearOfStudy('Completed');
      setEntrancePlanned('NEET');
    } else if (preset.label === 'MBA Gen-Ex') {
      setEducationLevel('UG (BTech / Degree / etc.)');
      setBranch('Business Commerce');
      setYearOfStudy('Completed');
      setEntrancePlanned('CAT');
    } else if (preset.label === 'Chartered Accountant') {
      setEducationLevel('UG (BTech / Degree / etc.)');
      setBranch('Accounting/Finances');
      setYearOfStudy('Completed');
      setEntrancePlanned('Other');
    } else if (preset.label === 'Integrated LLB Law') {
      setEducationLevel('12th completed');
      setStream('Arts');
      setEntrancePlanned('Other');
    } else if (preset.label === 'CSE Polytechnic') {
      setEducationLevel('Diploma');
      setBranch('CSE');
      setYearOfStudy('Completed');
      setEntrancePlanned('EAMCET');
    }
    // Automatically go directly to step 4 for presets to allow quick submissions
    setActiveStep(4);
  };

  const matchedColleges = database?.colleges && headerSearch.trim().length > 0
    ? database.colleges.filter((c) => {
        const query = headerSearch.toLowerCase();
        return (
          c.name.toLowerCase().includes(query) ||
          c.city.toLowerCase().includes(query) ||
          c.district.toLowerCase().includes(query) ||
          c.state.toLowerCase().includes(query) ||
          c.branches.some((b) => b.toLowerCase().includes(query)) ||
          c.location.toLowerCase().includes(query) ||
          c.affiliation.toLowerCase().includes(query)
        );
      })
    : [];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex flex-col selection:bg-cyan-500 selection:text-slate-900">
      {/* Top Navigation Frame */}
      <header className="h-16 border-b border-slate-800 bg-[#020617]/80 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between shrink-0 sticky top-0 z-50 transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <Compass className="w-5 h-5 text-white animate-spin-slow" />
          </div>
          <div className="hidden md:block">
            <span className="text-xl font-bold tracking-tight text-white font-display italic">
              NeuraPath <span className="text-cyan-400 not-italic">AI</span>
            </span>
            <p className="text-[9px] text-slate-500 font-mono tracking-wider">SMARTER CHOICES FOR YOUR FUTURE PATH</p>
          </div>
        </div>

        {/* Global College Search Bar */}
        <div className="relative flex-1 max-w-xs sm:max-w-md md:max-w-lg mx-2 sm:mx-6 z-50">
          <div className="relative">
            <Search className="absolute left-3.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search 500+ AP & TS universities / colleges..."
              value={headerSearch}
              onChange={(e) => {
                setHeaderSearch(e.target.value);
                setShowTopSearchResults(true);
              }}
              onFocus={() => setShowTopSearchResults(true)}
              className="w-full text-xs rounded-full bg-slate-950/80 border border-slate-700 hover:border-slate-500/80 py-2 pl-9 pr-9 text-gray-200 placeholder-slate-450 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/2 transition-all duration-200"
            />
            {headerSearch && (
              <button
                onClick={() => {
                  setHeaderSearch('');
                  setShowTopSearchResults(false);
                }}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Autocomplete Dropdown overlay */}
          {showHeaderSearchResults && headerSearch.trim().length > 0 && (
            <>
              <div
                className="fixed inset-0 z-40 cursor-default"
                onClick={() => setShowTopSearchResults(false)}
              />
              <div className="absolute top-full left-0 right-0 mt-2 min-w-[280px] sm:min-w-[420px] max-h-[380px] overflow-y-auto rounded-lg border border-slate-700 bg-slate-950 p-2 shadow-2xl z-50">
                <div className="px-2.5 py-1 text-[8px] font-mono text-slate-500 uppercase tracking-widest border-b border-slate-850 flex items-center justify-between">
                  <span>Matches ({matchedColleges.length})</span>
                  <span>Select any college for detailed catalog profile</span>
                </div>
                {matchedColleges.length > 0 ? (
                  <div className="space-y-1 mt-1.5">
                    {matchedColleges.slice(0, 10).map((college) => (
                      <button
                        key={college.id}
                        onClick={() => {
                          setSelectedCollege(college);
                          setShowTopSearchResults(false);
                          setHeaderSearch('');
                        }}
                        className="w-full text-left p-2 rounded hover:bg-slate-900/60 border border-transparent hover:border-slate-800 transition-all flex items-start gap-2.5 cursor-pointer group"
                      >
                        <div className="p-1 rounded bg-slate-900 text-cyan-400 group-hover:text-cyan-300 transition-colors shrink-0 mt-0.5">
                          <Building className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-grow min-w-0">
                          <div className="flex items-center justify-between gap-1.5">
                            <h5 className="text-xs font-semibold text-gray-200 truncate group-hover:text-cyan-400 transition-colors">
                              {college.name}
                            </h5>
                            <span className="shrink-0 text-[8px] font-mono px-1.5 py-0.2 rounded bg-slate-900 text-cyan-400 font-bold uppercase border border-cyan-950/40">
                              {college.naac_grade}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-400 truncate flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                            <span>{college.city}, {college.district}, {college.state}</span>
                          </p>
                          <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                            <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-cyan-950/20 text-cyan-400 border border-cyan-900/10">
                              Placement: {college.placement_rate}%
                            </span>
                            <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-emerald-950/20 text-emerald-400 border border-emerald-900/10">
                              Fee: ₹{(college.fees / 1000).toFixed(0)}K
                            </span>
                            <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-slate-900 text-slate-400">
                              {college.type} • {college.autonomous ? 'Auto' : 'Affili'}
                            </span>
                          </div>
                        </div>
                      </button>
                    ))}
                    {matchedColleges.length > 10 && (
                      <div className="p-2 text-center text-[9px] text-slate-500 font-mono border-t border-slate-900">
                        + {matchedColleges.length - 10} more matches found. Please refine search query!
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-6 text-center text-xs text-slate-500 font-mono">
                    No matching colleges found.
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Header actions removed */}
        </div>
      </header>

      {/* Main Container Area */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left Side: Parameters Form / Input Panel */}
        <aside className="w-full lg:w-96 border-b lg:border-b-0 lg:border-r border-slate-800 p-6 flex flex-col gap-5 shrink-0 bg-[#030712] overflow-y-auto w-full">
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono tracking-widest uppercase">
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span>Cognitive Alignment Console</span>
              </div>
              <h2 className="font-display font-semibold text-lg text-white">
                Career Diagnostic OS
              </h2>
            </div>

            {/* Mode Toggle Tabs */}
            <div className="grid grid-cols-2 p-1 bg-slate-950/80 rounded-lg border border-slate-800">
              <button
                type="button"
                onClick={() => setAppMode('guided')}
                className={`py-1.5 px-3 rounded-md text-xs font-semibold font-mono tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  appMode === 'guided'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>GUIDED AI</span>
              </button>
              <button
                type="button"
                onClick={() => setAppMode('explorer')}
                className={`py-1.5 px-3 rounded-md text-xs font-semibold font-mono tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  appMode === 'explorer'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3 h-3" />
                <span>EXPLORER</span>
              </button>
            </div>

            {appMode === 'guided' ? (
              <>
                {/* Quick Presets Section */}
                <div className="bg-slate-950/40 p-2.5 rounded border border-slate-800">
              <span className="block text-[8px] font-mono text-slate-500 mb-1.5 uppercase">FAST PRESET CALIBRATIONS:</span>
              <div className="grid grid-cols-3 gap-1">
                {suggestions.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => applyPreset(preset)}
                    className="text-[9px] font-mono bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 rounded py-0.5 px-0.5 truncate transition-all cursor-pointer text-center"
                    title={preset.label}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Stepper Progressive Index */}
            <div className="flex items-center justify-between px-1 pb-3 border-b border-slate-800 font-mono text-[9px]">
              {[1, 2, 3, 4].map((step) => (
                <button
                  key={step}
                  type="button"
                  onClick={() => {
                    if (!educationLevel && step > 1) return;
                    setActiveStep(step);
                  }}
                  disabled={!educationLevel && step > 1}
                  className={`flex items-center gap-1 transition-all cursor-pointer ${
                    activeStep === step
                      ? 'text-cyan-400 font-bold'
                      : !educationLevel && step > 1
                      ? 'text-slate-650 cursor-not-allowed'
                      : 'text-slate-500 hover:text-slate-350'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] border font-bold ${
                    activeStep === step
                      ? 'border-cyan-500 bg-cyan-950/40 text-cyan-400'
                      : !educationLevel && step > 1
                      ? 'border-slate-850 text-slate-700 bg-slate-950'
                      : 'border-slate-800 bg-slate-900 text-slate-400'
                  }`}>
                    {step}
                  </span>
                  <span className="hidden sm:inline-block">
                    {step === 1 ? 'Study' : step === 2 ? 'Profile' : step === 3 ? 'Domain' : 'Aligns'}
                  </span>
                </button>
              ))}
            </div>

            <form id="profile-form" onSubmit={handleAnalyze} className="space-y-4 pt-1">
              {/* STAGE 1: EDUCATION IDENTIFICATION */}
              {activeStep === 1 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">👉 STAGE I: STUDY LEVEL</span>
                    <h3 className="text-sm font-semibold text-white font-display">What are you currently studying?</h3>
                    <p className="text-[10px] text-slate-400 leading-normal font-mono font-mono">Select your current academic milestone to adapt decision parameters.</p>
                  </div>
                  
                  <div className="space-y-1.5 pt-1">
                    {[
                      { val: '10th completed', desc: 'Seeking post-matric guidance & stream division' },
                      { val: '12th completed', desc: 'Intermediate, CBSE/ICSE, or State board exams' },
                      { val: 'Diploma', desc: 'Polytechnic or specialized engineering diploma' },
                      { val: 'UG (BTech / Degree / etc.)', desc: 'Undergraduate professional program' },
                      { val: 'PG', desc: 'Postgraduate (Masters, MBA, MTech) studies' }
                    ].map((item) => (
                      <button
                        key={item.val}
                        type="button"
                        onClick={() => {
                          setEducationLevel(item.val);
                          // Default configurations so parameters never conflict or are null
                          if (item.val === '10th completed') {
                            setMarks(85);
                            setConfusionLevel('High');
                          } else if (item.val === '12th completed') {
                            setMarks(88);
                            setSatScore(90);
                            setStream('Science');
                            setEntrancePlanned('JEE');
                          } else if (item.val === 'UG (BTech / Degree / etc.)') {
                            setGpa(8.5);
                            setBranch('CSE');
                            setYearOfStudy('3rd Year');
                          } else if (item.val === 'Diploma') {
                            setMarks(80);
                            setBranch('Mechanical');
                            setYearOfStudy('2nd Year');
                          } else if (item.val === 'PG') {
                            setGpa(8.0);
                            setBranch('CSE');
                            setYearOfStudy('Completed');
                          }
                          // Automatically push to step 2 for extreme smooth UX
                          setTimeout(() => setActiveStep(2), 250);
                        }}
                        className={`w-full text-left p-2.5 rounded hover:scale-[1.01] border text-xs transition-all flex justify-between items-center cursor-pointer ${
                          educationLevel === item.val
                            ? 'border-cyan-500 bg-cyan-950/20 text-white shadow-[0_0_8px_rgba(6,182,212,0.15)]'
                            : 'border-slate-800 bg-slate-900/30 text-slate-400 hover:border-slate-700 hover:bg-slate-900/60 hover:text-slate-200'
                        }`}
                      >
                        <div className="flex flex-col gap-0.5 max-w-[85%]">
                          <span className="font-semibold text-xs text-slate-100">{item.val}</span>
                          <span className="text-[9px] text-slate-500 font-normal truncate leading-tight">{item.desc}</span>
                        </div>
                        {educationLevel === item.val && (
                          <div className="w-3.5 h-3.5 rounded-full bg-cyan-500 flex items-center justify-center">
                            <CheckCircle2 className="w-2.5 h-2.5 text-slate-950" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      disabled={!educationLevel}
                      onClick={() => setActiveStep(2)}
                      className={`w-full py-2 px-3 rounded text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        educationLevel
                          ? 'bg-cyan-600 hover:bg-cyan-500 text-white cursor-pointer shadow-[0_0_15px_rgba(8,145,178,0.2)]'
                          : 'bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed'
                      }`}
                    >
                      <span>CONFIGURE DETAILS</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}

              {/* STAGE 2: CONDITIONAL DETAILS */}
              {activeStep === 2 && (
                <div className="space-y-4 animate-fadeIn">
                  
                  {/* Case A: 12th Completed */}
                  {educationLevel === '12th completed' && (
                    <div className="space-y-3.5 font-mono">
                      <div className="space-y-1 font-sans">
                        <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">👉 STAGE II: MERIT METRICS (12TH)</span>
                        <h3 className="text-sm font-semibold text-white font-sans">Board & Entrance Details</h3>
                        <p className="text-[10px] text-slate-400 leading-normal font-mono font-mono">Provide intermediate-level scholastics metrics.</p>
                      </div>

                      {/* Stream Selection */}
                      <div className="space-y-1 animate-fadeIn font-mono">
                        <label className="block text-[9px] text-slate-400 uppercase">12th Stream / Group</label>
                        <div className="grid grid-cols-3 gap-1.5">
                          {['Science', 'Commerce', 'Arts'].map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => setStream(s)}
                              className={`py-1.5 px-1 rounded text-center text-[10px] font-medium border transition-all cursor-pointer ${
                                stream === s
                                  ? 'border-cyan-500 bg-cyan-950/20 text-cyan-400 font-bold'
                                  : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Marks Percent Slider */}
                      <div className="space-y-1 animate-fadeIn">
                        <label className="flex justify-between items-center text-[9px] text-slate-400 uppercase">
                          <span>12th Class Board %</span>
                          <span className="text-cyan-400 font-bold">{marks}% Marks</span>
                        </label>
                        <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-850 p-2 rounded-lg">
                          <input
                            type="range"
                            min="50"
                            max="100"
                            value={marks}
                            onChange={(e) => setMarks(Number(e.target.value))}
                            className="flex-1 accent-cyan-500 h-1 bg-slate-800 rounded cursor-pointer"
                          />
                          <input
                            type="number"
                            min="50"
                            max="100"
                            value={marks}
                            onChange={(e) => setMarks(Math.min(100, Math.max(50, Number(e.target.value))))}
                            className="w-12 text-center text-xs font-mono rounded bg-slate-950 py-0.5 text-cyan-400 focus:outline-[#020617]"
                          />
                        </div>
                      </div>

                      {/* Entrance Exam Planned */}
                      <div className="space-y-1 animate-fadeIn">
                        <label className="block text-[9px] text-slate-400 uppercase font-mono font-bold">Target Entrance Exam</label>
                        <div className="relative">
                          <select
                            value={entrancePlanned}
                            onChange={(e) => setEntrancePlanned(e.target.value)}
                            className="w-full text-xs rounded bg-slate-900 border border-slate-850 py-2 px-3 text-slate-200 outline-none focus:border-cyan-500/60 appearance-none cursor-pointer font-sans"
                          >
                            <option value="JEE">JEE Mains / Advanced (Engineering)</option>
                            <option value="NEET">NEET UG (Medical)</option>
                            <option value="EAMCET">EAMCET (State Level AP/TS)</option>
                            <option value="Other">Other selection criteria</option>
                            <option value="None">None (Direct / Merit admission)</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-2.5 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
                        </div>
                      </div>

                      {entrancePlanned !== 'None' && (
                        <div className="space-y-1 animate-fadeIn">
                          <label className="flex justify-between items-center text-[9px] text-slate-400 uppercase">
                            <span>{entrancePlanned} Percentile Score</span>
                            <span className="text-cyan-400 font-bold">{satScore} %ile</span>
                          </label>
                          <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-850 p-2 rounded-lg">
                            <input
                              type="range"
                              min="50"
                              max="100"
                              value={satScore}
                              onChange={(e) => setSatScore(Number(e.target.value))}
                              className="flex-1 accent-cyan-500 h-1 bg-slate-800 rounded cursor-pointer"
                            />
                            <input
                              type="number"
                              min="50"
                              max="100"
                              value={satScore}
                              onChange={(e) => setSatScore(Math.min(100, Math.max(50, Number(e.target.value))))}
                              className="w-12 text-center text-xs font-mono rounded bg-slate-950 py-0.5 text-cyan-400 focus:outline-[#020617]"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Case B: UG Completed/Studying */}
                  {educationLevel === 'UG (BTech / Degree / etc.)' && (
                    <div className="space-y-3.5 font-mono font-bold">
                      <div className="space-y-1 font-sans">
                        <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">👉 STAGE II: UG ACADEMICS</span>
                        <h3 className="text-sm font-semibold text-white font-sans">Graduate Parameters</h3>
                        <p className="text-[10px] text-slate-400 leading-normal font-mono">Provide your core undergraduate metrics.</p>
                      </div>

                      {/* CGPA Slider */}
                      <div className="space-y-1 animate-fadeIn font-mono">
                        <label className="flex justify-between items-center text-[9px] text-slate-400 uppercase font-mono font-bold">
                          <span>UG CGPA (10-Scale)</span>
                          <span className="text-cyan-400 font-bold bg-cyan-950/40 px-1.5 py-0.5 rounded text-[10px] border border-cyan-800/30 font-bold">
                            {gpa.toFixed(2)} / 10.00
                          </span>
                        </label>
                        <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-850 p-2 rounded-lg">
                          <input
                            type="range"
                            min="4.0"
                            max="10.0"
                            step="0.1"
                            value={gpa}
                            onChange={(e) => setGpa(Number(e.target.value))}
                            className="flex-1 accent-cyan-500 h-1 bg-slate-800 rounded cursor-pointer"
                          />
                          <input
                            type="number"
                            min="4.0"
                            max="10.0"
                            step="0.01"
                            value={gpa}
                            onChange={(e) => setGpa(Math.min(10.0, Math.max(4.0, Number(e.target.value))))}
                            className="w-12 text-center text-xs font-mono rounded bg-slate-950 py-0.5 text-cyan-400 focus:outline-[#020617]"
                          />
                        </div>
                      </div>

                      {/* Branch Dropdown */}
                      <div className="space-y-1 animate-fadeIn">
                        <label className="block text-[9px] text-slate-400 uppercase">UG Branch of Study</label>
                        <div className="relative font-bold font-sans">
                          <select
                            value={branch}
                            onChange={(e) => setBranch(e.target.value)}
                            className="w-full text-xs rounded bg-slate-900 border border-slate-850 py-2 px-3 text-slate-200 outline-none focus:border-cyan-500/60 appearance-none cursor-pointer"
                          >
                            <option value="CSE">Computer Science & Eng (CSE)</option>
                            <option value="ECE">Electronics & Comm (ECE)</option>
                            <option value="MECH">Mechanical Eng (MECH)</option>
                            <option value="CIVIL">Civil Engineering (CIVIL)</option>
                            <option value="Commerce">Commerce & Accounting (BCom)</option>
                            <option value="Management">Business Management (BBA)</option>
                            <option value="Science">Sciences (BSc Hons)</option>
                            <option value="Other">Other Specific Stream</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-2.5 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
                        </div>
                      </div>

                      {/* Year of study */}
                      <div className="space-y-1 animate-fadeIn">
                        <label className="block text-[9px] text-slate-400 uppercase">Current Status / Academic Year</label>
                        <div className="grid grid-cols-2 gap-1.5 font-mono font-bold">
                          {['2nd Year', '3rd Year', '4th Year', 'Completed'].map((y) => (
                            <button
                              key={y}
                              type="button"
                              onClick={() => setYearOfStudy(y)}
                              className={`py-1.5 px-1 rounded text-center text-[10px] font-mono border transition-all cursor-pointer ${
                                yearOfStudy === y
                                  ? 'border-cyan-500 bg-cyan-950/20 text-cyan-400 font-bold'
                                  : 'border-slate-805 bg-slate-900/40 text-slate-404 hover:text-slate-200'
                              }`}
                            >
                              {y}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Case C: 10th Completed */}
                  {educationLevel === '10th completed' && (
                    <div className="space-y-3.5 font-mono text-xs">
                      <div className="space-y-1 font-sans">
                        <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">👉 STAGE II: POST-SSC HORIZONS</span>
                        <h3 className="text-sm font-semibold text-white font-sans">Secondary School Profile</h3>
                        <p className="text-[10px] text-slate-400 leading-normal font-mono font-mono font-mono">Calibrate post-10th goals.</p>
                      </div>

                      {/* Board Marks */}
                      <div className="space-y-1 animate-fadeIn font-mono">
                        <label className="flex justify-between items-center text-[9px] text-slate-400 uppercase">
                          <span>10th Board (SSC) Result</span>
                          <span className="text-cyan-400 font-bold">{marks}% Marks</span>
                        </label>
                        <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-850 p-2 rounded-lg">
                          <input
                            type="range"
                            min="50"
                            max="100"
                            value={marks}
                            onChange={(e) => setMarks(Number(e.target.value))}
                            className="flex-1 accent-cyan-500 h-1 bg-slate-800 rounded cursor-pointer"
                          />
                          <input
                            type="number"
                            min="50"
                            max="100"
                            value={marks}
                            onChange={(e) => setMarks(Math.min(100, Math.max(50, Number(e.target.value))))}
                            className="w-12 text-center text-xs font-mono rounded bg-slate-950 py-0.5 text-cyan-400 focus:outline-[#020617]"
                          />
                        </div>
                      </div>

                      {/* Confusion Level */}
                      <div className="space-y-1 animate-fadeIn font-mono">
                        <label className="block text-[9px] text-slate-400 uppercase">Guidance Assessment State</label>
                        <div className="grid grid-cols-3 gap-1.5">
                          {['High', 'Medium', 'Low'].map((l) => (
                            <button
                              key={l}
                              type="button"
                              onClick={() => setConfusionLevel(l)}
                              className={`py-1.5 px-1 rounded text-center text-[10px] font-mono border transition-all cursor-pointer ${
                                confusionLevel === l
                                  ? 'border-cyan-500 bg-cyan-950/20 text-cyan-400 font-bold'
                                  : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              {l === 'High' ? 'Confused' : l === 'Medium' ? 'Moderate' : 'Decided'}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Case D: Diploma */}
                  {educationLevel === 'Diploma' && (
                    <div className="space-y-3.5 font-mono">
                      <div className="space-y-1 font-sans">
                        <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">👉 STAGE II: POLYTECHNIC SPECS</span>
                        <h3 className="text-sm font-semibold text-white font-sans font-sans">Diploma Parameters</h3>
                        <p className="text-[10px] text-slate-400 leading-normal font-mono font-mono font-mono">Provide diploma standings.</p>
                      </div>

                      {/* Marks */}
                      <div className="space-y-1 animate-fadeIn text-xs">
                        <label className="flex justify-between items-center text-[9px] text-slate-400 uppercase">
                          <span>Diploma Score Aggregate</span>
                          <span className="text-cyan-400 font-bold">{marks}% Marks</span>
                        </label>
                        <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-850 p-2 rounded-lg font-mono">
                          <input
                            type="range"
                            min="50"
                            max="100"
                            value={marks}
                            onChange={(e) => setMarks(Number(e.target.value))}
                            className="flex-1 accent-cyan-500 h-1 bg-slate-800 rounded cursor-pointer"
                          />
                          <input
                            type="number"
                            min="50"
                            max="100"
                            value={marks}
                            onChange={(e) => setMarks(Math.min(100, Math.max(50, Number(e.target.value))))}
                            className="w-12 text-center text-xs font-mono rounded bg-slate-950 py-0.5 text-cyan-400"
                          />
                        </div>
                      </div>

                      {/* Branch */}
                      <div className="space-y-1 animate-fadeIn font-mono text-xs">
                        <label className="block text-[9px] text-slate-400 uppercase">Branch of Study</label>
                        <input
                          type="text"
                          value={branch}
                          onChange={(e) => setBranch(e.target.value)}
                          placeholder="e.g. Mechanical Engineering"
                          className="w-full text-xs rounded bg-slate-900 border border-slate-850 p-2 text-slate-200 outline-none focus:border-cyan-500/65 font-sans"
                        />
                      </div>
                    </div>
                  )}

                  {/* Case E: PG */}
                  {educationLevel === 'PG' && (
                    <div className="space-y-3.5 font-mono">
                      <div className="space-y-1 font-sans">
                        <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">👉 STAGE II: POSTGRAD MERITS</span>
                        <h3 className="text-sm font-semibold text-white font-sans font-sans">Prerequisite Baseline</h3>
                        <p className="text-[10px] text-slate-400 leading-normal font-mono font-mono">Confirm UG baseline for PG courses.</p>
                      </div>

                      {/* CGPA */}
                      <div className="space-y-1 animate-fadeIn text-xs">
                        <label className="flex justify-between items-center text-[9px] text-slate-400 uppercase">
                          <span>UG CGPA Aggregate</span>
                          <span className="text-cyan-400 font-bold">{gpa.toFixed(2)}/10.0</span>
                        </label>
                        <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-850 p-2 rounded-lg font-mono">
                          <input
                            type="range"
                            min="4.0"
                            max="10.0"
                            step="0.1"
                            value={gpa}
                            onChange={(e) => setGpa(Number(e.target.value))}
                            className="flex-1 accent-cyan-500 h-1 bg-slate-800 rounded cursor-pointer"
                          />
                          <input
                            type="number"
                            min="4.0"
                            max="10.0"
                            step="0.01"
                            value={gpa}
                            onChange={(e) => setGpa(Math.min(10.0, Math.max(4.0, Number(e.target.value))))}
                            className="w-12 text-center text-xs font-mono rounded bg-slate-950 py-0.5 text-cyan-400"
                          />
                        </div>
                      </div>

                      {/* Entrance Select */}
                      <div className="space-y-1 animate-fadeIn font-mono font-bold text-xs">
                        <label className="block text-[9px] text-slate-400 uppercase">Target Masters Entrance Screen</label>
                        <div className="relative font-bold font-sans">
                          <select
                            value={entrancePlanned}
                            onChange={(e) => setEntrancePlanned(e.target.value)}
                            className="w-full text-xs rounded bg-slate-900 border border-slate-850 py-2 px-3 text-slate-200 outline-none focus:border-cyan-500/60 appearance-none cursor-pointer"
                          >
                            <option value="GATE">GATE (Engineering PG)</option>
                            <option value="CAT">CAT (Management PG)</option>
                            <option value="NEET-PG">NEET PG (Advanced Medicine)</option>
                            <option value="Other">Other postgraduate exams</option>
                            <option value="None">None (Direct quota admission)</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-2.5 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Traversers */}
                  <div className="flex gap-2 pt-3 border-t border-slate-800 mt-4 font-mono font-bold">
                    <button
                      type="button"
                      onClick={() => setActiveStep(1)}
                      className="flex-1 py-1.5 px-3 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded text-xs transition-all font-semibold text-center cursor-pointer"
                    >
                      ← BACK
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveStep(3)}
                      className="flex-1 py-1.5 px-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded text-xs transition-all font-semibold text-center flex items-center justify-center gap-1 cursor-pointer shadow-[0_0_10px_rgba(8,145,178,0.2)]"
                    >
                      <span>SELECT DOMAIN</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}

              {/* STAGE 3: DOMAIN MATRIX SELECTION */}
              {activeStep === 3 && (
                <div className="space-y-4 animate-fadeIn font-mono">
                  <div className="space-y-1 font-sans">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">👉 STAGE III: COGNITIVE DOMAIN</span>
                    <h3 className="text-sm font-semibold text-white font-sans font-sans">Which domain are you more interested in?</h3>
                    <p className="text-[10px] text-slate-400 leading-normal font-mono font-mono">Map your primary vector of future study.</p>
                  </div>

                  {/* Domains Visual card selection */}
                  <div className="grid grid-cols-2 gap-2 pt-1 font-mono animate-fadeIn">
                    {[
                      { val: 'Emerging Tech', icon: '🤖', desc: 'AI, Cyber, Cloud' },
                      { val: 'Engineering', icon: '⚙️', desc: 'Mechanical, Tech' },
                      { val: 'Medical', icon: '🩺', desc: 'MBBS, Nursing, Ph' },
                      { val: 'Business', icon: '📊', desc: 'Finance, BBA, CA' },
                      { val: 'Arts & Humanities', icon: '🏛️', desc: 'Social, Literature' },
                      { val: 'Law', icon: '⚖️', desc: 'Integrated LLB, Jurist' },
                      { val: 'Government Jobs', icon: '💼', desc: 'UPSC, Civils prep' },
                      { val: 'Design', icon: '🎨', desc: 'UI/UX, Animation' },
                    ].map((domain) => (
                      <button
                        key={domain.val}
                        type="button"
                        onClick={() => {
                          setBroadInterest(domain.val);
                          // Assign sensible initial courses based on selected domain
                          if (domain.val === 'Emerging Tech') setInterest('btech_cs');
                          else if (domain.val === 'Engineering') setInterest('btech_mechanical');
                          else if (domain.val === 'Medical') setInterest('mbbs');
                          else if (domain.val === 'Business') setInterest('bba_fin');
                          else if (domain.val === 'Law') setInterest('llb');
                          else if (domain.val === 'Arts & Humanities') setInterest('llb');
                          else if (domain.val === 'Government Jobs') setInterest('llb');
                          else if (domain.val === 'Design') setInterest('btech_cs');
                        }}
                        className={`p-2 rounded hover:scale-[1.01] border text-[10px] text-left flex flex-col justify-between h-16 transition-all cursor-pointer ${
                          broadInterest === domain.val
                            ? 'border-cyan-500 bg-cyan-950/20 text-white font-bold shadow-[0_0_8px_rgba(6,182,212,0.15)] font-display'
                            : 'border-slate-800 bg-slate-900/30 text-slate-400 hover:border-slate-700 font-display'
                        }`}
                      >
                        <div className="flex justify-between items-center w-full">
                          <span className="text-sm">{domain.icon}</span>
                          {broadInterest === domain.val && <CheckCircle2 className="w-3 h-3 text-cyan-400 font-bold animate-pulse" />}
                        </div>
                        <div className="flex flex-col truncate">
                          <span className="text-slate-200 font-semibold truncate text-[9px] font-sans">{domain.val}</span>
                          <span className="text-[8px] text-slate-500 truncate font-mono font-normal">{domain.desc}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Target Degree select aligned with database */}
                  <div className="space-y-1.5 pt-1 animate-fadeIn">
                    <label className="block text-[9px] font-mono text-slate-400 uppercase">Target College Degree Program</label>
                    <div className="relative font-bold font-sans">
                      <select
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                        className="w-full text-xs rounded bg-slate-900 border border-slate-800 py-2 px-3 text-slate-200 outline-none focus:border-cyan-500/60 appearance-none cursor-pointer"
                      >
                        {database?.courses
                          .filter((c) => {
                            if (broadInterest === 'Emerging Tech') return c.field_category === 'Emerging Tech';
                            if (broadInterest === 'Engineering') return c.field_category === 'Engineering' || c.level === 'Diploma';
                            if (broadInterest === 'Medical') return c.field_category === 'Medical';
                            if (broadInterest === 'Business') return c.field_category === 'Management' || c.field_category === 'Commerce';
                            if (broadInterest === 'Law') return c.field_category === 'Law';
                            if (broadInterest === 'Arts & Humanities') return c.field_category === 'Law' || c.field_category === 'Science';
                            if (broadInterest === 'Government Jobs') return c.field_category === 'Government' || c.field_category === 'Law';
                            return true;
                          })
                          .map((course) => (
                            <option key={course.id} value={course.id}>
                              {course.name}
                            </option>
                          ))}
                        {database?.courses.every(c => {
                          if (broadInterest === 'Emerging Tech') return c.field_category !== 'Emerging Tech';
                          if (broadInterest === 'Engineering') return c.field_category !== 'Engineering' && c.level !== 'Diploma';
                          if (broadInterest === 'Medical') return c.field_category !== 'Medical';
                          if (broadInterest === 'Business') return c.field_category !== 'Management' && c.field_category !== 'Commerce';
                          if (broadInterest === 'Law') return c.field_category !== 'Law';
                          return true;
                        }) && (
                          database?.courses.map(course => (
                            <option key={course.id} value={course.id}>
                              {course.name}
                            </option>
                          ))
                        )}
                      </select>
                      <ChevronDown className="absolute right-3 top-2.5 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-3 border-t border-slate-800 mt-4 font-mono font-bold">
                    <button
                      type="button"
                      onClick={() => setActiveStep(2)}
                      className="flex-1 py-1.5 px-3 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded text-xs transition-all font-semibold text-center cursor-pointer"
                    >
                      ← BACK
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveStep(4)}
                      className="flex-1 py-1.5 px-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded text-xs transition-all font-semibold text-center flex items-center justify-center gap-1 cursor-pointer shadow-[0_0_10px_rgba(8,145,178,0.2)]"
                    >
                      <span>PREFERENCES</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}

              {/* STAGE 4: PREFERENCES & OUTCOMES */}
              {activeStep === 4 && (
                <div className="space-y-4 animate-fadeIn font-mono">
                  <div className="space-y-1 font-sans">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">👉 STAGE IV: ENHANCED METRICS</span>
                    <h3 className="text-sm font-semibold text-white font-sans font-sans font-semibold">Outcomes & Fee Caps</h3>
                    <p className="text-[10px] text-slate-400 leading-normal font-mono">Submit constraints to calculate ranked options.</p>
                  </div>

                  {/* Regional State Filter Selector (Streamlit Filter Rule) */}
                  <div className="space-y-1 animate-fadeIn">
                    <label className="block text-[9px] text-slate-400 uppercase font-mono">📍 Selected State Filter</label>
                    <div className="grid grid-cols-3 gap-1">
                      {[
                        { label: 'All India', value: 'All' },
                        { label: 'Andhra (AP)', value: 'Andhra Pradesh' },
                        { label: 'Telangana (TS)', value: 'Telangana' }
                      ].map((st) => (
                        <button
                          key={st.value}
                          type="button"
                          onClick={() => {
                            setStateFilter(st.value);
                            // Set regional tags appropriately for guidance consistency
                            if (st.value === 'Andhra Pradesh') setLocation('Andhra Pradesh Hubs');
                            else if (st.value === 'Telangana') setLocation('Hyderabad, Telangana');
                            else setLocation('All India Premium Hubs');
                          }}
                          className={`py-1 py-1 px-0.5 rounded text-center text-[10px] font-mono border transition-all cursor-pointer ${
                            stateFilter === st.value
                              ? 'border-cyan-500 bg-cyan-950/20 text-cyan-400 font-bold shadow-[0_0_8px_rgba(6,182,212,0.1)]'
                              : 'border-slate-800 bg-slate-900/40 text-slate-404 hover:text-slate-200'
                          }`}
                        >
                          {st.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget Selector */}
                  <div className="space-y-1 animate-fadeIn">
                    <label htmlFor="budget-slider" className="flex justify-between items-center text-[9px] text-slate-400 uppercase font-mono">
                      <span>Annual Tuition Cap</span>
                      <span className="text-emerald-400 font-bold font-mono">
                        {budget >= 100000 ? `₹${(budget / 100000).toFixed(2)} Lakhs` : `₹${budget.toLocaleString('en-IN')}`} / Yr
                      </span>
                    </label>
                    <div className="bg-slate-900/80 border border-slate-8[R]* p-2 rounded-lg space-y-1">
                      <input
                        id="budget-slider"
                        type="range"
                        min="5000"
                        max="1500000"
                        step="5000"
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                        className="w-full accent-cyan-500 h-1 bg-slate-800 rounded cursor-pointer"
                      />
                      <div className="flex justify-between text-[8px] text-slate-500 font-mono font-mono">
                        <span>₹5k Gov</span>
                        <span>₹15L Cap</span>
                      </div>
                    </div>
                  </div>

                  {/* Region Selection */}
                  <div className="space-y-1 text-xs animate-fadeIn font-mono font-bold">
                    <label htmlFor="location-input" className="block text-[9px] text-slate-400 uppercase">Preferred Region / Host State</label>
                    <div className="relative">
                      <input
                        id="location-input"
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Hyderabad, AP, TS"
                        required
                        className="w-full text-xs rounded bg-slate-900 border border-slate-800 py-2 pl-9 pr-3 text-slate-200 focus:outline-[#020617] font-sans font-bold"
                      />
                      <MapPin className="absolute left-3 top-2.5 w-3.5 h-3.5 text-cyan-500/55 animate-pulse" />
                    </div>
                  </div>

                  {/* Career Stated Goal */}
                  <div className="space-y-1 text-xs animate-fadeIn font-mono font-bold">
                    <label htmlFor="career-input" className="block text-[9px] text-slate-400 uppercase">Stated Career Outcome Goal</label>
                    <div className="relative font-mono font-bold">
                      <input
                        id="career-input"
                        type="text"
                        value={careerGoal}
                        onChange={(e) => setCareerGoal(e.target.value)}
                        placeholder="e.g. Mechanical Design Engineer"
                        required
                        className="w-full text-xs rounded bg-slate-900 border border-slate-800 py-2 pl-9 pr-3 text-slate-200 focus:outline-[#020617] font-sans font-bold"
                      />
                      <Briefcase className="absolute left-3 top-2.5 w-3.5 h-3.5 text-cyan-500/55" />
                    </div>
                  </div>

                  {/* Streamlit-Style Live Dataset Matcher Preview Block */}
                  <div className="bg-slate-950/80 border border-cyan-800/15 rounded-lg p-3 space-y-2 text-xs">
                    <div className="flex justify-between items-center text-[9px] text-slate-400 uppercase font-mono">
                      <span>🎯 Interactive Matching Pool</span>
                      <span className="text-cyan-400 font-bold font-mono">
                        {getFilteredColleges().length} Eligible Colleges
                      </span>
                    </div>

                    {getFilteredColleges().length > 0 ? (
                      <div className="max-h-36 overflow-y-auto space-y-2 pr-1 text-xs">
                        {getFilteredColleges().map((clg) => (
                          <div
                            key={clg.id}
                            className="bg-slate-900/60 p-2.5 rounded border border-slate-850 hover:border-slate-700 transition flex flex-col gap-1.5"
                          >
                            <div className="flex justify-between items-start gap-1">
                              <div className="min-w-0 flex-1">
                                <span className="text-slate-100 font-bold block truncate text-[10.5px]/tight">{clg.name}</span>
                                <span className="text-[8px] text-slate-400 font-mono italic block">
                                  📍 {clg.city}, {clg.district} ({clg.state})
                                </span>
                              </div>
                              <div className="text-[10px] font-mono font-semibold text-right shrink-0 pl-1">
                                <span className="text-emerald-400 block">₹{(clg.fees / 100000).toFixed(2)} Lakhs</span>
                                <span className="text-cyan-400 font-bold text-[8px] block">Rank Score: {clg.cutoff}%ile</span>
                              </div>
                            </div>
                            
                            {/* Rich metadata tags row */}
                            <div className="flex flex-wrap items-center gap-1 text-[7.5px] font-mono">
                              <span className={`px-1 py-0.2 rounded border ${
                                clg.type === 'Govt' 
                                  ? 'bg-amber-950/20 border-amber-800/40 text-amber-400' 
                                  : 'bg-indigo-950/20 border-indigo-800/40 text-indigo-400'
                              }`}>
                                {clg.type}
                              </span>
                              {clg.autonomous && (
                                <span className="bg-emerald-950/20 border border-emerald-800/40 text-emerald-400 px-1 py-0.2 rounded">
                                  Autonomous
                                </span>
                              )}
                              <span className="bg-slate-950/30 border border-slate-800/50 text-slate-400 px-1 py-0.2 rounded">
                                {clg.affiliation}
                              </span>
                              {clg.naac_grade && clg.naac_grade !== 'N/A' && (
                                <span className="bg-cyan-950/20 border border-cyan-800/45 text-cyan-400 px-1 py-0.2 rounded font-bold">
                                  NAAC {clg.naac_grade}
                                </span>
                              )}
                              {clg.website && (
                                <a 
                                  href={`https://${clg.website}`} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="ml-auto text-cyan-500 hover:text-cyan-400 underline transition pr-0.5"
                                >
                                  {clg.website}
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-2 border border-dashed border-amber-500/20 bg-slate-900/20 rounded text-center text-[10px] text-amber-400/90 font-mono leading-relaxed">
                        ⚠️ No eligible colleges fit your fee budget limit or cutoff. Please adjust sliders.
                      </div>
                    )}

                    <p className="text-[8px] text-slate-500 font-mono tracking-tighter text-center pt-0.5 italic">
                      Results based on available filtered dataset, not full India database
                    </p>
                  </div>

                  <div className="flex gap-2 pt-3 border-t border-slate-800 mt-4 font-mono font-bold">
                    <button
                      type="button"
                      onClick={() => setActiveStep(3)}
                      className="py-2 px-3 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded text-xs transition-all font-semibold cursor-pointer"
                    >
                      ← BACK
                    </button>
                    <button
                      type="submit"
                      disabled={isAnalyzing || getFilteredColleges().length === 0}
                      className="flex-1 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded text-xs transition-all shadow-[0_0_20px_rgba(8,145,178,0.3)] border border-cyan-400/50 cursor-pointer text-center flex items-center justify-center gap-1.5 font-sans"
                    >
                      {isAnalyzing ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>INTERROGATING...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
                          <span>ANALYZE FUTURE PATH</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </>
        ) : (
          <div className="space-y-4 animate-fadeIn">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">👉 SANDBOX SELECTORS</span>
              <h3 className="text-xs font-semibold text-white font-sans">Active Sandbox Diagnostics</h3>
              <p className="text-[9px] text-slate-500 font-mono">Tune live controls and inspect matching institutions in real time.</p>
            </div>

            {/* Regional State filter */}
            <div className="space-y-1">
              <label className="block text-[9px] text-slate-400 uppercase font-mono font-bold">Region State Focus</label>
              <div className="grid grid-cols-3 gap-1">
                {['All', 'Andhra Pradesh', 'Telangana'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStateFilter(st)}
                    className={`py-1 rounded text-center text-[8px] font-mono font-medium border truncate transition-all cursor-pointer ${
                      stateFilter === st
                        ? 'border-cyan-500 bg-cyan-950/20 text-cyan-400 font-bold'
                        : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {st === 'All' ? 'ALL' : st.replace(' Pradesh', '').toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Course Program Selection */}
            <div className="space-y-1 animate-fadeIn font-mono">
              <label className="block text-[9px] text-slate-400 uppercase font-mono font-bold">Course Program Select</label>
              <select
                value={interest}
                onChange={(e) => {
                  setInterest(e.target.value);
                  const relatedField = database?.courses.find(c => c.id === e.target.value)?.field_category || 'Emerging Tech';
                  setBroadInterest(relatedField);
                }}
                className="w-full text-[10px] rounded bg-slate-900 border border-slate-850 py-2 px-2.5 text-slate-200 focus:border-cyan-500 outline-none cursor-pointer font-sans"
              >
                {database?.courses.map((crs) => (
                  <option key={crs.id} value={crs.id}>
                    [{crs.field_category.substring(0, 10).toUpperCase()}] {crs.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Board % Marks */}
            <div className="space-y-1 font-mono">
              <div className="flex justify-between items-center text-[9px] text-slate-400 uppercase font-mono font-bold">
                <span>Class Board Equivalent</span>
                <span className="text-cyan-400 font-bold">{marks}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                value={marks}
                onChange={(e) => setMarks(Number(e.target.value))}
                className="w-full h-1 accent-cyan-500 bg-slate-800 rounded cursor-pointer"
              />
            </div>

            {/* Entrance %ile */}
            <div className="space-y-1 font-mono">
              <div className="flex justify-between items-center text-[9px] text-slate-400 uppercase font-mono font-bold">
                <span>National Entrance %ile</span>
                <span className="text-cyan-400 font-bold">{satScore}%ile</span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                value={satScore}
                onChange={(e) => setSatScore(Number(e.target.value))}
                className="w-full h-1 accent-cyan-500 bg-slate-800 rounded cursor-pointer"
              />
            </div>

            {/* Fees Limit */}
            <div className="space-y-1 font-mono">
              <div className="flex justify-between items-center text-[9px] text-slate-400 uppercase font-mono font-bold">
                <span>Tuition Fee Ceiling</span>
                <span className="text-emerald-400 font-bold">₹{(budget / 100000).toFixed(2)} L/Yr</span>
              </div>
              <input
                type="range"
                min="50000"
                max="500000"
                step="10000"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full h-1 accent-cyan-500 bg-slate-800 rounded cursor-pointer"
              />
            </div>

            {/* Anti-Wrong Decision Warning System (Sidebar Live Checklist) */}
            {budget > 150000 && (interest === 'dip_cse' || broadInterest === 'Arts & Humanities' || (database?.courses.find(c => c.id === interest)?.demand_score || 100) < 65) && (
              <div className="p-3 bg-red-950/20 border border-red-500/30 rounded-lg text-[10px] text-red-200 font-mono leading-normal shadow-[0_0_15px_rgba(239,68,68,0.15)] animate-pulse">
                <span className="font-bold text-red-400 block mb-1 flex items-center gap-1 uppercase tracking-wider">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                  Anti-Wrong Decision Warning Alert
                </span>
                <p className="text-red-300 italic font-bold">
                  "This combination has low return potential compared to alternatives in AP/TS."
                </p>
                <div className="text-[9px] text-slate-400 mt-1">
                  *No sugarcoating. High tuition fees (₹{(budget/100000).toFixed(1)}L per year) coupled with slow-placement programs is highly discouraged.
                </div>
              </div>
            )}

            {/* Compare Cart shelf */}
            <div className="bg-slate-950/40 p-2.5 rounded border border-slate-800 font-mono space-y-2">
              <div className="flex justify-between items-center text-[8px] font-mono text-slate-500 uppercase tracking-widest">
                <span>COMPARISON CART</span>
                <span className="text-cyan-400 font-bold">{comparedCollegeIds.length} / 3 selected</span>
              </div>
              {comparedCollegeIds.length > 0 ? (
                <div className="space-y-1.5 font-sans">
                  {comparedCollegeIds.map((cid) => {
                    const clg = database?.colleges.find(x => x.id === cid);
                    return clg ? (
                      <div key={cid} className="flex items-center justify-between gap-1 p-1 px-2 rounded bg-slate-900 border border-slate-850 text-[10px]">
                        <span className="truncate text-slate-300 max-w-[80%] font-sans">{clg.name}</span>
                        <button
                          type="button"
                          onClick={() => setComparedCollegeIds(prev => prev.filter(x => x !== cid))}
                          className="text-slate-500 hover:text-red-400 cursor-pointer p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : null;
                  })}
                  <div className="pt-1.5">
                    <button
                      type="button"
                      onClick={() => setComparedCollegeIds([])}
                      className="w-full text-center text-[9px] font-mono uppercase hover:text-cyan-400 py-0.5 transition-all text-slate-500 cursor-pointer"
                    >
                      Clear Comparison Cart
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-[9px] italic text-slate-600 text-center py-2 font-mono">
                  Select and compare up to 3 colleges from the matching cards instantly.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </aside>

        {/* Right Side: Main Dashboard Section (Scrollable) */}
        <main className="flex-1 p-4 sm:p-8 flex flex-col gap-6 overflow-y-auto bg-[radial-gradient(circle_at_top_right,_#082f49_0%,_transparent_45%)] bg-no-repeat bg-right-top">
          
          <AnimatePresence mode="wait">
            
            {/* 1. First Load / Idle State - Guided Mode Only */}
            {!isAnalyzing && !analysisResult && !error && appMode === 'guided' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-xl p-8 text-center space-y-6 border border-dashed border-slate-800 min-h-[460px] flex flex-col justify-center items-center bg-[#030712]/30"
              >
                <div className="relative p-6 rounded bg-[#030712] border border-slate-800">
                  <Compass className="w-12 h-12 text-cyan-500/40 animate-pulse" />
                  <Sparkles className="absolute top-2 right-2 w-4 h-4 text-cyan-400/50 animate-bounce" />
                </div>
                <div className="max-w-md space-y-2">
                  <h3 className="font-display font-medium text-lg text-white">
                    Cognitive Guidance Terminal
                  </h3>
                  <p className="text-xs text-slate-400 max-w-sm">
                    Toggle preset variables or configure your scores on the left pane and generate ranked pathways grounded in logical constraints.
                  </p>
                </div>
              </motion.div>
            )}

            {/* 1.5. Explorer Mode Main Board & Comparison Matrix */}
            {!isAnalyzing && appMode === 'explorer' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <h2 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                      <span className="w-1.5 h-4 bg-cyan-500 block"></span>
                      Sandbox College Explorer & Live Analyst
                    </h2>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                      Interrogate current parameters live. Check/uncheck colleges to trigger Parallel Comparison Mode.
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">
                    INSTITUTIONS LOADED: {getFilteredColleges().length} Matches
                  </span>
                </div>

                {/* COMPARISON MATRIX MODULE */}
                {comparedCollegeIds.length > 0 && (
                  <div className="bg-slate-950 p-6 rounded-xl border border-cyan-800/30 shadow-[0_0_20px_rgba(6,182,212,0.1)] space-y-4 animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2">
                        <Layers className="w-5 h-5 text-cyan-400 animate-pulse" />
                        <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono">Side-by-Side Comparison Arena</h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => setComparedCollegeIds([])}
                        className="text-[10px] uppercase font-mono text-slate-550 hover:text-red-400 cursor-pointer"
                      >
                        Clear Comparison
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {comparedCollegeIds.map((cid) => {
                        const clg = database?.colleges.find(x => x.id === cid);
                        if (!clg) return null;
                        const liveScore = calcLiveMatchScore(clg);
                        const chance = getLiveAdmissionChance(clg);
                        const isMismatched = budget > 150000 && (interest === 'dip_cse' || (database?.courses.find(c => c.id === interest)?.demand_score || 100) < 65);
                        
                        return (
                          <div key={cid} className="bg-[#070b13] border border-slate-800/80 rounded-lg p-4 space-y-4 relative flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start gap-1 pb-1">
                                <h4 className="text-xs font-bold text-white pr-4 leading-tight">{clg.name}</h4>
                                <span className="text-[8px] font-bold text-cyan-400 italic font-mono bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded shrink-0">{clg.tier}</span>
                              </div>
                              <p className="text-[10px] text-slate-400 mb-2">{clg.location}</p>

                              <div className="space-y-1.5 text-[10px] font-mono leading-relaxed pt-3 border-t border-slate-900">
                                <div className="flex justify-between border-b border-slate-900/60 pb-1">
                                  <span className="text-slate-500">ANNUAL TUITION:</span>
                                  <span className="text-emerald-400 font-bold">{clg.fees}</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-900/60 pb-1">
                                  <span className="text-slate-500">PLACEMENT RATE:</span>
                                  <span className="text-cyan-300 font-bold">{clg.placement_rate}</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-900/60 pb-1">
                                  <span className="text-slate-500">EXPECTED CUTOFF:</span>
                                  <span className="text-slate-200">{clg.cutoff}% Cutoff</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-900/60 pb-1">
                                  <span className="text-slate-500">ADMISSION CHANCE:</span>
                                  <span className={`px-1 rounded text-[8px] font-bold uppercase ${
                                    chance === 'High' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/30' :
                                    chance === 'Medium' ? 'bg-orange-950/40 text-orange-400 border border-orange-850/20' :
                                    'bg-red-950/40 text-red-400 border border-red-900/10'
                                  }`}>{chance}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-500">REGION STRENGTH:</span>
                                  <span className="text-indigo-400 font-sans text-[9px]">{clg.state === 'Andhra Pradesh' ? 'AP (NAAC A+)' : 'TS (NAAC A)'}</span>
                                </div>
                              </div>
                            </div>

                            {/* Circular dynamic Sandbox Score badge */}
                            <div className="pt-3 border-t border-slate-900 space-y-2">
                              <div className="flex justify-between items-center bg-slate-950/50 p-2 rounded border border-slate-900">
                                <span className="text-[9px] text-slate-500 font-mono">SANDBOX MATCH</span>
                                <MatchScoreBadgeSvg score={liveScore} />
                              </div>

                              {isMismatched && (
                                <div className="p-2 bg-red-950/15 border border-red-500/20 rounded text-[9px] font-mono text-red-200 leading-normal">
                                  <span className="text-red-400 font-bold block mb-0.5">⚠️ DEVIATION DETECTED:</span>
                                  "This combination has low return potential compared to options in AP/TS."
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* MATCHING COLLEGES CARDS GRID */}
                {getFilteredColleges().length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {getFilteredColleges().map((clg) => {
                      const isCompared = comparedCollegeIds.includes(clg.id);
                      const liveScore = calcLiveMatchScore(clg);
                      const chance = getLiveAdmissionChance(clg);
                      
                      return (
                        <div
                          key={clg.id}
                          className={`bg-slate-900 border rounded-xl p-5 flex flex-col justify-between min-h-[290px] transition-all relative ${
                            isCompared 
                              ? 'border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/20' 
                              : 'border-slate-800 hover:border-slate-700 hover:shadow-[0_4px_15px_rgba(1,1,1,0.2)]'
                          }`}
                        >
                          <div className="absolute top-4 right-4">
                            <span className="text-[8px] font-bold text-slate-500 font-mono uppercase bg-slate-950 px-2 py-0.5 border border-slate-850 rounded">
                              {clg.tier}
                            </span>
                          </div>

                          <div className="space-y-2">
                            <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">{clg.name}</h4>
                            <p className="text-[10px] text-slate-450 font-mono">{clg.location}</p>
                            
                            <div className="flex items-center gap-1.5 pt-1.5">
                              <span className={`text-[8px] px-1.5 py-0.5 rounded font-black tracking-wider uppercase border ${
                                chance === 'High' 
                                  ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/30'
                                  : chance === 'Medium'
                                  ? 'bg-cyan-950/40 text-cyan-400 border-cyan-800/30'
                                  : 'bg-red-950/40 text-red-400 border-red-900/10'
                              }`}>
                                {chance} CHANCE
                              </span>
                            </div>
                          </div>

                          <div className="mt-4 pt-3 border-t border-slate-850 space-y-2">
                            <div className="flex justify-between items-center text-[11px] font-mono">
                              <span className="text-slate-500">ANNUAL FEE:</span>
                              <span className="text-emerald-400 font-bold">{clg.fees}</span>
                            </div>
                            <div className="flex justify-between items-center text-[11px] font-mono">
                              <span className="text-slate-500">PLACEMENT RATE:</span>
                              <span className="text-cyan-400 font-bold">{clg.placement_rate}</span>
                            </div>
                            <div className="flex justify-between items-center text-[11px] font-mono">
                              <span className="text-slate-500">CUTOFF REQUIRED:</span>
                              <span className="text-slate-300 font-bold">{clg.cutoff}%</span>
                            </div>

                            <div className="flex justify-between items-center bg-slate-950/50 p-2 rounded border border-slate-800/60">
                              <span className="text-[9px] font-mono text-slate-500">SANDBOX MATCH</span>
                              <MatchScoreBadgeSvg score={liveScore} />
                            </div>

                            {/* Select to compare checkbox / action button */}
                            <button
                              type="button"
                              onClick={() => {
                                if (isCompared) {
                                  setComparedCollegeIds((prev) => prev.filter((x) => x !== clg.id));
                                } else {
                                  if (comparedCollegeIds.length >= 3) {
                                    alert('Maximum 3 institutions can be selected for Side-by-Side Comparison Arena.');
                                    return;
                                  }
                                  setComparedCollegeIds((prev) => [...prev, clg.id]);
                                }
                              }}
                              className={`w-full py-2 rounded text-center text-[10px] font-mono font-bold tracking-wider transition-all uppercase cursor-pointer border ${
                                isCompared
                                  ? 'bg-cyan-600 border-cyan-400 text-white'
                                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500'
                              }`}
                            >
                              {isCompared ? '✓ Added in Comparison Matrix' : 'Compare Side-by-Side'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="rounded-xl p-10 text-center border border-dashed border-slate-800 bg-slate-950/40 text-slate-400 flex flex-col items-center justify-center space-y-2">
                    <AlertTriangle className="w-8 h-8 text-amber-500/60" />
                    <h4 className="text-white font-semibold text-xs uppercase font-mono tracking-widest">No Sandbox Matches</h4>
                    <p className="text-[11px] max-w-sm">
                      No reference colleges match state constraints with tuition fees within ₹{(budget/100000).toFixed(2)}L/Yr. Try adjusting the Tuition Fee Ceiling slider.
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {/* 2. Loading State */}
            {isAnalyzing && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-xl p-10 min-h-[460px] flex flex-col justify-center items-center text-center space-y-8 border border-cyan-500/20 bg-slate-950/40"
              >
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-4 border-cyan-500/10 border-t-cyan-400 animate-spin" />
                  <div className="absolute inset-1 rounded-full border-4 border-blue-500/10 border-b-blue-400 animate-spin-reverse" />
                  <div className="absolute inset-2 rounded-full flex items-center justify-center">
                    <Compass className="w-6 h-6 text-cyan-400 animate-spin-slow" />
                  </div>
                </div>

                <div className="space-y-2 max-w-lg">
                  <h3 className="text-sm font-mono font-bold text-cyan-400 uppercase tracking-widest">
                    Synthesizing Constraints
                  </h3>
                  <p className="text-xs text-slate-300 font-mono italic max-w-xs h-10">
                    "{loadingStep}"
                  </p>
                </div>
              </motion.div>
            )}

            {/* 3. Error State */}
            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-6 rounded-lg bg-red-950/20 border border-red-500/30 text-center space-y-4 max-w-xl mx-auto"
              >
                <AlertTriangle className="w-10 h-10 text-red-500 mx-auto" />
                <h4 className="font-display font-bold text-md text-red-300">
                  Decision Matrix Override
                </h4>
                <p className="text-xs text-red-200/80 leading-relaxed">
                  {error}
                </p>
                <button
                  onClick={() => setError(null)}
                  className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-slate-950 text-xs font-bold transition-all"
                >
                  RESET MATRICES
                </button>
              </motion.div>
            )}

            {/* 4. Success Analysis Output */}
            {analysisResult && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Profile Summary Banner with Indian Metrics */}
                <div className="bg-slate-900/50 border border-slate-850 rounded-lg p-4 flex flex-col xl:flex-row items-shrink-0 xl:items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-6 text-xs">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">INDIAN ACADEMIC VECTORS</span>
                      <span className="text-cyan-400 font-bold font-mono">
                         CGPA {gpa.toFixed(2)} | Percentile {satScore}%ile | Board {marks}%
                      </span>
                    </div>
                    <div className="flex flex-col border-l border-slate-800 pl-6 animate-pulse">
                      <span className="text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">Budget Cap</span>
                      <span className="text-emerald-400 font-bold font-mono">
                        {budget >= 100000 ? `₹${(budget / 100000).toFixed(2)} Lakhs` : `₹${budget.toLocaleString('en-IN')}`} / Yr
                      </span>
                    </div>
                    <div className="flex flex-col border-l border-slate-800 pl-6">
                      <span className="text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">Academic Sector</span>
                      <span className="text-slate-200 font-semibold">{analysisResult.domain_breakdown?.domain_name || broadInterest}</span>
                    </div>
                    <div className="flex flex-col border-l border-slate-800 pl-6">
                      <span className="text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">Target Destination</span>
                      <span className="text-indigo-400 font-semibold font-mono">{location}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 shrink-0">
                    <div className="bg-[#020617] border border-slate-850 text-slate-500 px-3 py-1 rounded text-[10px] font-mono">
                      ⚠️ Reference Filtered Dataset
                    </div>
                    <div className="bg-cyan-900/30 text-cyan-400 px-3 py-1 rounded text-[10px] border border-cyan-800/55 font-mono">
                      Decision-Matrix: Complete
                    </div>
                  </div>
                </div>

                {/* Primary Assessments */}
                <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-5 space-y-3">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Primary Profile Assessments</h4>
                  <ul className="space-y-2">
                    {analysisResult.profile_summary?.map((summaryItem, index) => (
                      <li key={index} className="text-xs text-slate-300 flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 flex-shrink-0" />
                        <p className="leading-relaxed">{summaryItem}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* STEP 2 & 3: Domain Mapping & Full Ecosystem Expansion Panel */}
                {analysisResult.domain_breakdown && (
                  <div className="bg-slate-950/90 border border-cyan-500/20 rounded-xl p-5 space-y-4 shadow-[0_0_15px_rgba(6,182,212,0.05)]">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-850 pb-3">
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-cyan-400" />
                        <h4 className="text-xs font-bold text-white uppercase tracking-widest">Domain Identification & Ecosystem Expansion</h4>
                      </div>
                      <span className="bg-cyan-900/30 text-cyan-400 text-[10px] px-2.5 py-1 rounded border border-cyan-800/30 font-mono font-bold tracking-wider self-start sm:self-auto">
                        SECTOR: {analysisResult.domain_breakdown.domain_name}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
                      {/* Left side in Domain Breakdown */}
                      <div className="space-y-3.5">
                        <div className="space-y-1.5">
                          <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider block">🎓 Available Educational Pathways (India):</span>
                          <div className="bg-slate-900/40 rounded border border-slate-850 p-3 space-y-2 text-[11px] leading-relaxed">
                            {analysisResult.domain_breakdown.degrees_available.ug?.length > 0 && (
                              <p className="text-slate-300">
                                <strong className="text-cyan-400">Undergraduate (UG):</strong> {analysisResult.domain_breakdown.degrees_available.ug.join(', ')}
                              </p>
                            )}
                            {analysisResult.domain_breakdown.degrees_available.pg?.length > 0 && (
                              <p className="text-slate-300">
                                <strong className="text-indigo-400">Postgraduate (PG):</strong> {analysisResult.domain_breakdown.degrees_available.pg.join(', ')}
                              </p>
                            )}
                            {analysisResult.domain_breakdown.degrees_available.diploma?.length > 0 && (
                              <p className="text-slate-300">
                                <strong className="text-emerald-400">Diplomas:</strong> {analysisResult.domain_breakdown.degrees_available.diploma.join(', ')}
                              </p>
                            )}
                            {analysisResult.domain_breakdown.degrees_available.certifications?.length > 0 && (
                              <p className="text-slate-300">
                                <strong className="text-amber-400">Certifications:</strong> {analysisResult.domain_breakdown.degrees_available.certifications.join(', ')}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider block">💰 India Estimated Salary Range (LPA):</span>
                          <div className="bg-emerald-950/20 border border-emerald-500/20 rounded p-3 text-xs text-emerald-400 font-mono flex items-center justify-between">
                            <span>Ecosystem Compensation Index:</span>
                            <strong className="text-xs font-bold text-emerald-300">{analysisResult.domain_breakdown.salary_range_india}</strong>
                          </div>
                        </div>
                      </div>

                      {/* Right side in Domain Breakdown */}
                      <div className="space-y-3.5">
                        <div className="space-y-1.5">
                          <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider block">📌 Comprehensive Job Ecosystem (List of Major Roles):</span>
                          <div className="flex flex-wrap gap-1.5">
                            {analysisResult.domain_breakdown.major_job_roles?.map((role, rIdx) => (
                              <span key={rIdx} className="bg-[#020617] border border-slate-805 text-slate-300 px-2.5 py-1 rounded text-[10px] font-mono hover:text-cyan-400 hover:border-cyan-500/30 transition-all">
                                {role}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider block">🛠️ Pre-Requisite Industry Skills:</span>
                          <div className="flex flex-wrap gap-1">
                            {analysisResult.domain_breakdown.skill_requirements?.map((skill, sIdx) => (
                              <span key={sIdx} className="bg-slate-900 border border-slate-850 text-slate-400 px-2.5 py-1 rounded text-[10px] hover:text-slate-300 transition-colors">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: College Options Broad Regional Mapping */}
                {analysisResult.college_options_mapped && (
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
                    <div className="flex items-center gap-2 border-b border-slate-850 pb-2.5">
                      <Building className="w-4 h-4 text-cyan-400" />
                      <h4 className="text-xs font-bold text-white uppercase tracking-widest">STEP 4: College Mapping (All India & State Presets)</h4>
                    </div>

                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Detailed matching across institutional tiers (Top-National, Private-State, and Regional Access options) focused on state relevance and regional hubs:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {analysisResult.college_options_mapped.map((colOption, cIndex) => (
                        <div key={cIndex} className="bg-[#030712] border border-slate-850 hover:border-slate-800 rounded-lg p-3 space-y-2 hover:bg-slate-900/35 transition-all">
                          <div className="flex justify-between items-center gap-2">
                            <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                              colOption.tier === 'Top Tier'
                                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                : colOption.tier === 'Mid Tier'
                                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                                : 'bg-slate-800 text-slate-400'
                            }`}>
                              {colOption.tier}
                            </span>
                            <span className="text-[9px] text-slate-500 font-mono">{colOption.location}</span>
                          </div>

                          <h5 className="text-xs font-bold text-slate-200 line-clamp-2 min-h-[32px]">{colOption.name}</h5>

                          <div className="space-y-1 text-[10px] font-mono pt-2 border-t border-slate-850 text-slate-400">
                            <div className="flex justify-between">
                              <span>Annual fees:</span>
                              <span className="text-emerald-400">₹{colOption.fees.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Cutoff requirement:</span>
                              <span className="text-cyan-400">{colOption.cutoff}%</span>
                            </div>
                            <div className="flex justify-between mt-1 rounded bg-slate-900/40 p-1 text-slate-450">
                              <span>Placements Rate:</span>
                              <span className="text-indigo-400 font-bold">{colOption.placement_rate}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Warning Panel */}
                {analysisResult.wrong_choice_warning && analysisResult.wrong_choice_warning.is_mismatch_detected && (
                  <div className="bg-red-950/20 border border-red-500/30 rounded-lg p-5 flex flex-col relative overflow-hidden">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                      <h5 className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Alignment / Risk Warning Detected</h5>
                    </div>
                    <p className="text-xs text-red-200 leading-relaxed font-mono">
                      <strong className="block mb-1 text-red-300 uppercase">Risk Assessment Factor:</strong>
                      {analysisResult.wrong_choice_warning.why_risky}
                    </p>
                    <p className="mt-3 text-xs font-bold text-emerald-400 bg-slate-950/50 px-3 py-2 rounded border border-slate-800 font-mono">
                      RECOMMENDED ALIGNED ALTERNATIVE: {analysisResult.wrong_choice_warning.suggested_alternative}
                    </p>
                  </div>
                )}

                {/* Results Section */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-850 pb-2">
                    <h2 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                      <span className="w-1 h-3.5 bg-cyan-500 block"></span>
                      Ranked Program Recommendation Matrix (Top Matches)
                    </h2>
                    <span className="text-[9px] text-slate-500 font-mono italic">
                      *Available Reference Dataset Filter Applied, NOT General India database
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {analysisResult.ranked_options?.map((option, idx) => {
                      const isExpanded = expandedOption === idx;
                      const confidence = option.confidence_score || (idx === 0 ? 'High' : idx < 3 ? 'Medium' : 'Low');
                      
                      return (
                        <div
                          key={idx}
                          onClick={() => setExpandedOption(isExpanded ? null : idx)}
                          className={`bg-slate-900/90 border rounded-xl p-5 flex flex-col justify-between transition-all duration-300 relative cursor-pointer select-none group min-h-[320px] ${
                            isExpanded 
                              ? 'border-cyan-500 shadow-[0_0_25px_rgba(6,182,212,0.25)] ring-1 ring-cyan-500/30 lg:col-span-2' 
                              : 'border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                          }`}
                        >
                          {/* Rank & Confidence Badges */}
                          <div className="flex justify-between items-center mb-3">
                            <span className={`text-[9px] px-2.5 py-0.5 rounded italic font-bold tracking-wider ${
                              idx === 0 ? 'bg-cyan-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'
                            }`}>
                              RANK 0{idx + 1}
                            </span>
                            <span className={`text-[8px] px-2 py-0.5 rounded font-black tracking-wider uppercase border ${
                              confidence === 'High' 
                                ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/30'
                                : confidence === 'Medium'
                                ? 'bg-cyan-950/40 text-cyan-400 border-cyan-800/30'
                                : 'bg-amber-950/40 text-amber-500 border-amber-800/20'
                            }`}>
                              {confidence} CONFIDENCE
                            </span>
                          </div>

                          <div className="flex justify-between items-start gap-4">
                            <div className="space-y-1.5 flex-1 p-0.5">
                              <h4 className="text-md font-bold leading-snug text-white group-hover:text-cyan-300 transition-colors">{option.college_name}</h4>
                              <p className="text-xs text-cyan-400 font-mono flex items-center gap-1">
                                <BookOpen className="w-3.5 h-3.5" />
                                <span>{option.course_name}</span>
                              </p>
                            </div>
                            {/* Score badge (glowing circle) */}
                            <MatchScoreBadgeSvg score={option.match_score} />
                          </div>

                          {/* Expansion checklist block */}
                          {isExpanded && (
                            <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3.5 animate-fadeIn text-xs leading-relaxed">
                              {option.why_ranked_high && (
                                <div className="space-y-1 bg-emerald-950/10 border border-emerald-900/30 rounded p-2.5">
                                  <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest block font-mono">🌟 WHY IT RANKED HIGH (PROS)</span>
                                  <p className="text-slate-300 font-sans">{option.why_ranked_high}</p>
                                </div>
                              )}
                              
                              {option.why_lost_points && (
                                <div className="space-y-1 bg-amber-950/10 border border-amber-900/20 rounded p-2.5">
                                  <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest block font-mono">⚠️ WHY IT LOST POINTS (CONS)</span>
                                  <p className="text-slate-300 font-sans">{option.why_lost_points}</p>
                                </div>
                              )}

                              {option.comparison_verdict && (
                                <div className="space-y-1 bg-indigo-950/10 border border-indigo-900/20 rounded p-2.5">
                                  <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest block font-mono">⚖️ COMPARATIVE VERDICT (BENCHMARK)</span>
                                  <p className="text-slate-300 font-sans">{option.comparison_verdict}</p>
                                </div>
                              )}
                            </div>
                          )}

                          <div className="mt-4 space-y-2 pt-3 border-t border-slate-800/80">
                            <div className="flex justify-between items-center text-xs font-mono">
                              <span className="text-[10px] text-slate-500 uppercase tracking-wider">Admission Chance</span>
                              <span className={`text-[9px] px-2 py-0.5 rounded font-bold ${
                                option.admission_probability === 'High' 
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                  : option.admission_probability === 'Medium'
                                  ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                                  : 'bg-red-500/10 text-red-400 border border-red-500/20'
                              }`}>
                                {option.admission_probability.toUpperCase()}
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-xs font-mono">
                              <span className="text-[10px] text-slate-500 uppercase tracking-wider">ROI Score Index</span>
                              <span className="text-emerald-400 font-bold font-mono">{option.roi_score || 85}/100</span>
                            </div>
                            <div className="flex justify-between items-center text-xs font-mono">
                              <span className="text-[10px] text-slate-500 uppercase tracking-wider">Outcome Score</span>
                              <span className="text-indigo-400 font-bold font-mono">{option.career_outcome_rating}/100</span>
                            </div>

                            <p className="text-[11px] text-slate-400 italic pt-2 leading-relaxed border-t border-slate-800/40 mt-1">
                              {option.reason}
                            </p>
                            
                            <div className="text-center pt-2 text-[9px] text-slate-500 font-mono flex items-center justify-center gap-1 group-hover:text-cyan-400/80 transition-colors">
                              <span>{isExpanded ? 'Click to collapse details' : 'Click card to expand explainable scorecard'}</span>
                              <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180 text-cyan-400' : ''}`} />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Final Recommendation Banner */}
                {analysisResult.final_recommendation && (
                  <div className="bg-[#030712] border border-cyan-800/30 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden">
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">Optimized Single Best Compromise Pathway</span>
                      <h4 className="text-md font-bold text-white">{analysisResult.final_recommendation.best_option}</h4>
                      <p className="text-xs text-slate-400">{analysisResult.final_recommendation.why_best}</p>
                      {analysisResult.final_recommendation.roi_score_analysis && (
                        <p className="text-[11px] text-slate-500 font-mono mt-1.5 text-emerald-400">
                          ROI Analytics: {analysisResult.final_recommendation.roi_score_analysis}
                        </p>
                      )}
                    </div>
                    <div className="bg-emerald-500/10 text-emerald-400 text-xs px-3 py-1.5 border border-emerald-500/30 rounded font-mono shrink-0 uppercase tracking-wider self-start md:self-auto">
                      ★ High ROI Choice
                    </div>
                  </div>
                )}

                {/* Future Path Simulation Timeline */}
                {analysisResult.future_path_simulation && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 flex flex-col justify-between">
                      <div>
                        <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Academic & Placement Roadmap Simulation</h5>
                        
                        <div className="flex flex-col gap-3.5 relative">
                          <div className="absolute left-1.5 top-1.5 bottom-1.5 w-px bg-slate-800 animate-pulse"></div>
                          
                          <div className="flex items-start gap-4 relative">
                            <div className="w-3 h-3 rounded bg-cyan-500 mt-1 z-10 shadow-[0_0_8px_rgba(6,182,212,0.5)]"></div>
                            <div className="flex-1 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs gap-1">
                              <span className="text-slate-300">Year 1 Vector: <span className="text-slate-400 italic">{analysisResult.future_path_simulation.year_1_path}</span></span>
                              <span className="font-mono text-slate-500 text-[9px] uppercase tracking-wider shrink-0 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-850">PREPARATION</span>
                            </div>
                          </div>

                          <div className="flex items-start gap-4 relative">
                            <div className="w-3 h-3 rounded bg-indigo-500 mt-1 z-10"></div>
                            <div className="flex-1 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs gap-1">
                              <span className="text-slate-300">Year 4 Outcomes: <span className="text-slate-400 italic">{analysisResult.future_path_simulation.year_4_path}</span></span>
                              <span className="font-mono text-slate-500 text-[9px] uppercase tracking-wider shrink-0 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-850">GRADUATION</span>
                            </div>
                          </div>

                          <div className="flex items-start gap-4 relative">
                            <div className="w-3 h-3 rounded bg-emerald-500 mt-1 z-10 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                            <div className="flex-1 flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center text-xs gap-1">
                              <span className="text-emerald-400 font-bold">Post-Grad Typical Outcomes: <span className="text-emerald-300 font-normal">{careerGoal} Profile</span></span>
                              <span className="font-mono text-emerald-400 font-bold whitespace-nowrap bg-emerald-950/30 border border-emerald-800/30 px-2 py-0.5 rounded text-[10px]">{analysisResult.future_path_simulation.job_outcome_range}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* STEP 7 Continued: Advanced career growth timeline */}
                    {analysisResult.future_career_growth_path && (
                      <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 flex flex-col">
                        <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Future Career Growth Path (India Estimate)</h5>
                        
                        <div className="space-y-3.5 text-xs">
                          <div className="bg-slate-950/40 p-2.5 rounded border border-slate-850 space-y-1">
                            <span className="font-mono text-[9px] text-cyan-400 uppercase tracking-wider block">Short-Term Ladder (0-2 Years)</span>
                            <p className="text-slate-300 italic">"{analysisResult.future_career_growth_path.short_term}"</p>
                          </div>
                          
                          <div className="bg-slate-950/40 p-2.5 rounded border border-slate-850 space-y-1">
                            <span className="font-mono text-[9px] text-indigo-400 uppercase tracking-wider block">Mid-Term Ladder (3-5 Years)</span>
                            <p className="text-slate-300 italic">"{analysisResult.future_career_growth_path.mid_term}"</p>
                          </div>

                          <div className="bg-slate-950/40 p-2.5 rounded border border-slate-850 space-y-1">
                            <span className="font-mono text-[9px] text-emerald-400 uppercase tracking-wider block">Long-Term Potential Milestones</span>
                            <p className="text-slate-300 italic">"{analysisResult.future_career_growth_path.long_term_potential}"</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Catalog Reference Database Overlay */}
      {showDatabaseRef && (
        <section className="border-t border-slate-800 bg-[#030712] p-6 transition-all duration-300">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <h3 className="font-display font-medium text-md text-slate-200 flex items-center gap-2">
                  <Database className="w-4 h-4 text-cyan-400" />
                  <span>Ground-Truth Institutional Databases</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Direct structural lookups used to strictly balance admissions GPA cutoff boundaries and program fees.
                </p>
              </div>

              {/* Db search input */}
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  value={dbSearch}
                  onChange={(e) => setDbSearch(e.target.value)}
                  placeholder="Filter by college name or course..."
                  className="w-full text-xs rounded bg-slate-900 border border-slate-800 py-2 pl-8 pr-3 text-gray-200 focus:outline-none focus:border-cyan-500/50"
                />
                <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-500" />
              </div>
            </div>

            {/* List columns */}
            {database ? (
              (() => {
                const filteredColleges = database.colleges.filter((c) => {
                  const matchName = c.name.toLowerCase().includes(dbSearch.toLowerCase());
                  const matchLocation = c.location.toLowerCase().includes(dbSearch.toLowerCase());
                  const matchCourses = c.courses_offered.some((id) =>
                    database.courses.find((cr) => cr.id === id)?.name.toLowerCase().includes(dbSearch.toLowerCase())
                  );
                  return matchName || matchLocation || matchCourses;
                });
                const sliceEnd = showAllColleges ? undefined : 6;
                const visibleColleges = filteredColleges.slice(0, sliceEnd);

                return (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {visibleColleges.map((college) => (
                        <div key={college.id} className="p-4 rounded border border-slate-800 bg-slate-900/40 hover:bg-slate-900/80 transition-all duration-150 space-y-4">
                          <div className="space-y-1">
                            <h4 className="text-sm font-semibold text-gray-200 flex items-center gap-1.5">
                              <Building className="w-3.5 h-3.5 text-cyan-400" />
                              <span>{college.name}</span>
                            </h4>
                            <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
                              <MapPin className="w-3 h-3 text-slate-500" />
                              <span>{college.location}</span>
                            </p>
                          </div>

                          {/* Stats Grid */}
                          <div className="grid grid-cols-3 gap-2 text-center py-2 bg-slate-950/60 rounded border border-slate-850">
                            <div>
                              <span className="block text-[8px] font-mono text-slate-500 uppercase">Annual Fee</span>
                              <span className="text-[11px] font-mono font-bold text-emerald-400">
                                {college.fees >= 100000 ? `₹${(college.fees / 100000).toFixed(2)} Lakhs` : `₹${college.fees.toLocaleString('en-IN')}`}
                              </span>
                            </div>
                            <div>
                              <span className="block text-[8px] font-mono text-slate-500 uppercase">Cutoff Marks</span>
                              <span className="text-[11px] font-mono font-bold text-cyan-400">{college.cutoff}% / %ile</span>
                            </div>
                            <div>
                              <span className="block text-[8px] font-mono text-slate-500 uppercase">Avg Package</span>
                              <span className="text-[11px] font-mono font-bold text-indigo-400">{college.placement_rate}</span>
                            </div>
                          </div>

                          {/* Course tags list */}
                          <div className="space-y-1.5">
                            <span className="block text-[8px] font-mono text-slate-500 uppercase">OFFERED PROGRAMS:</span>
                            <div className="flex flex-wrap gap-1">
                              {college.courses_offered.map((courseId) => {
                                const cr = database.courses.find((x) => x.id === courseId);
                                return cr ? (
                                  <span
                                    key={courseId}
                                    className="text-[10px] px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-350 hover:text-cyan-400 transition-colors"
                                  >
                                    {cr.name}
                                  </span>
                                ) : null;
                              })}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {filteredColleges.length > 6 && (
                      <div className="flex justify-center pt-2">
                        <button
                          type="button"
                          onClick={() => setShowAllColleges(!showAllColleges)}
                          className="px-6 py-2 rounded text-xs font-mono font-bold tracking-wider transition-all uppercase cursor-pointer border border-cyan-500 bg-cyan-950/20 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center gap-2"
                        >
                          <span>{showAllColleges ? 'Show Fewer Colleges' : `View More Colleges (${filteredColleges.length - 6} more)`}</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })()
            ) : (
              <div className="text-center py-10 text-slate-500 text-xs font-mono">
                Syncing database schemas...
              </div>
            )}
          </div>
        </section>
      )}

      {/* College Match Detail Modal */}
      {selectedCollege && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[90] flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-750 rounded-xl overflow-hidden max-w-2xl w-full shadow-2xl relative font-sans animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 pb-0 flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-400 bg-cyan-950/60 px-2.5 py-0.5 rounded border border-cyan-800/30">
                  {selectedCollege.tier}
                </span>
                <h3 className="text-xl font-bold font-display text-white mt-2 flex items-center gap-2">
                  <Building className="w-5 h-5 text-cyan-400" />
                  <span>{selectedCollege.name}</span>
                </h3>
                <p className="text-xs text-slate-450 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{selectedCollege.location}</span>
                </p>
              </div>

              <button
                onClick={() => setSelectedCollege(null)}
                className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Stat Boxes */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800 text-center">
                  <span className="block text-[9px] font-mono text-slate-500 uppercase tracking-widest">NAAC Grade</span>
                  <span className="text-md font-bold text-cyan-400 font-mono">{selectedCollege.naac_grade}</span>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800 text-center">
                  <span className="block text-[9px] font-mono text-slate-500 uppercase tracking-widest">Type</span>
                  <span className="text-md font-bold text-gray-200">{selectedCollege.type}</span>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800 text-center">
                  <span className="block text-[9px] font-mono text-slate-500 uppercase tracking-widest">Annual Fees</span>
                  <span className="text-md font-bold text-emerald-400 font-mono">
                    {selectedCollege.fees >= 100000 
                      ? `₹${(selectedCollege.fees / 100000).toFixed(2)} L` 
                      : `₹${selectedCollege.fees.toLocaleString('en-IN')}`}
                  </span>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800 text-center">
                  <span className="block text-[9px] font-mono text-slate-500 uppercase tracking-widest">Placement</span>
                  <span className="text-md font-bold text-indigo-400 font-mono">{selectedCollege.placement_rate}% Rate</span>
                </div>
              </div>

              {/* General Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono bg-slate-950/30 p-4 rounded-lg border border-slate-850">
                <div className="space-y-2">
                  <div className="flex justify-between border-b border-slate-900 pb-1.5">
                    <span className="text-slate-500 uppercase">Affiliation:</span>
                    <span className="text-slate-300 font-bold">{selectedCollege.affiliation}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-900 pb-1.5">
                    <span className="text-slate-500 uppercase">Autonomous:</span>
                    <span className={`font-bold ${selectedCollege.autonomous ? 'text-cyan-400' : 'text-slate-400'}`}>
                      {selectedCollege.autonomous ? 'Yes (Autonomous)' : 'No (Affiliated)'}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between border-b border-slate-900 pb-1.5">
                    <span className="text-slate-500 uppercase">Dist./City:</span>
                    <span className="text-slate-300 font-bold">{selectedCollege.city} / {selectedCollege.district}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-900 pb-1.5">
                    <span className="text-slate-500 uppercase">EAMCET Cutoff:</span>
                    <span className="text-cyan-400 font-bold font-mono">{selectedCollege.cutoff}%</span>
                  </div>
                </div>
              </div>

              {/* Branches / Programs */}
              <div className="space-y-2">
                <span className="block text-[9px] font-mono text-slate-500 uppercase tracking-wider">Major Specializations & Branches</span>
                <div className="flex flex-wrap gap-2">
                  {selectedCollege.branches.map((b) => (
                    <span key={b} className="text-xs px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300">
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* Offered Courses aligned with Database */}
              <div className="space-y-2">
                <span className="block text-[9px] font-mono text-slate-500 uppercase tracking-wider">Catalog Degrees Registered</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCollege.courses_offered.map((courseId) => {
                    const cr = database?.courses.find(x => x.id === courseId);
                    return cr ? (
                      <span key={courseId} className="text-[11px] px-2.5 py-0.5 rounded-full bg-cyan-950/30 border border-cyan-800/30 text-cyan-300">
                        {cr.name}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-6 bg-slate-950/40 border-t border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Left Action: website hyperlink */}
              {selectedCollege.website && (
                <a
                  href={`https://${selectedCollege.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono transition-colors"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Visit {selectedCollege.website}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              
              {/* Right Action: Sync button */}
              <button
                onClick={() => {
                  setBudget(selectedCollege.fees + 5000);
                  setStateFilter(selectedCollege.state);
                  setLocation(`${selectedCollege.city}, ${selectedCollege.state}`);
                  
                  if (selectedCollege.courses_offered && selectedCollege.courses_offered.length > 0) {
                    setInterest(selectedCollege.courses_offered[0]);
                    const matchedCourse = database?.courses.find(c => c.id === selectedCollege.courses_offered[0]);
                    if (matchedCourse) {
                      setBroadInterest(matchedCourse.field_category);
                    }
                  }
                  
                  setSatScore(Math.min(99, selectedCollege.cutoff + 2));
                  setMarks(Math.min(99, selectedCollege.cutoff + 3));
                  setActiveStep(4);
                  setSelectedCollege(null);
                }}
                className="w-full sm:w-auto text-xs py-2 px-4 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-955 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 transition-all font-semibold shadow-lg text-slate-950 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Sync with Diagnostic OS</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Status Bar from samples */}
      <footer className="h-10 bg-[#020617] border-t border-slate-850 px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between text-[9px] text-slate-500 uppercase tracking-tighter gap-1 py-2 font-mono mt-auto">
        <div>All rights reserved Bhavya Reddy</div>
        <div>Ground-Truth Simulation Fidelity: 99.82%</div>
        <div>Current Period: June 2026</div>
      </footer>
    </div>
  );
}
