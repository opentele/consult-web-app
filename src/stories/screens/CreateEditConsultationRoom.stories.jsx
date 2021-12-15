import React from 'react';
import About from "../../views/room/CreateEditConsultationRoom";

export default {
    title: 'Consultant / Create Edit Consultation Room',
    component: About,
};

const Template = (args) => <About {...args} />;
export const CreateEditConsultationRoom = Template.bind({});

CreateEditConsultationRoom.args = {
};
