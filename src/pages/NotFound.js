import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import * as THREE from "three";

export default function NotFound() {
  const canvasWrapRef = useRef(null);
  const titleRef = useRef(null);
  const copyRef = useRef(null);
  const actionRef = useRef(null);

  useEffect(() => {
    const container = canvasWrapRef.current;
    if (!container) {
      return undefined;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const brandCanvas = document.createElement("canvas");
    brandCanvas.width = 1024;
    brandCanvas.height = 512;
    const brandContext = brandCanvas.getContext("2d");
    brandContext.clearRect(0, 0, brandCanvas.width, brandCanvas.height);
    brandContext.font = "900 330px Inter, Arial, sans-serif";
    brandContext.textAlign = "center";
    brandContext.textBaseline = "middle";
    brandContext.fillStyle = "rgba(255, 255, 255, 0.72)";
    brandContext.fillText("AS", brandCanvas.width / 2, brandCanvas.height / 2 + 10);

    const brandTexture = new THREE.CanvasTexture(brandCanvas);
    const brandGeometry = new THREE.PlaneGeometry(7.2, 3.6);
    const brandMaterial = new THREE.MeshBasicMaterial({
      map: brandTexture,
      transparent: true,
      opacity: 0.16,
      depthWrite: false,
    });
    const brand = new THREE.Mesh(brandGeometry, brandMaterial);
    brand.position.set(1.15, 0.1, -1.5);
    scene.add(brand);

    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 420;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i += 1) {
      const radius = 2.6 + Math.random() * 2.6;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 4.2;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xa1a1aa,
      size: 0.025,
      transparent: true,
      opacity: 0.72,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    const keyLight = new THREE.PointLight(0xffffff, 4.8, 18);
    keyLight.position.set(2.5, 3, 4);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x8bd3ff, 2.2, 16);
    rimLight.position.set(-3.5, -1.5, -2);
    scene.add(rimLight);

    const handleResize = () => {
      const { clientWidth, clientHeight } = container;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const drift = gsap.to(particles.rotation, {
      y: Math.PI * 2,
      duration: 36,
      repeat: -1,
      ease: "none",
    });

    const brandFloat = gsap.to(brand.position, {
      y: 0.28,
      duration: 4.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
    intro
      .fromTo(brandMaterial, { opacity: 0 }, { opacity: 0.16, duration: 1.1 })
      .fromTo(
        [titleRef.current, copyRef.current, actionRef.current],
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.12 },
        "-=0.65"
      );

    let animationFrame = 0;
    const render = () => {
      particles.rotation.x += 0.0008;
      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
      drift.kill();
      brandFloat.kill();
      intro.kill();
      brandTexture.dispose();
      brandGeometry.dispose();
      brandMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div ref={canvasWrapRef} className="absolute inset-0" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.13),rgba(0,0,0,0)_34%),linear-gradient(180deg,rgba(0,0,0,0.2),#000000_88%)]" />
      <div className="absolute inset-0 bg-grid opacity-80" />

      <section className="relative z-10 flex min-h-screen items-center px-8 py-24 md:px-16">
        <div className="max-w-screen-2xl mx-auto w-full">
          <div className="max-w-3xl">
            <p className="mb-6 font-mono text-xs font-medium tracking-[0.3em] text-[#A1A1AA]">
              ERROR 404
            </p>
            <h1
              ref={titleRef}
              className="text-7xl font-black leading-none tracking-normal text-white md:text-9xl lg:text-[10rem]"
            >
              LOST
            </h1>
            <p
              ref={copyRef}
              className="mt-8 max-w-xl font-mono text-sm leading-7 tracking-normal text-[#A1A1AA] md:text-base"
            >
              This page slipped out of orbit. Head back home and pick up the trail from the portfolio.
            </p>
            <div ref={actionRef} className="mt-10">
              <Link
                to="/"
                className="inline-flex items-center border border-white/20 px-8 py-4 font-mono text-xs font-medium tracking-[0.2em] text-white transition-all hover:bg-white hover:text-black"
              >
                BACK HOME
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}