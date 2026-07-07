import { render, screen, fireEvent } from '@testing-library/react';
import { AccessibilityProvider, useAccessibility } from '@/components/AccessibilityProvider';

function TestComponent() {
  const { highContrast, largeText, toggleHighContrast, toggleLargeText } = useAccessibility();
  return (
    <div>
      <span data-testid="hc">{highContrast ? 'on' : 'off'}</span>
      <span data-testid="lt">{largeText ? 'on' : 'off'}</span>
      <button data-testid="hc-btn" onClick={toggleHighContrast}>Toggle HC</button>
      <button data-testid="lt-btn" onClick={toggleLargeText}>Toggle LT</button>
    </div>
  );
}

describe('Accessibility Toggles', () => {
  it('toggles high contrast mode', () => {
    render(
      <AccessibilityProvider>
        <TestComponent />
      </AccessibilityProvider>
    );
    expect(screen.getByTestId('hc').textContent).toBe('off');
    fireEvent.click(screen.getByTestId('hc-btn'));
    expect(screen.getByTestId('hc').textContent).toBe('on');
  });

  it('toggles large text mode', () => {
    render(
      <AccessibilityProvider>
        <TestComponent />
      </AccessibilityProvider>
    );
    expect(screen.getByTestId('lt').textContent).toBe('off');
    fireEvent.click(screen.getByTestId('lt-btn'));
    expect(screen.getByTestId('lt').textContent).toBe('on');
  });
});
