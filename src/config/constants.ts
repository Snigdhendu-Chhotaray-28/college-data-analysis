/**
 * ECO PILLARS HUB - Application Constants & Design Tokens
 * Tagline: AI-Powered Campus Resource Intelligence & Anomaly Detection Platform
 */

export const APP_CONFIG = {
  name: 'ECO PILLARS HUB',
  appName: 'ECO PILLARS HUB',
  brandName: 'ECO PILLARS HUB',
  tagline: 'AI-Powered Campus Resource Intelligence & Anomaly Detection Platform',
  version: '1.0.0-phase0',
  brand: {
    primaryNavy: '#0B1F3A',
    secondaryNavy: '#142B4A',
    teal: '#16A085',
    mint: '#E8F5F1',
    background: '#F4F7F6',
    white: '#FFFFFF',
    border: '#D6E1DE',
    primaryText: '#10213A',
    secondaryText: '#536477',
    warning: '#F0A202',
    danger: '#D64550',
    chartBlue: '#314B80',
    magenta: '#C92F80',
  },
};

export const DEPARTMENTS = [
  { id: 'admission', name: 'Admission / Students', icon: 'Users', path: '/students', unit: 'Students' },
  { id: 'electricity', name: 'Electricity', icon: 'Zap', path: '/electricity', unit: 'kWh' },
  { id: 'water', name: 'Water', icon: 'Droplets', path: '/water', unit: 'Liters' },
  { id: 'finance', name: 'Finance', icon: 'DollarSign', path: '/finance', unit: 'INR' },
  { id: 'wifi', name: 'Wi-Fi / IT', icon: 'Wifi', path: '/wifi', unit: 'GB' },
  { id: 'food', name: 'Food / Mess', icon: 'Utensils', path: '/food', unit: 'Meals / Waste Kg' },
  { id: 'environment', name: 'Environment', icon: 'Leaf', path: '/environment', unit: 'AQI / °C' },
] as const;

export const NAV_ITEMS = [
  { label: 'Overview Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
  { label: 'Upload Data', path: '/upload', icon: 'UploadCloud' },
  { label: 'Resource Analysis', path: '/analysis', icon: 'BarChart3' },
  { label: 'Electricity Intelligence', path: '/electricity', icon: 'Zap' },
  { label: 'Water Management', path: '/water', icon: 'Droplets' },
  { label: 'Wi-Fi / IT Bandwidth', path: '/wifi', icon: 'Wifi' },
  { label: 'Food & Waste Tracking', path: '/food', icon: 'Utensils' },
  { label: 'Utility Finance', path: '/finance', icon: 'DollarSign' },
  { label: 'Student Demographics', path: '/students', icon: 'Users' },
  { label: 'Environmental Telemetry', path: '/environment', icon: 'Leaf' },
  { label: 'Academic Calendar', path: '/calendar', icon: 'Calendar' },
  { label: 'System Alerts', path: '/alerts', icon: 'AlertTriangle' },
  { label: 'AI Campus Advisor', path: '/ai-advisor', icon: 'Sparkles' },
  { label: 'Platform Settings', path: '/settings', icon: 'Settings' },
];
