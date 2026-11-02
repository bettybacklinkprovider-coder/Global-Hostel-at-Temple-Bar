export interface RoomItem {
  id: string;
  name: string;
  category: 'Private Suite' | 'Family & Group' | 'Business Studio' | 'Boutique Dorm';
  pricePerNight: number;
  originalPrice?: number;
  sizeSqm: number;
  maxGuests: number;
  bedConfiguration: string;
  image: string;
  shortDescription: string;
  facilities: string[];
  availableRooms: number;
}

export interface OfferPackage {
  id: string;
  code: string;
  packageType:
    | 'Weekend Getaway'
    | 'Extended Stay Package'
    | 'Romantic Stay Package'
    | 'Family Stay Package'
    | 'Business Stay Package'
    | 'Seasonal Special Offers';
  title: string;
  subtitle: string;
  description: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercent: number;
  priceUnit: string;
  minStayNights: number;
  maxOccupancy: string;
  validUntil: string;
  conditions: string;
  includedAmenities: string[];
  ctaLabel: string;
  available: boolean;
  featured?: boolean;
}

export interface ClientTestimonial {
  id: string;
  name: string;
  role: string;
  companyOrOrigin: string;
  avatarUrl: string;
  initials: string;
  rating: number;
  serviceCategory: string;
  reviewText: string;
  stayOrProjectDate: string;
  verified: boolean;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'Exterior & Street' | 'Private Suites' | 'Social Lounge' | 'Family Rooms';
  caption: string;
  image: string;
  aspect: '16:9' | '4:3';
}

export const HOTEL_INFO = {
  name: 'Global Hostel at Temple Bar',
  phoneDisplay: '+353 1 677 9158',
  phoneClean: '35316779158',
  whatsappNumber: '35316779158',
  email: 'reservations@globalhosteltemplebar.ie',
  addressLine1: '29 Eustace St, Temple Bar',
  addressLine2: 'Dublin 2, D02 F635, Ireland',
  fullAddress: '29 Eustace St, Temple Bar, Dublin 2, D02 F635, Ireland',
  coordinates: { lat: 53.3449, lng: -6.2654 },
  checkInTime: '15:00',
  checkOutTime: '11:00',
  googleReviewsUrl:
    'https://www.google.com/maps/search/?api=1&query=Global+Hostel+at+Temple+Bar+29+Eustace+St+Dublin+2+D02+F635+Ireland',
  trustpilotUrl:
    'https://www.trustpilot.com/search?query=Global+Hostel+Temple+Bar+Dublin',
};

export const IMAGES = {
  heroExterior: '/src/assets/images/hero_temple_bar_hotel_1793439963506.jpg',
  deluxeKing: '/src/assets/images/room_deluxe_king_1793439837700.jpg',
  familySuite: '/src/assets/images/room_family_suite_1793439839315.jpg',
  executiveStudio: '/src/assets/images/room_executive_studio_1793439840055.jpg',
  socialLounge: '/src/assets/images/lounge_social_courtyard_1793439840852.jpg',
};

