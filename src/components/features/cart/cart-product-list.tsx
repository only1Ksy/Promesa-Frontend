import CartProductCard from './cart-product-card';

export default function CartProductList() {
  const PRODUCT_TEMP = [
    {
      url: 'src/image1',
      title: 'Cosmos Duvet Cover',
      ArtistName: '김아람 공방',
      currentNum: 1,
      stock: 1,
      price: 28000,
    },
    {
      url: 'src/image2',
      title: 'Cosmos Duvet Cover',
      ArtistName: '김아람 공방',
      currentNum: 1,
      stock: 5,
      price: 28000,
    },
    {
      url: 'src/image3',
      title: 'Cosmos Duvet Cover',
      ArtistName: '김아람 공방',
      currentNum: 1,
      stock: 5,
      price: 28000,
    },
  ];

  return (
    <div className="flex flex-col items-center gap-5 px-5 pt-5">
      {PRODUCT_TEMP.map((product, index) => (
        <>
          <div key={index}>
            <CartProductCard product={product} />
          </div>
          <div className="bg-green h-[1px] w-full" />
        </>
      ))}
    </div>
  );
}
