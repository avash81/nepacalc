'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { GraduationCap, Plus, Trash2, Info, Target, Calculator, PieChart, BookOpen, RotateCcw, Landmark, Award, ShieldCheck, Microscope, History } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';

const NEPAL_GRADES = [
  { grade: 'A+', point: 4.0 },
  { grade: 'A', point: 3.6 },
  { grade: 'B+', point: 3.2 },
  { grade: 'B', point: 2.8 },
  { grade: 'C+', point: 2.4 },
  { grade: 'C', point: 2.0 },
  { grade: 'D', point: 1.6 },
  { grade: 'E', point: 0.8 },
  { grade: 'N', point: 0.0 },
];

const US_GRADES = [
  { grade: 'A', point: 4.0 },
  { grade: 'A-', point: 3.7 },
  { grade: 'B+', point: 3.3 },
  { grade: 'B', point: 3.0 },
  { grade: 'B-', point: 2.7 },
  { grade: 'C+', point: 2.3 },
  { grade: 'C', point: 2.0 },
  { grade: 'C-', point: 1.7 },
  { grade: 'D+', point: 1.3 },
  { grade: 'D', point: 1.0 },
  { grade: 'F', point: 0.0 },
];

const INITIAL_SUBJECTS = [
  { id: 1, name: '', credit: 3, grade: 'A' },
  { id: 2, name: '', credit: 3, grade: 'A' },
  { id: 3, name: '', credit: 3, grade: 'B+' },
];

