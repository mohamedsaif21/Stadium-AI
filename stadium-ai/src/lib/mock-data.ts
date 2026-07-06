import { StadiumZone, User, Incident, Alert, SustainabilityMetric, RouteResult } from './types';

export const MOCK_STADIUM_ZONES: StadiumZone[] = [
  { id: 'gate-a', name: 'Gate A', type: 'gate', status: 'normal', location: 'North Entrance', description: 'Main north entrance gate' },
  { id: 'gate-b', name: 'Gate B', type: 'gate', status: 'crowded', location: 'East Entrance', description: 'East side entrance gate' },
  { id: 'gate-c', name: 'Gate C', type: 'gate', status: 'available', location: 'South Entrance', description: 'South entrance gate' },
  { id: 'stand-1', name: 'Stand 1', type: 'stand', status: 'normal', location: 'Section A', description: 'North stand seating area' },
  { id: 'stand-2', name: 'Stand 2', type: 'stand', status: 'normal', location: 'Section B', description: 'East stand seating area' },
  { id: 'stand-3', name: 'Stand 3', type: 'stand', status: 'normal', location: 'Section C', description: 'South stand seating area' },
  { id: 'restroom-1', name: 'Restroom Block A', type: 'restroom', status: 'normal', location: 'Near Gate A', description: 'Main restroom facility near Gate A' },
  { id: 'restroom-2', name: 'Restroom Block B', type: 'restroom', status: 'busy', location: 'Near Food Court', description: 'Restroom facility near food court' },
  { id: 'restroom-3', name: 'Accessible Restroom', type: 'restroom', status: 'available', location: 'Section B Lower', description: 'Wheelchair accessible restroom' },
  { id: 'food-court-1', name: 'Main Food Court', type: 'food_court', status: 'busy', location: 'Central Concourse', description: 'Main food and beverage area' },
  { id: 'food-court-2', name: 'Food Kiosk A', type: 'food_court', status: 'normal', location: 'Near Gate A', description: 'Quick service food kiosk' },
  { id: 'medical-1', name: 'Medical Room 1', type: 'medical', status: 'available', location: 'Section A Lower', description: 'First aid and medical assistance' },
  { id: 'medical-2', name: 'Medical Room 2', type: 'medical', status: 'available', location: 'Section C Lower', description: 'First aid and medical assistance' },
  { id: 'exit-1', name: 'Main Exit', type: 'exit', status: 'normal', location: 'South Plaza', description: 'Main stadium exit' },
  { id: 'exit-2', name: 'Emergency Exit A', type: 'exit', status: 'available', location: 'North Side', description: 'Emergency evacuation exit' },
  { id: 'metro-1', name: 'Metro Station', type: 'metro', status: 'critical', location: '500m South', description: 'Nearest metro station to stadium' },
  { id: 'bus-1', name: 'Bus Terminal', type: 'bus', status: 'normal', location: '200m East', description: 'Public bus terminal' },
  { id: 'taxi-1', name: 'Taxi Stand', type: 'taxi', status: 'busy', location: '100m North', description: 'Taxi pickup and dropoff point' },
  { id: 'accessible-route-1', name: 'Wheelchair Route A', type: 'accessible_route', status: 'available', location: 'Throughout Section A', description: 'Wheelchair accessible path through Section A' },
  { id: 'water-1', name: 'Water Refill Station 1', type: 'water_refill', status: 'normal', location: 'Near Gate B', description: 'Free water refill station. Bring your own bottle!' },
];

export const MOCK_USERS: User[] = [
  { id: 'fan-1', email: 'fan@stadiumai.demo', name: 'Alex Fan', role: 'fan' },
  { id: 'vol-1', email: 'volunteer@stadiumai.demo', name: 'Sam Volunteer', role: 'volunteer' },
  { id: 'admin-1', email: 'admin@stadiumai.demo', name: 'Jordan Admin', role: 'admin' },
];

export const MOCK_PASSWORD = 'password123';

export const MOCK_INCIDENTS: Incident[] = [
  {
    id: 'inc-1',
    type: 'lost_child',
    title: 'Lost Child near Gate B',
    description: 'A 7-year-old child separated from parents near Gate B crowded area.',
    location: 'Gate B',
    severity: 'high',
    status: 'open',
    reportedBy: 'fan-1',
    aiSuggestedResponse: 'Calm the parents. Take the child to the nearest Information Desk or Medical Room. Broadcast a description via stadium intercom. Use the stadium find-my-child service.',
    createdAt: new Date(),
  },
  {
    id: 'inc-2',
    type: 'medical',
    title: 'Fan feeling dizzy at Stand 2',
    description: 'A spectator is feeling lightheaded and needs medical attention.',
    location: 'Stand 2, Row 12',
    severity: 'medium',
    status: 'in_progress',
    reportedBy: 'vol-1',
    assignedTo: 'vol-1',
    aiSuggestedResponse: 'Guide the person to sit down with head between knees. Ask if they have any medical conditions. Escort to Medical Room 1 if symptoms persist. Call for wheelchair assistance if needed.',
    createdAt: new Date(),
  },
  {
    id: 'inc-3',
    type: 'ticket',
    title: 'Ticket scan issue at Gate A',
    description: 'Fan ticket not scanning at the turnstile.',
    location: 'Gate A',
    severity: 'low',
    status: 'open',
    reportedBy: 'fan-1',
    aiSuggestedResponse: 'Check if the ticket is for today\'s match. Verify QR code is not damaged. Try the adjacent turnstile. If issue persists, direct fan to the Ticket Resolution counter near Gate A.',
    createdAt: new Date(),
  },
];

