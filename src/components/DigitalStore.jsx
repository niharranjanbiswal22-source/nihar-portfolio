import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, Sparkles, CheckCircle2, ArrowRight, Zap, 
  Download, Lock, ShieldCheck, Tag, ExternalLink, IndianRupee
} from 'lucide-react';
import { productCategories } from '../data/productsData';

export default function DigitalStore({ onBuyProduct }) {
  const [activeCategoryTab, setActiveCategoryTab] = useState('all');

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'notes', name: 'Notes (₹1 Each)' },
    { id: 'source-codes', name: 'Source Codes (₹10 - ₹499)' },
    { id: 'deployments', name: 'Deployments (₹2k - ₹10k)' }
  ];

  const filteredCategories = activeCategoryTab === 'all'
    ? productCategories
    : productCategories.filter(cat => cat.id === activeCategoryTab);

  return (
    <section id="digital-store" className="py-24 relative overflow-hidden bg-black/40 border-t border-white/5">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-cyber-cyan/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 text-xs font-mono font-bold tracking-widest uppercase">
            <ShoppingBag className="h-3.5 w-3.5 text-yellow-400" />
            <span>Official Developer Store & Digital Assets</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Premium <span className="gradient-text">Products & Code Vault</span>
          </h2>

          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            Get instant access to curated developer notes, production-grade website & mobile app source codes, and end-to-end cloud & app store deployment services.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategoryTab(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                  activeCategoryTab === cat.id
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-white shadow-[0_0_15px_rgba(234,179,8,0.4)] scale-105 font-black'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Categories & Products */}
        <div className="space-y-16">
          {filteredCategories.map((cat) => (
            <div key={cat.id} className="space-y-6">
              
              {/* Category Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide">
                      {cat.title}
                    </h3>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400">
                      {cat.priceLabel}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">{cat.tagline}</p>
                </div>
              </div>

              {/* Product Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.items.map((prod, pIdx) => {
                  const Icon = prod.icon;
                  return (
                    <motion.div
                      key={prod.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: pIdx * 0.05 }}
                      className="group relative rounded-3xl p-6 bg-slate-950/70 border border-white/10 hover:border-amber-500/40 hover:shadow-[0_0_25px_rgba(245,158,11,0.2)] backdrop-blur-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
                    >
                      {/* Top Corner Glow on hover */}
                      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${prod.color} opacity-0 group-hover:opacity-15 transition-opacity duration-500 rounded-full blur-2xl pointer-events-none`} />

                      <div className="space-y-4">
                        {/* Header: Genuine Brand Logo + Badge + Price */}
                        <div className="flex items-start justify-between">
                          <div className="h-14 w-14 rounded-2xl bg-white/[0.06] border border-white/10 p-2.5 flex items-center justify-center shadow-inner group-hover:border-amber-400/50 group-hover:scale-108 group-hover:bg-white/[0.1] transition-all duration-300 shrink-0 relative overflow-hidden">
                            {prod.logoSrc ? (
                              <img 
                                src={prod.logoSrc} 
                                alt={prod.shortName} 
                                className="h-full w-full object-contain filter drop-shadow group-hover:drop-shadow-[0_0_12px_rgba(245,158,11,0.5)] group-hover:scale-110 transition-all duration-300"
                                loading="lazy"
                              />
                            ) : (
                              <Icon className="h-7 w-7 text-amber-400" />
                            )}
                          </div>

                          <div className="text-right">
                            <span className="text-xl md:text-2xl font-black text-amber-400 font-mono tracking-tight text-glow-amber">
                              ₹{prod.price.toLocaleString('en-IN')}
                            </span>
                            <div className="text-[9px] font-mono text-gray-500 uppercase">Instant Release</div>
                          </div>
                        </div>

                        {/* Title & Tag */}
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300">
                              {prod.badge}
                            </span>
                          </div>
                          <h4 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors uppercase tracking-wide leading-snug">
                            {prod.title}
                          </h4>
                          <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                            {prod.description}
                          </p>
                        </div>

                        {/* Official Tech Stack Badges */}
                        {prod.techLogos && prod.techLogos.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1.5 pt-1">
                            {prod.techLogos.map((tech, tIdx) => (
                              <div 
                                key={tIdx} 
                                className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/[0.04] border border-white/10 hover:border-amber-400/30 hover:bg-white/[0.08] transition-all group/tech"
                                title={tech.name}
                              >
                                <img 
                                  src={tech.src} 
                                  alt={tech.name} 
                                  className="h-3.5 w-3.5 object-contain filter drop-shadow" 
                                  loading="lazy"
                                />
                                <span className="text-[10px] font-mono text-gray-300 group-hover/tech:text-white transition-colors">
                                  {tech.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Deliverable Box */}
                        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-[11px] text-gray-300 flex items-start gap-2">
                          <Download className="h-3.5 w-3.5 text-cyber-cyan shrink-0 mt-0.5" />
                          <span className="leading-tight">{prod.deliverable}</span>
                        </div>

                        {/* Features Checklist */}
                        <div className="space-y-1.5 pt-1">
                          {prod.features.map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-center gap-2 text-[11px] text-gray-400">
                              <CheckCircle2 className="h-3 w-3 text-amber-400 shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Buy Now Action Button */}
                      <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between gap-3">
                        <div className="text-[10px] font-mono text-gray-500">
                          {prod.category}
                        </div>

                        <button
                          onClick={() => onBuyProduct(prod)}
                          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-xs font-black uppercase tracking-wider shadow-[0_0_15px_rgba(234,179,8,0.3)] hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <Zap className="h-3.5 w-3.5 text-white" />
                          <span className="text-white font-bold">Buy Now (₹{prod.price})</span>
                        </button>
                      </div>

                    </motion.div>
                  );
                })}
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Trust & Security Banner */}
        <div className="mt-16 rounded-3xl p-6 md:p-8 bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/20 flex items-center justify-center text-cyber-cyan shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Razorpay 256-bit Encrypted Checkout</div>
              <p className="text-xs text-gray-400">Instant digital code release & verified payment invoice upon completion.</p>
            </div>
          </div>
          <div className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
            UPI • Cards • NetBanking • Scan & Pay
          </div>
        </div>

      </div>
    </section>
  );
}
