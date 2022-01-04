import React from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

function Profile() {
  return (
    <main>
      <div>
        <Header title="Perfil" hasSearchButton={ false } />
        <h1>Profile</h1>
      </div>
      <Footer />
    </main>
  );
}

export default Profile;
