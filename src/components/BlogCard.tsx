import { View, Text, StyleSheet, Image, TouchableOpacity, ViewStyle, Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SIZE, COLOR, FONTS, FONT_SIZE } from '@utils/Constant';
import { GlobalStyles } from '@styles/GlobalCss';

interface BlogItem {
    id: string;
    title: string;
    subtitle: string;
    date: string;
    author: string;
    image: string;
}

interface BlogCardProps {
    item: BlogItem;
    onPress: () => void;
    containerStyle?: ViewStyle;
}

const { width } = Dimensions.get("window");
export const CARD_WIDTH = (width - 14 * 3) / 2;

const BlogCard: React.FC<BlogCardProps> = ({ item, onPress, containerStyle }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
        >
            <View style={[styles.card, containerStyle]}>
                {/* IMAGE */}
                <Image source={{ uri: item.image }} style={styles.image} />

                {/* CONTENT */}
                <View style={styles.content}>
                    {/* TOP CONTENT */}
                    <View style={styles.contentTop}>
                        {/* AUTHOR + DATE */}
                        <View style={styles.authorDateRow}>
                            <View style={styles.authorRow}>
                                <MaterialIcons name="person" size={14} color="#6B7280" />
                                <Text style={styles.authorText}>{item.author}</Text>
                            </View>
                            <Text style={styles.date}>{item.date}</Text>
                        </View>

                        {/* TITLE */}
                        <Text style={styles.title} numberOfLines={2}>
                            {item.title}
                        </Text>

                        {/* DESCRIPTION */}
                        <Text style={styles.subtitle} numberOfLines={2}>
                            {item.subtitle}
                        </Text>
                    </View>

                    {/* BOTTOM CONTENT */}
                    <View style={styles.contentBottom}>
                        <View style={styles.readMoreButton}>
                            <Text style={styles.readMoreText}>Read more</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: CARD_WIDTH,
        height: SIZE.moderateScale(265),
        backgroundColor: COLOR.white,
        borderRadius: SIZE.moderateScale(6),
        overflow: "hidden",
        borderWidth: 1,
        borderColor: COLOR.walletGray,
    },
    image: {
        width: "100%",
        height: SIZE.moderateScale(120),
    },
    content: {
        flex: 1,
        padding: SIZE.moderateScale(10),
        justifyContent: "space-between",
    },
    contentTop: {},
    contentBottom: {
        marginTop: SIZE.moderateScale(4),
    },
    authorDateRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: SIZE.moderateScale(6),
    },
    authorRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: SIZE.moderateScale(4),
    },
    authorText: {
        ...GlobalStyles.textMedium10,
        color: COLOR.walletHistoryGrey,
        fontSize: FONT_SIZE.font10 * .93, // Keeping custom size tweak
    },
    date: {
        ...GlobalStyles.textRegular10,
        color: COLOR.grey,
        fontSize: FONT_SIZE.font10 * .95, // Keeping custom size tweak
    },
    title: {
        ...GlobalStyles.textSemiBold13,
        fontSize: FONT_SIZE.font13 * 0.95, // Keeping custom size tweak
        color: COLOR.dark,
        marginBottom: SIZE.moderateScale(6),
    },
    subtitle: {
        ...GlobalStyles.textRegular11,
        fontSize: FONT_SIZE.font11 * 0.85, // Keeping custom size tweak
        color: COLOR.walletHistoryGrey,
        lineHeight: SIZE.moderateScale(15),
    },
    readMoreButton: {
        borderWidth: 1,
        borderColor: COLOR.lightGray,
        borderRadius: SIZE.moderateScale(6),
        paddingHorizontal: SIZE.moderateScale(10),
        paddingVertical: SIZE.moderateScale(4),
        alignSelf: "flex-start",
    },
    readMoreText: {
        ...GlobalStyles.textMedium10,
        color: COLOR.darkGrey,
    },
});

export default BlogCard;
