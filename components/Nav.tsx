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
    <HStack style={{ backgroundColor: "#D6C9FF" }}>
      <Button
        _text={{
          color: "#FFFFFF",
          fontWeight: "bold",
        }}
        variant="ghost"
        onPress={() => navigation.navigate("Add Recipe")}
      >
        Add Recipe
      </Button>
      {!currentUser ? (
        <HStack>
          <Button
            _text={{
              color: "#FFFFFF",
            }}
            variant="ghost"
            onPress={() => navigation.navigate("Registration")}
          >
            Register
          </Button>
          <Button
            _text={{
              color: "white",
              fontWeight: "bold",
            }}
            variant="ghost"
            onPress={() => navigation.navigate("Login")}
          >
            Login
          </Button>
        </HStack>
      ) : (
        <HStack>
          <Button
            _text={{
              color: "#FFFFFF",
              fontWeight: "bold",
            }}
            onPress={() => logout()}
            variant="ghost"
          >
            Logout
          </Button>

          <Button
            _text={{
              color: "#FFFFFF",
              fontWeight: "bold",
            }}
            variant="ghost"
          >
            {currentUser.firstName}
          </Button>
        </HStack>
      )}
    </HStack>
  );
};
