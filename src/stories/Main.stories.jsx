import React from 'react';
import Main from "../views/Main";
import {Container} from 'consult-app-common';
import ConferenceService from "../services/ConferenceService";

export default {
    title: 'Main',
    component: Main,
};

Container.add(ConferenceService, {
    getConferences: function () {
        return {};
    }
});

const Template = (args) => <Main {...args} />;
export const MainView = Template.bind({});

MainView.args = {
};
