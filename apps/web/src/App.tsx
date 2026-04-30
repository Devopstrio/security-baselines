import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import BaselinesDashboard from './pages/BaselinesDashboard';

const Placeholder = ({ name }: { name: string }) => (
  <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
    <h2 className="text-xl font-bold text-white mb-2">{name}</h2>
    <p className="text-slate-400">The security baseline engine is currently evaluating configuration states against CIS benchmarks. This module will be available shortly.</p>
  </div>
);

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<BaselinesDashboard />} />
          <Route path="/compliance" element={<Placeholder name="Compliance Framework Mapping" />} />
          <Route path="/violations" element={<Placeholder name="Drift & Violation Explorer" />} />
          <Route path="/remediation" element={<Placeholder name="Remediation Orchestration Hub" />} />
          <Route path="/governance" element={<Placeholder name="Governance & Exception Workflow" />} />
          <Route path="/history" element={<Placeholder name="Validation Audit History" />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
