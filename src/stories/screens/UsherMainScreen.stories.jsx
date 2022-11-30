import React from 'react';
import About from "../../views/room/ConsultationRooms";
import {BeanContainer} from 'react-app-common';
import {UserType} from 'consult-app-common';
import ConsultationServiceStub from "../stubs/ConsultationServiceStub";
import ConsultationRoomService from "../../service/ConsultationRoomService";

export default {
    title: 'Moderator / Main Screen',
    component: About,
};

BeanContainer.add(ConsultationRoomService, ConsultationServiceStub);

const Template = (args) => <About {...args} />;
export const MainScreen = Template.bind({});

MainScreen.args = {
    role: UserType.Moderator,
    user: {name: "Ramesh"}
};
