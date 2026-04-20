"use client";

import React, { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart3, 
  Search, 
  Terminal, 
  Play, 
  Save, 
  Download, 
  FileText, 
  Database, 
  History, 
  ChevronRight, 
  MoreVertical,
  Plus,
  Code2,
  Table as TableIcon
} from "lucide-react";

const recentQueries = [
  { name: "Monthly Revenue by Region", author: "M Safi", date: "2h ago", status: "Success" },
  { name: "Subscription Churn Analysis", author: "Alex Rivers", date: "5h ago", status: "Success" },
  { name: "Failed Payouts Audit", author: "M Safi", date: "Yesterday", status: "Failed" },
  { name: "Customer Lifetime Value (LTV)", author: "Sarah Smith", date: "2 days ago", status: "Success" },
];

export default function SigmaPage() {
  const [mounted, setMounted] = useState(false);
  const [editorCode, setEditorCode] = useState("SELECT\n  date_trunc('month', created) as month,\n  sum(amount) as net_revenue,\n  count(id) as payment_count\nFROM payments\nWHERE status = 'succeeded'\nGROUP BY 1\nORDER BY 1 DESC;");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-8">
      {/* ─── Header ─── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <ScrollReveal direction="left">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#000C22] dark:text-white mb-1 flex items-center gap-2">
               <Database className="w-8 h-8 text-[#2ACED1]" />
               Sigma Analytics
            </h1>
            <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">Direct SQL access to your transaction data. Complex queries, custom reporting.</p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal direction="right">
          <div className="flex items-center gap-3">
             <motion.button
                whileHover={{ y: -2 }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-action-button text-white font-bold shadow-lg"
             >
                <Plus className="w-4 h-4" /> New Query
             </motion.button>
          </div>
        </ScrollReveal>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
         {/* SQL Editor Area */}
         <div className="xl:col-span-2 space-y-6">
            <ScrollReveal direction="bottom">
               <div className="rounded-3xl border border-[#2ACED1]/30 bg-[#011B3B] overflow-hidden shadow-2xl flex flex-col h-[500px]">
                  <div className="p-4 bg-black/40 border-b border-[#2ACED1]/10 flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <Terminal className="w-4 h-4 text-[#2ACED1]" />
                        <span className="text-xs font-bold text-white/60">SQL Editor — query_workbench.sql</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-white/10 text-white/60 text-[10px] font-bold hover:bg-white/5 transition-colors">
                           <Save className="w-3 h-3" /> Save
                        </button>
                        <button className="flex items-center gap-2 px-6 py-1.5 rounded-lg bg-[#2ACED1] text-[#011B3B] text-[10px] font-bold hover:scale-105 transition-all">
                           <Play className="w-3 h-3" /> Run Query
                        </button>
                     </div>
                  </div>
                  <div className="flex-1 p-6 font-mono text-sm relative">
                     <div className="absolute top-6 left-2 flex flex-col gap-1 opacity-20 select-none">
                        {Array.from({ length: 15 }).map((_, i) => <span key={i} className="text-xs">{i + 1}</span>)}
                     </div>
                     <textarea 
                        value={editorCode}
                        onChange={(e) => setEditorCode(e.target.value)}
                        className="w-full h-full bg-transparent border-none outline-none text-[#2ACED1] pl-8 resize-none leading-relaxed"
                     />
                  </div>
                  <div className="p-3 bg-black/20 border-t border-[#2ACED1]/10 flex items-center justify-between px-6">
                     <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Query status: <span className="text-emerald-500">Ready</span></p>
                     <div className="flex items-center gap-4">
                        <span className="text-[10px] text-white/20">Execution time: ~45ms</span>
                        <span className="text-[10px] text-white/20">Rows: N/A</span>
                     </div>
                  </div>
               </div>
            </ScrollReveal>

            {/* Results Preview Placeholder */}
            <ScrollReveal direction="bottom" delay={0.1}>
               <div className="p-12 rounded-3xl border border-[#2ACED1]/20 bg-white/50 dark:bg-[#011B3B]/50 border-dashed text-center">
                  <TableIcon className="w-12 h-12 text-[#2ACED1]/20 mx-auto mb-4" />
                  <h3 className="font-bold dark:text-white/40 italic">Query results will appear here</h3>
                  <p className="text-xs text-white/20 mt-1">Run your SQL to visualize and export raw data.</p>
               </div>
            </ScrollReveal>
         </div>

         {/* Sidebar Tools */}
         <div className="space-y-6">
            <ScrollReveal direction="right">
               <div className="p-6 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 shadow-sm">
                  <div className="flex items-center gap-2 mb-6">
                     <History className="w-4 h-4 text-[#2ACED1]" />
                     <h4 className="font-bold dark:text-white">Recent Queries</h4>
                  </div>
                  <div className="space-y-4">
                     {recentQueries.map((q, i) => (
                        <div key={i} className="group cursor-pointer">
                           <div className="flex justify-between items-start mb-1">
                              <p className="text-sm font-bold dark:text-white group-hover:text-[#2ACED1] transition-colors">{q.name}</p>
                              <span className={`text-[10px] font-bold uppercase ${q.status === "Success" ? "text-emerald-500" : "text-red-500"}`}>{q.status}</span>
                           </div>
                           <p className="text-[10px] text-white/40">{q.author} • {q.date}</p>
                        </div>
                     ))}
                  </div>
                  <button className="w-full py-2.5 mt-6 rounded-xl border border-[#2ACED1]/20 text-[#2ACED1] text-xs font-bold hover:bg-[#2ACED1]/5 transition-all">
                     View All History
                  </button>
               </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.1}>
               <div className="p-6 rounded-3xl bg-gradient-to-br from-[#2ACED1]/10 to-[#034E78]/10 border border-[#2ACED1]/20 relative overflow-hidden group">
                  <div className="absolute -bottom-8 -right-8 opacity-10">
                     <Code2 className="w-24 h-24 text-[#2ACED1]" />
                  </div>
                  <h4 className="font-bold dark:text-white mb-2 italic">Schema Browser</h4>
                  <p className="text-xs text-white/50 leading-relaxed mb-6">
                     Explore tables and view field descriptions to build your queries faster.
                  </p>
                  <div className="space-y-2">
                     {["payments", "invoices", "customers", "disputes", "refunds"].map(table => (
                        <div key={table} className="flex items-center justify-between text-xs py-1.5 border-b border-white/5 last:border-0 hover:text-[#2ACED1] transition-colors cursor-pointer">
                           <span className="font-mono text-white/60">{table}</span>
                           <ChevronRight className="w-3 h-3 opacity-40" />
                        </div>
                     ))}
                  </div>
               </div>
            </ScrollReveal>
         </div>
      </div>
    </div>
  );
}
