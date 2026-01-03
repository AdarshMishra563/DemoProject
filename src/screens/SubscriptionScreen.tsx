import { COLOR, FONT_SIZE, FONTS, SIZE } from "@utils/Constant";
import { navigate } from '@utils/NavigationUtil';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,

} from 'react-native';
import { ScrollContainer } from '@components/common/ScrollContainer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const plans = [
  {
    id: 1,
    title: 'YEARLY SUBSCRIPTION',
    subtitle: '14 Day Free Trial',
    price: '₹2,999',
    oldPrice: '₹4,699',
    discount: '36% OFF',
  },
  {
    id: 2,
    title: 'QUARTERLY SUBSCRIPTION',
    subtitle: '7 Day Free Trial',
    price: '₹899',
    oldPrice: '₹1,199',
    discount: '25% OFF',
  },
  {
    id: 3,
    title: 'MONTHLY SUBSCRIPTION',
    subtitle: '7 Day Free Trial',
    price: '₹299',
    oldPrice: '₹399',
    discount: '25% OFF',
  },
  {
    id: 4,
    title: 'WEEKLY SUBSCRIPTION',
    subtitle: '3 Day Free Trial',
    price: '₹99',
    oldPrice: '₹149',
    discount: '34% OFF',
  },
];

const SubscriptionScreen = ({ navigation }: any) => {
  const [selected, setSelected] = useState(1);

  return (
    <ScrollContainer
      header={
        <>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation?.goBack()}>
              <Icon name="arrow-left" size={SIZE.moderateScale(24)} color={COLOR.dark} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Subscription</Text>
            <View style={{ width: 26 }} />
          </View>
          <View style={styles.divider} />
        </>
      }
      scrollStyle={styles.content}
    >
      {/* TITLE */}
      <Text style={styles.title}>
        Get Unlimited Digital Access
      </Text>

      {/* DESCRIPTION */}
      <Text style={styles.subtitle}>
        Go deeper into every story with ad-free reading, exclusive insights,
        and early access to breaking news.
      </Text>

      {/* SECTION HEADER */}
      <Text style={styles.sectionHeader}>Here Is Your Deal</Text>

      {/* PLANS */}
      {plans.map(plan => (
        <TouchableOpacity
          key={plan.id}
          activeOpacity={0.9}
          onPress={() => { setSelected(plan.id) }}
          style={[
            styles.card,
            selected === plan.id && styles.selectedCard,
          ]}
        >
          <Text style={styles.planTitle}>{plan.title}</Text>
          <Text style={styles.planSubtitle}>{plan.subtitle}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>{plan.price}</Text>
            <Text style={styles.oldPrice}>{plan.oldPrice}</Text>

            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{plan.discount}</Text>
            </View>
          </View>

          <TouchableOpacity onPress={() => { navigate('Checkout2') }} style={styles.subscribeButton}>
            <Text style={styles.subscribeText}>Buy Now</Text>
            <Icon name="arrow-top-right" size={SIZE.moderateScale(16)} color={COLOR.white} />
          </TouchableOpacity>
        </TouchableOpacity>
      ))}

      {/* FOOTER */}
      <Text style={styles.footer}>
        Cancel anytime. Subscription auto-renews unless cancelled.
      </Text>
    </ScrollContainer>
  );
};

export default SubscriptionScreen;

/* ===================== STYLES ===================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: FONT_SIZE.font18,
    fontFamily: FONTS.parkinsansBold,
    color: COLOR.dark,
  },

  divider: {
    height: 1,
    backgroundColor: COLOR.grayLight,
    width: '100%',
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: FONT_SIZE.font20, // 22 -> 20
    fontFamily: FONTS.parkinsansBold,
    color: COLOR.dark,
    lineHeight: SIZE.moderateScale(28),
    marginBottom: SIZE.moderateScale(8), // 12 -> 8
  },

  subtitle: {
    fontSize: FONT_SIZE.font14, // 15 -> 14
    color: COLOR.walletHistoryGrey,
    fontFamily: FONTS.parkinsansRegular,
    lineHeight: SIZE.moderateScale(20),
    marginBottom: 28,
  },

  sectionHeader: {
    fontSize: FONT_SIZE.font15, // 16 -> 15
    fontFamily: FONTS.parkinsansBold,
    color: COLOR.dark,
    marginBottom: SIZE.moderateScale(12), // 16 -> 12
  },

  card: {
    borderWidth: 1.5,
    borderColor: COLOR.grayLight,
    borderRadius: SIZE.moderateScale(12),
    padding: SIZE.moderateScale(14), // 18 -> 14 (Reduced padding to reduce height)
    marginBottom: SIZE.moderateScale(16), // 20 -> 16
  },

  selectedCard: {
    borderColor: COLOR.dark,
  },

  planTitle: {
    fontSize: SIZE.moderateScale(12), // 13 -> 12
    fontFamily: FONTS.parkinsansBold,
    color: COLOR.dark,
    marginBottom: SIZE.moderateScale(2),
  },

  planSubtitle: {
    fontSize: SIZE.moderateScale(11), // 12 -> 11
    fontFamily: FONTS.parkinsansRegular,
    color: COLOR.walletHistoryGrey,
    marginBottom: SIZE.moderateScale(10), // 14 -> 10
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZE.moderateScale(10), // 14 -> 10
    gap: SIZE.moderateScale(8),
  },

  price: {
    fontSize: FONT_SIZE.font24, // 28 -> 24
    fontFamily: FONTS.parkinsansBold,
    color: COLOR.dark,
  },

  oldPrice: {
    fontSize: SIZE.moderateScale(12), // 13 -> 12
    color: COLOR.grayLight,
    fontFamily: FONTS.parkinsansRegular,
    textDecorationLine: 'line-through',
  },

  discountBadge: {
    marginLeft: 'auto',
    backgroundColor: COLOR.grayLight,
    paddingHorizontal: SIZE.moderateScale(8), // 10 -> 8
    paddingVertical: SIZE.moderateScale(3), // 4 -> 3
    borderRadius: SIZE.moderateScale(10),
  },

  discountText: {
    fontSize: SIZE.moderateScale(10), // 11 -> 10
    fontFamily: FONTS.parkinsansBold,
    color: COLOR.dark,
  },

  subscribeButton: {
    backgroundColor: COLOR.dark,
    paddingVertical: SIZE.moderateScale(10), // 14 -> 10 (Reduced button height)
    borderRadius: SIZE.moderateScale(8),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SIZE.moderateScale(8),
  },

  subscribeText: {
    color: COLOR.white,
    fontSize: SIZE.moderateScale(13), // 15 -> 13
    fontFamily: FONTS.parkinsansBold,
  },

  footer: {
    fontSize: FONT_SIZE.font11, // 12 -> 11
    fontFamily: FONTS.parkinsansRegular,
    color: COLOR.walletHistoryGrey,
    textAlign: 'center',
    marginTop: 20,
  },
});
