import React from "react";
import { Grid } from "react-virtualized";
import "./DisplayMatrix.css";

const DisplayMatrix = ({ matrix }) => {
  if(!matrix){
    return null;
  }
  const rowCount = matrix.length;
  const columnCount = matrix[0]?.length || 0;

  const cellRenderer = ({ columnIndex, rowIndex, key, style }) => {
    return (
      <>
        <div key={key} style={style} className="display-cell">
          {matrix[rowIndex][columnIndex]}
        </div>
      </>
    );
  };
  return (
    <>
      <div className="result-matrix">
        <Grid
          cellRenderer={cellRenderer}
          columnCount={columnCount}
          columnWidth={100}
          height={400}
          rowCount={rowCount}
          width={800}
          rowHeight={40}
        />
      </div>
    </>
  );
};

export default DisplayMatrix
