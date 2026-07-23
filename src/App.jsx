import { useState, useEffect } from 'react'
import './index.css'

const getConfigFromHash = () => {
  try {
    const hash = window.location.hash;
    if (hash.includes('config=')) {
      const configPart = hash.split('config=')[1].split('&')[0];
      const jsonString = atob(configPart);
      return JSON.parse(jsonString);
    }
  } catch (error) {
    console.error("Failed to decode URL config hash:", error);
  }
  return { nodes: [], connections: [] };
};

const getParamFromHash = (param) => {
  const hash = window.location.hash;
  const match = hash.match(new RegExp(param + '=([^&]+)'));
  return match ? match[1] : null;
};

function App() {
  const initialConfig = getConfigFromHash();
  const [nodes, setNodes] = useState(initialConfig.nodes || []);
  const [connections, setConnections] = useState(initialConfig.connections || []);

  // Check if mode=view is passed in the URL hash to collapse sidebars by default
  const isViewMode = getParamFromHash('mode') === 'view';

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
          <p style={{ fontSize: '12px', color: '#8b949e' }}>Nodes: {nodes.length}</p>
          {/* Add your component buttons/list here */}
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
          {/* Render your canvas or nodes layout here */}
          <p style={{ color: '#8b949e' }}>Canvas workspace loaded with {nodes.length} nodes.</p>
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
          <p style={{ fontSize: '12px', color: '#8b949e' }}>Select an item to edit properties.</p>
        </div>
      </div>

    </div>
  )
}

export default App
