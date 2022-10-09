import { SkipBack, SkipForward } from "phosphor-react";
import React, { FunctionComponent, ReactNode } from "react";
import { Link } from "react-router-dom";
import { appRoutes } from "../AppConstants";
import { Loader } from "./Loader";

const MultiForm: FunctionComponent<{
  prevStep: () => void;
  nextStep: () => void;
  renderSteps: ReactNode;
  resetForm: () => void;
  isPrevDisabled: boolean;
  maxButton: boolean;
  isLoading: boolean;
  handleSubmit: () => void;
}> = ({
  renderSteps,
  isLoading,
  handleSubmit,
  nextStep,
  maxButton,
  isPrevDisabled,
  resetForm,
  prevStep,
}) => {
  return (
    <div className="form-container">
      <div className="form-handler" aria-live="assertive">
        {renderSteps}
      </div>
      <div className="form-button-container">
        <Link
          className="outline-button"
          onClick={resetForm}
          to={appRoutes.root}
        >
          Back
        </Link>
        <button
          className="normal-button"
          aria-label={"go to previous form step"}
          onClick={prevStep}
          disabled={isPrevDisabled}
        >
          <SkipBack size={28} />
        </button>
        {maxButton ? (
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
  );
};

export default MultiForm;
