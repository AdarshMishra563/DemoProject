import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, Image } from 'react-native';
import { ScrollContainer } from '@components/common/ScrollContainer';
import { COLOR, FONTS, FONT_SIZE, SIZE } from '@utils/Constant';
import { GlobalStyles } from '@styles/GlobalCss';
import Feather from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');

const RELATED_SURVEYS = [
    { id: 1, title: 'Customer Feedback', questions: 10, time: '5m' },
    { id: 2, title: 'Product Review', questions: 15, time: '10m' },
    { id: 3, title: 'Service Satisfaction', questions: 8, time: '4m' },
    { id: 4, title: 'Employee Engagement', questions: 20, time: '15m' },
];

const SurveyResultScreen = ({ navigation }: any) => {

    const renderRelatedItem = ({ item }: { item: any }) => (
        <TouchableOpacity style={styles.relatedCard}>
            <View style={styles.relatedRow}>
                <View style={styles.relatedIconMsg}>
                    <Feather name="file-text" size={18} color={COLOR.primary} />
                </View>
                <View>
                    <Text style={styles.relatedTitle}>{item.title}</Text>
                    <View style={styles.relatedMeta}>
                        <Text style={styles.relatedMetaText}>{item.questions} Q</Text>
                        <View style={styles.dot} />
                        <Text style={styles.relatedMetaText}>{item.time}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <ScrollContainer
            header={
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerLeft}>
                        <Feather name="arrow-left" size={24} color={COLOR.dark} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Result</Text>
                    <View style={styles.headerRight} />
                </View>
            }
        >
            <View style={styles.container}>
                {/* Score Card Section */}
                <View style={styles.scoreCard}>
                    <View style={styles.resultHeader}>
                        <Text style={styles.resultTitle}>Survey Performance</Text>
                        <Text style={styles.resultDesc}>Overview of your detailed personalized performance statistics.</Text>
                    </View>

                    <View style={styles.statsList}>
                        <View style={styles.statRow}>
                            <View style={styles.statLabelContainer}>
                                <View style={[styles.iconBox, { backgroundColor: COLOR.primaryLight }]}>
                                    <Feather name="bar-chart-2" size={20} color={COLOR.primary} />
                                </View>
                                <Text style={styles.statLabelList}>Total Score</Text>
                            </View>
                            <Text style={styles.statValueList}>85/100</Text>
                        </View>

                        <View style={styles.statRow}>
                            <View style={styles.statLabelContainer}>
                                <View style={[styles.iconBox, { backgroundColor: COLOR.grayLight }]}>
                                    <Feather name="clock" size={20} color={COLOR.dark} />
                                </View>
                                <Text style={styles.statLabelList}>Time Taken</Text>
                            </View>
                            <Text style={styles.statValueList}>25:30</Text>
                        </View>

                        <View style={styles.statRow}>
                            <View style={styles.statLabelContainer}>
                                <View style={[styles.iconBox, { backgroundColor: COLOR.subscriptionSuccess }]}>
                                    <Feather name="check-circle" size={20} color={COLOR.success} />
                                </View>
                                <Text style={styles.statLabelList}>Right Answers</Text>
                            </View>
                            <Text style={[styles.statValueList, { color: COLOR.success }]}>22</Text>
                        </View>

                        <View style={styles.statRow}>
                            <View style={styles.statLabelContainer}>
                                <View style={[styles.iconBox, { backgroundColor: COLOR.subscriptionFailed }]}>
                                    <Feather name="x-circle" size={20} color={COLOR.error} />
                                </View>
                                <Text style={styles.statLabelList}>Wrong Answers</Text>
                            </View>
                            <Text style={[styles.statValueList, { color: COLOR.error }]}>8</Text>
                        </View>
                    </View>
                </View>


                {/* Actions */}
                <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.btnOutline} onPress={() => { }}>
                        <Feather name="book-open" size={20} color={COLOR.primary} style={{ marginRight: SIZE.moderateScale(8) }} />
                        <Text style={styles.btnTextOutline}>View Solution</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnPrimary} onPress={() => { }}>
                        <Feather name="award" size={20} color={COLOR.white} style={{ marginRight: SIZE.moderateScale(8) }} />
                        <Text style={styles.btnTextPrimary}>View Leaderboard</Text>
                    </TouchableOpacity>
                </View>

                {/* Related Surveys */}
                <View style={styles.relatedSection}>
                    <Text style={styles.sectionTitle}>Related Surveys</Text>
                    <FlatList
                        data={RELATED_SURVEYS}
                        renderItem={renderRelatedItem}
                        keyExtractor={item => item.id.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.relatedList}
                    />
                </View>

            </View >
        </ScrollContainer >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SIZE.moderateScale(20),
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
        width: 40,
    },
    headerTitle: {
        ...GlobalStyles.textBold18,
        color: COLOR.dark,
    },
    scoreCard: {
        backgroundColor: COLOR.white,
        borderRadius: SIZE.moderateScale(15),
        padding: SIZE.moderateScale(15),
        borderWidth: 1,
        borderColor: COLOR.grayLight,
        marginBottom: SIZE.moderateScale(20),
    },
    resultHeader: {
        marginBottom: SIZE.moderateScale(15),
    },
    resultTitle: {
        ...GlobalStyles.textBold14,
        color: COLOR.dark,
        marginBottom: SIZE.moderateScale(5),
    },
    resultDesc: {
        ...GlobalStyles.textRegular14,
        color: COLOR.darkGrey,
        lineHeight: 20,
    },
    scoreLabel: {
        ...GlobalStyles.textRegular14,
        color: COLOR.darkGrey,
        marginBottom: SIZE.moderateScale(5),
    },
    scoreValue: {
        fontFamily: FONTS.parkinsansBold,
        fontSize: SIZE.moderateScale(28),
        color: COLOR.dark,
        marginBottom: SIZE.moderateScale(8),
    },
    totalScore: {
        fontSize: FONT_SIZE.font16,
        color: COLOR.darkGrey,
        fontFamily: FONTS.parkinsansMedium,
    },
    statsList: {
        width: '100%',
        marginTop: SIZE.moderateScale(10),
    },
    statRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: SIZE.moderateScale(12),
        borderBottomWidth: 1,
        borderBottomColor: COLOR.grayLight,
    },
    statLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBox: {
        width: SIZE.moderateScale(36),
        height: SIZE.moderateScale(36),
        borderRadius: SIZE.moderateScale(8),
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: SIZE.moderateScale(12),
    },
    statLabelList: {
        ...GlobalStyles.textMedium14,
        color: COLOR.darkGrey,
    },
    statValueList: {
        ...GlobalStyles.textBold14,
        color: COLOR.dark,
        fontSize: FONT_SIZE.font14,
    },
    actionButtons: {
        marginBottom: SIZE.moderateScale(30),
        gap: SIZE.moderateScale(15),
    },
    btnOutline: {
        paddingVertical: SIZE.moderateScale(10),
        borderRadius: SIZE.moderateScale(10),
        borderWidth: 1,
        borderColor: COLOR.primary,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    btnPrimary: {
        paddingVertical: SIZE.moderateScale(10),
        borderRadius: SIZE.moderateScale(10),
        backgroundColor: COLOR.primary,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    btnTextOutline: {
        ...GlobalStyles.textSemiBold14,
        color: COLOR.primary,
        fontSize: FONT_SIZE.font14,
    },
    btnTextPrimary: {
        ...GlobalStyles.textSemiBold14,
        color: COLOR.white,
        fontSize: FONT_SIZE.font14,
    },
    relatedSection: {
        marginBottom: SIZE.moderateScale(20),
    },
    sectionTitle: {
        ...GlobalStyles.textBold14,
        color: COLOR.dark,
        marginBottom: SIZE.moderateScale(12),
    },
    relatedList: {
        paddingRight: SIZE.moderateScale(20),
        gap: SIZE.moderateScale(15),
    },
    relatedCard: {
        width: SIZE.moderateScale(200),
        padding: SIZE.moderateScale(10),
        backgroundColor: COLOR.white,
        borderRadius: SIZE.moderateScale(12),
        borderWidth: 1,
        borderColor: COLOR.grayLight,
    },
    relatedRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    relatedIconMsg: {
        width: SIZE.moderateScale(32),
        height: SIZE.moderateScale(32),
        borderRadius: SIZE.moderateScale(8),
        backgroundColor: COLOR.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SIZE.moderateScale(10),
    },
    relatedTitle: {
        ...GlobalStyles.textSemiBold14,
        color: COLOR.dark,
        marginBottom: SIZE.moderateScale(2),
        fontSize: FONT_SIZE.font12,
    },
    relatedMeta: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    relatedMetaText: {
        ...GlobalStyles.textRegular12,
        color: COLOR.darkGrey,
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: COLOR.darkGrey,
        marginHorizontal: SIZE.moderateScale(6),
    }
});

export default SurveyResultScreen;