export const ROOMS_DATA: RoomItem[] = [
  {
    id: 'eustace-deluxe-king',
    name: 'Eustace Georgian Deluxe King En-Suite',
    category: 'Private Suite',
    pricePerNight: 165,
    originalPrice: 195,
    sizeSqm: 28,
    maxGuests: 2,
    bedConfiguration: '1 King Orthopedic Bed',
    image: IMAGES.deluxeKing,
    shortDescription:
      'Overlooking historic Eustace Street through tall Georgian sash windows, featuring deep navy timber panelling, burnt-amber velvet seating, and a marble rainfall en-suite.',
    facilities: [
      'High-Speed Wi-Fi 6',
      'Private Rainfall En-Suite',
      'Artisan Irish Breakfast Included',
      'Nespresso Coffee Station',
      'Soundproofed Georgian Windows',
      '24/7 Keycard Security',
    ],
    availableRooms: 3,
  },
  {
    id: 'temple-bar-executive-studio',
    name: 'Liffey Executive Business Studio',
    category: 'Business Studio',
    pricePerNight: 185,
    originalPrice: 215,
    sizeSqm: 32,
    maxGuests: 2,
    bedConfiguration: '1 Queen Plush Bed + Dedicated Desk',
    image: IMAGES.executiveStudio,
    shortDescription:
      'Designed for visiting executives, creatives, and extended-stay travellers. Includes a solid oak workstation, dual USB-C fast charging, espresso bar, and quiet courtyard aspect.',
    facilities: [
      'Dedicated Oak Workspace',
      '1 Gbps Fiber Wi-Fi',
      'Complimentary Pressing Service',
      'In-Room Espresso & Tea Bar',
      'Late 13:00 Check-Out Subject to Availability',
      'Smart 4K Display',
    ],
    availableRooms: 2,
  },
  {
    id: 'dublin-heritage-family-suite',
    name: 'Temple Bar Heritage Family & Group Suite',
    category: 'Family & Group',
    pricePerNight: 240,
    originalPrice: 280,
    sizeSqm: 44,
    maxGuests: 6,
    bedConfiguration: '4 Custom Oak Bunks + Lounge Seating Area',
    image: IMAGES.familySuite,
    shortDescription:
      'Bespoke solid-oak architectural pods with heavy navy privacy drapes, individual reading sconces, private living area, and oversized family bathroom in the heart of Dublin 2.',
    facilities: [
      'Private Suite for up to 6 Guests',
      'Individual Reading Lamps & Lockers',
      'Private Lounge & Dining Table',
      'Continental Breakfast Basket',
      'Complimentary Luggage Storage',
      'Child-Friendly Amenities',
    ],
    availableRooms: 2,
  },
  {
    id: 'global-signature-pod',
    name: 'Signature Luxury Privacy Pod (4-Bed Chamber)',
    category: 'Boutique Dorm',
    pricePerNight: 58,
    originalPrice: 68,
    sizeSqm: 26,
    maxGuests: 1,
    bedConfiguration: '1 Custom Solid-Oak Privacy Pod',
    image: IMAGES.familySuite,
    shortDescription:
      'Redefining hostel living in Temple Bar. Each custom timber pod includes blackout privacy curtains, memory-foam mattress, personal power console, and under-bed electronic safe.',
    facilities: [
      'Blackout Privacy Curtain',
      'Personal Power & USB-C Outlet',
      'Electronic Under-Bed Safe',
      'Luxury Linen & Towel Included',
      'En-Suite Shower Room',
      'Access to Hatch & Sons Social Lounge',
    ],
    availableRooms: 6,
  },
];

