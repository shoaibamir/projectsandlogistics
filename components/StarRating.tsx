type StarRatingProps = {
  rating: number;
};

export default function StarRating({ rating }: StarRatingProps) {
  const filled = Math.round(rating);

  return (
    <span className="text-amber-500" aria-label={`${rating} out of 5 stars`}>
      <span aria-hidden="true">
        {"★".repeat(filled)}
        <span className="text-slate-300">{"★".repeat(5 - filled)}</span>
      </span>
    </span>
  );
}
