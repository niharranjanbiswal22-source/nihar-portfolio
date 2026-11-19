import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUp, Github, Linkedin, Mail, ShieldCheck, 
  FileText, Lock, Scale, RefreshCw, Truck, Info, 
  X, Phone, ExternalLink, CheckCircle2
} from 'lucide-react';

const POLICY_TABS = [
  { id: 'terms', label: 'Terms & Conditions', icon: Scale },
  { id: 'privacy', label: 'Privacy Policy', icon: Lock },
  { id: 'refund', label: 'Refund Policy', icon: RefreshCw },
  { id: 'shipping', label: 'Shipping & Delivery', icon: Truck },
  { id: 'contact', label: 'Merchant Info', icon: Info },
];

const POLICIES = {
  terms: {
    title: "Terms & Conditions",
    badge: "Official Terms",
    lastUpdated: "January 2026",
    content: (
      <div className="space-y-5 text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <p>
          Welcome to the personal portfolio and digital store of <strong>Nihar Ranjan Biswal</strong> (<span className="text-blue-600 dark:text-cyan-400 font-medium">niharbiswal.vercel.app</span>). By accessing this site, purchasing digital products (study notes, source code), or booking developer services, you agree to these Terms and Conditions.
        </p>

        <div className="space-y-2">
          <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-cyan-400" />
            1. Digital Products License
          </h4>
          <p>
            All study notes (PDFs), project source code repositories (ZIP archives), and architecture diagrams are the intellectual property of Nihar Ranjan Biswal.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-500 dark:text-slate-400 text-xs">
            <li><strong>Personal & Developer Use:</strong> You are granted a non-exclusive, perpetual license to use purchased source codes and notes for learning, personal practice, and client development.</li>
            <li><strong>Resale Prohibited:</strong> Direct resale, redistribution, or public re-hosting of raw downloadable packages without explicit written consent is strictly prohibited.</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-cyan-400" />
            2. Payment Processing & Gateway
          </h4>
          <p>
            Payments are securely routed via certified third-party processors—primarily <strong>Razorpay</strong> (supporting UPI, Cards, NetBanking, and Wallets) and <strong>TRC-20 Blockchain Network</strong> (for USDT transactions). No credit card numbers, CVVs, or banking PINs are ever collected or stored on our servers.
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-cyan-400" />
            3. Disclaimer of Warranties
          </h4>
          <p>
            Educational notes and codebases are provided "as-is" with industry best-practice testing. The developer is not liable for indirect damages, third-party hosting downtimes (e.g. Vercel, Render, AWS), or misconfigurations in user environments.
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-cyan-400" />
            4. Jurisdiction & Governing Law
          </h4>
          <p>
            These terms are governed in accordance with the laws of <strong>India</strong>. Any legal dispute shall fall under the jurisdiction of the competent courts in <strong>Bhubaneswar, Odisha</strong>.
          </p>
        </div>
      </div>
    )
  },
  privacy: {
    title: "Privacy Policy",
    badge: "Data Protection",
    lastUpdated: "January 2026",
    content: (
      <div className="space-y-5 text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <p>
          We respect your privacy. This policy outlines how information is collected, protected, and used when you visit this website or complete a purchase.
        </p>

        <div className="space-y-2">
          <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-cyan-400" />
            1. Information We Collect
          </h4>
          <p>We only collect details voluntarily provided by you:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-500 dark:text-slate-400 text-xs">
            <li><strong>Contact Information:</strong> Name, email address, and optional phone number when submitting contact forms or receiving digital goods.</li>
            <li><strong>Payment Records:</strong> Transaction reference IDs, timestamp, and product purchased (processed securely by Razorpay).</li>
            <li><strong>Telemetry:</strong> Standard anonymized visit logs (device type, browser version) to ensure responsive performance.</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-cyan-400" />
            2. How Information Is Used
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-slate-500 dark:text-slate-400 text-xs">
            <li>Delivering purchased code repositories and study notes to your email.</li>
            <li>Answering developer inquiries and discussing project engagements.</li>
            <li>Issuing payment receipts and verifying genuine download requests.</li>
          </ul>
        </div>

        <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/60 dark:bg-blue-950/30 text-xs space-y-1">
          <div className="font-bold text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-cyan-400" />
            <span>Strict Zero Data Selling Guarantee</span>
          </div>
          <p className="text-slate-600 dark:text-slate-300">
            We never sell, rent, or trade your email address or personal details to advertisers, spammers, or third-party marketing companies.
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-cyan-400" />
            3. Security Protocols
          </h4>
          <p>
            All browser-to-server traffic is encrypted using standard <strong>256-bit SSL encryption</strong>. Gateway transactions are handled under PCI-DSS Level 1 compliant infrastructure.
          </p>
        </div>
      </div>
    )
  },
  refund: {
    title: "Refund & Cancellation Policy",
    badge: "Buyer Protection",
    lastUpdated: "January 2026",
    content: (
      <div className="space-y-5 text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <p>
          We aim for complete satisfaction with all notes, source codes, and development consulting. Here is our straightforward refund process:
        </p>

        <div className="space-y-2">
          <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-cyan-400" />
            1. Digital Assets (Source Code & Study Notes)
          </h4>
          <p>
            Because digital items are delivered electronically immediately upon checkout, standard returns do not apply once downloaded. However, full refunds are issued under these circumstances:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-500 dark:text-slate-400 text-xs">
            <li><strong>Duplicate Charges:</strong> If a network error charges you multiple times for a single product, 100% of the duplicate charge is refunded immediately.</li>
            <li><strong>Defective or Inaccessible Files:</strong> If a downloaded file is damaged or corrupted and our support team is unable to deliver a functional copy within 24 hours.</li>
            <li><strong>Failed Delivery:</strong> If payment was debited but the download modal or receipt link failed to generate.</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-cyan-400" />
            2. Developer Consulting & Call Sessions
          </h4>
          <p>
            Cancellations requested at least <strong>24 hours prior</strong> to the scheduled consultation time receive a 100% full refund. Rescheduling is always free of cost.
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-cyan-400" />
            3. Processing & Timeline
          </h4>
          <p>
            Once approved, refunds are initiated within <strong>24 to 48 hours</strong> and settle back to your original source (Bank account, UPI, or Card via Razorpay) within <strong>5 to 7 business days</strong> depending on your bank's policy.
          </p>
        </div>

        <div className="space-y-1 text-xs">
          <p className="font-medium text-slate-800 dark:text-slate-200">To submit a refund request:</p>
          <p className="text-slate-600 dark:text-slate-400">
            Email <a href="mailto:niharranjanbiswal22@gmail.com" className="text-blue-600 dark:text-cyan-400 underline font-semibold">niharranjanbiswal22@gmail.com</a> with your Payment ID (e.g. <code>pay_...</code>) and we will respond within 24 hours.
          </p>
        </div>
      </div>
    )
  },
  shipping: {
    title: "Shipping & Digital Delivery",
    badge: "Instant Delivery",
    lastUpdated: "January 2026",
    content: (
      <div className="space-y-5 text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <p>
          All items offered on this platform—including handwritten developer notes, web templates, and full-stack software repositories—are <strong>100% digital goods</strong>.
        </p>

        <div className="space-y-2">
          <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-cyan-400" />
            1. Electronic Fulfillment Timeline
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-slate-500 dark:text-slate-400 text-xs">
            <li><strong>Instant Access:</strong> Immediately after payment authorization, the checkout interface presents a direct download and access button to retrieve your files.</li>
            <li><strong>Email Confirmation:</strong> A confirmation message containing your invoice and download link is dispatched to your provided email within <strong>1 to 5 minutes</strong>.</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-cyan-400" />
            2. Shipping Cost
          </h4>
          <p>
            Because all products are delivered digitally over the internet, shipping and packaging fees are <strong>FREE (₹0.00)</strong> across all orders.
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-cyan-400" />
            3. Physical Goods Clarification
          </h4>
          <p>
            No physical parcels, paper copies, or physical CD/DVD discs are dispatched to postal addresses. If you ever lose access to a downloaded file, email us with your order ID for a free re-dispatch.
          </p>
        </div>
      </div>
    )
  },
  contact: {
    title: "Merchant & Grievance Contact",
    badge: "Verified Details",
    lastUpdated: "January 2026",
    content: (
      <div className="space-y-5 text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <p>
          In accordance with the Information Technology Act and digital merchant standards, verified merchant contact and grievance details are provided below:
        </p>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] space-y-3 font-mono text-xs">
          <div className="flex flex-col sm:flex-row sm:justify-between border-b border-slate-200 dark:border-white/5 pb-2.5 gap-1">
            <span className="text-slate-500 dark:text-slate-400">Merchant / Proprietor:</span>
            <span className="font-bold text-slate-900 dark:text-white">Nihar Ranjan Biswal</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between border-b border-slate-200 dark:border-white/5 pb-2.5 gap-1">
            <span className="text-slate-500 dark:text-slate-400">Designation:</span>
            <span className="font-bold text-blue-600 dark:text-cyan-400">Software Engineer & Full-Stack Developer</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between border-b border-slate-200 dark:border-white/5 pb-2.5 gap-1">
            <span className="text-slate-500 dark:text-slate-400">Email:</span>
            <a href="mailto:niharranjanbiswal22@gmail.com" className="font-bold text-slate-900 dark:text-white underline">
              niharranjanbiswal22@gmail.com
            </a>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between border-b border-slate-200 dark:border-white/5 pb-2.5 gap-1">
            <span className="text-slate-500 dark:text-slate-400">Direct Phone:</span>
            <a href="tel:+919556637112" className="font-bold text-slate-900 dark:text-white">
              +91 95566 37112
            </a>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between border-b border-slate-200 dark:border-white/5 pb-2.5 gap-1">
            <span className="text-slate-500 dark:text-slate-400">Location:</span>
            <span className="text-slate-900 dark:text-white">Bhubaneswar, Odisha, India · PIN: 751024</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
            <span className="text-slate-500 dark:text-slate-400">Support Hours:</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">Mon – Sat: 9:00 AM – 8:00 PM IST</span>
          </div>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          For technical inquiries, order support, or grievance escalation, please contact directly via email or phone. All messages receive a response within 24 business hours.
        </p>
      </div>
    )
  }
};

