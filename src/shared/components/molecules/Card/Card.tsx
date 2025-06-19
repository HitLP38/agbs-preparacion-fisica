import React, { useState } from 'react';
import { tokens } from '@shared/styles/tokens';

export interface CardProps {
  variant?:
    | 'default'
    | 'outlined'
    | 'elevated'
    | 'success'
    | 'error'
    | 'warning'
    | 'info';
  size?: 'sm' | 'md' | 'lg';
  clickable?: boolean;
  loading?: boolean;
  disabled?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  size = 'md',
  clickable = false,
  loading = false,
  disabled = false,
  header,
  footer,
  children,
  onClick,
  className,
  style,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const getVariantStyles = () => {
    const styles = {
      default: {
        backgroundColor: tokens.colors.neutral.white,
        borderColor: tokens.colors.secondary[200],
        shadowColor: 'rgba(0, 0, 0, 0.1)',
      },
      outlined: {
        backgroundColor: tokens.colors.neutral.white,
        borderColor: tokens.colors.secondary[300],
        shadowColor: 'transparent',
      },
      elevated: {
        backgroundColor: tokens.colors.neutral.white,
        borderColor: 'transparent',
        shadowColor: 'rgba(0, 0, 0, 0.15)',
      },
      success: {
        backgroundColor: tokens.colors.semantic.success.light,
        borderColor: tokens.colors.semantic.success.main,
        shadowColor: 'rgba(22, 163, 74, 0.2)',
      },
      error: {
        backgroundColor: tokens.colors.semantic.error.light,
        borderColor: tokens.colors.semantic.error.main,
        shadowColor: 'rgba(220, 38, 38, 0.2)',
      },
      warning: {
        backgroundColor: tokens.colors.semantic.warning.light,
        borderColor: tokens.colors.semantic.warning.main,
        shadowColor: 'rgba(217, 119, 6, 0.2)',
      },
      info: {
        backgroundColor: tokens.colors.semantic.info.light,
        borderColor: tokens.colors.semantic.info.main,
        shadowColor: 'rgba(8, 145, 178, 0.2)',
      },
    };
    return styles[variant];
  };

  const getSizeStyles = () => {
    const styles = {
      sm: {
        padding: tokens.spacing[3],
        borderRadius: tokens.borderRadius.md,
        gap: tokens.spacing[2],
      },
      md: {
        padding: tokens.spacing[4],
        borderRadius: tokens.borderRadius.lg,
        gap: tokens.spacing[3],
      },
      lg: {
        padding: tokens.spacing[6],
        borderRadius: tokens.borderRadius.xl,
        gap: tokens.spacing[4],
      },
    };
    return styles[size];
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  const shouldShowHoverEffect = isHovered && clickable && !disabled && !loading;
  const shouldShowPressEffect = isPressed && clickable && !disabled && !loading;

  const cardStyles: React.CSSProperties = {
    // Layout
    display: 'flex',
    flexDirection: 'column',
    width: '100%',

    // Spacing
    gap: sizeStyles.gap,

    // Colors & Borders
    backgroundColor: variantStyles.backgroundColor,
    border: `1px solid ${variantStyles.borderColor}`,
    borderRadius: sizeStyles.borderRadius,

    // Shadow
    boxShadow: shouldShowHoverEffect
      ? `0 8px 25px -5px ${variantStyles.shadowColor}, 0 8px 10px -6px ${variantStyles.shadowColor}`
      : shouldShowPressEffect
        ? `0 1px 2px 0 ${variantStyles.shadowColor}`
        : variant === 'elevated'
          ? `0 4px 6px -1px ${variantStyles.shadowColor}, 0 2px 4px -2px ${variantStyles.shadowColor}`
          : variant === 'outlined'
            ? 'none'
            : `0 1px 3px 0 ${variantStyles.shadowColor}, 0 1px 2px -1px ${variantStyles.shadowColor}`,

    // Interaction
    cursor: clickable
      ? disabled || loading
        ? 'not-allowed'
        : 'pointer'
      : 'default',
    opacity: disabled ? 0.6 : 1,

    // Transform
    transform: shouldShowHoverEffect
      ? 'translateY(-2px)'
      : shouldShowPressEffect
        ? 'translateY(0)'
        : 'translateY(0)',

    // Transitions
    transition: 'all 0.2s ease-in-out',

    // Position for loading overlay
    position: 'relative',
    overflow: 'hidden',

    // Merge custom styles
    ...style,
  };

  const headerStyles: React.CSSProperties = {
    padding: `0 0 ${sizeStyles.gap} 0`,
    borderBottom: `1px solid ${tokens.colors.secondary[200]}`,
    fontWeight: tokens.typography.fontWeight.semibold,
    fontSize:
      size === 'lg'
        ? tokens.typography.fontSize.lg
        : size === 'sm'
          ? tokens.typography.fontSize.sm
          : tokens.typography.fontSize.base,
    color: tokens.colors.neutral[700],
  };

  const bodyStyles: React.CSSProperties = {
    flex: 1,
    color: tokens.colors.neutral[600],
    lineHeight: tokens.typography.lineHeight.relaxed,
  };

  const footerStyles: React.CSSProperties = {
    padding: `${sizeStyles.gap} 0 0 0`,
    borderTop: `1px solid ${tokens.colors.secondary[200]}`,
    fontSize: tokens.typography.fontSize.sm,
    color: tokens.colors.neutral[500],
  };

  const loadingOverlayStyles: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  };

  const LoadingSpinner = () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: tokens.spacing[2],
      }}
    >
      <span
        style={{
          display: 'inline-block',
          width: '2rem',
          height: '2rem',
          border: '3px solid transparent',
          borderTop: `3px solid ${tokens.colors.primary[500]}`,
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
      />
      <span
        style={{
          fontSize: tokens.typography.fontSize.sm,
          color: tokens.colors.neutral[600],
        }}
      >
        Cargando...
      </span>
    </div>
  );

  const handleClick = () => {
    if (clickable && !disabled && !loading && onClick) {
      onClick();
    }
  };

  const handleMouseEnter = () => {
    if (clickable && !disabled && !loading) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
  };

  const handleMouseDown = () => {
    if (clickable && !disabled && !loading) {
      setIsPressed(true);
    }
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (clickable && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      handleClick();
    }
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

      <div
        style={{
          ...cardStyles,
          padding: sizeStyles.padding,
        }}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onKeyDown={handleKeyDown}
        tabIndex={clickable ? 0 : undefined}
        role={clickable ? 'button' : undefined}
        aria-disabled={disabled || loading}
        className={className}
        {...props}
      >
        {header && <div style={headerStyles}>{header}</div>}

        <div style={bodyStyles}>{children}</div>

        {footer && <div style={footerStyles}>{footer}</div>}

        {loading && (
          <div style={loadingOverlayStyles}>
            <LoadingSpinner />
          </div>
        )}
      </div>
    </>
  );
};
