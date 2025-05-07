import { useEffect, useState } from 'react';

export function useFetchData() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://tarotapi.dev/api/v1/cards/random?n=10');
        const json = await response.json();
        setData(json.cards); // a resposta da API tem um objeto com { cards: [...] }
      } catch (error) {
        console.error('Erro ao buscar cartas de tarô:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading };
}
