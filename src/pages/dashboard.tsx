import React, { useState, useEffect } from 'react';
import { UserButton } from '@clerk/clerk-react';
import { Users, Eye, TrendingUp, Activity, LayoutDashboard, Bot, ChevronRight, Settings, Bell, Search, Heart, MessageCircle } from 'lucide-react';
import BackgroundEffects from '../components/BackgroundEffects';
import Logo from '../components/layout/Logo';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import BotProcessing from '../components/BotProcessing';
import InstagramAuth from '../components/InstagramAuth';
import { useInstagramAuth } from '../store/authStore';
import { useInstagramStore } from '../store/instagramStore';
import StatCard from '../components/dashboard/StatCard';
import InstagramProfile from '../components/dashboard/InstagramProfile';

const Dashboard = () => {
  const [activeView, setActiveView] = useState<'dashboard' | 'bot'>('dashboard');
  const isAuthenticated = useInstagramAuth((state) => state.isAuthenticated);
  const { stats, fetchStats, isLoading } = useInstagramStore();
  
  useEffect(() => {
    if (isAuthenticated) {
      fetchStats();
    }
  }, [isAuthenticated, fetchStats]);

  const chartData = [
    { name: 'Lun', views: 4000, engagement: 2400 },
    { name: 'Mar', views: 3000, engagement: 2210 },
    { name: 'Mer', views: 5000, engagement: 2290 },
    { name: 'Jeu', views: 2780, engagement: 2000 },
    { name: 'Ven', views: 6890, engagement: 2181 },
    { name: 'Sam', views: 2390, engagement: 2500 },
    { name: 'Dim', views: 3490, engagement: 2100 },
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
                {isAuthenticated && stats ? (
                  <>
                    <InstagramProfile />
                    
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                      <StatCard
                        title="Abonnés"
                        value={stats.followers}
                        change="+12%"
                        icon={<Users className="w-6 h-6" />}
                        delay={0.1}
                      />
                      <StatCard
                        title="Amis proches"
                        value={stats.closeFriends}
                        change="+25%"
                        icon={<Heart className="w-6 h-6" />}
                        delay={0.2}
                      />
                      <StatCard
                        title="Vues Stories"
                        value={stats.storyReach}
                        change="+18%"
                        icon={<Eye className="w-6 h-6" />}
                        delay={0.3}
                      />
                      <StatCard
                        title="Engagement"
                        value={`${stats.engagementRate}%`}
                        change="+8%"
                        icon={<Activity className="w-6 h-6" />}
                        delay={0.4}
                        tooltip="Taux d'engagement moyen sur vos derniers posts"
                      />
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
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
                        transition={{ delay: 0.6 }}
                        className="bg-dark-lighter/80 backdrop-blur-md p-6 rounded-xl border border-gray-800 hover:border-neon-green transition-all duration-300"
                      >
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="text-xl font-bold">Engagement</h2>
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
                                <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
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
                                dataKey="engagement"
                                stroke="#00ff90"
                                strokeWidth={2}
                                fill="url(#colorEngagement)"
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </motion.div>
                    </div>
                  </>
                ) : (
                  <InstagramAuth />
                )}
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