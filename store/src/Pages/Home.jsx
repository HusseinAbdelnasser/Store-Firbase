import React from 'react';
import Header1 from '../components/header/Header1';
import Header2 from '../components/header/Header2';
import Hero from '../components/hero/Hero';
import Main from '../components/main/Main';
import Footer from '../components/footer/footer';
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from '../firbase/config';
const Home = () => {
  const [value, loading, error] = useCollection(query(collection(db, "cart"), orderBy("id")));
  return (
    <div>
        <Header1 />
        <Header2 />
        <Hero />
        <Main data= {value} />
        <Footer />
    </div>
  )
}

export default Home;