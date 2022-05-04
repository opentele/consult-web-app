import React from "react";
import {withStyles} from '@material-ui/core/styles';
import {Box, Card, Grid, Paper} from '@material-ui/core';
import PropTypes from 'prop-types';
import FieldDisplay from "./FieldDisplay";
import {Fab} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import ModalStatus from "../../views/framework/ModalStatus";
import ConsultationRecordView from "../../views/consultation/ConsultationRecordView";
import BaseView from "../../views/framework/BaseView";
import ModalContainerView from "../../views/framework/ModalContainerView";

const styles = theme => ({
    container: {},
    consultation: {
        paddingRight: 15,
        paddingLeft: 15,
        paddingTop: 0,
        paddingBottom: 30
    }
});

class ConsultationDisplay extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            editModalStatus: ModalStatus.NOT_OPENED,
            printModalStatus: ModalStatus.NOT_OPENED
        };
    }

    static propTypes = {
        consultationSessionRecord: PropTypes.object.isRequired,
        client: PropTypes.object.isRequired,
        onModification: PropTypes.func
    }

    refresh() {
        this.props.onModification();
    }

    render() {
        const {
            classes,
            consultationSessionRecord,
            client,
            onModification
        } = this.props;
        const {editModalStatus, printModalStatus} = this.state;

        return <Card elevation={4}>
            {editModalStatus === ModalStatus.OPENED &&
            <ModalContainerView titleKey="consultation-record-create-edit-title" titleObj={{client: client.name}}>
                <Box style={{width: "600px", padding: 20}}>
                    <ConsultationRecordView messageClose={this.getModalCloseHandler("editModalStatus")}
                                            consultationSessionRecordId={consultationSessionRecord.id} client={client}/>
                </Box>
            </ModalContainerView>}

            {printModalStatus === ModalStatus.OPENED &&
                <ModalContainerView titleKey="consultation-record-create-print-title" titleObj={{client: client.name}}>
                    <Box style={{width: "600px", padding: 20}}>

                    </Box>
                </ModalContainerView>
            }

            <Paper style={{height: "15px", backgroundColor: "springgreen", borderRadius: 0}} elevation={0}/>
            <Box className={classes.consultation}>
                {onModification && <Box style={{width: "100%", flexDirection: 'row-reverse', display: "flex", marginTop: 5}}>
                    <Fab color="secondary" aria-label="print" size="small" onClick={this.getModalOpenHandler("printModalStatus")} style={{marginLeft: 4}}>
                        <PrintIcon/>
                    </Fab>
                    <Fab color="secondary" aria-label="edit" size="small" onClick={this.getModalOpenHandler("editModalStatus")}>
                        <EditIcon/>
                    </Fab>
                </Box>}
                <Grid container spacing={3}>
                    <FieldDisplay fieldName="date-of-consultation" fieldValue={consultationSessionRecord.createdOnForDisplay}/>
                    <FieldDisplay fieldName="key-inference" fieldValue={consultationSessionRecord.keyInference}/>
                    <FieldDisplay fieldName="complaints" fieldValue={consultationSessionRecord.complaints}/>
                    <FieldDisplay fieldName="observations" fieldValue={consultationSessionRecord.observations}/>
                    <FieldDisplay fieldName="recommendations" fieldValue={consultationSessionRecord.recommendations}/>
                    <FieldDisplay fieldName="follow-up-in" fieldValue={consultationSessionRecord.followUpIn}/>
                    <FieldDisplay fieldName="created-by" fieldValue={consultationSessionRecord.createdBy}/>
                    {consultationSessionRecord.modifiedBySomeoneElse() &&
                    <FieldDisplay fieldName="last-modified-by" fieldValue={consultationSessionRecord.lastModifiedBy}/>}
                </Grid>
            </Box>
        </Card>;
    }
}

export default withStyles(styles)(ConsultationDisplay);
