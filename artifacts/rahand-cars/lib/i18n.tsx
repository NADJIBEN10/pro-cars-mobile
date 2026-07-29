import AsyncStorage from '@react-native-async-storage/async-storage';
import { reloadAppAsync } from 'expo';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { I18nManager } from 'react-native';

export type Language = 'en' | 'ar' | 'ku';

const RTL_LANGUAGES: Language[] = ['ar', 'ku'];
const STORAGE_KEY = '@rahand_cars_lang';

// ─── Dictionaries ────────────────────────────────────────────────────────────

const EN = {
  appName: 'Rahand Cars',
  home: 'Home',
  guide: 'Guide',
  news: 'News',
  sellCar: 'Sell Car',
  advancedSearch: 'Advanced Search',
  compare: 'Compare',
  videos: 'Videos',
  heroTitle: 'Find Your Dream Car',
  heroSub: "Iraq & Kurdistan's Largest Car Marketplace",
  search: 'Search',
  brand: 'Brand',
  model: 'Model',
  yearFrom: 'Year From',
  yearTo: 'Year To',
  priceFrom: 'Price From',
  priceTo: 'Price To',
  mileageFrom: 'Mileage From',
  mileageTo: 'Mileage To',
  fuel: 'Fuel Type',
  color: 'Color',
  city: 'City',
  allBrands: 'All Brands',
  allModels: 'All Models',
  any: 'Any',
  popularCars: 'Popular Cars',
  viewAll: 'View All',
  categories: 'Categories',
  popularBrands: 'Popular Brands',
  carsAvailable: 'Cars Available',
  dealer: 'Dealer',
  private: 'Private',
  contact: 'Contact',
  call: 'Call',
  whatsapp: 'WhatsApp',
  watchlist: 'Watchlist',
  specs: 'Specifications',
  features: 'Features',
  similar: 'Similar Cars',
  price: 'Price',
  year: 'Year',
  mileage: 'Mileage',
  engine: 'Engine',
  transmission: 'Transmission',
  horsepower: 'Horsepower',
  filters: 'Filters',
  results: 'Results',
  sort: 'Sort',
  newest: 'Newest',
  priceLow: 'Price: Low to High',
  priceHigh: 'Price: High to Low',
  account: 'Account',
  settings: 'Settings',
  signIn: 'Sign In',
  signUp: 'Create Account',
  signOut: 'Sign Out',
  sell: 'Sell',
  myListings: 'My Listings',
  favorites: 'Favorites',
  messages: 'Messages',
  savedSearches: 'Saved Searches',
  noResults: 'No cars found',
  loading: 'Loading...',
  error: 'Something went wrong',
  retry: 'Retry',
  listYourCar: 'List Your Car',
  sellYourCar: 'Sell Your Car',
  browseAll: 'Browse All Cars',
  signInToContinue: 'Sign in to continue',
  noSavedCars: 'No saved cars yet',
  saveCarsTip: 'Tap the heart on any car to save it here',
  language: 'Language',
  darkMode: 'Dark Mode',
  english: 'English',
  arabic: 'Arabic',
  kurdish: 'Kurdish',
  carDetails: 'Car Details',
  selectBrand: 'Select Brand',
  selectModel: 'Select Model',
  selectCity: 'Select City',
  selectFuel: 'Select Fuel Type',
  basicInfo: 'Basic Info',
  technicalSpecs: 'Technical Specs',
  media: 'Photos',
  priceContact: 'Price & Contact',
  reviewSubmit: 'Review & Submit',
  next: 'Next',
  back: 'Back',
  submit: 'Submit',
  cancel: 'Cancel',
  save: 'Save',
  delete: 'Delete',
  edit: 'Edit',
  report: 'Report',
  share: 'Share',
  verified: 'Verified',
  soldOut: 'Sold',
  newListing: 'New',
  kmUnit: 'km',
  usdUnit: 'USD',
  iqdUnit: 'IQD',
};

type Dict = typeof EN;

