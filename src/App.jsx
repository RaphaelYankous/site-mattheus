import mattheusOne from './assets/mattheus-one.jpg';
import mattheusSelfie from './assets/mattheus-selfie.jpg';
import mattheusFoto from './assets/mattheus-foto.png';
import mattheusCasal from './assets/mattheus-casal.jpg';
import React, { useCallback } from 'react';
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import { motion } from 'framer-motion';
import { TrendingUp, Shield, GraduationCap, ChevronRight, Mail, Linkedin, Clock, Briefcase, BookOpen, MessageCircle, Award, Heart } from 'lucide-react';


const SectionTitle = ({ subtitle, title }) => (
  <div className="text-center mb-12">
    <span className="text-yellow-500 font-bold tracking-widest uppercase text-sm">{subtitle}</span>
    <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">{title}</h2>
  </div>
);

function App() {

  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans selection:bg-yellow-600 selection:text-white overflow-x-hidden relative">
      
      {/* --- FUNDO DE PARTÍCULAS --- */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          interactivity: {
            events: { onHover: { enable: true, mode: "grab" }, resize: true },
            modes: { grab: { distance: 140, links: { opacity: 0.5 } } },
          },
          particles: {
            color: { value: "#D4AF37" },
            links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.1, width: 1 },
            move: { enable: true, speed: 0.8, direction: "none", outModes: { default: "bounce" } },
            number: { density: { enable: true, area: 800 }, value: 50 },
            opacity: { value: 0.3 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 -z-0 pointer-events-none"
      />

      {/* --- NAVEGAÇÃO --- */}
      <nav className="fixed w-full z-50 bg-[#0B0F19]/80 backdrop-blur-lg border-b border-white/5">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tighter text-white">
            M<span className="text-yellow-500">.Tubertini</span>
          </div>
          <a href="https://wa.me/" className="bg-yellow-500 hover:bg-yellow-400 text-[#0B0F19] font-bold py-2 px-6 rounded-full transition-all text-sm shadow-lg shadow-yellow-500/20">
            Falar no WhatsApp
          </a>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-28 z-10">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-yellow-500 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-sm">
              <Shield size={12} /> Assessor Certificado Ancord
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tight">
              Sua Liberdade Financeira <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600">
                Construída com Estratégia.
              </span>
            </h1>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed max-w-lg border-l-2 border-yellow-500/50 pl-6">
              Uno a teoria econômica, a prática de Trader e a didática de professor para você investir com segurança e autonomia.
            </p>
            <a href="#servicos" className="bg-white text-[#0B0F19] font-bold py-4 px-8 rounded-lg inline-flex items-center gap-2 transition-all hover:bg-slate-200 shadow-xl">
              Conhecer Soluções <ChevronRight size={18} />
            </a>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative mx-auto w-full max-w-sm">
            <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/30 to-blue-600/30 rounded-[2rem] blur-3xl animate-pulse"></div>
            <div className="relative z-10 rounded-[2rem] overflow-hidden border-2 border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl rotate-3 hover:rotate-0 transition-all duration-500">
              <img src={mattheusFoto} alt="Mattheus Foto Principal" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- CREDENCIAIS (BARRA DE AUTORIDADE) --- */}
      <section className="border-y border-white/5 bg-white/[0.02] backdrop-blur-md relative z-10">
        <div className="container mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/5">
            <div>
              <Clock size={24} className="text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">+7 Anos</p>
              <p className="text-slate-500 text-xs uppercase tracking-wider">de Mercado (Desde 2018)</p>
            </div>
            <div>
              <Award size={24} className="text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">Ancord</p>
              <p className="text-slate-500 text-xs uppercase tracking-wider">Certificação Profissional</p>
            </div>
            <div>
              <BookOpen size={24} className="text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">Tripla Formação</p>
              <p className="text-slate-500 text-xs uppercase tracking-wider">Economia | Direito | Adm.</p>
            </div>
            <div>
              <GraduationCap size={24} className="text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">Docente</p>
              <p className="text-slate-500 text-xs uppercase tracking-wider">Professor de Finanças</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- PROPÓSITO (FOTO CASAL) --- */}
      <section id="sobre" className="py-24 relative z-10 bg-[#0B0F19]">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-bl from-yellow-500/20 to-transparent rounded-2xl blur-2xl -z-10"></div>
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
              <img src={mattheusCasal} alt="Mattheus Casal" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0B0F19] to-transparent p-6 pt-20">
                <p className="text-white font-bold flex items-center gap-2"><Heart size={18} className="text-yellow-500" /> Vida Real</p>
              </div>
            </div>
          </div>
          <div>
            <span className="text-yellow-500 font-bold tracking-widest uppercase text-sm">Meu Propósito</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-6">Mais que números, <br/>construir sonhos.</h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-6 border-l-2 border-yellow-500/30 pl-4">
              "Sou apaixonado por ajudar pessoas a acreditarem em seus próprios potenciais e conquistarem a liberdade para viver o que realmente importa."
            </p>
            <p className="text-slate-400 mb-6">
              Minha missão não é apenas fazer seu dinheiro render, mas te dar a tranquilidade e a autonomia necessárias para você focar na sua família, nos seus hobbies e no seu futuro, sem a ansiedade financeira.
            </p>
          </div>
        </div>
      </section>

      {/* --- TRAJETÓRIA (FOTO ONE) --- */}
      <section className="py-24 relative z-10 bg-gradient-to-b from-[#0B0F19] to-[#05080f] border-t border-white/5">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <span className="text-yellow-500 font-bold tracking-widest uppercase text-sm">Trajetória Sólida</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-8">Do "Skin in the Game"<br/>à Sala de Aula.</h2>
            
            <div className="space-y-8 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-[1px] before:bg-gradient-to-b before:from-yellow-500 before:to-transparent">
              <div className="relative pl-16 group">
                <div className="absolute left-4 top-1 w-4 h-4 rounded-full bg-[#0B0F19] border-2 border-yellow-500 group-hover:shadow-[0_0_10px_rgba(212,175,55,0.8)] transition-all"></div>
                <h3 className="text-white font-bold text-lg group-hover:text-yellow-500 transition-colors">Trader & Mesa Proprietária</h3>
                <p className="text-slate-500 text-sm">One Investimentos | WM Manhattan (Desde 2018)</p>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed">Vivência prática operando capital real, gestão de risco e retorno sob pressão.</p>
              </div>
              <div className="relative pl-16 group">
                <div className="absolute left-4 top-1 w-4 h-4 rounded-full bg-[#0B0F19] border-2 border-yellow-500 group-hover:shadow-[0_0_10px_rgba(212,175,55,0.8)] transition-all"></div>
                <h3 className="text-white font-bold text-lg group-hover:text-yellow-500 transition-colors">Sócio & Gestão</h3>
                <p className="text-slate-500 text-sm">Kairós Vellar | Flip Investimentos</p>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed">Experiência na estruturação de negócios e relacionamento com clientes.</p>
              </div>
              <div className="relative pl-16 group">
                <div className="absolute left-4 top-1 w-4 h-4 rounded-full bg-[#0B0F19] border-2 border-yellow-500 group-hover:shadow-[0_0_10px_rgba(212,175,55,0.8)] transition-all"></div>
                <h3 className="text-white font-bold text-lg group-hover:text-yellow-500 transition-colors">Professor de Finanças</h3>
                <p className="text-slate-500 text-sm">Colégio Arnaldo (Atual)</p>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed">Traduzindo o "economês" com didática e paciência para formar novos investidores.</p>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent rounded-2xl blur-2xl -z-10"></div>
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl -rotate-2 hover:rotate-0 transition-all duration-500">
              <img src={mattheusOne} alt="Mattheus na ONE" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* --- LIFESTYLE / CITAÇÃO (FOTO SELFIE) --- */}
      <section className="py-20 relative z-10 bg-[#05080f] border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-white/[0.03] to-transparent p-8 md:p-12 rounded-3xl border border-white/5 backdrop-blur-md flex flex-col md:flex-row gap-10 items-center relative overflow-hidden">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl"></div>
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/10 shadow-xl shrink-0 relative z-10">
              <img src={mattheusSelfie} alt="Mattheus Selfie" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 text-center md:text-left">
              <p className="text-2xl md:text-3xl italic font-serif text-white leading-relaxed mb-6">
                "O mercado financeiro não é um fim em si mesmo, é o meio para você conquistar a vida que deseja. Meu papel é te guiar nesse caminho com clareza."
              </p>
              <p className="text-yellow-500 font-bold">— Mattheus Tubertini</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVIÇOS --- */}
      <section id="servicos" className="py-24 relative z-10 bg-[#0B0F19]">
        <div className="container mx-auto px-6">
          <SectionTitle subtitle="O Que Ofereço" title="Soluções Personalizadas" />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Clock size={32} />, title: "Planejamento Financeiro", text: "Organização estratégica do fluxo de caixa, quitação de dívidas e definição de metas de curto e longo prazo." },
              { icon: <TrendingUp size={32} />, title: "Gestão de Investimentos", text: "Montagem e acompanhamento de carteira (Renda Fixa, Ações, FIIs) alinhada ao seu perfil de risco." },
              { icon: <BookOpen size={32} />, title: "Mentoria Educacional", text: "Aulas particulares para quem quer aprender a analisar o mercado e investir com total autonomia." }
            ].map((item, idx) => (
              <motion.div key={idx} whileHover={{ y: -10 }} className="group p-8 rounded-2xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/5 hover:border-yellow-500/30 backdrop-blur-md transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500 mb-6 group-hover:bg-yellow-500 group-hover:text-[#0B0F19] transition-all shadow-lg shadow-yellow-500/5">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer id="contato" className="py-20 border-t border-white/5 bg-[#030508] relative z-10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8 text-white">Vamos conversar?</h2>
          <p className="text-slate-400 mb-10 max-w-md mx-auto">Agende uma conversa inicial sem compromisso para entendermos o seu momento financeiro.</p>
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-12">
            <a href="https://wa.me/" className="flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-green-500 hover:bg-green-400 text-white font-bold transition-all shadow-lg shadow-green-500/20">
              <MessageCircle size={20} /> Chamar no WhatsApp
            </a>
            <a href="https://linkedin.com/in/mattheus-tubertini-investimentos" target="_blank" className="flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[#0077b5]/10 hover:bg-[#0077b5]/20 border border-[#0077b5]/30 text-[#0077b5] font-bold transition-all">
              <Linkedin size={20} /> Ver LinkedIn
            </a>
          </div>
          <p className="text-slate-700 text-xs">© 2025 Mattheus Tubertini.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;