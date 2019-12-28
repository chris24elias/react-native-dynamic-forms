export function normalizeStyle(
  {
    paddingHorizontal,
    borderColor,
    backgroundColor,
    minHeight,
    borderRadius,
    borderWidth,
    paddingVertical,
  },
  style2,
) {
  return {
    paddingHorizontal,
    borderColor,
    backgroundColor,
    minHeight,
    borderRadius,
    borderWidth,
    paddingVertical,
    ...style2,
  };
}

export function normalizeTextStyle(themedStyle, style2) {
  return {
    color: themedStyle.textColor,
    marginHorizontal: themedStyle.textMarginHorizontal,
    fontFamily: themedStyle.textFontFamily,
    fontSize: themedStyle.textFontSize,
    fontWeight: themedStyle.textFontWeight,
    lineHeight: themedStyle.textLineHeight,
    ...style2,
  };
}
