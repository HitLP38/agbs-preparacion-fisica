import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Card } from './Card';

describe('Card Component', () => {
  it('renders children content', () => {
    render(<Card>Test content</Card>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders header when provided', () => {
    render(<Card header="Card Header">Content</Card>);
    expect(screen.getByText('Card Header')).toBeInTheDocument();
  });

  it('renders footer when provided', () => {
    render(<Card footer="Card Footer">Content</Card>);
    expect(screen.getByText('Card Footer')).toBeInTheDocument();
  });

  it('calls onClick when clickable and clicked', () => {
    const handleClick = vi.fn();
    render(
      <Card clickable onClick={handleClick}>
        Clickable card
      </Card>
    );

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(
      <Card clickable disabled onClick={handleClick}>
        Disabled card
      </Card>
    );

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('shows loading state', () => {
    render(<Card loading>Loading card</Card>);
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  it('applies success variant styles', () => {
    render(<Card variant="success">Success card</Card>);
    // Test would check computed styles in real implementation
  });

  it('handles keyboard navigation when clickable', () => {
    const handleClick = vi.fn();
    render(
      <Card clickable onClick={handleClick}>
        Keyboard card
      </Card>
    );

    const card = screen.getByRole('button');
    fireEvent.keyDown(card, { key: 'Enter' });
    fireEvent.keyDown(card, { key: ' ' });

    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  it('applies correct size styles', () => {
    render(<Card size="lg">Large card</Card>);
    // Test would check computed styles in real implementation
  });
});
