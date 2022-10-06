import {
  Divider, SimpleGrid,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  useCheckboxGroup,
  useRadioGroup
} from "@chakra-ui/react";
import { SkipBack, SkipForward } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  appRoutes,
  feelNows,
  negative,
  options,
  positive,
  thoughtDistortions
} from "../AppConstants";
import BasicFormTextArea from "../components/BasicFormTextArea";
import CustomCheckbox from "../components/CustomCheckbox";
import { Loader } from "../components/Loader";
import LottieCreator from "../components/LottieCreator";
import RadioCard from "../components/RadioCard";
import { supabase } from "../helper/supabaseClient";
import useCbtForm from "../hooks/useCbtForm";
import { useToast } from "../hooks/useToast";
import useUser from "../hooks/useUser";
import analyze from "../lotties/analyzeHero.json";
import gratitude from "../lotties/gradtitudeHero.json";
const CBTForm = () => {
  const formType = useCbtForm((state) => state.cbtForm.formType);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const cbtForm = useCbtForm((state) => state.cbtForm);
  const resetCbtForm = useCbtForm((state) => state.resetCbtForm);
  const userId = useUser((state) => state.user.id);
  const [step, setstep] = useState(1);
  const nextStep = () => {
    setstep(step + 1);
  };
  const prevStep = () => {
    setstep(step - 1);
  };
  const handleSubmit = async () => {
    setIsLoading(true);
    cbtForm.user_id = userId;
    try {
      await supabase
        .from("cbtForm")
        .insert([cbtForm])
        .then((data) => {
          resetCbtForm();
          setstep(1);
          toast.success("Entry created");
          navigate(appRoutes.root);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
      toast.error("Hmm something went wrong.");

      setIsLoading(false);
    }
  };
  return (
    <div id="top" className="form-container">
      <div className="form-handler" aria-live="assertive">
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
      </div>

      <div className="form-button-container">
        <Link
          className="outline-button"
          onClick={resetCbtForm}
          to={appRoutes.root}
        >
          Back
        </Link>
        <button
          className="normal-button"
          aria-label={"go to previous form step"}
          onClick={()=>{prevStep(); document.body.scrollIntoView(true)}}
          disabled={step === 1}
        >
          <SkipBack size={28} />
        </button>

        {(formType === "Practise Gratitude" && step === 6) ||
          (formType === "Analyze Thoughts" && step === 9) ? (
          <button className="normal-button" onClick={handleSubmit}>
            {isLoading ? <Loader /> : "Submit"}
          </button>
        ) : (
          <button
            onClick={()=>{nextStep();document.body.scrollIntoView(true)}}
            className={"normal-button"}
            aria-label={"go to next form step"}
          >
            <SkipForward size={28} />
          </button>
        )}
      </div>
    </div>
  );
};

export default CBTForm;

const Step1 = () => {
  //const options = ["Terrible", "Bad", "Meh", "Ok Ok", "Good", "Terrific!"];
  const stepValue = useCbtForm((state) => state.cbtForm.feelBefore);
  const setCbtForm = useCbtForm((state) => state.setCbtForm);
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "emotions",
    value: stepValue,
    defaultValue: "Ok Ok",
    onChange: (am) => setCbtForm("feelBefore", am),
  });
  useEffect(() => {
    if (!stepValue) {
      setCbtForm("feelBefore", options[3]);
    }
  }, [stepValue]);
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
            <div aria-roledescription={"do you feel" + value}>
              <RadioCard key={value} {...radio}>
                {value}
              </RadioCard>
            </div>
          );
        })}
      </Stack>
    </>
  );
};

const Step2 = () => {
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
  const emotions = useCbtForm((state) => state.cbtForm.emotions)
  return (
    <>

      <BasicFormTextArea
        extra={<div className="tags-container">
          {
            emotions?.map((emotion) => (
              <span className="tags">
                {emotion + ' '}
              </span>
            ))
          }

        </div>}
        title="Would you like to elaborate ?"
        placeHolder="Detail out the situation based on your above selections."
        fieldValue={stepValue}
        onChange={(e) => setCbtForm("elaboration", e.target.value)}
      />
    </>
  );
};

