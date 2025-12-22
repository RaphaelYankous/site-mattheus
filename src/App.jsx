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
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="text-center mb-12"
  >
    <span className="text-yellow-500 font-bold tracking-widest uppercase text-sm">{subtitle}</span>
    <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">{title}</h2>
  </motion.div>
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
            Mattheus<span className="text-yellow-500">Tubertini</span>
          </div>
          <a href="https://wa.me/553196590609" className="bg-yellow-500 hover:bg-yellow-400 text-[#0B0F19] font-bold py-2 px-6 rounded-full transition-all text-sm shadow-lg shadow-yellow-500/20">
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
          
          {/* Foto animada vindo da esquerda */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-bl from-yellow-500/20 to-transparent rounded-2xl blur-2xl -z-10"></div>
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
              <img src={mattheusCasal} alt="Mattheus Casal" className="w-full h-full object-cover transition-all duration-700" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0B0F19] to-transparent p-6 pt-20">
                <p className="text-white font-bold flex items-center gap-2"><Heart size={18} className="text-yellow-500" /> Vida Real</p>
              </div>
            </div>
          </motion.div>

          {/* Texto animado vindo da direita */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="text-yellow-500 font-bold tracking-widest uppercase text-sm">Meu Propósito</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-6">Mais que números, <br/>construir sonhos.</h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-6 border-l-2 border-yellow-500/30 pl-4">
              "Sou apaixonado por ajudar pessoas a acreditarem em seus próprios potenciais e conquistarem a liberdade para viver o que realmente importa."
            </p>
            <p className="text-slate-400 mb-6">
              Minha missão não é apenas fazer seu dinheiro render, mas te dar a tranquilidade e a autonomia necessárias para você focar na sua família, nos seus hobbies e no seu futuro, sem a ansiedade financeira.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* --- TRAJETÓRIA (FOTO ONE) --- */}
      <section className="py-24 relative z-10 bg-gradient-to-b from-[#0B0F19] to-[#05080f] border-t border-white/5">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <span className="text-yellow-500 font-bold tracking-widest uppercase text-sm">Trajetória Sólida</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-8">Do "Skin in the Game"<br/>à Sala de Aula.</h2>
            
            <div className="space-y-8 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-[1px] before:bg-gradient-to-b before:from-yellow-500 before:to-transparent">
              {/* Item 1 */}
              <div className="relative pl-16 group">
                <div className="absolute left-4 top-1 w-4 h-4 rounded-full bg-[#0B0F19] border-2 border-yellow-500 group-hover:shadow-[0_0_10px_rgba(212,175,55,0.8)] transition-all"></div>
                <h3 className="text-white font-bold text-lg group-hover:text-yellow-500 transition-colors">Trader & Mesa Proprietária</h3>
                <p className="text-slate-500 text-sm">One Investimentos | WM Manhattan (Desde 2018)</p>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed">Vivência prática operando capital real, gestão de risco e retorno sob pressão.</p>
              </div>
              {/* Item 2 */}
              <div className="relative pl-16 group">
                <div className="absolute left-4 top-1 w-4 h-4 rounded-full bg-[#0B0F19] border-2 border-yellow-500 group-hover:shadow-[0_0_10px_rgba(212,175,55,0.8)] transition-all"></div>
                <h3 className="text-white font-bold text-lg group-hover:text-yellow-500 transition-colors">Sócio & Gestão</h3>
                <p className="text-slate-500 text-sm">Kairós Vellar | Flip Investimentos</p>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed">Experiência na estruturação de negócios e relacionamento com clientes.</p>
              </div>
              {/* Item 3 */}
              <div className="relative pl-16 group">
                <div className="absolute left-4 top-1 w-4 h-4 rounded-full bg-[#0B0F19] border-2 border-yellow-500 group-hover:shadow-[0_0_10px_rgba(212,175,55,0.8)] transition-all"></div>
                <h3 className="text-white font-bold text-lg group-hover:text-yellow-500 transition-colors">Professor de Finanças</h3>
                <p className="text-slate-500 text-sm">Colégio Arnaldo (Atual)</p>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed">Traduzindo o "economês" com didática e paciência para formar novos investidores.</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 md:order-2 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent rounded-2xl blur-2xl -z-10"></div>
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl -rotate-2 hover:rotate-0 transition-all duration-500">
              <img src={mattheusOne} alt="Mattheus na ONE" className="w-full h-full object-cover transition-all duration-700" />
            </div>
          </motion.div>
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
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }} // Delay escalonado para efeito cascata
                viewport={{ once: true }}
                whileHover={{ y: -10 }} 
                className="group p-8 rounded-2xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/5 hover:border-yellow-500/30 backdrop-blur-md transition-all duration-300"
              >
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
            <a href="https://wa.me/553196590609" className="flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-green-500 hover:bg-green-400 text-white font-bold transition-all shadow-lg shadow-green-500/20">
              <MessageCircle size={20} /> Chamar no WhatsApp
            </a>
            <a href="https://linkedin.com/in/mattheus-tubertini-investimentos" target="_blank" className="flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[#0077b5]/10 hover:bg-[#0077b5]/20 border border-[#0077b5]/30 text-[#0077b5] font-bold transition-all">
              <Linkedin size={20} /> Ver LinkedIn
            </a>
          </div>
          
          {/* --- BARRA INFERIOR --- */}
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-700 text-xs">© 2025 Mattheus Tubertini.</p>
            
            <div className="flex items-center gap-2 text-sm text-slate-600">
                <span>Desenvolvido por</span>
                <a 
                  href="https://dev-yankous.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group hover:text-white transition-colors font-mono"
                >
                  <span className="text-yellow-500 transition-colors">&lt;</span> 
                  Raphael Yankous 
                  <span className="text-yellow-500 transition-colors">/&gt;</span>
                </a>
            </div>
          </div>

        </div>
      </footer>
      <a 
        href="https://www.instagram.com/mattheustubertini/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-24 right-6 z-50 flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white rounded-full shadow-[0_4px_14px_0_rgba(220,39,67,0.39)] transition-all hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(220,39,67,0.23)]"
        aria-label="Siga no Instagram"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      </a>
      <a 
        href="https://wa.me/553196590609" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] transition-all hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(37,211,102,0.23)]"
        aria-label="Conversar no WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div> 
  );
}

export default App;
