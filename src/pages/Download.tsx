import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode"; // eslint-disable-line
import { ArrowLeft, ArrowRight, CheckCircle, Smartphone } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

const DOWNLOAD_URL = "https://bpesa.net/download";
const AGENT_DOWNLOAD_URL = "https://bpesa.net/download?app=agent";

type Platform = "android" | "ios" | "huawei" | "desktop";

function detectPlatform(): Platform {
  if (typeof window === "undefined") return "desktop";
  const ua = navigator.userAgent;
  if (/HMSCore|HUAWEI|HONOR/i.test(ua)) return "huawei";
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  if (/Android/i.test(ua)) return "android";
  return "desktop";
}

const userStores = [
  {
    id: "android" as Platform,
    name: "Google Play",
    label: "Get it on",
    subtitle: "Android",
    url: "https://play.google.com/store/apps/details?id=com.devligence.bpesa",
    available: true,
  },
  {
    id: "ios" as Platform,
    name: "App Store",
    label: "Download on the",
    subtitle: "iPhone & iPad",
    url: "" as string,
    available: false,
  },
  {
    id: "huawei" as Platform,
    name: "AppGallery",
    label: "Explore it on",
    subtitle: "Huawei devices",
    url: "" as string,
    available: false,
  },
];

const agentStores = [
  {
    id: "android" as Platform,
    name: "Google Play",
    label: "Get it on",
    subtitle: "Android",
    url: "https://play.google.com/store/apps/details?id=com.devligence.bpesa.agent",
    available: true,
  },
  {
    id: "ios" as Platform,
    name: "App Store",
    label: "Download on the",
    subtitle: "iPhone & iPad",
    url: "" as string,
    available: false,
  },
  {
    id: "huawei" as Platform,
    name: "AppGallery",
    label: "Explore it on",
    subtitle: "Huawei devices",
    url: "" as string,
    available: false,
  },
];

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white flex-shrink-0">
    <path d="M3 22V2l18 10L3 22z" />
  </svg>
);

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white flex-shrink-0">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

const HuaweiIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white flex-shrink-0">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
  </svg>
);

const StoreIcon = ({ id }: { id: Platform }) => {
  if (id === "ios") return <AppleIcon />;
  if (id === "huawei") return <HuaweiIcon />;
  return <PlayIcon />;
};

type Store = (typeof userStores)[0];

const StoreBadge = ({ store, highlighted }: { store: Store; highlighted: boolean }) => {
  if (!store.available) {
    return (
      <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl border-2 bg-white/5 border-white/10 opacity-50 cursor-not-allowed select-none w-full sm:w-56">
        <Smartphone className="w-6 h-6 text-slate-500 flex-shrink-0" />
        <div className="text-left min-w-0">
          <p className="text-[10px] text-slate-500 leading-none">{store.label}</p>
          <p className="text-sm font-bold text-slate-400 leading-tight">{store.name}</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Coming soon</p>
        </div>
      </div>
    );
  }

  return (
    <a
      href={store.url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full sm:w-56"
    >
      <div
        className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl border-2 transition-all hover:scale-105 ${
          highlighted
            ? "bg-primary border-primary shadow-lg shadow-primary/30"
            : "bg-slate-800 border-slate-700 hover:border-primary/60"
        }`}
      >
        <StoreIcon id={store.id} />
        <div className="text-left min-w-0">
          <p className="text-[10px] text-slate-300 leading-none">{store.label}</p>
          <p className="text-sm font-bold text-white leading-tight">{store.name}</p>
          <p className="text-[10px] text-slate-400 mt-0.5">{store.subtitle}</p>
        </div>
        {highlighted && (
          <CheckCircle className="w-4 h-4 text-white ml-auto flex-shrink-0" />
        )}
      </div>
    </a>
  );
};

const Download = () => {
  const [searchParams] = useSearchParams();
  const isAgent = searchParams.get("app") === "agent";
  const stores = isAgent ? agentStores : userStores;
  const qrUrl = isAgent ? AGENT_DOWNLOAD_URL : DOWNLOAD_URL;

  const [platform, setPlatform] = useState<Platform>("desktop");
  const isDesktop = platform === "desktop";
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  useEffect(() => {
    if (!isDesktop || !canvasRef.current) return;
    QRCode.toCanvas(canvasRef.current, qrUrl, {
      width: 180,
      margin: 1,
      color: { dark: "#0f172a", light: "#ffffff" },
    });
  }, [isDesktop, qrUrl]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4 py-16 text-white">
      <div className="w-full max-w-lg">
        {/* Back */}
        <div className="mb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">B</span>
          </div>
          <span className="text-2xl font-bold">pesa</span>
          {isAgent && (
            <span className="ml-1 text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full px-2.5 py-0.5">
              Agent
            </span>
          )}
        </div>

        <h1 className="text-4xl font-bold mb-3">
          {isAgent ? "Get the Agent App" : "Download Bpesa"}
        </h1>
        <p className="text-slate-400 text-lg mb-10">
          {isDesktop
            ? "Scan the QR code with your phone, or choose your platform below."
            : "Choose your platform to get started."}
        </p>

        {/* QR code — desktop only */}
        {isDesktop && (
          <div className="flex justify-center mb-10">
            <div className="bg-white rounded-3xl p-5 shadow-2xl shadow-primary/10">
              <canvas ref={canvasRef} style={{ display: "block", borderRadius: "8px" }} />
            </div>
          </div>
        )}

        {/* Store badges */}
        <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
          {stores.map((store) => (
            <StoreBadge
              key={store.id}
              store={store}
              highlighted={!isDesktop && store.id === platform}
            />
          ))}
        </div>

        {/* Switch between user / agent */}
        <div className="mt-8 pt-6 border-t border-white/8 text-center">
          {isAgent ? (
            <p className="text-slate-500 text-sm">
              Looking for the user app?{" "}
              <Link to="/download" className="text-primary hover:underline">
                Download Bpesa
              </Link>
            </p>
          ) : (
            <p className="text-slate-500 text-sm">
              Are you an agent?{" "}
              <Link to="/download?app=agent" className="text-emerald-400 hover:underline">
                Download the Agent App <ArrowRight className="w-3 h-3 inline" />
              </Link>
            </p>
          )}
        </div>

        {/* Trust strip */}
        <div className="mt-6 flex flex-wrap justify-center gap-5 text-sm text-slate-600">
          {["Free to download", "Non-custodial", "Available in Kenya"].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <span className="w-1 h-1 bg-slate-600 rounded-full" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Download;
