import { useEffect, useState } from "react";
import axios from "axios";

interface DependencyProps {
  url: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useFetch(dependency: DependencyProps, initialValue: any) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<object>();
  const [data, setData] = useState(initialValue);

  const { url } = dependency;

  useEffect(() => {
    setIsLoading(true);

    async function fetchData() {
      try {
        const response = await axios.post(
          "http://localhost:80/api",
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        setData([response.data]);
        setIsLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        setError({ message: "Failed to fetch data." });
        setData([]);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [url]);

  return { isLoading, error, data };
}
