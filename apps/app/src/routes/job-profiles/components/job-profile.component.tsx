/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowLeftOutlined } from '@ant-design/icons';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Button, Descriptions, DescriptionsProps, Form, Grid, Input, List, Select, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Type } from 'class-transformer';
import { IsNotEmpty, Length, ValidateNested } from 'class-validator';
import { useEffect, useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { JobProfileModel, useLazyGetJobProfileQuery } from '../../../redux/services/graphql-api/job-profile.api';
import { FormItem } from '../../../utils/FormItem';
import WizardControls from '../../wizard/components/wizard-controls.component';

const { Text } = Typography;
const { useBreakpoint } = Grid;

interface ConfigProps {
  isEditable?: boolean;
}

interface JobProfileProps {
  profileData?: any;
  id?: string; // The id is optional, as it can also be retrieved from the params
  config?: ConfigProps;
  submitHandler?: SubmitHandler<Record<string, any>>;
  submitText?: string;
  showBackButton?: boolean;
}

class BehaviouralCompetency {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
}

class JobProfileValidationModel {
  @Length(2, 60)
  title: string;

  @IsNotEmpty({ message: 'Classification is required.' })
  classification: string;

  @Length(2, 60)
  context: string;

  @Length(2, 60)
  overview: string;

  required_accountabilities: string[];

  optional_accountabilities: string[];

  requirements: string[];

  @ValidateNested({ each: true })
  @Type(() => BehaviouralCompetency)
  behavioural_competencies: { behavioural_competency: BehaviouralCompetency }[];
}

interface InputData {
  [key: string]: string;
}

interface BehaviouralCompetencyOutput {
  [key: string]: string;
}

interface Competency {
  behavioural_competency: BehaviouralCompetencyOutput;
}

function transformFormData(input: InputData): JobProfileModel {
  // Transforms data generated by the form, which is in a format like this:
  // {"title":"lorem ipsum","classification":"Clerk 9","context":"lorem ipsum","overview":"lorem ipsum",
  //  "required_accountabilities.0":"req acc 1","optional_accountabilities.0":"opt acc 1",
  //  "requirements.0":"req 1","requirements.1":"req 2","requirements.2":"req 3",
  //  "behavioural_competencies.0.behavioural_competency.name":"beh 1",
  //  "behavioural_competencies.0.behavioural_competency.description":"beh des 1"}
  //
  // To a format that's consistent with data returned from the api, which is in a format like this:
  // {"id":1,"stream":"CORPORATE","title":"lorem ipsum","number":0,"context":"lorem ipsum","overview":"lorem ipsum",
  //  "accountabilities":{"optional":["opt acc 1"],"required":["req acc 1"]},"requirements":["req 1","req 2","req 3"],
  //  "behavioural_competencies":[{"behavioural_competency":{"id":1,"name":"beh 1","description":"beh des 1"}}],
  //   "classification":{"id":1,"occupation_group":{"id":1,"code":"CLK","name":"Clerk"},"grid":{"id":1,"name":"9"}},
  //   "family":null,"role":null,"category":null,"ministry":null,"reports_to":null}

  const output = {
    id: -1,
    stream: 'USER',
    title: input.title,
    number: -1,
    context: input.context,
    overview: input.overview,
    accountabilities: {
      optional: [] as string[],
      required: [] as string[],
    },
    requirements: [] as string[],
    behavioural_competencies: [] as Competency[],
    classification: {
      id: -1,
      grid: {
        id: -1,
        name: '',
      },
      occupation_group: {
        id: -1,
        code: '',
        name: '',
      },
    },
  };

  Object.keys(input).forEach((key) => {
    const keys = key.split('.');
    const value = input[key];

    if (keys.length === 1) {
      if (key === 'classification') {
        const [occupation, grid] = value.split(' ');

        output.classification = {
          id: 1,
          occupation_group: {
            id: 1,
            code: occupation.substring(0, 3).toUpperCase(),
            name: occupation,
          },
          grid: {
            id: 1,
            name: grid,
          },
        };
      }
    } else {
      if (key.startsWith('required_accountabilities')) {
        output.accountabilities.required.push(value);
      } else if (key.startsWith('optional_accountabilities')) {
        output.accountabilities.optional.push(value);
      } else if (key.startsWith('requirements')) {
        output.requirements.push(value);
      } else if (key.startsWith('behavioural_competencies')) {
        const parts = key.split('.');
        const index = parseInt(parts[1]);

        if (!output.behavioural_competencies[index]) {
          output.behavioural_competencies[index] = { behavioural_competency: {} };
        }

        if (parts[3] === 'name') {
          output.behavioural_competencies[index].behavioural_competency.name = value;
        } else if (parts[3] === 'description') {
          output.behavioural_competencies[index].behavioural_competency.description = value;
        }
      }
    }
  });

  return output as unknown as JobProfileModel;
}

export const JobProfile: React.FC<JobProfileProps> = ({
  id,
  profileData,
  config,
  submitHandler,
  submitText,
  showBackButton,
}) => {
  const params = useParams();
  const resolvedId = id ?? params.id; // Using prop ID or param ID
  const screens = useBreakpoint();

  // If neither resolvedId nor profileData is present, throw an error
  if (!resolvedId && !profileData) throw new Error('No ID');

  // Using the lazy query to have control over when the fetch action is dispatched
  // (not dispatching if profileData was already provided)
  const [triggerGetJobProfile, { data, isLoading }] = useLazyGetJobProfileQuery();

  // State to hold the effectiveData which can be from profileData prop or fetched from API
  const initialData = profileData ? transformFormData(profileData) : null;
  const [effectiveData, setEffectiveData] = useState<JobProfileModel | null>(initialData);

  // useEffect to trigger the job profile fetch based on the resolvedId
  useEffect(() => {
    if (!profileData && resolvedId) {
      triggerGetJobProfile({ id: +resolvedId });
    }
  }, [resolvedId, profileData]);

  // useEffect to set effectiveData when data is fetched from the API
  useEffect(() => {
    if (data && !isLoading) {
      setEffectiveData(data.jobProfile);
    }
  }, [data, isLoading, profileData]);

  const { register, control, handleSubmit, reset } = useForm<JobProfileValidationModel>({
    resolver: classValidatorResolver(JobProfileValidationModel),
    mode: 'onChange',
  });

  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    if (effectiveData && !isLoading) {
      reset({
        title: effectiveData?.title,
        context: effectiveData?.context,
        overview: effectiveData?.overview,
        classification:
          effectiveData?.classification.occupation_group.name + ' ' + effectiveData?.classification.grid.name,
        required_accountabilities: effectiveData?.accountabilities.required || [],
        optional_accountabilities: effectiveData?.accountabilities.optional || [],
        requirements: effectiveData?.requirements || [],
        behavioural_competencies: effectiveData?.behavioural_competencies || [],
      });
      setRenderKey((prevKey) => prevKey + 1);
    }
  }, [effectiveData, isLoading]);

  const renderField = (fieldKey: string, displayValue: any, editableComponent: JSX.Element) =>
    config?.isEditable ?? false ? editableComponent : displayValue;

  const classificationOptions = ['Option1', 'Option2', 'Clerk 9'];

  // Required Accountability Fields
  const {
    fields: acc_req_fields,
    append: acc_req_append,
    remove: acc_req_remove,
  } = useFieldArray<any>({
    control,
    name: 'required_accountabilities' as any,
  });

  // Optional Accountability Fields
  const {
    fields: acc_opt_fields,
    append: acc_opt_append,
    remove: acc_opt_remove,
  } = useFieldArray<any>({
    control,
    name: 'optional_accountabilities' as any,
  });

  const {
    fields: requirement_fields,
    append: requirement_append,
    remove: requirement_remove,
  } = useFieldArray<any>({
    control,
    name: 'requirements' as any,
  });

  const {
    fields: competency_fields,
    append: competency_append,
    remove: competency_remove,
  } = useFieldArray({
    control,
    name: 'behavioural_competencies',
  });

  if (isLoading || renderKey === 0) {
    return <p>Loading...</p>; // or render a spinner/loader
  }

  const items: DescriptionsProps['items'] = [
    {
      key: 'title',
      label: 'Title',
      children: renderField(
        'title',
        effectiveData?.title,
        // <input type="text" {...register('title')}></input>,
        <FormItem name="title" control={control}>
          <Input />
        </FormItem>,
      ),
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
    {
      key: 'classification',
      label: 'Classification',
      children: renderField(
        'classification',
        `${effectiveData?.classification.occupation_group.name} ${effectiveData?.classification.grid.name}`,
        <FormItem name="classification" control={control}>
          <Select {...register('classification')}>
            {classificationOptions.map((option) => (
              <Select.Option value={option} key={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
        </FormItem>,
      ),
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
    {
      key: 'number',
      label: 'Job Store #',
      children: effectiveData?.number,
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
    {
      key: 'updated_at',
      label: 'Last Updated',
      children: <div />,
      // children: dayjs(effectiveData?.updated_at).format('MMMM D, YYYY @ h:mm:ss A'),

      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
    {
      key: 'context',
      label: 'Job Context',
      children: renderField(
        'context',
        effectiveData?.context,
        // <input type="text" {...register('context')}></input>,
        <FormItem name="context" control={control}>
          <TextArea />
        </FormItem>,
      ),
      span: 24,
    },
    {
      key: 'overview',
      label: 'Job Overview',
      children: renderField(
        'overview',
        effectiveData?.overview,
        // <input type="text" {...register('overview')}></input>,
        <FormItem name="overview" control={control}>
          <TextArea />
        </FormItem>,
      ),
      span: 24,
    },
    {
      key: 'required_accountabilities',
      label: 'Required Accountabilities',
      children: renderField(
        'required_accountabilities',
        <ul>{effectiveData?.accountabilities.required.map((accountability) => <li>{accountability}</li>)}</ul>,
        <>
          <List
            dataSource={acc_req_fields}
            renderItem={(field, index) => (
              <List.Item style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <FormItem
                  name={`required_accountabilities.${index}`}
                  control={control}
                  style={{ flex: 1, marginRight: '10px' }}
                >
                  <TextArea defaultValue={(field as any).value} style={{ width: '100%' }} />
                </FormItem>

                <Button type="primary" danger onClick={() => acc_req_remove(index)}>
                  Delete
                </Button>
              </List.Item>
            )}
          />

          <Button
            type="dashed"
            onClick={() => {
              acc_req_append('');
            }}
            style={{ marginTop: '20px' }}
          >
            Add Accountability
          </Button>
        </>,
      ),
      span: 24,
    },
    {
      key: 'optional_accountabilities',
      label: 'Optional Accountabilities',
      children: renderField(
        'optional_accountabilities',
        <ul>{effectiveData?.accountabilities.optional.map((accountability) => <li>{accountability}</li>)}</ul>,
        <>
          <List
            dataSource={acc_opt_fields}
            renderItem={(field, index) => (
              <List.Item style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <FormItem
                  name={`optional_accountabilities.${index}`}
                  control={control}
                  style={{ flex: 1, marginRight: '10px' }}
                >
                  <TextArea defaultValue={(field as any).value} style={{ width: '100%' }} />
                </FormItem>

                <Button type="primary" danger onClick={() => acc_opt_remove(index)}>
                  Delete
                </Button>
              </List.Item>
            )}
          />

          <Button
            type="dashed"
            onClick={() => {
              acc_opt_append('');
            }}
            style={{ marginTop: '20px' }}
          >
            Add Optional Accountability
          </Button>
        </>,
      ),
      span: 24,
    },
    {
      key: 'requirements',
      label: 'Minimum Job Requirements',
      children: renderField(
        'requirements',
        <ul>{effectiveData?.requirements.map((requirement) => <li>{requirement}</li>)}</ul>,
        <>
          <List
            dataSource={requirement_fields}
            renderItem={(field, index) => (
              <List.Item style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <FormItem name={`requirements.${index}`} control={control} style={{ flex: 1, marginRight: '10px' }}>
                  <TextArea defaultValue={(field as any).value} style={{ width: '100%' }} />
                </FormItem>

                <Button type="primary" danger onClick={() => requirement_remove(index)}>
                  Delete
                </Button>
              </List.Item>
            )}
          />

          <Button
            type="dashed"
            onClick={() => {
              requirement_append('');
            }}
            style={{ marginTop: '20px' }}
          >
            Add Requirement
          </Button>
        </>,
      ),
      span: 24,
    },
    {
      key: 'behavioural_competencies',
      label: 'Behavioural Competencies',
      children: renderField(
        'behavioural_competencies',
        <ul>
          {(effectiveData?.behavioural_competencies ?? []).map(({ behavioural_competency: { name, description } }) => {
            return (
              <li>
                <Text strong>{name}</Text> {description}
              </li>
            );
          })}
        </ul>,
        <>
          <List
            dataSource={competency_fields}
            renderItem={(item, index) => (
              <List.Item style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <FormItem
                  name={`behavioural_competencies.${index}.behavioural_competency.name`}
                  control={control}
                  style={{ flex: 1, marginRight: '10px' }}
                >
                  <Input defaultValue={item.behavioural_competency.name} placeholder="Name" style={{ width: '100%' }} />
                </FormItem>

                <FormItem
                  name={`behavioural_competencies.${index}.behavioural_competency.description`}
                  control={control}
                  style={{ flex: 2, marginRight: '10px' }}
                >
                  <TextArea
                    defaultValue={item.behavioural_competency.description}
                    placeholder="Description"
                    style={{ width: '100%' }}
                  />
                </FormItem>

                <Button type="primary" danger onClick={() => competency_remove(index)}>
                  Delete
                </Button>
              </List.Item>
            )}
          />
          <Button
            type="dashed"
            onClick={() => competency_append({ behavioural_competency: { name: '', description: '' } })}
            style={{ marginTop: '20px' }}
          >
            Add Competency
          </Button>
        </>,
      ),
      span: 24,
    },
  ];

  const renderContent = () => (
    <>
      {screens.xl === false ? (
        <Link to="/job-profiles">
          <ArrowLeftOutlined /> Back to Search Results
        </Link>
      ) : (
        <div />
      )}
      <Descriptions
        bordered
        column={24}
        items={items}
        labelStyle={{
          fontWeight: 700,
          width: '100px',
          verticalAlign: 'top',
        }}
      />
    </>
  );

  return config?.isEditable ? (
    <Form
      key={renderKey}
      onFinish={(data) => {
        if (submitHandler) submitHandler(data);
      }}
    >
      {renderContent()}
      <WizardControls submitText={submitText} showBackButton={showBackButton} />
      {/* <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        {showBackButton ? <Button onClick={handleBackClick}>Go Back</Button> : null}
        <Button type="primary" htmlType="submit">
          {submitText}
        </Button>
      </div> */}
    </Form>
  ) : (
    renderContent()
  );
};
