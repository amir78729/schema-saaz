import React from 'react';
import {Story, Meta} from '@storybook/react';
import SchemaBuilder from '../components/SchemaBuilder';
import {STRING_WIDGETS} from "../constants";
import {SchemaProvider} from "../providers/SchemaProvider";
import {createTheme, ThemeProvider} from "@mui/material";

const sampleSchema = {
    "title": "Example Schema",
    "description": "A rich JSON schema example without dependencies and no nested objects.",
    "type": "object",
    "properties": {
        "id": {
            "title": "Identifier",
            "description": "A unique identifier for the item.",
            "type": "string",
            "pattern": "^[a-zA-Z0-9-]+$"
        },
        "name": {
            "title": "Name",
            "description": "The name of the item.",
            "type": "string",
            "minLength": 1
        },
        "price": {
            "title": "Price",
            "description": "The price of the item.",
            "type": "number",
            "minimum": 0
        },
        "tags": {
            "title": "Tags",
            "description": "Tags associated with the item.",
            "type": "array",
            "items": {
                "type": "string",
                'title': 'Tag Name'
            },
            "uniqueItems": true
        },
        "faq": {
            "title": "FAQ",
            "type": "array",
            "items": {
                "type": "object",
                title: 'List of Questions',
                properties: {
                    question: {
                        title: 'question',
                        type: 'string',
                    },
                    answer: {
                        title: 'answer',
                        type: 'string',
                    }
                }
            },
            "uniqueItems": true
        },
        "length": {
            "title": "Length",
            "description": "The length of the item.",
            "type": "number",
            "minimum": 0
        },
        "width": {
            "title": "Width",
            "description": "The width of the item.",
            "type": "number",
            "minimum": 0
        },
        "height": {
            "title": "Height",
            "description": "The height of the item.",
            "type": "number",
            "minimum": 0
        },
        "latitude": {
            "title": "Latitude",
            "description": "Latitude of the warehouse location.",
            "type": "number",
            "minimum": -90,
            "maximum": 90
        },
        "longitude": {
            "title": "Longitude",
            "description": "Longitude of the warehouse location.",
            "type": "number",
            "minimum": -180,
            "maximum": 180
        },
        "inStock": {
            "title": "In Stock",
            "description": "Indicates if the item is in stock.",
            "type": "boolean"
        }
    },
    "required": ["id", "name", "price"],
    "additionalProperties": false
};

export default {
    title: 'SchemaBuilder',
    component: SchemaBuilder,
} as Meta;

const Template: Story = (args) => (
    <SchemaProvider extraFields={args.extraFields || []}>
        <SchemaBuilder {...args} />
    </SchemaProvider>
);

export const Primitives = Template.bind({});
Primitives.args = {};


export const Formats = Template.bind({});
Formats.args = {
    extraFields: [...STRING_WIDGETS]
};

const DefaultValueTemplate: Story = (args) => (
    <SchemaProvider value={sampleSchema} extraFields={args.extraFields || []}>
        <SchemaBuilder {...args} />
    </SchemaProvider>
);

export const WithDefaultValue = DefaultValueTemplate.bind({});
WithDefaultValue.args = {
    extraFields: [...STRING_WIDGETS]
};
const ThemedTemplate: Story = (args) => {
    const theme = createTheme(args.theme)
    return (
        <ThemeProvider theme={theme}>
            <SchemaProvider value={sampleSchema} extraFields={args.extraFields || []}>
                <SchemaBuilder {...args} />
            </SchemaProvider>
        </ThemeProvider>
    )
};

export const Themed = ThemedTemplate.bind({});
Themed.args = {
    extraFields: [...STRING_WIDGETS],
    theme: {
        palette: {
            primary: {
              main: '#ff5722'
            },
            mode: 'dark'
        }
    }
};