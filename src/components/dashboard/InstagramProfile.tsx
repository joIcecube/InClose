import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Settings } from 'lucide-react';
import { useInstagramStore } from '../../store/instagramStore';

const InstagramProfile: React.FC = () => {
  const { stats } = useInstagramStore();

  if (!stats) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark-lighter/80 backdrop-blur-md p-6 rounded-xl border border-gray-800 mb-8"
    >
      <div className="flex items-center space-x-4">
        <div className="relative">
          <img
            src={stats.profilePicture}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover border-2 border-neon-green"
          />
          <div className="absolute -bottom-1 -right-1 bg-neon-green rounded-full p-1">
            <Instagram className="w-4 h-4 text-dark" />
          </div>
        </div>
        
        <div className="flex-grow">
          <h2 className="text-xl font-bold mb-1">{stats.username}</h2>
          <div className="flex space-x-4 text-sm text-gray-400">
            <span>{stats.posts.toLocaleString()} posts</span>
            <span>{stats.followers.toLocaleString()} followers</span>
            <span>{stats.following.toLocaleString()} following</span>
          </div>
        </div>
        
        <button className="p-2 text-gray-400 hover:text-white transition-colors">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};

export default InstagramProfile;