import { TrieNode } from './TrieNode';

export const trieFileWrap = (trie: TrieNode[]): string => {
  const trieStr = trie.map(
    (node, index): string => `/* ${index} */ ${JSON.stringify(node)}`,
  );

  const content = `
  import { TrieNode } from "./TrieNode";\n;
  \n
  export const wordTrie: TrieNode[] = [ \n
    ${trie.map(
      (node, index): string => `/* ${index} */ ${JSON.stringify(node)}`,
    )}
  ];`;

  return content;
};
