/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, ChevronDown, Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudFog, CloudDrizzle, MapPin, Loader2, Coffee, IceCream, Wine, Cherry, Citrus, Cookie, Star, Leaf, CakeSlice } from 'lucide-react';

const getFlavorConfig = (flavor: string) => {
  const f = flavor.toLowerCase();
  
  if (f.includes('moscatel') || f.includes('uva') || f.includes('vino')) {
    return { 
      color: '#8d50e6', 
      dropShadow: 'drop-shadow-[0_2px_8px_rgba(141,80,230,0.25)]', 
      Icon: Wine,
      tags: ['Uvas Frescas', 'Miel de Caña', 'Nata Artesanal'],
      tagColors: ['bg-purple-100 border-purple-200 text-purple-700', 'bg-indigo-50 border-indigo-100 text-indigo-700', 'bg-blue-50 border-blue-100 text-blue-700']
    };
  }
  if (f.includes('tiramisú') || f.includes('tiramisu') || f.includes('cafe') || f.includes('café') || f.includes('coffee')) {
    return { 
      color: '#8b5a2b', 
      dropShadow: 'drop-shadow-[0_2px_8px_rgba(139,90,43,0.25)]', 
      Icon: CakeSlice,
      tags: ['Café Espresso', 'Mascarpone', 'Cacao Puro'],
      tagColors: ['bg-orange-100 border-orange-200 text-orange-800', 'bg-amber-100 border-amber-200 text-amber-800', 'bg-yellow-100 border-yellow-200 text-yellow-800']
    };
  }
  if (f.includes('chocolate') || f.includes('cacao') || f.includes('bombón')) {
    return { 
      color: '#5c3a21', 
      dropShadow: 'drop-shadow-[0_2px_8px_rgba(92,58,33,0.25)]', 
      Icon: Cookie,
      tags: ['Cacao 70%', 'Avellanas', 'Leche Fresca'],
      tagColors: ['bg-stone-200 border-stone-300 text-stone-800', 'bg-orange-50 border-orange-100 text-orange-800', 'bg-amber-50 border-amber-100 text-amber-800']
    };
  }
  if (f.includes('fresa') || f.includes('frutilla') || f.includes('cereza') || f.includes('frutos rojos')) {
    return { 
      color: '#e84c6b', 
      dropShadow: 'drop-shadow-[0_2px_8px_rgba(232,76,107,0.25)]', 
      Icon: Cherry,
      tags: ['Fresas', 'Nata', 'Sirope Natural'],
      tagColors: ['bg-rose-100 border-rose-200 text-rose-700', 'bg-pink-50 border-pink-100 text-pink-700', 'bg-red-50 border-red-100 text-red-700']
    };
  }
  if (f.includes('limón') || f.includes('limon') || f.includes('naranja') || f.includes('citrico') || f.includes('mango')) {
    return { 
      color: '#eab308', 
      dropShadow: 'drop-shadow-[0_2px_8px_rgba(234,179,8,0.25)]', 
      Icon: Citrus,
      tags: ['Zumo Natural', 'Hierbabuena', 'Cítricos Frescos'],
      tagColors: ['bg-yellow-100 border-yellow-200 text-yellow-700', 'bg-lime-50 border-lime-100 text-lime-700', 'bg-amber-50 border-amber-100 text-amber-700']
    };
  }
  if (f.includes('vainilla') || f.includes('mantecado') || f.includes('caramelo') || f.includes('turrón') || f.includes('turron')) {
    return { 
      color: '#d4b574', 
      dropShadow: 'drop-shadow-[0_2px_8px_rgba(212,181,116,0.25)]', 
      Icon: IceCream,
      tags: ['Vainilla', 'Leche Fresca', 'Caramelo Suave'],
      tagColors: ['bg-amber-100 border-amber-200 text-amber-700', 'bg-yellow-50 border-yellow-100 text-yellow-700', 'bg-orange-50 border-orange-100 text-orange-700']
    };
  }
  if (f.includes('menta') || f.includes('pistacho') || f.includes('manzana')) {
    return { 
      color: '#10b981', 
      dropShadow: 'drop-shadow-[0_2px_8px_rgba(16,185,129,0.25)]', 
      Icon: Leaf,
      tags: ['Hojas de Menta', 'Chocolate Crujiente', 'Crema'],
      tagColors: ['bg-emerald-100 border-emerald-200 text-emerald-700', 'bg-green-50 border-green-100 text-green-700', 'bg-teal-50 border-teal-100 text-teal-700']
    };
  }
  
  return { 
    color: '#8d50e6', 
    dropShadow: 'drop-shadow-[0_2px_8px_rgba(141,80,230,0.25)]', 
    Icon: Star,
    tags: ['Receta Secreta', 'Dulzor', 'Sabor Artesanal'],
    tagColors: ['bg-purple-100 border-purple-200 text-purple-700', 'bg-indigo-50 border-indigo-100 text-indigo-700', 'bg-blue-50 border-blue-100 text-blue-700']
  };
};

