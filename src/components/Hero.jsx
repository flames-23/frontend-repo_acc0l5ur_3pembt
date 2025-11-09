import { motion, AnimatePresence } from 'framer-motion';
import Spline from '@splinetool/react-spline';

function Hero() {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/IKzHtP5ThSO83edK/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-neutral-950 pointer-events-none" />

      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="max-w-3xl text-center">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs text-white/80 backdrop-blur"
            >
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              Splitwise-style fairness, your way.
            </motion.div>
          </AnimatePresence>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl"
          >
            Settle group expenses with clarity
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl text-white/70"
          >
            Add friends, log shared costs, and instantly see the minimal set of payments to make everyone square.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 flex items-center justify-center gap-3"
          >
            <LogoBadge />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function LogoBadge() {
  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      className="group inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 backdrop-blur"
    >
      <motion.div
        initial={{ rotate: -10 }}
        animate={{ rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 text-black shadow-lg shadow-emerald-500/20"
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 250, damping: 14 }}
          className="text-lg font-extrabold"
        >
          ƒ
        </motion.span>
      </motion.div>
      <div>
        <p className="text-sm font-medium">FluxSplit</p>
        <p className="text-xs text-white/60">Minimal. Fair. Fast.</p>
      </div>
    </motion.div>
  );
}

export default Hero;
