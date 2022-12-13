import { Slider, View, Text } from "native-base";
import React from "react";
import { MySlider } from "./MySlider";

interface Props {
  sliderValues: {
    calories: number;
    servings: number;
    prepTime: number;
    cookingTime: number;
  };
  setSliderValues: React.Dispatch<
    React.SetStateAction<{
      calories: number;
      servings: number;
      prepTime: number;
      cookingTime: number;
    }>
  >;
}

export const Sliders: React.FC<Props> = ({ sliderValues, setSliderValues }) => {
  const handleChange = (e: any, type: string) => {
    setSliderValues((prevState) => ({
      ...prevState,
      [type]: Math.floor(e),
    }));
  };

  return (
    <View>
      <Text>Calories: {sliderValues.calories} per serving</Text>
      <MySlider
        handleChange={handleChange}
        maxValue={1000}
        minValue={100}
        defaultValue={300}
        type="calories"
      />
      <Text> {sliderValues.servings} servings</Text>
      <MySlider
        handleChange={handleChange}
        maxValue={20}
        minValue={1}
        defaultValue={4}
        type="servings"
      />

      <Text>Preparation Time: {sliderValues.prepTime} mins</Text>
      <MySlider
        handleChange={handleChange}
        maxValue={120}
        minValue={1}
        defaultValue={20}
        type="prepTime"
      />

      <Text>Cooking Time: {sliderValues.cookingTime} mins</Text>

      <MySlider
        handleChange={handleChange}
        maxValue={120}
        minValue={1}
        defaultValue={20}
        type="cookingTime"
      />
    </View>
  );
};
