import React from 'react';
import { useOutletContext } from 'react-router-dom';
import ServicePageTemplate from '../../components/common/ServicePageTemplate';
import { servicesData } from '../../data/servicesData';

export default function InnerHouseSafetyNetsPage() {
  const { onOpenQuoteModal } = useOutletContext();
  const service = servicesData.find(s => s.slug === 'inner-house-safety-nets');
  return <ServicePageTemplate service={service} onOpenQuoteModal={onOpenQuoteModal} />;
}
