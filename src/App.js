import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AlertProvider } from 'contexts';
import { AxiosErrorHandler } from 'services';
import { useEffect, useState } from 'react';
import { AnonymousRoutes, ProtectedRoutes } from 'routes';
import { SignIn, Dashboard, Page404, SignUp, Projects } from 'views';
import { Navbar, AlertTray, Page } from 'components';
import Project from 'views/project/Project';

function App() {

  const isMobile = useMediaQuery("(max-width: 768px)");

  const props = {
    isMobile: isMobile,
  }

  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AlertProvider>
        <AuthProvider>
          <AxiosErrorHandler>
            <Navbar {...props}/>
            <AlertTray {...props}/>
            <Page>
              <Routes>
                
                {/* Route not found */}
                <Route path='/404' element={<Page404 {...props}/>} />

                {/* Anonymous routes */}
                <Route element={<AnonymousRoutes />}>
                  <Route path='/sign-in' element={<SignIn {...props} />} />
                  <Route path='/sign-up' element={<SignUp {...props} />} />
                  <Route path='/' element={<SignIn />} />
                </Route>
                {/* Protected routes */}
                <Route element={<ProtectedRoutes />}>
                  <Route path='/dashboard' element={<Dashboard {...props} />} />
                  <Route path='/projects' element={<Projects {...props} />} />
                  <Route path='/project' element={<Project {...props} />} />
                </Route>
                {/* Redirect to 404 if page is not found */}
                <Route path="*" element={<Navigate to="/404" replace />} />

              </Routes>
            </Page>
          </AxiosErrorHandler>
        </AuthProvider>
      </AlertProvider>
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
