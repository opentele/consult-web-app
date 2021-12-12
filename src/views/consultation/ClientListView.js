import React from "react";
import {withStyles} from '@material-ui/core/styles';
import {Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Button, Link, Typography} from '@material-ui/core';
import PropTypes from 'prop-types';
import BaseView from "../framework/BaseView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Client from "../../domain/Client";
import Consultation from "../../domain/Consultation";

const styles = theme => ({
    container: {
        display: "flex",
        flexDirection: "column"
    }
});

class ClientListView extends BaseView {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static propTypes = {
        clients: PropTypes.array.isRequired
    }

    render() {
        const {
            classes,
            clients
        } = this.props;

        return <Box className={classes.container}>
            {clients.map((client) => {
                return <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                        <Box sx={{display: "flex", flexDirection: "column"}} style={{width: '100%'}}>
                            <Typography variant="h6">{Client.displayName(client)}</Typography>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails style={{display: "flex", flexDirection: "column"}}>
                        <Typography variant="h6">{Client.totalConsultationsDisplay(client)}</Typography>
                        {client.consultations.map((consultation) => <Typography variant="body1">{Consultation.getSummary(consultation)}</Typography>)}
                    </AccordionDetails>
                    <AccordionActions>
                        <Button color="primary">Client Dashboard</Button>
                    </AccordionActions>
                </Accordion>
            })}
            <Button color="primary" variant="contained" style={{marginTop: 40}}>Close</Button>
        </Box>;
    }
}

export default withStyles(styles)(ClientListView);
