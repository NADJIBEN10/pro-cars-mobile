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
  },
  {
    id: '8',
    title: 'Toyota Hilux 2022',
    brand: 'Toyota',
    model: 'Hilux',
    year: 2022,
    mileageKm: 52000,
    priceUsd: 35000,
    priceIqd: 45850000,
    fuelType: 'diesel',
    transmission: 'manual',
    color: 'White',
    city: 'Kirkuk',
    sellerType: 'private',
    isVerified: false,
    category: 'Pickup',
    engineCc: 2755,
    horsepower: 204,
    features: ['4WD', 'Differential Lock', 'Tow Package', 'Bull Bar'],
    description: 'Toyota Hilux 2022 diesel pickup, manual transmission, 2.8L engine with 204 HP. White exterior, 52,000 km. Built for work with 4WD, differential lock, tow package, and bull bar. Tough and reliable, private seller in Kirkuk.',
  },
  {
    id: '9',
    title: 'BMW X5 xDrive40i 2022',
    brand: 'BMW',
    model: 'X5',
    year: 2022,
    mileageKm: 31000,
    priceUsd: 72000,
    priceIqd: 94320000,
    fuelType: 'petrol',
    transmission: 'automatic',
    color: 'White',
    city: 'Baghdad',
    sellerType: 'dealer',
    isVerified: true,
    category: 'SUV',
    engineCc: 2998,
    horsepower: 340,
    features: ['Panoramic Roof', 'Harman Kardon', 'Night Vision', 'Adaptive Cruise', 'Laser Lights'],
    description: 'BMW X5 xDrive40i 2022 in white. 3.0L inline-6 with 340 HP and xDrive AWD. 31,000 km. Features panoramic roof, Harman Kardon sound, night vision assist, adaptive cruise control, and laser headlights. Premium luxury SUV, dealer maintained in Baghdad.',
  },
  {
    id: '10',
    title: 'Hyundai Tucson 2023',
    brand: 'Hyundai',
    model: 'Tucson',
    year: 2023,
    mileageKm: 9500,
    priceUsd: 24000,
    priceIqd: 31440000,
    fuelType: 'petrol',
    transmission: 'automatic',
    color: 'Green',
    city: 'Najaf',
    sellerType: 'dealer',
    isVerified: true,
    category: 'SUV',
    engineCc: 1598,
    horsepower: 177,
    features: ['Sunroof', 'BOSE Sound', 'Blind Spot Monitor', 'Lane Keeping', 'Wireless Charging'],
    description: 'Hyundai Tucson 2023 in green, nearly new with 9,500 km. 1.6L engine with 177 HP. Includes sunroof, BOSE sound system, blind spot monitor, lane keeping assist, and wireless charging. Dealer verified in Najaf, great family SUV.',
  },
  {
    id: '11',
    title: 'Kia K5 GT-Line 2023',
    brand: 'Kia',
    model: 'K5',
    year: 2023,
    mileageKm: 6200,
    priceUsd: 26000,
    priceIqd: 34060000,
    fuelType: 'petrol',
    transmission: 'automatic',
    color: 'Black',
    city: 'Erbil',
    sellerType: 'dealer',
    isVerified: true,
    category: 'Sedan',
    engineCc: 1598,
    horsepower: 180,
    features: ['Sport Mode', 'Heated Seats', 'Smart Cruise', 'Head-up Display'],
    description: 'Kia K5 GT-Line 2023 in black, only 6,200 km. 1.6L engine with 180 HP. Sport mode, heated seats, smart cruise control, and head-up display. Stylish sedan with sporty character, dealer verified in Erbil.',
  },
  {
    id: '12',
    title: 'Toyota Prado 2021',
    brand: 'Toyota',
    model: 'Prado',
    year: 2021,
    mileageKm: 55000,
    priceUsd: 54000,
    priceIqd: 70740000,
    fuelType: 'diesel',
    transmission: 'automatic',
    color: 'Gray',
    city: 'Sulaymaniyah',
    sellerType: 'dealer',
    isVerified: true,
    category: 'SUV',
    engineCc: 2755,
    horsepower: 204,
    features: ['4WD', 'Leather', 'Navigation', 'Sunroof', 'Rear Camera', 'Kinetic Dynamic Suspension'],
    description: 'Toyota Prado 2021 diesel in gray. 2.8L engine with 204 HP, automatic transmission, 4WD. 55,000 km. Leather interior, navigation, sunroof, rear camera, and kinetic dynamic suspension. Reliable off-road capability, dealer verified in Sulaymaniyah.',
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function formatPriceUSD(amount: number): string {
  const str = Math.round(amount).toString();
  return '$' + str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function formatMileage(km: number): string {
  return km.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' km';
}

export function getFuelLabel(fuel: FuelType): string {
  const map: Record<FuelType, string> = {
    petrol: 'Petrol',
    diesel: 'Diesel',
    hybrid: 'Hybrid',
    electric: 'Electric',
  };
  return map[fuel];
}
