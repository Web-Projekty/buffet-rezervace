import { useState } from "react";
import axios from "axios";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";
import { setTokenExpiration } from "../components/auth/login/login";
import { Order } from "../types";

type UseLoginReturn = {
  loading: boolean;
  error: string;
  setError: (error: string) => void;
  login: () => void;
};

type LoginData = {
  requestType: string;
  username: string;
  password: string;
};

type UserData = {
  fullName: string;
  email: string;
  isAdmin: boolean;
  class: string;
  orders: Order[];
};

const useLogin = (loginData: LoginData, url: string): UseLoginReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const signIn = useSignIn<UserData>();
  const navigate = useNavigate();

  const login = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        url,
        // "http://localhost:8080/api",
        loginData,
      );

      const success: boolean = data.status === "success";
      //   console.log(data);

      if (success) {
        signIn({
          auth: {
            token: data.payload.token,
            type: "Bearer",
          },
          refresh:
            "5iQldrf4LwmkgVPoiVBCSRzDu4qeIFOyKdqT3OtJbXJI1Vxmzge0Au11dGmMbeuI",
          userState: {
            fullName: data.payload.fullName,
            email: data.payload.email,
            isAdmin: data.payload.isAdmin === 1 ? true : false,
            class: data.payload.class,
            orders: [
              {
                id: 1,
                date: "1727244375",
                status: "pickedup",
                user: {
                  id: 1,
                  username: "houtarouo",
                  fullName: "Oreki Houtarou",
                  email: "john@doe.com",
                  class: "4. H",
                  isAdmin: true,
                  orders: [],
                },
                items: [
                  {
                    id: 1,
                    image:
                      "https://www.pizzaplzen.cz/wp-content/uploads/2017/02/8-768x493.jpg",
                    name: "Pizza",
                    price: 129.9,
                    description: "A delicious pizza with pepperoni",
                    alergens: [],
                  },
                  {
                    id: 2,
                    image:
                      "https://www.foodandwine.com/thmb/pwFie7NRkq4SXMDJU6QKnUKlaoI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Ultimate-Veggie-Burgers-FT-Recipe-0821-5d7532c53a924a7298d2175cf1d4219f.jpg",
                    name: "Burger",
                    price: 89.9,
                    description: "A juicy burger with cheese",
                    alergens: [],
                  },
                ],
              },
              {
                id: 2,
                date: "1727244375",
                status: "pending",
                user: {
                  id: 1,
                  username: "houtarouo",
                  fullName: "Oreki Houtarou",
                  email: "john@doe.com",
                  class: "4. H",
                  isAdmin: true,
                  orders: [],
                },
                items: [
                  {
                    id: 1,
                    image:
                      "https://www.pizzaplzen.cz/wp-content/uploads/2017/02/8-768x493.jpg",
                    name: "Pizza",
                    price: 129.9,
                    description: "A delicious pizza with pepperoni",
                    alergens: [],
                  },
                  {
                    id: 2,
                    image:
                      "https://www.foodandwine.com/thmb/pwFie7NRkq4SXMDJU6QKnUKlaoI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Ultimate-Veggie-Burgers-FT-Recipe-0821-5d7532c53a924a7298d2175cf1d4219f.jpg",
                    name: "Burger",
                    price: 89.9,
                    description: "A juicy burger with cheese",
                    alergens: [],
                  },
                ],
              },
            ],
          },
        });
        setTokenExpiration(data.payload.token);
        navigate("/");
      } else {
        setError("Error occured");
        console.log("Error occured");
      }
    } catch (error) {
      setError("Error occured");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    setError,
    login,
  };
};

export default useLogin;
