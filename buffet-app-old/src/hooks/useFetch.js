import { useEffect, useState } from "react";
import axios from "axios";

export function useFetch(dependency, initialValue) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState(initialValue);

  const { id, url, page } = dependency;

  useEffect(() => {
    setIsLoading(true);

    async function fetchData() {
      try {
        const response = await axios.get(`${url}/${id}`);
        setData([response.data]);
        setError(null);
        setIsLoading(false);
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
