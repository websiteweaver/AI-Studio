import React from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle,
  Phone,
  MapPin,
  Clock,
  ChevronRight,
  Star,
  Menu,
  X,
  Shield,
  Stethoscope,
  Smile,
  Sparkles,
  Activity,
  Droplets,
  Zap,
  Award,
  Microscope,
  ShieldCheck
} from 'lucide-react';

// Helper for conditional class names
const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

function App() {
  return (
    <div className="min-h-screen bg-white text-navy-900 selection:bg-emerald-200 selection:text-navy-900">
      {/* Top Bar */}
      <div className="bg-navy-900 text-white/80 py-2 px-4 md:px-8 text-xs font-medium flex justify-between items-center hidden md:flex">
        <div className="flex items-center space-x-6">
          <span className="flex items-center"><MapPin className="w-3 h-3 mr-2 text-emerald-400" /> Ashrafieh, Beirut, Lebanon</span>
          <span className="flex items-center"><Clock className="w-3 h-3 mr-2 text-emerald-400" /> Mon-Sat: 9:00 AM - 7:00 PM</span>
        </div>
        <div className="flex items-center space-x-4">
          <a href="tel:+9611234567" className="flex items-center hover:text-white transition-colors">
            <Phone className="w-3 h-3 mr-2 text-emerald-400" /> +961 1 234 567
          </a>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-navy-100 py-4 px-4 md:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-navy-900 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="font-heading font-bold text-xl tracking-tight text-navy-900">
            AESTHETICA<span className="text-emerald-600 font-light">CLINIC</span>
          </span>
        </div>
        
        <div className="hidden md:flex space-x-8 text-sm font-medium text-navy-700">
          <a href="#services" className="hover:text-emerald-600 transition-colors">Services</a>
          <a href="#about" className="hover:text-emerald-600 transition-colors">About Us</a>
          <a href="#location" className="hover:text-emerald-600 transition-colors">Location</a>
        </div>

        <button className="bg-navy-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-navy-800 transition-colors shadow-lg shadow-navy-900/20 flex items-center">
          Book Consultation
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-48 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-10"></div>
          <img 
            src="/hero-clinic.jpg" 
            alt="Modern Dental Clinic" 
            className="w-full h-full object-cover object-right"
          />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold tracking-wider uppercase mb-6">
                Premium Care in Beirut
              </span>
              <h1 className="text-5xl lg:text-7xl font-heading font-bold leading-[1.1] text-navy-900 mb-6">
                Your Smile,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-900 to-emerald-600">Reimagined.</span>
              </h1>
              <p className="text-lg text-navy-600 mb-10 max-w-lg leading-relaxed">
                Advanced Dental & Aesthetic Care in the Heart of Beirut. Experience world-class treatments in a luxurious, state-of-the-art environment.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="bg-emerald-600 text-white px-8 py-4 rounded-full font-medium hover:bg-emerald-700 transition-colors shadow-xl shadow-emerald-600/20 flex items-center justify-center group">
                  Book Your Consultation
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 rounded-full font-medium text-navy-900 border border-navy-200 hover:border-navy-900 hover:bg-navy-50 transition-all flex items-center justify-center">
                  Explore Services
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-24 bg-navy-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy-900 mb-4">Excellence in Every Detail</h2>
            <p className="text-navy-600">Comprehensive dental and aesthetic solutions tailored to your unique needs, utilizing the latest advancements in medical technology.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Sparkles className="w-6 h-6" />,
                title: 'Cosmetic Dentistry',
                desc: 'Veneers, whitening, and complete smile makeovers for a flawless appearance.'
              },
              {
                icon: <Activity className="w-6 h-6" />,
                title: 'Orthodontics',
                desc: 'Invisible aligners and advanced braces for perfect alignment.'
              },
              {
                icon: <Droplets className="w-6 h-6" />,
                title: 'Dermatology',
                desc: 'Premium skin care, anti-aging treatments, and facial rejuvenation.'
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: 'Laser Treatments',
                desc: 'Pain-free, precise laser therapies for skin and dental procedures.'
              }
            ].map((service, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-navy-100 hover:shadow-xl transition-shadow group"
              >
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-heading font-bold text-navy-900 mb-3">{service.title}</h3>
                <p className="text-navy-600 text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -inset-4 bg-emerald-50 rounded-3xl -z-10 transform rotate-3"></div>
                <img 
                  src="/dentist.jpg" 
                  alt="Professional Dentist" 
                  className="rounded-2xl shadow-2xl object-cover w-full h-[500px]"
                />
                <div className="absolute -bottom-8 -right-8 bg-navy-900 text-white p-6 rounded-2xl shadow-xl hidden md:block">
                  <div className="text-4xl font-heading font-bold text-emerald-400 mb-1">15+</div>
                  <div className="text-sm font-medium text-navy-200">Years of<br/>Excellence</div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy-900 mb-6">Why Choose Aesthetica?</h2>
              <p className="text-navy-600 mb-8 text-lg">
                We blend artistry with advanced medical science to deliver unparalleled results. Our clinic is designed to provide a serene, luxurious experience while ensuring the highest standards of clinical excellence.
              </p>
              
              <div className="space-y-6">
                {[
                  {
                    icon: <Award className="w-5 h-5 text-emerald-600" />,
                    title: 'World-Class Specialists',
                    desc: 'Our team comprises internationally trained experts in dentistry and aesthetics.'
                  },
                  {
                    icon: <Microscope className="w-5 h-5 text-emerald-600" />,
                    title: 'State-of-the-Art Technology',
                    desc: 'Equipped with the latest diagnostic and treatment technologies for precision care.'
                  },
                  {
                    icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
                    title: 'Uncompromising Safety',
                    desc: 'Strict sterilization protocols and a sterile, minimalist environment you can trust.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-navy-900 mb-1">{item.title}</h4>
                      <p className="text-navy-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-24 bg-navy-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-navy-800 transform skew-x-12 translate-x-32 -z-10 hidden lg:block"></div>
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/3">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Find Us in Ashrafieh</h2>
              <p className="text-navy-200 mb-8">Located in the prestigious Ashrafieh district, our clinic offers convenient access with private parking available for our patients.</p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-emerald-400 shrink-0" />
                  <div>
                    <h4 className="font-bold mb-1">Address</h4>
                    <p className="text-navy-200 text-sm">Charles Malek Avenue<br/>Quantum Tower, 4th Floor<br/>Ashrafieh, Beirut, Lebanon</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-emerald-400 shrink-0" />
                  <div>
                    <h4 className="font-bold mb-1">Hours</h4>
                    <p className="text-navy-200 text-sm">Monday - Friday: 9:00 AM - 7:00 PM<br/>Saturday: 9:00 AM - 2:00 PM<br/>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-2/3 w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl border border-navy-700">
              {/* Placeholder for Google Map */}
              <div className="w-full h-full bg-navy-800 flex items-center justify-center relative">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
                <div className="text-center z-10">
                  <MapPin className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                  <p className="text-navy-200 font-medium">Interactive Map Integration</p>
                  <p className="text-sm text-navy-400 mt-2">Ashrafieh, Beirut</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-950 text-navy-300 py-12 border-t border-navy-800">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-navy-800 rounded-lg flex items-center justify-center">
                <Smile className="w-8 h-8 text-emerald-500" />
                <span className="text-xl font-bold ml-2">AESTHETICA</span>
              </div>
              <span className="font-heading font-bold text-xl tracking-tight text-white">
                AESTHETICA<span className="text-emerald-500 font-light">CLINIC</span>
              </span>
            </div>
            
            <div className="text-sm">
              &copy; {new Date().getFullYear()} Aesthetica Clinic Beirut. All rights reserved.
            </div>
            
            <div>
              <button className="flex items-center gap-2 bg-emerald-600/10 text-emerald-400 hover:bg-emerald-600 hover:text-white px-6 py-3 rounded-full transition-all border border-emerald-600/20">
                <MessageCircle className="w-5 h-5" />
                <span>Direct Chat</span>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/9611234567" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute right-16 bg-white text-navy-900 text-sm px-4 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-medium">
          Chat with us
        </span>
      </a>
    </div>
  );
}

export default App;
