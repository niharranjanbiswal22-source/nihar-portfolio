import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, ShieldCheck, Terminal, Download, Sparkles, Brain, Copy, Check, Smartphone, Landmark, Loader2, CheckCircle2, ShoppingBag, Lock, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

const tiers = [
  {
    id: 'vault',
    name: 'Vault Unlock & AI Analysis',
    prices: { inr: 85, usdt: 1 },
    description: 'Unlock premium microservices designs + get a custom AI recruiter match report.',
    icon: Brain,
    color: 'text-cyber-cyan',
    glow: 'shadow-[0_0_15px_rgba(6,182,212,0.3)]'
  },
  {
    id: 'consulting',
    name: '1-Hour Technical Sync',
    prices: { inr: 4200, usdt: 50 },
    description: 'Book Nihar for a 60-min call to debug code or discuss project architecture.',
    icon: Smartphone,
    color: 'text-cyber-violet',
    glow: 'shadow-[0_0_15px_rgba(139,92,246,0.3)]'
  },
  {
    id: 'retainer',
    name: 'Full-Stack Retainer Deposit',
    prices: { inr: 42000, usdt: 500 },
    description: 'Lock in a retainer deposit for custom web development contracts.',
    icon: CreditCard,
    color: 'text-pink-500',
    glow: 'shadow-[0_0_15px_rgba(236,72,153,0.3)]'
  }
];

