import React, { useState, useEffect, ReactNode } from 'react';

// TYPE DEFINITIONS
type Service = {
  name: string;
  images: string[];
  description: string;
  services?: Service[];
};

type Professional = {
  id: 'ingrid' | 'maria';
  name: string;
  title: string;
  avatar: string;
  bio: string;
  instagram: string;
  whatsapp: string;
  services: Service[];
};

type ModalContentType =
  | { type: 'location' }
  | { type: 'developer' }
  | { type: 'professional'; professional: Professional }
  | { type: 'service_group'; professional: Professional; serviceGroup: Service }
  | { type: 'service_details'; professional: Professional; service: Service }
  | { type: 'booking'; professional: Professional; service: string }
  | { type: 'age_warning' };

// SVG ICONS
const InstagramIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LocationIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
    </svg>
);

const WhatsAppIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 12c0 1.74.45 3.38 1.25 4.82l-1.28 4.68 4.8-1.26c1.4.74 2.97 1.15 4.65 1.15h.01c5.46 0 9.91-4.45 9.91-9.91 0-5.46-4.45-9.91-9.91-9.91zM17.16 15.5c-.21.12-.76.37-1.05.21-.29-.16-1.02-.79-1.18-1.08-.16-.29-.24-.42-.08-.66.16-.24.33-.42.5-.54.17-.12.21-.21.33-.37.12-.16.04-.33-.04-.45-.08-.12-.76-.8-1.05-1.18-.29-.37-.59-.33-.76-.33-.17 0-.37-.04-.54-.04-.17 0-.45 0-.66.08-.21.08-.54.24-.79.54-.25.29-.98.94-1.18 1.95-.21 1.02.08 1.91.24 2.12.16.21 1.02 1.57 2.5 2.21.37.16.66.25.9.33.49.16.83.12.98.04.16-.08.5-.33.62-.62.12-.29.12-.54.08-.66-.04-.12-.12-.21-.24-.33z"></path>
    </svg>
);

const BrowsIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 14c2.8.8 5.6.8 8.4 0" />
        <path d="M13.6 14c2.8.8 5.6.8 8.4 0" />
        <path d="M10.2 14c-.9-2.5-1.1-5.2-.8-7.8.2-1.7 1.4-3.1 3-3.1 1.7 0 2.8 1.3 3 3.1.3 2.6.1 5.3-.8 7.8" />
    </svg>
);

const LashIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 7.5c3 0 5.4-2.4 5.4-5.4M8 12c-2.7-2.7-2.7-7 0-9.8" />
        <path d="M16 12c2.7-2.7 2.7-7 0-9.8M21.5 7.5c-3 0-5.4-2.4-5.4-5.4" />
    </svg>
);

