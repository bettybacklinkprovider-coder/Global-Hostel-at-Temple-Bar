import React, { useState } from 'react';
import {
  Calendar,
  Check,
  ChevronDown,
  ChevronUp,
  Coffee,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Users,
  Wifi,
} from 'lucide-react';
import {
  HOTEL_INFO,
  OFFER_FAQS,
  OfferPackage,
  SPECIAL_OFFERS_DATA,
} from '../data/hotelData';

interface SpecialOffersSectionProps {
  onSelectOfferForBooking: (offer: OfferPackage, checkIn?: string, checkOut?: string, guests?: number) => void;
}

export const SpecialOffersSection: React.FC<SpecialOffersSectionProps> = ({
  onSelectOfferForBooking,
}) => {
  const [selectedPackageFilter, setSelectedPackageFilter] = useState<string>('All Packages');
  const [checkInDate, setCheckInDate] = useState<string>('2026-11-06');
  const [checkOutDate, setCheckOutDate] = useState<string>('2026-11-08');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [availabilityMessage, setAvailabilityMessage] = useState<string | null>(null);

  const featuredOffer = SPECIAL_OFFERS_DATA[0];

  const filterOptions = [
    'All Packages',
    'Weekend Getaway',
    'Extended Stay Package',
    'Romantic Stay Package',
    'Family Stay Package',
    'Business Stay Package',
    'Seasonal Special Offers',
  ];

  const displayedOffers =
    selectedPackageFilter === 'All Packages'
      ? SPECIAL_OFFERS_DATA
      : SPECIAL_OFFERS_DATA.filter((o) => o.packageType === selectedPackageFilter);

  const calculateNights = () => {
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diff = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const nightsSelected = calculateNights();

  const handleCheckOfferAvailability = (e: React.FormEvent) => {
    e.preventDefault();
    const matchingCount = SPECIAL_OFFERS_DATA.filter(
      (o) => o.available && nightsSelected >= o.minStayNights
    ).length;
    setAvailabilityMessage(
      `${matchingCount} verified packages available for ${nightsSelected} night(s) (${checkInDate} to ${checkOutDate}) for ${guestCount} guest(s) at 29 Eustace St.`
    );
  };

  const buildWhatsAppOfferUrl = (offer: OfferPackage) => {
    const msg = `Hello Global Hostel at Temple Bar (${HOTEL_INFO.phoneDisplay}), I would like to inquire about the "${offer.title}" (${offer.packageType}, Code: ${offer.code}) at €${offer.discountedPrice}. Dates: ${checkInDate} to ${checkOutDate}, Guests: ${guestCount}.`;
    return `https://wa.me/${HOTEL_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section className="py-20 bg-[#F8FAFC] border-b border-slate-200" id="offers-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-semibold tracking-wider text-[#EA580C] mb-2">
            02. Curated Dublin Stays · Verified Direct Rates
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1E3B] tracking-tight">
            Exclusive Offers & Packages
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Discover exceptional stays and exclusive offers designed to make your experience
            unforgettable.
          </p>
        </div>

        {/* Featured Offer Banner at Top of Section */}
        <div className="mb-12 rounded-2xl bg-[#0B1E3B] text-white overflow-hidden border border-[#1E3A8A]">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-5 relative min-h-[260px] bg-gradient-to-br from-[#0B1E3B] to-[#1E3A8A]">
              <img
                src={featuredOffer.image}
                alt={featuredOffer.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E3B]/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0B1E3B]/90" />
            </div>

            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-amber-300 font-medium mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#EA580C]" />
                  <span>Featured Signature Package</span>
                  <span aria-hidden="true">·</span>
                  <span>{featuredOffer.packageType}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-num">Save {featuredOffer.discountPercent}% Direct</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {featuredOffer.title}
                </h3>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed max-w-2xl">
                  {featuredOffer.description}
                </p>

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {featuredOffer.includedAmenities.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-slate-200">
                      <Check className="w-3.5 h-3.5 text-[#EA580C] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-xs text-slate-400 line-through font-mono-num">
                      €{featuredOffer.originalPrice}
                    </span>
                    <span className="text-3xl font-bold text-white font-mono-num">
                      €{featuredOffer.discountedPrice}
                    </span>
                    <span className="text-xs text-slate-300">{featuredOffer.priceUnit}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {featuredOffer.validUntil} · Min stay {featuredOffer.minStayNights} nights
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={buildWhatsAppOfferUrl(featuredOffer)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-white/10 border border-white/20 rounded-lg hover:bg-white/15 transition-colors whitespace-nowrap shrink-0"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    WhatsApp Inquiry
                  </a>
                  <button
                    type="button"
                    onClick={() =>
                      onSelectOfferForBooking(
                        featuredOffer,
                        checkInDate,
                        checkOutDate,
                        guestCount
                      )
                    }
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-[#EA580C] rounded-lg hover:bg-[#D94E06] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {featuredOffer.ctaLabel}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Date, Guest & Package Availability Bar */}
        <form
          onSubmit={handleCheckOfferAvailability}
          className="mb-10 p-5 bg-white rounded-2xl border border-slate-200"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div>
              <label
                htmlFor="offer-checkin"
                className="block text-xs font-semibold text-[#0B1E3B] mb-1.5"
              >
                Check-In Date
              </label>
              <div className="relative">
                <input
                  id="offer-checkin"
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs text-[#0B1E3B] bg-[#F8FAFC] border border-slate-300 rounded-lg focus:outline-none focus:border-[#1E3A8A] font-mono-num"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="offer-checkout"
                className="block text-xs font-semibold text-[#0B1E3B] mb-1.5"
              >
                Check-Out Date
              </label>
              <div className="relative">
                <input
                  id="offer-checkout"
                  type="date"
                  value={checkOutDate}
                  min={checkInDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs text-[#0B1E3B] bg-[#F8FAFC] border border-slate-300 rounded-lg focus:outline-none focus:border-[#1E3A8A] font-mono-num"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="offer-guests"
                className="block text-xs font-semibold text-[#0B1E3B] mb-1.5"
              >
                Number of Guests
              </label>
              <select
                id="offer-guests"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs text-[#0B1E3B] bg-[#F8FAFC] border border-slate-300 rounded-lg focus:outline-none focus:border-[#1E3A8A]"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="offer-category-select"
                className="block text-xs font-semibold text-[#0B1E3B] mb-1.5"
              >
                Package Category
              </label>
              <select
                id="offer-category-select"
                value={selectedPackageFilter}
                onChange={(e) => setSelectedPackageFilter(e.target.value)}
                className="w-full px-3 py-2 text-xs text-[#0B1E3B] bg-[#F8FAFC] border border-slate-300 rounded-lg focus:outline-none focus:border-[#1E3A8A]"
              >
                {filterOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-xs font-semibold text-white bg-[#0B1E3B] rounded-lg hover:bg-[#1E3A8A] transition-colors whitespace-nowrap cursor-pointer"
              >
                Verify Package Dates
              </button>
            </div>
          </div>

          {availabilityMessage && (
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-800">
              <span>{availabilityMessage}</span>
              <button
                type="button"
                onClick={() => setAvailabilityMessage(null)}
                className="text-slate-500 hover:text-slate-800 font-semibold"
              >
                Dismiss
              </button>
            </div>
          )}
        </form>

        {/* 6 Offer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedOffers.map((offer, index) => {
            const meetsMinStay = nightsSelected >= offer.minStayNights;
            const letterIndex = String.fromCharCode(65 + index); // A, B, C, D, E, F
            return (
              <article
                key={offer.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5 hover:border-[#1E3A8A]/40"
              >
                <div>
                  {/* Offer Card Image */}
                  <div className="relative aspect-4/3 bg-gradient-to-br from-[#0B1E3B] to-[#1E3A8A] overflow-hidden">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    <div className="absolute bottom-3.5 left-4 right-4 flex items-end justify-between text-white">
                      <div>
                        <p className="text-[11px] text-amber-300 font-semibold">
                          {letterIndex}. {offer.packageType}
                        </p>
                        <h3 className="text-lg font-bold leading-snug mt-0.5">{offer.title}</h3>
                      </div>
                    </div>
                  </div>

                  {/* Offer Content */}
                  <div className="p-6">
                    {/* Unboxed Metadata Line */}
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 mb-3">
                      <span className="font-semibold text-[#EA580C] font-mono-num">
                        {offer.discountPercent}% Verified Discount
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>Min {offer.minStayNights}N</span>
                      <span aria-hidden="true">·</span>
                      <span>{offer.maxOccupancy}</span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {offer.description}
                    </p>

                    {/* Included Amenities */}
                    <div className="border-t border-slate-100 pt-3.5 mb-4">
                      <p className="text-xs font-semibold text-[#0B1E3B] mb-2">
                        Package Inclusions:
                      </p>
                      <ul className="space-y-1.5">
                        {offer.includedAmenities.map((amenity) => (
                          <li
                            key={amenity}
                            className="flex items-start gap-2 text-xs text-slate-600"
                          >
                            <Check className="w-3.5 h-3.5 text-[#EA580C] shrink-0 mt-0.5" />
                            <span>{amenity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Validity & Conditions */}
                    <div className="border-t border-slate-100 pt-3 text-[11px] text-slate-500 space-y-1">
                      <p className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#1E3A8A] shrink-0" />
                        <span>{offer.validUntil}</span>
                      </p>
                      <p className="leading-normal">{offer.conditions}</p>
                      {!meetsMinStay && (
                        <p className="text-amber-700 font-medium pt-1">
                          Note: Select at least {offer.minStayNights} nights above to unlock this
                          package rate (currently {nightsSelected}N selected).
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Offer Pricing & CTA Footer */}
                <div className="px-6 py-4 bg-[#F8FAFC] border-t border-slate-200">
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <span className="text-xs text-slate-400 line-through mr-2 font-mono-num">
                        €{offer.originalPrice}
                      </span>
                      <span className="text-2xl font-bold text-[#0B1E3B] font-mono-num">
                        €{offer.discountedPrice}
                      </span>
                      <span className="block text-[11px] text-slate-500">{offer.priceUnit}</span>
                    </div>
                    <span className="text-xs font-mono-num text-slate-500">
                      Code: {offer.code}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={buildWhatsAppOfferUrl(offer)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#0B1E3B] bg-white border border-slate-300 rounded-lg hover:border-[#0B1E3B] transition-colors whitespace-nowrap shrink-0"
                      title="Inquire via WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                      WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() =>
                        onSelectOfferForBooking(offer, checkInDate, checkOutDate, guestCount)
                      }
                      className="flex-1 px-4 py-2 text-xs font-semibold text-white bg-[#EA580C] rounded-lg hover:bg-[#D94E06] transition-colors whitespace-nowrap shrink-0 cursor-pointer text-center"
                    >
                      {offer.ctaLabel}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Standard Benefits Bar + Find Your Perfect Stay CTA */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-[#0B1E3B]">Find Your Perfect Stay</h3>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Every direct reservation and package at Global Hostel at Temple Bar includes
              verified perks with zero booking platform commissions.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-6 text-xs text-slate-700 font-medium">
              <span className="inline-flex items-center gap-1.5">
                <Wifi className="w-4 h-4 text-[#1E3A8A]" />
                1 Gbps Symmetrical Wi-Fi
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Coffee className="w-4 h-4 text-[#EA580C]" />
                Artisan Irish Breakfast Options
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#1E3A8A]" />
                24/7 Reception at 29 Eustace St
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#EA580C]" />
                Direct Group & Family Concierge
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={`https://wa.me/${HOTEL_INFO.whatsappNumber}?text=${encodeURIComponent(
                'Hello Global Hostel at Temple Bar, please help me find the best package for my upcoming stay in Dublin.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#0B1E3B] bg-[#F8FAFC] border border-slate-300 rounded-lg hover:border-[#0B1E3B] transition-colors whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              Chat with Reception ({HOTEL_INFO.phoneDisplay})
            </a>
            <button
              type="button"
              onClick={() =>
                onSelectOfferForBooking(featuredOffer, checkInDate, checkOutDate, guestCount)
              }
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#0B1E3B] rounded-lg hover:bg-[#1E3A8A] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Find Your Perfect Stay
            </button>
          </div>
        </div>

        {/* Small FAQ Area Covering Offer Validity, Booking Conditions, Cancellations & Inclusions */}
        <div className="mt-12 max-w-3xl mx-auto">
          <h3 className="text-lg font-bold text-[#0B1E3B] mb-4 text-center">
            Package Validity, Booking Conditions & Cancellation FAQ
          </h3>
          <div className="divide-y divide-slate-200 bg-white rounded-2xl border border-slate-200 overflow-hidden">
            {OFFER_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={faq.question} className="p-5">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left gap-4 cursor-pointer"
                  >
                    <span className="text-sm font-semibold text-[#0B1E3B]">{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#EA580C] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <p className="mt-2.5 text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
