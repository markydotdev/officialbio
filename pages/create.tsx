import router from 'next/router';
import React, { useContext } from 'react';

import BuildingBlocks from '../components/BuildingBlocks';
import Button from '../components/Button';
import Layout from '../components/Layout';
import { styled } from '../stitches.config';
import { UserContext } from './_app';

const CenteredPage = styled('section', {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

function create() {
  const userId = useContext(UserContext);
  if (userId === null) {
    return (
      <Layout>
        <CenteredPage>
          <h2>Sign in to start customizing your page</h2>
          <Button
            onClick={() => router.push('/sign_in')}
            type={undefined}
            disabled={undefined}
            version={undefined}
            loading={undefined}
          >
            Sign In
          </Button>
        </CenteredPage>
      </Layout>
    );
  }
  return (
    <Layout>
      <BuildingBlocks />
    </Layout>
  );
}

export default create;
