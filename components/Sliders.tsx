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
  return (
    <View>
      <Text>Calories: {sliderValues.calories} per serving</Text>
      <Slider
        defaultValue={40}
        size="sm"
        my={2}
        onChange={(e: any) =>
          setSliderValues((prevState) => ({
            ...prevState,
            calories: Math.floor(e),
          }))
        }
      >
        <Slider.Track>
          <Slider.FilledTrack />
        </Slider.Track>
        <Slider.Thumb />
      </Slider>
      <Text> {sliderValues.servings} servings</Text>
      <Slider
        defaultValue={40}
        size="sm"
        my={2}
        onChange={(e: any) =>
          setSliderValues((prevState) => ({
            ...prevState,
            servings: Math.floor(e),
          }))
        }
      >
        <Slider.Track>
          <Slider.FilledTrack />
        </Slider.Track>
        <Slider.Thumb />
      </Slider>
      <Text>Preparation Time: {sliderValues.prepTime} mins</Text>
      <Slider
        defaultValue={40}
        size="sm"
        my={2}
        onChange={(e: any) =>
          setSliderValues((prevState) => ({
            ...prevState,
            prepTime: Math.floor(e),
          }))
        }
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
        my={2}
        onChange={(e: any) =>
          setSliderValues((prevState) => ({
            ...prevState,
            cookingTime: Math.floor(e),
          }))
        }
      >
        <Slider.Track>
          <Slider.FilledTrack />
        </Slider.Track>
        <Slider.Thumb />
      </Slider>
    </View>
  );
};
