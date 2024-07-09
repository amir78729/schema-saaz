import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import React, { useState } from 'react';
import { useSchema } from '../providers/SchemaProvider';
import { CssBaseline, Tab, Tabs } from '@mui/material';
import SchemaPreview from './SchemaPreview';

const SchemaBuilder = () => {
  const { schema } = useSchema();
  const [tab, setTab] = useState<number>(0);
  const TABS: Record<'BUILDER' | 'SCHEMA' | 'FORM_PREVIEW', number> = {
    BUILDER: 0,
    SCHEMA: 1,
    FORM_PREVIEW: 2,
  };
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };
  return (
    <>
      <CssBaseline />
      <div>
        <Tabs value={tab} onChange={handleTabChange}>
          <Tab label="Builder"></Tab>
          <Tab label="Schema"></Tab>
          <Tab label="Form Preview"></Tab>
        </Tabs>

        {tab === TABS.BUILDER && (
          <SchemaPreview name="" schema={schema} data={{}} />
        )}
        {tab === TABS.SCHEMA && <pre>{JSON.stringify(schema, null, 2)}</pre>}
        {tab === TABS.FORM_PREVIEW && (
          <Form schema={schema} validator={validator} />
        )}
      </div>
    </>
  );
};

export default SchemaBuilder;
