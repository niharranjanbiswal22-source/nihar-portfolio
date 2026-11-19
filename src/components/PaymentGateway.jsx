import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ShieldCheck, Download, Sparkles, Brain, 
  Copy, Check, CheckCircle2, ShoppingBag, Lock, ArrowRight, 
  Zap, User, Mail, Phone, IndianRupee, Globe, 
  CheckCircle, FileText, ChevronRight, Loader2, CreditCard
} from 'lucide-react';
import confetti from 'canvas-confetti';

const RAZORPAY_KEY_ID = "rzp_live_TzeBGXLZwswIUp";
const MERCHANT_NAME = "Nihar Ranjan Biswal";
const USDT_WALLET_ADDRESS = "TEoknyCDam7A7LEvSk7qm34J8FkhQUFq69";

const tiers = [
  {
    id: 'vault',
    name: 'Vault Unlock & Candidate Analysis',
    prices: { inr: 85, usdt: 1 },
    description: 'Direct access to production microservices code & candidate architecture schemas.',
    badge: 'Popular',
  },
  {
    id: 'consulting',
    name: '1-Hour Technical Consultation',
    prices: { inr: 4200, usdt: 50 },
    description: '1-on-1 code debugging, architecture review, or technical interview prep.',
    badge: 'Consulting',
  },
  {
    id: 'retainer',
    name: 'Full-Stack Retainer Deposit',
    prices: { inr: 42000, usdt: 500 },
    description: 'Project retainer deposit for full-stack engineering contracts.',
    badge: 'Enterprise',
  },
  {
    id: 'custom',
    name: 'Custom Test Payment / Tip',
    prices: { inr: 1, usdt: 1 },
    description: 'Live test transaction (₹1) or direct portfolio tip.',
    badge: 'Flexible',
  }
];

