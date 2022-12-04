import { Slider, View, Text } from "native-base";
import React from "react";

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
      <Slider
        defaultValue={400}
        minValue={100}
        maxValue={1000}
        size="sm"
        my={2}
        onChange={(e: any) => handleChange(e, "calories")}
      >
        <Slider.Track>
          <Slider.FilledTrack />
        </Slider.Track>
        <Slider.Thumb />
      </Slider>
      <Text> {sliderValues.servings} servings</Text>
      <Slider
        defaultValue={4}
        size="sm"
        minValue={1}
        maxValue={15}
        my={2}
        onChange={(e: any) => handleChange(e, "servings")}
      >
        <Slider.Track>
          <Slider.FilledTrack />
        </Slider.Track>
        <Slider.Thumb />
      </Slider>
      <Text>Preparation Time: {sliderValues.prepTime} mins</Text>
      <Slider
        defaultValue={20}
        size="sm"
        minValue={1}
        maxValue={120}
        my={2}
        onChange={(e: any) => handleChange(e, "prepTime")}
      >
        <Slider.Track>
          <Slider.FilledTrack />
        </Slider.Track>
        <Slider.Thumb />
      </Slider>
      <Text>Cooking Time: {sliderValues.cookingTime} mins</Text>
      <Slider
        defaultValue={40}
        size="sm"
        minValue={1}
        maxValue={120}
        my={2}
        onChange={(e: any) => handleChange(e, "cookingTime")}
      >
        <Slider.Track>
          <Slider.FilledTrack />
        </Slider.Track>
        <Slider.Thumb />
      </Slider>
    </View>
  );
};
