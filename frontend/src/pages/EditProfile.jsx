import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FaCamera } from "react-icons/fa";
import axios from "axios";
import { setUserData } from "../redux/userSlice";

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user.userData);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [description, setDescription] = useState(user?.description || "");
  const [photoPreview, setPhotoPreview] = useState(user?.photoUrl || "");
  const [photoFile, setPhotoFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    console.log("clicked");
    try {
      setLoading(true);


     
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("description", description);
      if (photoFile) formData.append("photo", photoFile);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/update-profile`,
        formData, // ✅ direct formData
        {
          withCredentials: true, // ✅ correct casing
        }
      );

      if (res.data.success) {
        console.log("update-", res.data);
        dispatch(setUserData(res.data?.user))
        navigate("/my-profile");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary text-black dark:bg-surface dark:text-white px-4 py-10">
      {/* Back Button */}
      <div className="max-w-xl mx-auto mb-4">
        <button
          onClick={() => navigate("/my-profile")}
          className="flex items-center px-6 py-2 rounded-full bg-secondary text-black gap-2 dark:bg-surface-muted dark:text-white "
        >
          <IoArrowBack size={20} />
          Back to Profile
        </button>
      </div>

      {/* Card */}
      <div className="max-w-xl mx-auto bg-secondary text-black dark:bg-surface-muted dark:text-white rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-black dark:text-white text-center mb-6">
          Edit Profile
        </h2>

        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <label className="relative cursor-pointer">
            {photoPreview ? (
              <img
                src={photoPreview}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-gray-300 flex items-center justify-center text-4xl font-bold text-white">
                {name.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="absolute bottom-1 right-1 bg-black text-white p-2 rounded-full">
              <FaCamera size={14} />
            </div>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Description</label>
            <textarea
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full mt-6 py-2 rounded-xl bg-primary text-black dark:bg-surface dark:hover:bg-red-800 transition dark:text-white font-medium"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
