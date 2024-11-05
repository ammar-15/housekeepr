import React from "react";

const AdminDashboardHsk = () => {
  return (
    <div className="HSKcontainer-admin flex flex-col justify-center items-center py-2 px-4 outline outline-1 mr-5 rounded-md">
      <h1 className="HSKheader-admin">HSK </h1>
      <div className="HSKcontent-admin text-lightgrey">
        Previous room
        <div className="HSKprevroomcontent-admin flex justify-around">
          <div className="HSKprevroom-admin text-black">201</div>
          <div className="HSKprevroomtype-admin text-black">NQQ</div>
        </div>
      </div>
      <div className="HSKcontent-admin text-lightgrey">
        Current room
        <div className="HSKcurrroomcontent-admin flex justify-around">
          <div className="HSKcurrroom-admin text-black">201</div>
          <div className="HSKcurrroomtype-admin text-black">NQQ</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHsk;
