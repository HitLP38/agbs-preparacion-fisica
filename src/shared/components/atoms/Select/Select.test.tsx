import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Select } from './Select';

const mockOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', disabled: true },
];

describe('Select Component', () => {
  it('renders with label', () => {
    render(<Select label="Test Select" options={mockOptions} />);
    expect(screen.getByLabelText(/test select/i)).toBeInTheDocument();
  });

  it('renders all options', () => {
    render(<Select options={mockOptions} />);

    expect(
      screen.getByRole('option', { name: 'Option 1' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: 'Option 2' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: 'Option 3' })
    ).toBeInTheDocument();
  });

  it('shows placeholder when provided', () => {
    render(<Select options={mockOptions} placeholder="Choose an option" />);
    expect(
      screen.getByRole('option', { name: 'Choose an option' })
    ).toBeInTheDocument();
  });

  it('shows error message', () => {
    render(<Select options={mockOptions} errorMessage="Error occurred" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Error occurred');
  });

  it('shows helper text when no error', () => {
    render(<Select options={mockOptions} helperText="Helper text" />);
    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });

  it('calls onChange when selection changes', () => {
    const handleChange = vi.fn();
    render(<Select options={mockOptions} onChange={handleChange} />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'option1' } });

    expect(handleChange).toHaveBeenCalled();
  });

  it('shows loading spinner when loading', () => {
    render(<Select options={mockOptions} loading />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('shows required asterisk', () => {
    render(<Select options={mockOptions} label="Required Field" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('disables specific options', () => {
    render(<Select options={mockOptions} />);
    expect(screen.getByRole('option', { name: 'Option 3' })).toBeDisabled();
  });

  it('handles focus and blur events', () => {
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();

    render(
      <Select options={mockOptions} onFocus={handleFocus} onBlur={handleBlur} />
    );

    const select = screen.getByRole('combobox');
    fireEvent.focus(select);
    fireEvent.blur(select);

    expect(handleFocus).toHaveBeenCalled();
    expect(handleBlur).toHaveBeenCalled();
  });
});
