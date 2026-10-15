"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import earcutModule from "earcut";
import {
  ExternalLink,
  X,
  Shield,
  Mail,
  Building,
  UserCheck,
  Activity,
  Users,
  Sparkles,
} from "lucide-react";

// Safe reference to earcut
const earcut = (earcutModule as unknown as { default?: typeof earcutModule }).default || earcutModule;

export interface CountryDelegationData {
  id: string;
  name: string;
  capital: string;
  lat: number;
  lng: number;
  flag: string;
  isHeadquarters?: boolean;
  status: string;
  coordinator: {
    name: string;
    title: string;
    committee: string;
    institution: string;
    email: string;
  };
  coordinators?: Array<{
    name: string;
    title: string;
    committee: string;
    institution: string;
    email: string;
  }>;
  delegatesCount: number;
  workingGroupsCount: number;
  priorityTopic: string;
}

const REGIONAL_DELEGATIONS: CountryDelegationData[] = [
  {
    id: "CR",
    name: "Costa Rica",
    capital: "San José",
    lat: 9.9281,
    lng: -84.0907,
    flag: "🇨🇷",
    isHeadquarters: true,
    status: "Sede Central Fundacional",
    coordinator: {
      name: "Dr. José Eduardo Carvajal Obando",
      title: "Presidente de la Junta Directiva (2026-2028)",
      committee: "Presidencia Fundacional & Dirección Regional",
      institution: "Consejo Regional ARCCPCE • San José",
      email: "presidencia@arccpce.org",
    },
    coordinators: [
      {
        name: "Dr. José Eduardo Carvajal Obando",
        title: "Presidente de la Junta Directiva (2026-2028)",
        committee: "Presidencia Fundacional • Convocante & Ponente Inaugural",
        institution: "Consejo Regional ARCCPCE • San José",
        email: "presidencia@arccpce.org",
      },
      {
        name: "Dra. Marlen Calvo Solano",
        title: "Vicepresidenta de la Junta Directiva (2026-2028)",
        committee: "Vicepresidencia • Socia Fundadora • Clausura Oficial",
        institution: "Consejo Regional ARCCPCE • San José",
        email: "vicepresidencia@arccpce.org",
      },
      {
        name: "Dra. Patricia Quesada Steller",
        title: "Secretaria de la Junta Directiva (2026-2028)",
        committee: "Secretaría General • Socia Fundadora",
        institution: "Consejo Regional ARCCPCE • San José",
        email: "secretaria@arccpce.org",
      },
      {
        name: "Dr. Josué Paniagua Sánchez",
        title: "Tesorero de la Junta Directiva (2026-2028)",
        committee: "Tesorería y Finanzas • Socio Fundador",
        institution: "Consejo Regional ARCCPCE • San José",
        email: "tesoreria@arccpce.org",
      },
      {
        name: "Dra. Janet Morales Salazar",
        title: "Fiscal de la Junta Directiva (2026-2028)",
        committee: "Fiscalía Deontológica • Socia Fundadora",
        institution: "Consejo Regional ARCCPCE • San José",
        email: "fiscalia@arccpce.org",
      },
      {
        name: "Dr. Marco Antonio Obando Rodríguez",
        title: "Vocal 1 de la Junta Directiva (2026-2028)",
        committee: "Vocalía I de Gobernanza",
        institution: "Consejo Regional ARCCPCE • San José",
        email: "vocal1@arccpce.org",
      },
      {
        name: "Dr. Fibier Olmos Venegas",
        title: "Vocal 2 de la Junta Directiva (2026-2028)",
        committee: "Vocalía II de Gestión Científica",
        institution: "Consejo Regional ARCCPCE • San José",
        email: "vocal2@arccpce.org",
      },
      {
        name: "Lic. Álvaro Sánchez",
        title: "Socio Fundador",
        committee: "Lectura del Acta de Constitución",
        institution: "Asamblea Constitutiva ARCCPCE",
        email: "costarica@arccpce.org",
      },
      {
        name: "Teresita Mayela García Browne",
        title: "Socia Fundadora",
        committee: "Firmante de Acta Constitutiva",
        institution: "Asamblea Constitutiva ARCCPCE",
        email: "costarica@arccpce.org",
      },
      {
        name: "Patricia Yolanda Robles Yglesias",
        title: "Socia Fundadora",
        committee: "Firmante de Acta Constitutiva",
        institution: "Asamblea Constitutiva ARCCPCE",
        email: "costarica@arccpce.org",
      },
      {
        name: "María del Rocío Monge Quirós",
        title: "Socia Fundadora",
        committee: "Firmante de Acta Constitutiva",
        institution: "Asamblea Constitutiva ARCCPCE",
        email: "costarica@arccpce.org",
      },
      {
        name: "Karla Tatiana Mena Páez",
        title: "Socia Fundadora",
        committee: "Firmante de Acta Constitutiva",
        institution: "Asamblea Constitutiva ARCCPCE",
        email: "costarica@arccpce.org",
      },
      {
        name: "Marlene de los Ángeles Agüero Arce",
        title: "Socia Fundadora",
        committee: "Firmante de Acta Constitutiva",
        institution: "Asamblea Constitutiva ARCCPCE",
        email: "costarica@arccpce.org",
      },
      {
        name: "Alejandra Trejos Chacón",
        title: "Socia Fundadora",
        committee: "Firmante de Acta Constitutiva",
        institution: "Asamblea Constitutiva ARCCPCE",
        email: "costarica@arccpce.org",
      },
      {
        name: "Emérita Angélica Martínez Retana",
        title: "Socia Fundadora",
        committee: "Firmante de Acta Constitutiva",
        institution: "Asamblea Constitutiva ARCCPCE",
        email: "costarica@arccpce.org",
      },
      {
        name: "Carmen María Loaiza Madriz",
        title: "Socia Fundadora",
        committee: "Firmante de Acta Constitutiva",
        institution: "Asamblea Constitutiva ARCCPCE",
        email: "costarica@arccpce.org",
      },
      {
        name: "Fulvia Elizondo Saborío",
        title: "Socia Fundadora",
        committee: "Firmante de Acta Constitutiva",
        institution: "Asamblea Constitutiva ARCCPCE",
        email: "costarica@arccpce.org",
      },
    ],
    delegatesCount: 48,
    workingGroupsCount: 5,
    priorityTopic: "Gobernanza regional y armonización de competencias clínicas",
  },
  {
    id: "GT",
    name: "Guatemala",
    capital: "Ciudad de Guatemala",
    lat: 14.6349,
    lng: -90.5069,
    flag: "🇬🇹",
    status: "Delegación Nacional Oficial",
    coordinator: {
      name: "Dra. Karen Lorena Dubon De Paz & Lic. Leticia De Aguinaga",
      title: "Representación Regional de Guatemala",
      committee: "Comité de Investigación Científica, Docencia y Articulación Gremial",
      institution: "Delegación ARCCPCE Guatemala",
      email: "guatemala@arccpce.org",
    },
    delegatesCount: 34,
    workingGroupsCount: 4,
    priorityTopic: "Investigación traslacional, bioética y atención primaria en comunidades",
  },
  {
    id: "SV",
    name: "El Salvador",
    capital: "San Salvador",
    lat: 13.6929,
    lng: -89.2182,
    flag: "🇸🇻",
    status: "Delegación Nacional Oficial",
    coordinator: {
      name: "Mag. Cruz Barahona",
      title: "Representante Oficial de El Salvador",
      committee: "Comité de Cuidados Críticos, Urgencias y Articulación Gremial",
      institution: "Delegación ARCCPCE El Salvador",
      email: "elsalvador@arccpce.org",
    },
    delegatesCount: 29,
    workingGroupsCount: 3,
    priorityTopic: "Protocolos avanzados de soporte vital y triaje en emergencias",
  },
  {
    id: "HN",
    name: "Honduras",
    capital: "Tegucigalpa",
    lat: 14.0723,
    lng: -87.1921,
    flag: "🇭🇳",
    status: "Comité Nacional de Enlace",
    coordinator: {
      name: "Mag. Orbelia López",
      title: "Representante Oficial de Honduras",
      committee: "Comité de Salud Pública y Gestión Comunitaria",
      institution: "Colegio de Profesionales de Enfermería de Honduras",
      email: "honduras@arccpce.org",
    },
    delegatesCount: 26,
    workingGroupsCount: 3,
    priorityTopic: "Resiliencia comunitaria y vacunación preventiva",
  },
  {
    id: "NI",
    name: "Nicaragua",
    capital: "Managua",
    lat: 12.1149,
    lng: -86.2362,
    flag: "🇳🇮",
    status: "Comité Nacional de Enlace",
    coordinator: {
      name: "Delegación Nicaragua",
      title: "Coordinación Nacional de Enlace Gremial",
      committee: "Comité de Salud Materno-Infantil y Perinatal",
      institution: "Asociaciones Profesionales de Nicaragua",
      email: "nicaragua@arccpce.org",
    },
    delegatesCount: 22,
    workingGroupsCount: 2,
    priorityTopic: "Reducción de mortalidad neonatal y cuidados obstétricos humanizados",
  },
  {
    id: "PA",
    name: "Panamá",
    capital: "Ciudad de Panamá",
    lat: 8.9824,
    lng: -79.5199,
    flag: "🇵🇦",
    status: "Comité Nacional de Enlace",
    coordinator: {
      name: "Delegación Panamá",
      title: "Coordinación Nacional de Enlace Gremial",
      committee: "Comité de Políticas y Farmacovigilancia",
      institution: "Asociación Nacional de Enfermeras de Panamá",
      email: "panama@arccpce.org",
    },
    delegatesCount: 31,
    workingGroupsCount: 4,
    priorityTopic: "Seguridad farmacológica e innovación de políticas sanitarias",
  },
  {
    id: "DO",
    name: "Rep. Dominicana",
    capital: "Santo Domingo",
    lat: 18.4861,
    lng: -69.9312,
    flag: "🇩🇴",
    status: "Nodo Caribe Oficial",
    coordinator: {
      name: "Delegación República Dominicana",
      title: "Coordinación Nodo Caribe",
      committee: "Nodo Caribe de Transformación Digital e Informática en Salud",
      institution: "Colegio Dominicano de Profesionales de Enfermería",
      email: "caribe@arccpce.org",
    },
    delegatesCount: 27,
    workingGroupsCount: 3,
    priorityTopic: "Tele-enfermería, expedientes electrónicos y acreditación regional",
  },
];

