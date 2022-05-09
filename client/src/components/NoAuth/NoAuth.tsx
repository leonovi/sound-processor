import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const NoAuth: FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <span>
        There is no authorization, you can{' '}
        <button
          type="button"
          onClick={() => navigate('/reg')}
        >
          register
        </button>{' '}
        or{' '}
        <button
          type="button"
          onClick={() => navigate('/login')}
        >
          log in
        </button>
      </span>
    </div>
  );
};

export { NoAuth };
