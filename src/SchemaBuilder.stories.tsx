import React from 'react';
import { Story, Meta } from '@storybook/react';
import SchemaBuilder from './SchemaBuilderProvider';

export default {
  title: 'SchemaBuilder',
  component: SchemaBuilder,
} as Meta;

const Template: Story = (args) => <SchemaBuilder {...args} />;

export const Default = Template.bind({});
Default.args = {};