import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Join from './component/join/join'
import Chat from './component/chatInerface/chat'

const ENDPOINT = 'http://localhost:4500/';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Join />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
