import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../AppConstants";
import BasicFormTextArea from "../components/BasicFormTextArea";
import MultiForm from "../components/MultiForm";
import { supabase } from "../helper/supabaseClient";
import { useToast } from "../hooks/useToast";
import useUser from "../hooks/useUser";
import useWorryForm from "../hooks/useWorryForm";

const WorryForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const smartForm = useWorryForm((state) => state.worryForm);
  const resetCbtForm = useWorryForm((state) => state.resetWorryForm);
  const userId = useUser((state) => state.user.id);
  const [step, setstep] = useState(1);
  const handleSubmit = async () => {
    setIsLoading(true);
    smartForm.user_id = userId;
    try {
      await supabase
        .from("worry")
        .insert([smartForm])
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
  const nextStep = () => {
    setstep(step + 1);
  };
  const prevStep = () => {
    setstep(step - 1);
  };
  return (
    <MultiForm
      prevStep={prevStep}
      nextStep={nextStep}
      resetForm={resetCbtForm}
      isPrevDisabled={step === 1}
      maxButton={step == 5}
      isLoading={isLoading}
      handleSubmit={handleSubmit}
      renderSteps={ step === 1 ? (
        <Step1 />
      ) : step === 2 ? (
        <Step2 />
      ) : step === 3 ? (
        <Step3 />
      ) : step === 4 ? (
        <Step4 />
      ) : step === 5 && (
        <Step5 />
      )}
    />
  );
};

const Step1=()=>{
    const setForm = useWorryForm((state)=>state.setWorryForm)
    const fieldValue = useWorryForm((state)=>state.worryForm.currentWorry)

    return(
        <>
            <BasicFormTextArea
                title="What are you currently worried about ?"
                fieldValue={fieldValue}
                onChange={(e)=>setForm("currentWorry", e.target.value)}
            />
        </>
    )
}
const Step2=()=>{
    const setForm = useWorryForm((state)=>state.setWorryForm)
    const fieldValue = useWorryForm((state)=>state.worryForm.historical)

    return(
        <>
            <BasicFormTextArea
                title="What are some examples or past experience to suggest your worry isn't true ?"
                fieldValue={fieldValue}
                onChange={(e)=>setForm("historical", e.target.value)}
            />
        </>
    )
}

const Step3=()=>{
    const setForm = useWorryForm((state)=>state.setWorryForm)
    const fieldValue = useWorryForm((state)=>state.worryForm.ifNotTrueThen)

    return(
        <>
            <BasicFormTextArea
                title="If your worry isnt true,what is the most probable scenario ?"
                fieldValue={fieldValue}
                onChange={(e)=>setForm("ifNotTrueThen", e.target.value)}
            />
        </>
    )
}
const Step4=()=>{
    const setForm = useWorryForm((state)=>state.setWorryForm)
    const fieldValue = useWorryForm((state)=>state.worryForm.ifTrueThen)

    return(
        <>
            <BasicFormTextArea
                title="If your worry does come true,how will you be able to work through it ?"
                fieldValue={fieldValue}
                onChange={(e)=>setForm("ifTrueThen", e.target.value)}
            />
        </>
    )
}

const Step5=()=>{
    const setForm = useWorryForm((state)=>state.setWorryForm)
    const fieldValue = useWorryForm((state)=>state.worryForm.future)

    return(
        <>
            <BasicFormTextArea
                title="What are the chances that you will eventually be okay one day from now ? One week? One year ?"
                fieldValue={fieldValue}
                onChange={(e)=>setForm("future", e.target.value)}
            />
        </>
    )
}
export default WorryForm;
