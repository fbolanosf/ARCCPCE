import { NextResponse } from 'next/server';

// Caché y Revalidación: ISR de 24 horas (86400 segundos) para respuesta inmediata < 50ms
export const revalidate = 86400;

export interface CountryMetricItem {
  code: string; // 'CRI', 'GTM', 'SLV', 'HND', 'NIC', 'PAN', 'DOM'
  nursingDensity: number;
  densityYear: string;
  healthSpendUSD: number;
  spendYear: string;
  hospitalBeds: number;
  bedsYear: string;
  source: string;
}

// Dataset estático de respaldo oficial precargado (Safe Fallback)
const STATIC_FALLBACK_METRICS: CountryMetricItem[] = [
  {
    code: 'CRI',
    nursingDensity: 38.6,
    densityYear: '2023',
    healthSpendUSD: 980,
    spendYear: '2021',
    hospitalBeds: 1.2,
    bedsYear: '2021',
    source: 'OMS (WHO GHO HWF_0006) / Banco Mundial (SH.XPD.CHEX.PC.CD & SH.MED.BEDS.ZS) • ARCCPCE',
  },
  {
    code: 'GTM',
    nursingDensity: 12.8,
    densityYear: '2023',
    healthSpendUSD: 285,
    spendYear: '2021',
    hospitalBeds: 0.6,
    bedsYear: '2021',
    source: 'OMS (WHO GHO HWF_0006) / Banco Mundial (SH.XPD.CHEX.PC.CD & SH.MED.BEDS.ZS) • ARCCPCE',
  },
  {
    code: 'SLV',
    nursingDensity: 16.4,
    densityYear: '2022',
    healthSpendUSD: 395,
    spendYear: '2021',
    hospitalBeds: 1.3,
    bedsYear: '2021',
    source: 'OMS (WHO GHO HWF_0006) / Banco Mundial (SH.XPD.CHEX.PC.CD & SH.MED.BEDS.ZS) • ARCCPCE',
  },
  {
    code: 'HND',
    nursingDensity: 11.2,
    densityYear: '2023',
    healthSpendUSD: 215,
    spendYear: '2021',
    hospitalBeds: 0.7,
    bedsYear: '2021',
    source: 'OMS (WHO GHO HWF_0006) / Banco Mundial (SH.XPD.CHEX.PC.CD & SH.MED.BEDS.ZS) • ARCCPCE',
  },
  {
    code: 'NIC',
    nursingDensity: 17.1,
    densityYear: '2022',
    healthSpendUSD: 195,
    spendYear: '2021',
    hospitalBeds: 0.9,
    bedsYear: '2021',
    source: 'OMS (WHO GHO HWF_0006) / Banco Mundial (SH.XPD.CHEX.PC.CD & SH.MED.BEDS.ZS) • ARCCPCE',
  },
  {
    code: 'PAN',
    nursingDensity: 33.5,
    densityYear: '2022',
    healthSpendUSD: 915,
    spendYear: '2021',
    hospitalBeds: 1.6,
    bedsYear: '2021',
    source: 'OMS (WHO GHO HWF_0006) / Banco Mundial (SH.XPD.CHEX.PC.CD & SH.MED.BEDS.ZS) • ARCCPCE',
  },
  {
    code: 'DOM',
    nursingDensity: 17.6,
    densityYear: '2024',
    healthSpendUSD: 490,
    spendYear: '2021',
    hospitalBeds: 1.6,
    bedsYear: '2021',
    source: 'OMS (WHO GHO HWF_0006) / Banco Mundial (SH.XPD.CHEX.PC.CD & SH.MED.BEDS.ZS) • ARCCPCE',
  },
];

const TARGET_COUNTRY_CODES = ['CRI', 'GTM', 'SLV', 'HND', 'NIC', 'PAN', 'DOM'];

/**
 * Función auxiliar para fetch con timeout configurable (3.5 segundos)
 */
