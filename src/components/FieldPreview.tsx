import React from "react";
import {RJSFSchema} from "@rjsf/utils";
import AddFieldModal from "./AddFieldModal";
import Numbers from '@mui/icons-material/Numbers';
import {
    Add,
    Check,
    Close,
    DataArray,
    DataObject,
    ExpandLess,
    ExpandMore,
    TextSnippet,
    ToggleOn
} from "@mui/icons-material";
import {
    Box,
    Card,
    Chip,
    Collapse,
    IconButton,
    ListItem,
    ListItemText, Table, TableBody,
    TableCell,
    TableRow,
    Typography
} from "@mui/material";
import {getSchemaFormatFromSchema} from "../utils";
import {DataVisualizationType} from "../types";
import {SchemaAction, useSchema} from "../providers/SchemaProvider";

type Props = {
    schema: RJSFSchema;
    data: unknown;
    name: string;
}


// TODO: refactor
const renderHeader = ({data, schema}: {
    data: unknown,
    schema: RJSFSchema,
}) => {
    return (
        <>
            <ListItem>
                <ListItemText
                    primary={(
                        <>
                            <Typography variant="h6">{schema?.title}</Typography>
                            {schema?.description && (
                                <Typography variant="caption">{schema?.description}</Typography>
                            )}
                        </>
                    )}
                />
            </ListItem>
        </>
    )
}


const FieldPreview = ({schema, data, name}: Props) => {
    const FormPreview = getSchemaFormatFromSchema(schema, FieldPreview)
    return (
        <FormPreview {...{schema, data, name}} />
    )
};

FieldPreview.String = function String({schema, data, name}: DataVisualizationType) {
    return (
        <TableRow>
            <TableCell>{schema?.title}</TableCell>
            <TableCell>{data || '-'}</TableCell>
        </TableRow>
    );
};

FieldPreview.Number = function Number({schema, name, data}: DataVisualizationType) {
    return (
        <TableRow>
            <TableCell>{schema?.title}</TableCell>
            <TableCell>{data || '-'}</TableCell>
        </TableRow>
    );
};

FieldPreview.Boolean = function BooleanVisualization({schema, name, data}: DataVisualizationType) {
    return (
        <TableRow>
            <TableCell>{schema?.title}</TableCell>
            <TableCell>{data ? <Check /> : <Close />}</TableCell>
        </TableRow>
    );
};

FieldPreview.Object = function ObjectVisualization({schema, data, name}: DataVisualizationType) {
    const properties = Object.keys(schema?.properties || {})
    return (
        <Table>
            {renderHeader({
                name,
                schema,
            })}
            <TableBody>
                    {properties?.filter((property) => data[property] !== undefined)?.map((property) => (
                        <FieldPreview
                            data={data[property]}
                            name={property}
                            schema={schema.properties[property]}
                        />
                    ))}
            </TableBody>
        </Table>
    );
};

FieldPreview.Array = function ArrayVisualization({schema, data, name}: DataVisualizationType) {
    return (
        <>
            <Card>
            {renderHeader({name, schema, icon: <DataArray/>})}
                <FieldPreview
                    {...{schema: schema.items, name}}
                />
            </Card>
        </>
    );
};

FieldPreview.Unknown = function ArrayVisualization() {
    return <></>;
};

export default FieldPreview;
