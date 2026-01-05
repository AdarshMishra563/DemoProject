import React, { FC } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
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
}

export const CategoryDetailCard: FC<CategoryDetailCardProps> = ({ item, onPress }) => {
    return (
        <View style={styles.card}>
            {/* IMAGE */}
            <Image source={{ uri: item.image }} style={styles.image} />

            {/* CONTENT */}
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={3}>
                    {item.title}
                </Text>

                {/* META - Left alignment */}
                <View style={styles.metaRow}>
                    <Text style={styles.metaText}>{item.time}</Text>
                    <Text style={styles.metaDot}>•</Text>
                    <Text style={styles.metaText}>{item.duration}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        padding: SIZE.moderateScale(16),
        backgroundColor: COLOR.white, // Ensure background is set if needed, though usually inherited or white
    },
    image: {
        width: SIZE.moderateScale(82),
        height: SIZE.moderateScale(82),
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
    },
    metaText: {
        ...GlobalStyles.textRegular11,
        color: COLOR.darkGrey,
    },
    metaDot: {
        marginHorizontal: SIZE.moderateScale(6),
        color: COLOR.darkGrey,
        fontSize: FONT_SIZE.font12,
    },
});
