import React from "react";

const testimonialsData = [
  {
    name: "Ralph Edwards",
    image: "",
    quote: "Luxury and elegance in every piece!",
    description:
      "The attention to detail in every piece is breathtaking—truly a work of art.",
  },
  {
    name: "Eleanor Pena",
    image: "",
    quote: "Perfect gift for my loved ones!",
    description:
      "The intricate details and premium finish make every piece a memorable keepsake.",
  },
];

const Testimonial: React.FC = () => {
  return (
    <section className="py-16 bg-beige-100 px-6 lg:px-20">
      <h2 className="text-3xl font-serif mb-10">Testimonials</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonialsData.map((t, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex items-center mb-4">
              <img
                src={t.image}
                alt={t.name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <span className="font-semibold">{t.name}</span>
            </div>
            <h3 className="text-lg font-serif mb-2">&quot;{t.quote}&quot;</h3>
            <p className="text-sm text-gray-600 mb-3">{t.description}</p>
            <div className="flex space-x-1 text-yellow-500">
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <span key={starIndex}>★</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
