import GlobalContext from "../framework/GlobalContext";
import DarkTheme from './DarkTheme';
import LightTheme from './LightTheme';

class ThemeHelper {
    static mergeTextAreaStyle(styleOptions, theme, className) {
        styleOptions[className] = Object.assign({
            backgroundColor: theme.customPalette.textboxBackgroundColor,
            color: theme.palette.text.primary
        }, styleOptions.personViewFieldBox);
        return styleOptions;
    }

    static getTheme() {
        return GlobalContext.isDarkTheme() ? DarkTheme : LightTheme;
    }
}

export default ThemeHelper;
