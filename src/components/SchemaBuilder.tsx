import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import React, { useEffect, useState } from 'react';
import { useSchema } from '../providers/SchemaProvider';
import { Box, CssBaseline, Tab, Tabs } from '@mui/material';
import SchemaPreview from './SchemaPreview';
import { codeToHtml } from 'shiki';
import { JsonSchema } from '../types';
import CopyButton from './CopyButton';

type SchemaBuilderProps = {
  onChange?: (schema: JsonSchema) => void;
  hideSchemaTab?: boolean;
  hideFormTab?: boolean;
};

const SchemaBuilder = ({ onChange, hideSchemaTab = false, hideFormTab = false }: SchemaBuilderProps) => {
  const { schema } = useSchema();
  const [highlightedSchema, setHighlightedSchema] = useState<string>('');
  const [tab, setTab] = useState<number>(0);
  const TABS: string[] = ['BUILDER', ...(!hideSchemaTab ? ['SCHEMA'] : []), ...(!hideFormTab ? ['FORM_PREVIEW'] : [])];
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  useEffect(() => {
    onChange?.(schema);
  }, [schema]);

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
      <Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Tabs value={tab} onChange={handleTabChange}>
            <Tab label="Builder" />
            {!hideSchemaTab && <Tab label="Schema" />}
            {!hideFormTab && <Tab label="Form Preview" />}
          </Tabs>
          <CopyButton />
        </Box>

        {tab === TABS.indexOf('BUILDER') && <SchemaPreview name="Schema Builder" schema={schema} data={{}} path="" />}
        {tab === TABS.indexOf('SCHEMA') && <Box dangerouslySetInnerHTML={{ __html: highlightedSchema }}></Box>}
        {tab === TABS.indexOf('FORM_PREVIEW') && <Form schema={schema} validator={validator} />}
      </Box>
    </>
  );
};

export default SchemaBuilder;
