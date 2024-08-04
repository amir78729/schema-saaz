import React from 'react';
import { RJSFSchema } from '@rjsf/utils';
import { useSchema } from '../providers/SchemaProvider';
import { getFieldId } from '../utils';
import { Chip, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { Star } from '@mui/icons-material';
import DeleteFieldButton from './DeleteFieldButton';
import EditFieldButton from './EditFieldButton';
import PreviewFieldButton from './PreviewFieldButton';

// TODO: Rename this components!
const FieldBuilderView = ({
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
  const SelectedFieldClass = fields?.find((field) => field.id === getFieldId(schema))?.Class;

  let field;
  if (SelectedFieldClass && name) {
    field = new SelectedFieldClass(name);
  }
  return (
    <Paper>
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
    </Paper>
  );
};

export default FieldBuilderView;
