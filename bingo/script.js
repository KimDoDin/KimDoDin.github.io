const tds = document.querySelectorAll('td');
let wins = document.getElementById('wins')

const winOptions = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, "free", 12, 13],
    [14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23],
    [0, 5, 10, 14, 19],
    [1, 6, 11, 15, 20],
    [2, 7, "free", 16, 21],
    [3, 8, 12, 17, 22],
    [4, 9, 13, 18, 23],
    [0, 6, "free", 17, 23],
    [4, 8, "free", 15, 19],
  ];

function checkBingo(){
    let numBingos = 0;
    for (let i = 0; i < winOptions.length; i++){
        let hasBingo = winOptions[i].every((box)=> {
            return document
            .querySelector(`#square${box}`)
            .classList.contains('stamped');
        });
        if(hasBingo){
            numBingos++;
            // console.log('bingo');
            for (let j = 0; j<winOptions[i].length; j++){
                document
                .querySelector(`#square${winOptions[i][j]}`)
                .classList.add('green');
            }
        }
    }
    let bingos = numBingos === 1?"Bingo" : "Bingos";
    wins.textContent = `${numBingos} ${bingos}`
}

function removeBingos(){
    for (let i = 0; i < tds.length; i++){
        tds[i].classList.remove('green');
    }
}

function handleStamp(e){
    //code for stamping a box
    let box = e.currentTarget;
    if(box.classList.contains("stamped")){
        box.classList.remove('stamped');
        removeBingos();
        checkBingo();
    } else {
        box.classList.add('stamped');
        checkBingo();

    }

}

for (let i = 0; i < tds.length; i++){
    tds[i].addEventListener('click', handleStamp);
}

let free = document.querySelector("#squarefree");
free.removeEventListener('click', handleStamp);




function reset() {    
    number = 0;
    document.querySelector('a').innerHTML = 0;
}