import { Edge } from '@xyflow/react';
import { TrieNode } from '../../src/TrieNode';

export function generateFlowEdges(trie: TrieNode[]): Edge[] {
  const edges: Edge[] = [];

  trie.forEach((node, index) => {
    node[1].forEach((childIndex) => {
      edges.push({
        id: `${index}-${childIndex}`,
        source: index.toString(),
        target: childIndex.toString(),
      });
    });
  });

  return edges;
}
