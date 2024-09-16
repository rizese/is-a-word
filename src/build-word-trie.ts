import fs from 'fs';
import path from 'path';

export interface TrieNode {
  0: string;      // Single character
  1: number[];    // Array of indices (numbers)
}

function insertWord(trie: TrieNode[], word: string): void {
  let currentIndex = 0;

  for (let i = 0; i < word.length; i++) {
    const char = word[i];
    let foundIndex = trie[currentIndex][1].find(
      index => trie[index][0] === char
    );

    // If the character is not found, create a new TrieNode for it
    if (foundIndex === undefined) {
      const newNodeIndex = trie.length;
      trie.push([char, []]);
      trie[currentIndex][1].push(newNodeIndex);
      currentIndex = newNodeIndex;
    } else {
      currentIndex = foundIndex;
    }
  }
}

function buildTrie(words: string[]): TrieNode[] {
  const trie: TrieNode[] = [['', []]];  // Initialize root node

  words.forEach(word => insertWord(trie, word));

  return trie;
}

function saveTrieToFile(trieString: string, filename: string): void {
  const filePath = path.join(__dirname, filename);
  fs.writeFileSync(filePath, trieString);
  console.log(`Trie saved to ${filePath}`);
}

function exportWrap(t:TrieNode[]): string {
    return `
import { TrieNode } from "./build-word-trie";

export const wordTrie: TrieNode[] =${JSON.stringify(t, null, 2)};`
}

const words = ['banana', 'balance', 'between', 'basic'];
const wordTrie = buildTrie(words);
saveTrieToFile(exportWrap(wordTrie), 'word-trie.ts');
console.log('Saved to trie-data.ts')
