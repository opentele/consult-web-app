import React from 'react';
import About from "../../views/consultationSession/TeleConferenceView";
import ConsultationRoomService from "../../services/ConsultationRoomService";
import ConsultationServiceStub from "../stubs/ConsultationServiceStub";

export default {
    title: 'Session / Session',
    component: About,
};

Container.add(ConsultationRoomService, ConsultationServiceStub);

const Template = (args) => <About {...args} />;
export const Session = Template.bind({});

Session.args = {
    jitsiPlaceHolder: true
};
