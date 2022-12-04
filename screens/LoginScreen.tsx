import * as React from "react";
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  Pressable,
  Icon,
} from "native-base";
import axios from "axios";
import { Formik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import { MaterialIcons } from "@expo/vector-icons";
import { setAccessToken } from "../utills/accessToken";
import { useDispatch } from "react-redux";

export type Login = {
  email: string;
  password: string;
};

const loginUser = async (user: Login) => {
  const { data } = await axios.post(
    "http://192.168.0.73:4000/users/login",
    user
  );

  return data;
};

export const LoginScreen = ({ navigation }: any) => {
  const [show, setShow] = React.useState<Boolean>(false);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { mutate, isLoading } = useMutation(loginUser, {
    onSuccess: (data) => {
      setAccessToken(data);
      navigation.navigate("Home");
    },
    onError: () => {
      alert("Invalid login");
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(values) => mutate({ ...values })}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <Center w="100%">
          <Box safeArea p="2" py="8" w="90%" maxW="290">
            <Heading
              size="lg"
              fontWeight="600"
              color="coolGray.800"
              _dark={{
                color: "warmGray.50",
              }}
            >
              Welcome
            </Heading>
            <Heading
              mt="1"
              _dark={{
                color: "warmGray.200",
              }}
              color="coolGray.600"
              fontWeight="medium"
              size="xs"
            >
              Sign in to continue!
            </Heading>

            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>Email</FormControl.Label>
                <Input
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Password</FormControl.Label>
                <Input
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  type={show ? "text" : "password"}
                  InputRightElement={
                    <Pressable onPress={() => setShow(!show)}>
                      <Icon
                        as={
                          <MaterialIcons
                            name={show ? "visibility" : "visibility-off"}
                          />
                        }
                        size={5}
                        mr="2"
                        color="muted.400"
                      />
                    </Pressable>
                  }
                />
                <Link
                  _text={{
                    fontSize: "xs",
                    fontWeight: "500",
                    color: "indigo.500",
                  }}
                  alignSelf="flex-end"
                  mt="1"
                >
                  Forget Password?
                </Link>
              </FormControl>
              <Button
                onPress={() => handleSubmit()}
                mt="2"
                colorScheme="indigo"
              >
                Sign in
              </Button>
              <HStack mt="6" justifyContent="center">
                <Text
                  fontSize="sm"
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  I'm a new user.{" "}
                </Text>
                <Button
                  variant="ghost"
                  mt="-10px"
                  _text={{
                    color: "indigo.500",
                    fontWeight: "medium",
                    fontSize: "sm",
                  }}
                  onPress={() => navigation.navigate("Registration")}
                >
                  Sign up
                </Button>
              </HStack>
            </VStack>
          </Box>
        </Center>
      )}
    </Formik>
  );
};
