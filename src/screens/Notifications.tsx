import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

import { COLOR, FONTS, SIZE, FONT_SIZE } from "@utils/Constant";
import { ScrollContainer } from "@components/common/ScrollContainer";
import { GlobalStyles } from '@styles/GlobalCss';

const NotificationScreen = () => {
  const navigation = useNavigation();

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Appointment Confirmed!",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      type: "appointment",
      time: "1h",
      group: "today",
      seen: false
    },
    {
      id: 2,
      title: "Exclusive Offer for You!",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      type: "offer",
      time: "1h",
      group: "today",
      seen: false
    },
    {
      id: 3,
      title: "Rating & Review Requested!",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis.",
      type: "rating",
      time: "1h",
      group: "today",
      seen: false
    },
    {
      id: 4,
      title: "Appointment Reminder",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      type: "reminder",
      time: "1d",
      group: "yesterday",
      seen: true
    },
    {
      id: 5,
      title: "New Paypal Added",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      type: "paypal",
      time: "1d",
      group: "yesterday",
      seen: true
    },
    {
      id: 6,
      title: "Appointment Confirmed!",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      type: "appointment",
      time: "1d",
      group: "yesterday",
      seen: true
    }
  ]);

  const getIcon = (type) => {
    switch (type) {
      case "appointment":
        return "calendar";
      case "offer":
        return "gift";
      case "rating":
        return "star";
      case "reminder":
        return "bell";
      case "paypal":
        return "credit-card";
      default:
        return "bell";
    }
  };

  const markAllAsRead = (group) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.group === group ? { ...n, seen: true } : n
      )
    );
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, seen: true } : n
      )
    );
  };

  const today = notifications.filter((n) => n.group === "today");
  const yesterday = notifications.filter((n) => n.group === "yesterday");
  const newCount = notifications.filter((n) => !n.seen).length;

  const renderItem = (item, index, array) => (
    <View key={item.id}>
      <TouchableOpacity
        style={[
          styles.card,
          index % 2 === 0 ? styles.evenCard : styles.oddCard
        ]}
        activeOpacity={0.85}
        onPress={() => markAsRead(item.id)}
      >
        {/* Icon */}
        <View style={styles.iconWrap}>
          <Icon name={getIcon(item.type)} size={20} color={COLOR.primary} />
        </View>

        {/* Content */}
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardMessage} numberOfLines={2}>
            {item.message}
          </Text>
        </View>

        {/* Right */}
        <View style={styles.rightArea}>
          <Text style={styles.time}>{item.time}</Text>
          {!item.seen && <View style={styles.unreadDot} />}
        </View>
      </TouchableOpacity>

      {/* Divider line - don't show after the last item */}
      {index < array.length - 1 && <View style={styles.divider} />}
    </View>
  );

  return (
    <ScrollContainer
      header={
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={22} color={COLOR.dark} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Notification</Text>

          {newCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{newCount} NEW</Text>
            </View>
          )}
        </View>
      }
    >
      {/* TODAY */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>TODAY</Text>
        <TouchableOpacity onPress={() => markAllAsRead("today")}>
          <Text style={styles.markAll}>Mark all as read</Text>
        </TouchableOpacity>
      </View>
      {today.map((item, index) => renderItem(item, index, today))}

      {/* YESTERDAY */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>YESTERDAY</Text>
        <TouchableOpacity onPress={() => markAllAsRead("yesterday")}>
          <Text style={styles.markAll}>Mark all as read</Text>
        </TouchableOpacity>
      </View>
      {yesterday.map((item, index) => renderItem(item, index, yesterday))}
    </ScrollContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white
  },

  /* Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SIZE.moderateScale(20),
    paddingVertical: SIZE.moderateScale(16),
    backgroundColor: COLOR.white,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.grayLight,
  },
  headerTitle: {

    textAlign: "center",
    ...GlobalStyles.textSemiBold18,
    color: COLOR.dark
  },
  badge: {
    backgroundColor: COLOR.primary,
    paddingHorizontal: SIZE.moderateScale(10),
    paddingVertical: SIZE.moderateScale(3),
    borderRadius: SIZE.moderateScale(12)
  },
  badgeText: {
    ...GlobalStyles.textSemiBold9,
    color: COLOR.white
  },

  /* Section Header */
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: SIZE.moderateScale(16),
    paddingVertical: SIZE.moderateScale(12),
    backgroundColor: COLOR.white
  },
  sectionTitle: {
    ...GlobalStyles.textMedium10,
    color: COLOR.grey
  },
  markAll: {
    ...GlobalStyles.textMedium10,
    color: COLOR.primary
  },

  /* Card */
  card: {
    flexDirection: "row",
    backgroundColor: COLOR.white,
    padding: SIZE.moderateScale(16),
  },
  evenCard: {
    backgroundColor: "#f8f9fa", // Very very light gray - keeping as is or finding constant? sticking to hex for specific shade if needed or use COLOR.grayLight/offWhite. grayLight is #F2F2F2. close enough.
  },
  oddCard: {
    backgroundColor: COLOR.white,
  },

  /* Divider line */
  divider: {
    height: 1,
    backgroundColor: COLOR.walletGray,
    marginHorizontal: 0,
  },

  iconWrap: {
    width: SIZE.moderateScale(44),
    height: SIZE.moderateScale(44),
    borderRadius: SIZE.moderateScale(22),
    backgroundColor: COLOR.grayLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: SIZE.moderateScale(14)
  },

  cardContent: {
    flex: 1,
    paddingRight: SIZE.moderateScale(8)
  },
  cardTitle: {
    ...GlobalStyles.textSemiBold13,
    color: COLOR.dark,
    marginBottom: SIZE.moderateScale(6)
  },
  cardMessage: {
    ...GlobalStyles.textRegular12,
    color: COLOR.lightDark,
    lineHeight: SIZE.moderateScale(18) // 20 -> 18
  },

  rightArea: {
    alignItems: "flex-end"
  },
  time: {
    ...GlobalStyles.textRegular10,
    color: COLOR.grey
  },
  unreadDot: {
    width: SIZE.moderateScale(8),
    height: SIZE.moderateScale(8),
    borderRadius: SIZE.moderateScale(4),
    backgroundColor: COLOR.primary,
    marginTop: SIZE.moderateScale(8)
  }
});

export default NotificationScreen;