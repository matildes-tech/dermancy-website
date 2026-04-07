import type { Metadata } from 'next';
import { fontVariables } from '@/lib/fonts';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Admin | Dermancy Medical House',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="modern-professional" className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full bg-background text-foreground">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="w-64 bg-surface border-e border-border p-6 flex flex-col shrink-0 hidden md:flex">
            <div className="mb-8">
              <h1 className="font-heading font-bold text-xl text-foreground">Dermancy</h1>
              <p className="text-xs text-muted-foreground mt-1">Admin Dashboard</p>
            </div>
            <nav className="flex-1 space-y-1">
              {[
                { href: '/admin', label: 'Dashboard', icon: '📊' },
                { href: '/admin/appointments', label: 'Appointments', icon: '📅' },
                { href: '/admin/content', label: 'Content', icon: '📝' },
                { href: '/admin/analytics', label: 'Analytics', icon: '📈' },
                { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/20 transition-colors"
                >
                  <span>{item.icon}</span>
                  {item.label}
                </a>
              ))}
            </nav>
            <a href="/" className="text-xs text-muted-foreground hover:text-primary mt-4">
              &larr; Back to website
            </a>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6 md:p-10 overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
