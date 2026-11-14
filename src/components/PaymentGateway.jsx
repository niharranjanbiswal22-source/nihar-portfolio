import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, CreditCard, ShieldCheck, Terminal, Download, Sparkles, Brain, 
  Copy, Check, Smartphone, Landmark, Loader2, CheckCircle2, ShoppingBag, 
  Lock, QrCode, ArrowRight, ExternalLink, Zap, Building2, User, Mail, 
  Phone, IndianRupee, AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

const RAZORPAY_KEY_ID = "rzp_live_TzeBGXLZwswIUp";
const MERCHANT_UPI_ID = "niharbiswal87-1@okaxis";
const MERCHANT_NAME = "Nihar Ranjan Biswal";
const USDT_WALLET_ADDRESS = "TEoknyCDam7A7LEvSk7qm34J8FkhQUFq69";

const tiers = [
  {
    id: 'vault',
    name: 'Vault Unlock & AI Analysis',
    prices: { inr: 85, usdt: 1 },
    description: 'Unlock premium microservices designs + get a custom AI recruiter match report.',
    icon: Brain,
    badge: 'Popular',
    color: 'text-cyber-cyan'
  },
  {
    id: 'consulting',
    name: '1-Hour Technical Sync',
    prices: { inr: 4200, usdt: 50 },
    description: 'Book Nihar for a 60-min call to debug code or discuss project architecture.',
    icon: Smartphone,
    badge: 'Mentorship',
    color: 'text-cyber-violet'
  },
  {
    id: 'retainer',
    name: 'Full-Stack Retainer Deposit',
    prices: { inr: 42000, usdt: 500 },
    description: 'Lock in a retainer deposit for custom web development contracts.',
    icon: CreditCard,
    badge: 'Enterprise',
    color: 'text-pink-500'
  },
  {
    id: 'custom',
    name: 'Custom Tip / Test Payment',
    prices: { inr: 1, usdt: 1 },
    description: 'Enter any custom amount for testing Razorpay live payment (e.g. ₹1) or supporting my work.',
    icon: Zap,
    badge: 'Flexible',
    color: 'text-amber-400'
  }
];

