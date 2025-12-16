import { motion } from 'motion/react';

interface OrbProps {
  isActive: boolean;
}

export function Orb({ isActive }: OrbProps) {
  return (
    <div className="flex items-center justify-center">
      <div
        className="orb-stage"
        style={{ perspective: '1000px' }}
      >
        {/* Concentric ripples */}
        <div className="orb-ripple" />
        <div className="orb-ripple" style={{ animationDelay: '1s' }} />
        <div className="orb-ripple" style={{ animationDelay: '2s' }} />
        <div className="orb-ripple" style={{ animationDelay: '3s' }} />

        {/* Tilted ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 40, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="orb-ring"
        />

        {/* Active state pulse ring */}
        {isActive && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ 
              scale: [0.95, 1.05, 0.95],
              opacity: [0.4, 0.6, 0.4]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="orb-active-pulse"
          />
        )}

        {/* Core orb - textured black circle */}
        <motion.div
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="orb-core"
          style={{
            background: `
              radial-gradient(circle at 30% 20%, rgba(255,255,255,0.12) 0%, rgba(0,0,0,0) 40%),
              radial-gradient(circle at 50% 50%, #2a2a2d 0%, #0a0a0b 100%)
            `,
            backgroundBlendMode: 'soft-light, normal',
          }}
        >
          {/* Subtle specular highlight */}
          <div className="absolute top-[18%] left-[26%] w-5 h-4 bg-white/10 rounded-full blur-[8px] transform -rotate-25" />
        </motion.div>

        {/* Status label */}
        <div className="orb-status">
          <span className="font-mono text-[9px] tracking-widest text-[#6B7280] uppercase">
            {isActive ? 'STATUS: LISTENING ///' : 'STATUS: READY ///'}
          </span>
        </div>
      </div>
    </div>
  );
}