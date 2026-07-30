/**
 * Rahand Cars — Mock / Seed Data
 * Realistic Iraqi car listings for UI development.
 * Will be replaced by live Supabase queries in Phase 3.
 */

import type { FuelType, SellerType, TransmissionType } from './supabase.types';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MockCar {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  mileageKm: number;
  priceUsd: number;
  priceIqd: number;
  fuelType: FuelType;
  transmission: TransmissionType;
  color: string;
  city: string;
  sellerType: SellerType;
  isVerified: boolean;
  category: string;
  engineCc: number;
  horsepower: number;
  features: string[];
  coverImage?: string;
  description?: string;
  phone?: string;
}

export interface MockCategory {
  id: string;
  slug: string;
  label: string;
  icon: string;
  iconFamily: 'feather' | 'material-community';
}

// ─── Cities ───────────────────────────────────────────────────────────────────

export const CITIES = [
  'Baghdad',
  'Erbil',
  'Basra',
  'Sulaymaniyah',
  'Duhok',
  'Kirkuk',
  'Mosul',
  'Najaf',
  'Karbala',
  'Nasiriyah',
];

// ─── Brands ───────────────────────────────────────────────────────────────────

export const BRANDS = [
  'Toyota',
  'Mercedes-Benz',
  'Kia',
  'BYD',
  'HAVAL',
  'Chevrolet',
  'BMW',
  'Hyundai',
  'Nissan',
  'Honda',
  'Lexus',
  'Mitsubishi',
  'Ford',
  'Audi',
  'GAC',
];

// ─── Categories ───────────────────────────────────────────────────────────────

export const CATEGORIES: MockCategory[] = [
  { id: '1', slug: 'suv', label: 'SUV', icon: 'car-estate', iconFamily: 'material-community' },
  { id: '2', slug: 'sedan', label: 'Sedan', icon: 'car-side', iconFamily: 'material-community' },
  { id: '3', slug: 'pickup', label: 'Pickup', icon: 'car-pickup', iconFamily: 'material-community' },
  { id: '4', slug: 'coupe', label: 'Coupe', icon: 'car-sports', iconFamily: 'material-community' },
  { id: '5', slug: 'van', label: 'Van', icon: 'van-passenger', iconFamily: 'material-community' },
  { id: '6', slug: 'electric', label: 'Electric', icon: 'lightning-bolt', iconFamily: 'material-community' },
  { id: '7', slug: 'luxury', label: 'Luxury', icon: 'crown', iconFamily: 'material-community' },
  { id: '8', slug: 'muscle', label: 'Muscle', icon: 'engine', iconFamily: 'material-community' },
];

// ─── Cars ─────────────────────────────────────────────────────────────────────