const EleganceIcon = ({ className = 'w-8 h-8' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z" />
  </svg>
);

const DiamondIcon = ({ className = 'w-8 h-8' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L4 9l8 13 8-13-8-13z" />
        <path d="M4 9h16" />
    </svg>
);

const TechniqueIcon = ({ className = 'w-8 h-8' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
    </svg>
);

const QuestionMarkIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
);


// CONSTANTS
const PROFESSIONALS: Record<'ingrid' | 'maria', Professional> = {
  ingrid: {
    id: 'ingrid',
    name: 'Ingrid Grano',
    title: 'Sobrancelhas',
    avatar: '/ingrid-grano-profile.png',
    bio: 'Especialista em realçar a beleza natural do seu olhar através de técnicas avançadas de design e micropigmentação de sobrancelhas.',
    instagram: '@ingridgrano',
    whatsapp: '5517992171589',
    services: [
        { 
            name: 'Design Personalizado', 
            images: ['/ingrid-design-personalizado-1.png', '/ingrid-design-personalizado-2.png'], 
            description: 'Mais do que remover pelinhos, é um estudo minucioso da sua beleza natural. É feita uma análise da estrutura da sobrancelha, o formato do rosto e as proporções do olhar para criar um desenho exclusivo, que realça seus traços, harmoniza sua expressão e revela a moldura ideal para o seus olhos.' 
        }, 
        { 
            name: 'Design com Henna', 
            images: ['/ingrid-design-henna-1.png'], 
            description: 'Após o design personalizado, é realizada a aplicação estratégica da henna, respeitando o formato natural e o objetivo de harmonia do olhar. A henna é um pigmento temporário que pigemnta a pele, ajudando a cobrir falhas, definir o formato e realçar o contorno das sobrancelhas. O resultado são sobrancelhas mais marcantes, equilibradas e com acabamento sofisticado, sem perder a naturalidade. Por isso tanto quem gosta de resultado mais natural quanto resultado mais marcado consegue se sentir realizada com esse procedimento.' 
        },
        {
            name: 'Design com Coloração',
            images: ['/ingrid-design-coloracao-1.png'],
            description: 'Após o design personalizado, é aplicada a coloração específica para sobrancelhas. Diferente da henna, a coloração age apenas nos fios, proporcionando um resultado natural, sútil e elegante. É ideal para quem deseja mais volume e definição, já que tinge até os fios mais finos, criando a sensação de sobrancelhas mais cheias e alinhadas, sem marcar a pele.'
        },
        { 
            name: 'Brow Lamination', 
            images: [
                '/ingrid-brow-lamination-1.png', 
                '/ingrid-brow-lamination-2.png', 
                '/ingrid-brow-lamination-3.png', 
                '/ingrid-brow-lamination-4.png',
                '/ingrid-brow-lamination-5.png',
                '/ingrid-brow-lamination-6.png'
            ], 
            description: 'Tendência forte de 2025, o Brow Lamination conquistou o coração de quem busca um olhar marcante e sobrancelhas naturalmente mais cheias. A técnica alinha e direciona os fios, criando a sensação de maior espessura e simetria, o que realça o formato e traz aquele toque de elegância & sofisticação. Além do efeito estético incrível, o alinhamento também ajuda a disfarçar falhas e cicatrizes, já que os fios são penteados e fixados de forma estratégica para cobrir pequenas imperfeições.' 
        },
        {
            name: 'Protocolo Reconstrutivo',
            images: ['/ingrid-protocolo-reconstrutivo-1.png', '/ingrid-protocolo-reconstrutivo-2.png'],
            description: 'A técnica que chegou como tendência e se tornou a mais desejada do momento. Antes, bastava ver uma sobrancelha falhada ou sem estrutura e logo vinha a indicação de micropigmentação. Mas o mercado evoluiu e hoje as pessoas estão voltando com força para o natural. O Protocolo Reconstrutivo vai além de preencher: ele reconstrói a harmonia do olhar, devolve densidade aos fios e resgata o formato original com acabamento sofisticado.\nO natural nunca saiu de moda, mas agora, é o que todo mundo procura.'
        },
        {
            name: 'Rarità Lips',
            images: ['/rarita-lips-1.png', '/rarita-lips-2.png'],
            description: 'Um tratamento de esfoliação e hidratação labial que devolve vida, maciez e viço natural aos lábios. Ideal para quem sente os lábios ressecados ou quer realçar a cor natural, o Raritá Lips remove células mortas e nutre profundamente, deixando os lábios suaves, saudáveis e com aparência radiante.\nNeste serviço, também é possível acrescentar uma pigmentação temporária, com duração de até 3 dias, para realçar ainda mais a cor e o contorno natural dos lábios.'
        },
        {
            name: 'Laser',
            images: ['/laser.png'],
            description: '(informações serão inseridas)'
        }
    ],
  },
  maria: {
    id: 'maria',
    name: 'Maria Eliza Gonçalves',
    title: 'Lash & Estética',
    avatar: '/maria-eliza-profile.png',
    bio: 'Esteticista Cosmetóloga. Cuido da sua pele com um tratamento personalizado e com naturalidade!',
    instagram: '@mariaelizaesteticaa',
    whatsapp: '5517996479152',
    services: [
        { 
            name: 'Lash Lifting', 
            images: ['/maria-lash-lifting-1.png', '/maria-lash-lifting-2.png'], 
            description: 'Técnica da curvatura dos cílios naturais.\nProporcionando um efeito rímel, com naturalidade e elegância.\nNão é feito manutenção.' 
        },
        { 
          name: 'Extensão de Cílios', 
          images: ['/maria-volume-brasileiro-1.png'], 
          description: 'Técnicas de extensão para um olhar marcante e volumoso. Escolha a sua preferida.',
          services: [
            { name: 'Volume Light', images: ['/maria-volume-light-1.png'], description: 'Técnica de extensão de cílios naturais, preenchendo 50% dos fios, proporcionando um olhar delicado e elegante.' },
            { name: 'Volume Soft Marrom', images: ['/maria-volume-light-1.png'], description: 'Técnica de extensão de cílios com fios tecnológicos na cor marrom, proporcionando um olhar natural e leve.\nÓtima opção para loiras, ruivas e por quem deseja um olhar elegante.' },
            { name: 'Volume Brasileiro', images: ['/maria-volume-brasileiro-1.png'], description: 'Técnica de extensão de cílios feito com fios tecnológicos, garantindo durabilidade e proporcionando um olhar com volume e marcante.' },
            { name: 'Volume 5D', images: ['/maria-volume-brasileiro-1.png'], description: 'Técnica de extensão de cílios com fios tecnológicos, proporcionando um olhar marcante e com maior volume.\nTécnica mais volumosa.' },
          ]
        },
        { 
            name: 'Brow Lamination', 
            images: ['/maria-brow-lamination-1.png'], 
            description: 'Técnica de alinhamento e fios da sobrancelhas laminados.\nDisfarçando falhas e assimetrias.\nProporciona sobrancelhas definidas, alinhadas e elegante.' 
        },
        { 
            name: 'Limpeza de Pele', 
            images: ['/maria-limpeza-pele-1.png', '/maria-limpeza-pele-2.png', '/maria-limpeza-pele-3.png'], 
            description: 'O procedimento essencial para começar seu tratamento facial, removendo impurezas, melhorando excesso de oleosidade, extraindo cravos, proporcionando uma pele limpa, saudável e pronta para receber os cosméticos!\nA limpeza de pele promove regeneração, uma pele com viço e renovada.' 
        },
    ],
  },
};

const DEVELOPER_INFO = {
    whatsapp: '5541988710303',
    instagram: 'https://www.instagram.com/inteligenciarte.ia',
};

// HELPER COMPONENTS
const AnimatedGradientText = ({ children, className = '' }: { children?: ReactNode, className?: string }) => (
    <span className={`shine-effect ${className}`}>
        {children}
    </span>
);

const ImageCarousel = ({ images, alt }: { images: string[], alt: string }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    if (!images || images.length === 0) {
        return (
            <div className="w-full aspect-video bg-zinc-800 rounded-lg flex items-center justify-center">
                <span className="text-zinc-500">No image available</span>
            </div>
        );
    }
    
    return (
        <div className="relative w-full aspect-video bg-zinc-800 rounded-lg overflow-hidden group">
            <img
                src={images[currentIndex]}
                alt={`${alt} - ${currentIndex + 1}`}
                className="w-full h-full object-cover transition-opacity duration-500"
            />
            {images.length > 1 && (
                <>
                    <button onClick={goToPrevious} className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button onClick={goToNext} className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
                        {images.map((_, index) => (
                            <div key={index} className={`w-2 h-2 rounded-full transition-colors ${currentIndex === index ? 'bg-white' : 'bg-white/50'}`}></div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};


// MODAL CONTENT COMPONENTS
const ProfessionalContent = ({ professional, setActiveModal }: { professional: Professional; setActiveModal: React.Dispatch<React.SetStateAction<ModalContentType | null>>; }) => {
    return (
        <div className="text-center space-y-4">
            <img 
                src={professional.avatar} 
                alt={professional.name} 
                className="w-28 h-28 mx-auto object-cover rounded-full border-2 border-zinc-700 shadow-lg"
            />
            <div>
                <h2 className="text-2xl font-display font-bold"><AnimatedGradientText>{professional.name}</AnimatedGradientText></h2>
                <h3 className="text-lg font-display text-zinc-300">{professional.title}</h3>
            </div>
            <p className="text-sm text-zinc-400 px-4">{professional.bio}</p>
            <div className="pt-4">
                <h4 className="text-md font-semibold text-zinc-200 mb-4">Agende seu serviço:</h4>
                <div className="grid grid-cols-2 gap-3">
                    {professional.services.map(service => {
                        const isGroup = service.services && service.services.length > 0;
                        const handleClick = () => {
                            if (isGroup) {
                                setActiveModal({ type: 'service_group', professional, serviceGroup: service });
                            } else {
                                setActiveModal({ type: 'service_details', professional, service });
                            }
                        };
                        return (
                            <button
                                key={service.name}
                                onClick={handleClick}
                                className="group flex flex-col items-center justify-start text-center bg-zinc-800/50 hover:bg-zinc-700/80 border border-zinc-700 rounded-lg p-2 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-slate-400"
                            >
                                <img
                                    src={service.images[0]}
                                    alt={service.name}
                                    className="w-full aspect-square object-cover rounded-md mb-2 transition-transform duration-300 group-hover:scale-105"
                                />
                                <span className="text-zinc-200 font-semibold text-xs leading-tight h-8 flex items-center justify-center">
                                    {service.name}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const ServiceGroupContent = ({ professional, serviceGroup, setActiveModal }: { professional: Professional, serviceGroup: Service, setActiveModal: React.Dispatch<React.SetStateAction<ModalContentType | null>> }) => {
    return (
        <div className="text-center space-y-4">
            <h2 className="text-2xl font-display font-bold"><AnimatedGradientText>{serviceGroup.name}</AnimatedGradientText></h2>
            <p className="text-sm text-zinc-300">Escolha uma das técnicas abaixo:</p>
            
            <div className="grid grid-cols-2 gap-3 pt-2">
                {serviceGroup.services?.map(subService => (
                    <button
                        key={subService.name}
                        onClick={() => setActiveModal({ type: 'service_details', professional, service: subService })}
                        className="group flex flex-col items-center justify-start text-center bg-zinc-800/50 hover:bg-zinc-700/80 border border-zinc-700 rounded-lg p-2 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-slate-400"
                    >
                        <img
                            src={subService.images[0]}
                            alt={subService.name}
                            className="w-full aspect-square object-cover rounded-md mb-2 transition-transform duration-300 group-hover:scale-105"
                        />
                        <span className="text-zinc-200 font-semibold text-xs leading-tight h-8 flex items-center justify-center">
                            {subService.name}
                        </span>
                    </button>
                ))}
            </div>

            <button
                onClick={() => setActiveModal({ type: 'professional', professional })}
                className="w-full bg-transparent border border-zinc-600 hover:bg-zinc-800 text-zinc-300 font-bold py-3 px-4 rounded-lg transition-all duration-300 !mt-6"
            >
                Voltar
            </button>
        </div>
    );
};


const BookingForm = ({ professional, service, setModalContent }: { professional: Professional; service: string; setModalContent: React.Dispatch<React.SetStateAction<ModalContentType | null>> }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [obs, setObs] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!age || parseInt(age, 10) < 18) {
        setModalContent({ type: 'age_warning' });
        return;
      }
      const message = `Olá, gostaria de agendar um horário para o serviço de ${service}.\n\n*Nome:* ${name}\n*Idade:* ${age}\n*Observação:* ${obs || 'Nenhuma'}`;
      const whatsappUrl = `https://wa.me/${professional.whatsapp}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      setModalContent(null);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-display font-bold text-center"><AnimatedGradientText>Agendamento</AnimatedGradientText></h2>
            <p className="text-center text-zinc-300">Serviço: <span className="font-semibold">{service}</span></p>
            <div>
                <input type="text" placeholder="Seu nome completo" value={name} onChange={e => setName(e.target.value)} required className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-slate-400" />
            </div>
            <div>
                <input type="number" placeholder="Sua idade" value={age} onChange={e => setAge(e.target.value)} required className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-slate-400" />
            </div>
            <div>
                <textarea placeholder="Observações (opcional)" value={obs} onChange={e => setObs(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-slate-400 h-24 resize-none" />
            </div>
             <button type="submit" className="w-full bg-gradient-to-r from-zinc-600 to-zinc-700 hover:from-zinc-700 hover:to-zinc-800 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                Confirmar e Enviar via WhatsApp
            </button>
        </form>
    );
};

const DeveloperContact = () => {
    const [name, setName] = useState('');

    const handleDevContact = (e: React.FormEvent) => {
        e.preventDefault();
        const message = `Olá, vi o link da Rarità Beauty e quero um site igual! Meu nome é ${name}.`;
        const whatsappUrl = `https://wa.me/${DEVELOPER_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }
    return (
        <div className="text-center space-y-4">
            <h2 className="text-2xl font-display font-bold"><AnimatedGradientText>Desenvolvido por</AnimatedGradientText></h2>
            <a href={DEVELOPER_INFO.instagram} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-zinc-300 hover:text-white transition">InteligenciArte.IA ✨</a>
            <p className="text-sm text-zinc-400">Esta é uma mensagem para o desenvolvedor.</p>
            <form onSubmit={handleDevContact} className="space-y-3 pt-2">
                 <input type="text" placeholder="Seu nome" value={name} onChange={e => setName(e.target.value)} required className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-slate-400" />
                 <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                    Quer um site incrível como esse? 🚀
                </button>
            </form>
        </div>
    );
};

// GENERIC MODAL COMPONENT
const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children?: ReactNode }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm"
        onClick={onClose}
    >
        <div 
            className={`relative bg-zinc-900 bg-opacity-80 border border-zinc-800 rounded-2xl shadow-2xl p-6 w-full max-w-sm md:max-w-md text-white transform transition-all duration-300 ease-in-out max-h-full overflow-y-auto ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
            onClick={(e) => e.stopPropagation()}
        >
             <button onClick={onClose} className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors z-10">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            {children}
        </div>
    </div>
  );
};

// MAIN APP COMPONENT
export default function App() {
  const [activeModal, setActiveModal] = useState<ModalContentType | null>(null);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  const renderActiveModalContent = () => {
    if (!activeModal) return null;

    switch (activeModal.type) {
      case 'location':
        return (
            <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-center"><AnimatedGradientText>Nossa Localização</AnimatedGradientText></h2>
                <div className="aspect-video overflow-hidden rounded-lg border-2 border-zinc-700">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d232.26856117679014!2d-49.498327374458306!3d-21.33877810023443!2m3!1f0!2f0!3f0!3m2!1i1024!i768!4f13.1!3m3!1m2!1s0x94be792343f6c5d3%3A0xf7ae0548f1f459b9!2sMirian%20Flores!5e0!3m2!1spt-BR!2sbr!4v1761089077548!5m2!1spt-BR!2sbr" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen={true}
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
                <p className="text-center text-zinc-300 text-sm">
                    Rua Anísio Fernandes de Oliveira, 160 <br/>
                    Jardim Moraes, Sales, São Paulo 14980-000
                </p>
                <a href="https://maps.app.goo.gl/w9xCVh6affj5x79c6" target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-gradient-to-r from-zinc-600 to-zinc-700 hover:from-zinc-700 hover:to-zinc-800 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                    Ver no Google Maps
                </a>
            </div>
        );
      case 'professional':
        return <ProfessionalContent professional={activeModal.professional} setActiveModal={setActiveModal} />;
      case 'service_group':
        return <ServiceGroupContent professional={activeModal.professional} serviceGroup={activeModal.serviceGroup} setActiveModal={setActiveModal} />;
      case 'service_details':
        const { professional: prof, service } = activeModal;
        return (
            <div className="text-center space-y-4">
                <ImageCarousel images={service.images} alt={service.name} />
                <h2 className="text-2xl font-display font-bold"><AnimatedGradientText>{service.name}</AnimatedGradientText></h2>
                <p className="text-sm text-zinc-300 whitespace-pre-line text-left">{service.description}</p>
                <div className="pt-4 space-y-3">
                    <button
                        onClick={() => setActiveModal({ type: 'booking', professional: prof, service: service.name })}
                        className="w-full bg-gradient-to-r from-zinc-600 to-zinc-700 hover:from-zinc-700 hover:to-zinc-800 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                        Agendar este Serviço
                    </button>
                    <button
                        onClick={() => setActiveModal({ type: 'professional', professional: prof })}
                        className="w-full bg-transparent border border-zinc-600 hover:bg-zinc-800 text-zinc-300 font-bold py-3 px-4 rounded-lg transition-all duration-300"
                    >
                        Ver outros serviços
                    </button>
                </div>
            </div>
        );
      case 'booking':
        return <BookingForm professional={activeModal.professional} service={activeModal.service} setModalContent={setActiveModal} />;
      case 'age_warning':
          return (
            <div className="text-center space-y-4">
                <h2 className="text-2xl font-display font-bold text-red-400">Atenção</h2>
                <p className="text-zinc-300">É necessário ser maior de 18 anos para realizar o agendamento. Por favor, peça para um responsável concluir a conversa.</p>
                <button onClick={() => setActiveModal(null)} className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                    Entendi
                </button>
            </div>
          );
      case 'developer':
        return <DeveloperContact />;
      default:
        return null;
    }
  };

  const LinkButton = ({ icon, text, onClick, href }: { icon: ReactNode; text: string; onClick?: () => void; href?: string }) => {
    const commonProps = {
        className: "group relative flex items-center justify-center w-full px-4 py-3 bg-zinc-900 bg-opacity-60 border border-zinc-800 rounded-xl text-zinc-200 shadow-lg transition-all duration-300 ease-out transform hover:scale-105 hover:border-slate-400 hover:shadow-slate-400/20 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50",
    };
    const content = (
        <>
            <div className="absolute left-4">{icon}</div>
            <span className="font-bold text-xs md:text-sm">{text}</span>
        </>
    );
    return href 
        ? <a href={href} target="_blank" rel="noopener noreferrer" {...commonProps}>{content}</a>
        : <button onClick={onClick} {...commonProps}>{content}</button>;
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 text-white overflow-hidden">
      {/* Animated About Modal */}
      <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-4 transition-opacity duration-500 ease-in-out ${isAboutModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm" onClick={() => setIsAboutModalOpen(false)}></div>
        
        <div className="relative w-full max-w-sm md:max-w-md text-center space-y-4 text-white">
            <img 
              src="/logo.png" 
              alt="Rarità Beauty Logo" 
              className={`w-28 h-28 md:w-32 md:h-32 mx-auto object-cover rounded-full border-2 border-zinc-700 shadow-lg transform-gpu transition-all duration-700 ease-in-out ${isAboutModalOpen ? 'scale-100 rotate-y-[720deg]' : 'scale-0'}`}
              style={{ transformStyle: 'preserve-3d' }}
            />
            <div className={`transition-all duration-500 ease-in-out ${isAboutModalOpen ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 translate-y-4'}`}>
              <h2 className="text-2xl md:text-3xl font-display font-bold">
                  <AnimatedGradientText>O que é a Rarità Beauty</AnimatedGradientText>
              </h2>
              <div className="mt-4 space-y-5 pt-3 text-sm md:text-base">
                    <div className="flex flex-col items-center space-y-2">
                        <EleganceIcon className="w-8 h-8 text-zinc-400 shrink-0" />
                        <div>
                            <h3 className="font-semibold text-zinc-200">Inspiração Italiana</h3>
                            <p className="text-xs md:text-sm text-zinc-400">
                                Seu nome, <i className="text-zinc-300">Rarità</i>, significa "raridade", refletindo a elegância e o charme que definem nossa essência.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                        <DiamondIcon className="w-8 h-8 text-zinc-400 shrink-0" />
                        <div>
                            <h3 className="font-semibold text-zinc-200">Essência Única</h3>
                            <p className="text-xs md:text-sm text-zinc-400">
                                Celebramos cada cliente como única e especial, realçando a beleza que já existe com um toque de exclusividade.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                        <TechniqueIcon className="w-8 h-8 text-zinc-400 shrink-0" />
                        <div>
                            <h3 className="font-semibold text-zinc-200">Técnica e Sofisticação</h3>
                            <p className="text-xs md:text-sm text-zinc-400">
                                Especialização em sobrancelhas, cílios e estética facial, combinando técnica avançada e acolhimento.
                            </p>
                        </div>
                    </div>
              </div>
              <p className="font-display text-lg font-semibold italic text-zinc-200 !mt-8">
                  <AnimatedGradientText>💎 Para cada Bella, una esperienza Rarità.</AnimatedGradientText>
              </p>
            </div>
        </div>

        <button onClick={() => setIsAboutModalOpen(false)} className={`absolute top-4 right-4 text-zinc-400 hover:text-white transition-all duration-500 ease-in-out ${isAboutModalOpen ? 'opacity-100 delay-500' : 'opacity-0'}`}>
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>


      {/* Main Link Card */}
      <div className={`relative w-full max-w-sm md:max-w-md mx-auto bg-zinc-900 bg-opacity-50 backdrop-blur-md border border-zinc-800 rounded-3xl shadow-2xl p-6 md:p-8 space-y-6 transform-gpu transition-all duration-500 ease-in-out overflow-hidden ${isAboutModalOpen ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'}`}>
        <div className="absolute top-0 left-0 w-full h-full">
          <img src="/fundo.png" alt="" className="w-full h-full object-cover opacity-20 fade-bottom" />
        </div>
        
        <div className="relative z-10 flex flex-col items-center text-center">
            <div 
                className="w-32 h-32 md:w-36 md:h-36 mb-4 cursor-pointer" 
                onClick={() => setIsAboutModalOpen(true)}
            >
                <img 
                    src="/logo.png" 
                    alt="Rarità Beauty Logo" 
                    className="w-full h-full object-cover rounded-full border-2 border-zinc-700 shadow-lg transition-transform duration-300 hover:scale-110"
                />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold">
                <AnimatedGradientText>Rarità Beauty</AnimatedGradientText>
            </h1>
            <p className="text-sm md:text-base text-zinc-300 mt-2 font-light">
                Para cada Bella, una esperienza Rarità 💎
            </p>
        </div>
        
        <div className="relative z-10 flex flex-col space-y-4">
            <LinkButton icon={<QuestionMarkIcon />} text="O que é a Rarità Beauty" onClick={() => setIsAboutModalOpen(true)} />
            <LinkButton icon={<InstagramIcon />} text="Instagram" href="https://www.instagram.com/raritabeauty" />
            <LinkButton icon={<BrowsIcon />} text="Sobrancelhas com Ingrid Grano" onClick={() => setActiveModal({ type: 'professional', professional: PROFESSIONALS.ingrid })} />
            <LinkButton icon={<LashIcon />} text="Lash & Estética com Maria Eliza" onClick={() => setActiveModal({ type: 'professional', professional: PROFESSIONALS.maria })} />
            <LinkButton icon={<LocationIcon />} text="Localização" onClick={() => setActiveModal({ type: 'location' })} />
        </div>
      </div>

      <footer className={`fixed bottom-4 text-center w-full transition-opacity duration-500 ${isAboutModalOpen ? 'opacity-0' : 'opacity-100'}`}>
         <button onClick={() => setActiveModal({ type: 'developer' })} className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
            Desenvolvido por InteligenciArte.IA ✨
         </button>
      </footer>
      
      <Modal isOpen={!!activeModal} onClose={() => setActiveModal(null)}>
        {renderActiveModalContent()}
      </Modal>
    </main>
  );
}
