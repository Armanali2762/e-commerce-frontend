import React, { useEffect, useState } from 'react';
import { GetAllCategories } from '../Api/GetAllCategories';
import { useGlobals } from './globals.';
const Categories = () => {
  
  const [category, setCategory] = useState([]);

  const [selectedCategories, setSelectedCategories] = useState([]);

  const {setGlobalCategory} = useGlobals();

  const onSelectCategory = (e) => {
    let isSelected = e.target.checked;
    let value = parseInt(e.target.value);
    if(isSelected){ 
      console.log(isSelected);
      setSelectedCategories([...selectedCategories, value])
    }else{
      const updateCategory = selectedCategories.filter((id)=> id!== value);
      setSelectedCategories(updateCategory)
    }
  } 

  useEffect(() => {
    GetAllCategories()
      .then((data) => {
        console.log(data);
        setCategory(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <h5 className='text-center mt-2'>Select Categories</h5>
      {
        setGlobalCategory(selectedCategories)
      }
      {category.length > 0 ? (
        category.map((c) => (
          <label className="category">
            <input
              type="checkbox"
              name="category"
              checked={selectedCategories.includes(c.nu_category_id)}
              value={c.nu_category_id}
              onChange={onSelectCategory}
            />
            {''} {c.vc_Category_Name}
          </label>
        ))
      ) : (
        <p>There is no Category available now</p>
      )}
      <div className='divider mt-1'></div>
    </>
  );
};

export default Categories;
