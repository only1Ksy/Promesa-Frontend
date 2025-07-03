// import { ITEM_LIST } from '@/lib/constants/temp-item-list';
// // import { REVIEW_LIST } from '@/lib/constants/temp-review-list';

// export const fetchItemDetail = async (itemId: number) => {
//   const item = ITEM_LIST.find((item) => item.itemId === itemId);

//   if (!item) {
//     return { data: null, error: '해당 상품을 찾을 수 없습니다.' };
//   }

//   return { data: item };
// };

export const fetchItemDetail = async (itemId: number) => {
  console.log(itemId);
  return {
    data: {
      itemId: 89,
      itemName: '작품 89',
      itemDescription: '작품에 대한 설명',
      price: 25000,
      imageKey: 'item/89/main/1.png',
      imageUrl:
        'https://ceos-promesa.s3.ap-northeast-2.amazonaws.com/item/89/main/1.png?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAgaDmFwLW5vcnRoZWFzdC0yIkYwRAIgaFN5u28TD3odL7NY5nbceq%2BsYotRMYkfy%2F09u0ocSZcCIE6fit%2BWnQnnemZkcZ4U8E4XtbAYU2LXk%2B2IFieFrqF9KswFCBEQABoMOTY2ODIxMjkwNjAxIgyL71rXC90hAR3PTggqqQWQY%2Fy65WwfrRlly3zXFEA6BATWk0HuLFuYG%2FmgudNZO06P3qA1SJ3SOMwPgGOk9JSH1p838fytlKYNuGxEfNw3C0Ewk5JrAU%2BcZ%2F%2FvV%2FaAjkbE6s7m0hIhLGM%2BpIvPa8O6Lv4d4n%2F7IdYLWs%2FCELddnCNqCbVoYfkoSTm0p5uMO%2FMhOJSDnOSfwOs8RgXaczmoCOubfq58xz%2FomZZCfK8%2BaZKvQpgX2Fv9CTDYySk%2FnHFGyCa7YtWqe1JW6HBt8U%2Fz%2BkDTlvNLpn0qaGs38NdWahFRYw5pbSXFsmGkWRUHB5ImR1Wwap9MisI3uBmF4VE0LAGHv4lL07NN1XvAWxudDP4g27C2BsgiuBo4z3M9X%2FfjR7YL0Sm3F77kH2Pup5J0j6k%2FGJ%2Fh34hb2qSs7%2FFgZAP4ONK7Nv1PIwJ6VcnqHqeU9mOvU2NuRP6d4Yr%2B0eo9j5Zb4l9dniD%2Fa2r29yIhLedCQ9RHLK%2BgS4Tqvf4C9VeKeDT7%2FM3y9ztTFIGgwL4RL%2FtQKn3mzCIlTD31QtS%2BgVEh23H9EhOP3jtwRTi7PlG%2B%2BmM6oIc%2BxQj4NNh1HMuICybyu6%2BZ1vCPz0LivyhVHlCGORSh9tagTeakG49EW19T71othML0nd1ZwPug1F7Syu6iziJG2JLxBkUakxdBDyfisGkclz5oqdIYAXiFPiang5ScgXMi6xwPDZSwWpAzCYv3ssvhpubulY0FkZQQgbhlxicqI0mB90Ivf6NiJrNvtxAqGmoqAQzq38iojL0Z3z3ksl7hniL0YDgtQ8AXbPGTGVSM3eo6KKXWwp%2FlGhN%2BRLmKhU5plAbHltvd%2BipzfujyQ7x8EgpvewvS27gRqm9N7PuFd8%2FLZAIrIvkH92Zgf1TWjyMMD2DYVyPEjcVUce%2FYnlgvh44wrOaYwwY6sgETrz7Qr%2BCBYNQHk6GbnjTQsGnpC6vlo2dnOVwajPYlG30B%2FVymYu2e9AQ6quR1u9jcyQLaG%2B%2B4qTdBNCVme2W%2BuvHU5vgv5zTMWGxC9LgqGDCv401bvlsGSu1j56xpa6ysHFhU0aNVxB%2B0YuCEPYih2%2Fx%2BeXI3EYFdyWNyeys3AgnVHo%2Fi01xVC3UBHCBO4GG49mLTM3Clu7pNpBGjfW9hlelRNdKiXZ4EZ6qS6wjVjyLi&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250703T075321Z&X-Amz-SignedHeaders=host&X-Amz-Expires=900&X-Amz-Credential=ASIA6CGYKEJUWUHI55XQ%2F20250703%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=d80357f52e8d3b5ac83affa18393c3f6d48614167c8ed36b3888e769d6f973c0',
      artistId: 1,
      artistName: '김작가',
      wished: false,
    },
  };
};

/* export const fetchItemReviews = async (itemId: number) => {
  const reviews = REVIEW_LIST.filter((review) => review.itemId === itemId);
  return reviews;
};
*/