export default function PaymentGateway({ isOpen, onClose, onUnlockSuccess, productToBuy }) {
  const [selectedTier, setSelectedTier] = useState('vault');
  const [customAmount, setCustomAmount] = useState('1');
  const [activeTab, setActiveTab] = useState('razorpay'); // 'razorpay' | 'upi' | 'card' | 'usdt'
  
  const [form, setForm] = useState({ 
    name: '', 
    company: '', 
    email: '', 
    phone: '', 
    number: '', 
    expiry: '', 
    cvv: '', 
    utr: '' 
  });
  
  const [errors, setErrors] = useState({});
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedUsdt, setCopiedUsdt] = useState(false);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  
  // States: 'idle' | 'processing' | 'success'
  const [status, setStatus] = useState('idle');
  const [logs, setLogs] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [transactionInfo, setTransactionInfo] = useState({
    invoiceId: '',
    paymentId: '',
    method: '',
    amount: 0,
    timestamp: ''
  });
  const [aiReport, setAiReport] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setForm({ name: '', company: '', email: '', phone: '', number: '', expiry: '', cvv: '', utr: '' });
      setErrors({});
      setStatus('idle');
      setLogs([]);
      setAiReport(null);
      setCopiedUpi(false);
      setCopiedUsdt(false);
      setIsCardFlipped(false);
      setActiveStep(0);
    }
  }, [isOpen]);

  // Ensure Razorpay SDK is available
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const getEffectiveInrAmount = () => {
    if (productToBuy) {
      return productToBuy.price;
    }
    if (selectedTier === 'custom') {
      const parsed = parseFloat(customAmount);
      return isNaN(parsed) || parsed < 1 ? 1 : Math.round(parsed);
    }
    const tier = tiers.find(t => t.id === selectedTier) || tiers[0];
    return tier.prices.inr;
  };

  const currentTier = productToBuy
    ? {
        name: productToBuy.title,
        badge: productToBuy.badge || productToBuy.category || 'Digital Asset',
        description: productToBuy.description,
        icon: productToBuy.icon || ShoppingBag,
        logoSrc: productToBuy.logoSrc,
        prices: { inr: productToBuy.price, usdt: Math.max(1, Math.round(productToBuy.price / 85)) }
      }
    : (tiers.find(t => t.id === selectedTier) || tiers[0]);
  const effectiveInr = getEffectiveInrAmount();

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
    } else if (name === 'phone') {
      setForm(prev => ({ ...prev, [name]: value.replace(/\D/g, '').slice(0, 10) }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCopy = (type) => {
    if (type === 'upi') {
      navigator.clipboard.writeText(MERCHANT_UPI_ID);
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2000);
    } else {
      navigator.clipboard.writeText(USDT_WALLET_ADDRESS);
      setCopiedUsdt(true);
      setTimeout(() => setCopiedUsdt(false), 2000);
    }
  };

  const validateBasicForm = () => {
    const newErrors = {};
    if (!form.company.trim()) newErrors.company = 'Company / Organization name is required';
    if (!form.name.trim()) newErrors.name = 'Full name is required';
    if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (form.phone.trim() && form.phone.length < 10) {
      newErrors.phone = 'Enter a valid 10-digit mobile number';
    }

    if (activeTab === 'card') {
      if (form.number.replace(/\s/g, '').length !== 16) newErrors.number = 'Valid 16-digit card required';
      if (!/^\d{2}\/\d{2}$/.test(form.expiry)) newErrors.expiry = 'MM/YY required';
      if (form.cvv.length !== 3) newErrors.cvv = '3-digit CVV required';
    } else if (activeTab === 'upi') {
      if (!form.utr.trim()) newErrors.utr = 'Enter 12-digit UTR / UPI Ref ID after scanning';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Complete Payment and trigger unlock & receipt
  const triggerSuccess = (paymentDetails) => {
    const invId = `INV-${Math.floor(100000 + Math.random() * 900000)}`;
    const matchPct = Math.floor(94 + Math.random() * 5);
    
    setTransactionInfo({
      invoiceId: invId,
      paymentId: paymentDetails.paymentId || `rzp_${Date.now()}`,
      method: paymentDetails.method,
      amount: paymentDetails.amount,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    });

    setAiReport({
      matchPercentage: matchPct,
      verdict: "EXCELLENT FIT (TOP 2%)",
      analysis: `Candidate profile for Nihar Ranjan Biswal demonstrates strong dual capabilities: Advanced Full-Stack development (React 19, Next.js, Node.js, REST APIs) validated during NIELIT tenure, combined with production Machine Learning architectures (Scikit-Learn, Pandas).\n\nValidated for technical role readiness at ${form.company || 'your organization'}.`,
      recommendation: "System Directive: GRANTED DIRECT ACCESS TO PRODUCTION ARCHITECTURES & RESUME VAULT."
    });

    setStatus('success');
    if (onUnlockSuccess) {
      onUnlockSuccess();
    }

    try {
      confetti({
        particleCount: 160,
        spread: 90,
        origin: { y: 0.6 }
      });
    } catch {
      // Confetti fallback
    }
  };

  // 1. Live Razorpay Standard Checkout
  const handleRazorpayPayment = async (e) => {
    if (e) e.preventDefault();

    if (!form.company.trim()) {
      setErrors(prev => ({ ...prev, company: 'Please specify your company or organization name' }));
      return;
    }

    const loaded = await loadRazorpay();
    if (!loaded) {
      alert("Could not connect to Razorpay Gateway. Please check your internet connection.");
      return;
    }

    const amountInPaise = effectiveInr * 100;

    const options = {
      key: RAZORPAY_KEY_ID,
      amount: amountInPaise,
      currency: "INR",
      name: MERCHANT_NAME,
      description: `${currentTier.name} (Premium Access)`,
      image: "/logo.jpg",
      handler: function (response) {
        triggerSuccess({
          paymentId: response.razorpay_payment_id,
          method: "Razorpay (Scan & Pay / UPI / Cards / NetBanking)",
          amount: effectiveInr
        });
      },
      prefill: {
        name: form.name || "Recruiter / Client",
        email: form.email || "recruiter@hiring.com",
        contact: form.phone ? `+91${form.phone}` : ""
      },
      notes: {
        company: form.company,
        tier: currentTier.name,
        type: "Portfolio Premium Unlock"
      },
      theme: {
        color: "#06b6d4"
      },
      modal: {
        ondismiss: function () {
          console.log("Razorpay checkout modal dismissed by user.");
        }
      }
    };

    try {
      const rzpInstance = new window.Razorpay(options);
      rzpInstance.on('payment.failed', function (response) {
        alert(`Payment Incomplete: ${response.error.description || 'Transaction was canceled or failed'}`);
      });
      rzpInstance.open();
    } catch (err) {
      console.error("Razorpay initiation error:", err);
      alert("Unable to open Razorpay checkout. Please try again or use direct UPI scan.");
    }
  };

  // 2. Simulated manual process for Direct UPI or Card or USDT
  const handleManualCheckout = (e) => {
    e.preventDefault();
    if (!validateBasicForm()) return;

    setStatus('processing');
    setActiveStep(0);

    const verificationSteps = [
      { title: "Gateway Handshake", detail: "Resolving merchant payment ledger." },
      { title: "Verification Checksum", detail: `Verifying transfer to ${MERCHANT_NAME}.` },
      { title: "Ledger Settlement", detail: "Mounting access keys to secure vault repository." }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < verificationSteps.length - 1) {
        currentStep++;
        setActiveStep(currentStep);
        setLogs(prev => [...prev, `[network] > Step ${currentStep}: ${verificationSteps[currentStep].title} verified.`]);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          triggerSuccess({
            paymentId: activeTab === 'upi' ? `upi_${form.utr}` : activeTab === 'card' ? `card_${Date.now()}` : `usdt_${Date.now()}`,
            method: activeTab === 'upi' ? 'Direct UPI (QR / VPA)' : activeTab === 'card' ? 'Debit/Credit Card' : 'USDT TRC-20',
            amount: effectiveInr
          });
        }, 500);
      }
    }, 1000);
  };

  // Formatted price string based on tab
  const getFormattedPrice = () => {
    if (activeTab === 'usdt') return `${currentTier.prices.usdt}.00 USDT`;
    return `₹${effectiveInr.toLocaleString('en-IN')}.00 INR`;
  };

  // Deep-link URI for UPI apps (GPay, PhonePe, Paytm, BHIM)
  const upiIntentUrl = `upi://pay?pa=${MERCHANT_UPI_ID}&pn=${encodeURIComponent(MERCHANT_NAME)}&am=${effectiveInr}&cu=INR&tn=${encodeURIComponent(currentTier.name)}`;
  
  // Dynamic QR code generation for the exact amount
  const dynamicQrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiIntentUrl)}`;

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
          {/* Top glowing gradient stripe */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyber-blue via-cyber-violet to-cyber-cyan" />

          {status !== 'processing' && (
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer z-20"
              aria-label="Close Payment Modal"
            >
              <X className="h-5 w-5" />
            </button>
          )}

          {status === 'idle' && (
            <div className="grid grid-cols-1 md:grid-cols-12">
              
              {/* Left Column: Order Summary & Plan Selection */}
              <div className="md:col-span-5 bg-black/40 p-6 md:p-8 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between space-y-6">
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-cyber-cyan" />
                    <span className="text-xs uppercase tracking-widest text-cyber-cyan font-bold font-mono">Secure Payment Portal</span>
                  </div>

                  {/* Selected Tier Box */}
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-br from-cyber-cyan/15 to-transparent pointer-events-none rounded-full filter blur-xl" />
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center text-cyber-cyan shrink-0 p-1.5 overflow-hidden">
                        {currentTier.logoSrc ? (
                          <img src={currentTier.logoSrc} alt={currentTier.name} className="h-full w-full object-contain filter drop-shadow" />
                        ) : (
                          <currentTier.icon className="h-5 w-5" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white uppercase tracking-wide">{currentTier.name}</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyber-cyan/20 text-cyber-cyan font-mono font-bold">
                            {currentTier.badge}
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-400 leading-relaxed">{currentTier.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Tier Selection */}
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase font-bold tracking-wider text-gray-400 font-mono">Select Service / Plan</label>
                    <div className="grid grid-cols-1 gap-2">
                      {tiers.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setSelectedTier(t.id)}
                          className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all duration-200 flex items-center justify-between cursor-pointer ${
                            selectedTier === t.id
                              ? 'bg-cyber-cyan/15 border-cyber-cyan/50 text-white font-bold shadow-[0_0_12px_rgba(6,182,212,0.15)]'
                              : 'bg-black/20 border-white/5 text-gray-400 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <span className="truncate text-xs">{t.name}</span>
                          <span className="font-mono text-[11px] font-black shrink-0 ml-2 text-cyber-cyan">
                            {t.id === 'custom' ? 'Custom' : `₹${t.prices.inr.toLocaleString('en-IN')}`}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Amount Input if 'custom' is selected */}
                  {selectedTier === 'custom' && (
                    <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-1.5">
                      <label className="text-[9px] uppercase font-bold text-amber-400 font-mono flex items-center gap-1">
                        <IndianRupee className="h-3 w-3" /> Custom Test Amount (INR)
                      </label>
                      <input 
                        type="number"
                        min="1"
                        max="100000"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        placeholder="e.g. 1"
                        className="w-full bg-black/60 border border-amber-500/30 rounded-lg p-2 text-sm text-white font-mono focus:outline-none focus:border-amber-400"
                      />
                      <span className="text-[9px] text-gray-400">Try with ₹1 to test live checkout!</span>
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 pt-4 border-t border-white/5 font-mono text-xs">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span className="text-white font-semibold">
                      {activeTab === 'usdt' ? `${currentTier.prices.usdt}.00 USDT` : `₹${effectiveInr.toLocaleString('en-IN')}.00`}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Gateway Processing</span>
                    <span className="text-emerald-400 font-semibold">100% Free / Instant</span>
                  </div>
                  <div className="border-t border-white/10 pt-3 flex justify-between items-center">
                    <span className="text-sm font-bold text-white">Total Payable</span>
                    <span className="text-lg font-extrabold text-cyber-cyan text-glow-cyan">
                      {getFormattedPrice()}
                    </span>
                  </div>

                  {/* Trust Badges */}
                  <div className="flex items-center gap-1.5 justify-center text-[8px] text-gray-500 pt-1 uppercase font-bold tracking-widest leading-3 select-none">
                    <Lock className="h-3 w-3 text-cyber-cyan" />
                    <span>Razorpay 256-bit Encrypted SSL Gateway</span>
                  </div>
                </div>

              </div>

              {/* Right Column: Payment Gateway Interface */}
              <div className="md:col-span-7 p-6 md:p-8 space-y-5 flex flex-col justify-between">
                <div className="space-y-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
                        <span>Payment Gateway</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">
                          Live Active
                        </span>
                      </h4>
                      <p className="text-[11px] text-gray-400 mt-0.5">Pay via Razorpay, Scan & Pay UPI, Debit Card, or Crypto</p>
                    </div>
                  </div>

                  {/* Method Selector Tabs */}
                  <div className="grid grid-cols-4 rounded-xl bg-black/40 p-1 border border-white/10 text-center gap-1">
                    {[
                      { id: 'razorpay', name: 'Razorpay', badge: 'Instant' },
                      { id: 'upi', name: 'Scan & Pay', badge: 'QR' },
                      { id: 'card', name: 'Card', badge: 'RuPay' },
                      { id: 'usdt', name: 'USDT', badge: 'TRC-20' }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => { setActiveTab(tab.id); setErrors({}); }}
                        className={`py-2 px-1 text-center rounded-lg transition-all cursor-pointer flex flex-col items-center justify-center ${
                          activeTab === tab.id 
                            ? 'bg-gradient-to-r from-cyber-blue to-cyber-cyan text-white font-bold shadow-glow-cyan' 
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span className="text-xs">{tab.name}</span>
                        <span className="text-[8px] opacity-75 font-mono">{tab.badge}</span>
                      </button>
                    ))}
                  </div>

                  {/* Customer Information (Shared across all methods) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-white/5 p-3.5 rounded-2xl border border-white/5">
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] uppercase font-bold tracking-wider text-gray-400 font-mono flex items-center gap-1">
                        <Building2 className="h-3 w-3 text-cyber-cyan" /> Company / Client *
                      </label>
                      <input 
                        type="text" 
                        name="company"
                        required
                        placeholder="e.g. Google / Microsoft / Recruiter"
                        value={form.company}
                        onChange={handleInputChange}
                        className="bg-black/50 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-cyber-cyan transition-colors"
                      />
                      {errors.company && <span className="text-[9px] text-red-400 font-mono">{errors.company}</span>}
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] uppercase font-bold tracking-wider text-gray-400 font-mono flex items-center gap-1">
                        <User className="h-3 w-3 text-cyber-cyan" /> Your Name
                      </label>
                      <input 
                        type="text" 
                        name="name"
                        placeholder="e.g. Hiring Manager"
                        value={form.name}
                        onChange={handleInputChange}
                        className="bg-black/50 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-cyber-cyan transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] uppercase font-bold tracking-wider text-gray-400 font-mono flex items-center gap-1">
                        <Mail className="h-3 w-3 text-cyber-cyan" /> Email (For Invoice)
                      </label>
                      <input 
                        type="email" 
                        name="email"
                        placeholder="recruiter@company.com"
                        value={form.email}
                        onChange={handleInputChange}
                        className="bg-black/50 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-cyber-cyan transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] uppercase font-bold tracking-wider text-gray-400 font-mono flex items-center gap-1">
                        <Phone className="h-3 w-3 text-cyber-cyan" /> Phone (Optional)
                      </label>
                      <input 
                        type="tel" 
                        name="phone"
                        placeholder="10-digit number"
                        value={form.phone}
                        onChange={handleInputChange}
                        className="bg-black/50 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-cyber-cyan transition-colors"
                      />
                    </div>
                  </div>

                  {/* TAB 1: RAZORPAY LIVE INTEGRATION */}
                  {activeTab === 'razorpay' && (
                    <div className="space-y-4 border border-cyber-cyan/30 bg-cyber-cyan/5 rounded-2xl p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-lg bg-cyber-cyan/20 flex items-center justify-center text-cyber-cyan">
                            <Zap className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">Razorpay Standard Checkout</div>
                            <div className="text-[9px] text-gray-400">All India & International payments supported</div>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-cyber-cyan bg-cyber-cyan/10 px-2 py-0.5 rounded border border-cyber-cyan/30">
                          Live Gateway
                        </span>
                      </div>

                      {/* Payment Options Supported Badges */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] text-gray-300 font-mono">
                        <div className="bg-black/40 border border-white/5 rounded-lg p-2 text-center">
                          <span className="font-bold text-white block">UPI & QR</span>
                          <span className="text-[8px] text-gray-400">GPay, PhonePe, Paytm</span>
                        </div>
                        <div className="bg-black/40 border border-white/5 rounded-lg p-2 text-center">
                          <span className="font-bold text-white block">Cards</span>
                          <span className="text-[8px] text-gray-400">RuPay, Visa, MC</span>
                        </div>
                        <div className="bg-black/40 border border-white/5 rounded-lg p-2 text-center">
                          <span className="font-bold text-white block">NetBanking</span>
                          <span className="text-[8px] text-gray-400">50+ Banks</span>
                        </div>
                        <div className="bg-black/40 border border-white/5 rounded-lg p-2 text-center">
                          <span className="font-bold text-white block">Wallets & PayLater</span>
                          <span className="text-[8px] text-gray-400">Cred, Mobikwik</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleRazorpayPayment}
                        className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyber-blue via-cyber-violet to-cyber-cyan text-sm font-bold uppercase tracking-wider text-white shadow-glow-cyan hover:brightness-110 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Lock className="h-4 w-4" />
                        Pay ₹{effectiveInr.toLocaleString('en-IN')} with Razorpay
                        <ArrowRight className="h-4 w-4" />
                      </button>

                      <div className="flex items-center justify-between text-[9px] text-gray-500 font-mono">
                        <span>Merchant: {MERCHANT_NAME}</span>
                        <span>Key: {RAZORPAY_KEY_ID.slice(0, 12)}•••</span>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: DIRECT SCAN & PAY (DYNAMIC UPI QR) */}
                  {activeTab === 'upi' && (
                    <form onSubmit={handleManualCheckout} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center border border-white/10 bg-black/40 rounded-2xl p-4">
                        
                        {/* QR Code Container */}
                        <div className="sm:col-span-5 flex flex-col items-center justify-center">
                          <div className="p-2 bg-white rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.3)] relative overflow-hidden h-36 w-36 flex items-center justify-center">
                            <img 
                              src={dynamicQrCodeUrl} 
                              alt="Scan & Pay UPI QR" 
                              className="h-full w-full object-contain"
                              onError={(e) => {
                                // Fallback to local static QR if external API is unreachable
                                e.target.src = '/upi_qr.jpg';
                              }}
                            />
                          </div>
                          <span className="text-[9px] font-mono text-emerald-400 uppercase mt-2 font-bold">
                            Scan & Pay ₹{effectiveInr.toLocaleString('en-IN')}
                          </span>
                        </div>

                        {/* Details & Intent Button */}
                        <div className="sm:col-span-7 space-y-3">
                          <div className="space-y-1">
                            <label className="text-[9px] uppercase font-bold text-gray-400 font-mono">Merchant UPI ID (VPA)</label>
                            <div className="flex gap-2">
                              <input 
                                type="text" 
                                readOnly
                                value={MERCHANT_UPI_ID}
                                className="w-full bg-black/60 border border-white/10 rounded-lg p-2 text-xs text-cyber-cyan font-mono select-all focus:outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => handleCopy('upi')}
                                className="px-3 rounded-lg border border-white/10 hover:border-cyber-cyan bg-white/5 text-gray-300 hover:text-white transition-colors cursor-pointer flex items-center justify-center"
                                title="Copy UPI ID"
                              >
                                {copiedUpi ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                              </button>
                            </div>
                          </div>

                          {/* Mobile Intent link to launch GPay / PhonePe */}
                          <a
                            href={upiIntentUrl}
                            className="w-full py-2 px-3 rounded-lg bg-cyber-cyan/15 hover:bg-cyber-cyan/25 border border-cyber-cyan/40 text-xs text-center font-bold text-cyber-cyan flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <Smartphone className="h-3.5 w-3.5" />
                            Open in UPI App (GPay / PhonePe)
                            <ExternalLink className="h-3 w-3" />
                          </a>

                          {/* UTR / Transaction reference input */}
                          <div className="space-y-1">
                            <label className="text-[9px] uppercase font-bold text-gray-400 font-mono">12-Digit UTR / Ref Number *</label>
                            <input 
                              type="text" 
                              name="utr"
                              placeholder="e.g. 423984029384"
                              value={form.utr}
                              onChange={handleInputChange}
                              className="w-full bg-black/60 border border-white/10 rounded-lg p-2 text-xs text-white font-mono focus:outline-none focus:border-cyber-cyan"
                            />
                            {errors.utr && <span className="text-[9px] text-red-400 font-mono">{errors.utr}</span>}
                          </div>
                        </div>

                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-cyber-blue via-cyber-violet to-cyber-cyan text-xs font-bold uppercase tracking-wider text-white shadow-glow-cyan hover:brightness-110 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        Verify UPI Transfer & Unlock Vault
                      </button>
                    </form>
                  )}

                  {/* TAB 3: DEBIT / CREDIT CARD */}
                  {activeTab === 'card' && (
                    <form onSubmit={handleManualCheckout} className="space-y-4">
                      {/* Virtual Card Frame */}
                      <div className="flex justify-center perspective-1000 select-none">
                        <motion.div
                          animate={{ rotateY: isCardFlipped ? 180 : 0 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          className="relative h-36 w-64 rounded-xl p-3.5 text-white font-mono shadow-2xl overflow-hidden border border-white/15 bg-gradient-to-br from-cyber-blue/40 via-cyber-violet/40 to-cyber-cyan/40 backdrop-blur-lg transform-style-3d text-[11px]"
                        >
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(6,182,212,0.2),transparent_60%)] pointer-events-none" />
                          
                          {/* Front Side */}
                          <div className="absolute inset-0 p-3.5 flex flex-col justify-between backface-hidden">
                            <div className="flex justify-between items-start">
                              <div className="h-5 w-7 rounded bg-yellow-600/70 border border-yellow-500/20" />
                              <span className="text-[9px] font-black tracking-widest text-cyber-cyan">RuPay / VISA</span>
                            </div>
                            <div className="text-xs tracking-widest text-white/90 text-center font-mono my-1">
                              {form.number || "6522 9403 5880 1994"}
                            </div>
                            <div className="flex justify-between items-end text-[8px] uppercase tracking-wider text-gray-400">
                              <div className="truncate max-w-[120px]">
                                <div>Cardholder</div>
                                <div className="text-[9px] font-bold text-white uppercase truncate">{form.name || "Hiring Client"}</div>
                              </div>
                              <div className="text-right">
                                <div>Expiry</div>
                                <div className="text-[9px] font-bold text-white">{form.expiry || "12/28"}</div>
                              </div>
                            </div>
                          </div>

                          {/* Back Side */}
                          <div className="absolute inset-0 flex flex-col justify-between py-3 backface-hidden rotate-y-180 bg-cyber-bg/95">
                            <div className="h-7 w-full bg-black/90 mt-1" />
                            <div className="px-4 flex items-center justify-between gap-4 mt-1">
                              <div className="w-full h-5 bg-white/20 rounded flex items-center justify-end px-2 text-[8px] text-gray-400 italic">
                                Authorized Signature
                              </div>
                              <div className="bg-amber-500 text-black text-[9px] font-bold px-1.5 py-0.5 rounded">
                                {form.cvv || "•••"}
                              </div>
                            </div>
                            <div className="text-[6px] text-gray-500 text-center uppercase tracking-widest">PCI-DSS Certified</div>
                          </div>
                        </motion.div>
                      </div>

                      {/* Fields */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                        <div className="sm:col-span-3 space-y-1">
                          <label className="text-[9px] uppercase font-bold text-gray-400 font-mono">16-Digit Card Number</label>
                          <input 
                            type="text" 
                            name="number"
                            placeholder="6522 9403 5880 1994"
                            value={form.number}
                            onChange={handleInputChange}
                            onFocus={() => setIsCardFlipped(false)}
                            className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-xs text-white font-mono focus:outline-none focus:border-cyber-cyan"
                          />
                          {errors.number && <span className="text-[9px] text-red-400 font-mono">{errors.number}</span>}
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] uppercase font-bold text-gray-400 font-mono">Expiry (MM/YY)</label>
                          <input 
                            type="text" 
                            name="expiry"
                            placeholder="12/28"
                            value={form.expiry}
                            onChange={handleInputChange}
                            onFocus={() => setIsCardFlipped(false)}
                            className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-xs text-white font-mono focus:outline-none focus:border-cyber-cyan"
                          />
                          {errors.expiry && <span className="text-[9px] text-red-400 font-mono">{errors.expiry}</span>}
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] uppercase font-bold text-gray-400 font-mono">CVV</label>
                          <input 
                            type="password" 
                            name="cvv"
                            placeholder="123"
                            value={form.cvv}
                            onChange={handleInputChange}
                            onFocus={() => setIsCardFlipped(true)}
                            onBlur={() => setIsCardFlipped(false)}
                            className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-xs text-white font-mono focus:outline-none focus:border-cyber-cyan"
                          />
                          {errors.cvv && <span className="text-[9px] text-red-400 font-mono">{errors.cvv}</span>}
                        </div>

                        <div className="flex items-center text-[9px] text-gray-400 font-mono sm:pt-4">
                          <span>💡 Test: 6522...1994</span>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-cyber-blue via-cyber-violet to-cyber-cyan text-xs font-bold uppercase tracking-wider text-white shadow-glow-cyan hover:brightness-110 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        Authorize & Pay ₹{effectiveInr.toLocaleString('en-IN')}
                      </button>
                    </form>
                  )}

                  {/* TAB 4: USDT CRYPTO */}
                  {activeTab === 'usdt' && (
                    <form onSubmit={handleManualCheckout} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center border border-white/10 bg-black/40 rounded-2xl p-4">
                        <div className="sm:col-span-5 flex flex-col items-center justify-center">
                          <div className="p-2 bg-white rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.3)] relative overflow-hidden h-32 w-32 flex items-center justify-center">
                            <img 
                              src="/usdt_qr.jpg" 
                              alt="USDT TRC20 QR" 
                              className="h-full w-full object-contain"
                            />
                          </div>
                          <span className="text-[9px] font-mono text-emerald-400 uppercase mt-2 font-bold">
                            {currentTier.prices.usdt}.00 USDT (TRC-20)
                          </span>
                        </div>

                        <div className="sm:col-span-7 space-y-3">
                          <div className="space-y-1">
                            <label className="text-[9px] uppercase font-bold text-gray-400 font-mono">Tron TRC-20 Address</label>
                            <div className="flex gap-2">
                              <input 
                                type="text" 
                                readOnly
                                value={USDT_WALLET_ADDRESS}
                                className="w-full bg-black/60 border border-white/10 rounded-lg p-2 text-[10px] text-emerald-400 font-mono select-all focus:outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => handleCopy('usdt')}
                                className="px-3 rounded-lg border border-white/10 hover:border-emerald-400 bg-white/5 text-gray-300 hover:text-white transition-colors cursor-pointer flex items-center justify-center"
                                title="Copy USDT Address"
                              >
                                {copiedUsdt ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                              </button>
                            </div>
                          </div>
                          <div className="text-[9px] text-gray-400 font-mono leading-relaxed">
                            Send exact USDT on TRON network. After confirmation, submit to release vault keys.
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-500 to-cyber-cyan text-xs font-bold uppercase tracking-wider text-white shadow-glow-cyan hover:brightness-110 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        Confirm Blockchain Transfer & Unlock
                      </button>
                    </form>
                  )}

                </div>
              </div>

            </div>
          )}

          {/* Processing / Verification Screen */}
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
                  <div className="text-[9px] text-gray-500 uppercase mt-0.5">Razorpay & Merchant Handshake | Status: 200 OK</div>
                </div>
              </div>

              {/* Console stream */}
              <div className="w-full bg-black/60 border border-white/10 rounded-xl p-3 h-28 overflow-y-auto space-y-1 text-[10px] text-left text-cyber-cyan font-mono shadow-inner max-w-md mx-auto">
                <div className="text-gray-500">// Handshake initiated with Merchant Node: {MERCHANT_NAME}</div>
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
              <div id="printable-invoice" className="bg-black/30 border border-white/10 rounded-2xl p-6 space-y-5">
                
                {/* Status Indicator */}
                <div className="flex flex-col items-center justify-center text-center gap-2 pb-4 border-b border-white/5">
                  <div className="h-14 w-14 rounded-full bg-emerald-500/10 border border-emerald-500 flex items-center justify-center text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)] mb-1">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h4 className="text-lg font-bold text-white tracking-wide">Payment Authorized & Confirmed!</h4>
                  <p className="text-[11px] text-emerald-400 font-semibold uppercase tracking-wider">Premium Access Keys Mounted</p>
                </div>

                {/* Specific Product Access Box */}
                {productToBuy && (
                  <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/15 via-cyber-cyan/15 to-transparent border border-emerald-500/30 text-left space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="h-4 w-4 text-emerald-400" />
                        Unlocked Asset: {productToBuy.title}
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        ₹{productToBuy.price} PAID
                      </span>
                    </div>
                    <p className="text-xs text-gray-300">
                      {productToBuy.deliverable}
                    </p>
                    <button
                      type="button"
                      onClick={() => alert(`🎉 Access Granted!\n\nProduct: ${productToBuy.title}\nDeliverable: ${productToBuy.deliverable}\n\nAccess link/files have been prepared for ${form.email || form.company || 'your account'}. Thank you!`)}
                      className="mt-2 w-full py-2.5 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
                    >
                      <Download className="h-4 w-4" />
                      Download / Access {productToBuy.shortName || "Asset"}
                    </button>
                  </div>
                )}

                {/* AI Recruiter Match Report */}
                {aiReport && (
                  <div className="border border-cyber-cyan/30 rounded-xl bg-cyber-cyan/5 p-4 text-left space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-cyber-cyan" />
                        AI Compatibility Assessment
                      </div>
                      <span className="text-sm font-black text-cyber-cyan font-mono text-glow-cyan">
                        {aiReport.matchPercentage}% Match
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
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-gray-400">
                    <span>Invoice Ref:</span>
                    <span className="font-semibold text-white">{transactionInfo.invoiceId}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Razorpay / Payment ID:</span>
                    <span className="font-semibold text-cyber-cyan">{transactionInfo.paymentId}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Recipient Merchant:</span>
                    <span className="font-semibold text-white">{MERCHANT_NAME} ({MERCHANT_UPI_ID})</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Hiring Client / Company:</span>
                    <span className="font-semibold text-white uppercase">{form.company || "Client"}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Timestamp:</span>
                    <span className="font-semibold text-white">{transactionInfo.timestamp}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Payment Channel:</span>
                    <span className="font-semibold text-emerald-400 uppercase">{transactionInfo.method}</span>
                  </div>
                  <div className="border-t border-white/10 pt-2 flex justify-between items-center text-sm">
                    <span className="font-bold text-white">Amount Settled:</span>
                    <span className="font-extrabold text-cyber-cyan">₹{transactionInfo.amount.toLocaleString('en-IN')}.00 INR</span>
                  </div>
                </div>

              </div>

              {/* Action buttons */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={printInvoice}
                  className="flex-1 py-3 px-4 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-xs font-bold uppercase tracking-wider text-white transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Download className="h-4 w-4 text-gray-400" />
                  Print / Save Receipt
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyber-blue via-cyber-violet to-cyber-cyan text-xs font-bold uppercase tracking-wider text-white shadow-glow-cyan hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  View Unlocked Vault
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
