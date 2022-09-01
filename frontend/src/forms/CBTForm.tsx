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
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  useRadio,
  useRadioGroup,
  UseRadioProps,
} from "@chakra-ui/react";
import React from "react";
import RadioCard from "../components/RadioCard";
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
        <Step2 />
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

const Step1 = () => {
  const options = [
    "Depressed",
    "Sad",
    "Meh",
    "Ok Ok",
    "Happy",
    "Top of the world!",
  ];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "emotions",
    defaultValue: "Ok Ok",
    onChange: (am) => console.log("what", am),
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

const Step2 = () => {
  const positive = [
    "Calm",
    "Confident",
    "Content",
    "Excited",
    "Fulfilled",
    "Grateful",
    "Happy",
    "Hopeful",
    "Inspired",
    "Loved",
    "Motivated",
    "Peaceful",
    "Proud",
    "Relived",
  ];
  const negative = [
    "Annoyed",
    "Anxious",
    "Disapointed",
    "Empty",
    "Frustrated",
    "Guilty",
    "Hopeless",
    "Lonely",
    "Nervous",
    "Overwhelmed",
    "Sad",
    "Stressed",
    "Tired",
    "Worried",
  ];
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "feels",
    onChange: (am) => console.log("what", am),
  });

  const group = getRootProps();
  return (
    <>
      <Text color={"purple.500"} fontWeight={"semibold"}>
        What emotions did you feel ?
      </Text>
      <Tabs
        mt={8}
        align="center"
        isFitted
        variant="soft-rounded"
        colorScheme={"purple"}
      >
        <TabList>
          <Tab>Negative</Tab>
          <Tab>Positive</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <SimpleGrid gap={4} {...group} columns={3}>
              {negative.map((value) => {
                const radio = getRadioProps({ value });
                return (
                  <RadioCard key={value} {...radio}>
                    {value}
                  </RadioCard>
                );
              })}
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
          <SimpleGrid gap={4} {...group} columns={3}>
              {positive.map((value) => {
                const radio = getRadioProps({ value });
                return (
                  <RadioCard key={value} {...radio}>
                    {value}
                  </RadioCard>
                );
              })}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
