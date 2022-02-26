import React from 'react';
import { BaseLayout } from '../components/BaseLayout';

const SetupForm = () => {
  return (
    <form>
      <label>Name</label>
      <input required={true}></input>

      <label>Profile Image</label>
      <input required={true}></input>
    </form>
  );
};

const SetupPage = () => {
  return (
    <BaseLayout>
      <SetupForm />
    </BaseLayout>
  );
};

export default SetupPage;
