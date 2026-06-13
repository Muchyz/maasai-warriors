import { useState, useEffect, useRef } from "react";
import {
  Menu, X, Phone, Mail, MapPin, Clock, Star, ChevronRight,
  ChevronDown, Users, Calendar, Shield, Award, Leaf, Globe,
  Camera, Compass, Sun, Moon, Coffee, Wifi, Car, CheckCircle,
  ArrowRight, Send,
  MessageCircle, Heart, Eye, Binoculars, Tent, Utensils,
  ThumbsUp, Navigation, AlertCircle, Info, Search, Filter,
  Play, Volume2, Wind, Droplets, Thermometer, Map, CreditCard, ShieldCheck, RotateCcw, CloudRain, Building2, Smartphone, Landmark, Wallet, Quote, ChevronUp
} from "lucide-react";
import { FaWhatsapp, FaFacebookF, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

/* ── CONSTANTS ─────────────────────────────────────────── */
const PHONE1 = "254733415826";
const PHONE2 = "254722572068";
const EMAIL = "safarimaasaiwarriors@gmail.com";
const wa = (msg) => `https://wa.me/${PHONE2}?text=${encodeURIComponent(msg)}`;
const SOCIAL_LINKS = [
  { Icon: FaFacebookF, href: "https://www.facebook.com/Maasaiwarriorstours", color: "#1877F2", label: "Facebook" },
  { Icon: FaWhatsapp, href: wa("Hello Maasai Warriors! I want to enquire about a safari 🦁"), color: "#25D366", label: "WhatsApp" },
  { Icon: FaEnvelope, href: `mailto:${EMAIL}`, color: "#EA4335", label: "Email" },
  { Icon: FaPhoneAlt, href: `tel:+${PHONE2}`, color: "#34A853", label: "Call" },
];

/* ── DATA ──────────────────────────────────────────────── */
const NAV = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Team", id: "team" },
  { label: "Services", id: "services" },
  { label: "Packages", id: "packages" },
  { label: "Destinations", id: "destinations" },
  { label: "Gallery", id: "gallery" },
  { label: "FAQ", id: "faq" },
  { label: "Contact", id: "contact" },
];

const SERVICES = [
  { icon: Binoculars, title: "Game Drives", desc: "Witness the Big Five in their natural habitat with expert Maasai guides who read the bush like a map.", img: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=700&q=80" },
  { icon: Users, title: "Cultural Tours", desc: "Step into authentic Maasai village life — dances, traditions, beadwork, and stories passed down generations.", img: "/cultural.jpg" },
  { icon: Tent, title: "Overnight Safari", desc: "Sleep under a sky full of stars. Full camp setup, gourmet bush meals, and guided night walks included.", img: "/overnight.jpg" },
  { icon: Droplets, title: "Lake Naivasha", desc: "Boat rides, hippo spotting, and flamingo watching at one of Kenya's most scenic Rift Valley lakes.", img: "/naivasha-boat.jpg" },
  { icon: Camera, title: "Photo Safaris", desc: "Dedicated photography tours timed with golden-hour light for wildlife shots worth framing.", img: "https://images.unsplash.com/photo-1551009175-8a68da93d5f9?w=700&q=80" },
  { icon: Heart, title: "Honeymoon Safaris", desc: "Private romantic safari experiences with sundowners, candlelit bush dinners, and luxury tent stays.", img: "/overnight.jpg" },
];

const PACKAGES = [
  {
    name: "Day Explorer",
    duration: "1 Day",
    price: "KSh 4,500",
    usd: "~$35",
    per: "per person",
    tag: null,
    features: ["Full-day game drive", "Professional Maasai guide", "Park entry fees", "Packed lunch & water", "Hotel pickup (Gilgil area)", "Wildlife certificate"],
    img: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80",
  },
  {
    name: "Culture & Wildlife",
    duration: "2 Days / 1 Night",
    price: "KSh 9,800",
    usd: "~$75",
    per: "per person",
    tag: "Most Popular",
    features: ["Morning & evening game drive", "Maasai village cultural tour", "Overnight bush camp", "All meals included", "Bonfire & storytelling night", "Transport & guide", "Wildlife photo prints"],
    img: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=600&q=80",
  },
  {
    name: "Full Rift Valley",
    duration: "3 Days / 2 Nights",
    price: "KSh 18,500",
    usd: "~$143",
    per: "per person (min 4)",
    tag: "Best Value",
    features: ["2 full game drives", "Maasai cultural immersion", "Lake Naivasha boat ride", "Hell's Gate hike", "All meals & accommodation", "Dedicated guide & 4x4 vehicle", "Airport transfers", "Personalized photo album"],
    img: "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=600&q=80",
  },
  {
    name: "Grand Kenya Safari",
    duration: "7 Days / 6 Nights",
    price: "KSh 65,000",
    usd: "~$500",
    per: "per person (min 2)",
    tag: "Premium",
    features: ["Maasai Mara migration season", "Amboseli (Kilimanjaro views)", "Lake Nakuru flamingos", "Naivasha & Hell's Gate", "Luxury tented camps", "All inclusive", "Private vehicle & guide", "Pre-departure briefing kit"],
    img: "https://images.unsplash.com/photo-1551009175-8a68da93d5f9?w=600&q=80",
  },
];

const DESTINATIONS = [
  { name: "Hell's Gate NP", tag: "Gilgil Doorstep", desc: "Dramatic gorges, geothermal activity, and zebras you can cycle past. 30 minutes from our base.", img: "/hellsgate.jpg", hours: "45 min drive" },
  { name: "Lake Naivasha", tag: "Rift Valley", desc: "A stunning freshwater jewel in Kenya's Great Rift Valley. Cruise among hippos, spot African fish eagles, and walk through fever tree forests teeming with wildlife.", img: "/naivasha.jpg", hours: "40 min drive" },
  { name: "Maasai Mara", tag: "Iconic Reserve", desc: "The world's greatest wildlife spectacle. Get up close to lion prides, witness the Great Migration, and experience the endless golden savanna of the Mara.", img: "/mara.jpg", hours: "4 hr drive" },
  { name: "Lake Nakuru", tag: "Pink Flamingos", desc: "A dazzling soda lake where thousands of flamingos paint the shoreline pink, zebras roam freely, and endangered rhinos and leopards roam the surrounding national park.", img: "/nakuru.jpg", hours: "1 hr drive" },
  { name: "Amboseli NP", tag: "Kilimanjaro Views", desc: "Witness Africa's most iconic scene — zebras and wildlife grazing beneath the snow-capped peak of Mount Kilimanjaro, the continent's highest mountain.", img: "/amboseli.jpg", hours: "5 hr drive" },
  { name: "Maasai Village", tag: "Cultural Heart", desc: "Step into authentic Maasai village life. Meet the community, learn traditional beadwork, hear warrior stories, and share a meal — a human experience you will never forget.", img: "/maasaivillage.jpg", hours: "On-site" },
];

const GALLERY_IMGS = [
  { src: "/gallery5.jpg", label: "Group Safari at Hell's Gate" },
  { src: "/gallery1.jpg", label: "Guests on a Game Walk" },
  { src: "/gallery2.jpg", label: "Trekking the Rift Valley" },
  { src: "/gallery3.jpg", label: "Maasai Guide & Happy Guests" },
  { src: "/gallery4.jpg", label: "Meeting Our Maasai Guide" },
  { src: "/about.png", label: "Maasai Warriors Team" },
];

const REVIEWS = [
  { name: "James Mwangi", country: "Kenya", rating: 5, date: "March 2025", pkg: "Culture & Wildlife", text: "Best safari experience I have ever had. The Maasai guides were incredibly knowledgeable and made us feel so welcome. The overnight camp was breathtaking — woke up to zebras 10 metres away!" },
  { name: "Sophie Laurent", country: "France", rating: 5, date: "January 2025", pkg: "Full Rift Valley", text: "We visited a real Maasai village, saw lions hunting at dusk, and took a boat among hippos — all in 3 days. Totally worth every shilling. Organisé et authentique!" },
  { name: "David Ochieng", country: "Kenya", rating: 5, date: "December 2024", pkg: "Day Explorer", text: "Very professional and affordable. I booked last-minute and they sorted everything within an hour. The guide Joshua knew every animal by name. Will 100% be back with family." },
  { name: "Priya Sharma", country: "India", rating: 5, date: "February 2025", pkg: "Honeymoon Safari", text: "Our honeymoon was made magical by this team. Sundowners in the bush, a private candlelit dinner under the stars — it was pure romance. Thank you Maasai Warriors!" },
];

const FAQS = [
  { q: "When is the best time to visit Kenya for a safari?", a: "Kenya offers great game viewing year-round, but the peak season is July–October when the Great Migration crosses the Mara River. January–March is also excellent with fewer crowds. We operate all year and advise on the best timing for your interests." },
  { q: "What should I pack for a safari?", a: "Light, neutral-coloured clothing (khaki, beige, olive — avoid blue/black which attract tsetse flies), a fleece or jacket for early morning drives, comfortable walking shoes, sunscreen, insect repellent, binoculars, and your camera. We provide a full packing list after booking." },
  { q: "Is it safe to go on safari in Kenya?", a: "Absolutely. We are a fully licensed and insured tour operator. Our guides are trained in first aid and wilderness safety. We monitor park conditions daily and have emergency protocols in place. Kenya receives millions of tourists safely each year." },
  { q: "How do I book and when do I pay?", a: "Send us a WhatsApp message or fill in the booking form. We'll confirm availability and send a quote. Payment is made after confirmation — you only pay when the itinerary is agreed and you are fully satisfied with the plan." },
  { q: "Can you customise a package for my group?", a: "Yes, absolutely. Group bookings, school trips, corporate retreats, and family safaris are our specialty. Tell us your group size, dates, interests, and budget and we'll build a custom itinerary just for you." },
  { q: "Do you cater for solo travellers?", a: "Yes! Solo safari packages are available and we regularly join solo travellers with small groups so you never miss out. Prices may vary slightly. Contact us and we'll find the best fit." },
  { q: "What vehicles do you use?", a: "We use 4x4 Land Cruisers and safari vans with open pop-up roofs for optimal game viewing and photography. All vehicles are regularly serviced and have first-aid kits, charging points, and cool boxes." },
  { q: "Are meals included in packages?", a: "Day packages include a packed lunch and water. Overnight and multi-day packages include all meals — bush breakfasts, packed lunches, and evening campfire dinners prepared by our camp cook." },
];

const PAYMENT_METHODS = [
  { name: "M-Pesa", desc: "Instant mobile money transfer, Kenya's most popular payment method", icon: "Smartphone" },
  { name: "Visa / Mastercard", desc: "Secure card payments accepted at confirmation", icon: "CreditCard" },
  { name: "Bank Transfer", desc: "Direct transfer for group and corporate bookings", icon: "Landmark" },
  { name: "Cash on Arrival", desc: "Pay in KSh or USD on the day of your safari", icon: "Wallet" },
];

const POLICIES = [
  { title: "Pay After Confirmation", desc: "No upfront payment needed. You pay only once your itinerary is agreed and confirmed." },
  { title: "Free Cancellation (48hrs)", desc: "Cancel or reschedule up to 48 hours before your safari for a full refund, no questions asked." },
  { title: "Weather Guarantee", desc: "If extreme weather forces a cancellation, we'll reschedule free of charge or refund in full." },
];

const PARTNERS = [
  "Kenya Tourism Board", "Maasai Mara Conservancy", "Lake Naivasha Lodge", "Hell's Gate Park Authority", "EcoTourism Kenya", "Rift Valley Safari Camps",
];

const SEASONS = [
  { period: "Jan – Mar", title: "Green Season", desc: "Lush landscapes, fewer crowds, great birdwatching and newborn wildlife.", icon: "Leaf" },
  { period: "Jul – Oct", title: "Great Migration", desc: "Peak season — witness millions of wildebeest cross the Mara River.", icon: "Compass" },
  { period: "Nov – Dec", title: "Short Rains", desc: "Dramatic skies, vibrant scenery, and excellent value for money.", icon: "Droplets" },
];

const TEAM = [
  { name: "Joshua Lekoolal", role: "Lead Safari Guide & Founder", img: "/joshua.png", bio: "Born and raised in the Maasai Mara, Joshua has 15+ years guiding Big Five safaris and speaks English, Swahili, and Maa.", tags: ["KPSGA Licensed", "15+ Years", "EN · SW · Maa"] },
];

const WHY = [
  { icon: Leaf, title: "Eco-Certified", desc: "We operate sustainably, leaving no trace and supporting wildlife conservation in the Rift Valley." },
  { icon: Shield, title: "Fully Licensed", desc: "Registered tour operator under Kenya Tourism Board. Fully insured for your peace of mind." },
  { icon: Award, title: "Maasai Guides", desc: "Our guides are born Maasai warriors who have tracked this land for generations — no one knows it better." },
  { icon: Globe, title: "International Clients", desc: "We've hosted guests from 40+ countries. Multilingual support in English, Swahili, and basic French." },
  { icon: ThumbsUp, title: "Flexible Payment", desc: "We accept M-Pesa, cash, and bank transfer. Pay a deposit to confirm your booking and the rest on the day of your safari." },
  { icon: Clock, title: "24/7 Support", desc: "We're always reachable before, during, and after your safari. WhatsApp us any time." },
];

const PROCESS = [
  { icon: MessageCircle, step: "01", title: "Contact Us", desc: "Reach us via WhatsApp, email, or the booking form. Tell us your dates, group size, and interests." },
  { icon: Search, step: "02", title: "Get a Custom Plan", desc: "We build a tailored itinerary within 24 hours based on your budget and what you want to experience." },
  { icon: CheckCircle, step: "03", title: "Confirm & Prepare", desc: "Agree the itinerary, receive your packing list and pre-departure briefing. Pay only when satisfied." },
  { icon: Compass, step: "04", title: "Adventure Begins", desc: "We pick you up, guide you, feed you, keep you safe, and make it unforgettable." },
];

const STATS = [
  { num: "500+", label: "Safaris Completed", icon: Compass },
  { num: "1.8K", label: "Happy Travellers", icon: Heart },
  { num: "40+", label: "Countries Represented", icon: Globe },
  { num: "10+", label: "Years of Experience", icon: Award },
];

/* ── STYLES ────────────────────────────────────────────── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --g: #162b18;
  --gm: #1f4024;
  --gl: #2d5a35;
  --gx: #3a7a45;
  --gold: #c9973a;
  --golds: #e8b86d;
  --goldf: #f5d08a;
  --cream: #faf6ef;
  --white: #fff;
  --dark: #0f1a10;
  --gray: #5a6a5c;
  --lgray: #8a9a8c;
  --border: rgba(201,151,58,0.2);
}
html { scroll-behavior: smooth; }
body { font-family: 'DM Sans', sans-serif; background: var(--cream); color: var(--dark); overflow-x: hidden; }
h1,h2,h3,h4 { font-family: 'Cormorant Garamond', serif; }
a { text-decoration: none; color: inherit; }
img { display: block; }
button { cursor: pointer; font-family: 'DM Sans', sans-serif; }

/* ── SCROLLBAR ── */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--g); }
::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 3px; }

