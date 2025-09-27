import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./router/AppRoutes";

function App() {
  useEffect(() => {
    const lenis = new window.Lenis({
      duration: 0.5,
      easing: (t: number) => t,
      smooth: true,
      smoothTouch: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
export default App;