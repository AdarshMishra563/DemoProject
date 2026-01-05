import React, { FC } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { GlobalStyles } from '@styles/GlobalCss';
import { COLOR, FONT_SIZE, SIZE } from '@utils/Constant';

interface SurveyItem {
    id: string;
    title: string;
    image: string;
    time: string;
    duration: string;
}

interface CategoryDetailCardProps {
    item: SurveyItem;
    onPress?: () => void;
    sectionTitle?: string;
    sectionCount?: string;
}

export const CategoryDetailCard: FC<CategoryDetailCardProps> = ({ item, onPress, sectionTitle = "Business", sectionCount = "6" }) => {
    const navigation = useNavigation<any>();

    const handlePress = () => {
        if (onPress) {
            onPress();
        } else {
            navigation.navigate('Checkout2');
        }
    };

    return (
        <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.7}>
            {/* IMAGE */}
            <Image source={{ uri: item.image }} style={styles.image} />

            {/* CONTENT */}
            <View style={styles.content}>
                {/* Section Title & Count */}
                <View style={styles.sectionRow}>
                    <Text style={styles.sectionTitle}>{sectionTitle}</Text>
                    <Text style={styles.sectionCount}>• {sectionCount}</Text>
                </View>

                <Text style={styles.title} numberOfLines={3}>
                    {item.title}
                </Text>

                {/* META - Left alignment */}
                <View style={styles.metaRow}>
                    <View style={styles.metaItem}>
                        <Feather name="clock" size={10} color={COLOR.darkGrey} style={styles.metaIcon} />
                        <Text style={styles.metaText}>{item.time}</Text>
                    </View>
                    <Text style={styles.metaDot}>•</Text>
                    <View style={styles.metaItem}>
                        <Feather name="book-open" size={10} color={COLOR.darkGrey} style={styles.metaIcon} />
                        <Text style={styles.metaText}>{item.duration}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        padding: SIZE.moderateScale(16),
        backgroundColor: COLOR.white, // Ensure background is set if needed, though usually inherited or white
    },
    image: {
        width: SIZE.moderateScale(84),
        height: SIZE.moderateScale(84),
        borderRadius: SIZE.moderateScale(9),
    },
    content: {
        flex: 1,
        marginLeft: SIZE.moderateScale(14),
        justifyContent: 'space-between',
    },
    title: {
        ...GlobalStyles.textSemiBold12,
        color: COLOR.dark,
        lineHeight: SIZE.moderateScale(17),
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: SIZE.moderateScale(4), // Ensure tight spacing
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    metaIcon: {
        marginRight: SIZE.moderateScale(3),
    },
    metaText: {
        ...GlobalStyles.textRegular10, // Reduced from 11
        color: COLOR.darkGrey,
    },
    metaDot: {
        marginHorizontal: SIZE.moderateScale(4),
        color: COLOR.darkGrey,
        fontSize: FONT_SIZE.font10,
    },
    sectionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 0, marginTop: -1 // pull closer to title
    },
    sectionTitle: {
        ...GlobalStyles.textSemiBold11,
        color: COLOR.primary,
        fontSize: FONT_SIZE.font10, // slightly smaller to match compact look
    },
    sectionCount: {
        ...GlobalStyles.textMedium11,
        fontSize: 10, // Fixed invalid font9
        color: COLOR.primary,
        marginLeft: SIZE.moderateScale(3),
    },
});
