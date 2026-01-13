// src/CalculadoraPro.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Calculator, TrendingUp, DollarSign, Target, Clock, AlertCircle } from 'lucide-react';

// Registrar componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const CalculadoraPro = () => {
  // --- ESTADOS ---
  const [mode, setMode] = useState('time'); // 'time', 'target', 'withdraw'
  const [showTable, setShowTable] = useState(false);
  
  // Inputs
  const [inputs, setInputs] = useState({
    initialInvestment: 0,
    withdrawInitial: 1000000,
    currentIncome: 5000,
    costOfLiving: 3500,
    monthlyContrib: 1500,
    monthlyWithdraw: 4000,
    years: 20,
    targetIncome: 5000,
    interestRate: 11.25, // Selic aprox
    inflationRate: 4.5,  // IPCA aprox
    contribGrowth: 0,    // Aumento real aporte
    taxRate: 15          // IR
  });

  // Resultados
  const [results, setResults] = useState({
    val1: "R$ 0,00",
    val2: "R$ 0,00",
    progress: 0,
    label1: "",
    sub1: "",
    label2: "",
    sub2: "",
    chartData: null,
    tableData: []
  });

  // --- BUSCAR DADOS API (SELIC/IPCA) ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Selic
        const resSelic = await fetch('https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados/ultimos/1?formato=json');
        const dataSelic = await resSelic.json();
        if (dataSelic[0]) handleChange('interestRate', dataSelic[0].valor);

        // IPCA (Fallback estático pois API do IBGE é instável em CORS)
        // Se quiser implementar: https://servicodados.ibge.gov.br/api/v3/agregados/1737/...
      } catch (e) { console.log("Erro API", e); }
    };
    fetchData();
  }, []);

  // --- HANDLERS ---
  const handleChange = (field, value) => {
    // Tratamento simples de string para numero
    let val = value;
    if (typeof value === 'string') {
        val = parseFloat(value.replace(/\./g, '').replace(',', '.')) || 0;
        // Se for campo de porcentagem, manter decimal
        if (['interestRate', 'inflationRate', 'contribGrowth', 'taxRate'].includes(field)) {
            val = parseFloat(value.replace(',', '.')) || 0;
        }
    }
    setInputs(prev => {
        const novo = { ...prev, [field]: val };
        // Lógica de interdependência (Renda - Custo = Aporte)
        if (mode !== 'withdraw') {
            if (field === 'currentIncome') novo.monthlyContrib = val - prev.costOfLiving;
            if (field === 'costOfLiving') novo.monthlyContrib = prev.currentIncome - val;
            if (field === 'monthlyContrib') novo.costOfLiving = prev.currentIncome - val;
        }
        return novo;
    });
  };

  // --- CÁLCULO PRINCIPAL ---
  useEffect(() => {
    calculate();
  }, [inputs, mode]);

  const calculate = () => {
    const initialInv = mode === 'withdraw' ? inputs.withdrawInitial : inputs.initialInvestment;
    const i_nominal = inputs.interestRate / 100;
    const inflacao = inputs.inflationRate / 100;
    const tax = inputs.taxRate / 100;
    const growth = inputs.contribGrowth / 100;
    
    // Taxa Real
    let i_real_anual = ((1 + i_nominal) / (1 + inflacao)) - 1;
    if (i_real_anual <= 0) i_real_anual = 0.0001;
    let i_real_mensal = Math.pow(1 + i_real_anual, 1/12) - 1;

    let saldo = initialInv;
    let totalInvestido = initialInv;
    let totalJuros = 0;
    let aporteAtual = inputs.monthlyContrib;
    let saqueAtual = inputs.monthlyWithdraw;

    let labels = [];
    let dataSaldo = [];
    let dataInvestido = [];
    let tableRows = [];

    let yearsToCalc = mode === 'target' ? 100 : inputs.years;
    let foundTarget = false;
    let finalYears = 0;

    // Loop Mensal
    for (let m = 1; m <= yearsToCalc * 12; m++) {
        // Juros
        let juros = saldo * i_real_mensal;
        totalJuros += juros;
        saldo += juros;

        // Movimento
        if (mode === 'withdraw') {
            saldo -= saqueAtual;
            if (saldo < 0) saldo = 0;
        } else {
            saldo += aporteAtual;
            totalInvestido += aporteAtual;
        }

        // Reajuste Anual Aporte
        if (mode !== 'withdraw' && m % 12 === 0) {
            aporteAtual = aporteAtual * (1 + growth);
        }

        // Checagem Meta (Target)
        if (mode === 'target' && !foundTarget) {
            let impostoEst = (saldo - totalInvestido) * tax;
            if (impostoEst < 0) impostoEst = 0;
            let liq = saldo - impostoEst;
            let renda = liq * i_real_mensal;
            
            // Meta: Renda Passiva cobrir Custo de Vida (input targetIncome)
            // No modo target, usamos targetIncomeInput que no state chamei de targetIncome
            // Mas visualmente o usuario ve "Renda Desejada"
            if (renda >= inputs.targetIncome) {
                finalYears = m / 12;
                foundTarget = true;
                yearsToCalc = Math.ceil(finalYears) + 2; // Mostra um pouco depois
            }
        }

        // Dados Gráfico/Tabela (Anual)
        if (m % 12 === 0 || m === 1) {
            let year = Math.floor(m / 12);
            let imposto = (saldo - totalInvestido) * tax;
            if (imposto < 0) imposto = 0;
            let liq = saldo - imposto;

            labels.push(`Ano ${year}`);
            dataSaldo.push(liq);
            dataInvestido.push(totalInvestido);

            if (year > 0) {
                tableRows.push({
                    year,
                    aporte: mode === 'withdraw' ? 0 : aporteAtual,
                    investido: totalInvestido,
                    juros: totalJuros,
                    imposto,
                    saldo: liq
                });
            }
        }
        if (foundTarget && m >= yearsToCalc * 12) break;
    }

    // Resultados Finais
    let impostoFinal = (saldo - totalInvestido) * tax;
    if (impostoFinal < 0) impostoFinal = 0;
    let saldoFinal = saldo - impostoFinal;
    let rendaFinal = saldoFinal * i_real_mensal;
    const fmt = (v) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);

    let res = { ...results };
    res.tableData = tableRows;

    if (mode === 'time') {
        res.label1 = "Patrimônio Líquido Final";
        res.sub1 = "Já descontado IR e Inflação";
        res.val1 = fmt(saldoFinal);
        
        res.label2 = "Renda Vitalícia Mensal";
        res.sub2 = "Sacando apenas juros reais";
        res.val2 = fmt(rendaFinal);

        let perc = (rendaFinal / inputs.costOfLiving) * 100;
        res.progress = Math.min(perc, 100);
    } 
    else if (mode === 'target') {
        res.label1 = "Tempo Necessário";
        res.sub1 = "Para atingir liberdade";
        res.label2 = "Patrimônio Alvo";
        res.sub2 = "Valor necessário acumulado";

        if (!foundTarget) {
            res.val1 = "+100 anos";
            res.val2 = "Inatingível";
            res.progress = 0;
        } else {
            let anos = Math.floor(finalYears);
            let meses = Math.round((finalYears - anos) * 12);
            res.val1 = `${anos} anos e ${meses} meses`;
            let meta = inputs.targetIncome / i_real_mensal;
            res.val2 = fmt(meta);
            
            // Progresso
            let liqHoje = (inputs.initialInvestment - (inputs.initialInvestment * tax));
            let rendaHoje = liqHoje * i_real_mensal;
            res.progress = Math.min((rendaHoje / inputs.targetIncome) * 100, 100);
        }
    }
    else if (mode === 'withdraw') {
        res.label1 = "Saldo Restante";
        res.sub1 = "Após o período selecionado";
        res.val1 = fmt(saldoFinal);
        
        res.label2 = "Renda Segura Inicial";
        res.sub2 = "Sem tocar no principal";
        let segura = inputs.withdrawInitial * i_real_mensal;
        res.val2 = fmt(segura);
        res.progress = 0;
    }

    // Config Gráfico
    res.chartData = {
        labels,
        datasets: [
            {
                label: 'Patrimônio Líquido',
                data: dataSaldo,
                borderColor: '#16a34a', // Green 600
                backgroundColor: 'rgba(22, 163, 74, 0.1)',
                fill: true,
                tension: 0.3
            },
            mode !== 'withdraw' ? {
                label: 'Total Investido',
                data: dataInvestido,
                borderColor: '#9ca3af', // Gray 400
                backgroundColor: 'transparent',
                borderDash: [5, 5],
                tension: 0.3
            } : null
        ].filter(Boolean)
    };

    setResults(res);
  };

  // --- COMPONENTES VISUAIS ---
  const InputMoney = ({ label, value, field, color = "brand" }) => (
    <div>
      <label className="block text-sm font-bold text-slate-400 mb-1">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-3 text-slate-500 font-bold">R$</span>
        <input 
            type="text"
            className={`w-full bg-[#0B0F19] border border-white/10 rounded-lg px-4 py-2.5 pl-10 text-white focus:outline-none focus:border-${color === 'red' ? 'red-500' : 'yellow-500'} transition-colors font-bold`}
            value={new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(value)}
            onChange={(e) => handleChange(field, e.target.value)}
        />
      </div>
    </div>
  );

  return (
    <section id="calculadora-pro" className="py-24 relative z-10 bg-[#0B0F19] border-t border-white/5">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <span className="text-yellow-500 font-bold tracking-widest uppercase text-sm">Ferramenta Premium</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Simulador de Liberdade Financeira</h2>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
                {/* --- CONTROLES (ESQUERDA) --- */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Abas */}
                    <div className="flex bg-white/5 rounded-lg p-1">
                        <button onClick={() => setMode('time')} className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${mode === 'time' ? 'bg-yellow-500 text-[#0B0F19]' : 'text-slate-400 hover:text-white'}`}>Acumular</button>
                        <button onClick={() => setMode('target')} className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${mode === 'target' ? 'bg-yellow-500 text-[#0B0F19]' : 'text-slate-400 hover:text-white'}`}>Meta</button>
                        <button onClick={() => setMode('withdraw')} className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${mode === 'withdraw' ? 'bg-yellow-500 text-[#0B0F19]' : 'text-slate-400 hover:text-white'}`}>Viver</button>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-5">
                        {mode !== 'withdraw' ? (
                            <InputMoney label="Já tenho investido" value={inputs.initialInvestment} field="initialInvestment" />
                        ) : (
                            <InputMoney label="Patrimônio Total" value={inputs.withdrawInitial} field="withdrawInitial" />
                        )}

                        {mode !== 'withdraw' && (
                            <>
                                <InputMoney label="Renda Líquida Mensal" value={inputs.currentIncome} field="currentIncome" />
                                <InputMoney label="Custo de Vida Mensal" value={inputs.costOfLiving} field="costOfLiving" color="red" />
                                <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                                    <InputMoney label="Capacidade de Aporte" value={inputs.monthlyContrib} field="monthlyContrib" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-yellow-500 mb-1">Aumento Real do Aporte (% a.a.)</label>
                                    <input type="number" value={inputs.contribGrowth} onChange={(e) => handleChange('contribGrowth', e.target.value)} className="w-full bg-[#0B0F19] border border-white/10 rounded-lg px-4 py-2 text-white" />
                                </div>
                            </>
                        )}

                        {mode === 'withdraw' && (
                            <InputMoney label="Retirada Mensal" value={inputs.monthlyWithdraw} field="monthlyWithdraw" color="red" />
                        )}

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 mb-1">Rentabilidade (%)</label>
                                <input type="number" value={inputs.interestRate} onChange={(e) => handleChange('interestRate', e.target.value)} className="w-full bg-[#0B0F19] border border-white/10 rounded-lg px-3 py-2 text-white" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 mb-1">Inflação (%)</label>
                                <input type="number" value={inputs.inflationRate} onChange={(e) => handleChange('inflationRate', e.target.value)} className="w-full bg-[#0B0F19] border border-white/10 rounded-lg px-3 py-2 text-white" />
                            </div>
                        </div>

                        {mode !== 'target' ? (
                             <div>
                                <label className="block text-sm font-bold text-slate-400 mb-1">Tempo (Anos)</label>
                                <input type="number" value={inputs.years} onChange={(e) => handleChange('years', e.target.value)} className="w-full bg-[#0B0F19] border border-white/10 rounded-lg px-4 py-2.5 text-white" />
                            </div>
                        ) : (
                            <InputMoney label="Renda Desejada (Meta)" value={inputs.targetIncome} field="targetIncome" />
                        )}
                    </div>
                </div>

                {/* --- RESULTADOS (DIREITA) --- */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-yellow-500/20 to-transparent border border-yellow-500/30 p-6 rounded-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-20 bg-yellow-500/10 blur-[60px] rounded-full"></div>
                            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">{results.label1}</h3>
                            <p className="text-3xl font-bold text-white relative z-10">{results.val1}</p>
                            <p className="text-xs text-slate-400 mt-1">{results.sub1}</p>
                        </div>
                        <div className="bg-[#0B0F19] border border-white/10 p-6 rounded-2xl">
                            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">{results.label2}</h3>
                            <p className="text-3xl font-bold text-blue-400">{results.val2}</p>
                            <p className="text-xs text-slate-400 mt-1">{results.sub2}</p>
                        </div>
                    </div>

                    {mode !== 'withdraw' && (
                        <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                            <div className="flex justify-between text-xs font-bold mb-2 text-slate-300">
                                <span>Progresso da Liberdade</span>
                                <span>{results.progress.toFixed(1)}%</span>
                            </div>
                            <div className="w-full bg-black/50 rounded-full h-3 overflow-hidden">
                                <div className="bg-gradient-to-r from-yellow-600 to-yellow-400 h-full rounded-full transition-all duration-700" style={{ width: `${results.progress}%` }}></div>
                            </div>
                        </div>
                    )}

                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 h-[400px]">
                        {results.chartData && (
                            <Line 
                                data={results.chartData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8' } } },
                                    scales: {
                                        y: { grid: { color: '#33415530' }, ticks: { color: '#94a3b8', callback: (v) => (v/1000)+'k' } },
                                        x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
                                    }
                                }}
                            />
                        )}
                    </div>

                    <div className="text-center">
                        <button onClick={() => setShowTable(!showTable)} className="text-sm text-yellow-500 hover:text-yellow-400 font-bold underline underline-offset-4">
                            {showTable ? 'Ocultar Tabela' : 'Ver Tabela Detalhada Ano a Ano'}
                        </button>
                    </div>

                    {showTable && (
                        <div className="bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden overflow-x-auto max-h-96">
                            <table className="w-full text-sm text-left text-slate-400">
                                <thead className="text-xs uppercase bg-black/20 text-slate-200">
                                    <tr>
                                        <th className="px-4 py-3">Ano</th>
                                        <th className="px-4 py-3 text-right">Aporte</th>
                                        <th className="px-4 py-3 text-right">Juros (Bruto)</th>
                                        <th className="px-4 py-3 text-right text-red-400">Imposto</th>
                                        <th className="px-4 py-3 text-right font-bold text-white">Saldo Líquido</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {results.tableData.map((row, i) => (
                                        <tr key={i} className="hover:bg-white/5 transition-colors">
                                            <td className="px-4 py-3 font-medium">{row.year}</td>
                                            <td className="px-4 py-3 text-right">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(row.aporte)}</td>
                                            <td className="px-4 py-3 text-right text-green-500">+{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(row.juros)}</td>
                                            <td className="px-4 py-3 text-right text-red-500">-{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(row.imposto)}</td>
                                            <td className="px-4 py-3 text-right font-bold text-white">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(row.saldo)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </section>
  );
};

export default CalculadoraPro;