/* ── NAV ── */
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
  transition: background 0.35s, backdrop-filter 0.35s, box-shadow 0.35s;
  padding: 0 5%;
  background: transparent;
}
.nav.scrolled {
  background: rgba(22,43,24,0.97);
  backdrop-filter: blur(12px);
  box-shadow: 0 2px 24px rgba(0,0,0,0.3);
}
.nav-inner { display: flex; align-items: center; justify-content: space-between; height: 72px; }
.nav-logo { display: flex; flex-direction: column; cursor: pointer; background: none !important; border: none !important; padding: 0 !important; }
.nav-logo-img { height: 80px; width: auto; object-fit: contain; filter: drop-shadow(0 2px 8px rgba(0,0,0,0.4)); }
.nav-logo-main { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; font-weight: 700; color: var(--gold); letter-spacing: 0.5px; line-height: 1; }
.nav-logo-sub { font-size: 0.6rem; color: rgba(255,255,255,0.55); letter-spacing: 3.5px; text-transform: uppercase; margin-top: 3px; }
.nav-links { display: flex; gap: 2rem; list-style: none; }
.nav-links li { font-size: 0.82rem; letter-spacing: 0.8px; text-transform: uppercase; font-weight: 500; color: rgba(255,255,255,0.75); cursor: pointer; transition: color 0.2s; position: relative; padding-bottom: 4px; }
.nav-links li::after { content:''; position:absolute; bottom:0; left:0; width:0; height:1.5px; background:var(--gold); transition:width 0.25s; }
.nav-links li:hover { color: var(--gold); }
.nav-links li:hover::after { width:100%; }
.nav-cta { background: var(--gold); color: var(--g); padding: 0.55rem 1.4rem; border-radius: 3px; font-size: 0.78rem; font-weight: 600; letter-spacing: 1.2px; text-transform: uppercase; border: none; transition: background 0.2s, transform 0.15s; }
.nav-cta:hover { background: var(--golds); transform: translateY(-1px); }
.hamburger { display: none; background: none; border: none; color: var(--white); padding: 4px; }
.mob-nav {
  display: flex;
  position: fixed; top: 0; right: 0; bottom: 0;
  width: min(85vw, 340px);
  z-index: 1100;
  background: linear-gradient(160deg, var(--g) 0%, var(--gm) 100%);
  flex-direction: column;
  overflow-y: auto;
  transform: translateX(100%);
  transition: transform 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.35s;
  box-shadow: none;
  border-left: 1px solid rgba(201,151,58,0.15);
}
.mob-nav.open {
  transform: translateX(0);
  box-shadow: -8px 0 40px rgba(0,0,0,0.5);
}
.mob-nav-overlay {
  display: none;
  position: fixed; inset: 0; z-index: 1099;
  background: rgba(0,0,0,0.55);
  backdrop-filter: blur(3px);
}
.mob-nav-overlay.open { display: block; }
.mob-nav-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 1.2rem 1.4rem;
  border-bottom: 1px solid rgba(201,151,58,0.15);
  background: rgba(0,0,0,0.15);
}
.mob-nav-body { padding: 0.5rem 0 5rem; flex: 1; }
.mob-nav li { list-style: none; }
.mob-nav li a, .mob-nav li span {
  display: flex; align-items: center; justify-content: space-between;
  padding: 1rem 1.4rem;
  color: rgba(255,255,255,0.8);
  font-size: 1rem; font-weight: 500;
  cursor: pointer; letter-spacing: 0.3px;
  transition: all 0.2s;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  position: relative;
}
.mob-nav li span::before {
  content: '';
  position: absolute; left: 0; top: 0; bottom: 0;
  width: 3px; background: var(--gold);
  transform: scaleY(0); transition: transform 0.2s;
  border-radius: 0 2px 2px 0;
}
.mob-nav li span:hover { color: var(--gold); background: rgba(201,151,58,0.06); padding-left: 1.8rem; }
.mob-nav li span:hover::before { transform: scaleY(1); }
.mob-close {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  color: var(--white); border-radius: 50%;
  width: 38px; height: 38px;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.2s, border-color 0.2s;
}
.mob-close:hover { background: rgba(201,151,58,0.2); border-color: var(--gold); }
.mob-nav-footer {
  padding: 1rem 1.4rem 1.5rem;
  border-top: 1px solid rgba(201,151,58,0.15);
  background: rgba(0,0,0,0.1);
}
.mob-nav-socials { display: flex; gap: 0.6rem; margin-top: 1rem; }

