import { BrowserRouter as Router } from 'react-router-dom'

import './App.css'
import AppRoutes from './router/AppRoutes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function App() {

  const postQuery = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await axios.get('<https://jsonplaceholder.typicode.com/posts>');
      const data = await response.data;
      return data;
    }
  });

  console.log("postQuery", postQuery);


  return (
    <Router>.
      <AppRoutes />
    </Router>
  )
}

export default App
