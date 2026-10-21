import React from 'react';
import { useOutletContext } from 'react-router-dom';
import ServicePageTemplate from '../../components/common/ServicePageTemplate';
import { servicesData } from '../../data/servicesData';

export default function MonkeySafetyNetsPage() {
  const { onOpenQuoteModal } = useOutletContext();
  const service = servicesData.find(s => s.slug === 'monkey-safety-nets');
  return <ServicePageTemplate service={service} onOpenQuoteModal={onOpenQuoteModal} />;
}
