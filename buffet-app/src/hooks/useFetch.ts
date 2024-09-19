import { useEffect, useState } from "react";
import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useFetch(url: string, values: any, initialValue: any = []) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<object>();
  const [data, setData] = useState<any>(initialValue);

  useEffect(() => {
    setIsLoading(true);

    async function fetchData() {
      try {
        const response = await axios.post(url, values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setData(response.data);
        setIsLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        setError({ message: "Failed to fetch data." });
        setData(initialValue);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [url, values, initialValue]);

  return { isLoading, error, data };
}
