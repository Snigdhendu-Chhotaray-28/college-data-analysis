import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';

import { Dashboard } from '../pages/Dashboard';
import { Upload } from '../pages/Upload';
import { Analysis } from '../pages/Analysis';
import { Electricity } from '../pages/Electricity';
import { Water } from '../pages/Water';
import { Wifi } from '../pages/Wifi';
import { Food } from '../pages/Food';
import { Finance } from '../pages/Finance';
import { Students } from '../pages/Students';
import { Environment } from '../pages/Environment';
import { Calendar } from '../pages/Calendar';
import { Alerts } from '../pages/Alerts';
import { AIAdvisor } from '../pages/AIAdvisor';
import { Settings } from '../pages/Settings';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="upload" element={<Upload />} />
        <Route path="analysis" element={<Analysis />} />
        <Route path="electricity" element={<Electricity />} />
        <Route path="water" element={<Water />} />
        <Route path="wifi" element={<Wifi />} />
        <Route path="food" element={<Food />} />
        <Route path="finance" element={<Finance />} />
        <Route path="students" element={<Students />} />
        <Route path="environment" element={<Environment />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="ai-advisor" element={<AIAdvisor />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
};
