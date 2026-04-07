import { CalendarDays, Users, TrendingUp, Clock } from 'lucide-react';

const stats = [
  { label: "Today's Appointments", value: '4', change: '+2 from yesterday', icon: CalendarDays, color: 'bg-blue-500/10 text-blue-500' },
  { label: 'This Week', value: '18', change: '85% capacity', icon: TrendingUp, color: 'bg-green-500/10 text-green-500' },
  { label: 'Total Patients', value: '142', change: '+12 this month', icon: Users, color: 'bg-purple-500/10 text-purple-500' },
  { label: 'Avg. Wait Time', value: '5 min', change: 'On schedule', icon: Clock, color: 'bg-amber-500/10 text-amber-500' },
];

const recentAppointments = [
  { name: 'Maria K.', treatment: 'Botox', date: 'Today, 11:00', status: 'Confirmed' },
  { name: 'Elena P.', treatment: 'Dermal Fillers', date: 'Today, 12:30', status: 'Pending' },
  { name: 'Nikos S.', treatment: 'PRP Scalp', date: 'Today, 14:00', status: 'Confirmed' },
  { name: 'Anna M.', treatment: 'Mesotherapy', date: 'Today, 15:30', status: 'Confirmed' },
  { name: 'Dimitris L.', treatment: 'Skin Boosters', date: 'Tomorrow, 10:30', status: 'Pending' },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Welcome back, Dr. Michalakis</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-surface border border-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-4.5 h-4.5" />
                </div>
              </div>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Appointments */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <h2 className="font-heading font-semibold text-lg text-foreground mb-4">Recent Appointments</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-start py-3 font-medium">Patient</th>
                <th className="text-start py-3 font-medium">Treatment</th>
                <th className="text-start py-3 font-medium">Date & Time</th>
                <th className="text-start py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentAppointments.map((apt, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td className="py-3 text-foreground font-medium">{apt.name}</td>
                  <td className="py-3 text-muted-foreground">{apt.treatment}</td>
                  <td className="py-3 text-muted-foreground">{apt.date}</td>
                  <td className="py-3">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        apt.status === 'Confirmed'
                          ? 'bg-green-500/10 text-green-600'
                          : 'bg-amber-500/10 text-amber-600'
                      }`}
                    >
                      {apt.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
