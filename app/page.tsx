'use client'

import Board from "@/app/components/board"
import { Coordinate }  from "@/app/type"
import { useState } from "react"

export default function SingleChess() {
  //初始化棋牌
  

  const chessGrids_ = Array.from({length: 7}, ()=>Array(7).fill(1));
  const corners = [
    {row: 0, col: 0},
    {row: 0, col: 5},
    {row: 5, col: 0},
    {row: 5, col: 5}
  ];

  corners.forEach(corner => {
    for (let i=0; i < 2; i++){
      for (let j=0; j < 2; j++){
        chessGrids_[i + corner.row][j + corner.col] = -1;
      }
    }
  })


  chessGrids_[3][3] = 0;
  const [chessGrids, setChessGrids] = useState(chessGrids_);

  function Play(start: Coordinate, end: Coordinate) {
    const newChessGrids = JSON.parse(JSON.stringify(chessGrids));
    if ((start.row === end.row) && (Math.abs(start.col - end.col)===2) && (chessGrids[start.row][start.col] === 1) && (chessGrids[end.row][end.col] ===0)) {
      if (chessGrids[start.row][(start.col + end.col) / 2] == 1){
        newChessGrids[start.row][(start.col + end.col) / 2] = 0;
        newChessGrids[start.row][start.col] = 0;
        newChessGrids[end.row][end.col] = 1;
        setChessGrids(newChessGrids);
      }
    }
    else if ((start.col === end.col) && (Math.abs(start.row - end.row)===2) && (chessGrids[start.row][start.col] === 1) && (chessGrids[end.row][end.col] ===0)) {
      if (chessGrids[(start.row + end.row) / 2][start.col] == 1){
        newChessGrids[(start.row + end.row) / 2][start.col] = 0;
        newChessGrids[start.row][start.col] = 0;
        newChessGrids[end.row][end.col] = 1;
        setChessGrids(newChessGrids);
      }
    }
  }


  return (
    <>
      <Board chessGrids={chessGrids} Play={Play}></Board>
    </>
  );
}
