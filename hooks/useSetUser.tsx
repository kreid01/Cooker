import axios from "axios";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";
import { getAccessToken } from "../utills/accessToken";
import { useRefreshOnFocus } from "./useRefreshonFocus";

export const useSetUser = async () => {
  const dispatch = useDispatch();
  const getUser = async () => {
    const token = await getAccessToken();
    const { data } = await axios.get("http://192.168.0.73:4000/users/auth", {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    dispatch(setUser(data));
  };
  const { refetch } = useQuery(["user"], getUser);
  useRefreshOnFocus(refetch);
};
