import React from 'react';

const CategoryFilter = ({ categories, setSelectedCategory }) => {
  return (
    <div>
      <label htmlFor="categories">Filter by Category:</label>
      <select
        id="categories"
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
