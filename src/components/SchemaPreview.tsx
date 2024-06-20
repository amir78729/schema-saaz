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
    ToggleOn, Visibility
} from "@mui/icons-material";
import {
    Box, Button, Card, Chip,
    Collapse,
    Dialog, DialogActions, DialogContent, DialogTitle,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    Tooltip,
    Typography
} from "@mui/material";
import {generatePath, getFieldId, getSchemaFormatFromSchema} from "../utils";
import {DataVisualizationType} from "../types";
import {SchemaAction, useSchema} from "../providers/SchemaProvider";
import Form from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";
import FieldPreview from "./FieldPreview";

type Props = {
    schema: RJSFSchema;
    data: unknown;
    name: string;
    path?: string;
}

// TODO: refactor
const renderHeader = ({icon, schema, onDelete, name, path}: {
    icon?: React.ReactNode,
    schema: RJSFSchema,
    name: string,
    onDelete?: () => void,
    collapse?: boolean;
    onCollapse?: () => void
}) => {
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState<boolean>(false);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);
    const {fields, dispatch} = useSchema();
    const SelectedFieldClass = fields.find(field => field.id === getFieldId(schema))?.Class

    let field;
    if (SelectedFieldClass) {
        field = new SelectedFieldClass(name)
    }
    return (
        <>
            <Dialog open={showEditModal} onClose={() => setShowEditModal(false)}>
                <DialogTitle>Edit <code>{name}</code> Field</DialogTitle>
                <DialogContent>
                    <Form onSubmit={({formData}) => {
                        handleEdit(dispatch, path, formData)
                        setShowEditModal(false);
                    }} schema={field?.getBuilderSchema()} formData={schema} validator={validator}/>
                </DialogContent>
            </Dialog>

            <Dialog open={showPreviewModal} onClose={() => setShowPreviewModal(false)}>
                <DialogTitle><code>{name}</code> Field <span>{onDelete &&
                    <IconButton color="error" onClick={() => setShowDeleteConfirmationModal(true)}><Delete
                        fontSize="small"/></IconButton>}
                    <IconButton
                        color="warning"
                        onClick={() => setShowEditModal(true)}
                    >
                        <Edit fontSize="small"/>
                    </IconButton></span></DialogTitle>
                <DialogContent>
                    <FieldPreview name={name} schema={field?.getBuilderSchema()} data={schema}/>
                </DialogContent>
            </Dialog>

            <Dialog open={showDeleteConfirmationModal} onClose={() => setShowDeleteConfirmationModal(false)}>
                <DialogContent><Typography>Are you sure you want to delete this field?</Typography></DialogContent>
                <DialogActions>
                    <Button fullWidth color="error"
                            onClick={() => setShowDeleteConfirmationModal(false)}>Cancel</Button>
                    <Button fullWidth variant="contained" color="error" onClick={() => {
                        onDelete?.();
                        setShowDeleteConfirmationModal(false)
                    }}>Delete</Button>
                </DialogActions>
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
                <IconButton
                    color="warning"
                    onClick={() => setShowEditModal(true)}
                >
                    <Edit fontSize="small"/>
                </IconButton>

                <IconButton
                    color="info"
                    onClick={() => setShowPreviewModal(true)}
                >
                    <Visibility fontSize="small"/>
                </IconButton>

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

const SchemaPreview = ({schema, data, name, path}: Props) => {
    const FormPreview = getSchemaFormatFromSchema(schema, SchemaPreview)
    return (
        <div>
            <FormPreview {...{schema, data, name, path}} />
        </div>
    )
};

SchemaPreview.String = function String({schema, path, data, name}: DataVisualizationType) {
    const {dispatch} = useSchema();
    return (
        <div>
            {renderHeader({name, path, schema, icon: <TextSnippet/>, onDelete: () => handleDelete(dispatch, path)})}
        </div>
    );
};

SchemaPreview.Number = function Number({schema, path, name}: DataVisualizationType) {
    const {dispatch} = useSchema();
    return (
        <div>
            {renderHeader({name, path, schema, icon: <Numbers/>, onDelete: () => handleDelete(dispatch, path)})}
        </div>
    );
};

SchemaPreview.Boolean = function BooleanVisualization({schema, path, name}: DataVisualizationType) {
    const {dispatch} = useSchema();
    return (
        <div>
            {renderHeader({name, path, schema, icon: <ToggleOn/>, onDelete: () => handleDelete(dispatch, path)})}
        </div>
    );
};

SchemaPreview.Object = function ObjectVisualization({schema, path, data, name}: DataVisualizationType) {
    const {dispatch} = useSchema();
    const properties = Object.keys(schema?.properties || {})

    const [open, setOpen] = React.useState(true);

    const handleCollapse = () => {
        setOpen(!open);
    };

    return (
        <Card sx={{p: 2, m: 2}}>
            {renderHeader({
                name,
                path,
                schema,
                icon: <DataObject/>,
                collapse: open,
                onCollapse: handleCollapse,
                onDelete: () => handleDelete(dispatch, path)
            })}
            <Card sx={{p: 2, m: 2}}>
                <Box
                    px={2} display="flex" justifyContent="space-between">
                    <Typography flex={1}>Properties</Typography>
                    <AddFieldModal parentPath={generatePath(path, 'properties')}/>
                    {open !== undefined &&
                        <IconButton onClick={handleCollapse}>{!open ? <ExpandMore fontSize="small"/> :
                            <ExpandLess fontSize="small"/>}</IconButton>}
                </Box>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    {properties?.length > 0 ? properties?.map((property) => (
                        <>
                            <SchemaPreview
                                name={property}
                                schema={schema.properties[property]}
                                path={generatePath(path, generatePath('properties', property))}
                            />
                        </>
                    )) : (
                        <Typography alignItems="center" textAlign="center" p={3}>
                            Click on <Add fontSize="small"/> button to add properties
                        </Typography>
                    )}
                </Collapse>
            </Card>
        </Card>
    );
};

SchemaPreview.Array = function ArrayVisualization({schema, path, data, name}: DataVisualizationType) {
    const {dispatch} = useSchema();
    return (
        <>
            <Card sx={{p: 2, m: 2}}>
                {renderHeader({name,path,  schema, icon: <DataArray/>, onDelete: () => handleDelete(dispatch, path)})}
                <SchemaPreview
                    {...{schema: schema.items, name, path: generatePath(path, 'items')}}
                />
            </Card>
        </>
    );
};

SchemaPreview.Unknown = function ArrayVisualization() {
    return <></>;
};

export default SchemaPreview;
