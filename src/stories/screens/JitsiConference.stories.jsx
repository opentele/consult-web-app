import React from 'react';
import JitsiConference from "../../views/jitsi/JitsiConference";

export default {
    title: 'Jitsi Conference',
    component: JitsiConference,
};

const Template = (args) => <JitsiConference {...args} />;
export const JitsiConferenceView = Template.bind({});

JitsiConferenceView.args = {
};
