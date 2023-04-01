import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Button, Card, makeStyles, TextField, Typography} from '@mui/material';
import {Event, ExpandMore} from "@mui/icons-material";
import patientRecord from '../testdata/patient-record.json';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        padding: 10
    }
}));

export default function HealthRecord() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="h4">{patientRecord.name}</Typography>
            <Typography variant="h6">{`Date of birth: ${patientRecord.dateOfBirth}`}</Typography>
            <Typography variant="h6">{`AGE: ${patientRecord.age}`}</Typography>
            <Typography variant="h6">{`REGISTRATION NUMBER: ${patientRecord.registrationNumber}`}</Typography>
            <Typography variant="h6">{`PHONE NUMBER: ${patientRecord.phoneNumber}`}</Typography>
            <br/>
            <br/>
            <Typography variant="h5">PAST CONSULTATIONS</Typography>
            <br/>
            {
                patientRecord.consultations.map((consultation) => {
                    return <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMore/>}
                            aria-controls={`panel-content`}
                            id={`panel-header`}>
                            <Typography className={classes.heading}>{consultation["dateOfConsultation"]}</Typography>
                            <Event/>
                            <Typography variant="body1" gutterBottom>{consultation["keyInference"]}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Card variant="outlined">
                                <Typography variant="h5" gutterBottom component="div">NOTES</Typography>
                                <Typography variant="body1" gutterBottom>{consultation["notes"]}</Typography>
                            </Card>
                        </AccordionDetails>
                        <AccordionDetails>
                            <Card variant="outlined">
                                <Typography variant="h5" gutterBottom component="div">ORDERS</Typography>
                                <Typography variant="body1" gutterBottom>{consultation["orders"]}</Typography>
                            </Card>
                        </AccordionDetails>
                        <AccordionDetails>
                            <Typography variant="h6" gutterBottom component="div">{`FOLLOW UP IN: ${consultation["followUpIn"]}`}</Typography>
                        </AccordionDetails>
                    </Accordion>;
                })
            }

            <br/>
            <br/>
            <Typography variant="h5">CURRENT CONSULTATION</Typography>
            <TextField
                id="notes"
                label="NOTES"
                multiline
                fullWidth
                rows={6}
                maxRows={10}
                onChange={() => {}}
            />
            <br/>
            <TextField
                id="keyInference"
                label="SUMMARY INFERENCE"
                fullWidth
                onChange={() => {}}
            />
            <br/>
            <TextField
                id="order"
                label="ORDER"
                multiline
                fullWidth
                rows={6}
                maxRows={10}
                onChange={() => {}}
            />
            <Button primary>SAVE</Button>
        </div>
    );
}
