export default function AppointmentsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-foreground">Appointments</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage patient appointments and schedules</p>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            {['All', 'Confirmed', 'Pending', 'Cancelled'].map((filter) => (
              <button
                key={filter}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  filter === 'All' ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-muted/20'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <button className="px-4 py-2 bg-cta text-white rounded-lg text-sm font-medium hover:bg-cta-hover transition-colors cursor-pointer">
            + New Appointment
          </button>
        </div>

        <div className="text-center py-20 text-muted-foreground">
          <p className="text-lg mb-2">Appointment management system</p>
          <p className="text-sm">Connect to a database to see real appointment data here.</p>
        </div>
      </div>
    </div>
  );
}
