'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import {
  ArrowRight,
  Bell,
  ChevronDown,
  CircleHelp,
  Clock3,
  Factory,
  HeartHandshake,
  Leaf,
  LayoutDashboard,
  MapPin,
  Menu,
  MoreHorizontal,
  PackageCheck,
  Recycle,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Truck,
  Users,
  X,
  Zap,
} from 'lucide-react'

const navItems = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Redistribution', icon: HeartHandshake },
  { label: 'Inventory & Quality', icon: PackageCheck },
  { label: 'Processing Units', icon: Factory },
  { label: 'Sustainability', icon: Leaf },
]

type SurplusItem = { id: string; item: string; source: string; quantity: number; unit: string; status: string; expires_at: string | null }

export default function FoodwiseDashboard({ user, items }: { user: { email?: string; user_metadata?: { first_name?: string; organization?: string } }; items: SurplusItem[] }) {
  const [active, setActive] = useState('Overview')
  const displayName = user.user_metadata?.first_name || user.email?.split('@')[0] || 'there'
  const [mobileOpen, setMobileOpen] = useState(false)
  const isAbout = active === 'About'
  async function signOut() {
    await createClient().auth.signOut()
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-[#f7f8f3] text-[#1d3029]">
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-[246px] flex-col border-r border-[#dfe8de] bg-white px-5 py-6 transition-transform lg:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-[#0f6b4f] text-white shadow-sm"><Leaf className="size-5" /></div>
            <div><p className="text-[15px] font-bold tracking-tight">food<span className="text-[#e88331]">wise</span></p><p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8c9b92]">Smart India Hackathon</p></div>
          </div>
          <button className="lg:hidden" aria-label="Close navigation" onClick={() => setMobileOpen(false)}><X className="size-5" /></button>
        </div>
        <div className="mt-11 flex flex-col gap-1">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#a2ada7]">Workspace</p>
          {navItems.map(({ label, icon: Icon }) => <button key={label} onClick={() => { setActive(label); setMobileOpen(false) }} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-medium transition ${active === label ? 'bg-[#e8f3ec] text-[#0f6b4f]' : 'text-[#687a70] hover:bg-[#f2f6f1]'}`}><Icon className="size-[17px]" />{label}</button>)}
        </div>
        <div className="mt-auto flex flex-col gap-1">
          <button onClick={signOut} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-[#687a70] hover:bg-[#f2f6f1]"><Settings2 className="size-[17px]" />Sign out</button>
          <button className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-medium transition ${isAbout ? 'bg-[#e8f3ec] text-[#0f6b4f]' : 'text-[#687a70] hover:bg-[#f2f6f1]'}`} onClick={() => { setActive('About'); setMobileOpen(false) }}><CircleHelp className="size-[17px]" />About foodwise</button>
          <div className="mt-5 flex items-center gap-3 border-t border-[#edf1ed] px-2 pt-5"><div className="flex size-8 items-center justify-center rounded-full bg-[#f4c58d] text-xs font-bold text-[#6e401f]">AK</div><div className="min-w-0 flex-1"><p className="truncate text-xs font-bold">{displayName}</p><p className="truncate text-[10px] text-[#94a29a]">{user.user_metadata?.organization || 'Workspace member'}</p></div><ChevronDown className="size-3.5 text-[#9aaa9f]" /></div>
        </div>
      </aside>

      <div className="lg:pl-[246px]">
        <header className="flex h-[72px] items-center justify-between border-b border-[#e4ebe1] bg-white/85 px-5 backdrop-blur md:px-9">
          <button className="lg:hidden" aria-label="Open navigation" onClick={() => setMobileOpen(true)}><Menu className="size-5" /></button>
          <div className="hidden items-center gap-2 text-xs text-[#849188] sm:flex"><span>Workspace</span><span>/</span><span className="font-semibold text-[#344d40]">{active}</span></div>
          <div className="flex items-center gap-3"><button className="relative rounded-full p-2 text-[#77877d] hover:bg-[#f1f5f0]" aria-label="Notifications"><Bell className="size-[18px]" /><span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-[#ec8a35]" /></button><div className="hidden h-6 w-px bg-[#e4ebe1] sm:block" /><button className="flex items-center gap-2 text-xs font-semibold text-[#4a5d51]"><div className="flex size-7 items-center justify-center rounded-full bg-[#f4c58d] text-[10px] font-bold text-[#6e401f]">AK</div><span className="hidden sm:block">Ananya Kapoor</span><ChevronDown className="hidden size-3.5 sm:block" /></button></div>
        </header>

        <main className="mx-auto max-w-[1400px] px-5 py-8 md:px-9 md:py-10">
          {isAbout ? <AboutPage onBack={() => setActive('Overview')} /> : <Overview active={active} setActive={setActive} />}
        </main>
      </div>
    </div>
  )
}

function Overview({ active, setActive }: { active: string; setActive: (value: string) => void }) {
  return <>
    <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><div className="mb-3 flex items-center gap-2 text-xs font-semibold text-[#ec8735]"><span className="size-2 rounded-full bg-[#ec8735]" />Live operations dashboard</div><h1 className="text-3xl font-bold tracking-[-0.04em] text-[#17392c] md:text-[38px]">Good morning, Ananya.</h1><p className="mt-2 text-sm text-[#77877d]">Here&apos;s how your food ecosystem is performing today.</p></div><div className="flex items-center gap-3"><button className="flex items-center gap-2 rounded-lg border border-[#dfe8de] bg-white px-3.5 py-2.5 text-xs font-semibold text-[#52645a] shadow-sm"><Clock3 className="size-3.5" />Today <ChevronDown className="size-3" /></button><button className="flex items-center gap-2 rounded-lg bg-[#0f6b4f] px-4 py-2.5 text-xs font-semibold text-white shadow-sm shadow-[#0f6b4f]/20"><Sparkles className="size-3.5" />Generate report</button></div></div>
    {active !== 'Overview' && <div className="mb-6 rounded-2xl border border-[#dfe8de] bg-white p-5"><p className="text-sm font-semibold text-[#0f6b4f]">{active} module</p><p className="mt-1 text-sm text-[#77877d]">This prototype module is ready to connect with live operational data, IoT sensors, and partner networks.</p></div>}
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Metric label="Food saved this month" value="12,480" unit="kg" change="+18.4%" icon={Recycle} tone="green" /><Metric label="Meals redistributed" value="8,294" unit="meals" change="+24.1%" icon={HeartHandshake} tone="orange" /><Metric label="Carbon avoided" value="5.7" unit="tCO₂e" change="+12.8%" icon={Leaf} tone="blue" /><Metric label="Active partners" value="47" unit="NGOs & kitchens" change="+6 new" icon={Users} tone="purple" /></div>
    <div className="mt-5 grid gap-5 xl:grid-cols-[1.45fr_1fr]">
      <section className="rounded-2xl border border-[#e0e9df] bg-white p-5 shadow-[0_8px_24px_rgba(31,66,48,0.03)] md:p-6"><div className="flex items-start justify-between"><div><h2 className="text-sm font-bold text-[#223c30]">Waste prevention trend</h2><p className="mt-1 text-xs text-[#8a988f]">Estimated waste prevented across all units</p></div><button className="rounded-lg p-1 text-[#85948b] hover:bg-[#f1f5ef]"><MoreHorizontal className="size-5" /></button></div><div className="mt-6 flex items-end gap-3"><p className="text-[30px] font-bold tracking-tight text-[#17392c]">2,840 <span className="text-sm font-semibold text-[#8b9990]">kg this week</span></p><span className="mb-1 rounded-full bg-[#e7f4eb] px-2 py-1 text-[10px] font-bold text-[#168053]">+22.6%</span></div><div className="mt-7 flex h-[170px] items-end gap-2 border-b border-[#edf1ed] px-1 sm:gap-4">{[42, 54, 48, 70, 62, 87, 76, 94, 83, 100, 91, 112].map((h, i) => <div key={i} className="group flex flex-1 flex-col items-center justify-end gap-2"><div className={`w-full max-w-[34px] rounded-t-md ${i > 8 ? 'bg-[#0f6b4f]' : 'bg-[#b9dcca]'} transition group-hover:bg-[#e88331]`} style={{ height: `${h}px` }} /></div>)}</div><div className="mt-3 flex justify-between text-[10px] font-medium text-[#a0aaa3]"><span>Jun 10</span><span>Jun 12</span><span>Jun 14</span><span>Jun 16</span><span>Jun 18</span><span>Jun 20</span></div></section>
      <section className="rounded-2xl border border-[#e0e9df] bg-[#0f6b4f] p-6 text-white shadow-[0_8px_24px_rgba(15,107,79,0.15)]"><div className="flex items-start justify-between"><div><div className="mb-3 flex size-9 items-center justify-center rounded-xl bg-white/15"><Zap className="size-4 text-[#f5b86f]" /></div><h2 className="text-lg font-bold tracking-tight">AI action center</h2><p className="mt-1 max-w-[260px] text-xs leading-5 text-[#b6d1c4]">Three opportunities need your attention today.</p></div><span className="rounded-full bg-[#f5b86f] px-2 py-1 text-[10px] font-bold text-[#51351d]">3 new</span></div><div className="mt-6 flex flex-col gap-3"><Action text="Redistribute 120 kg cooked rice" meta="Central Kitchen · expires in 2h" /><Action text="Route pickup to Seva Shelter" meta="Optimized route · saves 14 min" /><Action text="Review cold storage alert" meta="Unit 04 · temperature +2.1°C" /></div><button className="mt-5 flex items-center gap-2 text-xs font-bold text-[#f5c486]">Review all actions <ArrowRight className="size-3.5" /></button></section>
    </div>
    <div className="mt-5 grid gap-5 xl:grid-cols-[1.35fr_1fr]">
      <section className="rounded-2xl border border-[#e0e9df] bg-white p-5 shadow-[0_8px_24px_rgba(31,66,48,0.03)] md:p-6"><div className="flex items-center justify-between"><div><h2 className="text-sm font-bold text-[#223c30]">Surplus food queue</h2><p className="mt-1 text-xs text-[#8a988f]">Items that can be saved and redistributed</p></div><button onClick={() => setActive('Redistribution')} className="text-xs font-bold text-[#0f6b4f]">View all <ArrowRight className="ml-1 inline size-3.5" /></button></div><div className="mt-5 overflow-x-auto"><table className="w-full min-w-[560px] text-left"><thead className="border-b border-[#edf1ed] text-[10px] font-bold uppercase tracking-[0.12em] text-[#9ba79f]"><tr><th className="pb-3 font-bold">Item</th><th className="pb-3 font-bold">Quantity</th><th className="pb-3 font-bold">Status</th><th className="pb-3 font-bold">Action</th></tr></thead><tbody className="text-xs">{(items.length ? items : []).map((row) => <tr key={row.id} className="border-b border-[#f0f3ef] last:border-0"><td className="py-4"><p className="font-bold text-[#30473b]">{row.item}</p><p className="mt-1 text-[10px] text-[#98a49d]">{row.source}</p></td><td className="py-4 font-semibold text-[#4a5f53]">{row.quantity} {row.unit}</td><td className="py-4"><span className="rounded-full bg-[#e7f4eb] px-2 py-1 text-[10px] font-bold text-[#168053]">{row.status}</span><p className="mt-1 text-[10px] text-[#98a49d]">{row.expires_at ? new Date(row.expires_at).toLocaleDateString() : 'No expiry set'}</p></td><td className="py-4"><button className="rounded-lg border border-[#dfe8de] px-2.5 py-1.5 text-[10px] font-bold text-[#0f6b4f] hover:bg-[#eff7f0]">Match partner</button></td></tr>)}</tbody></table></div></section>
      <section className="rounded-2xl border border-[#e0e9df] bg-white p-5 shadow-[0_8px_24px_rgba(31,66,48,0.03)] md:p-6"><div className="flex items-center justify-between"><div><h2 className="text-sm font-bold text-[#223c30]">Redistribution network</h2><p className="mt-1 text-xs text-[#8a988f]">Live partner activity</p></div><button aria-label="Search partners" className="rounded-lg p-1.5 text-[#89978e] hover:bg-[#f1f5ef]"><Search className="size-4" /></button></div><div className="relative mt-5 flex h-[178px] items-center justify-center overflow-hidden rounded-xl bg-[#edf5eb]"><div className="absolute inset-0 opacity-60" style={{ backgroundImage: 'linear-gradient(#d9e8d8 1px, transparent 1px), linear-gradient(90deg, #d9e8d8 1px, transparent 1px)', backgroundSize: '28px 28px' }} /><div className="absolute h-[120px] w-[220px] rotate-[-18deg] rounded-[50%] border border-dashed border-[#9ac6a8]" /><div className="absolute h-[180px] w-[280px] rotate-[28deg] rounded-[50%] border border-dashed border-[#b6d4b9]" /><div className="relative flex size-9 items-center justify-center rounded-full bg-[#0f6b4f] text-white shadow-lg shadow-[#0f6b4f]/30"><MapPin className="size-4" /></div>{[['left-[21%] top-[28%]', 'bg-[#e88331]'], ['right-[19%] top-[24%]', 'bg-[#5b8fc4]'], ['left-[28%] bottom-[22%]', 'bg-[#e88331]'], ['right-[29%] bottom-[20%]', 'bg-[#5b8fc4]']].map(([pos, color], i) => <span key={i} className={`absolute ${pos} flex size-5 items-center justify-center rounded-full ${color} text-white shadow-sm`}><MapPin className="size-3" /></span>)}</div><div className="mt-4 flex justify-between text-[10px] text-[#7f9085]"><span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-[#e88331]" />Food sources</span><span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-[#5b8fc4]" />NGOs & shelters</span><span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-[#0f6b4f]" />You</span></div></section>
    </div>
  </>
}

function Metric({ label, value, unit, change, icon: Icon, tone }: { label: string; value: string; unit: string; change: string; icon: typeof Leaf; tone: string }) { const tones: Record<string, string> = { green: 'bg-[#e7f4eb] text-[#0f6b4f]', orange: 'bg-[#fff0df] text-[#d8782d]', blue: 'bg-[#e7f0f8] text-[#4679a6]', purple: 'bg-[#efebf8] text-[#7558a1]' }; return <div className="rounded-2xl border border-[#e0e9df] bg-white p-5 shadow-[0_8px_24px_rgba(31,66,48,0.03)]"><div className="flex items-center justify-between"><div className={`flex size-9 items-center justify-center rounded-xl ${tones[tone]}`}><Icon className="size-4" /></div><span className="text-[10px] font-bold text-[#16905d]">{change}</span></div><p className="mt-5 text-[26px] font-bold tracking-tight text-[#1d3c2f]">{value} <span className="text-xs font-semibold text-[#89988e]">{unit}</span></p><p className="mt-1 text-[11px] font-medium text-[#84938a]">{label}</p></div> }
function Action({ text, meta }: { text: string; meta: string }) { return <div className="flex gap-3 rounded-xl border border-white/10 bg-white/10 p-3"><div className="mt-0.5 size-1.5 shrink-0 rounded-full bg-[#f5b86f]" /><div><p className="text-xs font-semibold text-white">{text}</p><p className="mt-1 text-[10px] text-[#b6d1c4]">{meta}</p></div></div> }

function AboutPage({ onBack }: { onBack: () => void }) { return <div className="mx-auto max-w-4xl"><button onClick={onBack} className="mb-8 flex items-center gap-2 text-xs font-bold text-[#0f6b4f]"><ArrowRight className="size-3 rotate-180" />Back to overview</button><div className="rounded-3xl bg-[#0f6b4f] p-7 text-white md:p-12"><div className="mb-8 flex size-14 items-center justify-center rounded-2xl bg-white/15"><Leaf className="size-7 text-[#f5b86f]" /></div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f5b86f]">The idea behind foodwise</p><h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.08] tracking-[-0.05em] md:text-6xl">Turning surplus into shared abundance.</h1><p className="mt-6 max-w-2xl text-sm leading-7 text-[#c4ddd0] md:text-base">Foodwise is an AI-powered smart food management and redistribution platform built for institutional kitchens, food processing units, and the communities around them.</p></div><div className="grid gap-8 py-10 md:grid-cols-2"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#e88331]">Why it matters</p><h2 className="mt-3 text-2xl font-bold tracking-tight text-[#1c3c2e]">A better system for food, people, and the planet.</h2></div><div className="flex flex-col gap-4 text-sm leading-7 text-[#687a70]"><p>Nearly one-third of food produced for human consumption is wasted every year. In India, that waste carries an economic cost and a human cost — even as communities face hunger and malnutrition.</p><p>Our prototype connects the full loop: demand forecasting, quality monitoring, intelligent surplus matching, route optimization, and sustainability reporting in one real-time operational layer.</p></div></div><div className="grid gap-3 md:grid-cols-3">{[{ icon: Sparkles, title: 'Predict', text: 'AI forecasts demand and surplus before waste happens.' }, { icon: ShieldCheck, title: 'Protect', text: 'Sensors and computer vision monitor quality and storage.' }, { icon: Truck, title: 'Redistribute', text: 'Smart logistics connect food with those who need it.' }].map(({ icon: Icon, title, text }) => <div key={title} className="rounded-2xl border border-[#e0e9df] bg-white p-5"><div className="flex size-9 items-center justify-center rounded-xl bg-[#e8f3ec] text-[#0f6b4f]"><Icon className="size-4" /></div><h3 className="mt-5 text-sm font-bold text-[#243e31]">{title}</h3><p className="mt-2 text-xs leading-5 text-[#84938a]">{text}</p></div>)}</div><div className="mt-8 rounded-2xl border border-[#f1dfc9] bg-[#fff8ef] p-6"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#d8782d]">Smart India Hackathon prototype</p><p className="mt-2 text-sm leading-6 text-[#6f604f]">A circular, technology-enabled food ecosystem that helps institutions reduce costs, meet ESG goals, and improve access to nutritious food for vulnerable communities.</p></div></div> }
