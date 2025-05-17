import React, { useState } from 'react';
import { UserButton } from '@clerk/clerk-react';
import { BarChart3, Users, Eye, TrendingUp, Activity, ArrowUp, LayoutDashboard, Bot, ChevronRight, Settings, Bell, Search } from 'lucide-react';
import BackgroundEffects from '../components/BackgroundEffects';
import Logo from '../components/layout/Logo';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import BotProcessing from '../components/BotProcessing';
import InstagramAuth from '../components/InstagramAuth';
import { useInstagramAuth } from '../store/authStore';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: 'up' | 'down';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, trend }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-dark-lighter/80 backdrop-blur-md p-6 rounded-xl border border-gray-800 hover:border-neon-green transition-all duration-300 group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-dark rounded-lg group-hover:bg-neon-green group-hover:text-dark transition-all duration-300">
          {icon}
        </div>
        <div className={`flex items-center ${trend === 'up' ? 'text-neon-green' : 'text-error'}`}>
          <ArrowUp className={`w-4 h-4 mr-1 ${trend === 'down' ? 'rotate-180' : ''}`} />
          <span className="text-sm font-medium">{change}</span>
        </div>
      </div>
      <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
      <p className="text-2xl font-bold group-hover:text-neon-green transition-colors duration-300">{value}</p>
    </motion.div>
  );
};

const Dashboard = () => {
  const [activeView, setActiveView] = useState<'dashboard' | 'bot'>('dashboard');
  const isAuthenticated = useInstagramAuth((state) => state.isAuthenticated);
  
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
    { name: 'Lun', views: 4000, followers: 2400 },
    { name: 'Mar', views: 3000, followers: 2210 },
    { name: 'Mer', views: 5000, followers: 2290 },
    { name: 'Jeu', views: 2780, followers: 2000 },
    { name: 'Ven', views: 6890, followers: 2181 },
    { name: 'Sam', views: 2390, followers: 2500 },
    { name: 'Dim', views: 3490, followers: 2100 },
  ];

  return (
    <div className="min-h-screen bg-dark flex">
      <BackgroundEffects />
      
      {/* Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-64 bg-dark-lighter/80 backdrop-blur-md border-r border-gray-800 p-6 relative z-10"
      >
        <div className="mb-12">
          <Logo />
        </div>
        
        <nav className="space-y-2">
          <motion.button
            whileHover={{ x: 4 }}
            onClick={() => setActiveView('dashboard')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
              activeView === 'dashboard' 
                ? 'bg-neon-green text-dark font-bold shadow-neon' 
                : 'text-gray-400 hover:bg-dark hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
            <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${
              activeView === 'dashboard' ? 'rotate-90' : ''
            }`} />
          </motion.button>
          
          <motion.button
            whileHover={{ x: 4 }}
            onClick={() => setActiveView('bot')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
              activeView === 'bot' 
                ? 'bg-neon-green text-dark font-bold shadow-neon' 
                : 'text-gray-400 hover:bg-dark hover:text-white'
            }`}
          >
            <Bot className="w-5 h-5" />
            <span>Bot Status</span>
            <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${
              activeView === 'bot' ? 'rotate-90' : ''
            }`} />
          </motion.button>
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold mb-2"
              >
                {activeView === 'dashboard' ? 'Dashboard' : 'Bot Status'}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-gray-400"
              >
                {activeView === 'dashboard' 
                  ? 'Bienvenue sur votre tableau de bord Inclose'
                  : 'Statut du bot et progression'}
              </motion.p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="bg-dark-lighter rounded-lg pl-10 pr-4 py-2 text-sm border border-gray-800 focus:border-neon-green focus:outline-none"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
              
              <button className="relative p-2 text-gray-400 hover:text-white">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-neon-green rounded-full"></span>
              </button>
              
              <button className="p-2 text-gray-400 hover:text-white">
                <Settings className="w-5 h-5" />
              </button>
              
              <UserButton />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeView === 'dashboard' ? (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <StatCard {...stat} />
                    </motion.div>
                  ))}
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-dark-lighter/80 backdrop-blur-md p-6 rounded-xl border border-gray-800 hover:border-neon-green transition-all duration-300"
                  >
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
                        <AreaChart data={chartData}>
                          <defs>
                            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#00ff90" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#00ff90" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
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
                          <Area
                            type="monotone"
                            dataKey="views"
                            stroke="#00ff90"
                            strokeWidth={2}
                            fill="url(#colorViews)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-dark-lighter/80 backdrop-blur-md p-6 rounded-xl border border-gray-800 hover:border-neon-green transition-all duration-300"
                  >
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
                        <AreaChart data={chartData}>
                          <defs>
                            <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#00ff90" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#00ff90" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
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
                          <Area
                            type="monotone"
                            dataKey="followers"
                            stroke="#00ff90"
                            strokeWidth={2}
                            fill="url(#colorFollowers)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="bot"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {isAuthenticated ? (
                  <BotProcessing onComplete={() => setActiveView('dashboard')} />
                ) : (
                  <InstagramAuth />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;