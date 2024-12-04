import { useState } from "react";

const AdminStart = () => {
  const [isModalVisible, setisModalVisible] = useState(false);

  const toggleModal = () => {
    setisModalVisible(!isModalVisible);
  };

  return (
    <div>

      <button
        className="fixed bottom-5 right-5 text-xl bg-chocolate text-white rounded-full px-5 py-3 shadow-md"
        onClick={toggleModal}
      >+</button>

      {isModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h2 className="text-xl mb-4">Assign Rooms</h2>
 
            <input
              type="text"
              placeholder="Hello World 1"
              className="w-full mb-3 p-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Hello World 2"
              className="w-full mb-3 p-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Hello World 3"
              className="w-full mb-3 p-2 border rounded-md"
            />

            <select className="w-full mb-3 p-2 border rounded-md">
              <option>Hello World 1</option>
            </select>
            <select className="w-full mb-3 p-2 border rounded-md">
              <option>Hello World 2</option>
            </select>
            <select className="w-full mb-3 p-2 border rounded-md">
              <option>Hello World 3</option>
            </select>

            <div className="flex justify-end">
              <button
                className="bg-gray-300 text-black rounded-md px-4 py-2 mr-2"
                onClick={toggleModal}
              >
                Cancel
              </button>
              <button className="bg-blue-600 text-black rounded-md px-4 py-2">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStart;