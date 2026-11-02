import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  ExternalLink,
  MapPin,
  Maximize2,
  MessageCircle,
  Phone,
  X,
} from 'lucide-react';
import { GALLERY_PHOTOS, GalleryPhoto, HOTEL_INFO } from '../data/hotelData';

export const GalleryAndMapSection: React.FC = () => {
  const [selectedGalleryFilter, setSelectedGalleryFilter] = useState<string>('All');
  const [lightboxPhoto, setLightboxPhoto] = useState<GalleryPhoto | null>(null);

  // Contact / Direct Inquiry Form State
  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [inquiryMessage, setInquiryMessage] = useState<string>('');
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  const galleryCategories = [
    'All',
    'Exterior & Street',
    'Private Suites',
    'Social Lounge',
    'Family Rooms',
  ];

  const filteredPhotos =
    selectedGalleryFilter === 'All'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((p) => p.category === selectedGalleryFilter);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestEmail.trim() || !guestEmail.includes('@')) {
      setFormError('Please provide your full name and a valid email address.');
      return;
    }
    setFormError(null);
    setFormSubmitted(true);
  };

  return (
    <section className="py-20 bg-[#F8FAFC] border-b border-slate-200" id="gallery-map-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Photo Gallery Block */}
        <div className="mb-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#EA580C] mb-2">
                06. Visual Tour · Inside 29 Eustace Street
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1E3B] tracking-tight">
                Architectural Photo Gallery
              </h2>
              <p className="mt-2.5 text-base text-slate-600 max-w-2xl">
                Explore our Georgian brick facade in Temple Bar, private en-suite rooms, bespoke
                family suites, and ground-floor artisan cafe lounge.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white border border-slate-200 rounded-xl self-start lg:self-end">
              {galleryCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedGalleryFilter(cat)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    selectedGalleryFilter === cat
                      ? 'bg-[#0B1E3B] text-white'
                      : 'text-slate-600 hover:text-[#0B1E3B]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Asymmetric Architectural Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {filteredPhotos.map((photo, index) => {
              const spanClass =
                index === 0 || index === 3
                  ? 'md:col-span-7'
                  : 'md:col-span-5';
              return (
                <div
                  key={photo.id}
                  onClick={() => setLightboxPhoto(photo)}
                  className={`${spanClass} group relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0B1E3B] to-[#1E3A8A] border border-slate-200 cursor-pointer min-h-[280px] sm:min-h-[320px]`}
                >
                  <img
                    src={photo.image}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-lg bg-black/40 text-white flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                  <div className="absolute bottom-4 left-5 right-5 text-white">
                    <p className="text-xs text-amber-300 font-medium">{photo.category}</p>
                    <h3 className="text-lg font-bold tracking-tight mt-0.5">{photo.title}</h3>
                    <p className="text-xs text-slate-200 mt-1 line-clamp-2">{photo.caption}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Google Maps Location & Direct Reception Desk */}
        <div className="pt-16 border-t border-slate-200">
          <div className="mb-10">
            <p className="text-xs font-semibold tracking-wider text-[#EA580C] mb-2">
              Location & Directions · Cultural Quarter Dublin 2
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1E3B] tracking-tight">
              Find Us at 29 Eustace St, Temple Bar
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl">
              Ideally positioned on historic Eustace Street in Dublin 2 (Eircode: D02 F635), steps
              from Ha’penny Bridge, Dame Street, and Trinity College.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Embedded Google Map + Walking Distances (7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between">
              <div className="relative w-full h-[360px] bg-slate-100">
                <iframe
                  title="Global Hostel at Temple Bar Location Map - 29 Eustace St, Dublin 2"
                  src="https://www.google.com/maps?q=29+Eustace+St,+Temple+Bar,+Dublin+2,+D02+F635,+Ireland&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
                  <div>
                    <h3 className="text-base font-bold text-[#0B1E3B] flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#EA580C] shrink-0" />
                      {HOTEL_INFO.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">{HOTEL_INFO.fullAddress}</p>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <a
                      href={`tel:${HOTEL_INFO.phoneClean}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#0B1E3B] bg-[#F8FAFC] border border-slate-300 rounded-lg hover:border-[#0B1E3B] transition-colors whitespace-nowrap font-mono-num"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#EA580C]" />
                      {HOTEL_INFO.phoneDisplay}
                    </a>
                    <a
                      href={HOTEL_INFO.googleReviewsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#0B1E3B] rounded-lg hover:bg-[#1E3A8A] transition-colors whitespace-nowrap"
                    >
                      Open in Google Maps
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Walking Distance Landmarks */}
                <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500 block">Ha’penny Bridge</span>
                    <span className="font-bold text-[#0B1E3B] font-mono-num">2 min walk (160m)</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Dublin Castle</span>
                    <span className="font-bold text-[#0B1E3B] font-mono-num">4 min walk (300m)</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Trinity College</span>
                    <span className="font-bold text-[#0B1E3B] font-mono-num">6 min walk (480m)</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Airlink Express Stop</span>
                    <span className="font-bold text-[#0B1E3B] font-mono-num">2 min walk (Dame St)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Reception & WhatsApp Concierge Form (5 Cols) */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#0B1E3B]">
                  24/7 Reception & Group Inquiry Desk
                </h3>
                <p className="text-xs text-slate-600 mt-1 mb-6">
                  Send a direct reservation inquiry to our Eustace Street front desk or connect
                  immediately on WhatsApp at{' '}
                  <span className="font-semibold text-[#0B1E3B] font-mono-num">
                    {HOTEL_INFO.phoneDisplay}
                  </span>
                  .
                </p>

                {formSubmitted ? (
                  <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                    <div className="flex items-center gap-2 font-bold text-sm mb-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      Inquiry Received by Reception
                    </div>
                    <p className="text-xs leading-relaxed mb-4">
                      Thank you, <span className="font-semibold">{guestName}</span>. Our reservations
                      team at 29 Eustace St, Temple Bar has logged your message and will reply to{' '}
                      <span className="font-semibold">{guestEmail}</span> shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setFormSubmitted(false);
                        setGuestName('');
                        setGuestEmail('');
                        setGuestPhone('');
                        setInquiryMessage('');
                      }}
                      className="px-4 py-2 text-xs font-semibold text-white bg-[#0B1E3B] rounded-lg cursor-pointer"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-semibold text-[#0B1E3B] mb-1"
                      >
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="e.g. Siobhán Murphy"
                        className="w-full px-3.5 py-2.5 text-xs bg-[#F8FAFC] border border-slate-300 rounded-lg text-[#0B1E3B] focus:outline-none focus:border-[#1E3A8A]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-xs font-semibold text-[#0B1E3B] mb-1"
                        >
                          Email Address *
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                          placeholder="guest@example.com"
                          className="w-full px-3.5 py-2.5 text-xs bg-[#F8FAFC] border border-slate-300 rounded-lg text-[#0B1E3B] focus:outline-none focus:border-[#1E3A8A]"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="contact-phone"
                          className="block text-xs font-semibold text-[#0B1E3B] mb-1"
                        >
                          Phone / WhatsApp
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          value={guestPhone}
                          onChange={(e) => setGuestPhone(e.target.value)}
                          placeholder="+353 ..."
                          className="w-full px-3.5 py-2.5 text-xs bg-[#F8FAFC] border border-slate-300 rounded-lg text-[#0B1E3B] focus:outline-none focus:border-[#1E3A8A] font-mono-num"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-semibold text-[#0B1E3B] mb-1"
                      >
                        Dates, Room Preference or Question
                      </label>
                      <textarea
                        id="contact-message"
                        rows={3}
                        value={inquiryMessage}
                        onChange={(e) => setInquiryMessage(e.target.value)}
                        placeholder="Tell us your preferred check-in dates, number of guests, or package choice..."
                        className="w-full px-3.5 py-2 text-xs bg-[#F8FAFC] border border-slate-300 rounded-lg text-[#0B1E3B] focus:outline-none focus:border-[#1E3A8A]"
                      />
                    </div>

                    {formError && (
                      <p className="text-xs text-red-600 font-medium">{formError}</p>
                    )}

                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#EA580C] rounded-lg hover:bg-[#D94E06] transition-colors cursor-pointer"
                    >
                      Send Direct Reservation Inquiry
                    </button>
                  </form>
                )}
              </div>

              <div className="mt-6 pt-5 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="text-xs text-slate-600 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#1E3A8A]" />
                  <span>Check-in 15:00 · Check-out 11:00</span>
                </div>
                <a
                  href={`https://wa.me/${HOTEL_INFO.whatsappNumber}?text=${encodeURIComponent(
                    'Hello Global Hostel at Temple Bar (29 Eustace St, Dublin 2), I would like to book a stay.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:underline"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  Instant WhatsApp Booking
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Lightbox Modal */}
        {lightboxPhoto && (
          <div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setLightboxPhoto(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden border border-slate-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-16/9 bg-[#0B1E3B]">
                <img
                  src={lightboxPhoto.image}
                  alt={lightboxPhoto.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setLightboxPhoto(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black cursor-pointer"
                  aria-label="Close photo preview"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-[#EA580C]">{lightboxPhoto.category}</p>
                  <h3 className="text-lg font-bold text-[#0B1E3B] mt-0.5">{lightboxPhoto.title}</h3>
                  <p className="text-xs text-slate-600 mt-1">{lightboxPhoto.caption}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxPhoto(null)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#0B1E3B] rounded-lg shrink-0 cursor-pointer"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
