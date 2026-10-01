import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { UploadPlaceholder } from '../components/uploads/UploadPlaceholder';

export const Upload: React.FC = () => {
  return (
    <div>
      <PageHeader
        title="Department Excel Upload"
        tagline="Upload monthly operational Excel sheets for validation, normalization, and Supabase ingestion"
        badgeText="Phase 0 Pipeline"
      />
      <UploadPlaceholder />
    </div>
  );
};
