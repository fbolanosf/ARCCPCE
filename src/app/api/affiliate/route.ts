import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const revalidate = 0;

export interface AffiliateRecord {
  id: string;
  folio: string;
  fullName: string;
  email: string;
  country: string;
  whatsapp: string;
  specialty: string;
  motivation: string;
  createdAt: string;
  status: string;
}

const COUNTRY_MAP: Record<string, string> = {
  CR: 'CRI',
  GT: 'GTM',
  SV: 'SLV',
  HN: 'HND',
  NI: 'NIC',
  PA: 'PAN',
  CAR: 'DOM',
  DOM: 'DOM',
};

function getStoragePath(): string {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  return path.join(dataDir, 'affiliates.json');
}

function readAffiliates(): AffiliateRecord[] {
  try {
    const filePath = getStoragePath();
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error leyendo affiliates.json:', err);
    return [];
  }
}

function saveAffiliates(records: AffiliateRecord[]): void {
  const filePath = getStoragePath();
  const tmpPath = `${filePath}.tmp.${Date.now()}`;
  fs.writeFileSync(tmpPath, JSON.stringify(records, null, 2), 'utf-8');
  fs.renameSync(tmpPath, filePath);
}

export async function GET() {
  const records = readAffiliates();
  return NextResponse.json({
    success: true,
    message: 'Servicio de afiliación activo de ARCCPCE.',
    total: records.length,
    data: records,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, country, whatsapp, specialty, motivation } = body;

    if (!fullName || !email) {
      return NextResponse.json(
        { success: false, error: 'Nombre completo y correo electrónico son requeridos.' },
        { status: 400 }
      );
    }

    const currentYear = new Date().getFullYear();
    const iso3 = COUNTRY_MAP[country] || (country && country.length === 3 ? country.toUpperCase() : 'CRI');

    const existingRecords = readAffiliates();
    const nextCorrelative = String(existingRecords.length + 1).padStart(4, '0');
    const folio = `ARCCPCE-${iso3}-${currentYear}-${nextCorrelative}`;
    const id = `aff-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const createdAt = new Date().toISOString();

    const newRecord: AffiliateRecord = {
      id,
      folio,
      fullName: String(fullName).trim(),
      email: String(email).trim().toLowerCase(),
      country: iso3,
      whatsapp: whatsapp ? String(whatsapp).trim() : '',
      specialty: specialty ? String(specialty).trim() : 'Enfermería General',
      motivation: motivation ? String(motivation).trim() : '',
      createdAt,
      status: 'Pre-afiliación Registrada',
    };

    existingRecords.push(newRecord);
    saveAffiliates(existingRecords);

    return NextResponse.json(
      {
        success: true,
        message: 'Pre-afiliación registrada con éxito en el padrón regional de ARCCPCE.',
        data: {
          id: newRecord.id,
          folio: newRecord.folio,
          fullName: newRecord.fullName,
          createdAt: newRecord.createdAt,
          status: newRecord.status,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error al procesar pre-afiliación:', error);
    return NextResponse.json(
      { success: false, error: 'Ocurrió un error al procesar el registro.' },
      { status: 500 }
    );
  }
}
