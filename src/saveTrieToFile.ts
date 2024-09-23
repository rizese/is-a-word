import { writeFileSync } from 'fs';
import { join } from 'path';
import * as prettier from 'prettier';

export const saveTrieToFile = async (trieContent: string, filename: string) => {
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
