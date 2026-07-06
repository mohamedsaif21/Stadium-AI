import { RouteResult } from './types';
import { MOCK_STADIUM_ZONES, MOCK_NAVIGATION_RESPONSES } from './mock-data';

export function findRoute(query: string): RouteResult {
  const lower = query.toLowerCase().trim();
  
  const exactMatch = MOCK_NAVIGATION_RESPONSES[lower];
  if (exactMatch) return exactMatch;

  if (lower.includes('gate')) {
    const gateMatch = lower.match(/gate\s+([a-c])/i);
    if (gateMatch) {
      const key = `gate ${gateMatch[1].toLowerCase()}`;
      return MOCK_NAVIGATION_RESPONSES[key] || MOCK_NAVIGATION_RESPONSES['gate a'];
    }
    return MOCK_NAVIGATION_RESPONSES['gate a'];
  }

  if (lower.includes('restroom') || lower.includes('bathroom') || lower.includes('toilet') || lower.includes('washroom')) {
    return MOCK_NAVIGATION_RESPONSES['restroom'];
  }

  if (lower.includes('food') || lower.includes('eat') || lower.includes('drink')) {
    return MOCK_NAVIGATION_RESPONSES['food'];
  }

  if (lower.includes('medical') || lower.includes('doctor') || lower.includes('first aid') || lower.includes('hospital')) {
    return MOCK_NAVIGATION_RESPONSES['medical'];
  }

  if (lower.includes('metro') || lower.includes('train') || lower.includes('subway')) {
    return MOCK_NAVIGATION_RESPONSES['metro'];
  }

  if (lower.includes('exit') || lower.includes('leave') || lower.includes('out')) {
    return MOCK_NAVIGATION_RESPONSES['exit'];
  }

  if (lower.includes('seat')) {
    const seatMatch = lower.match(/seat\s+([a-z]\d+)/i);
    const seat = seatMatch ? seatMatch[1] : 'your seat';
    return {
      from: 'Current Location',
      to: `Seat ${seat}`,
      instructions: [
        'Enter through the nearest gate based on your ticket section',
        `Follow signs to your stand/section`,
        `Locate row and seat ${seat}`,
        'Ask a volunteer if you need help finding your seat',
      ],
      estimatedMinutes: 6,
      accessible: true,
    };
  }

  return {
    from: 'Current Location',
    to: query,
    instructions: [
      'I\'m not sure about that specific location.',
      'Please try asking for: a gate (A, B, or C), restroom, food court, medical room, metro station, or an exit.',
      'You can also ask a volunteer at the nearest information desk.',
    ],
    estimatedMinutes: 0,
    accessible: false,
  };
}

export function searchZones(query: string) {
  const lower = query.toLowerCase();
  return MOCK_STADIUM_ZONES.filter(zone =>
    zone.name.toLowerCase().includes(lower) ||
    zone.type.toLowerCase().includes(lower) ||
    zone.location.toLowerCase().includes(lower) ||
    zone.description.toLowerCase().includes(lower)
  );
}

export function getZonesByType(type: string) {
  return MOCK_STADIUM_ZONES.filter(zone => zone.type === type);
}

export function getZoneStatusMap() {
  const map: Record<string, string> = {};
  MOCK_STADIUM_ZONES.forEach(zone => {
    map[zone.name] = zone.status;
  });
  return map;
}
