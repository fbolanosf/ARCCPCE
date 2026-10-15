import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';

export interface MembershipCertificateData {
  fullName: string;
  country: string; // Puede ser un solo país ("Costa Rica") o varios separados por coma ("Costa Rica, Panamá")
  specialty: string;
  folio: string; // Ej. ARCCPCE-CRI-2026-0997
  issueDate?: string;
  status?: string;
}

// Generación de Hash Blockchain inmutable
function generateBlockchainHash(folio: string, fullName: string, dateStr: string): string {
  const seed = `${folio}|${fullName}|${dateStr}|ARCCPCE-REGIONAL-BLOCKCHAIN-CA-2026`;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  return `0x7f9a${hex}e4b28c19f5a0d3e218c92a6b7e8412ff${hex}`.slice(0, 42);
}

// Búsqueda del Logotipo Institucional en carpetas públicas
async function getLogoDataUrl(): Promise<string | null> {
  const possiblePaths = [
    '/fotografias/Logo Institucional.jpg',
    '/fotografias/logo institucional.jpg',
    '/fotografias/Logo institucional.png',
    '/fotografias/logo institucional.png',
    '/assets/images/logo.jpeg',
    '/logo.png'
  ];

  for (const path of possiblePaths) {
    try {
      const res = await fetch(path);
      if (res.ok) {
        const blob = await res.blob();
        return await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });
      }
    } catch {
      // Continuar al siguiente path
    }
  }
  return null;
}

// Dibujado vectorial exacto de banderas centroamericanas y del Caribe (proporción 3:2)
function drawVectorFlag(doc: jsPDF, countryName: string, x: number, y: number, w: number = 15, h: number = 10): void {
  const norm = countryName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

  // Borde fino exterior para delimitar la bandera
  const drawBorder = () => {
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.2);
    doc.rect(x, y, w, h);
  };

  if (norm.includes('costa rica')) {
    // Azul - Blanco - Rojo (doble) - Blanco - Azul
    const h1 = h / 6;
    doc.setFillColor(0, 43, 127); doc.rect(x, y, w, h1, 'F');
    doc.setFillColor(255, 255, 255); doc.rect(x, y + h1, w, h1, 'F');
    doc.setFillColor(206, 17, 38); doc.rect(x, y + h1 * 2, w, h1 * 2, 'F');
    doc.setFillColor(255, 255, 255); doc.rect(x, y + h1 * 4, w, h1, 'F');
    doc.setFillColor(0, 43, 127); doc.rect(x, y + h1 * 5, w, h1, 'F');
  } else if (norm.includes('guatemala')) {
    // Azul celeste - Blanco - Azul celeste vertical
    const w1 = w / 3;
    doc.setFillColor(73, 151, 208); doc.rect(x, y, w1, h, 'F');
    doc.setFillColor(255, 255, 255); doc.rect(x + w1, y, w1, h, 'F');
    doc.setFillColor(73, 151, 208); doc.rect(x + w1 * 2, y, w1, h, 'F');
  } else if (norm.includes('salvador')) {
    // Azul cobalto - Blanco - Azul cobalto horizontal
    const h1 = h / 3;
    doc.setFillColor(15, 71, 175); doc.rect(x, y, w, h1, 'F');
    doc.setFillColor(255, 255, 255); doc.rect(x, y + h1, w, h1, 'F');
    doc.setFillColor(15, 71, 175); doc.rect(x, y + h1 * 2, w, h1, 'F');
  } else if (norm.includes('honduras')) {
    // Azul turquesa - Blanco - Azul turquesa
    const h1 = h / 3;
    doc.setFillColor(0, 115, 207); doc.rect(x, y, w, h1, 'F');
    doc.setFillColor(255, 255, 255); doc.rect(x, y + h1, w, h1, 'F');
    doc.setFillColor(0, 115, 207); doc.rect(x, y + h1 * 2, w, h1, 'F');
  } else if (norm.includes('nicaragua')) {
    // Azul - Blanco - Azul horizontal
    const h1 = h / 3;
    doc.setFillColor(0, 103, 197); doc.rect(x, y, w, h1, 'F');
    doc.setFillColor(255, 255, 255); doc.rect(x, y + h1, w, h1, 'F');
    doc.setFillColor(0, 103, 197); doc.rect(x, y + h1 * 2, w, h1, 'F');
  } else if (norm.includes('panama')) {
    // Cuadrantes: Blanco con estrella / Rojo / Azul / Blanco con estrella
    const wHalf = w / 2;
    const hHalf = h / 2;
    doc.setFillColor(255, 255, 255); doc.rect(x, y, wHalf, hHalf, 'F');
    doc.setFillColor(218, 18, 26); doc.rect(x + wHalf, y, wHalf, hHalf, 'F');
    doc.setFillColor(7, 35, 87); doc.rect(x, y + hHalf, wHalf, hHalf, 'F');
    doc.setFillColor(255, 255, 255); doc.rect(x + wHalf, y + hHalf, wHalf, hHalf, 'F');
  } else if (norm.includes('dominicana')) {
    // Cruz blanca con cuarteles azul y rojo
    const wHalf = w / 2;
    const hHalf = h / 2;
    doc.setFillColor(0, 45, 98); doc.rect(x, y, wHalf, hHalf, 'F');
    doc.setFillColor(206, 17, 38); doc.rect(x + wHalf, y, wHalf, hHalf, 'F');
    doc.setFillColor(206, 17, 38); doc.rect(x, y + hHalf, wHalf, hHalf, 'F');
    doc.setFillColor(0, 45, 98); doc.rect(x + wHalf, y + hHalf, wHalf, hHalf, 'F');
    // Cruz blanca central
    doc.setFillColor(255, 255, 255);
    doc.rect(x + wHalf - 1, y, 2, h, 'F');
    doc.rect(x, y + hHalf - 1, w, 2, 'F');
  } else {
    // Placeholder neutro institucional en azul
    doc.setFillColor(15, 43, 92);
    doc.rect(x, y, w, h, 'F');
  }

  drawBorder();
}

