import { RJSFSchema } from '@rjsf/utils';
import React, { useContext, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Stack, Button, Checkbox } from '@mui/material';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';

export type DataVisualizationContextType = {
    globalData: unknown;
    globalSchema: RJSFSchema;
  };
  
  export type DataVisualizationType = {
    data: unknown;
    schema: RJSFSchema;
  };
  

// export const useTargetInfoBasedOnPath = (path: string) => {
//     const { globalData, globalSchema } = useContext(DataVisualizationContext);
//     const x = path?.split('.');
//     let targetSchema;
//     let targetData;
//     if (x) {
//       targetData = x.reduce((a, b) => a[b], globalData);
//       targetSchema = x.reduce((a, b) => a.properties[b], globalSchema);
//     }
//     return { targetData, targetSchema };
//   };
  
  export const getDataTypeBySchema = (
    schema: RJSFSchema,
    DataVisualization: {
      ({ schema, data }: DataVisualizationType): JSX.Element;
      String({ schema, data }: DataVisualizationType): JSX.Element;
      Boolean({ schema, data }: DataVisualizationType): JSX.Element;
      Image({ schema, data }: DataVisualizationType): JSX.Element;
      Video({ schema, data }: DataVisualizationType): JSX.Element;
      Object({ schema, data }: DataVisualizationType): JSX.Element;
      Array({ schema, data }: DataVisualizationType): JSX.Element;
      Url({ schema, data }: DataVisualizationType): JSX.Element;
      RichText({ schema, data }: DataVisualizationType): JSX.Element;
      Map({ schema, data }: DataVisualizationType): JSX.Element;
      Date({ schema, data }: DataVisualizationType): JSX.Element;
      DateTime({ schema, data }: DataVisualizationType): JSX.Element;
      Enum({ schema, data }: DataVisualizationType): JSX.Element;
      Number({ schema, data }: DataVisualizationType): JSX.Element;
      Color({ schema, data }: DataVisualizationType): JSX.Element;
      Unknown({ schema, data }: DataVisualizationType): JSX.Element;
    },
  ) => {
    if (schema?.type === 'boolean') return DataVisualization.Boolean;
    if (schema?.type === 'string' && schema?.format === 'image-url') return DataVisualization.Image;
    if (schema?.type === 'string' && schema?.format === 'video-url') return DataVisualization.Video;
    if (schema?.type === 'string' && schema?.format === 'uri') return DataVisualization.Url;
    if (schema?.type === 'string' && schema?.format === 'advance') return DataVisualization.RichText;
    if (schema?.type === 'string' && schema?.ui?.widget === 'color') return DataVisualization.Color;
    if (schema?.format === 'date') return DataVisualization.Date;
    if (schema?.format === 'date-time') return DataVisualization.DateTime;
    if (schema?.type === 'string' && schema?.enum?.length > 0) return DataVisualization.Enum;
    if (schema?.type === 'string') return DataVisualization.String;
    if (schema?.type === 'number') return DataVisualization.Number;
    if (schema?.type === 'object' && schema?.format === 'map') return DataVisualization.Map;
    if (schema?.type === 'object' || !schema?.type) return DataVisualization.Object;
    if (schema?.type === 'array') return DataVisualization.Array;
    return DataVisualization.Unknown;
  };
  

const SingleDataVisualizationFactory = ({ schema, data }: RJSFSchema) => {
  const DataVisualization = getDataTypeBySchema(schema, SingleDataVisualizationFactory);
  return <DataVisualization {...{ schema, data }} />;
};

SingleDataVisualizationFactory.String = function String({ schema, data }: RJSFSchema) {
  return (
    <Stack gap={1} flexDirection="row" alignItems="center">
      <Typography fontWeight={500}>{schema?.title}: </Typography>
      <Typography>{data || '-'}</Typography>
    </Stack>
  );
};

SingleDataVisualizationFactory.Boolean = function BooleanVisualization({ schema, data }: RJSFSchema) {
  return (
    <Stack gap={1} flexDirection="row" alignItems="center">
      <Typography fontWeight={500}>{schema?.title}: </Typography>
      <Checkbox checked={data} />
    </Stack>
  );
};

SingleDataVisualizationFactory.Image = function ImageVisualization({ schema, data }: RJSFSchema) {
  return (
    <Stack gap={2}>
      <Typography fontWeight={500}>{schema?.title}: </Typography>
      <img src={data} />
    </Stack>
  );
};

SingleDataVisualizationFactory.Video = function VideoVisualization({ schema, data }: RJSFSchema) {
  return (
    <Stack gap={2}>
      <Typography fontWeight={500}>{schema?.title}: </Typography>
        <p>video: {data}</p>
    </Stack>
  );
};

SingleDataVisualizationFactory.Url = function UrlVisualization({ schema, data }: RJSFSchema) {
  return (
    <Stack gap={1} flexDirection="row" alignItems="center">
      <Typography fontWeight={500}>{schema?.title}: </Typography>
      <a href={data}>{data}</a>
    </Stack>
  );
};

