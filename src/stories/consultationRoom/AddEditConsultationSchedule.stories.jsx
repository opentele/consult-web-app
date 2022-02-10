import React from 'react';

import About from "../../views/room/AddEditConsultationSchedule";
import {MemoryRouter} from "react-router-dom";

//👇 This default export determines where your story goes in the story list
export default {
    title: 'Consultant and Remote Usher / Add Edit Consultation Schedule',
    component: About
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <MemoryRouter><About {...args} /></MemoryRouter>;

export const AddEditConsultationSchedule = Template.bind({});