const MEMBER_COUNTRY_NAMES = [
  "costa rica",
  "guatemala",
  "el salvador",
  "honduras",
  "nicaragua",
  "panama",
  "dominican rep.",
  "dominican republic",
];

const MEMBER_COUNTRY_IDS = [188, 320, 222, 340, 558, 591, 214];

function isMemberCountry(name: string | undefined, id: string | number | undefined): boolean {
  if (id && MEMBER_COUNTRY_IDS.includes(Number(id))) return true;
  if (!name) return false;
  const lower = name.toLowerCase();
  return MEMBER_COUNTRY_NAMES.some((m) => lower.includes(m));
}

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

export default function RegionalGlobeHero() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedCountry, setSelectedCountry] = useState<CountryDelegationData | null>(null);
  const [isRotating, setIsRotating] = useState(true);

  // Referencias para que las funciones fuera de useEffect controlen Three.js al instante
  const isRotatingRef = useRef(true);
  isRotatingRef.current = isRotating;

  const isInteractingRef = useRef(false);
  const globeRef = useRef<THREE.Group | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animateToCameraPosRef = useRef<(pos: THREE.Vector3) => void>(() => {});

  const GLOBE_RADIUS = 6.4;
  const minDistance = GLOBE_RADIUS * 1.35;
  const maxDistance = GLOBE_RADIUS * 4.5;

  const handleToggleRotate = () => {
    setIsRotating((prev) => !prev);
  };

  const handleZoomIn = () => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    // Reducir la distancia hacia el centro
    const len = camera.position.length();
    const newLen = Math.max(minDistance, len - 2.8);
    camera.position.setLength(newLen);
    controls.update();
  };

  const handleZoomOut = () => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    // Aumentar la distancia desde el centro
    const len = camera.position.length();
    const newLen = Math.min(maxDistance, len + 2.8);
    camera.position.setLength(newLen);
    controls.update();
  };

  const handleResetView = () => {
    const focalDir = latLngToVector3(13.0, -84.0, 1).normalize();
    const targetDist = GLOBE_RADIUS * 2.85;
    const targetPos = focalDir.multiplyScalar(targetDist);

    if (animateToCameraPosRef.current) {
      animateToCameraPosRef.current(targetPos);
    }
    setIsRotating(true);
    setSelectedCountry(null);
  };

  const handleJoinDelegation = useCallback((country: CountryDelegationData) => {
    const affiliationSection = document.getElementById("contacto");
    if (affiliationSection) {
      affiliationSection.scrollIntoView({ behavior: "smooth" });
      const countrySelect = document.getElementById("afiliacion-pais") as HTMLSelectElement | null;
      if (countrySelect) {
        countrySelect.value = country.name;
        countrySelect.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleResetView();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 540;

    // 1. Escena y Cámara
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    cameraRef.current = camera;

    const initialFocalDir = latLngToVector3(13.0, -84.0, 1).normalize();
    const initialDistance = GLOBE_RADIUS * 2.85;
    camera.position.copy(initialFocalDir.clone().multiplyScalar(initialDistance));
    camera.lookAt(0, 0, 0);

    // 2. WebGLRenderer HD y Brillante
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const domElem = renderer.domElement;

    // 3. OrbitControls directo
    const controls = new OrbitControls(camera, domElem);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.minDistance = minDistance;
    controls.maxDistance = maxDistance;
    controls.rotateSpeed = 0.8;
    controls.zoomSpeed = 0.9;
    controls.enablePan = false;

    controls.addEventListener("start", () => {
      isInteractingRef.current = true;
    });
    controls.addEventListener("end", () => {
      isInteractingRef.current = false;
    });

    let targetCameraPosition: THREE.Vector3 | null = null;
    let isTransitioning = false;

    animateToCameraPosRef.current = (pos: THREE.Vector3) => {
      targetCameraPosition = pos.clone();
      isTransitioning = true;
    };

    // 4. Iluminación Radiante, Clara y Límpida (Sin sombras oscuras ni penumbras)
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.4);
    scene.add(ambientLight);

    const mainSun = new THREE.DirectionalLight(0xffffff, 2.5);
    mainSun.position.set(10, 18, 15);
    scene.add(mainSun);

    const fillSun = new THREE.DirectionalLight(0x38bdf8, 1.5);
    fillSun.position.set(-15, -5, -15);
    scene.add(fillSun);

    // 5. Grupo del Globo Terráqueo
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);
    globeRef.current = globeGroup;

    // Esfera Base Oceánica: Azul Marítimo Luminoso (#0284c7 / #0369a1), NUNCA NEGRO NI VERDE OSCURO
    const sphereGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);
    const sphereMat = new THREE.MeshPhongMaterial({
      color: 0x0284c7, // Azul océano vibrante y claro
      emissive: 0x0369a1, // Emisión luminosa azul caribeña
      emissiveIntensity: 0.35,
      specular: 0xffffff,
      shininess: 45,
      transparent: true,
      opacity: 0.93,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(sphereMesh);

    // Rejilla de meridianos y paralelos celestes
    const gridGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.001, 36, 18);
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0xe0f2fe,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const gridMesh = new THREE.Mesh(gridGeo, gridMat);
    globeGroup.add(gridMesh);

    // Halo atmosférico celeste radiante
    const atmosGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.035, 64, 64);
    const atmosMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.18,
      side: THREE.BackSide,
    });
    const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
    globeGroup.add(atmosMesh);

    // 6. Polígonos Continentales en Alta Definición (50m)
    // Países neutros: Azul Marino Institucional (#002b7f) con bordes celestes (#7dd3fc)
    const neutralMat = new THREE.MeshLambertMaterial({
      color: 0x002b7f,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.94,
    });

    // Países miembros de ARCCAPROCE: Esmeralda Brillante (#10b981) con bordes verde menta (#a7f3d0)
    const memberMat = new THREE.MeshLambertMaterial({
      color: 0x10b981,
      emissive: 0x059669,
      emissiveIntensity: 0.75,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.98,
    });

    const neutralBorderMat = new THREE.LineBasicMaterial({
      color: 0x7dd3fc,
      transparent: true,
      opacity: 0.75,
    });

    const memberBorderMat = new THREE.LineBasicMaterial({
      color: 0xa7f3d0,
      transparent: true,
      opacity: 0.95,
    });

    const countryGroup = new THREE.Group();
    globeGroup.add(countryGroup);

    fetch("/data/countries-50m.geojson")
      .then((res) => res.json())
      .then((geojson) => {
        if (!geojson || !geojson.features) return;

        geojson.features.forEach((feature: {
          id?: string | number;
          properties?: { name?: string };
          geometry?: { type: string; coordinates: unknown };
        }) => {
          if (!feature.geometry) return;

          const isMember = isMemberCountry(feature.properties?.name, feature.id);
          const mat = isMember ? memberMat : neutralMat;
          const borderMat = isMember ? memberBorderMat : neutralBorderMat;
          const surfaceR = GLOBE_RADIUS * (isMember ? 1.008 : 1.004);

          const type = feature.geometry.type;
          const coords = feature.geometry.coordinates as number[][][] | number[][][][];

          const polygons: number[][][][] =
            type === "Polygon"
              ? [coords as number[][][]]
              : type === "MultiPolygon"
              ? (coords as number[][][][])
              : [];

          polygons.forEach((polygonCoords) => {
            polygonCoords.forEach((ring) => {
              if (ring.length < 3) return;

              const borderPoints: THREE.Vector3[] = [];
              const flatCoords: number[] = [];

              ring.forEach(([lng, lat]) => {
                const pt = latLngToVector3(lat, lng, surfaceR * 1.001);
                borderPoints.push(pt);
                flatCoords.push(lng, lat);
              });

              const lineGeo = new THREE.BufferGeometry().setFromPoints(borderPoints);
              const line = new THREE.Line(lineGeo, borderMat);
              countryGroup.add(line);

              try {
                const indices = earcut(flatCoords);
                if (indices && indices.length > 0) {
                  const vertices: number[] = [];
                  for (let i = 0; i < indices.length; i++) {
                    const idx = indices[i];
                    const lng = flatCoords[idx * 2];
                    const lat = flatCoords[idx * 2 + 1];
                    const v = latLngToVector3(lat, lng, surfaceR);
                    vertices.push(v.x, v.y, v.z);
                  }

                  const polyGeo = new THREE.BufferGeometry();
                  polyGeo.setAttribute(
                    "position",
                    new THREE.Float32BufferAttribute(vertices, 3)
                  );
                  polyGeo.computeVertexNormals();

                  const polyMesh = new THREE.Mesh(polyGeo, mat);
                  countryGroup.add(polyMesh);
                }
              } catch {
                // Ignore degenerate
              }
            });
          });
        });
      })
      .catch((err) => {
        console.warn("GeoJSON loading issue:", err);
      });

    // 7. Nodos de Capitales y Anillos
    const nodeMeshes: THREE.Mesh[] = [];
    const pulseRings: { mesh: THREE.Mesh; speed: number }[] = [];

    REGIONAL_DELEGATIONS.forEach((country) => {
      const pos = latLngToVector3(country.lat, country.lng, GLOBE_RADIUS * 1.015);

      const pinColor = country.isHeadquarters ? 0xf59e0b : 0x10b981;
      const nodeGeo = new THREE.SphereGeometry(country.isHeadquarters ? 0.13 : 0.10, 16, 16);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: pinColor,
        emissive: pinColor,
        emissiveIntensity: 0.85,
        roughness: 0.2,
        metalness: 0.6,
      });
      const mesh = new THREE.Mesh(nodeGeo, nodeMat);
      mesh.position.copy(pos);
      mesh.userData = { country };
      globeGroup.add(mesh);
      nodeMeshes.push(mesh);

      const ringGeo = new THREE.RingGeometry(0.12, 0.16, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: country.isHeadquarters ? 0xf59e0b : 0x6ee7b7,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos);
      ring.lookAt(new THREE.Vector3(0, 0, 0));
      globeGroup.add(ring);

      pulseRings.push({
        mesh: ring,
        speed: 1.6 + Math.random() * 0.3,
      });
    });

    // 8. Arcos Parabólicos San José -> 6 Capitales
    const hqCountry = REGIONAL_DELEGATIONS.find((n) => n.isHeadquarters) || REGIONAL_DELEGATIONS[0];
    const hqPos = latLngToVector3(hqCountry.lat, hqCountry.lng, GLOBE_RADIUS * 1.015);

    REGIONAL_DELEGATIONS.filter((n) => !n.isHeadquarters).forEach((target) => {
      const targetPos = latLngToVector3(target.lat, target.lng, GLOBE_RADIUS * 1.015);
      const distance = hqPos.distanceTo(targetPos);
      const altitude = distance * 0.25;

      const midPoint = new THREE.Vector3()
        .addVectors(hqPos, targetPos)
        .multiplyScalar(0.5)
        .normalize()
        .multiplyScalar(GLOBE_RADIUS * 1.015 + altitude);

      const curve = new THREE.QuadraticBezierCurve3(hqPos, midPoint, targetPos);
      const points = curve.getPoints(50);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(points);

      const arcMat = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.85,
      });

      const line = new THREE.Line(arcGeo, arcMat);
      globeGroup.add(line);
    });

    // 9. Raycast y Selección
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (event: MouseEvent) => {
      if (event.button !== 0) return;

      const rect = domElem.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes);

      if (intersects.length > 0) {
        const clicked = intersects[0].object.userData.country as CountryDelegationData;
        if (clicked) {
          setSelectedCountry(clicked);
          setIsRotating(false);

          const targetDir = latLngToVector3(clicked.lat, clicked.lng, 1).normalize();
          const zoomDistance = GLOBE_RADIUS * 1.55;
          targetCameraPosition = targetDir.clone().multiplyScalar(zoomDistance);
          isTransitioning = true;
        }
      }
    };

    domElem.addEventListener("pointerdown", handlePointerDown);

    // 10. Bucle de Animación HD
    let animationFrameId: number;
    let clock = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      clock += 0.02;

      if (isTransitioning && targetCameraPosition) {
        camera.position.lerp(targetCameraPosition, 0.07);
        if (camera.position.distanceTo(targetCameraPosition) < 0.06) {
          isTransitioning = false;
          targetCameraPosition = null;
        }
      }

      if (isRotatingRef.current && !isInteractingRef.current && globeRef.current && !isTransitioning) {
        globeRef.current.rotation.y += 0.0015;
      }

      controls.update();

      pulseRings.forEach((pr, index) => {
        const ringTime = (clock * pr.speed + index * 0.4) % 1.5;
        const scale = 1 + ringTime * 0.2;
        pr.mesh.scale.set(scale, scale, 1);
        (pr.mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(
          0,
          0.85 * (1 - ringTime / 1.5)
        );
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      domElem.removeEventListener("pointerdown", handlePointerDown);
      controls.dispose();

      if (container.contains(domElem)) {
        container.removeChild(domElem);
      }

      sphereGeo.dispose();
      sphereMat.dispose();
      gridGeo.dispose();
      gridMat.dispose();
      atmosGeo.dispose();
      atmosMat.dispose();
      neutralMat.dispose();
      memberMat.dispose();
      neutralBorderMat.dispose();
      memberBorderMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[540px] flex items-center justify-center select-none">
      {/* 1. Canvas 3D al fondo */}
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
        style={{
          maskImage: "radial-gradient(circle at center, black 75%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 75%, transparent 100%)",
        }}
      />

      {/* 2. Capa UI Overlay con pointer-events-none para NO bloquear el canvas */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 z-20">
        {/* Botones superiores con pointer-events-auto explícito y estilo claro institucional */}
        <div className="flex justify-end gap-2 pointer-events-auto">
          <button
            type="button"
            onClick={handleToggleRotate}
            className="px-3.5 py-1.5 bg-white/95 hover:bg-white active:bg-slate-100 text-[#002b7f] border border-slate-300 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md backdrop-blur-md cursor-pointer transition-all"
          >
            {isRotating ? "⏸ Pausar" : "▶ Girar"}
          </button>
          <button
            type="button"
            onClick={handleZoomIn}
            className="w-8 h-8 bg-white/95 hover:bg-white active:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-extrabold flex items-center justify-center shadow-md backdrop-blur-md cursor-pointer transition-all"
            title="Acercar (Zoom In)"
          >
            🔍+
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            className="w-8 h-8 bg-white/95 hover:bg-white active:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-extrabold flex items-center justify-center shadow-md backdrop-blur-md cursor-pointer transition-all"
            title="Alejar (Zoom Out)"
          >
            🔍-
          </button>
          <button
            type="button"
            onClick={handleResetView}
            className="px-3.5 py-1.5 bg-white/95 hover:bg-white active:bg-slate-100 text-[#002b7f] border border-slate-300 rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-md backdrop-blur-md cursor-pointer transition-all"
          >
            ↺ Reset
          </button>
        </div>

        {/* Indicador inferior sutil */}
        <div className="text-center pointer-events-none">
          <span className="inline-block px-3.5 py-1.5 bg-white/90 border border-slate-200/90 rounded-full text-slate-700 font-semibold text-xs shadow-sm backdrop-blur-sm">
            Haz clic en cualquier nodo o arrastra para rotar y hacer zoom
          </span>
        </div>
      </div>

      {/* 3. Panel Lateral Flotante tipo Drawer / Off-canvas (Derecha) */}
      <div
        className={`absolute top-2 right-2 bottom-2 w-full sm:w-[350px] z-40 transition-all duration-300 pointer-events-auto ${
          selectedCountry
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-4 pointer-events-none"
        }`}
      >
        {selectedCountry && (
          <div className="h-full bg-white/95 backdrop-blur-xl p-5 rounded-2xl border-2 border-sky-100 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              {/* Cabecera del Drawer */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="text-3xl drop-shadow-sm">{selectedCountry.flag}</span>
                  <div>
                    <h4 className="text-lg font-extrabold text-slate-900 leading-tight">
                      {selectedCountry.name}
                    </h4>
                    <p className="text-xs text-[#0284c7] font-bold">{selectedCountry.capital}</p>
                  </div>
                </div>
                <button
                  onClick={handleResetView}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                  aria-label="Cerrar panel lateral"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Estado de la Delegación */}
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-sky-50 text-[#002b7f] px-2.5 py-1 rounded-md border border-sky-200">
                <Shield className="w-3.5 h-3.5 text-[#002b7f]" />
                {selectedCountry.status}
              </div>

              {/* Líderes y Contactos Oficiales */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <UserCheck className="w-3.5 h-3.5 text-[#0284c7]" />
                  {selectedCountry.coordinators && selectedCountry.coordinators.length > 1
                    ? `Miembros y Liderazgo Oficial (${selectedCountry.coordinators.length})`
                    : "Liderazgo Oficial de Enlace"}
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {(selectedCountry.coordinators || [selectedCountry.coordinator]).map((coord, cIdx) => (
                    <div
                      key={cIdx}
                      className="bg-slate-50/90 rounded-xl p-3 border border-slate-200/80 space-y-1.5"
                    >
                      <div>
                        <h5 className="text-xs font-extrabold text-slate-900 leading-snug">
                          {coord.name}
                        </h5>
                        <p className="text-[11px] font-semibold text-[#002b7f] leading-tight">
                          {coord.title}
                        </p>
                      </div>
                      <div className="pt-1 border-t border-slate-200/60 space-y-0.5 text-[10px] text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <Activity className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate">{coord.committee}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Building className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate">{coord.institution}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                          <a
                            href={`mailto:${coord.email}`}
                            className="text-[#0284c7] font-semibold hover:underline truncate"
                          >
                            {coord.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Estadísticas Locales */}
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-100">
                  <span className="text-[11px] text-slate-500 block">Colegiados en Red</span>
                  <span className="text-base font-extrabold text-[#002b7f] flex items-center justify-center gap-1">
                    <Users className="w-3.5 h-3.5 text-sky-600" />
                    {selectedCountry.delegatesCount}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
                  <span className="text-[11px] text-slate-500 block">Grupos de Trabajo</span>
                  <span className="text-base font-extrabold text-emerald-800 flex items-center justify-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    {selectedCountry.workingGroupsCount} Activos
                  </span>
                </div>
              </div>

              {/* Eje de Trabajo Prioritario */}
              <div className="text-xs text-slate-600 bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/70">
                <span className="font-bold text-amber-900 block text-[11px] mb-0.5">
                  Eje de Trabajo Prioritario:
                </span>
                {selectedCountry.priorityTopic}
              </div>
            </div>

            {/* Botón de Llamado a la Acción */}
            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={() => handleJoinDelegation(selectedCountry)}
                className="w-full bg-gradient-to-r from-[#002b7f] to-[#0284c7] hover:from-[#001d57] hover:to-[#002b7f] text-white font-extrabold text-xs py-3 px-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Postularme como Miembro de {selectedCountry.name}</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
