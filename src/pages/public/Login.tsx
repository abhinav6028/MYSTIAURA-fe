import { useEffect, useState } from 'react';
import LoginForm from './Components/LoginForm';
import PublicPageBG from './Components/Publicbg';
import ForgotPassword from './Components/ForgotPassword';
import { useParams } from 'react-router-dom';

export default function Login() {
  const [showForms, setShowForm] = useState(1);
  const {id} = useParams();

  useEffect(() => {
    if (id) {
      setShowForm(2);
    }
  }, [id]);

  return (
    <div className="w-full">
      {showForms === 1 && <LoginForm setShowForm={setShowForm} />}
      {showForms === 2 && <ForgotPassword setShowForm={setShowForm} />}
      <PublicPageBG />
    </div>
  );
}
