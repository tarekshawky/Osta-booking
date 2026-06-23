"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const NAVY: [number, number, number] = [15, 27, 58];
const BRAND: [number, number, number] = [47, 107, 255];

function header(doc: jsPDF, title: string) {
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, 210, 32, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("OSTA SERVICES", 14, 16);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("HVAC & Technical Services · Dubai, UAE", 14, 23);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...BRAND);
  doc.text(title, 196, 18, { align: "right" });
}

export function downloadInvoicePdf(inv: {
  invoiceNumber: string; amount: number; status: string; issuedAt: string;
  customer?: { name?: string | null } | null; notes?: string | null;
}) {
  const doc = new jsPDF();
  header(doc, "INVOICE");

  doc.setTextColor(40, 40, 40);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(`Invoice #: ${inv.invoiceNumber}`, 14, 46);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Date: ${new Date(inv.issuedAt).toLocaleDateString()}`, 14, 53);
  doc.text(`Status: ${inv.status}`, 14, 60);
  doc.text(`Bill To: ${inv.customer?.name ?? "—"}`, 14, 67);

  autoTable(doc, {
    startY: 76,
    head: [["Description", "Amount (AED)"]],
    body: [
      [inv.notes || "Service charge", inv.amount.toLocaleString()],
      [{ content: "Total", styles: { fontStyle: "bold" } }, { content: inv.amount.toLocaleString(), styles: { fontStyle: "bold" } }],
    ],
    headStyles: { fillColor: BRAND, textColor: 255 },
    theme: "striped",
  });

  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.text("Thank you for your business. — OSTA Services", 14, 285);
  doc.save(`${inv.invoiceNumber}.pdf`);
}

export function downloadExpensePdf(ex: {
  title: string; category: string; amount: number; spentAt: string;
  createdBy?: { name?: string | null } | null; notes?: string | null;
}) {
  const doc = new jsPDF();
  header(doc, "EXPENSE");

  doc.setTextColor(40, 40, 40);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(`Expense: ${ex.title}`, 14, 46);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Date: ${new Date(ex.spentAt).toLocaleDateString()}`, 14, 53);
  doc.text(`Category: ${ex.category}`, 14, 60);
  doc.text(`Recorded by: ${ex.createdBy?.name ?? "—"}`, 14, 67);

  autoTable(doc, {
    startY: 76,
    head: [["Item", "Category", "Amount (AED)"]],
    body: [
      [ex.title, ex.category, ex.amount.toLocaleString()],
      [{ content: "Total", colSpan: 2, styles: { fontStyle: "bold" } }, { content: ex.amount.toLocaleString(), styles: { fontStyle: "bold" } }],
    ],
    headStyles: { fillColor: BRAND, textColor: 255 },
    theme: "striped",
  });

  if (ex.notes) {
    const y = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(10);
    doc.text(`Notes: ${ex.notes}`, 14, y);
  }
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.text("OSTA Services — Internal expense record", 14, 285);
  doc.save(`${ex.title.replace(/\s+/g, "_")}.pdf`);
}
