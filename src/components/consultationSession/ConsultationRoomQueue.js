import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Box, Fab, Link, List, ListItem, ListItemIcon, Paper} from '@material-ui/core';
import {Add, ArrowCircleDown, ArrowCircleUp, Person, VideoCall as VideoCallIcon} from '@mui/icons-material';
import PropTypes from 'prop-types';
import {i18n} from "consult-app-common";

const styles = theme => ({
    root: {
        width: '100%',
    },
    addClient: {
        alignSelf: "flex-end"
    },
    crqContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 20,
        marginBottom: 50
    }
});

class ConsultationRoomQueue extends Component {
    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {
        consultationRoom: PropTypes.object.isRequired,
        containerClassName: PropTypes.string
    }

    render() {
        const {
            classes,
            consultationRoom,
            containerClassName
        } = this.props;

        return (
            <Paper className={[classes.crqContainer, containerClassName]} elevation={2}>
                <Box>
                    <h4>Patients</h4>
                    <List>
                        {
                            consultationRoom.appointments.map((appointment, index, arr) =>
                                <ListItem style={{marginTop: -10}}>
                                    <ListItemIcon>
                                        <Person/>
                                    </ListItemIcon>
                                    <ListItem style={{marginLeft: -35}}>
                                        <Link href="#" underline="always">
                                            {appointment.clientName}
                                        </Link>
                                    </ListItem>
                                    {appointment.active &&
                                    <ListItemIcon>
                                        <VideoCallIcon/>
                                    </ListItemIcon>}
                                    {index !== 0 && <ArrowCircleUp/>}
                                    {index !== (arr.length - 1) && <ArrowCircleDown/>}
                                </ListItem>)
                        }
                    </List>
                </Box>
                <Box className={classes.addClient}>
                    <Fab color="primary" variant="extended">
                        <Add/>{`${i18n.t('add-client')}`}
                    </Fab>
                </Box>
            </Paper>
        );
    }
}

export default withStyles(styles)(ConsultationRoomQueue);
