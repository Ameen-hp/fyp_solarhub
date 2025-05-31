import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-6 space-y-8 bg-white shadow-xl rounded-b-3xl">
        <h1 className="text-4xl md:text-6xl font-extrabold text-blue-800 leading-tight drop-shadow-lg animate-fadeIn">
          Welcome to SolarHub
        </h1>
        <p className="text-lg md:text-2xl text-gray-600 max-w-3xl">
          Discover clean energy solutions tailored for your home, business, or industry.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="/packages">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300">
              Explore Packages
            </button>
          </a>
          <a href="/learn-more">
            <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300">
              Learn More
            </button>
          </a>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 text-center bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-6">About SolarHub</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          SolarHub is dedicated to offering affordable and sustainable solar energy solutions
          with exceptional performance and 24/7 support.
        </p>
      </section>

      {/* Image Gallery */}
      <section className="py-16 px-6 bg-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-8">Our Solar Installations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            "https://res.cloudinary.com/dug8hjtov/image/upload/v1748522749/solarHopImage1_lyjwhg.jpg",
            "https://res.cloudinary.com/dug8hjtov/image/upload/v1748522749/solarHopImage2_pbrgu2.jpg",
            "https://res.cloudinary.com/dug8hjtov/image/upload/v1748522749/solarHopImage3_yrrwqf.avif",
            "https://res.cloudinary.com/dug8hjtov/image/upload/v1748522751/solarHopImage4_eowvy3.jpg"
          ].map((src, idx) => (
            <div
              key={idx}
              className="overflow-hidden rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={src}
                alt={`Solar installation ${idx + 1}`}
                className="w-full h-64 object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">Why Choose SolarHub?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Eco-Friendly",
              desc: "Reduce your carbon footprint with our renewable energy solutions.",
            },
            {
              title: "Cost Effective",
              desc: "Lower your electricity bills by up to 80%.",
            },
            {
              title: "24/7 Support",
              desc: "Reliable service with dedicated support anytime.",
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white text-blue-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-6 bg-gradient-to-r from-blue-700 to-purple-800 text-white text-center mt-12 rounded-t-3xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Join the Solar Movement</h2>
        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto leading-relaxed">
          Take control of your energy future. Join thousands who trust SolarHub for their solar needs.
        </p>
        <a href="/packages">
          <button className="bg-white text-blue-700 px-10 py-4 rounded-xl font-semibold shadow-xl hover:bg-blue-100 transition duration-300">
            Get Started
          </button>
        </a>
      </section>

      {/* Footer Spacer */}
      <div className="py-6"></div>
    </div>
  );
}
