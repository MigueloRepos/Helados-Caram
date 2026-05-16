/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect } from "react";
import { GoogleGenAI, Type } from "@google/genai";
import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
  CloudDrizzle,
  MapPin,
  Loader2,
  Coffee,
  IceCream,
  Wine,
  Cherry,
  Citrus,
  Cookie,
  Star,
  Leaf,
  CakeSlice,
  Banknote,
  SmartphoneNfc,
  Landmark,
  X,
  Bell,
  CalendarDays,
  PartyPopper,
  User,
  MapPinHouse,
  Send,
  Clock,
  Eye,
  Users
} from "lucide-react";

const getFlavorConfig = (flavor: string) => {
  const f = flavor.toLowerCase();

  if (f.includes("moscatel") || f.includes("uva") || f.includes("vino")) {
    return {
      color: "#8d50e6",
      dropShadow: "drop-shadow-[0_2px_8px_rgba(141,80,230,0.25)]",
      Icon: Wine,
      tags: ["Uvas Frescas", "Miel de Caña", "Nata Artesanal"],
      tagColors: [
        "bg-purple-100 border-purple-200 text-purple-700",
        "bg-indigo-50 border-indigo-100 text-indigo-700",
        "bg-blue-50 border-blue-100 text-blue-700",
      ],
    };
  }
  if (
    f.includes("tiramisú") ||
    f.includes("tiramisu") ||
    f.includes("cafe") ||
    f.includes("café") ||
    f.includes("coffee")
  ) {
    return {
      color: "#8b5a2b",
      dropShadow: "drop-shadow-[0_2px_8px_rgba(139,90,43,0.25)]",
      Icon: CakeSlice,
      tags: ["Café Espresso", "Mascarpone", "Cacao Puro"],
      tagColors: [
        "bg-orange-100 border-orange-200 text-orange-800",
        "bg-amber-100 border-amber-200 text-amber-800",
        "bg-yellow-100 border-yellow-200 text-yellow-800",
      ],
    };
  }
  if (f.includes("chocolate") || f.includes("cacao") || f.includes("bombón")) {
    return {
      color: "#5c3a21",
      dropShadow: "drop-shadow-[0_2px_8px_rgba(92,58,33,0.25)]",
      Icon: Cookie,
      tags: ["Cacao 70%", "Avellanas", "Leche Fresca"],
      tagColors: [
        "bg-stone-200 border-stone-300 text-stone-800",
        "bg-orange-50 border-orange-100 text-orange-800",
        "bg-amber-50 border-amber-100 text-amber-800",
      ],
    };
  }
  if (
    f.includes("fresa") ||
    f.includes("frutilla") ||
    f.includes("cereza") ||
    f.includes("frutos rojos")
  ) {
    return {
      color: "#e84c6b",
      dropShadow: "drop-shadow-[0_2px_8px_rgba(232,76,107,0.25)]",
      Icon: Cherry,
      tags: ["Fresas", "Nata", "Sirope Natural"],
      tagColors: [
        "bg-rose-100 border-rose-200 text-rose-700",
        "bg-pink-50 border-pink-100 text-pink-700",
        "bg-red-50 border-red-100 text-red-700",
      ],
    };
  }
  if (
    f.includes("limón") ||
    f.includes("limon") ||
    f.includes("naranja") ||
    f.includes("citrico") ||
    f.includes("mango")
  ) {
    return {
      color: "#eab308",
      dropShadow: "drop-shadow-[0_2px_8px_rgba(234,179,8,0.25)]",
      Icon: Citrus,
      tags: ["Zumo Natural", "Hierbabuena", "Cítricos Frescos"],
      tagColors: [
        "bg-yellow-100 border-yellow-200 text-yellow-700",
        "bg-lime-50 border-lime-100 text-lime-700",
        "bg-amber-50 border-amber-100 text-amber-700",
      ],
    };
  }
  if (
    f.includes("vainilla") ||
    f.includes("mantecado") ||
    f.includes("caramelo") ||
    f.includes("turrón") ||
    f.includes("turron")
  ) {
    return {
      color: "#d4b574",
      dropShadow: "drop-shadow-[0_2px_8px_rgba(212,181,116,0.25)]",
      Icon: IceCream,
      tags: ["Vainilla", "Leche Fresca", "Caramelo Suave"],
      tagColors: [
        "bg-amber-100 border-amber-200 text-amber-700",
        "bg-yellow-50 border-yellow-100 text-yellow-700",
        "bg-orange-50 border-orange-100 text-orange-700",
      ],
    };
  }
  if (f.includes("menta") || f.includes("pistacho") || f.includes("manzana")) {
    return {
      color: "#10b981",
      dropShadow: "drop-shadow-[0_2px_8px_rgba(16,185,129,0.25)]",
      Icon: Leaf,
      tags: ["Hojas de Menta", "Chocolate Crujiente", "Crema"],
      tagColors: [
        "bg-emerald-100 border-emerald-200 text-emerald-700",
        "bg-green-50 border-green-100 text-green-700",
        "bg-teal-50 border-teal-100 text-teal-700",
      ],
    };
  }

  return {
    color: "#8d50e6",
    dropShadow: "drop-shadow-[0_2px_8px_rgba(141,80,230,0.25)]",
    Icon: Star,
    tags: ["Receta Secreta", "Dulzor", "Sabor Artesanal"],
    tagColors: [
      "bg-purple-100 border-purple-200 text-purple-700",
      "bg-indigo-50 border-indigo-100 text-indigo-700",
      "bg-blue-50 border-blue-100 text-blue-700",
    ],
  };
};

const DEFAULT_T = {
  greetingMorning: "Buenos días",
  greetingAfternoon: "Buenas tardes",
  greetingNight: "Buenas noches",
  welcome: "Bienvenidos",
  to: "a",
  shopName: "Helados Caram",
  flavorTitle: "Sabor del día",
  flavorDescTemplate:
    "Un helado suave y cremoso, elaborado con los mejores ingredientes para ofrecerte el auténtico sabor de",
  idleText: "Introduzca cantidad a pedir",
  errorText: "Cantidad inválida",
  successText: "¡Preparando pedido!",
  sendBtn: "Enviar",
  totalText: "Total a pagar",
  currency: "CUP",
  weatherErrorLabel: "Ubicación oculta",
  weatherUnsupported: "Sistema no soportado",
  weatherLocating: "Localizando...",
  weatherSunny: "Soleado",
  weatherCloudy: "Nublado",
  weatherFog: "Niebla",
  weatherDrizzle: "Llovizna",
  weatherRain: "Lluvia",
  weatherSnow: "Nieve",
  weatherStorm: "Tormenta",
  weatherClear: "Despejado",
  recommendationTitle: "Recomendación para hoy",
  hotText: "¡Hace calor! Un helado de",
  hotTail: "es perfecto para refrescarse.",
  coldText: "Incluso con este tiempo, un deliciosísimo helado de",
  coldTail: "siempre alegra el día.",
  smsPrefix: "Hola, quiero pedir",
  smsUnits: "vaso(s) de 8oz de helado sabor",
  smsTubs: "tina(s) de helado sabor",
  tabUnits: "Vasos de 8oz",
  tabTubs: "Tinas",
  noTubsAvailable: "No hay tinas disponibles por ahora",
  paymentTitle: "Método de pago",
  paymentCash: "Efectivo (CUP)",
  paymentZelle: "Zelle",
  paymentBizum: "Bizum",
  paymentIban: "Transferencia (IBAN / CUP)",
  paymentInstructions: "Realiza el pago usando la siguiente información:",
  paymentConfirm: "Confirmar pedido",
  zelleEmail: "pagos@heladoscaram.com",
  bizumPhone: "+34 600 000 000",
  ibanCupAccount: "9200 0000 0000 0000",
  summaryTitle: "Resumen de tu pedido",
  summaryProduct: "Producto",
  summaryQuantity: "Cantidad",
  summaryTotal: "Total",
  soldOutToday: "Agotado solo por hoy!",
  eventsTitle: "Reservas para eventos",
  eventsSubtitle: "Haga su encargo especial para celebraciones en la fecha indicada",
  eventName: "Nombre y Apellidos",
  eventAddress: "Dirección particular",
  eventDate: "Fecha para la reserva",
  eventTime: "Hora de entrega",
  eventQty: "Cantidad deseada",
  eventBtn: "Reservar vía WhatsApp",
  eventSuccess: "Redirigiendo a WhatsApp..."
};

