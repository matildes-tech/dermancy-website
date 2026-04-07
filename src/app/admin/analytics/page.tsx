export default function AnalyticsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Website performance and booking analytics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface border border-border rounded-xl p-6">
          <h3 className="font-heading font-semibold text-foreground mb-4">Popular Treatments</h3>
          <div className="space-y-3">
            {[
              { name: 'Botox', pct: 35 },
              { name: 'Dermal Fillers', pct: 25 },
              { name: 'Mesotherapy', pct: 15 },
              { name: 'PRP', pct: 12 },
              { name: 'Skin Boosters', pct: 8 },
              { name: 'Other', pct: 5 },
            ].map((item) => (
              <div key={item.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground">{item.name}</span>
                  <span className="text-muted-foreground">{item.pct}%</span>
                </div>
                <div className="h-2 bg-muted/30 rounded-full">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6">
          <h3 className="font-heading font-semibold text-foreground mb-4">Visitor Languages</h3>
          <div className="space-y-3">
            {[
              { lang: 'English', pct: 40 },
              { lang: 'Greek', pct: 25 },
              { lang: 'German', pct: 15 },
              { lang: 'French', pct: 8 },
              { lang: 'Italian', pct: 7 },
              { lang: 'Other', pct: 5 },
            ].map((item) => (
              <div key={item.lang} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground">{item.lang}</span>
                  <span className="text-muted-foreground">{item.pct}%</span>
                </div>
                <div className="h-2 bg-muted/30 rounded-full">
                  <div
                    className="h-full bg-cta rounded-full transition-all"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6 md:col-span-2">
          <h3 className="font-heading font-semibold text-foreground mb-4">Booking Conversion</h3>
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg mb-2">Analytics Dashboard</p>
            <p className="text-sm">Connect Google Analytics or Plausible to see real-time data.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