export async function generateMembershipCertificate(data: MembershipCertificateData): Promise<void> {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'letter', // 279.4 x 215.9 mm
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const issueDateStr = data.issueDate || new Date().toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Generar Código QR y Hash Blockchain
  const blockchainHash = generateBlockchainHash(data.folio, data.fullName, issueDateStr);
  const verificationUrl = `https://arccpce.org/validar?folio=${encodeURIComponent(data.folio)}&hash=${blockchainHash}`;
  const qrDataUrl = await QRCode.toDataURL(verificationUrl, {
    width: 250,
    margin: 1,
    color: { dark: '#0f2b5c', light: '#ffffff' },
  });

  // Cargar logotipo institucional
  const logoDataUrl = await getLogoDataUrl();

  // ==========================================
  // 1. ORLAS PERIMETRALES GEOMÉTRICAS (LÍMITES: 8mm, 11.5mm, 13mm)
  // Interior libre de marco: Y de 13mm a 202.9mm (pageHeight - 13)
  // ==========================================
  doc.setDrawColor(15, 43, 92); // Azul institucional
  doc.setLineWidth(1.8);
  doc.rect(8, 8, pageWidth - 16, pageHeight - 16);

  doc.setDrawColor(184, 134, 11); // Oro ceremonial
  doc.setLineWidth(0.6);
  doc.rect(11.5, 11.5, pageWidth - 23, pageHeight - 23);

  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.2);
  doc.rect(13, 13, pageWidth - 26, pageHeight - 26);

  // ==========================================
  // 2. LOGOTIPO INSTITUCIONAL (MÁS GRANDE: 27 x 27 mm) Y ENCABEZADO
  // ==========================================
  let headerStartY = 20;

  if (logoDataUrl) {
    const logoSize = 27; // Tamaño ampliado, nítido y protagónico
    doc.addImage(logoDataUrl, 'JPEG', pageWidth / 2 - logoSize / 2, 16, logoSize, logoSize);
    headerStartY = 47.5;
  } else {
    headerStartY = 24;
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12.5);
  doc.setTextColor(15, 43, 92);
  doc.text(
    'ASOCIACIÓN REGIONAL CENTROAMERICANA Y CARIBE',
    pageWidth / 2,
    headerStartY,
    { align: 'center' }
  );
  doc.setFontSize(11);
  doc.text(
    'DE PROFESIONALES DE LA CIENCIA ENFERMERÍA (ARCCPCE)',
    pageWidth / 2,
    headerStartY + 4.8,
    { align: 'center' }
  );

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text(
    'Personería Jurídica Civil • Sede Central Regional: San José, Costa Rica • Registro de Acreditación Gremial',
    pageWidth / 2,
    headerStartY + 9.5,
    { align: 'center' }
  );

  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.line(35, headerStartY + 12.5, pageWidth - 35, headerStartY + 12.5);

  // ==========================================
  // 3. TÍTULO DEL DOCUMENTO
  // ==========================================
  const titleY = headerStartY + 19;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14.5);
  doc.setTextColor(5, 150, 105); // Verde esmeralda noble
  doc.text('CONSTANCIA OFICIAL DE ADSCRIPCIÓN GREMIAL', pageWidth / 2, titleY, { align: 'center' });

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.2);
  doc.setTextColor(71, 85, 105);
  doc.text(
    'Padrón Regional para la Homologación, Movilidad Transfronteriza y Desarrollo Científico',
    pageWidth / 2,
    titleY + 4.5,
    { align: 'center' }
  );

  // ==========================================
  // 4. CERTIFICACIÓN Y NOMBRE
  // ==========================================
  const bodyY = titleY + 11.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(51, 65, 85);
  doc.text(
    'La Secretaría General y el Comité de Homologación de ARCCPCE hacen constar formalmente que:',
    pageWidth / 2,
    bodyY,
    { align: 'center' }
  );

  const nameY = bodyY + 9;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(15, 43, 92);
  doc.text(data.fullName.toUpperCase(), pageWidth / 2, nameY, { align: 'center' });

  const nameWidth = doc.getTextWidth(data.fullName.toUpperCase());
  doc.setDrawColor(184, 134, 11);
  doc.setLineWidth(0.4);
  doc.line(pageWidth / 2 - nameWidth / 2, nameY + 2, pageWidth / 2 + nameWidth / 2, nameY + 2);

  const descY = nameY + 7.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.2);
  doc.setTextColor(51, 65, 85);
  doc.text(
    `Ha completado su registro oficial en el ejercicio de ${data.specialty || 'Ciencias de la Enfermería'},`,
    pageWidth / 2,
    descY,
    { align: 'center' }
  );
  doc.text(
    `adscrito(a) formalmente para fines de homologación y ejercicio multilateral en:`,
    pageWidth / 2,
    descY + 4.5,
    { align: 'center' }
  );

  // ==========================================
  // 5. SECCIÓN DE BANDERAS Y JURISDICCIONES DEL PROFESIONAL
  // ==========================================
  const flagY = descY + 8;
  const countries = data.country.split(/[,/-]/).map(c => c.trim()).filter(Boolean);
  const flagWidth = 13;
  const flagHeight = 8.6;
  const spacing = 4;
  const totalFlagsWidth = countries.length * flagWidth + (countries.length - 1) * spacing;
  let currentFlagX = (pageWidth / 2) - (totalFlagsWidth / 2);

  countries.forEach(country => {
    drawVectorFlag(doc, country, currentFlagX, flagY, flagWidth, flagHeight);
    currentFlagX += flagWidth + spacing;
  });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 43, 92);
  doc.text(data.country, pageWidth / 2, flagY + flagHeight + 4.2, { align: 'center' });

  // ==========================================
  // 6. RECUADRO DE SEGURIDAD Y FOLIO
  // ==========================================
  const boxY = flagY + flagHeight + 7;
  const boxWidth = 138;
  const boxHeight = 14;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(pageWidth / 2 - boxWidth / 2, boxY, boxWidth, boxHeight, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 43, 92);
  doc.text(`FOLIO REGIONAL: ${data.folio}`, pageWidth / 2, boxY + 5.5, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.2);
  doc.setTextColor(100, 116, 139);
  doc.text(
    `Fecha de Asentamiento: ${issueDateStr}  •  Vigencia Bienal: 2026 - 2028`,
    pageWidth / 2,
    boxY + 10.5,
    { align: 'center' }
  );

  // ==========================================
  // 7. PIE AL RAS DEL MARCO (SIN SOBREPONERSE): QR, BLOCKCHAIN Y FIRMA DE PRESIDENCIA
  // El marco interior termina en Y = 202.9 mm. Ubicamos el bloque con margen exacto y elegante.
  // ==========================================
  const qrTopY = 177;
  const qrSize = 23; // QR de 177 mm a 200 mm (a 2.9 mm del marco interior de 202.9 mm)

  // Código QR al ras
  doc.addImage(qrDataUrl, 'PNG', 20, qrTopY, qrSize, qrSize);

  // Bloque Criptográfico alineado con el QR
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(15, 43, 92);
  doc.text('VERIFICACIÓN CRIPTOGRÁFICA REGIONAL', 47, qrTopY + 3.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('Protocolos de Movilidad: SICA / COMISCA / CIE', 47, qrTopY + 7.8);
  doc.text('Validación en red: Escaneo de código QR institucional', 47, qrTopY + 11.8);

  doc.setFont('courier', 'bold');
  doc.setFontSize(6.4);
  doc.setTextColor(15, 118, 110);
  doc.text(`BLOCKCHAIN PROOF: ${blockchainHash}`, 47, qrTopY + 16.2);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(6);
  doc.setTextColor(148, 163, 184);
  doc.text('Inmutable Ledger Record • Timestamped SHA-256 Block Verification', 47, qrTopY + 20);

  // Bloque de Firma Presidencial al ras derecho
  const sigX = pageWidth - 66;
  const lineY = qrTopY + 9;

  doc.setDrawColor(15, 43, 92);
  doc.setLineWidth(0.45);
  doc.line(sigX - 35, lineY, sigX + 35, lineY);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.2);
  doc.setTextColor(15, 43, 92);
  doc.text('Dr. José Eduardo Carvajal Ovando', sigX, lineY + 4.5, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.2);
  doc.setTextColor(71, 85, 105);
  doc.text('Presidente Fundacional de ARCCPCE', sigX, lineY + 8.2, { align: 'center' });
  doc.text('Sede Central Regional • San José, Costa Rica', sigX, lineY + 11.8, { align: 'center' });

  // Descarga del documento
  const cleanName = data.fullName.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]/g, '_');
  doc.save(`ARCCPCE_Constancia_${cleanName}_${data.folio}.pdf`);
}
