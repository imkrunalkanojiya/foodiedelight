import ReactDOM from 'react-dom/client'
import './index.css'
import { store } from './store/index.ts'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/index.tsx'
import { Suspense } from 'react';
import Loader from './components/Loader/Loader.tsx';

import ErrorBoundary from './ErrorBoundary.tsx';

window.onerror = function (message, source, lineno, colno, error) {
  console.error('Global error:', message, source, lineno, colno, error);
  // Optionally, you can log this error to a server-side logging service
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <Provider store={store}>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  </ErrorBoundary>
  ,
)