/* ── HERO ── */
.hero {
  position: relative;
  min-height: 100svh;
  display: flex; flex-direction: column; overflow: hidden;
  background: linear-gradient(160deg, #fef9ef 0%, #fafafa 45%, #f0f7f0 100%);
}
.hero-blob-1 {
  position: absolute; top: -40px; left: -60px;
  width: 320px; height: 320px; border-radius: 50%;
  background: linear-gradient(135deg, rgba(201,151,58,0.22), rgba(42,90,50,0.10));
  filter: blur(60px); pointer-events: none;
}
.hero-blob-2 {
  position: absolute; bottom: 80px; right: -60px;
  width: 280px; height: 280px; border-radius: 50%;
  background: linear-gradient(135deg, rgba(201,151,58,0.14), rgba(45,90,53,0.10));
  filter: blur(50px); pointer-events: none;
}
.hero-dots {
  position: absolute; inset: 0; opacity: 0.18; pointer-events: none;
  background-image: radial-gradient(circle, #94a3b8 1px, transparent 1px);
  background-size: 32px 32px;
}
.hero-main { flex: 1; display: flex; align-items: center; }
.hero-inner {
  width: 100%; max-width: 1200px; margin: 0 auto;
  padding: 100px 5% 30px; min-height: calc(100svh - 120px);
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 3rem; align-items: center;
}
.hero-left { position: relative; z-index: 2; }
.hero-badge {
  display: inline-flex; align-items: center; gap: 0.55rem;
  background: linear-gradient(135deg, #fef9ef, #fffbf0);
  border: 1px solid rgba(201,151,58,0.35);
  color: #b8832e; font-size: 0.72rem;
  letter-spacing: 2px; text-transform: uppercase;
  padding: 0.45rem 1rem; border-radius: 30px;
  margin-bottom: 1.4rem; font-weight: 700;
  animation: heroFadeUp 0.65s ease both;
}
.hero-badge-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: #4ade80;
  box-shadow: 0 0 0 3px rgba(74,222,128,0.25);
  animation: pulse-green 2s infinite; flex-shrink: 0;
}
@keyframes pulse-green {
  0%,100% { box-shadow: 0 0 0 3px rgba(74,222,128,0.25); }
  50%      { box-shadow: 0 0 0 6px rgba(74,222,128,0.08); }
}
.hero h1 {
  font-size: clamp(2.4rem, 5vw, 4.4rem);
  color: #0f1a10; font-weight: 700;
  line-height: 1.08; max-width: 560px;
  animation: heroFadeUp 0.65s ease 0.1s both;
}
.hero h1 .hero-h1-gradient {
  background: linear-gradient(135deg, #c9973a, #2d5a35);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text; display: block;
}
.hero-accent-line {
  display: flex; align-items: center; gap: 0.75rem;
  margin: 0.9rem 0 1rem;
  animation: heroFadeUp 0.65s ease 0.15s both;
}
.hero-accent-line .line {
  height: 2px; width: 36px; border-radius: 2px;
  background: linear-gradient(90deg, #c9973a, #2d5a35);
}
.hero-accent-text {
  font-size: 0.65rem; font-weight: 600;
  color: #8a9a8c; letter-spacing: 3px; text-transform: uppercase;
}
.hero-sub {
  color: #5a6a5c; font-size: 0.95rem;
  max-width: 460px; line-height: 1.85; font-weight: 400;
  margin-bottom: 1.6rem;
  animation: heroFadeUp 0.65s ease 0.2s both;
}
.hero-btns {
  display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 1.6rem;
  animation: heroFadeUp 0.65s ease 0.3s both;
}
.btn-gold {
  flex: 1; display: inline-flex; align-items: center; justify-content: center;
  gap: 0.5rem; padding: 0.95rem 1.8rem; border-radius: 12px;
  font-weight: 700; font-size: 0.88rem; border: none; cursor: pointer;
  background: linear-gradient(135deg, #c9973a, #7f5a1f);
  color: #fff; letter-spacing: 0.5px;
  box-shadow: 0 6px 20px rgba(201,151,58,0.35);
  transition: all 0.2s;
}
.btn-gold:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(201,151,58,0.45); }
.btn-wa {
  flex: 1; display: inline-flex; align-items: center; justify-content: center;
  gap: 0.5rem; padding: 0.95rem 1.8rem; border-radius: 12px;
  font-weight: 700; font-size: 0.88rem; cursor: pointer; letter-spacing: 0.5px;
  background: rgba(255,255,255,0.9); color: #374151;
  border: 1.5px solid #e5e7eb;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.btn-wa:hover { border-color: #25D366; color: #25D366; transform: translateY(-2px); }
.btn-ghost {
  display: inline-flex; align-items: center; justify-content: center;
  gap: 0.5rem; padding: 0.95rem 1.8rem; border-radius: 12px;
  font-weight: 600; font-size: 0.88rem; cursor: pointer; letter-spacing: 0.5px;
  background: transparent; color: #374151;
  border: 1.5px solid #e5e7eb; transition: all 0.2s;
}
.btn-ghost:hover { border-color: #c9973a; color: #c9973a; }
.hero-glass-cards {
  display: grid; grid-template-columns: repeat(3,1fr);
  gap: 0.65rem; animation: heroFadeUp 0.65s ease 0.4s both;
}
.hero-glass-card {
  display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
  padding: 1.1rem 0.5rem; border-radius: 16px; border: 1px solid;
  backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  text-align: center; cursor: default;
  box-shadow: 0 2px 16px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.6);
  transition: transform 0.2s;
}
.hero-glass-card:hover { transform: translateY(-3px); }
.hero-glass-icon {
  width: 36px; height: 36px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
}
.hero-glass-val { font-weight: 700; font-size: 0.82rem; color: #111827; line-height: 1.3; }
.hero-glass-label { font-size: 0.6rem; color: #6b7280; text-align: center; font-weight: 500; }
.hero-right { position: relative; }
.hero-img-main {
  width: 100%; border-radius: 24px; overflow: hidden;
  aspect-ratio: 4/3; position: relative;
  box-shadow: 0 20px 60px rgba(0,0,0,0.15);
}
.hero-img-main img { width: 100%; height: 100%; object-fit: cover; animation: heroZoom 22s ease-in-out infinite alternate; }
.hero-img-main::after {
  content: ''; position: absolute; inset: 0; border-radius: 24px;
  background: linear-gradient(to top right, rgba(201,151,58,0.08), transparent);
}
@keyframes heroZoom { from { transform: scale(1); } to { transform: scale(1.06); } }
.hero-float-card {
  position: absolute; z-index: 10;
  background: #fff; border-radius: 16px;
  padding: 0.85rem 1.1rem; display: flex; align-items: center; gap: 0.75rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12); border: 1px solid #f1f5f9;
}
.hero-float-card.fc-tl { top: 20px; left: -20px; animation: heroFadeUp 0.65s ease 0.6s both, float 4s ease-in-out infinite; }
.hero-float-card.fc-br { bottom: 24px; right: -20px; animation: heroFadeUp 0.65s ease 0.75s both, float 4s ease-in-out 1s infinite; }
@keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
.fc-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.fc-label { font-size: 0.6rem; color: #9ca3af; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; }
.fc-val { font-size: 0.88rem; font-weight: 700; color: #111827; margin-top: 1px; }
.hero-circle-deco {
  position: absolute; bottom: -24px; right: -24px;
  width: 130px; height: 130px; border-radius: 50%;
  border: 2px dashed rgba(201,151,58,0.3); pointer-events: none;
}
.hero-ticker-wrap {
  background: #0f1a10; padding: 0.8rem 5%; overflow: hidden;
}
.hero-ticker-label { font-size: 0.58rem; letter-spacing: 3px; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 0.4rem; }
.hero-ticker { display: flex; gap: 0; animation: ticker 18s linear infinite; width: max-content; }
.hero-ticker:hover { animation-play-state: paused; }
@keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.ticker-item { display: flex; align-items: center; gap: 0.5rem; padding: 0 2rem; font-size: 0.75rem; color: rgba(255,255,255,0.45); white-space: nowrap; font-weight: 500; }
.ticker-item svg { color: #c9973a; flex-shrink: 0; }
.ticker-dot { width: 3px; height: 3px; background: rgba(201,151,58,0.4); border-radius: 50%; }
@keyframes heroFadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
@media (max-width: 900px) {
  .hero-inner { grid-template-columns: 1fr; padding: 90px 5% 30px; gap: 2rem; }
  .hero-right { display: none; }
}
@media (max-width: 480px) {
  .hero h1 { font-size: clamp(2rem, 8vw, 3rem); }
  .hero-btns { flex-direction: column; }
  .hero-btns .btn-gold, .hero-btns .btn-wa { width: 100%; justify-content: center; }
  .hero-glass-card { padding: 0.8rem 0.3rem; }
}

/* ── SECTIONS ── */
.section { padding: 100px 6%; }
.sl { color: var(--gold); font-size: 0.72rem; letter-spacing: 4px; text-transform: uppercase; font-weight: 600; margin-bottom: 0.7rem; display: flex; align-items: center; gap: 0.5rem; }
.sl::before { content:''; width: 28px; height: 1.5px; background: var(--gold); }
.sh { font-size: clamp(2.2rem, 4vw, 3.4rem); font-weight: 700; line-height: 1.05; }
.sh em { color: var(--gold); font-style: normal; }
.sd { color: var(--gray); font-size: 0.97rem; line-height: 1.8; margin-top: 0.8rem; max-width: 580px; }
.sec-hdr { margin-bottom: 4rem; }
.centered { text-align: center; }
.centered .sl { justify-content: center; }
.centered .sl::before { display: none; }
.centered .sd { margin-left: auto; margin-right: auto; }

/* ── ABOUT ── */
.about-sec { background: var(--white); }
.about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: center; }
.about-img-stack { position: relative; }
.about-img-main { width: 100%; height: 500px; object-fit: cover; border-radius: 6px; }
.about-img-inset { position: absolute; bottom: -30px; right: -30px; width: 220px; height: 160px; object-fit: cover; border-radius: 6px; border: 5px solid var(--white); box-shadow: 0 8px 32px rgba(0,0,0,0.2); }
.about-badge-box { position: absolute; top: 30px; left: -30px; background: var(--gold); color: var(--g); padding: 1.2rem 1.5rem; border-radius: 5px; text-align: center; }
.abn { font-family: 'Cormorant Garamond', serif; font-size: 2.4rem; font-weight: 700; line-height: 1; }
.abl { font-size: 0.65rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-top: 2px; }
.about-body p { color: var(--gray); font-size: 0.95rem; line-height: 1.9; margin-bottom: 1.1rem; }
.about-tags { display: flex; flex-wrap: wrap; gap: 0.6rem; margin: 1.5rem 0 2rem; }
.tag { background: rgba(201,151,58,0.1); border: 1px solid rgba(201,151,58,0.25); color: var(--gl); font-size: 0.78rem; padding: 0.35rem 0.9rem; border-radius: 20px; display: flex; align-items: center; gap: 0.4rem; font-weight: 500; }

/* ── WHY ── */
.why-sec { background: var(--cream); }
.why-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; }
.why-card { padding: 2.5rem 2rem; background: var(--white); border: 1px solid rgba(0,0,0,0.06); transition: background 0.25s, box-shadow 0.25s; }
.why-card:hover { background: var(--white); box-shadow: 0 8px 32px rgba(0,0,0,0.1); transform: translateY(-4px); }
.why-icon-box { width: 48px; height: 48px; background: rgba(201,151,58,0.12); border-radius: 6px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.2rem; color: var(--gold); }
.why-title { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; color: var(--dark); font-weight: 700; margin-bottom: 0.6rem; }
.why-desc { color: var(--gray); font-size: 0.875rem; line-height: 1.75; }

/* ── SERVICES ── */
.svcs-sec { background: var(--cream); }
.svcs-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; }
.svc-card { border-radius: 6px; overflow: hidden; background: var(--white); box-shadow: 0 2px 16px rgba(0,0,0,0.06); transition: transform 0.25s, box-shadow 0.25s; cursor: pointer; }
.svc-card:hover { transform: translateY(-6px); box-shadow: 0 12px 40px rgba(0,0,0,0.12); }
.svc-img { width: 100%; height: 200px; object-fit: cover; object-position: center bottom; }
.svc-body { padding: 1.5rem; }
.svc-icon { width: 40px; height: 40px; background: rgba(201,151,58,0.1); border-radius: 5px; display: flex; align-items: center; justify-content: center; color: var(--gold); margin-bottom: 0.8rem; }
.svc-title { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; font-weight: 700; margin-bottom: 0.5rem; }
.svc-desc { color: var(--gray); font-size: 0.85rem; line-height: 1.7; }
.svc-link { display: inline-flex; align-items: center; gap: 0.3rem; color: var(--gold); font-size: 0.8rem; font-weight: 600; margin-top: 1rem; letter-spacing: 0.5px; }

/* ── PROCESS ── */
.process-sec { background: var(--white); }
.process-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 2rem; position: relative; }
.process-grid::before { content:''; position:absolute; top:36px; left:12.5%; right:12.5%; height:1px; background:linear-gradient(to right,transparent,var(--gold),transparent); }
.proc-card { text-align: center; position: relative; }
.proc-num { font-family: 'Cormorant Garamond', serif; font-size: 0.75rem; color: var(--gold); letter-spacing: 3px; font-weight: 600; margin-bottom: 0.5rem; }
.proc-icon-box { width: 72px; height: 72px; background: var(--g); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--gold); margin: 0 auto 1.2rem; border: 3px solid var(--border); transition: background 0.2s; }
.proc-card:hover .proc-icon-box { background: var(--gm); }
.proc-title { font-family: 'Cormorant Garamond', serif; font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem; }
.proc-desc { color: var(--gray); font-size: 0.84rem; line-height: 1.7; }

/* ── PACKAGES ── */
.pkg-sec { background: var(--g); }
.pkg-sec .sh { color: var(--white); }
.pkg-sec .sd { color: rgba(255,255,255,0.6); }
.pkgs-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 1.5rem; }
.pkg-card { background: rgba(31,64,36,0.6); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; overflow: hidden; transition: transform 0.25s, border-color 0.25s; position: relative; }
.pkg-card:hover { transform: translateY(-5px); border-color: rgba(201,151,58,0.4); }
.pkg-card.featured { border-color: var(--gold); }
.pkg-tag { position: absolute; top: 16px; right: 16px; background: var(--gold); color: var(--g); font-size: 0.65rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; padding: 0.25rem 0.75rem; border-radius: 20px; }
.pkg-img { width: 100%; height: 180px; object-fit: cover; }
.pkg-body { padding: 1.8rem; }
.pkg-dur { font-size: 0.7rem; letter-spacing: 3px; text-transform: uppercase; color: var(--gold); font-weight: 600; margin-bottom: 0.4rem; }
.pkg-name { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; color: var(--white); font-weight: 700; margin-bottom: 0.3rem; }
.pkg-price-row { display: flex; align-items: baseline; gap: 0.6rem; margin: 0.8rem 0 1.2rem; }
.pkg-price { font-family: 'Cormorant Garamond', serif; font-size: 2rem; color: var(--gold); font-weight: 700; }
.pkg-usd { font-size: 0.8rem; color: rgba(255,255,255,0.4); }
.pkg-per { font-size: 0.75rem; color: rgba(255,255,255,0.45); margin-bottom: 1.2rem; }
.pkg-feats { list-style: none; margin-bottom: 1.5rem; display: grid; grid-template-columns: 1fr 1fr; gap: 0.4rem 1rem; }
.pkg-feats li { display: flex; align-items: center; gap: 0.5rem; color: rgba(255,255,255,0.75); font-size: 0.82rem; }
.pkg-feats li svg { color: var(--gold); flex-shrink: 0; }
.pkg-btn { width: 100%; padding: 0.9rem; background: var(--gold); color: var(--g); font-weight: 700; font-size: 0.84rem; letter-spacing: 1.2px; text-transform: uppercase; border: none; border-radius: 4px; display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: background 0.2s; }
.pkg-btn:hover { background: var(--golds); }

/* ── DESTINATIONS ── */
.dest-sec { background: var(--cream); }
.dest-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; }
.dest-card { border-radius: 8px; overflow: hidden; position: relative; cursor: pointer; }
.dest-img { width: 100%; height: 280px; object-fit: cover; transition: transform 0.4s; }
.dest-card:hover .dest-img { transform: scale(1.05); }
.dest-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(10,22,11,0.92) 0%, rgba(10,22,11,0.2) 60%, transparent 100%); display: flex; flex-direction: column; justify-content: flex-end; padding: 1.5rem; }
.dest-tag-label { font-size: 0.65rem; letter-spacing: 2.5px; text-transform: uppercase; color: var(--gold); font-weight: 600; margin-bottom: 0.3rem; }
.dest-name { font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; color: var(--white); font-weight: 700; margin-bottom: 0.4rem; }
.dest-desc { color: rgba(255,255,255,0.7); font-size: 0.8rem; line-height: 1.6; margin-bottom: 0.8rem; }
.dest-info { display: flex; align-items: center; gap: 0.4rem; color: rgba(255,255,255,0.5); font-size: 0.72rem; }

