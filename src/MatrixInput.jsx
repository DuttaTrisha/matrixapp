
import React from "react";
import { Grid } from "react-virtualized";
import "./MatrixInput.css";

const Matrix = ({ matrix, onChange, rows, columns }) => {
  const handleCellValueChange = (rowIndex, columnIndex, value) => {
    const newValue = isNaN(value)
      ? matrix[rowIndex][columnIndex]
      : parseFloat(value);
    onChange(rowIndex, columnIndex, newValue);
  };
  const cellRenderer = ({ rowIndex, columnIndex, key, style }) => {
    return (
      <div key={key} style={style} className="matrix-cell">
        <input
          type="number"
          value={matrix[rowIndex][columnIndex]}
          onChange={(e) =>
            handleCellValueChange(rowIndex, columnIndex, e.target.value)
          }
        />
      </div>
    );
  };
  return (
    <>
      <Grid
        cellRenderer={cellRenderer}
        columnCount={columns}
        rowCount={rows}
        width={450}
        rowHeight={70}
        columnWidth={90}
        height={300}
      />
    </>
  );
};
export default Matrix;
