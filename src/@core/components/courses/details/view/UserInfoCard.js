import React from "react";

// Course Info Card - Clean & Structured
// Props: title, description, teacher, category, students, price, status

const CourseInfoCard = ({
  title,
  description,
  teacher,
  category,
  students,
  price,
  status,
}) => {
  return (
    <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-2 text-gray-800">{title}</h2>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-6 mb-4">{description}</p>

      {/* Info Section */}
      <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
        <div className="bg-gray-50 p-2 rounded-xl">
          <span className="font-medium">مدرس:</span> {teacher}
        </div>
        <div className="bg-gray-50 p-2 rounded-xl">
          <span className="font-medium">دسته‌بندی:</span> {category}
        </div>
        <div className="bg-gray-50 p-2 rounded-xl">
          <span className="font-medium">تعداد دانشجو:</span> {students}
        </div>
        <div className="bg-gray-50 p-2 rounded-xl">
          <span className="font-medium">قیمت:</span> {price}
        </div>
      </div>

      {/* Status */}
      <div className="mt-5 text-left">
        <span
          className={`px-4 py-1.5 text-sm rounded-full text-white font-medium ${
            status === "active" ? "bg-green-500" : "bg-red-400"
          }`}
        >
          {status === "active" ? "فعال" : "غیرفعال"}
        </span>
      </div>
    </div>
  );
};

export default CourseInfoCard;