import React from 'react';

const LogoutButton: React.FC = () => {
  return (
    <a href="/api/auth/logout">
      <button>Logout</button>
    </a>
  );
};

export default LogoutButton;