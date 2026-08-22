import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { MeliGuideProvider } from '@/context/MeliGuideContext';
import { HomePage } from '@/pages/HomePage';
import { SalesPulsePage } from '@/pages/SalesPulsePage';
import { DocuChatPage } from '@/pages/DocuChatPage';
import { MeliPage } from '@/pages/MeliPage';
import { MedVisionPage } from '@/pages/MedVisionPage';
import { LabPage } from '@/pages/LabPage';
import { AboutPage } from '@/pages/AboutPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MeliGuideProvider>
        <AppShell>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/work/salespulse" element={<SalesPulsePage />} />
            <Route path="/work/docuchat" element={<DocuChatPage />} />
            <Route path="/work/meli" element={<MeliPage />} />
            <Route path="/work/medvision" element={<MedVisionPage />} />
            <Route path="/lab" element={<LabPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AppShell>
      </MeliGuideProvider>
    </BrowserRouter>
  );
};

export default App;
