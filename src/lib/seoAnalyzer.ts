import { SEOAuditResult, SEOMetadata } from '../types';

export function calculateSEOAudit(
  content: string,
  seo: SEOMetadata,
  extra?: { imagesCount?: number; imagesWithAlt?: number }
): SEOAuditResult {
  const passed: string[] = [];
  const warnings: string[] = [];
  const errors: string[] = [];
  let score = 100;

  const title = (seo.seoTitle || '').trim();
  const desc = (seo.metaDescription || '').trim();
  const keyword = (seo.focusKeyword || '').toLowerCase().trim();
  const rawText = content.replace(/<[^>]*>?/gm, ' ').replace(/[#*_`\[\]()]/g, ' ');
  const words = rawText.split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;

  // 1. Title checks
  const titleLength = title.length;
  if (!title) {
    errors.push('SEO Title is missing.');
    score -= 25;
  } else if (titleLength < 35) {
    warnings.push(`SEO Title is too short (${titleLength} chars). Aim for 50-60 characters.`);
    score -= 8;
  } else if (titleLength > 65) {
    warnings.push(`SEO Title may be truncated in SERP (${titleLength} chars). Keep under 60 characters.`);
    score -= 5;
  } else {
    passed.push(`SEO Title length is optimal (${titleLength} characters).`);
  }

  // 2. Meta Description checks
  const descLength = desc.length;
  if (!desc) {
    errors.push('Meta Description is missing.');
    score -= 20;
  } else if (descLength < 100) {
    warnings.push(`Meta Description is short (${descLength} chars). Expand to 140-160 chars for maximum CTR.`);
    score -= 7;
  } else if (descLength > 165) {
    warnings.push(`Meta Description is long (${descLength} chars). Search engines will truncate past ~160.`);
    score -= 5;
  } else {
    passed.push(`Meta Description length is ideal (${descLength} characters).`);
  }

  // 3. Keyword Checks
  let keywordCount = 0;
  let keywordDensity = 0;
  if (keyword) {
    const keywordRegex = new RegExp(`\\b${keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'gi');
    const matches = rawText.match(keywordRegex);
    keywordCount = matches ? matches.length : 0;
    keywordDensity = wordCount > 0 ? Number(((keywordCount / wordCount) * 100).toFixed(2)) : 0;

    // Focus keyword in title
    if (title.toLowerCase().includes(keyword)) {
      passed.push(`Focus keyword "${keyword}" is present in the SEO Title.`);
    } else {
      errors.push(`Focus keyword "${keyword}" is missing from the SEO Title.`);
      score -= 15;
    }

    // Focus keyword in meta description
    if (desc.toLowerCase().includes(keyword)) {
      passed.push(`Focus keyword "${keyword}" is present in the Meta Description.`);
    } else {
      warnings.push(`Focus keyword "${keyword}" is missing from the Meta Description.`);
      score -= 8;
    }

    // Focus keyword in URL slug
    if ((seo.slug || '').toLowerCase().includes(keyword.replace(/\s+/g, '-'))) {
      passed.push(`Focus keyword is represented in the URL slug.`);
    } else {
      warnings.push(`Consider including the focus keyword in the URL slug.`);
      score -= 5;
    }

    // Density evaluation
    if (keywordDensity === 0 && wordCount > 100) {
      errors.push(`Focus keyword was not found in the body text.`);
      score -= 15;
    } else if (keywordDensity > 3.5) {
      warnings.push(`Keyword density is high (${keywordDensity}%). Risk of keyword stuffing—aim for 1.0% - 2.5%.`);
      score -= 10;
    } else if (keywordDensity >= 0.8 && keywordDensity <= 3.0) {
      passed.push(`Keyword density is healthy (${keywordDensity}%, ${keywordCount} occurrences).`);
    } else if (wordCount > 50) {
      warnings.push(`Keyword density is low (${keywordDensity}%). Try mentioning "${keyword}" naturally.`);
      score -= 5;
    }
  } else {
    warnings.push('No Focus Keyword defined. Setting a focus keyword enables topical optimization.');
    score -= 10;
  }

  // 4. Heading Structure Checks
  const h1Matches = content.match(/^#\s+[^\n]+/gm) || [];
  const h2Matches = content.match(/^##\s+[^\n]+/gm) || [];
  const h3Matches = content.match(/^###\s+[^\n]+/gm) || [];
  const h4Matches = content.match(/^####\s+[^\n]+/gm) || [];

  const headingCounts = {
    h1: h1Matches.length,
    h2: h2Matches.length,
    h3: h3Matches.length,
    h4: h4Matches.length
  };

  if (headingCounts.h1 === 1) {
    passed.push('Single H1 heading verified.');
  } else if (headingCounts.h1 === 0 && wordCount > 80) {
    warnings.push('No H1 heading found in the body content.');
    score -= 8;
  } else if (headingCounts.h1 > 1) {
    warnings.push(`Multiple H1 headings detected (${headingCounts.h1}). Best practice is exactly one H1 per page.`);
    score -= 6;
  }

  if (headingCounts.h2 > 0) {
    passed.push(`Content is organized with ${headingCounts.h2} H2 subheadings.`);
  } else if (wordCount > 250) {
    warnings.push('No H2 subheadings detected. Divide lengthy content with descriptive subheadings.');
    score -= 7;
  }

  // 5. Content Length
  if (wordCount >= 600) {
    passed.push(`Substantial content depth (${wordCount} words).`);
  } else if (wordCount >= 300) {
    passed.push(`Acceptable content length (${wordCount} words).`);
  } else if (wordCount > 0) {
    warnings.push(`Content is relatively brief (${wordCount} words). Comprehensive topics often rank better with 500+ words.`);
    score -= 8;
  }

  // 6. Links count
  const linkMatches: string[] = (content.match(/\[([^\]]+)\]\(([^)]+)\)/g) || []) as string[];
  let internalLinksCount = 0;
  let externalLinksCount = 0;

  linkMatches.forEach((l: string) => {
    if (l.includes('http://') || l.includes('https://')) {
      externalLinksCount++;
    } else {
      internalLinksCount++;
    }
  });

  if (internalLinksCount > 0) {
    passed.push(`Includes ${internalLinksCount} internal links for link equity distribution.`);
  } else if (wordCount > 200) {
    warnings.push('No internal links detected. Add links to relevant menu items, categories, or guides.');
    score -= 6;
  }

  // 7. Canonical & Open Graph
  if (seo.canonicalUrl) {
    passed.push('Canonical URL explicitly defined to prevent duplicate content.');
  } else {
    warnings.push('Canonical URL missing. Default self-referencing canonical will be used.');
    score -= 4;
  }

  if (seo.ogTitle && seo.ogDescription && seo.ogImage) {
    passed.push('Complete Open Graph social card tags present.');
  } else {
    warnings.push('Open Graph tags incomplete. Set OG Title, OG Description, and OG Image for social sharing.');
    score -= 5;
  }

  // 8. Image Alt Coverage
  const imagesWithAlt = extra?.imagesWithAlt ?? 1;
  const totalImages = extra?.imagesCount ?? 1;
  const imagesWithoutAlt = Math.max(0, totalImages - imagesWithAlt);

  if (imagesWithoutAlt === 0 && totalImages > 0) {
    passed.push('All images include descriptive ALT text.');
  } else if (imagesWithoutAlt > 0) {
    warnings.push(`${imagesWithoutAlt} image(s) missing descriptive ALT attributes.`);
    score -= 6;
  }

  score = Math.max(10, Math.min(100, score));

  return {
    score,
    passed,
    warnings,
    errors,
    wordCount,
    headingCounts,
    keywordDensity,
    keywordCount,
    internalLinksCount,
    externalLinksCount,
    imagesWithAltCount: imagesWithAlt,
    imagesWithoutAltCount: imagesWithoutAlt,
    titleLength,
    descriptionLength: descLength
  };
}

// Utility to estimate Google SERP pixel width for title text
export function estimateTitlePixelWidth(title: string): number {
  let width = 0;
  for (const char of title) {
    if (/[ijlI\.,'!]/.test(char)) width += 4;
    else if (/[mwWMQO]/.test(char)) width += 11;
    else if (/[A-Z]/.test(char)) width += 8.5;
    else if (/[0-9]/.test(char)) width += 7.5;
    else width += 6.5;
  }
  return Math.round(width);
}
