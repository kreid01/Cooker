import { Slider } from "native-base";
import React from "react";

interface Props {
  defaultValue: number;
  minValue: number;
  maxValue: number;
  handleChange: (e: any, value: string) => void;
  type: string;
}

export const MySlider: React.FC<Props> = ({
  defaultValue,
  minValue,
  maxValue,
  handleChange,
  type,
}) => {
  return (
    <Slider
      defaultValue={defaultValue}
      minValue={minValue}
      maxValue={maxValue}
      size="sm"
      my={2}
      onChange={(e: any) => handleChange(e, type)}
    >
      <Slider.Track>
        <Slider.FilledTrack />
      </Slider.Track>
      <Slider.Thumb />
    </Slider>
  );
};
