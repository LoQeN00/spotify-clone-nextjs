import React from 'react';
import Head from 'next/head';
type Props = {};

export const Main = (props: Props) => {
  return (
    <div className="flex-1 p-8">
      <Head>
        <title>Home</title>
      </Head>
      <h1 className="text-3xl text-bold text-white">Siema</h1>
    </div>
  );
};
