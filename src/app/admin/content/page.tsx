import { treatments } from '@/lib/treatments';
import { LOCALES, LOCALE_NAMES } from '@/lib/constants';

export default function ContentPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-foreground">Content Management</h1>
        <p className="text-sm text-muted-foreground mt-1">Edit treatment content and manage translations</p>
      </div>

      {/* Translation Status */}
      <div className="bg-surface border border-border rounded-xl p-6 mb-8">
        <h2 className="font-heading font-semibold text-lg text-foreground mb-4">Translation Status</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {LOCALES.map((locale) => (
            <div key={locale} className="flex items-center gap-3 p-3 rounded-lg border border-border">
              <div className={`w-3 h-3 rounded-full ${locale === 'en' ? 'bg-green-500' : 'bg-amber-500'}`} />
              <div>
                <p className="text-sm font-medium text-foreground">{LOCALE_NAMES[locale]}</p>
                <p className="text-xs text-muted-foreground">{locale === 'en' ? 'Complete' : 'In progress'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Treatment Content */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <h2 className="font-heading font-semibold text-lg text-foreground mb-4">Treatment Content</h2>
        <div className="space-y-3">
          {treatments.map((treatment) => {
            const Icon = treatment.icon;
            return (
              <div key={treatment.slug} className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground capitalize">{treatment.slug.replace('-', ' ')}</p>
                    <p className="text-xs text-muted-foreground">{treatment.category}</p>
                  </div>
                </div>
                <button className="text-sm text-primary hover:text-primary-hover font-medium cursor-pointer">
                  Edit
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
