import { render, screen } from '@testing-library/react';
import { StatCard } from '@/components/StatCard';
import { StadiumHeatmap } from '@/components/StadiumHeatmap';

jest.mock('@/lib/navigation', () => ({
  getZoneStatusMap: () => ({
    'Gate A': 'normal',
    'Gate B': 'crowded',
    'Gate C': 'available',
  }),
}));

describe('Admin Dashboard Components', () => {
  it('renders StatCard with label and value', () => {
    render(<StatCard label="Total Fans" value="8,247" />);
    expect(screen.getByText('Total Fans')).toBeInTheDocument();
    expect(screen.getByText('8,247')).toBeInTheDocument();
  });

  it('renders StatCard with trend indicator', () => {
    render(<StatCard label="Crowd Density" value="62%" trend="down" />);
    expect(screen.getByText('Crowd Density')).toBeInTheDocument();
  });

  it('renders StadiumHeatmap with zone data', () => {
    render(<StadiumHeatmap />);
    expect(screen.getAllByText('Gate A')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Gate B')[0]).toBeInTheDocument();
  });
});
