import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,

} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { COLOR, FONTS, FONT_SIZE } from '@utils/Constant';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollContainer } from '@components/common/ScrollContainer';
import { GlobalStyles } from '@styles/GlobalCss';

const TermsAndConditionsScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets()
  return (
    <ScrollContainer
      header={
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color={COLOR.dark} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Terms & Conditions</Text>
          <View style={{ width: 24 }} />
        </View>
      }
      scrollStyle={styles.contentContainer}
      footer={
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.acceptButtonText}>I Accept</Text>
          </TouchableOpacity>
        </View>
      }
    >
      {/* App Title */}
      <View style={styles.appTitleContainer}>
        <Text style={styles.appName}>Blink Exam</Text>
        <Text style={styles.appTagline}>Your Exam Preparation Partner</Text>
      </View>

      {/* Last Updated */}
      <Text style={styles.lastUpdated}>Last Updated: December 15, 2024</Text>

      {/* Introduction */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Introduction</Text>
        <Text style={styles.paragraph}>
          Welcome to Blink Exam. By accessing or using our mobile application,
          you agree to be bound by these Terms and Conditions. Please read them
          carefully before using the app.
        </Text>
      </View>

      {/* Account Terms */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Account Registration</Text>
        <Text style={styles.paragraph}>
          • You must provide accurate and complete information when creating an account.{'\n'}
          • You are responsible for maintaining the confidentiality of your account credentials.{'\n'}
          • You must notify us immediately of any unauthorized use of your account.{'\n'}
          • You must be at least 13 years old to use this application.
        </Text>
      </View>

      {/* App Usage */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Acceptable Use</Text>
        <Text style={styles.paragraph}>
          You agree not to:{'\n'}
          • Use the app for any illegal purpose{'\n'}
          • Attempt to hack or compromise app security{'\n'}
          • Copy, modify, or distribute app content without permission{'\n'}
          • Use automated systems to access the app{'\n'}
          • Share inappropriate or offensive content
        </Text>
      </View>

      {/* Content */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Content and Materials</Text>
        <Text style={styles.paragraph}>
          • All exam questions, study materials, and content are for educational purposes only.{'\n'}
          • We strive to provide accurate information but don't guarantee completeness.{'\n'}
          • Content may be updated periodically without notice.{'\n'}
          • Some content may be available only to premium users.
        </Text>
      </View>

      {/* Privacy */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>5. Privacy Policy</Text>
        <Text style={styles.paragraph}>
          Your privacy is important to us. Our Privacy Policy explains how we collect,
          use, and protect your personal information. By using Blink Exam, you agree
          to our Privacy Policy.
        </Text>
      </View>

      {/* Payments */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>6. Payments and Subscriptions</Text>
        <Text style={styles.paragraph}>
          • Premium features require payment{'\n'}
          • All payments are processed through secure third-party services{'\n'}
          • Subscriptions renew automatically unless canceled{'\n'}
          • Refunds are subject to our refund policy{'\n'}
          • Prices may change with notice
        </Text>
      </View>

      {/* Intellectual Property */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>7. Intellectual Property</Text>
        <Text style={styles.paragraph}>
          Blink Exam and its original content, features, and functionality are owned
          by Blink Exam and are protected by international copyright, trademark,
          patent, trade secret, and other intellectual property laws.
        </Text>
      </View>

      {/* Termination */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>8. Termination</Text>
        <Text style={styles.paragraph}>
          We may terminate or suspend your account immediately, without prior notice,
          for conduct that we believe violates these Terms or is harmful to other users,
          us, or third parties, or for any other reason.
        </Text>
      </View>

      {/* Disclaimer */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>9. Disclaimer</Text>
        <Text style={styles.paragraph}>
          Blink Exam is provided "as is" without any warranties. We don't guarantee
          that the app will be error-free or uninterrupted. Exam results and scores
          are for practice purposes only.
        </Text>
      </View>

      {/* Limitation of Liability */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>10. Limitation of Liability</Text>
        <Text style={styles.paragraph}>
          To the maximum extent permitted by law, Blink Exam shall not be liable for
          any indirect, incidental, special, consequential, or punitive damages resulting
          from your use of the app.
        </Text>
      </View>

      {/* Changes to Terms */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>11. Changes to Terms</Text>
        <Text style={styles.paragraph}>
          We reserve the right to modify these terms at any time. We will notify users
          of significant changes. Continued use of the app after changes constitutes
          acceptance of the new terms.
        </Text>
      </View>

      {/* Contact */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>12. Contact Us</Text>
        <Text style={styles.paragraph}>
          If you have any questions about these Terms, please contact us:{'\n'}
          • Email: support@blinkexam.com{'\n'}
          • Website: www.blinkexam.com{'\n'}
          • Address: 123 Education Street, Learning City
        </Text>
      </View>

      {/* Acceptance */}
      <View style={styles.acceptanceContainer}>
        <Text style={styles.acceptanceText}>
          By using Blink Exam, you acknowledge that you have read, understood,
          and agree to be bound by these Terms and Conditions.
        </Text>
      </View>

      {/* Footer Space */}
      <View style={styles.footerSpace} />
    </ScrollContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    ...GlobalStyles.textSemiBold18,
    color: COLOR.dark,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  appTitleContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  appName: {
    ...GlobalStyles.textBold30, // closest to 28
    color: COLOR.primary,
    marginBottom: 4,
  },
  appTagline: {
    ...GlobalStyles.textRegular14,
    color: '#6B7280',
  },
  lastUpdated: {
    ...GlobalStyles.textMedium12,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...GlobalStyles.textSemiBold16,
    color: COLOR.dark,
    marginBottom: 8,
  },
  paragraph: {
    ...GlobalStyles.textRegular14,
    color: '#4B5563',
    lineHeight: 22,
  },
  acceptanceContainer: {
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 12,
    marginTop: 24,
    marginBottom: 16,
  },
  acceptanceText: {
    ...GlobalStyles.textMedium14,
    color: COLOR.dark,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  footerSpace: {
    height: 20,
  },
  buttonContainer: {
    backgroundColor: COLOR.white,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  acceptButton: {
    backgroundColor: COLOR.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptButtonText: {
    ...GlobalStyles.textSemiBold16,
    color: COLOR.white,
  },
});

export default TermsAndConditionsScreen;