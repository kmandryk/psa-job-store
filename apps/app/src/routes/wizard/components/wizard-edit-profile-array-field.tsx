/* eslint-disable @typescript-eslint/no-explicit-any */
import { InfoCircleOutlined } from '@ant-design/icons';
import { Form, Tooltip, Typography } from 'antd';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import AccessibleList from '../../../components/app/common/components/accessible-list';
import { JobProfileValidationModel } from '../../job-profiles/components/job-profile.component';
import useFormFields from '../hooks/wizardUseFieldArray';
import WizardEditAddButton from './wizard-edit-profile-add-button';
import WizardEditProfileListItem, { AllowedFieldNames } from './wizard-edit-profile-list-item';
import WizardValidationError from './wizard-edit-profile-validation-error';
import './wizard-edit-profile.css';

interface WizardEditProfileArrayFieldProps {
  useFormReturn: UseFormReturn<JobProfileValidationModel, any, undefined>;
  originalFields: any[];
  validateVerification: () => void;
  label: string;
  description?: string;
  tooltip?: string;
  fieldName: AllowedFieldNames;
  testId: string;
  addButtonText: string;
  editedFields?: { [key: number]: boolean };
  setEditedFields?: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>;
  formErrors?: any;
}

const WizardEditProfileArrayField: React.FC<WizardEditProfileArrayFieldProps> = ({
  useFormReturn,
  originalFields,
  validateVerification,
  label,
  description,
  tooltip,
  fieldName,
  testId,
  addButtonText,
  editedFields,
  setEditedFields,
  formErrors,
}) => {
  const { fields, handleRemove, handleAddBack, handleAddNew, handleReset } = useFormFields({
    useFormReturn,
    fieldName,
    originalFields,
    setEditedFields,
  });

  const renderFields = (field: any, index: number) => {
    const commonProps = {
      field,
      index,
      useFormReturn,
      validateVerification,
      handleReset,
      handleAddBack,
      handleRemove,
      originalFields,
      editedFields,
      setEditedFields,
    };

    return <WizardEditProfileListItem {...commonProps} fieldName={fieldName} testId={testId} />;
  };

  return (
    <>
      <Form.Item
        label={
          !tooltip ? (
            label
          ) : (
            <span>
              {label}{' '}
              <Tooltip title={tooltip}>
                <InfoCircleOutlined style={{ cursor: 'pointer', fontSize: '0.9rem' }} />
              </Tooltip>
            </span>
          )
        }
        labelCol={{ className: 'card-label' }}
        className="label-only"
        colon={false}
      ></Form.Item>
      {description && <Typography.Paragraph type="secondary">{description}</Typography.Paragraph>}
      {fields.length > 0 && <AccessibleList dataSource={fields} ariaLabel={label} renderItem={renderFields} />}

      <WizardValidationError formErrors={formErrors} fieldName={fieldName} />

      <WizardEditAddButton
        testId={`add-${testId}-button`}
        onClick={() => {
          handleAddNew();
        }}
      >
        {addButtonText}
      </WizardEditAddButton>
    </>
  );
};

export default WizardEditProfileArrayField;
