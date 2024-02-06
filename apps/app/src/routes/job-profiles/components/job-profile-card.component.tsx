/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Space, Typography } from 'antd';
import DOMPurify from 'dompurify';
import { useParams } from 'react-router-dom';
import { JobProfileModel } from '../../../redux/services/graphql-api/job-profile-types';

const { Title, Text, Paragraph } = Typography;

export interface JobProfileCardProps {
  data: JobProfileModel;
  link: string;
}

export const JobProfileCard = ({ data }: JobProfileCardProps) => {
  const params = useParams();

  // console.log('card data: ', data.classifications);
  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
        cursor: 'pointer',
        borderLeft: data.id === +(params.id ?? 0) ? '4px solid #5a7def' : '4px solid transparent',
        padding: '1rem',
      }}
    >
      <Title level={2} style={{ fontSize: '1.25rem', lineHeight: '1.25rem' }} data-cy="card-title">
        {typeof data?.title === 'string' ? data?.title : data?.title?.value}
      </Title>
      <div>
        <Text type="secondary" data-cy="card-classification">
          {data.classifications?.map((c) => c.classification.code).join(', ')} | Job Store # {data.number}
        </Text>
        <br />
        <Text type="secondary">Reports to excluded manager</Text>
      </div>
      <div>
        <Text strong>Context: </Text>

        <Paragraph ellipsis={{ rows: 3 }}>
          <span
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                typeof data?.context === 'string' ? data.context : data.context.description ?? '',
              ),
            }}
          ></span>
        </Paragraph>
      </div>
      <div>
        <Text strong>Overview:</Text>
        <Paragraph ellipsis={{ rows: 3 }}>
          {typeof data?.overview === 'string' ? data?.overview : data?.overview?.value}
        </Paragraph>
      </div>
      <Button type="link" aria-label={`click to see details for ${data.title}`} style={{ padding: '0' }}>
        See details
      </Button>
    </Space>
  );
};
