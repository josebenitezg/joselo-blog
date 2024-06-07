// components/Tweets.tsx
"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Tweet {
  id: string;
  text: string;
  created_at: string;
  author_id: string;
}

const Tweets: React.FC = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await axios.get('/api/tweets');
        setTweets(response.data);
      } catch (error) {
        console.error('Error fetching tweets:', error);
      }
    };

    fetchTweets();
  }, []);

  return (
    <div className="prose prose-neutral dark:prose-invert mt-8">
      <h2>Latest Tweets</h2>
      {tweets.length > 0 ? (
        <ul>
          {tweets.map((tweet) => (
            <li key={tweet.id}>
              <p>{tweet.text}</p>
              <small>{new Date(tweet.created_at).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tweets available.</p>
      )}
    </div>
  );
};

export default Tweets;
