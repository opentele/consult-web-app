import {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ConsultAppBar from "../components/ConsultAppBar";
import {Upcoming} from '@mui/icons-material';
import Conferences from "../components/conference/Conferences";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@material-ui/core";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Container} from 'react-app-common';
import ConferenceService from "../services/ConferenceService";

const styles = theme => ({});

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
                this.state.conferences.map(() =>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Accordion 1</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Conferences/>
                        </AccordionDetails>
                    </Accordion>)
            }
            <Upcoming/>
        </>;
    }
}

export default withStyles(styles)(Main);
