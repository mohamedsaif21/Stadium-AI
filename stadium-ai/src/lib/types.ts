export type UserRole = 'fan' | 'volunteer' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface StadiumZone {
  id: string;
  name: string;
  type: 'gate' | 'stand' | 'restroom' | 'food_court' | 'medical' | 'exit' | 'metro' | 'bus' | 'taxi' | 'accessible_route' | 'water_refill';
  status: 'normal' | 'crowded' | 'busy' | 'available' | 'critical';
  location: string;
  description: string;
}

export interface RouteResult {
  from: string;
  to: string;
  instructions: string[];
  estimatedMinutes: number;
  accessible: boolean;
}

export interface Incident {
  id: string;
  type: 'lost_child' | 'medical' | 'ticket' | 'crowd' | 'accessibility' | 'other';
  title: string;
  description: string;
  location: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'resolved' | 'in_progress';
  reportedBy: string;
  assignedTo?: string;
  aiSuggestedResponse?: string;
  createdAt: Date;
  resolvedAt?: Date;
}

export interface Alert {
  id: string;
  title: string;
  message: string;
  zone: string;
  severity: 'info' | 'warning' | 'critical';
  createdAt: Date;
  createdBy: string;
}

export interface SustainabilityMetric {
  id: string;
  label: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  status: 'good' | 'warning' | 'critical';
}

export interface StadiumOverview {
  totalFans: number;
  activeGates: number;
  crowdDensity: number;
  openIncidents: number;
  sustainabilityScore: number;
}

export interface NavigationQuery {
  query: string;
  accessible?: boolean;
}

export interface AIRequest {
  message: string;
  role: UserRole;
  context?: Record<string, unknown>;
}

export interface AIResponse {
  response: string;
  mock: boolean;
}
