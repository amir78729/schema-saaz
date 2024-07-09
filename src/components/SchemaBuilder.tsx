import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import React, { useEffect, useState } from 'react';
import { useSchema } from '../providers/SchemaProvider';
import { Box, CssBaseline, Tab, Tabs } from '@mui/material';
import SchemaPreview from './SchemaPreview';
import { codeToHtml } from 'shiki';

const SchemaBuilder = () => {
  const { schema } = useSchema();
  const [highlightedSchema, setHighlightedSchema] = useState<string>('');
  const [tab, setTab] = useState<number>(0);
  const TABS: Record<'BUILDER' | 'SCHEMA' | 'FORM_PREVIEW', number> = {
    BUILDER: 0,
    SCHEMA: 1,
    FORM_PREVIEW: 2,
  };
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  useEffect(() => {
    const getHighlightedCode = async (code: string) => {
      const highlighted = await codeToHtml(code, {
        lang: 'json',
        theme: 'github-dark-default',
      });

      setHighlightedSchema(highlighted);
    };

    getHighlightedCode(JSON.stringify(schema, null, 2));
  }, [schema]);

  return (
    <>
      <CssBaseline />
      <div>
        <Tabs value={tab} onChange={handleTabChange}>
          <Tab label="Builder"></Tab>
          <Tab label="Schema"></Tab>
          <Tab label="Form Preview"></Tab>
        </Tabs>

        {tab === TABS.BUILDER && <SchemaPreview name="" schema={schema} data={{}} />}
        {tab === TABS.SCHEMA && <Box dangerouslySetInnerHTML={{ __html: highlightedSchema }}></Box>}
        {tab === TABS.FORM_PREVIEW && <Form schema={schema} validator={validator} />}
      </div>
    </>
  );
};

export default SchemaBuilder;
