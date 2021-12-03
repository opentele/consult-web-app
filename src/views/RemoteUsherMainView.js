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

const styles = theme => ({
    summaryContainer: {
        flexDirection: 'row',
        flex: 1
    },
    summary: {
        flexDirection: 'column',
        flex: 0.66
    },
    summaryAlert: {
        flex: 0.33
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
                conferences.map((conference) =>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header">
                            <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}} style={{ width: '100%' }}>
                                <Box sx={{display: "flex", flexDirection: "column"}}>
                                    <Typography variant="h5">{conference["name"]}</Typography>
                                    <Typography>{`Started: ${conference["started"]}`}</Typography>
                                    <Typography>{`Open Till: ${conference["toEnd"]}`}</Typography>
                                </Box>
                                <Alert severity="info">This is an info alert — check it out!</Alert>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={classes.summary}>
                                {ConferenceService.getClientMessage(conference) && <Typography>{conference["importantMessage"]}</Typography>}
                                <Typography>{conference["statistics"]}</Typography>
                            </div>
                        </AccordionDetails>
                        <AccordionActions>
                            {conference["signedUp"] && <Button variant="contained">{i18n.t('view-my-clients')}</Button>}
                            {conference["signedUp"] && <Button variant="contained">{i18n.t('join-conference')}</Button>}
                            {!conference["signedUp"] && <Button variant="contained">{i18n.t('add-client')}</Button>}
                        </AccordionActions>
                    </Accordion>)
            }
        </>;
    }
}

export default withStyles(styles)(RemoteUsherMainView);
