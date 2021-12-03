import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ConsultAppBar from "../components/ConsultAppBar";
import {Schedule, Today, History} from '@mui/icons-material';
import {AccordionActions, Accordion, AccordionDetails, AccordionSummary, Button, Typography, Tabs, Tab, Box} from "@material-ui/core";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Container} from 'react-app-common';
import ConferenceService from "../services/ConferenceService";
import {i18n} from 'consult-app-common';
import {Alert} from "@mui/material";
import Conference from "../domain/Conference";

const styles = theme => ({
    conferenceBox: {
        marginTop: 15,
        padding: 6
    }
});

class RemoteUsherMainView extends Component {
    constructor(props, context) {
        super(props, context);
        this.setState = this.setState.bind(this);
        this.state = {conferences: [], tabIndex: 1};
    }

    componentDidMount() {
        Container.get(ConferenceService).getConferences().then((conferences) => {
            this.setState({conferences: conferences});
        });
    }

    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    onTabChange() {
        return (event, tabId) => this.setState({tabIndex: tabId});
    }

    render() {
        const {classes} = this.props;
        const {conferences, tabIndex} = this.state;
        return <>
            <ConsultAppBar/>
            <br/>
            <Tabs value={tabIndex} onChange={this.onTabChange()} aria-label="icon label tabs example">
                <Tab icon={<History/>} label={i18n.t('paste-consultations')}/>
                <Tab icon={<Today/>} label={i18n.t('happening-today')}/>
                <Tab icon={<Schedule/>} label={i18n.t('scheduled-later')}/>
            </Tabs>
            {
                conferences.map((conference) => {
                    const alerts = Conference.getAlerts(conference);
                    return <Accordion className={classes.conferenceBox}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header">
                            <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}} style={{width: '100%'}}>
                                <Box sx={{display: "flex", flexDirection: "column"}}>
                                    <Typography variant="h5">{conference["name"]}</Typography>
                                    <Typography>{`Started: ${conference["started"]}`}</Typography>
                                    <Typography>{`Open Till: ${conference["toEnd"]}`}</Typography>
                                </Box>
                                <Box sx={{display: "flex", flexDirection: "column"}}>
                                    {alerts.map((alert) => <Alert sx={{alignSelf: "flex-start", m: 0.25}} severity={alert.type}>{alert.message}</Alert>)}
                                </Box>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                        </AccordionDetails>
                        <AccordionActions>
                            {Conference.getActions(conference).map((action) => <Button variant="contained" color="primary">{action}</Button>)}
                        </AccordionActions>
                    </Accordion>
                })
            }
        </>;
    }
}

export default withStyles(styles)(RemoteUsherMainView);