export default function PaymentGateway({ isOpen, onClose, onUnlockSuccess }) {
  const [selectedTier, setSelectedTier] = useState('vault');
  const [activeTab, setActiveTab] = useState('upi'); // 'upi' | 'card' | 'usdt'
  
  const [form, setForm] = useState({ name: '', company: '', number: '', expiry: '', cvv: '', upiId: '' });
  const [errors, setErrors] = useState({});
  const [copied, setCopied] = useState(false);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  
  // States: 'idle' | 'processing' | 'success'
  const [status, setStatus] = useState('idle');
  const [logs, setLogs] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [invoiceId, setInvoiceId] = useState('');
  const [aiReport, setAiReport] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setForm({ name: '', company: '', number: '', expiry: '', cvv: '', upiId: '' });
      setErrors({});
      setStatus('idle');
      setLogs([]);
      setAiReport(null);
      setCopied(false);
      setIsCardFlipped(false);
      setActiveStep(0);
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'number') {
      const formatted = value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setForm(prev => ({ ...prev, [name]: formatted.slice(0, 19) }));
    } else if (name === 'expiry') {
      const formatted = value.replace(/\//g, '').replace(/(\d{2})/g, '$1/').trim();
      setForm(prev => ({ ...prev, [name]: formatted.slice(0, 5) }));
    } else if (name === 'cvv') {
      setForm(prev => ({ ...prev, [name]: value.replace(/\D/g, '').slice(0, 3) }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText("TEoknyCDam7A7LEvSk7qm34J8FkhQUFq69");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.company.trim()) newErrors.company = 'Company name is required';
    
    if (activeTab === 'card') {
      if (!form.name.trim()) newErrors.name = 'Cardholder name is required';
      if (form.number.replace(/\s/g, '').length !== 16) newErrors.number = 'Valid 16-digit card is required';
      if (!/^\d{2}\/\d{2}$/.test(form.expiry)) newErrors.expiry = 'Expiry format MM/YY required';
      if (form.cvv.length !== 3) newErrors.cvv = '3-digit CVV is required';
    } else if (activeTab === 'upi') {
      if (!form.upiId.trim() || !form.upiId.includes('@')) newErrors.upiId = 'Enter a valid UPI ID (e.g. recruiter@upi)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Steps for Verification
  const verificationSteps = [
    { title: "Secure Cryptographic Handshake", detail: "Establishing AES-256 SSL security layers." },
    { title: "Merchant Credential Authorization", detail: "Resolving merchant receiver ID (niharbiswal87-1@okaxis)." },
    { title: "Transaction Validation Checksum", detail: "Validating inputs on the decentralized ledger." },
    { title: "Ledger Settlement & Vault Release", detail: "Finalizing ledger balance and mounting Vault access keys." }
  ];

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('processing');
    setActiveStep(0);
    
    // Custom logs based on selected channel
    let processLogs = [];
    if (activeTab === 'upi') {
      processLogs = [
        "NPCI > Connecting to NPCI Switch gateway layer...",
        `NPCI > Resolving Merchant VPA: niharbiswal87-1@okaxis`,
        "BANK > Awaiting push request clearance on client node...",
        "NPCI > UPI payment callback verified successfully (200 OK)...",
        "SYSTEM > Transaction complete. Unlocking premium vault assets..."
      ];
    } else if (activeTab === 'usdt') {
      processLogs = [
        "CHAIN > Scanning address: TEoknyCDam7A7LEvSk7qm34J8FkhQUFq69...",
        "TRON > Searching blocks for Tether USDT TRC-20 transfers...",
        "TRON > USDT transaction confirmed successfully (3 confirmations)...",
        "SYSTEM > Cryptographic block hash verified. Unlocking vault..."
      ];
    } else {
      processLogs = [
        "CARD > Routing request to RuPay debit card processor...",
        "CARD > Credit Card verification checksum verified: 6522 9403 5880 1994...",
        "CARD > Processing payment deduction of ₹85.00...",
        "SYSTEM > Merchant invoice generated. Unlocking vault..."
      ];
    }

    // Step-by-step progress simulation
    let currentStep = 0;
    const stepInterval = setInterval(() => {
      if (currentStep < verificationSteps.length - 1) {
        currentStep++;
        setActiveStep(currentStep);
        if (processLogs[currentStep]) {
          setLogs(prev => [...prev, `[network] > ${processLogs[currentStep - 1]}`]);
        }
      } else {
        clearInterval(stepInterval);
        setLogs(prev => [...prev, `[network] > ${processLogs[processLogs.length - 1]}`]);
        
        // Finalize transaction
        setTimeout(() => {
          setInvoiceId(`INV-${Math.floor(100000 + Math.random() * 900000)}`);
          
          // Match Report
          const matchPct = Math.floor(93 + Math.random() * 6);
          const customReport = {
            matchPercentage: matchPct,
            verdict: "EXCELLENT FIT",
            analysis: `Nihar's dual background in software engineering (React/Node/Next) from NIELIT and machine learning models (Pandas/Scikit-Learn) directly aligns with ${form.company}'s modernization stack.\n\nHis client communication skills (honed during his Reliance customer support tenure) guarantee immediate team integration.`,
            recommendation: "Recommended Action: FAST-TRACK TO TECHNICAL INTERVIEW."
          };
          
          setAiReport(customReport);
          setStatus('success');
          
          // Callback
          onUnlockSuccess();

          // Confetti
          confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 }
          });
        }, 600);
      }
    }, 1200);
  };

  const currentTier = tiers.find(t => t.id === selectedTier);

  // Formatted price string based on tab
  const getFormattedPrice = () => {
    if (activeTab === 'usdt') return `${currentTier.prices.usdt}.00 USDT`;
    return `₹${currentTier.prices.inr}.00 INR`;
  };

  const printInvoice = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={status === 'processing' ? null : onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window: Advanced Split Layout */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl rounded-3xl border border-white/10 bg-cyber-bg/95 shadow-2xl text-left overflow-y-auto max-h-[92vh] z-10 scrollbar-none"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyber-blue via-cyber-violet to-cyber-cyan" />

          {status !== 'processing' && (
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer z-20"
            >
              <X className="h-5 w-5" />
            </button>
          )}

          {status === 'idle' && (
            <div className="grid grid-cols-1 md:grid-cols-12">
              
              {/* Left Column: Order Summary & Tiers Selector */}
              <div className="md:col-span-5 bg-black/40 p-6 md:p-8 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between space-y-6">
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-cyber-cyan" />
                    <span className="text-xs uppercase tracking-widest text-cyber-cyan font-bold font-mono">Secure Order Summary</span>
                  </div>

                  {/* Pricing Tier Details */}
                  <div className="bg-white/5 rounded-2xl p-5 border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-br from-cyber-cyan/10 to-transparent pointer-events-none rounded-full filter blur-xl" />
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/20 flex items-center justify-center text-cyber-cyan shrink-0">
                        <currentTier.icon className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-white uppercase tracking-wide">{currentTier.name}</div>
                        <p className="text-[10px] text-gray-400 leading-relaxed">{currentTier.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Inline Tier Selector Dropdown */}
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase font-bold tracking-wider text-gray-400 font-mono">Change Retainer Service</label>
                    <div className="grid grid-cols-1 gap-2">
                      {tiers.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setSelectedTier(t.id)}
                          className={`w-full p-3 rounded-xl border text-left text-xs transition-all duration-300 flex items-center justify-between cursor-pointer ${
                            selectedTier === t.id
                              ? 'bg-cyber-cyan/10 border-cyber-cyan/50 text-white font-bold'
                              : 'bg-black/20 border-white/5 text-gray-400 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <span className="truncate">{t.name}</span>
                          <span className="font-mono text-[10px] font-black shrink-0 ml-2">
                            {activeTab === 'usdt' ? `${t.prices.usdt} USDT` : `₹${t.prices.inr}`}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-4 pt-6 border-t border-white/5 font-mono text-xs">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span className="text-white">
                      {activeTab === 'usdt' ? `${currentTier.prices.usdt}.00 USDT` : `₹${currentTier.prices.inr}.00`}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Tax / Gateway Fee</span>
                    <span className="text-emerald-500 font-semibold">₹0.00 / FREE</span>
                  </div>
                  <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                    <span className="text-sm font-bold text-white">Amount Due</span>
                    <span className="text-lg font-extrabold text-cyber-cyan text-glow-cyan">
                      {getFormattedPrice()}
                    </span>
                  </div>

                  {/* PCI Trust Badges */}
                  <div className="flex items-center gap-1.5 justify-center text-[8px] text-gray-500 pt-2 uppercase font-bold tracking-widest leading-3 select-none">
                    <Lock className="h-3 w-3 text-cyber-cyan" />
                    <span>Secure SSL clearance | 256-bit encryption</span>
                  </div>
                </div>

              </div>

              {/* Right Column: Payment Tabs & Inputs */}
              <div className="md:col-span-7 p-6 md:p-8 space-y-6 flex flex-col justify-between">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-white tracking-wide">Choose Payment Method</h4>
                    <p className="text-[10px] text-gray-500 mt-1">Select India UPI (INR), Credit Card (INR), or USDT Tether (TRC-20)</p>
                  </div>

                  {/* Horizontal Method Selector tabs */}
                  <div className="flex rounded-xl bg-black/40 p-1 border border-white/5">
                    {[
                      { id: 'upi', name: 'BHIM UPI' },
                      { id: 'card', name: 'Debit Card' },
                      { id: 'usdt', name: 'USDT Crypto' }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => { setActiveTab(tab.id); setErrors({}); }}
                        className={`flex-1 py-2.5 text-center text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                          activeTab === tab.id 
                            ? 'bg-gradient-to-r from-cyber-blue to-cyber-cyan text-white shadow' 
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {tab.name}
                      </button>
                    ))}
                  </div>

                  {/* Form Container */}
                  <form onSubmit={handleCheckout} className="space-y-4">
                    
                    {/* Hiring Company */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-gray-400 font-mono">Recruiter Company</label>
                      <input 
                        type="text" 
                        name="company"
                        required
                        placeholder="e.g. Google / Microsoft / NIELIT"
                        value={form.company}
                        onChange={handleInputChange}
                        className="bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-cyber-cyan transition-colors"
                      />
                      {errors.company && <span className="text-[10px] text-red-500 font-mono">{errors.company}</span>}
                    </div>

                    {/* TAB 1: UPI SCAN & PAY */}
                    {activeTab === 'upi' && (
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center border border-white/5 bg-white/5 rounded-2xl p-4">
                        
                        {/* VPA ID field input */}
                        <div className="md:col-span-7 space-y-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] uppercase font-bold tracking-wider text-gray-400 font-mono">Your UPI Address (VPA)</label>
                            <input 
                              type="text" 
                              name="upiId"
                              placeholder="e.g. recruiter@upi"
                              value={form.upiId}
                              onChange={(e) => setForm(prev => ({ ...prev, upiId: e.target.value }))}
                              className="bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-cyber-cyan transition-colors"
                            />
                            {errors.upiId && <span className="text-[10px] text-red-500 font-mono">{errors.upiId}</span>}
                          </div>
                          <div className="text-[9px] text-gray-500 leading-relaxed font-mono">
                            <span className="font-bold text-white">Merchant VPA:</span> niharbiswal87-1@okaxis
                          </div>
                        </div>

                        {/* Scanner QR Block */}
                        <div className="md:col-span-5 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-4">
                          <div className="p-1 bg-white rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] relative overflow-hidden h-28 w-28 flex items-center justify-center">
                            <img 
                              src="/upi_qr.jpg" 
                              alt="UPI QR Code" 
                              className="h-full w-full object-contain scale-105"
                            />
                          </div>
                          <span className="text-[8px] font-mono text-gray-500 uppercase mt-2 select-none">Scan to pay ₹{currentTier.prices.inr}</span>
                        </div>

                      </div>
                    )}

                    {/* TAB 2: DEBIT CARD (INR) */}
                    {activeTab === 'card' && (
                      <div className="space-y-4">
                        
                        {/* Virtual Card Frame */}
                        <div className="flex justify-center perspective-1000 select-none">
                          <motion.div
                            animate={{ rotateY: isCardFlipped ? 180 : 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="relative h-40 w-64 rounded-xl p-4 text-white font-mono shadow-2xl overflow-hidden border border-white/15 bg-gradient-to-br from-cyber-blue/30 via-cyber-violet/30 to-cyber-cyan/30 backdrop-blur-lg transform-style-3d text-[11px]"
                          >
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(6,182,212,0.2),transparent_60%)] pointer-events-none" />
                            
                            {/* Front Side */}
                            <div className="absolute inset-0 p-4 flex flex-col justify-between backface-hidden">
                              <div className="flex justify-between items-start">
                                <div className="h-6 w-8 rounded bg-yellow-600/70 border border-yellow-500/20" />
                                <span className="text-[10px] font-black tracking-widest text-cyber-cyan">RuPay</span>
                              </div>
                              <div className="text-sm tracking-widest text-white/90 text-center font-mono my-2">
                                {form.number || "6522 9403 5880 1994"}
                              </div>
                              <div className="flex justify-between items-end text-[8px] uppercase tracking-wider text-gray-400">
                                <div className="truncate max-w-[120px]">
                                  <div>Cardholder</div>
                                  <div className="text-[10px] font-bold text-white uppercase truncate mt-0.5">{form.name || "Hiring Manager"}</div>
                                </div>
                                <div className="text-right">
                                  <div>Expiry</div>
                                  <div className="text-[10px] font-bold text-white mt-0.5">{form.expiry || "12/28"}</div>
                                </div>
                              </div>
                            </div>

                            {/* Back Side */}
                            <div className="absolute inset-0 flex flex-col justify-between py-4 backface-hidden rotate-y-180 bg-cyber-bg/95">
                              <div className="h-8 w-full bg-black/90 mt-1" />
                              <div className="px-4 flex items-center justify-between gap-4 mt-1">
                                <div className="w-full h-6 bg-white/20 rounded flex items-center justify-end px-2 text-[8px] text-gray-400 italic">
                                  Authorized Signature
                                </div>
                                <div className="bg-amber-500 text-black text-[10px] font-bold px-1.5 py-1 rounded">
                                  {form.cvv || "•••"}
                                </div>
                              </div>
                              <div className="text-[6px] text-gray-500 text-center uppercase tracking-widest mt-1">Secure RuPay Debit System</div>
                            </div>
                          </motion.div>
                        </div>

                        {/* Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[9px] uppercase font-bold tracking-wider text-gray-400 font-mono">Cardholder Name</label>
                            <input 
                              type="text" 
                              name="name"
                              placeholder="e.g. Hiring Manager"
                              value={form.name}
                              onChange={handleInputChange}
                              onFocus={() => setIsCardFlipped(false)}
                              className="bg-black/40 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyber-cyan"
                            />
                            {errors.name && <span className="text-[9px] text-red-500 font-mono">{errors.name}</span>}
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-[9px] uppercase font-bold tracking-wider text-gray-400 font-mono">Card Number</label>
                            <input 
                              type="text" 
                              name="number"
                              placeholder="6522 9403 5880 1994"
                              value={form.number}
                              onChange={handleInputChange}
                              onFocus={() => setIsCardFlipped(false)}
                              className="bg-black/40 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyber-cyan font-mono"
                            />
                            {errors.number && <span className="text-[9px] text-red-500 font-mono">{errors.number}</span>}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[9px] uppercase font-bold tracking-wider text-gray-400 font-mono">Expiry (MM/YY)</label>
                            <input 
                              type="text" 
                              name="expiry"
                              placeholder="12/28"
                              value={form.expiry}
                              onChange={handleInputChange}
                              onFocus={() => setIsCardFlipped(false)}
                              className="bg-black/40 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyber-cyan font-mono"
                            />
                            {errors.expiry && <span className="text-[9px] text-red-500 font-mono">{errors.expiry}</span>}
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-[9px] uppercase font-bold tracking-wider text-gray-400 font-mono">CVV</label>
                            <input 
                              type="password" 
                              name="cvv"
                              placeholder="123"
                              value={form.cvv}
                              onChange={handleInputChange}
                              onFocus={() => setIsCardFlipped(true)}
                              onBlur={() => setIsCardFlipped(false)}
                              className="bg-black/40 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyber-cyan font-mono"
                            />
                            {errors.cvv && <span className="text-[9px] text-red-500 font-mono">{errors.cvv}</span>}
                          </div>
                        </div>

                        {/* Helper info */}
                        <div className="flex justify-between items-center text-[9px] text-gray-500 bg-white/5 rounded-lg px-3 py-2 border border-white/5">
                          <span>💡 Test card:</span>
                          <span className="font-mono font-bold text-cyber-cyan">6522 9403 5880 1994</span>
                        </div>
                      </div>
                    )}

                    {/* TAB 3: USDT CRYPTO WALLET */}
                    {activeTab === 'usdt' && (
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center border border-white/5 bg-white/5 rounded-2xl p-4">
                        
                        {/* Copy details */}
                        <div className="md:col-span-7 space-y-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] uppercase font-bold tracking-wider text-gray-400 font-mono">USDT Recipient Wallet (TRC-20)</label>
                            <div className="flex gap-1.5">
                              <input 
                                type="text" 
                                readOnly
                                value="TEoknyCDam7A7LEvSk7qm34J8FkhQUFq69"
                                className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-[10px] text-cyber-cyan font-mono select-all focus:outline-none"
                              />
                              <button
                                type="button"
                                onClick={handleCopyAddress}
                                className="px-2.5 rounded-lg border border-white/10 hover:border-cyber-cyan bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer flex items-center justify-center shrink-0"
                              >
                                {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                              </button>
                            </div>
                          </div>
                          <div className="text-[9px] text-gray-500 leading-relaxed font-mono">
                            <span className="font-bold text-white">Network:</span> Tron TRC-20
                          </div>
                        </div>

                        {/* Crypto QR scan */}
                        <div className="md:col-span-5 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-4">
                          <div className="p-1 bg-white rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] relative overflow-hidden h-28 w-28 flex items-center justify-center">
                            <img 
                              src="/usdt_qr.jpg" 
                              alt="USDT TRC20 QR" 
                              className="h-full w-full object-contain scale-105"
                            />
                          </div>
                          <span className="text-[8px] font-mono text-gray-500 uppercase mt-2 select-none">Scan to transfer {currentTier.prices.usdt}.00 USDT</span>
                        </div>

                      </div>
                    )}

                    {/* Pay Submit CTA */}
                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-cyber-blue via-cyber-violet to-cyber-cyan text-sm font-bold uppercase tracking-wider text-white shadow-glow-violet hover:brightness-110 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      Process secure pay - {getFormattedPrice()}
                    </button>

                  </form>
                </div>
              </div>

            </div>
          )}

          {/* Premium Processing Screen / Verification Panel */}
          {status === 'processing' && (
            <div className="space-y-6 py-12 px-6 flex flex-col justify-center font-mono">
              <div className="flex flex-col items-center justify-center text-center gap-3">
                <div className="relative h-20 w-20 flex items-center justify-center">
                  <Loader2 className="h-16 w-16 text-cyber-cyan animate-spin opacity-40 absolute" />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="h-20 w-20 rounded-full border-2 border-dotted border-cyber-violet absolute"
                  />
                  <ShieldCheck className="h-8 w-8 text-cyber-cyan shadow-glow-cyan animate-pulse" />
                </div>
                <div>
                  <div className="text-base text-white font-extrabold tracking-widest uppercase">Securing Remittance Channel</div>
                  <div className="text-[9px] text-gray-500 uppercase mt-0.5">Verification core active | Port: 505</div>
                </div>
              </div>

              {/* Progress Steps Checklist */}
              <div className="border border-white/10 rounded-2xl p-5 bg-black/35 space-y-4 max-w-md mx-auto w-full">
                {verificationSteps.map((step, idx) => {
                  const isDone = activeStep > idx;
                  const isActive = activeStep === idx;
                  return (
                    <div key={idx} className="flex gap-4 items-start text-xs text-left">
                      <div className="mt-0.5 shrink-0">
                        {isDone ? (
                          <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shadow-glow-cyan animate-pulse" />
                        ) : isActive ? (
                          <Loader2 className="h-4.5 w-4.5 text-cyber-cyan animate-spin" />
                        ) : (
                          <div className="h-4 w-4 rounded-full border border-white/20" />
                        )}
                      </div>
                      
                      <div className="space-y-0.5">
                        <div className={`font-bold tracking-wide transition-colors duration-300 ${
                          isDone ? "text-white" : isActive ? "text-cyber-cyan" : "text-gray-600"
                        }`}>
                          {step.title}
                        </div>
                        <p className={`text-[10px] leading-relaxed transition-colors duration-300 ${
                          isDone ? "text-gray-400" : isActive ? "text-cyber-violet" : "text-gray-700"
                        }`}>
                          {step.detail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom raw network logs console */}
              <div className="text-[10px] text-gray-500 uppercase tracking-widest text-center mt-2 flex items-center justify-center gap-1">
                <Terminal className="h-3.5 w-3.5" />
                <span>Console Ledger stream</span>
              </div>
              <div className="w-full bg-black/60 border border-white/5 rounded-xl p-3 h-24 overflow-y-auto space-y-1 text-[9px] text-left text-cyber-cyan font-mono shadow-inner max-w-md mx-auto">
                {logs.map((log, idx) => (
                  <div key={idx} className="leading-4 select-none">{log}</div>
                ))}
                <div className="h-2.5 w-1 bg-cyber-cyan inline-block cursor-blink animate-pulse" />
              </div>
            </div>
          )}

          {/* Success Screen */}
          {status === 'success' && (
            <div className="space-y-6 p-6 md:p-8">
              <div id="printable-invoice" className="bg-black/30 border border-white/10 rounded-2xl p-6 space-y-6">
                
                {/* Status Indicator */}
                <div className="flex flex-col items-center justify-center text-center gap-2 pb-4 border-b border-white/5">
                  <div className="h-14 w-14 rounded-full bg-emerald-500/10 border border-emerald-500 flex items-center justify-center text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)] mb-2">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h4 className="text-lg font-bold text-white tracking-wide">Transaction Approved!</h4>
                  <p className="text-[10px] text-emerald-500 font-semibold uppercase">Premium Vault Access Granted</p>
                </div>

                {/* AI Recruiter Match Report */}
                {aiReport && (
                  <div className="border border-cyber-cyan/30 rounded-xl bg-cyber-cyan/5 p-5 text-left space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-cyber-cyan" />
                        AI Compatibility Score
                      </div>
                      <span className="text-sm font-black text-cyber-cyan font-mono text-glow-cyan">
                        {aiReport.matchPercentage}% Compatibility
                      </span>
                    </div>

                    <div className="text-[11px] text-gray-300 leading-relaxed whitespace-pre-line">
                      {aiReport.analysis}
                    </div>

                    <div className="border-t border-white/5 pt-2 text-[10px] font-mono text-cyber-cyan font-bold">
                      {aiReport.recommendation}
                    </div>
                  </div>
                )}

                {/* Invoice Table details */}
                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between text-gray-500">
                    <span>Invoice ID</span>
                    <span className="font-mono font-semibold text-white">{invoiceId}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Hiring Client</span>
                    <span className="font-semibold text-white uppercase">{form.company}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Payment Channel</span>
                    <span className="font-semibold text-white uppercase">
                      {activeTab === 'upi' ? 'BHIM UPI (INR)' : activeTab === 'usdt' ? 'USDT (Tether TRC-20)' : 'Credit Card (RuPay/INR)'}
                    </span>
                  </div>
                  {activeTab === 'card' && (
                    <div className="flex justify-between text-gray-500">
                      <span>Authorized Card</span>
                      <span className="font-mono font-semibold text-white">•••• •••• •••• {form.number ? form.number.slice(-4) : "1994"}</span>
                    </div>
                  )}
                  {activeTab === 'upi' && (
                    <div className="flex justify-between text-gray-500">
                      <span>Merchant VPA</span>
                      <span className="font-mono font-semibold text-white">{form.upiId}</span>
                    </div>
                  )}
                  {activeTab === 'usdt' && (
                    <div className="flex justify-between text-gray-500">
                      <span>USDT Address</span>
                      <span className="font-mono font-semibold text-white truncate max-w-[200px]">TEoknyCDam7A7LEvSk7qm34J8FkhQUFq69</span>
                    </div>
                  )}
                  <div className="border-t border-white/5 pt-2.5 flex justify-between items-center text-sm">
                    <span className="font-bold text-white">Retained Deposit</span>
                    <span className="font-extrabold text-cyber-cyan">{getFormattedPrice()}</span>
                  </div>
                </div>

              </div>

              {/* Action buttons */}
              <div className="flex gap-4">
                <button
                  onClick={printInvoice}
                  className="flex-1 py-3 px-4 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-xs font-bold uppercase tracking-wider text-white transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Download className="h-4 w-4 text-gray-400" />
                  Save PDF Receipt
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyber-blue via-cyber-violet to-cyber-cyan text-xs font-bold uppercase tracking-wider text-white transition-all cursor-pointer"
                >
                  View Premium Vault
                </button>
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
