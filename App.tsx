
import React, { useState, useEffect, useRef, useCallback } from 'react';

// --- Helper Functions & Data ---
const smoothScrollTo = (id: string) => {
    const element = document.getElementById(id);
    const header = document.querySelector('header');
    if (element && header) {
        const headerOffset = header.offsetHeight;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
};

const navLinks = [
    { href: "#sobre", text: "Sobre" },
    { href: "#estrutura", text: "Estrutura" },
    { href: "#quotas", text: "Quotas" },
    { href: "#atividades", text: "Atividades" },
    { href: "#calendario", text: "Calendário" },
    { href: "#contato", text: "Contacto" },
];

const quotasData = [
    { echelon: "I", category: "Membro Participante", responsibility: "Baixa", monthly: 10, annual: 120 },
    { echelon: "II", category: "Membro de Equipa", responsibility: "Média", monthly: 20, annual: 240 },
    { echelon: "III", category: "Diretoria Executiva", responsibility: "Alta", monthly: 35, annual: 420 },
    { echelon: "IV", category: "Conselho Administração", responsibility: "Máxima", monthly: 50, annual: 600 },
];

// --- Components ---

const LoadingScreen: React.FC = () => (
    <div className="fixed top-0 left-0 w-full h-full bg-[#1a3a8f] flex justify-center items-center z-[9999] transition-opacity duration-500 ease-in-out">
        <div className="text-center text-white">
            <div className="w-15 h-15 border-4 border-white/30 border-t-white rounded-full mx-auto mb-5 animate-spin"></div>
            <p>Carregando CESE-UJC...</p>
        </div>
    </div>
);

const Header: React.FC<{ isScrolled: boolean; isMenuOpen: boolean; onMenuToggle: () => void }> = ({ isScrolled, isMenuOpen, onMenuToggle }) => (
    <header className={`fixed top-0 left-0 w-full z-[1000] bg-white/95 backdrop-blur-md transition-all duration-300 ${isScrolled ? 'py-1 shadow-md' : 'py-4 shadow-sm'}`}>
        <nav className="container mx-auto px-5">
            <div className="flex justify-between items-center">
                <a href="#" className="flex items-center no-underline text-gray-800">
                    <div className="text-4xl mr-2 text-[#1a3a8f]">📊</div>
                    <div className="flex flex-col">
                        <span className="font-poppins text-3xl font-bold text-[#1a3a8f] leading-none">CESE</span>
                        <span className="text-sm font-semibold text-[#d4af37] tracking-wider">UJC</span>
                    </div>
                </a>

                <button className="md:hidden flex flex-col justify-between w-[30px] h-[21px] bg-transparent border-none cursor-pointer z-20" onClick={onMenuToggle}>
                    <span className={`block h-0.5 w-full bg-gray-800 rounded-full transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[9px]' : ''}`}></span>
                    <span className={`block h-0.5 w-full bg-gray-800 rounded-full transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block h-0.5 w-full bg-gray-800 rounded-full transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`}></span>
                </button>

                <ul className={`
                    fixed md:relative top-[72px] md:top-auto left-0 md:left-auto w-full md:w-auto h-screen md:h-auto
                    bg-white md:bg-transparent flex-col md:flex-row items-center justify-start md:justify-center
                    pt-10 md:pt-0 flex list-none md:gap-8
                    transition-transform duration-300 ease-in-out
                    ${isMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                `}>
                    {navLinks.map((link) => (
                        <li key={link.href} className="mb-6 md:mb-0">
                            <a href={link.href} onClick={(e) => { e.preventDefault(); smoothScrollTo(link.href.substring(1)); if (isMenuOpen) onMenuToggle(); }} className="no-underline text-gray-800 font-medium text-base relative py-1 hover:text-[#1a3a8f] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#1a3a8f] after:transition-all after:duration-300 hover:after:w-full">{link.text}</a>
                        </li>
                    ))}
                    <li>
                        <a href="#contato" onClick={(e) => { e.preventDefault(); smoothScrollTo('contato'); if (isMenuOpen) onMenuToggle(); }} className="bg-[#1a3a8f] text-white px-5 py-2.5 rounded-lg no-underline font-semibold transition-all duration-300 hover:bg-[#0d2a6d] hover:-translate-y-0.5">Junte-se a Nós</a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
);

const HeroSection: React.FC = () => (
    <section id="hero" className="relative min-h-screen flex items-center text-white bg-cover bg-center bg-fixed" style={{ backgroundImage: `url('https://picsum.photos/1920/1080?grayscale&blur=2')` }}>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#1a3a8f]/80 to-[#d4af37]/40 z-0"></div>
        <div className="container mx-auto px-5 relative z-10">
            <div className="max-w-3xl">
                <h1 className="font-poppins text-5xl md:text-6xl font-extrabold leading-tight mb-5">
                    <span className="text-[#d4af37]">Clube de Estudos</span> Sociais e Econômicos
                </h1>
                <p className="text-xl md:text-2xl mb-6 opacity-90">Uma iniciativa do <strong>NEFEN-UJC</strong> | Universidade Joaquim Chissano</p>
                <p className="text-lg md:text-xl mb-10 max-w-2xl opacity-90">Polo de excelência em análise, argumentação e pesquisa científica. Formando líderes críticos e capacitados para representar a UJC.</p>
                <div className="flex flex-col sm:flex-row gap-5">
                    <a href="#sobre" onClick={(e) => { e.preventDefault(); smoothScrollTo('sobre'); }} className="text-center w-full sm:w-auto bg-[#d4af37] text-gray-800 px-8 py-4 rounded-lg no-underline font-semibold text-base transition-all duration-300 hover:bg-[#b8941f] hover:-translate-y-1 shadow-md">Conheça o Clube</a>
                    <a href="#contato" onClick={(e) => { e.preventDefault(); smoothScrollTo('contato'); }} className="text-center w-full sm:w-auto bg-transparent text-white border-2 border-white px-8 py-4 rounded-lg no-underline font-semibold text-base transition-all duration-300 hover:bg-white hover:text-gray-800 hover:-translate-y-1">Participar</a>
                </div>
            </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <i className="fas fa-chevron-down text-2xl text-white"></i>
        </div>
    </section>
);

const AboutSection: React.FC = () => (
    <section id="sobre" className="py-20">
        <div className="container mx-auto px-5">
            <div className="text-center mb-16">
                <h2 className="font-poppins text-4xl font-bold mb-4">Sobre o <span className="text-[#1a3a8f]">CESE-UJC</span></h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">Promovendo excelência acadêmica desde 2026</p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 mb-10">
                <div>
                    <h3 className="text-3xl mb-5 font-semibold">Nossa <span className="text-[#1a3a8f]">Missão</span></h3>
                    <p className="text-gray-600 leading-relaxed mb-8">Constituir-nos como um polo de excelência na Universidade Joaquim Chissano, através da análise, argumentação e pesquisa, cultivando o espírito crítico entre os estudantes e capacitando-os a representar a UJC em diversos fóruns e atividades.</p>
                    <h3 className="text-3xl mb-5 font-semibold">Nossa <span className="text-[#1a3a8f]">Visão</span></h3>
                    <p className="text-gray-600 leading-relaxed">Ser referência nacional em debate acadêmico, produção científica e formação de líderes críticos nas áreas sociais e econômicas.</p>
                </div>
                <div>
                    <h3 className="text-3xl mb-5 font-semibold">Nossos <span className="text-[#1a3a8f]">Objetivos</span></h3>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {[
                            { icon: "fa-chart-line", title: "Análise Crítica", text: "Promover o interesse pela análise crítica de questões sociais e econômicas." },
                            { icon: "fa-search", title: "Pesquisa Científica", text: "Desenvolver a prática de pesquisa e análise de dados." },
                            { icon: "fa-comments", title: "Oratória e Debate", text: "Fortalecer as habilidades de oratória, debate e argumentação." },
                            { icon: "fa-handshake", title: "Intercâmbio", text: "Fomentar o intercâmbio de conhecimento entre estudantes." }
                        ].map((item, index) => (
                            <div key={index} className="observed-item bg-gray-100 rounded-xl p-6 transition-all duration-300 border border-transparent hover:-translate-y-1.5 hover:shadow-lg hover:border-[#2a4da0]">
                                <div className="text-3xl text-[#1a3a8f] mb-4"><i className={`fas ${item.icon}`}></i></div>
                                <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                                <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="observed-item flex items-center justify-center bg-blue-50 border-l-4 border-[#1a3a8f] p-5 rounded-md mt-8">
                <i className="fas fa-university text-2xl text-[#1a3a8f] mr-4"></i>
                <span className="text-gray-800">Promovido pelo <strong className="text-[#1a3a8f]">NEFEN-UJC</strong> - Núcleo de Estudantes da Faculdade de Economia e Negócios</span>
            </div>
        </div>
    </section>
);

const StructureSection: React.FC = () => (
    <section id="estrutura" className="py-20 bg-gray-100">
        <div className="container mx-auto px-5">
            <div className="text-center mb-16">
                <h2 className="font-poppins text-4xl font-bold mb-4">Estrutura <span className="text-[#1a3a8f]">Organizacional</span></h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">Governança e gestão do CESE-UJC</p>
            </div>
            <div className="relative flex flex-col items-center gap-10">
                 {/* Nível 1 */}
                 <div className="w-full">
                    <h3 className="text-center text-2xl text-[#1a3a8f] font-semibold mb-8">Conselho de Administração</h3>
                    <div className="flex flex-wrap justify-center gap-8">
                        {[{name: "Cecília Mungoi", title: "PCA", subtitle: "Presidente do Conselho de Administração", role: "Define visão estratégica e supervisiona atividades", icon: "fa-user-tie", special: true}, {name: "Kelyussra Kumay", title: "Vice-PCA", subtitle: "Vice-Presidente do Conselho", role: "Apoio à governança estratégica", icon: "fa-user-tie"}].map(p => (
                            <div key={p.name} className={`observed-item bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 w-72 hover:-translate-y-1.5 hover:shadow-xl ${p.special ? 'border-t-4 border-[#d4af37]' : ''}`}>
                                <div className="bg-[#1a3a8f] text-white p-4 flex justify-between items-center"><h4 className="text-lg font-semibold">{p.title}</h4><span className="bg-white/20 text-xs px-3 py-1 rounded-full">Governança</span></div>
                                <div className="p-6 text-center">
                                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5 text-3xl text-[#1a3a8f]"><i className={`fas ${p.icon}`}></i></div>
                                    <h5 className="text-xl font-bold mb-1">{p.name}</h5>
                                    <p className="text-gray-600 text-sm mb-2">{p.subtitle}</p>
                                    <p className="text-gray-500 text-sm italic mt-4 pt-4 border-t border-gray-200">{p.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-0.5 h-10 bg-gray-300"></div>
                 {/* Nível 2 */}
                 <div className="w-full">
                    <h3 className="text-center text-2xl text-[#1a3a8f] font-semibold mb-8">Diretoria Executiva</h3>
                    <div className="flex flex-wrap justify-center gap-8">
                        {[{name: "Bertil Muchanga", title: "CEO", subtitle: "Chief Executive Officer", role: "Operações diárias e execução de projetos", icon: "fa-briefcase"}, {name: "Clayton Ngovene", title: "CFO", subtitle: "Chief Financial Officer", role: "Gestão financeira e patrocínios", icon: "fa-coins"}, {name: "Sousa Nantide", title: "COO", subtitle: "Chief Operating Officer", role: "Logística e coordenação interna", icon: "fa-cogs"}].map(p => (
                             <div key={p.name} className="observed-item bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 w-72 hover:-translate-y-1.5 hover:shadow-xl">
                                <div className="bg-[#1a3a8f] text-white p-4 flex justify-between items-center"><h4 className="text-lg font-semibold">{p.title}</h4><span className="bg-white/20 text-xs px-3 py-1 rounded-full">Gestão</span></div>
                                <div className="p-6 text-center">
                                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5 text-3xl text-[#1a3a8f]"><i className={`fas ${p.icon}`}></i></div>
                                    <h5 className="text-xl font-bold mb-1">{p.name}</h5>
                                    <p className="text-gray-600 text-sm mb-2">{p.subtitle}</p>
                                    <p className="text-gray-500 text-sm italic mt-4 pt-4 border-t border-gray-200">{p.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-0.5 h-10 bg-gray-300"></div>
                {/* Nível 3 */}
                <div className="w-full">
                    <h3 className="text-center text-2xl text-[#1a3a8f] font-semibold mb-8">Diretorias de Área</h3>
                     <div className="flex flex-wrap justify-center gap-8">
                        {[{title: "Pesquisa e Análise", role: "Produção científica e análise de dados", icon: "fa-search"}, {title: "Fóruns e Engajamento", role: "Organização de debates e eventos", icon: "fa-users"}, {title: "Relações Estratégicas", role: "Parcerias e extensão universitária", icon: "fa-handshake"}].map(p => (
                             <div key={p.title} className="observed-item bg-white rounded-xl shadow-md transition-all duration-300 w-60 hover:-translate-y-1.5 hover:shadow-xl">
                                <div className="p-6 text-center">
                                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4 text-2xl text-[#1a3a8f]"><i className={`fas ${p.icon}`}></i></div>
                                    <h5 className="text-lg font-bold mb-1">{p.title}</h5>
                                    <p className="text-gray-600 text-sm">{p.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </section>
);


const QuotasSection: React.FC = () => (
    <section id="quotas" className="py-20">
        <div className="container mx-auto px-5">
            <div className="text-center mb-16">
                <h2 className="font-poppins text-4xl font-bold mb-4">Sistema de <span className="text-[#1a3a8f]">Quotas</span></h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">Valores aprovados conforme Norma Financeira 01/2025</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div>
                    <h3 className="text-3xl font-semibold mb-5">Contribuição para a <span className="text-[#1a3a8f]">Autonomia</span> do Clube</h3>
                    <p className="text-gray-600 leading-relaxed mb-8">As quotas são contribuições financeiras obrigatórias destinadas a assegurar a autonomia e o funcionamento do CESE, nomeadamente o financiamento de atividades, eventos e material de apoio.</p>
                    <div className="space-y-5 mb-8">
                        <div className="observed-item flex items-start p-4 bg-gray-100 rounded-lg">
                            <i className="fas fa-calendar-alt text-xl text-[#1a3a8f] mr-4 mt-1"></i>
                            <div>
                                <h4 className="font-semibold text-lg">Pagamento Mensal</h4>
                                <p className="text-gray-600 text-sm">Contribuição fracionada a cada mês de atividade. Vencimento: dia 16 de cada mês.</p>
                            </div>
                        </div>
                        <div className="observed-item flex items-start p-4 bg-gray-100 rounded-lg">
                            <i className="fas fa-calendar-check text-xl text-[#1a3a8f] mr-4 mt-1"></i>
                            <div>
                                <h4 className="font-semibold text-lg">Pagamento Anual Único</h4>
                                <p className="text-gray-600 text-sm">Contribuição total do ano, efetuada até ao final do primeiro mês letivo.</p>
                            </div>
                        </div>
                    </div>
                    <div className="observed-item flex items-start bg-yellow-50 border-l-4 border-[#d4af37] p-5 rounded-md">
                        <i className="fas fa-exclamation-triangle text-xl text-[#d4af37] mr-4 mt-1"></i>
                        <div>
                            <h4 className="font-semibold text-lg text-yellow-800">Atenção: Consequências de Inadimplência</h4>
                            <p className="text-yellow-700 text-sm">O não pagamento de 2 quotas consecutivas ou 3 interpoladas resulta em suspensão dos direitos de voto, elegibilidade e participação em eventos exclusivos.</p>
                        </div>
                    </div>
                </div>
                <div className="observed-item">
                    <div className="shadow-lg rounded-xl overflow-auto">
                        <table className="w-full text-left bg-white">
                            <thead className="bg-[#1a3a8f] text-white">
                                <tr>
                                    <th className="p-4 font-semibold">Escalão</th>
                                    <th className="p-4 font-semibold">Categoria</th>
                                    <th className="p-4 font-semibold">Quota Mensal</th>
                                    <th className="p-4 font-semibold">Quota Anual</th>
                                </tr>
                            </thead>
                            <tbody>
                                {quotasData.map((row) => (
                                    <tr key={row.echelon} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                        <td className="p-4">{row.echelon}</td>
                                        <td className="p-4">{row.category}</td>
                                        <td className="p-4 font-bold text-[#1a3a8f]">{row.monthly} MT</td>
                                        <td className="p-4 font-bold text-[#1a3a8f]">{row.annual} MT</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex items-center mt-6 p-4 bg-gray-100 rounded-lg">
                        <i className="fas fa-info-circle text-[#1a3a8f] mr-3 text-lg"></i>
                        <p className="text-gray-600 text-sm">Os valores refletem o nível de responsabilidade e envolvimento hierárquico no clube.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const ActivitiesSection: React.FC = () => (
    <section id="atividades" className="py-20 bg-gray-100">
        <div className="container mx-auto px-5">
            <div className="text-center mb-16">
                <h2 className="font-poppins text-4xl font-bold mb-4">Nossas <span className="text-[#1a3a8f]">Atividades</span></h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">Engajamento acadêmico e desenvolvimento de competências</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    { icon: "fa-comments", title: "Debates Mensais", text: "Temas atuais como desigualdade, desemprego juvenil, inflação e sustentabilidade com formato estruturado de argumentação." },
                    { icon: "fa-chalkboard-teacher", title: "Workshops de Oratória", text: "Treinamentos práticos para desenvolver habilidades de comunicação, argumentação e apresentação em público." },
                    { icon: "fa-globe-africa", title: "Simulações de Conferências", text: "Modelos tipo ONU econômica onde os estudantes representam países e debatem políticas econômicas globais." },
                    { icon: "fa-microphone-alt", title: "Produção de Conteúdo", text: "Criação de podcasts, boletins informativos e artigos sobre temas sociais e econômicos relevantes." },
                    { icon: "fa-handshake", title: "Parcerias Institucionais", text: "Colaboração com outros clubes, instituições e especialistas para enriquecimento acadêmico mútuo." },
                    { icon: "fa-flask", title: "Produção Científica", text: "Incentivo à pesquisa e publicação de artigos científicos sobre temas sociais e econômicos moçambicanos." },
                ].map((item, index) => (
                    <div key={index} className="observed-item bg-white rounded-xl p-8 text-center shadow-md transition-all duration-300 border-t-4 border-transparent hover:-translate-y-2 hover:shadow-xl hover:border-[#1a3a8f]">
                        <div className="text-4xl text-[#1a3a8f] mb-5"><i className={`fas ${item.icon}`}></i></div>
                        <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{item.text}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const CalendarSection: React.FC = () => (
    <section id="calendario" className="py-20">
        <div className="container mx-auto px-5">
            <div className="text-center mb-16">
                <h2 className="font-poppins text-4xl font-bold mb-4">Calendário de <span className="text-[#1a3a8f]">Eventos</span></h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">Programação 2026 - Em planeamento</p>
            </div>
            <div className="relative max-w-3xl mx-auto">
                <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 top-0 h-full w-0.5 bg-gray-200"></div>
                {[
                    { month: "FEV", year: "2026", title: "Debate Inaugural", topic: "A desigualdade social em Moçambique: Desafios e Oportunidades", desc: "Evento de lançamento oficial do CESE-UJC com debate estruturado e participação de convidados especiais." },
                    { month: "MAR", year: "2026", title: "Mesa Redonda", topic: "Juventude e Desemprego: Estratégias para o Futuro", desc: "Discussão com especialistas em recursos humanos, empreendedorismo e políticas públicas." },
                    { month: "ABR", year: "2026", title: "Debate Competitivo", topic: "O Papel do Estado na Economia: Intervenção vs. Liberalismo", desc: "Competição entre equipes com júri especializado e premiação para os melhores debatedores." },
                    { month: "MAI", year: "2026", title: "Seminário Internacional", topic: "Globalização: Oportunidade ou Ameaça para Economias Emergentes?", desc: "Evento com participação virtual de estudantes de outras universidades africanas." },
                ].map((item, index) => (
                    <div key={index} className="observed-item relative mb-12 flex items-center w-full" style={{ flexDirection: index % 2 === 0 ? 'row' : 'row-reverse' }}>
                         <div className={`hidden sm:flex justify-center w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                            <div className="text-center">
                                <span className="block text-2xl font-bold text-[#1a3a8f]">{item.month}</span>
                                <span className="block text-gray-500">{item.year}</span>
                            </div>
                        </div>
                        <div className="absolute left-6 sm:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#1a3a8f] border-4 border-white ring-2 ring-[#2a4da0]"></div>
                        <div className="bg-white p-6 rounded-xl shadow-lg w-full sm:w-1/2 ml-12 sm:ml-0">
                            <div className="block sm:hidden mb-2">
                                <span className="font-bold text-lg text-[#1a3a8f]">{item.month} {item.year}</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                            <p className="font-semibold text-[#1a3a8f] mb-3">"{item.topic}"</p>
                            <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    </div>
                ))}
                 <div className="observed-item text-center bg-white p-10 rounded-xl shadow-lg border-2 border-dashed border-gray-300 ml-12 sm:ml-0">
                    <i className="fas fa-calendar-plus text-4xl text-[#2a4da0] mb-4"></i>
                    <h3 className="text-2xl font-bold mb-2">Mais Eventos em Planeamento</h3>
                    <p className="text-gray-600">Estamos a preparar uma agenda completa de atividades para 2026. Fique atento!</p>
                </div>
            </div>
        </div>
    </section>
);


const PublicationsSection: React.FC = () => (
    <section className="py-20 bg-gradient-to-br from-[#1a3a8f] to-[#0d2a6d] text-white">
        <div className="container mx-auto px-5 text-center max-w-3xl">
            <div className="banner-icon text-6xl mb-5 opacity-90"><i className="fas fa-newspaper"></i></div>
            <h2 className="font-poppins text-4xl font-bold mb-4">Publicações Científicas</h2>
            <p className="text-xl mb-6 opacity-90">Em Breve - Primeiras publicações em 2026</p>
            <p className="text-lg mb-8 opacity-90 leading-relaxed">O CESE-UJC está a preparar sua primeira revista estudantil, boletins informativos e artigos científicos resultantes dos debates e pesquisas realizadas.</p>
            <a href="#contato" onClick={(e) => { e.preventDefault(); smoothScrollTo('contato'); }} className="inline-block bg-transparent text-white border-2 border-white px-8 py-3 rounded-lg no-underline font-semibold text-base transition-all duration-300 hover:bg-white hover:text-[#1a3a8f] hover:-translate-y-1">Seja um Colaborador</a>
        </div>
    </section>
);

const ContactSection: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            alert('Obrigado pelo seu interesse no CESE-UJC! Entraremos em contacto em breve.');
            (e.target as HTMLFormElement).reset();
            setIsSubmitting(false);
        }, 1500);
    };

    return (
        <section id="contato" className="py-20 bg-gray-100">
            <div className="container mx-auto px-5">
                <div className="text-center mb-16">
                    <h2 className="font-poppins text-4xl font-bold mb-4">Entre em <span className="text-[#1a3a8f]">Contacto</span></h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Junte-se ao CESE-UJC e faça parte da mudança</p>
                </div>
                <div className="grid lg:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-3xl font-semibold mb-8">Informações de Contacto</h3>
                        <div className="space-y-6">
                            {[
                                { icon: "fa-envelope", title: "Email Oficial", lines: [<a href="mailto:cese.ujc@gmail.com" className="text-gray-600 hover:text-[#1a3a8f]">cese.ujc@gmail.com</a>] },
                                { icon: "fa-university", title: "Instituição", lines: ["Universidade Joaquim Chissano (UJC)", "Faculdade de Economia e Negócios"] },
                                { icon: "fa-users", title: "Promoção", lines: ["NEFEN-UJC - Núcleo de Estudantes da Faculdade de Economia e Negócios"] },
                            ].map(item => (
                                <div key={item.title} className="flex items-start">
                                    <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#1a3a8f] text-lg mr-4 shadow-sm"><i className={`fas ${item.icon}`}></i></div>
                                    <div>
                                        <h4 className="font-semibold text-lg">{item.title}</h4>
                                        {item.lines.map((line, i) => <p key={i} className="text-gray-600">{line}</p>)}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-10">
                            <h4 className="text-xl font-semibold mb-4">Siga-nos nas Redes Sociais</h4>
                            <div className="flex gap-4">
                                <a href="https://www.facebook.com/ceseujc" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl transition-transform duration-300 hover:-translate-y-1 bg-[#3b5998]"><i className="fab fa-facebook-f"></i></a>
                                <a href="https://www.instagram.com/cese_ujc?igsh=MWdic2hqY2FvbXd4cw==" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl transition-transform duration-300 hover:-translate-y-1 bg-gradient-to-br from-purple-600 via-pink-500 to-yellow-400"><i className="fab fa-instagram"></i></a>
                                <a href="#" className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl transition-transform duration-300 hover:-translate-y-1 bg-[#0077B5]"><i className="fab fa-linkedin-in"></i></a>
                                <a href="#" className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl transition-transform duration-300 hover:-translate-y-1 bg-[#1DA1F2]"><i className="fab fa-twitter"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-xl shadow-lg">
                        <h3 className="text-3xl font-semibold mb-6">Formulário de Inscrição</h3>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="name" className="block mb-1 font-medium">Nome Completo *</label>
                                <input type="text" id="name" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a3a8f] focus:border-transparent transition" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-1 font-medium">Email *</label>
                                <input type="email" id="email" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a3a8f] focus:border-transparent transition" />
                            </div>
                             <div>
                                <label htmlFor="interest" className="block mb-1 font-medium">Área de Interesse</label>
                                <select id="interest" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a3a8f] focus:border-transparent transition">
                                    <option value="">Selecione uma opção</option>
                                    <option value="debates">Debates e Oratória</option>
                                    <option value="pesquisa">Pesquisa Científica</option>
                                    <option value="eventos">Organização de Eventos</option>
                                </select>
                            </div>
                             <div>
                                <label htmlFor="message" className="block mb-1 font-medium">Mensagem</label>
                                <textarea id="message" rows={4} placeholder="Conte-nos por que quer participar..." className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a3a8f] focus:border-transparent transition"></textarea>
                            </div>
                            <button type="submit" disabled={isSubmitting} className="w-full bg-[#1a3a8f] text-white p-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-[#0d2a6d] hover:-translate-y-0.5 disabled:bg-gray-400 disabled:cursor-not-allowed">
                                {isSubmitting ? <><i className="fas fa-spinner fa-spin mr-2"></i> Enviando...</> : <><i className="fas fa-paper-plane mr-2"></i> Enviar Inscrição</>}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Footer: React.FC = () => (
    <footer className="bg-[#1a1f36] text-white pt-16 pb-8">
        <div className="container mx-auto px-5">
            <div className="grid md:grid-cols-3 gap-10 mb-12">
                <div>
                    <div className="flex items-center mb-4">
                        <div className="text-4xl mr-2 text-white">📊</div>
                        <div className="flex flex-col">
                            <span className="font-poppins text-3xl font-bold text-white leading-none">CESE</span>
                            <span className="text-sm font-semibold text-[#d4af37] tracking-wider">UJC</span>
                        </div>
                    </div>
                    <p className="text-gray-400 mb-2">Clube de Estudos Sociais e Econômicos</p>
                    <p className="text-[#d4af37] text-sm">Promovido por <strong>NEFEN-UJC</strong></p>
                </div>
                <div>
                    <h4 className="text-xl font-semibold mb-5">Links Rápidos</h4>
                    <ul className="space-y-2">
                        {navLinks.slice(0, 5).map(link => (
                             <li key={link.href}><a href={link.href} onClick={(e) => { e.preventDefault(); smoothScrollTo(link.href.substring(1)); }} className="text-gray-400 hover:text-[#d4af37] hover:pl-2 transition-all">{link.text}</a></li>
                        ))}
                    </ul>
                </div>
                 <div>
                    <h4 className="text-xl font-semibold mb-5">Contacto</h4>
                    <p className="flex items-center text-gray-400 mb-3"><i className="fas fa-envelope mr-3 text-[#d4af37] w-5"></i> cese.ujc@gmail.com</p>
                    <p className="flex items-center text-gray-400"><i className="fas fa-university mr-3 text-[#d4af37] w-5"></i> Universidade Joaquim Chissano</p>
                    <div className="flex gap-4 mt-6">
                        <a href="https://www.facebook.com/ceseujc" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#d4af37] text-xl transition-transform hover:-translate-y-1"><i className="fab fa-facebook"></i></a>
                        <a href="https://www.instagram.com/cese_ujc?igsh=MWdic2hqY2FvbXd4cw==" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#d4af37] text-xl transition-transform hover:-translate-y-1"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
            <div className="text-center pt-8 border-t border-white/10 text-gray-500 text-sm">
                <p>&copy; {new Date().getFullYear()} Clube de Estudos Sociais e Econômicos (CESE-UJC). Todos os direitos reservados.</p>
            </div>
        </div>
    </footer>
);

const BackToTopButton: React.FC<{ isVisible: boolean }> = ({ isVisible }) => (
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`fixed bottom-8 right-8 w-12 h-12 bg-[#1a3a8f] text-white rounded-full flex items-center justify-center text-lg shadow-lg transition-all duration-300 z-[999] ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'} hover:bg-[#0d2a6d] hover:-translate-y-1`}>
        <i className="fas fa-chevron-up"></i>
    </button>
);

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isBackToTopVisible, setIsBackToTopVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsScrolled(scrollY > 100);
            setIsBackToTopVisible(scrollY > 500);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(observerCallback, { threshold: 0.1 });
        const targets = document.querySelectorAll('.observed-item');
        targets.forEach(target => observer.observe(target));

        return () => {
            targets.forEach(target => observer.unobserve(target));
        };
    }, [observerCallback]);

    return (
        <div className="bg-white text-gray-800 antialiased">
            {isLoading && <LoadingScreen />}
            
            <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                <Header 
                    isScrolled={isScrolled} 
                    isMenuOpen={isMenuOpen} 
                    onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} 
                />
                <main>
                    <HeroSection />
                    <AboutSection />
                    <StructureSection />
                    <QuotasSection />
                    <ActivitiesSection />
                    <CalendarSection />
                    <PublicationsSection />
                    <ContactSection />
                </main>
                <Footer />
                <BackToTopButton isVisible={isBackToTopVisible} />
            </div>
        </div>
    );
}
