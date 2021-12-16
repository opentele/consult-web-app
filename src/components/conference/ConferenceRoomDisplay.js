import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Accordion, AccordionDetails, AccordionSummary, Button, Fab, List, ListItem, ListItemIcon, ListItemText, Typography} from '@material-ui/core';
import {Add, ArrowCircleDown, ArrowCircleUp, ExpandMore, HourglassFull, PersonOutline, VideoCall} from '@mui/icons-material';
import PropTypes from 'prop-types';

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(22),
        fontWeight: theme.typography.fontWeightRegular,
        backgroundColor: 'lightblue'
    },
});

class ConferenceRoomDisplay extends Component {
    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {
        queue: PropTypes.object.isRequired
    }

    render() {
        const {
            classes,
            queue
        } = this.props;

        return (<Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore/>}
                    aria-controls={`panel${queue.id}-content`}
                    id={`panel${queue.id}-header`}>
                    <Typography className={classes.heading}>{queue.name}</Typography>
                    <HourglassFull/>
                </AccordionSummary>
                <AccordionDetails>
                    <List component="nav" aria-label="main">
                        {
                            queue.items.map((queueItem) =>
                                <ListItem>
                                    <ListItemIcon>
                                        <PersonOutline/>
                                    </ListItemIcon>
                                    <ListItemText primary={queueItem.name}/>
                                    {queueItem.active &&
                                    <ListItemIcon>
                                        <VideoCall/>
                                    </ListItemIcon>}
                                    {queueItem.active && <Button primary variant="contained">Request to join</Button>}
                                    {queueItem.active && <Button primary variant="contained">END CALL</Button>}
                                    {!queueItem.active && <ArrowCircleUp/>}
                                    {!queueItem.active && <ArrowCircleDown/>}
                                    {!queueItem.active && <Button primary variant="contained">START CALL</Button>}
                                    {<Button primary variant="contained">OPEN RECORD</Button>}
                                </ListItem>)
                        }
                    </List>
                </AccordionDetails>
                <Fab color="primary" aria-label="add">
                    <Add/>
                </Fab>
                <br/>
                <br/>
                <br/>
            </Accordion>
        );
    }
}

export default withStyles(styles)(ConferenceRoomDisplay);
