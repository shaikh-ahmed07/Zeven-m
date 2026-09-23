/* ==========================================================================
   Zeven-M Projects & Realty — site content
   --------------------------------------------------------------------------
   Everything a content editor needs to change lives in this file.
   Values marked PLACEHOLDER are demo content for the template and must be
   replaced with verified company information before going live.
   ========================================================================== */

import type { IconName } from '@/components/ui/Icon';

/** Unsplash placeholder photo. Replace with a local path such as
 *  "/images/residences-hero.jpg" once real imagery is available. */
export const photo = (id: string) =>
  // Capped at 2400px so the image optimizer never downloads multi-megabyte originals.
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2400&q=80`;

export const site = {
  name: 'Zeven-M Projects & Realty',
  tagline: 'From Vision to Creation — Excellence in Design, Development & Construction',
  supporting: 'Design. Develop. Construct.',
  office: 'Hyderabad, Telangana, India',
  phoneDisplay: '+91 85001 03000',
  phoneHref: 'tel:+918500103000',
  email: 'zevenmgroup@gmail.com',
  whatsapp: '918500103000', // country code + number, digits only (used for every WhatsApp link)
  whatsappText: 'Hello Zeven-M, I would like to know more about your projects.',
};

export const whatsappLink = (text: string = site.whatsappText) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

/** Office location on Google Maps (replace the query with the exact office address). */
export const officeMapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.office)}`;

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Services', href: '/services' },
  { label: 'Why Zeven-M', href: '/why-zeven' },
  { label: 'Contact', href: '/contact' },
];

/** A nav item is active on its own route and on any route beneath it (e.g. /projects/…). */
export const isActivePath = (href: string, pathname: string) =>
  href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

export const images = {
  hero: photo('1582407947304-fd86f028f716'),
  about: photo('1600585154340-be6161a56a0c'),
  aboutInset: photo('1600607688969-a5bfcd646154'),
  craft: photo('1503387762-592deb58ef4e'),
  craftDetails: [
    { src: photo('1504307651254-35680f356dfd'), label: 'Structure' },
    { src: photo('1531834685032-c34bf0d84c77'), label: 'Execution' },
    { src: photo('1487958449943-2429e8be8625'), label: 'Facade' },
  ],
  cta: photo('1600585154526-990dced4db0d'),
  /* Page banners */
  pageAbout: photo('1600047509358-9dc75507daeb'),
  pageServices: photo('1541888946425-d81bb19240f5'),
  pageProjects: photo('1460317442991-0ec209397118'),
  pageWhy: photo('1600596542815-ffad4c1539a9'),
  pageContact: photo('1600566753190-17f0baa2a6c3'),
};

/* Company statistics — PLACEHOLDER figures */
export const stats = [
  { value: 10, suffix: '+', label: 'Projects' },
  { value: 250, suffix: 'K+', label: 'Sq. Ft. Delivered' },
  { value: 15, suffix: '+', label: 'Years of Expertise' },
  { value: 500, suffix: '+', label: 'Happy Clients' },
  { value: 100, suffix: '%', label: 'Commitment to Quality' },
];

export type Service = {
  slug: string;
  no: string;
  icon: IconName;
  title: string;
  text: string;
  interest: string;
  scope: string[];
  image: string;
};
export const services: Service[] = [
  { slug: 'development', image: photo('1487958449943-2429e8be8625'), no: '01', icon: 'development', title: 'Development', interest: 'Project Enquiry',
    text: 'Strategic real-estate development focused on creating valuable, thoughtfully planned residential and commercial spaces.',
    scope: ['Land & opportunity assessment', 'Feasibility & financial planning', 'Master planning & product mix', 'Approvals coordination', 'Sales & marketing strategy'] },
  { slug: 'design-pmc', image: photo('1503387762-592deb58ef4e'), no: '02', icon: 'design', title: 'Design & PMC', interest: 'Design & PMC',
    text: 'Integrated design and project management that brings architectural vision, technical precision and execution together.',
    scope: ['Architectural & interior design', 'Structural & MEP coordination', 'Budgeting & cost control', 'Scheduling & progress tracking', 'Quality & safety audits'] },
  { slug: 'contracting', image: photo('1504307651254-35680f356dfd'), no: '03', icon: 'contracting', title: 'Contracting', interest: 'Construction',
    text: 'Disciplined construction execution with close attention to quality, timelines, materials and craftsmanship.',
    scope: ['Civil & structural works', 'Finishing & interiors', 'Procurement & materials management', 'Site supervision', 'Handover & snagging'] },
  { slug: 'real-estate', image: photo('1600210492486-724fe5c67fb0'), no: '04', icon: 'realestate', title: 'Real Estate', interest: 'Buying a Home',
    text: 'Premium residential and commercial spaces designed to deliver long-term value and a superior ownership experience.',
    scope: ['Premium apartments & villas', 'Commercial & retail spaces', 'Guided site visits', 'Documentation & home-loan assistance', 'After-sales support'] },
];