export const SPECIAL_OFFERS_DATA: OfferPackage[] = [
  {
    id: 'offer-weekend-getaway',
    code: 'DUBWKND15',
    packageType: 'Weekend Getaway',
    title: 'Temple Bar Cultural Weekend Getaway',
    subtitle: 'Friday to Sunday boutique stay steps from Dublin Castle & Ha’penny Bridge',
    description:
      'Unwind in the cultural heart of Dublin 2 with two nights in our Georgian Deluxe King En-Suite, artisan Irish breakfast each morning, and a curated walking map of Temple Bar galleries.',
    image: IMAGES.deluxeKing,
    originalPrice: 390,
    discountedPrice: 329,
    discountPercent: 16,
    priceUnit: 'per 2-night weekend stay',
    minStayNights: 2,
    maxOccupancy: 'Up to 2 Adults',
    validUntil: 'Valid through December 20, 2026',
    conditions: 'Valid for Friday & Saturday check-ins. Free cancellation up to 48 hours prior to arrival.',
    includedAmenities: [
      '2 Nights in Georgian Deluxe King Room',
      'Daily Artisan Irish Breakfast for Two',
      'Welcome Irish Craft Roast Coffee at Lounge',
      'Guaranteed 13:00 Late Sunday Check-Out',
    ],
    ctaLabel: 'Explore Offer',
    available: true,
    featured: true,
  },
  {
    id: 'offer-extended-stay',
    code: 'STAYLONG20',
    packageType: 'Extended Stay Package',
    title: 'Dublin Explorer Extended Stay (4+ Nights)',
    subtitle: 'Preferential multi-night rates for remote workers, scholars, and slow travellers',
    description:
      'Stay four nights or longer at 29 Eustace Street and enjoy 20% off standard nightly rates, complimentary laundry access, and unlimited specialty coffee in our ground-floor lounge.',
    image: IMAGES.executiveStudio,
    originalPrice: 740,
    discountedPrice: 592,
    discountPercent: 20,
    priceUnit: 'for 4 nights minimum stay',
    minStayNights: 4,
    maxOccupancy: '1–2 Guests per Studio',
    validUntil: 'Valid Year-Round (Subject to Allocation)',
    conditions: 'Minimum 4 consecutive nights required. Flexible date changes up to 72 hours before arrival.',
    includedAmenities: [
      '20% Verified Multi-Night Rate Reduction',
      '1 Gbps Dedicated Workspace Wi-Fi',
      'Complimentary Weekly Linen & Towel Refresh',
      'Full Guest Kitchen & Espresso Bar Access',
    ],
    ctaLabel: 'View Package',
    available: true,
  },
  {
    id: 'offer-romantic-stay',
    packageType: 'Romantic Stay Package',
    code: 'ROMANCEDUB',
    title: 'Georgian Candlelight Couples Escape',
    subtitle: 'Intimate Dublin city break with artisanal treats and late morning checkout',
    description:
      'Celebrate an anniversary or special getaway in our top-floor Georgian King Suite featuring bespoke floral table styling, handmade Irish chocolates, and breakfast served until 11:30.',
    image: IMAGES.deluxeKing,
    originalPrice: 230,
    discountedPrice: 195,
    discountPercent: 15,
    priceUnit: 'per night for 2 guests',
    minStayNights: 1,
    maxOccupancy: '2 Adults',
    validUntil: 'Valid through March 31, 2027',
    conditions: 'Requires 24-hour advance booking to prepare in-room welcome amenities.',
    includedAmenities: [
      'Top-Floor Quiet Georgian King En-Suite',
      'Artisan Irish Chocolate & Berry Platter',
      'Full Irish & Continental Breakfast',
      'Complimentary 13:30 Late Check-Out',
    ],
    ctaLabel: 'Discover Package',
    available: true,
  },
  {
    id: 'offer-family-stay',
    packageType: 'Family Stay Package',
    code: 'FAMILYDUB14',
    title: 'Dublin Heritage Family & Group Adventure',
    subtitle: 'Private 6-berth architectural oak suite with breakfast & luggage concierge',
    description:
      'Keep the whole family together in our 44 m² Heritage Family Suite. Includes four custom solid-oak bunks, a private living lounge, family breakfast basket, and nearby attraction guide.',
    image: IMAGES.familySuite,
    originalPrice: 280,
    discountedPrice: 238,
    discountPercent: 15,
    priceUnit: 'per night (up to 6 guests)',
    minStayNights: 2,
    maxOccupancy: 'Up to 6 Guests (Adults & Children)',
    validUntil: 'Valid through November 30, 2026',
    conditions: 'Minimum 2-night stay. Children under 16 must be accompanied by a parent or guardian.',
    includedAmenities: [
      'Private En-Suite Family Chamber (44 m²)',
      'Daily Family Continental Breakfast Basket',
      'All-Day Secure Luggage Storage on Arrival/Departure',
      '24/7 Reception & Family Concierge Desk',
    ],
    ctaLabel: 'Explore Family Offer',
    available: true,
  },
  {
    id: 'offer-business-stay',
    packageType: 'Business Stay Package',
    code: 'CORPDUBLIN',
    title: 'Silicon Docks & City Centre Corporate Stay',
    subtitle: 'Tailored weekday accommodation with ergonomic desk, fiber Wi-Fi & express breakfast',
    description:
      'Located minutes from Trinity College, Dame Street financial offices, and Luas tram links. Enjoy quiet courtyard rooms, VAT invoice readiness, and early 06:30 express barista breakfast.',
    image: IMAGES.executiveStudio,
    originalPrice: 215,
    discountedPrice: 179,
    discountPercent: 17,
    priceUnit: 'per night (Monday–Thursday)',
    minStayNights: 1,
    maxOccupancy: '1 Business Traveller',
    validUntil: 'Valid Monday–Thursday through 2026',
    conditions: 'Valid for Sunday through Thursday nights. Itemized corporate VAT receipt provided at checkout.',
    includedAmenities: [
      'Ergonomic Solid-Oak Desk & Leather Chair',
      'Symmetrical High-Speed Fiber Wi-Fi',
      'Early-Bird 06:30 Barista Coffee & Pastry',
      'Express Check-In & Guaranteed Quiet Floor',
    ],
    ctaLabel: 'Book Business Stay',
    available: true,
  },
  {
    id: 'offer-seasonal-special',
    packageType: 'Seasonal Special Offers',
    code: 'AUTUMNDUB18',
    title: 'Autumn & Winter Lights in Temple Bar',
    subtitle: 'Seasonal advance-purchase savings for cosy Dublin nights on Eustace Street',
    description:
      'Experience Dublin’s winter lights, traditional music sessions, and festive markets right outside our front door at 29 Eustace Street with 18% off when booked 7 days in advance.',
    image: IMAGES.socialLounge,
    originalPrice: 195,
    discountedPrice: 159,
    discountPercent: 18,
    priceUnit: 'per night (Advance Saver)',
    minStayNights: 2,
    maxOccupancy: 'Up to 2 Guests',
    validUntil: 'Valid Oct 31, 2026 – Jan 31, 2027',
    conditions: 'Book at least 7 days before arrival. One free date modification permitted.',
    includedAmenities: [
      '18% Seasonal Advance Booking Discount',
      'Complimentary Hot Spiced Apple or Irish Tea on Arrival',
      'Full Access to Social Lounge & Courtyard',
      'Priority Room Upgrade When Available',
    ],
    ctaLabel: 'Claim Seasonal Offer',
    available: true,
  },
];

