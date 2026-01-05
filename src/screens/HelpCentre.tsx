import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    LayoutAnimation,
    Platform,
    UIManager,
    Linking
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { COLOR, FONTS, FONT_SIZE, SIZE } from "@utils/Constant";
import { useNavigation } from "@react-navigation/native";
import { ScrollContainer } from "@components/common/ScrollContainer";
import { GlobalStyles } from '@styles/GlobalCss';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

const HelpCentreScreen = () => {
    const navigation = useNavigation();
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const toggleExpand = (id: number) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedId(expandedId === id ? null : id);
    };

    const faqs = [
        {
            id: 1,
            question: "How do I reset my password?",
            answer: "Go to the login screen and click on 'Forgot Password'. Follow the instructions sent to your email to reset your password."
        },
        {
            id: 2,
            question: "How can I update my profile details?",
            answer: "Navigate to the Profile tab, then click on 'Profile' or 'Account'. You can edit your details by tapping the edit icon."
        },
        {
            id: 3,
            question: "Where can I find my purchase history?",
            answer: "Your purchase history is available in the 'Orders' section under the Profile tab."
        },
        {
            id: 4,
            question: "How do I contact customer support?",
            answer: "You can use the 'Contact Support' button at the bottom of this page or email us directly at support@swiposales.com."
        },
        {
            id: 5,
            question: "Is my payment information secure?",
            answer: "Yes, we use industry-standard encryption and secure payment gateways to ensure your data is safe."
        }
    ];

    const Header = () => (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Feather name="arrow-left" size={24} color={COLOR.dark} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Help Centre</Text>
            <View style={{ width: 24 }} />
        </View>
    );

    return (
        <ScrollContainer header={<Header />} scrollStyle={styles.scrollContent}>

            {/* SEARCH BAR PLACEHOLDER */}
            <View style={styles.searchContainer}>
                <Feather name="search" size={20} color={COLOR.darkGrey} style={styles.searchIcon} />
                <Text style={styles.searchText}>Search for help...</Text>
            </View>

            {/* FAQ SECTION */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
            </View>

            <View style={styles.faqList}>
                {faqs.map((item) => (
                    <View key={item.id} style={styles.faqItem}>
                        <TouchableOpacity
                            style={styles.questionRow}
                            onPress={() => toggleExpand(item.id)}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.questionText}>{item.question}</Text>
                            <Feather
                                name={expandedId === item.id ? "chevron-up" : "chevron-down"}
                                size={20}
                                color={COLOR.darkGrey}
                            />
                        </TouchableOpacity>
                        {expandedId === item.id && (
                            <View style={styles.answerContainer}>
                                <Text style={styles.answerText}>{item.answer}</Text>
                            </View>
                        )}
                    </View>
                ))}
            </View>

            {/* CONTACT SUPPORT */}
            <View style={styles.contactSection}>
                <Text style={styles.sectionTitle}>Still need help?</Text>

                <TouchableOpacity style={styles.contactButton} onPress={() => Linking.openURL('mailto:support@swiposales.com')}>
                    <View style={styles.contactIconContainer}>
                        <MaterialIcons name="email" size={24} color={COLOR.primary} />
                    </View>
                    <View style={styles.contactTextContainer}>
                        <Text style={styles.contactTitle}>Email Support</Text>
                        <Text style={styles.contactSubtitle}>Get a response within 24 hours</Text>
                    </View>
                    <Feather name="chevron-right" size={20} color={COLOR.darkGrey} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.contactButton} onPress={() => { }}>
                    <View style={styles.contactIconContainer}>
                        <Feather name="message-circle" size={24} color={COLOR.primary} />
                    </View>
                    <View style={styles.contactTextContainer}>
                        <Text style={styles.contactTitle}>Live Chat</Text>
                        <Text style={styles.contactSubtitle}>Chat with our support team</Text>
                    </View>
                    <Feather name="chevron-right" size={20} color={COLOR.darkGrey} />
                </TouchableOpacity>
            </View>

        </ScrollContainer>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: SIZE.moderateScale(20),
        paddingVertical: SIZE.moderateScale(16),
        borderBottomWidth: 1,
        borderBottomColor: COLOR.grayLight,
        backgroundColor: COLOR.white,
    },
    backButton: {
        padding: SIZE.moderateScale(4),
    },
    headerTitle: {
        ...GlobalStyles.textSemiBold18,
        color: COLOR.dark,
    },
    scrollContent: {
        paddingBottom: SIZE.moderateScale(40),
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        marginHorizontal: SIZE.moderateScale(20),
        marginTop: SIZE.moderateScale(20),
        paddingHorizontal: SIZE.moderateScale(16),
        height: SIZE.moderateScale(48),
        borderRadius: SIZE.moderateScale(12),
    },
    searchIcon: {
        marginRight: SIZE.moderateScale(12),
    },
    searchText: {
        ...GlobalStyles.textRegular14,
        color: COLOR.darkGrey,
    },
    sectionHeader: {
        marginTop: SIZE.moderateScale(24),
        paddingHorizontal: SIZE.moderateScale(20),
        marginBottom: SIZE.moderateScale(12),
    },
    sectionTitle: {
        ...GlobalStyles.textSemiBold16,
        color: COLOR.dark,
    },
    faqList: {
        paddingHorizontal: SIZE.moderateScale(20),
    },
    faqItem: {
        backgroundColor: COLOR.white,
        borderRadius: SIZE.moderateScale(12),
        borderWidth: 1,
        borderColor: COLOR.grayLight,
        marginBottom: SIZE.moderateScale(12),
        overflow: 'hidden',
    },
    questionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SIZE.moderateScale(16),
    },
    questionText: {
        ...GlobalStyles.textMedium14,
        color: COLOR.dark,
        flex: 1,
        marginRight: SIZE.moderateScale(10),
    },
    answerContainer: {
        paddingHorizontal: SIZE.moderateScale(16),
        paddingBottom: SIZE.moderateScale(16),
        backgroundColor: '#F9FAFB',
        borderTopWidth: 1,
        borderTopColor: COLOR.grayLight,
    },
    answerText: {
        ...GlobalStyles.textRegular13,
        color: COLOR.darkGrey,
        lineHeight: SIZE.moderateScale(20),
        marginTop: SIZE.moderateScale(10),
    },
    contactSection: {
        marginTop: SIZE.moderateScale(20),
        paddingHorizontal: SIZE.moderateScale(20),
    },
    contactButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLOR.white,
        padding: SIZE.moderateScale(16),
        borderRadius: SIZE.moderateScale(12),
        borderWidth: 1,
        borderColor: COLOR.grayLight,
        marginBottom: SIZE.moderateScale(12),
    },
    contactIconContainer: {
        width: SIZE.moderateScale(48),
        height: SIZE.moderateScale(48),
        borderRadius: SIZE.moderateScale(24),
        backgroundColor: '#EFF6FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SIZE.moderateScale(16),
    },
    contactTextContainer: {
        flex: 1,
    },
    contactTitle: {
        ...GlobalStyles.textSemiBold14,
        color: COLOR.dark,
    },
    contactSubtitle: {
        ...GlobalStyles.textRegular12,
        color: COLOR.darkGrey,
        marginTop: SIZE.moderateScale(2),
    },
});

export default HelpCentreScreen;
