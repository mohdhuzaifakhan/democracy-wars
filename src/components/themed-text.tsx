import { Platform, StyleSheet, Text, type TextProps } from 'react-native';

import { FONTS, COLORS } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemeColor = keyof typeof COLORS;

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'small' | 'smallBold' | 'subtitle' | 'link' | 'linkPrimary' | 'code';
  themeColor?: ThemeColor;
};

export function ThemedText({ style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  const theme = useTheme();

  return (
    <Text
      style={[
        { color: theme[themeColor ?? 'text'] },
        type === 'default' && styles.default,
        type === 'title' && styles.title,
        type === 'small' && styles.small,
        type === 'smallBold' && styles.smallBold,
        type === 'subtitle' && styles.subtitle,
        type === 'link' && styles.link,
        type === 'linkPrimary' && styles.linkPrimary,
        type === 'code' && styles.code,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  small: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    lineHeight: 20,
  },
  smallBold: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    lineHeight: 20,
  },
  default: {
    fontFamily: FONTS.medium,
    fontSize: 16,
    lineHeight: 24,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 48,
    lineHeight: 52,
  },
  subtitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 32,
    lineHeight: 44,
  },
  link: {
    fontFamily: FONTS.regular,
    lineHeight: 30,
    fontSize: 14,
  },
  linkPrimary: {
    fontFamily: FONTS.regular,
    lineHeight: 30,
    fontSize: 14,
    color: COLORS.primary,
  },
  code: {
    fontFamily: Platform.select({ ios: 'Courier', android: 'monospace', default: 'monospace' }),
    fontWeight: Platform.select({ android: '700', default: '500' }) as any,
    fontSize: 12,
  },
});
