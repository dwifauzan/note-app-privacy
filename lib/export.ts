import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";

export async function exportToPDF(title: string, content: string, tags: string[] = []) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 20;

  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text(title, margin, y);
  y += 10;

  if (tags.length > 0) {
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text(`Tags: ${tags.join(", ")}`, margin, y);
    y += 8;
  }

  doc.setDrawColor(200);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0);

  const lines = content.split("\n");
  for (const line of lines) {
    const cleanLine = line.replace(/\[\[([^\]]+)\]\]/g, "$1");
    
    if (cleanLine.startsWith("# ")) {
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      const text = cleanLine.substring(2);
      const textLines = doc.splitTextToSize(text, contentWidth);
      for (const textLine of textLines) {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
        doc.text(textLine, margin, y);
        y += 8;
      }
      y += 4;
    } else if (cleanLine.startsWith("## ")) {
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      const text = cleanLine.substring(3);
      const textLines = doc.splitTextToSize(text, contentWidth);
      for (const textLine of textLines) {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
        doc.text(textLine, margin, y);
        y += 7;
      }
      y += 3;
    } else if (cleanLine.startsWith("### ")) {
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      const text = cleanLine.substring(4);
      const textLines = doc.splitTextToSize(text, contentWidth);
      for (const textLine of textLines) {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
        doc.text(textLine, margin, y);
        y += 6;
      }
      y += 2;
    } else if (cleanLine.startsWith("- ") || cleanLine.startsWith("* ")) {
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      const text = "• " + cleanLine.substring(2);
      const textLines = doc.splitTextToSize(text, contentWidth - 5);
      for (const textLine of textLines) {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
        doc.text(textLine, margin + 5, y);
        y += 5;
      }
    } else if (cleanLine.match(/^\d+\.\s/)) {
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      const textLines = doc.splitTextToSize(cleanLine, contentWidth - 5);
      for (const textLine of textLines) {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
        doc.text(textLine, margin + 5, y);
        y += 5;
      }
    } else if (cleanLine.trim() === "") {
      y += 4;
    } else {
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      const textLines = doc.splitTextToSize(cleanLine, contentWidth);
      for (const textLine of textLines) {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
        doc.text(textLine, margin, y);
        y += 5;
      }
      y += 2;
    }
  }

  doc.save(`${title.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`);
}

export async function exportToDOCX(title: string, content: string, tags: string[] = []) {
  const children: Paragraph[] = [];

  children.push(
    new Paragraph({
      text: title,
      heading: HeadingLevel.TITLE,
      spacing: { after: 200 },
    })
  );

  if (tags.length > 0) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: `Tags: ${tags.join(", ")}`, italics: true, size: 20, color: "666666" })],
        spacing: { after: 200 },
      })
    );
  }

  children.push(new Paragraph({ text: "", spacing: { after: 200 } }));

  const lines = content.split("\n");
  for (const line of lines) {
    const cleanLine = line.replace(/\[\[([^\]]+)\]\]/g, "$1");

    if (cleanLine.startsWith("# ")) {
      children.push(
        new Paragraph({
          text: cleanLine.substring(2),
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 200, after: 100 },
        })
      );
    } else if (cleanLine.startsWith("## ")) {
      children.push(
        new Paragraph({
          text: cleanLine.substring(3),
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
        })
      );
    } else if (cleanLine.startsWith("### ")) {
      children.push(
        new Paragraph({
          text: cleanLine.substring(4),
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 150, after: 80 },
        })
      );
    } else if (cleanLine.startsWith("- ") || cleanLine.startsWith("* ")) {
      children.push(
        new Paragraph({
          text: cleanLine.substring(2),
          bullet: { level: 0 },
          spacing: { after: 50 },
        })
      );
    } else if (cleanLine.match(/^\d+\.\s/)) {
      children.push(
        new Paragraph({
          text: cleanLine.replace(/^\d+\.\s/, ""),
          numbering: { reference: "default-numbering", level: 0 },
          spacing: { after: 50 },
        })
      );
    } else if (cleanLine.trim() === "") {
      children.push(new Paragraph({ text: "", spacing: { after: 50 } }));
    } else {
      children.push(
        new Paragraph({
          text: cleanLine,
          spacing: { after: 50 },
        })
      );
    }
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: children,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${title.replace(/[^a-zA-Z0-9]/g, "_")}.docx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
