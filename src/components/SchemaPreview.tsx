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

type Props = {
    schema: RJSFSchema;
    data: unknown;
}


const renderHeader = ({icon, schema, onDelete, collapse, onCollapse}) => (
    <ListItem display="flex" alignItems="center">
        <Box flex={1} display="flex" alignItems="center">
            {icon && <ListItemIcon>{icon}</ListItemIcon>}
            {schema?.title && <Tooltip title={schema?.description}><ListItemText primary={schema.title}/></Tooltip>}
        </Box>
        <IconButton><Delete fontSize="small"/></IconButton>
        <IconButton><Edit fontSize="small"/></IconButton>
        {collapse !== undefined && <IconButton onClick={onCollapse}>{collapse ? <ExpandMore fontSize="small"/> :
            <ExpandLess fontSize="small"/>}</IconButton>}
    </ListItem>
)


const SchemaPreview = ({schema, data}: Props) => {
    const FormPreview = getSchemaFormatFromSchema(schema, SchemaPreview)
    return (
        <div>
            <FormPreview {...{schema, data}} />
        </div>
    )
};

SchemaPreview.String = function String({schema, data}: DataVisualizationType) {
    return (
        <div>
            {renderHeader({schema, icon: <TextSnippet/>})}
        </div>
    );
};

SchemaPreview.Number = function Number({schema, data}: DataVisualizationType) {
    return (
        <div>
            {renderHeader({schema, icon: <Numbers/>})}
        </div>
    );
};

SchemaPreview.Boolean = function BooleanVisualization({schema, data}: DataVisualizationType) {
    return (
        <div>
            {renderHeader({schema, icon: <ToggleOn/>})}
        </div>
    );
};

SchemaPreview.Object = function ObjectVisualization({schema, data}: DataVisualizationType) {
    const properties = Object.keys(schema?.properties || {})

    const [open, setOpen] = React.useState(true);

    const handleCollapse = () => {
        setOpen(!open);
    };

    return (
        <div
            style={{border: "#0005 solid 1px", padding: "20px", margin: "5px"}}
        >
            {renderHeader({schema, icon: <DataObject/>, collapse: open, onCollapse: handleCollapse})}

            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box display="flex" justifyContent="space-between">
                    <p>Properties</p>
                    <AddFieldModal/>
                </Box>
                {properties.length > 0 ? properties.map((property) => (
                    <SchemaPreview
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

SchemaPreview.Array = function ArrayVisualization({schema, data}: DataVisualizationType) {
    return (
        <>
            {renderHeader({schema, icon: <DataArray/>})}
            <Collapse in={open} timeout="auto" unmountOnExit>
                {data?.map((item, index) => (
                    <div key={index} className="array-item">
                        <SchemaPreview
                            {...{data: item, schema: schema.items}}
                        />
                    </div>
                ))}
            </Collapse>
        </>
    );
};

SchemaPreview.Unknown = function ArrayVisualization() {
    return <></>;
};

export default SchemaPreview;