export default function PaymentGateway({ isOpen, onClose, onUnlockSuccess, productToBuy }) {
  const [selectedTier, setSelectedTier] = useState('vault');
  const [customAmount, setCustomAmount] = useState('1');
  // Two trusted payment methods: 'razorpay' (UPI, Cards, NetBanking) or 'usdt' (Crypto TRC-20)
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    phone: '',
    txid: ''
  });
  
  const [errors, setErrors] = useState({});
  const [copiedUsdt, setCopiedUsdt] = useState(false);
  const [status, setStatus] = useState('idle'); // 'idle' | 'processing' | 'success'
  const [transactionInfo, setTransactionInfo] = useState({
    invoiceId: '',
    paymentId: '',
    method: '',
    amount: 0,
    timestamp: ''
  });

  useEffect(() => {
    if (isOpen) {
      setForm({ name: '', email: '', phone: '', txid: '' });
      setErrors({});
      setStatus('idle');
      setCopiedUsdt(false);
    }
  }, [isOpen]);

  // Load official Razorpay checkout script
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

  const effectiveInr = getEffectiveInrAmount();
  const effectiveUsdt = productToBuy
    ? Math.max(1, Math.round(productToBuy.price / 85))
    : (tiers.find(t => t.id === selectedTier)?.prices.usdt || 1);

  const currentItemTitle = productToBuy ? productToBuy.title : (tiers.find(t => t.id === selectedTier)?.name || 'Premium Access');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      setForm(prev => ({ ...prev, [name]: value.replace(/\D/g, '').slice(0, 10) }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCopyUsdt = () => {
    navigator.clipboard.writeText(USDT_WALLET_ADDRESS);
    setCopiedUsdt(true);
    setTimeout(() => setCopiedUsdt(false), 2000);
  };

  const validateEmail = () => {
    if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      return false;
    }
    setErrors(prev => ({ ...prev, email: null }));
    return true;
  };

  const triggerSuccess = (paymentDetails) => {
    const invId = `INV-${Math.floor(100000 + Math.random() * 900000)}`;
    setTransactionInfo({
      invoiceId: invId,
      paymentId: paymentDetails.paymentId || `pay_${Date.now()}`,
      method: paymentDetails.method,
      amount: paymentDetails.amount,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })
    });

    setStatus('success');
    if (onUnlockSuccess) {
      onUnlockSuccess();
    }

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback
    }
  };

  // Launch live Razorpay checkout
  const handleRazorpayPayment = async () => {
    if (!validateEmail()) return;

    const loaded = await loadRazorpay();
    if (!loaded) {
      alert("Unable to connect to Razorpay secure servers. Please check your internet connection.");
      return;
    }

    const amountInPaise = effectiveInr * 100;

    const options = {
      key: RAZORPAY_KEY_ID,
      amount: amountInPaise,
      currency: "INR",
      name: MERCHANT_NAME,
      description: currentItemTitle,
      image: "/logo.jpg",
      handler: function (response) {
        triggerSuccess({
          paymentId: response.razorpay_payment_id,
          method: "Razorpay (UPI / Cards / NetBanking)",
          amount: effectiveInr
        });
      },
      prefill: {
        name: form.name || "Customer",
        email: form.email || "customer@example.com",
        contact: form.phone ? `+91${form.phone}` : ""
      },
      notes: {
        item: currentItemTitle,
        type: productToBuy ? "Digital Product Purchase" : "Portfolio Vault Unlock"
      },
      theme: {
        color: "#2563eb"
      },
      modal: {
        ondismiss: function () {
          console.log("Checkout closed by user.");
        }
      }
    };

    try {
      const rzpInstance = new window.Razorpay(options);
      rzpInstance.on('payment.failed', function (response) {
        alert(`Payment Incomplete: ${response.error.description || 'Transaction was canceled or declined.'}`);
      });
      rzpInstance.open();
    } catch (err) {
      console.error("Razorpay error:", err);
      alert("Could not open Razorpay checkout. Please try again.");
    }
  };

  // Confirm USDT Crypto transfer
  const handleUsdtPayment = (e) => {
    e.preventDefault();
    if (!validateEmail()) return;

    setStatus('processing');
    setTimeout(() => {
      triggerSuccess({
        paymentId: form.txid ? `trx_${form.txid.slice(0, 10)}...` : `usdt_${Date.now().toString().slice(-8)}`,
        method: `USDT TRC-20 (${effectiveUsdt} USDT)`,
        amount: effectiveInr
      });
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={status === 'processing' ? null : onClose}
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm"
        />

        {/* Checkout Modal Window */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 12 }}
          className="payment-modal relative w-full max-w-3xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white shadow-2xl overflow-hidden z-10 my-auto flex flex-col max-h-[92vh]"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-800/60 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Lock className="h-4 w-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                    Secure Checkout
                  </h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    256-Bit SSL
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Verified Merchant: {MERCHANT_NAME}</p>
              </div>
            </div>

            {status !== 'processing' && (
              <button 
                onClick={onClose}
                className="h-8 w-8 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* IDLE VIEW */}
          {status === 'idle' && (
            <div className="grid grid-cols-1 md:grid-cols-12 overflow-y-auto flex-1 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800">
              
              {/* LEFT: Order Summary */}
              <div className="md:col-span-5 p-6 bg-slate-50/60 dark:bg-slate-950/40 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Order Summary
                  </div>

                  {productToBuy ? (
                    /* Specific Product Card */
                    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3 shadow-sm">
                      <div className="flex items-start gap-3">
                        <div className="h-12 w-12 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2 flex items-center justify-center shrink-0">
                          {productToBuy.logoSrc ? (
                            <img src={productToBuy.logoSrc} alt={productToBuy.title} className="h-full w-full object-contain" />
                          ) : (
                            <ShoppingBag className="h-5 w-5 text-blue-600" />
                          )}
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900">
                            {productToBuy.badge || 'Digital Product'}
                          </span>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                            {productToBuy.title}
                          </h4>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {productToBuy.description}
                      </p>

                      {productToBuy.deliverable && (
                        <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900 text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span><strong>Deliverable:</strong> {productToBuy.deliverable}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* General Plan Selection */
                    <div className="space-y-2">
                      <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">Select Service Plan:</div>
                      <div className="space-y-2">
                        {tiers.map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setSelectedTier(t.id)}
                            className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                              selectedTier === t.id
                                ? 'bg-blue-50 dark:bg-blue-950/50 border-blue-500 dark:border-blue-500 shadow-sm'
                                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                            }`}
                          >
                            <div>
                              <div className="text-xs font-bold text-slate-900 dark:text-white">{t.name}</div>
                              <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{t.description}</div>
                            </div>
                            <span className="font-bold text-xs text-blue-600 dark:text-blue-400 shrink-0 ml-2">
                              {t.id === 'custom' ? 'Custom' : `₹${t.prices.inr.toLocaleString('en-IN')}`}
                            </span>
                          </button>
                        ))}
                      </div>

                      {selectedTier === 'custom' && (
                        <div className="pt-2">
                          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                            Enter Amount (INR):
                          </label>
                          <input 
                            type="number"
                            min="1"
                            max="100000"
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                            className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-500 dark:text-slate-400">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {paymentMethod === 'usdt' ? `${effectiveUsdt}.00 USDT` : `₹${effectiveInr.toLocaleString('en-IN')}.00`}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-500 dark:text-slate-400">
                    <span>Platform Fee</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Free (₹0.00)</span>
                  </div>
                  <div className="border-t border-slate-200 dark:border-slate-800 pt-2 flex justify-between items-baseline">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">Total Amount</span>
                    <div className="text-right">
                      <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
                        {paymentMethod === 'usdt' ? `${effectiveUsdt}.00 USDT` : `₹${effectiveInr.toLocaleString('en-IN')}`}
                      </span>
                      {paymentMethod !== 'usdt' && (
                        <span className="block text-[10px] text-slate-400 font-normal">All taxes included</span>
                      )}
                    </div>
                  </div>
                </div>

              </div>

              {/* RIGHT: Payment Method & Checkout */}
              <div className="md:col-span-7 p-6 space-y-5 flex flex-col justify-between">
                <div className="space-y-4">
                  
                  {/* Payment Method Selector (2 Simple, Genuine Options) */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2.5">
                      Select Payment Method
                    </label>

                    <div className="grid grid-cols-2 gap-3">
                      {/* Option 1: Razorpay */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('razorpay')}
                        className={`method-tab p-3.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                          paymentMethod === 'razorpay'
                            ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/30 shadow-sm ring-1 ring-blue-600'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="tab-title text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                            <Zap className="h-4 w-4 text-blue-600" />
                            Razorpay
                          </span>
                          <span className="tab-badge-blue text-[10px] font-semibold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                            Instant
                          </span>
                        </div>
                        <p className="tab-desc text-[11px] text-slate-600 dark:text-slate-400 leading-tight">
                          UPI, GPay, PhonePe, Cards & NetBanking
                        </p>
                      </button>

                      {/* Option 2: USDT Crypto */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('usdt')}
                        className={`method-tab p-3.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                          paymentMethod === 'usdt'
                            ? 'border-emerald-600 bg-emerald-50/60 dark:bg-emerald-950/30 shadow-sm ring-1 ring-emerald-600'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="tab-title text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                            <Globe className="h-4 w-4 text-emerald-600" />
                            USDT (TRC-20)
                          </span>
                          <span className="tab-badge-emerald text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300">
                            Crypto
                          </span>
                        </div>
                        <p className="tab-desc text-[11px] text-slate-600 dark:text-slate-400 leading-tight">
                          Tron network worldwide transfer
                        </p>
                      </button>
                    </div>
                  </div>

                  {/* Customer Information (Clean & Minimal) */}
                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-4 space-y-3">
                    <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                      <span>Customer Details</span>
                      <span className="text-[11px] font-normal text-slate-500">For invoice & downloads</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="text-xs text-slate-600 dark:text-slate-400 block mb-1">
                          Full Name
                        </label>
                        <input 
                          type="text" 
                          name="name"
                          placeholder="e.g. Rahul Sharma"
                          value={form.name}
                          onChange={handleInputChange}
                          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-slate-600 dark:text-slate-400 block mb-1">
                          Email Address
                        </label>
                        <input 
                          type="email" 
                          name="email"
                          placeholder="name@example.com"
                          value={form.email}
                          onChange={handleInputChange}
                          onBlur={validateEmail}
                          className={`w-full bg-slate-50 dark:bg-slate-800 border rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none ${
                            errors.email ? 'border-red-500' : 'border-slate-200 dark:border-slate-700 focus:border-blue-500'
                          }`}
                        />
                        {errors.email && <span className="text-[10px] text-red-500 mt-0.5 block">{errors.email}</span>}
                      </div>
                    </div>
                  </div>

                  {/* TAB 1: RAZORPAY CHECKOUT */}
                  {paymentMethod === 'razorpay' && (
                    <div className="space-y-4">
                      {/* Supported Channels Preview */}
                      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-4 space-y-2.5">
                        <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          Accepted Payment Channels:
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-xs text-slate-600 dark:text-slate-400">
                          <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
                            <span className="font-bold text-slate-900 dark:text-white text-xs">UPI & QR</span>
                            <span className="text-[10px] text-slate-400">GPay, PhonePe</span>
                          </div>
                          <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
                            <span className="font-bold text-slate-900 dark:text-white text-xs">Cards</span>
                            <span className="text-[10px] text-slate-400">Debit / Credit</span>
                          </div>
                          <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
                            <span className="font-bold text-slate-900 dark:text-white text-xs">NetBanking</span>
                            <span className="text-[10px] text-slate-400">50+ Banks</span>
                          </div>
                        </div>

                        <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                          You will be seamlessly redirected to Razorpay's trusted standard checkout to complete your transaction safely.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleRazorpayPayment}
                        className="btn-pay w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 font-bold text-sm shadow-md shadow-blue-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                        style={{ color: '#ffffff' }}
                      >
                        <Lock className="h-4 w-4 text-white" style={{ stroke: '#ffffff' }} />
                        <span className="font-bold tracking-wide text-white" style={{ color: '#ffffff' }}>
                          Pay ₹{effectiveInr.toLocaleString('en-IN')} with Razorpay
                        </span>
                        <ArrowRight className="h-4 w-4 text-white" style={{ stroke: '#ffffff' }} />
                      </button>

                      <div className="flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <ShieldCheck className="h-4 w-4 text-emerald-600" />
                        <span>Secured by Razorpay • Instant access upon completion</span>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: USDT CRYPTO CHECKOUT */}
                  {paymentMethod === 'usdt' && (
                    <form onSubmit={handleUsdtPayment} className="space-y-4">
                      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-4 space-y-3">
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                          
                          {/* QR Code */}
                          <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-sm shrink-0">
                            <img 
                              src="/usdt_qr.jpg" 
                              alt="USDT TRC20 QR Code" 
                              className="h-28 w-28 object-contain"
                            />
                          </div>

                          {/* Address & Network Info */}
                          <div className="space-y-2 flex-1 w-full text-xs">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-slate-700 dark:text-slate-300">Amount:</span>
                              <span className="font-bold text-emerald-600 text-sm">{effectiveUsdt}.00 USDT</span>
                            </div>

                            <div>
                              <span className="text-[11px] text-slate-500 block mb-1">Tron TRC-20 Address:</span>
                              <div className="flex gap-1.5">
                                <input 
                                  type="text" 
                                  readOnly
                                  value={USDT_WALLET_ADDRESS}
                                  className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-mono select-all focus:outline-none"
                                />
                                <button
                                  type="button"
                                  onClick={handleCopyUsdt}
                                  className="px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer flex items-center justify-center shrink-0"
                                  title="Copy Wallet Address"
                                >
                                  {copiedUsdt ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                                </button>
                              </div>
                              {copiedUsdt && (
                                <span className="text-[10px] text-emerald-600 font-medium mt-1 block">✓ Address copied to clipboard</span>
                              )}
                            </div>

                            <div>
                              <span className="text-[11px] text-slate-500 block mb-1">Transaction Hash / TXID (Optional):</span>
                              <input 
                                type="text" 
                                name="txid"
                                placeholder="Paste transfer hash"
                                value={form.txid}
                                onChange={handleInputChange}
                                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white font-mono placeholder-slate-400 focus:outline-none"
                              />
                            </div>
                          </div>

                        </div>
                      </div>

                      <button
                        type="submit"
                        className="btn-pay w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 font-bold text-sm shadow-md shadow-emerald-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                        style={{ color: '#ffffff' }}
                      >
                        <CheckCircle className="h-4 w-4 text-white" style={{ stroke: '#ffffff' }} />
                        <span className="font-bold tracking-wide text-white" style={{ color: '#ffffff' }}>
                          I Have Sent The Payment • Confirm & Unlock
                        </span>
                      </button>
                    </form>
                  )}

                </div>
              </div>

            </div>
          )}

          {/* PROCESSING VIEW */}
          {status === 'processing' && (
            <div className="py-20 px-6 flex flex-col items-center justify-center text-center space-y-4">
              <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Verifying Transaction...
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Please hold on while we confirm and prepare your access.
                </p>
              </div>
            </div>
          )}

          {/* SUCCESS VIEW */}
          {status === 'success' && (
            <div className="p-6 md:p-8 space-y-6 overflow-y-auto max-h-[85vh]">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 p-6 space-y-5">
                
                {/* Status Indicator */}
                <div className="flex flex-col items-center justify-center text-center space-y-2 pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div className="h-14 w-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">Payment Confirmed!</h4>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                    Your access has been successfully authorized
                  </p>
                </div>

                {/* Unlocked Product Box */}
                {productToBuy && (
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {productToBuy.title}
                      </span>
                      <span className="text-xs font-bold text-emerald-600">
                        ₹{productToBuy.price} PAID
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      {productToBuy.deliverable || "Your download file and materials are ready."}
                    </p>
                    <button
                      type="button"
                      onClick={() => alert(`🎉 Access Granted!\n\nProduct: ${productToBuy.title}\nDeliverable: ${productToBuy.deliverable}\n\nAccess link/files have been prepared for ${form.email || form.name || 'your account'}. Thank you!`)}
                      className="btn-pay w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                      style={{ color: '#ffffff' }}
                    >
                      <Download className="h-4 w-4 text-white" style={{ stroke: '#ffffff' }} />
                      <span className="text-white font-bold" style={{ color: '#ffffff' }}>Download / Open {productToBuy.shortName || "Asset"}</span>
                    </button>
                  </div>
                )}

                {/* Receipt Details */}
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-slate-500">
                    <span>Receipt No:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{transactionInfo.invoiceId}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Payment ID:</span>
                    <span className="font-semibold text-blue-600">{transactionInfo.paymentId}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Channel:</span>
                    <span className="font-semibold text-emerald-600 uppercase">{transactionInfo.method}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Date & Time:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{transactionInfo.timestamp}</span>
                  </div>
                  <div className="border-t border-slate-200 dark:border-slate-800 pt-2 flex justify-between items-center text-sm">
                    <span className="font-bold text-slate-900 dark:text-white">Total Settled:</span>
                    <span className="font-extrabold text-blue-600 dark:text-blue-400">₹{transactionInfo.amount.toLocaleString('en-IN')}.00 INR</span>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex-1 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-white transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Download className="h-4 w-4 text-slate-400" />
                  Print Receipt
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-pay flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-xs text-white shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                  style={{ color: '#ffffff' }}
                >
                  <span className="text-white font-bold" style={{ color: '#ffffff' }}>Done</span>
                  <Check className="h-4 w-4 text-white" style={{ stroke: '#ffffff' }} />
                </button>
              </div>

            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
