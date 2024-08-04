import React from 'react';
import { RJSFSchema } from '@rjsf/utils';
import AddFieldModal from './AddFieldModal';
import Numbers from '@mui/icons-material/Numbers';
import { Add, Checklist, DataArray, DataObject, ExpandLess, ExpandMore, Star, TextSnippet, ToggleOn } from '@mui/icons-material';
import { Box, Chip, Collapse, IconButton, ListItem, ListItemText, Paper, Stack, Typography } from '@mui/material';
import { accessToObjectFieldParentByPath, generatePath, getFieldId, getSchemaFormatFromSchema } from '../utils';
import { DataVisualizationType, JsonSchema } from '../types';
import { useSchema } from '../providers/SchemaProvider';
import DeleteFieldButton from './DeleteFieldButton';
import EditFieldButton from './EditFieldButton';
import PreviewFieldButton from './PreviewFieldButton';

// TODO: refactor
const renderHeader = ({
  icon,
  schema,
  name,
  path,
  description,
  isRequired,
}: {
  icon?: React.ReactElement;
  schema: RJSFSchema;
  description?: React.ReactNode;
  path: string;
  name?: string;
  collapse?: boolean;
  onCollapse?: () => void;
  isRequired?: boolean;
}) => {
  const { fields } = useSchema();
  const SelectedFieldClass = fields.find((field) => field.id === getFieldId(schema))?.Class;

  let field;
  if (SelectedFieldClass && name) {
    field = new SelectedFieldClass(name);
  }
  return (
    <>
      <ListItem>
        <ListItemText
          primary={
            <>
              <Typography variant="h6">
                {schema?.title}{' '}
                <Chip
                  size="small"
                  color="primary"
                  variant="outlined"
                  icon={icon}
                  label={`${schema?.type}${schema?.format ? `: ${schema?.format}` : ''}`}
                />{' '}
                {isRequired && <Chip size="small" color="error" variant="outlined" icon={<Star />} label={'Required'} />}
              </Typography>
              {description && <Typography variant="caption">{description}</Typography>}
            </>
          }
        />
        <DeleteFieldButton path={path} />
        <EditFieldButton path={path} schema={schema} field={field} />
        <PreviewFieldButton field={field} schema={schema} path={path} />
      </ListItem>
    </>
  );
};

const isPropertyRequired = (fullSchema: JsonSchema, path: string, name: string) =>
  (accessToObjectFieldParentByPath(fullSchema, path) as JsonSchema)?.required?.includes?.(name as string);

const SchemaPreview = ({ schema, data, name, path }: DataVisualizationType) => {
  const FormPreview = getSchemaFormatFromSchema(schema, SchemaPreview);
  return <FormPreview {...{ schema, data, name, path }} />;
};

SchemaPreview.String = function String({ schema, path, name }: DataVisualizationType<string>) {
  const { schema: fullSchema } = useSchema();

  return (
    <Paper>
      {renderHeader({
        description: schema.description,
        name,
        path,
        schema,
        icon: <TextSnippet />,

        isRequired: isPropertyRequired(fullSchema, path, name),
      })}
    </Paper>
  );
};

SchemaPreview.Enum = function Enum({ schema, path, name }: DataVisualizationType) {
  const { schema: fullSchema } = useSchema();
  const enums = schema.enum;
  return (
    <Paper>
      {renderHeader({
        description: (
          <>
            {schema.description} <Typography variant="caption">Options:</Typography>{' '}
            <Box gap={1} display="flex" flexDirection="row">
              {enums.map((e: unknown, index: number) => (
                <Chip key={(e as string) + index} size="small" label={schema?.enumNames[enums.indexOf(e)] || e} />
              ))}
            </Box>
          </>
        ),
        name,
        path,
        schema,
        icon: <Checklist />,

        isRequired: isPropertyRequired(fullSchema, path, name),
      })}
    </Paper>
  );
};

SchemaPreview.Number = function Number({ schema, path, name }: DataVisualizationType<number>) {
  const { schema: fullSchema } = useSchema();
  return (
    <Paper>
      {renderHeader({
        description: schema.description,
        name,
        path,
        schema,
        icon: <Numbers />,

        isRequired: isPropertyRequired(fullSchema, path, name),
      })}
    </Paper>
  );
};

SchemaPreview.Integer = function Number({ schema, path, name }: DataVisualizationType<number>) {
  const { schema: fullSchema } = useSchema();
  return (
    <Paper>
      {renderHeader({
        description: schema.description,
        name,
        path,
        schema,
        icon: <Numbers />,

        isRequired: isPropertyRequired(fullSchema, path, name),
      })}
    </Paper>
  );
};

SchemaPreview.Boolean = function BooleanVisualization({ schema, path, name }: DataVisualizationType<boolean>) {
  const { schema: fullSchema } = useSchema();
  return (
    <Paper>
      {renderHeader({
        description: schema.description,
        name,
        path,
        schema,
        icon: <ToggleOn />,

        isRequired: isPropertyRequired(fullSchema, path, name),
      })}
    </Paper>
  );
};

SchemaPreview.Object = function ObjectVisualization({
  schema,
  path,
  name,
  data,
}: DataVisualizationType<Record<string, unknown>>) {
  const { schema: fullSchema } = useSchema();
  const properties = Object.keys(schema?.properties || {});

  const [open, setOpen] = React.useState(true);

  const handleCollapse = () => {
    setOpen(!open);
  };

  return (
    <Paper>
      {renderHeader({
        description: schema.description,
        name,
        path,
        schema,
        icon: <DataObject />,
        collapse: open,
        onCollapse: handleCollapse,

        isRequired: isPropertyRequired(fullSchema, path, name),
      })}
      <Paper sx={{ p: 1 }}>
        <Box px={2} display="flex" justifyContent="space-between">
          <Typography flex={1}>Properties</Typography>
          <AddFieldModal parentPath={generatePath(path, 'properties')} />
          {open !== undefined && (
            <IconButton onClick={handleCollapse}>
              {!open ? <ExpandMore fontSize="small" /> : <ExpandLess fontSize="small" />}
            </IconButton>
          )}
        </Box>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Stack gap={2}>
            {properties?.length > 0 ? (
              properties?.map((property) => (
                <>
                  <SchemaPreview
                    data={data}
                    name={property}
                    schema={schema.properties[property]}
                    path={generatePath(path, generatePath('properties', property))}
                  />
                </>
              ))
            ) : (
              <Typography alignItems="center" textAlign="center" p={3}>
                Click on <Add fontSize="small" /> button to add properties
              </Typography>
            )}
          </Stack>
        </Collapse>
      </Paper>
    </Paper>
  );
};

SchemaPreview.Array = function ArrayVisualization({ schema, path, name, data }: DataVisualizationType<unknown[]>) {
  const { schema: fullSchema } = useSchema();
  return (
    <Paper sx={{ p: 1 }}>
      {renderHeader({
        description: schema.description,
        name,
        path,
        schema,
        icon: <DataArray />,

        isRequired: isPropertyRequired(fullSchema, path, name),
      })}
      <Box>
        <SchemaPreview {...{ data, schema: schema.items, name, path: generatePath(path, 'items') }} />
      </Box>
    </Paper>
  );
};

SchemaPreview.Unknown = function UnknownVisualization() {
  return <></>;
};

export default SchemaPreview;