/* ── GALLERY ── */
.gal-sec { background: var(--g); }
.gal-sec .sh { color: var(--white); }
.gal-sec .sd { color: rgba(255,255,255,0.55); }
.gal-grid { display: grid; grid-template-columns: repeat(4,1fr); grid-auto-rows: 200px; gap: 0.75rem; }
.gal-item { position: relative; overflow: hidden; border-radius: 5px; cursor: pointer; }
.gal-item:nth-child(1) { grid-column: span 2; grid-row: span 2; }
.gal-item:nth-child(5) { grid-column: span 2; }
.gal-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
.gal-item:hover .gal-img { transform: scale(1.07); }
.gal-overlay { position: absolute; inset: 0; background: rgba(10,22,11,0); display: flex; align-items: flex-end; padding: 1rem; transition: background 0.3s; }
.gal-item:hover .gal-overlay { background: rgba(10,22,11,0.55); }
.gal-label { color: var(--white); font-size: 0.8rem; font-weight: 600; opacity: 0; transform: translateY(8px); transition: opacity 0.3s, transform 0.3s; letter-spacing: 1px; }
.gal-item:hover .gal-label { opacity: 1; transform: translateY(0); }
.gal-cta { text-align: center; margin-top: 2.5rem; }

/* ── REVIEWS ── */
.rev-sec { background: var(--white); }
.rev-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 1.5rem; }
.rev-card { border: 1px solid rgba(0,0,0,0.07); border-radius: 8px; padding: 2rem; transition: border-color 0.2s, transform 0.2s; }
.rev-card:hover { border-color: var(--border); transform: translateY(-3px); }
.rev-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
.rev-stars { display: flex; gap: 3px; color: var(--gold); }
.rev-pkg { font-size: 0.7rem; background: rgba(201,151,58,0.1); color: var(--gl); padding: 0.25rem 0.7rem; border-radius: 20px; font-weight: 500; }
.rev-text { color: var(--gray); font-size: 0.9rem; line-height: 1.8; font-style: italic; margin-bottom: 1.2rem; }
.rev-author { display: flex; align-items: center; gap: 0.8rem; }
.rev-avatar { width: 40px; height: 40px; background: var(--g); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--gold); font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; font-weight: 700; flex-shrink: 0; }
.rev-name { font-weight: 600; font-size: 0.88rem; }
.rev-meta { color: var(--lgray); font-size: 0.75rem; }

/* ── FAQ ── */
.faq-sec { background: var(--cream); }
.faq-layout { display: grid; grid-template-columns: 1fr 1.8fr; gap: 6rem; align-items: start; }
.faq-side p { color: var(--gray); font-size: 0.95rem; line-height: 1.8; margin-top: 1rem; margin-bottom: 2rem; }
.faq-contact-box { background: var(--g); border-radius: 8px; padding: 2rem; }
.faq-contact-box h4 { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; color: var(--white); margin-bottom: 0.5rem; }
.faq-contact-box p { color: rgba(255,255,255,0.6); font-size: 0.84rem; margin-bottom: 1.2rem; }
.faq-list { display: flex; flex-direction: column; gap: 0; }
.faq-item { border-bottom: 1px solid rgba(0,0,0,0.08); }
.faq-q { width: 100%; background: none; border: none; text-align: left; padding: 1.3rem 0; display: flex; align-items: center; justify-content: space-between; gap: 1rem; font-size: 0.95rem; font-weight: 600; color: var(--dark); cursor: pointer; font-family: 'DM Sans', sans-serif; }
.faq-q:hover { color: var(--gl); }
.faq-chevron { flex-shrink: 0; color: var(--gold); transition: transform 0.3s; }
.faq-chevron.open { transform: rotate(180deg); }
.faq-a { overflow: hidden; max-height: 0; transition: max-height 0.35s ease, padding 0.3s; }
.faq-a.open { max-height: 400px; padding-bottom: 1.2rem; }
.faq-a p { color: var(--gray); font-size: 0.88rem; line-height: 1.85; }

/* ── CONTACT ── */
.contact-sec { background: var(--g); }
.contact-sec .sh { color: var(--white); }
.contact-sec .sd { color: rgba(255,255,255,0.6); }
.contact-layout { display: grid; grid-template-columns: 1fr 1.3fr; gap: 5rem; align-items: start; }
.c-info-item { display: flex; gap: 1.1rem; margin-bottom: 1.4rem; padding: 1.1rem; border-radius: 8px; transition: background 0.2s, transform 0.2s; }
.c-info-item.clickable { cursor: pointer; }
.c-info-item.clickable:hover { background: rgba(255,255,255,0.04); transform: translateX(4px); }
.c-icon { width: 46px; height: 46px; background: rgba(201,151,58,0.12); border: 1px solid rgba(201,151,58,0.2); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: var(--gold); flex-shrink: 0; }
.c-label { font-size: 0.66rem; letter-spacing: 2.5px; text-transform: uppercase; color: var(--gold); font-weight: 600; margin-bottom: 0.35rem; }
.c-val { color: rgba(255,255,255,0.85); font-size: 0.94rem; line-height: 1.6; }
.c-val a { color: rgba(255,255,255,0.85); text-decoration: none; transition: color 0.2s; }
.c-val a:hover { color: var(--gold); }
.social-row { display: flex; gap: 0.75rem; margin-top: 2rem; }
.soc-label { font-size: 0.66rem; letter-spacing: 2.5px; text-transform: uppercase; color: var(--gold); font-weight: 600; margin-bottom: 0.8rem; }
.soc-btn { width: 46px; height: 46px; background: rgba(255,255,255,0.04); border: 1px solid rgba(201,151,58,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.65); transition: background 0.25s, border-color 0.25s, color 0.25s, transform 0.25s, box-shadow 0.25s; }
.soc-btn:hover { background: var(--gold); border-color: var(--gold); color: var(--g); transform: translateY(-3px); box-shadow: 0 6px 16px rgba(201,151,58,0.35); }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.fg { display: flex; flex-direction: column; gap: 0.35rem; }
.fg.full { grid-column: span 2; }
.fg label { font-size: 0.7rem; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,0.55); font-weight: 500; }
.fg input, .fg select, .fg textarea {
  width: 100%; padding: 0.85rem 1rem; border-radius: 4px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05); color: var(--white);
  font-size: 0.9rem; outline: none; font-family: 'DM Sans', sans-serif;
  transition: border-color 0.2s, background 0.2s;
}
.fg input::placeholder, .fg textarea::placeholder { color: rgba(255,255,255,0.25); }
.fg input:focus, .fg select:focus, .fg textarea:focus { border-color: var(--gold); background: rgba(255,255,255,0.08); }
.fg select option { background: var(--g); }
.fg textarea { resize: vertical; min-height: 110px; }
.form-submit { grid-column: span 2; margin-top: 0.5rem; }
.submit-btn { width: 100%; padding: 1rem; background: var(--gold); color: var(--g); border: none; border-radius: 4px; font-weight: 700; font-size: 0.9rem; letter-spacing: 1.2px; text-transform: uppercase; display: flex; align-items: center; justify-content: center; gap: 0.6rem; transition: background 0.2s; }
.submit-btn:hover { background: var(--golds); }

