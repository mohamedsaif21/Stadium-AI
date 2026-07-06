import { render, screen } from '@testing-library/react';
import LoginPage from '@/app/login/page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => '/login',
}));

jest.mock('@/components/AccessibilityProvider', () => ({
  AccessibilityProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useAccessibility: () => ({ highContrast: false, largeText: false, toggleHighContrast: jest.fn(), toggleLargeText: jest.fn() }),
}));

jest.mock('@/lib/auth', () => ({
  loginUser: jest.fn(),
  getRedirectPath: (role: string) => `/${role}`,
}));

describe('Login Page', () => {
  it('renders login form', () => {
    render(<LoginPage />);
    expect(screen.getByText(/Welcome back/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('renders demo quick login buttons', () => {
    render(<LoginPage />);
    expect(screen.getByText(/Demo Quick Login/i)).toBeInTheDocument();
  });
});
