import React from 'react';
import { Story, Meta } from '@storybook/react';
import SchemaBuilder, { SchemaBuilderProps } from './SchemaBuilder';

export default {
  title: 'SchemaBuilder',
  component: SchemaBuilder,
} as Meta;

const Template: Story<SchemaBuilderProps> = (args) => <SchemaBuilder {...args} />;

export const Default = Template.bind({});
Default.args = {
  message: "Hello, Storybook!",
};