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

class FormRecordGroupByDate extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            groups: {}
        }
    }

    static propTypes = {
        groups: PropTypes.object.isRequired,
        groupItemClicked: PropTypes.func,
        formMetaDataList: PropTypes.object.isRequired
    }

    render() {
        const {groupItemClicked, formMetaDataList, groups} = this.props;
        return <Box>
            {Object.keys(groups).map((groupKey) => {
                const group = groups[groupKey];

                return <Accordion onChange={() => {}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{flexShrink: 0}}>{groupKey}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List dense={false}>
                            {group.map((groupItem: FormRecordGroupSummaryItem) => {
                                const formMetaData : FormMetaData = _.find(formMetaDataList, (x: FormMetaData) => x.getId() === groupItem.formId);
                                if (_.isNil(formMetaData)) return null;

                                return <ListItem onClick={() => groupItemClicked()}>
                                    <ListItemIcon>
                                        <DescriptionIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={formMetaData.getTitle()}/>
                                </ListItem>}
                            )}
                        </List>
                    </AccordionDetails>
                </Accordion>})}
        </Box>;
    }
}

export default FormRecordGroupByDate;
