import { findRoute, searchZones } from '@/lib/navigation';

describe('Navigation Module', () => {
  it('returns route for Gate A', () => {
    const result = findRoute('Gate A');
    expect(result.instructions.length).toBeGreaterThan(0);
    expect(result.estimatedMinutes).toBeGreaterThan(0);
  });

  it('returns route for restroom', () => {
    const result = findRoute('Where is the nearest restroom?');
    expect(result.instructions.length).toBeGreaterThan(0);
  });

  it('returns route for metro', () => {
    const result = findRoute('How do I reach the metro?');
    expect(result.instructions.length).toBeGreaterThan(0);
  });

  it('returns route for seat', () => {
    const result = findRoute('Seat A24');
    expect(result.instructions.length).toBeGreaterThan(0);
  });

  it('returns route for medical', () => {
    const result = findRoute('I need a doctor');
    expect(result.instructions.length).toBeGreaterThan(0);
  });

  it('returns fallback for unknown query', () => {
    const result = findRoute('xyz123unknown');
    expect(result.estimatedMinutes).toBe(0);
  });

  it('searches zones by name', () => {
    const results = searchZones('Gate');
    expect(results.length).toBeGreaterThan(0);
  });

  it('searches zones by type', () => {
    const results = searchZones('restroom');
    expect(results.length).toBeGreaterThan(0);
  });
});