SingleDataVisualizationFactory.Map = function MapVisualization({ schema, data }: RJSFSchema) {
  return (
    <Stack gap={2}>
      <Typography fontWeight={500}>{schema?.title}: </Typography>
      <p>map</p>
    </Stack>
  );
};

SingleDataVisualizationFactory.RichText = function RichTextVisualization({ schema, data }: RJSFSchema) {
  return (
    <Stack gap={2}>
      <Typography fontWeight={500}>{schema?.title}: </Typography>
      <div dangerouslySetInnerHTML={{__html: data}} />
    </Stack>
  );
};

SingleDataVisualizationFactory.Enum = function EnumVisualization({ schema, data }: RJSFSchema) {
  const enumName = schema?.enumNames?.[schema.enum?.indexOf(data)];
  return (
    <>
      <Stack gap={1} flexDirection="row" alignItems="center">
        <Typography fontWeight={500}>{schema?.title}: </Typography>
        <p>{data}</p>
      </Stack>
    </>
  );
};

SingleDataVisualizationFactory.Date = function DateVisualization({ schema, data }: RJSFSchema) {
  return (
    <Stack gap={1} flexDirection="row" alignItems="center">
      <Typography fontWeight={500}>{schema?.title}: </Typography>
      <p>{data}</p>
      </Stack>
  );
};

SingleDataVisualizationFactory.DateTime = function DateTimeVisualization({ schema, data }: RJSFSchema) {
  return (
    <Stack gap={1} flexDirection="row" alignItems="center">
      <Typography fontWeight={500}>{schema?.title}: </Typography>
      <p>{data}</p>
      </Stack>
  );
};

SingleDataVisualizationFactory.Number = function NumberVisualization({ schema, data }: RJSFSchema) {
  return (
    <Stack gap={1} flexDirection="row" alignItems="center">
      <Typography fontWeight={500}>{schema?.title}: </Typography>
      <p>{data}</p>
      </Stack>
  );
};

SingleDataVisualizationFactory.Color = function NumberVisualization({ schema, data }: RJSFSchema) {
  return (
    <Stack gap={1} flexDirection="row" alignItems="center">
      <Typography fontWeight={500}>{schema?.title}: </Typography>
      <Box>
        <Chip size="small" sx={{ background: data, direction: 'ltr' }} label={data} />
      </Box>
    </Stack>
  );
};

SingleDataVisualizationFactory.Object = function ObjectVisualization({ schema, data }: RJSFSchema) {
//   const { globalSchema } = useContext(DataVisualizationContext);
//   const isRoot = JSON.stringify(schema) === JSON.stringify(globalSchema);
//   const { itemInfo, product, item } = useProductAndItemInfo();
//   const actions = extractProductItemActions(itemInfo);

//   const { redirectTo } = useRedirect();

  return (
    <Stack
      // borderLeft={`1px solid ${COLORS.GREEN}`}
      gap={3}
      p={3}
      borderRadius={3}
      component={Paper}
      boxShadow="none"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography fontWeight={800}>
          {schema?.title && (
            <>
               {schema?.title}
            </>
          )}
        </Typography>
      </Box>
      {Object.keys(schema?.properties || {}).map((property, index) => (
        <>
          <SingleDataVisualizationFactory schema={schema?.properties[property]} data={(data || {})[property]} />
          {/* {index !== Object.keys(schema?.properties).length - 1 && <Divider />} */}
        </>
      ))}
    </Stack>
  );
};

SingleDataVisualizationFactory.Array = function ArrayVisualization({ schema, data }: RJSFSchema) {
  return (
    <>
      {/* <Accordion sx={{ background: 'transparent', boxShadow: 'none', border: 'none', outline: 'none' }}> */}
      {/*  <AccordionSummary> */}

      {/* </AccordionSummary> */}
      {/* <AccordionDetails> */}
      <Stack
        bgcolor="transparent"
        sx={{ backgroundImage: 'none' }}
        boxShadow="none"
        component={Paper}
        gap={3}
        pl={3}
        ml={1}
        borderRadius={0}
      >
        {schema?.title && (
          <Typography fontWeight={800}>
            {schema?.title}
          </Typography>
        )}
        {data?.length > 0 ? (
          <>
            {data?.map((item, index) => (
              <Box key={index} className="array-item">
                <SingleDataVisualizationFactory {...{ data: item, schema: schema?.items }} />
              </Box>
            ))}
          </>
        ) : (
          <Typography>لیست خالی است!</Typography>
        )}
      </Stack>
      {/* </AccordionDetails> */}
      {/* </Accordion> */}
    </>
  );
};

SingleDataVisualizationFactory.Unknown = function ArrayVisualization({ schema, data }: RJSFSchema) {
  return <></>;
};

export default SingleDataVisualizationFactory;
