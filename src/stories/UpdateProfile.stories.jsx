import React from 'react';
import {default as UP} from "../views/UpdateProfile";

//👇 This default export determines where your story goes in the story list
export default {
    title: 'Access',
    component: UP
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <UP {...args} />;

export const UpdateProfile = Template.bind({});
UpdateProfile.args = {
    email: "abc@example.com",
    name: "Sachin Kadam",
    mobile: "9090909090"
};