export const principles = [
  { title: 'Quality Without Compromise', text: 'Every material, detail and execution stage is approached with rigorous quality standards.' },
  { title: 'Design That Endures', text: 'We create spaces where architectural character meets functionality and long-term relevance.' },
  { title: 'Transparent Execution', text: 'Clear communication, structured processes and responsible project management.' },
  { title: 'Client-Centric Approach', text: 'Every project is designed around delivering a seamless and superior client experience.' },
];

export const processSteps = [
  { title: 'Vision', text: "Understanding the client's goals, site and opportunity." },
  { title: 'Design', text: 'Developing the architectural and spatial concept.' },
  { title: 'Planning', text: 'Engineering, approvals, budgeting and project planning.' },
  { title: 'Construction', text: 'Executing with precision, safety and quality control.' },
  { title: 'Delivery', text: 'Final finishing, quality inspection and handover.' },
];

/* PLACEHOLDER testimonials */
export const testimonials = [
  { quote: 'The entire experience was handled with professionalism, transparency and attention to detail.',
    name: 'Client Name', role: 'Homeowner, Zeven-M Residences' },
  { quote: 'From the first site visit to handover, every conversation was clear and every commitment was honoured.',
    name: 'Client Name', role: 'Villa Owner, Zeven-M Villas' },
  { quote: 'Their PMC team brought structure to a complex build. We always knew where the project stood.',
    name: 'Client Name', role: 'Commercial Partner' },
];

export const interestOptions = ['Buying a Home', 'Project Enquiry', 'Site Visit', 'Construction', 'Design & PMC', 'Partnership'];

export const amenityCatalogue = {
  pool: { label: 'Swimming Pool', icon: 'pool' },
  clubhouse: { label: 'Clubhouse', icon: 'clubhouse' },
  gym: { label: 'Gymnasium', icon: 'gym' },
  gardens: { label: 'Landscaped Gardens', icon: 'leaf' },
  play: { label: "Children's Play Area", icon: 'play' },
  games: { label: 'Indoor Games', icon: 'games' },
  hall: { label: 'Multipurpose Hall', icon: 'hall' },
  security: { label: '24×7 Security', icon: 'shield' },
  parking: { label: 'Covered Parking', icon: 'parking' },
  track: { label: 'Walking Track', icon: 'track' },
  lounge: { label: 'Business Lounge', icon: 'clubhouse' },
  food: { label: 'Food Court', icon: 'hall' },
  jogging: { label: 'Jogging / Running Track', icon: 'track' },
  qurbani: { label: 'Qurbani & Ghusl Area', icon: 'drop' },
  lifts: { label: '2 Lifts (6–8 Passenger)', icon: 'lift' },
  cctv: { label: 'CCTV Surveillance', icon: 'camera' },
  power: { label: 'DG Power Backup', icon: 'bolt' },
  water: { label: 'Municipal & Borewell Water', icon: 'drop' },
  greenery: { label: 'Landscaped Greenery', icon: 'leaf' },
  stilt: { label: 'Stilt Parking', icon: 'parking' },
} satisfies Record<string, { label: string; icon: IconName }>;
export type AmenityKey = keyof typeof amenityCatalogue;

/* PLACEHOLDER travel times */
export const nearbyDefault = [
  { place: 'International Airport', time: 'XX min' },
  { place: 'IT Hub / Financial District', time: 'XX min' },
  { place: 'Schools', time: 'XX min' },
  { place: 'Hospitals', time: 'XX min' },
  { place: 'Shopping & Retail', time: 'XX min' },
  { place: 'Metro Station', time: 'XX min' },
  { place: 'Major Roads / ORR', time: 'XX min' },
];

