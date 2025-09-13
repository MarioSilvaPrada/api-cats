import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Swiper from "react-native-deck-swiper";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { CatImage, useCats } from "@/contexts/CatsContext";

const { height } = Dimensions.get("window");

export default function HomeScreen() {
  const { cats, loading, error, refetch, likeCat, dislikeCat } = useCats();
  const swiperRef = React.useRef<any>(null);

  const handleSwipeLeft = (cardIndex: number) => {
    const cat = cats[cardIndex];
    if (cat) {
      dislikeCat(cat);
    }
  };

  const handleSwipeRight = (cardIndex: number) => {
    const cat = cats[cardIndex];
    if (cat) {
      likeCat(cat);
    }
  };

  const handleSwipeAll = () => {
    Alert.alert("No more cats!", "Would you like to load more?", [
      { text: "Yes", onPress: refetch },
      { text: "No", style: "cancel" },
    ]);
  };

  const renderCard = (cat: CatImage, index: number) => {
    if (!cat) return null;

    const breed = cat.breeds && cat.breeds.length > 0 ? cat.breeds[0] : null;

    return (
      <View style={styles.card}>
        <Image
          source={{ uri: cat.url }}
          style={styles.cardImage}
          contentFit="cover"
        />
        <View style={styles.cardInfo}>
          <View style={styles.cardInfoTop}>
            <ThemedText style={styles.breedName}>
              {breed?.name || "Unknown Breed"}
            </ThemedText>
            <ThemedText style={styles.lifeSpan}>
              {breed?.life_span || "N/A"}
            </ThemedText>
          </View>

          <View style={styles.cardInfoBottom}>
            <ThemedText style={styles.origin}>
              {breed?.origin || "Unknown"}
            </ThemedText>
            <ThemedText style={styles.temperament}>
              {breed?.temperament || "Friendly"}
            </ThemedText>
          </View>
        </View>
      </View>
    );
  };

  const renderButtons = () => (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity
        style={styles.button}
        testID="dislike-button"
        onPress={() => {
          if (swiperRef.current) {
            swiperRef.current.swipeLeft();
          }
        }}
      >
        <MaterialIcons name="close" size={30} color="#E16359" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        testID="like-button"
        onPress={() => {
          if (swiperRef.current) {
            swiperRef.current.swipeRight();
          }
        }}
      >
        <MaterialIcons name="favorite" size={30} color="#6BD88E" />
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#EC537E" />
        <ThemedText style={styles.loadingText}>
          Loading adorable cats...
        </ThemedText>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ThemedText style={styles.errorText}>Error: {error}</ThemedText>
        <TouchableOpacity onPress={refetch} style={styles.retryButton}>
          <ThemedText style={styles.retryText}>Try Again</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.swiperContainer}>
        <Swiper
          ref={(ref) => {
            swiperRef.current = ref;
          }}
          testID="swiper"
          cards={cats}
          renderCard={renderCard}
          onSwipedLeft={handleSwipeLeft}
          onSwipedRight={handleSwipeRight}
          onSwipedAll={handleSwipeAll}
          cardIndex={0}
          backgroundColor="transparent"
          stackSize={3}
          stackSeparation={15}
          animateOverlayLabelsOpacity
          animateCardOpacity
          swipeBackCard
          verticalSwipe={false}
        />
      </View>
      {renderButtons()}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },

  swiperContainer: {
    flex: 1,
    marginTop: 20,
  },
  card: {
    height: height * 0.65,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  cardInfo: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 8,
    marginLeft: 12,
    marginRight: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cardInfoTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardInfoBottom: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  breedName: {
    color: "#434141",
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  lifeSpan: {
    color: "#434141",
    fontSize: 14,
    fontWeight: "500",
  },
  origin: {
    color: "#BFBFC0",
    fontSize: 12,
    marginBottom: 2,
  },
  temperament: {
    color: "#BFBFC0",
    fontSize: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 50,
    paddingVertical: 20,
    paddingBottom: "30%",
    zIndex: 10,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#EC537E",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#EC537E",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryText: {
    color: "white",
    fontWeight: "bold",
  },
});