export const OFFER_FAQS = [
  {
    question: 'How long are the Exclusive Offers & Packages valid?',
    answer:
      'Each package displays its exact validity window directly on the offer card. Most seasonal offers at Global Hostel at Temple Bar are valid through late 2026 and early 2027, subject to room allocation.',
  },
  {
    question: 'What are the booking conditions and cancellation terms for packages?',
    answer:
      'Direct package bookings made via our website or WhatsApp (+353 1 677 9158) include flexible cancellation up to 48 hours prior to 15:00 check-in time, unless otherwise noted on an advance-saver rate.',
  },
  {
    question: 'Are breakfast, Wi-Fi, and taxes included in the displayed package prices?',
    answer:
      'Yes. All displayed package rates in Euros (€) include VAT, high-speed Wi-Fi across the property at 29 Eustace Street, and the specific breakfast or lounge perks itemized on each offer card.',
  },
  {
    question: 'Can I customize a package or book for a larger group via WhatsApp?',
    answer:
      'Absolutely. Click any "Inquire via WhatsApp" button to message our 24/7 reception desk at +353 1 677 9158 with your preferred check-in/check-out dates and group size.',
  },
];

export const RATING_BREAKDOWN = [
  { stars: 5, percentage: 89, count: 374 },
  { stars: 4, percentage: 8, count: 34 },
  { stars: 3, percentage: 2, count: 8 },
  { stars: 2, percentage: 1, count: 4 },
  { stars: 1, percentage: 0, count: 0 },
];

