import { useEffect, useState } from 'react';

const API_KEY = import.meta.env.VITE_GIPHY_KEY as string;
const API_URL = 'https://api.giphy.com/v1/gifs/search';
const DEFAULT_GIF =
  'https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284';

const useFetchGif = (keyword: string) => {
  const [gifUrl, setGifUrl] = useState('');

  if (!API_KEY) {
    throw new Error('Please provide Giphy API key');
  }

  useEffect(() => {
    console.log(keyword, API_KEY)
    const fetchGifs = async () => {
      try {
        const url = new URL(API_URL);
        url.searchParams.append('api_key', API_KEY);
        url.searchParams.append('q', keyword.split(' ').join(''));
        url.searchParams.append('limit', String(1));

        const response = await fetch(url);
        const { data } = await response.json();
        setGifUrl(data[0].images.downsized_medium.url || DEFAULT_GIF);
      } catch (error) {
        console.log(error);
        setGifUrl(DEFAULT_GIF);
      }
    };

    keyword && fetchGifs();
  }, [keyword]);

  return gifUrl;
};

export default useFetchGif;
