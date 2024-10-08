import React, { ReactElement, useEffect, useState } from 'react';
import { JobProfileModel } from '../../../redux/services/graphql-api/job-profile-types';
import { useUpdateJobProfileViewCountMutation } from '../../../redux/services/graphql-api/job-profile.api'; // Adjust the import according to your project structure

interface JobProfileViewCounterProps {
  children: ReactElement;
  onProfileView: ((profile: JobProfileModel) => void) | undefined;
}

const JobProfileViewCounter: React.FC<JobProfileViewCounterProps> = ({ children, onProfileView }) => {
  const [updateJobProfileViewCount] = useUpdateJobProfileViewCountMutation();
  const [viewedJobProfiles, setViewedJobProfiles] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (viewedJobProfiles.size > 0) {
      const timeout = setTimeout(() => {
        updateJobProfileViewCount({ jobProfiles: Array.from(viewedJobProfiles) });
        setViewedJobProfiles(new Set());
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [viewedJobProfiles, updateJobProfileViewCount]);

  const updateJobProfileViewCountCache = (profile: JobProfileModel) => {
    setViewedJobProfiles((prevViewedJobProfiles) => new Set(prevViewedJobProfiles.add(profile.id)));
    onProfileView && onProfileView(profile);
  };

  return (
    <div>{React.cloneElement(React.Children.only(children), { onSelectProfile: updateJobProfileViewCountCache })}</div>
  );
};

export default JobProfileViewCounter;
