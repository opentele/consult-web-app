import {createTheme} from "@mui/material/styles";

const defaultDarkTheme = createTheme({
    palette: {
        mode: 'dark',
    }
});

const themeOptions = Object.assign({}, defaultDarkTheme, {
    palette: {
        mode: 'dark'
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
                    backgroundColor: defaultDarkTheme.palette.secondary.dark
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
        textboxBackgroundColor: "#383838"
    },
    unsupportedComponents: {
        TextareaAutosize: {
            styleOverrides: {
                backgroundColor: defaultDarkTheme.palette.background.default
            }
        }
    }
});

export default themeOptions;
