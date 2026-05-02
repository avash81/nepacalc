'use client';
import { useState } from 'react';
import { Mail, MessageCircle, MapPin, Globe, Sparkles, Send } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const formData = new FormData(e.currentTarget);
      formData.append("access_key", "c586563b-a562-4be1-85ae-8d960e884b23");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      
      if (data.success) {
        setStatus('success');
      } else {
        alert("Error: " + data.message);
        setStatus('idle');
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
      setStatus('idle');
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-12">
      {/* Header Banner */}
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-6 h-6 text-[#1A73E8]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 tracking-tight">Let's <span className="text-[#1A73E8]">Connect.</span></h1>
          <p className="text-base text-gray-500 font-medium max-w-2xl mx-auto">
            Have a feature request, spotted a bug, or need to reach our research team? Send us a message.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-5 gap-6">
        
        {/* Contact Info Sidebar */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <Mail className="w-6 h-6 text-[#1A73E8]" />
              <Sparkles className="w-4 h-4 text-blue-200" />
            </div>
            <h2 className="text-lg font-black text-gray-900 mb-2">Direct Contact</h2>
            <p className="text-xs text-gray-400 mb-4 font-bold uppercase tracking-wider">Available 24/7</p>
            <div className="flex flex-col gap-3">
              <div>
                <p className="text-xs text-gray-500 font-bold mb-1">General Support:</p>
                <a href="mailto:admin@nepacalc.com" className="text-sm font-bold text-[#1A73E8] hover:underline">admin@nepacalc.com</a>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold mb-1">Media & Partnerships:</p>
                <a href="mailto:admin@nepacalc.com" className="text-sm font-bold text-gray-800 hover:underline">admin@nepacalc.com</a>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 text-white shadow-sm">
            <div className="mb-4">
              <Globe className="w-6 h-6 text-blue-400" />
            </div>
            <h2 className="text-lg font-black mb-2">100% Online</h2>
            <p className="text-[10px] font-bold text-gray-400 mb-4 uppercase tracking-[0.2em]">Based in Nepal</p>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs font-bold text-gray-300">Remote Operations</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gray-500" />
                <span className="text-xs font-bold text-gray-400">Serving all of Nepal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 h-full">
            <h2 className="text-2xl font-black text-gray-900 mb-2">Send a Message</h2>
            <p className="text-gray-500 mb-8 text-sm">We typically respond within 24-48 hours. Request a new calculator or report an issue with an existing one.</p>
            
            {status === 'success' ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent Successfully!</h3>
                <p className="text-gray-600">Thank you for reaching out. The NepaCalc team will get back to you shortly.</p>
                <button onClick={() => setStatus('idle')} className="mt-6 text-[#1A73E8] font-bold hover:underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label htmlFor="name" className="text-sm font-bold text-gray-700">Your Name</label>
                    <input type="text" id="name" name="name" required disabled={status === 'submitting'} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent outline-none transition-all disabled:opacity-50" placeholder="John Doe" />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="email" className="text-sm font-bold text-gray-700">Email Address</label>
                    <input type="email" id="email" name="email" required disabled={status === 'submitting'} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent outline-none transition-all disabled:opacity-50" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label htmlFor="subject" className="text-sm font-bold text-gray-700">Subject</label>
                  <select id="subject" name="subject" required disabled={status === 'submitting'} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent outline-none transition-all disabled:opacity-50">
                    <option value="">Select a topic...</option>
                    <option value="calculator_request">Suggest a New Calculator</option>
                    <option value="bug_report">Report a Bug / Calculation Error</option>
                    <option value="business">Business / Partnership Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label htmlFor="message" className="text-sm font-bold text-gray-700">Message</label>
                  <textarea id="message" name="message" required disabled={status === 'submitting'} rows={5} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent outline-none transition-all disabled:opacity-50 resize-none" placeholder="How can we help you today?"></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className="w-full bg-[#1A73E8] hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send Message <Send className="w-4 h-4" />
                    </span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
