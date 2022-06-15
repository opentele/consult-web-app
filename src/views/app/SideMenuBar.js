import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {withStyles} from '@mui/styles';
import {Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {i18n} from "consult-app-common";
import {Redirect} from "react-router-dom";

const styles = theme => ({});

class SideMenuBar extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            managingUsers: false
        };
    }

    static propTypes = {
        onClose: PropTypes.func.isRequired
    };

    render() {
        const {classes, onClose} = this.props;
        const {managingUsers} = this.state;

        if (managingUsers)
            return <Redirect to="/users"/>;

        return <Drawer anchor="left" open={true} onClose={() => {
        }} ModalProps={{ onBackdropClick: onClose }} onKeyDown={onClose}>
            <Box
                sx={{width: 250, marginTop: 50}}
                role="presentation">
                <List>
                    <ListItem button key="manage-users" onClick={() => this.setState({managingUsers: true})}>
                        <ListItemIcon>
                            <InboxIcon/>
                        </ListItemIcon>
                        <ListItemText primary={i18n.t('manage-users-menu-item')}/>
                    </ListItem>
                    <ListItem button key="search-clients">
                        <ListItemIcon>
                            <InboxIcon/>
                        </ListItemIcon>
                        <ListItemText primary={i18n.t('search-clients-menu-item')}/>
                    </ListItem>
                </List>
                <Divider/>
                <List>
                    {['Logout'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>;
    }
}

export default withStyles(styles)(SideMenuBar);
