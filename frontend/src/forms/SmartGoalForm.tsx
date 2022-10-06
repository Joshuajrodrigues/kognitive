import { Text, Textarea } from '@chakra-ui/react'
import { SkipBack, SkipForward } from 'phosphor-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { appRoutes } from '../AppConstants'
import BasicFormTextArea from '../components/BasicFormTextArea'
import { Loader } from '../components/Loader'
import { supabase } from '../helper/supabaseClient'
import useSMARTForm from '../hooks/useSMARTForm'
import { useToast } from '../hooks/useToast'
import useUser from '../hooks/useUser'

const SmartGoalForm = () => {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const smartForm = useSMARTForm((state) => state.smartForm)
    const resetCbtForm = useSMARTForm((state) => state.resetSmartForm);
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
        smartForm.user_id = userId
        try {
            await supabase
                .from("SMARTGoals")
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
    }
    return (
        <div className="form-container">
            <div className="form-handler" aria-live="assertive">
                {step === 1 ? (
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
                    onClick={prevStep}
                    disabled={step === 1}
                >
                    <SkipBack size={28} />
                </button>
                {
                    step === 5 ? (
                        <button className="normal-button" onClick={handleSubmit}>
                            {isLoading ? <Loader /> : "Submit"}
                        </button>
                    ) : (
                        <button
                            onClick={nextStep}
                            className={"normal-button"}
                            aria-label={"go to next form step"}
                        >
                            <SkipForward size={28} />
                        </button>
                    )}
            </div>
        </div>
    )
}

export default SmartGoalForm

const Step1 = () => {
    const setCbtForm = useSMARTForm((state) => state.setSmartForm);
    const fieldValue = useSMARTForm((state) => state.smartForm.goal)
    return (
        <>
            <BasicFormTextArea
                title='  What is one goal you want to work towards ? Think who, what, where and when..'
                placeHolder='What do I want to accomplish ? Why do I want this ? What are the requirments? What are the constrainets ? '
                fieldValue={fieldValue}
                onChange={(e) => setCbtForm("goal", e.target.value)}
            />

        </>
    );
};
const Step2 = () => {
    const setCbtForm = useSMARTForm((state) => state.setSmartForm);
    const fieldValue = useSMARTForm((state) => state.smartForm.measure)
    return (
        <>
            <BasicFormTextArea
                title='Track your progress.'
                placeHolder='How will I measure my progress ? How will I know when the goal is accomplished ? '
                fieldValue={fieldValue}
                onChange={(e) => setCbtForm("measure", e.target.value)}
            />

        </>
    );
};
const Step3 = () => {
    const setCbtForm = useSMARTForm((state) => state.setSmartForm);
    const fieldValue = useSMARTForm((state) => state.smartForm.specifics)
    return (
        <>
            <BasicFormTextArea
                title='What will you do to achive your goal ?'
                placeHolder='How can the goal be accomplished? What are the logical steps I should take ?'
                fieldValue={fieldValue}
                onChange={(e) => setCbtForm("specifics", e.target.value)}
            />

        </>
    );
};
const Step4 = () => {
    const setCbtForm = useSMARTForm((state) => state.setSmartForm);
    const fieldValue = useSMARTForm((state) => state.smartForm.archivable)
    return (
        <>
            <BasicFormTextArea
                title='Is your goal achievable ?'
                placeHolder='Is this a worthwhile goal ? Is it the right time ? Do I have all the resources to get this done ? Is it in line with my long term objective ?'
                fieldValue={fieldValue}
                onChange={(e) => setCbtForm("archivable", e.target.value)}
            />

        </>
    );
};
const Step5 = () => {
    const setCbtForm = useSMARTForm((state) => state.setSmartForm);
    const fieldValue = useSMARTForm((state) => state.smartForm.timebound)
    return (
        <>
            <BasicFormTextArea
                title='How long will it take to complete ?'
                placeHolder='How long will it take to compelete this goal ? When is it due ? When am I going to work on this goal ?'
                fieldValue={fieldValue}
                onChange={(e) => setCbtForm("timebound", e.target.value)}
            />

        </>
    );
};
