import {createTheme} from "@mui/material/styles";

const defaultLightTheme = createTheme({
    palette: {
        mode: 'light',
    }
});

const LightColors = {
    DefaultBackground: "#EBEEF5",
    PaperBackground: "#fff"
};

const themeOptions = Object.assign({}, defaultLightTheme, {
    palette: {
        background: {
            default: LightColors.DefaultBackground,
            paper: LightColors.PaperBackground
        }
    },
    components: {
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    backgroundColor: LightColors.PaperBackground
                }
            }
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
    }
});

export {LightColors};
export default themeOptions;