/* --------------------------------------------------------------------------
   Projects — ALL DETAILS ARE PLACEHOLDER DEMO DATA.
   -------------------------------------------------------------------------- */
export type ProjectType = 'residential' | 'villas' | 'commercial';
export type ProjectStatus = 'Ongoing' | 'Completed' | 'Upcoming';

export type Project = {
  slug: string;
  name: string;
  type: ProjectType;
  status: ProjectStatus;
  category: string;
  config: string;
  location: string;
  summary: string;
  image: string;
  heroImage: string;
  specs: [string, string][];
  overview: string[];
  overviewImage: string;
  residences: { type: string; area: string; price: string }[];
  amenities: AmenityKey[];
  gallery: [string, string][];
  /** Demo projects show "placeholder" notes; real projects set this to false. */
  placeholder?: boolean;
  /** Headline figures for the homepage feature. */
  highlights?: { value: string; unit?: string; label: string }[];
  brochure?: { href: string; label: string; size: string };
  /** Real floor-plan image (otherwise an illustrative plan is drawn). */
  floorPlan?: { src: string; width: number; height: number };
  developer?: string;
  locationText?: string;
  mapQuery?: string;
  nearby?: { place: string; time: string }[];
  nearbyNote?: string;
  specifications?: { group: string; items: [string, string][] }[];
  disclaimer?: string;
};

export const typeLabels: Record<ProjectType, string> = {
  residential: 'Residential',
  villas: 'Villas',
  commercial: 'Commercial',
};

