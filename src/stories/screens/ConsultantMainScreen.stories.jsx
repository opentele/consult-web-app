import React from 'react';
import About from "../../views/room/ConsultationRooms";
import {Container} from 'react-app-common';
import ConferenceService from "../../services/ConferenceService";
import {UserType} from "consult-app-common";
import ConferenceServiceStub from "../stubs/ConferenceServiceStub";

export default {
    title: 'Consultant / Main Screen',
    component: About,
};

Container.add(ConferenceService, ConferenceServiceStub);

const Template = (args) => <About {...args} />;
export const MainScreen = Template.bind({});

MainScreen.args = {
    role: UserType.Consultant
};
