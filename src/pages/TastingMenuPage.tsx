import React, { useState } from 'react';
import { Sparkles, Award, Clock, Users, Wine, ChevronRight, Check, CalendarCheck } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

interface TastingMenuPageProps {
  navigate: (path: string) => void;
}

export function TastingMenuPage({ navigate }: TastingMenuPageProps) {
  const [selectedExperience, setSelectedExperience] = useState<'symphony' | 'grand-reserve'>('symphony');

  const tastingSEO = {
    seoTitle: 'Sensory Saffron Tasting Menu | Multi-Course Michelin Experience | Saffron & Sage',
    metaDescription: 'Indulge in our 7-Course Symphony and 10-Course Grand Reserve Saffron Tasting experiences featuring rare Himalayan ingredients and Sommelier wine pairings.',
    slug: 'tasting-menu',
    focusKeyword: 'saffron tasting menu',
    secondaryKeywords: ['multi-course fine dining', 'sommelier wine pairing menu', 'michelin tasting experience'],
    canonicalUrl: '/tasting-menu',
    robotsIndex: true,
    robotsFollow: true,
    ogTitle: 'Sensory Saffron Tasting Menu | Saffron & Sage',
    ogDescription: 'A multi-course culinary voyage through single-origin saffron, slow-braised heritage meats, and rare cellar vintages.',
    ogImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    schemaType: 'MenuItem' as const,
    searchIntent: 'Commercial' as const
  };

  const symphonyCourses = [
    {
      course: 'Course 01 &bull; L\'Amuse-Bouche',
      title: 'Kashmiri Gold & Crispy Morel Sphere',
      description: 'Hand-picked wild Himalayan morels stuffed with aged smoked paneer, saffron dust, and reduced black truffle bouillon.',
      pairing: 'NV Billecart-Salmon Brut Rosé Champagne, France'
    },
    {
      course: 'Course 02 &bull; Cold Crudo',
      title: 'Charred Hokkaido Scallop with Saffron Emulsion',
      description: 'Diver scallops pan-seared with kaffir lime, cold-pressed mustard oil, and Pampore saffron sea salt pearls.',
      pairing: '2022 Domaine Leflaive Puligny-Montrachet, Burgundy'
    },
    {
      course: 'Course 03 &bull; Heritage Clay Pot',
      title: '14-Hour Himalayan Lamb Shank Dum Nihari',
      description: 'Pasture-raised young lamb shank simmered overnight in an earthen vessel with 32 hand-milled spices and saffron bone marrow velouté.',
      pairing: '2019 Tenuta San Guido Sassicaia, Bolgheri, Italy'
    },
    {
      course: 'Course 04 &bull; The Signature Jewel',
      title: 'Crown Saffron Shahi Dum Biryani',
      description: '2-year aged aged basmati rice layered with royal wild quail, blooming saffron threads, and sealed under a crisp flaky sourdough purdah.',
      pairing: '2018 Château Pontet-Canet, Pauillac, Bordeaux'
    },
    {
      course: 'Course 05 &bull; Palate Cleanser',
      title: 'Pomegranate & Wild Himalayan Sage Granita',
      description: 'Frozen mountain pomegranate essence infused with crushed winter mint and chilled saffron floral mist.',
      pairing: 'House-Distilled Botanical Saffron Essence'
    },
    {
      course: 'Course 06 &bull; Pastry Atelier',
      title: 'Smoked Saffron Pistachio Mille-Feuille',
      description: 'Caramelized puff pastry leaves layered with saffron blossom diplomat cream, Bronte pistachios, and 24K edible gold leaf.',
      pairing: '2017 Château d\'Yquem Premier Cru Supérieur, Sauternes'
    },
    {
      course: 'Course 07 &bull; Mignardises',
      title: 'Imperial Paan Bonbon & Saffron Dark Truffle',
      description: '70% Valrhona single-origin dark chocolate filled with betel leaf essence, gulkand rose jam, and saffron ganache.',
      pairing: 'Digestif & Masala Infused Single Cask Cognac'
    }
  ];

  const grandReserveCourses = [
    ...symphonyCourses,
    {
      course: 'Course 08 &bull; The Sea',
      title: 'Brittany Blue Lobster & Saffron Bisque',
      description: 'Gently poached blue lobster tail served with saffron saffron root chips and roasted sea-buckthorn coral butter.',
      pairing: '2020 Louis Latour Corton-Charlemagne Grand Cru'
    },
    {
      course: 'Course 09 &bull; Wood Fire',
      title: 'A5 Miyazaki Wagyu Ribcap & Saffron Bone Glaze',
      description: 'Charcoal-seared Japanese A5 Wagyu with fermented black garlic, roasted baby morels, and saffron jus.',
      pairing: '2016 Opus One, Napa Valley, California'
    },
    {
      course: 'Course 10 &bull; The Grand Finale',
      title: 'Kashmiri Kahwa Liquid Nitrogen Cloud',
      description: 'Green tea, crushed green cardamom, whole almonds, and Kashmiri saffron vaporized tableside.',
      pairing: '1982 Vintage Port, Quinta do Noval'
    }
  ];

  const courses = selectedExperience === 'symphony' ? symphonyCourses : grandReserveCourses;

  return (
    <div className="bg-[#0A0A0A] text-slate-200 min-h-screen">
      <SEOHead seo={tastingSEO} />

      {/* Hero Banner */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-neutral-800/80 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1800&q=80"
            alt="Fine dining table setting"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-serif tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Chef's Tasting Symphony</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white tracking-tight leading-tight">
            A Multi-Course Odyssey of Fire &amp; Saffron
          </h1>

          <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Curated daily by Executive Chef Marcus Sterling. An immersive gastronomic voyage showcasing hand-harvested Grade-A Kashmiri saffron and the pinnacle of global cellar vintages.
          </p>

          {/* Toggle Experience */}
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setSelectedExperience('symphony')}
              className={`px-6 py-3 rounded-full text-xs font-serif uppercase tracking-widest transition-all cursor-pointer ${
                selectedExperience === 'symphony'
                  ? 'bg-amber-500 text-black font-bold shadow-[0_0_25px_rgba(245,158,11,0.35)]'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              7-Course Symphony ($185 / Person)
            </button>
            <button
              onClick={() => setSelectedExperience('grand-reserve')}
              className={`px-6 py-3 rounded-full text-xs font-serif uppercase tracking-widest transition-all cursor-pointer ${
                selectedExperience === 'grand-reserve'
                  ? 'bg-amber-500 text-black font-bold shadow-[0_0_25px_rgba(245,158,11,0.35)]'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              10-Course Grand Reserve ($265 / Person)
            </button>
          </div>
        </div>
      </section>

      {/* Menu Detail Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16 space-y-2">
          <span className="text-[11px] font-sans uppercase tracking-[0.3em] text-amber-400 font-bold block">
            {selectedExperience === 'symphony' ? '7-Course Culinary Movement' : '10-Course Grand Reserve Anthology'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white">
            {selectedExperience === 'symphony' ? 'The Symphony Tasting Experience' : 'The Grand Imperial Reserve'}
          </h2>
          <p className="text-xs text-neutral-400 max-w-xl mx-auto">
            Optional Sommelier Reserve Wine Pairing: +$125 / +$175 per guest.
          </p>
        </div>

        <div className="space-y-8">
          {courses.map((c, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 bg-[#111111] rounded-2xl border border-neutral-800/80 hover:border-amber-500/40 transition-all duration-300 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-3">
                <span
                  className="text-[11px] font-mono text-amber-400 uppercase tracking-wider"
                  dangerouslySetInnerHTML={{ __html: c.course }}
                />
                <span className="text-xs text-neutral-500 font-serif italic">Course {idx + 1} of {courses.length}</span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
                {c.title}
              </h3>

              <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                {c.description}
              </p>

              <div className="pt-2 flex items-center gap-2 text-xs text-amber-300/90 font-serif italic bg-black/40 px-4 py-2.5 rounded-xl border border-neutral-800/60">
                <Wine className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  <strong className="text-neutral-400 not-italic font-sans text-[10px] uppercase tracking-wider mr-1.5">Sommelier Pairing:</strong>
                  {c.pairing}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Reservation CTA Box */}
        <div className="mt-16 p-8 sm:p-12 bg-gradient-to-br from-neutral-900 to-[#141414] rounded-3xl border border-amber-500/30 text-center space-y-6 shadow-2xl">
          <Award className="w-8 h-8 text-amber-400 mx-auto" />
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Reserve Your Tasting Experience
          </h3>
          <p className="text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed">
            Seating for our Tasting Experiences is limited to 24 guests per evening to ensure intimate, unhurried hospitality. Dietary adjustments gladly accommodated with 48 hours notice.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate('/contact')}
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-serif font-bold text-xs uppercase tracking-widest rounded-full shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-all cursor-pointer hover:scale-105"
            >
              Book Tasting Reservation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
