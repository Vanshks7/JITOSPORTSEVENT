import React from 'react';
import { Scale, CheckCircle2 } from 'lucide-react';

export default function TermsSection() {
  return (
    <div
      id="section-rules"
      className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4"
    >
      <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
        <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-lg font-black flex-shrink-0">
          <Scale className="w-5 h-5 text-amber-700" />
        </div>
        <div>
          <h2 className="text-lg font-black text-slate-900 font-heading">
            Tournament Terms & Conditions
          </h2>
          <p className="text-xs text-slate-500">
            Official tournament guidelines for JITO Ahmedabad CCG Sports 2026-27
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600 leading-relaxed">
        {/* Rule 1 */}
        <div className="p-4 sm:p-5 bg-slate-50/90 rounded-2xl border border-slate-200 space-y-2">
          <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs font-heading">
            <CheckCircle2 className="w-4 h-4 text-[#008F3D] flex-shrink-0" />
            <span>1. Slot Allocation & Limits</span>
          </div>
          <p>
            • Each player is allowed a maximum of <strong className="text-slate-800">4 total 30-minute slots</strong> across the event tournament edition.
          </p>
          <p>
            • A maximum of <strong className="text-slate-800">2 slots per sport</strong> is strictly enforced (e.g., maximum two 30-minute intervals in Pickleball).
          </p>
          <p>
            • Simultaneous / double-booking in two different sports during the exact same time slot is automatically locked by the system.
          </p>
        </div>

        {/* Rule 2 */}
        <div className="p-4 sm:p-5 bg-slate-50/90 rounded-2xl border border-slate-200 space-y-2">
          <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs font-heading">
            <CheckCircle2 className="w-4 h-4 text-[#008F3D] flex-shrink-0" />
            <span>2. Partner & Squad Booking Policy</span>
          </div>
          <p>
            • When booking a squad for Pickleball or Paddle Ball, entering a teammate's Player ID immediately consumes 1 slot from their 4-slot quota.
          </p>
          <p>
            • If a teammate is already occupied in any sport during that time slot, the booking will be prevented by the anti-clash engine.
          </p>
          <p>
            • Player IDs must belong to pre-registered JITO participants with uploaded identity photos.
          </p>
        </div>

        {/* Rule 3 */}
        <div className="p-4 sm:p-5 bg-slate-50/90 rounded-2xl border border-slate-200 space-y-2">
          <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs font-heading">
            <CheckCircle2 className="w-4 h-4 text-[#008F3D] flex-shrink-0" />
            <span>3. Court Attire & Footwear</span>
          </div>
          <p>
            • <strong className="text-slate-800">Non-marking gum-sole sports shoes</strong> are mandatory for Pickleball and Paddle Ball courts. Running shoes with black soles are strictly prohibited.
          </p>
          <p>
            • Appropriate sports apparel representing the sporting spirit of JITO is mandatory at all courts and arenas.
          </p>
        </div>

        {/* Rule 4 */}
        <div className="p-4 sm:p-5 bg-slate-50/90 rounded-2xl border border-slate-200 space-y-2">
          <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs font-heading">
            <CheckCircle2 className="w-4 h-4 text-[#008F3D] flex-shrink-0" />
            <span>4. Reporting & Verification</span>
          </div>
          <p>
            • Players must report to the registration desk <strong className="text-slate-800">15 minutes prior</strong> to their confirmed match time.
          </p>
          <p>
            • Entry is subject to photo identity verification using the digital QR/pass issued upon reservation completion.
          </p>
          <p>
            • The JITO Sports Committee reserves the right to reassign or adjust courts in the event of inclement weather or operational requirements.
          </p>
        </div>
      </div>
    </div>
  );
}
