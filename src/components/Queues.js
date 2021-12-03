import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Fab, Button, Tabs, List, ListItem, ListItemIcon, ListItemText, Typography, Accordion, AccordionSummary, AccordionDetails, Tab} from '@material-ui/core';
import {PersonOutline, VideoCall, ExpandMore, Add, Schedule, ArrowCircleUp, ArrowCircleDown, Today, QueuePlayNext, HourglassFull} from '@mui/icons-material';

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

class Queues extends Component {
    render() {
        const {
            classes,
            queues
        } = this.props;

        return (
            <div className={classes.root}>
                {
                    queues.map((queue) => {
                        return <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMore/>}
                                aria-controls={`panel${queue.id}-content`}
                                id={`panel${queue.id}-header`}>
                                <Typography className={classes.heading}>{queue.name}</Typography>
                                <HourglassFull/>
                            </AccordionSummary>
                            <Tabs value={0} onChange={() => {
                            }} aria-label="icon label tabs example">
                                <Tab icon={<QueuePlayNext/>} label="IN QUEUE"/>
                                <Tab icon={<Today/>} label="SEEN TODAY"/>
                                <Tab icon={<Schedule/>} label="SCHEDULED"/>
                            </Tabs>
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
                    })
                }
            </div>
        );
    }
}

export default withStyles(styles)(Queues);
