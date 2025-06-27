export default function getPaginationRange(page: number, totalPage: number): number[] {
  const maxVisible = 5;
  const half = Math.floor(maxVisible / 2);

  let start = Math.max(0, page - half);
  let end = start + maxVisible - 1;

  if (end >= totalPage) {
    end = totalPage - 1;
    start = Math.max(0, end - maxVisible + 1);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
