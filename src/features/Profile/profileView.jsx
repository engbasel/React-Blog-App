


import React from "react";

export default function ProfileView() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img
            src="https://via.placeholder.com/150"
            alt="profile"
            className="rounded-full w-32 h-32 object-cover border-4 border-primary"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title text-2xl font-bold">Basel Ahmed</h2>
          <p className="text-gray-500">basel@example.com</p>
          <p className="mt-2">
            Passionate React developer 🚀 | Learning Firebase 🔥 | Love clean code ✨
          </p>
          <div className="card-actions justify-end mt-4">
            <button className="btn btn-primary">Edit Profile</button>
            <button className="btn btn-outline btn-error">Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
}


//  في  حاجة انا بعرف اعملها ب فلاتر و الفاير بيز مش عارف بتتعمل ازاي في رياكت بقي
// انا مثلا عملت لوجين ب ايميل وباسورد
// عايز بقي اعرض بيناتا اليوزر اللي حاليا عامل لوجين في التطبيق علشان مثلا لو هو ناشر بوستات لو اليوزر لة صورة شخصية 
// عامل لايك مثلا 
// كل دي داتا ريليتد ب اليوزر اللي عامل لوجين
