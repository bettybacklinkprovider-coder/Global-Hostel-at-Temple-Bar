import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Copy,
  FileText,
  MapPin,
  MessageCircle,
  Phone,
  Star,
  X,
} from 'lucide-react';
import {
  HOTEL_INFO,
  IMAGES,
  MASTER_AI_PROMPT_TEXT,
  OfferPackage,
  ROOMS_DATA,
  RoomItem,
  SPECIAL_OFFERS_DATA,
} from './data/hotelData';
import { RoomsSection } from './components/RoomsSection';
import { SpecialOffersSection } from './components/SpecialOffersSection';
import { FacilitiesSection } from './components/FacilitiesSection';
import { CustomerReviewsSection } from './components/CustomerReviewsSection';
import { GalleryAndMapSection } from './components/GalleryAndMapSection';

type PageKey = 'home' | 'rooms' | 'offers' | 'reviews-contact';

interface BookingDraft {
  title: string;
  subtitle: string;
  pricePerUnit: number;
  unitLabel: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  code?: string;
}

export default function App() {
  const [activePage, setActivePage] = useState<PageKey>('home');

  // Hero Instant Booking Bar State
  const [heroCheckIn, setHeroCheckIn] = useState<string>('2026-11-06');
  const [heroCheckOut, setHeroCheckOut] = useState<string>('2026-11-08');
  const [heroGuests, setHeroGuests] = useState<number>(2);
  const [heroRoomId, setHeroRoomId] = useState<string>(ROOMS_DATA[0].id);

  // Editable Review URLs State (persisted in state so owner can update anytime)
  const [googleReviewsUrl, setGoogleReviewsUrl] = useState<string>(
    HOTEL_INFO.googleReviewsUrl
  );
  const [trustpilotUrl, setTrustpilotUrl] = useState<string>(
    HOTEL_INFO.trustpilotUrl
  );

  // Interactive Booking Modal State
  const [bookingModalData, setBookingModalData] = useState<BookingDraft | null>(null);
  const [guestFullName, setGuestFullName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);

  // Master Prompt Drawer State (so user can also copy the 4-page / 6-section prompt in 1 click)
  const [showPromptDrawer, setShowPromptDrawer] = useState<boolean>(false);
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);

  // Scroll to top when switching between the 4 distinct pages
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  const handleOpenRoomBooking = (room: RoomItem) => {
    setBookingConfirmed(false);
    setBookingModalData({
      title: room.name,
      subtitle: `${room.category} · ${room.bedConfiguration}`,
      pricePerUnit: room.pricePerNight,
      unitLabel: 'per night',
      checkIn: heroCheckIn,
      checkOut: heroCheckOut,
      guests: Math.min(heroGuests, room.maxGuests),
    });
  };

  const handleOpenOfferBooking = (
    offer: OfferPackage,
    checkIn = heroCheckIn,
    checkOut = heroCheckOut,
    guests = heroGuests
  ) => {
    setBookingConfirmed(false);
    setBookingModalData({
      title: offer.title,
      subtitle: `${offer.packageType} · ${offer.discountPercent}% Off Verified Package`,
      pricePerUnit: offer.discountedPrice,
      unitLabel: offer.priceUnit,
      checkIn,
      checkOut,
      guests,
      code: offer.code,
    });
  };

  const handleHeroQuickBook = (e: React.FormEvent) => {
    e.preventDefault();
    const chosenRoom =
      ROOMS_DATA.find((r) => r.id === heroRoomId) || ROOMS_DATA[0];
    handleOpenRoomBooking(chosenRoom);
  };

  const handleConfirmDirectBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestFullName.trim() || !guestEmail.trim()) return;
    setBookingConfirmed(true);
  };

  const handleCopyMasterPrompt = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(MASTER_AI_PROMPT_TEXT);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0B1E3B]">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 py-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              setActivePage('home');
            }}
            className="text-lg sm:text-xl font-bold tracking-tight text-[#0B1E3B] font-display whitespace-nowrap shrink-0"
          >
            {HOTEL_INFO.name}
          </a>

          {/* Zone 2: 4 Clean Single-Line Text Navigation Links (4 Separate Pages) */}
          <nav
            className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600"
            aria-label="Primary Page Navigation"
          >
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                setActivePage('home');
              }}
              className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activePage === 'home'
                  ? 'text-[#0B1E3B] border-[#EA580C]'
                  : 'border-transparent hover:text-[#0B1E3B]'
              }`}
            >
              Home
            </a>
            <a
              href="#rooms"
              onClick={(e) => {
                e.preventDefault();
                setActivePage('rooms');
              }}
              className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activePage === 'rooms'
                  ? 'text-[#0B1E3B] border-[#EA580C]'
                  : 'border-transparent hover:text-[#0B1E3B]'
              }`}
            >
              Rooms & Suites
            </a>
            <a
              href="#offers"
              onClick={(e) => {
                e.preventDefault();
                setActivePage('offers');
              }}
              className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activePage === 'offers'
                  ? 'text-[#0B1E3B] border-[#EA580C]'
                  : 'border-transparent hover:text-[#0B1E3B]'
              }`}
            >
              Exclusive Offers
            </a>
            <a
              href="#reviews-contact"
              onClick={(e) => {
                e.preventDefault();
                setActivePage('reviews-contact');
              }}
              className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activePage === 'reviews-contact'
                  ? 'text-[#0B1E3B] border-[#EA580C]'
                  : 'border-transparent hover:text-[#0B1E3B]'
              }`}
            >
              Reviews & Location
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => handleOpenRoomBooking(ROOMS_DATA[0])}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#EA580C] rounded-lg hover:bg-[#D94E06] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Book Direct
            </button>
          </div>
        </div>

        {/* Mobile 4-Page Switcher Bar */}
        <div className="md:hidden border-t border-slate-200 px-4 py-2 bg-[#F8FAFC] flex items-center justify-between gap-2 overflow-x-auto">
          {(
            [
              { id: 'home', label: '1. Home (6 Sections)' },
              { id: 'rooms', label: '2. Rooms' },
              { id: 'offers', label: '3. Offers' },
              { id: 'reviews-contact', label: '4. Reviews & Map' },
            ] as { id: PageKey; label: string }[]
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActivePage(tab.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 ${
                activePage === tab.id
                  ? 'bg-[#0B1E3B] text-white'
                  : 'text-slate-600 bg-white border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* =====================================================================
          PAGE 1: HOME (LANDING PAGE WITH 6 DISTINCT SECTIONS)
      ===================================================================== */}
      {activePage === 'home' && (
        <main className="flex-1">
          {/* SECTION 1 OF 6: HERO SHOWCASE & INSTANT BOOKING BAR */}
          <section className="relative bg-[#0B1E3B] text-white border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
                {/* Left Column: Editorial Value Proposition (7 Cols) */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    {/* Unboxed Regional / Address Metadata Line */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-amber-300 font-medium mb-4">
                      <span>29 Eustace St, Temple Bar</span>
                      <span aria-hidden="true">·</span>
                      <span>Dublin 2, D02 F635, Ireland</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-num">{HOTEL_INFO.phoneDisplay}</span>
                    </div>

                    <h1
                      className="font-bold tracking-tight text-white leading-[1.12]"
                      style={{ fontSize: 'clamp(2.25rem, 4vw, 3.75rem)' }}
                    >
                      Georgian Character Meets Modern Luxury in Temple Bar.
                    </h1>

                    <p className="mt-5 text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
                      Welcome to <strong className="text-white font-semibold">Global Hostel at Temple Bar</strong>.
                      Experience bespoke private king en-suites, family suites, and architectural
                      luxury pods right on historic Eustace Street—steps from Dublin Castle and
                      Ha’penny Bridge.
                    </p>
                  </div>

                  {/* Primary Action + Direct WhatsApp Concierge */}
                  <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => handleOpenRoomBooking(ROOMS_DATA[0])}
                      className="px-6 py-3 text-sm font-semibold text-white bg-[#EA580C] rounded-xl hover:bg-[#D94E06] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Reserve Direct & Save 15%
                    </button>

                    <a
                      href={`https://wa.me/${HOTEL_INFO.whatsappNumber}?text=${encodeURIComponent(
                        'Hello Global Hostel at Temple Bar (+353 1 677 9158), I would like to check room availability at 29 Eustace St, Dublin 2.'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-white/10 border border-white/20 rounded-xl hover:bg-white/15 transition-colors whitespace-nowrap shrink-0"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-400" />
                      WhatsApp Desk ({HOTEL_INFO.phoneDisplay})
                    </a>
                  </div>
                </div>

                {/* Right Column: Hero Architectural Image Card (5 Cols) */}
                <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-br from-[#1E3A8A] to-[#0B1E3B] min-h-[320px]">
                  <img
                    src={IMAGES.heroExterior}
                    alt="Global Hostel at Temple Bar exterior on 29 Eustace Street, Dublin 2"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E3B]/90 via-black/20 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs text-amber-300 font-semibold">
                        Verified Property · Eircode D02 F635
                      </p>
                      <p className="text-base font-bold mt-0.5">
                        29 Eustace St, Cultural Quarter, Dublin
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="inline-flex items-center gap-1 text-amber-400 text-xs font-bold font-mono-num">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        4.9 / 5.0
                      </div>
                      <span className="block text-[11px] text-slate-300 font-mono-num">
                        420 Verified Reviews
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Full-Width 4-Column Instant Availability & Booking Strip Below Hero Split */}
              <form
                onSubmit={handleHeroQuickBook}
                className="mt-10 p-5 sm:p-6 rounded-2xl bg-white text-[#0B1E3B] border border-slate-200 shadow-lg"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                  <div>
                    <label
                      htmlFor="hero-room-select"
                      className="block text-xs font-semibold text-[#0B1E3B] mb-1.5"
                    >
                      Select Room or Suite
                    </label>
                    <select
                      id="hero-room-select"
                      value={heroRoomId}
                      onChange={(e) => setHeroRoomId(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs font-medium bg-[#F8FAFC] border border-slate-300 rounded-lg text-[#0B1E3B] focus:outline-none focus:border-[#1E3A8A]"
                    >
                      {ROOMS_DATA.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.name} (€{r.pricePerNight}/night)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="hero-checkin"
                      className="block text-xs font-semibold text-[#0B1E3B] mb-1.5"
                    >
                      Check-In Date
                    </label>
                    <input
                      id="hero-checkin"
                      type="date"
                      value={heroCheckIn}
                      onChange={(e) => setHeroCheckIn(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-slate-300 rounded-lg text-[#0B1E3B] font-mono-num focus:outline-none focus:border-[#1E3A8A]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="hero-checkout"
                      className="block text-xs font-semibold text-[#0B1E3B] mb-1.5"
                    >
                      Check-Out Date
                    </label>
                    <input
                      id="hero-checkout"
                      type="date"
                      value={heroCheckOut}
                      min={heroCheckIn}
                      onChange={(e) => setHeroCheckOut(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-slate-300 rounded-lg text-[#0B1E3B] font-mono-num focus:outline-none focus:border-[#1E3A8A]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="hero-guests"
                      className="block text-xs font-semibold text-[#0B1E3B] mb-1.5"
                    >
                      Guests
                    </label>
                    <select
                      id="hero-guests"
                      value={heroGuests}
                      onChange={(e) => setHeroGuests(Number(e.target.value))}
                      className="w-full px-3 py-2.5 text-xs bg-[#F8FAFC] border border-slate-300 rounded-lg text-[#0B1E3B] focus:outline-none focus:border-[#1E3A8A]"
                    >
                      {[1, 2, 3, 4, 5, 6].map((g) => (
                        <option key={g} value={g}>
                          {g} {g === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#EA580C] rounded-lg hover:bg-[#D94E06] transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Check Rate & Reserve
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </section>

          {/* SECTION 2 OF 6: LUXURY ROOMS & SUITES SHOWCASE */}
          <RoomsSection
            onSelectRoomForBooking={handleOpenRoomBooking}
            onNavigateToRoomsPage={() => setActivePage('rooms')}
          />

          {/* SECTION 3 OF 6: EXCLUSIVE OFFERS & PACKAGES */}
          <SpecialOffersSection onSelectOfferForBooking={handleOpenOfferBooking} />

          {/* SECTION 4 OF 6: TEMPLE BAR FACILITIES & AMENITIES */}
          <FacilitiesSection />

          {/* SECTION 5 OF 6: CUSTOMER REVIEWS & RATINGS + WHAT OUR CLIENTS SAY */}
          <CustomerReviewsSection
            googleReviewsUrl={googleReviewsUrl}
            trustpilotUrl={trustpilotUrl}
            onUpdateReviewUrls={(gUrl, tUrl) => {
              setGoogleReviewsUrl(gUrl);
              setTrustpilotUrl(tUrl);
            }}
          />

          {/* SECTION 6 OF 6: PHOTO GALLERY & GOOGLE MAPS LOCATION */}
          <GalleryAndMapSection />
        </main>
      )}

      {/* =====================================================================
          PAGE 2: DEDICATED ROOMS & SUITES PAGE (/rooms)
      ===================================================================== */}
      {activePage === 'rooms' && (
        <main className="flex-1">
          <div className="bg-[#0B1E3B] text-white py-14 border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-xs font-semibold text-amber-300 mb-2">
                Page 2 of 4 · Accommodation Directory · 29 Eustace St, Temple Bar
              </p>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
                Private Georgian Suites & Luxury Pods
              </h1>
              <p className="mt-3 text-base text-slate-300 max-w-2xl">
                Compare room sizes, bedding configurations, and nightly direct rates at Global
                Hostel at Temple Bar. Call reception directly on{' '}
                <span className="text-white font-mono-num font-semibold">
                  {HOTEL_INFO.phoneDisplay}
                </span>{' '}
                or book via WhatsApp.
              </p>
            </div>
          </div>

          <RoomsSection
            onSelectRoomForBooking={handleOpenRoomBooking}
            showAllDetails={true}
          />
          <FacilitiesSection />
        </main>
      )}

      {/* =====================================================================
          PAGE 3: DEDICATED EXCLUSIVE OFFERS & PACKAGES PAGE (/offers)
      ===================================================================== */}
      {activePage === 'offers' && (
        <main className="flex-1">
          <div className="bg-[#0B1E3B] text-white py-14 border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-xs font-semibold text-amber-300 mb-2">
                Page 3 of 4 · Special Offers & Packages · Dublin 2, D02 F635
              </p>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
                Exclusive Offers & Seasonal Packages
              </h1>
              <p className="mt-3 text-base text-slate-300 max-w-2xl">
                Book direct with Global Hostel at Temple Bar for verified weekend getaways,
                multi-night extended stays, family packages, and corporate weekday rates.
              </p>
            </div>
          </div>

          <SpecialOffersSection onSelectOfferForBooking={handleOpenOfferBooking} />
        </main>
      )}

      {/* =====================================================================
          PAGE 4: DEDICATED REVIEWS, GALLERY & LOCATION PAGE (/reviews-contact)
      ===================================================================== */}
      {activePage === 'reviews-contact' && (
        <main className="flex-1">
          <div className="bg-[#0B1E3B] text-white py-14 border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-xs font-semibold text-amber-300 mb-2">
                Page 4 of 4 · Verified Reviews, Photo Gallery & Directions
              </p>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
                Guest Reviews, Gallery & Temple Bar Map
              </h1>
              <p className="mt-3 text-base text-slate-300 max-w-2xl">
                Read verified Google and Trustpilot reviews, scan our live review QR code, tour the
                property at 29 Eustace St, Temple Bar, Dublin 2, D02 F635, or message our 24/7
                reception desk.
              </p>
            </div>
          </div>

          <CustomerReviewsSection
            googleReviewsUrl={googleReviewsUrl}
            trustpilotUrl={trustpilotUrl}
            onUpdateReviewUrls={(gUrl, tUrl) => {
              setGoogleReviewsUrl(gUrl);
              setTrustpilotUrl(tUrl);
            }}
          />
          <GalleryAndMapSection />
        </main>
      )}

      {/* =====================================================================
          QUIET EDITORIAL FOOTER (WITH 4-PAGE NAVIGATION & PROMPT STUDIO TRIGGER)
      ===================================================================== */}
      <footer className="bg-[#0B1E3B] text-slate-300 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-10 border-b border-white/10">
            {/* Brand & Address Column (5 Cols) */}
            <div className="lg:col-span-5">
              <span className="text-xl font-bold text-white font-display tracking-tight block">
                {HOTEL_INFO.name}
              </span>
              <p className="mt-3 text-xs text-slate-300 leading-relaxed max-w-sm">
                Boutique private suites, family chambers, and luxury pods in the heart of Dublin’s
                Cultural Quarter.
              </p>
              <div className="mt-4 space-y-1.5 text-xs text-slate-300">
                <p className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#EA580C] shrink-0" />
                  <span>{HOTEL_INFO.fullAddress}</span>
                </p>
                <p className="flex items-center gap-2 font-mono-num">
                  <Phone className="w-3.5 h-3.5 text-[#EA580C] shrink-0" />
                  <a href={`tel:${HOTEL_INFO.phoneClean}`} className="hover:text-white">
                    {HOTEL_INFO.phoneDisplay}
                  </a>
                </p>
              </div>
            </div>

            {/* 4-Page Directory Links (3 Cols) */}
            <div className="lg:col-span-3">
              <h3 className="text-xs font-bold text-white tracking-wider mb-3">
                4-Page Website Directory
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => setActivePage('home')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Page 1: Home (6 Sections)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActivePage('rooms')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Page 2: Rooms & Suites
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActivePage('offers')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Page 3: Exclusive Offers & Packages
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActivePage('reviews-contact')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Page 4: Reviews, Gallery & Map
                  </button>
                </li>
              </ul>
            </div>

            {/* Direct Actions & Prompt Copy Utility (4 Cols) */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold text-white tracking-wider mb-3">
                  Direct Reservations & Builder Prompt
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Book directly on WhatsApp or open the Prompt Studio to copy the structured 4-page,
                  6-section AI builder prompt for this website.
                </p>
                <div className="flex flex-wrap items-center gap-2.5">
                  <a
                    href={`https://wa.me/${HOTEL_INFO.whatsappNumber}?text=${encodeURIComponent(
                      'Hello Global Hostel at Temple Bar (+353 1 677 9158), I would like to make a direct booking at 29 Eustace St, Dublin 2.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#EA580C] rounded-lg hover:bg-[#D94E06] transition-colors whitespace-nowrap shrink-0"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    WhatsApp Booking
                  </a>

                  <button
                    type="button"
                    onClick={() => setShowPromptDrawer(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-white/10 border border-white/20 rounded-lg hover:bg-white/15 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-300" />
                    Copy 4-Page Master Prompt
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>
              © {new Date().getFullYear()} {HOTEL_INFO.name} · {HOTEL_INFO.fullAddress}
            </p>
            <p className="font-mono-num">
              Direct Desk: {HOTEL_INFO.phoneDisplay} · Eircode: D02 F635
            </p>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          INTERACTIVE DIRECT BOOKING & WHATSAPP MODAL
      ===================================================================== */}
      {bookingModalData && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setBookingModalData(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 text-[#0B1E3B]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <p className="text-xs font-semibold text-[#EA580C]">
                  Direct Reservation · {HOTEL_INFO.name}
                </p>
                <h3 className="text-xl font-bold text-[#0B1E3B] mt-0.5">
                  {bookingModalData.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{bookingModalData.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setBookingModalData(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
                aria-label="Close reservation modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {bookingConfirmed ? (
              <div className="py-6">
                <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 mb-5">
                  <div className="flex items-center gap-2 font-bold text-sm mb-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    Direct Booking Reference Confirmed
                  </div>
                  <p className="text-xs leading-relaxed">
                    Thank you, <strong>{guestFullName}</strong>! Your provisional reservation for{' '}
                    <strong>{bookingModalData.title}</strong> ({bookingModalData.checkIn} to{' '}
                    {bookingModalData.checkOut}, {bookingModalData.guests} guest(s)) at{' '}
                    <strong>29 Eustace St, Temple Bar, Dublin 2</strong> is registered.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <a
                    href={`https://wa.me/${HOTEL_INFO.whatsappNumber}?text=${encodeURIComponent(
                      `Hello Global Hostel at Temple Bar, I just booked "${bookingModalData.title}" under ${guestFullName} (${bookingModalData.checkIn} to ${bookingModalData.checkOut}). Please confirm my arrival time.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Send Confirmation via WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => setBookingModalData(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleConfirmDirectBooking} className="mt-5 space-y-4">
                <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 block">Selected Rate</span>
                    <span className="text-xl font-bold text-[#0B1E3B] font-mono-num">
                      €{bookingModalData.pricePerUnit}
                    </span>{' '}
                    <span className="text-xs text-slate-500">{bookingModalData.unitLabel}</span>
                  </div>
                  {bookingModalData.code && (
                    <span className="text-xs font-mono-num font-semibold text-[#EA580C]">
                      Code: {bookingModalData.code}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#0B1E3B] mb-1">
                      Check-In
                    </label>
                    <input
                      type="date"
                      value={bookingModalData.checkIn}
                      onChange={(e) =>
                        setBookingModalData({ ...bookingModalData, checkIn: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-slate-300 rounded-lg font-mono-num"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0B1E3B] mb-1">
                      Check-Out
                    </label>
                    <input
                      type="date"
                      value={bookingModalData.checkOut}
                      onChange={(e) =>
                        setBookingModalData({ ...bookingModalData, checkOut: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-slate-300 rounded-lg font-mono-num"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0B1E3B] mb-1">
                    Guest Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={guestFullName}
                    onChange={(e) => setGuestFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-3.5 py-2 text-xs bg-[#F8FAFC] border border-slate-300 rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#0B1E3B] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-3.5 py-2 text-xs bg-[#F8FAFC] border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0B1E3B] mb-1">
                      WhatsApp / Phone
                    </label>
                    <input
                      type="tel"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="+353 ..."
                      className="w-full px-3.5 py-2 text-xs bg-[#F8FAFC] border border-slate-300 rounded-lg font-mono-num"
                    />
                  </div>
                </div>

                <div className="pt-3 flex flex-wrap items-center justify-end gap-2.5">
                  <a
                    href={`https://wa.me/${HOTEL_INFO.whatsappNumber}?text=${encodeURIComponent(
                      `Hello Global Hostel at Temple Bar (${HOTEL_INFO.phoneDisplay}), I would like to book "${bookingModalData.title}" (€${bookingModalData.pricePerUnit} ${bookingModalData.unitLabel}) from ${bookingModalData.checkIn} to ${bookingModalData.checkOut} for ${bookingModalData.guests} guest(s).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#0B1E3B] bg-[#F8FAFC] border border-slate-300 rounded-lg hover:border-[#0B1E3B]"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    Book via WhatsApp Instead
                  </a>
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-[#EA580C] rounded-lg hover:bg-[#D94E06] cursor-pointer"
                  >
                    Complete Direct Reservation
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          MASTER AI BUILDER PROMPT COPY MODAL
      ===================================================================== */}
      {showPromptDrawer && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setShowPromptDrawer(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 border border-slate-200 text-[#0B1E3B]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-lg font-bold text-[#0B1E3B]">
                  4-Page & 6-Section Master Website Prompt (Blue & Orange)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Ready-to-paste prompt for Global Hostel at Temple Bar (+353 1 677 9158 · 29
                  Eustace St, Temple Bar, Dublin 2, D02 F635, Ireland)
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowPromptDrawer(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <pre className="mt-4 p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 text-xs text-slate-700 whitespace-pre-wrap max-h-[340px] overflow-y-auto font-mono">
              {MASTER_AI_PROMPT_TEXT}
            </pre>

            <div className="mt-5 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowPromptDrawer(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleCopyMasterPrompt}
                className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-[#EA580C] rounded-lg hover:bg-[#D94E06] cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                {copiedPrompt ? '✓ Copied to Clipboard!' : 'Copy Full Prompt'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
