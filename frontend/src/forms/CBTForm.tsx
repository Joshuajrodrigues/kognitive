import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  IconButton,
  SimpleGrid,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  useCheckboxGroup,
  useRadioGroup,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CustomCheckbox from "../components/CustomCheckbox";
import RadioCard from "../components/RadioCard";
import LottieCreator from "../components/sideBanner/LottieCreator";
import useCbtForm from "../hooks/useCbtForm";
import gratitude from "../lotties/gradtitudeHero.json";
import analyze from "../lotties/analyzeHero.json";
const CBTForm = () => {
  const formType = useCbtForm((state) => state.cbtForm.formType);
  const [step, setstep] = useState(1);
  const nextStep = () => {
    setstep(step + 1);
  };
  const prevStep = () => {
    setstep(step - 1);
  };
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
        overflow={"scroll"}
      >
        {step === 1 ? (
          <Step1 />
        ) : step === 2 ? (
          <Step2 />
        ) : step === 3 ? (
          <Step3 />
        ) : step === 4 ? (
          <Step4 />
        ) : step === 5 ? (
          <Step5 />
        ) : step === 6 && formType === "Practise Gratitude" ? (
          <Done />
        ) : step === 6 && formType === "Analyze Thoughts" ? (
          <Step6 />
        ) : step === 7 ? (
          <Step7 />
        ) : step === 8 ? (
          <Step8 />
        ) : (
          <Done />
        )}
      </Box>

      <Flex justifyContent={"space-around"} className="navigation">
        <IconButton
          disabled={step === 1}
          onClick={prevStep}
          colorScheme={"purple"}
          icon={<ArrowLeftIcon />}
          aria-label={"go previous button"}
        />
        {(formType === "Practise Gratitude" && step === 6 || formType === "Analyze Thoughts" && step === 9 ) ? (
          <Button colorScheme={"purple"}>Submit</Button>
        ) :
        
        (
          <IconButton
            onClick={nextStep}
            colorScheme={"purple"}
            icon={<ArrowRightIcon />}
            aria-label={"go next button"}
          />
        )}
      </Flex>
    </div>
  );
};

export default CBTForm;

