import React from "react";
import { Avatar } from "@mui/material";

const testimonialsData = [
  {
    name: "Ralph Edwards",
    image: "https://i.pravatar.cc/40?img=",
    quote: "Luxury and elegance in every piece!",
    description:
      "The attention to detail in every piece is breathtaking—truly a work of art.",
  },
  {
    name: "Eleanor Pena",
    image: "https://i.pravatar.cc/40?img=",
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
              <Avatar src={`${t.image}${i + 1}`} />
              <span className="font-semibold pl-3">{t.name}</span>
            </div>
            <h3 className="text-lg font-serif mb-2">&quot;{t.quote}&quot;</h3>
            <p className="text-sm text-gray-600 mb-3">{t.description}</p>
            <div className="flex space-x-1 text-yellow-500">
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <span key={starIndex} className="text-2xl">★</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
