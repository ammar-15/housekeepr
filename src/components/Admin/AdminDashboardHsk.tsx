import React from "react";

const AdminDashboardHsk = () => {
  return (
    <div className="HSKcontainer-admin flex flex-col justify-center items-center py-2 px-4 outline outline-1 mr-5 rounded-md">
      <h1 className="HSKheader-admin">HSK </h1>
      <div className="HSKcontent-admin text-lightgrey">
        Previous room
        <div className="prevroomcontent-admin flex justify-around">
          <div className="prevroom-admin text-black">201</div>
          <div className="prevroomtype-admin text-black">NQQ</div>
        </div>
      </div>
      <div className="HSKcontent-admin text-lightgrey">
        Current room
        <div className="currroomcontent-admin flex justify-around">
          <div className="currroom-admin text-black">201</div>
          <div className="currroomtype-admin text-black">NQQ</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHsk;
