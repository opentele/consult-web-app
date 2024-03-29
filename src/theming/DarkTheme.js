import {createTheme} from "@mui/material/styles";

const defaultDarkTheme = createTheme({
    palette: {
        mode: 'dark',
    }
});

const DarkColors = {
    DefaultBackground: "#14161E",
    PaperBackground: "#212531"
};

const themeOptions = Object.assign({}, defaultDarkTheme, {
    palette: {
        mode: 'dark',
        background: {
            default: DarkColors.DefaultBackground,
            paper: DarkColors.PaperBackground
        }
    },
    textColor: {
        assistive: "#BB86FC"
    },
    components: {
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: defaultDarkTheme.palette.primary.light
                }
            }
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    backgroundColor: DarkColors.PaperBackground
                }
            }
        }
    },
    distance: {
        unit: 5
    },
    customProps: {
        paperDividerHeight: "15px",
        paperDividerElevation: 30,
        tableHeadBackgroundColor: "darkgreen"
    },
    customPalette: {
        textboxBackgroundColor: DarkColors.PaperBackground
    }
});

export {DarkColors};
export default themeOptions;
