import React from 'react';
import Queues from "../../components/Queues";
import queues from '../testdata/queues.json';

//👇 This default export determines where your story goes in the story list
export default {
    title: 'Components',
    component: Queues
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <Queues {...args} />;

export const QueuesView = Template.bind({});
QueuesView.args = {
    queues: queues
};
