import React from 'react';
import About from "../../views/room/ConsultationRooms";
import {Container} from 'react-app-common';
import ConferenceService from "../../services/ConferenceService";
import ActiveConferences from "../testdata/active-conferences.json";
import {UserType} from "consult-app-common";

export default {
    title: 'Consultant / Main Screen',
    component: About,
};

Container.add(ConferenceService, {
    getConferences: function () {
        return Promise.resolve(ActiveConferences);
    }
});

const Template = (args) => <About {...args} />;
export const MainScreen = Template.bind({});

MainScreen.args = {
    role: UserType.Consultant
};
