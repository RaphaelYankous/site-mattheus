import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock, ExternalLink, Loader2 } from 'lucide-react';

// URL do RSS do Substack convertida para JSON (para evitar bloqueio e facilitar leitura)
const RSS_URL = "https://api.rss2json.com/v1/api.json?rss_url=https://aftermarketfl.substack.com/feed";

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

const BlogDynamic = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(RSS_URL)
      .then(res => res.json())
      .then(data => {
        // Pegamos apenas os 3 primeiros posts
        const items = data.items.slice(0, 3).map(item => {
            // Tenta extrair a primeira imagem do conteúdo se não vier thumbnail
            let image = item.thumbnail;
            if (!image) {
                const imgMatch = item.content.match(/<img[^>]+src="([^">]+)"/);
                if (imgMatch) image = imgMatch[1];
            }
            // Fallback se não tiver imagem nenhuma
            if (!image) image = "https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=800&auto=format&fit=crop";

            // Limpa o texto da descrição (remove tags HTML)
            const cleanDesc = item.description.replace(/<[^>]+>/g, '').substring(0, 120) + "...";

            return {
                title: item.title,
                link: item.link,
                date: new Date(item.pubDate).toLocaleDateString('pt-BR'),
                image: image,
                category: "Artigo", // Substack não envia categoria fácil, deixamos genérico ou "Newsletter"
                excerpt: cleanDesc
            };
        });
        setPosts(items);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao buscar blog:", err);
        setError(true);
        setLoading(false);
      });
  }, []);

  if (error) return null; // Se der erro, esconde a seção para não quebrar o site

  return (
    <section id="blog" className="py-24 relative z-10 bg-[#0B0F19]">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <SectionTitle subtitle="Conteúdo Recente" title="Últimas do Blog" />
          <a href="https://aftermarketfl.substack.com/" target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center gap-2 text-yellow-500 font-bold hover:text-yellow-400 transition-colors">
            Ver blog completo <ArrowUpRight size={18} />
          </a>
        </div>

        {loading ? (
            <div className="flex justify-center items-center py-20">
                <Loader2 className="animate-spin text-yellow-500 w-10 h-10" />
            </div>
        ) : (
            <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post, idx) => (
                <motion.a 
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group rounded-2xl overflow-hidden bg-white/[0.02] border border-white/5 hover:border-yellow-500/30 transition-all duration-300 flex flex-col h-full hover:-translate-y-2"
                >
                <div className="h-48 overflow-hidden relative">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all z-10"></div>
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 z-20">
                    <span className="bg-yellow-500 text-[#0B0F19] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {post.category}
                    </span>
                    </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-slate-500 text-xs mb-3">
                    <Clock size={14} /> {post.date}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-500 transition-colors line-clamp-2">
                    {post.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                    </p>
                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-sm font-bold text-white group-hover:underline decoration-yellow-500 underline-offset-4 transition-all">Ler no Substack</span>
                    <ExternalLink size={16} className="text-slate-500 group-hover:text-yellow-500 transition-colors" />
                    </div>
                </div>
                </motion.a>
            ))}
            </div>
        )}
        
        <div className="mt-8 text-center md:hidden">
          <a href="https://aftermarketfl.substack.com/" target="_blank" className="inline-flex items-center gap-2 text-yellow-500 font-bold hover:text-yellow-400 transition-colors">
            Ver blog completo <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogDynamic;