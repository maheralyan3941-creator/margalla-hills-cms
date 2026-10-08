/**
 * Google Docs & Rich Text HTML Cleaner and Formatter
 * 
 * Guarantees preservation of:
 * - h1, h2, h3, p, strong, b (converted to strong), ul, ol, li, a, em, br, table
 * - Headings: "5 Tested Best...", "Final Thoughts...", etc. -> H2
 * - FAQs: Questions ending with '?' or starting with 'FAQ'/'Q:' -> H3
 * - Bullets: <ul><li> with disc dots
 * - Links: <a href="..."> preserved with clean target URLs
 */

export function cleanAndFormatPastedHtml(rawHtml: string): string {
  if (!rawHtml || !rawHtml.trim()) return '';

  const parser = new DOMParser();
  const doc = parser.parseFromString(rawHtml, 'text/html');

  // 1. Remove dangerous or non-content tags
  const junkTags = doc.querySelectorAll('script, style, meta, link, noscript, xml');
  junkTags.forEach(el => el.remove());

  // 2. Unwrap Google Docs outer fake <b> container (<b id="docs-internal-guid-..." style="font-weight:normal">)
  const docsWrappers = doc.querySelectorAll('b[id^="docs-internal-guid-"]');
  docsWrappers.forEach(wrapper => {
    const parent = wrapper.parentNode;
    if (parent) {
      while (wrapper.firstChild) {
        parent.insertBefore(wrapper.firstChild, wrapper);
      }
      parent.removeChild(wrapper);
    }
  });

  // 3. Convert Google Docs bold spans to <strong>
  const allSpans = Array.from(doc.querySelectorAll('span'));
  allSpans.forEach(span => {
    const style = span.getAttribute('style') || '';
    const isBold = /font-weight:\s*(700|800|900|bold)/i.test(style);
    const isItalic = /font-style:\s*italic/i.test(style);

    // If span is bold, replace or wrap with strong
    if (isBold && span.textContent && span.textContent.trim()) {
      const strong = doc.createElement('strong');
      strong.innerHTML = span.innerHTML;
      span.parentNode?.replaceChild(strong, span);
    } else if (isItalic && span.textContent && span.textContent.trim()) {
      const em = doc.createElement('em');
      em.innerHTML = span.innerHTML;
      span.parentNode?.replaceChild(em, span);
    }
  });

  // 4. Convert all <b> to <strong>
  const bElements = Array.from(doc.querySelectorAll('b'));
  bElements.forEach(b => {
    // If not a styled reset wrapper, convert to strong
    const strong = doc.createElement('strong');
    strong.innerHTML = b.innerHTML;
    b.parentNode?.replaceChild(strong, b);
  });

  // 5. Clean and preserve links <a href="...">
  const links = Array.from(doc.querySelectorAll('a'));
  links.forEach(a => {
    let href = a.getAttribute('href') || '';
    // Unwrap Google Docs redirect links (https://www.google.com/url?q=...)
    if (href.includes('google.com/url?') && href.includes('q=')) {
      try {
        const urlParams = new URLSearchParams(href.split('?')[1]);
        const actualUrl = urlParams.get('q');
        if (actualUrl) href = actualUrl;
      } catch {
        // fallback regex
        const match = href.match(/[?&]q=([^&]+)/);
        if (match && match[1]) href = decodeURIComponent(match[1]);
      }
    }
    a.setAttribute('href', href);
    a.removeAttribute('style');
    a.removeAttribute('class');
    // Open external in new tab safely
    if (href.startsWith('http://') || href.startsWith('https://')) {
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
    }
  });

  // 6. Process paragraphs to identify H2 and H3 headings
  const paragraphs = Array.from(doc.querySelectorAll('p, div'));
  paragraphs.forEach(p => {
    const text = p.textContent?.trim() || '';
    if (!text) return;

    // Check if paragraph is actually an FAQ question -> H3
    const isFaq = 
      /^(faq|faqs|frequently asked questions?|q\d*[:\.\)])/i.test(text) ||
      (text.endsWith('?') && text.length < 150 && !text.includes('\n'));

    if (isFaq) {
      const h3 = doc.createElement('h3');
      h3.innerHTML = p.innerHTML;
      p.parentNode?.replaceChild(h3, p);
      return;
    }

    // Check if paragraph is a section heading like "5 Tested Best...", "Final Thoughts...", numbered item -> H2
    const isH2Heading =
      /^(final thoughts|conclusion|verdict|overview|summary|what to eat|key takeaways)/i.test(text) ||
      /^(\d+[\.\)]\s+)/.test(text) || // Numbered item like "1. Tuscany Courtyard" or "5 Tested Best..."
      /^\d+\s+(tested|best|top|recommended|must-visit|hidden gems)/i.test(text) || // "5 Tested Best..."
      (text.length > 3 && text.length < 75 && !text.endsWith('.') && !text.endsWith(',') && !text.includes(';') && (p.querySelector('strong') !== null || /font-weight:\s*(700|bold)/i.test(p.getAttribute('style') || '')));

    if (isH2Heading) {
      const h2 = doc.createElement('h2');
      h2.innerHTML = p.innerHTML;
      p.parentNode?.replaceChild(h2, p);
      return;
    }
  });

  // 7. Sanitize allowed tags and strip unwanted inline styles so CSS takes precedence
  const allowedTags = new Set([
    'h1', 'h2', 'h3', 'p', 'strong', 'em', 'ul', 'ol', 'li', 'a', 'br',
    'table', 'thead', 'tbody', 'tr', 'th', 'td', 'img', 'blockquote'
  ]);

  function sanitizeNode(node: Node) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;
      const tagName = el.tagName.toLowerCase();

      if (!allowedTags.has(tagName)) {
        // If not in allowed tags (like span, section, etc.), unwrap children
        const parent = el.parentNode;
        if (parent) {
          while (el.firstChild) {
            parent.insertBefore(el.firstChild, el);
          }
          parent.removeChild(el);
        }
        return;
      }

      // Strip interfering inline styles from text tags so .article-content styling works cleanly
      if (['h1', 'h2', 'h3', 'p', 'strong', 'em', 'ul', 'ol', 'li'].includes(tagName)) {
        el.removeAttribute('style');
        el.removeAttribute('class');
      }

      // Recurse children
      Array.from(el.childNodes).forEach(child => sanitizeNode(child));
    }
  }

  // Sanitize the tree
  const body = doc.body;
  Array.from(body.childNodes).forEach(child => sanitizeNode(child));

  // Return cleaned inner HTML
  return body.innerHTML.trim();
}

