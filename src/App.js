import './App.css';
import { Navbar, Page, ErrorFallback } from 'components';
import { AuthProvider, AlertProvider, SharedProjectProvider } from 'contexts';
import { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnonymousRoutes, ProtectedRoutes } from 'routes';
import { AxiosErrorHandler } from 'services';
import { SignIn, Page404, SignUp, Project, Projects, ProjectSettings, SharedProject, AccountSettings } from 'views';


function App() {

  const isMobile = useMediaQuery("(max-width: 768px)");

  const props = {
    isMobile: isMobile,
  }

  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
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
              <Page>
                <Routes>
                  
                  {/* Route not found */}
                  <Route path='/404' element={<Page404 {...props}/>} />

                  {/* Anonymous routes */}
                  <Route element={<AnonymousRoutes />}>
                    <Route path='/sign-in' element={<SignIn {...props} />} />
                    <Route path='/sign-up' element={<SignUp {...props} />} />
                    <Route path='/' element={<SignIn {...props} />} />
                  </Route>
                  {/* Protected routes */}
                  <Route element={<ProtectedRoutes />}>
                    <Route path='/account' element={<AccountSettings {...props} />} />
                    <Route path='/projects' element={<Projects {...props} />} />
                    <Route path='/project' element={<Project {...props} />} />
                    <Route path='/shared-project' element={<SharedProjectProvider><SharedProject {...props} /></SharedProjectProvider>} />
                    <Route path='/project-settings' element={<ProjectSettings {...props} />} />
                  </Route>
                  {/* Redirect to 404 if page is not found */}
                  <Route path="*" element={<Navigate to="/404" replace />} />

                </Routes>
              </Page>
            </AxiosErrorHandler>
          </AuthProvider>
        </AlertProvider>
      </Router>
    </ErrorBoundary>
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
