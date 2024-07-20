import React from 'react';
import { RJSFSchema } from '@rjsf/utils';
import { Check, Close } from '@mui/icons-material';
import { Card, ListItem, ListItemText, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import { getSchemaFormatFromSchema } from '../utils';
import { DataVisualizationType } from '../types';

type Props = {
  schema: RJSFSchema;
  data: unknown;
  name?: string;
};

// TODO: refactor
const renderHeader = ({ schema }: { schema: RJSFSchema }) => {
  return (
    <>
      <ListItem>
        <ListItemText
          primary={
            <>
              <Typography variant="h6">{schema?.title}</Typography>
              {schema?.description && <Typography variant="caption">{schema?.description}</Typography>}
            </>
          }
        />
      </ListItem>
    </>
  );
};

const FieldPreview = ({ schema, data, name }: Props) => {
  const FormPreview = getSchemaFormatFromSchema(schema, FieldPreview);
  return <FormPreview {...{ schema, data, name }} />;
};

FieldPreview.String = function String({ schema, data }: DataVisualizationType<string>) {
  return (
    <TableRow>
      <TableCell>{schema?.title}</TableCell>
      <TableCell>{data || '-'}</TableCell>
    </TableRow>
  );
};

FieldPreview.Enum = function Enum({ schema, data }: DataVisualizationType<number | string>) {
  return (
    <TableRow>
      <TableCell>{schema?.title}</TableCell>
      <TableCell>{data || '-'}</TableCell>
    </TableRow>
  );
};

FieldPreview.Number = function Number({ schema, data }: DataVisualizationType<number>) {
  return (
    <TableRow>
      <TableCell>{schema?.title}</TableCell>
      <TableCell>{data || '-'}</TableCell>
    </TableRow>
  );
};

FieldPreview.Integer = function Integer({ schema, data }: DataVisualizationType<number>) {
  return (
    <TableRow>
      <TableCell>{schema?.title}</TableCell>
      <TableCell>{data || '-'}</TableCell>
    </TableRow>
  );
};

FieldPreview.Boolean = function BooleanVisualization({ schema, data }: DataVisualizationType<boolean>) {
  return (
    <TableRow>
      <TableCell>{schema?.title}</TableCell>
      <TableCell>{data ? <Check /> : <Close />}</TableCell>
    </TableRow>
  );
};

FieldPreview.Object = function ObjectVisualization({ schema, data }: DataVisualizationType<Record<string, unknown>>) {
  const properties = Object.keys(schema?.properties || {});
  return (
    <Table>
      {renderHeader({
        schema,
      })}
      <TableBody>
        {properties
          ?.filter((property) => data[property] !== undefined)
          ?.map((property) => (
            <FieldPreview key={property} data={data[property]} name={property} schema={schema.properties[property]} />
          ))}
      </TableBody>
    </Table>
  );
};

FieldPreview.Array = function ArrayVisualization({ schema, name, data }: DataVisualizationType<unknown[]>) {
  return (
    <>
      <Card>
        {renderHeader({ schema })}
        <FieldPreview {...{ schema: schema.items, name, data }} />
      </Card>
    </>
  );
};

FieldPreview.Unknown = function ArrayVisualization() {
  return <></>;
};

export default FieldPreview;
