import { useEffect, useMemo, useState } from "react";

export default function LoadingPage({ onComplete }) {
  const [progress, setProgress] = useState(0);

  const displayProgress = useMemo(() => Math.min(100, Math.round(progress)), [progress]);

  useEffect(() => {
    let animationFrame = 0;
    const startedAt = performance.now();
    const duration = 3200;

    const animate = (time) => {
      const elapsed = time - startedAt;
      const nextProgress = Math.min(100, (elapsed / duration) * 100);
      setProgress(nextProgress);

      if (nextProgress < 100) {
        animationFrame = requestAnimationFrame(animate);
        return;
      }

      window.setTimeout(onComplete, 450);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [onComplete]);

  return (
    <main className="loading-page" aria-label="Loading portfolio">
      <div className="loading-vignette" />
      <section className="loading-content">
        <h1 className="loading-title" aria-live="polite">
          LOADING
        </h1>
        <div className="loading-track" aria-hidden="true">
          <div className="loading-fill" style={{ width: `${displayProgress}%` }} />
          <div className="loading-dot" style={{ left: `${displayProgress}%` }} />
        </div>
        <p className="loading-percent">{displayProgress}%</p>
        <p className="loading-wait">
          <span />
          PLEASE WAIT
          <span />
        </p>
      </section>
    </main>
  );
}
