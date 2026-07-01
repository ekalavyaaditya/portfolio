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

    const rainGeometry = new THREE.BufferGeometry();
    const rainCount = 720;
    const rainPositions = new Float32Array(rainCount * 6);
    const rainVelocity = new Float32Array(rainCount);
    const rainDepthDrift = new Float32Array(rainCount);

    for (let i = 0; i < rainCount; i += 1) {
      const x = (Math.random() - 0.5) * 12;
      const y = (Math.random() - 0.5) * 8;
      const z = (Math.random() - 0.5) * 5;
      const length = 0.18 + Math.random() * 0.28;
      const slant = 0.04 + Math.random() * 0.08;
      const index = i * 6;

      rainPositions[index] = x;
      rainPositions[index + 1] = y;
      rainPositions[index + 2] = z;
      rainPositions[index + 3] = x + slant;
      rainPositions[index + 4] = y - length;
      rainPositions[index + 5] = z;

      rainVelocity[i] = 0.035 + Math.random() * 0.045;
      rainDepthDrift[i] = 0.001 + Math.random() * 0.003;
    }

    rainGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(rainPositions, 3)
    );

    const rainMaterial = new THREE.LineBasicMaterial({
      color: 0xcbd5e1,
      transparent: true,
      opacity: 0.38,
      blending: THREE.AdditiveBlending,
    });
    const rain = new THREE.LineSegments(rainGeometry, rainMaterial);
    rain.rotation.z = -0.08;
    scene.add(rain);

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

    const rainSway = gsap.to(rain.rotation, {
      z: -0.14,
      duration: 3.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
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
      const positions = rainGeometry.attributes.position.array;

      for (let i = 0; i < rainCount; i += 1) {
        const index = i * 6;
        const speed = rainVelocity[i];
        const driftSpeed = rainDepthDrift[i];

        positions[index] += driftSpeed;
        positions[index + 1] -= speed;
        positions[index + 3] += driftSpeed;
        positions[index + 4] -= speed;

        if (positions[index + 1] < -4.5) {
          const x = (Math.random() - 0.5) * 12;
          const y = 4.3 + Math.random() * 1.8;
          const z = (Math.random() - 0.5) * 5;
          const length = 0.18 + Math.random() * 0.28;
          const slant = 0.04 + Math.random() * 0.08;

          positions[index] = x;
          positions[index + 1] = y;
          positions[index + 2] = z;
          positions[index + 3] = x + slant;
          positions[index + 4] = y - length;
          positions[index + 5] = z;
        }
      }

      rainGeometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
      rainSway.kill();
      brandFloat.kill();
      intro.kill();
      brandTexture.dispose();
      brandGeometry.dispose();
      brandMaterial.dispose();
      rainGeometry.dispose();
      rainMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div ref={canvasWrapRef} className="absolute inset-0" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.13),rgba(0,0,0,0)_34%),linear-gradient(180deg,rgba(10,10,12,0.18),#000000_88%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.08)_0,rgba(255,255,255,0)_18%,rgba(255,255,255,0)_100%)] opacity-50" />
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
