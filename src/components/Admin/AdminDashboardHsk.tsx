import React from 'react';

const AdminDashboardHsk: React.FC = () => {
  const helloWorld = () => {
    console.log("Hello, World!");
  };

  return (
    <div>
      <h1 onClick={helloWorld}>Hello, HSK!</h1>
    </div>
  );
};

export default AdminDashboardHsk;
