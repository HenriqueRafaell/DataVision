import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'

const API = 'http://localhost:8000'

export default function App(){
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{ fetchSummary() }, [])

  async function fetchSummary(){
    setLoading(true)
    try{
      const res = await axios.get(`${API}/stats/summary`)
      setSummary(res.data)
    }catch(err){
      console.error(err)
    }finally{ setLoading(false) }
  }

  async function handleSeed(){
    setLoading(true)
    try{
      await axios.post(`${API}/seed?days=30`)
      fetchSummary()
    }catch(err){ console.error(err); setLoading(false) }
  }

  if(loading) return <div className="min-h-screen flex items-center justify-center">Carregando...</div>

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-slate-900 to-slate-800">
      <header className="max-w-6xl mx-auto mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">DataVision</h1>
        <div className="space-x-2">
          <button onClick={handleSeed} className="px-4 py-2 bg-emerald-500 rounded">Seed data</button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        <section className="md:col-span-2 bg-slate-800 p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Timeseries (últimos 14 dias)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={summary.timeseries}>
              <XAxis dataKey="date" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Legend />
              {Object.keys(summary.timeseries[0]||{}).filter(k=>k!=='date').map((key,idx)=>(
                <Line key={key} type="monotone" dataKey={key} stroke={['#06b6d4','#06d6a0','#f97316','#ef4444'][idx%4]} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </section>

        <aside className="bg-slate-800 p-6 rounded shadow space-y-4">
          <h3 className="text-lg font-semibold">Totals por categoria</h3>
          <div>
            <BarChart width={300} height={200} data={summary.totals}>
              <XAxis dataKey="category" stroke="#94a3b8" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#06b6d4" />
            </BarChart>
          </div>
          <div className="text-sm text-slate-300">
            <p>Fonte: dados simulados. Use "Seed data" para popular dados de exemplo.</p>
          </div>
        </aside>
      </main>

      <footer className="max-w-6xl mx-auto mt-8 text-center text-sm text-slate-400">Desenvolvido por Henrique Rafael — Projeto DataVision</footer>
    </div>
  )
}
