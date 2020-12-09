import React from 'react';

export default function UseFetch(url) {
  const [apiData, setApiData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(`✅ -FETCHED- : ${url}`, data);
      setApiData(data);
      setLoading(false);
    } catch (error) {
      console.warn(error);
    }
  };

  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [url]);

  return { apiData, loading };
}
