import React, { useState } from 'react';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  QrCode,
  Quote,
  Settings2,
  Star,
} from 'lucide-react';
import {
  CLIENT_TESTIMONIALS,
  HOTEL_INFO,
  RATING_BREAKDOWN,
} from '../data/hotelData';
import { QrCodeSvg } from './QrCodeSvg';

interface CustomerReviewsSectionProps {
  googleReviewsUrl: string;
  trustpilotUrl: string;
  onUpdateReviewUrls: (newGoogleUrl: string, newTrustpilotUrl: string) => void;
}

export const CustomerReviewsSection: React.FC<CustomerReviewsSectionProps> = ({
  googleReviewsUrl,
  trustpilotUrl,
  onUpdateReviewUrls,
}) => {
  const [activeQrTarget, setActiveQrTarget] = useState<'google' | 'trustpilot'>('google');
  const [showLinkEditor, setShowLinkEditor] = useState<boolean>(false);
  const [draftGoogleUrl, setDraftGoogleUrl] = useState<string>(googleReviewsUrl);
  const [draftTrustpilotUrl, setDraftTrustpilotUrl] = useState<string>(trustpilotUrl);
  const [activeSlidePage, setActiveSlidePage] = useState<number>(0);
  const [selectedServiceFilter, setSelectedServiceFilter] = useState<string>('All');
  const [copiedQrLink, setCopiedQrLink] = useState<boolean>(false);

  const currentQrUrl = activeQrTarget === 'google' ? googleReviewsUrl : trustpilotUrl;

  const handleSaveLinks = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateReviewUrls(
      draftGoogleUrl.trim() || HOTEL_INFO.googleReviewsUrl,
      draftTrustpilotUrl.trim() || HOTEL_INFO.trustpilotUrl
    );
    setShowLinkEditor(false);
  };

  const handleCopyQrLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentQrUrl);
      setCopiedQrLink(true);
      setTimeout(() => setCopiedQrLink(false), 2000);
    }
  };

  const categories = [
    'All',
    'Boutique Suites & Hospitality',
    'React Development & Custom Web Experience',
    'Direct Booking & E-Commerce Optimization',
    'Logo Design, Brand Identity & Interiors',
    'SEO, Local Discovery & Guest Experience',
    'Social Media Content & Visual Production',
  ];

  const filteredTestimonials =
    selectedServiceFilter === 'All'
      ? CLIENT_TESTIMONIALS
      : CLIENT_TESTIMONIALS.filter((t) => t.serviceCategory === selectedServiceFilter);

  const totalPages = Math.max(1, Math.ceil(filteredTestimonials.length / 3));

  const handlePrevSlide = () => {
    setActiveSlidePage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNextSlide = () => {
    setActiveSlidePage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  return (
    <section className="py-20 bg-white border-b border-slate-200" id="reviews-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* PART 1: Customer Reviews & Ratings Dashboard (Reference Image Inspired) */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#EA580C] mb-2">
                04. Verified Guest Ratings · 29 Eustace St, Temple Bar
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1E3B] tracking-tight">
                Customer Reviews & Ratings
              </h2>
              <p className="mt-2 text-sm text-slate-600 max-w-2xl">
                Transparent rating breakdown across verified platforms. Scan the live QR code or
                click below to view or submit your review for Global Hostel at Temple Bar.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowLinkEditor(!showLinkEditor)}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#0B1E3B] bg-[#F8FAFC] border border-slate-300 rounded-lg hover:border-[#0B1E3B] transition-colors whitespace-nowrap shrink-0 self-start sm:self-end cursor-pointer"
            >
              <Settings2 className="w-3.5 h-3.5 text-[#EA580C]" />
              {showLinkEditor ? 'Hide Review URL Settings' : 'Configure Google & Trustpilot Links'}
            </button>
          </div>

          {/* Editable Google Reviews & Trustpilot URL Drawer */}
          {showLinkEditor && (
            <form
              onSubmit={handleSaveLinks}
              className="mb-8 p-6 rounded-2xl bg-[#F8FAFC] border border-slate-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-[#0B1E3B]">
                    Configure Live Review Links & QR Code Target
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Paste your official Google Business Profile review link and Trustpilot profile
                    link below. The “See Reviews” buttons and “Review Us!” QR code update
                    immediately.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="google-review-url-input"
                    className="block text-xs font-semibold text-[#0B1E3B] mb-1"
                  >
                    Google Reviews Page URL
                  </label>
                  <input
                    id="google-review-url-input"
                    type="url"
                    value={draftGoogleUrl}
                    onChange={(e) => setDraftGoogleUrl(e.target.value)}
                    placeholder="https://g.page/r/..."
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-[#0B1E3B] focus:outline-none focus:border-[#1E3A8A]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="trustpilot-review-url-input"
                    className="block text-xs font-semibold text-[#0B1E3B] mb-1"
                  >
                    Trustpilot Review Page URL
                  </label>
                  <input
                    id="trustpilot-review-url-input"
                    type="url"
                    value={draftTrustpilotUrl}
                    onChange={(e) => setDraftTrustpilotUrl(e.target.value)}
                    placeholder="https://www.trustpilot.com/review/..."
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-[#0B1E3B] focus:outline-none focus:border-[#1E3A8A]"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowLinkEditor(false)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-[#EA580C] rounded-lg hover:bg-[#D94E06] cursor-pointer"
                >
                  Save & Regenerate QR Code
                </button>
              </div>
            </form>
          )}

          {/* Reference-Style 3-Column Ratings & QR Code Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Column 1: Overall Rating & 5-to-1 Star Breakdown Card (5 Cols) */}
            <div className="lg:col-span-5 bg-[#F8FAFC] rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-[#0B1E3B] mb-4">
                  Overall Customer Rating
                </h3>
                <div className="flex items-center gap-5 pb-6 border-b border-slate-200">
                  <div className="text-5xl font-bold text-[#0B1E3B] font-mono-num tracking-tight">
                    4.9
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-amber-400 mb-1" aria-label="4.9 out of 5 stars">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-600">
                      Based on <span className="font-semibold text-[#0B1E3B] font-mono-num">420</span>{' '}
                      verified guest reviews
                    </p>
                  </div>
                </div>

                {/* 5-Star to 1-Star Breakdown Bars */}
                <div className="mt-6 space-y-3">
                  {RATING_BREAKDOWN.map((row) => (
                    <div key={row.stars} className="flex items-center gap-3 text-xs">
                      <span className="w-12 font-semibold text-[#0B1E3B] font-mono-num shrink-0 flex items-center gap-1">
                        {row.stars} <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      </span>
                      <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#EA580C] rounded-full transition-all duration-300"
                          style={{ width: `${row.percentage}%` }}
                        />
                      </div>
                      <span className="w-10 text-right font-mono-num text-slate-600 shrink-0">
                        {row.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <span>Property: Global Hostel at Temple Bar</span>
                <span className="font-mono-num">Dublin 2 · D02 F635</span>
              </div>
            </div>

            {/* Column 2: Separate Google Reviews & Trustpilot Platform Cards (4 Cols) */}
            <div className="lg:col-span-4 flex flex-col gap-6 justify-between">
              {/* Google Reviews Card */}
              <div className="flex-1 bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5 hover:border-[#1E3A8A]/40">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      {/* Google "G" SVG Emblem */}
                      <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-slate-200 flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            fill="#4285F4"
                            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-[#0B1E3B]">Google Reviews</h4>
                        <p className="text-xs text-slate-500">29 Eustace St, Temple Bar</p>
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-[#0B1E3B] font-mono-num">4.9</span>
                  </div>

                  <div className="flex items-center gap-1 text-amber-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-xs text-slate-500 ml-1.5 font-mono-num">
                      (310 Reviews)
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveQrTarget('google')}
                    className="text-xs font-semibold text-[#1E3A8A] hover:underline cursor-pointer"
                  >
                    Show on QR Card
                  </button>
                  <a
                    href={googleReviewsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#0B1E3B] rounded-lg hover:bg-[#1E3A8A] transition-colors whitespace-nowrap shrink-0"
                  >
                    See Reviews
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Trustpilot Card */}
              <div className="flex-1 bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5 hover:border-[#1E3A8A]/40">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      {/* Trustpilot Star Emblem */}
                      <div className="w-10 h-10 rounded-xl bg-[#00B67A]/10 border border-[#00B67A]/30 flex items-center justify-center shrink-0">
                        <Star className="w-5 h-5 fill-[#00B67A] text-[#00B67A]" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-[#0B1E3B]">Trustpilot</h4>
                        <p className="text-xs text-slate-500">TrustScore 4.8 / 5.0</p>
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-[#0B1E3B] font-mono-num">4.8</span>
                  </div>

                  <div className="flex items-center gap-1 text-[#00B67A] mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#00B67A] text-[#00B67A]" />
                    ))}
                    <span className="text-xs text-slate-500 ml-1.5 font-mono-num">
                      (110 Reviews)
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveQrTarget('trustpilot')}
                    className="text-xs font-semibold text-[#1E3A8A] hover:underline cursor-pointer"
                  >
                    Show on QR Card
                  </button>
                  <a
                    href={trustpilotUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#0B1E3B] rounded-lg hover:bg-[#1E3A8A] transition-colors whitespace-nowrap shrink-0"
                  >
                    See Reviews
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Column 3: Stylish "Review Us!" QR Code Card (3 Cols) */}
            <div className="lg:col-span-3 bg-[#0B1E3B] text-white rounded-2xl p-6 flex flex-col items-center justify-between text-center border border-[#1E3A8A]">
              <div className="w-full">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 mb-1">
                  <QrCode className="w-3.5 h-3.5 text-[#EA580C]" />
                  <span>Scan & Share Feedback</span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">Review Us!</h3>
                <p className="text-xs text-slate-300 mt-1">
                  Scan with your phone camera or click below to leave a review on{' '}
                  {activeQrTarget === 'google' ? 'Google Reviews' : 'Trustpilot'}.
                </p>
              </div>

              {/* Interactive Platform Switcher for QR */}
              <div className="my-4 flex items-center gap-1 p-1 bg-white/10 rounded-lg w-full">
                <button
                  type="button"
                  onClick={() => setActiveQrTarget('google')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                    activeQrTarget === 'google'
                      ? 'bg-[#EA580C] text-white'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Google QR
                </button>
                <button
                  type="button"
                  onClick={() => setActiveQrTarget('trustpilot')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                    activeQrTarget === 'trustpilot'
                      ? 'bg-[#EA580C] text-white'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Trustpilot QR
                </button>
              </div>

              {/* Functional QR Code Linked to Actual Review URL */}
              <a
                href={currentQrUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-block my-1 transition-transform duration-200 hover:scale-102"
                title={`Open ${activeQrTarget === 'google' ? 'Google Reviews' : 'Trustpilot'} link`}
              >
                <QrCodeSvg url={currentQrUrl} size={148} />
              </a>

              <div className="w-full mt-4 pt-3 border-t border-white/15 flex flex-col gap-2">
                <a
                  href={currentQrUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#EA580C] rounded-lg hover:bg-[#D94E06] transition-colors whitespace-nowrap"
                >
                  Open Review Page
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={handleCopyQrLink}
                  className="text-[11px] text-slate-300 hover:text-white cursor-pointer"
                >
                  {copiedQrLink ? '✓ Review Link Copied' : 'Copy Direct Review Link'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* PART 2: Professional Client Testimonials Section ("What Our Clients Say") */}
        <div className="pt-16 border-t border-slate-200">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#EA580C] mb-2">
                05. Guest & Partner Endorsements · Verified Feedback
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1E3B] tracking-tight">
                What Our Clients Say
              </h2>
              <p className="mt-2.5 text-base text-slate-600 max-w-2xl">
                Real feedback on our commitment to quality, creativity, and digital excellence.
              </p>
            </div>

            {/* Carousel / Pagination Controls */}
            <div className="flex items-center gap-2 self-start lg:self-end">
              <button
                type="button"
                onClick={handlePrevSlide}
                aria-label="Previous testimonials"
                className="p-2.5 rounded-lg border border-slate-200 bg-white text-[#0B1E3B] hover:border-[#0B1E3B] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-semibold text-slate-600 px-2 font-mono-num">
                Page {activeSlidePage + 1} of {totalPages}
              </span>
              <button
                type="button"
                onClick={handleNextSlide}
                aria-label="Next testimonials"
                className="p-2.5 rounded-lg border border-slate-200 bg-white text-[#0B1E3B] hover:border-[#0B1E3B] transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Category Filter Buttons */}
          <div className="mb-8 flex flex-wrap items-center gap-1.5 p-1.5 bg-[#F8FAFC] border border-slate-200 rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedServiceFilter(cat);
                  setActiveSlidePage(0);
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedServiceFilter === cat
                    ? 'bg-[#0B1E3B] text-white'
                    : 'text-slate-600 hover:text-[#0B1E3B]'
                }`}
              >
                {cat === 'All' ? 'All Reviews (6)' : cat}
              </button>
            ))}
          </div>

          {/* 3-Cards-Per-Row Desktop Responsive Testimonial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTestimonials.map((item) => (
              <article
                key={item.id}
                className="group relative bg-gradient-to-b from-white to-[#F8FAFC] rounded-2xl border border-slate-200 p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1E3A8A]"
              >
                <div>
                  {/* Top Row: 5 Golden Stars + Unboxed Verified Client Indicator + Decorative Quote */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="flex items-center gap-0.5 text-amber-400"
                        aria-label="5 out of 5 stars"
                      >
                        {[...Array(item.rating)].map((_, idx) => (
                          <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span aria-hidden="true" className="text-slate-300">
                        ·
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        Verified Client
                      </span>
                    </div>

                    <Quote className="w-6 h-6 text-[#1E3A8A]/20 shrink-0" aria-hidden="true" />
                  </div>

                  {/* Unboxed Category Context */}
                  <p className="text-xs font-semibold text-[#EA580C] mb-2.5">
                    {item.serviceCategory} · {item.stayOrProjectDate}
                  </p>

                  {/* Review Body Text */}
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    “{item.reviewText}”
                  </p>
                </div>

                {/* Reviewer Profile Footer */}
                <div className="pt-4 border-t border-slate-200/80 flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-[#0B1E3B] text-white font-bold text-xs flex items-center justify-center shrink-0 border-2 border-[#EA580C]">
                    {item.initials}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-[#0B1E3B] truncate">{item.name}</h4>
                    <p className="text-xs text-slate-500 truncate">
                      {item.role} · {item.companyOrOrigin}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
