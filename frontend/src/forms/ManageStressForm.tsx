import { SkipBack, SkipForward } from "phosphor-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { appRoutes } from "../AppConstants";
import BasicFormTextArea from "../components/BasicFormTextArea";
import { Loader } from "../components/Loader";
import MultiForm from "../components/MultiForm";
import { supabase } from "../helper/supabaseClient";
import useManageStressForm from "../hooks/useManageStressForm";
import { useToast } from "../hooks/useToast";
import useUser from "../hooks/useUser";

const ManageStressForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const smartForm = useManageStressForm((state) => state.stressForm);
  const resetCbtForm = useManageStressForm((state) => state.resetStressForm);
  const userId = useUser((state) => state.user.id);
  const [step, setstep] = useState(1);
  const handleSubmit = async () => {
    setIsLoading(true);
    smartForm.user_id = userId;
    try {
      await supabase
        .from("stressManagement")
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
          maxButton={step == 6}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
          renderSteps={
            step === 1 ? (
              <Step1 />
            ) : step === 2 ? (
              <Step2 />
            ) : step === 3 ? (
              <Step3 />
            ) : step === 4 ? (
              <Step4 />
            ) : step === 5 ? (
              <Step5 />
            ) : (
              step === 6 && <Step6 />
            )
          }
        />
  );
};
const Step1 = () => {
  const setCbtForm = useManageStressForm((state) => state.setStressForm);
  const fieldValue = useManageStressForm((state) => state.stressForm.cause);
  return (
    <>
      <BasicFormTextArea
        title="What are you currently stressed about ?"
        placeHolder="Take a moment to analyze the root cause."
        fieldValue={fieldValue}
        onChange={(e) => setCbtForm("cause", e.target.value)}
      />
    </>
  );
};
const Step2 = () => {
  const setCbtForm = useManageStressForm((state) => state.setStressForm);
  const fieldValue = useManageStressForm((state) => state.stressForm.source);
  return (
    <>
      <BasicFormTextArea
        title="What is the source if this stress ?"
        placeHolder="Is it work ? Health? Friends or Family ? etc."
        fieldValue={fieldValue}
        onChange={(e) => setCbtForm("source", e.target.value)}
      />
    </>
  );
};
const Step3 = () => {
  const setCbtForm = useManageStressForm((state) => state.setStressForm);
  const fieldValue = useManageStressForm(
    (state) => state.stressForm.stressInfo
  );
  return (
    <>
      <BasicFormTextArea
        title="What is this stress telling you ?"
        placeHolder="Any lessons to be learned ?"
        fieldValue={fieldValue}
        onChange={(e) => setCbtForm("stressInfo", e.target.value)}
      />
    </>
  );
};

const Step4 = () => {
  const setCbtForm = useManageStressForm((state) => state.setStressForm);
  const fieldValue = useManageStressForm(
    (state) => state.stressForm.isWithinControl
  );
  return (
    <>
      <BasicFormTextArea
        title="What is within your control that you can change ?"
        placeHolder="This that you can do right now to help you reduce stress."
        fieldValue={fieldValue}
        onChange={(e) => setCbtForm("isWithinControl", e.target.value)}
      />
    </>
  );
};

const Step5 = () => {
  const setCbtForm = useManageStressForm((state) => state.setStressForm);
  const fieldValue = useManageStressForm(
    (state) => state.stressForm.isOutOfControl
  );
  return (
    <>
      <BasicFormTextArea
        title="What is out of your control that you can accept or let go ?"
        placeHolder="Remember the prayer of serenity, accept the things you cannot change/ out of your control."
        fieldValue={fieldValue}
        onChange={(e) => setCbtForm("isOutOfControl", e.target.value)}
      />
    </>
  );
};

const Step6 = () => {
  const setCbtForm = useManageStressForm((state) => state.setStressForm);
  const fieldValue = useManageStressForm(
    (state) => state.stressForm.canDoToReduce
  );
  return (
    <>
      <BasicFormTextArea
        title="What is one thing you can do right now to reduce your stress ?"
        placeHolder="Maybe watch a movie, youtube, listen to music or read a book."
        fieldValue={fieldValue}
        onChange={(e) => setCbtForm("canDoToReduce", e.target.value)}
      />
    </>
  );
};
export default ManageStressForm;
