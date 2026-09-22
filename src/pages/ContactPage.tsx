import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { MapPin, Phone, Clock, Calendar, CheckCircle2, MessageCircle, Utensils, Award } from 'lucide-react';

interface ContactPageProps {
  navigate: (path: string) => void;
}

export function ContactPage({ navigate }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '2',
    date: new Date().toISOString().split('T')[0],
    time: '19:30',
    seatingZone: 'Hilltop Panoramic Terrace',
    dealInterest: 'none',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*Table Reservation Request - Margalla Hills*
• Guest Name: ${formData.name}
• Contact Phone: ${formData.phone}
• Date: ${formData.date}
• Time: ${formData.time}
• Party Size: ${formData.guests} Guests
• Preferred Seating: ${formData.seatingZone}
• Selected Deal: ${formData.dealInterest}
• Special Requests: ${formData.notes || 'None'}

Please confirm availability and table booking.`;

    const waUrl = `https://wa.me/923294785579?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
    setSubmitted(true);
  };

  const contactSEO = {
    seoTitle: 'Table Reservations | Margalla Hills Islamabad (Book on WhatsApp)',
    metaDescription: 'Reserve your dining table at Margalla Hills Islamabad directly via WhatsApp. Over 400+ fresh dishes, scenic mountain views, and deals under $15.',
    slug: 'contact',
    focusKeyword: 'margalla hills table reservation',
    secondaryKeywords: ['book table margalla hills', 'islamabad hillside dining booking', 'margalla hills whatsapp booking'],
    canonicalUrl: '/contact',
    robotsIndex: true,
    robotsFollow: true,
    ogTitle: 'Margalla Hills Table Reservation (WhatsApp Direct)',
    ogDescription: 'Instant table booking on WhatsApp for Margalla Hills Restaurant & Resort, Islamabad.',
    ogImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    schemaType: 'ContactPage' as const,
    searchIntent: 'Transactional' as const
  };

  const schemaContact = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Margalla Hills Table Reservations',
    mainEntity: {
      '@type': 'Restaurant',
      name: 'Margalla Hills Restaurant & Resort',
      telephone: '+92512800000',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Pir Sohawa Road, Margalla Hills',
        addressLocality: 'Islamabad',
        addressRegion: 'ICT',
        postalCode: '44000',
        addressCountry: 'PK'
      }
    }
  };

  return (
    <div className="bg-[#0A0A0A] text-slate-200 min-h-screen py-16">
      <SEOHead
        seo={contactSEO}
        schemaData={schemaContact}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-widest">
            <Calendar className="w-3.5 h-3.5" />
            <span>Direct WhatsApp Table Booking</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white leading-tight">
            Reserve Your Table at Margalla Hills
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed font-sans font-light">
            Fast, instant confirmation directly to our restaurant manager on WhatsApp. No emails, no waiting. Over 400+ dishes all capped under $15.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Reservation Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#121212] rounded-3xl p-7 sm:p-10 border border-neutral-800 shadow-2xl">
              {submitted ? (
                <div className="text-center py-12 space-y-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-3xl font-bold text-white">
                    Reservation Request Dispatched
                  </h3>
                  <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.name || 'Valued Guest'}</strong>! Your reservation details for <strong>{formData.guests} guests</strong> have been opened in WhatsApp. Our host at Margalla Hills will reply momentarily to lock in your table.
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href="https://wa.me/923294785579"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-mono font-bold rounded-xl text-xs uppercase tracking-wider transition flex items-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      <span>Open WhatsApp Manager</span>
                    </a>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-amber-400 border border-neutral-700 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
                    >
                      Book Another Table
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-neutral-800 pb-3 flex items-center justify-between">
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-white">
                        Table Reservation
                      </h2>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        Guaranteed hill view &bull; Direct confirmation on WhatsApp
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
                      WhatsApp Only
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Tariq Mehmood"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-[#0A0A0A] border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="0300-1234567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-[#0A0A0A] border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                        Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date as any}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-3 bg-[#0A0A0A] border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                        Time Slot *
                      </label>
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full px-4 py-3 bg-[#0A0A0A] border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                      >
                        <option value="12:30">12:30 PM (Lunch)</option>
                        <option value="14:00">2:00 PM (Afternoon)</option>
                        <option value="17:00">5:00 PM (Sunset High Tea)</option>
                        <option value="18:30">6:30 PM (Early Dinner)</option>
                        <option value="19:30">7:30 PM (Prime Dinner)</option>
                        <option value="21:00">9:00 PM (Late Hill Feast)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                        Number of Guests *
                      </label>
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full px-4 py-3 bg-[#0A0A0A] border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                      >
                        <option value="2">2 Guests</option>
                        <option value="4">4 Guests</option>
                        <option value="6">6 Guests</option>
                        <option value="8">8 Guests</option>
                        <option value="12">12+ Guests (Family Event)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                        Seating Zone
                      </label>
                      <select
                        value={formData.seatingZone}
                        onChange={(e) => setFormData({ ...formData, seatingZone: e.target.value })}
                        className="w-full px-4 py-3 bg-[#0A0A0A] border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="Hilltop Panoramic Terrace">Hilltop Panoramic Terrace (City &amp; Peak View)</option>
                        <option value="Executive Family Gazebo">Executive Family Gazebo (Private Cabin)</option>
                        <option value="Sunset Lawn Deck">Sunset Lawn Deck (Open Air)</option>
                        <option value="Royal Heritage Indoor Lounge">Royal Heritage Indoor Lounge (AC)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                        Interested in a Deal? (Optional)
                      </label>
                      <select
                        value={formData.dealInterest}
                        onChange={(e) => setFormData({ ...formData, dealInterest: e.target.value })}
                        className="w-full px-4 py-3 bg-[#0A0A0A] border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="none">No Deal / A La Carte Menu</option>
                        <option value="Margalla Hillside Sunset Feast ($14.50)">Margalla Hillside Sunset Feast ($14.50)</option>
                        <option value="BBQ Lovers Mega Platter ($13.99)">BBQ Lovers Mega Platter ($13.99)</option>
                        <option value="Family Stone-Baked Pizza Feast ($14.99)">Family Stone-Baked Pizza Feast ($14.99)</option>
                        <option value="Solo Executive Burger Combo ($7.99)">Solo Executive Burger Combo ($7.99)</option>
                        <option value="Mutton Shinwari Quick Treat ($14.99)">Mutton Shinwari Quick Treat ($14.99)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                      Special Notes (Birthday, Anniversary, Spicy Level, High Chair)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Need high-chair for toddler, preferred corner table for sunset photography..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0A0A0A] border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 resize-none"
                    />
                  </div>

                  {/* HEAVY BOOK BUTTON */}
                  <button
                    type="submit"
                    className="w-full py-4 px-6 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-serif font-black text-sm uppercase tracking-wider rounded-xl transition-all shadow-[0_0_30px_rgba(245,158,11,0.5)] cursor-pointer hover:scale-[1.01] flex items-center justify-center gap-3 border border-amber-300"
                  >
                    <Calendar className="w-5 h-5 text-black" />
                    <span>RESERVE TABLE ON WHATSAPP (INSTANT)</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Info: WhatsApp & Margalla Hills Location (NO EMAIL) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#121212] rounded-3xl p-7 border border-neutral-800 space-y-5 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                  <MessageCircle className="w-5 h-5 fill-emerald-400" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">Direct WhatsApp Manager</h3>
                  <p className="text-xs text-neutral-400">Instant Customer Care &amp; Bookings</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-neutral-300">
                <div className="p-4 bg-emerald-950/40 rounded-2xl border border-emerald-500/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">Official WhatsApp Desk</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                  <p className="text-xs text-neutral-300">
                    Instant table bookings, event catering inquiries, and food orders confirmed directly via WhatsApp.
                  </p>
                  <a
                    href="https://wa.me/923294785579?text=Hello%20Margalla%20Hills%2C%20I%20have%20an%20inquiry%20about%20table%20reservation%20or%20food%20order."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-md"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Order &amp; Reserve via WhatsApp</span>
                  </a>
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-sans">Margalla Hills Restaurant &amp; Resort</strong>
                    <span className="text-neutral-400 text-xs">Pir Sohawa Road, Margalla Hills, Islamabad, Pakistan</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-white text-xs">Direct Support via WhatsApp Online Desk</span>
                </div>
              </div>
            </div>

            <div className="bg-[#121212] rounded-3xl p-7 border border-neutral-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">Dining Hours</h3>
                  <p className="text-xs text-neutral-400">Open 7 Days a Week</p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-neutral-300 border-t border-neutral-800 pt-3 font-mono">
                <div className="flex justify-between">
                  <span>Mon &ndash; Thu:</span>
                  <span className="text-white">12:00 PM &ndash; 1:00 AM</span>
                </div>
                <div className="flex justify-between">
                  <span>Fri &ndash; Sun:</span>
                  <span className="text-white">12:00 PM &ndash; 2:00 AM</span>
                </div>
                <div className="flex justify-between text-amber-400">
                  <span>Sunset Hilltop Hours:</span>
                  <span>5:00 PM &ndash; 8:00 PM</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-amber-500/10 to-transparent rounded-3xl border border-amber-500/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest font-serif">
                <Award className="w-4 h-4" />
                <span>Price &amp; Quality Guarantee</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                Every dish on our 400+ item menu and all exclusive combo deals are guaranteed under $15 max rate. Valet parking and outdoor heaters available.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
