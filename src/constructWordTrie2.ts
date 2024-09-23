import { TrieNode } from './TrieNode';

export function constructWordTrie2(words: string[]): TrieNode[] {
  const trie: TrieNode[] = [];
  const nodeMap = new Map<string, number>(); // Map to store unique node indices by character and path
  let nodeIndex = 0;

  function findOrCreateNode(char: string, path: string): number {
    const key = path + char; // Use path to ensure uniqueness of nodes with the same character at different levels
    if (nodeMap.has(key)) {
      return nodeMap.get(key)!;
    }
    const newNode: TrieNode = [char, []];
    trie.push(newNode);
    nodeMap.set(key, nodeIndex);
    return nodeIndex++;
  }

  for (const word of words) {
    let currentNodeIndex = findOrCreateNode(word[0], '');

    for (let i = 1; i < word.length; i++) {
      const char = word[i];
      const path = word.substring(0, i); // Keep track of the path to make node unique
      const childIndex = findOrCreateNode(char, path);

      if (!trie[currentNodeIndex][1].includes(childIndex)) {
        trie[currentNodeIndex][1].push(childIndex);
      }

      currentNodeIndex = childIndex;
    }
  }

  return trie;
}
