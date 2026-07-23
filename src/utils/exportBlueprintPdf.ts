import { jsPDF } from 'jspdf';
import { SideHustle } from '../types';
import { RealityCheckService } from '../services/realityCheckService';

export const exportBlueprintPdf = (hustle: SideHustle) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 15;

  // Colors
  const darkBg = '#0f172a';
  const primaryText = '#0f172a';
  const emeraldAccent = '#059669';
  const indigoAccent = '#4f46e5';
  const grayText = '#64748b';

  // Title Banner Box
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(10, y, pageWidth - 20, 28, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text(hustle.title, 15, y + 10);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text(`AUTOMATION BLUEPRINT REPORT | Category: ${hustle.category}`, 15, y + 18);
  doc.text(`Generated via AI Side Hustle OS on ${new Date().toLocaleDateString()}`, 15, y + 23);

  y += 35;

  // Key Metrics Summary Grid
  doc.setFillColor(248, 250, 252);
  doc.rect(10, y, pageWidth - 20, 22, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.rect(10, y, pageWidth - 20, 22, 'S');

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);

  const colWidth = (pageWidth - 20) / 4;
  
  doc.text('STARTUP COST', 15, y + 7);
  doc.setFont('helvetica', 'normal');
  doc.text(`$${hustle.startupCost}`, 15, y + 14);

  doc.setFont('helvetica', 'bold');
  doc.text('MONTHLY PROFIT', 15 + colWidth, y + 7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(5, 150, 105);
  doc.text(`$${hustle.monthlyRevenuePotential.toLocaleString()}`, 15 + colWidth, y + 14);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('PROFIT MARGIN', 15 + colWidth * 2, y + 7);
  doc.setFont('helvetica', 'normal');
  doc.text(`${hustle.marginPercentage}%`, 15 + colWidth * 2, y + 14);

  doc.setFont('helvetica', 'bold');
  doc.text('AUTOMATION SCORE', 15 + colWidth * 3, y + 7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(79, 70, 229);
  doc.text(`${hustle.automationScore}%`, 15 + colWidth * 3, y + 14);

  y += 30;

  // Overview Description Section
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('1. Executive Overview & Strategy', 10, y);
  y += 6;

  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  
  const splitDesc = doc.splitTextToSize(hustle.description, pageWidth - 20);
  doc.text(splitDesc, 10, y);
  y += splitDesc.length * 5 + 6;

  // Fail-Proof Execution Steps
  if (y > 220) { doc.addPage(); y = 15; }
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('2. Fail-Proof Execution Checklist', 10, y);
  y += 6;

  const steps = RealityCheckService.evaluateHustle(hustle).failProofSteps;
  steps.forEach((step, idx) => {
    if (y > 260) { doc.addPage(); y = 15; }
    doc.setFillColor(241, 245, 249);
    doc.rect(10, y, pageWidth - 20, 10, 'F');

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(79, 70, 229);
    doc.text(`Step ${idx + 1}:`, 13, y + 6.5);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(15, 23, 42);
    const splitStep = doc.splitTextToSize(step, pageWidth - 45);
    doc.text(splitStep[0] || '', 27, y + 6.5);

    y += 13;
  });

  y += 5;

  // Automation Blueprint Pipeline Nodes
  if (hustle.zapierBlueprint) {
    if (y > 210) { doc.addPage(); y = 15; }

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(`3. ${hustle.zapierBlueprint.platform} Automation Blueprint Modules`, 10, y);
    y += 6;

    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100, 116, 139);
    doc.text(hustle.zapierBlueprint.description, 10, y);
    y += 8;

    hustle.zapierBlueprint.nodes.forEach((node, idx) => {
      if (y > 250) { doc.addPage(); y = 15; }

      doc.setDrawColor(203, 213, 225);
      doc.setFillColor(248, 250, 252);
      doc.rect(10, y, pageWidth - 20, 18, 'FD');

      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(5, 150, 105);
      doc.text(`Node ${idx + 1} [${node.type.toUpperCase()}]: ${node.toolName}`, 14, y + 6);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(15, 23, 42);
      doc.text(`Action: ${node.actionTitle}`, 14, y + 12);

      if (node.setupTip) {
        doc.setFontSize(8);
        doc.setTextColor(100, 116, 139);
        doc.text(`Tip: ${node.setupTip}`, 100, y + 12);
      }

      y += 22;
    });
  }

  // Footer on last page
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text('Side Hustle Automation Studio — Confidential Operational Blueprint', 10, 285);

  // Save the PDF
  const filename = `${hustle.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_blueprint.pdf`;
  doc.save(filename);
};
