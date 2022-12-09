import _ from "lodash";
import CommonCSS from "./CommonCSS";
import GlobalContext from "../framework/GlobalContext";
import {DarkColors} from "./DarkTheme";
import {LightColors} from "./LightTheme";

const tableHeaderD = {
    "& th": {
        color: "#6B7CFF",
        ...CommonCSS.tableHeader
    }
};

const tableHeaderL = {
    "& th": {
        color: "#645DF9",
        ...CommonCSS.tableHeader
    }
};

const tableRowL = {
    "&:nth-of-type(odd)": {
        backgroundColor: "#F8F8FC"
    }
}

const tableRowD = {
    "&:nth-of-type(odd)": {
        backgroundColor: DarkColors.DefaultBackground
    }
}

const primaryButtonD = {
    backgroundColor: DarkColors.DefaultBackground,
    ...CommonCSS.primaryButton
}

const primaryButtonL = {
    backgroundColor: LightColors.DefaultBackground,
    ...CommonCSS.primaryButton
}

const submitButtonD = {
    backgroundColor: "#4450F3",
    color: "white",
    ...CommonCSS.primaryButton
}

const textAreaD = {
    backgroundColor: "#2C303B",
    color: "white"
}

const textAreaL = {
    backgroundColor: LightColors.PaperBackground
}

const entityListContainer = {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 20,
    borderRadius: 10,
    marginBottom: 50
}

const modalFormContainer = {
    flexDirection: "column",
    display: "flex",
    justifyContent: "center",
    padding: 30,
    width: 700
}

const secondaryButton = {
    fontWeight: "bold"
}

class S {
    static get th() {
        return GlobalContext.isDarkTheme() ? tableHeaderD : tableHeaderL;
    }

    static get tr() {
        return GlobalContext.isDarkTheme() ? tableRowD : tableRowL;
    }

    static get primaryButton() {
        return GlobalContext.isDarkTheme() ? primaryButtonD : primaryButtonL;
    }

    static get secondaryButton() {
        return secondaryButton;
    }

    static get submitButton() {
        return GlobalContext.isDarkTheme() ? submitButtonD : submitButtonD;
    }

    static get textArea() {
        return GlobalContext.isDarkTheme() ? textAreaD : textAreaL;
    }

    static get entityListContainer() {
        return entityListContainer;
    }

    static get modalFormContainer() {
        return modalFormContainer;
    }
}

export default S;
