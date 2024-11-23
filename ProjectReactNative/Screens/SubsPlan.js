import * as React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  AccessibilityInfo,
  ImageBackground,
} from "react-native";

export default function PremiumSubscription() {
  const [isSubscribed, setIsSubscribed] = React.useState(false);

  const handleSubscribe = () => {
    setIsSubscribed(true);
    AccessibilityInfo.announceForAccessibility("Successfully subscribed to Premium");
  };

  const handleBackHome = () => {
    AccessibilityInfo.announceForAccessibility("Navigating back to home");
  };

  return (
    <ScrollView 
      accessible={true}
      accessibilityLabel="Premium subscription page"
      style={styles.container}
    >
      <View style={styles.view1}>
        <ImageBackground
          accessible={true}
          accessibilityLabel="Background image"
          resizeMode="cover"
          source={{uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/bbc8b9e9b4ff3c2c127ca1191c3e896474ec5a4d33573e60ced73145639b2d87?placeholderIfAbsent=true&apiKey=246443a9ddb849499eacf4ea5891bc1a"}}
          style={styles.image1}
        >
          <Image
            accessible={true}
            accessibilityLabel="Header decoration"
            resizeMode="contain"
            source={{uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/2325ff690f9c0f1116a62d86a6dcc8e90e8e099f782f1e81a52cd04f87c3b747?placeholderIfAbsent=true&apiKey=246443a9ddb849499eacf4ea5891bc1a"}}
            style={styles.image2}
          />
          <View style={styles.view2}>
            <View style={styles.view3}>
              <Text 
                accessibilityRole="header"
                style={styles.headerText}
              >
                Unlimited music selections
              </Text>
            </View>
            
            <View style={styles.premiumCard}>
              <View style={styles.premiumHeader}>
                <Text style={styles.premiumTitle}>Premium</Text>
                <View style={styles.freeTrialBadge}>
                  <Text style={styles.freeTrialText}>Free for 1 month</Text>
                </View>
                <Text style={styles.priceText}>$12.99/ month</Text>
              </View>

              {[
                {icon: "ext_3-", text: "Ad-free listening"},
                {icon: "ext_3-", text: "Download to listen offline"},
                {icon: "ext_3-", text: "Access full catalog Premium"},
                {icon: "ext_4-", text: "High sound quality"},
                {icon: "ext_4-", text: "Cancel anytime"}
              ].map((feature, index) => (
                <View 
                  key={index}
                  style={styles.featureRow}
                  accessible={true}
                  accessibilityLabel={feature.text}
                >
                  <Image
                    source={{uri: `http://b.io/${feature.icon}`}}
                    style={styles.featureIcon}
                    accessibilityRole="image"
                  />
                  <Text style={styles.featureText}>{feature.text}</Text>
                </View>
              ))}

              <TouchableOpacity 
                onPress={handleSubscribe}
                style={styles.subscribeButton}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel="Subscribe now to Premium"
                accessibilityHint="Activates Premium subscription"
              >
                <Text style={styles.subscribeButtonText}>Subscribe now</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={handleBackHome}
              style={styles.backButton}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Go back to home"
            >
              <Text style={styles.backButtonText}>Back home</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view1: {
    marginHorizontal: "auto",
    maxWidth: 480,
    width: "100%",
  },
  image1: {
    aspectRatio: 0.46,
    width: "100%",
    paddingBottom: 48,
  },
  image2: {
    width: "100%",
    aspectRatio: 9.71,
  },
  view2: {
    marginTop: 72,
    width: "100%",
    paddingHorizontal: 43,
    alignItems: "center",
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 32,
    fontFamily: "Poppins",
    fontWeight: "700",
    lineHeight: 48,
    textAlign: "center",
  },
  premiumCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 36,
    width: "100%",
    marginTop: 24,
  },
  premiumHeader: {
    marginBottom: 20,
  },
  premiumTitle: {
    fontSize: 24,
    fontFamily: "Poppins",
    fontWeight: "700",
    color: "#171A1F",
  },
  freeTrialBadge: {
    backgroundColor: "rgba(255, 122, 226, 0.1)",
    borderRadius: 14,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  freeTrialText: {
    color: "#FF7AE2",
    fontSize: 12,
    fontFamily: "Open Sans",
  },
  priceText: {
    fontSize: 16,
    fontFamily: "Open Sans",
    fontWeight: "700",
    color: "#171A1F",
    marginTop: 8,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
  },
  featureIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  featureText: {
    fontSize: 14,
    fontFamily: "Open Sans",
    color: "#171A1F",
  },
  subscribeButton: {
    backgroundColor: "#FF7AE2",
    borderRadius: 22,
    paddingVertical: 12,
    marginTop: 32,
    alignItems: "center",
  },
  subscribeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Open Sans",
    fontWeight: "600",
  },
  backButton: {
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderRadius: 4,
    paddingVertical: 9,
    paddingHorizontal: 70,
    marginTop: 68,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Open Sans",
  },
});