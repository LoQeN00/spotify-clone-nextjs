import React, { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Navigation } from '../components/navigation/Navigation';
import { Main } from '../components/main/Main';

type Props = {};

const HomePage = (props: Props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="text-white">
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    );
  }

  return <Main />;
};

export default HomePage;
