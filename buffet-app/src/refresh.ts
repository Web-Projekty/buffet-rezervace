import axios from "axios";
import createRefresh, {
  createRefreshParamInterface,
} from "react-auth-kit/createRefresh";

export const refresh: createRefreshParamInterface<any> = createRefresh({
  interval: 10, // The time in sec to refresh the Access token,
  refreshApiCallback: async (param) => {
    try {
      console.log("refreshing token");
      const response = await axios.post("/api", {
        requestType: "verify",
        token: param.authToken,
      });

      return {
        isSuccess: true,
        newAuthToken: "",
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
        newAuthToken: "",
      };
    }
  },
});
