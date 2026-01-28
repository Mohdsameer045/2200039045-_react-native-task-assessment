export const generatePostContent = (id) => {
  const topics = [
    {
      title: 'Exploring Nature',
      body:
        'Discover the beauty of untouched landscapes, fresh air, and peaceful surroundings that reconnect us with nature.',
    },
    {
      title: 'Tech Innovations',
      body:
        'Technology is evolving rapidly, shaping how we live, work, and communicate in the modern digital world.',
    },
    {
      title: 'Travel Diaries',
      body:
        'Travel opens new perspectives, cultures, and unforgettable experiences that enrich our lives.',
    },
    {
      title: 'Healthy Lifestyle',
      body:
        'Maintaining a healthy lifestyle through balanced habits leads to long-term physical and mental well-being.',
    },
    {
      title: 'Food & Flavors',
      body:
        'Food brings people together with flavors, traditions, and stories passed down through generations.',
    },
    {
      title: 'Creative Thinking',
      body:
        'Creativity fuels innovation, problem-solving, and the ability to see the world differently.',
    },
  ];

  return topics[id % topics.length];
};
