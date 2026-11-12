export interface ServiceItem {
  id: string;
  name: string;
  category: 'design' | 'dev' | 'marketing' | 'perf';
  tagline: string;
  description: string;
  deliverables: string[];
  techStack: string[];
  timeline: string;
  thumbnail: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  category: string;
  filterCategory: 'all' | 'fintech' | 'fashion' | 'web3';
  year: string;
  image: string;
  isHighlight?: boolean;
  colSpan: string;
  summary: string;
  challenge: string;
  solution: string;
  metrics: { label: string; value: string }[];
  tags: string[];
}

export const AGENCY_SERVICES: ServiceItem[] = [
  {
    id: 'interactive-apps',
    name: 'Interactive Web Apps',
    category: 'dev',
    tagline: 'WebGL, Three.js & Framer-Grade Interactions',
    description: 'We build ultra-responsive, dynamic digital experiences with rich GPU-accelerated motion, real-time collaboration, and fluid tactile state transitions.',
    deliverables: [
      'Interactive 3D WebGL / Three.js Shaders',
      'Micro-Interaction Design System',
      'Custom State Management & WebSockets',
      'Production-Grade Accessible Canvas APIs'
    ],
    techStack: ['React', 'TypeScript', 'Three.js', 'Framer Motion', 'Tailwind CSS'],
    timeline: '4 - 8 Weeks',
    thumbnail: '/src/assets/images/service_swirl_monochrome_1794480048839.jpg'
  },
  {
    id: 'custom-ecommerce',
    name: 'Custom E-Commerce',
    category: 'dev',
    tagline: 'Headless Flagships with Sub-Second Checkout',
    description: 'Bespoke commerce storefronts engineered for prestige brands who reject cookie-cutter Shopify templates. High conversion, ultra-fast TTFB, and custom product customizers.',
    deliverables: [
      'Headless Storefront Architecture',
      'Bespoke 3D Product Visualizers',
      'Custom Cart & Streamlined Checkout Funnels',
      'Multi-Currency & Global Edge CDN Caching'
    ],
    techStack: ['Shopify Hydrogen', 'Next.js', 'Stripe', 'GraphQL', 'Tailwind'],
    timeline: '6 - 10 Weeks',
    thumbnail: '/src/assets/images/work_pixel_pop_fashion_1794480049633.jpg'
  },
  {
    id: 'high-end-design',
    name: 'High-End Web Design',
    category: 'design',
    tagline: 'Modern Brutalism & Avant-Garde Typography',
    description: 'Distinctive digital identities crafted with bold structural layouts, intentional negative space, and bespoke type systems that anchor market authority.',
    deliverables: [
      'Design System & Component Library',
      'Typography & Structural Grid Architecture',
      'High-Fidelity Interactive Prototypes',
      'Motion Design & Kinetic Branding'
    ],
    techStack: ['Figma', 'Custom Font Engineering', 'Design Tokens', 'Cinema 4D'],
    timeline: '3 - 6 Weeks',
    thumbnail: '/src/assets/images/service_swirl_monochrome_1794480048839.jpg'
  },
  {
    id: 'ui-ux-architecture',
    name: 'UI/UX Architecture',
    category: 'design',
    tagline: 'Frictionless Usability for Complex Software',
    description: 'We turn high-complexity workflows into effortlessly intuitive interfaces. Information architecture engineered for high cognitive throughput and minimal friction.',
    deliverables: [
      'User Journey & Cognitive Friction Audits',
      'Wireframing & Modular Component Hierarchy',
      'Rapid User Testing & Heuristic Evaluation',
      'Design-to-Code Engineering Handshake'
    ],
    techStack: ['Figma', 'Storybook', 'Design Systems', 'Usability Testing'],
    timeline: '3 - 5 Weeks',
    thumbnail: '/src/assets/images/work_brutalist_structure_1794480050788.jpg'
  }
];

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: 'brutalist-pavilion',
    title: 'Monolith Architectural Gallery',
    client: 'Atelier Kroma Paris',
    category: 'Spatial Architecture & Digital Archive',
    filterCategory: 'all',
    year: '2026 ARCHITECTURE',
    image: '/src/assets/images/work_brutalist_structure_1794480050788.jpg',
    colSpan: 'lg:col-span-5',
    summary: 'A minimalist digital archive showcasing concrete brutalist structures with interactive lighting simulators and physical exhibition ticketing.',
    challenge: 'Showcase massive architectural installations digitally without losing their raw physical presence and spatial scale.',
    solution: 'Designed an ultra-wide masonry layout with interactive daylight simulation shaders and smooth kinetic transitions.',
    metrics: [
      { label: 'Avg Session Duration', value: '4m 38s' },
      { label: 'Ticket Pre-orders', value: '+185%' },
      { label: 'Global Design Awards', value: '3 Honors' }
    ],
    tags: ['Architecture', 'Brutalism', 'WebGL', 'Archive']
  },
  {
    id: 'monochrome-flow',
    title: 'Vortex Protocol Engine',
    client: 'Vortex Finance AG (Zurich)',
    category: 'Decentralized Liquidity Terminal',
    filterCategory: 'fintech',
    year: '2026 FINTECH',
    image: '/src/assets/images/work_monochrome_flow_1794480049627.jpg',
    colSpan: 'lg:col-span-7',
    summary: 'A next-generation liquidity routing dashboard featuring high-frequency orderbook visuals and parametric ribbon telemetry.',
    challenge: 'Present institutional trading feeds and multi-pool liquidity depth in an ultra-clean, distraction-free environment.',
    solution: 'Engineered a low-latency WebGL canvas layer with tabular numerical precision and zero visual clutter.',
    metrics: [
      { label: 'Trade Execution Speed', value: '<18ms' },
      { label: 'Monthly Trading Volume', value: '$840M+' },
      { label: 'User Retention', value: '94.2%' }
    ],
    tags: ['Fintech', 'Parametric UI', 'High-Frequency', 'Dashboard']
  },
  {
    id: 'geometric-structure',
    title: 'Kinetic Sound Sculpture',
    client: 'Echoform Laboratories',
    category: 'Interactive Audio-Visual System',
    filterCategory: 'web3',
    year: '2026 EXPERIMENTAL',
    image: '/src/assets/images/service_swirl_monochrome_1794480048839.jpg',
    colSpan: 'lg:col-span-4',
    summary: 'A generative audio reactive installation enabling visitors to compose spatial soundscapes via interactive fluid physics.',
    challenge: 'Synchronizing real-time spatial web audio with complex 60fps vector physics across touch and mouse inputs.',
    solution: 'Built a custom Web Audio synthesizer paired with GLSL shaders for zero-latency acoustic visualization.',
    metrics: [
      { label: 'FPS Stability', value: 'Solid 60fps' },
      { label: 'Interactive Compositions', value: '1.2M+' },
      { label: 'Core Web Vitals', value: '100 / 100' }
    ],
    tags: ['Web Audio', 'Generative Art', 'Interactive', 'Experimental']
  },
  {
    id: 'abstract-sculpture',
    title: 'Aura Spatial OS',
    client: 'Aura Computing Ltd',
    category: 'Spatial Design Language',
    filterCategory: 'web3',
    year: '2026 WEB3 & AI',
    image: '/src/assets/images/hero_fluid_sculpture_1794480046705.jpg',
    colSpan: 'lg:col-span-4',
    summary: 'Design system and interface paradigm for next-generation spatial computing headsets and collaborative holographic whiteboards.',
    challenge: 'Inventing intuitive micro-gestures and depth hierarchy for mixed-reality viewport navigation.',
    solution: 'Crafted iridescent 3D fluid states and tactile glass physics that respond naturally to eye-tracking and pinch gestures.',
    metrics: [
      { label: 'Cognitive Load Reduction', value: '-38%' },
      { label: 'Task Completion Rate', value: '99.4%' },
      { label: 'Developer Adoption', value: '45k+ Devs' }
    ],
    tags: ['Spatial OS', 'UI Architecture', '3D Fluid', 'Gestures']
  },
  {
    id: 'pixel-pop-fashion',
    title: 'Pixel Pop Fashion',
    client: 'Pixel Pop Apparel Berlin',
    category: 'High-Fashion E-Commerce Storefront',
    filterCategory: 'fashion',
    year: '2026 E-COMMERCE',
    image: '/src/assets/images/work_pixel_pop_fashion_1794480049633.jpg',
    isHighlight: true,
    colSpan: 'lg:col-span-4',
    summary: 'An avant-garde streetwear flagship combining editorial fashion photography, live 3D garment fitting, and 2-click Apple Pay checkout.',
    challenge: 'Traditional e-commerce templates failed to capture the counter-culture energy of the brand, leading to high cart abandonment.',
    solution: 'Delivered a brutalist high-contrast digital flagship with fluid editorial motion and instantaneous page transitions.',
    metrics: [
      { label: 'Conversion Rate', value: '+240%' },
      { label: 'Average Order Value', value: '€285 (+42%)' },
      { label: 'Mobile Checkout Speed', value: '1.4s' }
    ],
    tags: ['Luxury E-Commerce', 'Avant-Garde', 'Headless', 'High Conversion']
  }
];
