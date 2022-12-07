import {createTheme} from "@mui/material/styles";

const defaultLightTheme = createTheme({
    palette: {
        mode: 'light',
    }
});

const themeOptions = Object.assign({}, defaultLightTheme, {
    palette: {
        background: {
            default: "#EBEEF5",
            paper: "#fff"
        }
    },
    textColor: {
        assistive: "#BB86FC"
    },
    distance: {
        unit: 5
    },
    customProps: {
        paperDividerHeight: "15px",
        paperDividerElevation: 30,
        tableHeaderTextColor: "blue"
    },
    customPalette: {
        textboxBackgroundColor: "white"
    },
    unsupportedComponents: {
        TextareaAutosize: {
            styleOverrides: {
                backgroundColor: defaultLightTheme.palette.background.default
            }
        }
    }
});

export default themeOptions;
