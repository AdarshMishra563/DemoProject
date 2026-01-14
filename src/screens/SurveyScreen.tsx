import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Modal,
    Dimensions,
    ScrollView,
    Alert,
    Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import { COLOR, FONTS, FONT_SIZE, SIZE } from '@utils/Constant';
import { GlobalStyles } from '@styles/GlobalCss';
import { ScrollContainer } from '@components/common/ScrollContainer';

const { width } = Dimensions.get('window');

// Mock Data
const QUESTIONS = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    question: (i === 2)
        ? `Question ${i + 1}: This is a very long question to test vertical scrolling.\n\n` +
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ` +
        `Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\n` +
        `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ` +
        `Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\n` +
        `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, ` +
        `eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.\n\n` +
        `Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.\n\n` +
        `Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.`
        : `Question ${i + 1}: What is the correct answer to this question?`,
    options: [
        { id: 'A', text: 'Option A' },
        { id: 'B', text: 'Option B' },
        { id: 'C', text: 'Option C' },
        { id: 'D', text: 'Option D' },
    ],
}));

const LANGUAGES = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Spanish' },
    { code: 'fr', label: 'French' },
];

const SurveyScreen = ({ navigation }: any) => {
    const insets = useSafeAreaInsets();
    const flatListRef = useRef<FlatList>(null);

    // State
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [markedForReview, setMarkedForReview] = useState<number[]>([]);
    const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
    const [language, setLanguage] = useState('en');
    const [isMainLangDropdownOpen, setIsMainLangDropdownOpen] = useState(false);
    const [isIntroLangDropdownOpen, setIsIntroLangDropdownOpen] = useState(false);
    const [isQuestionListVisible, setIsQuestionListVisible] = useState(false);
    const slideAnim = useRef(new Animated.Value(width)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const navListRef = useRef<FlatList>(null);

    useEffect(() => {
        if (navListRef.current) {
            navListRef.current.scrollToIndex({
                index: currentIndex,
                animated: true,
                viewPosition: 0.5,
            });
        }
    }, [currentIndex]);

    useEffect(() => {
        if (isQuestionListVisible) {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            // Reset is handled in close function or initial state
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: width,
                    duration: 0, // Reset instantly if invisible
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [isQuestionListVisible]);

    const closeQuestionModal = () => {
        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: width,
                duration: 250,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setIsQuestionListVisible(false);
        });
    };
    const [isIntroModalVisible, setIsIntroModalVisible] = useState(true);

    // Timer Logic
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    // Actions
    const handleOptionSelect = (questionId: number, optionId: string) => {
        setAnswers({ ...answers, [questionId]: optionId });
    };

    const handleNext = () => {
        if (currentIndex < QUESTIONS.length - 1) {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex);
            flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        }
    };

    const handleClearResponse = () => {
        const newAnswers = { ...answers };
        delete newAnswers[QUESTIONS[currentIndex].id];
        setAnswers(newAnswers);
    };

    const handleMarkReviewAndNext = () => {
        const currentId = QUESTIONS[currentIndex].id;
        if (!markedForReview.includes(currentId)) {
            setMarkedForReview([...markedForReview, currentId]);
        }
        handleNext();
    };

    const handleSaveAndNext = () => {
        handleNext();
    };

    const handleSubmitSurvey = () => {
        setIsQuestionListVisible(false);
        Alert.alert(
            'Submit Survey',
            'Are you sure you want to submit?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Submit',
                    onPress: () => navigation.navigate('SurveyResultScreen')
                }
            ]
        );
    };

    const jumpToQuestion = (index: number) => {
        setCurrentIndex(index);
        flatListRef.current?.scrollToIndex({ index, animated: false });
        setIsQuestionListVisible(false);
    };

    const getQuestionStatus = (id: number) => {
        if (markedForReview.includes(id)) return 'review';
        if (answers[id]) return 'answered';
        return 'not_attempted';
    };

    const renderQuestionItem = ({ item, index }: { item: any, index: number }) => {
        return (
            <ScrollView
                style={{ width: width - SIZE.moderateScale(40), height: Dimensions.get('window').height * 0.62, }}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
            >
                <Text style={styles.questionText}>{item.question}</Text>
                <View style={styles.optionsContainer}>
                    {item.options.map((opt: any) => {
                        const isSelected = answers[item.id] === opt.id;
                        return (
                            <TouchableOpacity
                                key={opt.id}
                                style={[
                                    styles.optionCard,
                                    isSelected && styles.optionCardSelected,
                                ]}
                                onPress={() => handleOptionSelect(item.id, opt.id)}
                                activeOpacity={0.8}
                            >
                                <View style={[styles.optionCircle, isSelected && styles.optionCircleSelected]}>
                                    <Text style={[styles.optionCircleText, isSelected && styles.optionCircleTextSelected]}>
                                        {opt.id}
                                    </Text>
                                </View>
                                <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                                    {opt.text}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>
        );
    };

    // ... existing functions ...

    return (
        <ScrollContainer
            header={
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerLeft}>
                        <Feather name="arrow-left" size={24} color={COLOR.dark} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Survey</Text>
                    <View style={styles.headerRight}>
                        <TouchableOpacity
                            style={styles.langTriggerHeader}
                            onPress={() => setIsMainLangDropdownOpen(!isMainLangDropdownOpen)}
                        >
                            <Feather name="globe" size={20} color={COLOR.dark} />
                            <Text style={styles.langCodeHeader}>{language.toUpperCase()}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
            footer={
                <View style={styles.bottomBar}>
                    <TouchableOpacity
                        style={styles.bottomBtnOutline}
                        onPress={handleMarkReviewAndNext}
                    >
                        <Text style={styles.bottomBtnTextOutline}>Mark for Review & Next</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.bottomBtnOutline}
                        onPress={handleClearResponse}
                    >
                        <Text style={styles.bottomBtnTextOutline}>Clear Response</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.bottomBtnPrimary}
                        onPress={handleSaveAndNext}
                    >
                        <Text style={styles.bottomBtnTextPrimary}>Save & Next</Text>
                    </TouchableOpacity>
                </View>
            }
        >
            <View style={styles.container}>
                {/* Language Dropdown Overlay */}
                {isMainLangDropdownOpen && (
                    <View style={styles.langDropdownMenuHeader}>
                        {LANGUAGES.map(lang => (
                            <TouchableOpacity
                                key={lang.code}
                                style={[
                                    styles.langOption,
                                    language === lang.code && styles.langOptionActive
                                ]}
                                onPress={() => {
                                    setLanguage(lang.code);
                                    setIsMainLangDropdownOpen(false);
                                }}
                            >
                                <Text style={[
                                    styles.langOptionText,
                                    language === lang.code && styles.langOptionTextActive
                                ]}>{lang.label}</Text>
                                {language === lang.code && <Feather name="check" size={16} color={COLOR.primary} />}
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                {/* Exam Info Bar */}
                <View style={styles.examInfoBar}>
                    <View style={styles.sectionInfo}>
                        <Text style={styles.sectionText}>Section 1</Text>
                        <View style={styles.dividerVertical} />
                        <View style={styles.timerBox}>
                            <Feather name="clock" size={14} color={COLOR.white} style={{ marginRight: SIZE.moderateScale(4) }} />
                            <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
                        </View>
                    </View>

                    <TouchableOpacity onPress={() => setIsQuestionListVisible(true)} style={styles.gridButton}>
                        <Feather name="grid" size={20} color={COLOR.white} />
                    </TouchableOpacity>
                </View>

                {/* Horizontal Question Navigator */}
                <View style={styles.navigatorContainer}>
                    <FlatList
                        ref={navListRef}
                        data={QUESTIONS}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={styles.navigatorContent}
                        renderItem={({ item, index }) => {
                            const isActive = index === currentIndex;
                            const isAnswered = answers[item.id];
                            const isReview = markedForReview.includes(item.id);

                            // Base style logic can be extended if needed, currently keeping it simple as per request
                            // "active number of question o screen"

                            return (
                                <TouchableOpacity
                                    style={styles.navItem}
                                    onPress={() => jumpToQuestion(index)}
                                >
                                    <View style={[
                                        styles.navCircle,
                                        isActive && styles.navCircleActive
                                    ]}>
                                        <Text style={[
                                            styles.navText,
                                            isActive && styles.navTextActive
                                        ]}>{index + 1}</Text>
                                    </View>

                                    {isActive && <View style={styles.activeTabIndicator} />}
                                </TouchableOpacity>
                            );
                        }}
                    />
                </View>

                {/* Question Area */}
                <View style={styles.contentArea}>
                    <FlatList
                        ref={flatListRef}
                        data={QUESTIONS}
                        renderItem={renderQuestionItem}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal
                        pagingEnabled
                        scrollEnabled={false} // Disable touch scrolling
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: SIZE.moderateScale(0) }}
                        getItemLayout={(data, index) => ({
                            length: width - SIZE.moderateScale(40),
                            offset: (width - SIZE.moderateScale(40)) * index,
                            index,
                        })}
                    />
                </View>



                {/* Question List Modal */}
                <Modal
                    visible={isQuestionListVisible}
                    animationType="none"
                    transparent={true}
                    onRequestClose={closeQuestionModal}
                >
                    <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
                        <TouchableOpacity style={{ flex: 1 }} onPress={closeQuestionModal} activeOpacity={1} />
                        <Animated.View style={[
                            styles.modalContent,
                            { transform: [{ translateX: slideAnim }] }
                        ]}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>Questions</Text>
                                <TouchableOpacity onPress={closeQuestionModal}>
                                    <Feather name="x" size={24} color={COLOR.dark} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.modalLegend}>
                                <View style={styles.legendItem}>
                                    <View style={[styles.legendBox, styles.statusAnswered]} />
                                    <Text style={styles.legendText}>Answered</Text>
                                </View>
                                <View style={styles.legendItem}>
                                    <View style={[styles.legendBox, styles.statusReview]} />
                                    <Text style={styles.legendText}>Marked for Review</Text>
                                </View>
                                <View style={styles.legendItem}>
                                    <View style={[styles.legendBox, styles.statusNotAttempted]} />
                                    <Text style={styles.legendText}>Not Attempted</Text>
                                </View>
                            </View>

                            <FlatList
                                data={QUESTIONS}
                                numColumns={7}
                                keyExtractor={(item) => item.id.toString()}
                                contentContainerStyle={styles.gridContainer}
                                renderItem={({ item, index }) => {
                                    const status = getQuestionStatus(item.id);
                                    let bgStyle = styles.statusNotAttempted;
                                    let textStyle = styles.gridTextNormal;

                                    if (status === 'answered') {
                                        bgStyle = styles.statusAnswered;
                                        textStyle = styles.gridTextWhite;
                                    } else if (status === 'review') {
                                        bgStyle = styles.statusReview;
                                        textStyle = styles.gridTextWhite;
                                    }

                                    const activeStyle = index === currentIndex ? { borderColor: COLOR.primary, borderWidth: 2 } : {};

                                    return (
                                        <TouchableOpacity
                                            style={[styles.gridItem, bgStyle, activeStyle]}
                                            onPress={() => {
                                                jumpToQuestion(index);
                                                closeQuestionModal();
                                            }}
                                        >
                                            <Text style={textStyle}>{item.id}</Text>
                                        </TouchableOpacity>
                                    );
                                }}
                            />

                            <View style={styles.modalFooter}>
                                <Text style={styles.footerStatsText}>
                                    Review: <Text style={{ fontFamily: FONTS.parkinsansBold, color: COLOR.warning }}>{markedForReview.length}</Text>
                                </Text>
                                <Text style={styles.footerStatsText}>
                                    Saved: <Text style={{ fontFamily: FONTS.parkinsansBold, color: COLOR.primary }}>{Object.keys(answers).length}/{QUESTIONS.length}</Text>
                                </Text>
                                <TouchableOpacity
                                    style={styles.modalSubmitBtn}
                                    onPress={handleSubmitSurvey}
                                >
                                    <Text style={styles.modalSubmitText}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                    </Animated.View>
                </Modal>

                {/* Introduction Modal */}
                <Modal
                    visible={isIntroModalVisible}
                    animationType="fade"
                    transparent={true}
                    onRequestClose={() => navigation.goBack()}
                >
                    <View style={styles.introModalOverlay}>
                        <View style={styles.introModalContent}>
                            <View style={styles.introHeader}>
                                <Text style={styles.introTitle}>Survey Instructions</Text>
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <Feather name="x" size={24} color={COLOR.dark} />
                                </TouchableOpacity>
                            </View>

                            <ScrollView style={styles.introDescScroll}>
                                <Text style={styles.introDescription}>
                                    Welcome to the survey! Please read the instructions carefully before proceeding.{'\n\n'}
                                    This survey consists of 30 questions designed to gather your feedback. You have 30 minutes to complete the survey.{'\n\n'}
                                    You can mark questions for review if you are unsure and come back to them later. Your progress is saved locally as you go.{'\n\n'}
                                    Please ensure you select the correct language below before starting.{'\n\n'}
                                    Good luck!
                                </Text>
                            </ScrollView>

                            <View style={styles.introFooter}>
                                <View style={styles.introLangContainer}>
                                    <Text style={styles.langLabel}>Select Language:</Text>
                                    <TouchableOpacity
                                        style={styles.introLangDropdownTrigger}
                                        onPress={() => setIsIntroLangDropdownOpen(!isIntroLangDropdownOpen)}
                                    >
                                        <Text style={styles.currentLang}>
                                            {LANGUAGES.find(l => l.code === language)?.label || 'English'}
                                        </Text>
                                        <Feather name="chevron-down" size={16} color={COLOR.dark} />
                                    </TouchableOpacity>
                                    {/* Reusing the same simple dropdown logic if needed, or simple placeholder for now since state is shared */}
                                    {isIntroLangDropdownOpen && (
                                        <View style={[styles.langDropdownMenu, { top: SIZE.moderateScale(45), left: 0, width: '100%' }]}>
                                            {LANGUAGES.map(lang => (
                                                <TouchableOpacity
                                                    key={lang.code}
                                                    style={[
                                                        styles.langOption,
                                                        language === lang.code && styles.langOptionActive
                                                    ]}
                                                    onPress={() => {
                                                        setLanguage(lang.code);
                                                        setIsIntroLangDropdownOpen(false);
                                                    }}
                                                >
                                                    <Text style={[
                                                        styles.langOptionText,
                                                        language === lang.code && styles.langOptionTextActive
                                                    ]}>{lang.label}</Text>
                                                    {language === lang.code && <Feather name="check" size={16} color={COLOR.primary} />}
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    )}
                                </View>

                                <TouchableOpacity
                                    style={styles.introContinueBtn}
                                    onPress={() => setIsIntroModalVisible(false)}
                                >
                                    <Text style={styles.introContinueText}>Continue</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

            </View >
        </ScrollContainer >
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.white,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: SIZE.moderateScale(12),
        paddingHorizontal: SIZE.moderateScale(20),
        borderBottomWidth: 1,
        borderBottomColor: COLOR.grayLight,
        backgroundColor: COLOR.white,
    },
    headerLeft: {
        width: 40,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    langTriggerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SIZE.moderateScale(4),
    },
    langCodeHeader: {
        ...GlobalStyles.textSemiBold14,
        color: COLOR.dark,
        marginLeft: SIZE.moderateScale(4),
    },
    langDropdownMenuHeader: {
        position: 'absolute',
        top: SIZE.moderateScale(10),
        right: SIZE.moderateScale(20),
        backgroundColor: COLOR.white,
        borderRadius: SIZE.moderateScale(8),
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        padding: SIZE.moderateScale(4),
        width: SIZE.moderateScale(120),
        zIndex: 100,
    },
    langLabel: {
        ...GlobalStyles.textRegular12,
        color: COLOR.dark,
        marginBottom: SIZE.moderateScale(5),
    },
    headerTitle: {
        ...GlobalStyles.textBold18,
        color: COLOR.dark,
    },
    topSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SIZE.moderateScale(20),
        paddingVertical: SIZE.moderateScale(12),
        backgroundColor: COLOR.white,
    },
    examInfoBar: {
        backgroundColor: COLOR.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SIZE.moderateScale(20),
        paddingVertical: SIZE.moderateScale(12),
        elevation: 2,
    },
    sectionInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sectionText: {
        ...GlobalStyles.textSemiBold14,
        color: COLOR.white,
    },
    dividerVertical: {
        width: 1,
        height: SIZE.moderateScale(16),
        backgroundColor: 'rgba(255,255,255,0.3)',
        marginHorizontal: SIZE.moderateScale(12),
    },
    timerBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: SIZE.moderateScale(8),
        paddingVertical: SIZE.moderateScale(4),
        borderRadius: SIZE.moderateScale(4),
    },
    timerText: {
        ...GlobalStyles.textSemiBold14,
        color: COLOR.white,
    },
    gridButton: {
        padding: SIZE.moderateScale(4),
    },
    navigatorContainer: {
        backgroundColor: COLOR.white,
        borderBottomWidth: 1,
        borderBottomColor: COLOR.grayLight,
    },
    navigatorContent: {
        paddingHorizontal: SIZE.moderateScale(10),
        paddingVertical: SIZE.moderateScale(10),
        gap: SIZE.moderateScale(15),
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
        width: SIZE.moderateScale(40),
        height: SIZE.moderateScale(50),
    },
    navCircle: {
        width: SIZE.moderateScale(32),
        height: SIZE.moderateScale(32),
        borderRadius: SIZE.moderateScale(16),
        backgroundColor: COLOR.lightGray,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navCircleActive: {
        backgroundColor: COLOR.primaryLight,
    },
    navText: {
        ...GlobalStyles.textMedium14,
        color: COLOR.darkGrey,
    },
    navTextActive: {
        color: COLOR.primary,
        fontFamily: FONTS.parkinsansBold,
    },
    activeTabIndicator: {
        position: 'absolute',
        bottom: -SIZE.moderateScale(10), // Attach to container bottom/divider
        width: '100%',
        height: SIZE.moderateScale(3),
        backgroundColor: COLOR.primary,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
    },
    currentLang: {
        ...GlobalStyles.textMedium12,
        color: COLOR.dark,
    },
    langDropdownMenu: {
        position: 'absolute',
        top: SIZE.moderateScale(40),
        left: SIZE.moderateScale(60),
        backgroundColor: COLOR.white,
        borderRadius: SIZE.moderateScale(4),
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        padding: SIZE.moderateScale(4),
        width: SIZE.moderateScale(120),
    },
    langOption: {
        paddingVertical: SIZE.moderateScale(8),
        paddingHorizontal: SIZE.moderateScale(8),
        borderRadius: SIZE.moderateScale(2),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    langOptionActive: {
        backgroundColor: COLOR.primaryLight,
        borderWidth: 1,
        borderColor: COLOR.primary,
    },
    langOptionText: {
        ...GlobalStyles.textRegular12,
        color: COLOR.dark,
    },
    langOptionTextActive: {
        color: COLOR.primary,
        fontFamily: FONTS.parkinsansSemiBold,
    },
    contentArea: {
        paddingVertical: SIZE.moderateScale(10),
        paddingHorizontal: SIZE.moderateScale(20),
    },
    questionText: {
        fontFamily: FONTS.parkinsansSemiBold, // Bolder font
        fontSize: FONT_SIZE.font14,
        color: COLOR.dark,
        marginBottom: SIZE.moderateScale(20),
        lineHeight: SIZE.moderateScale(22),
    },
    optionsContainer: {
        gap: SIZE.moderateScale(12),
        marginBottom: SIZE.moderateScale(60),
    },
    optionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SIZE.moderateScale(8),
        backgroundColor: COLOR.white,
        borderWidth: 1,
        borderColor: COLOR.grayLight,
        borderRadius: SIZE.moderateScale(8),
    },
    optionCardSelected: {
        borderColor: COLOR.primary,
        backgroundColor: COLOR.primaryLight200,
    },
    optionCircle: {
        height: SIZE.moderateScale(24),
        width: SIZE.moderateScale(24),
        borderRadius: SIZE.moderateScale(12),
        borderWidth: 1.5,
        borderColor: COLOR.darkGrey,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: SIZE.moderateScale(12),
        backgroundColor: COLOR.white,
    },
    optionCircleSelected: {
        borderColor: COLOR.primary,
        backgroundColor: COLOR.primary,
        borderWidth: 0,
    },
    optionCircleText: {
        ...GlobalStyles.textMedium14,
        color: COLOR.darkGrey,
    },
    optionCircleTextSelected: {
        color: COLOR.white,
        fontFamily: FONTS.parkinsansSemiBold,
    },
    optionText: {
        ...GlobalStyles.textRegular14,
        color: COLOR.dark,
        flex: 1,
    },
    optionTextSelected: {
        color: COLOR.primary,
        fontFamily: FONTS.parkinsansMedium,
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: SIZE.moderateScale(12),
        borderTopWidth: 1,
        borderTopColor: COLOR.grayLight,
        backgroundColor: COLOR.white,
        gap: SIZE.moderateScale(10),
    },
    bottomBtnOutline: {
        flex: 1,
        paddingVertical: SIZE.moderateScale(6),
        paddingHorizontal: SIZE.moderateScale(5),
        borderWidth: 1,
        borderColor: COLOR.walletGray,
        borderRadius: SIZE.moderateScale(8),
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomBtnPrimary: {
        flex: 1,
        paddingVertical: SIZE.moderateScale(6),
        paddingHorizontal: SIZE.moderateScale(5),
        backgroundColor: COLOR.primary,
        borderRadius: SIZE.moderateScale(8),
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomBtnTextOutline: {
        ...GlobalStyles.textMedium12,
        color: COLOR.dark,
        textAlign: 'center',
    },
    bottomBtnTextPrimary: {
        ...GlobalStyles.textMedium12,
        color: COLOR.white,
        textAlign: 'center',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: COLOR.white,
        width: '85%', // Drawer width
        height: '100%', // Full height for drawer feel
        position: 'absolute',
        right: 0,
        padding: SIZE.moderateScale(20),
        shadowColor: "#000",
        shadowOffset: {
            width: -2,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SIZE.moderateScale(20),
    },
    modalTitle: {
        ...GlobalStyles.textBold18,
        color: COLOR.dark,
    },
    modalLegend: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: SIZE.moderateScale(15),
        marginBottom: SIZE.moderateScale(20),
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    legendBox: {
        width: SIZE.moderateScale(16),
        height: SIZE.moderateScale(16),
        borderRadius: SIZE.moderateScale(4),
        marginRight: SIZE.moderateScale(6),
        borderWidth: 1,
    },
    legendText: {
        ...GlobalStyles.textRegular12,
        color: COLOR.dark,
    },
    gridContainer: {
        paddingBottom: SIZE.moderateScale(60), // Space for button
    },
    gridItem: {
        width: (width - SIZE.moderateScale(40 + 56)) / 7,
        height: (width - SIZE.moderateScale(40 + 56)) / 7,
        margin: SIZE.moderateScale(4),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SIZE.moderateScale(8),
        borderWidth: 1,
    },
    statusAnswered: {
        backgroundColor: COLOR.success,
        borderColor: COLOR.success,
    },
    statusReview: {
        backgroundColor: COLOR.warning,
        borderColor: COLOR.warning,
    },
    statusNotAttempted: {
        backgroundColor: COLOR.white,
        borderColor: COLOR.walletGray,
    },
    gridTextNormal: {
        ...GlobalStyles.textMedium14,
        color: COLOR.dark,
    },
    gridTextWhite: {
        ...GlobalStyles.textMedium14,
        color: COLOR.white,
    },
    modalFooter: {
        position: 'absolute',
        bottom: SIZE.moderateScale(20),
        right: SIZE.moderateScale(20),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: SIZE.moderateScale(15),
        backgroundColor: COLOR.white,
    },
    footerStatsText: {
        ...GlobalStyles.textMedium12,
        color: COLOR.dark,
    },
    modalSubmitBtn: {
        backgroundColor: COLOR.primary,
        paddingVertical: SIZE.moderateScale(8),
        paddingHorizontal: SIZE.moderateScale(20),
        borderRadius: SIZE.moderateScale(5),
        alignItems: 'center',
    },
    modalSubmitText: {
        ...GlobalStyles.textSemiBold14,
        color: COLOR.white,
        fontSize: FONT_SIZE.font14,
    },
    introModalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    introModalContent: {
        width: '85%',
        height: '85%',
        backgroundColor: COLOR.white,
        borderRadius: SIZE.moderateScale(15),
        padding: SIZE.moderateScale(20),
    },
    introHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: SIZE.moderateScale(15),
        borderBottomWidth: 1,
        borderBottomColor: COLOR.grayLight,
    },
    introTitle: {
        ...GlobalStyles.textBold18,
        color: COLOR.dark,
        fontSize: FONT_SIZE.font16,
    },
    introDescScroll: {
        flex: 1,
        marginVertical: SIZE.moderateScale(15),
    },
    introDescription: {
        ...GlobalStyles.textRegular14,
        color: COLOR.dark,
        lineHeight: 22,
    },
    introFooter: {
        marginTop: SIZE.moderateScale(10),
    },
    introLangContainer: {
        marginBottom: SIZE.moderateScale(20),
        zIndex: 20,
    },
    introContinueBtn: {
        backgroundColor: COLOR.primary,
        paddingVertical: SIZE.moderateScale(12),
        borderRadius: SIZE.moderateScale(8),
        alignItems: 'center',
    },
    introContinueText: {
        ...GlobalStyles.textBold18,
        color: COLOR.white,
        fontSize: FONT_SIZE.font16,
    },
    introLangDropdownTrigger: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLOR.white,
        paddingHorizontal: SIZE.moderateScale(15),
        paddingVertical: SIZE.moderateScale(10),
        borderRadius: SIZE.moderateScale(4),
        borderWidth: 1,
        borderColor: COLOR.grayLight,
        justifyContent: 'space-between',
        width: '100%',
    }
});

export default SurveyScreen;
