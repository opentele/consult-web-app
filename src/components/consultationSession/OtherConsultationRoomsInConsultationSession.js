import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Box, Fab, Link, List, ListItem, ListItemIcon} from '@material-ui/core';
import {Add, ArrowCircleDown, ArrowCircleUp, PersonOutline, VideoCall as VideoCallIcon} from '@mui/icons-material';
import PropTypes from 'prop-types';
import {i18n} from "consult-app-common";

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(22),
        fontWeight: theme.typography.fontWeightRegular,
        backgroundColor: 'lightblue'
    },
    addClient: {
        alignSelf: "flex-end"
    },
    container: {
        display: "flex",
        flexDirection: "column"
    }
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
            queue,
            style
        } = this.props;

        return (
            <Box style={style} className={classes.container}>
                <List component="nav" aria-label="main">
                    {
                        queue.items.map((queueItem) =>
                            <ListItem>
                                <ListItemIcon>
                                    <PersonOutline/>
                                </ListItemIcon>
                                <ListItem>
                                    <Link href="#" underline="always">
                                        {queueItem.name}
                                    </Link>
                                </ListItem>
                                {queueItem.active &&
                                <ListItemIcon>
                                    <VideoCallIcon/>
                                </ListItemIcon>}
                                {!queueItem.active && <ArrowCircleUp/>}
                                {!queueItem.active && <ArrowCircleDown/>}
                            </ListItem>)
                    }
                </List>
                <Box className={classes.addClient}>
                    <Fab color="primary" aria-label="add" variant="extended">
                        <Add/>{`${i18n.t('add-client')}`}
                    </Fab>
                </Box>
            </Box>
        );
    }
}

export default withStyles(styles)(OtherConsultationRoomsInConsultationSession);
