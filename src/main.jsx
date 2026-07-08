import React, { useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  MarkerType,
  Handle,
  Position,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { toPng } from 'html-to-image';
import {
  Building2,
  Cloud,
  Server,
  Shield,
  Network,
  PhoneCall,
  Database,
  BadgeInfo
} from 'lucide-react';
import { initialNodes, initialEdges } from './data/sampleDiagram.js';
import './styles.css';

const iconMap = {
  customer: Building2,
  pbx: PhoneCall,
  sbc: Server,
  firewall: Shield,
  internet: Cloud,
  nice: Network,
  service: Database,
  note: BadgeInfo
};

function DiagramNode({ data }) {
  const Icon = iconMap[data.icon] || Network;
  return (
    <div className={`diagram-node ${data.variant || ''}`}>
      <Handle type="target" position={Position.Left} />
      <div className="node-header">
        <Icon size={22} />
        <strong>{data.label}</strong>
      </div>
      {data.subtitle && <div className="node-subtitle">{data.subtitle}</div>}
      {data.details?.map((detail) => (
        <div className="node-detail" key={detail}>{detail}</div>
      ))}
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

const nodeTypes = { diagramNode: DiagramNode };

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, markerEnd: { type: MarkerType.ArrowClosed } }, eds)),
    [setEdges]
  );

  const exportPng = async () => {
    const viewport = document.querySelector('.react-flow__viewport');
    if (!viewport) return;
    const dataUrl = await toPng(viewport, {
      backgroundColor: '#ffffff',
      pixelRatio: 2
    });
    const link = document.createElement('a');
    link.download = 'customer-connectivity-diagram.png';
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <h1>Connectivity Diagram Builder</h1>
          <p>Customer SIP over Open Internet to Dallas and Los Angeles NiCE infrastructure</p>
        </div>
        <button onClick={exportPng}>Export PNG</button>
      </header>

      <main className="canvas-wrap">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          defaultEdgeOptions={{
            animated: false,
            style: { strokeWidth: 2 },
            markerEnd: { type: MarkerType.ArrowClosed }
          }}
        >
          <Panel position="top-left" className="diagram-title">
            <strong>Customer:</strong> ACME Corporation&nbsp;&nbsp;|&nbsp;&nbsp;
            <strong>Transport:</strong> SIP/TLS over Open Internet&nbsp;&nbsp;|&nbsp;&nbsp;
            <strong>Design:</strong> Dallas Primary / Los Angeles Secondary
          </Panel>

          <Panel position="bottom-left" className="legend">
            <strong>Legend</strong>
            <span>Blue line: SIP/TLS 5061</span>
            <span>Dashed zones: responsibility domains</span>
            <span>NiCE side: edge SBCs and CXone services</span>
          </Panel>

          <Background gap={18} size={1} />
          <MiniMap zoomable pannable />
          <Controls />
        </ReactFlow>
      </main>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
