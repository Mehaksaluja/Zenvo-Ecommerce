// frontend/src/App.jsx

import Header from './components/Header';// <-- Step 1: Import the Footer
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    // These classes set the default font and colors for the whole site
    <div className="font-lato bg-alabaster text-midnight">
      <Header />
      <main className="py-8">
        {/* The Outlet is a placeholder where our screen content (like HomeScreen) will be rendered */}
        <Outlet />
      </main>
    </div>
  );
};

export default App;