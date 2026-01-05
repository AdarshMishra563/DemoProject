import { COLOR, FONT_SIZE, FONTS, SIZE } from "@utils/Constant";
import { navigate } from '@utils/NavigationUtil';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { ScrollContainer } from '@components/common/ScrollContainer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { GlobalStyles } from '@styles/GlobalCss';

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
  const [modalVisible, setModalVisible] = useState(false);

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

          <TouchableOpacity onPress={() => { setModalVisible(true) }} style={styles.subscribeButton}>
            <Text style={styles.subscribeText}>Buy Now</Text>
            <Icon name="arrow-top-right" size={SIZE.moderateScale(16)} color={COLOR.white} />
          </TouchableOpacity>
        </TouchableOpacity>
      ))}

      {/* FOOTER */}
      <Text style={styles.footer}>
        Cancel anytime. Subscription auto-renews unless cancelled.
      </Text>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={() => { }}>
              <View style={styles.modalContent}>
                <Image
                  source={require('../assets/images/success.png')}
                  style={styles.successImage}
                  resizeMode="contain"
                />

                <Text style={styles.modalTitle}>Order Successful!</Text>
                <Text style={styles.modalSubtitle}>You have successfully made order</Text>

                <View style={styles.orderDetails}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Order Number</Text>
                    <Text style={styles.detailValue}>#{plans.find(p => p.id === selected)?.id}60525</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Estimated Time</Text>
                    <Text style={styles.detailValue}>30 Minutes</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Status</Text>
                    <Text style={[styles.detailValue, { color: COLOR.success }]}>Confirmed</Text>
                  </View>
                </View>

                <View style={styles.stepsContainer}>
                  {/* Step 1 */}
                  <View style={styles.stepRow}>
                    <View style={styles.stepIconActive}>
                      <Text style={styles.stepNumber}>1</Text>
                    </View>
                    <View style={styles.stepTextContainer}>
                      <Text style={styles.stepTitle}>Order Confirmed</Text>
                      <Text style={styles.stepSubtitle}>Your order is being prepared</Text>
                    </View>
                  </View>

                  {/* Connector Line */}
                  <View style={styles.stepConnector} />

                  {/* Step 2 */}
                  <View style={styles.stepRow}>
                    <View style={styles.stepIconInactive} />
                    <Text style={styles.stepTitleInactive}>Out for Delivery</Text>
                  </View>

                  {/* Connector Line */}
                  <View style={styles.stepConnector} />

                  {/* Step 3 */}
                  <View style={styles.stepRow}>
                    <View style={styles.stepIconInactive} />
                    <Text style={styles.stepTitleInactive}>Delivered</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate('Tab', { screen: 'Home' });
                  }}
                >
                  <Text style={styles.modalButtonText}>Back to Home</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
    ...GlobalStyles.textBold18,
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
    ...GlobalStyles.textBold20,
    color: COLOR.dark,
    lineHeight: SIZE.moderateScale(28),
    marginBottom: SIZE.moderateScale(8), // 12 -> 8
  },

  subtitle: {
    ...GlobalStyles.textRegular14,
    color: COLOR.walletHistoryGrey,
    lineHeight: SIZE.moderateScale(20),
    marginBottom: 28,
  },

  sectionHeader: {
    ...GlobalStyles.textBold15,
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
    ...GlobalStyles.textBold12,
    color: COLOR.dark,
    marginBottom: SIZE.moderateScale(2),
  },

  planSubtitle: {
    ...GlobalStyles.textRegular11,
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
    ...GlobalStyles.textBold24,
    color: COLOR.dark,
  },

  oldPrice: {
    ...GlobalStyles.textRegular12,
    color: COLOR.walletHistoryGrey,
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
    ...GlobalStyles.textBold10,
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

    ...GlobalStyles.textBold13, color: COLOR.white
  },

  footer: {
    ...GlobalStyles.textRegular11,
    color: COLOR.walletHistoryGrey,
    textAlign: 'center',
    marginTop: 20,
  },

  /* MODAL STYLES */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    width: '100%',
    backgroundColor: COLOR.white,
    borderTopLeftRadius: SIZE.moderateScale(24),
    borderTopRightRadius: SIZE.moderateScale(24),
    padding: SIZE.moderateScale(24),
    alignItems: 'center',
    paddingBottom: SIZE.moderateScale(40),
  },
  successImage: {
    width: SIZE.moderateScale(80),
    height: SIZE.moderateScale(80),
    marginBottom: SIZE.moderateScale(16),
  },
  modalTitle: {
    ...GlobalStyles.textBold18,
    color: '#EF4444', // Red color matching image
    marginBottom: SIZE.moderateScale(8),
  },
  modalSubtitle: {
    ...GlobalStyles.textRegular12,
    color: COLOR.darkGrey,
    marginBottom: SIZE.moderateScale(20),
    textAlign: 'center',
  },
  orderDetails: {
    width: '100%',
    backgroundColor: '#F9FAFB',
    borderRadius: SIZE.moderateScale(12),
    padding: SIZE.moderateScale(12),
    marginBottom: SIZE.moderateScale(20),
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZE.moderateScale(6),
  },
  detailLabel: {
    ...GlobalStyles.textMedium12,
    color: COLOR.darkGrey,
  },
  detailValue: {
    ...GlobalStyles.textSemiBold13,
    color: COLOR.dark,
  },
  stepsContainer: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: SIZE.moderateScale(20),
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZE.moderateScale(4),
  },
  stepIconActive: {
    width: SIZE.moderateScale(20),
    height: SIZE.moderateScale(20),
    borderRadius: SIZE.moderateScale(10),
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZE.moderateScale(10),
  },
  stepNumber: {
    color: COLOR.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  stepTextContainer: {
    flex: 1,
  },
  stepTitle: {
    ...GlobalStyles.textSemiBold13,
    color: COLOR.dark,
  },
  stepSubtitle: {
    ...GlobalStyles.textRegular11,
    color: '#EF4444',
  },
  stepConnector: {
    width: 2,
    height: SIZE.moderateScale(16),
    backgroundColor: '#E5E7EB',
    marginLeft: SIZE.moderateScale(9), // Center with icon
    marginVertical: SIZE.moderateScale(2),
  },
  stepIconInactive: {
    width: SIZE.moderateScale(20),
    height: SIZE.moderateScale(20), // Placeholder for icon alignment
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZE.moderateScale(10),
    backgroundColor: '#E5E7EB', // Inactive dot/circle
    borderRadius: SIZE.moderateScale(10),
  },
  stepTitleInactive: {
    ...GlobalStyles.textMedium13,
    color: COLOR.darkGrey,
  },
  modalButton: {
    width: '100%',
    backgroundColor: COLOR.primary,
    paddingVertical: SIZE.moderateScale(14),
    borderRadius: SIZE.moderateScale(12),
    alignItems: 'center',
  },
  modalButtonText: {
    ...GlobalStyles.textSemiBold14,
    color: COLOR.white,
  },
});
