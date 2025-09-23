// Correct way in Swiper 10+
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react"; // you can use any icon
import { FONT_FAMILY } from "../../utils";

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


  // Add more if needed
];

const Testimonial: React.FC = () => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="bg-[#FEF9F2] py-15 px-6 lg:px-20">
      <div className="flex items-center justify-between mb-6">
        <h2 style={{ fontFamily: FONT_FAMILY }} className="text-3xl font-serif">Testimonials</h2>
        <div className="flex space-x-2">
          <button
            ref={prevRef}
            className="p-3 rounded-full cursor-pointer border border-[#660033]-200 bg-white hover:bg-[#660033] hover:text-white "
          >
            <ArrowLeft size={36} strokeWidth={1} className="w-5 h-5" />
          </button>
          <button
            ref={nextRef}
            className="p-3 rounded-full cursor-pointer bg-white border border-[#660033]-200 hover:bg-[#660033] hover:text-white "
          >
            <ArrowRight size={36} strokeWidth={1} className="w-5 h-5" />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        onBeforeInit={(swiper) => {
          // Assign the refs before Swiper initializes
          const nav = swiper.params.navigation;
          if (nav && typeof nav !== "boolean") {
            nav.prevEl = prevRef.current;
            nav.nextEl = nextRef.current;
          }
        }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {testimonialsData.map((t, i) => (
          <SwiperSlide key={i}>
            <div className="bg-white p-6 border  border-gray-300">
              <div className="flex items-center mb-4">
                <img
                  src={
                    t.image ||
                    "https://images.unsplash.com/photo-1615109398623-88346a601842?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFufGVufDB8fDB8fHww"
                  }
                  alt={t.name}
                  className="w-10 h-10 rounded-full mr-3 object-cover"
                />
                <span className="">{t.name}</span>
              </div>
              <h3 style={{ fontFamily: FONT_FAMILY }} className="text-lg md:text-2xl mb-2">&quot;{t.quote}&quot;</h3>
              <p className="text-sm text-gray-600 mb-3">{t.description}</p>
              <div className="flex space-x-1 text-yellow-500">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <span key={starIndex} className="text-xl">★</span>
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonial;
