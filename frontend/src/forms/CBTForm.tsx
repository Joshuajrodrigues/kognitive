import { ArrowRightIcon, ArrowLeftIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  IconButton,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Text,
  Textarea,
  useRadio,
  useRadioGroup,
  UseRadioProps,
} from "@chakra-ui/react";
import React from "react";
import LottieCreator from "../components/sideBanner/LottieCreator";
import angry from "../lotties/feels/angry.json";
const CBTForm = () => {
  return (
    <div>
      <Box
        bgColor={"purple.50"}
        borderColor={"purple.500"}
        h={"xl"}
        p={4}
        borderRadius={4}
        m={8}
        className="form"
      >
        <Step1 />
      </Box>

      <Flex justifyContent={"space-around"} className="navigation">
        <IconButton
          icon={<ArrowLeftIcon />}
          aria-label={"go previous button"}
        />
        <IconButton icon={<ArrowRightIcon />} aria-label={"go next button"} />
      </Flex>
    </div>
  );
};

export default CBTForm;
              {/* @ts-ignore */}
function RadioCard(props) {

  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "purple.600",
          color: "white",
          borderColor: "purple.500",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        {/* @ts-ignore */}
        {props.children}
      </Box>
    </Box>
  );
}
const Step1 = () => {
  const options = ["Depressed", "Sad", "Meh", "Ok Ok", "Happy", "Top of the world!"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "emotions",
    defaultValue: "Ok Ok",
    onChange: console.log,
  });

  const group = getRootProps();
  return (
    <>
      <Text color={"purple.500"} fontWeight={"semibold"}>
        Choose how you feel
      </Text>
      <Stack {...group} mt={8} spacing={4} direction={"column"}>
        {options.map((value) => {
          const radio = getRadioProps({ value });
          return (
            <RadioCard key={value} {...radio}>
              {value}
            </RadioCard>
          );
        })}
      </Stack>
    </>
  );
};

const Step2=()=>{
    return(
        <>
        <Text color={"purple.500"} fontWeight={"semibold"}>
            What's the situation ?
        </Text>
        <Textarea borderRadius={4} height={"md"} size={"xl"} resize={"none"} />
        </>
    )
}