export const CLIENT_TESTIMONIALS: ClientTestimonial[] = [
  {
    id: 'rev-1',
    name: 'Aoife Ní Chonaill',
    role: 'Hospitality & Brand Director',
    companyOrOrigin: 'Clarence Creative Studio, Dublin',
    avatarUrl: '',
    initials: 'AN',
    rating: 5,
    serviceCategory: 'Boutique Suites & Hospitality',
    reviewText:
      'Staying at Global Hostel at Temple Bar on 29 Eustace Street exceeded every expectation. The Georgian Deluxe King room combines historic Dublin character with spotless modern comfort, and the staff arranged our late check-in within minutes.',
    stayOrProjectDate: 'October 2026',
    verified: true,
  },
  {
    id: 'rev-2',
    name: 'Marcus Vance',
    role: 'Senior Frontend Architect',
    companyOrOrigin: 'Northstar Digital & React Systems',
    avatarUrl: '',
    initials: 'MV',
    rating: 5,
    serviceCategory: 'React Development & Custom Web Experience',
    reviewText:
      'From the custom-coded online booking flow to the high-speed fiber Wi-Fi in the Liffey Executive Studio, everything worked flawlessly. Their digital guest check-in and WhatsApp concierge response time are a benchmark for modern hospitality.',
    stayOrProjectDate: 'October 2026',
    verified: true,
  },
  {
    id: 'rev-3',
    name: 'Elena Rostova',
    role: 'Head of E-Commerce & Growth',
    companyOrOrigin: 'Vellum Retail Group, London',
    avatarUrl: '',
    initials: 'ER',
    rating: 5,
    serviceCategory: 'Direct Booking & E-Commerce Optimization',
    reviewText:
      'We booked the Temple Bar Cultural Weekend Getaway package directly. Transparent pricing, zero hidden fees, and an effortless reservation experience. Walking out onto Eustace Street each morning with artisan coffee was unforgettable.',
    stayOrProjectDate: 'September 2026',
    verified: true,
  },
  {
    id: 'rev-4',
    name: 'Liam O’Sullivan',
    role: 'Founder & Principal Designer',
    companyOrOrigin: 'Hibernia Brand Identity, Cork',
    avatarUrl: '',
    initials: 'LO',
    rating: 5,
    serviceCategory: 'Logo Design, Brand Identity & Interiors',
    reviewText:
      'The visual identity—deep royal blue panelling paired with warm burnt-orange accents—carries seamlessly from the website right into the ground-floor lounge and private suites. A masterclass in cohesive hospitality branding.',
    stayOrProjectDate: 'September 2026',
    verified: true,
  },
  {
    id: 'rev-5',
    name: 'Hannah Lindqvist',
    role: 'SEO & Digital Marketing Lead',
    companyOrOrigin: 'Nordic Travel Media, Stockholm',
    avatarUrl: '',
    initials: 'HL',
    rating: 5,
    serviceCategory: 'SEO, Local Discovery & Guest Experience',
    reviewText:
      'We found Global Hostel at Temple Bar through Google Reviews and booked the Family & Group Suite for five of us. The solid-oak privacy bunks and private lounge area gave everyone space, privacy, and total quiet at night.',
    stayOrProjectDate: 'August 2026',
    verified: true,
  },
  {
    id: 'rev-6',
    name: 'David Chen',
    role: 'Creative Producer & Video Director',
    companyOrOrigin: 'FrameWorks Media, Toronto',
    avatarUrl: '',
    initials: 'DC',
    rating: 5,
    serviceCategory: 'Social Media Content & Visual Production',
    reviewText:
      'Our production crew stayed four nights on the Extended Stay Package. Every corner of 29 Eustace Street is photogenic, the 24/7 security gave us peace of mind with camera gear, and reception helped us coordinate local shoots.',
    stayOrProjectDate: 'August 2026',
    verified: true,
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gal-1',
    title: '29 Eustace Street Georgian Facade at Twilight',
    category: 'Exterior & Street',
    caption: 'Our signature royal blue entrance canopy and warm glowing lounge windows in the heart of Temple Bar, Dublin 2.',
    image: IMAGES.heroExterior,
    aspect: '16:9',
  },
  {
    id: 'gal-2',
    title: 'Georgian Deluxe King En-Suite',
    category: 'Private Suites',
    caption: 'Bespoke deep navy wall panelling, burnt-orange velvet cushions, brass reading lamps, and tall sash windows.',
    image: IMAGES.deluxeKing,
    aspect: '4:3',
  },
  {
    id: 'gal-3',
    title: 'Ground-Floor Social Lounge & Artisan Cafe',
    category: 'Social Lounge',
    caption: 'Exposed historic Dublin brick, deep blue velvet banquets, warm amber pendant lighting, and freshly roasted coffee.',
    image: IMAGES.socialLounge,
    aspect: '16:9',
  },
  {
    id: 'gal-4',
    title: 'Temple Bar Heritage Family & Group Suite',
    category: 'Family Rooms',
    caption: 'Custom solid-oak architectural bunks with blackout drapes, individual reading sconces, and private seating area.',
    image: IMAGES.familySuite,
    aspect: '4:3',
  },
  {
    id: 'gal-5',
    title: 'Liffey Executive Business Studio',
    category: 'Private Suites',
    caption: 'Dedicated solid-oak workstation, leather task chair, in-room espresso bar, and views over historic Dublin.',
    image: IMAGES.executiveStudio,
    aspect: '4:3',
  },
];

