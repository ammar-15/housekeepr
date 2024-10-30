import React from 'react';

const AdminDashboardSup: React.FC = () => {
  const helloWorld = () => {
    console.log("Hello, World!");
  };

  return (
    <div>
      <h1 onClick={helloWorld}>Hello, SUP</h1>
    </div>
  );
};

export default AdminDashboardSup;