/* ── NEWSLETTER ── */
.nl-sec { background: var(--gold); padding: 60px 6%; text-align: center; }
.nl-sec h3 { font-family: 'Cormorant Garamond', serif; font-size: 2rem; color: var(--g); font-weight: 700; margin-bottom: 0.5rem; }
.nl-sec p { color: rgba(22,43,24,0.7); font-size: 0.92rem; margin-bottom: 1.5rem; }
.nl-form { display: flex; gap: 0; max-width: 460px; margin: 0 auto; border-radius: 4px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.15); }
.nl-input { flex: 1; padding: 0.9rem 1.2rem; border: none; outline: none; font-size: 0.9rem; font-family: 'DM Sans', sans-serif; }
.nl-btn { background: var(--g); color: var(--white); border: none; padding: 0.9rem 1.4rem; font-weight: 600; font-size: 0.85rem; display: flex; align-items: center; gap: 0.4rem; cursor: pointer; transition: background 0.2s; }
.nl-btn:hover { background: var(--gm); }

/* ── FOOTER ── */
footer { background: var(--dark); color: rgba(255,255,255,0.45); border-top: 3px solid var(--gold); position: relative; }
.footer-main { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; padding: 70px 6% 50px; }
.footer-brand-name { font-family: 'Cormorant Garamond', serif; font-size: 1.6rem; color: var(--gold); font-weight: 700; margin-bottom: 0.3rem; letter-spacing: 0.5px; }
.footer-brand-sub { font-size: 0.65rem; letter-spacing: 3px; text-transform: uppercase; color: rgba(255,255,255,0.35); margin-bottom: 1.2rem; }
.footer-tagline { font-size: 0.88rem; color: rgba(255,255,255,0.5); line-height: 1.85; max-width: 280px; }
.footer-col h5 { font-family: 'Cormorant Garamond', serif; font-size: 1.05rem; color: var(--white); font-weight: 700; margin-bottom: 1.2rem; letter-spacing: 0.5px; position: relative; padding-bottom: 0.6rem; }
.footer-col h5::after { content: ''; position: absolute; bottom: 0; left: 0; width: 28px; height: 2px; background: var(--gold); }
.footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 0.7rem; }
.footer-col ul li { font-size: 0.85rem; cursor: pointer; transition: color 0.2s, transform 0.2s; display: flex; align-items: center; gap: 0.5rem; }
.footer-col ul li:hover { color: var(--gold); transform: translateX(2px); }
.footer-col ul li svg { color: var(--gold); opacity: 0.7; flex-shrink: 0; }
.footer-bottom { border-top: 1px solid rgba(255,255,255,0.07); padding: 1.4rem 6%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; color: rgba(255,255,255,0.4); }
.footer-bottom strong { color: var(--gold); font-weight: 600; }

/* ── WA FLOAT ── */
.wa-fab { position: fixed; bottom: 28px; right: 28px; z-index: 800; width: 58px; height: 58px; background: #25D366; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 20px rgba(37,211,102,0.45); transition: transform 0.2s; }
.wa-fab:hover { transform: scale(1.1); }
.wa-fab svg { color: var(--white); }
@keyframes waPulse { 0%,100%{box-shadow:0 4px 20px rgba(37,211,102,0.45)} 50%{box-shadow:0 4px 36px rgba(37,211,102,0.75)} }
.wa-fab { animation: waPulse 2.5s infinite; }

/* ── SCROLL TO TOP ── */
.scroll-top-fab {
  position: fixed; bottom: 98px; right: 28px; z-index: 799;
  width: 46px; height: 46px; border-radius: 50%;
  background: var(--g); border: 1.5px solid var(--gold);
  display: flex; align-items: center; justify-content: center;
  color: var(--gold); box-shadow: 0 4px 16px rgba(0,0,0,0.25);
  transition: opacity 0.3s, transform 0.3s, background 0.2s, color 0.2s;
  opacity: 0; transform: translateY(12px) scale(0.85); pointer-events: none;
}
.scroll-top-fab.visible { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }
.scroll-top-fab:hover { background: var(--gold); color: var(--g); }
@media (max-width: 768px) {
  .scroll-top-fab { bottom: 84px; right: 20px; width: 42px; height: 42px; }
}

/* ── TEAM ── */
.team-sec { background: var(--cream); }
.team-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px,1fr)); gap: 1.5rem; }
.team-card { text-align: center; }
.team-img-wrap { position: relative; border-radius: 8px; overflow: hidden; margin-bottom: 1rem; aspect-ratio: 1/1; }
.team-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
.team-card:hover .team-img { transform: scale(1.06); }
.team-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(10,22,11,0.85) 0%, transparent 50%); display: flex; align-items: flex-end; padding: 1rem; opacity: 0; transition: opacity 0.3s; }
.team-card:hover .team-overlay { opacity: 1; }
.team-overlay p { color: rgba(255,255,255,0.85); font-size: 0.78rem; line-height: 1.6; text-align: left; }
.team-name { font-family: 'Cormorant Garamond', serif; font-size: 1.15rem; font-weight: 700; margin-bottom: 0.2rem; }
.team-role { font-size: 0.78rem; color: var(--gold); font-weight: 600; letter-spacing: 0.5px; }
.team-tags { display: flex; flex-wrap: wrap; gap: 0.35rem; justify-content: center; margin-top: 0.6rem; }
.team-tag { background: rgba(201,151,58,0.1); border: 1px solid rgba(201,151,58,0.25); color: var(--gl); font-size: 0.64rem; padding: 0.2rem 0.6rem; border-radius: 20px; font-weight: 600; letter-spacing: 0.3px; }

/* ── MAP ── */
.map-wrap { border-radius: 8px; overflow: hidden; margin-top: 2.5rem; border: 1px solid rgba(255,255,255,0.08); }
.map-wrap iframe { width: 100%; height: 320px; border: 0; display: block; }

/* ── SEASONS ── */
.season-sec { background: var(--white); }
.season-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; }
.season-card { border: 1px solid rgba(0,0,0,0.07); border-radius: 8px; padding: 2rem; transition: border-color 0.2s, transform 0.2s; }
.season-card:hover { border-color: var(--border); transform: translateY(-4px); }
.season-period { font-size: 0.7rem; letter-spacing: 3px; text-transform: uppercase; color: var(--gold); font-weight: 700; margin-bottom: 0.8rem; }
.season-title { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; font-weight: 700; margin-bottom: 0.6rem; }
.season-desc { color: var(--gray); font-size: 0.88rem; line-height: 1.8; }

/* ── TRUST / PAYMENT ── */
.trust-sec { background: var(--cream); }
.trust-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3.5rem; }
.trust-col h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.45rem; font-weight: 700; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.6rem; }
.trust-col h3 .trust-icon-box { width: 42px; height: 42px; background: var(--g); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: var(--gold); flex-shrink: 0; }
.pay-list { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.pay-item { background: var(--white); border: 1px solid rgba(0,0,0,0.06); border-radius: 8px; padding: 1.4rem; transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s; }
.pay-item:hover { transform: translateY(-3px); box-shadow: 0 10px 28px rgba(0,0,0,0.07); border-color: var(--border); }
.pay-icon { width: 38px; height: 38px; background: rgba(201,151,58,0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: var(--gold); margin-bottom: 0.8rem; }
.pay-name { font-weight: 700; font-size: 0.95rem; margin-bottom: 0.35rem; color: var(--gl); font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; }
.pay-desc { font-size: 0.8rem; color: var(--gray); line-height: 1.65; }
.policy-list { display: flex; flex-direction: column; gap: 0; position: relative; }
.policy-item { display: flex; gap: 1.2rem; align-items: flex-start; position: relative; padding-bottom: 1.8rem; }
.policy-item:last-child { padding-bottom: 0; }
.policy-item::before { content: ''; position: absolute; left: 19px; top: 40px; bottom: 0; width: 1.5px; background: rgba(201,151,58,0.25); }
.policy-item:last-child::before { display: none; }
.policy-icon { width: 40px; height: 40px; background: var(--white); border: 1.5px solid rgba(201,151,58,0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--gold); flex-shrink: 0; position: relative; z-index: 1; }
.policy-title { font-weight: 700; font-size: 0.95rem; margin-bottom: 0.3rem; font-family: 'Cormorant Garamond', serif; font-size: 1.15rem; }
.policy-desc { font-size: 0.84rem; color: var(--gray); line-height: 1.75; max-width: 380px; }

/* ── PARTNERS ── */
.partners-sec { background: var(--g); padding: 50px 6%; }
.partners-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.9rem; }
.partner-chip { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.7); font-size: 0.82rem; padding: 0.55rem 1.2rem; border-radius: 30px; font-weight: 500; display: flex; align-items: center; gap: 0.5rem; }
.partners-sec .sec-hdr { margin-bottom: 2rem; }

/* ── GROUP BANNER ── */
.group-banner { background: linear-gradient(135deg, var(--gold), var(--golds)); margin: 0 6%; border-radius: 10px; padding: 2.5rem 2.5rem; display: flex; align-items: center; justify-content: space-between; gap: 2rem; flex-wrap: wrap; }
.group-banner-text h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.7rem; color: var(--g); font-weight: 700; margin-bottom: 0.4rem; }
.group-banner-text p { color: rgba(22,43,24,0.75); font-size: 0.92rem; max-width: 460px; line-height: 1.7; }
.group-banner .btn-gold { background: var(--g); color: var(--gold); }
.group-banner .btn-gold:hover { background: var(--gm); }

/* ── STICKY MOBILE QUOTE BAR ── */
.sticky-quote-bar { display: none; position: fixed; bottom: 0; left: 0; right: 0; z-index: 850; background: var(--g); border-top: 1px solid rgba(201,151,58,0.3); padding: 0.7rem 5%; gap: 0.6rem; align-items: center; box-shadow: 0 -4px 20px rgba(0,0,0,0.25); }
.sticky-quote-bar .btn-gold { flex: 1; justify-content: center; padding: 0.75rem 1rem; font-size: 0.8rem; }
.sticky-quote-bar .btn-ghost { flex: 1; justify-content: center; padding: 0.75rem 1rem; font-size: 0.8rem; border-color: rgba(255,255,255,0.3); }
@media (max-width: 768px) {
  .sticky-quote-bar { display: flex; }
  body { padding-bottom: 64px; }
  .wa-fab { bottom: 24px; right: 16px; width: 50px; height: 50px; }
  .c-info-item { padding: 0.8rem 0.6rem; margin-bottom: 0.5rem; gap: 0.8rem; }
  .c-icon { width: 40px; height: 40px; }
}

