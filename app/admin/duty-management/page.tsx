'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { 
  collection, 
  onSnapshot, 
  query, 
  doc, 
  addDoc, 
  deleteDoc, 
  updateDoc, 
  writeBatch, 
  serverTimestamp, 
  getDocs 
} from 'firebase/firestore';
import { db, auth } from '../../../lib/firebase';
import { SkeletonTable } from '../../../components/admin/SkeletonLoader';
import { Modal } from '../../../components/admin/Modal';
import { logAdminAction } from '../../../lib/audit';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Users, 
  Trash2, 
  Edit, 
  CheckCircle, 
  AlertCircle, 
  X, 
  Search, 
  Filter, 
  Plus, 
  RotateCcw 
} from 'lucide-react';

// ============================================================================
// CONSTANTS & CONFIGURATION
// ============================================================================

const VENUES = [
  'Main Gate',
  'Auditorium',
  'Seminar Hall',
  'Registration Desk',
  'Campus Ground'
];

// ============================================================================
// COMPONENT
// ============================================================================

export default function DutyManagement() {
  // DB Collections States
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [dutyAssignments, setDutyAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Dynamically compute unique teams from fetched volunteers
  const dynamicTeams = useMemo(() => {
    const teamsSet = new Set<string>();
    volunteers.forEach((v) => {
      if (v.team) teamsSet.add(v.team);
    });
    return Array.from(teamsSet).sort();
  }, [volunteers]);

  // Form State
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedVolunteers, setSelectedVolunteers] = useState<any[]>([]);
  const [timeFrom, setTimeFrom] = useState('09:00');
  const [timeTo, setTimeTo] = useState('13:00');
  const [selectedVenue, setSelectedVenue] = useState('');
  const [notes, setNotes] = useState('');
  
  // Volunteer Multi-select Search State
  const [searchVolQuery, setSearchVolQuery] = useState('');
  const [showVolDropdown, setShowVolDropdown] = useState(false);

  // Table Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [teamFilter, setTeamFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal States
  const [editingDuty, setEditingDuty] = useState<any>(null);
  const [deletingDuty, setDeletingDuty] = useState<any>(null);

  // Edit Form Fields State
  const [editDate, setEditDate] = useState('');
  const [editTimeFrom, setEditTimeFrom] = useState('');
  const [editTimeTo, setEditTimeTo] = useState('');
  const [editVenue, setEditVenue] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [editNotes, setEditNotes] = useState('');

  // Validation Warnings
  const [formWarning, setFormWarning] = useState<string | null>(null);
  const [editWarning, setEditWarning] = useState<string | null>(null);

  // --------------------------------------------------------------------------
  // DB DATA SYNCRONIZATION & SEEDING
  // --------------------------------------------------------------------------
  useEffect(() => {
    // Seed initial mock volunteers if volunteers collection is empty
    const seedInitialVolunteers = async () => {
      try {
        const snap = await getDocs(collection(db, 'volunteers'));
        if (snap.empty) {
          const mockVolunteers = [
            { name: 'Aman Sharma', team: 'Registration Team', email: 'aman@aarambh.com' },
            { name: 'Tanya Saxena', team: 'Registration Team', email: 'tanya@aarambh.com' },
            { name: 'Devam', team: 'Technical Team', email: 'devam@aarambh.com' },
            { name: 'Manant Srivastava', team: 'Technical Team', email: 'manant@aarambh.com' },
            { name: 'Rohan Gupta', team: 'Technical Team', email: 'rohan@aarambh.com' },
            { name: 'Vikram Singh', team: 'Discipline Team', email: 'vikram@aarambh.com' },
            { name: 'Aditi Rao', team: 'Discipline Team', email: 'aditi@aarambh.com' },
            { name: 'Neha Sharma', team: 'Hospitality Team', email: 'neha@aarambh.com' },
            { name: 'Rahul Kapoor', team: 'Hospitality Team', email: 'rahul@aarambh.com' },
            { name: 'Sanya Mehta', team: 'Decoration Team', email: 'sanya@aarambh.com' },
            { name: 'Karan Johar', team: 'Decoration Team', email: 'karan@aarambh.com' },
            { name: 'Priya Malhotra', team: 'Anchoring Team', email: 'priya@aarambh.com' },
            { name: 'Kabir Sen', team: 'Anchoring Team', email: 'kabir@aarambh.com' },
            { name: 'Arjun Reddy', team: 'Photography Team', email: 'arjun@aarambh.com' },
            { name: 'Meera Nair', team: 'Photography Team', email: 'meera@aarambh.com' },
            { name: 'Riya Sen', team: 'Social Media Team', email: 'riya@aarambh.com' },
            { name: 'Yash Vardhan', team: 'Social Media Team', email: 'yash@aarambh.com' },
          ];
          
          const batch = writeBatch(db);
          mockVolunteers.forEach((vol) => {
            const docRef = doc(collection(db, 'volunteers'));
            batch.set(docRef, vol);
          });
          await batch.commit();
          await logAdminAction('SEED_VOLUNTEERS', 'volunteers', 'Seeded initial mock volunteers to database');
        }
      } catch (err) {
        console.error("Failed to seed initial volunteers:", err);
      }
    };

    seedInitialVolunteers();

    // Set up listeners for real-time data sync
    const unsubVolunteers = onSnapshot(collection(db, 'volunteers'), (snap) => {
      setVolunteers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    const unsubDuties = onSnapshot(collection(db, 'dutyAssignments'), (snap) => {
      setDutyAssignments(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });

    return () => {
      unsubVolunteers();
      unsubDuties();
    };
  }, []);

  // --------------------------------------------------------------------------
  // TIME VALIDATION & DUPLICATION CHECKS
  // --------------------------------------------------------------------------
  const parseTimeToMinutes = (timeStr: string) => {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
  };

  const checkOverlappingDuty = (volId: string, date: string, start: string, end: string, excludeId?: string) => {
    const startMin = parseTimeToMinutes(start);
    const endMin = parseTimeToMinutes(end);

    if (startMin >= endMin) {
      return "End time must be after start time.";
    }

    const overlap = dutyAssignments.find((duty) => {
      if (duty.volunteerId !== volId || duty.dutyDate !== date) return false;
      if (excludeId && duty.id === excludeId) return false;

      const dutyStart = parseTimeToMinutes(duty.timeFrom);
      const dutyEnd = parseTimeToMinutes(duty.timeTo);

      // Overlap formula: startA < endB && endA > startB
      return startMin < dutyEnd && endMin > dutyStart;
    });

    if (overlap) {
      return `Overlap detected: ${overlap.volunteerName} is already assigned to "${overlap.venue}" from ${overlap.timeFrom} to ${overlap.timeTo} on this date.`;
    }

    return null;
  };

  // --------------------------------------------------------------------------
  // ACTIONS / HANDLERS
  // --------------------------------------------------------------------------
  const handleAssignDuty = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormWarning(null);

    if (!selectedDate) return setFormWarning("Please select a date.");
    if (!selectedTeam) return setFormWarning("Please select a team.");
    if (selectedVolunteers.length === 0) return setFormWarning("Please select at least one volunteer.");
    if (!selectedVenue) return setFormWarning("Please select a venue.");

    // Perform overlap checks
    for (const vol of selectedVolunteers) {
      const overlapError = checkOverlappingDuty(vol.id, selectedDate, timeFrom, timeTo);
      if (overlapError) {
        setFormWarning(overlapError);
        return;
      }
    }

    try {
      const batch = writeBatch(db);
      const adminEmail = auth?.currentUser?.email || auth?.currentUser?.uid || 'Admin';

      selectedVolunteers.forEach((vol) => {
        const docRef = doc(collection(db, 'dutyAssignments'));
        batch.set(docRef, {
          volunteerId: vol.id,
          volunteerName: vol.name,
          team: vol.team,
          dutyDate: selectedDate,
          timeFrom,
          timeTo,
          venue: selectedVenue,
          notes: notes.trim(),
          assignedBy: adminEmail,
          status: 'upcoming',
          createdAt: serverTimestamp()
        });
      });

      await batch.commit();

      // Log action
      const volNames = selectedVolunteers.map(v => v.name).join(', ');
      await logAdminAction(
        'CREATE_DUTY_ASSIGNMENTS', 
        'dutyAssignments', 
        `Assigned duties to: [${volNames}] at ${selectedVenue} on ${selectedDate}`
      );

      // Reset form fields
      setSelectedVolunteers([]);
      setNotes('');
      setSearchVolQuery('');
    } catch (err: any) {
      console.error(err);
      setFormWarning(`Failed to assign duties: ${err.message}`);
    }
  };

  const handleResetForm = () => {
    setSelectedDate(new Date().toISOString().split('T')[0]);
    setSelectedTeam('');
    setSelectedVolunteers([]);
    setTimeFrom('09:00');
    setTimeTo('13:00');
    setSelectedVenue('');
    setNotes('');
    setSearchVolQuery('');
    setFormWarning(null);
  };

  const handleMarkCompleted = async (duty: any) => {
    try {
      await updateDoc(doc(db, 'dutyAssignments', duty.id), {
        status: 'completed'
      });
      await logAdminAction(
        'COMPLETE_DUTY_ASSIGNMENT', 
        `dutyAssignments/${duty.id}`, 
        `Marked duty as completed for ${duty.volunteerName}`
      );
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleOpenEditModal = (duty: any) => {
    setEditingDuty(duty);
    setEditDate(duty.dutyDate);
    setEditTimeFrom(duty.timeFrom);
    setEditTimeTo(duty.timeTo);
    setEditVenue(duty.venue);
    setEditStatus(duty.status);
    setEditNotes(duty.notes || '');
    setEditWarning(null);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditWarning(null);

    const overlapError = checkOverlappingDuty(
      editingDuty.volunteerId,
      editDate,
      editTimeFrom,
      editTimeTo,
      editingDuty.id
    );

    if (overlapError) {
      setEditWarning(overlapError);
      return;
    }

    try {
      await updateDoc(doc(db, 'dutyAssignments', editingDuty.id), {
        dutyDate: editDate,
        timeFrom: editTimeFrom,
        timeTo: editTimeTo,
        venue: editVenue,
        status: editStatus,
        notes: editNotes.trim()
      });

      await logAdminAction(
        'EDIT_DUTY_ASSIGNMENT', 
        `dutyAssignments/${editingDuty.id}`, 
        `Updated duty details for ${editingDuty.volunteerName}`
      );

      setEditingDuty(null);
    } catch (err: any) {
      setEditWarning(`Failed to save edits: ${err.message}`);
    }
  };

  const handleDeleteDuty = async () => {
    if (!deletingDuty) return;

    try {
      await deleteDoc(doc(db, 'dutyAssignments', deletingDuty.id));
      await logAdminAction(
        'DELETE_DUTY_ASSIGNMENT', 
        `dutyAssignments/${deletingDuty.id}`, 
        `Removed duty for ${deletingDuty.volunteerName}`
      );
      setDeletingDuty(null);
    } catch (err: any) {
      alert(`Error deleting duty: ${err.message}`);
    }
  };

  // --------------------------------------------------------------------------
  // VOLUNTEER DROPDOWN FILTER & MULTISELECT
  // --------------------------------------------------------------------------
  const availableVolunteers = useMemo(() => {
    if (!selectedTeam) return [];
    return volunteers.filter(v => v.team === selectedTeam);
  }, [volunteers, selectedTeam]);

  const filteredVolunteersForSelection = useMemo(() => {
    return availableVolunteers.filter((v) => {
      const isAlreadySelected = selectedVolunteers.some(sel => sel.id === v.id);
      const matchesSearch = v.name.toLowerCase().includes(searchVolQuery.toLowerCase());
      return !isAlreadySelected && matchesSearch;
    });
  }, [availableVolunteers, selectedVolunteers, searchVolQuery]);

  const handleAddVolunteer = (vol: any) => {
    setSelectedVolunteers([...selectedVolunteers, vol]);
    setSearchVolQuery('');
    setShowVolDropdown(false);
  };

  const handleRemoveVolunteer = (volId: string) => {
    setSelectedVolunteers(selectedVolunteers.filter(v => v.id !== volId));
  };

  // --------------------------------------------------------------------------
  // TABLE FILTERING & SEARCH
  // --------------------------------------------------------------------------
  const filteredDuties = useMemo(() => {
    return dutyAssignments.filter((duty) => {
      const matchesSearch = duty.volunteerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (duty.notes || '').toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTeam = teamFilter === 'all' || duty.team === teamFilter;
      const matchesDate = !dateFilter || duty.dutyDate === dateFilter;
      const matchesStatus = statusFilter === 'all' || duty.status === statusFilter;

      return matchesSearch && matchesTeam && matchesDate && matchesStatus;
    });
  }, [dutyAssignments, searchQuery, teamFilter, dateFilter, statusFilter]);

  // Utility to format 24-hr time format to 12-hr display
  const formatTime12hr = (timeStr: string) => {
    if (!timeStr) return '';
    const [hStr, mStr] = timeStr.split(':');
    const h = Number(hStr);
    const suffix = h >= 12 ? 'PM' : 'AM';
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    return `${String(hour12).padStart(2, '0')}:${mStr} ${suffix}`;
  };

  // Formatting utility for displaying date strings
  const formatDateFriendly = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="space-y-10 select-none font-adminBody">
      {/* Title Header */}
      <div>
        <h1 className="font-adminHeading text-3xl font-black uppercase tracking-tight text-brand-ink mb-1.5">Duty Management</h1>
        <p className="text-admin-muted font-bold text-xs uppercase tracking-wider">Manage volunteer duty assignments for AARAMBH’26</p>
      </div>

      {/* ==================================================================== */}
      {/* DUTY ASSIGNMENT FORM CARD */}
      {/* ==================================================================== */}
      <div className="bg-white border-4 border-brand-ink p-8 rounded-md shadow-[6px_6px_0px_0px_#030404]">
        <h2 className="text-xs font-black uppercase tracking-widest text-brand-pink mb-6 border-b-2 border-brand-ink/10 pb-2">
          New Duty Assignment Form
        </h2>

        {formWarning && (
          <div className="mb-6 p-4 bg-brand-orange/15 text-brand-ink text-xs font-bold border-2 border-brand-ink rounded-md flex gap-3 items-center">
            <AlertCircle className="text-brand-orange shrink-0" size={18} />
            <span className="uppercase tracking-wide leading-relaxed">{formWarning}</span>
          </div>
        )}

        <form onSubmit={handleAssignDuty} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* STEP 1: Select Date */}
            <div className="space-y-2">
              <label className="block text-[10px] font-black uppercase text-brand-ink/65 tracking-wider">
                Step 1 — Select Duty Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-ink/40" size={16} />
                <input
                  type="date"
                  required
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-brand-cloud/40 border-2 border-brand-ink rounded-md py-3 pl-11 pr-4 text-sm text-brand-ink font-bold focus:outline-none focus:border-brand-pink focus:bg-white shadow-inner transition-colors"
                />
              </div>
            </div>

            {/* STEP 2: Select Team */}
            <div className="space-y-2">
              <label className="block text-[10px] font-black uppercase text-brand-ink/65 tracking-wider">
                Step 2 — Select Team
              </label>
              <div className="relative">
                <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-ink/40" size={16} />
                <select
                  required
                  value={selectedTeam}
                  onChange={(e) => {
                    setSelectedTeam(e.target.value);
                    setSelectedVolunteers([]); // clear selected list on team swap
                  }}
                  className="w-full bg-brand-cloud/45 border-2 border-brand-ink rounded-md py-3 pl-11 pr-4 text-sm text-brand-ink font-bold focus:outline-none focus:border-brand-pink focus:bg-white shadow-[2px_2px_0px_0px_#030404] transition-colors cursor-pointer"
                >
                  <option value="">Choose Team...</option>
                  {dynamicTeams.map((teamName) => (
                    <option key={teamName} value={teamName}>{teamName}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* STEP 3: Select Team Member */}
            <div className="col-span-1 md:col-span-2 space-y-2 relative">
              <label className="block text-[10px] font-black uppercase text-brand-ink/65 tracking-wider">
                Step 3 — Select Volunteer(s)
              </label>
              
              {/* Pills Container for Selected Volunteers */}
              {selectedVolunteers.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3 bg-brand-cloud/25 p-3 border-2 border-brand-ink border-dashed rounded-md">
                  {selectedVolunteers.map((vol) => (
                    <div 
                      key={vol.id}
                      className="flex items-center gap-1.5 bg-[#ffffff] border-2 border-brand-ink rounded-md px-2.5 py-1 text-xs font-bold text-brand-ink shadow-[2px_2px_0px_0px_#030404]"
                    >
                      <User size={12} className="text-brand-pink" />
                      <span>{vol.name}</span>
                      <button 
                        type="button" 
                        onClick={() => handleRemoveVolunteer(vol.id)}
                        className="text-admin-muted hover:text-brand-pink focus:outline-none transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Searchable input box */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-ink/40" size={16} />
                <input
                  type="text"
                  placeholder={
                    !selectedTeam 
                      ? "Select a Team first to view volunteers..." 
                      : "Search volunteer name..."
                  }
                  disabled={!selectedTeam}
                  value={searchVolQuery}
                  onFocus={() => setShowVolDropdown(true)}
                  onChange={(e) => setSearchVolQuery(e.target.value)}
                  className="w-full bg-brand-cloud/40 border-2 border-brand-ink rounded-md py-3 pl-11 pr-4 text-sm text-brand-ink font-bold placeholder:text-brand-ink/30 focus:outline-none focus:border-brand-pink focus:bg-white shadow-inner disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                />
                {searchVolQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchVolQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-admin-muted hover:text-brand-ink focus:outline-none"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Selection Dropdown List */}
              {showVolDropdown && selectedTeam && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowVolDropdown(false)} />
                  <div className="absolute left-0 right-0 mt-1 bg-white border-2 border-brand-ink rounded-md shadow-[4px_4px_0px_0px_#030404] max-h-56 overflow-y-auto z-20 divide-y divide-brand-ink/10">
                    {filteredVolunteersForSelection.map((vol) => (
                      <div
                        key={vol.id}
                        onClick={() => handleAddVolunteer(vol)}
                        className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-brand-cloud/60 text-xs font-bold text-brand-ink transition-colors"
                      >
                        <span>{vol.name}</span>
                        <span className="text-[10px] uppercase font-black tracking-wider text-admin-muted">{vol.email}</span>
                      </div>
                    ))}
                    {filteredVolunteersForSelection.length === 0 && (
                      <div className="p-4 text-center text-xs font-bold text-admin-muted uppercase tracking-wider">
                        No available volunteers found
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* STEP 4: Duty Details - Timings */}
            <div className="space-y-4">
              <label className="block text-[10px] font-black uppercase text-brand-ink/65 tracking-wider mb-2">
                Step 4 — Timing Slots
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-admin-muted uppercase">From</span>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-ink/40" size={14} />
                    <input
                      type="time"
                      required
                      value={timeFrom}
                      onChange={(e) => setTimeFrom(e.target.value)}
                      className="w-full bg-brand-cloud/40 border-2 border-brand-ink rounded-md py-2.5 pl-9 pr-3 text-xs text-brand-ink font-bold focus:outline-none focus:border-brand-pink focus:bg-white shadow-inner"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-admin-muted uppercase">To</span>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-ink/40" size={14} />
                    <input
                      type="time"
                      required
                      value={timeTo}
                      onChange={(e) => setTimeTo(e.target.value)}
                      className="w-full bg-brand-cloud/40 border-2 border-brand-ink rounded-md py-2.5 pl-9 pr-3 text-xs text-brand-ink font-bold focus:outline-none focus:border-brand-pink focus:bg-white shadow-inner"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 4: Venue & Notes */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase text-brand-ink/65 tracking-wider">
                  Venue Selection
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-ink/40" size={14} />
                  <select
                    required
                    value={selectedVenue}
                    onChange={(e) => setSelectedVenue(e.target.value)}
                    className="w-full bg-brand-cloud/45 border-2 border-brand-ink rounded-md py-2.5 pl-9 pr-4 text-xs text-brand-ink font-bold focus:outline-none focus:border-brand-pink focus:bg-white shadow-[2px_2px_0px_0px_#030404] transition-colors cursor-pointer"
                  >
                    <option value="">Choose Venue...</option>
                    {VENUES.map((ven) => (
                      <option key={ven} value={ven}>{ven}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Step 4: Additional Notes (Full Width) */}
            <div className="col-span-1 md:col-span-2 space-y-2">
              <label className="block text-[10px] font-black uppercase text-brand-ink/65 tracking-wider">
                Additional notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="e.g. Bring official badge, check-in at main desk 10m early..."
                className="w-full bg-brand-cloud/40 border-2 border-brand-ink rounded-md p-3 text-xs text-brand-ink font-bold placeholder:text-brand-ink/30 focus:outline-none focus:border-brand-pink focus:bg-white shadow-inner transition-colors resize-none"
              />
            </div>
          </div>

          {/* STEP 5: ACTION BUTTONS */}
          <div className="flex gap-4 pt-4 justify-end border-t-2 border-brand-ink/10">
            <button
              type="button"
              onClick={handleResetForm}
              className="bg-[#ffffff] hover:bg-brand-cloud border-2 border-brand-ink font-black py-3 px-6 shadow-[3px_3px_0px_0px_#030404] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#030404] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all duration-100 flex items-center gap-2 cursor-pointer rounded-md text-xs uppercase tracking-wider"
            >
              <RotateCcw size={14} /> Reset Form
            </button>
            <button
              type="submit"
              className="bg-brand-pink hover:bg-[#E0107A] text-white font-black py-3 px-6 border-2 border-brand-ink shadow-[3px_3px_0px_0px_#030404] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#030404] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all duration-100 flex items-center gap-2 cursor-pointer rounded-md text-xs uppercase tracking-wider"
            >
              <Plus size={14} /> Assign Duty
            </button>
          </div>
        </form>
      </div>

      {/* ==================================================================== */}
      {/* FILTER & SEARCH SECTION */}
      {/* ==================================================================== */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-adminHeading text-2xl font-black uppercase tracking-tight text-brand-ink">Assigned Duties</h2>
          <p className="text-admin-muted font-bold text-xs uppercase tracking-wider mt-1">Operational volunteer schedule overview</p>
        </div>
      </div>

      <div className="bg-white border-4 border-brand-ink p-6 rounded-md shadow-[4px_4px_0px_0px_#030404] flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Search bar */}
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-ink/40" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-brand-cloud/40 border-2 border-brand-ink rounded-md py-3 pl-11 pr-4 text-sm text-brand-ink font-bold placeholder:text-brand-ink/40 shadow-inner focus:outline-none focus:border-brand-pink focus:bg-white transition-all uppercase tracking-wider"
            placeholder="Search Volunteer Name..."
          />
        </div>
        
        {/* Filter dropdowns */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="p-2.5 border-2 border-brand-ink bg-brand-cloud text-brand-ink rounded-md hidden md:block">
            <Filter size={16} />
          </div>
          
          {/* Date Filter */}
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="bg-white border-2 border-brand-ink rounded-md py-2.5 px-3 text-xs text-brand-ink font-bold focus:outline-none shadow-[2px_2px_0px_0px_#030404]"
          />

          {/* Team Filter */}
          <select
            value={teamFilter}
            onChange={(e) => setTeamFilter(e.target.value)}
            className="bg-white border-2 border-brand-ink rounded-md py-3 px-4 text-xs text-brand-ink font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#030404] focus:outline-none cursor-pointer hover:bg-brand-cloud transition-colors"
          >
            <option value="all">All Teams</option>
            {dynamicTeams.map((teamName) => (
              <option key={teamName} value={teamName}>{teamName}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border-2 border-brand-ink rounded-md py-3 px-4 text-xs text-brand-ink font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#030404] focus:outline-none cursor-pointer hover:bg-brand-cloud transition-colors"
          >
            <option value="all">All Statuses</option>
            <option value="upcoming">Upcoming</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* ASSIGNED DUTIES TABLE */}
      {/* ==================================================================== */}
      {loading ? (
        <SkeletonTable rows={8} />
      ) : (
        <div className="bg-white border-4 border-brand-ink rounded-md shadow-[6px_6px_0px_0px_#030404] overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-brand-cloud border-b-2 border-brand-ink text-brand-ink text-[10px] font-black uppercase tracking-widest">
                  <th className="p-4">Volunteer Name</th>
                  <th className="p-4">Team</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Time Window</th>
                  <th className="p-4">Venue</th>
                  <th className="p-4">Assigned By</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-ink/10">
                {filteredDuties.map((duty) => (
                  <tr key={duty.id} className="hover:bg-brand-cloud/45 transition-colors text-xs font-bold text-brand-ink">
                    <td className="p-4 font-black">{duty.volunteerName}</td>
                    <td className="p-4 text-brand-ink/90 font-semibold">{duty.team}</td>
                    <td className="p-4 text-admin-muted font-bold">
                      {formatDateFriendly(duty.dutyDate)}
                    </td>
                    <td className="p-4 text-brand-ink/90 font-bold">
                      <div className="flex items-center gap-1.5">
                        <Clock size={12} className="text-brand-blue" />
                        <span>{formatTime12hr(duty.timeFrom)} - {formatTime12hr(duty.timeTo)}</span>
                      </div>
                    </td>
                    <td className="p-4 text-brand-ink/90">
                      <span className="inline-flex items-center gap-1">
                        <MapPin size={12} className="text-brand-orange" />
                        {duty.venue}
                      </span>
                    </td>
                    <td className="p-4 text-admin-muted">{duty.assignedBy || 'System'}</td>
                    <td className="p-4 text-center">
                      <span className={`inline-block px-2.5 py-1 border-2 border-brand-ink rounded-md text-[9px] font-black uppercase tracking-wider ${
                        duty.status === 'completed'
                          ? 'bg-brand-pink/15 text-brand-pink shadow-[1px_1px_0px_0px_#030404]'
                          : duty.status === 'active'
                          ? 'bg-brand-blue/15 text-brand-blue shadow-[1px_1px_0px_0px_#030404]'
                          : 'bg-brand-orange/15 text-brand-orange shadow-[1px_1px_0px_0px_#030404]'
                      }`}>
                        {duty.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {duty.status !== 'completed' && (
                          <button
                            onClick={() => handleMarkCompleted(duty)}
                            className="p-1.5 border-2 border-transparent hover:border-brand-ink hover:bg-green-50 text-green-700 rounded-md transition-all cursor-pointer focus:outline-none"
                            title="Mark Completed"
                          >
                            <CheckCircle size={15} />
                          </button>
                        )}
                        <button
                          onClick={() => handleOpenEditModal(duty)}
                          className="p-1.5 border-2 border-transparent hover:border-brand-ink hover:bg-brand-cloud text-brand-ink rounded-md transition-all cursor-pointer focus:outline-none"
                          title="Edit Duty"
                        >
                          <Edit size={15} />
                        </button>
                        <button
                          onClick={() => setDeletingDuty(duty)}
                          className="p-1.5 border-2 border-transparent hover:border-brand-ink hover:bg-brand-pink/10 text-brand-pink rounded-md transition-all cursor-pointer focus:outline-none"
                          title="Remove Duty"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredDuties.length === 0 && (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-admin-muted font-black text-xs uppercase tracking-wider">
                      No duty assignments found matching the criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* EDIT DUTY MODAL */}
      {/* ==================================================================== */}
      <Modal 
        isOpen={!!editingDuty} 
        onClose={() => setEditingDuty(null)} 
        title={`Edit Duty for ${editingDuty?.volunteerName}`}
      >
        {editingDuty && (
          <form onSubmit={handleSaveEdit} className="space-y-5 text-brand-ink">
            {editWarning && (
              <div className="p-3 bg-brand-orange/15 text-brand-ink text-xs font-bold border-2 border-brand-ink rounded-md flex gap-2 items-center">
                <AlertCircle className="text-brand-orange shrink-0" size={16} />
                <span className="uppercase tracking-wide">{editWarning}</span>
              </div>
            )}

            <div className="space-y-1">
              <label className="block text-[10px] font-black uppercase text-admin-muted tracking-wider">Duty Date</label>
              <input
                type="date"
                required
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
                className="w-full bg-brand-cloud/40 border-2 border-brand-ink rounded-md py-2 px-3 text-xs font-bold text-brand-ink focus:outline-none focus:border-brand-pink focus:bg-white shadow-inner"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[10px] font-black uppercase text-admin-muted tracking-wider">Time From</label>
                <input
                  type="time"
                  required
                  value={editTimeFrom}
                  onChange={(e) => setEditTimeFrom(e.target.value)}
                  className="w-full bg-brand-cloud/40 border-2 border-brand-ink rounded-md py-2 px-3 text-xs font-bold text-brand-ink focus:outline-none focus:border-brand-pink focus:bg-white shadow-inner"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] font-black uppercase text-admin-muted tracking-wider">Time To</label>
                <input
                  type="time"
                  required
                  value={editTimeTo}
                  onChange={(e) => setEditTimeTo(e.target.value)}
                  className="w-full bg-brand-cloud/40 border-2 border-brand-ink rounded-md py-2 px-3 text-xs font-bold text-brand-ink focus:outline-none focus:border-brand-pink focus:bg-white shadow-inner"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-black uppercase text-admin-muted tracking-wider">Venue</label>
              <select
                required
                value={editVenue}
                onChange={(e) => setEditVenue(e.target.value)}
                className="w-full bg-white border-2 border-brand-ink rounded-md py-2 px-3 text-xs font-bold text-brand-ink focus:outline-none focus:border-brand-pink shadow-[1px_1px_0px_0px_#030404]"
              >
                {VENUES.map((ven) => (
                  <option key={ven} value={ven}>{ven}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-black uppercase text-admin-muted tracking-wider">Status</label>
              <select
                required
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                className="w-full bg-white border-2 border-brand-ink rounded-md py-2 px-3 text-xs font-bold text-brand-ink focus:outline-none focus:border-brand-pink shadow-[1px_1px_0px_0px_#030404]"
              >
                <option value="upcoming">Upcoming</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-black uppercase text-admin-muted tracking-wider">Additional Notes (Optional)</label>
              <textarea
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                rows={2}
                className="w-full bg-brand-cloud/40 border-2 border-brand-ink rounded-md p-2.5 text-xs font-bold text-brand-ink focus:outline-none focus:border-brand-pink focus:bg-white shadow-inner resize-none"
              />
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t-2 border-brand-ink/10">
              <button 
                type="button" 
                onClick={() => setEditingDuty(null)} 
                className="px-4 py-2 border-2 border-transparent text-admin-muted hover:text-brand-ink text-xs uppercase font-black transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="bg-brand-pink text-white font-black px-5 py-2.5 border-2 border-brand-ink shadow-[3px_3px_0px_0px_#030404] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#030404] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all text-xs uppercase tracking-wider rounded-md"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* ==================================================================== */}
      {/* DELETE CONFIRMATION MODAL */}
      {/* ==================================================================== */}
      <Modal 
        isOpen={!!deletingDuty} 
        onClose={() => setDeletingDuty(null)} 
        title="Delete Duty Assignment"
      >
        <div className="space-y-6 text-brand-ink">
          <div className="flex items-center gap-4 text-brand-pink bg-brand-pink/10 p-4 border-2 border-brand-ink rounded-md">
            <AlertCircle size={28} className="shrink-0" />
            <p className="text-xs font-bold uppercase leading-relaxed">
              Are you sure you want to remove the duty assignment for <strong>{deletingDuty?.volunteerName}</strong> at <strong>{deletingDuty?.venue}</strong>? This action cannot be undone.
            </p>
          </div>
          
          <div className="flex justify-end gap-3 pt-2">
            <button 
              onClick={() => setDeletingDuty(null)} 
              className="px-4 py-2 border-2 border-transparent text-admin-muted hover:text-brand-ink text-xs uppercase font-black transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleDeleteDuty} 
              className="bg-brand-pink text-white font-black px-5 py-2.5 border-2 border-brand-ink shadow-[3px_3px_0px_0px_#030404] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#030404] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all text-xs uppercase tracking-wider rounded-md"
            >
              Remove Duty
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
