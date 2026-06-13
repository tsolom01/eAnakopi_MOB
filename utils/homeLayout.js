import { scale, verticalScale } from './scale';

/**
 * Computes home-screen sizes from the actual usable height (screen minus safe areas and footer).
 * Keeps all sections visible without scrolling on phones of different sizes.
 */
export function getHomeLayoutMetrics({ windowHeight, insets = { top: 0, bottom: 0 } }) {
    const top = insets.top ?? 0;
    const bottom = insets.bottom ?? 0;

    const logoHeight = Math.min(scale(64), Math.max(scale(44), windowHeight * 0.075));
    const footerHeight = logoHeight + verticalScale(14) + 1;

    const usableHeight = windowHeight - top - bottom - footerHeight;

    const topBarHeight = scale(40);
    const actionButtonHeight = scale(34);
    const rhythmsHeight = scale(34);
    const extraButtonsHeight = scale(58);
    const sectionGaps = verticalScale(6) * 4;
    const cycleLabelHeight = scale(22);

    const fixedHeight =
        topBarHeight +
        actionButtonHeight * 2 +
        rhythmsHeight +
        extraButtonsHeight +
        sectionGaps +
        cycleLabelHeight;

    const flexibleHeight = Math.max(usableHeight - fixedHeight, scale(100));

    const cprTimerSize = Math.min(scale(178), Math.max(scale(108), flexibleHeight * 0.48));
    const interventionIconSize = Math.min(scale(88), Math.max(scale(54), flexibleHeight * 0.28));

    const sectionGap = Math.max(verticalScale(2), Math.min(verticalScale(8), usableHeight * 0.007));
    const actionButtonPaddingVertical = Math.max(scale(6), Math.min(scale(9), usableHeight * 0.01));
    const extraButtonPaddingVertical = Math.max(scale(6), actionButtonPaddingVertical - scale(1));

    return {
        usableHeight,
        footerHeight,
        sectionGap,
        cprTimerSize,
        cprFontSize: Math.max(scale(28), cprTimerSize * 0.21),
        cycleFontSize: Math.max(scale(16), cprTimerSize * 0.11),
        interventionIconSize,
        interventionLabelSize: Math.max(scale(10), interventionIconSize * 0.13),
        logoHeight,
        logoWideWidth: logoHeight * 1.55,
        actionButtonPaddingVertical,
        extraButtonPaddingVertical,
        extraButtonGap: Math.max(scale(3), sectionGap * 0.75),
        contentPaddingBottom: sectionGap,
    };
}
