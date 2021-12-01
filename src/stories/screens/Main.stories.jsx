import React from 'react';
import Main from "../../views/Main";
import {Container} from 'react-app-common';
import ConferenceService from "../../services/ConferenceService";
import ServerErrorMessage from "../../components/ServerErrorMessage";
import ActiveConferences from "../testdata/active-conferences.json";

export default {
    title: 'Main Screen',
    component: ServerErrorMessage,
};

Container.add(ConferenceService, {
    getConferences: function () {
        return Promise.resolve(ActiveConferences);
    }
});

const Template = (args) => <Main {...args} />;
export const MainView = Template.bind({});

MainView.args = {
    message: "User already exists"
};
