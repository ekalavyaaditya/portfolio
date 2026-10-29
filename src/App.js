import { useCallback, useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { matchPath, Navigate, Route, Routes, useLocation } from "react-router-dom";
import config from "./config";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import LoadingPage from "./pages/LoadingPage";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const location = useLocation();
  const isHomeRoute =
    Boolean(matchPath({ path: config.homePath, end: true }, location.pathname)) ||
    Boolean(config.basePath && matchPath({ path: "/", end: true }, location.pathname));

  const [isLoading, setIsLoading] = useState(isHomeRoute);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading || !isHomeRoute) {
      return undefined;
    }

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis = null;
    let unsubscribeScroll = null;
    let updateLenis = null;

    const cleanupLenis = () => {
      if (updateLenis) {
        gsap.ticker.remove(updateLenis);
        gsap.ticker.lagSmoothing(500, 33);
        updateLenis = null;
      }
      if (unsubscribeScroll) {
        unsubscribeScroll();
        unsubscribeScroll = null;
      }
      if (lenis) {
        lenis.destroy();
        lenis = null;
      }
    };

    const syncLenisPreference = () => {
      cleanupLenis();

      if (reducedMotionQuery.matches) {
        return;
      }

      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      unsubscribeScroll = lenis.on("scroll", ScrollTrigger.update);
      updateLenis = (time) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(updateLenis);
      gsap.ticker.lagSmoothing(0);
    };

    syncLenisPreference();
    reducedMotionQuery.addEventListener("change", syncLenisPreference);

    return () => {
      reducedMotionQuery.removeEventListener("change", syncLenisPreference);
      cleanupLenis();
    };
  }, [isLoading, isHomeRoute]);

  return (
    <Routes>
      {config.basePath && (
        <Route path="/" element={<Navigate to={config.homePath} replace />} />
      )}
      <Route
        path={config.homePath}
        element={
          isLoading ? (
            <LoadingPage onComplete={handleLoadingComplete} />
          ) : (
            <Home />
          )
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
