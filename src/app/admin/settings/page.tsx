import { CLINIC } from '@/lib/constants';

export default function SettingsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage clinic settings and integrations</p>
      </div>

      <div className="space-y-8">
        {/* Business Info */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <h2 className="font-heading font-semibold text-lg text-foreground mb-4">Business Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Clinic Name', value: CLINIC.name },
              { label: 'Email', value: CLINIC.email },
              { label: 'Phone', value: CLINIC.phone.main },
              { label: 'Mobile', value: CLINIC.phone.mobile },
              { label: 'Address', value: `${CLINIC.address.street}, ${CLINIC.address.city}` },
              { label: 'Hours', value: `${CLINIC.hours.days}, ${CLINIC.hours.open} - ${CLINIC.hours.close}` },
            ].map((item) => (
              <div key={item.label} className="space-y-1">
                <label className="text-sm font-medium text-muted-foreground">{item.label}</label>
                <input
                  type="text"
                  defaultValue={item.value}
                  className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground"
                  readOnly
                />
              </div>
            ))}
          </div>
        </div>

        {/* Theme Selection */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <h2 className="font-heading font-semibold text-lg text-foreground mb-4">Active Website Theme</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { name: 'Clean Minimal', active: true },
              { name: 'Dark Aesthetic', active: false },
              { name: 'Modern Professional', active: false },
            ].map((theme) => (
              <div
                key={theme.name}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                  theme.active ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'
                }`}
              >
                <p className="text-sm font-medium text-foreground">{theme.name}</p>
                {theme.active && <p className="text-xs text-primary mt-1">Currently active</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Integrations */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <h2 className="font-heading font-semibold text-lg text-foreground mb-4">Integrations</h2>
          <div className="space-y-4">
            {[
              { name: 'WhatsApp Business', status: 'Connected', color: 'bg-green-500' },
              { name: 'AI Chatbot', status: 'Active (Rule-based)', color: 'bg-green-500' },
              { name: 'Google Analytics', status: 'Not connected', color: 'bg-gray-400' },
              { name: 'Email Notifications', status: 'Not configured', color: 'bg-gray-400' },
            ].map((integration) => (
              <div key={integration.name} className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${integration.color}`} />
                  <span className="text-sm text-foreground">{integration.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">{integration.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
