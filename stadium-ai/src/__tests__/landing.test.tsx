import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => '/',
}));

jest.mock('@/components/AccessibilityProvider', () => ({
  AccessibilityProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useAccessibility: () => ({ highContrast: false, largeText: false, toggleHighContrast: jest.fn(), toggleLargeText: jest.fn() }),
}));

describe('Landing Page', () => {
  it('renders hero heading', () => {
    render(<Home />);
    expect(screen.getAllByText(/StadiumAI/i).length).toBeGreaterThan(0);
  });

  it('renders feature cards', () => {
    render(<Home />);
    expect(screen.getByText('AI Fan Assistant')).toBeInTheDocument();
    expect(screen.getByText('Crowd Intelligence')).toBeInTheDocument();
    expect(screen.getByText('Volunteer Support')).toBeInTheDocument();
  });

  it('renders CTA buttons', () => {
    render(<Home />);
    expect(screen.getAllByText('Fan Demo').length).toBeGreaterThan(0);
    expect(screen.getByText('Volunteer Demo')).toBeInTheDocument();
  });
});
