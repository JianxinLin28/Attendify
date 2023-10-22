const palette = {
    colorDodgerblue: "#2596ff",
    colorWhite: "#fff",
    colorGainsboro: "#d9d9d9",
    colorBlack: "#000",
    colorEmeraldGreen: "#02c262",
    colorScarletRed: "#eb4034",
};

const fontFamily = {
    balooBhai: "BalooBhai-Regular",
};

const balooBhaiFontSize = {
    large: 30,
    casual: 24,
    medium: 20,
    small: 18,
    tiny: 12,
};

/* You can create a new theme below */
const defaultTheme = {
    mainColor: palette.colorDodgerblue,
    subColor: palette.colorBlack,
    primaryColor: palette.colorWhite,
    disableColor: palette.colorGainsboro,
    checkBoxColor: palette.colorEmeraldGreen,
    errorColor: palette.colorScarletRed,
    mainFont: fontFamily.balooBhai,
    fontSizes: balooBhaiFontSize,
}

const greenTheme = {
    mainColor: palette.colorEmeraldGreen,
    subColor: palette.colorBlack,
    primaryColor: palette.colorWhite,
    disableColor: palette.colorGainsboro,
    checkBoxColor: palette.colorBlack,
    errorColor: palette.colorScarletRed,
    mainFont: fontFamily.balooBhai,
    fontSizes: balooBhaiFontSize
}

const redTheme = {
    mainColor: palette.colorScarletRed,
    subColor: palette.colorBlack,
    primaryColor: palette.colorWhite,
    disableColor: palette.colorGainsboro,
    checkBoxColor: palette.colorBlack,
    errorColor: palette.colorEmeraldGreen,
    mainFont: fontFamily.balooBhai,
    fontSizes: balooBhaiFontSize
}

/* Remember to add the theme you created to this array */
const themes = [defaultTheme, greenTheme, redTheme];
export var currentTheme = defaultTheme;

export function changeTheme(themeNumber) {
    if (themeNumber >= themes.length)
        return;
    currentTheme = themes[themeNumber];
}