const Step1 = () => {
  const options = ["Terrible", "Bad", "Meh", "Ok Ok", "Good", "Terrific!"];
  const stepValue = useCbtForm((state) => state.cbtForm.feelBefore);
  const setCbtForm = useCbtForm((state) => state.setCbtForm);
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "emotions",
    value: stepValue,
    defaultValue: "Ok Ok",
    onChange: (am) => setCbtForm("feelBefore", am),
  });
  useEffect(() => {
    setCbtForm("feelBefore", options[3]);
  }, []);
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
  const setCbtForm = useCbtForm((state) => state.setCbtForm);
  const feel = useCbtForm((state) => state.cbtForm.feelBefore);
  const stepValue = useCbtForm((state) => state.cbtForm.emotions);
  const { value, getCheckboxProps } = useCheckboxGroup({
    onChange: (val) => setCbtForm("emotions", val),
    value: stepValue,
  });

  return (
    <>
      <Text color={"purple.500"} fontWeight={"semibold"}>
        What emotions did you feel ?
      </Text>
      <Tabs
        mt={8}
        align="center"
        defaultIndex={["Meh", "Bad", "Terrible"].includes(feel) ? 0 : 1}
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
            <SimpleGrid gap={2} columns={2}>
              {negative.map((value) => {
                return <CustomCheckbox {...getCheckboxProps({ value })} />;
              })}
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <SimpleGrid gap={2} columns={2}>
              {positive.map((value) => {
                return <CustomCheckbox {...getCheckboxProps({ value })} />;
              })}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

const Step3 = () => {
  const setCbtForm = useCbtForm((state) => state.setCbtForm);
  const stepValue = useCbtForm((state) => state.cbtForm.elaboration);
  return (
    <>
      <Text color={"purple.500"} fontWeight={"semibold"}>
        Would you like to elaborate ?
      </Text>
      <Textarea
        value={stepValue}
        onChange={(e) => setCbtForm("elaboration", e.target.value)}
        color={"purple.600"}
        height={"lg"}
      />
    </>
  );
};

const Step4 = () => {
  const feel = useCbtForm((state) => state.cbtForm.feelBefore);
  const stepValue = useCbtForm((state) => state.cbtForm.formType);
  const setCbtForm = useCbtForm((state) => state.setCbtForm);
  const forms = ["Analyze Thoughts", "Practise Gratitude"];
  const defaultForm: string = ["Meh", "Bad", "Terrible"].includes(feel)
    ? forms[0]
    : forms[1];
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "choose form",
    value: stepValue || undefined,
    defaultValue: defaultForm,
    onChange: (am) => setCbtForm("formType", am),
  });
  useEffect(() => {
    setCbtForm("formType", defaultForm);
  }, [defaultForm]);
  const group = getRootProps();
  return (
    <>
      <Text color={"purple.500"} fontWeight={"semibold"}>
        What would you like to work on ?
      </Text>
      {["Meh", "Bad", "Terrible"].includes(feel) ? (
        <Stack {...group} mt={8} spacing={4} direction={"column"}>
          {forms.map((value, index) => {
            const radio = getRadioProps({ value });
            return (
              <>
                <RadioCard key={value} {...radio}>
                  <>
                    {value} {index === 0 ? "(Recomended)" : ""}
                    <LottieCreator
                      src={value === forms[0] ? analyze : gratitude}
                      style={{ width: "150px", height: "100px" }}
                      loop
                    />
                  </>
                </RadioCard>
                <Divider />
              </>
            );
          })}
        </Stack>
      ) : (
        <Stack {...group} mt={8} spacing={4} direction={"column"}>
          {forms.reverse().map((value, index) => {
            const radio = getRadioProps({ value });
            return (
              <>
                <RadioCard key={value} {...radio}>
                  <>
                    {value} {index === 0 ? "(Recomended)" : ""}
                    <LottieCreator
                      src={value === forms[1] ? analyze : gratitude}
                      style={{ width: "150px", height: "100px" }}
                      loop
                    />
                  </>
                </RadioCard>
                <Divider />
              </>
            );
          })}
        </Stack>
      )}
    </>
  );
};

const Step5 = () => {
  const form = useCbtForm((state) => state.cbtForm.formType);
  const stepValue = useCbtForm(
    (state) =>
      state.cbtForm[
        form === "Practise Gratitude" ? "gratitudeThoughts" : "negativeThoughts"
      ]
  );
  const setCbtForm = useCbtForm((state) => state.setCbtForm);

  return (
    <>
      {form === "Practise Gratitude" ? (
        <>
          <Text color={"purple.500"} fontWeight={"semibold"}>
            What are you grateful for ?
          </Text>
          <Textarea
            mt={8}
            value={stepValue}
            onChange={(e) => setCbtForm("gratitudeThoughts", e.target.value)}
            color={"purple.600"}
            height={"lg"}
          />
        </>
      ) : (
        <>
          <Text color={"purple.500"} fontWeight={"semibold"}>
            What negative thoughts do you have ?
          </Text>
          <Textarea
            value={stepValue}
            onChange={(e) => setCbtForm("negativeThoughts", e.target.value)}
            color={"purple.600"}
            height={"lg"}
          />
        </>
      )}
    </>
  );
};

