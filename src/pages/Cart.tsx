import Layout from '@/components/Layout';
import { AppContext } from '@/utils/appcontext';
import Image from 'next/image';
import Link from 'next/link';
import { XCircleIcon } from '@heroicons/react/24/solid';
import React, { useContext, useEffect, useState } from 'react';
import { ProductType } from '@/utils/Product.type';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

function CartScreen() {
  const { state, dispatch } = useContext(AppContext);
  const router = useRouter();
  const {
    cart: { cartItems },
  } = state;
  const updateCartHandler = (item: ProductType, value: string) => {
    const quantity = Number(value);
    dispatch({ type: 'ADD_CART', payload: { ...item, quantity } });
  };
  const removeItemHandler = (item: ProductType) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  return (
    <Layout title="Shopping Cart">
      <h1 className="mb-4 text-xl">Shopping Cart</h1>
      {cartItems.length == 0 ? (
        <div>
          Cart is Emptyss
          <Link href={`/`} legacyBehavior>
            <strong>GO Shopping</strong>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full">
              <thead className="border-b">
                <th className="px-4 text-left">Item</th>
                <th className="px-4 text-right">Qunatity</th>
                <th className="px-4 text-right">Price</th>
                <th className="px-4">Action</th>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug} className="border-b">
                    <td>
                      <Link href={`product/${item.slug}`} legacyBehavior>
                        <a className="flex items-center">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          ></Image>
                          <div>&nbsp;</div>
                          {item.name}
                        </a>
                      </Link>
                    </td>
                    <td className="px-4 text-right">
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        {[...Array(item.countInStock).keys()].map(
                          (x: number) => (
                            <option value={x + 1} key={x + 1}>
                              {x + 1}
                            </option>
                          )
                        )}
                      </select>
                    </td>
                    <td className="px-4 text-right">{item.price}</td>
                    <td className="px-4 text-center">
                      <button onClick={() => removeItemHandler(item)}>
                        <XCircleIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="container">
            <div className="card p-5">
              <ul>
                <li>
                  <div className="pb-3">
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity!, 0)})
                    : ${' '}
                    {cartItems.reduce((a, c) => a + c.quantity! * c.price, 0)}
                  </div>
                </li>
                <li>
                  <button
                    onClick={() => router.push(`login?redirect=/shipping`)}
                    className="primary-button w-full"
                  >
                    Check Out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
