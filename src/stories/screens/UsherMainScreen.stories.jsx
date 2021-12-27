import React from 'react';
import About from "../../views/room/ConsultationRooms";
import {Container} from 'react-app-common';
import {UserType} from 'consult-app-common';
import ConsultationServiceStub from "../stubs/ConsultationServiceStub";
import ConsultationRoomService from "../../services/ConsultationRoomService";

export default {
    title: 'Usher / Main Screen',
    component: About,
};

Container.add(ConsultationRoomService, ConsultationServiceStub);

const Template = (args) => <About {...args} />;
export const MainScreen = Template.bind({});

MainScreen.args = {
    role: UserType.Usher
};
