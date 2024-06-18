import React, {useState} from "react";
import {RJSFSchema} from "@rjsf/utils";
import AddFieldModal from "./AddFieldModal";
import Numbers from '@mui/icons-material/Numbers';
import {
    Add,
    DataArray,
    DataObject,
    Delete,
    Edit,
    ExpandLess,
    ExpandMore,
    TextSnippet,
    ToggleOn
} from "@mui/icons-material";
import {
    Box, Button, Chip,
    Collapse,
    Dialog,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    Tooltip,
    Typography
} from "@mui/material";
import {getFieldId, getSchemaFormatFromSchema} from "../utils";
import {DataVisualizationType} from "../types";
import {SchemaAction, useSchema} from "../providers/SchemaProvider";
import Form from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";

type Props = {
    schema: RJSFSchema;
    data: unknown;
    name: string;
}


// TODO: refactor
const renderHeader = ({icon, schema, onDelete, collapse, onCollapse, name}: {
    icon?: React.ReactNode,
    schema: RJSFSchema,
    name: string,
    onDelete?: () => void,
    collapse?: boolean;
    onCollapse?: () => void
}) => {
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState<boolean>(false);

    return (
        <>
            <Dialog open={showDeleteConfirmationModal} onClose={() => setShowDeleteConfirmationModal(false)}>
                <Box p={3}>
                    <Typography>Are you sure you want to delete this field?</Typography>
                    <Button color="error" onClick={() => setShowDeleteConfirmationModal(false)}>Cancel</Button>
                    <Button variant="contained" color="error" onClick={() => {
                        onDelete?.();
                        setShowDeleteConfirmationModal(false)
                    }}>Delete</Button>
                </Box>
            </Dialog>
            <ListItem>
                <ListItemText
                    primary={(
                        <>
                            <Typography variant="h6">{schema?.title} <Chip
                                size="small"
                                color="primary"
                                variant="outlined"
                                icon={icon}
                                label={`${schema?.type}${schema?.format ? `: ${schema?.format}` : ''}`}
                            />
                            </Typography>
                            {schema?.description && (
                                <Typography variant="caption">{schema?.description}</Typography>
                            )}
                        </>
                    )}
                />
                {onDelete && <IconButton color="error" onClick={() => setShowDeleteConfirmationModal(true)}><Delete
                    fontSize="small"/></IconButton>}
                <IconButton><Edit fontSize="small"/></IconButton>
                {collapse !== undefined && <IconButton onClick={onCollapse}>{collapse ? <ExpandMore fontSize="small"/> :
                    <ExpandLess fontSize="small"/>}</IconButton>}
            </ListItem>
        </>
    )
}

const handleDelete = (dispatch: React.Dispatch<SchemaAction>, name: string) => {
    dispatch({type: "DELETE_PROPERTY", payload: {name}});
    dispatch({type: "DELETE_REQUIRED", payload: {name}});
}

const handleEdit = (dispatch: React.Dispatch<SchemaAction>, name: string, schema: RJSFSchema) => {
    dispatch({type: "UPDATE_PROPERTY", payload: {name, schema}});
}

const SchemaPreview = ({schema, data, name}: Props) => {
    const FormPreview = getSchemaFormatFromSchema(schema, SchemaPreview)
    return (
        <div>
            <FormPreview {...{schema, data, name}} />
        </div>
    )
};

SchemaPreview.String = function String({schema, data, name}: DataVisualizationType) {
    const {dispatch} = useSchema();
    return (
        <div>
            {renderHeader({name, schema, icon: <TextSnippet/>, onDelete: () => handleDelete(dispatch, name)})}
        </div>
    );
};

SchemaPreview.Number = function Number({schema, name}: DataVisualizationType) {
    const {dispatch} = useSchema();
    return (
        <div>
            {renderHeader({name, schema, icon: <Numbers/>, onDelete: () => handleDelete(dispatch, name)})}
        </div>
    );
};

SchemaPreview.Boolean = function BooleanVisualization({schema, name}: DataVisualizationType) {
    const {dispatch} = useSchema();
    return (
        <div>
            {renderHeader({name, schema, icon: <ToggleOn/>, onDelete: () => handleDelete(dispatch, name)})}
        </div>
    );
};

SchemaPreview.Object = function ObjectVisualization({schema, data, name}: DataVisualizationType) {
    const {dispatch} = useSchema();
    const properties = Object.keys(schema?.properties || {})

    const [open, setOpen] = React.useState(true);

    const handleCollapse = () => {
        setOpen(!open);
    };

    return (
        <div
            style={{border: "#0005 solid 1px", padding: "20px", margin: "5px"}}
        >
            {renderHeader({
                name,
                schema,
                icon: <DataObject/>,
                collapse: open,
                onCollapse: handleCollapse,
                onDelete: () => handleDelete(dispatch, name)
            })}

            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box display="flex" justifyContent="space-between">
                    <p>Properties</p>
                    <AddFieldModal/>
                </Box>
                {properties.length > 0 ? properties.map((property) => (
                    <SchemaPreview
                        name={property}
                        schema={schema.properties[property]}
                        data={data[property]}
                    />
                )) : (
                    <Typography alignItems="center" textAlign="center" p={3}>Click on <Add fontSize="small"/> button to
                        add
                        properties</Typography>
                )}
            </Collapse>
        </div>
    );
};

SchemaPreview.Array = function ArrayVisualization({schema, data, name}: DataVisualizationType) {
    const {dispatch} = useSchema();
    return (
        <>
            {renderHeader({name,schema, icon: <DataArray/>, onDelete: () => handleDelete(dispatch, name)})}
            {data?.map((item, index) => (
                <div key={index} className="array-item">
                    <SchemaPreview
                        {...{data: item, schema: schema.items}}
                    />
                </div>
            ))}
        </>
    );
};

SchemaPreview.Unknown = function ArrayVisualization() {
    return <></>;
};

export default SchemaPreview;
