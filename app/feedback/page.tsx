'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from '@/lib/firebase';
import { downloadFeedbackExcel } from '@/lib/exportFeedback';
import { SCHEDULE_DATA } from '@/constants/events';

// ============================================================================
// BESPOKE CUSTOM GEOMETRIC SVG ICONS (Gradient-free, Sharp, Heavy-mitre)
// ============================================================================

const CustomLoaderIcon = ({ className = '', size = 18 }: { className?: string; size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3.2" 
    strokeLinecap="square" 
    className={`animate-spin ${className}`}
  >
    <path d="M12 2A10 10 0 0 1 22 12" />
  </svg>
);

const CustomMessageIcon = ({ className = '', size = 18 }: { className?: string; size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="square" 
    strokeLinejoin="miter" 
    className={className}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const CustomStarIcon = ({ className = '', size = 24, filled = false }: { className?: string; size?: number; filled?: boolean }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={filled ? "var(--color-brand-orange)" : "none"} 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="square" 
    strokeLinejoin="miter" 
    className={className}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const CustomCheckIcon = ({ className = '', size = 18 }: { className?: string; size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3.2" 
    strokeLinecap="square" 
    strokeLinejoin="miter" 
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CustomDownloadIcon = ({ className = '', size = 18 }: { className?: string; size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="square" 
    strokeLinejoin="miter" 
    className={className}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const CustomSettingsIcon = ({ className = '', size = 18 }: { className?: string; size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="square" 
    strokeLinejoin="miter" 
    className={className}
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const CustomAnalyticsIcon = ({ className = '', size = 18 }: { className?: string; size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="square" 
    strokeLinejoin="miter" 
    className={className}
  >
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const CustomMenuIcon = ({ className = '', size = 18 }: { className?: string; size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="square" 
    strokeLinejoin="miter" 
    className={className}
  >
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CustomCloseIcon = ({ className = '', size = 18 }: { className?: string; size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="square" 
    strokeLinejoin="miter" 
    className={className}
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const CustomLogoutIcon = ({ className = '', size = 18 }: { className?: string; size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="square" 
    strokeLinejoin="miter" 
    className={className}
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const CustomWarningIcon = ({ className = '', size = 18 }: { className?: string; size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="square" 
    strokeLinejoin="miter" 
    className={className}
  >
    <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
    <line x1="12" y1="8" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

// ============================================================================
// DEFAULT QUESTIONS SEED GENERATOR
// ============================================================================
export function generateDefaultFormsMap(): Record<string, { questions: any[] }> {
  const forms: Record<string, { questions: any[] }> = {};
  
  SCHEDULE_DATA.forEach((daySchedule) => {
    const questions: any[] = [];
    let qCount = 1;
    
    // Add rating question for each non-meal event
    daySchedule.events.forEach((evt) => {
      const t = evt.title.toUpperCase();
      if (t === 'BREAKFAST' || t === 'LUNCH' || t === 'SNACKS' || t === 'DINNER' || t === 'REST') {
        return;
      }
      
      questions.push({
        id: `q_${daySchedule.day.replace(' ', '_').toLowerCase()}_rating_${qCount++}`,
        type: 'rating',
        label: evt.title,
        required: false
      });
    });
    
    // Add 3 default text questions
    questions.push({
      id: `q_${daySchedule.day.replace(' ', '_').toLowerCase()}_text_1`,
      type: 'text',
      label: "What did you like most about today's events?",
      required: false
    });
    questions.push({
      id: `q_${daySchedule.day.replace(' ', '_').toLowerCase()}_text_2`,
      type: 'text',
      label: "What should be improved tomorrow / next time?",
      required: false
    });
    questions.push({
      id: `q_${daySchedule.day.replace(' ', '_').toLowerCase()}_text_3`,
      type: 'text',
      label: "Any other suggestions for future squad sessions?",
      required: false
    });
    
    forms[daySchedule.day] = { questions };
  });
  
  return forms;
}

export default function FeedbackTeamPortalPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'analytics' | 'configurator'>('analytics');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  // Data States
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [selectedDayFilter, setSelectedDayFilter] = useState<string>('all'); // 'all', 'Day 01', 'Day 02', etc.
  const [exporting, setExporting] = useState(false);

  // Settings / Form Configurator States
  const [configActiveDayIdx, setConfigActiveDayIdx] = useState<number>(0);
  const [formsMap, setFormsMap] = useState<Record<string, { questions: any[] }>>({});
  const [savingSettings, setSavingSettings] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Deep Dive Active Rating Question State
  const [selectedRatingQId, setSelectedRatingQId] = useState<string>('');

  const firebaseReady = isFirebaseConfigured();

  // Authentication & Router Protection
  useEffect(() => {
    if (!firebaseReady || !auth || !db) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const roleDoc = await getDoc(doc(db, 'roles', currentUser.uid));
          if (roleDoc.exists()) {
            const role = roleDoc.data().role;
            if (role === 'feedback' || role === 'admin') {
              setUser(currentUser);
            } else {
              router.push('/login');
            }
          } else {
            router.push('/login');
          }
        } catch (err) {
          console.error('Error verifying feedback team credentials:', err);
          router.push('/login');
        }
      } else {
        router.push('/login');
      }
    });
    return () => unsubscribe();
  }, [firebaseReady, router]);

  // Load Feedbacks & Active Configurations
  useEffect(() => {
    if (!user || !db) return;

    const unsubFeedbacks = onSnapshot(collection(db, 'feedback'), (snap) => {
      const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as any[];
      docs.sort((a, b) => {
        const tA = (a.submittedAt ?? a.timestamp)?.toMillis?.() ?? 0;
        const tB = (b.submittedAt ?? b.timestamp)?.toMillis?.() ?? 0;
        return tB - tA;
      });
      setFeedbacks(docs);
      setLoading(false);
    });

    // Load active settings from settings/feedback
    async function loadSettings() {
      try {
        const settingsDoc = await getDoc(doc(db, 'settings', 'feedback'));
        let activeDayIdx = 0;
        let dbForms: Record<string, any> = {};
        
        if (settingsDoc.exists()) {
          const data = settingsDoc.data();
          const activeDayId = data.activeDayId || 'Day 01';
          const dayIdx = SCHEDULE_DATA.findIndex(d => d.day === activeDayId);
          if (dayIdx !== -1) activeDayIdx = dayIdx;
          dbForms = data.forms || {};
        }
        
        // Seed default questions if missing for any day
        const seededForms = generateDefaultFormsMap();
        const combinedForms: Record<string, any> = {};
        SCHEDULE_DATA.forEach((daySchedule) => {
          combinedForms[daySchedule.day] = dbForms[daySchedule.day] || seededForms[daySchedule.day];
        });
        
        setConfigActiveDayIdx(activeDayIdx);
        setFormsMap(combinedForms);
      } catch (err) {
        console.error('Error loading settings:', err);
      }
    }
    loadSettings();

    return () => {
      unsubFeedbacks();
    };
  }, [user]);

  // ============================================================================
  // BACKWARD COMPATIBILITY COMPILER (LEGACY SUBMISSIONS ON-THE-FLY FLATTENER)
  // ============================================================================
  const parsedSubmissions = useMemo(() => {
    return feedbacks.map((f) => {
      if (f.answers) return f; // Already in dynamic answers format
      
      // Map old document attributes (ratings, comments, likedMost, etc.) to dynamic questions
      const answers: Record<string, any> = {};
      const ratings = f.ratings || {};
      const comments = f.comments || {};
      const seeded = generateDefaultFormsMap()[f.day] || { questions: [] };
      
      seeded.questions.forEach((q) => {
        if (q.type === 'rating') {
          const score = ratings[q.label];
          if (score !== undefined) {
            answers[q.id] = {
              type: 'rating',
              label: q.label,
              value: score,
              comment: comments[q.label] || ''
            };
          }
        } else if (q.type === 'text') {
          let val = '';
          const l = q.label.toLowerCase();
          if (l.includes('like')) val = f.likedMost || '';
          else if (l.includes('improve')) val = f.improvements || '';
          else if (l.includes('suggestion')) val = f.suggestions || '';
          
          if (val.trim()) {
            answers[q.id] = {
              type: 'text',
              label: q.label,
              value: val,
              comment: ''
            };
          }
        }
      });
      
      return {
        ...f,
        answers
      };
    });
  }, [feedbacks]);

  // Filter Submissions by selected day filter
  const filteredSubmissions = useMemo(() => {
    if (selectedDayFilter === 'all') return parsedSubmissions;
    return parsedSubmissions.filter((f) => f.day === selectedDayFilter);
  }, [parsedSubmissions, selectedDayFilter]);

  const totalFormsSubmitted = filteredSubmissions.length;

  // Compile active form questions list for evaluated days
  const activeQuestionsForFilter = useMemo(() => {
    if (selectedDayFilter !== 'all') {
      return formsMap[selectedDayFilter]?.questions || [];
    }
    const all: any[] = [];
    const addedIds = new Set<string>();
    Object.keys(formsMap).forEach((day) => {
      (formsMap[day]?.questions || []).forEach((q) => {
        if (!addedIds.has(q.id)) {
          all.push(q);
          addedIds.add(q.id);
        }
      });
    });
    return all;
  }, [formsMap, selectedDayFilter]);

  const ratingQuestionsList = useMemo(() => {
    return activeQuestionsForFilter.filter(q => q.type === 'rating');
  }, [activeQuestionsForFilter]);

  // Selected Question auto-matcher on filter change
  useEffect(() => {
    if (ratingQuestionsList.length > 0) {
      const exists = ratingQuestionsList.some(q => q.id === selectedRatingQId);
      if (!exists) {
        setSelectedRatingQId(ratingQuestionsList[0].id);
      }
    } else {
      setSelectedRatingQId('');
    }
  }, [ratingQuestionsList, selectedRatingQId]);

  // Aggregate stats per question
  const questionStats = useMemo(() => {
    const stats: Record<string, { ratings: number[]; comments: { rating: number; text: string; date: string }[]; textAnswers: { text: string; date: string }[] }> = {};

    filteredSubmissions.forEach((f) => {
      const dateStr = f.submittedAt?.toDate ? f.submittedAt.toDate().toLocaleDateString() : '';
      const answers = f.answers || {};

      Object.keys(answers).forEach((qId) => {
        const ans = answers[qId];
        if (!stats[qId]) {
          stats[qId] = { ratings: [], comments: [], textAnswers: [] };
        }

        if (ans.type === 'rating') {
          const val = Number(ans.value);
          if (val >= 1 && val <= 5) {
            stats[qId].ratings.push(val);
            if (ans.comment?.trim()) {
              stats[qId].comments.push({
                rating: val,
                text: ans.comment.trim(),
                date: dateStr
              });
            }
          }
        } else if (ans.type === 'text') {
          const val = ans.value?.trim();
          if (val) {
            stats[qId].textAnswers.push({
              text: val,
              date: dateStr
            });
          }
        }
      });
    });

    return stats;
  }, [filteredSubmissions]);

  // Computed metrics for Selected Rating Question
  const selectedRatingStats = useMemo(() => {
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    const stats = questionStats[selectedRatingQId] || { ratings: [], comments: [] };
    let total = 0;
    stats.ratings.forEach((val) => {
      if (val >= 1 && val <= 5) {
        counts[val as keyof typeof counts]++;
        total++;
      }
    });

    const distribution = [1, 2, 3, 4, 5].map((stars) => {
      const count = counts[stars as keyof typeof counts];
      const percentage = total ? (count / total) * 100 : 0;
      return { label: `${stars} Star${stars > 1 ? 's' : ''}`, count, percentage };
    });

    const sum = stats.ratings.reduce((a, b) => a + b, 0);
    const avg = total ? (sum / total).toFixed(1) : '0.0';

    return {
      distribution,
      avg,
      total
    };
  }, [questionStats, selectedRatingQId]);

  // Global average computed from all active rating questions combined
  const globalAvgRating = useMemo(() => {
    let sum = 0;
    let count = 0;
    ratingQuestionsList.forEach((q) => {
      const stats = questionStats[q.id] || { ratings: [] };
      stats.ratings.forEach((val) => {
        sum += val;
        count++;
      });
    });
    return count ? (sum / count).toFixed(1) : '0.0';
  }, [ratingQuestionsList, questionStats]);

  // Detailed rating question averages comparison
  const ratingPerformanceList = useMemo(() => {
    return ratingQuestionsList.map((q) => {
      const stats = questionStats[q.id] || { ratings: [], comments: [] };
      const totalAnswers = stats.ratings.length;
      const sum = stats.ratings.reduce((a, b) => a + b, 0);
      const avg = totalAnswers ? (sum / totalAnswers).toFixed(1) : '0.0';
      const fiveStars = totalAnswers 
        ? Math.round((stats.ratings.filter(r => r === 5).length / totalAnswers) * 100) 
        : 0;

      return {
        id: q.id,
        title: q.label,
        totalAnswers,
        avg,
        fiveStars,
        comments: stats.comments
      };
    });
  }, [ratingQuestionsList, questionStats]);

  // Consolidated Dynamic Paragraph observations feed
  const dynamicTextAnswers = useMemo(() => {
    const list: any[] = [];
    activeQuestionsForFilter.filter(q => q.type === 'text').forEach((q) => {
      const stats = questionStats[q.id] || { textAnswers: [] };
      if (stats.textAnswers.length > 0) {
        list.push({
          qId: q.id,
          label: q.label,
          answers: stats.textAnswers
        });
      }
    });
    return list;
  }, [activeQuestionsForFilter, questionStats]);

  // Excel Exporter (Flattened Row per Answer format)
  const handleExportExcel = async () => {
    setExporting(true);
    try {
      const excelRows: any[] = [];

      filteredSubmissions.forEach((f) => {
        const dateStr = f.submittedAt?.toDate ? f.submittedAt.toDate().toLocaleString() : '';
        const answers = f.answers || {};

        Object.keys(answers).forEach((qId) => {
          const ans = answers[qId];
          excelRows.push({
            'Timestamp': dateStr,
            'Evaluated Day': f.day,
            'Date': f.date || '',
            'Question ID': qId,
            'Question Label': ans.label,
            'Question Type': ans.type,
            'Value / Rating': ans.value,
            'Specific Comment': ans.comment || ''
          });
        });

        if (Object.keys(answers).length === 0) {
          excelRows.push({
            'Timestamp': dateStr,
            'Evaluated Day': f.day,
            'Date': f.date || '',
            'Question ID': 'N/A',
            'Question Label': 'None Rated',
            'Question Type': 'N/A',
            'Value / Rating': '',
            'Specific Comment': ''
          });
        }
      });

      const XLSX = await import('xlsx');
      const ws = XLSX.utils.json_to_sheet(excelRows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Dynamic Feedback');
      
      const fileDate = new Date().toISOString().split('T')[0];
      XLSX.writeFile(wb, `Aarambh26_Feedback_Dynamic_${fileDate}.xlsx`);

      const performer = user?.email || user?.uid || 'Feedback Operator';
      try {
        const { logAdminAction } = await import('../../lib/audit');
        await logAdminAction('FEEDBACK_EXPORT_EXCEL', 'feedbacks', `Exported ${filteredSubmissions.length} feedback submissions to Excel`, performer);
      } catch (err) {
        console.error("Failed to log export action:", err);
      }
    } finally {
      setExporting(false);
    }
  };

  // ============================================================================
  // FORM BUILDER DYNAMIC HANDLERS
  // ============================================================================
  const activeConfigDay = SCHEDULE_DATA[configActiveDayIdx].day;
  const configQuestionsList = useMemo(() => {
    return formsMap[activeConfigDay]?.questions || [];
  }, [formsMap, activeConfigDay]);

  const handleAddQuestion = (type: 'rating' | 'text') => {
    const newQuestion = {
      id: `q_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      type,
      label: type === 'rating' ? 'New Star Rating Question' : 'New Written Question',
      required: false
    };

    setFormsMap((prev) => {
      const dayData = prev[activeConfigDay] || { questions: [] };
      return {
        ...prev,
        [activeConfigDay]: {
          ...dayData,
          questions: [...dayData.questions, newQuestion]
        }
      };
    });
  };

  const handleUpdateQuestionLabel = (qId: string, label: string) => {
    setFormsMap((prev) => {
      const dayData = prev[activeConfigDay] || { questions: [] };
      const updated = dayData.questions.map((q) => {
        if (q.id === qId) return { ...q, label };
        return q;
      });
      return {
        ...prev,
        [activeConfigDay]: {
          ...dayData,
          questions: updated
        }
      };
    });
  };

  const handleRemoveQuestion = (qId: string) => {
    setFormsMap((prev) => {
      const dayData = prev[activeConfigDay] || { questions: [] };
      const filtered = dayData.questions.filter((q) => q.id !== qId);
      return {
        ...prev,
        [activeConfigDay]: {
          ...dayData,
          questions: filtered
        }
      };
    });
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    setSaveSuccess(false);

    try {
      const activeDayId = SCHEDULE_DATA[configActiveDayIdx].day;
      await setDoc(doc(db, 'settings', 'feedback'), {
        activeDayId: activeDayId,
        forms: formsMap,
        updatedAt: serverTimestamp(),
      });

      const performer = user?.email || user?.uid || 'Feedback Operator';
      try {
        const { logAdminAction } = await import('../../lib/audit');
        await logAdminAction('FEEDBACK_SAVE_SETTINGS', 'settings/feedback', `Saved feedback settings: set active day to ${activeDayId}`, performer);
      } catch (err) {
        console.error("Failed to log save settings action:", err);
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving settings:', err);
    } finally {
      setSavingSettings(false);
    }
  };

  const handleLogout = async () => {
    let performer = 'Feedback Operator';
    if (user) {
      performer = user.email || user.uid || 'Feedback Operator';
    } else if (isFirebaseConfigured() && auth && auth.currentUser) {
      performer = auth.currentUser.email || auth.currentUser.uid || 'Feedback Operator';
    }
    try {
      const { logAdminAction } = await import('../../lib/audit');
      await logAdminAction('LOGOUT', 'sessions', `Feedback team ${performer} signed out successfully`, performer);
    } catch (err) {
      console.error("Failed to log logout action:", err);
    }
    if (isFirebaseConfigured() && auth) {
      await auth.signOut();
    }
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-cloud flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-[radial-gradient(#030404_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />
        <div className="text-center space-y-4 z-10">
          <CustomLoaderIcon className="text-brand-ink mx-auto" size={48} />
          <p className="text-brand-ink/50 text-xs font-black uppercase tracking-widest">
            Opening Feedback Portal...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-brand-cloud text-brand-ink font-sans relative">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-[#030404]/40 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Component */}
      <aside 
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-white border-r-2 border-brand-ink flex flex-col transition-transform duration-300 z-50 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="h-16 flex items-center px-6 border-b-2 border-brand-ink bg-white">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="Aarambh Logo" className="h-10 w-auto object-contain" />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2 bg-white">
          <button
            onClick={() => { setActiveTab('analytics'); setSidebarOpen(false); }}
            className={`flex items-center gap-3 px-4 py-3 w-full border-2 transition-all duration-100 cursor-pointer ${
              activeTab === 'analytics' 
                ? 'bg-brand-cloud border-brand-ink text-brand-ink font-black shadow-[3px_3px_0px_0px_#030404] rounded-md translate-x-[-2px] translate-y-[-2px]' 
                : 'border-transparent text-brand-ink/50 hover:bg-brand-cloud/40 hover:text-brand-ink hover:border-brand-ink hover:rounded-md'
            }`}
          >
            <CustomAnalyticsIcon size={18} />
            <span className="text-xs tracking-wide uppercase font-black">Sentiment</span>
          </button>

          <button
            onClick={() => { setActiveTab('configurator'); setSidebarOpen(false); }}
            className={`flex items-center gap-3 px-4 py-3 w-full border-2 transition-all duration-100 cursor-pointer ${
              activeTab === 'configurator' 
                ? 'bg-brand-cloud border-brand-ink text-brand-ink font-black shadow-[3px_3px_0px_0px_#030404] rounded-md translate-x-[-2px] translate-y-[-2px]' 
                : 'border-transparent text-brand-ink/50 hover:bg-brand-cloud/40 hover:text-brand-ink hover:border-brand-ink hover:rounded-md'
            }`}
          >
            <CustomSettingsIcon size={18} />
            <span className="text-xs tracking-wide uppercase font-black">Form Builder</span>
          </button>
        </nav>

        <div className="p-4 border-t-2 border-brand-ink bg-white">
          <div className="text-[9px] font-black uppercase text-brand-ink/40 tracking-wider mb-2 text-center truncate">
            {user?.email}
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center gap-3 px-4 py-3 w-full rounded-md border-2 border-transparent text-brand-ink/50 hover:border-brand-ink hover:bg-brand-pink/15 hover:text-brand-pink hover:font-black hover:shadow-[3px_3px_0px_0px_#030404] transition-all duration-100 cursor-pointer"
          >
            <CustomLogoutIcon size={18} />
            <span className="text-xs tracking-wide uppercase font-black">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full md:w-[calc(100%-16rem)] pt-16 md:pt-0 overflow-y-auto relative">
        
        {/* Sticky Header */}
        <header className="fixed md:sticky top-0 left-0 right-0 z-30 bg-white px-4 md:px-8 h-16 flex items-center justify-between border-b-2 border-brand-ink">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="md:hidden text-brand-ink p-2 cursor-pointer focus:outline-none"
          >
            {sidebarOpen ? <CustomCloseIcon size={24} /> : <CustomMenuIcon size={24} />}
          </button>

          <div className="hidden md:flex" />

          <span className="text-xs font-black text-brand-ink/50 uppercase tracking-widest">
            Feedback Portal
          </span>
        </header>

        {/* Main Content Render */}
        <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8 mt-16 md:mt-0 animate-fade-in">
          
          {/* ============================================================================
              TAB: SENTIMENT ANALYSIS (ANALYTICS)
              ============================================================================ */}
          {activeTab === 'analytics' && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-display font-black uppercase text-brand-ink mb-2">
                  Feedback Analytics
                </h1>
                <p className="text-brand-ink/50 text-xs font-bold uppercase tracking-wider">
                  Real-time sentiment overview of daily dynamic evaluations
                </p>
              </div>

              {/* Filter and Export Bar */}
              <div className="bg-white border-4 border-brand-ink p-5 md:p-6 shadow-[6px_6px_0px_0px_#030404] rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <span className="text-xs font-black uppercase text-brand-ink/65 tracking-wider shrink-0">
                    Filter Day:
                  </span>
                  <select
                    value={selectedDayFilter}
                    onChange={(e) => setSelectedDayFilter(e.target.value)}
                    className="bg-white border-2 border-brand-ink text-brand-ink text-xs font-bold rounded-md py-2 px-4 focus:outline-none focus:border-brand-pink transition-colors w-full md:w-60"
                  >
                    <option value="all">All Days Combined</option>
                    {SCHEDULE_DATA.map((day) => (
                      <option key={day.day} value={day.day}>
                        {day.day} ({day.date})
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleExportExcel}
                  disabled={feedbacks.length === 0 || exporting}
                  className="bg-brand-pink hover:bg-primary-dark text-white font-black py-3 px-6 border-2 border-brand-ink shadow-[4px_4px_0px_0px_#030404] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#030404] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-100 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed rounded-md uppercase tracking-wider text-xs shrink-0"
                >
                  <CustomDownloadIcon size={14} />
                  <span>{exporting ? 'Exporting...' : 'Export Excel'}</span>
                </button>
              </div>

              {/* Quick Metrics & Chart Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Statistic Cards & Distribution Column */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white border-4 border-brand-ink p-6 shadow-[6px_6px_0px_0px_#030404] rounded-lg flex items-center gap-5">
                      <div className="p-3 border-2 border-brand-ink bg-brand-pink/15 rounded-md shadow-comic-sm shrink-0">
                        <CustomMessageIcon size={24} className="text-brand-pink" />
                      </div>
                      <div>
                        <span className="block text-[10px] font-black uppercase text-brand-ink/50 tracking-wider">
                          Forms Submitted
                        </span>
                        <strong className="text-3xl font-display font-black text-brand-ink">
                          {totalFormsSubmitted}
                        </strong>
                      </div>
                    </div>

                    <div className="bg-white border-4 border-brand-ink p-6 shadow-[6px_6px_0px_0px_#030404] rounded-lg flex items-center gap-5">
                      <div className="p-3 border-2 border-brand-ink bg-brand-orange/15 rounded-md shadow-comic-sm shrink-0">
                        <CustomStarIcon size={24} filled className="text-brand-orange" />
                      </div>
                      <div>
                        <span className="block text-[10px] font-black uppercase text-brand-ink/50 tracking-wider">
                          Global Average Rating
                        </span>
                        <strong className="text-3xl font-display font-black text-brand-ink">
                          {globalAvgRating} <span className="text-xs text-brand-ink/40 font-bold uppercase tracking-wider">/ 5.0</span>
                        </strong>
                      </div>
                    </div>
                  </div>

                  {/* Star Distribution Dynamic Graph */}
                  <div className="bg-white border-4 border-brand-ink p-6 md:p-8 shadow-[8px_8px_0px_0px_#030404] rounded-lg space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-brand-ink pb-3">
                      <h2 className="text-base font-display font-black uppercase text-brand-ink">
                        Star Rating Distribution
                      </h2>
                      
                      {ratingQuestionsList.length > 0 && (
                        <div className="flex items-center gap-2 w-full md:w-auto">
                          <span className="text-[10px] font-black uppercase tracking-wider text-brand-ink/50 shrink-0">Question:</span>
                          <select
                            value={selectedRatingQId}
                            onChange={(e) => setSelectedRatingQId(e.target.value)}
                            className="bg-brand-cloud border-2 border-brand-ink text-brand-ink text-[11px] font-bold rounded py-1.5 px-3 focus:outline-none w-full md:w-72 truncate"
                          >
                            {ratingQuestionsList.map((q) => (
                              <option key={q.id} value={q.id}>{q.label}</option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                    
                    {totalFormsSubmitted === 0 || !selectedRatingQId ? (
                      <p className="text-center py-12 text-xs font-black text-brand-ink/40 uppercase tracking-widest">
                        No reviews logged for this query
                      </p>
                    ) : (
                      <div className="space-y-6">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold uppercase text-brand-ink/50">Average Score for this question:</span>
                          <span className="text-lg font-black text-brand-pink">{selectedRatingStats.avg} / 5.0</span>
                          <span className="text-[10px] font-bold text-brand-ink/35">({selectedRatingStats.total} responses)</span>
                        </div>
                        <PureReactColumnChart data={selectedRatingStats.distribution} />
                      </div>
                    )}
                  </div>
                </div>

                {/* Sidebar: Dynamic General Written Summaries Observations Feed */}
                <div className="bg-white border-4 border-brand-ink p-6 shadow-[8px_8px_0px_0px_#030404] rounded-lg flex flex-col h-[520px]">
                  <h2 className="text-base font-display font-black uppercase text-brand-ink mb-4 border-b-2 border-brand-ink pb-2 shrink-0">
                    Paragraph Answers Feed
                  </h2>
                  
                  <div className="flex-1 overflow-y-auto pr-1 space-y-6">
                    {dynamicTextAnswers.map((group, idx) => (
                      <div key={idx} className="space-y-3">
                        <h4 className="text-[10px] font-black uppercase text-brand-pink tracking-wider border-b border-brand-pink/20 pb-1 leading-relaxed">
                          Q: {group.label}
                        </h4>
                        
                        <div className="space-y-2">
                          {group.answers.map((ans: any, aIdx: number) => (
                            <p key={aIdx} className="text-xs leading-relaxed font-semibold text-brand-ink/80 bg-brand-cloud/45 border border-brand-ink/5 p-2.5 rounded">
                              <span className="text-[8px] font-mono font-black text-brand-ink/35 uppercase tracking-widest block mb-0.5">{ans.date}</span>
                              &ldquo;{ans.text}&rdquo;
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}

                    {dynamicTextAnswers.length === 0 && (
                      <p className="text-center py-24 text-xs font-black text-brand-ink/40 uppercase tracking-widest">
                        No responses submitted yet
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Performance Details list */}
              <div className="bg-white border-4 border-brand-ink p-6 md:p-8 shadow-[8px_8px_0px_0px_#030404] rounded-lg space-y-6">
                <h2 className="text-base font-display font-black uppercase text-brand-ink border-b-2 border-brand-ink pb-2">
                  Session Performance & Attendee Comments
                </h2>
                
                <div className="space-y-6">
                  {ratingPerformanceList.map((evt, idx) => (
                    <div 
                      key={evt.id}
                      className="border-2 border-brand-ink p-5 shadow-[4px_4px_0px_0px_#030404] rounded-lg bg-white space-y-4"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-brand-ink/10 pb-4">
                        <div>
                          <h3 className="text-sm font-black uppercase tracking-tight text-brand-ink">
                            {evt.title}
                          </h3>
                        </div>

                        <div className="flex gap-6 items-center">
                          <div className="text-center shrink-0">
                            <span className="block text-[8px] font-black uppercase text-brand-ink/40 tracking-wider">
                              Answers
                            </span>
                            <strong className="text-lg font-black text-brand-ink tabular-nums">
                              {evt.totalAnswers}
                            </strong>
                          </div>

                          <div className="text-center shrink-0">
                            <span className="block text-[8px] font-black uppercase text-brand-ink/40 tracking-wider">
                              Avg rating
                            </span>
                            <strong className="text-lg font-black text-brand-pink tabular-nums">
                              {evt.avg}
                            </strong>
                          </div>

                          <div className="text-center shrink-0">
                            <span className="block text-[8px] font-black uppercase text-brand-ink/40 tracking-wider">
                              5-Star Ratio
                            </span>
                            <strong className="text-lg font-black text-green-600 tabular-nums">
                              {evt.fiveStars}%
                            </strong>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="block text-[9px] font-black uppercase text-brand-ink/40 tracking-wider">
                          Attendee Comments:
                        </span>
                        <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                          {evt.comments.map((comment: any, cIdx: number) => (
                            <div key={cIdx} className="bg-brand-cloud/40 border border-brand-ink/10 p-3 rounded-md text-xs leading-relaxed text-brand-ink/80 font-semibold relative">
                              <div className="flex justify-between items-center mb-1">
                                <div className="flex gap-0.5">
                                  {[1, 2, 3, 4, 5].map((s) => (
                                    <CustomStarIcon
                                      key={s}
                                      size={8}
                                      filled={s <= comment.rating}
                                      className={s <= comment.rating ? 'text-brand-ink' : 'text-brand-ink/10'}
                                    />
                                  ))}
                                </div>
                                <span className="text-[8px] font-black text-brand-ink/40 uppercase tracking-widest">
                                  {comment.date}
                                </span>
                              </div>
                              &ldquo;{comment.text}&rdquo;
                            </div>
                          ))}
                          {evt.comments.length === 0 && (
                            <p className="text-[10px] font-bold text-brand-ink/35 uppercase tracking-wide">
                              No comments submitted specifically for this question
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {ratingPerformanceList.length === 0 && (
                    <p className="text-center py-8 text-xs font-black text-brand-ink/40 uppercase tracking-widest">
                      No rating questions found for this selection
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ============================================================================
              TAB: FORM CONFIGURATOR (GOOGLE FORMS BUILDER)
              ============================================================================ */}
          {activeTab === 'configurator' && (
            <div className="bg-white border-4 border-brand-ink p-6 md:p-8 shadow-[8px_8px_0px_0px_#030404] rounded-lg">
              <div>
                <h1 className="text-3xl font-display font-black uppercase text-brand-ink mb-2">
                  Form Builder
                </h1>
                <p className="text-brand-ink/50 text-xs font-bold uppercase tracking-wider mb-8">
                  Configure dynamic questionnaires for all 8 days in real-time
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-8">
                
                {/* Active Day Selection */}
                <div className="bg-brand-cloud/40 border-2 border-brand-ink p-6 rounded-md shadow-comic-sm space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-wider text-brand-ink">
                    Dynamic Form Configurator & Selected Target Day
                  </h3>
                  <p className="text-brand-ink/65 text-xs leading-relaxed font-bold">
                    Select a day to view and build its customized questionnaire below. The active day dropdown sets which day defaults for students scanning QR codes on the live site.
                  </p>
                  <div className="max-w-md pt-2">
                    <select
                      value={configActiveDayIdx}
                      onChange={(e) => setConfigActiveDayIdx(Number(e.target.value))}
                      className="bg-white border-2 border-brand-ink text-brand-ink text-sm font-bold rounded-md py-3 px-4 focus:outline-none focus:border-brand-pink transition-colors w-full shadow-inner"
                    >
                      {SCHEDULE_DATA.map((day, idx) => (
                        <option key={day.day} value={idx}>
                          {day.day} ({day.date})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Google Forms Question Management List */}
                <div className="space-y-6">
                  <div className="border-b-2 border-brand-ink pb-2">
                    <h3 className="text-xs font-black uppercase text-brand-ink/75 tracking-wider">
                      Questions on this form ({activeConfigDay})
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {configQuestionsList.map((q, qIdx) => (
                      <div 
                        key={q.id}
                        className="bg-brand-cloud/30 border-2 border-brand-ink p-4 rounded-md shadow-comic-sm flex flex-col md:flex-row md:items-center gap-4 justify-between"
                      >
                        {/* Question Metadata */}
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-[10px] font-mono font-black text-brand-ink/40">
                            #{String(qIdx + 1).padStart(2, '0')}
                          </span>
                          <span className={`border-2 border-brand-ink px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider shadow-[1px_1px_0px_0px_#030404] ${
                            q.type === 'rating' ? 'bg-brand-orange/15 text-brand-orange' : 'bg-brand-pink/15 text-brand-pink'
                          }`}>
                            {q.type === 'rating' ? '★ Rating (1-5)' : '✏️ Open Text'}
                          </span>
                        </div>

                        {/* Label Edit Box */}
                        <div className="flex-1 w-full">
                          <input
                            type="text"
                            value={q.label}
                            onChange={(e) => handleUpdateQuestionLabel(q.id, e.target.value)}
                            className="w-full bg-white border-2 border-brand-ink rounded py-2 px-3 focus:outline-none focus:border-brand-pink text-xs text-brand-ink font-semibold"
                            placeholder="Type question text..."
                            required
                          />
                        </div>

                        {/* Actions */}
                        <button
                          type="button"
                          onClick={() => handleRemoveQuestion(q.id)}
                          className="border-2 border-brand-ink hover:bg-brand-pink/15 text-brand-pink text-[10px] font-black shadow-[2px_2px_0px_0px_#030404] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#030404] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100 px-3 py-1.5 rounded cursor-pointer uppercase tracking-wider shrink-0 w-full md:w-auto text-center"
                        >
                          Delete
                        </button>
                      </div>
                    ))}

                    {configQuestionsList.length === 0 && (
                      <p className="text-center py-12 text-xs font-black text-brand-ink/40 uppercase tracking-widest">
                        This form is empty. Add a question below to start building!
                      </p>
                    )}
                  </div>

                  {/* Add Question Selector Bar */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-brand-ink/10">
                    <button
                      type="button"
                      onClick={() => handleAddQuestion('rating')}
                      className="flex-1 border-2 border-brand-ink bg-brand-orange/15 hover:bg-brand-orange/30 text-brand-ink text-xs font-black py-3 px-4 shadow-[3px_3px_0px_0px_#030404] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#030404] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all duration-100 rounded-md cursor-pointer uppercase tracking-wider text-center"
                    >
                      + Add Star Rating Question (1-5 Stars)
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => handleAddQuestion('text')}
                      className="flex-1 border-2 border-brand-ink bg-brand-pink/15 hover:bg-brand-pink/30 text-brand-ink text-xs font-black py-3 px-4 shadow-[3px_3px_0px_0px_#030404] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#030404] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all duration-100 rounded-md cursor-pointer uppercase tracking-wider text-center"
                    >
                      + Add Written Observation Question (Paragraph Text)
                    </button>
                  </div>
                </div>

                {/* Save Config Footer */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t-2 border-brand-ink">
                  <div className="shrink-0 text-center md:text-left">
                    {saveSuccess && (
                      <span className="text-xs font-black uppercase text-green-600 tracking-wider flex items-center gap-1.5 justify-center md:justify-start">
                        <CustomCheckIcon size={14} className="text-green-600 shrink-0" />
                        <span>Form Builder settings saved live in database!</span>
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={savingSettings}
                    className="px-12 py-4 bg-brand-pink hover:bg-primary-dark text-white font-black border-4 border-brand-ink shadow-[6px_6px_0px_0px_#030404] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#030404] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all duration-100 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed rounded-md uppercase tracking-widest text-xs w-full md:w-auto"
                  >
                    {savingSettings ? (
                      <>
                        <CustomLoaderIcon size={16} className="text-white" />
                        <span>Saving Configuration...</span>
                      </>
                    ) : (
                      <>
                        <CustomCheckIcon size={16} className="text-white" />
                        <span>Save Configuration Settings</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

// ============================================================================
// COMPONENT: PURE REACT COLUMN CHART
// ============================================================================
function PureReactColumnChart({ data }: { data: { label: string; count: number; percentage: number }[] }) {
  const maxCount = Math.max(...data.map(d => d.count), 1);
  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-3 h-48 pt-6 border-b-2 border-brand-ink">
        {data.map((bar, i) => {
          const heightPercent = Math.max((bar.count / maxCount) * 100, 4);
          return (
            <div key={i} className="flex-1 flex flex-col items-center group h-full justify-end select-none">
              <div className="opacity-0 group-hover:opacity-100 bg-brand-ink text-white text-[9px] font-black px-2 py-1 rounded border border-white/20 mb-2 transition-all duration-100 pointer-events-none uppercase tracking-wide shrink-0">
                {bar.count} Ratings ({Math.round(bar.percentage)}%)
              </div>
              <div 
                style={{ height: `${heightPercent}%` }}
                className="w-full bg-brand-orange border-2 border-brand-ink shadow-[2px_-2px_0px_0px_#030404] transition-all duration-300 hover:bg-brand-pink cursor-pointer"
              />
              <span className="text-[10px] font-black text-brand-ink uppercase tracking-wider mt-3 text-center">
                {bar.label}
              </span>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between text-[9px] font-black text-brand-ink/50 uppercase tracking-widest pt-1">
        <span>Lowest Rating</span>
        <span>Highest Rating</span>
      </div>
    </div>
  );
}
