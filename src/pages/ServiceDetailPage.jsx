import React from 'react';
import { useParams, useOutletContext, Navigate } from 'react-router-dom';
import ServicePageTemplate from '../components/common/ServicePageTemplate';
import { servicesData } from '../data/servicesData';

export default function ServiceDetailPage() {
  const { serviceSlug } = useParams();
  const { onOpenQuoteModal } = useOutletContext();

  const service = servicesData.find(s => s.slug === serviceSlug || s.id === serviceSlug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return <ServicePageTemplate service={service} onOpenQuoteModal={onOpenQuoteModal} />;
}
