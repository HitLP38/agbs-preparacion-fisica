// ============================================
// src/shared/components/atoms/Select/Select.tsx
// ============================================
import React, { useState, forwardRef } from 'react';
import { tokens } from '@shared/styles/tokens';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  variant?: 'default' | 'error' | 'success';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  options: SelectOption[];
  placeholder?: string;
  loading?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      variant = 'default',
      size = 'md',
      fullWidth = false,
      label,
      helperText,
      errorMessage,
      options,
      placeholder,
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
          padding: `${tokens.spacing[2]} ${tokens.spacing[8]} ${tokens.spacing[2]} ${tokens.spacing[3]}`,
          fontSize: tokens.typography.fontSize.sm,
          minHeight: '2rem',
        },
        md: {
          padding: `${tokens.spacing[3]} ${tokens.spacing[8]} ${tokens.spacing[3]} ${tokens.spacing[4]}`,
          fontSize: tokens.typography.fontSize.base,
          minHeight: '2.5rem',
        },
        lg: {
          padding: `${tokens.spacing[4]} ${tokens.spacing[8]} ${tokens.spacing[4]} ${tokens.spacing[6]}`,
          fontSize: tokens.typography.fontSize.lg,
          minHeight: '3rem',
        },
      };
      return styles[size];
    };

    const variantStyles = getVariantStyles();
    const sizeStyles = getSizeStyles();

    const selectContainerStyles: React.CSSProperties = {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      width: fullWidth ? '100%' : 'auto',
    };

    const selectStyles: React.CSSProperties = {
      // Layout
      width: '100%',

      // Spacing
      ...sizeStyles,

      // Colors & Borders
      border: `2px solid ${variantStyles.borderColor}`,
      borderRadius: tokens.borderRadius.md,
      backgroundColor: variantStyles.backgroundColor,

      // Typography
      fontFamily: tokens.typography.fontFamily.sans.join(', '),
      fontSize: sizeStyles.fontSize,
      color:
        disabled || loading
          ? tokens.colors.neutral[400]
          : tokens.colors.neutral[700],

      // Interaction
      cursor: disabled || loading ? 'not-allowed' : 'pointer',

      // Focus
      outline: 'none',
      boxShadow: isFocused
        ? `0 0 0 3px ${variantStyles.focusRingColor}20`
        : 'none',

      // Transitions
      transition: 'all 0.2s ease-in-out',

      // Remove default arrow in some browsers
      appearance: 'none',
      WebkitAppearance: 'none',
      MozAppearance: 'none',
    };

    const arrowStyles: React.CSSProperties = {
      position: 'absolute',
      right: tokens.spacing[3],
      top: '50%',
      transform: 'translateY(-50%)',
      pointerEvents: 'none',
      color:
        disabled || loading
          ? tokens.colors.neutral[400]
          : tokens.colors.neutral[500],
      transition: 'transform 0.2s ease-in-out',
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

    const ChevronDownIcon = () => (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="6,9 12,15 18,9"></polyline>
      </svg>
    );

    const handleFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
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

          <div style={selectContainerStyles}>
            <select
              ref={ref}
              style={selectStyles}
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
            >
              {placeholder && (
                <option value="" disabled hidden>
                  {placeholder}
                </option>
              )}
              {options.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </option>
              ))}
            </select>

            <div style={arrowStyles}>
              {loading ? <LoadingSpinner /> : <ChevronDownIcon />}
            </div>
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

Select.displayName = 'Select';
