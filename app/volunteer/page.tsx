'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { 
  collection, 
  onSnapshot, 
  query, 
  where, 
  doc, 
  getDoc,
  updateDoc,
  writeBatch
} from 'firebase/firestore';
import { db, auth } from '../../lib/firebase';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Bell, 
  CheckCircle, 
  AlertCircle, 
  Info,
  Layers,
  Phone,
  Mail,
  Locate
} from 'lucide-react';

export default function VolunteerDashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [duties, setDuties] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 1. Fetch Volunteer Profile, Duties, and Notifications
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

    // Real-time subscription to Profile
    const unsubProfile = onSnapshot(doc(db, 'volunteers', activeUid), (docSnap) => {
      if (docSnap.exists()) {
        setProfile(docSnap.data());
      } else {
        setError("Volunteer profile not found.");
      }
    });

    // Real-time subscription to Duties
    const dutiesQuery = query(
      collection(db, 'dutyAssignments'), 
      where('volunteerId', '==', activeUid)
    );
    const unsubDuties = onSnapshot(dutiesQuery, (snap) => {
      const parsedDuties = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setDuties(parsedDuties);
      setLoading(false);
    });

    // Real-time subscription to Notifications (sorted in-memory to avoid custom index creation requirement)
    const notifQuery = query(
      collection(db, 'notifications'),
      where('volunteerId', '==', activeUid)
    );
    const unsubNotif = onSnapshot(notifQuery, (snap) => {
      const parsedNotifs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      // Sort descending by timestamp
      parsedNotifs.sort((a: any, b: any) => {
        const timeA = a.timestamp?.seconds || 0;
        const timeB = b.timestamp?.seconds || 0;
        return timeB - timeA;
      });
      setNotifications(parsedNotifs);
    });

    return () => {
      unsubProfile();
      unsubDuties();
      unsubNotif();
    };
  }, []);

  // 2. Identify Today's Duty Highlight
  const todayDateStr = useMemo(() => {
    return new Date().toISOString().split('T')[0];
  }, []);

  const todayDuties = useMemo(() => {
    return duties.filter(d => d.dutyDate === todayDateStr);
  }, [duties, todayDateStr]);

  // Sort all duties by date and time for the timeline
  const sortedDuties = useMemo(() => {
    return [...duties].sort((a, b) => {
      const dateDiff = a.dutyDate.localeCompare(b.dutyDate);
      if (dateDiff !== 0) return dateDiff;
      return a.timeFrom.localeCompare(b.timeFrom);
    });
  }, [duties]);

  // Handle marking single notification as read
  const handleMarkNotificationRead = async (notifId: string) => {
    try {
      await updateDoc(doc(db, 'notifications', notifId), {
        read: true
      });
      const performer = profile?.email || profile?.name || profile?.uid || 'Volunteer';
      try {
        const { logAdminAction } = await import('../../lib/audit');
        await logAdminAction('VOLUNTEER_READ_NOTIFICATION', `notifications/${notifId}`, `Marked notification as read`, performer);
      } catch (err) {
        console.error("Failed to log notification read:", err);
      }
    } catch (err) {
      console.error("Failed to update notification:", err);
    }
  };

  // Handle clearing all notifications
  const handleClearAllNotifications = async () => {
    try {
      const batch = writeBatch(db);
      notifications.forEach((notif) => {
        batch.delete(doc(db, 'notifications', notif.id));
      });
      await batch.commit();
      const performer = profile?.email || profile?.name || profile?.uid || 'Volunteer';
      try {
        const { logAdminAction } = await import('../../lib/audit');
        await logAdminAction('VOLUNTEER_CLEAR_NOTIFICATIONS', 'notifications', `Cleared all ${notifications.length} notifications`, performer);
      } catch (err) {
        console.error("Failed to log notifications clear:", err);
      }
    } catch (err) {
      console.error("Failed to clear notifications:", err);
    }
  };

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
          <div className="lg:col-span-2 space-y-6">
            <div className="h-44 bg-white border-4 border-brand-ink rounded-md animate-pulse shadow-[6px_6px_0px_0px_#030404]" />
            <div className="h-72 bg-white border-4 border-brand-ink rounded-md animate-pulse shadow-[6px_6px_0px_0px_#030404]" />
          </div>
          <div className="space-y-6">
            <div className="h-56 bg-white border-4 border-brand-ink rounded-md animate-pulse shadow-[6px_6px_0px_0px_#030404]" />
            <div className="h-64 bg-white border-4 border-brand-ink rounded-md animate-pulse shadow-[6px_6px_0px_0px_#030404]" />
          </div>
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
            <h2 className="font-adminHeading text-xl font-black uppercase text-brand-ink">Authentication Error</h2>
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
          Volunteer Dashboard
        </h1>
        <p className="text-admin-muted font-bold text-xs uppercase tracking-wider">
          Welcome back, {profile?.name || 'Volunteer'} — Operational Overview
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* LEFT COLUMN: Today's Highlight, Assigned Duties Timeline */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* ================================================================== */}
          {/* TODAY'S DUTY HIGHLIGHT */}
          {/* ================================================================== */}
          <div>
            <h2 className="text-xs font-black uppercase tracking-widest text-brand-pink mb-3.5 border-b-2 border-brand-ink/10 pb-1">
              Today's Duty Highlight
            </h2>
            
            {todayDuties.length > 0 ? (
              <div className="space-y-4">
                {todayDuties.map((duty) => (
                  <div 
                    key={duty.id} 
                    className="bg-brand-orange border-4 border-brand-ink p-6 rounded-md shadow-[6px_6px_0px_0px_#030404] text-brand-ink relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-3 bg-brand-ink text-brand-orange text-[10px] font-black uppercase tracking-wider rounded-bl-md">
                      Live Today
                    </div>
                    
                    {duty.eventTitle && (
                      <div className="mb-2 bg-brand-ink text-white inline-block px-2.5 py-0.5 rounded-sm text-[9px] font-black uppercase tracking-wider">
                        Event: {duty.eventTitle}
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin size={18} className="text-brand-ink" />
                      <span className="text-xl font-black uppercase tracking-wide">{duty.venue}</span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs font-black uppercase tracking-wide mb-4 text-brand-ink/80">
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} />
                        <span>{formatTime12hr(duty.timeFrom)} - {formatTime12hr(duty.timeTo)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        <span>Today ({formatDateFriendly(duty.dutyDate)})</span>
                      </div>
                    </div>
                    
                    {duty.notes && (
                      <div className="bg-white/40 border-2 border-brand-ink p-3.5 rounded-md text-xs font-bold text-brand-ink leading-relaxed">
                        <div className="flex gap-2 items-start">
                          <Info size={16} className="shrink-0 mt-0.5" />
                          <div>
                            <span className="uppercase text-[9px] font-black text-brand-ink/60 block mb-0.5">Instructions</span>
                            {duty.notes}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-4 flex justify-end items-center text-[10px] font-black uppercase text-brand-ink/65 tracking-wider">
                      <span className="bg-white border-2 border-brand-ink px-2.5 py-1 rounded-md text-brand-ink shadow-[2px_2px_0px_0px_#030404]">
                        Status: {duty.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border-4 border-brand-ink border-dashed p-10 rounded-md text-center text-admin-muted shadow-[4px_4px_0px_0px_#030404]">
                <Clock className="mx-auto mb-3 text-admin-muted/40" size={36} />
                <h3 className="text-sm font-black uppercase tracking-wider text-brand-ink/70">No Duty Assigned for Today</h3>
                <p className="text-xs font-bold uppercase tracking-wider text-admin-muted/75 mt-1">Take some rest or check your upcoming schedule</p>
              </div>
            )}
          </div>

          {/* ================================================================== */}
          {/* ASSIGNED DUTIES TIMELINE */}
          {/* ================================================================== */}
          <div>
            <h2 className="text-xs font-black uppercase tracking-widest text-brand-pink mb-4 border-b-2 border-brand-ink/10 pb-1">
              Assigned Duties Timeline
            </h2>

            {sortedDuties.length > 0 ? (
              <div className="relative border-l-4 border-brand-ink ml-4 pl-8 space-y-8">
                {sortedDuties.map((duty) => {
                  const isCompleted = duty.status === 'completed';
                  const isActive = duty.status === 'active';
                  const isUpcoming = duty.status === 'upcoming';
                  
                  return (
                    <div key={duty.id} className="relative">
                      {/* Timeline node marker */}
                      <span className={`absolute -left-[42px] top-1.5 w-6 h-6 border-4 border-brand-ink rounded-full flex items-center justify-center shadow-[1px_1px_0px_0px_#030404] ${
                        isCompleted ? 'bg-brand-pink' : isActive ? 'bg-brand-blue' : 'bg-brand-orange'
                      }`}>
                        <div className="w-1.5 h-1.5 bg-brand-ink rounded-full" />
                      </span>
                      
                      {/* Duty Card */}
                      <div className="bg-white border-4 border-brand-ink p-5 rounded-md shadow-[4px_4px_0px_0px_#030404] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#030404]">
                        <div className="flex justify-between items-start gap-4 flex-wrap mb-3">
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-brand-pink">
                              {formatDateFriendly(duty.dutyDate)}
                            </span>
                            {duty.eventTitle && (
                              <div className="text-[9px] font-black uppercase tracking-widest text-brand-blue mt-0.5">
                                Event: {duty.eventTitle}
                              </div>
                            )}
                            <h3 className="text-base font-black uppercase tracking-wide text-brand-ink flex items-center gap-1.5 mt-1">
                              <MapPin size={14} className="text-brand-orange" />
                              {duty.venue}
                            </h3>
                          </div>
                          <span className={`inline-block px-2.5 py-1 border-2 border-brand-ink rounded-md text-[9px] font-black uppercase tracking-wider shadow-[1px_1px_0px_0px_#030404] ${
                            isCompleted
                              ? 'bg-brand-pink/15 text-brand-pink'
                              : isActive
                              ? 'bg-brand-blue/15 text-brand-blue'
                              : 'bg-brand-orange/15 text-brand-orange'
                          }`}>
                            {duty.status}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-black uppercase text-admin-muted tracking-wider mb-3">
                          <Clock size={12} className="text-brand-blue" />
                          <span>{formatTime12hr(duty.timeFrom)} - {formatTime12hr(duty.timeTo)}</span>
                        </div>

                        {duty.notes && (
                          <p className="bg-brand-cloud/45 border-2 border-brand-ink border-dashed p-3 rounded-md text-xs font-bold text-brand-ink/90 leading-relaxed">
                            {duty.notes}
                          </p>
                        )}
                        
                        <div className="mt-3.5 pt-3 border-t border-brand-ink/10 flex justify-between items-center text-[9px] font-black uppercase text-admin-muted tracking-wider">
                          <span>Team: {duty.team}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white border-4 border-brand-ink p-8 rounded-md text-center text-admin-muted shadow-[4px_4px_0px_0px_#030404]">
                <Clock className="mx-auto mb-2 text-admin-muted/30" size={32} />
                <h3 className="text-xs font-black uppercase tracking-wider text-brand-ink/65">No Duties Found</h3>
                <p className="text-[10px] font-bold uppercase tracking-wider text-admin-muted/75 mt-0.5">You have no duties assigned to your schedule.</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Profile Card, Notifications */}
        <div className="space-y-8">
          
          {/* ================================================================== */}
          {/* PROFILE CARD */}
          {/* ================================================================== */}
          <div className="bg-white border-4 border-brand-ink p-6 rounded-md shadow-[6px_6px_0px_0px_#030404]">
            <h2 className="text-xs font-black uppercase tracking-widest text-brand-pink mb-4 border-b-2 border-brand-ink/10 pb-1.5">
              Profile Card
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-brand-cloud/40 p-4 border-2 border-brand-ink rounded-md shadow-inner">
                <div className="w-12 h-12 bg-white border-2 border-brand-ink flex items-center justify-center text-brand-pink shadow-[2px_2px_0px_0px_#030404] rounded-md font-black text-xl uppercase">
                  {profile?.name ? profile.name[0] : 'V'}
                </div>
                <div>
                  <h3 className="font-black uppercase text-base text-brand-ink">{profile?.name || 'N/A'}</h3>
                  <span className="text-[10px] font-black uppercase tracking-wider text-brand-pink">{profile?.uid || 'AAR-VOL-XXX'}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs font-bold text-brand-ink/90 uppercase tracking-wide">
                <div className="flex justify-between py-1.5 border-b border-brand-ink/5">
                  <span className="text-admin-muted font-black text-[10px]">Team</span>
                  <span>{profile?.team || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-brand-ink/5">
                  <span className="text-admin-muted font-black text-[10px]">Role</span>
                  <span className="text-brand-blue font-black">{profile?.role || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-brand-ink/5">
                  <span className="text-admin-muted font-black text-[10px]">Roll No</span>
                  <span>{profile?.rollNo || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-brand-ink/5">
                  <span className="text-admin-muted font-black text-[10px]">Mobile</span>
                  <span>{profile?.mobile || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-brand-ink/5">
                  <span className="text-admin-muted font-black text-[10px]">Scholar Type</span>
                  <span>{profile?.hosteler || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-admin-muted font-black text-[10px]">Region</span>
                  <span>{profile?.location || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ================================================================== */}
          {/* REALTIME NOTIFICATIONS */}
          {/* ================================================================== */}
          <div className="bg-white border-4 border-brand-ink p-6 rounded-md shadow-[6px_6px_0px_0px_#030404]">
            <div className="flex justify-between items-center mb-4 border-b-2 border-brand-ink/10 pb-1.5">
              <h2 className="text-xs font-black uppercase tracking-widest text-brand-pink flex items-center gap-1.5">
                <Bell size={14} className="text-brand-pink" />
                Notifications
              </h2>
              {notifications.length > 0 && (
                <button 
                  onClick={handleClearAllNotifications}
                  className="text-[9px] font-black uppercase text-brand-pink hover:underline cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {notifications.map((notif) => {
                const dateStr = notif.timestamp ? new Date(notif.timestamp.seconds * 1000).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : 'Now';
                
                return (
                  <div 
                    key={notif.id} 
                    onClick={() => !notif.read && handleMarkNotificationRead(notif.id)}
                    className={`p-3 border-2 border-brand-ink rounded-md transition-colors relative cursor-pointer ${
                      notif.read 
                        ? 'bg-white text-admin-muted border-brand-ink/30' 
                        : 'bg-brand-cloud text-brand-ink shadow-[2px_2px_0px_0px_#030404]'
                    }`}
                  >
                    {!notif.read && (
                      <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-brand-pink rounded-full" />
                    )}
                    <h4 className="text-xs font-black uppercase tracking-wide pr-3">{notif.title}</h4>
                    <p className="text-[10px] font-bold mt-1 leading-relaxed text-brand-ink/80">{notif.message}</p>
                    <span className="text-[8px] font-black uppercase text-admin-muted/65 block mt-2 text-right">{dateStr}</span>
                  </div>
                );
              })}

              {notifications.length === 0 && (
                <div className="py-6 text-center text-admin-muted">
                  <Bell size={24} className="mx-auto mb-2 text-admin-muted/20" />
                  <span className="text-[10px] font-black uppercase tracking-wider block text-brand-ink/50">No notifications</span>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
