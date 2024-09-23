import { constructWordTrie2 } from './constructWordTrie2';
import { saveTrieToFile } from './saveTrieToFile';
import { trieFileWrap } from './trieFileWrap';

const SAVE_PATH = 'wordTrie.ts';

const words: string[] = [
  'balance',
  'banana',
  'basic',
  'between',
  'blast',
  'blue',
  'brother',
];
const wordTrie = constructWordTrie2(words);

console.log(wordTrie);
saveTrieToFile(trieFileWrap(wordTrie), SAVE_PATH);
console.log(`Word trie generated and save to ${SAVE_PATH}`);
