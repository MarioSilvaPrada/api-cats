import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useCats } from "@/contexts/CatsContext";
import { StyleSheet } from "react-native";

export default function ProfileScreen() {
  const { cats, loading, likedCats, dislikedCats } = useCats();

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.headerTitle}>Your Cat Journey</ThemedText>
      </ThemedView>

      <ThemedView style={styles.content}>
        <ThemedView style={styles.statsSection}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Your Cat Stats
          </ThemedText>

          <ThemedView style={styles.statCard}>
            <ThemedText style={styles.statNumber}>
              {likedCats.length}
            </ThemedText>
            <ThemedText style={styles.statLabel}>Cats Liked ❤️</ThemedText>
          </ThemedView>

          <ThemedView style={styles.statCard}>
            <ThemedText style={styles.statNumber}>
              {dislikedCats.length}
            </ThemedText>
            <ThemedText style={styles.statLabel}>Cats Disliked 💔</ThemedText>
          </ThemedView>

          <ThemedView style={styles.statCard}>
            <ThemedText style={styles.statNumber}>
              {likedCats.length + dislikedCats.length}
            </ThemedText>
            <ThemedText style={styles.statLabel}>
              Total Cats Viewed 👀
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#EC537E",
    alignItems: "center",
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  headerSubtitle: {
    color: "white",
    fontSize: 16,
    opacity: 0.9,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  statsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#434141",
    marginBottom: 20,
    textAlign: "center",
  },
  statCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#EC537E",
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 16,
    color: "#434141",
    fontWeight: "600",
  },
});
