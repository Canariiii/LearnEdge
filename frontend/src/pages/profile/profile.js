import React from 'react';
import UserProfile from '../../components/userProfile/userProfile';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

function Profile() {
  return (
    <>
      <Header />
      <UserProfile />
      <Footer />
    </>
  );
}

export default Profile;