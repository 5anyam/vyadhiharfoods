// app/founder-story/page.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Target, TrendingUp, Lightbulb, Users, Award, ArrowLeft, Sparkles } from 'lucide-react';

export default function FounderStoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#FFF8DC] to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#5D4E37] via-[#8B7355] to-[#5D4E37] text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4A574]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C19A6B]/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full mb-6 border border-white/30">
            <Heart className="w-4 h-4" />
            <span className="text-sm font-semibold">Our Story</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            The Journey of Keshav Sharma
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Founder of Vyadhihar Foods
          </p>
          
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Home</span>
          </Link>
        </div>
      </section>

      {/* Timeline Story with Sticky Image */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* Sticky Founder Image - Left Side */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-24">
                <div className="bg-gradient-to-br from-[#D4A574] via-[#C19A6B] to-[#8B7355] p-2 rounded-3xl shadow-2xl">
                  <div className="bg-white rounded-2xl overflow-hidden">
                    <div className="relative aspect-[3/4]">
                      <Image
                        src="/founder.jpg"
                        alt="Keshav Sharma - Founder of Vyadhihar Foods"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                    <div className="p-6 bg-gradient-to-br from-[#FFF8DC] to-white">
                      <h3 className="text-2xl font-bold text-[#5D4E37] mb-2">Keshav Sharma</h3>
                      <p className="text-[#8B7355] font-semibold mb-4">Founder & CEO</p>
                      <div className="flex items-center gap-2 text-sm text-[#5D4E37]">
                        <Sparkles className="w-4 h-4 text-[#D4A574]" />
                        <span>Building India Healthiest Snack Brand</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="mt-6 bg-white border-2 border-[#D4A574]/30 rounded-2xl p-6 shadow-lg">
                  <h4 className="text-lg font-bold text-[#5D4E37] mb-4">Quick Facts</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#D4A574]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Target className="w-5 h-5 text-[#D4A574]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#5D4E37]">Vision</p>
                        <p className="text-xs text-gray-600">India #1 Healthy Snack Brand</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#C19A6B]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 h-5 text-[#C19A6B]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#5D4E37]">Impact</p>
                        <p className="text-xs text-gray-600">Serving Healthy Lives Daily</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#8B7355]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Award className="w-5 h-5 text-[#8B7355]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#5D4E37]">Approach</p>
                        <p className="text-xs text-gray-600">100% Natural Ingredients</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Content - Right Side */}
            <div className="lg:col-span-8">
              
              {/* The Beginning */}
              <div className="mb-16 relative">
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#D4A574] to-[#C19A6B] rounded-full hidden md:block"></div>
                
                <div className="md:pl-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#D4A574] to-[#C19A6B] rounded-full flex items-center justify-center shadow-lg">
                      <Lightbulb className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-[#5D4E37]">The Beginning</h2>
                  </div>
                  
                  <div className="bg-white border-2 border-[#D4A574]/30 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
                    <p className="text-lg text-[#5D4E37] leading-relaxed mb-4">
                      I come from a business family, but I never wanted to just continue the legacy. 
                      I wanted to build something of my own—something that would help people live healthier lives. 
                      That is where my journey as an entrepreneur truly began.
                    </p>
                    <p className="text-lg text-[#5D4E37] leading-relaxed">
                      The idea for fruit boxes came from Korea. I saw how people there bought fresh fruits 
                      in clean, attractive PET jars. I thought, why can not we bring that to India? 
                      Especially for corporate employees—people working long hours in MNCs who still care 
                      about what they eat.
                    </p>
                  </div>
                </div>
              </div>

              {/* The Hustle */}
              <div className="mb-16 relative">
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#D4A574] to-[#C19A6B] rounded-full hidden md:block"></div>
                
                <div className="md:pl-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#C19A6B] to-[#8B7355] rounded-full flex items-center justify-center shadow-lg">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-[#5D4E37]">The Hustle</h2>
                  </div>
                  
                  <div className="bg-white border-2 border-[#D4A574]/30 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
                    <p className="text-lg text-[#5D4E37] leading-relaxed mb-4">
                      In the beginning, I worked alone—packing, visiting offices, pitching the idea door to door. 
                      My first meeting was with Medanta Hospital in Gurgaon. The deal did not go through, but I did not stop. 
                      Every day I went to Cyber City, Gurgaon, moving from one office to another, introducing myself and saying,
                    </p>
                    <blockquote className="border-l-4 border-[#D4A574] pl-6 py-4 my-6 italic text-lg text-[#5D4E37] bg-[#FFF8DC]/50 rounded-r-xl">
                      Sir, this is my product—would you like to introduce it in your company?
                    </blockquote>
                    <p className="text-lg text-[#5D4E37] leading-relaxed">
                      For months, I kept doing the same thing. Rejections were constant, but I kept learning.
                    </p>
                  </div>
                </div>
              </div>

              {/* The Big Opportunity (and Loss) */}
              <div className="mb-16 relative">
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#D4A574] to-[#C19A6B] rounded-full hidden md:block"></div>
                
                <div className="md:pl-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#D4A574] to-[#C19A6B] rounded-full flex items-center justify-center shadow-lg">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-[#5D4E37]">The Big Opportunity (and Loss)</h2>
                  </div>
                  
                  <div className="bg-white border-2 border-[#D4A574]/30 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
                    <p className="text-lg text-[#5D4E37] leading-relaxed mb-4">
                      Then came a breakthrough opportunity—Dell showed interest in my fruit boxes. 
                      They were ready to order 500 boxes per day, but wanted to check samples first.
                    </p>
                    <p className="text-lg text-[#5D4E37] leading-relaxed mb-4">
                      The truth was—I did not even have real boxes yet. I had no packaging company, no samples, 
                      just a few images and a mock box made out of scrap material. Still, I showed them my vision confidently. 
                      Dell liked the concept and asked for the final product.
                    </p>
                    <p className="text-lg text-[#5D4E37] leading-relaxed mb-4">
                      That is when I found a box manufacturer and placed the order. But the manufacturer took 22 days to deliver, 
                      while Dell kept asking, <strong>Where is the box? </strong> Eventually, the delay cost me the deal—a deal worth crores—lost 
                      because of poor timing and dependency.
                    </p>
                    <div className="bg-gradient-to-br from-[#FFF8DC] to-[#F5DEB3]/30 p-6 rounded-xl border-l-4 border-[#D4A574] mt-6">
                      <p className="text-lg text-[#5D4E37] leading-relaxed font-semibold">
                        It hit hard. Months of effort, endless follow-ups, and a massive opportunity gone because of 
                        someone else delay. But I did not quit. I shifted focus, learned from it, and started again.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* The Pivot */}
              <div className="mb-16 relative">
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#D4A574] to-[#C19A6B] rounded-full hidden md:block"></div>
                
                <div className="md:pl-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#C19A6B] to-[#8B7355] rounded-full flex items-center justify-center shadow-lg">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-[#5D4E37]">The Pivot</h2>
                  </div>
                  
                  <div className="bg-white border-2 border-[#D4A574]/30 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
                    <p className="text-lg text-[#5D4E37] leading-relaxed mb-4">
                      After 7–8 months of pushing with fruit boxes, I came across a superfood mixture idea on Instagram—a 
                      blend of nuts, seeds, and dry fruits that was both healthy and tasty. It clicked immediately. 
                      The very next day, I went to Khari Baoli, bought ingredients, and started experimenting.
                    </p>
                    <p className="text-lg text-[#5D4E37] leading-relaxed">
                      That is how Vyadhihar Foods evolved—from fruit boxes to superfood mixtures and makhana, 
                      built on quality, hygiene, and presentation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Support System */}
              <div className="mb-16 relative">
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#D4A574] to-[#C19A6B] rounded-full hidden md:block"></div>
                
                <div className="md:pl-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#D4A574] to-[#C19A6B] rounded-full flex items-center justify-center shadow-lg">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-[#5D4E37]">The Support System</h2>
                  </div>
                  
                  <div className="bg-white border-2 border-[#D4A574]/30 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
                    <p className="text-lg text-[#5D4E37] leading-relaxed mb-4">
                      Throughout this journey, my girlfriend, who works in an MNC, has been my biggest support. 
                      In the early days, she helped me connect with HRs, wellness managers, and corporate teams for 
                      fruit box pitches. Even now, she handles meetings and coordination for the fruit box business 
                      while I focus fully on scaling our superfood mixtures and makhana line.
                    </p>
                    <p className="text-lg text-[#5D4E37] leading-relaxed">
                      Yes, there is family pressure, and yes, it is not easy. But I am focused on my goal—to build 
                      Vyadhihar into India most trusted healthy snack brand.
                    </p>
                  </div>
                </div>
              </div>

              {/* The Learning */}
              <div className="mb-16 relative">
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#D4A574] to-[#C19A6B] rounded-full hidden md:block"></div>
                
                <div className="md:pl-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#C19A6B] to-[#8B7355] rounded-full flex items-center justify-center shadow-lg">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-[#5D4E37]">The Learning Journey</h2>
                  </div>
                  
                  <div className="bg-white border-2 border-[#D4A574]/30 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
                    <p className="text-lg text-[#5D4E37] leading-relaxed">
                      I have learned everything—from pricing, design, and manufacturing—to marketing and packaging—through 
                      AI tools like ChatGPT and constant trial and error.
                    </p>
                  </div>
                </div>
              </div>

              {/* The Vision */}
              <div className="relative">
                <div className="md:pl-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#D4A574] to-[#C19A6B] rounded-full flex items-center justify-center shadow-lg">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-[#5D4E37]">The Vision</h2>
                  </div>
                  
                  <div className="bg-gradient-to-br from-[#5D4E37] to-[#8B7355] border-2 border-[#D4A574] rounded-2xl p-8 shadow-2xl text-white">
                    <p className="text-xl leading-relaxed mb-6 italic">
                      My journey is not a success story yet—it is a real story of persistence. Of someone who started 
                      with nothing but an idea, failed more than once, but kept building brick by brick.
                    </p>
                    <p className="text-xl leading-relaxed font-semibold">
                      Because in business, products can fail, but vision does not.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#5D4E37] via-[#8B7355] to-[#5D4E37] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4A574]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C19A6B]/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Join Us on This Journey
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Every purchase supports a vision of bringing healthy, natural products to every Indian home.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 text-base font-bold text-[#5D4E37] bg-white hover:bg-[#FFF8DC] transition-all duration-300 rounded-full shadow-2xl hover:shadow-white/50 hover:scale-105"
            >
              <Sparkles className="w-5 h-5" />
              <span>Shop Now</span>
            </Link>
            <a
              href="https://wa.me/919217207717?text=Hi,%20I%20want%20to%20connect%20with%20Keshav"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 text-base font-bold text-white bg-[#25D366] hover:bg-[#20BA5A] transition-all duration-300 rounded-full shadow-2xl hover:shadow-green-500/50 hover:scale-105"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>Connect with Keshav</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}