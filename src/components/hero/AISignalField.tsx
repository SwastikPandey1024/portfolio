import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface AISignalFieldProps {
  className?: string;
}

export const AISignalField: React.FC<AISignalFieldProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);

  // Detect mobile screen size to optimize node complexity
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // If mobile or WebGL not supported, fallback to lightweight SVG
    if (isMobile || !containerRef.current) return;

    const container = containerRef.current;
    let width = container.clientWidth || 400;
    let height = container.clientHeight || 400;

    let scene: THREE.Scene | null = new THREE.Scene();
    let camera: THREE.PerspectiveCamera | null = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 18;

    let renderer: THREE.WebGLRenderer | null = null;

    // Check WebGL capability
    const testCanvas = document.createElement('canvas');
    const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
    if (!gl) {
      setWebGLSupported(false);
      return;
    }

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'low-power',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
    } catch {
      setWebGLSupported(false);
      return;
    }

    // Nodes (Data Points)
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    const nodeCount = isTablet ? 18 : 32;
    const nodePositions: THREE.Vector3[] = [];

    const nodeGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(nodeCount * 3);
    const colors = new Float32Array(nodeCount * 3);

    const colorCyan = new THREE.Color('#38BDF8');
    const colorIndigo = new THREE.Color('#4F46E5');
    const colorSlate = new THREE.Color('#94A3B8');

    for (let i = 0; i < nodeCount; i++) {
      const radius = 2.5 + Math.random() * 6.5;
      const angle = (i / nodeCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * (radius * 0.85);
      const z = (Math.random() - 0.5) * 4;

      const vec = new THREE.Vector3(x, y, z);
      nodePositions.push(vec);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Assign subtle semantic accent or muted color
      const mix = Math.random();
      const nodeColor = mix > 0.65 ? colorCyan : mix > 0.35 ? colorIndigo : colorSlate;
      colors[i * 3] = nodeColor.r;
      colors[i * 3 + 1] = nodeColor.g;
      colors[i * 3 + 2] = nodeColor.b;
    }

    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    nodeGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const nodeMaterial = new THREE.PointsMaterial({
      size: 0.28,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const pointCloud = new THREE.Points(nodeGeometry, nodeMaterial);
    scene.add(pointCloud);

    // Connections (Sparse Lines between proximate nodes)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color('#38BDF8'),
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
    });

    const linePositions: number[] = [];
    const maxConnectionDistance = 4.2;

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const p1 = nodePositions[i];
        const p2 = nodePositions[j];
        if (p1 && p2 && p1.distanceTo(p2) < maxConnectionDistance) {
          linePositions.push(p1.x, p1.y, p1.z);
          linePositions.push(p2.x, p2.y, p2.z);
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    // Concentric Orbit Guide Rings (Very faint technical geometry)
    const ringGeometry = new THREE.RingGeometry(5.5, 5.52, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#1E293B'),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    scene.add(ringMesh);

    // Mouse Interaction
    let targetRotationX = 0;
    let targetRotationY = 0;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotationY = x * 0.12;
      targetRotationX = -y * 0.12;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Render loop
    let clock = new THREE.Clock();

    const animate = () => {
      if (!scene || !camera || !renderer) return;

      if (!prefersReducedMotion) {
        const elapsedTime = clock.getElapsedTime();
        // Slow ambient rotation
        pointCloud.rotation.y = elapsedTime * 0.04;
        pointCloud.rotation.x = Math.sin(elapsedTime * 0.03) * 0.05;

        lineMesh.rotation.y = elapsedTime * 0.04;
        lineMesh.rotation.x = Math.sin(elapsedTime * 0.03) * 0.05;

        ringMesh.rotation.z = elapsedTime * 0.02;

        // Smooth mouse damping
        camera.position.x += (targetRotationY * 3 - camera.position.x) * 0.05;
        camera.position.y += (targetRotationX * 3 - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(animate);
      } else {
        // Static frame for reduced motion
        renderer.render(scene, camera);
      }
    };

    // Initial render
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      nodeGeometry.dispose();
      nodeMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      renderer?.dispose();

      scene = null;
      camera = null;
      renderer = null;
    };
  }, [isMobile, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full pointer-events-none ${className || ''}`}
      aria-hidden="true"
    >
      {/* Lightweight SVG/CSS Fallback for Mobile or when WebGL is unavailable */}
      {(isMobile || !webGLSupported) && (
        <svg
          className="w-full h-full opacity-35"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="200" cy="200" r="160" stroke="#1E293B" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="200" cy="200" r="100" stroke="#1E293B" strokeWidth="1" />
          <line x1="80" y1="120" x2="200" y2="80" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.4" />
          <line x1="200" y1="80" x2="310" y2="150" stroke="#4F46E5" strokeWidth="1" strokeOpacity="0.4" />
          <line x1="310" y1="150" x2="260" y2="280" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.4" />
          <line x1="260" y1="280" x2="110" y2="270" stroke="#4F46E5" strokeWidth="1" strokeOpacity="0.4" />
          <line x1="110" y1="270" x2="80" y2="120" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.4" />

          {/* Sparse Nodes */}
          <circle cx="80" cy="120" r="3.5" fill="#38BDF8" />
          <circle cx="200" cy="80" r="4" fill="#4F46E5" />
          <circle cx="310" cy="150" r="3" fill="#38BDF8" />
          <circle cx="260" cy="280" r="3.5" fill="#4F46E5" />
          <circle cx="110" cy="270" r="4" fill="#94A3B8" />
        </svg>
      )}
    </div>
  );
};