export const CARS: MockCar[] = [
  {
    id: '1',
    title: 'Toyota Land Cruiser 2022',
    brand: 'Toyota',
    model: 'Land Cruiser',
    year: 2022,
    mileageKm: 45000,
    priceUsd: 65000,
    priceIqd: 85150000,
    fuelType: 'petrol',
    transmission: 'automatic',
    color: 'White',
    city: 'Baghdad',
    sellerType: 'dealer',
    isVerified: true,
    category: 'SUV',
    engineCc: 4608,
    horsepower: 409,
    features: ['Navigation', 'Leather Seats', 'Sunroof', 'Backup Camera', '4WD', 'Heated Seats'],
    description: 'Excellent condition Toyota Land Cruiser 2022, single owner from new. Full service history at Toyota Baghdad. 4.6L V8 engine with 409 HP, 4WD capability for all terrains. Premium white exterior with black leather interior. All features working perfectly. Serious buyers only, no time wasters.',
    coverImage: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80',
    phone: '+9647701000001',
  },
  {
    id: '2',
    title: 'Toyota Camry Hybrid 2023',
    brand: 'Toyota',
    model: 'Camry',
    year: 2023,
    mileageKm: 12000,
    priceUsd: 32000,
    priceIqd: 41920000,
    fuelType: 'hybrid',
    transmission: 'automatic',
    color: 'Silver',
    city: 'Erbil',
    sellerType: 'private',
    isVerified: false,
    category: 'Sedan',
    engineCc: 2487,
    horsepower: 206,
    features: ['Navigation', 'Heated Seats', 'Apple CarPlay', 'Android Auto'],
    description: 'Like-new Toyota Camry Hybrid 2023 with only 12,000 km. Silver exterior with black interior. Hybrid engine delivers excellent fuel economy. Apple CarPlay and Android Auto included. Private seller, well maintained, garage kept in Erbil.',
    coverImage: 'https://images.unsplash.com/photo-1621007947382-bb3c3968e3bb?w=800&q=80',
    phone: '+9647701000002',
  },
  {
    id: '3',
    title: 'Mercedes-Benz GLE 350 2022',
    brand: 'Mercedes-Benz',
    model: 'GLE 350',
    year: 2022,
    mileageKm: 28000,
    priceUsd: 82000,
    priceIqd: 107380000,
    fuelType: 'petrol',
    transmission: 'automatic',
    color: 'Black',
    city: 'Baghdad',
    sellerType: 'dealer',
    isVerified: true,
    category: 'SUV',
    engineCc: 1991,
    horsepower: 255,
    features: ['Panoramic Roof', 'Burmester Sound', 'Night Package', 'Ambient Lighting', '360 Camera'],
    description: 'Pristine Mercedes-Benz GLE 350 2022 in black. 2.0L turbocharged engine with 255 HP. Includes panoramic roof, Burmester premium sound system, 360-degree camera, and ambient lighting with 64 colors. Night package adds black exterior trim. Dealer maintained with full service records.',
    coverImage: 'https://images.unsplash.com/photo-1520031441872-265149a9e690?w=800&q=80',
    phone: '+9647701000003',
  },
  {
    id: '4',
    title: 'Kia Sportage 2023',
    brand: 'Kia',
    model: 'Sportage',
    year: 2023,
    mileageKm: 8000,
    priceUsd: 28500,
    priceIqd: 37335000,
    fuelType: 'petrol',
    transmission: 'automatic',
    color: 'Blue',
    city: 'Sulaymaniyah',
    sellerType: 'dealer',
    isVerified: true,
    category: 'SUV',
    engineCc: 1598,
    horsepower: 180,
    features: ['Lane Assist', 'Apple CarPlay', 'Android Auto', 'Heated Seats', 'Blind Spot Monitor'],
    description: 'Kia Sportage 2023 in beautiful blue color, only 8,000 km. 1.6L engine with 180 HP. Equipped with lane assist, blind spot monitoring, heated seats, and full smartphone connectivity. Dealer verified with warranty remaining.',
    coverImage: 'https://images.unsplash.com/photo-1563720223185-1103f516c448?w=800&q=80',
    phone: '+9647701000004',
  },
  {
    id: '5',
    title: 'BYD SEAL EV 2024',
    brand: 'BYD',
    model: 'SEAL',
    year: 2024,
    mileageKm: 3000,
    priceUsd: 39000,
    priceIqd: 51090000,
    fuelType: 'electric',
    transmission: 'automatic',
    color: 'Red',
    city: 'Erbil',
    sellerType: 'dealer',
    isVerified: true,
    category: 'Sedan',
    engineCc: 0,
    horsepower: 313,
    features: ['Fast Charging', 'Autopilot', 'Glass Roof', '500km Range', 'OTA Updates'],
    description: 'Brand new BYD SEAL EV 2024 with only 3,000 km. Fully electric with 313 HP and 500km range on a single charge. Features include fast charging, autopilot, glass roof, and OTA software updates. Red exterior with premium interior. Future of driving available now in Erbil.',
    coverImage: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&q=80',
    phone: '+9647701000005',
  },
  {
    id: '6',
    title: 'Chevrolet Tahoe 2021',
    brand: 'Chevrolet',
    model: 'Tahoe',
    year: 2021,
    mileageKm: 67000,
    priceUsd: 48000,
    priceIqd: 62880000,
    fuelType: 'petrol',
    transmission: 'automatic',
    color: 'Black',
    city: 'Basra',
    sellerType: 'private',
    isVerified: false,
    category: 'SUV',
    engineCc: 5328,
    horsepower: 355,
    features: ['4WD', 'Leather', 'Navigation', 'Heated/Cooled Seats', 'Bose Sound'],
    description: 'Chevrolet Tahoe 2021, powerful 5.3L V8 with 355 HP and 4WD. Black exterior with leather interior. 67,000 km highway miles. Includes heated and cooled seats, Bose premium sound, and navigation. Private seller in Basra, well maintained.',
    coverImage: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&q=80',
    phone: '+9647701000006',
  },
  {
    id: '7',
    title: 'HAVAL H6 GT 2023',
    brand: 'HAVAL',
    model: 'H6 GT',
    year: 2023,
    mileageKm: 15000,
    priceUsd: 22000,
    priceIqd: 28820000,
    fuelType: 'hybrid',
    transmission: 'automatic',
    color: 'Gray',
    city: 'Duhok',
    sellerType: 'dealer',
    isVerified: true,
    category: 'SUV',
    engineCc: 1498,
    horsepower: 243,
    features: ['360 Camera', 'HUD', 'Wireless Charging', 'Premium Sound', 'Panoramic Roof'],
    description: 'HAVAL H6 GT 2023 hybrid SUV in gray. 1.5L engine with 243 HP. Only 15,000 km. Features 360-degree camera, head-up display, wireless charging, panoramic roof, and premium sound system. Excellent value for money, dealer verified in Duhok.',
    coverImage: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80',
    phone: '+9647701000007',
  },
  {
    id: '8',
    title: 'BMW X5 2022',
    brand: 'BMW',
    model: 'X5',
    year: 2022,
    mileageKm: 22000,
    priceUsd: 78000,
    priceIqd: 102060000,
    fuelType: 'petrol',
    transmission: 'automatic',
    color: 'Blue',
    city: 'Baghdad',
    sellerType: 'dealer',
    isVerified: true,
    category: 'SUV',
    engineCc: 2998,
    horsepower: 340,
    features: ['M Sport Package', 'Laser Headlights', 'Executive Lounge', 'Bowers & Wilkins', 'Driving Assistant'],
    description: 'BMW X5 2022 xDrive40i in stunning blue. 3.0L turbocharged inline-6 with 340 HP. M Sport package, laser headlights, executive lounge seats, and Bowers & Wilkins surround sound. Fully loaded with every option. Dealer maintained, low mileage.',
    coverImage: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
    phone: '+9647701000008',
  },
  {
    id: '9',
    title: 'Hyundai Tucson 2023',
    brand: 'Hyundai',
    model: 'Tucson',
    year: 2023,
    mileageKm: 10000,
    priceUsd: 27000,
    priceIqd: 35340000,
    fuelType: 'petrol',
    transmission: 'automatic',
    color: 'White',
    city: 'Erbil',
    sellerType: 'dealer',
    isVerified: true,
    category: 'SUV',
    engineCc: 1999,
    horsepower: 187,
    features: ['Digital Cockpit', 'Hyundai Smart Sense', 'Wireless Apple CarPlay', 'Panoramic Display', 'Blind Spot'],
    description: 'Hyundai Tucson 2023 in white, only 10,000 km. Features Hyundai Smart Sense safety suite, 12.3-inch digital cockpit, wireless Apple CarPlay, and panoramic display. Stylish SUV with modern design and excellent fuel economy.',
    coverImage: 'https://images.unsplash.com/photo-1621007947382-bb3c3968e3bb?w=800&q=80',
    phone: '+9647701000009',
  },
  {
    id: '10',
    title: 'Nissan Patrol 2021',
    brand: 'Nissan',
    model: 'Patrol',
    year: 2021,
    mileageKm: 35000,
    priceUsd: 55000,
    priceIqd: 71900000,
    fuelType: 'petrol',
    transmission: 'automatic',
    color: 'Black',
    city: 'Baghdad',
    sellerType: 'dealer',
    isVerified: true,
    category: 'SUV',
    engineCc: 5552,
    horsepower: 400,
    features: ['4WD', 'Leather Seats', 'Sunroof', 'Navigation', 'Reverse Camera'],
    description: 'Nissan Patrol 2021 Y62 in black. 5.5L V8 engine with 400 HP, legendary off-road capability. Full leather interior, sunroof, navigation system, and reverse camera. Excellent condition, dealer maintained. The ultimate family SUV.',
    coverImage: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800&q=80',
    phone: '+9647701000010',
  },
  {
    id: '11',
    title: 'Honda Accord 2023',
    brand: 'Honda',
    model: 'Accord',
    year: 2023,
    mileageKm: 6000,
    priceUsd: 26000,
    priceIqd: 34040000,
    fuelType: 'petrol',
    transmission: 'automatic',
    color: 'Red',
    city: 'Sulaymaniyah',
    sellerType: 'private',
    isVerified: false,
    category: 'Sedan',
    engineCc: 1498,
    horsepower: 192,
    features: ['Honda Sensing', 'Apple CarPlay', 'Android Auto', 'LED Headlights', 'Wireless Charging'],
    description: 'Honda Accord 2023 in striking red, only 6,000 km. Turbocharged 1.5L engine with 192 HP. Equipped with Honda Sensing safety suite, wireless Apple CarPlay, LED headlights, and wireless charging. Private seller, like-new condition.',
    coverImage: 'https://images.unsplash.com/photo-1625231334168-311ade7cf5e3?w=800&q=80',
    phone: '+9647701000011',
  },
  {
    id: '12',
    title: 'Lexus RX 2022',
    brand: 'Lexus',
    model: 'RX',
    year: 2022,
    mileageKm: 18000,
    priceUsd: 48000,
    priceIqd: 62880000,
    fuelType: 'hybrid',
    transmission: 'automatic',
    color: 'Silver',
    city: 'Erbil',
    sellerType: 'dealer',
    isVerified: true,
    category: 'SUV',
    engineCc: 3456,
    horsepower: 313,
    features: ['Mark Levinson Audio', 'Adaptive Suspension', 'Head-Up Display', 'Parking Assist', 'Lexus Safety'],
    description: 'Lexus RX 450h 2022 in silver metallic. 3.5L V6 hybrid with 313 HP. Mark Levinson premium audio, adaptive variable suspension, head-up display, and advanced parking assist. Exceptional build quality, dealer serviced.',
    coverImage: 'https://images.unsplash.com/photo-1606152421811-aa6c3ce47725?w=800&q=80',
    phone: '+9647701000012',
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function formatMileage(km: number): string {
  if (km >= 1000) {
    return `${(km / 1000).toFixed(km % 1000 === 0 ? 0 : 1)}k km`;
  }
  return `${km} km`;
}

export function formatPriceUSD(usd: number): string {
  if (usd >= 1000) {
    return `$${(usd / 1000).toFixed(usd % 1000 === 0 ? 0 : 1)}k`;
  }
  return `$${usd}`;
}

export function getFuelLabel(fuel: FuelType): string {
  const labels: Record<FuelType, string> = {
    petrol: 'Petrol',
    diesel: 'Diesel',
    hybrid: 'Hybrid',
    electric: 'Electric',
  };
  return labels[fuel];
}