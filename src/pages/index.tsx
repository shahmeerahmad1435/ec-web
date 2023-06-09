import Layout from '@/components/Layout';
import ProductItem from '@/components/ProductItem';
import data from '@/utils/data';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  // const { status } = useSession();
  // useEffect(() => {
  //   if (status === 'unauthenticated') {
  //     Router.replace('/login');
  //   }
  // }, [status]);
  // if (status === 'authenticated')
  return (
    <>
      <Layout title="Shahmeer">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {data.product.map((product) => (
            <ProductItem product={product} key={product.slug}></ProductItem>
          ))}
        </div>
      </Layout>
    </>
  );
}
