import { useState, useEffect } from 'react'
import './index.css'

const parseUrlHash = () => {
  const hash = window.location.hash;
  let config = { nodes: [], connections: [] };
  let isViewMode = false;

  try {
    if (hash.includes('config=')) {
      const configPart = hash.split('config=')[1].split('&')[0];
      const jsonString = atob(configPart);
      config = JSON.parse(jsonString);
    }
    if (hash.includes('mode=view')) {
      isViewMode = true;
    }
  } catch (error) {
    console.error("Failed to parse URL hash parameters:", error);
  }

  return { config, isViewMode };
};

function App() {
  const { config, isViewMode } = parseUrlHash();
  
  const [nodes, setNodes] = useState(config.nodes || []);
  const [connections, setConnections] = useState(config.connections || []);

  // If view mode is active, default sidebars to closed (width 0px)
  const [leftOpen, setLeftOpen] = useState(!isViewMode);
  const [rightOpen, setRightOpen] = useState(!isViewMode);

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative', background: '#0d1117', color: '#fff', fontFamily: 'sans-serif' }}>
      
      {/* Left Sidebar (Components) */}
      <div style={{
        width: leftOpen ? '260px' : '0px',
        transition: 'width 0.3s ease',
        background: '#161b22',
        borderRight: leftOpen ? '1px solid #30363d' : 'none',
        overflow: 'hidden',
        position: 'relative',
        flexShrink: 0
      }}>
        <div style={{ width: '260px', padding: '20px', boxSizing: 'border-box' }}>
          <h3>Components</h3>
          <p style={{ fontSize: '12px', color: '#8b949e' }}>Total Nodes: {nodes.length}</p>
        </div>
      </div>

      {/* Toggle Button for Left Sidebar */}
      <button 
        onClick={() => setLeftOpen(!leftOpen)}
        style={{
          position: 'absolute',
          left: leftOpen ? '245px' : '10px',
          top: '15px',
          zIndex: 10,
          background: '#21262d',
          color: '#c9d1d9',
          border: '1px solid #30363d',
          borderRadius: '4px',
          cursor: 'pointer',
          padding: '4px 8px'
        }}
      >
        {leftOpen ? '◀ Hide' : '▶ Components'}
      </button>

      {/* Center Canvas Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', height: '100%' }}>
        <div style={{ padding: '15px 60px', borderBottom: '1px solid #30363d', background: '#161b22', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0 }}>C-Designer Canvas</h3>
        </div>
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
          <h4>Loaded Configuration Nodes:</h4>
          <ul>
            {nodes.map(node => (
              <li key={node.id}>
                <strong>{node.type}</strong> (ID: {node.id}) — X: {node.x}, Y: {node.y}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Toggle Button for Right Sidebar */}
      <button 
        onClick={() => setRightOpen(!rightOpen)}
        style={{
          position: 'absolute',
          right: rightOpen ? '285px' : '10px',
          top: '15px',
          zIndex: 10,
          background: '#21262d',
          color: '#c9d1d9',
          border: '1px solid #30363d',
          borderRadius: '4px',
          cursor: 'pointer',
          padding: '4px 8px'
        }}
      >
        {rightOpen ? 'Hide ▶' : 'Properties ◀'}
      </button>

      {/* Right Sidebar (Properties) */}
      <div style={{
        width: rightOpen ? '300px' : '0px',
        transition: 'width 0.3s ease',
        background: '#161b22',
        borderLeft: rightOpen ? '1px solid #30363d' : 'none',
        overflow: 'hidden',
        position: 'relative',
        flexShrink: 0
      }}>
        <div style={{ width: '300px', padding: '20px', boxSizing: 'border-box' }}>
          <h3>Properties</h3>
          <p style={{ fontSize: '12px', color: '#8b949e' }}>Select an item to view properties.</p>
        </div>
      </div>

    </div>
  )
}

export default App
