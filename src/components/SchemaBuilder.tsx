import Form from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";
import React from "react";
import AddFieldModal from "./AddFieldModal";
import {SchemaProvider, useSchema} from "../providers/SchemaProvider";
import {JsonSchemaField} from "../fields/JsonSchemaField";
import {FieldConfig} from "../types";


const SchemaBuilder = () => {
    const {schema} = useSchema();

    return (
        <div>
            <p>Form Preview:</p>
            <Form schema={schema} validator={validator}/>
            <p>Schema:</p>
            <pre>{JSON.stringify(schema, null, 2)}</pre>
            <hr/>
            <AddFieldModal/>
        </div>
    );
};

export default SchemaBuilder;
