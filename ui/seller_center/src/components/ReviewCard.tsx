import React from "react";

interface ReviewCardProps {
  icon: string;
  title: string;
  description: string;
  newTag?: boolean;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  icon,
  title,
  description,
  newTag,
}) => {
  return (
    <div
      className="review-card border p-4 rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-blue-700 relative text-white transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:brightness-110"
      style={{
        backgroundImage: "linear-gradient(90deg, #2FCBFF, #3979FF)",
      }}
    >
      {newTag && (
        <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded shadow-md animate-pulse">
          Mới
        </span>
      )}
      <div className="flex items-center mb-4">
        <img
          src={icon}
          alt={title}
          className="w-8 h-8 mr-3 animate-bounce hover:animate-none"
        />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-gray-200">{description}</p>
    </div>
  );
};

export default ReviewCard;
