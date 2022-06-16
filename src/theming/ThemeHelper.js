class ThemeHelper {
    static mergeTextAreaStyle(styleOptions, theme, className) {
        styleOptions[className] = Object.assign({
            backgroundColor: theme.customPalette.textboxBackgroundColor,
            color: theme.palette.text.primary
        }, styleOptions.personViewFieldBox);
        return styleOptions;
    }
}

export default ThemeHelper;
