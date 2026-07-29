import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Send, Check } from 'lucide-react';

const contactInfo = [
  {
    id: 1,
    icon: Mail,
    label: "Email",
    value: "niharranjanbiswal22@gmail.com",
    href: "mailto:niharranjanbiswal22@gmail.com",
    color: "text-cyber-blue border-cyber-blue/20"
  },
  {
    id: 2,
    icon: Phone,
    label: "Phone",
    value: "+91 9556637112",
    href: "tel:+919556637112",
    color: "text-cyber-cyan border-cyber-cyan/20"
  },
  {
    id: 3,
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/nihar-biswal95566n",
    href: "https://www.linkedin.com/in/nihar-biswal95566n",
    color: "text-cyber-violet border-cyber-violet/20"
  },
  {
    id: 4,
    icon: MapPin,
    label: "Location",
    value: "Bhubaneswar, Odisha, India",
    href: "https://maps.google.com/?q=Bhubaneswar,Odisha,India",
    color: "text-pink-500 border-pink-500/20"
  }
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setSending(true);
    setSent(false);
    setError(null);

    try {
      const response = await fetch("https://formspree.io/f/xgoqzlve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message
        })
      });

      if (response.ok) {
        setSent(true);
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setSent(false), 5000);
      } else {
        setError("Failed to deliver secure payload. Please try again or email directly.");
        setTimeout(() => setError(null), 6000);
      }
    } catch (err) {
      console.error(err);
      setError("Network handshake timeout. Please check connection or contact via LinkedIn.");
      setTimeout(() => setError(null), 6000);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 md:px-8 border-t border-white/5 bg-cyber-bg relative">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Title */}
        <div className="text-center mb-16 space-y-2">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-white uppercase"
          >
            Get In <span className="gradient-text">Touch</span>
          </motion.h2>
          <div className="glow-line mx-auto w-24" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-left mb-6">
              <h3 className="text-2xl font-bold text-white tracking-wide">
                Let's Build Something Great Together
              </h3>
              <p className="text-sm text-gray-400 mt-2">
                Have an inquiry or project proposal? Send a message directly or connect via my secure channels.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <a
                    key={info.id}
                    href={info.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="interactive-card glass-panel rounded-2xl p-5 flex flex-col gap-3 border border-white/5 transition-all duration-300 hover:shadow-md cursor-pointer text-left"
                  >
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center bg-white/5 border ${info.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">{info.label}</div>
                      <div className="text-sm text-gray-300 font-semibold truncate mt-0.5">{info.value}</div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Column: Secure Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="glass-panel rounded-3xl p-6 md:p-8 border border-white/10 shadow-xl space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="flex flex-col gap-2 text-left">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyber-cyan transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2 text-left">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                    className="bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyber-cyan transition-colors"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2 text-left">
                <label className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Message</label>
                <textarea
                  required
                  rows="4"
                  placeholder="Describe your project or role details..."
                  value={form.message}
                  onChange={(e) => setForm(prev => ({ ...prev, message: e.target.value }))}
                  className="bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyber-cyan transition-colors resize-none"
                />
              </div>

              {/* Notification states */}
              {sent && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-xs font-semibold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3"
                >
                  <Check className="h-4 w-4" />
                  Message sent successfully! I will reach out to you shortly.
                </motion.div>
              )}

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-xs font-semibold text-red-500 bg-red-500/10 border border-red-500/20 rounded-xl p-3"
                >
                  <span className="shrink-0">⚠️</span>
                  <span>{error}</span>
                </motion.div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={sending}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyber-blue via-cyber-violet to-cyber-cyan text-sm font-bold uppercase tracking-wider text-white shadow-glow-violet hover:brightness-110 active:scale-98 disabled:opacity-50 disabled:scale-100 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {sending ? 'Encrypting & Delivering...' : (
                  <>
                    <Send className="h-4.5 w-4.5" />
                    Transmit Secure Message
                  </>
                )}
              </button>

            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
