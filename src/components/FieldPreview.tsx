import React from 'react';
import { RJSFSchema } from '@rjsf/utils';
import { Check, Close, DataArray } from '@mui/icons-material';
import {
  Card,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { getSchemaFormatFromSchema } from '../utils';
import { DataVisualizationType } from '../types';

type Props = {
  schema: RJSFSchema;
  data: unknown;
  name: string;
};

// TODO: refactor
const renderHeader = ({ schema }: { data: unknown; schema: RJSFSchema }) => {
  return (
    <>
      <ListItem>
        <ListItemText
          primary={
            <>
              <Typography variant="h6">{schema?.title}</Typography>
              {schema?.description && (
                <Typography variant="caption">{schema?.description}</Typography>
              )}
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

FieldPreview.String = function String({ schema, data }: DataVisualizationType) {
  return (
    <TableRow>
      <TableCell>{schema?.title}</TableCell>
      <TableCell>{data || '-'}</TableCell>
    </TableRow>
  );
};

FieldPreview.Enum = function Enum({ schema, data }: DataVisualizationType) {
  return (
    <TableRow>
      <TableCell>{schema?.title}</TableCell>
      <TableCell>{data || '-'}</TableCell>
    </TableRow>
  );
};

FieldPreview.Number = function Number({ schema, data }: DataVisualizationType) {
  return (
    <TableRow>
      <TableCell>{schema?.title}</TableCell>
      <TableCell>{data || '-'}</TableCell>
    </TableRow>
  );
};

FieldPreview.Boolean = function BooleanVisualization({
  schema,
  data,
}: DataVisualizationType) {
  return (
    <TableRow>
      <TableCell>{schema?.title}</TableCell>
      <TableCell>{data ? <Check /> : <Close />}</TableCell>
    </TableRow>
  );
};

FieldPreview.Object = function ObjectVisualization({
  schema,
  data,
  name,
}: DataVisualizationType) {
  const properties = Object.keys(schema?.properties || {});
  return (
    <Table>
      {renderHeader({
        name,
        schema,
      })}
      <TableBody>
        {properties
          ?.filter((property) => data[property] !== undefined)
          ?.map((property) => (
            <FieldPreview
              key={property}
              data={data[property]}
              name={property}
              schema={schema.properties[property]}
            />
          ))}
      </TableBody>
    </Table>
  );
};

FieldPreview.Array = function ArrayVisualization({
  schema,
  name,
}: DataVisualizationType) {
  return (
    <>
      <Card>
        {renderHeader({ name, schema, icon: <DataArray /> })}
        <FieldPreview {...{ schema: schema.items, name }} />
      </Card>
    </>
  );
};

FieldPreview.Unknown = function ArrayVisualization() {
  return <></>;
};

export default FieldPreview;
