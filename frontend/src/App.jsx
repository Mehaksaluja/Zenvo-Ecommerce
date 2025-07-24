// frontend/src/App.jsx

import { Outlet } from 'react-router-dom';
import Header from './components/Header';
// We will create and import the Footer later

const App = () => {
  return (
    // The body font is set here for the entire application
    <div className="bg-snow">
      <Header />
      <main className="min-h-screen">
        {/* The Outlet renders the current page's component */}
        <Outlet />
      </main>
      {/* <Footer /> will go here */}
    </div>
  );
};

export default App;