import { useState } from 'react';
import Header from '../private/Header';
import LayoutContainer from '../../components/layout/LayoutContainer';
import HeroBannerSection from '../../components/homepage/HeroBannerSection';
import ShopByCategory from '../../components/homepage/ShopByCategory';
import ShopByShape from '../../components/homepage/ShopByShape';
import { useQuery } from '@tanstack/react-query';
import LoginForm from './Components/LoginForm';



export default function Login() {

  const fetchPosts = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }
    return res.json();
  };

  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    enabled: false
  });

  const [showForms, setShowForm] = useState(1)



  return (
    <div className="w-full">

      {showForms && <LoginForm setShowForm={setShowForm} />}

      {/* {showForms && <LoginForm setShowForm={setShowForm} />} */}


      <div>
        <Header />
        <LayoutContainer>
          <HeroBannerSection />
          <ShopByCategory />
          <ShopByShape />
        </LayoutContainer>
      </div>
    </div>
  );
}
