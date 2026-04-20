import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LeadList from "./pages/LeadList";
import CreateLead from "./pages/CreateLead";
import LeadDetail from "./pages/LeadDetail";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

        <Route path="/" element={<LeadList />} />
        <Route path="/create" element={<CreateLead />} />
        <Route path="/leads/:id" element={<LeadDetail />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;