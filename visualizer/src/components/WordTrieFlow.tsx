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
import {
  hierarchy,
  tree,
  HierarchyNode as D3HierarchyNode,
} from 'd3-hierarchy';
import '@xyflow/react/dist/style.css';

// Assuming TrieNode and Trie types are defined as:
type TrieNode = [string, number[]];
type Trie = TrieNode[];

// Interfaces for hierarchy node data and extended hierarchy node
interface HierarchyNodeData {
  name: string;
  children?: HierarchyNodeData[];
}

interface ExtendedHierarchyNode extends D3HierarchyNode<HierarchyNodeData> {
  id: string;
}

// Import your wordTrie
import { wordTrie } from '../../../src/wordTrie';

export const WordTrieFlow = () => {
  const [colorMode, setColorMode] = useState<ColorMode>('dark');

  const { nodes: wordNodes, edges: wordEdges } = useMemo(() => {
    function convertTrieToHierarchy(
      trie: Trie,
      index: number = 0,
    ): HierarchyNodeData {
      const [label, childrenIndices] = trie[index];

      const children = childrenIndices.map((childIndex) => {
        return convertTrieToHierarchy(trie, childIndex);
      });

      return {
        name: label,
        children: children.length > 0 ? children : undefined,
      };
    }

    const rootData = convertTrieToHierarchy(wordTrie);
    const root = hierarchy<HierarchyNodeData>(rootData);

    // Adjust the tree layout for top-to-bottom orientation
    const treeLayout = tree<HierarchyNodeData>().nodeSize([50, 100]);
    treeLayout(root);

    const nodes: Node[] = [];
    const edges: Edge[] = [];

    let nodeId = 0;
    root.each((node) => {
      const extendedNode = node as ExtendedHierarchyNode;
      extendedNode.id = nodeId.toString();
      nodeId += 1;

      nodes.push({
        id: extendedNode.id,
        position: { x: extendedNode.x!, y: extendedNode.y! },
        data: { label: extendedNode.data.name.toUpperCase() },
        style: {
          width: 40,
        },
      });

      if (extendedNode.parent) {
        const parentNode = extendedNode.parent as ExtendedHierarchyNode;
        edges.push({
          id: `${parentNode.id}-${extendedNode.id}`,
          source: parentNode.id,
          target: extendedNode.id,
        });
      }
    });

    return { nodes, edges };
  }, []);

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
      nodesConnectable={!isLocked}
      nodesFocusable={!isLocked}
      elementsSelectable={!isLocked}
    >
      <Background />
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