export default function Footer() {
  const [activePolicy, setActivePolicy] = useState(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <footer className="relative border-t border-slate-200/80 dark:border-white/10 bg-slate-50/80 dark:bg-[#060913] text-slate-700 dark:text-slate-300 transition-colors overflow-hidden">
        
        {/* Subtle Ambient Top Border Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-px bg-gradient-to-r from-transparent via-blue-500/30 dark:via-cyan-400/30 to-transparent pointer-events-none" />

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-14 pb-10">
          
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-slate-200/80 dark:border-white/10">
            
            {/* Column 1: Identity & Bio (5 cols) */}
            <div className="md:col-span-5 space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow-md shadow-blue-500/20 shrink-0">
                  NRB
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                    Nihar Ranjan Biswal
                  </h3>
                  <p className="text-xs font-mono font-medium text-blue-600 dark:text-cyan-400">
                    Full-Stack Developer & Software Engineer
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
                MCA graduate from Bhubaneswar with real-world development experience at NIELIT. Building responsive web applications, modern APIs, and clean software architectures.
              </p>

              {/* Status Indicator */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 text-[11px] font-medium text-emerald-700 dark:text-emerald-300">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>Open for Full-time Software Engineering roles</span>
              </div>
            </div>

            {/* Column 2: Navigation Links (2 cols) */}
            <div className="md:col-span-2 space-y-2.5">
              <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-900 dark:text-white font-mono">
                Portfolio
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <li><a href="#about" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">About</a></li>
                <li><a href="#skills" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">Skills</a></li>
                <li><a href="#game-arena" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">Game Arena (Play)</a></li>
                <li><a href="#projects" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">Projects</a></li>
                <li><a href="#experience" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">Experience</a></li>
                <li><a href="#certifications" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">Certifications</a></li>
                <li><a href="#digital-store" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors text-blue-600 dark:text-cyan-400 font-medium">Digital Store (₹1)</a></li>
              </ul>
            </div>

            {/* Column 3: Legal & Store Policies (3 cols) */}
            <div className="md:col-span-3 space-y-2.5">
              <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-900 dark:text-white font-mono">
                Store Policies & Legal
              </h4>
              <ul className="space-y-1.5 text-xs">
                <li>
                  <button 
                    type="button" 
                    onClick={() => setActivePolicy('terms')} 
                    className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                  >
                    <Scale className="h-3.5 w-3.5 text-slate-400" />
                    <span>Terms & Conditions</span>
                  </button>
                </li>
                <li>
                  <button 
                    type="button" 
                    onClick={() => setActivePolicy('privacy')} 
                    className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                  >
                    <Lock className="h-3.5 w-3.5 text-slate-400" />
                    <span>Privacy Policy</span>
                  </button>
                </li>
                <li>
                  <button 
                    type="button" 
                    onClick={() => setActivePolicy('refund')} 
                    className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="h-3.5 w-3.5 text-slate-400" />
                    <span>Refund & Cancellation</span>
                  </button>
                </li>
                <li>
                  <button 
                    type="button" 
                    onClick={() => setActivePolicy('shipping')} 
                    className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                  >
                    <Truck className="h-3.5 w-3.5 text-slate-400" />
                    <span>Shipping & Delivery</span>
                  </button>
                </li>
                <li>
                  <button 
                    type="button" 
                    onClick={() => setActivePolicy('contact')} 
                    className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                  >
                    <Info className="h-3.5 w-3.5 text-slate-400" />
                    <span>Merchant Contact Info</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Direct Channels (2 cols) */}
            <div className="md:col-span-2 space-y-2.5">
              <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-900 dark:text-white font-mono">
                Contact Channels
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <li>
                  <a 
                    href="https://github.com/niharranjanbiswal22-source" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-2"
                  >
                    <Github className="h-3.5 w-3.5" />
                    <span>GitHub</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.linkedin.com/in/nihar-biswal95566n" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-2"
                  >
                    <Linkedin className="h-3.5 w-3.5" />
                    <span>LinkedIn</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:niharranjanbiswal22@gmail.com" 
                    className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-2"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span>Email</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="tel:+919556637112" 
                    className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-2"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    <span>+91 95566 37112</span>
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Authentic Trust & Compliance Bar */}
          <div className="py-5 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-200/80 dark:border-white/10 text-xs">
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1.5 font-medium text-slate-800 dark:text-slate-200">
                <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>Verified Merchant & 256-Bit SSL Protection</span>
              </div>
              <span className="hidden sm:inline text-slate-300 dark:text-white/10">•</span>
              <div className="flex items-center gap-2 text-[11px]">
                <span className="text-slate-500 dark:text-slate-400">Accepted:</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">UPI</span>
                <span>/</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">Cards</span>
                <span>/</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">NetBanking</span>
                <span>/</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">USDT</span>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/50 text-[11px] font-mono text-blue-700 dark:text-cyan-300 shrink-0">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span>Payments via Razorpay & Tron TRC-20</span>
            </div>

          </div>

          {/* Sub-Footer Copyright & Back to Top */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
            <div className="text-center sm:text-left space-y-0.5">
              <p>© {new Date().getFullYear()} Nihar Ranjan Biswal. All Rights Reserved.</p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                Bhubaneswar, Odisha, India · PIN: 751024
              </p>
            </div>

            <button
              onClick={scrollToTop}
              className="group px-3.5 py-2 rounded-xl border border-slate-200 dark:border-white/10 hover:border-blue-500 dark:hover:border-cyan-400 bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white transition-all cursor-pointer flex items-center gap-2 shadow-sm text-xs"
              aria-label="Scroll back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="h-3.5 w-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

        </div>

      </footer>

      {/* COMPREHENSIVE LEGAL & POLICY MODAL DIALOG */}
      <AnimatePresence>
        {activePolicy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 overflow-y-auto">
            {/* Darkened Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePolicy(null)}
              className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm"
            />

            {/* Modal Dialog Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              className="relative w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white shadow-2xl overflow-hidden z-10 my-auto flex flex-col max-h-[88vh]"
            >
              {/* Modal Header */}
              <div className="p-5 md:p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 shrink-0">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60 text-[10px] font-mono font-medium text-blue-700 dark:text-cyan-400 mb-1.5">
                      <span>{POLICIES[activePolicy]?.badge}</span>
                      <span>•</span>
                      <span>{POLICIES[activePolicy]?.lastUpdated}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                      {POLICIES[activePolicy]?.title}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActivePolicy(null)}
                    className="h-8 w-8 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                    aria-label="Close modal"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Interactive Policy Tabs to switch between policies easily */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {POLICY_TABS.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activePolicy === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActivePolicy(tab.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                          isActive
                            ? 'bg-blue-600 text-white shadow-sm font-semibold'
                            : 'bg-white dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                        }`}
                        style={isActive ? { color: '#ffffff' } : {}}
                      >
                        <Icon className="h-3 w-3" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Scrollable Policy Body */}
              <div className="p-6 md:p-8 overflow-y-auto flex-1 text-left space-y-4">
                {POLICIES[activePolicy]?.content}
              </div>

              {/* Modal Footer */}
              <div className="p-4 px-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 shrink-0">
                <span className="font-mono text-[11px]">Governing Law: India (Odisha)</span>
                <button
                  type="button"
                  onClick={() => setActivePolicy(null)}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-sm"
                  style={{ color: '#ffffff' }}
                >
                  Close Policy
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}