const Step6 = () => {
  const setCbtForm = useCbtForm((state) => state.setCbtForm);
  const stepValue = useCbtForm((state) => state.cbtForm.thoughtDistortions);
  const thoughtDistortions = [
    {
      id: 1,
      name: "Catastrophizing",
      desc: "What if the worst happens ?",
    },
    {
      id: 2,
      name: "All-or-nothing thinking",
      desc: "I am a total failure.",
    },
    {
      id: 3,
      name: "Emotional Reasoning",
      desc: "I feel this way so it must be true.",
    },
    {
      id: 4,
      name: "Magnification of the Negative",
      desc: "I totally ruined everything.",
    },
    {
      id: 5,
      name: "Minimization of the Positive",
      desc: "They didnt really mean that.",
    },
    {
      id: 6,
      name: "Jumping to conclusions",
      desc: "She didnt say hi so she hates me.",
    },
    {
      id: 7,
      name: "Fortune telling",
      desc: "I will fail my exam.",
    },
    {
      id: 8,
      name: "Mind Reading",
      desc: "He doesnt want to talk to me.",
    },
    {
      id: 9,
      name: "Self Blaming",
      desc: "This is my fault.",
    },
    {
      id: 10,
      name: "Other blaming",
      desc: "This is thier fault.",
    },
    {
      id: 11,
      name: "Filtering out Positive",
      desc: "Nothing good happened today.",
    },
    {
      id: 12,
      name: "Overgeneralizing",
      desc: "Everyone dislikes me.",
    },
    {
      id: 13,
      name: "Labelig",
      desc: "I am a loser.",
    },
    {
      id: 14,
      name: "Should/Must Comments",
      desc: "I should have done this.",
    },
  ];
  const { value, getCheckboxProps } = useCheckboxGroup({
    onChange: (val) => setCbtForm("thoughtDistortions", val),
    value: stepValue,
  });
  return (
    <>
      <Text color={"purple.500"} fontWeight={"semibold"}>
        Did you experiece any of the following thought distortions ?
      </Text>
      <SimpleGrid mt={8} gap={2} columns={1}>
        {thoughtDistortions.map((value) => {
          return (
            <CustomCheckbox
              desc={value.desc}
              {...getCheckboxProps({ value: value.name })}
            />
          );
        })}
      </SimpleGrid>
    </>
  );
};

const Step7 = () => {
  const setCbtForm = useCbtForm((state) => state.setCbtForm);
  const stepValue = useCbtForm((state) => state.cbtForm.challengeNegative);
  return (
    <>
      <Text color={"purple.500"} fontWeight={"semibold"}>
        How can you challenge your negative thought/s ?
      </Text>
      <Textarea
        value={stepValue}
        onChange={(e) => setCbtForm("negativeThoughts", e.target.value)}
        color={"purple.600"}
        mt={4}
        height={"lg"}
      />
    </>
  );
};

const Step8 = () => {
  const setCbtForm = useCbtForm((state) => state.setCbtForm);
  const stepValue = useCbtForm((state) => state.cbtForm.reinterpretNegative);
  return (
    <>
      <Text color={"purple.500"} fontWeight={"semibold"}>
        What is another way of interpreting the situation ?
      </Text>
      <Textarea
        value={stepValue}
        onChange={(e) => setCbtForm("reinterpretNegative", e.target.value)}
        color={"purple.600"}
        mt={4}
        height={"lg"}
      />
    </>
  );
};

const Done = () => {
  const feelNows = [
    "Better than before",
    "About the same",
    "Worse than before",
  ];
  const setCbtForm = useCbtForm((state) => state.setCbtForm);
  const stepValue = useCbtForm((state) => state.cbtForm.feelAfter);
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "emotions after",
    value: stepValue,
    defaultValue:feelNows[1],
    onChange: (am) => setCbtForm("feelAfter", am),
  });
  useEffect(()=>{
    setCbtForm("feelAfter", feelNows[1])
  },[])
  const group = getRootProps();
  return (
    <>
      <Text color={"purple.500"} fontWeight={"semibold"}>
        How are you feeling now ?
      </Text>
      <Stack {...group} mt={8} spacing={4} direction={"column"}>
        {feelNows.map((value) => {
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
