import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Box, Fab, Link, List, ListItem, ListItemIcon, Menu, MenuItem, Paper} from '@material-ui/core';
import {Add, ArrowCircleDown, ArrowCircleUp, Person, VideoCall as VideoCallIcon} from '@mui/icons-material';
import PropTypes from 'prop-types';
import {i18n} from "consult-app-common";
import _ from 'lodash';

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
        marginBottom: 100
    }
});

class ConsultationRoomQueue extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            clientMenuAnchor: null
        }
    }

    static propTypes = {
        consultationRoom: PropTypes.object.isRequired,
        containerClassName: PropTypes.string
    }

    getCloseClientMenuHandler() {
        return (e) => {
            this.setState({clientMenuAnchor: null})
        }
    }

    render() {
        const {
            classes,
            consultationRoom,
            containerClassName
        } = this.props;

        const {clientMenuAnchor} = this.state;

        return (
            <Paper className={[classes.crqContainer, containerClassName]} elevation={2}>
                <Box>
                    <h4>Patients</h4>
                    <List>
                        {
                            consultationRoom.appointments.map((appointment, index, arr) =>
                                <ListItem style={{marginTop: -10}} onClick={(e) => this.setState({clientMenuAnchor: e.currentTarget})}>
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
                    <Menu anchorEl={clientMenuAnchor} open={!_.isNil(clientMenuAnchor)} onClose={this.getCloseClientMenuHandler()}
                          anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'left',
                          }}
                          transformOrigin={{
                              vertical: 'top',
                              horizontal: 'left',
                          }}>
                        <MenuItem onClick={this.getCloseClientMenuHandler()}>{i18n.t('set-as-active-client')}</MenuItem>
                        <MenuItem onClick={this.getCloseClientMenuHandler()}>{i18n.t('open-client-record')}</MenuItem>
                    </Menu>
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
