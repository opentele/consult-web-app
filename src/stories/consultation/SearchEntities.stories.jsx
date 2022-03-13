import React from 'react';
import About from "../../components/SearchEntities";

export default {
    title: 'Component / Search Entities',
    component: About,
};

const Template = (args) => <About {...args} />;
export const SearchEntities = Template.bind({});

SearchEntities.args = {
};
