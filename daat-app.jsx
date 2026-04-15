import React, { useState, useEffect } from "react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

// ─── Google Fonts ──────────────────────────────────────────────────────────────
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=DM+Mono:wght@400;500&display=swap');

    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'DM Sans', sans-serif; background: #f4f4f6; }

    .font-syne { font-family: 'Syne', sans-serif; }
    .font-dm-sans { font-family: 'DM Sans', sans-serif; }
    .font-dm-mono { font-family: 'DM Mono', monospace; }

    .sidebar-link {
      display: flex; align-items: center; gap: 12px;
      padding: 10px 16px; border-radius: 10px;
      color: #6b7280; font-size: 14px; font-weight: 500;
      cursor: pointer; transition: all 0.2s ease;
      text-decoration: none;
    }
    .sidebar-link:hover { background: #f0f7fd; color: #1e84c3; }
    .sidebar-link.active { background: #e8f4fc; color: #1e84c3; font-weight: 600; }
    .sidebar-link.active svg { color: #1e84c3; }

    .card {
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04);
      padding: 24px;
    }

    .badge-alto {
      background: #fee2e2; color: #b91c1c;
      padding: 3px 10px; border-radius: 999px;
      font-size: 11px; font-weight: 700; letter-spacing: 0.5px;
      font-family: 'DM Mono', monospace;
    }
    .badge-medio {
      background: #fef3c7; color: #b45309;
      padding: 3px 10px; border-radius: 999px;
      font-size: 11px; font-weight: 700; letter-spacing: 0.5px;
      font-family: 'DM Mono', monospace;
    }
    .badge-baixo {
      background: #dcfce7; color: #15803d;
      padding: 3px 10px; border-radius: 999px;
      font-size: 11px; font-weight: 700; letter-spacing: 0.5px;
      font-family: 'DM Mono', monospace;
    }
    .badge-facil { background: #dcfce7; color: #15803d; padding: 3px 10px; border-radius: 999px; font-size: 11px; font-weight: 700; font-family: 'DM Mono', monospace; }
    .badge-medio-dif { background: #fef3c7; color: #b45309; padding: 3px 10px; border-radius: 999px; font-size: 11px; font-weight: 700; font-family: 'DM Mono', monospace; }
    .badge-complexo { background: #ede9fe; color: #6d28d9; padding: 3px 10px; border-radius: 999px; font-size: 11px; font-weight: 700; font-family: 'DM Mono', monospace; }

    .btn-primary {
      background: #1e84c3; color: #fff;
      padding: 10px 20px; border-radius: 10px;
      font-size: 13px; font-weight: 600;
      border: none; cursor: pointer;
      transition: all 0.2s ease;
      font-family: 'DM Sans', sans-serif;
    }
    .btn-primary:hover { background: #1972a8; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(30,132,195,0.3); }

    .btn-secondary {
      background: #fff; color: #374151;
      padding: 10px 20px; border-radius: 10px;
      font-size: 13px; font-weight: 600;
      border: 1.5px solid #e5e7eb; cursor: pointer;
      transition: all 0.2s ease;
      font-family: 'DM Sans', sans-serif;
    }
    .btn-secondary:hover { border-color: #1e84c3; color: #1e84c3; background: #f0f7fd; }

    .insight-card {
      border: 1.5px solid #f3f4f6;
      border-radius: 14px;
      padding: 20px;
      transition: all 0.2s ease;
      cursor: pointer;
    }
    .insight-card:hover { border-color: #1e84c3; box-shadow: 0 4px 20px rgba(30,132,195,0.1); transform: translateY(-2px); }

    .metric-card {
      background: #fff; border-radius: 14px;
      padding: 20px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04);
      transition: all 0.2s ease;
    }
    .metric-card:hover { transform: translateY(-2px); box-shadow: 0 4px 20px rgba(0,0,0,0.08); }

    .upload-zone {
      border: 2px dashed #d1d5db;
      border-radius: 16px;
      padding: 48px;
      text-align: center;
      transition: all 0.2s ease;
      cursor: pointer;
    }
    .upload-zone:hover, .upload-zone.drag-over {
      border-color: #1e84c3;
      background: #f0f7fd;
    }

    .progress-step { display: flex; align-items: center; gap: 12px; padding: 12px 0; }
    .step-icon { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; }
    .step-done { background: #dcfce7; color: #15803d; }
    .step-active { background: #e8f4fc; color: #1e84c3; animation: pulse 1.5s infinite; }
    .step-pending { background: #f3f4f6; color: #9ca3af; }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    .fade-in { animation: fadeIn 0.3s ease; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 3px; }

    .tooltip-custom {
      background: #1d1d1d !important;
      border: none !important;
      border-radius: 10px !important;
      color: #fff !important;
      font-family: 'DM Sans', sans-serif !important;
      font-size: 13px !important;
      padding: 8px 14px !important;
    }

    .heatmap-cell {
      display: flex; align-items: center; justify-content: center;
      font-size: 11px; font-family: 'DM Mono', monospace;
      border-radius: 6px;
      cursor: default;
      transition: transform 0.1s;
    }
    .heatmap-cell:hover { transform: scale(1.1); }
  `}</style>
);

// ─── Mock Data ─────────────────────────────────────────────────────────────────
const faturamentoData = [
  { mes: "Nov", valor: 14200 },
  { mes: "Dez", valor: 16800 },
  { mes: "Jan", valor: 15100 },
  { mes: "Fev", valor: 17300 },
  { mes: "Mar", valor: 16540 },
  { mes: "Mai", valor: 18412, destaque: true },
];

const faturamentoSemanal = [
  { semana: "Sem 1", valor: 4820 },
  { semana: "Sem 2", valor: 5210 },
  { semana: "Sem 3", valor: 4380 },
  { semana: "Sem 4", valor: 4002 },
];

const clientesData = [
  { name: "Recorrentes", value: 73, fill: "#1e84c3" },
  { name: "Novos", value: 27, fill: "#c8c8d0" },
];

const servicosData = [
  { name: "Corte Simples", valor: 55 },
  { name: "Corte + Barba", valor: 28 },
  { name: "Barba", valor: 17 },
];

const horariosPico = [
  { dia: "Seg", "09h": 3, "10h": 7, "11h": 9, "14h": 5, "15h": 8, "16h": 6, "17h": 4, "18h": 9 },
  { dia: "Ter", "09h": 2, "10h": 5, "11h": 8, "14h": 6, "15h": 9, "16h": 8, "17h": 7, "18h": 6 },
  { dia: "Qua", "09h": 4, "10h": 8, "11h": 10, "14h": 7, "15h": 9, "16h": 9, "17h": 8, "18h": 7 },
  { dia: "Qui", "09h": 1, "10h": 2, "11h": 3, "14h": 2, "15h": 3, "16h": 2, "17h": 2, "18h": 1 },
  { dia: "Sex", "09h": 5, "10h": 9, "11h": 10, "14h": 8, "15h": 10, "16h": 9, "17h": 9, "18h": 8 },
  { dia: "Sab", "09h": 8, "10h": 10, "11h": 9, "14h": 6, "15h": 7, "16h": 5, "17h": 3, "18h": 1 },
];

const horarios = ["09h", "10h", "11h", "14h", "15h", "16h", "17h", "18h"];

const historicoArquivos = [
  { id: 1, data: "10/05/2026", arquivo: "vendas-abril-2026.xlsx", status: "Processado", cor: "green" },
  { id: 2, data: "08/04/2026", arquivo: "vendas-marco-2026.xlsx", status: "Processado", cor: "green" },
  { id: 3, data: "05/03/2026", arquivo: "vendas-fev-2026.xlsx", status: "Processado", cor: "green" },
  { id: 4, data: "03/02/2026", arquivo: "vendas-jan-2026.xlsx", status: "Processado", cor: "green" },
];

// ─── Logo Component ─────────────────────────────────────────────────────────────
const DaatLogo = ({ size = "md" }) => {
  const sizes = { sm: { text: "18px", dot: 8 }, md: { text: "22px", dot: 10 }, lg: { text: "28px", dot: 13 } };
  const s = sizes[size];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
      <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: s.text, color: "#1d1d1d", letterSpacing: "-0.5px" }}>DAAT</span>
      <div style={{ width: s.dot, height: s.dot, borderRadius: "50%", background: "#1e84c3", marginTop: -s.dot * 0.5 }} />
    </div>
  );
};

// ─── Custom Tooltip ──────────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "#1d1d1d", borderRadius: 10, padding: "8px 14px", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>
        <p style={{ color: "#9ca3af", marginBottom: 2 }}>{label}</p>
        <p style={{ fontWeight: 600 }}>R$ {payload[0].value.toLocaleString("pt-BR")}</p>
      </div>
    );
  }
  return null;
};

// ─── Heatmap Component ───────────────────────────────────────────────────────────
const Heatmap = () => {
  const getColor = (val) => {
    if (val === 0) return "#f3f4f6";
    if (val <= 2) return "#dbeafe";
    if (val <= 4) return "#93c5fd";
    if (val <= 6) return "#3b82f6";
    if (val <= 8) return "#1d4ed8";
    return "#1e3a8a";
  };
  const getTextColor = (val) => val >= 7 ? "#fff" : "#374151";

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ borderCollapse: "separate", borderSpacing: 4, width: "100%" }}>
        <thead>
          <tr>
            <th style={{ width: 40, fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#9ca3af", paddingBottom: 8 }}></th>
            {horarios.map(h => (
              <th key={h} style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#9ca3af", fontWeight: 500, paddingBottom: 8, textAlign: "center" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {horariosPico.map(row => (
            <tr key={row.dia}>
              <td style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#6b7280", paddingRight: 8, fontWeight: 500 }}>{row.dia}</td>
              {horarios.map(h => (
                <td key={h} style={{ padding: 2 }}>
                  <div
                    className="heatmap-cell"
                    style={{
                      width: "100%", height: 36,
                      background: getColor(row[h]),
                      color: getTextColor(row[h])
                    }}
                    title={`${row.dia} ${h}: ${row[h]} atend.`}
                  >
                    {row[h]}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, justifyContent: "flex-end" }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#9ca3af" }}>Menos</span>
        {["#dbeafe", "#93c5fd", "#3b82f6", "#1d4ed8", "#1e3a8a"].map(c => (
          <div key={c} style={{ width: 16, height: 16, borderRadius: 4, background: c }} />
        ))}
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#9ca3af" }}>Mais</span>
      </div>
    </div>
  );
};

// ─── MODULE 1 — Dashboard ────────────────────────────────────────────────────────
const Dashboard = () => {
  const insights = [
    {
      icon: "📉",
      titulo: "Queda nas vendas de quinta-feira",
      impacto: "ALTO",
      badgeClass: "badge-alto",
      descricao: "Suas quintas faturaram 34% menos que a média dos outros dias em maio. Claytão estava ausente em 3 das 4 quintas do mês.",
      sugestao: "Treinar um segundo profissional ou reorganizar a agenda de Claytão para cobrir as quintas-feiras.",
    },
    {
      icon: "👑",
      titulo: "43 clientes VIP sem benefício",
      impacto: "MÉDIO",
      badgeClass: "badge-medio",
      descricao: "43 clientes visitaram a Kingsman 14 ou mais vezes nos últimos 12 meses. Nenhum recebe desconto ou vantagem especial.",
      sugestao: "Criar cartão fidelidade — 10ª visita com desconto de 20% gera retenção e aumenta frequência média.",
    },
    {
      icon: "💰",
      titulo: "Oportunidade de upsell no corte simples",
      impacto: "MÉDIO",
      badgeClass: "badge-medio",
      descricao: "230 clientes fizeram apenas corte simples em maio. Converter 15% deles para Corte + Barba adicionaria R$ 552/mês à receita.",
      sugestao: "Treinar a equipe para oferecer o combo Corte + Barba no momento do atendimento.",
    },
  ];

  const atividades = [
    { icon: "📊", texto: "Relatório de maio gerado com sucesso", tempo: "há 2 horas" },
    { icon: "🔔", texto: "3 novos alertas identificados nos dados", tempo: "há 3 horas" },
    { icon: "🔄", texto: "Dados sincronizados com a planilha", tempo: "há 5 horas" },
    { icon: "📁", texto: "Arquivo vendas-maio-2026.xlsx processado", tempo: "há 1 dia" },
  ];

  return (
    <div className="fade-in" style={{ padding: "32px 40px", maxWidth: 1200, margin: "0 auto" }}>
      {/* Boas-vindas */}
      <div className="card" style={{ background: "linear-gradient(135deg, #1e84c3 0%, #1561a0 100%)", marginBottom: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, fontFamily: "'DM Mono', monospace", marginBottom: 8 }}>Bom dia, Claytão 👋</p>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 22, color: "#fff", marginBottom: 6 }}>
              Seus dados de maio estão prontos.
            </h1>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 15 }}>
              Temos <strong style={{ color: "#fff" }}>3 insights importantes</strong> para você hoje — incluindo uma oportunidade de +R$ 552/mês.
            </p>
          </div>
          <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 12, padding: "10px 18px", textAlign: "center" }}>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, fontFamily: "'DM Mono', monospace" }}>RELATÓRIO</p>
            <p style={{ color: "#fff", fontSize: 14, fontWeight: 600, fontFamily: "'Syne', sans-serif" }}>Maio 2026</p>
          </div>
        </div>
      </div>

      {/* Métricas */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Faturamento do Mês", valor: "R$ 18.412", delta: "+11,3%", positivo: true, sub: "vs. abril 2026" },
          { label: "Total de Atendimentos", valor: "418", delta: "+8,0%", positivo: true, sub: "vs. abril 2026" },
          { label: "Ticket Médio", valor: "R$ 44,04", delta: "+3,0%", positivo: true, sub: "vs. abril 2026" },
          { label: "Clientes Novos", valor: "113", delta: "-4,2%", positivo: false, sub: "vs. abril 2026" },
        ].map((m) => (
          <div key={m.label} className="metric-card">
            <p style={{ fontSize: 12, color: "#6b7280", fontFamily: "'DM Mono', monospace", marginBottom: 10, letterSpacing: "0.3px" }}>{m.label.toUpperCase()}</p>
            <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 24, color: "#1d1d1d", marginBottom: 6 }}>{m.valor}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: m.positivo ? "#16a34a" : "#dc2626", fontFamily: "'DM Mono', monospace" }}>
                {m.positivo ? "↑" : "↓"} {m.delta}
              </span>
              <span style={{ fontSize: 12, color: "#9ca3af" }}>{m.sub}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 24, marginBottom: 24 }}>
        {/* Gráfico de faturamento */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: "#1d1d1d" }}>Faturamento — Últimos 6 Meses</h3>
              <p style={{ fontSize: 13, color: "#6b7280", marginTop: 2 }}>Tendência de crescimento consistente</p>
            </div>
            <span style={{ background: "#dcfce7", color: "#15803d", padding: "4px 12px", borderRadius: 999, fontSize: 12, fontWeight: 600, fontFamily: "'DM Mono', monospace" }}>+29,7% no período</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={faturamentoData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="mes" tick={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={v => `R$${(v/1000).toFixed(0)}K`} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone" dataKey="valor" stroke="#1e84c3" strokeWidth={2.5}
                dot={(props) => {
                  const { cx, cy, payload } = props;
                  return payload.destaque
                    ? <circle key={`dot-${cx}-${cy}`} cx={cx} cy={cy} r={6} fill="#1e84c3" stroke="#fff" strokeWidth={2} />
                    : <circle key={`dot-${cx}-${cy}`} cx={cx} cy={cy} r={3} fill="#1e84c3" />;
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Feed de atividade */}
        <div className="card">
          <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: "#1d1d1d", marginBottom: 16 }}>Atividade Recente</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {atividades.map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 0", borderBottom: i < atividades.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                <span style={{ fontSize: 18 }}>{a.icon}</span>
                <div>
                  <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.4 }}>{a.texto}</p>
                  <p style={{ fontSize: 11, color: "#9ca3af", fontFamily: "'DM Mono', monospace", marginTop: 3 }}>{a.tempo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: "#1d1d1d" }}>Insights da DAAT.</h3>
            <p style={{ fontSize: 13, color: "#6b7280", marginTop: 2 }}>O que os seus dados revelaram este mês</p>
          </div>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#6b7280", background: "#f3f4f6", padding: "4px 12px", borderRadius: 999 }}>
            3 novos insights
          </span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {insights.map((ins, i) => (
            <div key={i} className="insight-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <span style={{ fontSize: 24 }}>{ins.icon}</span>
                <span className={ins.badgeClass}>{ins.impacto}</span>
              </div>
              <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: "#1d1d1d", marginBottom: 8, lineHeight: 1.3 }}>{ins.titulo}</h4>
              <p style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.6, marginBottom: 12 }}>{ins.descricao}</p>
              <div style={{ background: "#f0f7fd", borderRadius: 10, padding: "10px 12px", marginBottom: 14 }}>
                <p style={{ fontSize: 11, color: "#1e84c3", fontFamily: "'DM Mono', monospace", fontWeight: 600, marginBottom: 4 }}>SUGESTÃO DA DAAT</p>
                <p style={{ fontSize: 13, color: "#1d1d1d", lineHeight: 1.5 }}>{ins.sugestao}</p>
              </div>
              <button className="btn-secondary" style={{ width: "100%", fontSize: 12 }}>
                Ver análise completa →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── MODULE 2 — Relatório Detalhado ─────────────────────────────────────────────
const Relatorio = () => {
  const oportunidades = [
    {
      titulo: "Reorganização da agenda de quinta-feira",
      descricao: "Claytão esteve ausente em 3 das 4 quintas de maio. O faturamento das quintas foi 34% abaixo da média semanal.",
      impacto: "+R$ 2.100/mês",
      dificuldade: "FÁCIL",
      badgeClass: "badge-facil",
    },
    {
      titulo: "Programa de fidelidade para clientes VIP",
      descricao: "43 clientes têm 14+ visitas/ano mas não recebem nenhum benefício diferenciado. Alta chance de evasão.",
      impacto: "+R$ 4.300/ano (retenção)",
      dificuldade: "FÁCIL",
      badgeClass: "badge-facil",
    },
    {
      titulo: "Upsell de Corte Simples para Corte + Barba",
      descricao: "230 clientes fizeram apenas corte simples. Converter 15% ao combo aumenta receita diretamente.",
      impacto: "+R$ 6.630/ano",
      dificuldade: "MÉDIO",
      badgeClass: "badge-medio-dif",
    },
    {
      titulo: "Aproveitamento dos horários mortos de quinta e manhã",
      descricao: "09h e 10h de terça e quarta têm baixo movimento. Promoções de horário podem redistribuir demanda.",
      impacto: "+R$ 1.800/mês",
      dificuldade: "MÉDIO",
      badgeClass: "badge-medio-dif",
    },
    {
      titulo: "Cadastro de 12 clientes sem identificação",
      descricao: "12 registros com nome 'Sem cadastro' impedem análise de recorrência e comunicação futura.",
      impacto: "Precisão +15%",
      dificuldade: "FÁCIL",
      badgeClass: "badge-facil",
    },
  ];

  const recomendacoes = [
    {
      prioridade: "01",
      acao: "Criar programa de fidelidade para os 43 clientes VIP",
      prazo: "Até 30/06/2026",
      responsavel: "Dono",
      descricao: "Implemente um cartão simples (digital ou físico): na 10ª visita, 20% de desconto. Use o WhatsApp para comunicar pessoalmente.",
    },
    {
      prioridade: "02",
      acao: "Treinar equipe para oferta do combo Corte + Barba",
      prazo: "Próxima semana",
      responsavel: "Equipe",
      descricao: "Script simples: 'Aproveita e faz a barba também? Fica mais em conta no combo.' Aumente a taxa de conversão gradualmente.",
    },
    {
      prioridade: "03",
      acao: "Cobrir as quintas-feiras com segundo profissional",
      prazo: "Até 15/06/2026",
      responsavel: "Dono",
      descricao: "Avaliar escala alternada ou contratação de freelancer às quintas. Impacto direto no faturamento semanal.",
    },
  ];

  return (
    <div className="fade-in" style={{ padding: "32px 40px", maxWidth: 1100, margin: "0 auto" }}>
      {/* Header do relatório */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <span style={{ background: "#e8f4fc", color: "#1e84c3", padding: "4px 12px", borderRadius: 999, fontSize: 12, fontWeight: 600, fontFamily: "'DM Mono', monospace" }}>RELATÓRIO MENSAL</span>
            <span style={{ background: "#f3f4f6", color: "#6b7280", padding: "4px 12px", borderRadius: 999, fontSize: 12, fontFamily: "'DM Mono', monospace" }}>Maio 2026</span>
          </div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 28, color: "#1d1d1d", marginBottom: 4 }}>
            Relatório de Maio 2026
          </h1>
          <p style={{ fontSize: 16, color: "#6b7280" }}>Kingsman Barbearia · Gerado pela DAAT. em 10/06/2026</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn-secondary">📅 Agendar apresentação</button>
          <button className="btn-primary">⬇ Exportar PDF</button>
        </div>
      </div>

      {/* Resumo executivo */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
          <div style={{ width: 4, height: 24, background: "#1e84c3", borderRadius: 2 }} />
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: "#1d1d1d" }}>Resumo Executivo</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            "Maio de 2026 foi o melhor mês dos últimos seis para a Kingsman Barbearia, com faturamento de R$ 18.412 — crescimento de 11,3% frente a abril. Os 418 atendimentos representam um novo recorde, impulsionados principalmente pelas sextas-feiras e sábados, que concentraram 52% de toda a receita do mês.",
            "O desempenho de Claytão continua sendo o pilar central do negócio: ele foi responsável por 72% dos atendimentos registrados em maio. Isso representa tanto uma força quanto um risco operacional — as três ausências de Claytão às quintas foram diretamente responsáveis pela queda de 34% no faturamento desse dia da semana.",
            "A análise de recorrência revelou um ativo subestimado: 43 clientes já visitaram a barbearia 14 ou mais vezes nos últimos 12 meses e nunca receberam nenhum tipo de reconhecimento ou benefício. Esse grupo representa uma oportunidade de fidelização de baixo custo e alto retorno.",
            "A maior oportunidade financeira identificada neste ciclo é o upsell do serviço de corte simples para o combo Corte + Barba. Com 230 clientes elegíveis em maio, converter apenas 15% deles ao longo do ano pode representar R$ 6.630 adicionais sem nenhum novo cliente precisar entrar pela porta.",
          ].map((p, i) => (
            <p key={i} style={{ fontSize: 14, color: "#374151", lineHeight: 1.8 }}>{p}</p>
          ))}
        </div>
      </div>

      {/* O que os dados dizem */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
          <div style={{ width: 4, height: 24, background: "#1e84c3", borderRadius: 2 }} />
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: "#1d1d1d" }}>O que os dados dizem</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginBottom: 32 }}>
          {/* Faturamento por semana */}
          <div>
            <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: "#1d1d1d", marginBottom: 6 }}>Faturamento por Semana</h4>
            <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16, lineHeight: 1.5 }}>
              A primeira semana do mês é historicamente a mais forte. A queda na semana 4 coincide com as ausências de Claytão nas quintas.
            </p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={faturamentoSemanal} barSize={36}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                <XAxis dataKey="semana" tick={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={v => `R$${(v/1000).toFixed(1)}K`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="valor" radius={[6, 6, 0, 0]}>
                  {faturamentoSemanal.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 3 ? "#fca5a5" : "#1e84c3"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Clientes */}
          <div>
            <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: "#1d1d1d", marginBottom: 6 }}>Novos vs. Recorrentes</h4>
            <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16, lineHeight: 1.5 }}>
              73% dos atendimentos vieram de clientes que já conhecem a Kingsman. Isso indica uma base sólida e mostra que a fidelização está funcionando.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <ResponsiveContainer width={160} height={160}>
                <PieChart>
                  <Pie data={clientesData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                    {clientesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {clientesData.map((d) => (
                  <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: d.fill }} />
                    <span style={{ fontSize: 13, color: "#374151" }}>{d.name}</span>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: 15, color: "#1d1d1d", marginLeft: 4 }}>{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Serviços */}
        <div style={{ marginBottom: 32 }}>
          <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: "#1d1d1d", marginBottom: 6 }}>Ranking de Serviços</h4>
          <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}>
            O corte simples domina, mas o combo Corte + Barba tem o maior ticket e a maior margem de crescimento via upsell.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {servicosData.map((s) => (
              <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#6b7280", width: 130 }}>{s.name}</span>
                <div style={{ flex: 1, background: "#f3f4f6", borderRadius: 6, height: 28, overflow: "hidden", position: "relative" }}>
                  <div style={{ width: `${s.valor}%`, height: "100%", background: s.valor > 50 ? "#1e84c3" : "#93c5fd", borderRadius: 6, transition: "width 0.5s ease" }} />
                </div>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 14, fontWeight: 700, color: "#1d1d1d", width: 40, textAlign: "right" }}>{s.valor}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Heatmap */}
        <div>
          <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: "#1d1d1d", marginBottom: 6 }}>Horários de Pico</h4>
          <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}>
            Sexta e sábado das 10h às 16h são os horários mais movimentados. As quintas-feiras estão claramente subaproveitadas em todos os horários.
          </p>
          <Heatmap />
        </div>
      </div>

      {/* Oportunidades */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <div style={{ width: 4, height: 24, background: "#f59e0b", borderRadius: 2 }} />
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: "#1d1d1d" }}>Oportunidades Identificadas</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {oportunidades.map((op, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: "16px", background: "#fafafa", borderRadius: 12, border: "1.5px solid #f3f4f6" }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 20, fontWeight: 800, color: "#e5e7eb", marginTop: 2 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: "#1d1d1d", marginBottom: 4 }}>{op.titulo}</p>
                <p style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.5 }}>{op.descricao}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, flexShrink: 0 }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, fontWeight: 700, color: "#15803d" }}>{op.impacto}</span>
                <span className={op.badgeClass}>{op.dificuldade}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recomendações */}
      <div className="card">
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <div style={{ width: 4, height: 24, background: "#1e84c3", borderRadius: 2 }} />
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: "#1d1d1d" }}>Recomendações da DAAT.</h2>
          <span style={{ fontSize: 13, color: "#6b7280", marginLeft: 4 }}>— as 3 ações prioritárias para junho</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {recomendacoes.map((r) => (
            <div key={r.prioridade} style={{ display: "flex", gap: 16, padding: "18px 20px", background: "#f8fafc", borderRadius: 12, border: "1.5px solid #e8f4fc" }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "#1e84c3", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: 16, color: "#fff" }}>{r.prioridade}</span>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: "#1d1d1d", marginBottom: 6 }}>{r.acao}</p>
                <p style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.6, marginBottom: 10 }}>{r.descricao}</p>
                <div style={{ display: "flex", gap: 12 }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#6b7280" }}>📅 {r.prazo}</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#6b7280" }}>👤 {r.responsavel}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── MODULE 3 — Upload de Dados ──────────────────────────────────────────────────
const Upload = () => {
  const [dragOver, setDragOver] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [processando, setProcessando] = useState(false);
  const [etapa, setEtapa] = useState(0);

  const etapas = [
    { label: "Dados recebidos", status: "done" },
    { label: "Limpeza e organização", status: "done" },
    { label: "Análise em andamento", status: "active" },
    { label: "Insights sendo gerados", status: "pending" },
    { label: "Relatório pronto", status: "pending" },
  ];

  const previewData = [
    { data: "01/05/2026", cliente: "Carlos Oliveira", servico: "Corte Simples", valor: "R$ 35,00", profissional: "Claytão" },
    { data: "01/05/2026", cliente: "Marcos Lima", servico: "Corte + Barba", valor: "R$ 65,00", profissional: "Claytão" },
    { data: "02/05/2026", cliente: "João Santos", servico: "Barba", valor: "R$ 30,00", profissional: "Junior" },
    { data: "02/05/2026", cliente: "Sem cadastro", servico: "Corte Simples", valor: "R$ 35,00", profissional: "Claytão" },
    { data: "03/05/2026", cliente: "Pedro Alves", servico: "Corte + Barba", valor: "R$ 65,00", profissional: "Claytão" },
  ];

  const simularUpload = () => {
    setUploaded(true);
    setProcessando(true);
    let e = 0;
    const interval = setInterval(() => {
      e++;
      setEtapa(e);
      if (e >= 4) clearInterval(interval);
    }, 1200);
  };

  const getStepStatus = (index) => {
    if (!processando) return "pending";
    if (index < etapa) return "done";
    if (index === etapa) return "active";
    return "pending";
  };

  return (
    <div className="fade-in" style={{ padding: "32px 40px", maxWidth: 1000, margin: "0 auto" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 26, color: "#1d1d1d", marginBottom: 4 }}>
          Envio de Dados
        </h1>
        <p style={{ fontSize: 15, color: "#6b7280" }}>Envie sua planilha de vendas. A DAAT. cuida do resto.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 24, marginBottom: 24 }}>
        {/* Upload zone */}
        <div className="card">
          {!uploaded ? (
            <>
              <div
                className={`upload-zone ${dragOver ? "drag-over" : ""}`}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setDragOver(false); simularUpload(); }}
                onClick={simularUpload}
                style={{ marginBottom: 20 }}
              >
                <div style={{ fontSize: 48, marginBottom: 16 }}>📂</div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: "#1d1d1d", marginBottom: 8 }}>
                  Arraste sua planilha aqui
                </h3>
                <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 16, lineHeight: 1.6 }}>
                  Aceita Excel (.xlsx), CSV (.csv) ou cole o link do Google Sheets
                </p>
                <button className="btn-primary">Selecionar arquivo</button>
                <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 12, fontFamily: "'DM Mono', monospace" }}>
                  Tamanho máximo: 50 MB
                </p>
              </div>

              <div style={{ padding: "16px", background: "#f0f7fd", borderRadius: 12, display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 20 }}>🔗</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#1d1d1d", marginBottom: 2 }}>Conectar Google Sheets</p>
                  <p style={{ fontSize: 12, color: "#6b7280" }}>Sincronização automática a cada 24h</p>
                </div>
                <button className="btn-secondary" style={{ fontSize: 12, padding: "8px 14px" }}>Conectar</button>
              </div>
            </>
          ) : (
            <>
              <div style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0", borderRadius: 12, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <span style={{ fontSize: 20 }}>✅</span>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#15803d" }}>vendas-maio-2026.xlsx recebido</p>
                  <p style={{ fontSize: 12, color: "#6b7280", fontFamily: "'DM Mono', monospace" }}>431 linhas · 6 colunas · 84 KB</p>
                </div>
              </div>

              {/* Preview */}
              <div>
                <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: "#1d1d1d", marginBottom: 12 }}>
                  Prévia dos dados (5 primeiras linhas)
                </p>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                    <thead>
                      <tr style={{ background: "#f8fafc" }}>
                        {["Data", "Cliente", "Serviço", "Valor", "Profissional"].map(h => (
                          <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontFamily: "'DM Mono', monospace", color: "#6b7280", fontWeight: 600, fontSize: 11, borderBottom: "1.5px solid #e5e7eb" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {previewData.map((row, i) => (
                        <tr key={i} style={{ borderBottom: "1px solid #f3f4f6", background: row.cliente === "Sem cadastro" ? "#fff7ed" : "white" }}>
                          <td style={{ padding: "8px 12px", fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#374151" }}>{row.data}</td>
                          <td style={{ padding: "8px 12px", color: row.cliente === "Sem cadastro" ? "#b45309" : "#374151", fontWeight: row.cliente === "Sem cadastro" ? 600 : 400 }}>{row.cliente}</td>
                          <td style={{ padding: "8px 12px", color: "#374151" }}>{row.servico}</td>
                          <td style={{ padding: "8px 12px", fontFamily: "'DM Mono', monospace", fontWeight: 600, color: "#1d1d1d" }}>{row.valor}</td>
                          <td style={{ padding: "8px 12px", color: "#374151" }}>{row.profissional}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Status de processamento */}
        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: "#1d1d1d", marginBottom: 16 }}>
              Status do Processamento
            </h3>
            {etapas.map((e, i) => {
              const status = getStepStatus(i);
              return (
                <div key={i} className="progress-step">
                  <div className={`step-icon ${status === "done" ? "step-done" : status === "active" ? "step-active" : "step-pending"}`}>
                    {status === "done" ? "✓" : status === "active" ? "⟳" : "○"}
                  </div>
                  <span style={{ fontSize: 13, color: status === "pending" ? "#9ca3af" : "#1d1d1d", fontWeight: status === "active" ? 600 : 400 }}>{e.label}</span>
                </div>
              );
            })}
            {processando && (
              <div style={{ marginTop: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: "#6b7280" }}>Progresso</span>
                  <span style={{ fontSize: 12, fontFamily: "'DM Mono', monospace", color: "#1e84c3", fontWeight: 600 }}>{Math.min(etapa * 25, 100)}%</span>
                </div>
                <div style={{ background: "#f3f4f6", borderRadius: 999, height: 8, overflow: "hidden" }}>
                  <div style={{ width: `${Math.min(etapa * 25, 100)}%`, height: "100%", background: "linear-gradient(90deg, #1e84c3, #3b9fd6)", borderRadius: 999, transition: "width 0.5s ease" }} />
                </div>
              </div>
            )}
          </div>

          {/* Dica de qualidade */}
          <div style={{ background: "#fff7ed", border: "1.5px solid #fed7aa", borderRadius: 14, padding: "16px 18px" }}>
            <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 18 }}>⚠️</span>
              <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: "#1d1d1d" }}>Qualidade dos dados</p>
            </div>
            <p style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.6, marginBottom: 12 }}>
              Seus dados têm <strong>12 registros "Sem cadastro"</strong>. Corrigir isso pode melhorar a precisão das análises em até 15%.
            </p>
            <button className="btn-secondary" style={{ fontSize: 12, padding: "8px 14px" }}>
              📖 Como organizar minha planilha
            </button>
          </div>
        </div>
      </div>

      {/* Histórico */}
      <div className="card">
        <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: "#1d1d1d", marginBottom: 18 }}>
          Histórico de Envios
        </h3>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr>
              {["Data", "Arquivo", "Status", "Ação"].map(h => (
                <th key={h} style={{ textAlign: "left", fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#9ca3af", fontWeight: 600, padding: "8px 12px", borderBottom: "1.5px solid #f3f4f6" }}>{h.toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {historicoArquivos.map((a) => (
              <tr key={a.id} style={{ borderBottom: "1px solid #f9fafb" }}>
                <td style={{ padding: "12px 12px", fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#6b7280" }}>{a.data}</td>
                <td style={{ padding: "12px 12px", color: "#374151", fontWeight: 500 }}>📄 {a.arquivo}</td>
                <td style={{ padding: "12px 12px" }}>
                  <span style={{ background: "#dcfce7", color: "#15803d", padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>
                    ✓ {a.status}
                  </span>
                </td>
                <td style={{ padding: "12px 12px" }}>
                  <button className="btn-secondary" style={{ fontSize: 12, padding: "6px 12px" }}>Ver relatório</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ─── Main App ────────────────────────────────────────────────────────────────────
export default function App() {
  const [pagina, setPagina] = useState("dashboard");
  const [notificacoes] = useState(3);

  const navItems = [
    { id: "dashboard", icon: "⊞", label: "Dashboard" },
    { id: "relatorio", icon: "📊", label: "Relatório" },
    { id: "upload", icon: "⬆", label: "Dados" },
  ];

  const titulos = {
    dashboard: "Dashboard",
    relatorio: "Relatório de Maio 2026",
    upload: "Envio de Dados",
  };

  return (
    <>
      <FontLoader />
      <div style={{ display: "flex", height: "100vh", background: "#f4f4f6", fontFamily: "'DM Sans', sans-serif" }}>
        {/* Sidebar */}
        <div style={{
          width: 220, background: "#fff", borderRight: "1px solid #f3f4f6",
          display: "flex", flexDirection: "column", padding: "24px 16px",
          flexShrink: 0, boxShadow: "2px 0 8px rgba(0,0,0,0.04)"
        }}>
          <div style={{ marginBottom: 36, padding: "0 4px" }}>
            <DaatLogo size="md" />
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#9ca3af", marginTop: 4, letterSpacing: "0.5px" }}>
              ANALISTA DE DADOS
            </p>
          </div>

          {/* Cliente */}
          <div style={{ background: "#f8fafc", borderRadius: 12, padding: "12px 14px", marginBottom: 24, border: "1.5px solid #e8f4fc" }}>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#1e84c3", fontWeight: 600, letterSpacing: "0.5px", marginBottom: 4 }}>CLIENTE ATIVO</p>
            <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: "#1d1d1d", marginBottom: 2 }}>Kingsman Barbearia</p>
            <p style={{ fontSize: 11, color: "#6b7280" }}>Plano Analista Recorrente</p>
          </div>

          <nav style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#9ca3af", fontWeight: 600, padding: "4px 16px", letterSpacing: "0.5px", marginBottom: 4 }}>NAVEGAÇÃO</p>
            {navItems.map(item => (
              <div
                key={item.id}
                className={`sidebar-link ${pagina === item.id ? "active" : ""}`}
                onClick={() => setPagina(item.id)}
              >
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                <span>{item.label}</span>
                {item.id === "dashboard" && notificacoes > 0 && (
                  <span style={{ marginLeft: "auto", background: "#1e84c3", color: "#fff", borderRadius: 999, width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>
                    {notificacoes}
                  </span>
                )}
              </div>
            ))}
          </nav>

          <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #1e84c3, #3b9fd6)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 14, fontFamily: "'Syne', sans-serif" }}>
                C
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#1d1d1d" }}>Claytão</p>
                <p style={{ fontSize: 11, color: "#9ca3af", fontFamily: "'DM Mono', monospace" }}>Proprietário</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Header */}
          <div style={{
            background: "#fff", borderBottom: "1px solid #f3f4f6",
            padding: "0 40px", height: 64,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexShrink: 0, boxShadow: "0 1px 4px rgba(0,0,0,0.04)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 17, color: "#1d1d1d" }}>
                {titulos[pagina]}
              </h2>
              {pagina === "relatorio" && (
                <span style={{ background: "#e8f4fc", color: "#1e84c3", padding: "3px 10px", borderRadius: 999, fontSize: 11, fontFamily: "'DM Mono', monospace", fontWeight: 600 }}>
                  MAIO 2026
                </span>
              )}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#f0fdf4", padding: "6px 12px", borderRadius: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#16a34a" }} />
                <span style={{ fontSize: 12, color: "#15803d", fontFamily: "'DM Mono', monospace", fontWeight: 600 }}>Dados atualizados</span>
              </div>
              <div style={{ position: "relative", cursor: "pointer" }}>
                <span style={{ fontSize: 20 }}>🔔</span>
                {notificacoes > 0 && (
                  <span style={{ position: "absolute", top: -4, right: -4, background: "#dc2626", color: "#fff", borderRadius: 999, width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>
                    {notificacoes}
                  </span>
                )}
              </div>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #1e84c3, #3b9fd6)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 14, fontFamily: "'Syne', sans-serif", cursor: "pointer" }}>
                C
              </div>
            </div>
          </div>

          {/* Page content */}
          <div style={{ flex: 1, overflowY: "auto" }}>
            {pagina === "dashboard" && <Dashboard />}
            {pagina === "relatorio" && <Relatorio />}
            {pagina === "upload" && <Upload />}
          </div>
        </div>
      </div>
    </>
  );
}
