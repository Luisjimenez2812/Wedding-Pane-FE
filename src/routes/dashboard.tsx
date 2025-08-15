import { createFileRoute, Link } from '@tanstack/react-router';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
});

function DashboardPage() {
  // Datos para los gráficos
  const statusData = [
    { name: 'Confirmados', value: 89, color: '#4ade80' },
    { name: 'Pendientes', value: 61, color: '#fbbf24' },
    { name: 'Declinados', value: 12, color: '#f87171' },
  ];

  const weeklyData = [
    { week: 'Semana 1', confirmados: 15, pendientes: 25, declinados: 3 },
    { week: 'Semana 2', confirmados: 28, pendientes: 18, declinados: 5 },
    { week: 'Semana 3', confirmados: 35, pendientes: 12, declinados: 2 },
    { week: 'Semana 4', confirmados: 11, pendientes: 6, declinados: 2 },
  ];

  const monthlyTrend = [
    { month: 'Ene', invitaciones: 45, confirmaciones: 12 },
    { month: 'Feb', invitaciones: 78, confirmaciones: 34 },
    { month: 'Mar', invitaciones: 120, confirmaciones: 67 },
    { month: 'Abr', invitaciones: 150, confirmaciones: 89 },
  ];

  const recentActivity = [
    {
      id: 1,
      time: 'Hace 2 horas',
      text: 'Ana García confirmó asistencia para 3 personas',
      type: 'confirm',
      icon: '✅',
    },
    {
      id: 2,
      time: 'Hace 4 horas',
      text: 'Carlos López declinó la invitación',
      type: 'decline',
      icon: '❌',
    },
    {
      id: 3,
      time: 'Ayer',
      text: 'Se enviaron 25 nuevas invitaciones',
      type: 'send',
      icon: '📧',
    },
    {
      id: 4,
      time: 'Hace 2 días',
      text: 'María Rodríguez confirmó asistencia para 2 personas',
      type: 'confirm',
      icon: '✅',
    },
  ];

  return (
    <div className='dashboard-page'>
      {/* Navbar Superior */}
      <nav className='dashboard-navbar'>
        <div className='navbar-container'>
          <div className='navbar-brand'>
            <div className='brand-icon'>👰🤵</div>
            <div className='brand-text'>
              <h2>Luis & Rosa</h2>
              <span>Panel de Administración</span>
            </div>
          </div>

          <div className='navbar-links'>
            <Link to='/' className='nav-link'>
              <span className='link-icon'>🏠</span>
              <span className='link-text'>Inicio</span>
            </Link>
            <Link to='/dashboard' className='nav-link active'>
              <span className='link-icon'>📊</span>
              <span className='link-text'>Dashboard</span>
            </Link>
            <Link to='/guests' className='nav-link'>
              <span className='link-icon'>👥</span>
              <span className='link-text'>Invitados</span>
            </Link>
            <Link to='/login' className='nav-link logout'>
              <span className='link-icon'>🚪</span>
              <span className='link-text'>Cerrar Sesión</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Contenido Principal */}
      <div className='dashboard-content'>
        <div className='dashboard-header'>
          <div className='header-content'>
            <h1>Dashboard</h1>
            <p>Resumen completo de tu boda</p>
          </div>
          <div className='header-stats'>
            <div className='quick-stat'>
              <div className='stat-icon'>📊</div>
              <div className='stat-info'>
                <span className='stat-number'>162</span>
                <span className='stat-label'>Total Invitados</span>
              </div>
            </div>
            <div className='quick-stat'>
              <div className='stat-icon'>✅</div>
              <div className='stat-info'>
                <span className='stat-number'>89</span>
                <span className='stat-label'>Confirmados</span>
              </div>
            </div>
            <div className='quick-stat'>
              <div className='stat-icon'>⏳</div>
              <div className='stat-info'>
                <span className='stat-number'>61</span>
                <span className='stat-label'>Pendientes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Gráficos y Estadísticas */}
        <div className='dashboard-grid'>
          {/* Gráfico de Estado de Invitaciones */}
          <div className='chart-card'>
            <div className='card-header'>
              <h3>Estado de Invitaciones</h3>
              <div className='card-icon'>📈</div>
            </div>
            <div className='chart-container'>
              <ResponsiveContainer width='100%' height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx='50%'
                    cy='50%'
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey='value'
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [
                      `${value} invitados`,
                      name,
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className='chart-legend'>
                {statusData.map((item, index) => (
                  <div key={index} className='legend-item'>
                    <div
                      className='legend-color'
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className='legend-text'>
                      {item.name}: {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Gráfico de Tendencias Semanales */}
          <div className='chart-card'>
            <div className='card-header'>
              <h3>Tendencias Semanales</h3>
              <div className='card-icon'>📊</div>
            </div>
            <div className='chart-container'>
              <ResponsiveContainer width='100%' height={300}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='week' />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey='confirmados' fill='#4ade80' name='Confirmados' />
                  <Bar dataKey='pendientes' fill='#fbbf24' name='Pendientes' />
                  <Bar dataKey='declinados' fill='#f87171' name='Declinados' />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gráfico de Tendencias Mensuales */}
          <div className='chart-card'>
            <div className='card-header'>
              <h3>Progreso Mensual</h3>
              <div className='card-icon'>📈</div>
            </div>
            <div className='chart-container'>
              <ResponsiveContainer width='100%' height={300}>
                <LineChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='month' />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type='monotone'
                    dataKey='invitaciones'
                    stroke='#a67c52'
                    strokeWidth={3}
                    name='Invitaciones Enviadas'
                  />
                  <Line
                    type='monotone'
                    dataKey='confirmaciones'
                    stroke='#4ade80'
                    strokeWidth={3}
                    name='Confirmaciones'
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Actividad Reciente */}
          <div className='activity-card'>
            <div className='card-header'>
              <h3>Actividad Reciente</h3>
              <div className='card-icon'>🕒</div>
            </div>
            <div className='activity-list'>
              {recentActivity.map(activity => (
                <div key={activity.id} className='activity-item'>
                  <div className='activity-icon'>{activity.icon}</div>
                  <div className='activity-content'>
                    <p className='activity-text'>{activity.text}</p>
                    <span className='activity-time'>{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
