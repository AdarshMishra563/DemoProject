import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,

  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { COLOR, FONTS, FONT_SIZE } from '@utils/Constant';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollContainer } from '@components/common/ScrollContainer';

const PrivacyPolicyScreen2 = () => {
  const navigation = useNavigation();

  const handleEmailPress = () => {
    Linking.openURL('mailto:privacy@blinkexam.com');
  };

  const handleWebsitePress = () => {
    Linking.openURL('https://www.blinkexam.com/privacy');
  };
  const insets = useSafeAreaInsets()
  return (
    <ScrollContainer
      header={
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color={COLOR.dark} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Privacy Policy</Text>
          <View style={{ width: 24 }} />
        </View>
      }
      scrollStyle={{ flexGrow: 1, paddingHorizontal: 20, paddingBottom: 120 }}
      footer={
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.acceptButtonText}>I Understand</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.exportButton}
            onPress={() => {
              // Function to export/download privacy policy
              alert('Privacy Policy export feature coming soon');
            }}
          >
            <Icon name="download" size={18} color={COLOR.primary} />
            <Text style={styles.exportButtonText}>Export PDF</Text>
          </TouchableOpacity>
        </View>
      }
    >
      {/* App Title */}
      <View style={styles.appTitleContainer}>
        <Text style={styles.appName}>Blink Exam</Text>
        <Text style={styles.appTagline}>Your Privacy Matters</Text>
      </View>

      {/* Last Updated */}
      <Text style={styles.lastUpdated}>Effective Date: December 15, 2024</Text>

      {/* Introduction */}
      <View style={styles.section}>
        <Text style={styles.paragraph}>
          At Blink Exam, we are committed to protecting your privacy. This Privacy Policy
          explains how we collect, use, disclose, and safeguard your information when you
          use our mobile application.
        </Text>
        <Text style={styles.paragraph}>
          Please read this policy carefully. By using Blink Exam, you agree to the
          collection and use of information in accordance with this policy.
        </Text>
      </View>

      {/* Information We Collect */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Information We Collect</Text>

        <Text style={styles.subsectionTitle}>Personal Information</Text>
        <Text style={styles.paragraph}>
          When you register for an account, we may collect:{'\n'}
          • Full name{'\n'}
          • Email address{'\n'}
          • Phone number (optional){'\n'}
          • Date of birth (for age verification){'\n'}
          • Profile picture (optional)
        </Text>

        <Text style={styles.subsectionTitle}>Usage Information</Text>
        <Text style={styles.paragraph}>
          We automatically collect information about your interaction with our app:{'\n'}
          • Exam attempts and scores{'\n'}
          • Study time and progress{'\n'}
          • Features used{'\n'}
          • Device information (model, OS version){'\n'}
          • IP address and location data
        </Text>

        <Text style={styles.subsectionTitle}>Payment Information</Text>
        <Text style={styles.paragraph}>
          For premium subscriptions, payment processing is handled by secure third-party
          services. We do not store your credit card details on our servers.
        </Text>
      </View>

      {/* How We Use Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
        <Text style={styles.paragraph}>
          We use the collected information to:{'\n'}
          • Provide and maintain our services{'\n'}
          • Personalize your learning experience{'\n'}
          • Track your progress and performance{'\n'}
          • Send important notifications and updates{'\n'}
          • Process payments for premium features{'\n'}
          • Improve and optimize our app{'\n'}
          • Respond to your inquiries and support requests{'\n'}
          • Detect and prevent fraud and abuse
        </Text>
      </View>

      {/* Data Sharing */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Data Sharing and Disclosure</Text>
        <Text style={styles.paragraph}>
          We do not sell your personal information. We may share information with:{'\n'}
          • Service providers (hosting, analytics, payment processing){'\n'}
          • Legal authorities when required by law{'\n'}
          • Third parties during business transfers (mergers, acquisitions){'\n'}
          • With your explicit consent
        </Text>
      </View>

      {/* Data Security */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Data Security</Text>
        <Text style={styles.paragraph}>
          We implement appropriate security measures to protect your personal information:{'\n'}
          • Encryption of data in transit and at rest{'\n'}
          • Regular security audits{'\n'}
          • Access controls and authentication{'\n'}
          • Secure server infrastructure
        </Text>
        <Text style={styles.note}>
          Note: While we strive to protect your information, no method of transmission
          over the Internet or electronic storage is 100% secure.
        </Text>
      </View>

      {/* Data Retention */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>5. Data Retention</Text>
        <Text style={styles.paragraph}>
          We retain your personal information only for as long as necessary:{'\n'}
          • Account data: Until you request deletion{'\n'}
          • Usage data: Up to 2 years for analytics{'\n'}
          • Payment records: As required by law (typically 7 years){'\n'}
          • Inactive accounts: Deleted after 2 years of inactivity
        </Text>
      </View>

      {/* Your Rights */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>6. Your Privacy Rights</Text>
        <Text style={styles.paragraph}>
          Depending on your location, you may have the right to:{'\n'}
          • Access your personal information{'\n'}
          • Correct inaccurate data{'\n'}
          • Request deletion of your data{'\n'}
          • Object to processing of your data{'\n'}
          • Data portability{'\n'}
          • Withdraw consent at any time
        </Text>
        <Text style={styles.paragraph}>
          To exercise these rights, contact us at{' '}
          <Text style={styles.link} onPress={handleEmailPress}>
            privacy@blinkexam.com
          </Text>
        </Text>
      </View>

      {/* Children's Privacy */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>7. Children's Privacy</Text>
        <Text style={styles.paragraph}>
          Blink Exam is not intended for children under 13. We do not knowingly collect
          personal information from children under 13. If you are a parent or guardian
          and believe your child has provided us with personal information, please
          contact us immediately.
        </Text>
      </View>

      {/* Third-Party Links */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>8. Third-Party Links</Text>
        <Text style={styles.paragraph}>
          Our app may contain links to third-party websites or services. We are not
          responsible for the privacy practices or content of these third parties.
          Please review their privacy policies before providing any information.
        </Text>
      </View>

      {/* Cookies and Tracking */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>9. Cookies and Tracking Technologies</Text>
        <Text style={styles.paragraph}>
          We use cookies and similar tracking technologies to:{'\n'}
          • Remember your preferences{'\n'}
          • Analyze app usage{'\n'}
          • Improve performance{'\n'}
          • Deliver personalized content
        </Text>
        <Text style={styles.paragraph}>
          You can control cookies through your browser settings, but disabling them
          may affect app functionality.
        </Text>
      </View>

      {/* International Transfers */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>10. International Data Transfers</Text>
        <Text style={styles.paragraph}>
          Your information may be transferred to and processed in countries other than
          your own. We ensure appropriate safeguards are in place to protect your data
          during international transfers.
        </Text>
      </View>

      {/* Changes to Policy */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>11. Changes to This Policy</Text>
        <Text style={styles.paragraph}>
          We may update this Privacy Policy periodically. We will notify you of any
          material changes by:{'\n'}
          • Posting the new policy in the app{'\n'}
          • Sending an email notification{'\n'}
          • Displaying a notice in the app
        </Text>
        <Text style={styles.paragraph}>
          Continued use of the app after changes constitutes acceptance of the updated policy.
        </Text>
      </View>

      {/* Contact Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>12. Contact Us</Text>
        <Text style={styles.paragraph}>
          If you have questions about this Privacy Policy, please contact us:{'\n'}
          • Email:{' '}
          <Text style={styles.link} onPress={handleEmailPress}>
            privacy@blinkexam.com
          </Text>{'\n'}
          • Website:{' '}
          <Text style={styles.link} onPress={handleWebsitePress}>
            www.blinkexam.com/privacy
          </Text>{'\n'}
          • Postal Address:{'\n'}  123 Privacy Street, Data City, DC 10001
        </Text>
      </View>

      {/* GDPR/CCPA Compliance */}
      <View style={styles.complianceContainer}>
        <Text style={styles.complianceTitle}>Compliance Statements</Text>
        <View style={styles.complianceBadge}>
          <Text style={styles.badgeText}>GDPR Compliant</Text>
        </View>
        <View style={styles.complianceBadge}>
          <Text style={styles.badgeText}>CCPA Ready</Text>
        </View>
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
    fontSize: FONT_SIZE.font18,
    fontFamily: FONTS.parkinsansSemiBold,
    color: COLOR.dark,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  appTitleContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  appName: {
    fontSize: FONT_SIZE.font28,
    fontFamily: FONTS.parkinsansBold,
    color: COLOR.primary,
    marginBottom: 4,
  },
  appTagline: {
    fontSize: FONT_SIZE.font14,
    fontFamily: FONTS.parkinsansRegular,
    color: '#6B7280',
  },
  lastUpdated: {
    fontSize: FONT_SIZE.font12,
    fontFamily: FONTS.parkinsansMedium,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 24,
    backgroundColor: '#F9FAFB',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.font16,
    fontFamily: FONTS.parkinsansSemiBold,
    color: COLOR.dark,
    marginBottom: 12,
  },
  subsectionTitle: {
    fontSize: FONT_SIZE.font14,
    fontFamily: FONTS.parkinsansSemiBold,
    color: '#374151',
    marginTop: 12,
    marginBottom: 6,
  },
  paragraph: {
    fontSize: FONT_SIZE.font14,
    fontFamily: FONTS.parkinsansRegular,
    color: '#4B5563',
    lineHeight: 22,
    marginBottom: 8,
  },
  note: {
    fontSize: FONT_SIZE.font13,
    fontFamily: FONTS.parkinsansMedium,
    color: '#6B7280',
    fontStyle: 'italic',
    backgroundColor: '#FEF3C7',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  link: {
    color: COLOR.primary,
    fontFamily: FONTS.parkinsansSemiBold,
    textDecorationLine: 'underline',
  },
  complianceContainer: {
    backgroundColor: '#F9FAFB',
    padding: 20,
    borderRadius: 12,
    marginTop: 24,
    marginBottom: 16,
    alignItems: 'center',
  },
  complianceTitle: {
    fontSize: FONT_SIZE.font14,
    fontFamily: FONTS.parkinsansSemiBold,
    color: COLOR.dark,
    marginBottom: 12,
  },
  complianceBadge: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: '#0EA5E9',
  },
  badgeText: {
    fontSize: FONT_SIZE.font12,
    fontFamily: FONTS.parkinsansSemiBold,
    color: '#0369A1',
  },
  footerSpace: {
    height: 20,
  },
  buttonContainer: {
    backgroundColor: COLOR.white,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    flexDirection: 'row',
    gap: 12,
  },
  acceptButton: {
    backgroundColor: COLOR.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 3,
  },
  acceptButtonText: {
    fontSize: FONT_SIZE.font16,
    fontFamily: FONTS.parkinsansSemiBold,
    color: COLOR.white,
  },
  exportButton: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2,
    flexDirection: 'row',
    gap: 6,
  },
  exportButtonText: {
    fontSize: FONT_SIZE.font14,
    fontFamily: FONTS.parkinsansSemiBold,
    color: COLOR.primary,
  },
});

export default PrivacyPolicyScreen2;