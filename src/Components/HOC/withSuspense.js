import { Suspense } from 'react';
import Preloader from '../Common/Preloader/Preloader';

export function withSuspense(Component) {
  return (props) => {
    return (
      <Suspense fallback={<Preloader />}>
        <Component {...props} />
      </Suspense>
    );
  };
}
