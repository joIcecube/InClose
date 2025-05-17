import React, { useState } from 'react';
import { UserButton } from '@clerk/clerk-react';
import { BarChart3, Users, Eye, TrendingUp, Activity, ArrowUp, LayoutDashboard, Bot, ChevronRight } from 'lucide-react';
import BackgroundEffects from '../components/BackgroundEffects';
import Logo from '../components/layout/Logo';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: 'up' | 'down';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, trend }) => {
  return (
    <div className="bg-dark-lighter/80 backdrop-blur-md p-6 rounded-xl border border-gray-800 hover:border-neon-green transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-dark rounded-lg group-hover:shadow-neon transition-all duration-300">
          {icon}
        </div>
        <div className={`flex items-center ${trend === 'up' ? 'text-neon-green' : 'text-error'}`}>
          <ArrowUp className={`w-4 h-4 mr-1 ${trend === 'down' ? 'rotate-180' : ''}`} />
          <span className="text-sm">{change}</span>
        </div>
      </div>
      <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
      <p className="text-2xl font-bold group-hover:text-neon-green transition-colors duration-300">{value}</p>
    </div>
  );
};

const BotProcessing = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
        className="w-24 h-24 bg-neon-green rounded-full opacity-20 absolute"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
        className="w-16 h-16 bg-neon-green rounded-full opacity-40 absolute"
      />
      <Bot className="w-12 h-12 text-neon-green relative z-10" />
      <h2 className="text-2xl font-bold mt-8 mb-4">Bot en cours d'exécution</h2>
      <p className="text-gray-400 text-center">
        Le bot ajoute progressivement vos abonnés à votre liste d'amis proches
      </p>
      <div className="mt-8 w-64 h-2 bg-dark-lighter rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-neon-green"
          animate={{
            width: ["0%", "100%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [activeView, setActiveView] = useState<'dashboard' | 'bot'>('dashboard');
  
  // Mock data
  const stats = [
    {
      title: "Vues Stories",
      value: "12.5K",
      change: "+25%",
      icon: <Eye className="w-6 h-6 text-neon-green" />,
      trend: 'up' as const
    },
    {
      title: "Abonnés",
      value: "8,234",
      change: "+12%",
      icon: <Users className="w-6 h-6 text-neon-green" />,
      trend: 'up' as const
    },
    {
      title: "Engagement",
      value: "4.8%",
      change: "+8%",
      icon: <Activity className="w-6 h-6 text-neon-green" />,
      trend: 'up' as const
    },
    {
      title: "Croissance",
      value: "+1.2K",
      change: "+15%",
      icon: <TrendingUp className="w-6 h-6 text-neon-green" />,
      trend: 'up' as const
    }
  ];

  const chartData = [
    { name: 'Lun', views: 4000 },
    { name: 'Mar', views: 3000 },
    { name: 'Mer', views: 5000 },
    { name: 'Jeu', views: 2780 },
    { name: 'Ven', views: 6890 },
    { name: 'Sam', views: 2390 },
    { name: 'Dim', views: 3490 },
  ];

  return (
    <div className="min-h-screen bg-dark flex">
      <BackgroundEffects />
      
      {/* Sidebar */}
      <div className="w-64 bg-dark-lighter/80 backdrop-blur-md border-r border-gray-800 p-6 relative z-10">
        <div className="mb-12">
          <Logo />
        </div>
        
        <nav className="space-y-2">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
              activeView === 'dashboard' 
                ? 'bg-neon-green text-dark font-bold' 
                : 'text-gray-400 hover:bg-dark hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
            <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${
              activeView === 'dashboard' ? 'rotate-90' : ''
            }`} />
          </button>
          
          <button
            onClick={() => setActiveView('bot')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
              activeView === 'bot' 
                ? 'bg-neon-green text-dark font-bold' 
                : 'text-gray-400 hover:bg-dark hover:text-white'
            }`}
          >
            <Bot className="w-5 h-5" />
            <span>Bot Status</span>
            <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${
              activeView === 'bot' ? 'rotate-90' : ''
            }`} />
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative z-10">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {activeView === 'dashboard' ? 'Dashboard' : 'Bot Status'}
              </h1>
              <p className="text-gray-400">
                {activeView === 'dashboard' 
                  ? 'Bienvenue sur votre tableau de bord Inclose'
                  : 'Statut du bot et progression'}
              </p>
            </div>
            <UserButton />
          </div>

          {activeView === 'dashboard' ? (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <StatCard key={index} {...stat} />
                ))}
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-dark-lighter/80 backdrop-blur-md p-6 rounded-xl border border-gray-800 hover:border-neon-green transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Vues Stories</h2>
                    <select className="bg-dark text-gray-400 border border-gray-800 rounded-lg px-3 py-2 focus:border-neon-green focus:outline-none">
                      <option>7 derniers jours</option>
                      <option>30 derniers jours</option>
                      <option>3 derniers mois</option>
                    </select>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="name" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#111827',
                            border: '1px solid #374151',
                            borderRadius: '0.5rem'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="views" 
                          stroke="#00ff90" 
                          strokeWidth={2}
                          dot={{ fill: '#00ff90' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-dark-lighter/80 backdrop-blur-md p-6 rounded-xl border border-gray-800 hover:border-neon-green transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Croissance Abonnés</h2>
                    <select className="bg-dark text-gray-400 border border-gray-800 rounded-lg px-3 py-2 focus:border-neon-green focus:outline-none">
                      <option>7 derniers jours</option>
                      <option>30 derniers jours</option>
                      <option>3 derniers mois</option>
                    </select>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="name" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#111827',
                            border: '1px solid #374151',
                            borderRadius: '0.5rem'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="views" 
                          stroke="#00ff90" 
                          strokeWidth={2}
                          dot={{ fill: '#00ff90' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <BotProcessing />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;