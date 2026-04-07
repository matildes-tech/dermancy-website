import { DOCTOR, CLINIC } from '@/lib/constants';
import { JsonLd } from './JsonLd';

export function PhysicianSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Physician',
        name: DOCTOR.name,
        description: DOCTOR.bio,
        medicalSpecialty: 'Aesthetic Medicine',
        worksFor: {
          '@type': 'MedicalOrganization',
          name: CLINIC.name,
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: CLINIC.address.street,
          addressLocality: CLINIC.address.city,
          postalCode: CLINIC.address.postalCode,
          addressCountry: CLINIC.address.countryCode,
        },
      }}
    />
  );
}
