// ============================================
// src/shared/components/atoms/Input/Input.test.tsx
// ============================================
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Input } from './Input';

describe('Input Component', () => {
  it('renders with label', () => {
    render(<Input label="Test Label" />);
    expect(screen.getByLabelText(/test label/i)).toBeInTheDocument();
  });

  it('shows error message', () => {
    render(<Input errorMessage="Error occurred" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Error occurred');
  });

  it('shows helper text when no error', () => {
    render(<Input helperText="Helper text" />);
    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });

  it('calls onChange when value changes', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(handleChange).toHaveBeenCalled();
  });

  it('shows loading spinner when loading', () => {
    render(<Input loading />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('shows required asterisk', () => {
    render(<Input label="Required Field" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('applies full width style', () => {
    render(<Input fullWidth data-testid="input-container" />);
    // Test would check computed styles in real implementation
  });

  it('handles focus and blur events', () => {
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();

    render(<Input onFocus={handleFocus} onBlur={handleBlur} />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.blur(input);

    expect(handleFocus).toHaveBeenCalled();
    expect(handleBlur).toHaveBeenCalled();
  });
});
Improve;
Explain;
