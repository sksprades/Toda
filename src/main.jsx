import React, { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import * as lucideReact from 'lucide-react';

const {
  Shield, Star, AlertTriangle, Search, Phone, FileText, User,
        MapPin, Clock, Award, CheckCircle2, XCircle, Plus, Eye,
        Filter, Bell, ChevronRight, Send, HelpCircle, Lock, RefreshCw,
        Database, Server, Code, Layers, MessageSquare, Download, Check,
        Radio, ThumbsUp, AlertCircle, Camera, LogOut, UserCheck, Menu, X, ArrowLeft,
        QrCode, Scan, Upload, Printer, Sparkles
      } = lucideReact;

// --- INITIAL MOCK DATA ---
const INITIAL_DRIVERS = [
  {
    id: 1,
    name: "Juan Dela Cruz",
    bodyNumber: "042",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    phone: "+63 917 555 0101",
    yearsOfService: 8,
    rating: 4.9,
    ratingCount: 142,
    totalTrips: 12400,
    status: "Active",
    badges: ["Driver of the Month", "Most Honest Driver", "Top Rated 2026"],
    ratingsBreakdown: { safety: 5.0, professionalism: 4.8, cleanliness: 4.9, friendliness: 5.0, overall: 4.9 },
    reviews: [
      { id: 101, author: "Maria S.", stars: 5, date: "2026-03-01", comment: "Kuya Juan returned my dropped wallet containing 5,000 pesos! Very honest driver!" },
      { id: 102, author: "Student UA", stars: 5, date: "2026-02-28", comment: "Smooth and safe driving near UA campus." }
    ]
  },
  {
    id: 2,
    name: "Roberto 'Berto' Santos",
    bodyNumber: "108",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    phone: "+63 918 555 0202",
    yearsOfService: 12,
    rating: 4.8,
    ratingCount: 98,
    totalTrips: 18500,
    status: "Active",
    badges: ["Top Rated 2026", "Most Helpful Driver"],
    ratingsBreakdown: { safety: 4.9, professionalism: 4.7, cleanliness: 4.8, friendliness: 4.9, overall: 4.8 },
    reviews: [
      { id: 201, author: "Mark T.", stars: 5, date: "2026-03-02", comment: "Always friendly and clean unit. Fair charging." }
    ]
  },
  {
    id: 3,
    name: "Eduardo Garcia",
    bodyNumber: "015",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    phone: "+63 919 555 0303",
    yearsOfService: 3,
    rating: 3.6,
    ratingCount: 24,
    totalTrips: 3100,
    status: "Active",
    badges: [],
    ratingsBreakdown: { safety: 3.4, professionalism: 3.5, cleanliness: 3.8, friendliness: 3.7, overall: 3.6 },
    reviews: [
      { id: 301, author: "Anon Passenger", stars: 2, date: "2026-02-25", comment: "A bit fast on sharp corners near the market." }
    ]
  },
  {
    id: 4,
    name: "Mario Reyes",
    bodyNumber: "077",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    phone: "+63 920 555 0404",
    yearsOfService: 5,
    rating: 4.95,
    ratingCount: 210,
    totalTrips: 9800,
    status: "Active",
    badges: ["Driver of the Month", "5-Star Veteran"],
    ratingsBreakdown: { safety: 5.0, professionalism: 4.9, cleanliness: 5.0, friendliness: 4.9, overall: 5.0 },
    reviews: []
  },
  {
    id: 5,
    name: "Danilo Ramos",
    bodyNumber: "152",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    phone: "+63 921 555 0505",
    yearsOfService: 1,
    rating: 4.2,
    ratingCount: 15,
    totalTrips: 1200,
    status: "Pending",
    badges: [],
    ratingsBreakdown: { safety: 4.2, professionalism: 4.0, cleanliness: 4.3, friendliness: 4.3, overall: 4.2 },
    reviews: []
  }
];

const INITIAL_ANNOUNCEMENTS = [
  {
    id: 1,
    title: "Official 2026 UA TODA Fare Matrix Update",
    category: "Fare Matrix",
    date: "2026-03-01",
    author: "TODA Executive Board",
    content: "Terminal to UA gate 1 and 2 \nFare: \nPhp 40 for 1 student \nPhp 25 each For 2 student \n Php 20 each for 3 or more students." ,
    urgent: true
  }
];

const INITIAL_LOST_ITEMS = [
  {
    id: 1001,
    title: "Blue Hydrate Hydroflask (32oz)",
    category: "Tumbler",
    driverBody: "042",
    dateFound: "2026-03-04",
    locationFound: "Back seat of Tricycle #042 near UA Gate 1",
    description: "Dark blue insulated water bottle with stickers (UA Student Council & Anime stickers).",
    claimInstructions: "Present student ID at the UA TODA Terminal Dispatcher Booth.",
    status: "Unclaimed",
    photo: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: 1002,
    title: "Black Leather Men's Wallet",
    category: "Wallet",
    driverBody: "108",
    dateFound: "2026-03-02",
    locationFound: "Under passenger floor mat",
    description: "Contains license under name of 'Carlo M.' and some small bills. No credit cards.",
    claimInstructions: "Contact Driver Roberto Santos directly via TODA Hotline or Officer in Duty.",
    status: "Claimed",
    photo: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=300&auto=format&fit=crop&q=80"
  }
];

const INITIAL_REPORTS = [
  {
    id: "REP-2026-881",
    bodyNumber: "015",
    category: "Reckless Driving",
    dateTime: "2026-03-04 14:30",
    description: "Overtook aggressively on the right side near the pedestrian crossing. Caused panic to students.",
    anonymous: true,
    status: "Under Review",
    driverResponse: ""
  },
  {
    id: "REP-2026-752",
    bodyNumber: "015",
    category: "Overcharging Fare",
    dateTime: "2026-03-02 09:15",
    description: "Charged ₱40 for a regular ₱20 route. Did not give student discount even when ID was shown.",
    anonymous: false,
    reporterName: "Ana Santos",
    status: "Resolved",
    driverResponse: "Offered partial refund and apology. Caution issued by TODA President."
  }
];

function App() {
  // State definitions
  const [role, setRole] = useState('public'); // 'public', 'driver', 'admin'
  const [activeTab, setActiveTab] = useState('home'); // home, directory, report, rate, lostfound, news, emergency, driverDash, adminDash, docs
  const [drivers, setDrivers] = useState(INITIAL_DRIVERS);
  const [announcements, setAnnouncements] = useState(INITIAL_ANNOUNCEMENTS);
  const [lostItems, setLostItems] = useState(INITIAL_LOST_ITEMS);
  const [reports, setReports] = useState(INITIAL_REPORTS);
  const [toast, setToast] = useState(null);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDriverModal, setSelectedDriverModal] = useState(null);

  // QR Scanner & Generator States
  const [isQrScannerOpen, setIsQrScannerOpen] = useState(false);
  const [isScanningActive, setIsScanningActive] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [qrPrintModalDriver, setQrPrintModalDriver] = useState(null);

  // Form States
  const [reportForm, setReportForm] = useState({
    bodyNumber: '',
    category: 'Overcharging Fare',
    dateTime: new Date().toISOString().slice(0, 16),
    description: '',
    anonymous: true,
    reporterName: '',
    contact: '',
    photo: null
  });

  const [ratingForm, setRatingForm] = useState({
    bodyNumber: '',
    safety: 5,
    professionalism: 5,
    cleanliness: 5,
    friendliness: 5,
    overall: 5,
    comment: '',
    author: ''
  });

  const [lostForm, setLostForm] = useState({
    title: '',
    category: 'Wallet',
    driverBody: '042',
    dateFound: new Date().toISOString().slice(0, 10),
    locationFound: '',
    description: '',
    claimInstructions: 'Claim at TODA Main Dispatcher Terminal.',
    photo: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=300&auto=format&fit=crop&q=80'
  });

  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    category: 'Advisory',
    content: '',
    urgent: false
  });

  const [driverResponseInput, setDriverResponseInput] = useState('');
  const [sosModalOpen, setSosModalOpen] = useState(false);
  const [sosSuccess, setSosSuccess] = useState(false);
  const [selectedDocTab, setSelectedDocTab] = useState('sql');

  // Trigger Toast Notification
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Helper function to find driver by body number
  const findDriverByBody = (bodyNum) => {
    return drivers.find(d => d.bodyNumber.trim() === bodyNum.trim());
  };

  // Process Scanned Body Number
  const handleScanBodyNumber = (bodyNumber) => {
    const found = findDriverByBody(bodyNumber);
    setIsScanningActive(true);
    
    setTimeout(() => {
      setIsScanningActive(false);
      setIsQrScannerOpen(false);
      if (found) {
        setSelectedDriverModal(found);
        showToast(`QR Code Scanned! Body #${bodyNumber} identified: ${found.name}`, 'success');
      } else {
        showToast(`Tricycle Body #${bodyNumber} not found in official TODA directory.`, 'error');
      }
    }, 700);
  };

  // Simulate File Upload Scan
  const handleFileUploadScan = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      showToast(`Analyzing uploaded QR image "${file.name}"...`);
      setTimeout(() => {
        handleScanBodyNumber("042");
      }, 1000);
    }
  };

  // Handle Submitting a Complaint Report
  const handleReportSubmit = (e) => {
    e.preventDefault();
    if (!reportForm.bodyNumber) {
      showToast("Please enter a valid body number.", "error");
      return;
    }
    const newId = `REP-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newReport = {
      id: newId,
      bodyNumber: reportForm.bodyNumber,
      category: reportForm.category,
      dateTime: reportForm.dateTime,
      description: reportForm.description,
      anonymous: reportForm.anonymous,
      reporterName: reportForm.anonymous ? "Anonymous Passenger" : reportForm.reporterName,
      status: "Pending Review",
      driverResponse: ""
    };
    setReports([newReport, ...reports]);
    showToast(`Report ${newId} successfully submitted! Thank you for helping keep our TODA safe.`);
    setReportForm({
      bodyNumber: '',
      category: 'Overcharging Fare',
      dateTime: new Date().toISOString().slice(0, 16),
      description: '',
      anonymous: true,
      reporterName: '',
      contact: '',
      photo: null
    });
    setActiveTab('home');
  };

  // Handle Driver Rating Submission
  const handleRatingSubmit = (e) => {
    e.preventDefault();
    const driver = findDriverByBody(ratingForm.bodyNumber);
    if (!driver) {
      showToast("Driver body number not found. Please verify.", "error");
      return;
    }

    const calculatedAvg = Number(
      ((ratingForm.safety + ratingForm.professionalism + ratingForm.cleanliness + ratingForm.friendliness + ratingForm.overall) / 5).toFixed(1)
    );

    const newReview = {
      id: Date.now(),
      author: ratingForm.author || "Anonymous Commuter",
      stars: ratingForm.overall,
      date: new Date().toISOString().slice(0, 10),
      comment: ratingForm.comment || "No written review provided."
    };

    const updatedDrivers = drivers.map(d => {
      if (d.bodyNumber === driver.bodyNumber) {
        const newCount = d.ratingCount + 1;
        const newRating = Number(((d.rating * d.ratingCount + calculatedAvg) / newCount).toFixed(2));
        return {
          ...d,
          rating: newRating,
          ratingCount: newCount,
          reviews: [newReview, ...d.reviews]
        };
      }
      return d;
    });

    setDrivers(updatedDrivers);
    showToast(`Rating submitted for Body #${driver.bodyNumber}! Thank you.`);
    setRatingForm({ bodyNumber: '', safety: 5, professionalism: 5, cleanliness: 5, friendliness: 5, overall: 5, comment: '', author: '' });
    setActiveTab('directory');
  };

  // Handle Post Lost Item
  const handlePostLostItem = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      ...lostForm,
      status: 'Unclaimed'
    };
    setLostItems([newItem, ...lostItems]);
    showToast("Lost item report posted to public board!");
    setLostForm({
      title: '', category: 'Wallet', driverBody: '042',
      dateFound: new Date().toISOString().slice(0, 10),
      locationFound: '', description: '',
      claimInstructions: 'Claim at TODA Main Dispatcher Terminal.',
      photo: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=300&auto=format&fit=crop&q=80'
    });
    setActiveTab('lostfound');
  };

  // Handle Post Announcement
  const handlePostAnnouncement = (e) => {
    e.preventDefault();
    const newAnn = {
      id: Date.now(),
      ...announcementForm,
      date: new Date().toISOString().slice(0, 10),
      author: "TODA Admin / Executive Board"
    };
    setAnnouncements([newAnn, ...announcements]);
    showToast("Announcement published successfully!");
    setAnnouncementForm({ title: '', category: 'Advisory', content: '', urgent: false });
  };

  // Driver approval toggle
  const toggleDriverApproval = (id, newStatus) => {
    setDrivers(drivers.map(d => d.id === id ? { ...d, status: newStatus } : d));
    showToast(`Driver status updated to ${newStatus}.`);
  };

  // Update Report Status
  const updateReportStatus = (repId, newStatus) => {
    setReports(reports.map(r => r.id === repId ? { ...r, status: newStatus } : r));
    showToast(`Report ${repId} updated to ${newStatus}.`);
  };

  // Submit Driver Response to Complaint
  const handleDriverRespondToReport = (repId) => {
    if (!driverResponseInput.trim()) return;
    setReports(reports.map(r => r.id === repId ? { ...r, driverResponse: driverResponseInput, status: 'Under Review' } : r));
    setDriverResponseInput('');
    showToast("Response recorded. Officers will review your explanation.");
  };

  // Filtered drivers for Directory
  const filteredDrivers = useMemo(() => {
    return drivers.filter(d => 
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.bodyNumber.includes(searchQuery)
    );
  }, [drivers, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-24 md:pb-8 flex flex-col justify-between">
      
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl shadow-2xl text-white flex items-center space-x-3 transition-all transform slide-in-from-top ${toast.type === 'error' ? 'bg-rose-600' : 'bg-emerald-600'}`}>
          <Bell className="w-5 h-5 animate-bounce" />
          <span className="font-medium text-sm md:text-base">{toast.message}</span>
        </div>
      )}

      {/* TOP HEADER & ROLE SWITCHER */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        {/* Role Bar */}
        <div className="bg-slate-900 text-slate-200 px-4 py-2 text-xs md:text-sm flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-blue-400" />
            <span className="font-semibold tracking-wide text-blue-300">TRIKESAFE</span>
            <span className="hidden sm:inline text-slate-400">| Safe & Transparent Tricycle Transportation</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-slate-400 text-xs hidden md:inline">Switch Role Simulator:</span>
            <div className="bg-slate-800 p-1 rounded-lg flex space-x-1 border border-slate-700">
              <button 
                onClick={() => { setRole('public'); setActiveTab('home'); }}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition ${role === 'public' ? 'bg-blue-600 text-white shadow' : 'text-slate-300 hover:text-white'}`}
              >
                Public Passenger
              </button>
              <button 
                onClick={() => { setRole('driver'); setActiveTab('driverDash'); }}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition ${role === 'driver' ? 'bg-emerald-600 text-white shadow' : 'text-slate-300 hover:text-white'}`}
              >
                Driver (#042)
              </button>
              <button 
                onClick={() => { setRole('admin'); setActiveTab('adminDash'); }}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition ${role === 'admin' ? 'bg-amber-600 text-white shadow' : 'text-slate-300 hover:text-white'}`}
              >
                TODA Admin
              </button>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab(role === 'public' ? 'home' : role === 'driver' ? 'driverDash' : 'adminDash')}>
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-md bg-gradient-to-tr from-blue-700 to-teal-500">
              UA
            </div>
            <div>
              <h1 className="font-bold text-lg md:text-xl text-slate-900 leading-none">TrikeSafe</h1>
              <p className="text-xs text-slate-500 mt-0.5">Safe University Area Tricycle Transportation</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {role === 'public' && (
              <>
                <button onClick={() => setActiveTab('home')} className={`px-3 py-2 rounded-lg text-sm font-medium ${activeTab === 'home' ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:bg-slate-100'}`}>Home</button>
                <button onClick={() => setActiveTab('directory')} className={`px-3 py-2 rounded-lg text-sm font-medium ${activeTab === 'directory' ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:bg-slate-100'}`}>Driver Directory</button>
                <button onClick={() => setActiveTab('lostfound')} className={`px-3 py-2 rounded-lg text-sm font-medium ${activeTab === 'lostfound' ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:bg-slate-100'}`}>Lost & Found</button>
                <button onClick={() => setActiveTab('news')} className={`px-3 py-2 rounded-lg text-sm font-medium ${activeTab === 'news' ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:bg-slate-100'}`}>Announcements</button>
                <button onClick={() => setActiveTab('report')} className={`px-3 py-2 rounded-lg text-sm font-medium ${activeTab === 'report' ? 'text-rose-600 bg-rose-50' : 'text-slate-600 hover:bg-slate-100'}`}>File Report</button>
                <button onClick={() => setActiveTab('rate')} className={`px-3 py-2 rounded-lg text-sm font-medium ${activeTab === 'rate' ? 'text-amber-600 bg-amber-50' : 'text-slate-600 hover:bg-slate-100'}`}>Rate Driver</button>
              </>
            )}

            {role === 'driver' && (
              <>
                <button onClick={() => setActiveTab('driverDash')} className={`px-3 py-2 rounded-lg text-sm font-medium ${activeTab === 'driverDash' ? 'text-emerald-600 bg-emerald-50' : 'text-slate-600 hover:bg-slate-100'}`}>Driver Dashboard</button>
                <button onClick={() => setActiveTab('directory')} className={`px-3 py-2 rounded-lg text-sm font-medium ${activeTab === 'directory' ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:bg-slate-100'}`}>Directory</button>
                <button onClick={() => setActiveTab('lostfound')} className={`px-3 py-2 rounded-lg text-sm font-medium ${activeTab === 'lostfound' ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:bg-slate-100'}`}>Lost & Found Board</button>
              </>
            )}

            {role === 'admin' && (
              <>
                <button onClick={() => setActiveTab('adminDash')} className={`px-3 py-2 rounded-lg text-sm font-medium ${activeTab === 'adminDash' ? 'text-amber-600 bg-amber-50' : 'text-slate-600 hover:bg-slate-100'}`}>Admin Dashboard</button>
                <button onClick={() => setActiveTab('directory')} className={`px-3 py-2 rounded-lg text-sm font-medium ${activeTab === 'directory' ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:bg-slate-100'}`}>Manage Drivers</button>
                <button onClick={() => setActiveTab('news')} className={`px-3 py-2 rounded-lg text-sm font-medium ${activeTab === 'news' ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:bg-slate-100'}`}>Announcements</button>
              </>
            )}

          </nav>

          {/* Quick Action Buttons Header */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setIsQrScannerOpen(true)}
              className="px-3 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white text-xs md:text-sm font-bold flex items-center space-x-1.5 shadow-md shadow-teal-200 transition"
            >
              <Scan className="w-4 h-4 animate-pulse" />
              <span>Scan QR</span>
            </button>

            <button 
              onClick={() => setActiveTab('emergency')}
              className="px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs md:text-sm font-semibold flex items-center space-x-1.5 shadow-md shadow-rose-200 transition"
            >
              <AlertTriangle className="w-4 h-4" />
              <span className="hidden sm:inline">SOS</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 py-6 flex-grow w-full">

        {/* ---------------- 1. PUBLIC HOMEPAGE ---------------- */}
        {activeTab === 'home' && (
          <div className="space-y-8">
            
            {/* Hero & Quick Search */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 via-slate-900 to-teal-950 text-white p-6 sm:p-10 shadow-xl">
              <div className="relative z-10 max-w-2xl">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-200 text-xs font-semibold border border-teal-400/30 mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-teal-300" />
                  <span>Instant Tricycle QR Verification Enabled</span>
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Commute Safely with Official TODA Tricycles
                </h2>
                <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                  Scan the QR code pasted inside your tricycle or type the Body Number to view driver profiles, check fare rates, rate service, or report issues instantly.
                </p>

                {/* Hero QR Scan & Manual Lookup Box */}
                <div className="mt-6 bg-white p-3 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center gap-2">
                  <button 
                    onClick={() => setIsQrScannerOpen(true)}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-sm flex items-center justify-center space-x-2 shadow-md transition"
                  >
                    <Scan className="w-5 h-5" />
                    <span>Scan Tricycle QR</span>
                  </button>

                  <div className="hidden sm:block text-slate-300 font-bold px-1 text-xs">OR</div>

                  <div className="flex items-center space-x-3 px-3 py-2 w-full text-slate-800 bg-slate-50 rounded-xl border border-slate-200">
                    <Search className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <input 
                      type="text"
                      placeholder="Type Body # (e.g. 042, 108)..."
                      className="w-full bg-transparent focus:outline-none text-sm font-semibold placeholder:text-slate-400"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <button 
                    onClick={() => setActiveTab('directory')}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm whitespace-nowrap transition"
                  >
                    Lookup
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Action Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button 
                onClick={() => setIsQrScannerOpen(true)}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-teal-400 hover:shadow-lg transition text-left group flex flex-col justify-between"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Scan className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 group-hover:text-teal-600 transition">Scan QR Code</h3>
                  <p className="text-xs text-slate-500 mt-1">Open camera to scan tricycle unit barcode stickers.</p>
                </div>
              </button>

              <button 
                onClick={() => setActiveTab('report')}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-rose-300 hover:shadow-lg transition text-left group flex flex-col justify-between"
              >
                <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 group-hover:text-rose-600 transition">Report Driver</h3>
                  <p className="text-xs text-slate-500 mt-1">Submit overcharging or safety complaints anonymously.</p>
                </div>
              </button>

              <button 
                onClick={() => setActiveTab('rate')}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-300 hover:shadow-lg transition text-left group flex flex-col justify-between"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Star className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 group-hover:text-amber-600 transition">Rate & Commend</h3>
                  <p className="text-xs text-slate-500 mt-1">Leave 5-star ratings and written reviews for good drivers.</p>
                </div>
              </button>

              <button 
                onClick={() => setActiveTab('lostfound')}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-lg transition text-left group flex flex-col justify-between"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition">Lost & Found</h3>
                  <p className="text-xs text-slate-500 mt-1">Browse items left in tricycles and claim instructions.</p>
                </div>
              </button>
            </div>

            {/* Announcement Ticker / Live Advisories */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-slate-900 text-lg">Latest Advisories & Announcements</h3>
                </div>
                <button onClick={() => setActiveTab('news')} className="text-blue-600 text-sm font-semibold hover:underline flex items-center">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {announcements.slice(0, 2).map(ann => (
                  <div key={ann.id} className={`p-4 rounded-xl border ${ann.urgent ? 'border-amber-200 bg-amber-50/50' : 'border-slate-100 bg-slate-50'} flex flex-col justify-between`}>
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className={`px-2 py-0.5 rounded-full font-bold ${ann.urgent ? 'bg-amber-200 text-amber-800' : 'bg-slate-200 text-slate-700'}`}>
                          {ann.category}
                        </span>
                        <span className="text-slate-400">{ann.date}</span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-base mb-1">{ann.title}</h4>
                      <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">{ann.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Rated Drivers Leaderboard */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-xl flex items-center space-x-2">
                    <Award className="w-6 h-6 text-amber-500" />
                    <span>Driver Achievement Board</span>
                  </h3>
                  <p className="text-xs text-slate-500">Recognizing excellence, honesty, and commuter safety in our TODA.</p>
                </div>
                <button onClick={() => setActiveTab('directory')} className="text-blue-600 text-sm font-semibold hover:underline">
                  Full Directory →
                </button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {drivers.filter(d => d.badges.length > 0).slice(0, 3).map(driver => (
                  <div key={driver.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                    <div className="flex items-start space-x-4">
                      <img src={driver.photo} alt={driver.name} className="w-16 h-16 rounded-xl object-cover border-2 border-blue-500 shadow-sm" />
                      <div>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-bold rounded-md">
                          Body #{driver.bodyNumber}
                        </span>
                        <h4 className="font-bold text-slate-900 text-base mt-1 leading-tight">{driver.name}</h4>
                        <div className="flex items-center space-x-1 mt-1 text-xs text-amber-500 font-bold">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <span>{driver.rating}</span>
                          <span className="text-slate-400 font-normal">({driver.ratingCount} reviews)</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1">
                      {driver.badges.map((badge, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium rounded-full flex items-center space-x-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          <span>{badge}</span>
                        </span>
                      ))}
                    </div>

                    <button 
                      onClick={() => setSelectedDriverModal(driver)}
                      className="mt-4 w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition"
                    >
                      View Full Profile
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Lost & Found Preview Section */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg text-white">Recent Lost Items Found by Drivers</h3>
                  <p className="text-xs text-slate-400">Drivers post found belongings to help return them safely to passengers.</p>
                </div>
                <button onClick={() => setActiveTab('lostfound')} className="text-blue-400 hover:text-blue-300 text-xs font-bold">
                  Browse All Items →
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {lostItems.slice(0, 2).map(item => (
                  <div key={item.id} className="bg-slate-800/80 rounded-xl p-3 border border-slate-700 flex items-center space-x-3">
                    <img src={item.photo} alt={item.title} className="w-16 h-16 rounded-lg object-cover" />
                    <div>
                      <span className="text-xs text-emerald-400 font-semibold">{item.category} • Body #{item.driverBody}</span>
                      <h4 className="font-bold text-sm text-white line-clamp-1">{item.title}</h4>
                      <p className="text-xs text-slate-400 mt-1">{item.locationFound}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ---------------- 2. DRIVER DIRECTORY & SEARCH ---------------- */}
        {activeTab === 'directory' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Official TODA Driver Directory</h2>
                <p className="text-xs md:text-sm text-slate-500">Lookup driver profiles, verify active status, and inspect safety performance metrics.</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="relative flex-grow md:w-72">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input 
                    type="text"
                    placeholder="Search Name or Body #..."
                    className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredDrivers.map(driver => (
                <div key={driver.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <img src={driver.photo} alt={driver.name} className="w-14 h-14 rounded-xl object-cover border border-slate-200" />
                        <div>
                          <h3 className="font-bold text-slate-900 text-base">{driver.name}</h3>
                          <div className="flex items-center space-x-2 mt-0.5">
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-bold rounded">
                              Body #{driver.bodyNumber}
                            </span>
                            <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${driver.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                              {driver.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl text-xs">
                      <div>
                        <span className="text-slate-400 block">Rating:</span>
                        <span className="font-bold text-amber-500 flex items-center text-sm">
                          <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" /> {driver.rating}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Service:</span>
                        <span className="font-semibold text-slate-700">{driver.yearsOfService} Years</span>
                      </div>
                    </div>

                    {driver.badges.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {driver.badges.map((b, i) => (
                          <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                            {b}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-5 flex items-center space-x-2">
                    <button 
                      onClick={() => setSelectedDriverModal(driver)}
                      className="flex-1 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-semibold transition"
                    >
                      View Profile
                    </button>
                    <button 
                      onClick={() => setQrPrintModalDriver(driver)}
                      className="p-2 bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-xl text-xs font-semibold transition"
                      title="View & Print Official QR Code"
                    >
                      <QrCode className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => {
                        setRatingForm({ ...ratingForm, bodyNumber: driver.bodyNumber });
                        setActiveTab('rate');
                      }}
                      className="py-2 px-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-semibold transition"
                    >
                      Rate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- 3. PASSENGER REPORT SYSTEM ---------------- */}
        {activeTab === 'report' && (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">File a Passenger Report / Complaint</h2>
                <p className="text-xs text-slate-500">Your safety and honest experience matter. Anonymous filing available.</p>
              </div>
            </div>

            <form onSubmit={handleReportSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-slate-700">Tricycle Body Number *</label>
                    <button 
                      type="button" 
                      onClick={() => setIsQrScannerOpen(true)} 
                      className="text-[11px] text-teal-600 font-bold hover:underline flex items-center space-x-1"
                    >
                      <Scan className="w-3 h-3" />
                      <span>Scan QR to Autofill</span>
                    </button>
                  </div>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. 042"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                    value={reportForm.bodyNumber}
                    onChange={(e) => setReportForm({ ...reportForm, bodyNumber: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Incident Category *</label>
                  <select 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                    value={reportForm.category}
                    onChange={(e) => setReportForm({ ...reportForm, category: e.target.value })}
                  >
                    <option>Overcharging Fare</option>
                    <option>Reckless Driving</option>
                    <option>Rude Behavior</option>
                    <option>Unsafe Driving</option>
                    <option>Refusing Passengers</option>
                    <option>Smoking While Driving</option>
                    <option>Vehicle Condition Issues</option>
                    <option>Other Complaints</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Date and Time of Incident</label>
                <input 
                  type="datetime-local" 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                  value={reportForm.dateTime}
                  onChange={(e) => setReportForm({ ...reportForm, dateTime: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Description *</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Provide location details, fare asked, driver behavior..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                  value={reportForm.description}
                  onChange={(e) => setReportForm({ ...reportForm, description: e.target.value })}
                />
              </div>

              {/* Anonymous Checkbox */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold text-slate-800 block">Submit Anonymously</span>
                  <span className="text-xs text-slate-500">Your name will not be shared with the driver.</span>
                </div>
                <input 
                  type="checkbox" 
                  className="w-5 h-5 text-rose-600 rounded focus:ring-rose-500"
                  checked={reportForm.anonymous}
                  onChange={(e) => setReportForm({ ...reportForm, anonymous: e.target.checked })}
                />
              </div>

              {!reportForm.anonymous && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Maria Santos"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                      value={reportForm.reporterName}
                      onChange={(e) => setReportForm({ ...reportForm, reporterName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Contact Phone</label>
                    <input 
                      type="text" 
                      placeholder="0917XXXXXXX"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                      value={reportForm.contact}
                      onChange={(e) => setReportForm({ ...reportForm, contact: e.target.value })}
                    />
                  </div>
                </div>
              )}

              <button 
                type="submit"
                className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-sm shadow-md transition"
              >
                Submit Formal Incident Report
              </button>
            </form>
          </div>
        )}

        {/* ---------------- 4. DRIVER RATING & FEEDBACK SYSTEM ---------------- */}
        {activeTab === 'rate' && (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <Star className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Rate & Review TODA Driver</h2>
                <p className="text-xs text-slate-500">Provide multi-category feedback to reward good service.</p>
              </div>
            </div>

            <form onSubmit={handleRatingSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Driver Body Number *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. 042"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={ratingForm.bodyNumber}
                  onChange={(e) => setRatingForm({ ...ratingForm, bodyNumber: e.target.value })}
                />
              </div>

              {/* Multi-Criteria Ratings */}
              <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Category Ratings</h3>
                
                {[
                  { key: 'safety', label: 'Driving Safety' },
                  { key: 'professionalism', label: 'Professionalism & Courtesy' },
                  { key: 'cleanliness', label: 'Tricycle Cleanliness' },
                  { key: 'friendliness', label: 'Friendliness' },
                  { key: 'overall', label: 'Overall Service Quality' }
                ].map(({ key, label }) => (
                  <div key={key} className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-700">{label}</span>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRatingForm({ ...ratingForm, [key]: star })}
                          className="focus:outline-none"
                        >
                          <Star className={`w-5 h-5 ${star <= ratingForm[key] ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Written Review / Feedback</label>
                <textarea 
                  rows={3}
                  placeholder="Share details about your pleasant commute experience..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={ratingForm.comment}
                  onChange={(e) => setRatingForm({ ...ratingForm, comment: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Name / Identifier</label>
                <input 
                  type="text" 
                  placeholder="e.g. Student Commuter"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                  value={ratingForm.author}
                  onChange={(e) => setRatingForm({ ...ratingForm, author: e.target.value })}
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-sm shadow-md transition"
              >
                Submit Star Rating
              </button>
            </form>
          </div>
        )}

        {/* ---------------- 5. LOST AND FOUND BOARD ---------------- */}
        {activeTab === 'lostfound' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Lost and Found Board</h2>
                <p className="text-xs md:text-sm text-slate-500">Items recovered by TODA drivers inside units. Contact TODA dispatcher to claim.</p>
              </div>

              {role === 'driver' && (
                <button 
                  onClick={() => {
                    const elem = document.getElementById('lost-post-modal');
                    if (elem) elem.classList.remove('hidden');
                  }}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold flex items-center space-x-2 shadow"
                >
                  <Plus className="w-4 h-4" />
                  <span>Post Found Item</span>
                </button>
              )}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {lostItems.map(item => (
                <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between">
                  <div>
                    <img src={item.photo} alt={item.title} className="w-full h-44 object-cover" />
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                          {item.category}
                        </span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${item.status === 'Unclaimed' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                          {item.status}
                        </span>
                      </div>
                      
                      <h3 className="font-bold text-slate-900 text-base mb-1">{item.title}</h3>
                      <p className="text-xs text-slate-500 mb-3 line-clamp-2">{item.description}</p>

                      <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl">
                        <p className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" /> <b>Location:</b> {item.locationFound}</p>
                        <p className="flex items-center"><User className="w-3.5 h-3.5 mr-1 text-slate-400" /> <b>Found by Driver Body:</b> #{item.driverBody}</p>
                        <p className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1 text-slate-400" /> <b>Date:</b> {item.dateFound}</p>
                      </div>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-0">
                    <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 text-xs text-blue-900">
                      <span className="font-bold block mb-0.5">Claim Instructions:</span>
                      {item.claimInstructions}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Simple Inline Driver Lost Item Form Modal */}
            <div id="lost-post-modal" className="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
                <button 
                  onClick={() => document.getElementById('lost-post-modal').classList.add('hidden')}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
                <h3 className="font-bold text-lg text-slate-900 mb-4">Post Found Item</h3>
                <form onSubmit={(e) => { handlePostLostItem(e); document.getElementById('lost-post-modal').classList.add('hidden'); }} className="space-y-3">
                  <input type="text" placeholder="Item Name (e.g. Silver Keys)" required className="w-full px-3.5 py-2 border rounded-xl text-sm" value={lostForm.title} onChange={e => setLostForm({...lostForm, title: e.target.value})} />
                  <select className="w-full px-3.5 py-2 border rounded-xl text-sm" value={lostForm.category} onChange={e => setLostForm({...lostForm, category: e.target.value})}>
                    <option>Wallet</option><option>Phone</option><option>Tumbler</option><option>ID</option><option>Bag</option><option>Keys</option>
                  </select>
                  <input type="text" placeholder="Found Location" required className="w-full px-3.5 py-2 border rounded-xl text-sm" value={lostForm.locationFound} onChange={e => setLostForm({...lostForm, locationFound: e.target.value})} />
                  <textarea placeholder="Description..." rows={3} className="w-full px-3.5 py-2 border rounded-xl text-sm" value={lostForm.description} onChange={e => setLostForm({...lostForm, description: e.target.value})} />
                  <button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold text-sm rounded-xl">Publish Post</button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- 6. TODA ANNOUNCEMENTS SYSTEM ---------------- */}
        {activeTab === 'news' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">TODA Advisories & Community News</h2>
                <p className="text-xs md:text-sm text-slate-500">Official fare schedules, route detours, weather warnings, and assembly notices.</p>
              </div>

              {role === 'admin' && (
                <button 
                  onClick={() => {
                    const el = document.getElementById('announcement-modal');
                    if (el) el.classList.remove('hidden');
                  }}
                  className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-sm font-semibold flex items-center space-x-2 shadow"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Announcement</span>
                </button>
              )}
            </div>

            <div className="space-y-4">
              {announcements.map(ann => (
                <div key={ann.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">
                      {ann.category}
                    </span>
                    <span className="text-xs text-slate-400">{ann.date} • Published by {ann.author}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{ann.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">{ann.content}</p>

                  {ann.category === 'Fare Matrix' && (
                    <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-xs font-bold text-slate-700">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span>Official Fare Guide PDF Matrix</span>
                      </div>
                      <button 
                        onClick={() => showToast("Downloading Official 2026 Fare Schedule PDF...")}
                        className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg flex items-center space-x-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Matrix</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Announcement Modal for Admin */}
            <div id="announcement-modal" className="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
                <button 
                  onClick={() => document.getElementById('announcement-modal').classList.add('hidden')}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
                <h3 className="font-bold text-lg text-slate-900 mb-4">Post TODA Announcement</h3>
                <form onSubmit={(e) => { handlePostAnnouncement(e); document.getElementById('announcement-modal').classList.add('hidden'); }} className="space-y-4">
                  <input type="text" placeholder="Title" required className="w-full px-4 py-2 border rounded-xl text-sm" value={announcementForm.title} onChange={e => setAnnouncementForm({...announcementForm, title: e.target.value})} />
                  <select className="w-full px-4 py-2 border rounded-xl text-sm" value={announcementForm.category} onChange={e => setAnnouncementForm({...announcementForm, category: e.target.value})}>
                    <option>Fare Matrix</option><option>Route Info</option><option>Advisory</option><option>Weather Alert</option><option>TODA Meeting</option>
                  </select>
                  <textarea placeholder="Full Details..." rows={4} className="w-full px-4 py-2 border rounded-xl text-sm" value={announcementForm.content} onChange={e => setAnnouncementForm({...announcementForm, content: e.target.value})} />
                  <button type="submit" className="w-full py-3 bg-amber-600 text-white font-bold text-sm rounded-xl">Publish Announcement</button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- 7. EMERGENCY & SAFETY FEATURE ---------------- */}
        {activeTab === 'emergency' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-rose-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold">Emergency & Passenger SOS Hotline</h2>
              <p className="text-rose-100 text-xs sm:text-sm max-w-lg mx-auto">
                If you are currently experiencing an immediate threat, reckless danger, or emergency inside a tricycle, tap the SOS button below.
              </p>

              <button 
                onClick={() => setSosModalOpen(true)}
                className="px-8 py-4 bg-white hover:bg-rose-50 text-rose-600 font-extrabold rounded-2xl text-base shadow-lg transition transform active:scale-95 border-2 border-rose-200"
              >
                🚨 TRIGGER INSTANT SOS ALERT
              </button>
            </div>

            {/* Contacts Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { name: "TODA President Hotline", title: "Pres. Danilo Santos", phone: "(045) 992-1042", icon: Phone, color: "bg-blue-50 text-blue-600" },
                { name: "Barangay Police Desk", title: "Brgy. University Heights Desk", phone: "(045) 992-9111", icon: Shield, color: "bg-emerald-50 text-emerald-600" },
                { name: "City Police Station 1", title: "Traffic Management & Crime Unit", phone: "911 / 0917-111-9911", icon: AlertCircle, color: "bg-rose-50 text-rose-600" },
                { name: "UA Student Affairs Office", title: "Campus Safety & Protection Unit", phone: "(045) 888-2020", icon: HelpCircle, color: "bg-amber-50 text-amber-600" }
              ].map((c, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center space-x-4 shadow-sm">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${c.color}`}>
                    <c.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{c.name}</h4>
                    <p className="text-xs text-slate-500">{c.title}</p>
                    <a href={`tel:${c.phone}`} className="text-xs font-bold text-blue-600 mt-1 block hover:underline">
                      {c.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- 8. DRIVER DASHBOARD PORTAL ---------------- */}
        {activeTab === 'driverDash' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center space-x-4">
                <img src={INITIAL_DRIVERS[0].photo} alt="Driver Profile" className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-500 shadow-md" />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-md">
                      Body #{INITIAL_DRIVERS[0].bodyNumber}
                    </span>
                    <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">Active</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mt-1">{INITIAL_DRIVERS[0].name}</h2>
                  <p className="text-xs text-slate-500">8 Years of Service • Total Registered Trips: 12,400</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="text-center px-3 border-r border-slate-200">
                  <span className="text-xs text-slate-400 font-semibold block">Rating</span>
                  <span className="text-xl font-extrabold text-amber-500 flex items-center justify-center">
                    <Star className="w-5 h-5 fill-amber-400 mr-1" /> {INITIAL_DRIVERS[0].rating}
                  </span>
                </div>
                <div className="text-center px-3">
                  <span className="text-xs text-slate-400 font-semibold block">Total Reviews</span>
                  <span className="text-xl font-extrabold text-slate-800">{INITIAL_DRIVERS[0].ratingCount}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions for Driver */}
            <div className="grid sm:grid-cols-2 gap-4">
              <button 
                onClick={() => {
                  const el = document.getElementById('lost-post-modal');
                  if (el) el.classList.remove('hidden');
                }}
                className="p-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-md transition"
              >
                <Plus className="w-5 h-5" />
                <span>Post Item to Lost & Found</span>
              </button>

              <button 
                onClick={() => setQrPrintModalDriver(INITIAL_DRIVERS[0])}
                className="p-4 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-md transition"
              >
                <QrCode className="w-5 h-5" />
                <span>My Printable Tricycle QR Card</span>
              </button>
            </div>

            {/* Reviews Received & Complaints Section */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Reviews */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-900 text-lg flex items-center space-x-2">
                  <ThumbsUp className="w-5 h-5 text-emerald-600" />
                  <span>Commendations & Reviews ({INITIAL_DRIVERS[0].reviews.length})</span>
                </h3>
                
                <div className="space-y-3">
                  {INITIAL_DRIVERS[0].reviews.map(rev => (
                    <div key={rev.id} className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800">{rev.author}</span>
                        <span className="text-slate-400">{rev.date}</span>
                      </div>
                      <div className="flex text-amber-400">
                        {[...Array(rev.stars)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />)}
                      </div>
                      <p className="text-xs text-slate-600 pt-1">"{rev.comment}"</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Driver Complaints Desk */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-900 text-lg flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-rose-600" />
                  <span>Assigned Complaints & Inquiries</span>
                </h3>

                <div className="space-y-4">
                  {reports.filter(r => r.bodyNumber === "042").length === 0 ? (
                    <div className="p-6 text-center text-slate-400 text-xs bg-slate-50 rounded-xl border border-dashed border-slate-200">
                      Clean record! No active reports filed against Body #042.
                    </div>
                  ) : (
                    reports.filter(r => r.bodyNumber === "042").map(rep => (
                      <div key={rep.id} className="p-4 bg-rose-50/50 border border-rose-200 rounded-xl space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-rose-800">{rep.category} ({rep.id})</span>
                          <span className="px-2 py-0.5 rounded bg-rose-200 text-rose-900 font-bold">{rep.status}</span>
                        </div>
                        <p className="text-xs text-slate-700">{rep.description}</p>
                        
                        {rep.driverResponse ? (
                          <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-xs text-slate-600">
                            <b>Your Submitted Explanation:</b> "{rep.driverResponse}"
                          </div>
                        ) : (
                          <div className="space-y-2 pt-2">
                            <textarea 
                              placeholder="Write your official response / explanation..." 
                              className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                              value={driverResponseInput}
                              onChange={e => setDriverResponseInput(e.target.value)}
                            />
                            <button 
                              onClick={() => handleDriverRespondToReport(rep.id)}
                              className="px-3 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-bold"
                            >
                              Submit Explanation to TODA
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- 9. TODA ADMIN / OFFICER DASHBOARD ---------------- */}
        {activeTab === 'adminDash' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">TODA Officer Administrative Control</h2>
                <p className="text-xs md:text-sm text-slate-500">Manage driver registrations, review passenger reports, and broadcast fare matrices.</p>
              </div>

              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => showToast("Exported Monthly Performance & Complaint Summary PDF Report.")}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Generate Monthly Report</span>
                </button>
              </div>
            </div>

            {/* KPI Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-xs text-slate-400 font-semibold block">Total Active Drivers</span>
                <span className="text-2xl font-extrabold text-blue-600 mt-1 block">
                  {drivers.filter(d => d.status === 'Active').length}
                </span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-xs text-slate-400 font-semibold block">Pending Driver Approvals</span>
                <span className="text-2xl font-extrabold text-amber-600 mt-1 block">
                  {drivers.filter(d => d.status === 'Pending').length}
                </span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-xs text-slate-400 font-semibold block">Open Complaints</span>
                <span className="text-2xl font-extrabold text-rose-600 mt-1 block">
                  {reports.filter(r => r.status !== 'Resolved').length}
                </span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-xs text-slate-400 font-semibold block">Unclaimed Lost Items</span>
                <span className="text-2xl font-extrabold text-emerald-600 mt-1 block">
                  {lostItems.filter(i => i.status === 'Unclaimed').length}
                </span>
              </div>
            </div>

            {/* Driver Registration Queue */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-lg flex items-center space-x-2">
                <UserCheck className="w-5 h-5 text-amber-600" />
                <span>Pending Driver Approval Applications</span>
              </h3>

              <div className="divide-y divide-slate-100">
                {drivers.filter(d => d.status === 'Pending').length === 0 ? (
                  <p className="py-4 text-xs text-slate-400 text-center">No pending driver applications at this time.</p>
                ) : (
                  drivers.filter(d => d.status === 'Pending').map(d => (
                    <div key={d.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center space-x-3">
                        <img src={d.photo} alt={d.name} className="w-10 h-10 rounded-lg object-cover" />
                        <div>
                          <h4 className="font-bold text-sm text-slate-900">{d.name}</h4>
                          <span className="text-xs text-slate-500">Body #{d.bodyNumber} • Contact: {d.phone}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => toggleDriverApproval(d.id, 'Active')}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold"
                        >
                          Approve Driver
                        </button>
                        <button 
                          onClick={() => toggleDriverApproval(d.id, 'Inactive')}
                          className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-bold"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Complaints Resolution Table */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-lg flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-rose-600" />
                <span>Passenger Complaint Management</span>
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Ref ID</th>
                      <th className="p-3">Body #</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Reporter</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {reports.map(rep => (
                      <tr key={rep.id} className="hover:bg-slate-50/50">
                        <td className="p-3 font-mono font-bold text-slate-800">{rep.id}</td>
                        <td className="p-3 font-bold text-blue-600">#{rep.bodyNumber}</td>
                        <td className="p-3">{rep.category}</td>
                        <td className="p-3 text-slate-500">{rep.anonymous ? "Anonymous" : rep.reporterName}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded font-bold ${rep.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                            {rep.status}
                          </span>
                        </td>
                        <td className="p-3 flex items-center space-x-2">
                          <button 
                            onClick={() => updateReportStatus(rep.id, 'Resolved')}
                            className="px-2.5 py-1 bg-emerald-600 text-white rounded text-[11px] font-bold"
                          >
                            Mark Resolved
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- 10. ARCHITECTURE & BACKEND DOCS TAB ---------------- */}
        {activeTab === 'docs' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex items-center space-x-3 mb-2">
                <Code className="w-8 h-8 text-indigo-400" />
                <h2 className="text-2xl font-extrabold">Technical Specifications & Backend Architecture</h2>
              </div>
              <p className="text-indigo-200 text-xs sm:text-sm">
                Complete developer documentation including Database Schema SQL, ERD Structure, REST API Endpoints, and Folder Architecture for full production deployment.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  { key: 'sql', label: 'MySQL Schema SQL' },
                  { key: 'erd', label: 'ERD Structure' },
                  { key: 'api', label: 'RESTful API Specification' },
                  { key: 'arch', label: 'Project Directory Architecture' }
                ].map(t => (
                  <button 
                    key={t.key}
                    onClick={() => setSelectedDocTab(t.key)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition ${selectedDocTab === t.key ? 'bg-indigo-500 text-white shadow' : 'bg-slate-800/80 text-indigo-200 hover:bg-slate-800'}`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* TAB CONTENT: SQL */}
            {selectedDocTab === 'sql' && (
              <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 font-mono text-xs overflow-x-auto shadow-md border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-indigo-400 font-bold">schema.sql — MySQL Database Definition</span>
                  <button 
                    onClick={() => { navigator.clipboard.writeText("/* SQL Schema */"); showToast("SQL Schema copied to clipboard!"); }}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-xs text-slate-300"
                  >
                    Copy SQL
                  </button>
                </div>
                <pre className="text-emerald-400 leading-relaxed">
{`-- TrikeSafe Database Schema
CREATE DATABASE IF NOT EXISTS trikesafe_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE trikesafe_db;

-- 1. Drivers Table
CREATE TABLE drivers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    body_number VARCHAR(20) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    photo_url VARCHAR(255) DEFAULT NULL,
    phone_number VARCHAR(20) DEFAULT NULL,
    years_of_service INT DEFAULT 0,
    total_trips INT DEFAULT 0,
    status ENUM('Active', 'Inactive', 'Pending') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Ratings and Reviews Table
CREATE TABLE ratings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    driver_id INT NOT NULL,
    safety_score TINYINT NOT NULL CHECK (safety_score BETWEEN 1 AND 5),
    professionalism_score TINYINT NOT NULL CHECK (professionalism_score BETWEEN 1 AND 5),
    cleanliness_score TINYINT NOT NULL CHECK (cleanliness_score BETWEEN 1 AND 5),
    friendliness_score TINYINT NOT NULL CHECK (friendliness_score BETWEEN 1 AND 5),
    overall_score TINYINT NOT NULL CHECK (overall_score BETWEEN 1 AND 5),
    comment TEXT,
    author_name VARCHAR(100) DEFAULT 'Anonymous',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (driver_id) REFERENCES drivers(id) ON DELETE CASCADE
);

-- 3. Reports & Complaints Table
CREATE TABLE reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reference_code VARCHAR(30) UNIQUE NOT NULL,
    driver_body_number VARCHAR(20) NOT NULL,
    category ENUM('Overcharging Fare','Reckless Driving','Rude Behavior','Unsafe Driving','Refusing Passengers','Smoking While Driving','Vehicle Condition Issues','Other Complaints') NOT NULL,
    incident_datetime DATETIME NOT NULL,
    description TEXT NOT NULL,
    is_anonymous BOOLEAN DEFAULT TRUE,
    reporter_name VARCHAR(100) DEFAULT NULL,
    reporter_contact VARCHAR(50) DEFAULT NULL,
    driver_response TEXT DEFAULT NULL,
    status ENUM('Pending Review', 'Under Review', 'Resolved') DEFAULT 'Pending Review',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Lost & Found Items Table
CREATE TABLE lost_and_found (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    category ENUM('Wallet','Phone','Tumbler','ID','Bag','Keys','Other') NOT NULL,
    driver_body_number VARCHAR(20) NOT NULL,
    date_found DATE NOT NULL,
    location_found VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    claim_instructions TEXT NOT NULL,
    photo_url VARCHAR(255) DEFAULT NULL,
    status ENUM('Unclaimed', 'Claimed') DEFAULT 'Unclaimed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Announcements Table
CREATE TABLE announcements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    category ENUM('Fare Matrix','Route Info','Advisory','Weather Alert','TODA Meeting') NOT NULL,
    content TEXT NOT NULL,
    is_urgent BOOLEAN DEFAULT FALSE,
    author_name VARCHAR(100) DEFAULT 'TODA Executive Board',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`}
                </pre>
              </div>
            )}

            {/* TAB CONTENT: ERD */}
            {selectedDocTab === 'erd' && (
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-900 text-lg">Entity Relationship Diagram (ERD) Structure</h3>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs text-slate-700">
                  <div className="flex items-center space-x-2 font-bold text-blue-800">
                    <Database className="w-4 h-4" />
                    <span>Relational Data Structure Overview</span>
                  </div>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><b>DRIVERS (1) ——— (&lt;) RATINGS:</b> One driver can accumulate multiple multi-criteria star reviews. Ratings trigger calculated aggregate average recalculations.</li>
                    <li><b>DRIVERS (1) ——— (&lt;) REPORTS:</b> Linked via <code>body_number</code> foreign logical key. Officers can assign sanction actions and track driver response status.</li>
                    <li><b>DRIVERS (1) ——— (&lt;) LOST_AND_FOUND:</b> Drivers post recovered passenger belongings associated with their unique <code>body_number</code>.</li>
                    <li><b>USERS / ADMINS:</b> Role-based access control (RBAC) separating Public Passenger views, Driver Personal Portals, and Officer Management Dashboards.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* TAB CONTENT: API SPECIFICATION */}
            {selectedDocTab === 'api' && (
              <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 font-mono text-xs overflow-x-auto shadow-md border border-slate-800 space-y-4">
                <div className="text-indigo-400 font-bold border-b border-slate-800 pb-2">RESTful API Endpoints Specification</div>
                <div className="space-y-3 text-slate-300">
                  <p><span className="text-emerald-400 font-bold">GET</span> /api/v1/drivers - List all drivers (filterable by body number & status)</p>
                  <p><span className="text-emerald-400 font-bold">GET</span> /api/v1/drivers/:bodyNumber - Fetch full driver profile, average ratings & review feed</p>
                  <p><span className="text-blue-400 font-bold">POST</span> /api/v1/reports - Submit new incident complaint</p>
                  <p><span className="text-blue-400 font-bold">POST</span> /api/v1/ratings - Rate driver across 5 safety and service criteria</p>
                  <p><span className="text-blue-400 font-bold">POST</span> /api/v1/lost-items - Post driver recovered item</p>
                  <p><span className="text-amber-400 font-bold">PUT</span> /api/v1/admin/reports/:id/status - Update complaint resolution status</p>
                </div>
              </div>
            )}

            {/* TAB CONTENT: ARCHITECTURE */}
            {selectedDocTab === 'arch' && (
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-900 text-lg">Project Directory & File Structure</h3>
                <pre className="p-4 bg-slate-900 text-emerald-400 rounded-xl text-xs font-mono">
{`ua-toda-connect/
├── config/
│   ├── database.php          # MySQL PDO Connection
│   └── constants.php         # App Roles & Status Enums
├── public/
│   ├── index.php             # Main Routing Entry
│   ├── assets/               # CSS, JS, Images
│   └── uploads/              # Proof photos & Item images
├── src/
│   ├── Controllers/
│   │   ├── DriverController.php
│   │   ├── ReportController.php
│   │   ├── RatingController.php
│   │   ├── LostFoundController.php
│   │   └── AdminController.php
│   ├── Models/
│   │   ├── Driver.php
│   │   ├── Report.php
│   │   └── Announcement.php
│   └── Views/                # Blade or HTML Templates
└── schema.sql                # Complete DB Creation Script`}
                </pre>
              </div>
            )}
          </div>
        )}

      </main>

      {/* --- MODAL 1: QR CODE SCANNER MODAL --- */}
      {isQrScannerOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl relative">
            {/* Header */}
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Scan className="w-5 h-5 text-teal-400 animate-pulse" />
                <h3 className="font-bold text-base">Tricycle QR Code Scanner</h3>
              </div>
              <button onClick={() => setIsQrScannerOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Viewfinder Camera Simulation */}
            <div className="relative bg-slate-950 h-72 flex items-center justify-center overflow-hidden">
              {/* Animated Scan Line */}
              <div className="absolute inset-x-8 top-12 bottom-12 border-2 border-teal-400/60 rounded-2xl flex flex-col justify-between p-2 pointer-events-none">
                <div className="flex justify-between">
                  <div className="w-4 h-4 border-t-4 border-l-4 border-teal-400"></div>
                  <div className="w-4 h-4 border-t-4 border-r-4 border-teal-400"></div>
                </div>
                <div className="flex justify-between">
                  <div className="w-4 h-4 border-b-4 border-l-4 border-teal-400"></div>
                  <div className="w-4 h-4 border-b-4 border-r-4 border-teal-400"></div>
                </div>
              </div>

              {/* Scanning Laser */}
              <div className="absolute inset-x-12 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent shadow-[0_0_15px_#2dd4bf] animate-bounce"></div>

              {/* Viewfinder background element */}
              <div className="text-center p-6 space-y-2 z-10">
                <QrCode className="w-20 h-20 text-slate-700 mx-auto animate-pulse" />
                <p className="text-xs text-slate-400 font-medium">Point camera at the official TODA QR decal inside the tricycle</p>
              </div>

              {/* Flash & Mode Controls */}
              <div className="absolute top-3 right-3 z-20">
                <button 
                  onClick={() => setFlashOn(!flashOn)}
                  className={`p-2 rounded-full ${flashOn ? 'bg-amber-400 text-slate-950' : 'bg-slate-800/80 text-white'}`}
                >
                  <Zap className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Direct Quick Scan Options & File Upload */}
            <div className="p-5 space-y-4 bg-slate-50">
              <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                <span>SIMULATE DIRECT QR SCAN:</span>
                <span className="text-teal-600">Click a Body # below</span>
              </div>

              {/* Quick Scan Test Preset Buttons */}
              <div className="grid grid-cols-3 gap-2">
                {['042', '108', '015'].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleScanBodyNumber(num)}
                    className="py-2.5 px-3 bg-white hover:bg-teal-50 border border-slate-200 hover:border-teal-400 rounded-xl font-bold text-xs text-slate-800 flex items-center justify-center space-x-1.5 transition shadow-sm"
                  >
                    <QrCode className="w-3.5 h-3.5 text-teal-600" />
                    <span>Body #{num}</span>
                  </button>
                ))}
              </div>

              <div className="relative border-t border-slate-200 pt-3">
                <label className="w-full py-2.5 px-4 bg-white border border-slate-300 hover:border-slate-400 rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-center space-x-2 cursor-pointer transition shadow-sm">
                  <Upload className="w-4 h-4 text-slate-500" />
                  <span>Upload Saved QR Photo from Phone</span>
                  <input type="file" accept="image/*" onChange={handleFileUploadScan} className="hidden" />
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 2: PRINTABLE DRIVER QR CARD --- */}
      {qrPrintModalDriver && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl text-center relative border-4 border-blue-600">
            <button onClick={() => setQrPrintModalDriver(null)} className="absolute top-3 right-3 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>

            {/* Official Card Header */}
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="w-6 h-6 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">TS</div>
              <span className="font-extrabold text-sm text-slate-900 tracking-wider">TRIKESAFE OFFICIAL QR</span>
            </div>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-4">University Area Tricycle Operator Unit</p>

            {/* QR Visual Card Component */}
            <div className="bg-slate-50 p-4 rounded-2xl border-2 border-dashed border-slate-300 mb-4 inline-block">
              <div className="bg-white p-3 rounded-xl shadow-inner border border-slate-200">
                <svg className="w-44 h-44 mx-auto" viewBox="0 0 100 100">
                  {/* Outer Frame */}
                  <rect x="5" y="5" width="90" height="90" fill="none" stroke="#0f172a" strokeWidth="2" />
                  {/* QR Position Squares */}
                  <rect x="12" y="12" width="24" height="24" fill="#0f172a" />
                  <rect x="16" y="16" width="16" height="16" fill="#ffffff" />
                  <rect x="20" y="20" width="8" height="8" fill="#0f172a" />
                  
                  <rect x="64" y="12" width="24" height="24" fill="#0f172a" />
                  <rect x="68" y="16" width="16" height="16" fill="#ffffff" />
                  <rect x="72" y="20" width="8" height="8" fill="#0f172a" />

                  <rect x="12" y="64" width="24" height="24" fill="#0f172a" />
                  <rect x="16" y="68" width="16" height="16" fill="#ffffff" />
                  <rect x="20" y="72" width="8" height="8" fill="#0f172a" />

                  {/* QR Data Pattern */}
                  <rect x="42" y="14" width="6" height="6" fill="#0284c7" />
                  <rect x="50" y="22" width="6" height="6" fill="#0f172a" />
                  <rect x="42" y="32" width="16" height="6" fill="#0f172a" />
                  <rect x="14" y="44" width="6" height="14" fill="#0f172a" />
                  <rect x="26" y="44" width="12" height="6" fill="#0284c7" />
                  <rect x="44" y="44" width="14" height="14" fill="#0f172a" />
                  <rect x="64" y="44" width="8" height="14" fill="#0f172a" />
                  <rect x="78" y="44" width="8" height="8" fill="#0284c7" />
                  <rect x="44" y="64" width="8" height="8" fill="#0f172a" />
                  <rect x="58" y="64" width="14" height="6" fill="#0f172a" />
                  <rect x="76" y="64" width="10" height="22" fill="#0f172a" />

                  {/* Center Badge */}
                  <rect x="40" y="40" width="20" height="20" rx="4" fill="#0284c7" />
                  <text x="50" y="54" fontSize="10" fontWeight="bold" fill="#ffffff" textAnchor="middle">UA</text>
                </svg>
              </div>

              <div className="mt-3">
                <span className="px-3 py-1 bg-blue-600 text-white font-extrabold text-sm rounded-lg shadow-sm">
                  BODY #{qrPrintModalDriver.bodyNumber}
                </span>
                <h4 className="font-bold text-slate-900 text-sm mt-2">{qrPrintModalDriver.name}</h4>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 mb-4">
              Scan with phone camera to report concerns, rate ride, or verify driver status.
            </p>

            <div className="flex space-x-2">
              <button 
                onClick={() => { window.print(); showToast("Sent to printer!"); }}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 shadow"
              >
                <Printer className="w-4 h-4" />
                <span>Print QR Decal</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 3: DRIVER PROFILE MODAL --- */}
      {selectedDriverModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative space-y-5 my-8">
            <button onClick={() => setSelectedDriverModal(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>

            {/* Profile Header */}
            <div className="flex items-center space-x-4">
              <img src={selectedDriverModal.photo} alt={selectedDriverModal.name} className="w-20 h-20 rounded-2xl object-cover border-2 border-blue-500 shadow-md" />
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 text-xs font-bold rounded-md">
                    Body #{selectedDriverModal.bodyNumber}
                  </span>
                  <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full">
                    {selectedDriverModal.status}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-1">{selectedDriverModal.name}</h3>
                <p className="text-xs text-slate-500">{selectedDriverModal.yearsOfService} Years Service • Phone: {selectedDriverModal.phone || "N/A"}</p>
              </div>
            </div>

            {/* Ratings Breakdown Grid */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Service Evaluation Ratings</h4>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-600">Safety:</span>
                  <span className="font-bold text-amber-500">★ {selectedDriverModal.ratingsBreakdown?.safety || selectedDriverModal.rating}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Professionalism:</span>
                  <span className="font-bold text-amber-500">★ {selectedDriverModal.ratingsBreakdown?.professionalism || selectedDriverModal.rating}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Cleanliness:</span>
                  <span className="font-bold text-amber-500">★ {selectedDriverModal.ratingsBreakdown?.cleanliness || selectedDriverModal.rating}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Friendliness:</span>
                  <span className="font-bold text-amber-500">★ {selectedDriverModal.ratingsBreakdown?.friendliness || selectedDriverModal.rating}</span>
                </div>
              </div>
            </div>

            {/* Recent Passenger Reviews */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900">Commuter Feedback & Reviews ({selectedDriverModal.reviews?.length || 0})</h4>
              
              {selectedDriverModal.reviews?.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No written reviews yet.</p>
              ) : (
                selectedDriverModal.reviews?.map(r => (
                  <div key={r.id} className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 border border-slate-100">
                    <div className="flex justify-between font-bold text-slate-800">
                      <span>{r.author}</span>
                      <span className="text-amber-500">★ {r.stars}</span>
                    </div>
                    <p className="text-slate-600">"{r.comment}"</p>
                    <span className="text-[10px] text-slate-400 block text-right">{r.date}</span>
                  </div>
                ))
              )}
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button 
                onClick={() => {
                  setSelectedDriverModal(null);
                  setReportForm({ ...reportForm, bodyNumber: selectedDriverModal.bodyNumber });
                  setActiveTab('report');
                }}
                className="py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl transition"
              >
                Report Concern
              </button>
              
              <button 
                onClick={() => {
                  setSelectedDriverModal(null);
                  setRatingForm({ ...ratingForm, bodyNumber: selectedDriverModal.bodyNumber });
                  setActiveTab('rate');
                }}
                className="py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl transition shadow"
              >
                Rate This Driver
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 4: EMERGENCY SOS TRIGGER MODAL --- */}
      {sosModalOpen && (
        <div className="fixed inset-0 z-50 bg-rose-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl text-center space-y-4 relative border-4 border-rose-600">
            <button onClick={() => setSosModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>

            {!sosSuccess ? (
              <>
                <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <AlertTriangle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">Confirm Emergency Dispatch</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  This will broadcast your live simulated GPS position to the TODA Officer-in-Duty and local Barangay Patrol Desk.
                </p>

                <div className="space-y-2">
                  <button 
                    onClick={() => setSosSuccess(true)}
                    className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold rounded-xl text-sm shadow-lg transition"
                  >
                    YES, DISPATCH EMERGENCY ALERT NOW
                  </button>
                  <button 
                    onClick={() => setSosModalOpen(false)}
                    className="w-full py-2.5 bg-slate-100 text-slate-600 font-semibold rounded-xl text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">SOS Alert Active!</h3>
                <p className="text-xs text-slate-600">
                  TODA Officer Unit & Police station notified. Dispatcher phone hotline: <b>(045) 992-1042</b>. Stay in a safe area.
                </p>
                <button 
                  onClick={() => { setSosModalOpen(false); setSosSuccess(false); }}
                  className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl text-xs"
                >
                  Close & Return
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded bg-blue-600 text-white font-bold flex items-center justify-center text-xs">UA</div>
            <span className="font-bold text-white">TrikeSafe</span>
            <span>© 2026 TrikeSafe</span>
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={() => setIsQrScannerOpen(true)} className="hover:text-white transition flex items-center space-x-1">
              <Scan className="w-3.5 h-3.5 text-teal-400" />
              <span>QR Scanner</span>
            </button>
            <button onClick={() => setActiveTab('emergency')} className="hover:text-rose-400 transition">Emergency SOS</button>
            <button onClick={() => setActiveTab('news')} className="hover:text-white transition">Fare Matrix</button>
          </div>
        </div>
      </footer>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 z-40 px-2 py-1 flex justify-around items-center shadow-lg">
        <button 
          onClick={() => setActiveTab(role === 'public' ? 'home' : role === 'driver' ? 'driverDash' : 'adminDash')}
          className={`flex flex-col items-center py-1 px-3 ${['home', 'driverDash', 'adminDash'].includes(activeTab) ? 'text-blue-600' : 'text-slate-500'}`}
        >
          <Shield className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">Home</span>
        </button>

        <button 
          onClick={() => setIsQrScannerOpen(true)}
          className="flex flex-col items-center py-1 px-3 text-teal-600 font-bold"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-500 to-emerald-500 text-white flex items-center justify-center shadow-md">
            <Scan className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold mt-0.5">Scan QR</span>
        </button>

        <button 
          onClick={() => setActiveTab('directory')}
          className={`flex flex-col items-center py-1 px-3 ${activeTab === 'directory' ? 'text-blue-600' : 'text-slate-500'}`}
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">Directory</span>
        </button>

        <button 
          onClick={() => setActiveTab('report')}
          className={`flex flex-col items-center py-1 px-3 ${activeTab === 'report' ? 'text-rose-600' : 'text-slate-500'}`}
        >
          <AlertCircle className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">Report</span>
        </button>

        <button 
          onClick={() => setActiveTab('lostfound')}
          className={`flex flex-col items-center py-1 px-3 ${activeTab === 'lostfound' ? 'text-blue-600' : 'text-slate-500'}`}
        >
          <HelpCircle className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">Lost&Found</span>
        </button>
      </div>

    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
