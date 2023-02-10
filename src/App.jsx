import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthWrapper, Dashboard, Error, Login, PrivateRoute } from './pages';

function App() {
  return (
  <AuthWrapper>
    <BrowserRouter>
     <Routes>
      <Route path='/' element={
        <PrivateRoute>
          <Dashboard/>
        </PrivateRoute>
      } />
      <Route path='/login' element={ <Login/> } />
      <Route path='*' element={ <Error/> } />      
     </Routes>
    </BrowserRouter>
  </AuthWrapper>
  )
}

export default App
