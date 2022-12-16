import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import React, { useState } from "react";
import { Formik } from "formik";
import {
  Button,
  FormControl,
  Heading,
  HStack,
  Icon,
  Input,
  Pressable,
  Text,
  View,
  WarningOutlineIcon,
} from "native-base";
import { useMutation, useQueryClient } from "react-query";
import { object, string } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const createUser = async (queryKey: User) => {
  const { data: response } = await axios.post(
    "http://ec2-44-203-24-124.compute-1.amazonaws.com/users/register",
    queryKey
  );
  return response.data;
};

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export const RegisterScreen = ({ navigation }: any) => {
  const [show, setShow] = useState<Boolean>(false);
  const queryClient = useQueryClient();
  const registerSchema = object({
    firstName: string()
      .min(1, "Name is required")
      .max(32, "Name must be less than 100 characters"),
    lastName: string()
      .min(1, "Name is required")
      .max(32, "Name must be less than 100 characters"),
    email: string().min(1, "Email is required").email("Email is invalid"),
    password: string()
      .min(1, "Password is required")
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
    passwordConfirm: string().min(1, "Please confirm your password"),
  }).refine((data: any) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Passwords do not match",
  });
  const { mutate, isLoading } = useMutation(createUser, {
    onSuccess: (data) => {
      const message = "success";
      alert(message);
      navigation.navigate("Login");
    },
    onError: () => {
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
      }}
      onSubmit={(values) => mutate({ ...values })}
      validationSchema={toFormikValidationSchema(registerSchema)}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <View className="mx-16 mt-5 p-2 py-10">
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
            Sign up to continue!
          </Heading>
          <FormControl mt={5}>
            <FormControl.Label>First Name</FormControl.Label>
            <Input
              mb={-3}
              onChangeText={handleChange("firstName")}
              onBlur={handleBlur("firstName")}
              value={values.firstName}
            />{" "}
            {errors.firstName ? (
              <View className="flex flex-row ">
                <WarningOutlineIcon size="xs" color="red.500" />
                <Text className="text-red-500 ml-1 -mt-1 text-sm">
                  {errors.firstName.toString()}
                </Text>
              </View>
            ) : null}
          </FormControl>
          <FormControl>
            <FormControl.Label>Last Name</FormControl.Label>
            <Input
              mb={2}
              onChangeText={handleChange("lastName")}
              onBlur={handleBlur("lastName")}
              value={values.lastName}
            />

            {errors.lastName ? (
              <View className="flex flex-row">
                <WarningOutlineIcon size="xs" color="red.500" />
                <Text className="text-red-500 ml-1 -mt-1 text-sm">
                  {errors.lastName.toString()}
                </Text>
              </View>
            ) : null}
          </FormControl>
          <FormControl variant="outlined">
            <FormControl.Label>Email Adress</FormControl.Label>
            <Input
              mb={2}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("Email")}
              value={values.email}
            />
            {errors.email ? (
              <View className="flex flex-row">
                <WarningOutlineIcon size="xs" color="red.500" />
                <Text className="text-red-500 ml-1 -mt-1 text-sm">
                  {errors.email.toString()}
                </Text>
              </View>
            ) : null}
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              mb={2}
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
            {errors.password ? (
              <View className="flex flex-row">
                <WarningOutlineIcon size="xs" color="red.500" />
                <Text className="text-red-500 ml-1 -mt-1 text-sm">
                  {errors.password.toString()}
                </Text>
              </View>
            ) : null}
          </FormControl>

          <FormControl variant="outlined">
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input
              mb={2}
              onChangeText={handleChange("passwordConfirm")}
              onBlur={handleBlur("passwordConfirm")}
              value={values.passwordConfirm}
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
            {errors.passwordConfirm ? (
              <View className="flex flex-row">
                <WarningOutlineIcon size="xs" color="red.500" />
                <Text className="text-red-500 ml-1 -mt-1 text-sm">
                  {errors.passwordConfirm.toString()}
                </Text>
              </View>
            ) : null}
          </FormControl>
          <Button
            mt={5}
            onPress={() => handleSubmit()}
            isLoadingText="Submitting"
            bgColor="#9D14FF"
          >
            Register
          </Button>

          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              Already have an account?{" "}
            </Text>
            <Button
              variant="ghost"
              mt="-10px"
              _text={{
                color: "#9D14FF",
                fontWeight: "medium",
                fontSize: "sm",
              }}
              onPress={() => navigation.navigate("Login")}
            >
              Sign in
            </Button>
          </HStack>
        </View>
      )}
    </Formik>
  );
};
