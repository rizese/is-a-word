import { TrieNode } from './TrieNode';

export function constructWordTrie(words: string[]): TrieNode[] {
  const trie: TrieNode[] = [];
  let nodeIndex = 0;

  // Helper function to find or create a node
  function findOrCreateNode(char: string): number {
    // Check if node already exists
    for (let i = 0; i < trie.length; i++) {
      if (trie[i][0] === char) {
        return i;
      }
    }
    // Create a new node if not found
    const newNode: TrieNode = [char, []];
    trie.push(newNode);
    return nodeIndex++;
  }

  for (const word of words) {
    let currentNodeIndex = findOrCreateNode(word[0]);

    for (let i = 1; i < word.length; i++) {
      const char = word[i];
      const childIndex = findOrCreateNode(char);

      if (!trie[currentNodeIndex][1].includes(childIndex)) {
        trie[currentNodeIndex][1].push(childIndex);
      }

      currentNodeIndex = childIndex;
    }
  }

  return trie;
}
