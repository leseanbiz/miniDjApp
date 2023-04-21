import React, { useCallback, useContext, useState } from "react";
import { MixerContext } from "../../providers/AudioProvider/AudioProvider";
import ReactFlow, {
  Background,
  Controls,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";

const AudioGraph = () => {
  const { channels } = useContext(MixerContext);
  const initialNodes = [
    {
      id: "1",
      data: { label: "Hello" },
      position: { x: 0, y: 0 },
      type: "input",
    },
    {
      id: "2",
      data: { label: "World" },
      position: { x: 100, y: 100 },
    },
  ];
  const initialEdges: any[] = [];
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState<any[]>(initialEdges);
  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds: any) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    []
  );
  return (
    <div style={{ height: 800 }}>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default AudioGraph;
