import React from 'react';

import InfoIcon from '@mui/icons-material/Info';

const PdfButton = ({ pdfUrl }) => {
  // Function to handle opening the PDF
  const openPdf = () => {
    window.open(pdfUrl, '_blank'); // Opens PDF in new tab
  };

  return (
    <InfoIcon 
style={{
  cursor: 'pointer',
  marginLeft:'15',
  color: '#0E8388',  // Adjust the color as needed
  fontSize: 24       // Adjust size if necessary
}}
onClick={openPdf}  // Open PDF on click
/>
  );
};

export default PdfButton;