export const MASTER_AI_PROMPT_TEXT = `Build a complete 4-Page Multi-Page Luxury Boutique Hostel & Hotel Website (NOT a single one-page site) for:
- Business Name: Global Hostel at Temple Bar
- Phone / WhatsApp: +353 1 677 9158
- Address: 29 Eustace St, Temple Bar, Dublin 2, D02 F635, Ireland
- Brand Color Theme: Royal/Navy Blue (#0B1E3B / #1E3A8A) and Burnt/Vibrant Orange (#EA580C / #F97316) on a crisp alabaster/white canvas (#F8FAFC / #FFFFFF).

MULTI-PAGE STRUCTURE (4 SEPARATE PAGES):
1. Page 1 — Home (Landing Page with 6 Distinct Sections):
   - Section 1: Hero Showcase & Instant Check-In/Check-Out Availability Bar (29 Eustace St, Temple Bar, Dublin 2)
   - Section 2: Luxury Rooms & Suites Showcase (Room images, nightly EUR prices, facilities, occupancy, and WhatsApp booking buttons)
   - Section 3: Exclusive Offers & Packages (Featured offer banner + 6 packages: Weekend Getaway, Extended Stay, Romantic Stay, Family Stay, Business Stay, Seasonal Special Offers + Offer FAQ)
   - Section 4: Temple Bar Facilities & Amenities (24/7 Reception, 1 Gbps Wi-Fi, Artisan Cafe Lounge, Secure Luggage, Georgian Architecture)
   - Section 5: Customer Reviews & Ratings (5.0 / 4.9 overall rating, 5-to-1 star breakdown bars, Google Reviews card, Trustpilot card, functional "Review Us!" QR code card) + "What Our Clients Say" 3-Column Verified Testimonials Grid
   - Section 6: Photo Gallery & Embedded Google Maps Location (29 Eustace St, Temple Bar, Dublin 2, D02 F635, Ireland)
2. Page 2 — Rooms & Suites (/rooms):
   - Dedicated room catalog, category filter, room comparison, and direct/WhatsApp reservation drawer.
3. Page 3 — Exclusive Offers & Packages (/offers):
   - Dedicated offers experience with Featured Offer Banner, all 6 detailed package cards, interactive date/guest package calculator, WhatsApp direct inquiry, and Offer Validity FAQ.
4. Page 4 — Reviews, Gallery & Contact (/reviews-contact):
   - Dedicated Customer Reviews & Ratings dashboard with customizable Google Reviews / Trustpilot QR code generator, "What Our Clients Say" testimonials slider/grid, full lightbox Photo Gallery, Google Maps location, and direct reservation form.`;
