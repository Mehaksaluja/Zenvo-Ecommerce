import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify'; // <-- IMPORT
import 'react-toastify/dist/ReactToastify.css'; // <-- IMPORT CSS

const App = () => {
  return (
    <div className="bg-snow">
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer /> {/* <-- RENDER THE CONTAINER HERE */}
    </div>
  );
};

export default App;