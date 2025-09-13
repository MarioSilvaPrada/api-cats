import { Image } from 'expo-image';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CatImage, useCats } from '@/contexts/CatsContext';

export default function ChatScreen() {
  const { likedCats, loading } = useCats();

  const renderChatItem = ({ item }: { item: CatImage }) => {
    const breed = item.breeds && item.breeds.length > 0 ? item.breeds[0] : null;
    const breedName = breed?.name || "Unknown Breed";

    return (
      <TouchableOpacity style={styles.chatItem}>
        <Image
          source={{ uri: item.url }}
          style={styles.chatImage}
          contentFit="cover"
        />
        <ThemedText style={styles.chatText}>
          Chat with {breedName}
        </ThemedText>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ThemedText style={styles.loadingText}>Loading...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>
          Chat with Your Liked Cats
        </ThemedText>
        <ThemedText style={styles.headerSubtitle}>
          {likedCats.length} cats ready to chat
        </ThemedText>
      </ThemedView>

      {likedCats.length === 0 ? (
        <ThemedView style={styles.emptyContainer}>
          <ThemedText style={styles.emptyText}>
            No liked cats yet! 
          </ThemedText>
          <ThemedText style={styles.emptySubtext}>
            Go back to Home and like some cats to start chatting with them.
          </ThemedText>
        </ThemedView>
      ) : (
        <FlatList
          data={likedCats}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#EC537E',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    color: 'white',
    fontSize: 16,
    opacity: 0.9,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#EC537E',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#434141',
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
    color: '#BFBFC0',
    lineHeight: 20,
  },
  listContainer: {
    padding: 20,
    paddingBottom: 100, // Space for floating tab bar
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  chatImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  chatText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#434141',
    flex: 1,
  },
});
