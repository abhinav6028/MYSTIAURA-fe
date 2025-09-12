import { Star, StarHalf, Star as StarEmpty } from "lucide-react"; // or use any icon library

export const RatingStars: React.FC<{ rating: number; count: number }> = ({ rating, count }) => {
  return (
    <div className="flex items-center gap-2 text-yellow-500 mb-2">
      {Array.from({ length: 5 }).map((_, i) => {
        const starValue = i + 1;
        if (rating >= starValue) {
          return <Star key={i} fill="currentColor" stroke="none" />; // full star
        } else if (rating >= starValue - 0.5) {
          return <StarHalf key={i} fill="currentColor" stroke="none" />; // half star
        } else {
          return <StarEmpty key={i} stroke="currentColor" />; // empty star
        }
      })}
      <span className="text-gray-700 text-sm md:text-base">
        {rating.toFixed(1)} ({count} Reviews)
      </span>
    </div>
  );
};