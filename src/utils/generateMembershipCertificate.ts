import { jsPDF } from "jspdf";

export interface MembershipCertificateData {
  fullName: string;
  country: string;
  specialty: string;
  folio: string; // Ej. ARCCPCE-CRI-2026-0142
  issueDate?: string;
}

export function generateMembershipCertificate(data: MembershipCertificateData): void {
  // Configuración de hoja carta apaisada / horizontal (Landscape: 279.4 x 215.9 mm)
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "letter",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // 1. Doble orla geométrica perimetral solemne
  doc.setDrawColor(15, 43, 92); // Azul institucional oscuro (#0F2B5C)
  doc.setLineWidth(1.5);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

  doc.setDrawColor(184, 134, 11); // Acento oro ceremonial (#B8860B)
  doc.setLineWidth(0.5);
  doc.rect(13, 13, pageWidth - 26, pageHeight - 26);

  // 2. Encabezado Institucional
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(15, 43, 92);
  doc.text(
    "ASOCIACIÓN REGIONAL CENTROAMERICANA Y CARIBE DE PROFESIONALES DE LA CIENCIA ENFERMERÍA",
    pageWidth / 2,
    28,
    { align: "center" }
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139); // Slate-500
  doc.text(
    "Personería Jurídica Civil • Sede Central Regional: San José, Costa Rica • Registro de Acreditación Gremial",
    pageWidth / 2,
    34,
    { align: "center" }
  );

  // Línea divisoria sutil
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.line(30, 39, pageWidth - 30, 39);

  // 3. Título del Documento
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(5, 150, 105); // Verde esmeralda (#059669)
  doc.text("CONSTANCIA OFICIAL DE ADSCRIPCIÓN GREMIAL", pageWidth / 2, 51, { align: "center" });

  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105);
  doc.text(
    "Padrón Regional para la Homologación, Movilidad Transfronteriza y Desarrollo Científico",
    pageWidth / 2,
    57,
    { align: "center" }
  );

  // 4. Texto de Certificación
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(30, 41, 59);
  doc.text(
    "La Secretaría General y el Comité de Homologación de ARCCPCE hacen constar formalmente que:",
    pageWidth / 2,
    72,
    { align: "center" }
  );

  // Nombre del Profesional destacado
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(15, 43, 92);
  doc.text(data.fullName.toUpperCase(), pageWidth / 2, 85, { align: "center" });

  // Detalle de Adscripción
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  doc.setTextColor(51, 65, 85);
  const textLine1 = `Ha completado su registro preliminar en el ejercicio de ${data.specialty || "Ciencias de la Enfermería"},`;
  const textLine2 = `adscrito(a) a la delegación territorial de ${data.country}, cumpliendo los requerimientos de articulación gremial.`;
  doc.text(textLine1, pageWidth / 2, 95, { align: "center" });
  doc.text(textLine2, pageWidth / 2, 101, { align: "center" });

  // 5. Bloque Central de Validación de Folio
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(pageWidth / 2 - 65, 110, 130, 18, 2, 2, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 43, 92);
  doc.text(`FOLIO REGIONAL: ${data.folio}`, pageWidth / 2, 118, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  const fechaTexto = data.issueDate || new Date().toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });
  doc.text(`Fecha de Asentamiento: ${fechaTexto} • Vigencia: Bienal (2026-2028)`, pageWidth / 2, 124, { align: "center" });

  // 6. Leyenda Normativa
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text(
    "Documento probatorio para fines de convalidación académica, homologación regional y acreditación curricular.",
    pageWidth / 2,
    140,
    { align: "center" }
  );

  // 7. Pie Institucional y Firmas
  // Bloque Izquierdo: Seguridad Digital
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(15, 43, 92);
  doc.text("VALIDACIÓN ELECTRÓNICA", 30, 165);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text("Código de Verificación QR activo", 30, 170);
  doc.text("Protocolos SICA / COMISCA / CIE", 30, 174);
  doc.text("ARCCPCE Secretaría de Acreditación", 30, 178);

  // Bloque Derecho: Firma Presidencial
  doc.setDrawColor(15, 43, 92);
  doc.setLineWidth(0.5);
  doc.line(pageWidth - 110, 168, pageWidth - 30, 168);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(15, 43, 92);
  doc.text("Dr. José Eduardo Carvajal Ovando", pageWidth - 70, 174, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text("Presidencia Fundacional ARCCPCE", pageWidth - 70, 179, { align: "center" });
  doc.text("San José, Costa Rica", pageWidth - 70, 183, { align: "center" });

  // Descarga automática
  const cleanName = data.fullName.replace(/[^a-zA-Z0-9]/g, "_");
  doc.save(`ARCCPCE_Constancia_${cleanName}_${data.folio}.pdf`);
}
