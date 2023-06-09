import Layout from '@/components/Layout';
import data from '@/utils/data';

import { AppContext } from '@/utils/appcontext';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';

export default function ProductScreen() {
  const { state, dispatch } = useContext(AppContext);
  const { query } = useRouter();
  const router = useRouter();
  const { slug } = query;
  const product = data.product.find((x) => x.slug == slug);
  if (!product) {
    return <div>Product Not Found</div>;
  }
  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find((x) => x.slug == product.slug);
    const quantity = existItem ? existItem.quantity! + 1 : 1;
    if (product.countInStock < quantity) {
      alert('Sorry Product out of Stock');
      return;
    }

    dispatch({
      type: 'ADD_CART',
      payload: { ...product, quantity },
    });
    router.push(`/Cart`);
  };
  return (
    <Layout title={product?.name}>
      <div className="py-2 ">
        <Link href={'/'} legacyBehavior>
          back to products
        </Link>
      </div>

      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product?.image ? product.image : ''}
            alt={product?.name ? product.name : ''}
            width={640}
            height={640}
            layout="responsive"
          />
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg">{product?.name}</h1>
            </li>
            <li>Category: {product?.category}</li>
            <li>Brand: {product?.category}</li>
            <li>
              {product?.rating} of {product?.numReviews} reivews
            </li>
            <li>Description: {product?.description}</li>
          </ul>
        </div>
        <div className="container">
          <div className="card p-5">
            <div className="mb-2 flex justify-between ">
              <div>Price</div>
              <div>${product?.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>
                {product?.countInStock! > 0 ? 'In Stock' : 'Unavailable'}
              </div>
            </div>
            <button
              className="primary-button w-full"
              onClick={addToCartHandler}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
