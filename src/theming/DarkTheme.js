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
                            backgroundColor: defaultTheme.palette.secondary.main
                        }
                    }
                }
            },
            customPalette: {
                textboxBackgroundColor: "#383838"
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