/* ── CONTACT REDESIGN ── */
.contact-card, .form-card, .map-card {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  padding: 2rem;
}
.map-card { margin-top: 2.5rem; padding-bottom: 0; overflow: hidden; }
.map-card .map-wrap { margin: 1.6rem -2rem -2rem; border: none; border-radius: 0 0 12px 12px; }
.card-header { display: flex; align-items: center; gap: 0.8rem; margin-bottom: 1.6rem; }
.card-header .ch-icon { width: 40px; height: 40px; background: rgba(201,151,58,0.12); border: 1px solid rgba(201,151,58,0.2); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: var(--gold); flex-shrink: 0; }
.card-header h4 { font-family: 'Cormorant Garamond', serif; font-size: 1.35rem; color: var(--white); font-weight: 700; }
.qa-row { display: grid; grid-template-columns: repeat(3,1fr); gap: 0.75rem; margin-bottom: 1.8rem; }
.qa-btn { display: flex; flex-direction: column; align-items: center; gap: 0.6rem; background: rgba(255,255,255,0.03); border: 1px solid rgba(201,151,58,0.18); border-radius: 8px; padding: 1.1rem 0.5rem; color: rgba(255,255,255,0.8); font-size: 0.68rem; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; transition: all 0.25s; }
.qa-btn .qa-icon { width: 38px; height: 38px; border-radius: 50%; background: rgba(201,151,58,0.12); color: var(--gold); display: flex; align-items: center; justify-content: center; transition: all 0.25s; }
.qa-btn:hover { background: var(--gold); border-color: var(--gold); color: var(--g); transform: translateY(-3px); box-shadow: 0 8px 20px rgba(201,151,58,0.3); }
.qa-btn:hover .qa-icon { background: rgba(15,26,16,0.15); color: var(--g); }
.contact-card .c-info-item:last-of-type { margin-bottom: 0; }
.contact-divider { height: 1px; background: rgba(255,255,255,0.08); margin: 1.6rem 0; }
@media (max-width: 480px) {
  .qa-btn { font-size: 0.6rem; padding: 0.9rem 0.3rem; }
  .contact-card, .form-card, .map-card { padding: 1.4rem; }
}

/* ── DIRECTOR ── */
.director-sec { background: var(--dark); border-top: 3px solid var(--gold); border-bottom: 3px solid var(--gold); }
.director-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 4rem; align-items: center; }
.director-img-wrap { position: relative; }
.director-img { width: 100%; aspect-ratio: 4/5; object-fit: cover; border-radius: 8px; border: 4px solid rgba(201,151,58,0.15); }
.director-badge { position: absolute; bottom: -22px; left: -22px; background: var(--gold); color: var(--g); padding: 1.1rem 1.5rem; border-radius: 6px; text-align: center; box-shadow: 0 8px 24px rgba(0,0,0,0.3); }
.director-quote-icon { color: var(--gold); opacity: 0.35; margin: 1.2rem 0 0.8rem; }
.director-message { color: rgba(255,255,255,0.78); font-size: 1.05rem; line-height: 2; font-style: italic; }
.director-sig { margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.1); }
.director-sig-name { font-family: 'Cormorant Garamond', serif; font-size: 1.6rem; color: var(--white); font-weight: 700; }
.director-sig-role { font-size: 0.75rem; color: var(--gold); letter-spacing: 1.5px; text-transform: uppercase; margin-top: 0.35rem; font-weight: 600; }
@media (max-width: 1024px) {
  .director-grid { grid-template-columns: 1fr; gap: 2.5rem; }
  .director-badge { display: none; }
}

