import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, Landmark, Check, ArrowLeft, 
  Copy, CheckCircle2, CreditCard, Lock,
  ChevronRight, Printer, Download
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

const BANK_DETAILS = {
  accountTitle: "Agency Name / Syed Ali",
  accountNumber: "0000 0000 0000 00",
  iban: "PK00 HBL 0000 0000 0000 0000",
  bankName: "HBL (Habib Bank Limited)",
  branch: "Main Branch, Karachi",
  swift: "HBLPKKA"
};

export default function CheckoutPage({ plan, interval, onBack }) {
  const [copied, setCopied] = useState(null);
  const [step, setStep] = useState(1);
  const [txId] = useState(`TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);

  const amount = interval === 'yearly' ? plan.price.yearly : plan.price.monthly;

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0B1020] text-white font-sans selection:bg-accent-cyan/30">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-cyan/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-purple/5 rounded-full blur-[120px]" />
      </div>

      {/* Nav */}
      <nav className="relative z-50 border-b border-white/10 bg-primary-950/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-bold uppercase tracking-wider">Cancel</span>
          </button>
          
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} className="text-accent-cyan" />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-white/40">Secure Checkout</span>
          </div>

          <div className="w-20" /> {/* Spacer */}
        </div>
      </nav>

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-12 lg:py-20">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          
          {/* Left: Summary */}
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-4 border-b border-white/5">
                  <div>
                    <h3 className="font-bold text-lg">{plan.name} Plan</h3>
                    <p className="text-sm text-white/40 capitalize">{interval} Billing</p>
                  </div>
                  <span className="text-2xl font-bold">${amount}</span>
                </div>
                
                <div className="space-y-2 py-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Subtotal</span>
                    <span className="text-white/80">${amount}.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Processing Fee</span>
                    <span className="text-accent-green font-bold">FREE</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-white/10">
                  <span className="font-bold">Total Amount</span>
                  <span className="text-3xl font-black text-accent-cyan">${amount}.00</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-accent-cyan/5 border border-accent-cyan/10 flex items-start gap-4">
              <Lock size={20} className="text-accent-cyan shrink-0 mt-1" />
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Deep Level Encryption</h4>
                <p className="text-xs text-white/40 leading-relaxed">Your payment details are protected by 256-bit AES encryption and secure bank-level protocols.</p>
              </div>
            </div>
          </div>

          {/* Right: Payment Method */}
          <div className="lg:col-span-3 space-y-8">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 text-accent-cyan">
                  <Landmark size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Secure Bank Transfer</h2>
                  <p className="text-white/40 text-sm">Official HBL Agency Account Details</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-2 block">Reference Number</span>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black text-accent-cyan">{txId}</span>
                      <button onClick={() => copyToClipboard(txId, 'tx')} className="text-white/20 hover:text-white transition-colors">
                        {copied === 'tx' ? <Check size={14} /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-2 block">Bank Name</span>
                    <span className="text-sm font-bold">{BANK_DETAILS.bankName}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { label: 'Account Title', value: BANK_DETAILS.accountTitle, key: 'title' },
                    { label: 'Account Number', value: BANK_DETAILS.accountNumber, key: 'num' },
                    { label: 'IBAN', value: BANK_DETAILS.iban, key: 'iban' },
                    { label: 'Swift Code', value: BANK_DETAILS.swift, key: 'swift' }
                  ].map((item) => (
                    <div key={item.key} className="group relative p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-accent-cyan/30 transition-all">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-1 block">{item.label}</span>
                          <span className="text-base font-bold text-white tracking-wide">{item.value}</span>
                        </div>
                        <button 
                          onClick={() => copyToClipboard(item.value, item.key)}
                          className={`p-2.5 rounded-xl transition-all ${
                            copied === item.key 
                              ? 'bg-accent-green/20 text-accent-green' 
                              : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          {copied === item.key ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-white/5">
                  <h4 className="text-sm font-bold mb-4 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
                    Next Steps
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex gap-3 text-xs text-white/50 leading-relaxed">
                      <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-[10px] font-bold">1</div>
                      <span>Make the transfer of <b>${amount}.00</b> using the details above.</span>
                    </li>
                    <li className="flex gap-3 text-xs text-white/50 leading-relaxed">
                      <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-[10px] font-bold">2</div>
                      <span>Keep the transaction screenshot or receipt safe.</span>
                    </li>
                    <li className="flex gap-3 text-xs text-white/50 leading-relaxed">
                      <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-[10px] font-bold">3</div>
                      <span>Send the receipt to <b>payments@novaspark.com</b> with Ref: <b>{txId}</b></span>
                    </li>
                  </ul>
                </div>

                <button 
                  onClick={() => window.print()}
                  className="w-full py-4 rounded-2xl bg-white text-primary-950 font-black uppercase tracking-widest text-sm hover:bg-accent-cyan transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(0,245,255,0.3)]"
                >
                  Print Payment Instructions
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
