import React, { useState } from "react";
import Matrix from "./MatrixInput";
import DisplayMatrix from "./MatrixDisplay";
import { Typography, Grid2, TextField, Button } from "@mui/material";
import "./MatrixCal.css";

function ShowMatrix() {
  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);
  const [matrixA, setMatrixA] = useState([]);
  const [matrixB, setMatrixB] = useState([]);
  const [result, setResult] = useState(null);

  //Generating Matrix Function

  const handleGenerateMatrix = () => {
    const newMatrixA = [];
    const newMatrixB = [];
    for (let i = 0; i < rows; i++) {
      const rowA = [];
      const rowB = [];
      for (let j = 0; j < columns; j++) {
        rowA.push(i + j);
        rowB.push(i * j);
      }
      newMatrixA.push(rowA);
      newMatrixB.push(rowB);
    }
    setMatrixA(newMatrixA);
    setMatrixB(newMatrixB);
    setResult(null);
  };

  //Updating cell of either matrixA or matrixB

  const handleMatrixChange = (matrix, row, col, value) => {
    const updatedMatrix = matrix.map((r) => [...r]);
    updatedMatrix[row][col] = value;
    if (updatedMatrix === matrixA) {
      setMatrixA(updatedMatrix);
    } else {
      setMatrixB(updatedMatrix);
    }
  };

  //Matrix Operation

  const handleOperation = (operation) => {
    let resultTotalRows = [];
    for (let i = 0; i < rows; i++) {
      let resultIndividualRows = [];
      for (let j = 0; j < columns; j++) {
        const a = matrixA[i][j] ?? 0;
        const b = matrixB[i][j] ?? 0;
        let cellResult;
        if (operation === "add") {
          cellResult = a + b;
        } else if (operation === "subtract") {
          cellResult = a - b;
        } else if (operation === "multiply") {
          cellResult = a * b;
        } else {
          cellResult = 0;
        }
        resultIndividualRows.push(cellResult);
      }
      resultTotalRows.push(resultIndividualRows);
    }
    setResult(resultTotalRows);
  };

  //Changing row cell value
  const HandleRowChange = (e) => {
    setRows(+e.target.value);
    setMatrixA([]);
    setMatrixB([]);
    setResult(null);
  };

  //Changing column cell value
  const HandleColumnChange = (e) => {
    setColumns(+e.target.value);
    setMatrixA([]);
    setMatrixB([]);
    setResult(null);
  };
  return (
    <>
      <Grid2 container spacing={2} className="matrix-generation">
        <Grid2 item xs={12}>
          <Typography variant="h2" className="heading">
            Matrix Operations
          </Typography>
          <Grid2 item xs={12} md={10}>
            <TextField
              type="number"
              placeholder="Rows"
              onChange={HandleRowChange}
            />
            <TextField
              type="number"
              placeholder="Columns"
              onChange={HandleColumnChange}
            />
          </Grid2>
          <Button
            variant="contained"
            onClick={handleGenerateMatrix}
            className="generate-matrix-btn"
          >
            Generate Matrix
          </Button>
        </Grid2>
      </Grid2>
      <Grid2 container spacing={2} className="matrix-display">
        <Grid2 item xs={12} md={12} lg={12}>
          <div className="matrix-container">
            <div className="matrix-section">
              <Typography variant="h3">Matrix A</Typography>
              {matrixA.length > 0 && (
                <Matrix
                  matrix={matrixA}
                  onChange={(row, col, value) =>
                    handleMatrixChange(matrixA, row, col, +value)
                  }
                  rows={rows}
                  columns={columns}
                />
              )}
            </div>
            <div className="matrix-section">
              <Typography variant="h3">Matrix B</Typography>
              {matrixB.length > 0 && (
                <Matrix
                  matrix={matrixB}
                  onChange={(row, col, value) =>
                    handleMatrixChange(matrixB, row, col, +value)
                  }
                  rows={rows}
                  columns={columns}
                />
              )}
            </div>
          </div>
        </Grid2>
      </Grid2>
      <Grid2 container spacing={2} className="button-container">
        <Grid2 item xs={12} md={12} lg={12}>
          <div className="button-group">
            <Button variant="contained" onClick={() => handleOperation("add")}>
              Add Matrices
            </Button>
            <Button
              variant="contained"
              onClick={() => handleOperation("subtract")}
            >
              Subtract Matrices
            </Button>
            <Button
              variant="contained"
              onClick={() => handleOperation("multiply")}
            >
              Multiply Matrices
            </Button>
            {/* Rendering Result */}
          </div>
        </Grid2>
      </Grid2>
      <Grid2 container spacing={2} className="result-matrix-block">
        <Grid2 item xs={12} md={12} lg={12}>
          <div>
            <Typography variant="h4"> Result Matrix </Typography>
            <DisplayMatrix matrix={result} />
          </div>
        </Grid2>
      </Grid2>
    </>
  );
}
export default ShowMatrix;
