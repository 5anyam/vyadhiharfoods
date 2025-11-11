// app/founder-story/page.tsx
export default function FounderStoryPage() {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-[#FFF8DC] to-white">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-[#5D4E37] to-[#8B7355] text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              The Journey of Keshav Sharma
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              Founder of Vyadhihar Foods
            </p>
          </div>
        </section>
  
        {/* Timeline Story */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Beginning */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-[#5D4E37] mb-6">The Beginning</h2>
              <p className="text-lg text-[#5D4E37] leading-relaxed mb-4">
                I come from a business family, but I never wanted to just continue the legacy. 
                I wanted to build something of my own—something that would help people live healthier lives.
              </p>
              {/* Add full story content with timeline design */}
            </div>
  
            {/* Key Moments - Use cards or timeline */}
            <div className="space-y-8">
              {/* Each milestone as a card */}
            </div>
          </div>
        </section>
      </div>
    );
  }
  