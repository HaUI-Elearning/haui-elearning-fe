import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { steps } from "./stepsData";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import "./Stepper.css";
const ForgotPasswordStepper = ({
  onSend,
  onResend,
  onVerify,
  onChangePass,
  sendLoading,
  resendLoading,
  verifyLoading,
  changePassLoading,
  countdown,
  emailUser,
}) => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };
  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };
  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Step1
            onNext={handleNext}
            onSend={onSend}
            sendLoading={sendLoading}
          />
        );
      case 1:
        return (
          <Step2
            onNext={handleNext}
            onResend={onResend}
            onVerify={onVerify}
            resendLoading={resendLoading}
            verifyLoading={verifyLoading}
            countdown={countdown}
            emailUser={emailUser}
          />
        );
      case 2:
        return (
          <Step3
            setActiveStep={setActiveStep}
            onBack={handleBack}
            onResend={onResend}
            onChangePass={onChangePass}
            changePassLoading={changePassLoading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fp-background">
      <Box className="fp-wrapper">
        <Stepper
          activeStep={activeStep}
          sx={{
            mx: "auto",
            maxWidth: 450,
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {renderStepContent()}
      </Box>
    </div>
  );
};

ForgotPasswordStepper.propTypes = {
  onSend: PropTypes.func.isRequired,
  onResend: PropTypes.func.isRequired,
  onVerify: PropTypes.func.isRequired,
  onChangePass: PropTypes.func.isRequired,
  sendLoading: PropTypes.bool.isRequired,
  resendLoading: PropTypes.bool.isRequired,
  verifyLoading: PropTypes.bool.isRequired,
  changePassLoading: PropTypes.bool.isRequired,
  countdown: PropTypes.number.isRequired,
  emailUser: PropTypes.string.isRequired,
};

export default ForgotPasswordStepper;
