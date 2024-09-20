import { writeFileSync } from 'fs';
import { join } from 'path';
import * as prettier from 'prettier';

export type TrieNode = [string, number[]];

const SAVE_PATH = 'word-trie.ts';

function constructWordTrie(words: string[]): TrieNode[] {
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

// Example usage
const words: string[] = [
  'balance',
  'banana',
  'basic',
  'between',
  'blast',
  'blue',
  'brother',
];
const wordTrie = constructWordTrie(words);

const saveTrieToFile = async (trieContent: string, filename: string) => {
  const filePath = join(__dirname, filename);
  writeFileSync(filePath, trieContent);

  try {
    const formattedContent = await prettier.format(trieContent, {
      parser: 'typescript',
    });
    writeFileSync(filePath, formattedContent);
    console.log(`Trie formatted and saved to ${filename}`);
  } catch (error) {
    console.error('Error formatting the trie content:', error);
  }
};

const trieFileWrap = (trie: TrieNode[]): string => {
  const trieStr = trie.map(
    (node, index): string => `/* ${index} */ ${JSON.stringify(node)}`,
  );

  const content = `
  import { TrieNode } from "./build-word-trie"\n;
  \n
  export const wordTrie: TrieNode[] = [ \n
    ${trie.map(
      (node, index): string => `/* ${index} */ ${JSON.stringify(node)}`,
    )}
  ];`;

  return content;
};

console.log(wordTrie);
saveTrieToFile(trieFileWrap(wordTrie), SAVE_PATH);

// 0  ['b', [1, 5, 2, 11]],
// 1  ['a', [2, 3, 6]],
// 2  ['l', [1, 10]],
// 3  ['n', [4, 1]],
// 4  ['c', [5]],
// 5  ['e', [8, 5, 3, 11]],
// 6  ['s', [7, 8]],
// 7  ['i', [4]],
// 8  ['t', [9, 13]],
// 9  ['w', [5]],
// 10 ['u', [5]],
// 11 ['r', [12]],
// 12 ['o', [8]],
// 13 ['h', [5]];
