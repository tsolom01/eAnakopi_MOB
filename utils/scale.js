import { Dimensions } from 'react-native';

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');

/** Design reference: iPhone 14 width; scales up/down for other devices. */
const GUIDELINE_WIDTH = 390;
const GUIDELINE_HEIGHT = 844;

/** Cap scale on large phones/tablets so UI does not grow excessively. */
const WIDTH_SCALE = Math.min(Math.max(WINDOW_WIDTH / GUIDELINE_WIDTH, 0.85), 1.35);
const HEIGHT_SCALE = Math.min(Math.max(WINDOW_HEIGHT / GUIDELINE_HEIGHT, 0.85), 1.35);

const isTablet = WINDOW_WIDTH >= 600;

/** Horizontal scaling (fonts, widths, icons). */
export const scale = (size) => WIDTH_SCALE * size;

/** Vertical scaling (heights, vertical gaps). */
export const verticalScale = (size) => HEIGHT_SCALE * size;

/** Blend of fixed + scaled size — good for fonts. */
export const moderateScale = (size, factor = 0.45) => size + (scale(size) - size) * factor;

export const verticalMargin = verticalScale(4);
export const sectionSpacing = verticalScale(4);

/** CPR ring size tuned to fit one screen with footer logos (no scroll). */
export const getCPRTimerSize = () => {
    if (WINDOW_HEIGHT < 680) return scale(148);
    if (WINDOW_HEIGHT < 760) return scale(162);
    if (WINDOW_HEIGHT < 820) return scale(172);
    return scale(182);
};

export const confirmButtonLeftOffset = isTablet ? scale(-129) : scale(-116);

export { WINDOW_WIDTH, WINDOW_HEIGHT, isTablet };