/* ── RESPONSIVE ── */
@media (max-width: 1024px) {
  .svcs-grid, .dest-grid, .team-grid, .season-grid { grid-template-columns: repeat(2,1fr); }
  .trust-grid { grid-template-columns: 1fr; gap: 2rem; }
  .why-grid { grid-template-columns: repeat(2,1fr); }
  .process-grid { grid-template-columns: repeat(2,1fr); }
  .process-grid::before { display: none; }
  .footer-main { grid-template-columns: 1fr 1fr; gap: 2rem; }
  .about-grid, .faq-layout, .contact-layout { grid-template-columns: 1fr; gap: 3rem; }
  .about-img-inset { display: none; }
  .about-badge-box { left: 0; top: -15px; }
}
@media (max-width: 768px) {
  .nav-links, .nav-cta { display: none; }
  .hamburger { display: block; }
  .section { padding: 70px 5%; }
  .svcs-grid, .pkgs-grid, .rev-grid, .dest-grid, .team-grid, .season-grid, .pay-list { grid-template-columns: 1fr; }
  .group-banner { margin: 0 5%; flex-direction: column; text-align: center; }
  .gal-grid { grid-template-columns: repeat(2,1fr); }
  .gal-item:nth-child(1), .gal-item:nth-child(5) { grid-column: span 1; }
  .why-grid { grid-template-columns: 1fr; }
  .process-grid { grid-template-columns: 1fr; }
  .footer-main { grid-template-columns: 1fr; }
  .pkg-feats { grid-template-columns: 1fr; }
  .form-grid { grid-template-columns: 1fr; }
  .fg.full, .form-submit { grid-column: span 1; }
}
@media (max-width: 480px) {
  .gal-grid { grid-template-columns: 1fr; }
  .gal-item { grid-column: span 1 !important; }
  .team-grid, .season-grid { grid-template-columns: 1fr !important; }
}
`;

/* ── COMPONENT ─────────────────────────────────────────── */
export default function App() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [nlEmail, setNlEmail] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", email: "", date: "", people: "", pkg: "", msg: "" });

  useEffect(() => {
    const onScroll = () => {
      setNavScrolled(window.scrollY > 40);
      setShowScrollTop(window.scrollY > 600);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const sendBooking = () => {
    const msg = `Hello Maasai Warriors Tours & Safaris! 🦁\n\nBooking Enquiry:\n👤 Name: ${form.name}\n📞 Phone: ${form.phone}\n📧 Email: ${form.email}\n📅 Date: ${form.date}\n👥 People: ${form.people}\n🗺️ Package: ${form.pkg}\n💬 Message: ${form.msg}\n\nPlease confirm availability. Thank you!`;
    window.open(wa(msg), "_blank");
  };

  const tagBg = { "Most Popular": "var(--gold)", "Best Value": "#4CAF50", "Premium": "#9c6dff" };

  return (
    <>
      <style>{css}</style>

      {/* ── NAV ── */}
      <nav className={`nav ${navScrolled ? "scrolled" : ""}`}>
        <div className="nav-inner">
          <div className="nav-logo" onClick={() => go("home")}>
            <img src="/Masailogo.png" alt="Maasai Warriors" className="nav-logo-img" />
          </div>
          <ul className="nav-links">
            {NAV.map(n => <li key={n.id} onClick={() => go(n.id)}>{n.label}</li>)}
          </ul>
          <button className="nav-cta" onClick={() => go("contact")}>Book Safari</button>
          <button className="hamburger" onClick={() => setMenuOpen(true)}><Menu size={26} /></button>
        </div>
      </nav>

      {/* MOBILE NAV OVERLAY */}
      <div className={`mob-nav-overlay ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(false)} />

      {/* MOBILE NAV */}
      <div className={`mob-nav ${menuOpen ? "open" : ""}`}>
        <div className="mob-nav-header">
          <img src="/Masailogo.png" alt="Maasai Warriors" className="nav-logo-img" style={{ height: "54px" }} />
          <button className="mob-close" onClick={() => setMenuOpen(false)}><X size={20} /></button>
        </div>
        <ul className="mob-nav-body" style={{ listStyle: "none" }}>
          {NAV.map(n => (
            <li key={n.id}>
              <span onClick={() => go(n.id)}>
                {n.label}
                <ChevronRight size={15} style={{ opacity: 0.35 }} />
              </span>
            </li>
          ))}
        </ul>
        <div className="mob-nav-footer">
          <button className="btn-gold" style={{ width: "100%", justifyContent: "center" }} onClick={() => go("contact")}>
            Book a Safari <ArrowRight size={16} />
          </button>
          <div className="mob-nav-socials">
            {SOCIAL_LINKS.map((s, i) => (
              <a key={i} className="soc-btn" href={s.href} target="_blank" rel="noreferrer" title={s.label}>
                <s.Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── HERO ── */}
      <section id="home" className="hero">
        <div className="hero-blob-1" />
        <div className="hero-blob-2" />
        <div className="hero-dots" />

        <div className="hero-main">
          <div className="hero-inner">

            {/* LEFT */}
            <div className="hero-left">
              <div className="hero-badge">
                <span className="hero-badge-dot" />
                Your Safari is Our Priority!
              </div>
              <h1>
                Kenya's Premier
                <span className="hero-h1-gradient">Safari Experience</span>
              </h1>
              <div className="hero-accent-line">
                <div className="line" />
                <span className="hero-accent-text">Est. in the Rift Valley</span>
              </div>
              <p className="hero-sub">
                Maasai Warriors Tours & Safaris is dedicated to providing exceptional safari experiences. We offer game drives, cultural tours, overnight camps and more — led by real Maasai guides born in this land.
              </p>
              <div className="hero-btns">
                <button className="btn-gold" onClick={() => go("packages")}>
                  <Compass size={16} /> Get Started
                </button>
                <button className="btn-wa" onClick={() => go("services")}>
                  <Binoculars size={16} /> Our Safaris
                </button>
              </div>
              <div className="hero-glass-cards">
                {[
                  { icon: Compass, color: "#c9973a", bg: "linear-gradient(135deg,rgba(201,151,58,0.1),rgba(201,151,58,0.05))", border: "rgba(201,151,58,0.22)", val: "Book Any Day", label: "7 Days a Week" },
                  { icon: Shield, color: "#2d5a35", bg: "linear-gradient(135deg,rgba(45,90,53,0.1),rgba(45,90,53,0.05))", border: "rgba(45,90,53,0.22)", val: "KTB Licensed", label: "Fully Insured" },
                  { icon: Users, color: "#15803d", bg: "linear-gradient(135deg,rgba(21,128,61,0.1),rgba(21,128,61,0.05))", border: "rgba(21,128,61,0.22)", val: "1,800+", label: "Happy Guests" },
                ].map((c, i) => (
                  <div key={i} className="hero-glass-card" style={{ background: c.bg, borderColor: c.border }}>
                    <div className="hero-glass-icon" style={{ background: c.border }}>
                      <c.icon size={16} style={{ color: c.color }} />
                    </div>
                    <div className="hero-glass-val">{c.val}</div>
                    <div className="hero-glass-label">{c.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className="hero-right">
              <div className="hero-float-card fc-tl">
                <div className="fc-icon" style={{ background: "#f0fdf4" }}>
                  <CheckCircle size={18} style={{ color: "#16a34a" }} />
                </div>
                <div>
                  <div className="fc-label">Availability</div>
                  <div className="fc-val">Available This Weekend</div>
                </div>
              </div>
              <div className="hero-img-main">
                <img src="/about.png" alt="Maasai Warriors Safari Team" />
              </div>
              <div className="hero-float-card fc-br">
                <div className="fc-icon" style={{ background: "#fef9ef" }}>
                  <Star size={18} style={{ color: "#c9973a" }} />
                </div>
                <div>
                  <div className="fc-label">Guest Rating</div>
                  <div className="fc-val">★ 5.0 · 40+ Countries</div>
                </div>
              </div>
              <div className="hero-circle-deco" />
            </div>

          </div>
        </div>


        {/* TICKER */}
        <div className="hero-ticker-wrap">
          <div className="hero-ticker-label">Trusted by travellers from 40+ countries</div>
          <div className="hero-ticker">
            {[
              { icon: Compass, text: "500+ Safaris Completed" },
              { icon: Heart, text: "1,800+ Happy Travellers" },
              { icon: Globe, text: "40+ Countries" },
              { icon: Shield, text: "KTB Licensed & Insured" },
              { icon: Leaf, text: "Eco-Certified Operator" },
              { icon: Award, text: "10+ Years Experience" },
              { icon: Compass, text: "500+ Safaris Completed" },
              { icon: Heart, text: "1,800+ Happy Travellers" },
              { icon: Globe, text: "40+ Countries" },
              { icon: Shield, text: "KTB Licensed & Insured" },
              { icon: Leaf, text: "Eco-Certified Operator" },
              { icon: Award, text: "10+ Years Experience" },
            ].map((item, i) => (
              <span key={i} className="ticker-item">
                <item.icon size={12} />{item.text}
                {i % 6 !== 5 && <span className="ticker-dot" />}
              </span>
            ))}
          </div>
        </div>

      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="section about-sec">
        <div className="about-grid">
          <div className="about-img-stack">
            <div className="about-badge-box">
              <div className="abn">10+</div>
              <div className="abl">Years of Excellence</div>
            </div>
            <img className="about-img-main" src="/about.png" alt="Maasai Warriors Safari Team" />
            <img className="about-img-inset" src="https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=400&q=80" alt="Cultural Tour" />
          </div>
          <div className="about-body">
            <p className="sl"><span>Our Story</span></p>
            <h2 className="sh">Born From the <em>Land</em> We Guide</h2>
            <br />
            <p>Maasai Warriors Tours & Safaris was founded by Maasai warriors who grew up in Kenya's Rift Valley wilderness. Our guides don't just know the animals — they know the land, the seasons, the sounds, and the ancient stories that no textbook carries.</p>
            <p>Based in Gilgil, we operate eco-friendly tours across Kenya's most iconic destinations. We hold a Kenya Tourism Board licence and are committed to ensuring every rand, shilling, and dollar you spend directly benefits our local Maasai community.</p>
            <p>From a solo traveller's first game drive to a honeymoon bush dinner under the stars — every experience is designed with intention, safety, and authentic connection at its core.</p>
            <div className="about-tags">
              {["KTB Licensed", "Eco-Certified", "Maasai Owned", "Community Impact", "10+ Years", "40+ Countries Served"].map(t => (
                <span className="tag" key={t}><CheckCircle size={13} />{t}</span>
              ))}
            </div>
            <button className="btn-gold" onClick={() => go("contact")}>Start Planning <ArrowRight size={16} /></button>
          </div>
        </div>
      </section>

{/* ── DIRECTOR ── */}
      <section className="section director-sec">
        <div className="director-grid">
          <div className="director-img-wrap">
            <img className="director-img" src="/joshua.png" alt="Founder & Director" />
            <div className="director-badge">
              <div className="abn">18+</div>
              <div className="abl">Years Guiding</div>
            </div>
          </div>
          <div>
            <p className="sl"><span>A Message From Our Founder</span></p>
            <h2 className="sh" style={{ color: "var(--white)" }}>Welcome to <em>Our Home</em></h2>
            <Quote size={36} className="director-quote-icon" />
            <p className="director-message">
              This land raised me. Every gorge, every herd, every Maasai song you'll hear on safari with us — I grew up with them.
              I started this company so visitors don't just see Kenya, they feel it the way we do. My team and I walk slowly,
              listen to the bush, and treat every guest like family — because that's how we were raised. Karibu sana. Welcome.
            </p>
            <div className="director-sig">
              <div className="director-sig-name">Joshua Lekoolal</div>
              <div className="director-sig-role">Founder & Director, Maasai Warriors Tours & Safaris</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY ── */}
      <section className="section why-sec">
        <div className="sec-hdr centered">
          <p className="sl" style={{ justifyContent: "center", color: "var(--gold)" }}><span>Why Choose Us</span></p>
          <h2 className="sh">The Maasai Warriors <em>Difference</em></h2>
        </div>
        <div className="why-grid">
          {WHY.map(w => (
            <div className="why-card" key={w.title}>
              <div className="why-icon-box"><w.icon size={22} /></div>
              <div className="why-title">{w.title}</div>
              <div className="why-desc">{w.desc}</div>
            </div>
          ))}
        </div>
      </section>

{/* ── TEAM ── */}
      <section id="team" className="section team-sec">
        <div className="sec-hdr centered">
          <p className="sl" style={{ justifyContent: "center" }}><span>Meet The Team</span></p>
          <h2 className="sh">Your Safari <em>Guides</em></h2>
          <p className="sd" style={{ margin: "0.8rem auto 0" }}>Real Maasai warriors and local experts who make every safari unforgettable.</p>
        </div>
        <div className="team-grid">
          {TEAM.map(t => (
            <div className="team-card" key={t.name}>
              <div className="team-img-wrap">
                <img className="team-img" src={t.img} alt={t.name} />
                <div className="team-overlay"><p>{t.bio}</p></div>
              </div>
              <div className="team-name">{t.name}</div>
              <div className="team-role">{t.role}</div>
              {t.tags && (
                <div className="team-tags">
                  {t.tags.map(tag => <span className="team-tag" key={tag}>{tag}</span>)}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="section svcs-sec">
        <div className="sec-hdr centered">
          <p className="sl" style={{ justifyContent: "center" }}><span>What We Offer</span></p>
          <h2 className="sh">Safari <em>Experiences</em></h2>
          <p className="sd" style={{ margin: "0.8rem auto 0" }}>Every tour is led by real Maasai warriors who have tracked this land for generations.</p>
        </div>
        <div className="svcs-grid">
          {SERVICES.map(s => (
            <div className="svc-card" key={s.title} onClick={() => go("contact")}>
              <img className="svc-img" src={s.img} alt={s.title} />
              <div className="svc-body">
                <div className="svc-icon"><s.icon size={20} /></div>
                <div className="svc-title">{s.title}</div>
                <div className="svc-desc">{s.desc}</div>
                <div className="svc-link">Book this tour <ChevronRight size={15} /></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="section process-sec">
        <div className="sec-hdr centered">
          <p className="sl" style={{ justifyContent: "center" }}><span>How It Works</span></p>
          <h2 className="sh">Your Safari in <em>4 Simple Steps</em></h2>
        </div>
        <div className="process-grid">
          {PROCESS.map(p => (
            <div className="proc-card" key={p.title}>
              <div className="proc-num">{p.step}</div>
              <div className="proc-icon-box"><p.icon size={26} /></div>
              <div className="proc-title">{p.title}</div>
              <div className="proc-desc">{p.desc}</div>
            </div>
          ))}
        </div>
      </section>

{/* ── SEASONS ── */}
      <section className="section season-sec">
        <div className="sec-hdr centered">
          <p className="sl" style={{ justifyContent: "center" }}><span>Plan Your Trip</span></p>
          <h2 className="sh">Best Time to <em>Visit</em></h2>
          <p className="sd" style={{ margin: "0.8rem auto 0" }}>Kenya offers incredible safaris year-round — here's what each season brings.</p>
        </div>
        <div className="season-grid">
          {SEASONS.map(s => (
            <div className="season-card" key={s.title}>
              <div className="season-period">{s.period}</div>
              <div className="season-title">{s.title}</div>
              <div className="season-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section id="packages" className="section pkg-sec">
        <div className="sec-hdr">
          <p className="sl"><span>Pricing & Packages</span></p>
          <h2 className="sh">Choose Your <em>Adventure</em></h2>
          <p className="sd">Transparent pricing with no hidden costs. Pay only after you're fully satisfied with the plan.</p>
        </div>
        <div className="pkgs-grid">
          {PACKAGES.map(p => (
            <div className={`pkg-card ${p.tag === "Most Popular" ? "featured" : ""}`} key={p.name}>
              {p.tag && (
                <div className="pkg-tag" style={{ background: tagBg[p.tag] || "var(--gold)" }}>{p.tag}</div>
              )}
              <img className="pkg-img" src={p.img} alt={p.name} />
              <div className="pkg-body">
                <div className="pkg-dur">{p.duration}</div>
                <div className="pkg-name">{p.name}</div>

                <ul className="pkg-feats">
                  {p.features.map(f => (
                    <li key={f}><CheckCircle size={13} />{f}</li>
                  ))}
                </ul>
                <button className="pkg-btn" onClick={() => window.open(wa(`Hello! I want to book the *${p.name}* package (${p.duration}) at ${p.price}. Please confirm availability 🦁`), "_blank")}>
                  <FaWhatsapp size={16} /> Book via WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.45)", fontSize: "0.82rem", marginTop: "2rem" }}>
          <Info size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: "0.4rem" }} />
          Custom group packages available on request. Contact us for corporate, school, and honeymoon rates.
        </p>
      </section>

      {/* ── DESTINATIONS ── */}
      <section id="destinations" className="section dest-sec">
        <div className="sec-hdr">
          <p className="sl"><span>Where We Go</span></p>
          <h2 className="sh">Our <em>Destinations</em></h2>
          <p className="sd">From our doorstep in Gilgil to the sweeping plains of the Maasai Mara — Kenya's best is within reach.</p>
        </div>
        <div className="dest-grid">
          {DESTINATIONS.map(d => (
            <div className="dest-card" key={d.name} onClick={() => go("contact")}>
              <img className="dest-img" src={d.img} alt={d.name} />
              <div className="dest-overlay">
                <div className="dest-tag-label">{d.tag}</div>
                <div className="dest-name">{d.name}</div>
                <div className="dest-desc">{d.desc}</div>
                <div className="dest-info"><Navigation size={12} />{d.hours}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" className="section gal-sec">
        <div className="sec-hdr centered">
          <p className="sl" style={{ justifyContent: "center" }}><span>Photo Gallery</span></p>
          <h2 className="sh" style={{ color: "var(--white)" }}>Life in the <em>Wild</em></h2>
          <p className="sd" style={{ margin: "0.8rem auto 0" }}>Real moments from real safaris. Your story could be next.</p>
        </div>
        <div className="gal-grid">
          {GALLERY_IMGS.map((g, i) => (
            <div className="gal-item" key={i}>
              <img className="gal-img" src={g.src} alt={g.label} />
              <div className="gal-overlay">
                <span className="gal-label"><Camera size={13} style={{ display: "inline", verticalAlign: "middle", marginRight: "0.3rem" }} />{g.label}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="gal-cta">
          <button className="btn-ghost" onClick={() => window.open(`https://www.facebook.com/search/top?q=Maasai%20Warriors%20Tours%20and%20Safaris`, "_blank")}>
            <Eye size={16} /> See More on Facebook
          </button>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="section rev-sec">
        <div className="sec-hdr centered">
          <p className="sl" style={{ justifyContent: "center" }}><span>Testimonials</span></p>
          <h2 className="sh">What Travellers <em>Say</em></h2>
        </div>
        <div className="rev-grid">
          {REVIEWS.map(r => (
            <div className="rev-card" key={r.name}>
              <div className="rev-top">
                <div className="rev-stars">
                  {Array(r.rating).fill(0).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <span className="rev-pkg">{r.pkg}</span>
              </div>
              <div className="rev-text">"{r.text}"</div>
              <div className="rev-author">
                <div className="rev-avatar">{r.name[0]}</div>
                <div>
                  <div className="rev-name">{r.name}</div>
                  <div className="rev-meta">{r.country} · {r.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

{/* ── GROUP BOOKING BANNER ── */}
      <div className="group-banner">
        <div className="group-banner-text">
          <h3>Planning a Group, School, or Corporate Trip?</h3>
          <p>We specialise in custom safaris for groups of all sizes — schools, churches, companies, and family reunions. Tell us your numbers and dates, and we'll build a tailored itinerary with group rates.</p>
        </div>
        <button className="btn-gold" onClick={() => window.open(wa("Hello! I'd like to enquire about a group/corporate safari booking. Here are our details:\n\nGroup size:\nPreferred dates:\nBudget range:"), "_blank")}>
          <Building2 size={17} /> Get Group Rates
        </button>
      </div>

      {/* ── FAQ ── */}
      <section id="faq" className="section faq-sec">
        <div className="faq-layout">
          <div className="faq-side">
            <p className="sl"><span>Questions</span></p>
            <h2 className="sh">Frequently <em>Asked</em></h2>
            <p>Everything you need to know before your safari. Can't find your answer? Reach out directly.</p>
            <div className="faq-contact-box">
              <h4>Still have questions?</h4>
              <p>Our team replies within 1 hour on WhatsApp, 7 days a week.</p>
              <button className="btn-gold" onClick={() => window.open(wa("Hello! I have a question about booking a safari with Maasai Warriors Tours & Safaris"), "_blank")}>
                <FaWhatsapp size={16} /> Ask on WhatsApp
              </button>
            </div>
          </div>
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <div className="faq-item" key={i}>
                <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {f.q}
                  <ChevronDown size={18} className={`faq-chevron ${openFaq === i ? "open" : ""}`} />
                </button>
                <div className={`faq-a ${openFaq === i ? "open" : ""}`}>
                  <p>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="section contact-sec">
        <div className="sec-hdr">
          <p className="sl"><span>Book Your Safari</span></p>
          <h2 className="sh">Ready to <em>Explore?</em></h2>
          <p className="sd">Fill in the form and we'll confirm via WhatsApp within 1 hour. You only pay when you're fully satisfied.</p>
        </div>
        <div className="contact-layout">
          <div className="contact-card">
            <div className="qa-row">
              <a className="qa-btn" href={`tel:+${PHONE1}`}>
                <span className="qa-icon"><Phone size={18} /></span>
                Call Now
              </a>
              <a className="qa-btn" href={wa("Hello! I'd like to book a safari with Maasai Warriors Tours & Safaris 🦁")} target="_blank" rel="noreferrer">
                <span className="qa-icon"><FaWhatsapp size={18} /></span>
                WhatsApp
              </a>
              <a className="qa-btn" href={`mailto:${EMAIL}`}>
                <span className="qa-icon"><Mail size={18} /></span>
                Email
              </a>
            </div>
            <div className="c-info-item clickable" onClick={() => window.open(`tel:+${PHONE1}`, "_self")}>
              <div className="c-icon"><Phone size={20} /></div>
              <div>
                <div className="c-label">Phone / WhatsApp</div>
                <div className="c-val">
                  <a href={`tel:+${PHONE1}`}>0733 415 826</a><br />
                  <a href={`tel:+${PHONE2}`}>0722 572 068</a>
                </div>
              </div>
            </div>
            <div className="c-info-item clickable" onClick={() => window.open(`mailto:${EMAIL}`, "_self")}>
              <div className="c-icon"><Mail size={20} /></div>
              <div>
                <div className="c-label">Email</div>
                <div className="c-val"><a href={`mailto:${EMAIL}`}>{EMAIL}</a></div>
              </div>
            </div>
            <div className="c-info-item clickable" onClick={() => window.open("https://maps.google.com/maps?q=Gilgil,+Nakuru+County,+Kenya", "_blank")}>
              <div className="c-icon"><MapPin size={20} /></div>
              <div>
                <div className="c-label">Base Location</div>
                <div className="c-val">Gilgil, Nakuru County, Kenya</div>
              </div>
            </div>
            <div className="c-info-item">
              <div className="c-icon"><Clock size={20} /></div>
              <div>
                <div className="c-label">Operating Hours</div>
                <div className="c-val">Mon – Sun: 6:00 AM – 8:00 PM</div>
              </div>
            </div>
            <div className="contact-divider"></div>
            <div className="soc-label">Connect With Us</div>
            <div className="social-row">
              {SOCIAL_LINKS.map((s, i) => (
                <a key={i} className="soc-btn" href={s.href} target="_blank" rel="noreferrer" title={s.label}>
                  <s.Icon size={18} />
                </a>
              ))}
            </div>
          </div>
          <div className="form-card">
            <div className="card-header"><span className="ch-icon"><Send size={18} /></span><h4>Send a Booking Request</h4></div>
            <div className="form-grid">
            <div className="fg"><label>Full Name</label><input placeholder="John Kamau" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
            <div className="fg"><label>Phone Number</label><input placeholder="07XX XXX XXX" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
            <div className="fg"><label>Email Address</label><input placeholder="you@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
            <div className="fg"><label>Number of People</label><input placeholder="e.g. 2" value={form.people} onChange={e => setForm({ ...form, people: e.target.value })} /></div>
            <div className="fg"><label>Preferred Date</label><input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} /></div>
            <div className="fg">
              <label>Select Package</label>
              <select value={form.pkg} onChange={e => setForm({ ...form, pkg: e.target.value })}>
                <option value="">-- Choose a package --</option>
                {PACKAGES.map(p => <option key={p.name}>{p.name} – {p.price}</option>)}
                <option>Custom / Not Sure Yet</option>
              </select>
            </div>
            <div className="fg full"><label>Message (Optional)</label><textarea placeholder="Any special requests, dietary needs, or questions..." value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })} /></div>
            <div className="form-submit">
              <button className="submit-btn" onClick={sendBooking}>
                <Send size={17} /> Send Booking via WhatsApp
              </button>
            </div>
          </div>
          </div>
        </div>
        <div className="map-card">
          <div className="card-header"><span className="ch-icon"><Map size={18} /></span><h4>Find Us on the Map</h4></div>
          <div className="map-wrap">
          <iframe
            title="Maasai Warriors Tours Location - Gilgil, Kenya"
            src="https://maps.google.com/maps?q=Gilgil%2C+Nakuru+County%2C+Kenya&t=m&z=12&output=embed&iwloc=near"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          </div>
        </div>
      </section>

{/* ── TRUST & PAYMENT ── */}
      <section className="section trust-sec">
        <div className="sec-hdr centered">
          <p className="sl" style={{ justifyContent: "center" }}><span>Booking With Confidence</span></p>
          <h2 className="sh">Payments & <em>Policies</em></h2>
        </div>
        <div className="trust-grid">
          <div className="trust-col">
            <h3><span className="trust-icon-box"><CreditCard size={20} /></span>Accepted Payment Methods</h3>
            <div className="pay-list">
              {PAYMENT_METHODS.map(p => {
                const Icon = p.icon === "Smartphone" ? Smartphone : p.icon === "CreditCard" ? CreditCard : p.icon === "Landmark" ? Landmark : Wallet;
                return (
                  <div className="pay-item" key={p.name}>
                    <div className="pay-icon"><Icon size={18} /></div>
                    <div className="pay-name">{p.name}</div>
                    <div className="pay-desc">{p.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="trust-col">
            <h3><span className="trust-icon-box"><ShieldCheck size={20} /></span>Our Promise to You</h3>
            <div className="policy-list">
              {POLICIES.map(p => (
                <div className="policy-item" key={p.title}>
                  <div className="policy-icon">
                    {p.title.includes("Pay") ? <ThumbsUp size={18} /> : p.title.includes("Cancel") ? <RotateCcw size={18} /> : <CloudRain size={18} />}
                  </div>
                  <div>
                    <div className="policy-title">{p.title}</div>
                    <div className="policy-desc">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PARTNERS ── */}
      <section className="partners-sec">
        <div className="sec-hdr centered">
          <p className="sl" style={{ justifyContent: "center" }}><span>Trusted By</span></p>
          <h2 className="sh" style={{ color: "var(--white)" }}>Our <em>Partners</em></h2>
        </div>
        <div className="partners-row">
          {PARTNERS.map(p => (
            <div className="partner-chip" key={p}><Award size={14} />{p}</div>
          ))}
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <div className="nl-sec">
        <h3>Get Safari Tips & Exclusive Offers</h3>
        <p>Join 500+ travellers who get Kenya safari guides, seasonal deals, and wildlife updates straight to their inbox.</p>
        <div className="nl-form">
          <input className="nl-input" placeholder="Your email address" value={nlEmail} onChange={e => setNlEmail(e.target.value)} />
          <button className="nl-btn"><Send size={15} /> Subscribe</button>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-main">
          <div>
            <div className="footer-brand-name">Maasai Warriors</div>
            <div className="footer-brand-sub">Tours & Safaris · Est. Gilgil, Kenya</div>
            <div className="footer-tagline">We take you where you haven't been before. Authentic Kenya safari experiences led by real Maasai warriors.</div>
            <div className="social-row" style={{ marginTop: "1.6rem" }}>
              {SOCIAL_LINKS.map((s, i) => (
                <a key={i} className="soc-btn" href={s.href} target="_blank" rel="noreferrer" title={s.label}>
                  <s.Icon size={16} />
                </a>
              ))}
            </div>
          </div>
          <div className="footer-col">
            <h5>Quick Links</h5>
            <ul>
              {NAV.map(n => <li key={n.id} onClick={() => go(n.id)}>{n.label}</li>)}
            </ul>
          </div>
          <div className="footer-col">
            <h5>Our Packages</h5>
            <ul>
              {PACKAGES.map(p => <li key={p.name} onClick={() => go("packages")}>{p.name}</li>)}
            </ul>
          </div>
          <div className="footer-col">
            <h5>Contact</h5>
            <ul>
              <li><Phone size={13} />0733 415 826</li>
              <li><Phone size={13} />0722 572 068</li>
              <li style={{ fontSize: "0.78rem" }}><Mail size={13} />{EMAIL}</li>
              <li><MapPin size={13} />Gilgil, Nakuru County</li>
              <li><Clock size={13} />Mon–Sun: 6AM – 8PM</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom" style={{ justifyContent: "center", textAlign: "center", width: "100%" }}>
          <span>© {new Date().getFullYear()} <strong>Maasai Warriors Tours & Safaris</strong>. All rights reserved.</span>
        </div>
      </footer>



      {/* ── SCROLL TO TOP ── */}
      <button
        className={`scroll-top-fab ${showScrollTop ? "visible" : ""}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <ChevronUp size={22} />
      </button>

      {/* ── WA FAB ── */}
      <a className="wa-fab" href={wa("Hello Maasai Warriors! I want to book a safari 🦁")} target="_blank" rel="noreferrer">
        <FaWhatsapp size={28} />
      </a>
    </>
  );
}