const AR: Dict = {
  appName: 'راهاند كارز',
  home: 'الرئيسية',
  guide: 'الدليل',
  news: 'الأخبار',
  sellCar: 'بيع سيارة',
  advancedSearch: 'البحث المتقدم',
  compare: 'المقارنة',
  videos: 'الفيديوهات',
  heroTitle: 'ابحث عن سيارة أحلامك',
  heroSub: 'أكبر سوق للسيارات في العراق وكردستان',
  search: 'بحث',
  brand: 'الماركة',
  model: 'الموديل',
  yearFrom: 'السنة من',
  yearTo: 'السنة إلى',
  priceFrom: 'السعر من',
  priceTo: 'السعر إلى',
  mileageFrom: 'المسافة من',
  mileageTo: 'المسافة إلى',
  fuel: 'نوع الوقود',
  color: 'اللون',
  city: 'المدينة',
  allBrands: 'كل الماركات',
  allModels: 'كل الموديلات',
  any: 'الكل',
  popularCars: 'السيارات الشائعة',
  viewAll: 'عرض الكل',
  categories: 'الفئات',
  popularBrands: 'الماركات الشائعة',
  carsAvailable: 'سيارة متاحة',
  dealer: 'معرض',
  private: 'خاص',
  contact: 'تواصل',
  call: 'اتصال',
  whatsapp: 'واتساب',
  watchlist: 'المحفوظات',
  specs: 'المواصفات',
  features: 'المميزات',
  similar: 'سيارات مشابهة',
  price: 'السعر',
  year: 'السنة',
  mileage: 'المسافة',
  engine: 'المحرك',
  transmission: 'ناقل الحركة',
  horsepower: 'قوة الحصان',
  filters: 'الفلاتر',
  results: 'النتائج',
  sort: 'ترتيب',
  newest: 'الأحدث',
  priceLow: 'السعر: من الأقل',
  priceHigh: 'السعر: من الأعلى',
  account: 'الحساب',
  settings: 'الإعدادات',
  signIn: 'تسجيل الدخول',
  signUp: 'إنشاء حساب',
  signOut: 'تسجيل الخروج',
  sell: 'بيع',
  myListings: 'إعلاناتي',
  favorites: 'المفضلة',
  messages: 'الرسائل',
  savedSearches: 'البحوث المحفوظة',
  noResults: 'لا توجد سيارات',
  loading: 'جاري التحميل...',
  error: 'حدث خطأ ما',
  retry: 'إعادة المحاولة',
  listYourCar: 'أضف سيارتك',
  sellYourCar: 'بع سيارتك',
  browseAll: 'تصفح جميع السيارات',
  signInToContinue: 'سجل الدخول للمتابعة',
  noSavedCars: 'لا توجد سيارات محفوظة',
  saveCarsTip: 'اضغط على القلب لحفظ أي سيارة',
  language: 'اللغة',
  darkMode: 'الوضع المظلم',
  english: 'الإنجليزية',
  arabic: 'العربية',
  kurdish: 'الكردية',
  carDetails: 'تفاصيل السيارة',
  selectBrand: 'اختر الماركة',
  selectModel: 'اختر الموديل',
  selectCity: 'اختر المدينة',
  selectFuel: 'اختر نوع الوقود',
  basicInfo: 'المعلومات الأساسية',
  technicalSpecs: 'المواصفات الفنية',
  media: 'الصور',
  priceContact: 'السعر والتواصل',
  reviewSubmit: 'مراجعة وإرسال',
  next: 'التالي',
  back: 'رجوع',
  submit: 'إرسال',
  cancel: 'إلغاء',
  save: 'حفظ',
  delete: 'حذف',
  edit: 'تعديل',
  report: 'إبلاغ',
  share: 'مشاركة',
  verified: 'موثق',
  soldOut: 'مباع',
  newListing: 'جديد',
  kmUnit: 'كم',
  usdUnit: 'دولار',
  iqdUnit: 'دينار',
};

