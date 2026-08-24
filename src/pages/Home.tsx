import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Luxury Hero */}
      <section className="relative h-screen flex items-center justify-center bg-cream overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ivory/80"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center px-4 md:px-6">
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-muted-gray uppercase tracking-[0.3em] text-xs md:text-sm mb-4 md:mb-6"
          >
            THE NEW SIGNATURE COLLECTION
          </motion.p>
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="text-5xl md:text-8xl font-serif text-espresso mb-6 md:mb-8 uppercase tracking-tight"
          >
            BEAUTY, REFINED.
          </motion.h1>
          <motion.h2 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="text-lg md:text-xl text-espresso/80 mb-8 md:mb-12 max-w-lg mx-auto font-light tracking-wide"
          >
            A curated ritual of luminous skincare, sculpted color and timeless beauty.
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center"
          >
            <a href="/shop" className="border border-espresso px-8 py-3 md:px-10 md:py-4 uppercase tracking-widest text-xs md:text-sm hover:bg-espresso hover:text-white transition-colors duration-500">
              Shop Collection
            </a>
            <a href="/about" className="border border-espresso px-8 py-3 md:px-10 md:py-4 uppercase tracking-widest text-xs md:text-sm hover:bg-espresso hover:text-white transition-colors duration-500">
              Discover Ritual
            </a>
          </motion.div>
        </div>
      </section>
      
      {/* Editorial Split (To be implemented in next step) */}
    </div>
  );
}
