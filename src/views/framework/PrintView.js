import React from "react";
import ReactToPrint from "react-to-print";
import PropTypes from "prop-types";
import ConsultationRecordPrintView from "../consultation/ConsultationRecordPrintView";
import BaseView from "./BaseView";
import ModalContainerView from "./ModalContainerView";
import {Box, createTheme, Fab, ThemeProvider} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PrintIcon from "@mui/icons-material/Print";
import GlobalContext from "../../framework/GlobalContext";
import {withStyles} from "@mui/styles";
import LightTheme from "../../theming/LightTheme";

const pageStyle = `
  @media print {
    .pagebreak {
      page-break-before: always;
    }
  }
`;

const styles = theme => ({
    pvContainer: {
        width: "100%",
        flexDirection: 'row-reverse',
        display: "flex",
        marginTop: -25,
        paddingRight: 20,
        backgroundColor: "white"
    }
});

class PrintView extends BaseView {
    printComponentRef = null;

    constructor(props) {
        super(props);
    }

    static propTypes = {
        consultationSessionRecordId: PropTypes.number,
        client: PropTypes.object.isRequired,
        messageClose: PropTypes.func.isRequired
    };

    handleAfterPrint = () => {
    };

    handleBeforePrint = () => {
    };

    handleOnBeforeGetContent = () => {
    };

    setAsPrintComponentRef = (ref) => {
        this.printComponentRef = ref;
    };

    reactToPrintContent = () => {
        return this.printComponentRef;
    };

    reactToPrintTrigger = () => {
        return <Fab color="secondary" size="small">
            <PrintIcon/>
        </Fab>;
    };

    render() {
        const {consultationSessionRecordId, client, messageClose, classes} = this.props;

        return (
            <ThemeProvider theme={createTheme(LightTheme)}>
                <ModalContainerView>
                    <Box className={classes.pvContainer}>
                        <Fab color="secondary" size="small" onClick={() => messageClose(false)}>
                            <CloseIcon/>
                        </Fab>
                        <ReactToPrint
                            content={this.reactToPrintContent}
                            documentTitle={`${GlobalContext.getOrganisation().name} - ${GlobalContext.getUser().name} - ${client.name}`}
                            onAfterPrint={this.handleAfterPrint}
                            onBeforeGetContent={this.handleOnBeforeGetContent}
                            onBeforePrint={this.handleBeforePrint}
                            removeAfterPrint
                            trigger={this.reactToPrintTrigger}
                            pageStyle={""}
                        />
                    </Box>
                    <ConsultationRecordPrintView consultationSessionRecordId={consultationSessionRecordId} client={client} ref={this.setAsPrintComponentRef}/>
                </ModalContainerView>
            </ThemeProvider>
        );
    }
}

export default withStyles(styles)(PrintView);
