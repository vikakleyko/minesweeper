import React, { useState } from 'react';
import './App.css';

const BOMB = "💣";

function App() {
    const [bombs, setBombs] = useState([]);
    const [clicked, setClicked] = useState([]);

    // generate and spread bombs randomly
    const initGame = () => {
        let bombsList = Array(10).fill(0).map(item => Array(10).fill(0));

        bombsList.forEach((item, index) => {
            let position = Math.floor(Math.random() * 10);
            bombsList[index][position] = BOMB;
        });
        setCellsValue(bombsList);
    }

    // set the value for each cell depending on the number of neighboring bombs
    const setCellsValue = bombsList => {
        for(let i = 0; i < bombsList.length; i++){
            for(let j = 0; j < bombsList[i].length; j++){
                if(bombsList[i][j] !== BOMB){
                    let value = 0

                    // check each cell around bomb
                    if(i > 0 && bombsList[i-1][j] === BOMB) {
                        value++
                    }
                    if(i < bombsList.length - 1 && bombsList[i+1][j] === BOMB) {
                        value++
                    }
                    if(j < bombsList.length - 1 && bombsList[i][j+1] === BOMB) {
                        value++
                    }
                    if(j > 0 && bombsList[i][j-1] === BOMB) {
                        value++
                    }
                    if(i < bombsList.length - 1 && j > 0 && bombsList[i+1][j-1] === BOMB) {
                        value++
                    }
                    if(i < bombsList.length - 1 && j < bombsList.length - 1 && bombsList[i+1][j+1] === BOMB) {
                        value++
                    }
                    if(i > 0 && j > 0 && bombsList[i-1][j-1] === BOMB ) {
                        value++
                    }
                    if(i > 0 && j < bombsList.length - 1 && bombsList[i-1][j+1] === BOMB ) {
                        value++
                    }

                    bombsList[i][j] = value;
                }
            }
        }
        setBombs(bombsList);

        // cover cells
        setClicked(Array(10).fill(0).map(item => Array(10).fill(0)));
    };

    const clickCell = (i, j) => {
        if(bombs[i][j] === BOMB) {
            alert("You lost :(");
            window.location.reload();
        }
        checkNeighbours(i, j);
        clicked[i][j] = 1;
        setClicked([...clicked]);
    }

    // open neighboring cells without value
    const checkNeighbours = (i, j) => {
        if(i < 0 || j < 0 || i > clicked.length - 1 || j > clicked[0].length - 1 || clicked[i][j] === 1 || bombs[i][j] === BOMB) return;

        clicked[i][j] = 1;

        setClicked([...clicked]);

        // check top, bottom, right, left cells and cells around
        if(bombs[i][j] < 1){
            checkNeighbours(i, j+1);
            checkNeighbours(i, j-1);
            checkNeighbours(i+1, j);
            checkNeighbours(i-1, j);
        }
    }

    return (
        <div className="app">
            <div className="container">
                <h2>Minesweeper</h2>
                <button onClick={() => initGame()}>New Game</button>
                {bombs.map((arr, index) =>
                    <div>
                        {arr.map((item, i) =>
                            <button
                                onClick={() => clickCell(index, i)}
                                style={clicked[index][i] === 0 ? buttonStyle : clickedButtonStyle}>
                                {clicked[index][i] === 0 ? null : bombs[index][i] === 0 ? '' : bombs[index][i] }
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;

const buttonStyle = {
    width: 36,
    height: 36,
    fontSize: 32,
    backgroundColor: 'black',
    verticalAlign: 'top',
    border: '2px solid #333',
    display: 'inline-block',
    cursor: 'pointer',
}
const clickedButtonStyle = {
    width: 36,
    height: 36,
    fontSize: 24,
    backgroundColor: 'dimgrey',
    color: 'white',
    border: '2px solid black',
    verticalAlign: 'top',
    display: 'inline-block'
}

