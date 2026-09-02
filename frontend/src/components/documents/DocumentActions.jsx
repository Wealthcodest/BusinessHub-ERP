import { Download, Mail, MessageCircle, Printer } from "lucide-react";
import Button from "@/components/ui/Button";

const safeFileName = (value) => String(value || "document").replace(/[^a-z0-9-_]+/gi, "-").replace(/^-|-$/g, "");
const pdfSafe = (value) => String(value || "").replace(/[\\()]/g, "\\$&").replace(/[^\x20-\x7E]/g, "?");

function wrapText(text, limit = 88) {
  return String(text || "").replace(/\s+/g, " ").trim().split(" ").reduce((lines, word) => {
    const current = lines.at(-1) || "";
    if (!current || current.length + word.length + 1 <= limit) lines[lines.length - 1] = `${current}${current ? " " : ""}${word}`;
    else lines.push(word);
    return lines;
  }, [""]).filter(Boolean);
}

function createPdf(title, text) {
  const lines = ["Ovixa ERP", title, "", ...wrapText(text)];
  const pages = [];
  for (let index = 0; index < lines.length; index += 52) pages.push(lines.slice(index, index + 52));
  const objects = ["<< /Type /Catalog /Pages 2 0 R >>", `<< /Type /Pages /Kids [${pages.map((_, index) => `${4 + index * 2} 0 R`).join(" ")}] /Count ${pages.length} >>`, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"];
  pages.forEach((page, index) => {
    const pageObject = 4 + index * 2;
    const contentObject = pageObject + 1;
    const stream = [`BT`, "/F1 10 Tf", "50 790 Td", "14 TL", ...page.map((line, lineIndex) => `${lineIndex ? "T* " : ""}(${pdfSafe(line)}) Tj`), "ET"].join("\n");
    objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R >> >> /Contents ${contentObject} 0 R >>`);
    objects.push(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
  });
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => { offsets.push(pdf.length); pdf += `${index + 1} 0 obj\n${object}\nendobj\n`; });
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n${offsets.slice(1).map((offset) => `${String(offset).padStart(10, "0")} 00000 n \n`).join("")}trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return new Blob([pdf], { type: "application/pdf" });
}

function downloadPdf(selector, fileName) {
  const printable = globalThis.document.querySelector(selector);
  if (!printable) return false;
  const url = URL.createObjectURL(createPdf(fileName, printable.innerText));
  const anchor = globalThis.document.createElement("a");
  anchor.href = url;
  anchor.download = `${safeFileName(fileName)}.pdf`;
  globalThis.document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  globalThis.setTimeout(() => URL.revokeObjectURL(url), 1000);
  return true;
}

export default function DocumentActions({ type, number, customer, selector, className = "" }) {
  const label = `${type} ${number || ""}`.trim();
  const pageUrl = globalThis.location.href;
  const shareText = `Please find ${label} from Ovixa. View it here: ${pageUrl}`;
  const emailHref = `mailto:${encodeURIComponent(customer?.email || "")}?subject=${encodeURIComponent(label)}&body=${encodeURIComponent(shareText)}`;
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  return <div className={`flex flex-wrap items-center gap-2 ${className}`}>
    <Button type="button" size="sm" onClick={() => globalThis.window.print()}><Printer className="h-4 w-4" />Print</Button>
    <Button type="button" size="sm" variant="secondary" onClick={() => downloadPdf(selector, label)}><Download className="h-4 w-4" />Download PDF</Button>
    <a href={emailHref} className="inline-flex h-8 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-3 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#18566E] focus:ring-offset-2"><Mail className="h-4 w-4" />Email</a>
    <a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex h-8 items-center justify-center gap-2 rounded-md border border-[#18566E]/20 bg-[#18566E]/5 px-3 text-xs font-semibold text-[#103746] transition-colors hover:bg-[#18566E]/10 focus:outline-none focus:ring-2 focus:ring-[#18566E] focus:ring-offset-2"><MessageCircle className="h-4 w-4" />WhatsApp</a>
  </div>;
}

