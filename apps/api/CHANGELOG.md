# api

## 0.1.0

### Minor Changes

- [#98](https://github.com/bcgov/psa-job-store/pull/98) [`4fe36113`](https://github.com/kmandryk/psa-job-store/commit/4fe3611329a2b4f6d2ca835adc59fc87d1966e7d) Thanks [@sidmclaughlin](https://github.com/sidmclaughlin)! - Implement BI endpoints.

- [#183](https://github.com/bcgov/psa-job-store/pull/183) [`75f0490c`](https://github.com/kmandryk/psa-job-store/commit/75f0490c0a16dc1899c5931683d15c2732a34318) Thanks [@alex-struk](https://github.com/alex-struk)! - Additional information form for HM views
  Added nursing employee group

- [#78](https://github.com/bcgov/psa-job-store/pull/78) [`ba47c021`](https://github.com/kmandryk/psa-job-store/commit/ba47c0215b7c8e1f837b0d3cc55f985f5a39359f) Thanks [@sidmclaughlin](https://github.com/sidmclaughlin)! - Implement improved search

- [#225](https://github.com/bcgov/psa-job-store/pull/225) [`2cb29c5f`](https://github.com/kmandryk/psa-job-store/commit/2cb29c5fc409a7139bf7f388e526d81fe16cb892) Thanks [@alex-struk](https://github.com/alex-struk)! - HM view improvements

  - Now showing 10 items per page, hidden page picker
  - New fields on profiles (preferences, knowledge skills and abilities, etc.)
  - Removed modal prompts warning users changes may cause classification reivew
  - Orgchart in the wizard now shows users department by default
  - Notifes user about fields that have been changed that trigger review (on the final status screen)
  - Transitions to readonly status with complete screen if successfully created position
  - Wording changes across the app according to Figma
  - Replaced all loading messages with loading indicators
  - Fixed date format ('d' means day of the week, "D" means day of month)
  - Added status transitions for HM screens
  - add positions context menu link to edit/view request, to HM screens
  - implement ability to delete position request from context menu
  - behavioral competency regression bug fix
  - wizard org chart now uses next/back mechanic instead of creating position on org chart directly
  - org chart no longer truncates classifications, shows tooltip for long position titles
  - popover on orgchart now moves with the org chart when user pans
  - org chart now uses proper color scheme
  - org chart on wizard expands to remaining screen height instead of fixed height
  - Aligned header text to baseline
  - Created a component to show person(s) info from position number, showing that info in wizard profile selection step
  - Added header menu on profile selection screen with delete and save and close features

  HM Views filter options:

  - Classifications now shows name instead of code
  - Classifications filter now only shows options that are available in profiles on the page
  - Added profession/stream tree view filter
  - Improved filters responsiveness

  DevOps

  - update for prod deployment - update infra code and github action for applying database migrations to work with the crunchy db operator.
  - switch IS to use main-latest - the build scripts currently overwrite latest regardless of ENV. switch prod to use main-latest for now.
  - Change migrate-db action to use sidecar deployment, so its not dependant on a running API pod, which can be finicky in dev/test.
  - fix build-apps bug where the paths-filter is always using main branch for comparison

  PeopleSoft Integrations

  - WIP initial createPosition
  - add REPORTS_TO to createPositionForPositionRequest
  - move sync code to module to ensure it only runs once
  - add logging to sync methods

  Other

  - refactor document generation code

- [#121](https://github.com/bcgov/psa-job-store/pull/121) [`b29d14fa`](https://github.com/kmandryk/psa-job-store/commit/b29d14fa0493a565aba0f63b7611a0176f6dcfd0) Thanks [@sidmclaughlin](https://github.com/sidmclaughlin)! - Add endpoint to get single position

- [#237](https://github.com/bcgov/psa-job-store/pull/237) [`2f25da46`](https://github.com/kmandryk/psa-job-store/commit/2f25da4695016783d466cfa564dd3c3e6e9ec065) Thanks [@alex-struk](https://github.com/alex-struk)! - API Integrations

  - position request creation now accounts for different classification unions

  HM View Improvements

  - Can now search for departments by department ID on the org chart views
  - Redesigned behavioural competencies picker to be easier to select competencies from
  - All wizard steps are now aligned to Figma designs
  - Improved performance on the edit form

  Other

  - Improved docx generation

- [#31](https://github.com/bcgov/psa-job-store/pull/31) [`6191785a`](https://github.com/kmandryk/psa-job-store/commit/6191785aa0836e096b8df7b3f744338f33b87d0b) Thanks [@sidmclaughlin](https://github.com/sidmclaughlin)! - Add initial filters

- [#21](https://github.com/bcgov/psa-job-store/pull/21) [`f58a30fc`](https://github.com/kmandryk/psa-job-store/commit/f58a30fcb325cdb58a98d81132b61bdcc9e0f391) Thanks [@sidmclaughlin](https://github.com/sidmclaughlin)! - Implement basic Job Profile search

### Patch Changes

- [#416](https://github.com/bcgov/psa-job-store/pull/416) [`ed596d8e`](https://github.com/kmandryk/psa-job-store/commit/ed596d8ec18262f45c5d307ba7615163353d830d) Thanks [@sidmclaughlin](https://github.com/sidmclaughlin)! - [AL-642] Filter out deleted and frozen positions when requesting an org chart