const Step4 = () => {
  const feel = useCbtForm((state) => state.cbtForm.feelBefore);
  const stepValue = useCbtForm((state) => state.cbtForm.formType);
  const clearFormTypes = useCbtForm((state) => state.clearFormTypes);
  const setCbtForm = useCbtForm((state) => state.setCbtForm);
  const forms = ["Analyze Thoughts", "Practise Gratitude"];
  const defaultForm: string = ["Meh", "Bad", "Terrible"].includes(feel)
    ? forms[0]
    : forms[1];
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "choose form",
    value: stepValue || undefined,
    defaultValue: defaultForm,
    onChange: (am) => {
      clearFormTypes();
      setCbtForm("formType", am);
    },
  });
  useEffect(() => {
    if (!stepValue) setCbtForm("formType", defaultForm);
  }, [defaultForm, stepValue]);
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
          <BasicFormTextArea
            title="What are you grateful for ?"
            placeHolder="It can range from your biggest victories like overthowing an evil monarch to your smallest like having a good rest."
            onChange={(e) => setCbtForm("gratitudeThoughts", e.target.value)}
            fieldValue={stepValue}
          />
        </>
      ) : (
        <>
            <BasicFormTextArea
              title="What negative thoughts do you have ?"
              placeHolder="Take your time to understand your thought and jot them down"
            onChange={(e) => setCbtForm("negativeThoughts", e.target.value)}
              fieldValue={stepValue}
          />

        </>
      )}
    </>
  );
};

const Step6 = () => {
  const setCbtForm = useCbtForm((state) => state.setCbtForm);
  const stepValue = useCbtForm((state) => state.cbtForm.thoughtDistortions);
  const negativeThoughts = useCbtForm((state) => state.cbtForm.negativeThoughts)

  const { value, getCheckboxProps } = useCheckboxGroup({
    onChange: (val) => setCbtForm("thoughtDistortions", val),
    value: stepValue,
  });
  return (
    <>
      <Text color={"purple.500"} fontWeight={"semibold"}>
        Did you experiece any of the following thought distortions ?
      </Text>
      <div>
        <span className="intro-text-light">Negative Thought:{" "}</span>
        {negativeThoughts}
      </div>
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
  const negativeThoughts = useCbtForm((state) => state.cbtForm.negativeThoughts)
  const distortions = useCbtForm((state) => state.cbtForm.thoughtDistortions)
  return (
    <>
      <BasicFormTextArea
        extra={
          <>
            <div>
              <span className="intro-text-light">Negative Thought:{" "}</span>
              {negativeThoughts}
            </div>
            <div className="tags-container">

              {distortions?.map((emotion) => (
                <span className="tags">
                  {emotion + ' '}
                </span>
              ))}
            </div>
          </>
        }
        title="How can you challenge these thoughts ?"
        placeHolder="What would you say to a dear friend/loved one who is going through the exact same problem and having the same thoughts ?"
        onChange={(e) => setCbtForm("challengeNegative", e.target.value)}
        fieldValue={stepValue}
      />

    </>
  );
};

const Step8 = () => {
  const setCbtForm = useCbtForm((state) => state.setCbtForm);
  const stepValue = useCbtForm((state) => state.cbtForm.reinterpretNegative);
  const negativeThoughts = useCbtForm((state) => state.cbtForm.negativeThoughts)
  const distortions = useCbtForm((state) => state.cbtForm.thoughtDistortions)
  return (
    <>
      <BasicFormTextArea
        extra={
          <>
            <div>
              <span className="intro-text-light">Negative Thought:{" "}</span>
              {negativeThoughts}
            </div>
            <div className="tags-container">
              {distortions?.map((emotion) => (
                <span className="tags">
                  {emotion + ' '}
                </span>
              ))}
            </div>
          </>
        }
        title="What is another way of interpreting the situation ?"
        placeHolder="Is the situation a proven fact ? Has it been debunked before ? Remember the brain is often your biggest enemey and can never really predict the future."
        onChange={(e) => setCbtForm("reinterpretNegative", e.target.value)}
        fieldValue={stepValue}
      />

    </>
  );
};

const Done = () => {
  const setCbtForm = useCbtForm((state) => state.setCbtForm);
  const stepValue = useCbtForm((state) => state.cbtForm.feelAfter);
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "emotions after",
    value: stepValue,
    defaultValue: feelNows[0],
    onChange: (am) => setCbtForm("feelAfter", am),
  });
  useEffect(() => {
    if (!stepValue) setCbtForm("feelAfter", feelNows[0]);
  }, [stepValue]);
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
