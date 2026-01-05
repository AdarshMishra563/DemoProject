import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,

} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLOR, FONTS, SIZE, FONT_SIZE } from '@utils/Constant';
import { ScrollContainer } from '@components/common/ScrollContainer';
import { GlobalStyles } from '@styles/GlobalCss';

const { width, height } = Dimensions.get("window");

// Dummy blog data
const dummyBlogData = {
  id: 1,
  title: "How to Analyze Your Best Pages for SEO Performance",
  category: "Business",
  author: {
    name: "John Deon",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop",
    role: "SEO Specialist",
    company: "TechCorp Solutions",
    bio: "Digital marketing expert with 10+ years of experience in SEO strategy and implementation"
  },
  date: "December 15, 2025",
  readTime: "5 min read",
  comments: 5,
  likes: 42,
  views: "1.2K",
  image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&auto=format&fit=crop",
  content: `It is an established fact that corporate success is not achieved overnight. In today's digital landscape, search engine optimization (SEO) has become the cornerstone of online visibility and business growth.

## Understanding SEO Performance

Successful SEO strategies require a combination of technical expertise, content excellence, and user experience optimization. The most effective pages often share common characteristics that can be analyzed and replicated.

## Key Metrics to Track

1. **Organic Traffic**: Monitor which pages drive the most visitors from search engines
2. **Conversion Rates**: Identify pages that lead to actual business results
3. **Bounce Rate**: Understand user engagement levels and content relevance
4. **Backlink Profile**: Assess the quality and quantity of incoming links
5. **Keyword Rankings**: Track performance for target keywords
6. **Click-Through Rate (CTR)**: Measure how compelling your meta descriptions are

## Actionable Insights for Improvement

The analysis should focus on converting data into actionable strategies. Look for patterns in:

- **Keyword performance**: Which keywords drive the most valuable traffic?
- **Content format effectiveness**: Do users prefer articles, videos, or infographics?
- **User behavior signals**: How long do users stay on different page types?
- **Technical optimization opportunities**: Are there page speed or mobile responsiveness issues?

## Implementing Data-Driven Decisions

Once you've identified your best-performing pages:

1. **Audit Content Quality**: Ensure top pages maintain high-quality, up-to-date information
2. **Optimize Meta Information**: Improve titles and descriptions for better CTR
3. **Build Internal Links**: Connect high-performing pages with related content
4. **Update Regularly**: Keep content fresh and relevant
5. **Promote Strategically**: Share on relevant platforms and communities

## The Long-Term Strategy

Remember, SEO is not just about rankings - it's about delivering value to users while achieving business objectives. The best pages often solve specific problems or answer pressing questions for your target audience.

Consistent analysis and optimization lead to sustainable growth. Make data-driven decisions, test new approaches, and always prioritize user experience.`,

  tags: ["SEO", "Digital Marketing", "Business Strategy", "Analytics", "Content Marketing", "Web Traffic"],

  sections: [
    {
      title: "Introduction",
      content: "Understanding how to analyze SEO performance is crucial for digital success."
    },
    {
      title: "Core Principles",
      content: "Focus on user intent, content quality, and technical excellence."
    },
    {
      title: "Implementation",
      content: "Regular audits and strategic updates drive continuous improvement."
    }
  ],

  relatedPosts: [
    {
      id: 2,
      title: "Digital Marketing Strategies for 2024",
      category: "Marketing",
      author: "Sarah Johnson",
      date: "Dec 10, 2025",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "The Future of AI in Content Creation",
      category: "Technology",
      author: "Michael Chen",
      date: "Dec 5, 2025",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Building a Sustainable Business Model",
      category: "Entrepreneurship",
      author: "Emma Wilson",
      date: "Nov 28, 2025",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&auto=format&fit=crop",
    },
  ]
};

const BlogDetailsScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [isLiked, setIsLiked] = useState(false);

  const blog = dummyBlogData;

  const renderContentSection = () => {
    const paragraphs = blog.content.split('\n\n');
    return paragraphs.map((paragraph, index) => {
      if (paragraph.startsWith('## ')) {
        return (
          <View key={index} style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {paragraph.replace('## ', '')}
            </Text>
          </View>
        );
      } else if (paragraph.includes('**')) {
        const parts = paragraph.split('**');
        return (
          <Text key={index} style={styles.paragraph}>
            {parts.map((part, i) =>
              i % 2 === 0 ? (
                part
              ) : (
                <Text key={i} style={styles.boldText}>
                  {part}
                </Text>
              )
            )}
          </Text>
        );
      } else if (paragraph.match(/^\d+\.\s/)) {
        return (
          <View key={index} style={styles.listItem}>
            <Text style={styles.listBullet}>•</Text>
            <Text style={styles.listText}>{paragraph.replace(/^\d+\.\s/, '')}</Text>
          </View>
        );
      } else {
        return (
          <Text key={index} style={styles.paragraph}>
            {paragraph}
          </Text>
        );
      }
    });
  };

  const renderRelatedPost = (post: typeof dummyBlogData.relatedPosts[0]) => (
    <TouchableOpacity
      key={post.id}
      style={styles.relatedPostCard}
      onPress={() => navigation.navigate('BlogDetails', { blog: post })}
    >
      <Image source={{ uri: post.image }} style={styles.relatedPostImage} />
      <View style={styles.relatedPostContent}>
        <View style={styles.relatedPostMeta}>
          <Text style={styles.relatedPostCategory}>{post.category}</Text>
          <View style={styles.relatedPostMetaRight}>
            <MaterialIcons name="access-time" size={12} color="#6B7280" />
            <Text style={styles.relatedPostReadTime}>{post.readTime}</Text>
          </View>
        </View>
        <Text style={styles.relatedPostTitle} numberOfLines={2}>
          {post.title}
        </Text>
        <View style={styles.relatedPostFooter}>
          <Text style={styles.relatedPostAuthor}>By {post.author}</Text>
          <Text style={styles.relatedPostDate}>{post.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollContainer
      header={
        <View style={styles.mainHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={24} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Article Details</Text>
          <View style={styles.headerRight} />
        </View>
      }
      scrollStyle={styles.scrollContent}
    >
      {/* Blog Header Section */}
      <View style={styles.blogHeader}>
        <View style={styles.categoryContainer}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>{blog.category}</Text>
          </View>
          <Text style={styles.dateText}>{blog.date}</Text>
        </View>

        <Text style={styles.title}>{blog.title}</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Icon name="eye" size={16} color="#6B7280" />
            <Text style={styles.statText}>{blog.views} views</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Icon name="message-circle" size={16} color="#6B7280" />
            <Text style={styles.statText}>{blog.comments} comments</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Icon name="heart" size={16} color="#6B7280" />
            <Text style={styles.statText}>{blog.likes} likes</Text>
          </View>
        </View>
      </View>

      {/* Featured Image */}
      <Image
        source={{ uri: blog.image }}
        style={styles.featuredImage}
        resizeMode="cover"
      />

      {/* Author Section */}
      <View style={styles.authorSection}>
        <Text style={styles.sectionLabel}>Written by</Text>
        <View style={styles.authorCard}>
          <Image
            source={{ uri: blog.author.avatar }}
            style={styles.authorAvatar}
          />
          <View style={styles.authorInfo}>
            <Text style={styles.authorName}>{blog.author.name}</Text>
            <Text style={styles.authorRole}>{blog.author.role}</Text>
            <Text style={styles.authorCompany}>{blog.author.company}</Text>
            <Text style={styles.authorBio}>{blog.author.bio}</Text>
          </View>
        </View>
      </View>

      {/* Content Section Header */}
      <View style={styles.contentHeader}>
        <Text style={styles.contentHeaderTitle}>Article Content</Text>
        <View style={styles.readTimeContainer}>
          <MaterialIcons name="access-time" size={16} color="#2563EB" />
          <Text style={styles.readTimeText}>{blog.readTime}</Text>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.contentContainer}>
        {renderContentSection()}
      </View>

      {/* Key Takeaways */}
      <View style={styles.takeawaysSection}>
        <View style={styles.takeawaysHeader}>
          <Icon name="check-circle" size={20} color="#2563EB" />
          <Text style={styles.takeawaysTitle}>Key Takeaways</Text>
        </View>
        {blog.sections.map((section, index) => (
          <View key={index} style={styles.takeawayItem}>
            <Text style={styles.takeawayNumber}>{index + 1}</Text>
            <View style={styles.takeawayContent}>
              <Text style={styles.takeawayItemTitle}>{section.title}</Text>
              <Text style={styles.takeawayItemText}>{section.content}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Tags Section */}
      <View style={styles.tagsSection}>
        <Text style={styles.sectionLabel}>Topics Covered</Text>
        <View style={styles.tagsContainer}>
          {blog.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Related Articles Header */}
      <View style={styles.relatedHeader}>
        <Text style={styles.relatedHeaderTitle}>Related Articles</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      {/* Related Posts */}
      <View style={styles.relatedPosts}>
        {blog.relatedPosts.map(renderRelatedPost)}
      </View>
    </ScrollContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SIZE.moderateScale(40),
  },
  mainHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SIZE.moderateScale(20),
    paddingVertical: SIZE.moderateScale(16),
    backgroundColor: COLOR.white,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.grayLight,
  },
  backButton: {
    padding: SIZE.moderateScale(4),
  },
  headerTitle: {
    ...GlobalStyles.textSemiBold16,
    color: COLOR.dark,
  },
  headerRight: {
    width: SIZE.moderateScale(32),
  },
  blogHeader: {
    paddingHorizontal: SIZE.moderateScale(20),
    paddingTop: SIZE.moderateScale(20),
    paddingBottom: SIZE.moderateScale(16),
    backgroundColor: COLOR.white,
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SIZE.moderateScale(16),
  },
  categoryBadge: {
    backgroundColor: "#EFF6FF", // Light blue, keep as specific shade or find constant
    paddingHorizontal: SIZE.moderateScale(12),
    paddingVertical: SIZE.moderateScale(6),
    borderRadius: SIZE.moderateScale(6),
  },
  categoryBadgeText: {
    ...GlobalStyles.textSemiBold11,
    color: COLOR.primary,
  },
  dateText: {
    ...GlobalStyles.textRegular13, // 14 -> 13
    color: COLOR.darkGrey,
  },
  title: {
    ...GlobalStyles.textBold18, // 20 -> 18
    color: COLOR.dark,
    lineHeight: SIZE.moderateScale(26),
    marginBottom: SIZE.moderateScale(16),
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: SIZE.moderateScale(8),
    paddingHorizontal: SIZE.moderateScale(16),
    paddingVertical: SIZE.moderateScale(12),
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: SIZE.moderateScale(6),
    flex: 1,
  },
  statText: {
    ...GlobalStyles.textRegular11, // 12 -> 11
    color: COLOR.darkGrey,
  },
  statDivider: {
    width: 1,
    height: SIZE.moderateScale(16),
    backgroundColor: COLOR.walletGray,
    marginHorizontal: SIZE.moderateScale(12),
  },
  featuredImage: {
    width: width,
    height: width * 0.6,
  },
  authorSection: {
    paddingHorizontal: SIZE.moderateScale(20),
    paddingVertical: SIZE.moderateScale(24),
    backgroundColor: "#F9FAFB",
    marginTop: 1,
  },
  sectionLabel: {
    ...GlobalStyles.textSemiBold11, // 12 -> 11
    color: COLOR.darkGrey,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: SIZE.moderateScale(10),
  },
  authorCard: {
    flexDirection: "row",
    backgroundColor: COLOR.white,
    borderRadius: SIZE.moderateScale(12),
    padding: SIZE.moderateScale(16),
    borderWidth: 1,
    borderColor: COLOR.walletGray,
  },
  authorAvatar: {
    width: SIZE.moderateScale(64),
    height: SIZE.moderateScale(64),
    borderRadius: SIZE.moderateScale(32),
    marginRight: SIZE.moderateScale(16),
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    ...GlobalStyles.textSemiBold13, // 14 -> 13
    color: COLOR.dark,
    marginBottom: SIZE.moderateScale(2),
  },
  authorRole: {
    ...GlobalStyles.textRegular13, // 14 -> 13
    color: COLOR.primary,
    marginBottom: SIZE.moderateScale(2),
  },
  authorCompany: {
    ...GlobalStyles.textRegular12, // 13 -> 12
    color: COLOR.darkGrey,
    marginBottom: SIZE.moderateScale(6),
  },
  authorBio: {
    ...GlobalStyles.textRegular14,
    lineHeight: SIZE.moderateScale(20),
    color: COLOR.darkGrey,
  },
  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SIZE.moderateScale(20),
    paddingVertical: SIZE.moderateScale(24),
    backgroundColor: COLOR.white,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.grayLight,
  },
  contentHeaderTitle: {
    ...GlobalStyles.textSemiBold16, // 18 -> 16
    color: COLOR.dark,
  },
  readTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: SIZE.moderateScale(6),
  },
  readTimeText: {
    ...GlobalStyles.textMedium14,
    color: COLOR.primary,
  },
  contentContainer: {
    paddingHorizontal: SIZE.moderateScale(20),
    paddingVertical: SIZE.moderateScale(24),
  },
  sectionHeader: {
    marginBottom: SIZE.moderateScale(16),
  },
  sectionTitle: {
    ...GlobalStyles.textSemiBold15, // 16 -> 15
    color: COLOR.dark,
    lineHeight: SIZE.moderateScale(24),
  },
  paragraph: {
    ...GlobalStyles.textRegular12, // 13 -> 12
    lineHeight: SIZE.moderateScale(20),
    color: COLOR.lightDark,
    marginBottom: SIZE.moderateScale(16),
  },
  boldText: {
    fontFamily: FONTS.parkinsansSemiBold,
    color: COLOR.dark,
  },
  listItem: {
    flexDirection: "row",
    marginBottom: SIZE.moderateScale(12),
    paddingLeft: SIZE.moderateScale(4),
  },
  listBullet: {
    ...GlobalStyles.textSemiBold14, // 16 -> 14. Should this be SemiBold? User used default Text which is Regular for style? No, usually bullets are boldish. Or use font14 from Global. I'll use textRegular14 or specific size.
    // Original was font14, no family specified (so default). Wait, default is probably regular. But bullet point usually bold.
    // Let's use textRegular14 but ensure color matches.
    // Actually original snippet says `fontSize: FONT_SIZE.font14`.
    ...GlobalStyles.textRegular14,
    color: COLOR.primary,
    marginRight: SIZE.moderateScale(12),
    lineHeight: SIZE.moderateScale(24),
  },
  listText: {
    ...GlobalStyles.textRegular12, // 13 -> 12
    lineHeight: SIZE.moderateScale(20),
    color: COLOR.lightDark,
    flex: 1,
  },
  takeawaysSection: {
    backgroundColor: "#F0F9FF",
    marginHorizontal: SIZE.moderateScale(20),
    marginVertical: SIZE.moderateScale(24),
    borderRadius: SIZE.moderateScale(12),
    padding: SIZE.moderateScale(20),
    borderWidth: 1,
    borderColor: "#BAE6FD",
  },
  takeawaysHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: SIZE.moderateScale(8),
    marginBottom: SIZE.moderateScale(20),
  },
  takeawaysTitle: {
    ...GlobalStyles.textSemiBold15, // 16 -> 15
    color: "#0369A1",
  },
  takeawayItem: {
    flexDirection: "row",
    marginBottom: SIZE.moderateScale(16),
    backgroundColor: COLOR.white,
    borderRadius: SIZE.moderateScale(8),
    padding: SIZE.moderateScale(12),
    borderWidth: 1,
    borderColor: COLOR.walletGray,
  },
  takeawayNumber: {
    width: SIZE.moderateScale(28),
    height: SIZE.moderateScale(28),
    borderRadius: SIZE.moderateScale(14),
    backgroundColor: COLOR.primary,
    color: COLOR.white,
    ...GlobalStyles.textSemiBold14,
    textAlign: "center",
    lineHeight: SIZE.moderateScale(28),
    marginRight: SIZE.moderateScale(12),
  },
  takeawayContent: {
    flex: 1,
  },
  takeawayItemTitle: {
    ...GlobalStyles.textSemiBold13, // 14 -> 13
    color: COLOR.dark,
    marginBottom: SIZE.moderateScale(4),
  },
  takeawayItemText: {
    ...GlobalStyles.textRegular12, // 13 -> 12
    lineHeight: SIZE.moderateScale(18),
    color: COLOR.darkGrey,
  },
  tagsSection: {
    paddingHorizontal: SIZE.moderateScale(20),
    paddingVertical: SIZE.moderateScale(24),
    backgroundColor: COLOR.white,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SIZE.moderateScale(8),
  },
  tag: {
    backgroundColor: COLOR.grayLight,
    paddingHorizontal: SIZE.moderateScale(12),
    paddingVertical: SIZE.moderateScale(8),
    borderRadius: SIZE.moderateScale(8),
  },
  tagText: {
    ...GlobalStyles.textRegular13, // 14 -> 13
    color: COLOR.lightDark,
  },
  relatedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SIZE.moderateScale(20),
    paddingVertical: SIZE.moderateScale(20),
    backgroundColor: COLOR.white,
    borderTopWidth: 1,
    borderTopColor: COLOR.grayLight,
  },
  relatedHeaderTitle: {
    ...GlobalStyles.textSemiBold16, // 18 -> 16
    color: COLOR.dark,
  },
  viewAllText: {
    ...GlobalStyles.textMedium13, // 14 -> 13
    color: COLOR.primary,
  },
  relatedPosts: {
    paddingHorizontal: SIZE.moderateScale(20),
    paddingBottom: SIZE.moderateScale(40),
  },
  relatedPostCard: {
    flexDirection: "row",
    backgroundColor: COLOR.white,
    borderRadius: SIZE.moderateScale(12),
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLOR.grayLight,
    marginBottom: SIZE.moderateScale(16),
  },
  relatedPostImage: {
    width: SIZE.moderateScale(100),
    height: SIZE.moderateScale(100),
  },
  relatedPostContent: {
    flex: 1,
    padding: SIZE.moderateScale(12),
    justifyContent: "space-between",
  },
  relatedPostMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SIZE.moderateScale(6),
  },
  relatedPostCategory: {
    ...GlobalStyles.textSemiBold11,
    color: COLOR.primary,
    backgroundColor: "#EFF6FF",
    paddingHorizontal: SIZE.moderateScale(6),
    paddingVertical: SIZE.moderateScale(2),
    borderRadius: SIZE.moderateScale(4),
  },
  relatedPostMetaRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: SIZE.moderateScale(4),
  },
  relatedPostReadTime: {
    ...GlobalStyles.textRegular11,
    color: COLOR.darkGrey,
  },
  relatedPostTitle: {
    ...GlobalStyles.textSemiBold12, // 13 -> 12
    color: COLOR.dark,
    lineHeight: SIZE.moderateScale(16),
    marginBottom: SIZE.moderateScale(4),
  },
  relatedPostFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  relatedPostAuthor: {
    ...GlobalStyles.textRegular12,
    color: COLOR.darkGrey,
  },
  relatedPostDate: {
    ...GlobalStyles.textRegular11,
    color: COLOR.grey,
  },
});

export default BlogDetailsScreen;