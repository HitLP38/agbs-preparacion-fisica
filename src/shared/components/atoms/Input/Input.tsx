// ============================================
// src/shared/components/atoms/Input/Input.tsx
// ============================================
import React, { useState, forwardRef } from 'react';
import { tokens } from '@shared/styles/tokens';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'default' | 'error' | 'success';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'default',
      size = 'md',
      fullWidth = false,
      label,
      helperText,
      errorMessage,
      leftIcon,
      rightIcon,
      loading = false,
      disabled = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    // Determinar el estado visual
    const currentVariant = errorMessage ? 'error' : variant;
    const showError = Boolean(errorMessage);
    const showHelper = Boolean(helperText && !showError);

    const getVariantStyles = () => {
      const styles = {
        default: {
          borderColor: isFocused
            ? tokens.colors.primary[500]
            : tokens.colors.secondary[300],
          backgroundColor: tokens.colors.neutral.white,
          focusRingColor: tokens.colors.primary[500],
        },
        error: {
          borderColor: tokens.colors.semantic.error.main,
          backgroundColor: tokens.colors.semantic.error.light,
          focusRingColor: tokens.colors.semantic.error.main,
        },
        success: {
          borderColor: tokens.colors.semantic.success.main,
          backgroundColor: tokens.colors.semantic.success.light,
          focusRingColor: tokens.colors.semantic.success.main,
        },
      };
      return styles[currentVariant];
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

    const variantStyles = getVariantStyles();
    const sizeStyles = getSizeStyles();

    const inputContainerStyles: React.CSSProperties = {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      width: fullWidth ? '100%' : 'auto',
      border: `2px solid ${variantStyles.borderColor}`,
      borderRadius: tokens.borderRadius.md,
      backgroundColor: variantStyles.backgroundColor,
      transition: 'all 0.2s ease-in-out',
      boxShadow: isFocused
        ? `0 0 0 3px ${variantStyles.focusRingColor}20`
        : 'none',
    };

    const inputStyles: React.CSSProperties = {
      // Layout
      flex: 1,
      width: '100%',

      // Spacing
      ...sizeStyles,
      paddingLeft: leftIcon
        ? tokens.spacing[8]
        : sizeStyles.padding.split(' ')[1],
      paddingRight:
        rightIcon || loading
          ? tokens.spacing[8]
          : sizeStyles.padding.split(' ')[1],

      // Typography
      fontFamily: tokens.typography.fontFamily.sans.join(', '),
      fontSize: sizeStyles.fontSize,
      color: disabled ? tokens.colors.neutral[400] : tokens.colors.neutral[700],

      // Appearance
      border: 'none',
      outline: 'none',
      backgroundColor: 'transparent',

      // Remove default styles
      appearance: 'none',
      WebkitAppearance: 'none',
      MozAppearance: 'textfield',
    };

    const iconStyles: React.CSSProperties = {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: tokens.colors.neutral[400],
      pointerEvents: 'none',
      zIndex: 1,
    };

    const leftIconStyles: React.CSSProperties = {
      ...iconStyles,
      left: tokens.spacing[3],
    };

    const rightIconStyles: React.CSSProperties = {
      ...iconStyles,
      right: tokens.spacing[3],
    };

    const labelStyles: React.CSSProperties = {
      display: 'block',
      marginBottom: tokens.spacing[2],
      fontSize: tokens.typography.fontSize.sm,
      fontWeight: tokens.typography.fontWeight.medium,
      color: showError
        ? tokens.colors.semantic.error.main
        : tokens.colors.neutral[700],
    };

    const helperTextStyles: React.CSSProperties = {
      marginTop: tokens.spacing[1],
      fontSize: tokens.typography.fontSize.xs,
      color: showError
        ? tokens.colors.semantic.error.main
        : tokens.colors.neutral[500],
    };

    const LoadingSpinner = () => (
      <span
        style={{
          display: 'inline-block',
          width: '1rem',
          height: '1rem',
          border: '2px solid transparent',
          borderTop: '2px solid currentColor',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
      />
    );

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      props.onBlur?.(e);
    };

    return (
      <>
        <style>
          {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          /* Remove number input arrows */
          input[type="number"]::-webkit-outer-spin-button,
          input[type="number"]::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          
          input[type="number"] {
            -moz-appearance: textfield;
          }
        `}
        </style>

        <div style={{ width: fullWidth ? '100%' : 'auto' }}>
          {label && (
            <label style={labelStyles}>
              {label}
              {props.required && (
                <span
                  style={{
                    color: tokens.colors.semantic.error.main,
                    marginLeft: '2px',
                  }}
                >
                  *
                </span>
              )}
            </label>
          )}

          <div style={inputContainerStyles}>
            {leftIcon && <div style={leftIconStyles}>{leftIcon}</div>}

            <input
              ref={ref}
              style={inputStyles}
              onFocus={handleFocus}
              onBlur={handleBlur}
              disabled={disabled || loading}
              aria-invalid={showError}
              aria-describedby={
                showError
                  ? `${props.id}-error`
                  : showHelper
                    ? `${props.id}-helper`
                    : undefined
              }
              {...props}
            />

            {(rightIcon || loading) && (
              <div style={rightIconStyles}>
                {loading ? <LoadingSpinner /> : rightIcon}
              </div>
            )}
          </div>

          {(showError || showHelper) && (
            <div
              id={showError ? `${props.id}-error` : `${props.id}-helper`}
              style={helperTextStyles}
              role={showError ? 'alert' : 'text'}
            >
              {showError ? errorMessage : helperText}
            </div>
          )}
        </div>
      </>
    );
  }
);

Input.displayName = 'Input';
