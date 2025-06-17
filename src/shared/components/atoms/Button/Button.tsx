// ============================================
// src/shared/components/atoms/Button/Button.tsx
// ============================================
import React, { useState } from 'react';
import { tokens } from '@shared/styles/tokens';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  children,
  onClick,
  type = 'button',
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const getVariantStyles = (isHover: boolean = false) => {
    const baseStyles = {
      primary: {
        backgroundColor: isHover
          ? tokens.colors.primary[600]
          : tokens.colors.primary[500],
        color: tokens.colors.neutral.white,
        borderColor: tokens.colors.primary[500],
      },
      secondary: {
        backgroundColor: isHover
          ? tokens.colors.secondary[50]
          : tokens.colors.neutral.white,
        color: tokens.colors.secondary[700],
        borderColor: tokens.colors.secondary[300],
      },
      success: {
        backgroundColor: isHover
          ? tokens.colors.semantic.success.dark
          : tokens.colors.semantic.success.main,
        color: tokens.colors.neutral.white,
        borderColor: tokens.colors.semantic.success.main,
      },
      warning: {
        backgroundColor: isHover
          ? '#b45309'
          : tokens.colors.semantic.warning.main,
        color: tokens.colors.neutral.white,
        borderColor: tokens.colors.semantic.warning.main,
      },
      error: {
        backgroundColor: isHover
          ? tokens.colors.semantic.error.dark
          : tokens.colors.semantic.error.main,
        color: tokens.colors.neutral.white,
        borderColor: tokens.colors.semantic.error.main,
      },
    };
    return baseStyles[variant];
  };

  const getSizeStyles = () => {
    const styles = {
      sm: {
        padding: `${tokens.spacing[2]} ${tokens.spacing[3]}`,
        fontSize: tokens.typography.fontSize.sm,
        minHeight: '2rem',
      },
      md: {
        padding: `${tokens.spacing[3]} ${tokens.spacing[4]}`,
        fontSize: tokens.typography.fontSize.base,
        minHeight: '2.5rem',
      },
      lg: {
        padding: `${tokens.spacing[4]} ${tokens.spacing[6]}`,
        fontSize: tokens.typography.fontSize.lg,
        minHeight: '3rem',
      },
    };
    return styles[size];
  };

  const shouldShowHoverEffect = isHovered && !disabled && !loading;
  const variantStyles = getVariantStyles(shouldShowHoverEffect);
  const sizeStyles = getSizeStyles();

  const buttonStyles: React.CSSProperties = {
    // Layout
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: fullWidth ? '100%' : 'auto',

    // Spacing
    ...sizeStyles,

    // Colors & Borders
    ...variantStyles,
    border: `1px solid ${variantStyles.borderColor}`,
    borderRadius: tokens.borderRadius.md,

    // Typography
    fontFamily: tokens.typography.fontFamily.sans.join(', '),
    fontWeight: tokens.typography.fontWeight.medium,
    lineHeight: tokens.typography.lineHeight.normal,
    textAlign: 'center',
    textDecoration: 'none',

    // Interaction
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,

    // Transform effects
    transform: shouldShowHoverEffect
      ? 'translateY(-1px)'
      : isPressed
        ? 'translateY(0)'
        : 'translateY(0)',

    // Transitions
    transition: 'all 0.2s ease-in-out',

    // Focus outline
    outline: isFocused ? `2px solid ${tokens.colors.primary[500]}` : 'none',
    outlineOffset: isFocused ? '2px' : '0',

    // Box shadow
    boxShadow: shouldShowHoverEffect
      ? '0 4px 6px -1px rgb(0 0 0 / 0.1)'
      : isPressed
        ? '0 1px 2px 0 rgb(0 0 0 / 0.05)'
        : 'none',

    // Remove button defaults
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
  };

  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      onClick();
    }
  };

  const handleMouseEnter = () => {
    if (!disabled && !loading) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
  };

  const handleMouseDown = () => {
    if (!disabled && !loading) {
      setIsPressed(true);
    }
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const LoadingSpinner = () => (
    <span
      style={{
        display: 'inline-block',
        width: '1em',
        height: '1em',
        marginRight: tokens.spacing[2],
        border: '2px solid transparent',
        borderTop: '2px solid currentColor',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }}
      aria-hidden="true"
    />
  );

  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <button
        type={type}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled || loading}
        style={buttonStyles}
        aria-disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading && <LoadingSpinner />}
        {children}
      </button>
    </>
  );
};
