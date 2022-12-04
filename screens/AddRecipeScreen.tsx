import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { Formik } from "formik";
import { Input, Button, Radio, View, Text } from "native-base";

import { Recipe } from "../consts/interfaces";
import { Sliders } from "../components/Sliders";

type MultiValues = {
  ingredients: string[];
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
      ingredients: [
        ...(prevState?.ingredients as Array<string>),
        multiValues.singleIngredient,
      ],
      singleIngredient: "",
    }));
  };

  const addStep = () => {
    setMultiValues((prevState) => ({
      ...prevState,
      steps: [...(prevState?.steps as Array<string>), multiValues.singleStep],
      singleStep: "",
    }));
  };

  const [multiValues, setMultiValues] = useState<MultiValues>({
    ingredients: [],
    singleIngredient: "",
    steps: [],
    singleStep: "",
  });

  const removeIngredient = (i: number) => {
    const changeArr = [...multiValues.ingredients];
    changeArr.splice(i, 1);
    setMultiValues((prevState) => ({
      ...prevState,
      ingredients: changeArr,
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
        <View className="mx-10 mt-5 ">
          <Input
            my={2}
            placeholder="Recipe Title"
            className="h-10"
            onChangeText={handleChange("title")}
            onBlur={handleBlur("title")}
            value-={values.title}
          />
          <Input
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
              <Button onPress={() => addIngredient()}>Add</Button>
            }
          />
          <View>
            {multiValues?.ingredients.map((ingredient, i) => {
              return (
                <View className="flex flex-row justify-between">
                  <Text
                    key={i}
                    className="text-black font-semibold text-md mx-2 my-2 border-b-[1px] border-gray-200"
                  >
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
            InputRightElement={<Button onPress={() => addStep()}>Add</Button>}
          />
          <View>
            {multiValues?.steps.map((step, i) => {
              return (
                <View className="flex flex-row justify-between">
                  <Text
                    key={i}
                    className="text-black font-semibold text-md mx-2 my-2  max-w-[70%]"
                  >
                    {i + 1}. {step}
                  </Text>
                  <Button
                    variant="ghost"
                    className="-mt-1"
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
            <Radio value={"true"} my={1}>
              Is Vegetarian
            </Radio>
            <Radio value={"false"} my={1}>
              Is Not Vegetarian
            </Radio>
          </Radio.Group>
          <Button onPress={() => handleSubmit()}>Create</Button>
        </View>
      )}
    </Formik>
  );
};
