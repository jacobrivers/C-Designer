import { useState, useEffect } from 'react'
import './index.css'

// Helper function to extract config immediately on load
const getConfigFromHash = () => {
  try {
    const hash = window.location.hash;
    if (hash.startsWith('#config=')) {
      const base64Data = hash.replace('#config=', '');
      const jsonString = atob(base64Data);
      return JSON.parse(jsonString);
    }
  } catch (error) {
    console.error("Failed to decode URL config hash:", error);
  }
  return { nodes: [], connections: [] };
};

function App() {
  // Initialize state directly from the URL hash payload
  const initialConfig = getConfigFromHash();
  const [nodes, setNodes] = useState(initialConfig.nodes);
  const [connections, setConnections] = useState(initialConfig.connections);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>C-Designer Canvas</h2>
      <div style={{ background: '#f4f4f4', padding: '15px', borderRadius: '5px', marginTop: '15px' }}>
        <h4>Loaded Nodes ({nodes.length}):</h4>
        <ul>
          {nodes.map(node => (
            <li key={node.id}>
              <strong>{node.type}</strong> (ID: {node.id}) — X: {node.x}, Y: {node.y}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
