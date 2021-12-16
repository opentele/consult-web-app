import React from 'react';
import {default as About} from "../../views/UpdateProfile";

//👇 This default export determines where your story goes in the story list
export default {
    title: 'Access / Update Profile',
    component: About
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <About {...args} />;

export const UpdateProfile = Template.bind({});
UpdateProfile.args = {
    email: "abc@example.com",
    name: "Sachin Kadam",
    mobile: "9090909090"
};