/**
 * Converts plain text paste into structured HTML with headings, lists, and paragraphs
 */
export function convertPlainTextToStructuredHtml(text: string): string {
  if (!text || !text.trim()) return '';

  const lines = text.split(/\r?\n/);
  const out: string[] = [];
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      if (inList) {
        out.push('</ul>');
        inList = false;
      }
      continue;
    }

    // Bullet points like •, -, *, ●
    const isBullet = /^[•●▪\-\*]\s+(.*)$/.test(trimmed);
    if (isBullet) {
      const bulletMatch = trimmed.match(/^[•●▪\-\*]\s+(.*)$/);
      const bulletText = bulletMatch ? bulletMatch[1] : trimmed;
      if (!inList) {
        out.push('<ul>');
        inList = true;
      }
      // Check for bold prefix like "Pros:" or "Cons:"
      const formattedItem = bulletText.replace(/^(pros:|cons:|highlight:)/i, '<strong>$1</strong>');
      out.push(`<li>${formattedItem}</li>`);
      continue;
    }

    if (inList) {
      out.push('</ul>');
      inList = false;
    }

    // Heading 2 detection (e.g. "5 Tested Best...", "Final Thoughts...", "1. Tuscany Courtyard")
    const isH2 =
      /^(final thoughts|conclusion|verdict|overview|summary)/i.test(trimmed) ||
      /^\d+\s+(tested|best|top|recommended|must-visit)/i.test(trimmed) ||
      (/^(\d+[\.\)])\s+(.*)$/.test(trimmed) && trimmed.length < 80);

    if (isH2) {
      out.push(`<h2>${trimmed}</h2>`);
      continue;
    }

    // FAQ detection -> H3
    const isFaq = 
      /^(faq|faqs|q\d*[:\.\)])/i.test(trimmed) ||
      (trimmed.endsWith('?') && trimmed.length < 150);

    if (isFaq) {
      out.push(`<h3>${trimmed}</h3>`);
      continue;
    }

    // Markdown heading syntax (# or ## or ###)
    if (trimmed.startsWith('# ')) {
      out.push(`<h1>${trimmed.replace(/^#\s+/, '')}</h1>`);
      continue;
    }
    if (trimmed.startsWith('## ')) {
      out.push(`<h2>${trimmed.replace(/^##\s+/, '')}</h2>`);
      continue;
    }
    if (trimmed.startsWith('### ')) {
      out.push(`<h3>${trimmed.replace(/^###\s+/, '')}</h3>`);
      continue;
    }

    // Regular paragraph
    // Replace **bold** with <strong>
    const formattedParagraph = trimmed
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>');

    out.push(`<p>${formattedParagraph}</p>`);
  }

  if (inList) {
    out.push('</ul>');
  }

  return out.join('\n');
}

/**
 * Checks if a content string is primarily HTML
 */
export function isHtmlContent(content: string): boolean {
  if (!content) return false;
  return /<(p|h1|h2|h3|ul|ol|li|strong|b|table|div|a)[\s>]/i.test(content);
}

/**
 * Extracts H1 title, meta description, and first image from HTML or text
 */
export function extractMetadataFromHtml(html: string): {
  h1Title?: string;
  metaDesc?: string;
  slug?: string;
  firstImage?: string;
} {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  let h1Title: string | undefined;
  const h1El = doc.querySelector('h1, h2');
  if (h1El && h1El.textContent?.trim()) {
    h1Title = h1El.textContent.trim().substring(0, 70);
  }

  let firstImage: string | undefined;
  const imgEl = doc.querySelector('img');
  if (imgEl && imgEl.getAttribute('src')) {
    const src = imgEl.getAttribute('src')!;
    if (src.startsWith('http://') || src.startsWith('https://')) {
      firstImage = src;
    }
  }

  let metaDesc: string | undefined;
  const pEl = doc.querySelector('p');
  if (pEl && pEl.textContent?.trim()) {
    metaDesc = pEl.textContent.trim().substring(0, 150);
  }

  let slug: string | undefined;
  if (h1Title) {
    slug = h1Title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }

  return { h1Title, metaDesc, slug, firstImage };
}
