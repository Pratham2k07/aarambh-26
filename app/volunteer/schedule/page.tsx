'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { 
  collection, 
  onSnapshot, 
  query, 
  where 
} from 'firebase/firestore';
import { db, auth } from '../../../lib/firebase';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  ChevronLeft, 
  ChevronRight,
  Info,
  AlertCircle
} from 'lucide-react';

export default function VolunteerSchedule() {
  const [duties, setDuties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Calendar states
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateStr, setSelectedDateStr] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  // 1. Fetch Duties Realtime
  useEffect(() => {
    let activeUid = '';
    const user = auth?.currentUser;
    if (user) {
      activeUid = user.uid;
    } else {
      const stored = localStorage.getItem('aarambh_session');
      if (stored) {
        try {
          const session = JSON.parse(stored);
          activeUid = session.uid;
        } catch (e) {
          console.error(e);
        }
      }
    }

    if (!activeUid) {
      setError("User not authenticated.");
      setLoading(false);
      return;
    }

    const dutiesQuery = query(
      collection(db, 'dutyAssignments'), 
      where('volunteerId', '==', activeUid)
    );

    const unsubscribe = onSnapshot(dutiesQuery, (snap) => {
      setDuties(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    }, (err) => {
      console.error(err);
      setError("Failed to fetch schedule data.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 2. Map duties to a date lookup dictionary
  const dutiesByDate = useMemo(() => {
    const map: Record<string, any[]> = {};
    duties.forEach(duty => {
      const date = duty.dutyDate;
      if (!map[date]) map[date] = [];
      map[date].push(duty);
    });
    return map;
  }, [duties]);

  // Calendar math
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay(); // day of week index (0 = Sun)

  const calendarCells = useMemo(() => {
    const cells = [];
    
    // Add empty padding cells for days before the 1st of the month
    for (let i = 0; i < firstDayIndex; i++) {
      cells.push({ day: null, dateStr: null });
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(year, month, day);
      // Offset timezone to avoid UTC shift
      const offsetDate = new Date(dateObj.getTime() - dateObj.getTimezoneOffset() * 60000);
      const dateStr = offsetDate.toISOString().split('T')[0];
      
      cells.push({ day, dateStr });
    }

    return cells;
  }, [year, month, daysInMonth, firstDayIndex]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Selected date duties
  const selectedDuties = useMemo(() => {
    return dutiesByDate[selectedDateStr] || [];
  }, [dutiesByDate, selectedDateStr]);

  // Formatting helpers
  const formatTime12hr = (timeStr: string) => {
    if (!timeStr) return '';
    const [hStr, mStr] = timeStr.split(':');
    const h = Number(hStr);
    const suffix = h >= 12 ? 'PM' : 'AM';
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    return `${String(hour12).padStart(2, '0')}:${mStr} ${suffix}`;
  };

  const formatDateFriendly = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-12 w-1/3 bg-white border-2 border-brand-ink rounded-md animate-pulse shadow-[2px_2px_0px_0px_#030404]" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-[450px] bg-white border-4 border-brand-ink rounded-md animate-pulse shadow-[6px_6px_0px_0px_#030404]" />
          <div className="h-96 bg-white border-4 border-brand-ink rounded-md animate-pulse shadow-[6px_6px_0px_0px_#030404]" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-brand-pink/15 border-4 border-brand-ink p-8 rounded-md shadow-[6px_6px_0px_0px_#030404] max-w-xl mx-auto mt-10">
        <div className="flex gap-4 items-center">
          <AlertCircle className="text-brand-pink shrink-0" size={32} />
          <div>
            <h2 className="font-adminHeading text-xl font-black uppercase text-brand-ink">Schedule Error</h2>
            <p className="text-xs uppercase font-bold text-admin-muted mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 select-none font-adminBody">
      {/* Title Header */}
      <div>
        <h1 className="font-adminHeading text-3xl font-black uppercase tracking-tight text-brand-ink mb-1.5">
          My Schedule
        </h1>
        <p className="text-admin-muted font-bold text-xs uppercase tracking-wider">
          View your monthly operational duty calendar
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* CALENDAR VIEW */}
        <div className="lg:col-span-2 bg-white border-4 border-brand-ink p-6 rounded-md shadow-[6px_6px_0px_0px_#030404]">
          {/* Header Controls */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-black uppercase tracking-wide text-brand-ink">
              {monthNames[month]} {year}
            </h2>
            <div className="flex gap-2">
              <button 
                onClick={handlePrevMonth}
                className="p-2 border-2 border-brand-ink hover:bg-brand-cloud rounded-md shadow-[2px_2px_0px_0px_#030404] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={handleNextMonth}
                className="p-2 border-2 border-brand-ink hover:bg-brand-cloud rounded-md shadow-[2px_2px_0px_0px_#030404] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Weekday Names Header */}
          <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-black uppercase tracking-widest text-admin-muted mb-2">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          {/* Monthly Days Grid */}
          <div className="grid grid-cols-7 gap-2">
            {calendarCells.map((cell, index) => {
              if (cell.day === null || !cell.dateStr) {
                return <div key={`empty-${index}`} className="aspect-square bg-brand-cloud/10 border-2 border-transparent" />;
              }

              const hasDuty = !!dutiesByDate[cell.dateStr];
              const isSelected = cell.dateStr === selectedDateStr;
              const isToday = cell.dateStr === new Date().toISOString().split('T')[0];

              return (
                <button
                  key={`day-${cell.day}`}
                  onClick={() => setSelectedDateStr(cell.dateStr!)}
                  className={`aspect-square border-2 font-black rounded-md flex flex-col items-center justify-between p-2 cursor-pointer transition-all ${
                    isSelected 
                      ? 'bg-brand-ink border-brand-ink text-white shadow-inner scale-95' 
                      : isToday
                      ? 'bg-brand-cloud border-brand-pink text-brand-pink shadow-[2px_2px_0px_0px_#FF188C]'
                      : 'bg-white border-brand-ink text-brand-ink hover:bg-brand-cloud shadow-[2px_2px_0px_0px_#030404]'
                  }`}
                >
                  <span className="text-xs">{cell.day}</span>
                  
                  {/* Indicator Dot for assigned duties */}
                  {hasDuty && (
                    <span className={`w-2 h-2 rounded-full border border-brand-ink ${
                      isSelected ? 'bg-brand-pink' : 'bg-brand-orange animate-pulse'
                    }`} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* SELECTED DATE DETAILS SIDE PANEL */}
        <div className="bg-white border-4 border-brand-ink p-6 rounded-md shadow-[6px_6px_0px_0px_#030404]">
          <h2 className="text-xs font-black uppercase tracking-widest text-brand-pink mb-4 border-b-2 border-brand-ink/10 pb-1.5 flex items-center gap-1.5">
            <CalendarIcon size={14} />
            {formatDateFriendly(selectedDateStr)}
          </h2>

          <div className="space-y-4">
            {selectedDuties.length > 0 ? (
              selectedDuties.map((duty) => (
                <div 
                  key={duty.id} 
                  className="bg-brand-cloud/45 border-2 border-brand-ink p-4 rounded-md shadow-[2px_2px_0px_0px_#030404]"
                >
                  <div className="flex justify-between items-center gap-2 mb-2">
                    <span className="text-[10px] font-black uppercase text-brand-pink">
                      {duty.team}
                    </span>
                    <span className="bg-white border-2 border-brand-ink px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider shadow-[1px_1px_0px_0px_#030404]">
                      {duty.status}
                    </span>
                  </div>

                  {duty.eventTitle && (
                    <div className="text-[9px] font-black uppercase tracking-widest text-brand-blue mb-1.5">
                      Event: {duty.eventTitle}
                    </div>
                  )}

                  <h3 className="font-black uppercase text-sm text-brand-ink flex items-center gap-1">
                    <MapPin size={12} className="text-brand-orange shrink-0" />
                    {duty.venue}
                  </h3>

                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-admin-muted uppercase tracking-wider mt-2.5">
                    <Clock size={11} className="text-brand-blue shrink-0" />
                    <span>{formatTime12hr(duty.timeFrom)} - {formatTime12hr(duty.timeTo)}</span>
                  </div>

                  {duty.notes && (
                    <div className="mt-3 bg-white border border-brand-ink/20 p-2.5 rounded text-[11px] font-semibold text-brand-ink/80 leading-relaxed flex gap-1.5 items-start">
                      <Info size={14} className="text-brand-blue shrink-0 mt-0.5" />
                      <span>{duty.notes}</span>
                    </div>
                  )}


                </div>
              ))
            ) : (
              <div className="py-10 text-center text-admin-muted">
                <CalendarIcon size={28} className="mx-auto mb-2 text-admin-muted/30" />
                <span className="text-[10px] font-black uppercase tracking-wider block text-brand-ink/50">
                  No Duties Assigned
                </span>
                <p className="text-[9px] font-bold uppercase tracking-wider text-admin-muted/75 mt-0.5">
                  You are free on this date!
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
