import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../AppConstants";
import BasicFormTextArea from "../components/BasicFormTextArea";
import MultiForm from "../components/MultiForm";
import { supabase } from "../helper/supabaseClient";
import useArgumentForm from "../hooks/useArgumentForm";
import { useToast } from "../hooks/useToast";
import useUser from "../hooks/useUser";

const ArgumentForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const smartForm = useArgumentForm((state) => state.argumentForm);
  const resetCbtForm = useArgumentForm((state) => state.resetArgumentForm);
  const userId = useUser((state) => state.user.id);
  const [step, setstep] = useState(1);
  const handleSubmit = async () => {
    setIsLoading(true);
    smartForm.user_id = userId;
    try {
      await supabase
        .from("argument")
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
      renderSteps={step === 1 ? (
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
    const setForm = useArgumentForm((state)=>state.setArgumentForm)
    const fieldValue = useArgumentForm((state)=>state.argumentForm.whatSaid)

    return(
        <>
            <BasicFormTextArea
                title="Write down exactly what the other person said during the argument.Be brief, Then list the emotions the other person might have been feeling."
                fieldValue={fieldValue}
                onChange={(e)=>setForm("whatSaid", e.target.value)}
            />
        </>
    )
}

const Step2=()=>{
    const setForm = useArgumentForm((state)=>state.setArgumentForm)
    const fieldValue = useArgumentForm((state)=>state.argumentForm.whatYouSaid)

    return(
        <>
            <BasicFormTextArea
                title="Write down exactly what you said next.Then,list the emotions you were feeling."
                fieldValue={fieldValue}
                onChange={(e)=>setForm("whatYouSaid", e.target.value)}
            />
        </>
    )
}

const Step3=()=>{
    const setForm = useArgumentForm((state)=>state.setArgumentForm)
    const fieldValue = useArgumentForm((state)=>state.argumentForm.didYouAck)

    return(
        <>
            <BasicFormTextArea
                title="Did you acknowledge or ignore the other person's feelings ? Did you express your feelings openly and directly? Was your attitude respectful and caring ?"
                fieldValue={fieldValue}
                onChange={(e)=>setForm("didYouAck", e.target.value)}
            />
        </>
    )
}

const Step4=()=>{
    const setForm = useArgumentForm((state)=>state.setArgumentForm)
    const fieldValue = useArgumentForm((state)=>state.argumentForm.howDidOtherFeel)

    return(
        <>
            <BasicFormTextArea
                title="How did it make the other person feel ? What did they say next ? Did your response make the problem better or worse ?"
                fieldValue={fieldValue}
                onChange={(e)=>setForm("howDidOtherFeel", e.target.value)}
            />
        </>
    )
}

const Step5=()=>{
    const setForm = useArgumentForm((state)=>state.setArgumentForm)
    const fieldValue = useArgumentForm((state)=>state.argumentForm.howCanRevise)

    return(
        <>
            <BasicFormTextArea
                title="Finally how can you revise your response using more empathy,assertiveness and respect ?"
                fieldValue={fieldValue}
                onChange={(e)=>setForm("howCanRevise", e.target.value)}
            />
        </>
    )
}
export default ArgumentForm;
