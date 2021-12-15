import React from 'react';
import About from "../../views/consultation/ConsultationRecordView";

export default {
    title: 'Consultant and Remote Usher / Consultation Record',
    component: About,
};

const Template = (args) => <About {...args} />;
export const ConsultationRecord = Template.bind({});

ConsultationRecord.args = {
};
