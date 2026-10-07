/**
 * Universal Docs / Word / Web HTML to Markdown Converter
 * Handles Google Docs, Microsoft Word, and browser rich-text paste:
 * - Tables (HTML table -> Markdown table | col | col |)
 * - Lists & Bullets (ul/ol -> - item / 1. item)
 * - Internal & External Links (a href -> [text](url))
 * - Headings (h1 -> #, h2 -> ##, h3 -> ###)
 * - Images (img -> ![alt](src))
 * - Auto-extracts Title (capped ~60), Slug, Featured Image, Meta Description (capped ~150)
 */

export interface ParsedDocResult {
  markdown: string;
  extractedTitle?: string;
  extractedSlug?: string;
  extractedFirstImage?: string;
  extractedMetaDescription?: string;
  tablesCount: number;
  linksCount: number;
  headingsCount: number;
  imagesCount: number;
}

export function convertHtmlToMarkdown(html: string): ParsedDocResult {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  let extractedTitle: string | undefined;
  let extractedFirstImage: string | undefined;
  let extractedFirstParagraph: string | undefined;
  let tablesCount = 0;
  let linksCount = 0;
  let headingsCount = 0;
  let imagesCount = 0;

  // Find first H1 or prominent heading for Title
  const firstH1 = doc.querySelector('h1, h2');
  if (firstH1) {
    const t = firstH1.textContent?.trim();
    if (t && t.length > 3) {
      extractedTitle = t;
    }
  }

  // Find first image for featured image suggestion
  const firstImg = doc.querySelector('img');
  if (firstImg) {
    const src = firstImg.getAttribute('src');
    if (src && !src.startsWith('data:') && (src.startsWith('http://') || src.startsWith('https://'))) {
      extractedFirstImage = src;
    }
  }

  // Recursive node converter
  function processNode(node: Node): string {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent || '';
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
      return '';
    }

    const el = node as HTMLElement;
    const tag = el.tagName.toLowerCase();

    // Ignore script, style, meta
    if (['script', 'style', 'meta', 'link', 'noscript'].includes(tag)) {
      return '';
    }

    // Convert children helper
    const getChildrenText = () => {
      let out = '';
      node.childNodes.forEach((child) => {
        out += processNode(child);
      });
      return out;
    };

    // Headings
    if (/^h[1-6]$/.test(tag)) {
      headingsCount++;
      const level = parseInt(tag[1], 10);
      const hashes = '#'.repeat(level);
      const text = getChildrenText().replace(/\s+/g, ' ').trim();
      if (!text) return '';
      return `\n\n${hashes} ${text}\n\n`;
    }

    // Tables
    if (tag === 'table') {
      tablesCount++;
      const rows: string[][] = [];
      const trElements = el.querySelectorAll('tr');

      trElements.forEach((tr) => {
        const rowCells: string[] = [];
        tr.querySelectorAll('th, td').forEach((cell) => {
          // Clean inner cell text: replace line breaks with space, escape pipes
          let cellText = cell.textContent || '';
          cellText = cellText.replace(/[\r\n]+/g, ' ').replace(/\|/g, '\\|').trim();
          rowCells.push(cellText || ' ');
        });
        if (rowCells.length > 0) {
          rows.push(rowCells);
        }
      });

      if (rows.length === 0) return '';

      // Find max column count
      const maxCols = Math.max(...rows.map((r) => r.length));
      if (maxCols === 0) return '';

      // Normalize row lengths
      const normalizedRows = rows.map((r) => {
        while (r.length < maxCols) r.push(' ');
        return r;
      });

      // Header row
      const headerRow = normalizedRows[0];
      const headerLine = `| ${headerRow.join(' | ')} |`;
      const separatorLine = `| ${headerRow.map(() => '---').join(' | ')} |`;

      const dataLines = normalizedRows.slice(1).map((r) => `| ${r.join(' | ')} |`);

      return `\n\n${headerLine}\n${separatorLine}\n${dataLines.join('\n')}\n\n`;
    }

    // Skip tr, th, td if traversed outside table
    if (['thead', 'tbody', 'tfoot', 'tr', 'th', 'td'].includes(tag)) {
      return getChildrenText();
    }

    // Unordered List
    if (tag === 'ul') {
      const items: string[] = [];
      Array.from(el.children).forEach((child) => {
        if (child.tagName.toLowerCase() === 'li') {
          const itemText = processNode(child).trim();
          if (itemText) items.push(`- ${itemText}`);
        }
      });
      return `\n\n${items.join('\n')}\n\n`;
    }

    // Ordered List
    if (tag === 'ol') {
      const items: string[] = [];
      let index = 1;
      Array.from(el.children).forEach((child) => {
        if (child.tagName.toLowerCase() === 'li') {
          const itemText = processNode(child).trim();
          if (itemText) items.push(`${index++}. ${itemText}`);
        }
      });
      return `\n\n${items.join('\n')}\n\n`;
    }

    // List item (if not captured by ul/ol)
    if (tag === 'li') {
      return getChildrenText().trim();
    }

    // Links (internal & external)
    if (tag === 'a') {
      const href = el.getAttribute('href');
      const text = getChildrenText().trim() || href || '';
      if (!href || href.startsWith('javascript:')) {
        return text;
      }
      linksCount++;
      return `[${text}](${href})`;
    }

    // Images
    if (tag === 'img') {
      const src = el.getAttribute('src');
      const alt = el.getAttribute('alt') || 'Article image';
      if (!src) return '';
      imagesCount++;
      return `\n\n![${alt}](${src})\n\n`;
    }

    // Bold / Strong
    if (['strong', 'b'].includes(tag)) {
      const text = getChildrenText().trim();
      return text ? ` **${text}** ` : '';
    }

    // Italic / Em
    if (['em', 'i'].includes(tag)) {
      const text = getChildrenText().trim();
      return text ? ` *${text}* ` : '';
    }

    // Code
    if (tag === 'code') {
      const text = el.textContent || '';
      return el.parentElement?.tagName.toLowerCase() === 'pre' ? text : ` \`${text}\` `;
    }

    if (tag === 'pre') {
      const text = el.textContent || '';
      return `\n\n\`\`\`\n${text.trim()}\n\`\`\`\n\n`;
    }

    // Blockquote
    if (tag === 'blockquote') {
      const text = getChildrenText().trim();
      return `\n\n> ${text.replace(/\n/g, '\n> ')}\n\n`;
    }

    // Horizontal Rule
    if (tag === 'hr') {
      return '\n\n---\n\n';
    }

    // Line break
    if (tag === 'br') {
      return '\n';
    }

    // Paragraphs and Divs
    if (['p', 'div', 'section', 'article'].includes(tag)) {
      const text = getChildrenText().trim();
      if (!text) return '';
      if (!extractedFirstParagraph && text.length > 20 && !text.startsWith('#')) {
        extractedFirstParagraph = text;
      }
      return `\n\n${text}\n\n`;
    }

    return getChildrenText();
  }

  let rawMarkdown = processNode(doc.body || doc);

  // Clean excessive blank lines (more than 2 consecutive newlines)
  rawMarkdown = rawMarkdown
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]+\n/g, '\n')
    .trim();

  // If title was not found via h1, check first line
  if (!extractedTitle) {
    const firstLine = rawMarkdown.split('\n').find((l) => l.trim().length > 3);
    if (firstLine) {
      extractedTitle = firstLine.replace(/^[#\*\s\-]+/, '').trim();
    }
  }

  // Generate slug
  let extractedSlug: string | undefined;
  if (extractedTitle) {
    extractedSlug = extractedTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
      .substring(0, 75);
  }

  // Generate recommended ~150 char meta description
  let extractedMetaDescription: string | undefined;
  if (extractedFirstParagraph) {
    const clean = extractedFirstParagraph.replace(/[\*\[\]\(\)\#]/g, '').trim();
    if (clean.length > 150) {
      // Truncate at last space before 147 chars + "..."
      const cut = clean.substring(0, 147);
      const lastSpace = cut.lastIndexOf(' ');
      extractedMetaDescription = (lastSpace > 100 ? cut.substring(0, lastSpace) : cut) + '...';
    } else {
      extractedMetaDescription = clean;
    }
  }

  return {
    markdown: rawMarkdown,
    extractedTitle: extractedTitle ? extractedTitle.substring(0, 75) : undefined,
    extractedSlug,
    extractedFirstImage,
    extractedMetaDescription,
    tablesCount,
    linksCount,
    headingsCount,
    imagesCount
  };
}

/**
 * Fallback converter for plain text paste (WhatsApp, plain clipboard, etc.)
 * Detects tab-separated rows for tables, bullets, and adds clean double line breaks.
 */
export function convertPlainTextToMarkdown(text: string): ParsedDocResult {
  const lines = text.split('\n');
  const result: string[] = [];
  let tablesCount = 0;
  let linksCount = 0;
  let headingsCount = 0;
  let tableBuffer: string[][] = [];

  const flushTableBuffer = () => {
    if (tableBuffer.length > 0) {
      tablesCount++;
      const maxCols = Math.max(...tableBuffer.map((r) => r.length));
      const normalized = tableBuffer.map((r) => {
        while (r.length < maxCols) r.push(' ');
        return r;
      });
      const header = normalized[0];
      result.push(`\n| ${header.join(' | ')} |`);
      result.push(`| ${header.map(() => '---').join(' | ')} |`);
      for (let i = 1; i < normalized.length; i++) {
        result.push(`| ${normalized[i].join(' | ')} |`);
      }
      result.push('\n');
      tableBuffer = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Check for tab-separated table row (common when copying from Google Sheets / Excel / Docs plain text)
    if (line.includes('\t') && line.split('\t').length >= 2) {
      const cells = line.split('\t').map((c) => c.replace(/\|/g, '\\|').trim() || ' ');
      tableBuffer.push(cells);
      continue;
    } else {
      flushTableBuffer();
    }

    if (!trimmed) {
      if (result.length > 0 && result[result.length - 1] !== '') {
        result.push('');
      }
      continue;
    }

    // Bullets (•, ●, ▪, *)
    if (/^[•●▪*]\s+/.test(trimmed) || trimmed.startsWith('•') || trimmed.startsWith('●')) {
      const itemText = trimmed.replace(/^[•●▪*]\s*/, '').trim();
      result.push(`- ${itemText}`);
      continue;
    }

    // Numbered lists
    if (/^\d+[\.\)]\s+/.test(trimmed)) {
      result.push(trimmed);
      continue;
    }

    // Markdown headings
    if (/^#{1,6}\s+/.test(trimmed)) {
      headingsCount++;
      result.push(trimmed);
      continue;
    }

    // Auto H2 detection for short title line
    if (
      trimmed.length > 3 &&
      trimmed.length < 65 &&
      !trimmed.endsWith('.') &&
      !trimmed.endsWith(',') &&
      !trimmed.endsWith(';') &&
      (i === 0 || lines[i - 1].trim() === '')
    ) {
      headingsCount++;
      result.push(`## ${trimmed}`);
      continue;
    }

    // Detect markdown links
    if (/\[.+?\]\(.+?\)/.test(trimmed)) {
      linksCount++;
    }

    // Regular paragraph
    result.push(line);
    result.push(''); // Force double space
  }

  flushTableBuffer();

  const finalMarkdown = result.join('\n').replace(/\n{3,}/g, '\n\n').trim();

  // Extract title
  let extractedTitle: string | undefined;
  const firstNonEmpty = lines.find((l) => l.trim().length > 3);
  if (firstNonEmpty) {
    extractedTitle = firstNonEmpty.replace(/^[#\*\s\-•]+/, '').trim().substring(0, 75);
  }

  let extractedSlug: string | undefined;
  if (extractedTitle) {
    extractedSlug = extractedTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
      .substring(0, 75);
  }

  // Extract meta description (~150 chars)
  let extractedMetaDescription: string | undefined;
  const paragraph = lines.find((l) => l.trim().length > 25 && !l.startsWith('#') && !l.startsWith('-'));
  if (paragraph) {
    const clean = paragraph.trim();
    if (clean.length > 150) {
      const cut = clean.substring(0, 147);
      const lastSpace = cut.lastIndexOf(' ');
      extractedMetaDescription = (lastSpace > 100 ? cut.substring(0, lastSpace) : cut) + '...';
    } else {
      extractedMetaDescription = clean;
    }
  }

  return {
    markdown: finalMarkdown,
    extractedTitle,
    extractedSlug,
    extractedMetaDescription,
    tablesCount,
    linksCount,
    headingsCount,
    imagesCount: 0
  };
}
