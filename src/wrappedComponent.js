import React, { useState, useEffect } from 'react';
import LoadingSpinner from './Components/Spinner/Spinner';

const withLoading = (WrappedComponent) => {
  return (props) => {
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
        
      }, 100);

      return () => clearTimeout(timer);
    }, []);

    return (
      <>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <WrappedComponent {...props} />
        )}
      </>
    );
  };
};

export default withLoading;