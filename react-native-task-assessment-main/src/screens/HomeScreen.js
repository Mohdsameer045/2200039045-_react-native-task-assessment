import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
} from 'react-native';

import PostCard from '../components/PostCard';
import { fetchPosts } from '../services/api';
import { saveSearchText, getSearchText } from '../utils/storage';
import { generatePostContent } from '../utils/contentGenerator';

export default function HomeScreen() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadPosts();
    restoreSearch();
  }, []);

  const loadPosts = async () => {
    try {
      setError('');
      const data = await fetchPosts();
      setPosts(data);
      setFilteredPosts(data);
    } catch {
      setError('Unable to fetch posts. Check your network connection.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const restoreSearch = async () => {
    const saved = await getSearchText();
    if (saved) setSearch(saved);
  };

  // 🔍 Search based on GENERATED title (not API lorem text)
  useEffect(() => {
    const text = search.toLowerCase();

    const filtered = posts.filter((item) => {
      const content = generatePostContent(item.id);
      return content.title.toLowerCase().includes(text);
    });

    setFilteredPosts(filtered);
    saveSearchText(search);
  }, [search, posts]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search posts..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : filteredPosts.length === 0 ? (
        <Text style={styles.empty}>No posts found.</Text>
      ) : (
        <FlatList
          data={filteredPosts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const content = generatePostContent(item.id);

            return (
              <PostCard
                id={item.id}
                title={content.title}
                body={content.body}
              />
            );
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={loadPosts} />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  search: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
    fontSize: 15,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    textAlign: 'center',
    color: 'red',
    marginTop: 20,
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
  },
});
