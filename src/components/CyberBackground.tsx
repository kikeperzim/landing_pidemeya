import { useEffect, useRef } from "react";

type Beam = {
  x: number;
  width: number;
  alpha: number;
  speed: number;
  sway: number;
  phase: number;
  blur: number;
  topPower: number;
  bottomPower: number;
  bodyPower: number;
  reach: number;
  coreWidth: number;
};

export default function CyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let time = 0;
    let beams: Beam[] = [];

    const rand = (min: number, max: number) => Math.random() * (max - min) + min;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      createBeams();
    };

    const createBeams = () => {
      beams = [];

      const groupCount = Math.max(22, Math.floor(width / 78));
      const spacing = width / groupCount;

      for (let g = 0; g < groupCount; g++) {
        const center = g * spacing + rand(-14, 14);
        const linesInGroup = Math.floor(rand(2, 6));

        for (let i = 0; i < linesInGroup; i++) {
          const strong = Math.random() > 0.42;
          const x = center + rand(-18, 18);

          beams.push({
            x,
            width: strong ? rand(2.2, 7.5) : rand(0.7, 2.1),
            alpha: strong ? rand(0.55, 1) : rand(0.14, 0.45),
            speed: rand(0.08, 0.22),
            sway: rand(1, 6),
            phase: rand(0, Math.PI * 2),
            blur: strong ? rand(14, 34) : rand(4, 12),
            topPower: rand(0.9, 1.55),
            bottomPower: rand(0.75, 1.35),
            bodyPower: rand(0.7, 1.1),
            reach: strong ? rand(0.88, 1.08) : rand(0.75, 1.02),
            coreWidth: strong ? rand(0.16, 0.34) : rand(0.06, 0.14),
          });

          if (Math.random() > 0.58) {
            beams.push({
              x: x + rand(-4, 4),
              width: rand(0.45, 1.1),
              alpha: rand(0.08, 0.25),
              speed: rand(0.05, 0.14),
              sway: rand(0.5, 3),
              phase: rand(0, Math.PI * 2),
              blur: rand(2, 7),
              topPower: rand(0.5, 0.9),
              bottomPower: rand(0.45, 0.85),
              bodyPower: rand(0.5, 0.8),
              reach: rand(0.9, 1.08),
              coreWidth: rand(0.03, 0.08),
            });
          }
        }
      }

      for (let i = 0; i < Math.floor(width / 130); i++) {
        beams.push({
          x: rand(0, width),
          width: rand(0.4, 0.9),
          alpha: rand(0.03, 0.1),
          speed: rand(0.03, 0.08),
          sway: rand(0.2, 1.4),
          phase: rand(0, Math.PI * 2),
          blur: rand(1, 4),
          topPower: rand(0.2, 0.45),
          bottomPower: rand(0.2, 0.45),
          bodyPower: rand(0.2, 0.4),
          reach: rand(0.95, 1.08),
          coreWidth: rand(0.015, 0.04),
        });
      }

      beams.sort((a, b) => a.width - b.width);
    };

    const drawBackground = () => {
      ctx.clearRect(0, 0, width, height);

      const bg = ctx.createLinearGradient(0, 0, 0, height);
      bg.addColorStop(0, "#1a0800"); 
      bg.addColorStop(0.08, "#0d0400");
      bg.addColorStop(0.24, "#050100");
      bg.addColorStop(0.48, "#010101");
      bg.addColorStop(0.62, "#050100");
      bg.addColorStop(0.84, "#0d0400");
      bg.addColorStop(1, "#1a0800");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      const topAmbient = ctx.createLinearGradient(0, 0, 0, height * 0.26);
      topAmbient.addColorStop(0, "rgba(251,101,10,0.18)");
      topAmbient.addColorStop(0.3, "rgba(251,101,10,0.06)");
      topAmbient.addColorStop(1, "rgba(251,101,10,0)");
      ctx.fillStyle = topAmbient;
      ctx.fillRect(0, 0, width, height * 0.28);

      const bottomAmbient = ctx.createLinearGradient(0, height, 0, height * 0.72);
      bottomAmbient.addColorStop(0, "rgba(251,101,10,0.15)");
      bottomAmbient.addColorStop(0.28, "rgba(251,101,10,0.05)");
      bottomAmbient.addColorStop(1, "rgba(251,101,10,0)");
      ctx.fillStyle = bottomAmbient;
      ctx.fillRect(0, height * 0.7, width, height * 0.3);
    };

    const drawVerticalHaze = () => {
      for (let i = 0; i < width; i += 95) {
        const offset = Math.sin(time * 0.0005 + i * 0.015) * 5; // Faster haze

        const haze = ctx.createLinearGradient(0, 0, 0, height);
        haze.addColorStop(0, "rgba(251,101,10,0.04)");
        haze.addColorStop(0.18, "rgba(251,101,10,0.02)");
        haze.addColorStop(0.45, "rgba(251,101,10,0.01)");
        haze.addColorStop(0.8, "rgba(251,101,10,0.02)");
        haze.addColorStop(1, "rgba(251,101,10,0.04)");

        ctx.fillStyle = haze;
        ctx.fillRect(i + offset, 0, 16, height);
      }
    };

    const drawBeam = (beam: Beam, index: number) => {
      const drift = Math.sin(time * 0.0007 * (1 + beam.speed) + beam.phase) * beam.sway; // Faster drift
      const x = beam.x + drift;
      const pulse = (Math.sin(time * 0.0015 * (1 + beam.speed) + beam.phase * 1.3) + 1) / 2; // Faster pulse
      const beamHeight = height * Math.min(1.1, beam.reach + pulse * 0.04);

      ctx.save();
      ctx.shadowBlur = beam.blur;
      ctx.shadowColor = `rgba(251,101,10,${beam.alpha})`;

      const body = ctx.createLinearGradient(0, 0, 0, height);
      body.addColorStop(0, `rgba(251,101,10,${beam.alpha * beam.topPower})`);
      body.addColorStop(0.06, `rgba(251,101,10,${beam.alpha * 0.85})`);
      body.addColorStop(0.22, `rgba(251,80,10,${beam.alpha * beam.bodyPower * 0.6})`);
      body.addColorStop(0.48, `rgba(251,101,10,${beam.alpha * 0.05})`);
      body.addColorStop(0.75, `rgba(251,60,10,${beam.alpha * 0.15})`);
      body.addColorStop(0.94, `rgba(251,101,10,${beam.alpha * beam.bottomPower})`);
      body.addColorStop(1, `rgba(251,101,10,${beam.alpha * beam.bottomPower * 0.9})`);

      ctx.fillStyle = body;
      ctx.fillRect(x, 0, beam.width, beamHeight);

      const innerWidth = Math.max(0.65, beam.width * beam.coreWidth);
      const innerX = x + beam.width / 2 - innerWidth / 2;

      const core = ctx.createLinearGradient(0, 0, 0, height);
      core.addColorStop(0, `rgba(255,255,255,${Math.min(1, beam.alpha + 0.2)})`);
      core.addColorStop(0.06, `rgba(255,240,230,${beam.alpha * 0.95})`);
      core.addColorStop(0.28, `rgba(255,200,180,${beam.alpha * 0.3})`);
      core.addColorStop(0.74, `rgba(255,200,180,${beam.alpha * 0.12})`);
      core.addColorStop(0.95, `rgba(255,240,230,${beam.alpha * 0.5})`);
      core.addColorStop(1, `rgba(255,255,255,${beam.alpha * 0.8})`);

      ctx.fillStyle = core;
      ctx.fillRect(innerX, 0, innerWidth, beamHeight);

      const topBloomSize = 95 * beam.topPower;
      const topBloom = ctx.createRadialGradient(
        x + beam.width / 2,
        0,
        0,
        x + beam.width / 2,
        0,
        topBloomSize
      );
      topBloom.addColorStop(0, `rgba(251,101,10,0.22)`);
      topBloom.addColorStop(0.45, `rgba(251,101,10,0.08)`);
      topBloom.addColorStop(1, "rgba(251,101,10,0)");
      ctx.fillStyle = topBloom;
      ctx.fillRect(x - topBloomSize / 2, 0, topBloomSize, topBloomSize);

      const bottomBloomSize = 95 * beam.bottomPower;
      const bottomBloom = ctx.createRadialGradient(
        x + beam.width / 2,
        height,
        0,
        x + beam.width / 2,
        height,
        bottomBloomSize
      );
      bottomBloom.addColorStop(0, `rgba(251,101,10,0.2)`);
      bottomBloom.addColorStop(0.44, `rgba(251,101,10,0.07)`);
      bottomBloom.addColorStop(1, "rgba(251,101,10,0)");
      ctx.fillStyle = bottomBloom;
      ctx.fillRect(
        x - bottomBloomSize / 2,
        height - bottomBloomSize,
        bottomBloomSize,
        bottomBloomSize
      );

      if (index % 3 === 0) {
        const flare = 25 + Math.sin(time * 0.002 + beam.phase) * 10;

        const topFlare = ctx.createLinearGradient(0, 0, 0, flare);
        topFlare.addColorStop(0, `rgba(251,101,10,${beam.alpha * 0.15})`);
        topFlare.addColorStop(1, "rgba(251,101,10,0)");
        ctx.fillStyle = topFlare;
        ctx.fillRect(x - 0.5, 0, beam.width + 1, flare);

        const bottomFlare = ctx.createLinearGradient(0, height - flare, 0, height);
        bottomFlare.addColorStop(0, "rgba(251,101,10,0)");
        bottomFlare.addColorStop(1, `rgba(251,101,10,${beam.alpha * 0.15})`);
        ctx.fillStyle = bottomFlare;
        ctx.fillRect(x - 0.5, height - flare, beam.width + 1, flare);
      }

      ctx.restore();
    };

    const drawCenterContrast = () => {
      const contrast = ctx.createLinearGradient(0, 0, 0, height);
      contrast.addColorStop(0, "rgba(0,0,0,0)");
      contrast.addColorStop(0.22, "rgba(0,0,0,0.05)");
      contrast.addColorStop(0.48, "rgba(0,0,0,0.42)"); // Slightly darker center
      contrast.addColorStop(0.58, "rgba(0,0,0,0.38)");
      contrast.addColorStop(0.8, "rgba(0,0,0,0.08)");
      contrast.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = contrast;
      ctx.fillRect(0, 0, width, height);
    };

    const drawNoise = () => {
      const amount = Math.floor((width * height) / 1000);
      ctx.save();
      for (let i = 0; i < amount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const alpha = Math.random() * 0.04; // Slightly more noise for texture
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fillRect(x, y, 1, 1);
      }
      ctx.restore();
    };

    const animate = () => {
      time += 28; // Increased from 16 for faster base speed

      drawBackground();
      drawVerticalHaze();

      for (let i = 0; i < beams.length; i++) {
        drawBeam(beams[i], i);
      }

      drawCenterContrast();
      drawNoise();

      animationId = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none bg-black">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,0,0,0.07),transparent_14%,rgba(0,0,0,0.22)_50%,transparent_82%,rgba(255,0,0,0.07))]" />
      <div className="absolute inset-0 opacity-[0.05] mix-blend-screen bg-[radial-gradient(circle_at_top,rgba(255,70,70,0.35),transparent_28%)]" />
      <div className="absolute inset-0 opacity-[0.05] mix-blend-screen bg-[radial-gradient(circle_at_bottom,rgba(255,60,60,0.3),transparent_24%)]" />
    </div>
  );
}