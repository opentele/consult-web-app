import React from 'react';
import ConsultationRecordView from "../../views/consultation/ConsultationRecordView";

export default {
    title: 'Consultation View',
    component: ConsultationRecordView,
};

const Template = (args) => <ConsultationRecordView {...args} />;
export const ConsultationRecordViewT = Template.bind({});

ConsultationRecordViewT.args = {
};
