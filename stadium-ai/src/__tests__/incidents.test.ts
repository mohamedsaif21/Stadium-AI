import { MOCK_INCIDENTS, MOCK_SOP_RESPONSES } from '@/lib/mock-data';

describe('Incident Data', () => {
  it('has valid mock incidents', () => {
    expect(MOCK_INCIDENTS.length).toBeGreaterThan(0);
    MOCK_INCIDENTS.forEach(inc => {
      expect(inc.id).toBeTruthy();
      expect(inc.title).toBeTruthy();
      expect(inc.type).toBeTruthy();
    });
  });

  it('has SOP responses for all incident types', () => {
    const types = ['lost_child', 'medical', 'ticket', 'crowd', 'accessibility'];
    types.forEach(type => {
      expect(MOCK_SOP_RESPONSES[type]).toBeTruthy();
    });
  });
});
