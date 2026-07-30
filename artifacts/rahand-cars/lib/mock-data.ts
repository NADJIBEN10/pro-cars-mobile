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
