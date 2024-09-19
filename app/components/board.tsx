'use client'
import { Coordinate } from "../type";
import { useState } from "react";

export default function Board({chessGrids, Play}:{
    chessGrids: number[][];  
    Play: (start: Coordinate, target: Coordinate) => void;  
  }){
    const [clickStatus, setClickStatus] = useState<Coordinate[]>([]);

    function updateClickStatus(row:number, col:number){
        const cor: Coordinate = {
            row: row,
            col: col
        }

        if(clickStatus.length===0){
            setClickStatus([cor]);
        }
        else{
            const current = clickStatus[0];
            if((current.row !== cor.row) && (current.col !== cor.col)){
                setClickStatus([cor]);
            }
            else{
                if(Math.abs(cor.row-current.row + cor.col-current.col) === 2){
                    Play(current, cor);
                    setClickStatus([cor]);
                }
                else{
                    setClickStatus([cor]);
                }
            }
        }
    }

    const boardGrids = [];

    for(let i=0; i<chessGrids.length; i++){
        const tempGrids = [];
        for(let j=0; j<chessGrids[i].length; j++){
            let color;
            let border;
            let hoverColor;
            let clickColor;
            if(chessGrids[i][j] === 1){
                color = 'bg-violet-600';
                border = 'border-2';
                hoverColor = 'bg-red-400';
                clickColor = 'bg-red-900';
            }else if (chessGrids[i][j] === -1){
                color = 'bg-indigo-600';
                border = '';
                hoverColor = '';
                clickColor = '';
            }else{
                color = 'bg-white';
                border = 'border-2';
                hoverColor = '';
                clickColor = '';
            }
        tempGrids.push(<div tabIndex={0} className={`${border} inline-block box-border w-20 h-20 m-0 ${color} hover:${hoverColor} focus:${clickColor}`} key={`${i}-${j}`} onClick={()=>{updateClickStatus(i, j)}}></div>);
        }
        boardGrids.push(<div key={i} className="m-0 box-border">{tempGrids}</div>);
    }
    


    return (
        <div>
            <div className="m-0 leading-0">
                {boardGrids}
            </div>
        </div>
            
    )
}