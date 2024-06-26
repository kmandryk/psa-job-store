/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn, UseFormTrigger } from 'react-hook-form';
import { JobProfileValidationModel } from '../../job-profiles/components/job-profile.component';
import WizardTextField from './wizard-edit-profile-text-field';

interface SingleTextFieldProps {
  useFormReturn: UseFormReturn<JobProfileValidationModel, any, undefined>;
  trigger: UseFormTrigger<JobProfileValidationModel>;
  formErrors: any;
}

const WizardTitle: React.FC<SingleTextFieldProps> = ({ useFormReturn, formErrors, trigger }) => {
  return (
    <WizardTextField
      name="title"
      label="Job title"
      placeholder="Ex.: Program Assistant"
      testId="job-title"
      trigger={trigger}
      formErrors={formErrors}
      useFormReturn={useFormReturn}
      jobTitleWarning={true}
    />
  );
};

export default WizardTitle;
