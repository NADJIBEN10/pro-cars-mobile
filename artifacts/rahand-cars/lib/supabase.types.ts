/**
 * Rahand Cars — Supabase Database Types
 * Mirrors the Rahand Cars Supabase schema exactly.
 * Update these when the schema changes.
 */

// ─── Enums ────────────────────────────────────────────────────────────────────

export type AppRole = 'admin' | 'moderator' | 'dealer' | 'user';
export type FuelType = 'petrol' | 'diesel' | 'hybrid' | 'electric';
export type ListingStatus = 'draft' | 'pending' | 'active' | 'sold' | 'expired' | 'rejected';
export type NotificationKind = 'message' | 'listing' | 'saved_search' | 'price_drop' | 'system';
export type ReportStatus = 'open' | 'reviewing' | 'resolved' | 'dismissed';
export type SellerType = 'dealer' | 'private';
export type SubscriptionStatus = 'trialing' | 'active' | 'past_due' | 'canceled';
export type SubscriptionTier = 'free' | 'basic' | 'pro' | 'enterprise';
export type TransmissionType = 'automatic' | 'manual';

// ─── Table Row Types ───────────────────────────────────────────────────────────

export interface Profile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  city_id: string | null;
  preferred_language: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  user_id: string;
  role: AppRole;
}

export interface Brand {
  id: string;
  slug: string;
  name: string;
  logo_url: string | null;
  sort_order: number;
}

export interface CarModel {
  id: string;
  brand_id: string;
  slug: string;
  name: string;
}

export interface Category {
  id: string;
  slug: string;
  label: string;
  icon: string;
}

export interface City {
  id: string;
  slug: string;
  name_en: string;
  name_ar: string;
  name_ku: string;
  country_code: string;
}

export interface Car {
  id: string;
  owner_user_id: string;
  dealer_id: string | null;
  seller_type: SellerType;
  status: ListingStatus;
  brand_id: string;
  model_id: string;
  category_id: string | null;
  title: string;
  description: string | null;
  year: number;
  mileage_km: number;
  price_usd: number;
  price_iqd: number | null;
  color: string | null;
  fuel: FuelType;
  transmission: TransmissionType;
  engine_cc: number | null;
  engine_label: string | null;
  horsepower: number | null;
  body_type: string | null;
  city_id: string | null;
  vin: string | null;
  features: string[];
  cover_image_url: string | null;
  views_count: number;
  favorites_count: number;
  published_at: string | null;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CarImage {
  id: string;
  car_id: string;
  url: string;
  sort_order: number;
  is_cover: boolean;
}

export interface CarVideo {
  id: string;
  car_id: string;
  url: string;
  thumbnail_url: string | null;
}

export interface CarPriceHistory {
  id: string;
  car_id: string;
  price_usd: number;
  changed_at: string;
}

export interface Dealer {
  id: string;
  owner_user_id: string;
  slug: string;
  name: string;
  description: string | null;
  logo_url: string | null;
  cover_url: string | null;
  city_id: string | null;
  address: string | null;
  phone: string | null;
  whatsapp: string | null;
  website: string | null;
  verified: boolean;
  rating_avg: number;
  rating_count: number;
  created_at: string;
}

export interface DealerReview {
  id: string;
  dealer_id: string;
  reviewer_user_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
}

export interface Subscription {
  id: string;
  dealer_id: string;
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  listing_quota: number;
  current_period_start: string;
  current_period_end: string;
  created_at: string;
}

export interface Favorite {
  user_id: string;
  car_id: string;
  created_at: string;
}

export interface SavedSearch {
  id: string;
  user_id: string;
  name: string;
  query: Record<string, unknown>;
  alerts_enabled: boolean;
  last_notified_at: string | null;
  created_at: string;
}

export interface Conversation {
  id: string;
  car_id: string;
  buyer_user_id: string;
  seller_user_id: string;
  last_message_at: string;
  created_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_user_id: string;
  body: string;
  read_at: string | null;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  link: string | null;
  read_at: string | null;
  created_at: string;
}

export interface Report {
  id: string;
  reporter_user_id: string;
  car_id: string;
  reason: string;
  details: string | null;
  status: ReportStatus;
  created_at: string;
}

export interface AuditLog {
  id: string;
  actor_user_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

// ─── Database Schema Type (for createClient<Database>) ────────────────────────

export interface Database {
  public: {
    Tables: {
      profiles: { Row: Profile; Insert: Omit<Profile, 'created_at' | 'updated_at'>; Update: Partial<Profile> };
      user_roles: { Row: UserRole; Insert: UserRole; Update: Partial<UserRole> };
      brands: { Row: Brand; Insert: Omit<Brand, 'id'>; Update: Partial<Brand> };
      car_models: { Row: CarModel; Insert: Omit<CarModel, 'id'>; Update: Partial<CarModel> };
      categories: { Row: Category; Insert: Omit<Category, 'id'>; Update: Partial<Category> };
      cities: { Row: City; Insert: Omit<City, 'id'>; Update: Partial<City> };
      cars: { Row: Car; Insert: Omit<Car, 'id' | 'created_at' | 'updated_at' | 'views_count' | 'favorites_count'>; Update: Partial<Car> };
      car_images: { Row: CarImage; Insert: Omit<CarImage, 'id'>; Update: Partial<CarImage> };
      car_videos: { Row: CarVideo; Insert: Omit<CarVideo, 'id'>; Update: Partial<CarVideo> };
      car_price_history: { Row: CarPriceHistory; Insert: Omit<CarPriceHistory, 'id' | 'changed_at'>; Update: never };
      dealers: { Row: Dealer; Insert: Omit<Dealer, 'id' | 'created_at' | 'rating_avg' | 'rating_count'>; Update: Partial<Dealer> };
      dealer_reviews: { Row: DealerReview; Insert: Omit<DealerReview, 'id' | 'created_at'>; Update: Partial<DealerReview> };
      subscriptions: { Row: Subscription; Insert: Omit<Subscription, 'id' | 'created_at'>; Update: Partial<Subscription> };
      favorites: { Row: Favorite; Insert: Favorite; Update: never };
      saved_searches: { Row: SavedSearch; Insert: Omit<SavedSearch, 'id' | 'created_at'>; Update: Partial<SavedSearch> };
      conversations: { Row: Conversation; Insert: Omit<Conversation, 'id' | 'created_at'>; Update: Partial<Conversation> };
      messages: { Row: Message; Insert: Omit<Message, 'id' | 'created_at'>; Update: Partial<Message> };
      notifications: { Row: Notification; Insert: Omit<Notification, 'id' | 'created_at'>; Update: Partial<Notification> };
      reports: { Row: Report; Insert: Omit<Report, 'id' | 'created_at'>; Update: Partial<Report> };
      audit_logs: { Row: AuditLog; Insert: Omit<AuditLog, 'id' | 'created_at'>; Update: never };
    };
    Enums: {
      app_role: AppRole;
      fuel_type: FuelType;
      listing_status: ListingStatus;
      notification_kind: NotificationKind;
      report_status: ReportStatus;
      seller_type: SellerType;
      subscription_status: SubscriptionStatus;
      subscription_tier: SubscriptionTier;
      transmission_type: TransmissionType;
    };
  };
}
