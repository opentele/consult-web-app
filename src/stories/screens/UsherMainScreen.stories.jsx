import React from 'react';
import About from "../../views/room/ConsultationRooms";
import {Container} from 'react-app-common';
import {UserType} from 'consult-app-common';
import ConferenceServiceStub from "../stubs/ConferenceServiceStub";
import ConferenceService from "../../services/ConferenceService";

export default {
    title: 'Usher / Main Screen',
    component: About,
};

Container.add(ConferenceService, ConferenceServiceStub);

const Template = (args) => <About {...args} />;
export const MainScreen = Template.bind({});

MainScreen.args = {
    role: UserType.Usher
};
