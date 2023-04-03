import Layout from '@/components/Layout';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import getError from '@/utils/error';
import { useRouter } from 'next/router';
type Inputs = {
  email: string;
  password: string;
};
export default function LoginScreen() {
  const { status, data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;
  useEffect(() => {
    if (session?.user) {
      // router.push(router.query || '/');
      router.push('/');
    }
  }, [router, session, redirect]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async ({
    email,
    password,
  }: Inputs) => {
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      if (result?.error) {
        console.log('its null');
        toast.error(getError(result.error));
      } else {
        console.log(result);
      }
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <Layout title="Login" >
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="mb-4 text-xl">Login</h1>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="w-full"
            id="email"
            autoFocus
          />
          {errors.email && (
            <span className="text-red-500">This Email field is required</span>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register('password', { required: true })}
            className="w-full"
            id="password"
            autoFocus
          />
          {errors.password && (
            <span className="text-red-500">
              This Password field is required
            </span>
          )}
        </div>
        <div className="mb-4">
          <button className="primary-button">Login</button>
        </div>
        <div className="mb-4">
          Don&apos;t have an account? &nbsp;
          {status === 'loading' ? (
            'Loading'
          ) : session?.user ? (
            <button>SignOut</button>
          ) : (
            // session.user.name
            <button>Login</button>
          )}
          {/* <Link href={`/register`}>



          </Link> */}
        </div>
      </form>
    </Layout>
  );
}
