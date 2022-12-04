import { Button, HStack, View } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../slices/userSlice";
import { RootState } from "../store/store";
import { setAccessToken } from "../utills/accessToken";
import React from "react";

export const Nav = ({ navigation }: any) => {
  const currentUser = useSelector((state: RootState) => state.user.value);

  const dispatch = useDispatch();

  const logout = () => {
    setAccessToken("");
    dispatch(setUser(null));
  };

  return (
    <HStack>
      <Button variant="ghost" onPress={() => navigation.navigate("Add Recipe")}>
        Add Recipe
      </Button>
      {!currentUser ? (
        <HStack>
          <Button
            variant="ghost"
            onPress={() => navigation.navigate("Registration")}
          >
            Register
          </Button>
          <Button variant="ghost" onPress={() => navigation.navigate("Login")}>
            Login
          </Button>
        </HStack>
      ) : (
        <HStack>
          <Button onPress={() => logout()} variant="ghost">
            Logout
          </Button>

          <Button variant="ghost">{currentUser.firstName}</Button>
        </HStack>
      )}
    </HStack>
  );
};