export const projects: Project[] = [
  {
    slug: 'zeven-m-ace-apartments',
    name: 'Zeven-M Ace Apartments',
    type: 'residential',
    status: 'Ongoing',
    placeholder: false,
    category: 'Luxury Residences',
    config: '3 BHK · 1,750 sq. ft.',
    location: 'Sun City, Hyderabad',
    summary:
      'A select collection of extraordinary residences blending modern design, premium amenities and a prime location — for discerning homebuyers and investors.',
    image: '/images/projects/ace/ace-exterior-night.jpg',
    heroImage: '/images/projects/ace/ace-exterior-night.jpg',
    specs: [
      ['Address', 'Sun City, Hyderabad'], ['Storeys', '5'], ['Luxurious Homes', '20'],
      ['Configuration', '3 BHK'], ['Flat Size', '1,750 sq. ft.'], ['Approval', 'GHMC Approved'],
    ],
    highlights: [
      { value: '5', label: 'Storeys' },
      { value: '20', label: 'Luxurious Homes' },
      { value: '3', unit: 'BHK', label: 'Apartments' },
      { value: '1,750', unit: 'sq. ft.', label: 'Every Home' },
      { value: '2', unit: 'Lifts', label: '6–8 Passenger' },
    ],
    overview: [
      'Introducing Zeven-M Ace Apartments — your “exclusive” address at Sun City, Hyderabad. A select collection of 20 extraordinary 3 BHK residences across five storeys, blending modern design, premium amenities and a prime location.',
      'Guided by a vision to create a lasting legacy, every residence is masterfully crafted with superior ventilation, abundant natural light and a sense of enduring openness. Designed in strict adherence to all statutory norms, each space reflects an uncompromising attention to detail — from impeccably planned layouts to hand-selected premium fittings and refined finishes.',
    ],
    overviewImage: '/images/projects/ace/ace-exterior-day.jpg',
    residences: [{ type: '3 BHK', area: '1,750 sq. ft. (all flats)', price: 'Price on request' }],
    floorPlan: { src: '/images/projects/ace/ace-typical-floor-plan.jpg', width: 1131, height: 1599 },
    amenities: ['play', 'jogging', 'qurbani', 'lifts', 'cctv', 'power', 'water', 'greenery', 'stilt'],
    gallery: [
      ['/images/projects/ace/ace-exterior-night.jpg', 'Exterior at Dusk'],
      ['/images/projects/ace/ace-front-elevation.jpg', 'Front Elevation'],
      ['/images/projects/ace/ace-exterior-day.jpg', 'Exterior'],
      ['/images/projects/ace/ace-typical-floor-plan.jpg', 'Typical Floor Plan'],
    ],
    brochure: { href: '/brochures/zeven-m-ace-apartments-brochure.pdf', label: 'Download Brochure', size: 'PDF · 8.6 MB' },
    developer: 'Developed by Revelateurs Builders & Developers with Zeven-M Projects & Realty',
    locationText:
      'Located in Sun City’s elite enclave, with prime Outer Ring Road connectivity to Gachibowli, the Financial District, Narsingi and Rajendra Nagar — plus easy access to Rajiv Gandhi International Airport. Surrounded by retail, cafés and top schools.',
    mapQuery: 'Sun City, Bandlaguda Jagir, Hyderabad',
    nearby: [
      { place: 'Masjid Khadijatul Kubra', time: '2 min' },
      { place: 'Grocery & Local Shops', time: '5 min' },
      { place: 'Schools', time: '5 min' },
      { place: 'Vantage Line Mall', time: '10 min' },
      { place: 'Outer Ring Road', time: '10 min' },
      { place: 'Mantra Mall', time: '15 min' },
      { place: 'Gachibowli', time: '20 min' },
      { place: 'Rajiv Gandhi Intl. Airport', time: '25 min' },
    ],
    nearbyNote: 'Hospitals nearby: Care Hospital, AIG Hospital, Premiere Hospital, Shadan Medical College & Hospital.',
    specifications: [
      { group: 'Structure', items: [
        ['Foundation & Structure', 'R.C.C. framework designed for earthquake-resistant zone 2. Structural steel of Shree / Radha / Dhanalaxmi make. Ready-mix cement concrete (M20 grade).'],
        ['Walls', 'Red brick walls with smooth finish for internal and sponge finish for external walls.'],
      ] },
      { group: 'Flooring', items: [
        ['Living & Drawing Room', 'Italian-finish vitrified tiles, big size.'],
        ['Bedrooms', 'Vitrified tiles.'],
        ['Bathrooms & Utility', 'Anti-skid ceramic tiles of reputed make, with wall dadoing.'],
        ['Common Areas & Staircase', 'Granite flooring.'],
      ] },
      { group: 'Finishes', items: [
        ['Painting', 'External: two coats of exterior emulsion (Asian Paints). Internal: smooth putty finish with two coats of premium emulsion over a coat of primer.'],
        ['False Ceiling', 'Designer false ceiling in living, drawing and bedrooms with provision for lighting; false ceiling in entrance lounge and common areas.'],
        ['Windows', 'UPVC glazed shutters with mosquito mesh and MS safety grill.'],
        ['Doors', 'Main door: melamine-polished teak wood frame and shutter. Internal: teak wood frame with laminated flush doors. SS hardware with locks by Yale, Dorset or Godrej.'],
      ] },
      { group: 'Kitchen & Bath', items: [
        ['Kitchen', 'Provisions for plumbing and electrical appliances.'],
        ['Sanitary', 'Ceramic ware and CP fittings of Cera / Jaquar in all bathrooms and kitchen. Concealed PVC & CPVC pipelines (Ashirvad, Astral, Prince or Supreme).'],
      ] },
      { group: 'Services', items: [
        ['Electrical', 'Concealed copper wiring with adequate points for TV, exhaust fans, geyser, AC etc. MCB in all apartments; inverter wiring provided. Wiring: Polycab / Finolex; switches: Legrand / Havells / Anchor or equivalent.'],
        ['Power Backup', 'Diesel generator backup for lifts and common areas.'],
        ['Water Supply', 'Municipal water, plus borewell water supplied through overhead tanks.'],
        ['Lifts', '2 lifts of 6–8 passenger capacity with standby generator.'],
        ['Security', 'CCTV cameras at the main entrance, parking and corridors of all floors.'],
      ] },
      { group: 'Outdoors', items: [
        ['Landscaping', 'Ample greenery and landscaping on all sides along the boundary, and tot-lots.'],
        ['Amenities', 'Kids’ play area, running track, Qurbani (slaughter) & Ghusl (washing) area and other amenities.'],
      ] },
    ],
    disclaimer:
      'GHMC approved · OC post completion. This presentation is conceptual in nature and not by any means a legal offering. The promoters reserve the right to change, delete or add any specifications or plans mentioned herein.',
  },
  {
    slug: 'zeven-m-residences',
    name: 'Zeven-M Residences',
    type: 'residential',
    status: 'Ongoing',
    category: 'Premium Residential Development',
    config: '2 & 3 BHK Apartments',
    location: 'Hyderabad, Telangana',
    summary: 'A contemporary residential development designed around comfort, connectivity and modern urban living.',
    image: photo('1515263487990-61b07816b324'),
    heroImage: photo('1582407947304-fd86f028f716'),
    specs: [
      ['Project Area', '3.5 Acres'], ['Towers', '3'], ['Floors', 'G + XX'],
      ['Units', '300+'], ['Configurations', '2 & 3 BHK'], ['Possession', 'To be announced'],
    ],
    overview: [
      'Zeven-M Residences brings together three contemporary towers set within landscaped open spaces, planned so that light, ventilation and privacy shape every home.',
      'Generous floor plates, considered circulation and a lifestyle podium create a community that feels calm and complete, while remaining close to the city’s key business and social destinations.',
    ],
    overviewImage: photo('1600607687939-ce8a6c25118c'),
    residences: [
      { type: '2 BHK', area: 'XXXX – XXXX sq. ft.', price: '₹ X.XX Cr onwards' },
      { type: '3 BHK', area: 'XXXX – XXXX sq. ft.', price: '₹ X.XX Cr onwards' },
      { type: '4 BHK', area: 'XXXX – XXXX sq. ft.', price: 'Price on request' },
    ],
    amenities: ['pool', 'clubhouse', 'gym', 'gardens', 'play', 'games', 'hall', 'security', 'parking', 'track'],
    gallery: [
      [photo('1515263487990-61b07816b324'), 'Exterior'],
      [photo('1628744448840-55bdb2497bd4'), 'Entrance'],
      [photo('1497366216548-37526070297c'), 'Lobby'],
      [photo('1600607687939-ce8a6c25118c'), 'Living Room'],
      [photo('1616594039964-ae9021a400a0'), 'Bedroom'],
      [photo('1600585152220-90363fe7e115'), 'Kitchen'],
      [photo('1582268611958-ebfd161ef9cf'), 'Amenities'],
      [photo('1576013551627-0cc20b96c2a7'), 'Landscaping'],
      [photo('1541888946425-d81bb19240f5'), 'Aerial View'],
    ],
  },
  {
    slug: 'zeven-m-villas',
    name: 'Zeven-M Villas',
    type: 'villas',
    status: 'Ongoing',
    category: 'Luxury Villa Community',
    config: 'Signature 4 BHK Villas',
    location: 'Hyderabad, Telangana',
    summary: 'A gated community of signature villas with private gardens, double-height living and resort-style amenities.',
    image: photo('1613490493576-7fde63acd811'),
    heroImage: photo('1613977257363-707ba9348227'),
    specs: [
      ['Project Area', 'XX Acres'], ['Villas', 'XX'], ['Floors', 'G + 2'],
      ['Plot Sizes', 'XXX – XXX sq. yd.'], ['Configurations', '4 BHK'], ['Possession', 'To be announced'],
    ],
    overview: [
      'Zeven-M Villas is a private enclave of contemporary homes where indoor and outdoor living flow into one another through courtyards, terraces and landscaped edges.',
      'Each villa is planned for families who value space, privacy and craftsmanship — with a clubhouse and green spine that bring the community together.',
    ],
    overviewImage: photo('1600210492486-724fe5c67fb0'),
    residences: [
      { type: '4 BHK Villa', area: 'XXXX sq. ft.', price: '₹ X.XX Cr onwards' },
      { type: '4 BHK + Study', area: 'XXXX sq. ft.', price: 'Price on request' },
    ],
    amenities: ['pool', 'clubhouse', 'gym', 'gardens', 'play', 'security', 'parking', 'track'],
    gallery: [
      [photo('1613977257363-707ba9348227'), 'Exterior'],
      [photo('1600596542815-ffad4c1539a9'), 'Pool Deck'],
      [photo('1600210492486-724fe5c67fb0'), 'Living Room'],
      [photo('1613545325278-f24b0cae1224'), 'Lounge'],
      [photo('1616594039964-ae9021a400a0'), 'Bedroom'],
      [photo('1600585152220-90363fe7e115'), 'Kitchen'],
      [photo('1600573472550-8090b5e0745e'), 'Courtyard'],
      [photo('1576013551627-0cc20b96c2a7'), 'Landscaping'],
    ],
  },
  {
    slug: 'zeven-m-business-hub',
    name: 'Zeven-M Business Hub',
    type: 'commercial',
    status: 'Upcoming',
    category: 'Modern Commercial Development',
    config: 'Retail & Office Spaces',
    location: 'Hyderabad, Telangana',
    summary: 'Grade-A workspaces and high-street retail designed for visibility, efficiency and a refined business address.',
    image: photo('1486406146926-c627a92ad1ab'),
    heroImage: photo('1486406146926-c627a92ad1ab'),
    specs: [
      ['Project Area', 'XX Acres'], ['Towers', 'X'], ['Floors', 'G + XX'],
      ['Leasable Area', 'X.X Lakh sq. ft.'], ['Configurations', 'Office & Retail'], ['Possession', 'To be announced'],
    ],
    overview: [
      'Zeven-M Business Hub is planned as a contemporary commercial address — efficient floor plates, a double-height arrival lobby and a retail podium that animates the street.',
      'Designed for growing enterprises and flagship retail, it combines flexible layouts with the infrastructure modern businesses expect.',
    ],
    overviewImage: photo('1497366811353-6870744d04b2'),
    residences: [
      { type: 'Office Suites', area: 'XXXX – XXXX sq. ft.', price: 'Price on request' },
      { type: 'Retail Units', area: 'XXX – XXXX sq. ft.', price: 'Price on request' },
      { type: 'Full Floors', area: 'XXXXX sq. ft.', price: 'Price on request' },
    ],
    amenities: ['lounge', 'food', 'gym', 'hall', 'security', 'parking'],
    gallery: [
      [photo('1486406146926-c627a92ad1ab'), 'Exterior'],
      [photo('1497366811353-6870744d04b2'), 'Workspace'],
      [photo('1497366216548-37526070297c'), 'Lobby'],
      [photo('1497215842964-222b430dc094'), 'Office'],
      [photo('1487958449943-2429e8be8625'), 'Facade Detail'],
      [photo('1429497419816-9ca5cfb4571a'), 'Construction'],
    ],
  },
  {
    slug: 'zeven-m-heights',
    name: 'Zeven-M Heights',
    type: 'residential',
    status: 'Completed',
    category: 'Premium Urban Residences',
    config: '2, 3 & 4 BHK',
    location: 'Hyderabad, Telangana',
    summary: 'Elevated city living with panoramic views, efficient layouts and a rooftop lifestyle deck.',
    image: photo('1545324418-cc1a3fa10c00'),
    heroImage: photo('1545324418-cc1a3fa10c00'),
    specs: [
      ['Project Area', 'X.X Acres'], ['Towers', 'X'], ['Floors', 'G + XX'],
      ['Units', 'XXX'], ['Configurations', '2, 3 & 4 BHK'], ['Status', 'Completed'],
    ],
    overview: [
      'Zeven-M Heights rises above the city with homes arranged to capture light and long views, supported by a rooftop deck and a landscaped podium.',
      'A considered palette of materials and a disciplined build process deliver homes that feel refined from the first day and endure for years.',
    ],
    overviewImage: photo('1600566753086-00f18fb6b3ea'),
    residences: [
      { type: '2 BHK', area: 'XXXX sq. ft.', price: 'Resale enquiries' },
      { type: '3 BHK', area: 'XXXX sq. ft.', price: 'Resale enquiries' },
      { type: '4 BHK', area: 'XXXX sq. ft.', price: 'Resale enquiries' },
    ],
    amenities: ['pool', 'clubhouse', 'gym', 'gardens', 'play', 'games', 'security', 'parking'],
    gallery: [
      [photo('1545324418-cc1a3fa10c00'), 'Exterior'],
      [photo('1600566753086-00f18fb6b3ea'), 'Living Room'],
      [photo('1631049307264-da0ec9d70304'), 'Bedroom'],
      [photo('1507089947368-19c1da9775ae'), 'Kitchen'],
      [photo('1571902943202-507ec2618e8f'), 'Gymnasium'],
      [photo('1600566752355-35792bedcfea'), 'Bath'],
    ],
  },
  {
    slug: 'zeven-m-courtyard-villas',
    name: 'Zeven-M Courtyard Villas',
    type: 'villas',
    status: 'Completed',
    category: 'Contemporary Courtyard Homes',
    config: '3 & 4 BHK Villas',
    location: 'Hyderabad, Telangana',
    summary: 'Low-rise courtyard homes that pair warm materials with open, light-filled family living.',
    image: photo('1600585154340-be6161a56a0c'),
    heroImage: photo('1600585154340-be6161a56a0c'),
    specs: [
      ['Project Area', 'XX Acres'], ['Villas', 'XX'], ['Floors', 'G + 1'],
      ['Plot Sizes', 'XXX sq. yd.'], ['Configurations', '3 & 4 BHK'], ['Status', 'Completed'],
    ],
    overview: [
      'Zeven-M Courtyard Villas is organised around private courtyards that bring daylight and greenery into the heart of every home.',
      'Timber, stone and glass come together in a restrained palette, detailed with the precision that defines every Zeven-M project.',
    ],
    overviewImage: photo('1604014237800-1c9102c219da'),
    residences: [
      { type: '3 BHK Villa', area: 'XXXX sq. ft.', price: 'Resale enquiries' },
      { type: '4 BHK Villa', area: 'XXXX sq. ft.', price: 'Resale enquiries' },
    ],
    amenities: ['clubhouse', 'gardens', 'play', 'security', 'parking', 'track'],
    gallery: [
      [photo('1600585154340-be6161a56a0c'), 'Exterior'],
      [photo('1600607688969-a5bfcd646154'), 'Garden'],
      [photo('1604014237800-1c9102c219da'), 'Living & Dining'],
      [photo('1618221195710-dd6b41faaea6'), 'Lounge'],
      [photo('1600585152220-90363fe7e115'), 'Kitchen'],
    ],
  },
  {
    slug: 'zeven-m-square',
    name: 'Zeven-M Square',
    type: 'commercial',
    status: 'Completed',
    category: 'Boutique Commercial Address',
    config: 'Offices & Showrooms',
    location: 'Hyderabad, Telangana',
    summary: 'A boutique commercial building with a crafted facade, flexible office floors and ground-level showrooms.',
    image: photo('1600047509807-ba8f99d2cdde'),
    heroImage: photo('1600047509807-ba8f99d2cdde'),
    specs: [
      ['Site Area', 'XX,XXX sq. ft.'], ['Blocks', '1'], ['Floors', 'G + X'],
      ['Units', 'XX'], ['Configurations', 'Office & Showroom'], ['Status', 'Completed'],
    ],
    overview: [
      'Zeven-M Square gives growing businesses a distinctive address — a layered facade of timber-toned cladding and glass, with generous frontage for showrooms.',
      'Its compact, efficient floors are planned for flexibility, supported by dependable services and structured parking.',
    ],
    overviewImage: photo('1497366216548-37526070297c'),
    residences: [
      { type: 'Office Units', area: 'XXX – XXXX sq. ft.', price: 'Price on request' },
      { type: 'Showrooms', area: 'XXXX sq. ft.', price: 'Price on request' },
    ],
    amenities: ['lounge', 'security', 'parking', 'hall'],
    gallery: [
      [photo('1600047509807-ba8f99d2cdde'), 'Facade'],
      [photo('1497366216548-37526070297c'), 'Lobby'],
      [photo('1497366811353-6870744d04b2'), 'Workspace'],
      [photo('1487958449943-2429e8be8625'), 'Detail'],
    ],
  },
];

/** The development featured on the homepage. */
export const featured = projects.find((p) => p.slug === 'zeven-m-ace-apartments')!;

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/** Alt text that flags stock photography on demo projects only. */
export const projectAlt = (p: Project, label: string) =>
  `${p.name} — ${label}${p.placeholder === false ? '' : ' (placeholder image)'}`;
