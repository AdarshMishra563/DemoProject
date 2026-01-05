import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLOR, FONTS, SIZE } from "@utils/Constant";
import { GlobalStyles } from '@styles/GlobalCss';

interface CategoryItem {
    id: number | string;
    name: string;
    type: string;
    icon: string;
    iconType: string;
}

interface CategoryCardProps {
    category: CategoryItem;
    onPress: () => void;
    containerStyle?: ViewStyle;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onPress, containerStyle }) => {
    const mainIconSize = SIZE.moderateScale(26);
    const containerSize = SIZE.moderateScale(58);

    const renderIcon = () => {
        const commonProps = {
            size: mainIconSize,
            color: COLOR.grey,
        };

        switch (category.iconType) {
            case "MaterialCommunityIcons":
                return <MaterialCommunityIcons name={category.icon} {...commonProps} />;
            case "MaterialIcons":
                return <MaterialIcons name={category.icon} {...commonProps} />;
            case "Ionicons":
                return <Ionicons name={category.icon} {...commonProps} />;
            default:
                return <MaterialCommunityIcons name={category.icon} {...commonProps} />;
        }
    };

    // Function to split category name into words
    const renderCategoryName = (name: string) => {
        const words = name.split(' ');

        if (words.length === 2) {
            return (
                <View style={styles.twoWordContainer}>
                    <Text style={styles.categoryWord} numberOfLines={1}>
                        {words[0]}
                    </Text>
                    <Text style={styles.categoryWord} numberOfLines={1}>
                        {words[1]}
                    </Text>
                </View>
            );
        }

        // For single word or more than 2 words, show normally
        return (
            <Text style={styles.categoryName} numberOfLines={2}>
                {name}
            </Text>
        );
    };

    return (
        <TouchableOpacity
            style={[styles.categoryCard, containerStyle]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <View style={styles.categoryIconContainer}>
                <View style={[styles.iconContainer, { width: containerSize, height: containerSize }]}>
                    {renderIcon()}
                </View>
                {renderCategoryName(category.name)}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    categoryCard: {
        alignItems: "center",
    },
    categoryIconContainer: {
        alignItems: "center",
        width: "100%",
    },
    iconContainer: {
        backgroundColor: "#F9FAFB",
        borderRadius: SIZE.moderateScale(10),
        justifyContent: "center",
        alignItems: "center",
        marginBottom: SIZE.moderateScale(8),
        borderWidth: 1,
        borderColor: COLOR.walletGray,
    },
    twoWordContainer: {
        alignItems: "center",
    },
    categoryWord: {
        ...GlobalStyles.textMedium11,
        color: COLOR.dark,
        textAlign: "center",
        lineHeight: SIZE.moderateScale(14),
    },
    categoryName: {
        ...GlobalStyles.textMedium11,
        color: COLOR.dark,
        textAlign: "center",
        lineHeight: SIZE.moderateScale(14),
    },
});

export default CategoryCard;
