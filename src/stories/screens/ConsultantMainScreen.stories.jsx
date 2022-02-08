import React from 'react';
import About from "../../views/room/ConsultationRooms";
import {Container} from 'react-app-common';
import ConsultationRoomService from "../../services/ConsultationRoomService";
import {UserType} from "consult-app-common";
import ConsultationServiceStub from "../stubs/ConsultationServiceStub";
import {MemoryRouter} from "react-router-dom";

export default {
    title: 'Consultant / Main Screen',
    component: About,
};

Container.add(ConsultationRoomService, ConsultationServiceStub);

const Template = (args) => <MemoryRouter><About {...args} /></MemoryRouter>;
export const MainScreen = Template.bind({});

MainScreen.args = {
    role: UserType.Consultant,
    user: {name: "Ramesh"}
};