async function fetchWithTimeout(url: string, timeoutMs: number = 3500): Promise<any> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        'User-Agent': 'ARCCPCE-Observatory/1.0',
      },
      next: { revalidate: 86400 },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} from ${url}`);
    }

    return await response.json();
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

export async function GET() {
  try {
    const worldBankSpendUrl =
      'https://api.worldbank.org/v2/country/CRI;GTM;SLV;HND;NIC;PAN;DOM/indicator/SH.XPD.CHEX.PC.CD?format=json&mrnev=1';
    const worldBankBedsUrl =
      'https://api.worldbank.org/v2/country/CRI;GTM;SLV;HND;NIC;PAN;DOM/indicator/SH.MED.BEDS.ZS?format=json&mrnev=1';
    const whoUrl =
      "https://ghoapi.azureedge.net/api/HWF_0006?$filter=SpatialDimType%20eq%20%27COUNTRY%27";

    // Ejecución tolerante a fallos en paralelo con timeout de 3.5 segundos
    const [wbSpendResult, wbBedsResult, whoResult] = await Promise.allSettled([
      fetchWithTimeout(worldBankSpendUrl, 3500),
      fetchWithTimeout(worldBankBedsUrl, 3500),
      fetchWithTimeout(whoUrl, 3500),
    ]);

    // Mapeos intermedios con fallback de base
    const metricsMap = new Map<string, CountryMetricItem>();
    STATIC_FALLBACK_METRICS.forEach((item) => {
      metricsMap.set(item.code, { ...item });
    });

    // 1. Procesar gasto en salud del Banco Mundial
    if (wbSpendResult.status === 'fulfilled' && Array.isArray(wbSpendResult.value) && wbSpendResult.value[1]) {
      const records = wbSpendResult.value[1];
      for (const rec of records) {
        const iso3 = rec.countryiso3code || rec.country?.id;
        if (iso3 && metricsMap.has(iso3) && typeof rec.value === 'number') {
          const item = metricsMap.get(iso3)!;
          item.healthSpendUSD = Math.round(rec.value);
          item.spendYear = rec.date || item.spendYear;
        }
      }
    }

    // 2. Procesar camas hospitalarias del Banco Mundial (SH.MED.BEDS.ZS)
    if (wbBedsResult.status === 'fulfilled' && Array.isArray(wbBedsResult.value) && wbBedsResult.value[1]) {
      const records = wbBedsResult.value[1];
      for (const rec of records) {
        const iso3 = rec.countryiso3code || rec.country?.id;
        if (iso3 && metricsMap.has(iso3) && typeof rec.value === 'number') {
          const item = metricsMap.get(iso3)!;
          item.hospitalBeds = Number(rec.value.toFixed(1));
          item.bedsYear = rec.date || item.bedsYear;
        }
      }
    }

    // 2. Procesar datos de la OMS (WHO GHO HWF_0006) si la consulta fue exitosa
    if (whoResult.status === 'fulfilled' && whoResult.value && Array.isArray(whoResult.value.value)) {
      const records = whoResult.value.value;
      const latestWhoPerCountry = new Map<string, { value: number; year: string }>();

      for (const rec of records) {
        const countryCode = rec.SpatialDim;
        const val = rec.NumericValue;
        const yr = rec.TimeDim ? String(rec.TimeDim) : '';

        if (countryCode && TARGET_COUNTRY_CODES.includes(countryCode) && typeof val === 'number') {
          const existing = latestWhoPerCountry.get(countryCode);
          if (!existing || parseInt(yr, 10) > parseInt(existing.year, 10)) {
            latestWhoPerCountry.set(countryCode, { value: Number(val.toFixed(1)), year: yr });
          }
        }
      }

      latestWhoPerCountry.forEach((whoInfo, code) => {
        if (metricsMap.has(code)) {
          const item = metricsMap.get(code)!;
          item.nursingDensity = whoInfo.value;
          item.densityYear = whoInfo.year || item.densityYear;
        }
      });
    }

    const payload = TARGET_COUNTRY_CODES.map((code) => metricsMap.get(code)!);

    return NextResponse.json(
      {
        success: true,
        revalidatedAt: new Date().toISOString(),
        count: payload.length,
        data: payload,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
        },
      }
    );
  } catch (error) {
    // Tolerancia a fallos: fallback inmediato con HTTP 200 y dataset oficial precargado
    return NextResponse.json(
      {
        success: true,
        fallback: true,
        revalidatedAt: new Date().toISOString(),
        count: STATIC_FALLBACK_METRICS.length,
        data: STATIC_FALLBACK_METRICS,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
        },
      }
    );
  }
}
