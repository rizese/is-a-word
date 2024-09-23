import { Node } from '@xyflow/react';
import { TrieNode } from '../../src/TrieNode';

const nodeDefaults = {
  type: 'default',
  style: { border: '1px solid black', padding: '10px' },
};

export function generateFlowNodes(trie: TrieNode[]): Node[] {
  const nodes: Node[] = trie.map((node, index) => ({
    id: index.toString(), // Use index as the ID
    position: { x: (index % 5) * 200, y: Math.floor(index / 5) * 100 }, // Spread nodes out
    data: { label: node[0] }, // The character of the node (not the entire TrieNode)
    ...nodeDefaults,
  }));

  return nodes;
}
