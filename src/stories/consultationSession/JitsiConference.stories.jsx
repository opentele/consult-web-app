import React from 'react';
import About from "../../components/consultationSession/JitsiConference";

export default {
    title: 'Session / Jitsi Conference',
    component: About,
};

const Template = (args) => <About {...args} />;
export const JitsiConference = Template.bind({});

JitsiConference.args = {
};