export const MOCK_ALERTS: Alert[] = [
  { id: 'alert-1', title: 'Gate B Overcrowding', message: 'Gate B is experiencing heavy congestion. Redirecting fans to Gates A and C.', zone: 'Gate B', severity: 'warning', createdAt: new Date(), createdBy: 'admin-1' },
  { id: 'alert-2', title: 'Metro Exit at Capacity', message: 'Metro station is at critical capacity. Advise fans to use bus terminal or taxi stand.', zone: 'Metro Exit', severity: 'critical', createdAt: new Date(), createdBy: 'admin-1' },
];

export const MOCK_SUSTAINABILITY_METRICS: SustainabilityMetric[] = [
  { id: 's-1', label: 'Public Transport Usage', value: 78, unit: '%', trend: 'up', status: 'good' },
  { id: 's-2', label: 'Waste Collection', value: 92, unit: '%', trend: 'up', status: 'good' },
  { id: 's-3', label: 'Water Refill Station Usage', value: 45, unit: '%', trend: 'up', status: 'warning' },
  { id: 's-4', label: 'Energy Usage', value: 340, unit: 'kWh', trend: 'down', status: 'good' },
];

export const MOCK_SOP_RESPONSES: Record<string, string> = {
  lost_child: 'Immediately notify security. Take child to nearest information point. Use stadium announcement system. Document child description and last known location. Stay with child until parent is located.',
  medical: 'Call medical team immediately. Do not move the person unless in danger. Clear the area. Ask for a medic in the vicinity. Document what happened for the medical team.',
  ticket: 'Check ticket validity and date. Try alternate turnstile. Verify QR code clarity. Contact ticket supervisor if needed. Direct fan to ticket resolution counter if unresolved.',
  crowd: 'Identify congestion source. Activate alternative route signage. Deploy additional staff to manage flow. Use PA system for direction updates. Monitor and adjust every 5 minutes.',
  accessibility: 'Offer wheelchair assistance. Guide to accessible route. Notify accessibility team. Ensure clear path. Document assistance provided for follow-up.',
};

export const MOCK_NAVIGATION_RESPONSES: Record<string, RouteResult> = {
  'gate a': { from: 'Current Location', to: 'Gate A', instructions: ['Head north towards the main entrance', 'Gate A is straight ahead', 'Estimated walk: 4 minutes'], estimatedMinutes: 4, accessible: true },
  'gate b': { from: 'Current Location', to: 'Gate B', instructions: ['Head east along the concourse', 'Take the second right', 'Gate B is on your left'], estimatedMinutes: 5, accessible: true },
  'gate c': { from: 'Current Location', to: 'Gate C', instructions: ['Head south past the food court', 'Gate C is at the south end'], estimatedMinutes: 3, accessible: false },
  'restroom': { from: 'Current Location', to: 'Nearest Restroom', instructions: ['Walk to the nearest restroom block', 'Follow the restroom signs', 'Accessible restroom available on lower level'], estimatedMinutes: 2, accessible: true },
  'food': { from: 'Current Location', to: 'Main Food Court', instructions: ['Walk to the central concourse', 'The main food court is in the center'], estimatedMinutes: 3, accessible: true },
  'medical': { from: 'Current Location', to: 'Medical Room 1', instructions: ['Proceed to Section A lower level', 'Medical Room 1 is behind the information desk'], estimatedMinutes: 5, accessible: true },
  'metro': { from: 'Current Location', to: 'Metro Station', instructions: ['Exit through the main south exit', 'Walk 500m south following the signs', 'Metro station entrance is on your right'], estimatedMinutes: 8, accessible: true },
  'exit': { from: 'Current Location', to: 'Main Exit', instructions: ['Follow the green EXIT signs', 'Proceed to the south plaza', 'Main exit gate is straight ahead'], estimatedMinutes: 3, accessible: true },
};

export const MOCK_AI_RESPONSES: Record<string, string> = {
  'gate': 'To reach Gate B: From your current location, head east along the main concourse. Pass the information desk, then turn right at the food court. Gate B will be on your left. Estimated time: 5 minutes. Note: Gate B is currently crowded. Consider using Gate A or C instead.',
  'restroom': 'The nearest restroom is Restroom Block A near Gate A. Walk north towards Gate A, it will be on your right before the entrance. Accessible restrooms are available at Section B Lower level. Estimated time: 2 minutes.',
  'wheelchair': 'I can help with wheelchair access! The stadium has accessible routes throughout. Use Gate A (wheelchair friendly entrance). Accessible restrooms are at Section B Lower level. Medical Rooms have wheelchair storage. We can arrange a wheelchair escort - just ask a volunteer at any information desk.',
  'metro': 'After the match, exit through the Main South Exit. Walk 500m south following the Metro signs. The Metro Station is straight ahead. Estimated time: 8 minutes. Pro tip: The metro can get very busy after matches. Consider waiting 15-20 minutes or using the bus terminal (200m east) as an alternative.',
  'translate': 'I can help with translation! Please tell me what you would like translated and to which language (Spanish, French, Arabic, or Hindi). For example: "Translate Hello to Spanish" or "How do I say Where is the bathroom? in French"',
  'help': 'I\'m your StadiumAI assistant! I can help you with:\n• Navigating to gates, seats, restrooms, and food courts\n• Finding accessible routes and wheelchair assistance\n• Post-match transport to metro, bus, and taxi stands\n• Translating phrases to Spanish, French, Arabic, or Hindi\n• Emergency assistance\nWhat do you need help with today?',
  'seat': 'Looking for your seat? Check your ticket for the section and stand number. For example, if your ticket says "Stand 2, Seat A24": Enter through Gate A, walk to Stand 2 (east section), find row A, and seat 24 is in aisle 4. Estimated time from gate to seat: 6 minutes.',
};
