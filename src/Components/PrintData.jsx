import React from 'react';
import { useGlobals } from './globals.';
const PrintData = ({ cloth }) => {

  const {setGlobalProduct}=useGlobals([]);

  const handleSelectProduct = (e)=>{
    const selectedCloth = JSON.parse(e.target.getAttribute('data-cloth'));
    setGlobalProduct(selectedCloth);
  }

  return (
    <>
      <label className='menu-option'>
        <input
          type="radio"
          name='cloth'
          value={cloth.vc_cloth_code} 
          data-cloth={JSON.stringify(cloth)} 
          onChange={handleSelectProduct}
        />
        {''} {cloth.vc_cloth_code}
      </label>
  </>  
  );
}

export default PrintData;
