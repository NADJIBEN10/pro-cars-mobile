import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { spacing } from '@/constants/spacing';
import { fonts, fontSize } from '@/constants/typography';
import { useColors } from '@/hooks/useColors';
import { useI18n } from '@/lib/i18n';

const STEPS = [
  { icon: 'info', label: 'Basic Info', desc: 'Brand, model, year, category' },
  { icon: 'settings', label: 'Specifications', desc: 'Engine, fuel, transmission' },
  { icon: 'camera', label: 'Photos', desc: 'Upload car photos' },
  { icon: 'dollar-sign', label: 'Price & Contact', desc: 'Set price and contact info' },
  { icon: 'map-pin', label: 'Location', desc: 'City and address' },
  { icon: 'check-circle', label: 'Review & Submit', desc: 'Review and publish listing' },
];

export default function SellScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { t } = useI18n();

  const topInset = Platform.OS === 'web' ? 67 : insets.top;

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header gradient */}
      <LinearGradient
        colors={[colors.accent, '#C0622E']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, { paddingTop: topInset + 16 }]}
      >
        <Text style={[styles.headerTitle, { fontFamily: fonts.display }]}>
          {t.sellCar}
        </Text>
        <Text style={[styles.headerSub, { fontFamily: fonts.bodyRegular }]}>
          List your car and reach thousands of buyers across Iraq and Kurdistan
        </Text>

        {/* CTA */}
        <Pressable
          style={[styles.startBtn, { backgroundColor: 'white', borderRadius: colors.radius }]}
          onPress={() => router.push('/create-listing')}
        >
          <Feather name="plus-circle" size={20} color={colors.accent} />
          <Text style={[styles.startBtnText, { color: colors.accent, fontFamily: fonts.bodySemiBold }]}>
            Start New Listing
          </Text>
        </Pressable>
      </LinearGradient>

      {/* How it works */}
      <View style={[styles.section, { paddingHorizontal: spacing.pagePadding }]}>
        <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: fonts.displayMedium }]}>
          How it works
        </Text>
        <Text style={[styles.sectionSub, { color: colors.mutedForeground, fontFamily: fonts.bodyRegular }]}>
          Complete 6 simple steps to list your car
        </Text>

        <View style={styles.stepsContainer}>
          {STEPS.map((step, i) => (
            <View key={i} style={styles.stepRow}>
              {/* Number + connector */}
              <View style={styles.stepLeft}>
                <View style={[styles.stepNumber, { backgroundColor: colors.primary + '15', borderColor: colors.primary + '30' }]}>
                  <Text style={[styles.stepNumText, { color: colors.primary, fontFamily: fonts.display }]}>
                    {i + 1}
                  </Text>
                </View>
                {i < STEPS.length - 1 && (
                  <View style={[styles.connector, { backgroundColor: colors.border }]} />
                )}
              </View>

              {/* Content */}
              <View style={[styles.stepCard, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: colors.radius }]}>
                <View style={[styles.stepIconWrap, { backgroundColor: colors.primary + '12' }]}>
                  <Feather name={step.icon as any} size={18} color={colors.primary} />
                </View>
                <View style={styles.stepText}>
                  <Text style={[styles.stepLabel, { color: colors.foreground, fontFamily: fonts.bodySemiBold }]}>
                    {step.label}
                  </Text>
                  <Text style={[styles.stepDesc, { color: colors.mutedForeground, fontFamily: fonts.bodyRegular }]}>
                    {step.desc}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Benefits */}
      <View style={[styles.section, { paddingHorizontal: spacing.pagePadding }]}>
        <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: fonts.displayMedium }]}>
          Why sell on Rahand Cars?
        </Text>
        {[
          { icon: 'users', text: '500,000+ monthly buyers' },
          { icon: 'shield', text: 'Verified buyer protection' },
          { icon: 'trending-up', text: 'Smart price estimator' },
          { icon: 'message-circle', text: 'Direct buyer messaging' },
        ].map((b, i) => (
          <View key={i} style={[styles.benefitRow, { borderColor: colors.border }]}>
            <View style={[styles.benefitIcon, { backgroundColor: colors.success + '15' }]}>
              <Feather name={b.icon as any} size={16} color={colors.success} />
            </View>
            <Text style={[styles.benefitText, { color: colors.foreground, fontFamily: fonts.bodyRegular }]}>
              {b.text}
            </Text>
          </View>
        ))}
      </View>

      <View style={{ height: Platform.OS === 'web' ? 84 : 90 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.pagePadding,
    paddingBottom: spacing['2xl'],
    gap: 10,
  },
  headerTitle: {
    fontSize: fontSize['3xl'],
    color: 'white',
  },
  headerSub: {
    fontSize: fontSize.base,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: fontSize.base * 1.5,
  },
  startBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 6,
  },
  startBtnText: {
    fontSize: fontSize.base,
  },
  section: {
    paddingTop: spacing['2xl'],
  },
  sectionTitle: {
    fontSize: fontSize.xl,
    marginBottom: 4,
  },
  sectionSub: {
    fontSize: fontSize.base,
    marginBottom: spacing.lg,
  },
  stepsContainer: {
    gap: 0,
  },
  stepRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 4,
  },
  stepLeft: {
    alignItems: 'center',
    width: 36,
  },
  stepNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumText: {
    fontSize: fontSize.base,
  },
  connector: {
    width: 2,
    flex: 1,
    minHeight: 12,
    marginVertical: 3,
  },
  stepCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderWidth: 1,
    marginBottom: 8,
  },
  stepIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  stepText: {
    flex: 1,
  },
  stepLabel: {
    fontSize: fontSize.base,
    marginBottom: 2,
  },
  stepDesc: {
    fontSize: fontSize.xs,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  benefitIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  benefitText: {
    fontSize: fontSize.base,
  },
});
