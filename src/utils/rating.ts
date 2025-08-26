export function getStarRating(star: number): string {
  const fullStar = '★';
  const emptyStar = '☆';
  return fullStar.repeat(star) + emptyStar.repeat(5 - star);
}