export default function App() {
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "error" | "success"
  >("idle");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showDetails, setShowDetails] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [dailyVisits, setDailyVisits] = useState<number | null>(null);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const today = new Date().toISOString().split('T')[0].replace(/-/g, '_');
        const res = await fetch(`https://api.counterapi.dev/v1/heladoscaram_1/visits_${today}/up`);
        const data = await res.json();
        setDailyVisits(data.count);
      } catch (e) {
        console.error("Error fetching visits:", e);
      }
    };
    fetchVisits();
  }, []);

  // Efecto para nuevos clientes
  useEffect(() => {
    const isFirstVisit = !localStorage.getItem('visited_before');
    const savedName = localStorage.getItem('customer_name');
    const savedAddress = localStorage.getItem('customer_address');
    
    if (savedName) {
      setCustomerName(savedName);
    }
    if (savedAddress) {
      setCustomerAddress(savedAddress);
    }

    if (isFirstVisit) {
      setShowCustomerModal(true);
    }
  }, []);

  // Estado del tiempo (Navegación Pulgar-First / Glassmorphism)
  const [weatherMenuOpen, setWeatherMenuOpen] = useState(false);
  const [weatherState, setWeatherState] = useState<{
    status: "idle" | "loading" | "error" | "success";
    temp?: number;
    code?: number;
    city?: string;
  }>({ status: "loading" });

  const [flavorOfTheDay, setFlavorOfTheDay] = useState("Moscatel");
  const [tubFlavor, setTubFlavor] = useState("Chocolate");
  const [flavorLoading, setFlavorLoading] = useState(true);
  const [greeting, setGreeting] = useState("");
  const [notification, setNotification] = useState("");
  const [orderType, setOrderType] = useState<"individual" | "tub">(
    "individual",
  );
  
  // Estado para reserva de eventos
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventQty, setEventQty] = useState("");
  const [eventType, setEventType] = useState<"cups" | "tubs">("cups");
  const [eventStatus, setEventStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [eventFlavors, setEventFlavors] = useState<string[]>([]);
  const [multiFlavorQuantities, setMultiFlavorQuantities] = useState<Record<string, number>>({});

  
  const [availableFlavors, setAvailableFlavors] = useState<string[]>([
    "Chocolate", "Moscatel", "Tiramisú", "Fresa", "Naranja Piña", 
    "Coco", "Piña", "Tres Leches", "Mantecado"
  ]);
  
  const [t, setT] = useState(DEFAULT_T);

  const parsedIndividualFlavors = flavorOfTheDay.split(',').map(f => f.trim()).filter(Boolean);
  const isMultiFlavor = orderType === "individual" && parsedIndividualFlavors.length > 1;
  const activeFlavor = isMultiFlavor ? parsedIndividualFlavors[0] : (orderType === "individual" ? flavorOfTheDay : tubFlavor);
  
  const multiVals = Object.values(multiFlavorQuantities) as number[];
  const totalMultiQty: number = multiVals.reduce((acc, val) => acc + (val || 0), 0);

  const handleMultiQtyChange = (flavor: string, change: number) => {
    setMultiFlavorQuantities(prev => {
      const current = prev[flavor] || 0;
      const next = Math.max(0, current + change);
      return { ...prev, [flavor]: next };
    });
  };

  const flavorConfig = getFlavorConfig(activeFlavor);
  const currentPrice = orderType === "individual" ? 130 : 2800;
  const currentSmsUnits =
    orderType === "individual"
      ? t.smsUnits
      : t.smsTubs || "tina(s) de helado sabor";

  const [translatedTags, setTranslatedTags] = useState<string[] | null>(null);
  const tagsToDisplay = translatedTags || flavorConfig.tags;

  useEffect(() => {
    const translate = async () => {
      setTranslatedTags(null);
      try {
        const lang = navigator.language;
        if (lang.startsWith("es")) return;

        const payload = {
          strings: DEFAULT_T,
          currentTags: flavorConfig.tags,
        };

        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const res = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: `Translate all string values in the following JSON object to the language corresponding to locale: "${lang}". Keep exact same keys. Return ONLY valid JSON.\n\n${JSON.stringify(payload)}`,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                strings: { type: Type.OBJECT },
                currentTags: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
            },
          },
        });

        const extracted = JSON.parse(res.text.trim());
        if (extracted.strings) setT(extracted.strings);
        if (extracted.currentTags) setTranslatedTags(extracted.currentTags);
      } catch (e) {
        console.error("Translation error:", e);
      }
    };
    translate();
  }, [flavorConfig.tags]);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setGreeting(t.greetingMorning);
    else if (hour >= 12 && hour < 20) setGreeting(t.greetingAfternoon);
    else setGreeting(t.greetingNight);
  }, [t]);

  // Fetch flavor and notification from Google Sheets
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url =
          "https://docs.google.com/spreadsheets/d/1erM25Ah42IhrtrnCvb3wDgQ0Zk8P99lUy3tYr3mJ0E4/export?format=csv";
        const response = await fetch(url);
        const text = await response.text();
        const lines = text.split("\n");
        if (lines.length > 0) {
          const firstRow = lines[0];
          // Use a regex to correctly split CSV, handling quotes
          const splitCols: string[] = [];
          let match;
          const colsRegex = /(".*?"|[^",\s]+)(?=\s*,|\s*$)/g;
          
          while ((match = colsRegex.exec(firstRow)) !== null) {
            splitCols.push(match[0].replace(/^"|"$/g, "").trim());
          }

          // Fallback if regex doesn't match properly for empty columns
          const finalCols = firstRow.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(s => s.replace(/^"|"$/g, '').trim());

          const flavor = finalCols[0] || "";
          const notif = finalCols[1] || "";
          const tFlavor = finalCols[2] || "";
          const d1Flavors = finalCols[3] || "";

          setFlavorOfTheDay(flavor);
          setNotification(notif);
          setTubFlavor(tFlavor);

          if (d1Flavors.trim()) {
            const parsedFlavors = d1Flavors.split(',').map(f => f.replace(/^"|"$/g, '').trim()).filter(Boolean);
            setAvailableFlavors(parsedFlavors);
          } else {
            setAvailableFlavors([]);
          }
          
          if (lines.length > 1) {
            const secondRow = lines[1];
            const splitRow2: string[] = [];
            let match2;
            const colsRegex2 = /(".*?"|[^",\s]+)(?=\s*,|\s*$)/g;
            while ((match2 = colsRegex2.exec(secondRow)) !== null) {
              splitRow2.push(match2[0].replace(/^"|"$/g, "").trim());
            }
            const fallbackRow2 = secondRow.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(s => s.replace(/^"|"$/g, '').trim());
            const a2Notif = splitRow2[0] || fallbackRow2[0] || "";
            
            if (a2Notif && a2Notif.trim() !== "") {
              const cleanedNotif = a2Notif.trim();
              const lastNotif = localStorage.getItem('last_push_notif');
              if (lastNotif !== cleanedNotif) {
                if ('Notification' in window) {
                  if (Notification.permission === 'granted') {
                    new Notification('Helados Caram', { body: cleanedNotif, icon: '/logo.png' });
                    localStorage.setItem('last_push_notif', cleanedNotif);
                  } else if (Notification.permission !== 'denied') {
                    Notification.requestPermission().then(permission => {
                      if (permission === 'granted') {
                        new Notification('Helados Caram', { body: cleanedNotif, icon: '/logo.png' });
                        localStorage.setItem('last_push_notif', cleanedNotif);
                      }
                    });
                  }
                }
              }
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setFlavorLoading(false);
      }
    };
    fetchData();
  }, []);

  // Efecto Parallax Sutil: rastreo de cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Movimientos muy ligeros para no distraer (sutil)
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Fetch weather data based on geolocation
  useEffect(() => {
    const fetchWeather = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const { latitude, longitude } = position.coords;
              // Fetch weather using Free Open-Meteo API
              const res = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`,
              );
              const data = await res.json();

              // Try to get location name using a free geocoding API (Nominatim by OSM)
              let city = t.weatherErrorLabel;
              try {
                const geoRes = await fetch(
                  `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`,
                );
                const geoData = await geoRes.json();
                if (geoData && geoData.address) {
                  city =
                    geoData.address.city ||
                    geoData.address.town ||
                    geoData.address.village ||
                    geoData.address.state ||
                    t.weatherErrorLabel;
                }
              } catch (e) {
                // Ignore geocoding errors, just use fallback
              }

              if (data.current_weather) {
                setWeatherState({
                  status: "success",
                  temp: Math.round(data.current_weather.temperature),
                  code: data.current_weather.weathercode,
                  city,
                });
              } else {
                setWeatherState({
                  status: "error",
                  temp: 25,
                  code: 0,
                  city: t.weatherErrorLabel,
                });
              }
            } catch (error) {
              setWeatherState({
                status: "error",
                temp: 25,
                code: 0,
                city: t.weatherErrorLabel,
              });
            }
          },
          () => {
            setWeatherState({
              status: "error",
              temp: 25,
              code: 0,
              city: t.weatherErrorLabel,
            }); // permission denied fallback
          },
        );
      } else {
        setWeatherState({
          status: "error",
          temp: 25,
          code: 0,
          city: t.weatherUnsupported,
        });
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 5 * 60 * 1000); // 5 minutes
    
    return () => clearInterval(interval);
  }, [t.weatherErrorLabel, t.weatherUnsupported]);

  const getWeatherIcon = (code: number, size = 20) => {
    if (code === 0)
      return <Sun className="text-yellow-500 mb-[1px]" size={size} />;
    if ([1, 2, 3].includes(code))
      return <Cloud className="text-gray-400 mb-[1px]" size={size} />;
    if ([45, 48].includes(code))
      return <CloudFog className="text-gray-400 mb-[1px]" size={size} />;
    if ([51, 53, 55, 56, 57].includes(code))
      return <CloudDrizzle className="text-blue-400 mb-[1px]" size={size} />;
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code))
      return <CloudRain className="text-blue-500 mb-[1px]" size={size} />;
    if ([71, 73, 75, 77, 85, 86].includes(code))
      return <CloudSnow className="text-blue-200 mb-[1px]" size={size} />;
    if ([95, 96, 99].includes(code))
      return (
        <CloudLightning className="text-purple-500 mb-[1px]" size={size} />
      );
    return <Sun className="text-yellow-500 mb-[1px]" size={size} />;
  };

  const getWeatherDesc = (code: number) => {
    if (code === 0) return t.weatherSunny;
    if ([1, 2, 3].includes(code)) return t.weatherCloudy;
    if ([45, 48].includes(code)) return t.weatherFog;
    if ([51, 53, 55, 56, 57].includes(code)) return t.weatherDrizzle;
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return t.weatherRain;
    if ([71, 73, 75, 77, 85, 86].includes(code)) return t.weatherSnow;
    if ([95, 96, 99].includes(code)) return t.weatherStorm;
    return t.weatherClear;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isMultiFlavor) {
      if (totalMultiQty <= 0) {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 2500);
        return;
      }
    } else {
      if (!quantity || parseInt(quantity) <= 0) {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 2500);
        return;
      }
    }

    setStatus("loading");

    // Simulando el tiempo de una petición para mostrar feedback
    setTimeout(() => {
      setStatus("idle");
      setShowPaymentModal(true);
    }, 800);
  };

  const confirmOrder = () => {
    let paymentText = "";
    if (selectedPayment === "cash") paymentText = t.paymentCash;
    if (selectedPayment === "zelle") paymentText = t.paymentZelle;
    if (selectedPayment === "bizum") paymentText = t.paymentBizum;
    if (selectedPayment === "iban") paymentText = t.paymentIban;

    let flavorText = "";
    
    if (isMultiFlavor) {
      flavorText = parsedIndividualFlavors
        .filter(f => multiFlavorQuantities[f] > 0)
        .map(f => `${multiFlavorQuantities[f]} ${currentSmsUnits} de ${f}`)
        .join(", ");
    } else {
      flavorText = `${quantity} ${currentSmsUnits} de ${activeFlavor}`;
    }

    let customerInfoLabel = "";
    if (customerName || customerAddress) {
      let mapLink = "";
      if (customerAddress) {
        const fullQuery = `${customerAddress}, Puerto Padre, Las Tunas, Cuba`;
        mapLink = `\n*Ubicación:* https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullQuery)}`;
      }
      customerInfoLabel = `\n\n*Cliente:* ${customerName || 'No especificado'}\n*Dirección:* ${customerAddress || 'No especificada'}${mapLink}`;
    }

    const totalAmount = (isMultiFlavor ? totalMultiQty : parseInt(quantity || "0")) * currentPrice;

    const message = encodeURIComponent(
      `${t.smsPrefix} ${flavorText}. (Total: $${totalAmount.toLocaleString()} ${t.currency}) (Pago: ${paymentText})${customerInfoLabel}`,
    );
    window.open(`https://wa.me/5355260778?text=${message}`, "_blank");

    setShowPaymentModal(false);
    setSelectedPayment(null);
    setStatus("success");
    setQuantity("");
    setMultiFlavorQuantities({});
    setTimeout(() => setStatus("idle"), 3000);
  };
  
  const submitEventOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (eventFlavors.length === 0) {
      setEventStatus("error");
      setTimeout(() => setEventStatus("idle"), 3000);
      return;
    }
    
    setEventStatus("loading");
    
    const typeLabel = eventType === "cups" ? t.tabUnits || "Vasos de 8oz" : t.tabTubs || "Tinas";
    const flavorsList = eventFlavors.join(", ");
    
    const eventPrice = eventType === "cups" ? 130 : 2800;
    const totalEventAmount = parseInt(eventQty || "0") * eventPrice;

    let addressInfo = `*Dirección:* ${customerAddress}`;
    if (customerAddress) {
      const fullQuery = `${customerAddress}, Puerto Padre, Las Tunas, Cuba`;
      addressInfo += `\n*Ubicación:* https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullQuery)}`;
    }

    const message = `Hola, quiero hacer una reserva para un evento:\n\n*Nombre:* ${customerName}\n${addressInfo}\n*Sabores:* ${flavorsList}\n*Cantidad:* ${eventQty} ${typeLabel}\n*Total:* $${totalEventAmount.toLocaleString()} ${t.currency || "CUP"}\n*Fecha del evento:* ${eventDate}\n*Hora:* ${eventTime}`;
    
    setTimeout(() => {
      setEventStatus("success");
      setTimeout(() => {
        window.open(`https://wa.me/5355260778?text=${encodeURIComponent(message)}`, "_blank");
        setTimeout(() => {
          setEventStatus("idle");
          setEventQty("");
          setEventDate("");
          setEventTime("");
          setEventFlavors([]);
        }, 500);
      }, 1000);
    }, 1200);
  };

  return (
    <div className="relative min-h-screen bg-[#fafafc] overflow-hidden flex flex-col items-center py-4 sm:py-12 px-3 sm:px-4 justify-between font-sans selection:bg-[#8d50e6]/20 text-gray-800">
      {/* Animaciones de fondo para profundidad (Capas de profundidad) */}
      <motion.div
        animate={{
          x: mousePosition.x * -1.5,
          y: mousePosition.y * -1.5,
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
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-[-10%] right-[5%] w-[600px] h-[600px] bg-indigo-200/40 rounded-full blur-[120px]"
        />
      </motion.div>

      {/* Notification Banner */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, height: 0, marginBottom: 0 }}
            className="w-full max-w-[420px] mb-4 bg-indigo-50 border border-indigo-100 text-indigo-800 p-3.5 rounded-2xl shadow-[0_8px_16px_rgba(0,0,0,0.03)] z-20 flex items-start gap-3 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-400"></div>
            <Bell size={20} className="flex-shrink-0 mt-0.5 text-indigo-500" />
            <p className="text-sm font-medium leading-relaxed flex-1 pt-0.5 pr-4 text-indigo-900/90 [text-wrap:balance]">
              {notification}
            </p>
            <button
              onClick={() => setNotification("")}
              className="absolute top-3 right-3 p-1.5 bg-indigo-100/50 hover:bg-indigo-200 rounded-full transition-colors text-indigo-500"
              aria-label="Cerrar notificación"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glassmorphism 2.0 Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} // Transición suave
        style={{
          x: mousePosition.x * 0.5,
          y: mousePosition.y * 0.5,
        }}
        className="relative z-10 w-full max-w-[420px] flex flex-col items-center flex-grow bg-white/70 backdrop-blur-[16px] border border-white/60 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05),_0_0_0_1px_rgba(255,255,255,0.4)_inset] rounded-[40px] p-5 sm:p-10 mx-auto"
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
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1559703248-dcaaec9fab78?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";
            }}
          />
          {/* Overlay de brillo para sumar al efecto 3D/Glass */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </motion.div>

        {/* Contenido Superior Constante */}
        <div className="text-center flex flex-col items-center space-y-1.5 mb-6">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.5 }}
            className="text-sm font-bold text-gray-400 tracking-[0.2em] uppercase mb-1"
          >
            ¡{greeting}{customerName ? `, ${customerName.split(' ')[0]}` : ''}!
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="text-3xl sm:text-4xl font-semibold text-[#5e5e5e] tracking-tight"
          >
            {t.welcome}
          </motion.h1>
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
            className="text-xl font-medium text-gray-400 font-cursive italic"
          >
            {t.to}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold text-[#5e5e5e] tracking-tight drop-shadow-sm"
          >
            {t.shopName}
          </motion.h2>
          
          {dailyVisits !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="mt-4 flex items-center justify-center gap-1.5 px-3.5 py-1.5 bg-white/60 backdrop-blur-md rounded-full shadow-[0_2px_8px_-4px_rgba(0,0,0,0.1)] border border-white/80"
            >
              <Users size={14} className="text-amber-500" />
              <span className="text-[11px] font-bold tracking-widest text-gray-500 uppercase">
                {dailyVisits} {dailyVisits === 1 ? 'visita hoy' : 'visitas hoy'}
              </span>
            </motion.div>
          )}
        </div>

        {/* Toggle Tipo de Pedido */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex w-full max-w-[240px] bg-gray-100 p-1 rounded-full mb-8 relative border border-white/40 shadow-inner"
        >
          <div
            className="absolute top-1 bottom-1 bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.08)] pointer-events-none"
            style={{
              width: "calc(50% - 4px)",
              left: orderType === "individual" ? "4px" : "calc(50%)",
              transition: "left 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
          <button
            onClick={() => {
              setOrderType("individual");
              setQuantity("");
              setStatus("idle");
            }}
            className={`flex-1 relative z-10 py-1.5 text-sm font-bold rounded-full transition-colors ${orderType === "individual" ? "text-gray-800" : "text-gray-400 hover:text-gray-600"}`}
          >
            {t.tabUnits || "Vasos de 8oz"}
          </button>
          <button
            onClick={() => {
              setOrderType("tub");
              setQuantity("");
              setStatus("idle");
            }}
            className={`flex-1 relative z-10 py-1.5 text-sm font-bold rounded-full transition-colors ${orderType === "tub" ? "text-gray-800" : "text-gray-400 hover:text-gray-600"}`}
          >
            {t.tabTubs || "Tinas"}
          </button>
        </motion.div>

        {/* Tarjeta interna Glassmorphism para el Sabor (Contraste alto e Interactivo) */}
        {orderType === "tub" && tubFlavor === "" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center justify-center flex flex-col items-center mb-10 w-full py-8 px-6 bg-white/60 backdrop-blur-md rounded-[28px] shadow-[0_8px_24px_rgb(0,0,0,0.03)] border border-white/80"
          >
            <p className="text-lg font-medium text-gray-500">
              {t.noTubsAvailable || "No hay tinas disponibles por ahora"}
            </p>
          </motion.div>
        ) : orderType === "individual" && flavorOfTheDay === "" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center justify-center flex flex-col items-center mb-10 w-full py-8 px-6 bg-white/60 backdrop-blur-md rounded-[28px] shadow-[0_8px_24px_rgb(0,0,0,0.03)] border border-white/80"
          >
            <p className="text-lg font-medium text-gray-500">
              {t.soldOutToday || "Agotado solo por hoy!"}
            </p>
          </motion.div>
        ) : (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.45, type: "spring", stiffness: 100 }}
            onClick={() => setShowDetails(!showDetails)}
            className="text-center justify-center flex flex-col items-center mb-10 w-full py-5 px-6 bg-white/60 backdrop-blur-md rounded-[28px] shadow-[0_8px_24px_rgb(0,0,0,0.03)] border border-white/80 transition-shadow hover:shadow-[0_8px_32px_rgb(0,0,0,0.06)] cursor-pointer group"
          >
            <motion.div
              layout
              className="flex items-center gap-1.5 mb-1 text-gray-500 group-hover:text-gray-700 transition-colors"
            >
              <p className="text-[14px] font-semibold uppercase tracking-widest">
                {t.flavorTitle}
              </p>
              <motion.div
                animate={{ rotate: showDetails ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <ChevronDown size={16} strokeWidth={2.5} />
              </motion.div>
            </motion.div>

            <motion.h3
              layout
              className={`font-cursive text-5xl sm:text-6xl tracking-wide mb-1 flex items-center justify-center gap-3 sm:gap-4 min-h-[72px] ${flavorConfig.dropShadow}`}
              style={{ color: flavorConfig.color }}
            >
              {flavorLoading ? (
                <Loader2
                  className="w-8 h-8 animate-spin opacity-50"
                  style={{ color: flavorConfig.color }}
                />
              ) : (
                <>
                  <span>{isMultiFlavor ? "Sabores Variados" : activeFlavor}</span>
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: 8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="flex flex-shrink-0 items-center justify-center w-[52px] h-[52px] sm:w-[64px] sm:h-[64px] rounded-2xl sm:rounded-[20px]"
                    style={{
                      backgroundColor: `${flavorConfig.color}15`,
                      boxShadow: `0 8px 20px -4px ${flavorConfig.color}30, inset 0 2px 6px rgba(255,255,255,0.9), 0 0 0 1px ${flavorConfig.color}20`,
                    }}
                  >
                    <flavorConfig.Icon
                      className="w-8 h-8 sm:w-10 sm:h-10 opacity-90"
                      style={{
                        color: flavorConfig.color,
                        filter: `drop-shadow(0 4px 6px ${flavorConfig.color}40)`,
                      }}
                      strokeWidth={2.2}
                    />
                  </motion.div>
                </>
              )}
            </motion.h3>

            <AnimatePresence>
              {showDetails && !flavorLoading && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden flex flex-col items-center text-sm text-gray-600 w-full"
                >
                  <div className="w-8 h-[1px] bg-gray-200 mb-3 rounded-full"></div>
                  <p className="font-medium text-[15px] leading-relaxed max-w-[280px] mb-3">
                    {t.flavorDescTemplate}{" "}
                    <span className="font-semibold text-gray-700">
                      {isMultiFlavor ? parsedIndividualFlavors.join(", ") : activeFlavor}
                    </span>
                    .
                  </p>
                  <div className="flex flex-wrap justify-center gap-1.5 mt-1">
                    {tagsToDisplay.map((tag, index) => (
                      <span
                        key={tag}
                        className={`px-2.5 py-1 border rounded-full text-xs font-semibold shadow-sm ${flavorConfig.tagColors[index] || "bg-gray-100 border-gray-200 text-gray-700"}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Controles de Formulario */}
        {!(orderType === "tub" && tubFlavor === "") &&
          !(orderType === "individual" && flavorOfTheDay === "") && (
            <div className="w-full flex justify-center flex-col items-center relative min-h-[140px]">
              {/* Espacio reservado para feedback usando AnimatePresence */}
              <div className="h-8 mb-4 flex items-center justify-center w-full">
                <AnimatePresence mode="wait">
                  {status === "idle" && (
                    <motion.p
                      key="idle-text"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.2 }}
                      className="text-gray-600 text-[16px] font-medium"
                    >
                      {t.idleText}
                    </motion.p>
                  )}
                  {status === "error" && (
                    <motion.p
                      key="error-text"
                      initial={{ opacity: 0, y: -5, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.2 }}
                      className="text-red-500 text-[16px] font-semibold flex items-center gap-2"
                    >
                      <AlertCircle size={18} strokeWidth={2.5} /> {t.errorText}
                    </motion.p>
                  )}
                  {status === "success" && (
                    <motion.p
                      key="success-text"
                      initial={{ opacity: 0, y: -5, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.2 }}
                      className="text-emerald-600 text-[16px] font-semibold flex items-center gap-2"
                    >
                      <CheckCircle2 size={18} strokeWidth={2.5} />{" "}
                      {t.successText}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Input + Botón Combo */}
              {isMultiFlavor ? (
                <div className="w-full max-w-[320px] flex flex-col gap-2 relative z-20">
                  {parsedIndividualFlavors.map(flavor => (
                    <div key={flavor} className="flex justify-between items-center bg-[#5e5c5a] shadow-[0_4px_12px_rgba(94,92,90,0.15)] rounded-2xl p-2.5 sm:p-3 border border-white/5">
                      <span className="font-semibold text-white/90 text-sm sm:text-[15px] pl-1 break-words line-clamp-2 leading-tight flex-1 pr-2">{flavor}</span>
                      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                        <button type="button" onClick={() => handleMultiQtyChange(flavor, -1)} className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center bg-white/10 hover:bg-white/20 active:scale-95 rounded-full text-white font-bold transition-all text-xl leading-none pb-0.5">-</button>
                        <input
                          type="number"
                          min="0"
                          value={multiFlavorQuantities[flavor] === 0 || multiFlavorQuantities[flavor] === undefined ? "" : multiFlavorQuantities[flavor]}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            setMultiFlavorQuantities(prev => ({ ...prev, [flavor]: isNaN(val) ? 0 : Math.max(0, val) }));
                          }}
                          className="w-8 sm:w-10 text-center font-bold text-white text-base sm:text-lg bg-transparent focus:outline-none focus:bg-white/10 rounded hide-arrows"
                          placeholder="0"
                        />
                        <button type="button" onClick={() => handleMultiQtyChange(flavor, 1)} className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center bg-white/10 hover:bg-white/20 active:scale-95 rounded-full text-white font-bold transition-all text-xl leading-none pb-0.5">+</button>
                      </div>
                    </div>
                  ))}
                  
                  <motion.form
                    onSubmit={handleSubmit}
                    animate={status === "error" ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    className="mt-2 w-full"
                  >
                    <button
                      type="submit"
                      disabled={status === "loading" || status === "success" || totalMultiQty === 0}
                      className={`w-full h-[52px] rounded-full font-bold text-[15px] flex items-center justify-center transition-all ${
                        status === "success" 
                          ? "bg-emerald-500 text-white shadow-[0_4px_12px_rgba(16,185,129,0.4)]"
                          : status === "error"
                            ? "bg-red-500 text-white shadow-[0_4px_12px_rgba(239,68,68,0.4)]"
                            : totalMultiQty > 0 
                              ? "bg-[#5e5c5a] hover:bg-[#6c6a68] text-white shadow-[0_8px_24px_rgba(94,92,90,0.25)] hover:shadow-[0_12px_28px_rgba(94,92,90,0.35)] active:scale-[0.98]" 
                              : "bg-[#5e5c5a]/50 text-white/50 cursor-not-allowed"
                      }`}
                    >
                      {status === "loading" ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                      ) : status === "success" ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        `Continuar (${totalMultiQty})`
                      )}
                    </button>
                  </motion.form>
                </div>
              ) : (
                <motion.form
                  onSubmit={handleSubmit}
                  animate={
                    status === "error" ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}
                  }
                  transition={{ duration: 0.4 }}
                  className={`flex items-stretch justify-center h-14 sm:h-[64px] w-full max-w-[300px] rounded-full p-1 sm:p-1.5 transition-all duration-300 relative z-20 ${
                    status === "error"
                      ? "bg-red-50 border-2 border-red-300 shadow-[0_8px_20px_rgba(239,68,68,0.2)]"
                      : "bg-[#5e5c5a] shadow-[0_12px_24px_rgba(94,92,90,0.25),_inset_0_2px_4px_rgba(255,255,255,0.15)] hover:shadow-[0_16px_32px_rgba(94,92,90,0.35),_inset_0_2px_4px_rgba(255,255,255,0.15)]"
                  }`}
                >
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    disabled={status === "loading" || status === "success"}
                    className={`w-[45%] bg-transparent text-center text-2xl font-bold focus:outline-none focus:bg-black/10 rounded-l-full transition-colors disabled:opacity-70 ${
                      status === "error"
                        ? "text-red-600 placeholder:text-red-300"
                        : "text-white placeholder:text-white/40"
                    }`}
                    placeholder="0"
                  />

                  <div
                    className={`w-[1px] my-2 ${status === "error" ? "bg-red-200" : "bg-white/20"}`}
                  ></div>

                  <motion.button
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    whileHover={
                      status === "idle"
                        ? { backgroundColor: "rgba(255,255,255,0.1)" }
                        : {}
                    }
                    whileTap={status === "idle" ? { scale: 0.95 } : {}}
                    className={`w-[55%] relative flex items-center justify-center text-lg font-bold font-sans rounded-full mx-1 transition-all duration-300 ${
                      status === "success"
                        ? "bg-emerald-500 text-white shadow-[0_4px_12px_rgba(16,185,129,0.4)]"
                        : status === "error"
                          ? "bg-red-500 text-white shadow-[0_4px_12px_rgba(239,68,68,0.4)] hover:bg-red-600"
                          : "bg-transparent text-white"
                    }`}
                  >
                    {status === "loading" ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.8,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                    ) : status === "success" ? (
                      <motion.div
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 15,
                        }}
                      >
                        <CheckCircle2 className="w-6 h-6" />
                      </motion.div>
                    ) : (
                      t.sendBtn
                    )}
                  </motion.button>
                </motion.form>
              )}

              {/* Monto Total */}
              <AnimatePresence>
                {((!isMultiFlavor && quantity && parseInt(quantity) > 0) || (isMultiFlavor && totalMultiQty > 0)) && status !== "error" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    className="text-center overflow-hidden w-full flex justify-center"
                  >
                    <div className="flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm px-6 py-2.5 rounded-2xl border border-white/50 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                      <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">
                        {t.totalText}
                      </p>
                      <p
                        className="text-2xl font-black tracking-tight"
                        style={{ color: flavorConfig.color }}
                      >
                        ${((isMultiFlavor ? totalMultiQty : parseInt(quantity)) * currentPrice).toLocaleString()}{" "}
                        <span className="text-sm font-semibold text-gray-500">
                          {t.currency}
                        </span>
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
      </motion.div>

      {/* Widget del Tiempo: Navegación Pulgar-First + Glassmorphism */}
      <AnimatePresence>
        {(weatherState.status === "success" ||
          weatherState.status === "error" ||
          weatherState.status === "loading") && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.6,
              type: "spring",
              stiffness: 100,
              damping: 20,
            }}
            className="fixed bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto flex flex-col items-center"
          >
            {/* Floating Reservation Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, type: 'spring' }}
              onClick={() => setShowEventModal(true)}
              className="mb-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full px-5 py-3 shadow-[0_8px_24px_-6px_rgba(245,158,11,0.5)] flex items-center justify-center gap-2.5 hover:-translate-y-1 hover:shadow-[0_12px_28px_-8px_rgba(245,158,11,0.6)] active:scale-95 transition-all outline-none"
            >
              <PartyPopper size={20} />
              <span className="font-bold text-[15px] drop-shadow-sm">Reservar</span>
            </motion.button>
            <AnimatePresence>
              {weatherMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="mb-3 w-[260px] bg-white/80 backdrop-blur-[16px] border border-white/60 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.15)] rounded-3xl p-4 flex flex-col"
                >
                  <p className="text-sm font-semibold text-gray-700 text-center mb-2">
                    {t.recommendationTitle}
                  </p>
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-3 border border-purple-100/50">
                    <p className="text-xs text-gray-600 leading-relaxed text-center">
                      {(weatherState.temp || 0) > 25
                        ? `${t.hotText} ${flavorLoading ? "..." : activeFlavor} ${t.hotTail}`
                        : `${t.coldText} ${flavorLoading ? "..." : activeFlavor} ${t.coldTail}`}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div
              onClick={() => setWeatherMenuOpen(!weatherMenuOpen)}
              className="flex items-center gap-3 px-5 py-2.5 bg-white/80 backdrop-blur-[12px] border border-white/60 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),_0_0_0_1px_rgba(255,255,255,0.5)_inset] rounded-full min-w-[200px] overflow-hidden group hover:bg-white/90 transition-colors cursor-pointer"
            >
              {weatherState.status === "loading" ? (
                <div className="flex items-center justify-center w-full gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                  <span className="text-sm font-medium text-gray-600">
                    {t.weatherLocating}
                  </span>
                </div>
              ) : (weatherState.status === "success" ||
                  weatherState.status === "error") &&
                weatherState.temp !== undefined &&
                weatherState.code !== undefined ? (
                <>
                  <div className="flex items-center gap-1.5 border-r border-gray-200/60 pr-3 line-clamp-1 truncate max-w-[140px]">
                    <MapPin
                      size={16}
                      className={
                        weatherState.status === "error"
                          ? "text-gray-400 flex-shrink-0"
                          : "text-purple-500 flex-shrink-0"
                      }
                    />
                    <span className="text-sm font-semibold text-gray-700 truncate">
                      {weatherState.city}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 pl-1 flex-shrink-0">
                    {getWeatherIcon(weatherState.code)}
                    <div className="flex flex-col items-start leading-none">
                      <span className="text-[14px] font-bold text-gray-800">
                        {weatherState.temp}°
                      </span>
                      <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mt-[2px]">
                        {getWeatherDesc(weatherState.code)}
                      </span>
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
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="mt-6 mb-16 md:mb-12 text-center z-10 relative"
      >
        <p className="font-mono text-xs sm:text-sm text-gray-400 font-medium tracking-wider uppercase">
          © 2026 Helados Caram
        </p>
      </motion.footer>

      {/* Payment Selection Modal */}
      <AnimatePresence>
        {showPaymentModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-sm relative overflow-hidden"
            >
              <button
                onClick={() => {
                  setShowPaymentModal(false);
                  setSelectedPayment(null);
                }}
                className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors z-10"
                title="Cerrar"
              >
                <X size={18} />
              </button>

              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center pr-6">
                {t.summaryTitle || "Resumen de tu pedido"}
              </h3>

              <div className="bg-gray-50 rounded-2xl p-4 mb-4 border border-gray-100 shadow-inner">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm text-gray-500 mt-0.5">
                    {t.summaryProduct || "Producto"}:
                  </span>
                  <span className="text-sm font-semibold text-gray-800 text-right ml-4 flex flex-col items-end">
                    <span>
                      {orderType === "individual"
                        ? t.tabUnits || "Vasos de 8oz"
                        : t.tabTubs || "Tinas"}
                    </span>
                    {isMultiFlavor ? (
                      <span className="text-gray-600 text-xs mt-0.5">
                        {parsedIndividualFlavors
                          .filter(f => multiFlavorQuantities[f] > 0)
                          .map(f => `${multiFlavorQuantities[f]}x ${f}`)
                          .join(", ")}
                      </span>
                    ) : (
                      <span className="text-gray-600 text-xs mt-0.5">{activeFlavor}</span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">
                    {t.summaryQuantity || "Cantidad"}:
                  </span>
                  <span className="text-sm font-semibold text-gray-800">
                    {isMultiFlavor ? totalMultiQty : quantity}
                  </span>
                </div>
                <div className="pt-3 border-t border-gray-200/60 flex justify-between items-center">
                  <span className="text-base font-bold text-gray-800">
                    {t.summaryTotal || "Total"}:
                  </span>
                  <span
                    className="text-xl font-black"
                    style={{ color: flavorConfig.color }}
                  >
                    $
                    {(
                      (isMultiFlavor ? totalMultiQty : parseInt(quantity || "0")) * currentPrice
                    ).toLocaleString()}{" "}
                    <span className="text-sm text-gray-500 font-semibold">
                      {t.currency}
                    </span>
                  </span>
                </div>
              </div>
              
              <div className="bg-amber-50/50 rounded-2xl p-4 mb-6 border border-amber-100/50 relative">
                <button type="button" onClick={() => setShowCustomerModal(true)} className="absolute top-4 right-4 text-xs font-bold text-amber-600 hover:text-amber-700 hover:underline">
                  Editar
                </button>
                <div className="flex flex-col gap-1.5 pr-10">
                  <span className="text-xs font-semibold text-amber-800/60 uppercase tracking-wider">Mis Datos</span>
                  <span className="text-sm font-bold text-gray-800">{customerName || 'No especificado'}</span>
                  <span className="text-xs text-gray-500 font-medium line-clamp-2">{customerAddress || 'Dirección no especificada'}</span>
                </div>
              </div>

              <h3 className="text-[15px] font-bold text-gray-800 mb-3 ml-1">
                {t.paymentTitle}
              </h3>

              <div className="space-y-2 mb-6">
                {[
                  {
                    id: "cash",
                    label: t.paymentCash,
                    icon: Banknote,
                    info: "Pago a contra entrega.",
                  },
                  {
                    id: "zelle",
                    label: t.paymentZelle,
                    icon: SmartphoneNfc,
                    info: `Email: ${t.zelleEmail}`,
                  },
                  {
                    id: "bizum",
                    label: t.paymentBizum,
                    icon: SmartphoneNfc,
                    info: `Teléfono: ${t.bizumPhone}`,
                  },
                  {
                    id: "iban",
                    label: t.paymentIban,
                    icon: Landmark,
                    info: `Cuenta: ${t.ibanCupAccount}`,
                  },
                ].map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`p-3 rounded-2xl border-2 flex items-center gap-3 cursor-pointer transition-all ${selectedPayment === method.id ? "border-[#8d50e6] bg-purple-50/50" : "border-gray-100 hover:border-gray-200 bg-white"}`}
                  >
                    <method.icon
                      size={24}
                      className={
                        selectedPayment === method.id
                          ? "text-[#8d50e6]"
                          : "text-gray-400"
                      }
                    />
                    <div className="flex-1">
                      <p
                        className={`font-semibold ${selectedPayment === method.id ? "text-[#8d50e6]" : "text-gray-700"}`}
                      >
                        {method.label}
                      </p>
                      <AnimatePresence>
                        {selectedPayment === method.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="text-[13px] border-t border-purple-200/50 mt-1.5 pt-1.5 text-purple-800 font-medium select-all">
                              {method.info}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                ))}
              </div>

              <button
                disabled={!selectedPayment}
                onClick={confirmOrder}
                className="w-full py-3.5 bg-[#8d50e6] text-white rounded-xl font-bold text-[15px] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#7a45c7] transition-colors shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2"
              >
                {t.paymentConfirm}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Event Reservation Modal */}
      <AnimatePresence>
        {showEventModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-[28px] shadow-2xl p-6 w-full max-w-sm relative overflow-hidden group"
            >
              <button 
                onClick={() => { setShowEventModal(false); setEventStatus("idle"); }} 
                className="absolute top-4 right-4 p-2 bg-gray-100/80 rounded-full text-gray-500 hover:bg-gray-200 transition-colors z-10"
                title="Cerrar"
              >
                <X size={18} />
              </button>

              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-100/40 to-transparent rounded-bl-full pointer-events-none -z-10" />
              
              <div className="flex items-center gap-3 mb-5 pr-8">
                <div className="w-11 h-11 rounded-[18px] bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center text-amber-500 border border-amber-100/50 shadow-sm shrink-0">
                  <PartyPopper size={22} className="text-amber-500" />
                </div>
                <div>
                  <h3 className="font-extrabold text-gray-800 leading-tight text-base">{t.eventsTitle || 'Reservas para eventos'}</h3>
                  <p className="text-[12px] font-medium text-gray-500 leading-snug pr-2 mt-0.5">{t.eventsSubtitle || 'Haga su encargo especial para celebraciones en la fecha indicada'}</p>
                </div>
              </div>

              <form onSubmit={submitEventOrder} className="space-y-3.5 relative z-10">
                <div className="flex justify-between items-center mb-1">
                   <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Mis Datos</span>
                   <button type="button" onClick={() => setShowCustomerModal(true)} className="text-xs text-amber-500 font-bold hover:text-amber-600 hover:underline">Editar info</button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <User size={16} />
                  </div>
                  <input
                    required
                    type="text"
                    placeholder={t.eventName || 'Nombre y Apellidos'}
                    value={customerName || ""}
                    readOnly
                    className="w-full pl-10 pr-4 py-3.5 bg-gray-100 border border-gray-200/80 rounded-xl text-sm outline-none transition-all font-semibold placeholder-gray-400 text-gray-400 cursor-default"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <MapPinHouse size={16} />
                  </div>
                  <input
                    required
                    type="text"
                    placeholder={t.eventAddress || 'Dirección particular'}
                    value={customerAddress || ""}
                    readOnly
                    className="w-full pl-10 pr-4 py-3.5 bg-gray-100 border border-gray-200/80 rounded-xl text-sm outline-none transition-all font-semibold placeholder-gray-400 text-gray-400 cursor-default"
                  />
                </div>

                <div className="flex gap-2.5">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <CalendarDays size={16} />
                    </div>
                    <input
                      required
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-3.5 bg-gray-50/80 border border-gray-200/80 rounded-xl text-sm outline-none focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/10 transition-all font-semibold text-gray-600 uppercase"
                    />
                  </div>
                  <div className="relative flex-[0.7]">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Clock size={16} />
                    </div>
                    <input
                      required
                      type="time"
                      value={eventTime}
                      onChange={(e) => setEventTime(e.target.value)}
                      className="w-full pl-10 pr-2 py-3.5 bg-gray-50/80 border border-gray-200/80 rounded-xl text-sm outline-none focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/10 transition-all font-semibold text-gray-600"
                    />
                  </div>
                </div>
                
                <div className="flex gap-2.5">
                  <div className="relative flex-[0.8] sm:flex-[0.9]">
                    <input
                      required
                      type="number"
                      min="1"
                      placeholder={t.eventQty || 'Cantidad'}
                      value={eventQty}
                      onChange={(e) => setEventQty(e.target.value)}
                      className="w-full px-3 py-3.5 bg-gray-50/80 border border-gray-200/80 rounded-xl text-sm outline-none focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/10 transition-all font-bold text-center placeholder-gray-400 text-gray-800"
                    />
                  </div>
                  <div className="flex-1 bg-gray-50/80 border border-gray-200/80 rounded-xl p-[5px] flex relative shadow-inner">
                    <div
                      className="absolute top-[5px] bottom-[5px] bg-white rounded-[9px] shadow-[0_2px_6px_rgba(0,0,0,0.06)] border border-gray-100/50 pointer-events-none"
                      style={{ width: 'calc(50% - 5px)', left: eventType === 'cups' ? '5px' : 'calc(50%)', transition: 'left 0.25s cubic-bezier(0.16, 1, 0.3, 1)' }}
                    />
                    <button
                      type="button"
                      onClick={() => setEventType('cups')}
                      className={`flex-1 relative z-10 text-[11px] font-extrabold tracking-wide rounded-lg transition-colors ${eventType === 'cups' ? 'text-amber-600 drop-shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      VASOS
                    </button>
                    <button
                      type="button"
                      onClick={() => setEventType('tubs')}
                      className={`flex-1 relative z-10 text-[11px] font-extrabold tracking-wide rounded-lg transition-colors ${eventType === 'tubs' ? 'text-amber-600 drop-shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      TINAS
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50/80 border border-gray-200/80 rounded-xl p-3.5 space-y-2 max-h-[160px] overflow-y-auto">
                  <p className="text-[13px] font-semibold text-gray-700 mb-2">Seleccione los sabores:</p>
                  {availableFlavors.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2">
                      {availableFlavors.map(flavor => (
                        <label key={flavor} className="flex items-center gap-2 cursor-pointer group">
                          <div className="relative flex items-center justify-center">
                            <input 
                              type="checkbox" 
                              name="flavor"
                              value={flavor}
                              checked={eventFlavors.includes(flavor)}
                              onChange={(e) => {
                                if (e.target.checked) setEventFlavors([...eventFlavors, flavor]);
                                else setEventFlavors(eventFlavors.filter(f => f !== flavor));
                              }}
                              className="w-4 h-4 rounded appearance-none border-2 border-gray-300 checked:bg-amber-500 checked:border-amber-500 transition-colors" 
                            />
                            <CheckCircle2 size={12} className={`absolute text-white pointer-events-none transition-opacity ${eventFlavors.includes(flavor) ? 'opacity-100' : 'opacity-0'}`} />
                          </div>
                          <span className="text-[13px] text-gray-600 font-medium group-hover:text-gray-800 transition-colors">{flavor}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm font-medium text-gray-500">No hay sabores disponibles para reservar.</p>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={eventStatus === 'loading' || eventStatus === 'success' || availableFlavors.length === 0}
                  className={`w-full mt-3 text-white font-bold text-[15px] py-4 rounded-xl shadow-[0_8px_20px_-6px_rgba(245,158,11,0.4)] transform transition-all outline-none focus:ring-4 flex items-center justify-center gap-2.5 group/btn ${
                    eventStatus === 'error'
                      ? 'bg-red-500 hover:bg-red-600 focus:ring-red-500/20 shadow-red-500/40'
                      : eventStatus === 'success'
                        ? 'bg-emerald-500 shadow-emerald-500/40'
                        : availableFlavors.length === 0
                          ? 'bg-gray-400 cursor-not-allowed opacity-70 shadow-none'
                          : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:shadow-[0_12px_24px_-6px_rgba(245,158,11,0.5)] hover:-translate-y-0.5 focus:ring-amber-500/20 active:scale-[0.98]'
                  }`}
                >
                  {eventStatus === 'loading' ? (
                    <>
                      <Loader2 size={18} className="text-white animate-spin" />
                      <span className="drop-shadow-sm">Procesando reserva...</span>
                    </>
                  ) : eventStatus === 'error' ? (
                    <>
                      <AlertCircle size={18} className="text-white" />
                      <span className="drop-shadow-sm">Por favor selecciona un sabor</span>
                    </>
                  ) : eventStatus === 'success' ? (
                    <>
                      <CheckCircle2 size={18} className="text-white" />
                      <span className="drop-shadow-sm">{t.eventSuccess || 'Enviando...'}</span>
                    </>
                  ) : (
                    <>
                      <span className="drop-shadow-sm">{t.eventBtn || 'Reservar vía WhatsApp'}</span>
                      <Send size={16} className="text-white/90 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Customer Modal for First-time Visitors */}
      <AnimatePresence>
        {showCustomerModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-[32px] shadow-2xl p-7 w-full max-w-[360px] relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-amber-400 to-orange-500 opacity-20 pointer-events-none"></div>

              <div className="text-center mt-2 mb-6">
                <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 shadow-lg shadow-amber-500/30 overflow-hidden">
                  <img src="/logo.png" alt="Helados Caram Logo" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-black text-gray-800 tracking-tight mb-1" style={{ fontFamily: 'var(--font-cursive)' }}>¡Bienvenido a Helados Caram!</h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed px-2">Complete sus datos para agilizar sus pedidos.</p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (customerName) localStorage.setItem('customer_name', customerName);
                  if (customerAddress) localStorage.setItem('customer_address', customerAddress);
                  localStorage.setItem('visited_before', 'true');
                  setShowCustomerModal(false);
                }}
                className="space-y-4"
              >
                <div className="space-y-3.5">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <User size={16} />
                    </div>
                    <input
                      required
                      type="text"
                      placeholder="Nombre y Apellidos"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3.5 bg-gray-50/80 border border-gray-200/80 rounded-xl text-sm outline-none focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/10 transition-all font-semibold text-gray-700 placeholder-gray-400"
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <MapPinHouse size={16} />
                    </div>
                    <input
                      required
                      type="text"
                      placeholder="Dirección particular"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full pl-10 pr-4 py-3.5 bg-gray-50/80 border border-gray-200/80 rounded-xl text-sm outline-none focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/10 transition-all font-semibold text-gray-700 placeholder-gray-400"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-bold text-[15px] py-4 rounded-xl shadow-[0_8px_20px_-6px_rgba(31,41,55,0.4)] hover:shadow-[0_12px_24px_-6px_rgba(31,41,55,0.5)] transform hover:-translate-y-0.5 transition-all outline-none focus:ring-4 focus:ring-gray-900/20 active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <span className="drop-shadow-sm">Guardar mis datos</span>
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
