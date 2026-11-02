import React, { useState } from 'react';
import { Bed, Check, MessageCircle, Maximize2, Users, ArrowRight } from 'lucide-react';
import { ROOMS_DATA, RoomItem, HOTEL_INFO } from '../data/hotelData';

interface RoomsSectionProps {
  onSelectRoomForBooking: (room: RoomItem) => void;
  showAllDetails?: boolean;
  onNavigateToRoomsPage?: () => void;
}

export const RoomsSection: React.FC<RoomsSectionProps> = ({
  onSelectRoomForBooking,
  showAllDetails = false,
  onNavigateToRoomsPage,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [inspectedRoom, setInspectedRoom] = useState<RoomItem | null>(null);
  const [nightsCount, setNightsCount] = useState<number>(2);

  const categories = ['All', 'Private Suite', 'Business Studio', 'Family & Group', 'Boutique Dorm'];

  const filteredRooms =
    selectedCategory === 'All'
      ? ROOMS_DATA
      : ROOMS_DATA.filter((room) => room.category === selectedCategory);

  const buildWhatsAppRoomUrl = (room: RoomItem) => {
    const text = `Hello Global Hostel at Temple Bar (${HOTEL_INFO.phoneDisplay}), I would like to book the "${room.name}" (€${room.pricePerNight}/night) for ${nightsCount} night(s) at 29 Eustace St, Dublin 2.`;
    return `https://wa.me/${HOTEL_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section className="py-20 bg-white border-b border-slate-200" id="rooms-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-semibold tracking-wider text-[#EA580C] mb-2">
              01. Boutique Accommodation · 29 Eustace Street, Dublin 2
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1E3B] tracking-tight">
              Georgian Suites & Architectural Chambers
            </h2>
            <p className="mt-3 text-base text-slate-600 max-w-2xl leading-relaxed">
              Every private room and bespoke solid-oak chamber at Global Hostel at Temple Bar blends
              historic Dublin character with soundproofed comfort, high-speed fiber Wi-Fi, and
              24-hour keycard security.
            </p>
          </div>

          {/* Interactive Filter Controls (Functional Buttons) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100 rounded-xl self-start lg:self-end">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0B1E3B] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#0B1E3B]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Nightly Stay Calculator Strip */}
        <div className="mb-10 p-4 sm:px-6 bg-[#F8FAFC] border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-sm text-slate-700">
            <span className="font-semibold text-[#0B1E3B]">Direct Rate Estimator:</span>{' '}
            <span>Select stay duration to preview total room rates including VAT & Wi-Fi</span>
          </div>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 7].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setNightsCount(n)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer font-mono-num ${
                  nightsCount === n
                    ? 'bg-[#EA580C] text-white'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-[#0B1E3B]'
                }`}
              >
                {n} {n === 1 ? 'Night' : 'Nights'}
              </button>
            ))}
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredRooms.map((room) => {
            const totalForNights = room.pricePerNight * nightsCount;
            return (
              <article
                key={room.id}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5 hover:border-[#1E3A8A]/40"
              >
                <div>
                  {/* Image Container with Resilient Fallback */}
                  <div className="relative aspect-4/3 bg-gradient-to-br from-[#0B1E3B] to-[#1E3A8A] overflow-hidden">
                    <img
                      src={room.image}
                      alt={room.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                    <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between text-white">
                      <div>
                        <p className="text-xs text-amber-300 font-medium">
                          {room.category} · {room.sizeSqm} m² · Up to {room.maxGuests}{' '}
                          {room.maxGuests === 1 ? 'Guest' : 'Guests'}
                        </p>
                        <h3 className="text-xl font-bold tracking-tight mt-0.5">{room.name}</h3>
                      </div>
                      <div className="text-right shrink-0">
                        {room.originalPrice && (
                          <span className="block text-xs text-slate-300 line-through font-mono-num">
                            €{room.originalPrice}
                          </span>
                        )}
                        <span className="text-2xl font-bold text-white font-mono-num">
                          €{room.pricePerNight}
                        </span>
                        <span className="block text-[11px] text-slate-200">per night</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    {/* Unboxed Metadata Line */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-3">
                      <span className="inline-flex items-center gap-1">
                        <Bed className="w-3.5 h-3.5 text-[#1E3A8A]" />
                        {room.bedConfiguration}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center gap-1">
                        <Maximize2 className="w-3.5 h-3.5 text-[#1E3A8A]" />
                        <span className="font-mono-num">{room.sizeSqm} m²</span>
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-[#1E3A8A]" />
                        Max <span className="font-mono-num">{room.maxGuests}</span>
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="text-emerald-700 font-medium font-mono-num">
                        {room.availableRooms} available today
                      </span>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed mb-5">
                      {room.shortDescription}
                    </p>

                    {/* Facilities Checklist */}
                    <div className="border-t border-slate-100 pt-4">
                      <p className="text-xs font-semibold text-[#0B1E3B] mb-2.5">
                        Included Room Facilities:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                        {room.facilities.map((facility) => (
                          <div
                            key={facility}
                            className="flex items-center gap-2 text-xs text-slate-600"
                          >
                            <Check className="w-3.5 h-3.5 text-[#EA580C] shrink-0" />
                            <span className="truncate">{facility}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="px-6 py-4 bg-[#F8FAFC] border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-xs text-slate-500 block">
                      Total for <span className="font-mono-num">{nightsCount}</span>{' '}
                      {nightsCount === 1 ? 'night' : 'nights'}
                    </span>
                    <span className="text-lg font-bold text-[#0B1E3B] font-mono-num">
                      €{totalForNights}
                    </span>
                    <span className="text-xs text-slate-500 ml-1">incl. VAT</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <a
                      href={buildWhatsAppRoomUrl(room)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#0B1E3B] bg-white border border-slate-300 rounded-lg hover:border-[#0B1E3B] transition-colors whitespace-nowrap shrink-0"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                      WhatsApp Book
                    </a>

                    <button
                      type="button"
                      onClick={() => onSelectRoomForBooking(room)}
                      className="px-4 py-2 text-xs font-semibold text-white bg-[#EA580C] rounded-lg hover:bg-[#D94E06] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Reserve Room
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Optional Bottom Link to Dedicated Rooms Page when on Landing Page */}
        {!showAllDetails && onNavigateToRoomsPage && (
          <div className="mt-10 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-600">
              Need group allocation or floor-plan specifications for 29 Eustace Street?
            </p>
            <button
              type="button"
              onClick={onNavigateToRoomsPage}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#0B1E3B] rounded-lg hover:bg-[#1E3A8A] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Open Full Rooms & Floor Guide Page
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Room Inspection Modal if opened */}
        {inspectedRoom && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-xl w-full p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-[#0B1E3B]">{inspectedRoom.name}</h3>
                <button
                  type="button"
                  onClick={() => setInspectedRoom(null)}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-900"
                >
                  Close
                </button>
              </div>
              <p className="text-sm text-slate-600 mb-4">{inspectedRoom.shortDescription}</p>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const r = inspectedRoom;
                    setInspectedRoom(null);
                    onSelectRoomForBooking(r);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#EA580C] rounded-lg"
                >
                  Reserve Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
