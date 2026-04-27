"use client";

import React, { useState } from "react";
import { 
  SettingsPanel, 
  SettingsField, 
  settingsControlClass,
  SettingsToggleRow 
} from "@/components/templates/SettingsLayout";
import { Button } from "@/components/atoms/Button";
import { CreditCard, Wallet, Smartphone, Landmark, Palette, Globe, Layout, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { PAYMENT_METHODS } from "@/lib/paymentConfigs";

const CURRENCIES = [
  { code: "USD", name: "United States Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CHF", name: "Swiss Franc", symbol: "Fr" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ" },
  { code: "AFN", name: "Afghan Afghani", symbol: "؋" },
  { code: "ALL", name: "Albanian Lek", symbol: "L" },
  { code: "AMD", name: "Armenian Dram", symbol: "֏" },
  { code: "ANG", name: "Netherlands Antillean Guilder", symbol: "ƒ" },
  { code: "AOA", name: "Angolan Kwanza", symbol: "Kz" },
  { code: "ARS", name: "Argentine Peso", symbol: "$" },
  { code: "AWG", name: "Aruban Florin", symbol: "ƒ" },
  { code: "AZN", name: "Azerbaijani Manat", symbol: "₼" },
  { code: "BAM", name: "Bosnia-Herzegovina Convertible Mark", symbol: "KM" },
  { code: "BBD", name: "Barbadian Dollar", symbol: "$" },
  { code: "BDT", name: "Bangladeshi Taka", symbol: "৳" },
  { code: "BGN", name: "Bulgarian Lev", symbol: "лв" },
  { code: "BHD", name: "Bahraini Dinar", symbol: ".د.ب" },
  { code: "BIF", name: "Burundian Franc", symbol: "FBu" },
  { code: "BMD", name: "Bermudan Dollar", symbol: "$" },
  { code: "BND", name: "Brunei Dollar", symbol: "$" },
  { code: "BOB", name: "Bolivian Boliviano", symbol: "$b" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$" },
  { code: "BSD", name: "Bahamian Dollar", symbol: "$" },
  { code: "BTN", name: "Bhutanese Ngultrum", symbol: "Nu." },
  { code: "BWP", name: "Botswanan Pula", symbol: "P" },
  { code: "BYN", name: "Belarusian Ruble", symbol: "Br" },
  { code: "BZD", name: "Belize Dollar", symbol: "BZ$" },
  { code: "CDF", name: "Congolese Franc", symbol: "FC" },
  { code: "CLP", name: "Chilean Peso", symbol: "$" },
  { code: "COP", name: "Colombian Peso", symbol: "$" },
  { code: "CRC", name: "Costa Rican Colón", symbol: "₡" },
  { code: "CUP", name: "Cuban Peso", symbol: "₱" },
  { code: "CVE", name: "Cape Verdean Escudo", symbol: "$" },
  { code: "CZK", name: "Czech Koruna", symbol: "Kč" },
  { code: "DJF", name: "Djiboutian Franc", symbol: "Fdj" },
  { code: "DKK", name: "Danish Krone", symbol: "kr" },
  { code: "DOP", name: "Dominican Peso", symbol: "RD$" },
  { code: "DZD", name: "Algerian Dinar", symbol: "دج" },
  { code: "EGP", name: "Egyptian Pound", symbol: "£" },
  { code: "ERN", name: "Eritrean Nakfa", symbol: "Nfk" },
  { code: "ETB", name: "Ethiopian Birr", symbol: "Br" },
  { code: "FJD", name: "Fijian Dollar", symbol: "$" },
  { code: "FKP", name: "Falkland Islands Pound", symbol: "£" },
  { code: "GEL", name: "Georgian Lari", symbol: "₾" },
  { code: "GHS", name: "Ghanaian Cedi", symbol: "GH₵" },
  { code: "GIP", name: "Gibraltar Pound", symbol: "£" },
  { code: "GMD", name: "Gambian Dalasi", symbol: "D" },
  { code: "GNF", name: "Guinean Franc", symbol: "FG" },
  { code: "GTQ", name: "Guatemalan Quetzal", symbol: "Q" },
  { code: "GYD", name: "Guyanaese Dollar", symbol: "$" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$" },
  { code: "HNL", name: "Honduran Lempira", symbol: "L" },
  { code: "HRK", name: "Croatian Kuna", symbol: "kn" },
  { code: "HTG", name: "Haitian Gourde", symbol: "G" },
  { code: "HUF", name: "Hungarian Forint", symbol: "Ft" },
  { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp" },
  { code: "ILS", name: "Israeli New Shekel", symbol: "₪" },
  { code: "IQD", name: "Iraqi Dinar", symbol: "ع.د" },
  { code: "IRR", name: "Iranian Rial", symbol: "﷼" },
  { code: "ISK", name: "Icelandic Króna", symbol: "kr" },
  { code: "JMD", name: "Jamaican Dollar", symbol: "J$" },
  { code: "JOD", name: "Jordanian Dinar", symbol: "JD" },
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh" },
  { code: "KGS", name: "Kyrgystani Som", symbol: "лв" },
  { code: "KHR", name: "Cambodian Riel", symbol: "៛" },
  { code: "KMF", name: "Comorian Franc", symbol: "CF" },
  { code: "KPW", name: "North Korean Won", symbol: "₩" },
  { code: "KRW", name: "South Korean Won", symbol: "₩" },
  { code: "KWD", name: "Kuwaiti Dinar", symbol: "KD" },
  { code: "KYD", name: "Cayman Islands Dollar", symbol: "$" },
  { code: "KZT", name: "Kazakhstani Tenge", symbol: "₸" },
  { code: "LAK", name: "Laotian Kip", symbol: "₭" },
  { code: "LBP", name: "Lebanese Pound", symbol: "£" },
  { code: "LKR", name: "Sri Lankan Rupee", symbol: "Rs" },
  { code: "LRD", name: "Liberian Dollar", symbol: "$" },
  { code: "LSL", name: "Lesotho Loti", symbol: "M" },
  { code: "LYD", name: "Libyan Dinar", symbol: "LD" },
  { code: "MAD", name: "Moroccan Dirham", symbol: "MAD" },
  { code: "MDL", name: "Moldovan Leu", symbol: "lei" },
  { code: "MGA", name: "Malagasy Ariary", symbol: "Ar" },
  { code: "MKD", name: "Macedonian Denar", symbol: "den" },
  { code: "MMK", name: "Myanmar Kyat", symbol: "K" },
  { code: "MNT", name: "Mongolian Tugrik", symbol: "₮" },
  { code: "MOP", name: "Macanese Pataca", symbol: "MOP$" },
  { code: "MRO", name: "Mauritanian Ouguiya", symbol: "UM" },
  { code: "MUR", name: "Mauritian Rupee", symbol: "Rs" },
  { code: "MVR", name: "Maldivian Rufiyaa", symbol: "Rf" },
  { code: "MWK", name: "Malawian Kwacha", symbol: "MK" },
  { code: "MXN", name: "Mexican Peso", symbol: "$" },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM" },
  { code: "MZN", name: "Mozambican Metical", symbol: "MT" },
  { code: "NAD", name: "Namibian Dollar", symbol: "$" },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦" },
  { code: "NIO", name: "Nicaraguan Córdoba", symbol: "C$" },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr" },
  { code: "NPR", name: "Nepalese Rupee", symbol: "Rs" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "$" },
  { code: "OMR", name: "Omani Rial", symbol: "﷼" },
  { code: "PAB", name: "Panamanian Balboa", symbol: "B/." },
  { code: "PEN", name: "Peruvian Sol", symbol: "S/." },
  { code: "PGK", name: "Papua New Guinean Kina", symbol: "K" },
  { code: "PHP", name: "Philippine Peso", symbol: "₱" },
  { code: "PKR", name: "Pakistani Rupee", symbol: "Rs" },
  { code: "PLN", name: "Polish Zloty", symbol: "zł" },
  { code: "PYG", name: "Paraguayan Guarani", symbol: "Gs" },
  { code: "QAR", name: "Qatari Rial", symbol: "﷼" },
  { code: "RON", name: "Romanian Leu", symbol: "lei" },
  { code: "RSD", name: "Serbian Dinar", symbol: "Дин." },
  { code: "RUB", name: "Russian Ruble", symbol: "₽" },
  { code: "RWF", name: "Rwandan Franc", symbol: "R₣" },
  { code: "SAR", name: "Saudi Riyal", symbol: "﷼" },
  { code: "SBD", name: "Solomon Islands Dollar", symbol: "$" },
  { code: "SCR", name: "Seychellois Rupee", symbol: "Rs" },
  { code: "SDG", name: "Sudanese Pound", symbol: "£" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
  { code: "SHP", name: "St. Helena Pound", symbol: "£" },
  { code: "SLL", name: "Sierra Leonean Leone", symbol: "Le" },
  { code: "SOS", name: "Somali Shilling", symbol: "S" },
  { code: "SRD", name: "Surinamese Dollar", symbol: "$" },
  { code: "SSP", name: "South Sudanese Pound", symbol: "£" },
  { code: "STD", name: "São Tomé & Príncipe Dobra", symbol: "Db" },
  { code: "SVC", name: "Salvadoran Colón", symbol: "$" },
  { code: "SYP", name: "Syrian Pound", symbol: "£" },
  { code: "SZL", name: "Swazi Lilangeni", symbol: "L" },
  { code: "THB", name: "Thai Baht", symbol: "฿" },
  { code: "TJS", name: "Tajikistani Somoni", symbol: "SM" },
  { code: "TMT", name: "Turkmenistani Manat", symbol: "T" },
  { code: "TND", name: "Tunisian Dinar", symbol: "د.ت" },
  { code: "TOP", name: "Tongan Paʻanga", symbol: "T$" },
  { code: "TRY", name: "Turkish Lira", symbol: "₺" },
  { code: "TTD", name: "Trinidad & Tobago Dollar", symbol: "TT$" },
  { code: "TWD", name: "New Taiwan Dollar", symbol: "NT$" },
  { code: "TZS", name: "Tanzanian Shilling", symbol: "TSh" },
  { code: "UAH", name: "Ukrainian Hryvnia", symbol: "₴" },
  { code: "UGX", name: "Ugandan Shilling", symbol: "USh" },
  { code: "UYU", name: "Uruguayan Peso", symbol: "$U" },
  { code: "UZS", name: "Uzbekistani Som", symbol: "лв" },
  { code: "VEF", name: "Venezuelan Bolívar", symbol: "Bs" },
  { code: "VND", name: "Vietnamese Dong", symbol: "₫" },
  { code: "VUV", name: "Vanuatu Vatu", symbol: "VT" },
  { code: "WST", name: "Samoan Tala", symbol: "WS$" },
  { code: "XAF", name: "Central African CFA Franc", symbol: "FCFA" },
  { code: "XCD", name: "East Caribbean Dollar", symbol: "$" },
  { code: "XOF", name: "West African CFA Franc", symbol: "CFA" },
  { code: "XPF", name: "CFP Franc", symbol: "₣" },
  { code: "YER", name: "Yemeni Rial", symbol: "﷼" },
  { code: "ZAR", name: "South African Rand", symbol: "R" },
  { code: "ZMW", name: "Zambian Kwacha", symbol: "ZK" },
  { code: "ZWL", name: "Zimbabwean Dollar", symbol: "$" }
];

export default function PaymentsSettingsPage() {
  const [methods, setMethods] = useState<Record<string, boolean>>({
    cards: true,
    apple_pay: true,
    google_pay: true,
    bank_transfer: false,
    crypto: false,
    link: true,
  });

  const [appearance, setAppearance] = useState({
    primaryColor: "#2ACED1",
    accentColor: "#034E78",
    radius: "16px",
    font: "Inter",
    layout: "modern",
  });

  const [currency, setCurrency] = useState("USD");

  const toggle = (key: string) => {
    setMethods(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col gap-10 pb-20">
      {/* ─── Header ─── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-[#000C22] dark:text-white mb-2 tracking-tight">Payments Infrastructure</h1>
          <p className="text-sm font-medium text-[#000C22]/50 dark:text-[#D8F4F7]/50">Strategic configuration of payment rails, settlement architecture, and brand aesthetics.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#2ACED1] text-white font-bold text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-[#2ACED1]/20 active:scale-95">
           Commit Changes
        </button>
      </div>

      {/* ─── Checkout Studio ─── */}
      <div className="space-y-6">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#000C22]/40 dark:text-white/30 flex items-center gap-2 px-2">
           <Palette className="w-3.5 h-3.5 text-[#2ACED1]" /> Checkout Studio
        </h2>
        
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-10">
          {/* Controls */}
          <div className="p-10 rounded-[3rem] bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 space-y-12 shadow-sm">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                   <p className="text-[10px] font-bold uppercase tracking-widest text-[#2ACED1]">Visual Identity</p>
                   <div className="space-y-8">
                      <div>
                         <label className="text-xs font-bold text-[#000C22] dark:text-white/90 mb-3 block">Primary Theme Color</label>
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl shadow-xl border border-black/5 shrink-0" style={{ backgroundColor: appearance.primaryColor }} />
                            <input 
                              type="text" 
                              value={appearance.primaryColor} 
                              onChange={(e) => setAppearance({...appearance, primaryColor: e.target.value})}
                              className="flex-1 bg-black/[0.03] dark:bg-white/[0.03] border-none rounded-2xl px-5 py-3.5 text-xs font-mono font-bold dark:text-white outline-none focus:ring-2 ring-[#2ACED1]/20" 
                            />
                         </div>
                      </div>
                      <div>
                         <label className="text-xs font-bold text-[#000C22] dark:text-white/90 mb-3 block">Interface Radius</label>
                         <div className="flex items-center gap-6 p-1">
                            <input 
                              type="range" min="0" max="32" step="4" 
                              value={parseInt(appearance.radius)} 
                              onChange={(e) => setAppearance({...appearance, radius: e.target.value + "px"})}
                              className="flex-1 accent-[#2ACED1] h-1.5 rounded-full" 
                            />
                            <span className="text-[10px] font-mono font-bold text-[#2ACED1] bg-[#2ACED1]/10 px-3 py-1.5 rounded-lg">{appearance.radius}</span>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="space-y-6">
                   <p className="text-[10px] font-bold uppercase tracking-widest text-[#2ACED1]">User Experience</p>
                   <div className="space-y-8">
                      <div>
                         <label className="text-xs font-bold text-[#000C22] dark:text-white/90 mb-3 block">Checkout Architecture</label>
                         <div className="grid grid-cols-2 gap-4">
                            <button 
                              onClick={() => setAppearance({...appearance, layout: "modern"})}
                              className={`py-3.5 rounded-2xl border text-[9px] font-bold uppercase tracking-widest transition-all ${appearance.layout === "modern" ? "bg-[#2ACED1]/10 border-[#2ACED1] text-[#2ACED1] shadow-lg shadow-[#2ACED1]/5" : "border-black/5 dark:border-white/5 text-[#000C22]/30 hover:bg-black/[0.02]"}`}
                            >
                              Modern List
                            </button>
                            <button 
                              onClick={() => setAppearance({...appearance, layout: "classic"})}
                              className={`py-3.5 rounded-2xl border text-[9px] font-bold uppercase tracking-widest transition-all ${appearance.layout === "classic" ? "bg-[#2ACED1]/10 border-[#2ACED1] text-[#2ACED1] shadow-lg shadow-[#2ACED1]/5" : "border-black/5 dark:border-white/5 text-[#000C22]/30 hover:bg-black/[0.02]"}`}
                            >
                              Accordion
                            </button>
                         </div>
                      </div>
                      <div>
                         <label className="text-xs font-bold text-[#000C22] dark:text-white/90 mb-3 block">Typography System</label>
                         <select className="w-full bg-black/[0.03] dark:bg-white/[0.03] border-none rounded-2xl px-5 py-3.5 text-xs font-bold dark:text-white outline-none focus:ring-2 ring-[#2ACED1]/20">
                            <option>Inter (Modern Sans)</option>
                            <option>Outfit (Premium)</option>
                            <option>Roboto (Classic)</option>
                         </select>
                      </div>
                   </div>
                </div>
             </div>

             <div className="pt-10 border-t border-black/5 dark:border-white/5 grid grid-cols-1 md:grid-cols-2 gap-8">
                <SettingsToggleRow 
                  title="Biometric Express" 
                  description="Apple Pay & Google Pay optimization."
                  checked={true}
                  onToggle={() => {}}
                />
                <SettingsToggleRow 
                  title="Kopo Link" 
                  description="Auto-fill verified customer metadata."
                  checked={true}
                  onToggle={() => {}}
                />
             </div>
          </div>

          {/* Real-time Preview */}
          <div className="flex flex-col gap-6">
             <div className="p-10 rounded-[3rem] bg-black/[0.02] dark:bg-[#000C1A] border border-black/5 border-dashed flex flex-col items-center justify-center relative overflow-hidden group min-h-[500px]">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#2ACED1]/5 blur-[100px] pointer-events-none group-hover:bg-[#2ACED1]/10 transition-all duration-700" />
                
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#000C22]/20 dark:text-white/10 mb-8 relative z-10">Live Production Preview</p>
                
                <motion.div 
                  layout
                  className="w-full max-w-[340px] bg-white dark:bg-[#011B3B] shadow-2xl border border-black/5 overflow-hidden flex flex-col relative z-10"
                  style={{ borderRadius: appearance.radius }}
                >
                   <div className="px-8 py-6 border-b border-black/5 flex items-center justify-between bg-black/[0.01] dark:bg-white/[0.01]">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#2ACED1]/20" style={{ backgroundColor: appearance.primaryColor }}>
                         <Zap className="w-4 h-4 fill-current" />
                      </div>
                      <div className="text-right">
                         <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#000C22]/20 dark:text-white/20 block">Order Summary</span>
                         <span className="text-[10px] font-bold text-[#000C22]/60 dark:text-white/60">TXN-890123</span>
                      </div>
                   </div>
                   <div className="p-8 space-y-8">
                      <div className="space-y-1.5 text-center">
                        <p className="text-[10px] font-bold text-[#000C22]/30 dark:text-white/20 uppercase tracking-[0.2em]">Amount Due</p>
                        <p className="text-4xl font-bold text-[#000C22] dark:text-white tracking-tighter">
                           {CURRENCIES.find(c => c.code === currency)?.symbol || "$"}{(450.00).toLocaleString()}
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                         <div className="space-y-2">
                            <label className="text-[9px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-white/30 ml-1">Card Credentials</label>
                            <div className="h-14 w-full bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 flex items-center px-5 gap-4" style={{ borderRadius: `calc(${appearance.radius} / 1.5)` }}>
                               <CreditCard className="w-5 h-5 text-[#2ACED1]" />
                               <span className="text-[11px] font-bold text-[#000C22]/40 dark:text-white/30 tracking-widest">•••• •••• •••• 4242</span>
                            </div>
                         </div>
                         <div className="flex gap-4">
                            <div className="h-14 flex-1 bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 flex items-center px-5" style={{ borderRadius: `calc(${appearance.radius} / 1.5)` }}>
                               <span className="text-[11px] font-bold text-[#000C22]/40 dark:text-white/30">MM / YY</span>
                            </div>
                            <div className="h-14 flex-1 bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 flex items-center px-5" style={{ borderRadius: `calc(${appearance.radius} / 1.5)` }}>
                               <span className="text-[11px] font-bold text-[#000C22]/40 dark:text-white/30">CVC</span>
                            </div>
                         </div>
                      </div>

                      <button 
                        className="w-full py-5 text-white text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl shadow-black/5 transition-all hover:opacity-90 active:scale-[0.98]"
                        style={{ backgroundColor: appearance.primaryColor, borderRadius: `calc(${appearance.radius} / 1.5)` }}
                      >
                         Pay with Network
                      </button>

                      <div className="flex items-center justify-center gap-2 pt-2">
                         <ShieldCheck className="w-3.5 h-3.5 text-emerald-500/50" />
                         <span className="text-[9px] font-bold uppercase text-[#000C22]/20 dark:text-white/20 tracking-widest">Enterprise Encrypted</span>
                      </div>
                   </div>
                </motion.div>
             </div>
          </div>
        </div>
      </div>

      {/* ─── Currency & Settlement ─── */}
      <div className="space-y-6">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#000C22]/40 dark:text-white/30 flex items-center gap-2 px-2">
           <Globe className="w-3.5 h-3.5 text-[#2ACED1]" /> Economic Architecture
        </h2>
        <div className="p-10 rounded-[3rem] bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-12">
           <div className="space-y-6">
              <div>
                 <label className="text-xs font-bold text-[#000C22] dark:text-white/90 mb-3 block">Base Settlement Asset</label>
                 <select 
                   value={currency}
                   onChange={(e) => setCurrency(e.target.value)}
                   className="w-full bg-black/[0.03] dark:bg-white/[0.03] border-none rounded-2xl px-5 py-4 text-xs font-bold dark:text-white outline-none focus:ring-2 ring-[#2ACED1]/20 appearance-none"
                 >
                    {CURRENCIES.map(c => (
                       <option key={c.code} value={c.code}>{c.code} — {c.name}</option>
                    ))}
                 </select>
                 <p className="text-[9px] text-[#000C22]/30 dark:text-white/20 mt-3 font-bold uppercase tracking-[0.15em] leading-relaxed">Default currency for primary treasury settlements.</p>
              </div>
           </div>
           <div className="space-y-6">
              <div>
                 <label className="text-xs font-bold text-[#000C22] dark:text-white/90 mb-3 block">Global Liquidity Pool</label>
                 <div className="flex items-center justify-between p-5 rounded-2xl bg-[#2ACED1]/5 border border-[#2ACED1]/10">
                    <div className="flex items-center gap-3">
                       <Zap className="w-4 h-4 text-[#2ACED1]" />
                       <span className="text-[10px] font-bold text-[#2ACED1] uppercase tracking-widest">Smart FX Active</span>
                    </div>
                    <button className="text-[9px] font-bold text-[#2ACED1] uppercase tracking-widest bg-white dark:bg-[#011B3B] px-4 py-2 rounded-xl shadow-sm">Protocol Settings</button>
                 </div>
                 <p className="text-[9px] text-[#000C22]/30 dark:text-white/20 mt-3 font-bold uppercase tracking-[0.15em] leading-relaxed">Dynamic conversion for 135+ assets at real-time market parity.</p>
              </div>
           </div>
        </div>
      </div>

      {/* ─── Payment Methods Grid ─── */}
      <div className="space-y-6">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#000C22]/40 dark:text-white/30 flex items-center gap-2 px-2">
           <Smartphone className="w-3.5 h-3.5 text-[#2ACED1]" /> Network Rails
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
           <div className="p-10 rounded-[3rem] bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-12 h-12 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] flex items-center justify-center text-[#2ACED1]">
                    <CreditCard className="w-6 h-6" />
                 </div>
                 <div>
                    <p className="text-sm font-bold text-[#000C22] dark:text-white tracking-tight">Institutional & Retail Rails</p>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-[#000C22]/30 dark:text-white/20">Card Networks & Bank API</p>
                 </div>
              </div>
              <div className="space-y-2">
                {PAYMENT_METHODS.filter(m => m.category === 'traditional' || m.category === 'bank').map(method => (
                    <SettingsToggleRow 
                      key={method.id}
                      title={method.title} 
                      description={method.description}
                      checked={methods[method.id] || false}
                      onToggle={() => toggle(method.id)}
                    />
                ))}
              </div>
           </div>

           <div className="p-10 rounded-[3rem] bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-12 h-12 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] flex items-center justify-center text-orange-500">
                    <Wallet className="w-6 h-6" />
                 </div>
                 <div>
                    <p className="text-sm font-bold text-[#000C22] dark:text-white tracking-tight">Decentralized & Digital Wallets</p>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-[#000C22]/30 dark:text-white/20">Web3 & Peer-to-Peer Rails</p>
                 </div>
              </div>
              <div className="space-y-2">
                {PAYMENT_METHODS.filter(m => m.category === 'digital').map(method => (
                    <SettingsToggleRow 
                      key={method.id}
                      title={method.title} 
                      description={method.description}
                      checked={methods[method.id] || false}
                      onToggle={() => toggle(method.id)}
                    />
                ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
