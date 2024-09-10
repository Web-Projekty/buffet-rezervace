import { useEffect, useState } from "react";
import axios from "axios";

interface DependencyProps {
  id: string;
  url: string;
  page: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useFetch(dependency: DependencyProps, initialValue: any) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<object>();
  const [data, setData] = useState(initialValue);

  const { id, url, page } = dependency;

  useEffect(() => {
    setIsLoading(true);

    async function fetchData() {
      try {
        const response = await axios.get(`${url}/${id}`);
        setData([response.data]);
        setError({});
        setIsLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        setError({ message: "Failed to fetch data." });
        setData([]);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [id, url, page]);

  return { isLoading, error, data };
}
