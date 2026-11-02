import React from 'react';
import { Coffee, Compass, KeyRound, Luggage, Shield, Wifi } from 'lucide-react';
import { HOTEL_INFO, IMAGES } from '../data/hotelData';

export const FacilitiesSection: React.FC = () => {
  const facilitiesList = [
    {
      num: '01.',
      title: 'Symmetrical 1 Gbps Fiber Wi-Fi',
      description:
        'Enterprise-grade Wi-Fi 6 coverage across all Georgian suites, private chambers, and our ground-floor lounge for lag-free remote work and streaming.',
      icon: Wifi,
    },
    {
      num: '02.',
      title: 'Hatch & Sons Artisan Cafe & Social Lounge',
      description:
        'Start your morning with freshly baked Irish soda bread, barista espresso, and warm hospitality in our exposed-brick Eustace Street cafe.',
      icon: Coffee,
    },
    {
      num: '03.',
      title: '24/7 Reception & Keycard Security',
      description:
        'Round-the-clock front desk assistance at 29 Eustace Street with contactless smart keycard access on every entrance, corridor, and room door.',
      icon: Shield,
    },
    {
      num: '04.',
      title: 'All-Day Secure Luggage Concierge',
      description:
        'Arriving on an early flight into Dublin Airport or departing late? Store your bags securely before check-in (15:00) and after check-out (11:00).',
      icon: Luggage,
    },
    {
      num: '05.',
      title: 'Express Check-In & Private Lockers',
      description:
        'Every suite and pod includes electronic valuables safes, dual USB-C bedside power consoles, and luxury hotel-grade organic cotton linens.',
      icon: KeyRound,
    },
    {
      num: '06.',
      title: 'Temple Bar Cultural Walking Desk',
      description:
        'Curated insider recommendations for traditional live Irish music sessions, galleries, Trinity College tours, and hidden Dublin dining spots.',
      icon: Compass,
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200" id="facilities-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-semibold tracking-wider text-[#EA580C] mb-2">
            03. Property Amenities · Dublin Hospitality Standards
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1E3B] tracking-tight">
            Crafted for Modern Travellers & Groups
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Located at {HOTEL_INFO.fullAddress}, our historic Georgian townhouse is equipped with
            everything required for a restful, connected stay in Dublin’s Cultural Quarter.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Featured Media Card (5 Cols) */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden bg-[#0B1E3B] border border-slate-200 min-h-[360px] flex flex-col justify-end">
            <img
              src={IMAGES.socialLounge}
              alt="Global Hostel at Temple Bar Social Lounge and Cafe"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E3B] via-[#0B1E3B]/45 to-transparent" />
            <div className="relative p-6 sm:p-8 text-white">
              <p className="text-xs text-amber-300 font-semibold mb-1">
                Ground Floor · 29 Eustace Street
              </p>
              <h3 className="text-2xl font-bold tracking-tight">
                The Eustace Social Lounge & Espresso Bar
              </h3>
              <p className="mt-2 text-xs text-slate-200 leading-relaxed">
                Open daily from 06:30 to 23:00 for artisan Irish breakfast, specialty roast coffee,
                co-working, and evening conversation before exploring Temple Bar.
              </p>
              <div className="mt-4 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-slate-300">
                <span>Direct Front Desk</span>
                <span className="font-mono-num font-semibold text-white">
                  {HOTEL_INFO.phoneDisplay}
                </span>
              </div>
            </div>
          </div>

          {/* Right 6 Editorial Capability Cards (7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {facilitiesList.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.num}
                  className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200 flex flex-col justify-between hover:border-[#1E3A8A]/40 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-[#EA580C] font-mono-num">
                        {item.num}
                      </span>
                      <IconComponent className="w-4 h-4 text-[#1E3A8A]" />
                    </div>
                    <h3 className="text-base font-bold text-[#0B1E3B]">{item.title}</h3>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
