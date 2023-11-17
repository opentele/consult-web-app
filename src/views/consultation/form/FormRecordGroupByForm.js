import BaseView from "../../framework/BaseView";
import {Accordion, AccordionDetails, AccordionSummary, Box, List, ListItem, ListItemIcon, ListItemText, Typography} from "@mui/material";
import PropTypes from "prop-types";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DescriptionIcon from "@mui/icons-material/Description";
import React from "react";
import {ServerCall} from "react-app-common";
import ConsultationRecordService from "../../../service/ConsultationRecordService";
import FormRecordGroupSummaryItem from "./FormRecordGroupSummaryItem";
import FormMetaData from "../../../domain/form/FormMetaData";
import _ from 'lodash';
import {CardsSkeleton} from "../../../components/ConsultSkeleton";

class FormRecordGroupByDate extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            getFormRecordGroupCall: ServerCall.createInitial([])
        }
    }

    static propTypes = {
        client: PropTypes.object.isRequired,
        groupItemClicked: PropTypes.func,
        formMetaDataList: PropTypes.object.isRequired
    }

    componentDidMount() {
        const {client} = this.props;
        const serviceCall = ConsultationRecordService.getFormRecordSummaryByForm(client);
        this.makeServerCall(serviceCall, "getFormRecordGroupCall");
    }

    render() {
        const {getFormRecordGroupCall} = this.state;
        const {groupItemClicked, formMetaDataList} = this.props;
        const groups = ServerCall.getData(getFormRecordGroupCall);
        return <Box>
            {Object.keys(groups).map((groupKey) => {
                const group = groups[groupKey];
                const formMetaData : FormMetaData = _.find(formMetaDataList, (x: FormMetaData) => x.getId() === groupKey);

                return <Accordion onChange={() => {}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        {_.isNil(formMetaData) ? <CardsSkeleton/> : <Typography sx={{flexShrink: 0}}>{formMetaData.getTitle()}</Typography>}
                    </AccordionSummary>
                    <AccordionDetails>
                        <List dense={false}>
                            {group.map((groupItem: FormRecordGroupSummaryItem) => {
                                if (_.isNil(formMetaData)) return null;

                                return <ListItem onClick={() => groupItemClicked()}>
                                    <ListItemIcon>
                                        <DescriptionIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={groupItem.creationDate}/>
                                </ListItem>}
                            )}
                        </List>
                    </AccordionDetails>
                </Accordion>})}
        </Box>;
    }
}

export default FormRecordGroupByDate;
