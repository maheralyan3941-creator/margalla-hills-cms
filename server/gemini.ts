import { GoogleGenAI } from '@google/genai';

let aiInstance: GoogleGenAI | null = null;

function getAIClient(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiInstance;
}

export async function generateSEOSuggestions(type: string, input: Record<string, any>) {
  const ai = getAIClient();
  if (!ai) {
    // Graceful fallback suggestions if Gemini API key is not configured
    return getFallbackSuggestion(type, input);
  }

  try {
    let prompt = '';
    if (type === 'meta_tags') {
      prompt = `You are a world-class Technical SEO and Hospitality Marketing Director.
Generate 3 optimized SEO Title tags (between 50-60 characters) and 3 Meta Descriptions (between 140-160 characters) for the following topic/page:
Topic/Name: "${input.title || input.name || ''}"
Focus Keyword: "${input.focusKeyword || ''}"
Category/Type: "${input.category || 'Culinary / Restaurant / SEO'}"
Page Details: "${input.description || input.excerpt || ''}"

Return your response strictly in valid JSON format with this structure:
{
  "titles": ["title 1", "title 2", "title 3"],
  "descriptions": ["desc 1", "desc 2", "desc 3"],
  "recommendedFocusKeyword": "string",
  "reasoning": "string"
}`;
    } else if (type === 'keyword_clusters') {
      prompt = `You are an enterprise SEO strategist.
Generate 4 keyword clusters with primary and supporting long-tail keywords, volume tier estimation, and search intent for:
Core Theme: "${input.theme || 'Restaurant SEO & Artisanal Cuisine'}"

Return valid JSON with format:
{
  "clusters": [
    {
      "clusterName": "string",
      "primaryKeyword": "string",
      "supportingKeywords": ["kw1", "kw2", "kw3", "kw4"],
      "intent": "Informational | Commercial | Transactional | Navigational",
      "volumeTier": "High (10k+) | Medium (1k-10k) | Low (<1k)",
      "difficulty": "Easy (0-30) | Medium (31-60) | Hard (61+)",
      "contentAngle": "string"
    }
  ]
}`;
    } else if (type === 'content_outline') {
      prompt = `You are a high-ranking Content SEO editor.
Create a comprehensive, high-converting article outline with H1, H2, H3 headings, key focus keyword integration points, and FAQ schema questions for:
Topic: "${input.title || ''}"
Focus Keyword: "${input.focusKeyword || ''}"
Target Audience: "${input.audience || 'Food Lovers & Restaurateurs'}"

Return valid JSON:
{
  "suggestedH1": "string",
  "headings": [
    { "level": "H2", "title": "string", "keyPoints": ["point1", "point2"] },
    { "level": "H3", "title": "string", "keyPoints": ["point1"] }
  ],
  "recommendedWordCount": 1500,
  "faqQuestions": [
    { "question": "string", "suggestedAnswer": "string" }
  ],
  "internalLinkSuggestions": ["menu items", "local seo guide", "catering"]
}`;
    } else {
      prompt = `Provide SEO optimization recommendations for: ${JSON.stringify(input)}. Return JSON with "recommendations": []`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '{}';
    return JSON.parse(text);
  } catch (error) {
    console.error('Gemini API generation error:', error);
    return getFallbackSuggestion(type, input);
  }
}

function getFallbackSuggestion(type: string, input: Record<string, any>) {
  const name = input.title || input.name || 'Artisanal Cuisine';
  const kw = input.focusKeyword || name.toLowerCase();

  if (type === 'meta_tags') {
    return {
      titles: [
        `${name} | Saffron & Sage Artisanal Kitchen`,
        `Best ${kw} Guide & Menu | Saffron & Sage`,
        `${name} - Heritage Culinary & Local SEO Showcase`
      ],
      descriptions: [
        `Discover ${name} at Saffron & Sage. Hand-crafted with authentic spices, grade-A saffron, and organic ingredients. Explore our curated menu today.`,
        `Experience premier ${kw} with culinary craftsmanship. View ingredients, dietary guides, and reserving options at Saffron & Sage.`,
        `Explore our authentic ${name} prepared with artisanal techniques. High protein, gluten-free options available. Order or reserve online.`
      ],
      recommendedFocusKeyword: kw,
      reasoning: 'Tailored for optimal click-through rates with power words, brand anchoring, and primary keyword placement.'
    };
  }

  if (type === 'keyword_clusters') {
    return {
      clusters: [
        {
          clusterName: `${name} Specialties`,
          primaryKeyword: kw,
          supportingKeywords: [`best ${kw}`, `authentic ${kw} near me`, `${kw} recipe ingredients`, `gluten free ${kw}`],
          intent: 'Commercial',
          volumeTier: 'Medium (1k-10k)',
          difficulty: 'Medium (31-60)',
          contentAngle: 'Ingredient purity and heritage cooking method.'
        },
        {
          clusterName: 'Local Hospitality & Catering',
          primaryKeyword: `artisan catering ${kw}`,
          supportingKeywords: [`wedding catering with ${kw}`, `corporate food catering`, `private dining menu`],
          intent: 'Transactional',
          volumeTier: 'Low (<1k)',
          difficulty: 'Easy (0-30)',
          contentAngle: 'High-ticket private event bookings and customized menu sets.'
        }
      ]
    };
  }

  return {
    suggestedH1: `The Ultimate Guide to ${name}`,
    headings: [
      { level: 'H2', title: `Why ${name} Matters in Modern Culinary SEO`, keyPoints: ['Search intent alignment', 'Topical depth'] },
      { level: 'H2', title: `Essential Ingredients & Artisanal Craftsmanship`, keyPoints: ['Heritage saffron sourcing', 'Spice blooming technique'] },
      { level: 'H3', title: `Nutritional Highlights & Dietary Accommodations`, keyPoints: ['Gluten-free alternatives', 'Vegan pairings'] },
      { level: 'H2', title: `Frequently Asked Questions About ${name}`, keyPoints: ['Storage and pairing', 'Preparation time'] }
    ],
    recommendedWordCount: 1200,
    faqQuestions: [
      { question: `What makes Saffron & Sage's ${name} unique?`, suggestedAnswer: 'We combine single-origin Kashmiri grade-A saffron with time-honored slow-cooking methods.' },
      { question: `Is this dish suitable for gluten-free diets?`, suggestedAnswer: 'Yes, our preparation avoids wheat thickeners and uses certified gluten-free aromatics.' }
    ],
    internalLinkSuggestions: ['/menu', '/blog/restaurant-local-seo-guide', '/catering/new-york']
  };
}
