// app/api/tweets/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  const token = process.env.TWITTER_BEARER_TOKEN;
  const query = 'from:joselobenitezg'; // Adjust this query as needed

  try {
    const response = await axios.get(
      'https://api.twitter.com/2/tweets/search/recent',
      {
        params: {
          query,
          'tweet.fields': 'created_at,text,author_id',
          max_results: 5, // Adjust as needed, maximum 100
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const tweets = response.data.data;
    return NextResponse.json(tweets);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch tweets' }, { status: 500 });
  }
}
