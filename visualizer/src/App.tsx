import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { WordTrieFlow } from './components/WordTrieFlow';

function App() {
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div style={{ width: '100vw', height: '100vh' }}>
        <WordTrieFlow />
      </div>
    </>
  );
}

export default App;
