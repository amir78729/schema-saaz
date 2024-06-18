import React from "react";
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
import {Box, Collapse, IconButton, ListItem, ListItemIcon, ListItemText, Tooltip, Typography} from "@mui/material";
import {getSchemaFormatFromSchema} from "../utils";
import {DataVisualizationType} from "../types";
import {useSchema} from "../providers/SchemaProvider";

type Props = {
    schema: RJSFSchema;
    data: unknown;
    name: string;
}


const renderHeader = ({icon, schema, onDelete, collapse, onCollapse}: {
    icon?: React.ReactNode,
    schema: RJSFSchema,
    onDelete?: () => void,
    collapse?: boolean;
    onCollapse: () => void
}) => (
    <ListItem>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        {schema?.title && <Tooltip title={schema?.description}><ListItemText primary={schema.title}/></Tooltip>}
        {onDelete && <IconButton onClick={onDelete}><Delete fontSize="small"/></IconButton>}
        <IconButton><Edit fontSize="small"/></IconButton>
        {collapse !== undefined && <IconButton onClick={onCollapse}>{collapse ? <ExpandMore fontSize="small"/> :
            <ExpandLess fontSize="small"/>}</IconButton>}
    </ListItem>
)

const handleDelete = (dispatch, name) => {
    dispatch({type: "DELETE_PROPERTY", payload: {name}});
    dispatch({type: "DELETE_REQUIRED", payload: {name}});
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
            {renderHeader({schema, icon: <TextSnippet/>, onDelete: () => handleDelete(dispatch, name)})}
        </div>
    );
};

SchemaPreview.Number = function Number({schema, data, name}: DataVisualizationType) {
    const {dispatch} = useSchema();
    return (
        <div>
            {renderHeader({schema, icon: <Numbers/>, onDelete: () => handleDelete(dispatch, name)})}
        </div>
    );
};

SchemaPreview.Boolean = function BooleanVisualization({schema, data, name}: DataVisualizationType) {
    const {dispatch} = useSchema();
    return (
        <div>
            {renderHeader({schema, icon: <ToggleOn/>, onDelete: () => handleDelete(dispatch, name)})}
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
            {renderHeader({schema, icon: <DataArray/>, onDelete: () => handleDelete(dispatch, name)})}
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
