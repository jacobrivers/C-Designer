import { MarkerType } from '@xyflow/react';

export const initialNodes = [
  {
    id: 'customer-zone',
    type: 'group',
    position: { x: 20, y: 70 },
    style: {
      width: 390,
      height: 520,
      background: 'rgba(225, 240, 255, 0.55)',
      border: '2px dashed #2f6fb3',
      borderRadius: 14
    },
    data: { label: 'Customer Site' }
  },
  {
    id: 'internet-zone',
    type: 'group',
    position: { x: 455, y: 70 },
    style: {
      width: 300,
      height: 520,
      background: 'rgba(250, 250, 250, 0.9)',
      border: '2px dashed #a0a0a0',
      borderRadius: 14
    },
    data: { label: 'Open Internet' }
  },
  {
    id: 'nice-zone',
    type: 'group',
    position: { x: 805, y: 70 },
    style: {
      width: 520,
      height: 520,
      background: 'rgba(230, 247, 235, 0.75)',
      border: '2px dashed #438a52',
      borderRadius: 14
    },
    data: { label: 'NiCE Infrastructure' }
  },
  {
    id: 'pbx',
    type: 'diagramNode',
    position: { x: 65, y: 190 },
    data: {
      label: 'PBX / UC Platform',
      subtitle: 'Customer Voice Environment',
      icon: 'pbx',
      variant: 'customer',
      details: ['Example: Avaya, Cisco, Teams']
    }
  },
  {
    id: 'customer-sbc',
    type: 'diagramNode',
    position: { x: 235, y: 175 },
    data: {
      label: 'Customer SBC',
      subtitle: 'ACME-SBC01',
      icon: 'sbc',
      variant: 'customer',
      details: ['Public IP: 203.0.113.10', 'SIP/TLS enabled']
    }
  },
  {
    id: 'firewall',
    type: 'diagramNode',
    position: { x: 235, y: 360 },
    data: {
      label: 'Firewall',
      subtitle: 'Customer Edge',
      icon: 'firewall',
      variant: 'customer',
      details: ['Allow SIP/TLS 5061', 'Allow RTP/SRTP ranges']
    }
  },
  {
    id: 'internet',
    type: 'diagramNode',
    position: { x: 535, y: 245 },
    data: {
      label: 'Internet',
      subtitle: 'Open Internet',
      icon: 'internet',
      variant: 'internet',
      details: ['No VPN', 'No MPLS']
    }
  },
  {
    id: 'dallas-sbc',
    type: 'diagramNode',
    position: { x: 870, y: 150 },
    data: {
      label: 'Dallas Edge SBC',
      subtitle: 'Primary',
      icon: 'nice',
      variant: 'nice',
      details: ['Dallas, TX', 'Public IP: 198.51.100.21']
    }
  },
  {
    id: 'la-sbc',
    type: 'diagramNode',
    position: { x: 870, y: 365 },
    data: {
      label: 'Los Angeles Edge SBC',
      subtitle: 'Secondary',
      icon: 'nice',
      variant: 'nice',
      details: ['Los Angeles, CA', 'Public IP: 198.51.100.41']
    }
  },
  {
    id: 'cxone-dallas',
    type: 'diagramNode',
    position: { x: 1120, y: 150 },
    data: {
      label: 'CXone Services',
      subtitle: 'Dallas path',
      icon: 'service',
      variant: 'nice',
      details: ['ACD', 'Recording', 'Media services']
    }
  },
  {
    id: 'cxone-la',
    type: 'diagramNode',
    position: { x: 1120, y: 365 },
    data: {
      label: 'CXone Services',
      subtitle: 'LA path',
      icon: 'service',
      variant: 'nice',
      details: ['ACD', 'Recording', 'Media services']
    }
  }
];

const edgeStyle = { stroke: '#0b5cad', strokeWidth: 2.5 };
const arrow = { type: MarkerType.ArrowClosed, color: '#0b5cad' };

export const initialEdges = [
  { id: 'e-pbx-sbc', source: 'pbx', target: 'customer-sbc', label: 'SIP', style: edgeStyle, markerEnd: arrow },
  { id: 'e-sbc-fw', source: 'customer-sbc', target: 'firewall', label: 'Customer LAN', style: { stroke: '#2d7d32', strokeWidth: 2 }, markerEnd: arrow },
  { id: 'e-fw-internet', source: 'firewall', target: 'internet', label: 'SIP/TLS 5061', style: edgeStyle, markerEnd: arrow },
  { id: 'e-internet-dallas', source: 'internet', target: 'dallas-sbc', label: 'SIP/TLS 5061 Primary', style: edgeStyle, markerEnd: arrow },
  { id: 'e-internet-la', source: 'internet', target: 'la-sbc', label: 'SIP/TLS 5061 Secondary', style: edgeStyle, markerEnd: arrow },
  { id: 'e-dallas-cxone', source: 'dallas-sbc', target: 'cxone-dallas', label: 'Internal NiCE routing', style: edgeStyle, markerEnd: arrow },
  { id: 'e-la-cxone', source: 'la-sbc', target: 'cxone-la', label: 'Internal NiCE routing', style: edgeStyle, markerEnd: arrow }
];
