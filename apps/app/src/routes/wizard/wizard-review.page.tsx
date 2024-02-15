import { Collapse, Modal } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useUpdatePositionRequestMutation } from '../../redux/services/graphql-api/position-request.api';
import { JobProfile } from '../job-profiles/components/job-profile.component';
import { WizardSteps } from '../wizard/components/wizard-steps.component';
import WizardEditControlBar from './components/wizard-edit-control-bar';
import { WizardPageWrapper } from './components/wizard-page-wrapper.component';
import { useWizardContext } from './components/wizard.provider';
import './wizard-review.page.css';

interface WizardReviewPageProps {
  onNext?: () => void;
  onBack?: () => void;
}

export const diffLegendContent = (
  <>
    <p>
      <b>Changes legend:</b>
    </p>
    <p style={{ marginBottom: '-12px' }}>
      <span style={{ textDecoration: 'line-through' }}>Strikethrough</span> means removed text.<br></br>
      <span style={{ backgroundColor: 'yellow' }}>Highlighted text</span> means added text.
    </p>
  </>
);

export const WizardReviewPage: React.FC<WizardReviewPageProps> = ({ onNext, onBack }) => {
  const [updatePositionRequest] = useUpdatePositionRequestMutation();
  const { wizardData, positionRequestId } = useWizardContext();

  const onNextCallback = async () => {
    try {
      if (positionRequestId) {
        await updatePositionRequest({ id: positionRequestId, step: 4 }).unwrap();
        if (onNext) onNext();
        // navigate('/wizard/confirm');
      }
    } catch (error) {
      // Handle the error, possibly showing another modal
      Modal.error({
        title: 'Error updating position request',
        content: 'An unknown error occurred', //error.data?.message ||
      });
    }
  };

  const onBackCallback = async () => {
    if (positionRequestId) {
      await updatePositionRequest({ id: positionRequestId, step: 2 }).unwrap();
      if (onBack) onBack();
    }
    // navigate(-1);
  };

  const [showDiff, setShowDiff] = useState(true);

  const handleToggleShowDiff = (checked: boolean) => {
    setShowDiff(checked);
  };

  const [hasScrolledPast, setHasScrolledPast] = useState(false);

  const handleScroll = () => {
    const layoutScrollContainer = document.querySelector('.ant-layout > div > div') as HTMLElement;
    if (layoutScrollContainer && collapseRef.current) {
      const collapseTop = collapseRef.current.getBoundingClientRect().top;
      const containerTop = layoutScrollContainer.getBoundingClientRect().top;

      // Check if the Collapse top is above the container top
      setHasScrolledPast(collapseTop < containerTop);
    }
  };

  useEffect(() => {
    const layoutScrollContainer = document.querySelector('.ant-layout > div > div');
    if (layoutScrollContainer) {
      layoutScrollContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (layoutScrollContainer) {
        layoutScrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const collapseRef = useRef<HTMLDivElement>(null);

  return (
    <WizardPageWrapper
      title="New position"
      subTitle="View the edits you've made to the generic profile. Review to make sure it meets your requirements."
      xxl={14}
      xl={18}
    >
      <WizardSteps current={3} xl={24}></WizardSteps>
      <WizardEditControlBar
        onNext={onNextCallback}
        onBack={onBackCallback}
        onToggleShowDiff={handleToggleShowDiff}
        showDiffToggle={true}
        showDiff={showDiff}
        nextText="Save and Next"
      />
      <Collapse
        ref={collapseRef}
        bordered={false}
        ghost
        activeKey={showDiff ? ['1'] : []} // Control the active key based on showDiff
        className={hasScrolledPast ? 'no-animation' : ''}
      >
        <Collapse.Panel key="1" showArrow={false} header="">
          {diffLegendContent}
        </Collapse.Panel>
      </Collapse>
      <JobProfile
        style={{ marginTop: '1rem' }}
        profileData={wizardData}
        showBackToResults={false}
        showDiff={showDiff}
        id={wizardData?.id.toString()}
        showBasicInfo={false}
      />
    </WizardPageWrapper>
  );
};
