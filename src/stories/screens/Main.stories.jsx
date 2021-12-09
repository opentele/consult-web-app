import React from 'react';
import Main from "../../views/RemoteUsherMainView";
import {Container} from 'react-app-common';
import ConferenceService from "../../services/ConferenceService";
import ActiveConferences from "../testdata/active-conferences.json";

export default {
    title: 'Remote Usher / Main View',
    component: Main,
};

Container.add(ConferenceService, {
    getConferences: function () {
        return Promise.resolve(ActiveConferences);
    }
});

const Template = (args) => <Main {...args} />;
export const MainView = Template.bind({});

MainView.args = {
};
