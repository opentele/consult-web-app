import React from 'react';
import PersonView from "../../views/consultation/PersonView";

export default {
    title: 'Person View',
    component: PersonView,
};

const Template = (args) => <PersonView {...args} />;
export const PersonViewT = Template.bind({});

PersonViewT.args = {
};