const KU: Dict = {
  appName: 'راهاند کارز',
  home: 'ماڵەوە',
  guide: 'ڕێنمایی',
  news: 'هەواڵ',
  sellCar: 'فرۆشتنی ئۆتۆمبێل',
  advancedSearch: 'گەڕانی پیشکەوتوو',
  compare: 'بەراوردکردن',
  videos: 'ڤیدیۆکان',
  heroTitle: 'ئۆتۆمبێلی خەونت بدۆزەرەوە',
  heroSub: 'گەورەترین بازاڕی ئۆتۆمبێل لە عێراق و کوردستان',
  search: 'گەڕان',
  brand: 'براند',
  model: 'مۆدێل',
  yearFrom: 'ساڵ لە',
  yearTo: 'ساڵ بۆ',
  priceFrom: 'نرخ لە',
  priceTo: 'نرخ بۆ',
  mileageFrom: 'کیلۆمەتر لە',
  mileageTo: 'کیلۆمەتر بۆ',
  fuel: 'جۆری سووتەمەنی',
  color: 'ڕەنگ',
  city: 'شار',
  allBrands: 'هەموو براندەکان',
  allModels: 'هەموو مۆدێلەکان',
  any: 'هەموو',
  popularCars: 'ئۆتۆمبێلە بەناوبانگەکان',
  viewAll: 'هەموویان ببینە',
  categories: 'پۆلەکان',
  popularBrands: 'براندە بەناوبانگەکان',
  carsAvailable: 'ئۆتۆمبێل بەردەستە',
  dealer: 'نمایشگا',
  private: 'تایبەت',
  contact: 'پەیوەندی',
  call: 'تەلەفۆن',
  whatsapp: 'واتساپ',
  watchlist: 'پاراستراوەکان',
  specs: 'تایبەتمەندییەکان',
  features: 'تایبەتییەکان',
  similar: 'ئۆتۆمبێلی هاوشێوە',
  price: 'نرخ',
  year: 'ساڵ',
  mileage: 'کیلۆمەتر',
  engine: 'مۆتەر',
  transmission: 'گێربۆکس',
  horsepower: 'هێزی ئەسپ',
  filters: 'فلتەرەکان',
  results: 'ئەنجامەکان',
  sort: 'ڕیزکردن',
  newest: 'نوێترین',
  priceLow: 'نرخ: لە کەمەوە',
  priceHigh: 'نرخ: لە زیادەوە',
  account: 'ئەکاونت',
  settings: 'ڕێکخستنەکان',
  signIn: 'چوونەژوورەوە',
  signUp: 'دروستکردنی ئەکاونت',
  signOut: 'چوونەدەرەوە',
  sell: 'فرۆشتن',
  myListings: 'ئیلانەکانم',
  favorites: 'دڵخوازەکان',
  messages: 'نامەکان',
  savedSearches: 'گەڕانە پاراستراوەکان',
  noResults: 'هیچ ئۆتۆمبێلێک نەدۆزرایەوە',
  loading: 'چاوەڕوانبە...',
  error: 'هەڵەیەک ڕوویدا',
  retry: 'دووبارە هەوڵ بدەرەوە',
  listYourCar: 'ئۆتۆمبێلەکەت تۆمار بکە',
  sellYourCar: 'ئۆتۆمبێلەکەت بفرۆشە',
  browseAll: 'هەموو ئۆتۆمبێلەکان ببینە',
  signInToContinue: 'بچۆ ژوورەوە بۆ بەردەوامبوون',
  noSavedCars: 'هیچ ئۆتۆمبێلێک پاراستراو نییە',
  saveCarsTip: 'دلێکە لەسەر هەر ئۆتۆمبێلێک بۆ پاراستنی',
  language: 'زمان',
  darkMode: 'دۆخی تاریک',
  english: 'ئینگلیزی',
  arabic: 'عەرەبی',
  kurdish: 'کوردی',
  carDetails: 'وردەکاری ئۆتۆمبێل',
  selectBrand: 'براند هەڵبژێرە',
  selectModel: 'مۆدێل هەڵبژێرە',
  selectCity: 'شار هەڵبژێرە',
  selectFuel: 'جۆری سووتەمەنی هەڵبژێرە',
  basicInfo: 'زانیاری بنچینەیی',
  technicalSpecs: 'تایبەتمەندییە تەکنیکییەکان',
  media: 'وێنەکان',
  priceContact: 'نرخ و پەیوەندی',
  reviewSubmit: 'پێداچوونەوە و ناردن',
  next: 'دواتر',
  back: 'گەڕانەوە',
  submit: 'ناردن',
  cancel: 'پاشگەزبوونەوە',
  save: 'پاراستن',
  delete: 'سڕینەوە',
  edit: 'دەستکاری',
  report: 'ڕاپۆرت',
  share: 'هاوبەشکردن',
  verified: 'پشتڕاستکراوە',
  soldOut: 'فرۆشرا',
  newListing: 'نوێ',
  kmUnit: 'کم',
  usdUnit: 'دۆلار',
  iqdUnit: 'دینار',
};

const DICT: Record<Language, Dict> = { en: EN, ar: AR, ku: KU };

// ─── Context ──────────────────────────────────────────────────────────────────

interface I18nContextValue {
  language: Language;
  setLanguage: (lang: Language) => Promise<void>;
  t: Dict;
  isRTL: boolean;
}

const I18nContext = createContext<I18nContextValue>({
  language: 'en',
  setLanguage: async () => {},
  t: EN,
  isRTL: false,
});

// ─── Provider ─────────────────────────────────────────────────────────────────

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  // Restore saved language on mount
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((saved) => {
      if (saved === 'en' || saved === 'ar' || saved === 'ku') {
        setLanguageState(saved);
        const shouldBeRTL = RTL_LANGUAGES.includes(saved);
        if (I18nManager.isRTL !== shouldBeRTL) {
          I18nManager.forceRTL(shouldBeRTL);
        }
      }
    });
  }, []);

  const setLanguage = async (lang: Language) => {
    await AsyncStorage.setItem(STORAGE_KEY, lang);
    const shouldBeRTL = RTL_LANGUAGES.includes(lang);
    const needsReload = I18nManager.isRTL !== shouldBeRTL;

    if (needsReload) {
      I18nManager.forceRTL(shouldBeRTL);
    }

    setLanguageState(lang);

    if (needsReload) {
      // RTL direction change requires full app reload to take effect
      await reloadAppAsync();
    }
  };

  return (
    <I18nContext.Provider
      value={{
        language,
        setLanguage,
        t: DICT[language],
        isRTL: RTL_LANGUAGES.includes(language),
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useI18n() {
  return useContext(I18nContext);
}
