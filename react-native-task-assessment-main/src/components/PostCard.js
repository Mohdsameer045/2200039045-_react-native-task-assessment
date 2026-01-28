import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function PostCard({ title, body, id }) {
  return (
    <View style={styles.card}>
      {/* Post Image */}
      <Image
        source={{ uri: `https://picsum.photos/seed/${id}/400/200` }}
        style={styles.image}
      />

      {/* Post Content */}
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body} numberOfLines={3}>
          {body}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 180,
  },
  content: {
    padding: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
    marginBottom: 6,
  },
  body: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});
