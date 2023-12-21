/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Card, Checkbox, Col, Row, Select, Tag } from 'antd';
import Search from 'antd/es/input/Search';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageHeader } from '../../components/app/page-header.component';
import { useGetPositionRequestUserClassificationsQuery } from '../../redux/services/graphql-api/position-request.api';
import ContentWrapper from '../home/components/content-wrapper.component';
import MyPositionsTable from './components/my-positions-table.component';
import './my-positions.page.css';

export const MyPositionsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortField, setSortField] = useState<null | string>(null);
  const [sortOrder, setSortOrder] = useState<null | string>(null);

  const { data: classifications } = useGetPositionRequestUserClassificationsQuery();
  const [searchParams, setSearchParams] = useSearchParams();

  // SEARCHING AND FILTERING
  const [classificationFilterData, setClassificationOptions] = useState<ClassificationOption[]>([]);
  const [allSelections, setAllSelections] = useState<Selection[]>([]);
  const [initialSelectionSet, setInitialSelectionSet] = useState(false);

  // Unified state for all selections
  interface Selection {
    value: string;
    type: string;
  }

  // Add a new selection
  const addSelection = (value: any, type: any) => {
    const newSelection = { value, type };
    setAllSelections([...allSelections, newSelection]);
  };

  // Remove a selection
  const removeSelection = (removedValue: any, type: any) => {
    setAllSelections(
      allSelections.filter((selection) => !(selection.value === removedValue && selection.type === type)),
    );
  };

  const statusFilterData = [
    { label: 'Draft', value: 'DRAFT' },
    { label: 'In Review', value: 'IN_REVIEW' },
    { label: 'Completed', value: 'COMPLETED' },
  ];

  interface ClassificationOption {
    label: string;
    value: string;
  }

  useEffect(() => {
    if (classifications?.positionRequestUserClassifications) {
      const newOptions = classifications.positionRequestUserClassifications.map((classification) => ({
        label: classification.code,
        value: classification.id,
      }));
      setClassificationOptions(newOptions);
    }
  }, [classifications]);

  const handleSearch = (_selectedKeys: any, _confirm: any) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('search', _selectedKeys);
    setSearchParams(newSearchParams);
  };

  // Update the Select components when selections change
  const selectedStatus = allSelections.filter((s) => s.type === 'status').map((s) => s.value);
  const selectedClassification = allSelections.filter((s) => s.type === 'classification').map((s) => s.value);

  const tagRender = () => {
    return <></>;
  };

  const dropdownRender = (type: any) => {
    const options = type === 'status' ? statusFilterData : classificationFilterData;
    const selectedValues = type === 'status' ? selectedStatus : selectedClassification;
    return (
      <div>
        <div style={{ padding: '8px' }}>
          {options.map((option) => (
            <div key={option.value} style={{ margin: '5px 0' }}>
              <Checkbox
                checked={selectedValues.includes(option.value)}
                onChange={(e) => {
                  if (e.target.checked) {
                    addSelection(option.value, type);
                  } else {
                    removeSelection(option.value, type);
                  }
                }}
              >
                {option.label}
              </Checkbox>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const findLabel = (value: any, type: any) => {
    if (type === 'status') {
      return statusFilterData.find((option) => option.value === value)?.label || value;
    }
    if (type === 'classification') {
      return classificationFilterData.find((option) => option.value === value)?.label || value;
    }
    return value;
  };

  useEffect(() => {
    // set initial filter selections from search params
    const statusParams = decodeURIComponent(searchParams.get('status') || '')
      .split(',')
      .filter(Boolean);
    const classificationParams = decodeURIComponent(searchParams.get('classification') || '')
      .split(',')
      .filter(Boolean);
    const initialSelections = [
      ...statusParams.map((value) => ({ value, type: 'status' })),
      ...classificationParams.map((value) => ({ value, type: 'classification' })),
    ];
    if (!initialSelectionSet) {
      setAllSelections(initialSelections);
      setInitialSelectionSet(true);
    }
  }, [initialSelectionSet, setInitialSelectionSet, searchParams]);

  useEffect(() => {
    // Sync state with URL parameters for selections and pagination
    const statusValues = allSelections
      .filter((s) => s.type === 'status')
      .map((s) => s.value)
      .join(',');
    const classificationValues = allSelections
      .filter((s) => s.type === 'classification')
      .map((s) => s.value)
      .join(',');

    const pageFromURL = parseInt(searchParams.get('page') || '1', 10);
    const pageSizeFromURL = parseInt(searchParams.get('pageSize') || '10', 10);

    // Update URL parameters if needed
    const newSearchParams = new URLSearchParams();
    if (statusValues) newSearchParams.set('status', statusValues);
    if (classificationValues) newSearchParams.set('classification', classificationValues);

    const sortFromUrl = searchParams.get('sortField');
    const sortOrderFromUrl = searchParams.get('sortOrder');

    if (sortFromUrl) newSearchParams.set('sortField', sortFromUrl);
    if (sortOrderFromUrl) newSearchParams.set('sortOrder', sortOrderFromUrl);

    const statusChanged = newSearchParams.get('status') != searchParams.get('status');
    const classificationChanged = newSearchParams.get('classification') != searchParams.get('classification');

    if (pageFromURL != 1) newSearchParams.set('page', pageFromURL.toString());

    if (pageSize != 10) newSearchParams.set('pageSize', pageSizeFromURL.toString());

    const searchFromURL = searchParams.get('search');
    if (searchFromURL) newSearchParams.set('search', searchFromURL.toString());

    if (statusChanged || classificationChanged) {
      // filters changed - reset page
      setCurrentPage(1);
      newSearchParams.set('page', (1).toString());
      if (searchParams.toString() !== newSearchParams.toString()) {
        setSearchParams(newSearchParams);
        return;
      }
    }

    // Only update search params if there's a change
    if (searchParams.toString() !== newSearchParams.toString()) {
      setSearchParams(newSearchParams);
    }

    // Update component state for pagination and fetch data
    if (currentPage !== pageFromURL || pageSize !== pageSizeFromURL) {
      setCurrentPage(pageFromURL);
      setPageSize(pageSizeFromURL);
    }

    if (sortFromUrl) setSortField(sortFromUrl);
    if (sortOrderFromUrl) {
      setSortOrder(sortOrderFromUrl == 'ASC' ? 'ascend' : 'descend');
    }
  }, [
    allSelections,
    searchParams,
    setSearchParams,
    currentPage,
    pageSize,
    sortField,
    sortOrder,
    setSortOrder,
    setSortField,
  ]);

  const clearFilters = () => {
    setAllSelections([]);
    setSearchParams(''); // Clear the search query
    setCurrentPage(1); // Reset pagination to the first page

    // Update the URL parameters
    const newSearchParams = new URLSearchParams();
    newSearchParams.set('page', '1');
    newSearchParams.set('pageSize', pageSize.toString());
    const searchFromUrl = searchParams.get('search');
    if (searchFromUrl) newSearchParams.set('search', searchFromUrl);

    setSearchParams(newSearchParams);
  };
  // END FILTERING

  const handleTableChangeCallback = (pagination: any, _filters: any, sorter: any) => {
    const newPage = pagination.current;
    const newPageSize = pagination.pageSize;
    const newSortField = sorter.field;
    const newSortOrder = sorter.order;

    setCurrentPage(newPage);
    setPageSize(newPageSize);
    setSortField(newSortField);
    setSortOrder(newSortOrder);

    // Update URL parameters
    const newSearchParams = new URLSearchParams(searchParams);
    if (newPage !== 1) newSearchParams.set('page', newPage.toString());
    else newSearchParams.delete('page');

    if (newPageSize !== 10) newSearchParams.set('pageSize', newPageSize.toString());
    else newSearchParams.delete('pageSize');

    if (newSortOrder) {
      newSearchParams.set('sortField', newSortField);
      newSearchParams.set('sortOrder', newSortOrder === 'ascend' ? 'ASC' : 'DESC');
    } else {
      newSearchParams.delete('sortField');
      newSearchParams.delete('sortOrder');
      setSortField(null);
    }
    setSearchParams(newSearchParams);
  };

  return (
    <>
      <PageHeader title="My Positions" subTitle="Review the profile before creating a new position" />

      <ContentWrapper>
        <Card style={{ marginTop: '1rem' }}>
          <Row gutter={24} wrap>
            <Col span={12}>
              <Search
                defaultValue={searchParams.get('search') ?? undefined}
                enterButton="Find positions"
                aria-label="Search by job title or keyword"
                onPressEnter={(e) => handleSearch(e.currentTarget.value, null)}
                allowClear
                placeholder="Search by job title or submission ID"
                onSearch={handleSearch}
                style={{ width: 400 }}
              />
            </Col>
            <Col span={12}>
              <Row gutter={8} justify="end">
                <Col>
                  <Select
                    tagRender={tagRender}
                    dropdownRender={() => dropdownRender('status')}
                    className="customTagControlled"
                    placeholder="Status"
                    options={statusFilterData}
                    style={{ width: 120 }}
                    // onChange={setSelectedStatus}
                    onChange={(newValues) => {
                      // Add new selections and remove deselected ones
                      newValues.forEach((val: any) => {
                        if (!selectedStatus.includes(val)) addSelection(val, 'status');
                      });
                      selectedStatus.forEach((val) => {
                        if (!newValues.includes(val)) removeSelection(val, 'status');
                      });
                    }}
                  />
                </Col>
                <Col>
                  <Select
                    tagRender={tagRender}
                    dropdownRender={() => dropdownRender('classification')}
                    className="customTagControlled"
                    placeholder="Classification"
                    options={classificationFilterData}
                    style={{ width: 150 }}
                    // onChange={setSelectedClassification}
                    onChange={(newValues) => {
                      // Similar logic as for status
                      newValues.forEach((val: any) => {
                        if (!selectedClassification.includes(val)) addSelection(val, 'classification');
                      });
                      selectedClassification.forEach((val) => {
                        if (!newValues.includes(val)) removeSelection(val, 'classification');
                      });
                    }}
                  />
                </Col>
              </Row>
            </Col>
            {allSelections.length > 0 && (
              <Col style={{ marginTop: '10px', marginBottom: '10px' }}>
                <span
                  style={{
                    fontWeight: 500,
                    margin: '8px',
                    marginLeft: 0,
                    paddingRight: '8px',
                    borderRight: '2px solid rgba(0, 0, 0, 0.06)',
                    marginRight: '10px',
                  }}
                >
                  Applied filters
                </span>
                <Button
                  onClick={clearFilters}
                  type="link"
                  style={{ padding: '0', fontWeight: 400 }}
                  data-cy="clear-filters-button"
                >
                  Clear all filters
                </Button>
              </Col>
            )}
          </Row>
          <Row>
            <Col>
              {allSelections.map((selection) => (
                <Tag
                  key={`${selection.type}-${selection.value}`}
                  closable
                  onClose={() => removeSelection(selection.value, selection.type)}
                >
                  {findLabel(selection.value, selection.type)}
                </Tag>
              ))}
            </Col>
          </Row>
        </Card>

        <MyPositionsTable
          style={{ marginTop: '1rem' }}
          handleTableChangeCallback={handleTableChangeCallback}
        ></MyPositionsTable>
      </ContentWrapper>
    </>
  );
};