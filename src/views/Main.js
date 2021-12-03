import {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ConsultAppBar from "../components/ConsultAppBar";
import {Upcoming} from '@mui/icons-material';
import {Accordion, AccordionDetails, AccordionSummary, Button, Typography} from "@material-ui/core";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Container} from 'react-app-common';
import ConferenceService from "../services/ConferenceService";
import {AccordionActions} from "@mui/material";

const styles = theme => ({
    summary: {
        flexDirection: 'column'
    }
});

class Main extends Component {
    constructor(props, context) {
        super(props, context);
        this.setState = this.setState.bind(this);
        this.state = {conferences: []};
    }

    componentDidMount() {
        Container.get(ConferenceService).getConferences().then((conferences) => {
            this.setState({conferences: conferences});
        });
    }

    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    render() {
        const {classes} = this.props;
        const {conferences} = this.state;
        return <>
            <ConsultAppBar/>
            {
                conferences.map((conference) =>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header">
                            <div className={classes.summary}>
                                <Typography variant="h5">{conference["name"]}</Typography>
                                <Typography>{`Started: ${conference["started"]}`}</Typography>
                                <Typography>{`Open Till: ${conference["toEnd"]}`}</Typography>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                            {conference["importantMessage"] && <Typography>{conference["importantMessage"]}</Typography>}
                            <Typography>{conference["statistics"]}</Typography>
                        </AccordionDetails>
                        <AccordionActions>
                            <Button variant="contained">Cancel</Button>
                            <Button variant="contained">Join</Button>
                        </AccordionActions>
                    </Accordion>)
            }
            <Upcoming/>
        </>;
    }
}

export default withStyles(styles)(Main);
