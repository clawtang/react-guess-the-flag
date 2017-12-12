import React from 'react';
import { string } from 'prop-types';

import './Flag.css';

Flag.propTypes = {
  flagImageUrl: string.isRequired
}

function Flag({flagImageUrl}) {
  return (
    <div className="flag-container">
      <img
        className="flag-image"
        src={flagImageUrl}
        alt="flag to guess"
      />
    </div>
  );
}

export default Flag;
