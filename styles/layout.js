import { StyleSheet } from 'react-native';
import { scale, WINDOW_WIDTH, moderateScale } from '../utils/scale';

export const COLORS = {
    primary: '#2ECC71',
    primaryDark: '#27AE60',
    danger: '#C0392B',
    dangerLight: '#E74C3C',
    background: '#F4F6F8',
    surface: '#FFFFFF',
    text: '#1A1D21',
    textSecondary: '#5C6570',
    border: '#E2E8F0',
    headerBg: '#8B1538',
    accent: '#2563EB',
    overlay: 'rgba(0,0,0,0.45)',
};

export const ACTION_BUTTON_WIDTH = Math.min(WINDOW_WIDTH * 0.92, scale(420));

/** Plain objects so they can be spread inside other StyleSheet.create calls. */
export const actionButtonStyle = {
    width: ACTION_BUTTON_WIDTH,
    alignSelf: 'center',
    paddingVertical: scale(9),
    paddingHorizontal: scale(20),
    borderRadius: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
};

export const actionButtonTextStyle = {
    color: '#FFFFFF',
    fontSize: moderateScale(16),
    fontWeight: '700',
    textAlign: 'center',
};

export const sharedLayout = StyleSheet.create({
    actionButton: actionButtonStyle,
    actionButtonText: actionButtonTextStyle,
});
