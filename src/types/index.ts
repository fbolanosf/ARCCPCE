export interface CountryNode {
  id: string;
  name: string;
  capital: string;
  lat: number;
  lng: number;
  isHeadquarters?: boolean;
  committee: string;
  delegatesCount: number;
  flag: string;
}

export interface ConnectionArc {
  from: string;
  to: string;
  fromCoords: [number, number];
  toCoords: [number, number];
  label: string;
}

export interface RegionalMetric {
  id: string;
  name: string;
  flag: string;
  capital: string;
  role: string;
  ratioPer10k: number;
  whoBenchmark: number;
  licensingStatus: string;
  academicLevel: string;
  primaryChallenge: string;
  mobilityStatus: string;
  downloadGuideUrl: string;
}
