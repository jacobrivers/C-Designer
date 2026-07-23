import { useEffect, useState } from 'react'
import './index.css'

function App() {
  const [nodes, setNodes] = useState([])
  const [connections, setConnections] = useState([])

  useEffect(() => {
    // Read config from URL hash (#config=...)
    const hash = window.location.hash
    if (hash.startsWith('#config=')) {
      try {
        const base64Data = hash.replace('#config=', '')
        const jsonString = atob(base64Data)
        const config = JSON.parse(jsonString)

        if (config.nodes) setNodes(config.nodes)
        if (config.connections) setConnections(config.connections)
        
        console.log("Configuration successfully loaded into C-Designer:", config)
      } catch (error) {
        console.error("Failed to decode configuration from URL hash:", error)
      }
    }
  }, [])

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
