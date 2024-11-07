import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./routes/Welcome";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/welcome/:userId" element={<WelcomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
