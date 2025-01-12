import React from 'react';

const LoginButton: React.FC = () => {
  return (
    <a href="/api/auth/login">
      <button>Login</button>
    </a>
  );
};

export default LoginButton;