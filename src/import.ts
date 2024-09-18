import { Client } from 'pg';
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  user: process.env.POSTGRES_USER,
  host: 'localhost',
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT),
});

// const FILEPATH = path.join(__dirname, '../english-words/words_alpha.txt');
const FILEPATH = path.join(__dirname, '../words/kindergarten.txt');

const importWords = async () => {
  try {
    await client.connect();

    const fileStream = fs.createReadStream(FILEPATH, 'utf-8');
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      const trimmedWord = line.trim();

      if (trimmedWord) {
        const firstLetter = trimmedWord.charAt(0).toLowerCase();
        // todo - upsert this
        await client.query(
          'INSERT INTO words (word, first_letter) VALUES ($1, $2)',
          [trimmedWord, firstLetter],
        );
        console.log(`Added ${firstLetter} word: ${trimmedWord}`);
      }
    }

    console.log('Words imported successfully.');
  } catch (error) {
    console.error('Error importing words:', error);
  } finally {
    await client.end();
    console.log('Client disconnected.');
  }
};

importWords();
