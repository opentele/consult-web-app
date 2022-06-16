import {createTheme} from "@mui/material";

export default class DarkTheme {
    static getThemeOptions() {
        const defaultTheme = createTheme({
            palette: {
                mode: 'dark',
            }
        });
        return {
            palette: {
                mode: 'dark',
            },
            components: {
                MuiIconButton: {
                    styleOverrides: {
                        root: {
                            color: defaultTheme.palette.primary.light
                        }
                    }
                },
                MuiDialogTitle: {
                    styleOverrides: {
                        root: {
                            backgroundColor: defaultTheme.palette.secondary.dark
                        }
                    }
                }
            },
            customPalette: {
                textboxBackgroundColor: "#383838"
            },
            customProps: {
                paperDividerHeight: "15px",
                paperDividerElevation: 30
            },
            unsupportedComponents: {
                TextareaAutosize: {
                    styleOverrides: {
                        backgroundColor: defaultTheme.palette.background.default
                    }
                }
            }
        };
    }
}
