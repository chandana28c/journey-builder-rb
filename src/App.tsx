import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { BuildProvider } from './context/BuildStateContext'; // Verified path
import PremiumLayout from './layouts/PremiumLayout'; // Verified path
import StepPage from './pages/StepPage'; // Verified path
import ProofPage from './pages/ProofPage'; // Verified path

function App() {
  return (
    <BuildProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/rb/01-problem" replace />} />

          <Route path="/rb" element={<PremiumLayout />}>
            <Route index element={<Navigate to="01-problem" replace />} />

            <Route path="01-problem" element={<StepPage />} />
            <Route path="02-market" element={<StepPage />} />
            <Route path="03-architecture" element={<StepPage />} />
            <Route path="04-hld" element={<StepPage />} />
            <Route path="05-lld" element={<StepPage />} />
            <Route path="06-build" element={<StepPage />} />
            <Route path="07-test" element={<StepPage />} />
            <Route path="08-ship" element={<StepPage />} />

            <Route path="proof" element={<ProofPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </BuildProvider>
  );
}

export default App;
