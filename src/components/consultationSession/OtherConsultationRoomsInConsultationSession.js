import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Box, Button, Fab, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {Add, ArrowCircleDown, ArrowCircleUp, PersonOutline, VideoCall} from '@mui/icons-material';
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

class OtherConsultationRoomsInConsultationSession extends Component {
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

        return (
            <Box>
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
                                {!queueItem.active && <ArrowCircleUp/>}
                                {!queueItem.active && <ArrowCircleDown/>}
                                {<Button primary variant="contained">OPEN RECORD</Button>}
                            </ListItem>)
                    }
                </List>
                <Fab color="primary" aria-label="add">
                    <Add/>
                </Fab>
            </Box>
        );
    }
}

export default withStyles(styles)(OtherConsultationRoomsInConsultationSession);
