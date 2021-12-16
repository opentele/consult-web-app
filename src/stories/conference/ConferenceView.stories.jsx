import React from 'react';
import About from "../../views/conference/ConferenceView";
import ConferenceService from "../../services/ConferenceService";
import {Container} from 'react-app-common';
import ConferenceServiceStub from "../stubs/ConferenceServiceStub";

export default {
    title: 'Conference / Conference View',
    component: About,
};

Container.add(ConferenceService, ConferenceServiceStub);

const Template = (args) => <About {...args} />;
export const ConferenceView = Template.bind({});

ConferenceView.args = {
    jitsiPlaceHolder: true
};
