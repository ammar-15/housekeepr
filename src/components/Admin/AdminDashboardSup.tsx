const AdminDashboardSup = () => {
  return (
    <div className="SUPcontainer-admin flex flex-col justify-center items-center py-2 px-4 outline outline-1 mr-5 rounded-md">
      <h1 className="SUPheader-admin">SUP </h1>
      <div className="SUPcontent-admin text-lightgrey">
        Previous room
        <div className="SUPprevroomcontent-admin flex justify-around">
          <div className="SUPprevroom-admin text-black">201</div>
          <div className="SUPprevroomtype-admin text-black">NQQ</div>
        </div>
      </div>
      <div className="SUPcontent-admin text-lightgrey">
        Current room
        <div className="SUPcurrroomcontent-admin flex justify-around">
          <div className="SUPcurrroom-admin text-black">201</div>
          <div className="SUPcurrroomtype-admin text-black">NQQ</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardSup;