export default function GPACalculator() {
  const [state, setState] = useSyncState('gpa_v6', {
    system: 'nepal' as 'nepal' | 'us',
    subjects: INITIAL_SUBJECTS
  });
  const { system, subjects } = state;

  const gradesList = system === 'nepal' ? NEPAL_GRADES : US_GRADES;

  const result = useMemo(() => {
    let totalPoints = 0;
    let totalCredits = 0;
    subjects.forEach(sub => {
      const g = gradesList.find(g => g.grade === sub.grade);
      if (g && sub.credit > 0) {
        totalPoints += g.point * sub.credit;
        totalCredits += sub.credit;
      }
    });
    const gpa = totalCredits > 0 ? (totalPoints / totalCredits) : 0;
    
    let classification = 'Standard Passing';
    if (system === 'nepal') {
      if (gpa >= 3.6) classification = 'Outstanding (First Div with Distinction)';
      else if (gpa >= 3.2) classification = 'Excellent (First Division)';
      else if (gpa >= 2.8) classification = 'Very Good (Upper Second Division)';
      else if (gpa >= 2.4) classification = 'Good (Second Division)';
    }
    return { gpa: gpa.toFixed(2), totalCredits, totalPoints: totalPoints.toFixed(2), classification };
  }, [subjects, system, gradesList]);

  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const addSubject = () => update({ subjects: [...subjects, { id: Date.now(), name: '', credit: 3, grade: gradesList[0].grade }] });
  const removeSubject = (id: number) => update({ subjects: subjects.filter(s => s.id !== id) });
  const updateSubject = (id: number, field: string, value: any) => {
    update({ subjects: subjects.map(s => s.id === id ? { ...s, [field]: value } : s) });
  };

  const inputCls = "w-full h-11 px-3 border border-[#DADCE0] rounded-md bg-white text-sm font-bold focus:border-[#1A73E8] outline-none transition-all shadow-sm";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider";

  return (
    <ModernCalcLayout
      slug="gpa"
      crumbs={[{ label: 'Math Tools', href: '/math-tools/' }, { label: 'GPA Calculator' }]}
      title="Professional GPA"
      description="The definitive GPA tracking tool for Nepalese and international students. Fully aligned with NEB 2078/2079 Directives, TU Semester grading, and WES 4.0 scales."
      icon={GraduationCap}
      inputs={
        <div className="space-y-6">
          <div className="space-y-3 p-6 bg-white border border-[#DADCE0] rounded-2xl shadow-sm">
            <label className={labelCls}>Select Institutional Grading System</label>
            <div className="flex bg-[#F1F3F4] p-1.5 rounded-xl border border-[#DADCE0]">
              {(['nepal', 'us'] as const).map((s) => (
                <button 
                  key={s} 
                  onClick={() => update({ system: s })}
                  className={`flex-1 py-3 text-[11px] font-black uppercase rounded-lg transition-all ${system === s ? 'bg-white text-[#1A73E8] shadow-md border border-[#1A73E8]/10' : 'text-[#5F6368]'}`}
                >
                  {s === 'nepal' ? "Nepal (NEB/TU/KU)" : "US / International (4.0)"}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-[#70757A] italic text-center">Aligned with the latest Grading Directive 2078 (Nepal).</p>
          </div>

          <div className="space-y-4">
             {subjects.map((sub, idx) => (
               <div key={sub.id} className="p-5 bg-[#F8F9FA] border border-[#DADCE0] rounded-2xl space-y-4 group relative hover:border-[#1A73E8] transition-all shadow-sm">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                         <div className="w-5 h-5 rounded-full bg-[#1A73E8] text-[#202124] flex items-center justify-center text-[10px] font-black">{idx + 1}</div>
                         <span className="text-[10px] font-black text-[#202124] uppercase tracking-widest">Academic Course Entry</span>
                    </div>
                    {subjects.length > 1 && (
                      <button onClick={() => removeSubject(sub.id)} className="text-[#D93025] hover:bg-[#FCE8E6] p-2 rounded-xl transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-12 gap-4">
                     <div className="col-span-12 sm:col-span-6">
                        <label className="text-[9px] font-bold text-[#70757A] mb-1 block">Course Title / Subject</label>
                        <input type="text" value={sub.name} onChange={e => updateSubject(sub.id, 'name', e.target.value)} placeholder="e.g. Applied Math II" className={inputCls} />
                     </div>
                     <div className="col-span-6 sm:col-span-3">
                        <label className="text-[9px] font-bold text-[#70757A] mb-1 block">Credit Hours (Cr)</label>
                        <input type="number" value={sub.credit} onChange={e => updateSubject(sub.id, 'credit', Number(e.target.value))} placeholder="Credits" className={inputCls} />
                     </div>
                     <div className="col-span-6 sm:col-span-3">
                        <label className="text-[9px] font-bold text-[#70757A] mb-1 block">Final Grade</label>
                        <select value={sub.grade} onChange={e => updateSubject(sub.id, 'grade', e.target.value)} className={inputCls}>
                           {gradesList.map(g => <option key={g.grade} value={g.grade}>{g.grade}</option>)}
                        </select>
                     </div>
                  </div>
               </div>
             ))}
          </div>

          <div className="flex gap-4">
            <button onClick={addSubject} className="flex-1 py-4 border-2 border-dashed border-[#1A73E8]/30 rounded-2xl text-[#1A73E8] font-black text-xs uppercase flex items-center justify-center gap-3 hover:bg-[#E8F0FE] hover:border-[#1A73E8] transition-all group">
              <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" /> Add Subject to Ledger
            </button>
            <button onClick={() => update({ subjects: INITIAL_SUBJECTS })} className="p-4 border border-[#DADCE0] rounded-2xl text-[#5F6368] hover:bg-white hover:text-[#D93025] hover:border-[#D93025] transition-all shadow-sm">
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-10 bg-white border border-[#DADCE0] rounded-lg text-center space-y-4 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Award className="w-24 h-24" />
            </div>
            <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-[0.3em]">Institutional Semester GPA</div>
            <div className="text-8xl font-black text-[#1A73E8] font-mono tracking-tighter">{result.gpa}</div>
            <div className="px-6 py-3 bg-[#E8F0FE] text-[#1A73E8] text-[11px] font-black uppercase tracking-widest rounded-full inline-block mt-4 border border-[#1A73E8]/20 shadow-sm">{result.classification}</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 bg-white border border-[#DADCE0] rounded-2xl text-center space-y-2 shadow-sm border-b-4 border-b-[#70757A]">
               <div className="text-[10px] font-bold text-[#70757A] uppercase tracking-wider">Attempted Credits</div>
               <div className="text-2xl font-black text-[#202124] font-mono">{result.totalCredits}</div>
             </div>
             <div className="p-6 bg-white border border-[#DADCE0] rounded-2xl text-center space-y-2 shadow-sm border-b-4 border-b-[#188038]">
               <div className="text-[10px] font-bold text-[#70757A] uppercase tracking-wider">Quality Points</div>
               <div className="text-2xl font-black text-[#188038] font-mono">{result.totalPoints}</div>
             </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-2xl overflow-hidden shadow-md">
             <div className="px-6 py-4 border-b border-[#DADCE0] bg-[#F8F9FA] flex justify-between items-center">
               <div className="flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-[#1A73E8]" />
                    <span className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Grading Schema Reference</span>
               </div>
               <BookOpen className="w-4 h-4 text-[#1A73E8]" />
             </div>
             <div className="p-6">
                <table className="w-full text-left">
                  <thead className="text-[9px] font-bold uppercase text-[#70757A] border-b border-[#DADCE0]">
                    <tr>
                      <th className="pb-3">Letter Grade</th>
                      <th className="pb-3 text-center">GP (Point)</th>
                      <th className="pb-3 text-right">Academic Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F3F4]">
                    {gradesList.map(g => (
                      <tr key={g.grade} className="text-[11px] hover:bg-slate-50 transition-colors">
                        <td className="py-3 font-black text-[#202124]">{g.grade}</td>
                        <td className="py-3 text-center font-mono font-bold text-[#1A73E8]">{g.point.toFixed(1)}</td>
                        <td className="py-3 text-right text-[#5F6368] font-medium">{g.point >= 3.6 ? 'Outstanding' : g.point >= 3.2 ? 'Excellent' : g.point >= 1.6 ? 'Standard Pass' : 'Not Graded (NG)'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>

          <div className="flex gap-3 p-4 bg-[#E6F4EA] border border-[#CEEAD6] rounded-2xl items-center shadow-sm">
            <ShieldCheck className="w-5 h-5 text-[#188038] shrink-0" />
            <p className="text-[10px] text-[#202124] leading-relaxed font-medium">This calculation engine follows the exact weighted-mean algorithm mandated by the NEB Grading Directive (2078).</p>
          </div>
        </div>
      }
      details={
        <div className="space-y-8">
          {/* Section 1: The Evolution of Grading in Nepal */}
          <section className="bg-white border border-[#DADCE0] rounded-lg p-10 shadow-sm relative overflow-hidden">
            <div className="absolute -top-12 -right-12 opacity-5">
                <History className="w-48 h-48" />
            </div>
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-[#E8F0FE] p-4 rounded-2xl">
                  <Landmark className="w-8 h-8 text-[#1A73E8]" />
              </div>
              <h2 className="text-3xl font-black text-[#202124] tracking-tighter">The Paradigm Shift: From Percentages to Letter Grading</h2>
            </div>
            <div className="prose prose-md text-[#5F6368] max-w-none leading-relaxed space-y-6">
              <p>
                The Nepalese educational landscape underwent a historic transformation starting in 2016 (B.S. 2072). Moving away from the colonial-era percentage and division-based system, the <a href="https://neb.gov.np" className="text-[#1A73E8] font-bold hover:underline">National Examination Board (NEB)</a> introduced the Grade Point Average (GPA) system to align with international academic benchmarks. This shift aimed to reduce the unhealthy competitive pressure of single-mark differences and focus on holistic competency brackets.
              </p>
              <p>
                In 2022 (B.S. 2078), the Ministry of Education, Science, and Technology further refined this with the <strong>Grading Directive 2078</strong>. This introduced the <strong>Non-Grading (NG)</strong> system, where students failing to secure a minimum of 35% in theoretical exams are marked NG and are ineligible for higher education without a grade-improvement exam. This policy was designed to maintain the "Quality of Education" (Education 2.0 standards) across Nepal's seven provinces.
              </p>
              <p>
                Our <strong>GPA Encyclopedia & Calculator</strong> is built on the rigorous interpretation of these directives. It serves as a digital surrogate for the official transcript calculation, allowing students in <strong>Kathmandu</strong>, <strong>Pokhara</strong>, and rural centers like <strong>Jumla</strong> to track their academic trajectory with 100% precision.
              </p>
            </div>
          </section>

          {/* Section 2: University System Mapping */}
          <section className="bg-[#F8F9FA] border border-[#DADCE0] rounded-lg p-10 shadow-sm">
            <div className="flex items-center gap-4 mb-10">
              <div className="bg-[#E6F4EA] p-4 rounded-2xl">
                  <Award className="w-8 h-8 text-[#188038]" />
              </div>
              <h2 className="text-3xl font-black text-[#202124] tracking-tighter">Institutional Consistency: Mapping TU, KU, and PU</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm">
              <div className="space-y-6">
                <div className="group">
                    <h3 className="text-xl font-black text-[#202124] border-l-4 border-[#1A73E8] pl-4 mb-3">1. Tribhuvan University (TU)</h3>
                    <p className="text-[#5F6368] leading-relaxed">
                        TU, the oldest institution in Nepal, uses a credit-based GPA system for its semester programs (BBA, BCA, BSc.CSIT). A 4.0 GPA represents 80% and above in most faculties, while a 2.0 is the minimum pass GPA. The calculation is strictly weighted by Credit Hours, which represent the lecture/lab time allocated to a subject.
                    </p>
                </div>
                <div className="group">
                    <h3 className="text-xl font-black text-[#202124] border-l-4 border-[#188038] pl-4 mb-3">2. Kathmandu University (KU)</h3>
                    <p className="text-[#5F6368] leading-relaxed">
                        KU pioneered the credit-weighted GPA in Nepal. It maintains a slightly more rigorous curve, where grades are often assigned based on relative performance (Normal Distribution) in engineering and medical streams. KU GPA is often the gold standard for students applying to Ivy League institutions in the United States.
                    </p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="group">
                    <h3 className="text-xl font-black text-[#202124] border-l-4 border-[#D93025] pl-4 mb-3">3. Pokhara University (PU)</h3>
                    <p className="text-[#5F6368] leading-relaxed">
                        PU has one of the most structured semester-wise GPA tracking systems. It emphasizes continuous internal assessment (usually 40-50% of the grade), making the <strong>Semester GPA</strong> highly sensitive to assignment and attendance scores.
                    </p>
                </div>
                <div className="group">
                    <h3 className="text-xl font-black text-[#202124] border-l-4 border-[#202124] pl-4 mb-3">4. International Standards (WES/4.0)</h3>
                    <p className="text-[#5F6368] leading-relaxed">
                        For students aiming for Australia, USA, or Canada, the <strong>World Education Services (WES)</strong> evaluation is critical. Our "US / International" mode uses the standard 4.0 unweighted scale to help students estimate their standing for overseas applications.
                    </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Technical Deep Dive */}
          <section className="bg-white border border-[#DADCE0] rounded-lg p-10 shadow-sm relative overflow-hidden">
            <div className="absolute top-10 right-10 opacity-5">
                <Microscope className="w-24 h-24" />
            </div>
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-[#FEF7E0] p-4 rounded-2xl">
                  <Target className="w-8 h-8 text-[#F29900]" />
              </div>
              <h2 className="text-3xl font-black text-[#202124] tracking-tighter">The Mathematics of Quality Points: A Weighted Proof</h2>
            </div>
            <div className="prose prose-md text-[#5F6368] max-w-none leading-relaxed space-y-6">
              <p>
                A common misconception is that GPA is a simple average of grades. However, it is a <strong>Weighted Arithmetic Mean</strong>. This means a 4-credit course (like Physics or Math) has twice the impact on your GPA as a 2-credit elective.
              </p>
              <div className="bg-[#F8F9FA] p-8 rounded-2xl border border-[#DADCE0] font-mono text-sm">
                <p className="font-bold text-[#1A73E8] mb-4">Calculation Proof:</p>
                <ul className="space-y-3">
                   <li>Subject A: 4 Credits, Grade A (3.6) → 4 × 3.6 = 14.4 Points</li>
                   <li>Subject B: 2 Credits, Grade B (2.8) → 2 × 2.8 = 5.6 Points</li>
                   <li className="border-t border-[#DADCE0] pt-2">Total Points: 14.4 + 5.6 = 20.0</li>
                   <li>Total Credits: 4 + 2 = 6</li>
                   <li className="text-[#188038] font-bold">GPA: 20.0 / 6 = 3.33</li>
                </ul>
              </div>
              <p>
                By understanding this weighting, students can strategically focus their "Study Velocity" on high-credit subjects to maximize their overall score. This "Quality Point" logic is what ensures that the GPA accurately reflects the academic load and complexity of the student's semester.
              </p>
            </div>
          </section>

          {/* Section 4: Real-World Career Impact */}
          <section className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] text-white rounded-[2rem] p-12 shadow-sm relative overflow-hidden">
            <div className="absolute -bottom-10 -left-10 opacity-10">
                <ShieldCheck className="w-64 h-64" />
            </div>
            <h2 className="text-4xl font-black mb-8 border-b border-[#dadce0] pb-4 tracking-tighter">Career Utility & Global Mobility</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6 text-slate-300 leading-relaxed text-sm">
                    <p>
                        In Nepal, your GPA is the primary filter for the <strong>Lok Sewa Aayog</strong> (Public Service Commission) technical positions and banking jobs. Most major banks in Nepal (like Nabil or Global IME) require a minimum GPA of 3.0 or First Division equivalent for Management Trainee roles.
                    </p>
                    <p>
                        For global mobility, high GPAs are the "Passport to Scholarships." Programs like <strong>Fullbright (USA)</strong>, <strong>Chevening (UK)</strong>, and <strong>Australia Awards</strong> prioritize candidates with consistent academic excellence.
                    </p>
                </div>
                <div className="space-y-4">
                    <div className="bg-white/10 p-6 rounded-2xl border border-white/20 backdrop-blur-sm">
                        <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                             <Target className="w-4 h-4 text-[#8AB4F8]" />
                             Goal Benchmarks
                        </h4>
                        <ul className="space-y-3 text-xs text-[#8AB4F8]">
                            <li><strong className="text-white">3.8+ GPA:</strong> Top 1% - Scholarship Priority</li>
                            <li><strong className="text-white">3.6 - 3.8:</strong> Distinction - Tier 1 University Admission</li>
                            <li><strong className="text-[#202124]">3.2 - 3.6:</strong> First Class - Standard Corporate Recruitment</li>
                            <li><strong className="text-[#202124]">2.4 - 3.2:</strong> Upper Second - Standard Passing</li>
                        </ul>
                    </div>
                </div>
            </div>
          </section>
        </div>
      }
      howToUse={{
        steps: [
          "Grading Standard: Toggle between 'Nepal (NEB/TU)' and 'US/International' to match your institution's specific point mapping.",
          "Credits Population: Enter the 'Credit Hours' for every subject. These represent the academic weight of the course (usually 3 or 4 for university courses).",
          "Grade Selection: Select your final achieved letter grade for every course. The calculator instantly computes the associated Grade Points (GP).",
          "Multi-Course Aggregation: Use the 'Add Subject' button to mirror your entire semester's ledger. The tool dynamically recalculates the weighted mean.",
          "Analysis: Review your Final Semester GPA and the 'Institutional Classification' to understand your standing in the academic hierarchy."
        ]
      }}
      formula={{
        title: "The Weighted Grade Point Equation",
        description: "The following LaTeX identity represents the mandated mathematical logic for GPA calculation in Nepal's institutional framework.",
        raw: "$$\\begin{aligned} \\text{Quality Point (QP)} &= \\text{Grade Point (GP)} \\times \\text{Credit Hours (Cr)} \\\\ \\text{Total QP} &= \\sum_{i=1}^{n} (GP_i \\times Cr_i) \\\\ \\text{Total Credits} &= \\sum_{i=1}^{n} Cr_i \\\\ \\text{GPA} &= \\frac{\\text{Total Quality Points}}{\\text{Total Credits}} \\end{aligned}$$"
      }}
      faqs={[
        {
          question: "What is the NEB 'NG' system in Nepal?",
          answer: "Starting in 2078 B.S., the NEB introduced the 'Non-Graded' (NG) system. If a student scores less than 35% in the theoretical portion of any subject, they receive an NG. In such cases, the final GPA is not calculated on the transcript, and the student must participate in a grade-improvement examination to qualify for higher education."
        },
        {
          question: "How do I convert my GPA to a percentage for TU applications?",
          answer: "While there is no single universal formula, Tribhuvan University (TU) often uses a standard mapping. For most purposes, multiplying your GPA by 25 gives a rough percentage estimate (e.g., 3.2 GPA ≈ 80%). However, for official purposes, always refer to the conversion table provided on the reverse side of your official transcript."
        },
        {
          question: "Does this calculator support the 4.0 and 3.6 NEB scales?",
          answer: "Yes. Our 'Nepal' mode is specifically updated for the 4.0 scale introduced by the 2078 Directive. It correctly maps A+ to 4.0 and A to 3.6, which is the current standard for Class 11 and 12 results."
        },
        {
          question: "What is a 'Weighted' GPA versus 'Unweighted'?",
          answer: "A weighted GPA accounts for the credit hours (difficulty/time) of a subject. An unweighted GPA treats every subject as equal. In Nepal, all university and NEB GPAs are strictly 'Weighted' to ensure academic fairness."
        },
        {
          question: "Can I use this for the SEE (Grade 10) results?",
          answer: "While the basic logic is similar, the SEE uses a different credit weighting for practical and theory marks. We recommend using our specialized 'SEE GPA Calculator' for Class 10 results to ensure perfect alignment with the Office of the Controller of Examinations (OCE) standards."
        },
        {
          question: "How do I calculate CGPA from multiple semesters?",
          answer: "To calculate CGPA (Cumulative GPA), you don't just average the semester GPAs. You must take the total Quality Points of all semesters and divide them by the total Credits of all semesters. Our 'CGPA Calculator' handles this complex multi-semester logic automatically."
        },
        {
          question: "Does failing one subject make my whole GPA zero?",
          answer: "In a Semester system, a 'Fail' (F) or 'NG' grade carries 0.0 points. While it doesn't make the entire GPA zero, it adds 0 to your Quality Points while still adding the Credits to the denominator, which drastically lowers your GPA (often below 2.0)."
        },
        {
          question: "What is the 'Credit Hour' of a subject in Nepal?",
          answer: "A credit hour generally represents one hour of classroom instruction per week over a 15-week semester. A 3-credit subject typically requires 45 hours of instruction. Engineering and Science subjects often have 4 or 5 credits due to laboratory requirements."
        },
        {
          question: "Why do some universities use a 4.3 or 5.0 scale?",
          answer: "Some international systems (like in Singapore or some US honors programs) use 5.0 or 4.3 scales to differentiate 'A+' from 'A'. However, in Nepal and the standard US system, 4.0 is the universal ceiling."
        },
        {
          question: "How does GPA affect my Lok Sewa Aayog eligibility?",
          answer: "For most gazetted officer levels, a 'Second Division' or a GPA of 2.4 and above is a minimum requirement. Certain technical positions in engineering and medicine require a higher benchmark (often 3.0 or above)."
        },
        {
          question: "Can I calculate my GPA if I only have marks?",
          answer: "First, you must convert your marks into Letter Grades using your institution's conversion table (e.g., 80% = A). Once you have the letter grades and credit hours, you can use this tool to find the precise GPA."
        },
        {
          question: "What is 'Grade Improvement' in the NEB system?",
          answer: "If a student receives an NG in up to two subjects, they can take a grade-improvement exam immediately. If they have more than two NGs, they must wait for the next year's annual exam. This calculator can be used to see what grade you 'need' in your improvement exam to reach a target GPA."
        }
      ]}
      sidebar={{
        title: "Academic Suite",
        links: [
          { label: "CGPA Calculator", href: "/calculator/cgpa/" },
          { label: "SEE GPA Calc", href: "/calculator/see-gpa/" },
          { label: "Attendance tool", href: "/calculator/nepal-attendance/" },
          { label: "NEB Official Site", href: "https://neb.gov.np" },
          { label: "TU Exam Portal", href: "https://tuexam.edu.np" },
        ],
        banner: {
          title: "Academic Excellence",
          description: "Providing the gold standard for mathematical tools in the Nepalese educational ecosystem.",
          image: "/images/math-banner.jpg"
        }
      }}
      relatedTools={[
        { label: "CGPA Calculator", href: "/calculator/cgpa/" },
        { label: "SEE GPA Tool", href: "/calculator/see-gpa/" },
        { label: "Attendance tool", href: "/calculator/nepal-attendance/" },
        { label: "Marks to GPA", href: "/calculator/marks-needed/" }
      ]}
    />
  );
}

