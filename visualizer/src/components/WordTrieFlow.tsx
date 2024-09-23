import { ChangeEventHandler, useCallback, useMemo, useState } from 'react';
import {
  ReactFlow,
  addEdge,
  Node,
  useNodesState,
  useEdgesState,
  OnConnect,
  Edge,
  Background,
  Panel,
  ColorMode,
} from '@xyflow/react';
import { wordTrie } from '../../../src/wordTrie';
import { generateFlowNodes } from '../../utils/generateFlowNodes';
import { generateFlowEdges } from '../../utils/generateFlowEdges';

import '@xyflow/react/dist/style.css';

export const WordTrieFlow = () => {
  const [colorMode, setColorMode] = useState<ColorMode>('dark');

  const wordNodes = useMemo<Node[]>(() => generateFlowNodes(wordTrie), []);
  const wordEdges = useMemo<Edge[]>(() => generateFlowEdges(wordTrie), []);

  const [nodes, , onNodesChange] = useNodesState(wordNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(wordEdges);

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onChange: ChangeEventHandler<HTMLSelectElement> = (evt) => {
    setColorMode(evt.target.value as ColorMode);
  };

  const isLocked = true;

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      colorMode={colorMode}
      fitView
      edgesFocusable={!isLocked}
      // nodesDraggable={!isLocked}
      nodesConnectable={!isLocked}
      nodesFocusable={!isLocked}
      elementsSelectable={!isLocked}
    >
      {/* <MiniMap /> */}
      <Background />
      {/* <Controls /> */}

      <Panel position="top-right">
        <select onChange={onChange} data-testid="colormode-select">
          <option value="dark">dark</option>
          <option value="light">light</option>
          <option value="system">system</option>
        </select>
      </Panel>
    </ReactFlow>
  );
};
