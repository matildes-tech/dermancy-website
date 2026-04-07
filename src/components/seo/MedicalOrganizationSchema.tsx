import { CLINIC } from '@/lib/constants';
import { JsonLd } from './JsonLd';

export function MedicalOrganizationSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'MedicalOrganization',
        name: CLINIC.name,
        url: 'https://www.dermancy.com',
        logo: 'https://www.dermancy.com/images/logo.svg',
        description: CLINIC.tagline,
        address: {
          '@type': 'PostalAddress',
          streetAddress: CLINIC.address.street,
          addressLocality: CLINIC.address.city,
          postalCode: CLINIC.address.postalCode,
          addressCountry: CLINIC.address.countryCode,
        },
        telephone: CLINIC.phone.main,
        email: CLINIC.email,
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: CLINIC.hours.open,
          closes: CLINIC.hours.close,
        },
        sameAs: [CLINIC.social.instagramDoctor, CLINIC.social.instagramClinic],
        medicalSpecialty: 'Aesthetic Medicine',
        geo: {
          '@type': 'GeoCoordinates',
          latitude: CLINIC.coordinates.lat,
          longitude: CLINIC.coordinates.lng,
        },
      }}
    />
  );
}
