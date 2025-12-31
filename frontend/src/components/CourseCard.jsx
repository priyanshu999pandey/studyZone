import React from "react";
import { FaStar } from "react-icons/fa";

const CourseCard = ({ thumbnail, title, category, rating=2  }) => {
  return (
    <div
      className="
        w-full 
        max-w-xs 
        bg-secondary 
        dark:bg-surface-muted 
        rounded-2xl 
        shadow-lg 
        overflow-hidden 
        transition 
        hover:scale-105
      "
    >
      {/* Thumbnail */}
      <div className="h-40 w-full overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        {/* Category */}
        <span className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary dark:text-primary-light">
          {category}
        </span>

        {/* Title */}
        <h3 className="text-base font-semibold text-black dark:text-white line-clamp-2">
          {title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <FaStar className="text-yellow-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {rating || 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
