import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export const metadata = {
  title: 'Contact Us | Aarambh \'26',
  description: 'Official contact directory for Aarambh \'26 at JK Lakshmipat University.',
  openGraph: {
    title: 'Contact Us | Aarambh \'26',
    description: 'Official contact directory for Aarambh \'26 at JK Lakshmipat University.',
    type: 'website',
  }
};

export default function ContactPage() {
  const contactDirectory = [
    {
      department: "Registrar",
      phone: "+91 141 7107500",
      email: "registrar@jklu.edu.in",
      bgColor: "bg-brand-pink text-white"
    },
    {
      department: "Admissions",
      phone: "+91 830 222 3344",
      email: "admissions@jklu.edu.in",
      bgColor: "bg-brand-orange text-brand-ink"
    },
    {
      department: "Placements",
      phone: "+91 987 172 2735",
      email: "placements@jklu.edu.in",
      bgColor: "bg-brand-blue text-white"
    },
    {
      department: "Human Resources",
      email: "hr@jklu.edu.in",
      bgColor: "bg-brand-ink text-white"
    },
    {
      department: "Media",
      phone: "+91 830 222 3344",
      email: "gokul.bhagabati@jklu.edu.in",
      bgColor: "bg-brand-cloud text-brand-ink border-2 border-brand-ink"
    }
  ];

  return (
    <div className="py-28 px-6 max-w-5xl mx-auto min-h-screen relative selection:bg-brand-ink selection:text-brand-cloud text-brand-ink bg-brand-cloud">
      {/* Decorative layout elements */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-80 h-80 bg-brand-pink/5 rounded-full blur-[90px] pointer-events-none" />

      <header className="text-center mb-16 relative z-10">
        <h1 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight mb-4 drop-shadow-[2px_2px_0px_rgba(3,4,4,0.1)]">
          Contact Us
        </h1>
        <div className="w-24 h-1.5 bg-brand-orange mx-auto" />
      </header>

      {/* Main Grid Layout */}
      <div className="space-y-8 relative z-10">
        
        {/* Campus Address Card */}
        <div className="bg-white border-4 border-brand-ink p-8 rounded-lg shadow-[6px_6px_0px_0px_#030404] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">

            <h3 className="text-2xl font-display font-black uppercase leading-none text-brand-ink">
              Aarambh 2026
            </h3>
            <p className="font-mono text-xs text-brand-ink/75 leading-relaxed font-bold max-w-xl">
              Welcome to the official contact directory of the Aarambh Annual Orientation Program. For any queries, reach out to our team coordinators or administrative representatives listed below.
            </p>
          </div>
          
          <div className="w-full md:w-auto p-5 border-2 border-brand-ink bg-brand-cloud rounded flex items-start gap-3.5 font-mono text-xs font-bold shadow-comic-sm">
            <MapPin size={20} className="text-brand-pink shrink-0 mt-0.5" />
            <div>
              <h4 className="text-brand-ink uppercase font-black tracking-wider mb-1">Campus Address</h4>
              <p className="text-brand-ink/75 leading-relaxed max-w-xs md:max-w-sm">
                JK Lakshmipat University, Near Mahindra SEZ, Ajmer Road, Jaipur, Rajasthan 302026
              </p>
            </div>
          </div>
        </div>

        {/* University Administration Contacts */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-display font-black uppercase tracking-tight mb-2">
              University Administration
            </h2>
            <div className="w-16 h-1 bg-brand-ink mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactDirectory.map((contact, index) => (
              <div
                key={index}
                className="bg-white border-4 border-brand-ink rounded-lg shadow-[6px_6px_0px_0px_#030404] overflow-hidden flex flex-col h-full animate-fadeIn"
              >
                {/* Department Header */}
                <div className={`p-5 flex items-center justify-between border-b-4 border-brand-ink ${contact.bgColor}`}>
                  <h3 className="font-display font-black uppercase text-base tracking-wider">
                    {contact.department}
                  </h3>
                </div>

                {/* Department Contact Details */}
                <div className="p-6 flex-1 flex flex-col justify-center font-mono text-xs font-bold space-y-4">
                  {contact.phone && (
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 border-2 border-brand-ink bg-brand-cloud text-brand-ink flex items-center justify-center rounded shrink-0 shadow-comic-sm">
                        <Phone size={14} />
                      </div>
                      <div>
                        <span className="text-[9px] font-black text-brand-ink/40 uppercase block leading-none mb-1">Phone</span>
                        <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="hover:text-brand-pink transition-colors">
                          {contact.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 border-2 border-brand-ink bg-brand-cloud text-brand-ink flex items-center justify-center rounded shrink-0 shadow-comic-sm">
                      <Mail size={14} />
                    </div>
                    <div>
                      <span className="text-[9px] font-black text-brand-ink/40 uppercase block leading-none mb-1">Email</span>
                      <a href={`mailto:${contact.email}`} className="hover:text-brand-pink transition-colors break-all">
                        {contact.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Aarambh '26 Committee / Team Heads */}
        <div className="pt-8 space-y-12">
          
          {/* Organizing Heads */}
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-display font-black uppercase tracking-tight mb-2">
                Organizing Heads
              </h2>
              <div className="w-16 h-1 bg-brand-pink mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Vedika Agrawal", phone: "+91 97722 19303", email: "vedikaagrawal@jklu.edu.in", bgColor: "bg-brand-pink text-white" },
                { name: "Aman Pratap Singh", phone: "+91 94566 08637", email: "amanpratapsingh@jklu.edu.in", bgColor: "bg-brand-orange text-brand-ink" },
                { name: "Vaishnavi Shukla", phone: "+91 87692 76288", email: "vaishnavishukla@jklu.edu.in", bgColor: "bg-brand-blue text-white" },
                { name: "Tanik Gupta", phone: "+91 99293 96663", email: "tanikgupta@jklu.edu.in", bgColor: "bg-brand-ink text-white" },
                { name: "Ambika Dalmia", phone: "+91 96792 20337", email: "ambikadalmia@jklu.edu.in", bgColor: "bg-brand-cloud text-brand-ink border-2 border-brand-ink" }
              ].map((head, index) => (
                <div
                  key={index}
                  className="bg-white border-4 border-brand-ink rounded-lg shadow-[6px_6px_0px_0px_#030404] overflow-hidden flex flex-col h-full"
                >
                  <div className={`p-5 border-b-4 border-brand-ink ${head.bgColor}`}>
                    <h3 className="font-display font-black uppercase text-base tracking-wider">
                      {head.name}
                    </h3>
                    <span className="text-[10px] uppercase font-mono font-black opacity-80 block mt-0.5">Organizing Head</span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-center font-mono text-xs font-bold space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 border-2 border-brand-ink bg-brand-cloud text-brand-ink flex items-center justify-center rounded shrink-0 shadow-comic-sm">
                        <Phone size={14} />
                      </div>
                      <div>
                        <span className="text-[9px] font-black text-brand-ink/40 uppercase block leading-none mb-1">Phone</span>
                        <a href={`tel:${head.phone.replace(/\s+/g, '')}`} className="hover:text-brand-pink transition-colors">
                          {head.phone}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 border-2 border-brand-ink bg-brand-cloud text-brand-ink flex items-center justify-center rounded shrink-0 shadow-comic-sm">
                        <Mail size={14} />
                      </div>
                      <div>
                        <span className="text-[9px] font-black text-brand-ink/40 uppercase block leading-none mb-1">Email</span>
                        <a href={`mailto:${head.email}`} className="hover:text-brand-pink transition-colors break-all">
                          {head.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Committee Heads */}
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-display font-black uppercase tracking-tight mb-2">
                Technical Heads
              </h2>
              <div className="w-16 h-1 bg-brand-blue mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {[
                { name: "Devam Gupta", phone: "+91 73400 15201", email: "devamgupta@jklu.edu.in", bgColor: "bg-brand-blue text-white" },
                { name: "Yash Bansal", phone: "+91 86190 11601", email: "yashbansal@jklu.edu.in", bgColor: "bg-brand-pink text-white" }
              ].map((head, index) => (
                <div
                  key={index}
                  className="bg-white border-4 border-brand-ink rounded-lg shadow-[6px_6px_0px_0px_#030404] overflow-hidden flex flex-col h-full"
                >
                  <div className={`p-5 border-b-4 border-brand-ink ${head.bgColor}`}>
                    <h3 className="font-display font-black uppercase text-base tracking-wider">
                      {head.name}
                    </h3>
                    <span className="text-[10px] uppercase font-mono font-black opacity-80 block mt-0.5">Technical Team Leader</span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-center font-mono text-xs font-bold space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 border-2 border-brand-ink bg-brand-cloud text-brand-ink flex items-center justify-center rounded shrink-0 shadow-comic-sm">
                        <Phone size={14} />
                      </div>
                      <div>
                        <span className="text-[9px] font-black text-brand-ink/40 uppercase block leading-none mb-1">Phone</span>
                        <a href={`tel:${head.phone.replace(/\s+/g, '')}`} className="hover:text-brand-pink transition-colors">
                          {head.phone}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 border-2 border-brand-ink bg-brand-cloud text-brand-ink flex items-center justify-center rounded shrink-0 shadow-comic-sm">
                        <Mail size={14} />
                      </div>
                      <div>
                        <span className="text-[9px] font-black text-brand-ink/40 uppercase block leading-none mb-1">Email</span>
                        <a href={`mailto:${head.email}`} className="hover:text-brand-pink transition-colors break-all">
                          {head.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
