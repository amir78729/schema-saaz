import React from 'react';
import { Story, Meta } from '@storybook/react';
import SchemaBuilder from '../components/SchemaBuilder';
import {STRING_WIDGETS} from "../constants";
import {SchemaProvider} from "../providers/SchemaProvider";

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

