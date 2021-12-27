import React from 'react';
import About from "../../views/consultationSession/ConsultationSessionView";
import ConsultationRoomService from "../../services/ConsultationRoomService";
import {Container} from 'react-app-common';
import ConsultationServiceStub from "../stubs/ConsultationServiceStub";

export default {
    title: 'Conference / Conference View',
    component: About,
};

Container.add(ConsultationRoomService, ConsultationServiceStub);

const Template = (args) => <About {...args} />;
export const ConsultationSessionView = Template.bind({});

ConsultationSessionView.args = {
    jitsiPlaceHolder: true
};
