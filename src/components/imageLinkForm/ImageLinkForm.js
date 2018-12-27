import React from 'react';
import './imageLinkForm.css'
const ImageLinkForm = ({onInputChange, onButtonSubmit}) =>{
  return(
    <div>
      <p className=' message f4'>
        {'This App will detect a human face in your image'}
      </p>
      <div className='center'>
        <div className='form center pa4 br3 '>
        <input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange} />
        <button
          className=' button w-30 grow f4 link pv1  dib black ba b--black-40  '
          onClick={onButtonSubmit}
          >Detect</button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;
