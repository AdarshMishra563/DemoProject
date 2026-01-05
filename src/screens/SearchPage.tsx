import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList, StyleSheet, Keyboard } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { COLOR, FONT_SIZE, FONTS } from '@utils/Constant';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GlobalStyles } from '@styles/GlobalCss';

export default function SearchPage() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  // Define all available search categories with expanded keywords
  const searchCategories = [
    {
      name: 'Revenue',
      keywords: ['revenue', 'income', 'sales', 'earning', 'total revenue', 'today revenue', 'monthly revenue', 'yearly revenue', 'revenue report', 'revenue analytics'],
      icon: 'dollar-sign',
      screen: 'Revenue'
    },
    {
      name: 'Subscription',
      keywords: ['subscription', 'subscriber', 'active subscription', 'inactive subscription', 'subscription plan', 'subscription management', 'total subscription', 'today subscription'],
      icon: 'repeat',
      screen: 'Subscription'
    },
    {
      name: 'Wallet',
      keywords: ['wallet', 'balance', 'money', 'cash', 'wallet balance', 'add money', 'withdraw money', 'active wallet', 'today wallet', 'total wallet'],
      icon: 'credit-card',
      screen: 'Wallet'
    },
    {
      name: 'Leaderboard',
      keywords: ['leaderboard', 'top', 'best', 'ranking', 'employees', 'products', 'earners', 'top performers'],
      icon: 'bar-chart',
      parent: 'Tab',
      screen: 'Leaderboard'
      ,
    },
    {
      name: 'Profile',
      keywords: ['profile', 'update', 'image', 'picture', 'details', 'account', 'my profile', 'edit profile'],
      icon: 'user',
      screen: 'ProfileDetails'
    },
    {
      name: 'About',
      keywords: ['about', 'information', 'info', 'about swipo', 'company info'],
      icon: 'info',
      screen: 'AboutSwipo'
    },
    {
      name: 'Support',
      keywords: ['contact', 'support', 'help', 'faq', 'customer support', 'help center'],
      icon: 'headphones',
      screen: 'Support'
    },
    {
      name: 'Privacy Policy',
      keywords: ['privacy', 'policy', 'data protection', 'privacy policy'],
      icon: 'shield',
      screen: 'PrivacyPolicy'
    },
    {
      name: 'Terms & Conditions',
      keywords: ['terms', 'conditions', 'agreement', 'terms and conditions'],
      icon: 'file-text',
      screen: 'TermsConditions'
    },
    {
      name: 'Notifications',
      keywords: ['notification', 'alert', 'reminder', 'push notification', 'notification settings'],
      icon: 'bell',
      screen: 'Notifications'
    },
    {
      name: 'Security',
      keywords: ['security', 'privacy', 'password', 'login', 'security settings', 'two factor authentication'],
      icon: 'lock',
      screen: 'SecurityPrivacy'
    },
    {
      name: 'Customer',
      keywords: ['customer', 'client', 'user', 'customer list', 'customer management'],
      icon: 'users',
      screen: 'Customer'
    }
  ];

  // Keyboard visibility listeners
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Load search history on component mount
  useEffect(() => {
    loadSearchHistory();
  }, []);

  // Debounced search functionality
  useEffect(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    if (searchQuery.length > 0) {
      const timer = setTimeout(() => {
        performSearch();
      }, 300); // 300ms debounce time
      setDebounceTimer(timer);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }

    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [searchQuery]);

  // Filter history based on search query
  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = searchHistory.filter(item =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredHistory(filtered);
    } else {
      setFilteredHistory(searchHistory);
    }
  }, [searchQuery, searchHistory]);

  const loadSearchHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('searchHistory');
      if (history !== null) {
        setSearchHistory(JSON.parse(history));
        setFilteredHistory(JSON.parse(history));
      }
    } catch (error) {
      console.error('Error loading search history:', error);
    }
  };

  const saveSearchHistory = async (query) => {
    if (!query.trim()) return;

    try {
      // Remove if already exists to avoid duplicates
      const updatedHistory = [
        query.trim(),
        ...searchHistory.filter(item => item.toLowerCase() !== query.trim().toLowerCase())
      ].slice(0, 10); // Keep only last 10 searches

      setSearchHistory(updatedHistory);
      await AsyncStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Error saving search history:', error);
    }
  };

  const removeSearchHistoryItem = async (itemToRemove) => {
    try {
      const updatedHistory = searchHistory.filter(item => item !== itemToRemove);
      setSearchHistory(updatedHistory);
      setFilteredHistory(updatedHistory);
      await AsyncStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Error removing search history item:', error);
    }
  };

  const clearSearchHistory = async () => {
    try {
      setSearchHistory([]);
      setFilteredHistory([]);
      await AsyncStorage.removeItem('searchHistory');
    } catch (error) {
      console.error('Error clearing search history:', error);
    }
  };

  const performSearch = () => {
    if (searchQuery.trim().length === 0) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    // Filter categories based on search query
    const query = searchQuery.toLowerCase();
    const results = [];

    // Search through all categories and their keywords
    searchCategories.forEach(category => {
      // Check if category name matches
      const categoryNameLower = category.name.toLowerCase();
      if (categoryNameLower.includes(query)) {
        // Check if we already have this category in results
        const exists = results.some(result =>
          result.screen === category.screen && result.displayText.toLowerCase() === category.name.toLowerCase()
        );

        if (!exists) {
          results.push({
            ...category,
            displayText: category.name,
            matchedText: query
          });
        }
      }

      // Check each keyword in the category
      category.keywords.forEach(keyword => {
        const keywordLower = keyword.toLowerCase();
        if (keywordLower.includes(query)) {
          // Check if we already have this exact keyword in results
          const exists = results.some(result =>
            result.screen === category.screen && result.displayText.toLowerCase() === keyword.toLowerCase()
          );

          if (!exists) {
            results.push({
              ...category,
              displayText: keyword,
              matchedText: query
            });
          }
        }
      });
    });

    if (results.length > 0) {
      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const handleSearch = (query = searchQuery) => {
    if (query.trim()) {
      saveSearchHistory(query);
      // Don't navigate immediately, just show results
      setShowResults(true);
      // Dismiss keyboard if it's open
      Keyboard.dismiss();
    }
  };

  const navigateToScreen = (query) => {
    const lowerQuery = query.toLowerCase();

    // Find the matching category
    const matchedCategory = searchCategories.find(category =>
      category.name.toLowerCase() === lowerQuery ||
      category.keywords.some(keyword => keyword.toLowerCase() === lowerQuery)
    );

    if (matchedCategory) {
      if (matchedCategory?.parent) {
        navigation.navigate(matchedCategory.parent, { screen: matchedCategory.screen });

      } else { navigation.navigate(matchedCategory.screen) }
      return;
    }

    // If no exact match, try to find a partial match
    for (const category of searchCategories) {
      if (category.keywords.some(keyword => keyword.toLowerCase().includes(lowerQuery))) {
        navigation.navigate(category.screen);
        return;
      }
    }
  };

  // Function to highlight matched text
  const highlightText = (text, match) => {
    if (!match) return <Text style={styles.resultText}>{text}</Text>;

    const index = text.toLowerCase().indexOf(match.toLowerCase());
    if (index === -1) return <Text style={styles.resultText}>{text}</Text>;

    const before = text.substring(0, index);
    const matched = text.substring(index, index + match.length);
    const after = text.substring(index + match.length);

    return (
      <Text style={styles.resultText}>
        <Text>{before}</Text>
        <Text style={styles.highlightedText}>{matched}</Text>
        <Text>{after}</Text>
      </Text>
    );
  };

  const renderSearchItem = ({ item }) => (
    <TouchableOpacity
      style={styles.searchResultItem}
      onPress={() => {
        setSearchQuery(item.displayText);
        // Save to search history when clicking on a result
        saveSearchHistory(item.displayText);
        // Navigate directly when clicking on a result item
        navigateToScreen(item.displayText);
      }}
    >
      <Feather name={item.icon} size={18} color={COLOR.primary} style={styles.resultIcon} />
      {highlightText(item.displayText, item.matchedText)}
      <Feather name="chevron-right" size={18} color={COLOR.darkGrey} />
    </TouchableOpacity>
  );

  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>


      {/* Search Header - Unified border container */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color={COLOR.dark} />
          </TouchableOpacity>

          {/* Vertical separator line */}
          <View style={styles.separator} />

          <View style={styles.searchInputContainer}>
            <TextInput
              placeholder="Search..."
              placeholderTextColor={COLOR.darkGrey}
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={() => handleSearch()}
              autoFocus={true}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
                <Feather name="x" size={20} color={COLOR.darkGrey} />
              </TouchableOpacity>
            )}
          </View>

          {/* Vertical separator line */}
          <View style={styles.separator} />

          <TouchableOpacity onPress={() => handleSearch()} style={styles.searchIconButton}>
            <Feather name="search" size={20} color={COLOR.dark} />
          </TouchableOpacity>
        </View>
      </View>


      {/* Show search results in full screen when keyboard is closed or when we have results */}
      {(showResults && searchResults.length > 0) ? (
        <View style={styles.fullResultsContainer}>
          <Text style={styles.resultsTitle}>Search Results</Text>
          <FlatList
            data={searchResults}
            renderItem={renderSearchItem}
            keyExtractor={(item, index) => `${item.screen}-${item.displayText}-${index}`}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      ) : searchQuery.length > 0 && searchResults.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Feather name="search" size={40} color={COLOR.lightGray} />
          <Text style={styles.noResultsText}>No results found for "{searchQuery}"</Text>
          <Text style={styles.noResultsSubText}>Try different keywords</Text>
        </View>
      ) : (
        <>
          {/* Search History - Show only when no query */}
          {filteredHistory.length > 0 && (
            <View style={styles.historyContainer}>
              <View style={styles.historyHeader}>
                <Text style={styles.historyTitle}>Recent Searches</Text>
                <TouchableOpacity onPress={clearSearchHistory}>
                  <Text style={styles.clearText}>Clear all</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.historyChipsContainer}>
                {filteredHistory.map((item, index) => (
                  <View key={index} style={styles.historyChipWrapper}>
                    <TouchableOpacity
                      style={styles.historyChip}
                      onPress={() => {
                        setSearchQuery(item);
                        saveSearchHistory(item);
                        handleSearch(item);
                      }}
                    >
                      <Feather name="clock" size={14} color={COLOR.darkGrey} style={styles.historyChipIcon} />
                      <Text style={styles.historyChipText} numberOfLines={1}>{item}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => removeSearchHistoryItem(item)}
                    >
                      <Feather name="x" size={14} color={COLOR.darkGrey} />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Popular Searches - Show only when no query */}
          <View style={styles.popularContainer}>
            <Text style={styles.sectionTitle}>Popular Searches</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.popularScroll}>
              {searchCategories.slice(0, 6).map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.popularChip}
                  onPress={() => {
                    setSearchQuery(item.keywords[0]);
                    // Save to search history when clicking on a popular search
                    saveSearchHistory(item.keywords[0]);
                    handleSearch(item.keywords[0]);
                  }}
                >
                  <Feather name={item.icon} size={14} color={COLOR.primary} style={styles.popularIcon} />
                  <Text style={styles.popularText}>{item.keywords[0]}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    marginVertical: 12,
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLOR.lightGray,
    borderRadius: 8,
    backgroundColor: '#fff',
    height: 50,
  },
  backButton: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    width: 1,
    height: 24,
    backgroundColor: COLOR.lightGray,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: '100%',
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: COLOR.dark,
    ...GlobalStyles.textRegular16,
  },
  clearButton: {
    padding: 5,
  },
  searchIconButton: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchButton: {
    backgroundColor: COLOR.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  fullResultsContainer: {
    flex: 1,
    padding: 15,
  },
  resultsTitle: {
    ...GlobalStyles.textSemiBold18,
    color: COLOR.dark,
    marginBottom: 15,
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.lightGray,
  },
  resultIcon: {
    marginRight: 15,
  },
  resultText: {
    flex: 1,
    ...GlobalStyles.textMedium15,
    color: COLOR.dark,
  },
  highlightedText: {
    fontFamily: FONTS.parkinsansSemiBold,
    color: COLOR.dark,
  },
  historyContainer: {
    padding: 15,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  historyTitle: {
    ...GlobalStyles.textSemiBold16,
    color: COLOR.dark,
  },
  clearText: {
    ...GlobalStyles.textRegular14,
    color: COLOR.primary,
  },
  historyChipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  historyChipWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: COLOR.lightGray,
    borderRadius: 8,
    paddingRight: 8,
  },
  historyChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  historyChipIcon: {
    marginRight: 5,
  },
  historyChipText: {
    ...GlobalStyles.textRegular14,
    color: COLOR.dark,
    maxWidth: 150,
  },
  removeButton: {
    padding: 4,
  },
  popularContainer: {
    padding: 15,
  },
  sectionTitle: {
    ...GlobalStyles.textSemiBold16,
    color: COLOR.dark,
    marginBottom: 15,
  },
  popularScroll: {
    marginHorizontal: -5,
  },
  popularChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLOR.primaryLight100,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  popularIcon: {
    marginRight: 5,
  },
  popularText: {
    ...GlobalStyles.textMedium14,
    color: COLOR.primary,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noResultsText: {
    ...GlobalStyles.textSemiBold18,
    color: COLOR.dark,
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 5,
  },
  noResultsSubText: {
    ...GlobalStyles.textRegular14,
    color: COLOR.darkGrey,
    textAlign: 'center',
  },
});