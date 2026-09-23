'use client'

import { FormEvent, useState } from 'react'
import { Leaf, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function AuthScreen() {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [organization, setOrganization] = useState('')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setMessage('')
    const supabase = createClient()
    const result = mode === 'login'
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ?? `${window.location.origin}/auth/callback`, data: { first_name: name, organization } } })
    setBusy(false)
    if (result.error) { setMessage(result.error.message.toLowerCase().includes('confirm') ? 'Check your email to confirm your account.' : 'Unable to authenticate with those details.'); return }
    if (mode === 'signup' && !result.data.session) setMessage('Account created. Check your email to confirm your account.')
    else window.location.reload()
  }

  return <main className="flex min-h-screen items-center justify-center bg-[#f7f8f3] px-5 py-10 text-[#1d3029]"><div className="w-full max-w-md rounded-3xl border border-[#dfe8de] bg-white p-8 shadow-xl shadow-[#1f4230]/5"><div className="mb-8 flex items-center gap-3"><div className="flex size-11 items-center justify-center rounded-2xl bg-[#0f6b4f] text-white"><Leaf className="size-6" /></div><div><p className="text-lg font-bold">food<span className="text-[#e88331]">wise</span></p><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8c9b92]">Smart food operations</p></div></div><h1 className="text-2xl font-bold tracking-tight">{mode === 'login' ? 'Welcome back' : 'Create your workspace'}</h1><p className="mt-2 text-sm text-[#77877d]">{mode === 'login' ? 'Sign in to manage your food ecosystem.' : 'Connect your team to a smarter redistribution network.'}</p><form onSubmit={submit} className="mt-7 flex flex-col gap-4">{mode === 'signup' && <><label className="text-xs font-semibold">Your name<input required value={name} onChange={e => setName(e.target.value)} className="mt-2 w-full rounded-xl border border-[#dfe8de] px-3 py-3 text-sm outline-none focus:border-[#0f6b4f]" /></label><label className="text-xs font-semibold">Organization<input required value={organization} onChange={e => setOrganization(e.target.value)} className="mt-2 w-full rounded-xl border border-[#dfe8de] px-3 py-3 text-sm outline-none focus:border-[#0f6b4f]" /></label></>}<label className="text-xs font-semibold">Email<input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-2 w-full rounded-xl border border-[#dfe8de] px-3 py-3 text-sm outline-none focus:border-[#0f6b4f]" /></label><label className="text-xs font-semibold">Password<input required minLength={6} type="password" value={password} onChange={e => setPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-[#dfe8de] px-3 py-3 text-sm outline-none focus:border-[#0f6b4f]" /></label>{message && <p className="rounded-xl bg-[#fff4e8] px-3 py-2 text-xs font-medium text-[#9a5b25]">{message}</p>}<button disabled={busy} className="flex items-center justify-center gap-2 rounded-xl bg-[#0f6b4f] px-4 py-3 text-sm font-bold text-white disabled:opacity-60">{busy && <Loader2 className="size-4 animate-spin" />}{mode === 'login' ? 'Sign in' : 'Create account'}</button></form><button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setMessage('') }} className="mt-6 w-full text-center text-xs font-semibold text-[#0f6b4f]">{mode === 'login' ? 'New to foodwise? Create an account' : 'Already have an account? Sign in'}</button></div></main>
}
