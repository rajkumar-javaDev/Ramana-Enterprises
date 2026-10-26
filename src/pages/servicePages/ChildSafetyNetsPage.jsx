import React from 'react';
import { useOutletContext } from 'react-router-dom';
import ServicePageTemplate from '../../components/common/ServicePageTemplate';
import { servicesData } from '../../data/servicesData';

export default function ChildSafetyNetsPage() {
  const { onOpenQuoteModal } = useOutletContext();
  const service = servicesData.find(s => s.slug === 'children-safety-nets' || s.slug === 'child-safety-nets');
  return <ServicePageTemplate service={service} onOpenQuoteModal={onOpenQuoteModal} />;
}
