export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-layout">
      <aside className="sidebar">Sidebar</aside>
      <main className="dashboard-content">
        {children}
      </main>
    </div>
  );
}