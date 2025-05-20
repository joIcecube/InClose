import React, { useState, useEffect } from 'react';
import { Bot, CheckCircle2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInstagramAuth } from '../store/authStore';

interface BotProcessingProps {
  onComplete?: () => void;
}

const BotProcessing: React.FC<BotProcessingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const sessionToken = useInstagramAuth((state) => state.sessionToken);
  
  const steps = [
    { title: 'Connexion à Instagram', description: 'Établissement d\'une connexion sécurisée' },
    { title: 'Collecte des abonnés', description: 'Récupération de la liste des abonnés' },
    { title: 'Analyse des données', description: 'Traitement des informations' },
    { title: 'Finalisation', description: 'Enregistrement des données' }
  ];

  const [activityLogs, setActivityLogs] = useState<string[]>([]);
  
  useEffect(() => {
    if (!sessionToken) return;

    const logs = [
      'Initialisation du bot...',
      'Connexion à l\'API Instagram...',
      'Récupération des abonnés...',
      'Analyse des profils...',
      'Traitement des données...',
      'Mise à jour de la base de données...'
    ];
    
    const addLog = (index: number) => {
      if (index < logs.length) {
        setActivityLogs(prev => [...prev, logs[index]]);
        setTimeout(() => addLog(index + 1), 2500);
      }
    };
    
    addLog(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          if (onComplete) onComplete();
          return 100;
        }
        return prev + 1;
      });
    }, 300);
    
    return () => clearInterval(interval);
  }, [sessionToken, onComplete]);
  
  useEffect(() => {
    if (progress >= 25 && currentStep === 0) setCurrentStep(1);
    if (progress >= 50 && currentStep === 1) setCurrentStep(2);
    if (progress >= 75 && currentStep === 2) setCurrentStep(3);
  }, [progress]);

  return (
    <div className="flex flex-col items-center justify-center p-8 max-w-4xl mx-auto">
      {/* Animated Bot Icon */}
      <div className="relative mb-12">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-32 h-32 bg-neon-green rounded-full opacity-20 absolute -inset-4"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-24 h-24 bg-neon-green rounded-full opacity-30 absolute -inset-1"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative z-10 bg-dark p-4 rounded-full border-2 border-neon-green shadow-neon"
        >
          <Bot className="w-16 h-16 text-neon-green" />
        </motion.div>
      </div>

      {/* Progress Steps */}
      <div className="w-full mb-12">
        <div className="flex justify-between mb-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col items-center relative flex-1"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-all duration-300 ${
                currentStep > index 
                  ? 'bg-neon-green text-dark'
                  : currentStep === index
                  ? 'bg-dark border-2 border-neon-green text-neon-green'
                  : 'bg-dark-lighter text-gray-500'
              }`}>
                {currentStep > index ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : currentStep === index ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <div className="w-3 h-3 rounded-full bg-current" />
                )}
              </div>
              <h3 className="text-sm font-medium text-center">{step.title}</h3>
              <p className="text-xs text-gray-400 text-center mt-1">{step.description}</p>
              {index < steps.length - 1 && (
                <div className={`absolute top-5 left-1/2 w-full h-0.5 transition-all duration-300 ${
                  currentStep > index ? 'bg-neon-green' : 'bg-gray-700'
                }`} />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-400">Progression totale</span>
          <span className="text-sm font-medium text-neon-green">{progress}%</span>
        </div>
        <div className="h-2 bg-dark-lighter rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-neon-green to-neon-dark"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Activity Log */}
      <div className="w-full bg-dark-lighter/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800">
        <h3 className="text-sm font-medium mb-3">Activité en cours</h3>
        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {activityLogs.map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="text-sm text-gray-400"
              >
                {log}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default BotProcessing;