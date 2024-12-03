import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { AuthProvider } from 'context/AuthContext';
import { AxiosErrorHandler } from 'service/api';
import { useEffect, useState } from 'react';
import Page404 from 'view/page-404/Page404';
import { AnonymousRoutes, ProtectedRoutes } from 'routes';
import SignIn from 'view/sign-in/SignIn';
import TestPage from 'view/test/TestPage';
import { Navbar } from 'components';

function App() {

  const isMobile = useMediaQuery("(max-width: 768px)");

  const props = {
    isMobile: isMobile,
  }

  return (
    <Router>
      <AuthProvider>
        <AxiosErrorHandler>
          <Navbar props={props}/>
          <Routes>
            
            {/* Route not found */}
            <Route path='/404' element={<Page404 props={props}/>} />

            {/* Anonymous routes */}
            <Route element={<AnonymousRoutes />}>
              <Route path='/sign-in' element={<SignIn props={props}/>} />
              <Route path='/' element={<SignIn props={props}/>} />
            </Route>
            {/* Protected routes */}
            <Route element={<ProtectedRoutes />}>
              <Route path='/' element={<TestPage props={props} />} />
            </Route>
            {/* Redirect to 404 if page is not found */}
            <Route path="*" element={<Navigate to="/404" replace />} />

          </Routes>
        </AxiosErrorHandler>
      </AuthProvider>
    </Router>
  );
}

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const handleChange = (event) => setMatches(event.matches);
    mediaQueryList.addEventListener("change", handleChange);

    return () => {
      mediaQueryList.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}

export default App;
