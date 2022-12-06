import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { Formik } from "formik";
import { Input, Button, Radio, View, Text, ScrollView } from "native-base";
import { Sliders } from "../components/Sliders";

import { Recipe } from "../consts/interfaces";

type MultiValues = {
  ingredients: string;
  singleIngredient: string;
  steps: string[];
  singleStep: string;
};

const addRecipe = async (queryKey: Recipe) => {
  const { data: response } = await axios.post(
    "http://192.168.0.73:4000/recipes",
    queryKey
  );
  return response.data;
};

export const AddRecipeScreen = () => {
  const queryClient = useQueryClient();

  const [sliderValues, setSliderValues] = useState({
    calories: 50,
    servings: 4,
    prepTime: 20,
    cookingTime: 20,
  });
  const addIngredient = () => {
    setMultiValues((prevState) => ({
      ...prevState,
      ingredients: `${prevState?.ingredients},  ${multiValues.singleIngredient}`,
      singleIngredient: "",
    }));
  };

  const addStep = () => {
    setMultiValues((prevState) => ({
      ...prevState,
      steps: [...(prevState.steps as Array<string>), multiValues.singleStep],
      singleStep: "",
    }));
  };

  const [multiValues, setMultiValues] = useState<MultiValues>({
    ingredients: "",
    singleIngredient: "",
    steps: [],
    singleStep: "",
  });

  const removeIngredient = (i: number) => {
    const changeArr = multiValues.ingredients.split("1");
    const changeArr2 = changeArr.splice(i, 1).join("1");
    setMultiValues((prevState) => ({
      ...prevState,
      ingredients: changeArr2,
    }));
  };

  const removeStep = (i: number) => {
    const changeArr = [...multiValues.steps];
    changeArr.splice(i, 1);
    setMultiValues((prevState) => ({
      ...prevState,
      steps: changeArr,
    }));
  };

  const { mutate, isLoading } = useMutation(addRecipe, {
    onSuccess: (data) => {
      const message = "success";
      alert(message);
    },
    onError: () => {
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });

  const initialValues = {
    title: "",
    ingredients: "",
    steps: "",
    isVegetarian: "",
    creatorId: 1,
    imageUrl: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) =>
        mutate({
          ...values,
          ingredients: multiValues.ingredients.toString(),
          steps: multiValues.steps.toString(),
          isVegetarian: values.isVegetarian === "true" ? true : false,
          ...sliderValues,
        })
      }
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <ScrollView
          keyboardShouldPersistTaps="always"
          automaticallyAdjustKeyboardInsets={true}
        >
          <View className="mx-10 mt-5  overflow-y-scroll">
            <Input
              my={2}
              focusOutlineColor="#9D14FF"
              placeholder="Recipe Title"
              className="h-10"
              onChangeText={handleChange("title")}
              onBlur={handleBlur("title")}
              value-={values.title}
            />
            <Input
              focusOutlineColor="#9D14FF"
              my={2}
              placeholder="Ingredients"
              onBlur={handleBlur("ingredients")}
              value={multiValues.singleIngredient}
              onChangeText={(text) =>
                setMultiValues((prevState) => ({
                  ...prevState,
                  singleIngredient: text,
                }))
              }
              InputRightElement={
                <Button bgColor="#9D14FF" onPress={() => addIngredient()}>
                  Add
                </Button>
              }
            />
            <View>
              {multiValues?.ingredients.split("  ").map((ingredient, i) => {
                return (
                  <View className="flex flex-row justify-between" key={i}>
                    <Text className="text-black font-semibold text-md mx-2 my-2 border-b-[1px] border-gray-200">
                      - {ingredient}
                    </Text>
                    <Button
                      variant="ghost"
                      className="-mt-1"
                      onPress={() => removeIngredient(i)}
                    >
                      Remove
                    </Button>
                  </View>
                );
              })}
            </View>
            <Input
              focusOutlineColor="#9D14FF"
              placeholder="Steps"
              onBlur={handleBlur("steps")}
              value={multiValues.singleStep}
              my={2}
              onChangeText={(text) =>
                setMultiValues((prevState) => ({
                  ...prevState,
                  singleStep: text,
                }))
              }
              InputRightElement={
                <Button bgColor="#9D14FF" onPress={() => addStep()}>
                  Add
                </Button>
              }
            />
            <View>
              {multiValues?.steps.map((step, i) => {
                return (
                  <View className="flex flex-row justify-between" key={i}>
                    <Text className="text-black font-semibold text-md mx-2 my-2  max-w-[70%]">
                      {i + 1}. {step}
                    </Text>
                    <Button
                      variant="ghost"
                      className="-mt-1"
                      bgColor="#9D14FF"
                      onPress={() => removeStep(i)}
                    >
                      Remove
                    </Button>
                  </View>
                );
              })}
            </View>
            <Sliders
              sliderValues={sliderValues}
              setSliderValues={setSliderValues}
            />
            <Input
              focusOutlineColor="#9D14FF"
              placeholder="Image URL"
              className="h-10 w-[100vw]"
              my={2}
              onChangeText={handleChange("imageUrl")}
              onBlur={handleBlur("imageUrl")}
              value-={values.imageUrl}
            />
            <Radio.Group
              className=" text-sm"
              name="isVegetarian"
              my={2}
              accessibilityLabel="Is Vegetarian"
              value={values.isVegetarian}
              onChange={handleChange("isVegetarian")}
            >
              <Radio colorScheme="indigo" value={"true"} my={1}>
                Is Vegetarian
              </Radio>
              <Radio colorScheme="indigo" value={"false"} my={1}>
                Is Not Vegetarian
              </Radio>
            </Radio.Group>

            <Button
              spinnerPlacement="end"
              bgColor="#9D14FF"
              isLoadingText="Submitting"
              onPress={() => handleSubmit()}
            >
              Create
            </Button>
          </View>
        </ScrollView>
      )}
    </Formik>
  );
};
