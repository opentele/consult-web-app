import React from 'react';
import ServerErrorMessage from "../../components/ServerErrorMessage";

//👇 This default export determines where your story goes in the story list
export default {
    title: 'Components',
    component: ServerErrorMessage
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <ServerErrorMessage {...args} />;

export const ServerError = Template.bind({});
ServerError.args = {
    message: "User already exists"
};