export default function App() {
  const [quantity, setQuantity] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showDetails, setShowDetails] = useState(false);
  
  // Estado del tiempo (Navegación Pulgar-First / Glassmorphism)
  const [weatherMenuOpen, setWeatherMenuOpen] = useState(false);
  const [weatherState, setWeatherState] = useState<{
    status: 'idle' | 'loading' | 'error' | 'success';
    temp?: number;
    code?: number;
    city?: string;
  }>({ status: 'loading' });

  const [flavorOfTheDay, setFlavorOfTheDay] = useState('Moscatel');
  const [flavorLoading, setFlavorLoading] = useState(true);
  
  const flavorConfig = getFlavorConfig(flavorOfTheDay);

  // Fetch flavor from Google Sheets
  useEffect(() => {
    const fetchFlavor = async () => {
      try {
        const url = 'https://docs.google.com/spreadsheets/d/1erM25Ah42IhrtrnCvb3wDgQ0Zk8P99lUy3tYr3mJ0E4/export?format=csv';
        const response = await fetch(url);
        const text = await response.text();
        const flavor = text.replace(/['"]+/g, '').trim();
        if (flavor) {
          setFlavorOfTheDay(flavor);
        }
      } catch (error) {
        console.error('Error fetching flavor:', error);
      } finally {
        setFlavorLoading(false);
      }
    };
    fetchFlavor();
  }, []);

  // Efecto Parallax Sutil: rastreo de cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Movimientos muy ligeros para no distraer (sutil)
      const x = (e.clientX / window.innerWidth - 0.5) * 20; 
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Fetch weather data based on geolocation
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            // Fetch weather using Free Open-Meteo API
            const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
            const data = await res.json();
            
            // Try to get location name using a free geocoding API (Nominatim by OSM)
            let city = "Tu ubicación";
            try {
              const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`);
              const geoData = await geoRes.json();
              if (geoData && geoData.address) {
                city = geoData.address.city || geoData.address.town || geoData.address.village || geoData.address.state || "Tu ubicación";
              }
            } catch (e) {
              // Ignore geocoding errors, just use fallback
            }

            if (data.current_weather) {
              setWeatherState({ 
                status: 'success', 
                temp: Math.round(data.current_weather.temperature), 
                code: data.current_weather.weathercode,
                city
              });
            } else {
              setWeatherState({ status: 'error', temp: 25, code: 0, city: "Ubicación oculta" });
            }
          } catch (error) {
            setWeatherState({ status: 'error', temp: 25, code: 0, city: "Ubicación oculta" });
          }
        },
        () => {
          setWeatherState({ status: 'error', temp: 25, code: 0, city: "Ubicación oculta" }); // permission denied fallback
        }
      );
    } else {
      setWeatherState({ status: 'error', temp: 25, code: 0, city: "Sistema no soportado" });
    }
  }, []);

  const getWeatherIcon = (code: number, size = 20) => {
    if (code === 0) return <Sun className="text-yellow-500 mb-[1px]" size={size} />;
    if ([1, 2, 3].includes(code)) return <Cloud className="text-gray-400 mb-[1px]" size={size} />;
    if ([45, 48].includes(code)) return <CloudFog className="text-gray-400 mb-[1px]" size={size} />;
    if ([51, 53, 55, 56, 57].includes(code)) return <CloudDrizzle className="text-blue-400 mb-[1px]" size={size} />;
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return <CloudRain className="text-blue-500 mb-[1px]" size={size} />;
    if ([71, 73, 75, 77, 85, 86].includes(code)) return <CloudSnow className="text-blue-200 mb-[1px]" size={size} />;
    if ([95, 96, 99].includes(code)) return <CloudLightning className="text-purple-500 mb-[1px]" size={size} />;
    return <Sun className="text-yellow-500 mb-[1px]" size={size} />;
  };

  const getWeatherDesc = (code: number) => {
    if (code === 0) return "Soleado"; // It feels better for ice creams
    if ([1, 2, 3].includes(code)) return "Nublado";
    if ([45, 48].includes(code)) return "Niebla";
    if ([51, 53, 55, 56, 57].includes(code)) return "Llovizna";
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "Lluvia";
    if ([71, 73, 75, 77, 85, 86].includes(code)) return "Nieve";
    if ([95, 96, 99].includes(code)) return "Tormenta";
    return "Despejado";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quantity || parseInt(quantity) <= 0) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2500);
      return;
    }

    setStatus('loading');
    
    // Simulando el tiempo de una petición para mostrar feedback
    setTimeout(() => {
      setStatus('success');
      
      // Enviar SMS
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const sep = isIOS ? '&' : '?';
      const message = encodeURIComponent(`Hola, quiero pedir ${quantity} unidad(es) de helado sabor ${flavorOfTheDay}.`);
      window.location.href = `sms:+5355260778${sep}body=${message}`;

      setTimeout(() => {
        setStatus('idle');
        setQuantity('');
      }, 2500);
    }, 800);
  };

  return (
    <div className="relative min-h-screen bg-[#fafafc] overflow-hidden flex flex-col items-center py-6 sm:py-12 px-4 justify-between font-sans selection:bg-[#8d50e6]/20 text-gray-800">
      
      {/* Animaciones de fondo para profundidad (Capas de profundidad) */}
      <motion.div 
        animate={{ 
          x: mousePosition.x * -1.5, 
          y: mousePosition.y * -1.5 
        }}
        transition={{ type: "spring", stiffness: 40, damping: 20 }}
        className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden"
      >
        <motion.div 
          animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-5%] left-[10%] w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-10%] right-[5%] w-[600px] h-[600px] bg-indigo-200/40 rounded-full blur-[120px]" 
        />
      </motion.div>

      {/* Glassmorphism 2.0 Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} // Transición suave
        style={{ 
          x: mousePosition.x * 0.5, 
          y: mousePosition.y * 0.5,
        }}
        className="relative z-10 w-full max-w-[420px] flex flex-col items-center flex-grow bg-white/70 backdrop-blur-[16px] border border-white/60 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05),_0_0_0_1px_rgba(255,255,255,0.4)_inset] rounded-[40px] p-6 sm:p-10 mx-auto"
      >
        
        {/* Imagen con hover 3D suave (Efecto 3D ligero) */}
        <motion.div 
          whileHover={{ scale: 1.04, y: -4, rotateZ: 1 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="mb-8 w-56 h-56 md:w-64 md:h-64 rounded-[40px] overflow-hidden shadow-[0_16px_32px_-10px_rgba(0,0,0,0.15)] border-4 border-white/90 flex-shrink-0 bg-gray-50 flex items-center justify-center relative cursor-default group"
        >
          <motion.img 
            src="/logo.png" 
            alt="Helados Caram Logo Pingüino"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1559703248-dcaaec9fab78?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";
            }}
          />
          {/* Overlay de brillo para sumar al efecto 3D/Glass */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </motion.div>

        {/* Textos que aparecen gradualmente */}
        <div className="text-center flex flex-col items-center space-y-1.5 mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }}
            className="text-3xl sm:text-4xl font-semibold text-[#5e5e5e] tracking-tight"
          >
            Bienvenidos
          </motion.h1>
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25 }}
            className="text-xl font-medium text-gray-400 font-cursive italic"
          >
            a
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold text-[#5e5e5e] tracking-tight drop-shadow-sm"
          >
            Helados Caram
          </motion.h2>
        </div>

        {/* Tarjeta interna Glassmorphism para el Sabor (Contraste alto e Interactivo) */}
        <motion.div 
          layout
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.45, type: "spring", stiffness: 100 }}
          onClick={() => setShowDetails(!showDetails)}
          className="text-center justify-center flex flex-col items-center mb-10 w-full py-5 px-6 bg-white/60 backdrop-blur-md rounded-[28px] shadow-[0_8px_24px_rgb(0,0,0,0.03)] border border-white/80 transition-shadow hover:shadow-[0_8px_32px_rgb(0,0,0,0.06)] cursor-pointer group"
        >
          <motion.div layout className="flex items-center gap-1.5 mb-1 text-gray-500 group-hover:text-gray-700 transition-colors">
            <p className="text-[14px] font-semibold uppercase tracking-widest">Sabor del día</p>
            <motion.div
              animate={{ rotate: showDetails ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ChevronDown size={16} strokeWidth={2.5} />
            </motion.div>
          </motion.div>
          
          <motion.h3 
            layout 
            className={`font-cursive text-5xl sm:text-6xl tracking-wide mb-1 flex items-center justify-center gap-3 min-h-[72px] ${flavorConfig.dropShadow}`}
            style={{ color: flavorConfig.color }}
          >
            {flavorLoading ? (
              <Loader2 className="w-8 h-8 animate-spin opacity-50" style={{ color: flavorConfig.color }} />
            ) : (
              <>
                <span>{flavorOfTheDay}</span>
                <flavorConfig.Icon size={46} className="opacity-90" strokeWidth={2} />
              </>
            )}
          </motion.h3>

          <AnimatePresence>
            {showDetails && !flavorLoading && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden flex flex-col items-center text-sm text-gray-600 w-full"
              >
                <div className="w-8 h-[1px] bg-gray-200 mb-3 rounded-full"></div>
                <p className="font-medium text-[15px] leading-relaxed max-w-[280px] mb-3">
                  Un helado suave y cremoso, elaborado con los mejores ingredientes para ofrecerte el auténtico sabor de <span className="font-semibold text-gray-700">{flavorOfTheDay}</span>.
                </p>
                <div className="flex flex-wrap justify-center gap-1.5 mt-1">
                  {flavorConfig.tags.map((tag, index) => (
                    <span key={tag} className={`px-2.5 py-1 border rounded-full text-xs font-semibold shadow-sm ${flavorConfig.tagColors[index]}`}>{tag}</span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Controles de Formulario */}
        <div className="w-full flex justify-center flex-col items-center relative min-h-[140px]">
          {/* Espacio reservado para feedback usando AnimatePresence */}
          <div className="h-8 mb-4 flex items-center justify-center w-full">
            <AnimatePresence mode="wait">
              {status === 'idle' && (
                <motion.p 
                  key="idle-text"
                  initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} transition={{ duration: 0.2 }}
                  className="text-gray-600 text-[16px] font-medium"
                >
                  Introduzca cantidad a pedir
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p 
                  key="error-text"
                  initial={{ opacity: 0, y: -5, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 5 }} transition={{ duration: 0.2 }}
                  className="text-red-500 text-[16px] font-semibold flex items-center gap-2"
                >
                  <AlertCircle size={18} strokeWidth={2.5} /> Cantidad inválida
                </motion.p>
              )}
              {status === 'success' && (
                <motion.p 
                  key="success-text"
                  initial={{ opacity: 0, y: -5, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 5 }} transition={{ duration: 0.2 }}
                  className="text-emerald-600 text-[16px] font-semibold flex items-center gap-2"
                >
                  <CheckCircle2 size={18} strokeWidth={2.5} /> ¡Preparando pedido!
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          
          {/* Input + Botón Combo */}
          <motion.form 
            onSubmit={handleSubmit}
            animate={status === 'error' ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
            transition={{ duration: 0.4 }}
            className={`flex items-stretch justify-center h-[64px] w-full max-w-[300px] rounded-full p-1.5 transition-all duration-300 relative z-20 ${
              status === 'error' 
                ? 'bg-red-50 border-2 border-red-300 shadow-[0_8px_20px_rgba(239,68,68,0.2)]' 
                : 'bg-[#5e5c5a] shadow-[0_12px_24px_rgba(94,92,90,0.25),_inset_0_2px_4px_rgba(255,255,255,0.15)] hover:shadow-[0_16px_32px_rgba(94,92,90,0.35),_inset_0_2px_4px_rgba(255,255,255,0.15)]'
            }`}
          >
            <input 
              type="number" 
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              disabled={status === 'loading' || status === 'success'}
              className={`w-[45%] bg-transparent text-center text-2xl font-bold focus:outline-none focus:bg-black/10 rounded-l-full transition-colors disabled:opacity-70 ${
                status === 'error' ? 'text-red-600 placeholder:text-red-300' : 'text-white placeholder:text-white/40'
              }`}
              placeholder="0"
            />
            
            <div className={`w-[1px] my-2 ${status === 'error' ? 'bg-red-200' : 'bg-white/20'}`}></div>
            
            <motion.button 
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              whileHover={status === 'idle' ? { backgroundColor: "rgba(255,255,255,0.1)" } : {}}
              whileTap={status === 'idle' ? { scale: 0.95 } : {}}
              className={`w-[55%] relative flex items-center justify-center text-lg font-bold font-sans rounded-full mx-1 transition-all duration-300 ${
                status === 'success' 
                  ? 'bg-emerald-500 text-white shadow-[0_4px_12px_rgba(16,185,129,0.4)]' 
                  : status === 'error'
                    ? 'bg-red-500 text-white shadow-[0_4px_12px_rgba(239,68,68,0.4)] hover:bg-red-600'
                    : 'bg-transparent text-white'
              }`}
            >
              {status === 'loading' ? (
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : status === 'success' ? (
                <motion.div initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 200, damping: 15 }}>
                  <CheckCircle2 className="w-6 h-6" />
                </motion.div>
              ) : (
                "Enviar"
              )}
            </motion.button>
          </motion.form>
        </div>
      </motion.div>

      {/* Widget del Tiempo: Navegación Pulgar-First + Glassmorphism */}
      <AnimatePresence>
        {(weatherState.status === 'success' || weatherState.status === 'error' || weatherState.status === 'loading') && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 100, damping: 20 }}
            className="fixed bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto flex flex-col items-center"
          >
            <AnimatePresence>
              {weatherMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="mb-3 w-[260px] bg-white/80 backdrop-blur-[16px] border border-white/60 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.15)] rounded-3xl p-4 flex flex-col"
                >
                  <p className="text-sm font-semibold text-gray-700 text-center mb-2">Recomendación para hoy</p>
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-3 border border-purple-100/50">
                    <p className="text-xs text-gray-600 leading-relaxed text-center">
                      {(weatherState.temp || 0) > 25 ? `¡Hace calor! Un helado de ${flavorLoading ? 'hoy' : flavorOfTheDay} es perfecto para refrescarse.` : `Incluso con este tiempo, un deliciosísimo helado de ${flavorLoading ? 'hoy' : flavorOfTheDay} siempre alegra el día.`}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div 
              onClick={() => setWeatherMenuOpen(!weatherMenuOpen)}
              className="flex items-center gap-3 px-5 py-2.5 bg-white/80 backdrop-blur-[12px] border border-white/60 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),_0_0_0_1px_rgba(255,255,255,0.5)_inset] rounded-full min-w-[200px] overflow-hidden group hover:bg-white/90 transition-colors cursor-pointer"
            >
              
              {weatherState.status === 'loading' ? (
                <div className="flex items-center justify-center w-full gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                  <span className="text-sm font-medium text-gray-600">Localizando...</span>
                </div>
              ) : (weatherState.status === 'success' || weatherState.status === 'error') && weatherState.temp !== undefined && weatherState.code !== undefined ? (
                <>
                  <div className="flex items-center gap-1.5 border-r border-gray-200/60 pr-3 line-clamp-1 truncate max-w-[140px]">
                    <MapPin size={16} className={weatherState.status === 'error' ? "text-gray-400 flex-shrink-0" : "text-purple-500 flex-shrink-0"} />
                    <span className="text-sm font-semibold text-gray-700 truncate">{weatherState.city}</span>
                  </div>
                  <div className="flex items-center gap-2 pl-1 flex-shrink-0">
                    {getWeatherIcon(weatherState.code)}
                    <div className="flex flex-col items-start leading-none">
                      <span className="text-[14px] font-bold text-gray-800">{weatherState.temp}°</span>
                      <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mt-[2px]">{getWeatherDesc(weatherState.code)}</span>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer minimalista */}
      <motion.footer 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }}
        className="mt-6 mb-16 md:mb-12 text-center z-10 relative"
      >
        <p className="font-mono text-xs sm:text-sm text-gray-400 font-medium tracking-wider uppercase">
          © 2026 Helados Caram
        </p>
      </motion.footer>
    </div>
  );
}
