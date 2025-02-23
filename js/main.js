$(document).ready(function () {
    const CheckMat = [
        [0,1,2],
        [1,2,0],
        [0,2,1],
        [3,4,5],
        [4,5,3],
        [3,5,4],
        [6,7,8],
        [7,8,6],
        [6,8,7],
        // ------LIGNES
        [0,3,6],
        [3,6,0],
        [0,6,3],
        [1,4,7],
        [4,7,1],
        [1,7,4],
        [2,5,8],
        [5,8,2],
        [2,8,5],
        //------------COLONNES
        [0,4,8],
        [4,8,0],
        [0,8,4],
        [2,4,6],
        [4,6,2],
        [2,6,4],
        //---- DIAGONALES -- TOTAL : 24
    ];
    document.getElementById('easy').addEventListener('click', () => {
        startGame("Facile");
    });
    document.getElementById('med').addEventListener('click', () => {
        startGame("Difficile");
    });
    
    function firstCommand(mode,color) {
            document.getElementById("modestat").innerText = "Mode : "+mode;
            if(color === 1) {
                document.getElementById('modestat').classList.add('easy-mode-color');
            }else if(color === 2) {
                document.getElementById('modestat').classList.add('hard-mode-color');
            }

            document.getElementsByClassName("menu-general")[0].classList.add('d-none')
            document.getElementsByClassName("game-itself")[0].classList.remove('d-none');
    }
    function getRandomizer(min, max) {
        return Math.floor( Math.random() * ( 1 + max - min ) ) + min;
    }
    function getStats () {
        var data = [];
        var HTMLelements = document.getElementsByClassName('board__cell');
        var arrlengths   = HTMLelements.length;
        for(var i=0;i<arrlengths;i++){
            data.push(document.getElementsByClassName("board__cell")[i].firstElementChild.dataset.id);
        }
        return data;
            
    }
    function checkWeCanWin() {
        var casee = document.getElementsByClassName("board__cell");        
        for (let i=0; i<CheckMat.length; i++){
            if ( (casee[CheckMat[i][0]].children[0].innerText == "X") && 
                (casee[CheckMat[i][1]].children[0].innerText == "X") && 
                (casee[CheckMat[i][2]].children[0].innerText == "")) {  
                DoMove( String(CheckMat[i][2]));  
                return true;
            }
        }
        return false;
    }
    function DoMove(num) {
        // console.log(num);
        if(num != null){
            document.getElementsByClassName('letter')[num].innerText = "X";
            document.getElementsByClassName('letter')[num].dataset.id = "1";
            
            if(checkLose() === true){
                // continue
            }else {
                document.getElementsByClassName('restart-box')[0].classList.remove('d-none');
            }
        }else{
            document.getElementsByClassName('restart-box')[0].classList.remove('d-none');
            document.getElementsByClassName("board__container")[0].classList.add('dapnone');
            document.getElementsByClassName('restart-box')[0].children[0].innerText = "DRAW restart the game";
        }
        
    }
    function filteredNum (data) {
        return Object.keys(data).filter(function(el) {
            return data[el] == "0";
        })
    }
    function algo_du_bot_imbattable() {

            var casee = document.getElementsByClassName("board__cell");
            for (let i=0; i<CheckMat.length; i++){
                if ( (casee[CheckMat[i][0]].children[0].innerText == "O") &&
                     (casee[CheckMat[i][1]].children[0].innerText == "O") &&
                     (casee[CheckMat[i][2]].children[0].innerText == "") ) {
                    return String(CheckMat[i][2]);
                }

            }        
            if ( (casee[2].children[0].innerText == "O") && (casee[6].children[0].innerText == "O") && (casee[4].children[0].innerText == "X") && (casee[1].children[0].innerText == "")) {return "1";}
            else if ( (casee[2].children[0].innerText == "O") && (casee[6].children[0].innerText == "O") && (casee[4].children[0].innerText == "X") && (casee[5].children[0].innerText == "")) {return "5";}
            else if ( (casee[0].children[0].innerText == "O") && (casee[8].children[0].innerText == "O") && (casee[4].children[0].innerText == "X") && (casee[1].children[0].innerText == "")) {return "1";}
            else if ( (casee[0].children[0].innerText == "O") && (casee[8].children[0].innerText == "O") && (casee[4].children[0].innerText == "X") && (casee[3].children[0].innerText == "")) {return "3";}
            else if ( (casee[2].children[0].innerText == "O") && (casee[6].children[0].innerText == "O") && (casee[4].children[0].innerText == "X") && (casee[7].children[0].innerText == "") ) {return "7";}
            else {
                console.log("generated --");

                if( (casee[4].children[0].innerText == "O") ) {
                    let toRemove = ['1','3','4','5','7'];
                    let NumInCorner = filteredNum(getStats()).filter( ( elements ) => !toRemove.includes( elements ) );
                    return NumInCorner[getRandomizer(0,NumInCorner.length-1)];
                }
                if ((casee[4].children[0].innerText == "")) { return "4";}
                else {
                        if( (casee[3].children[0].innerText == "O") && (casee[4].children[0].innerText == "X") && (casee[1].children[0].innerText == "O") && (casee[0].children[0].innerText == "")){return "0"}
                        else if( (casee[8].children[0].innerText == "O") && (casee[4].children[0].innerText == "X") && (casee[1].children[0].innerText == "O") && (casee[5].children[0].innerText == "")){return "5"}
                        else if( (casee[1].children[0].innerText == "O") && (casee[4].children[0].innerText == "X") && (casee[6].children[0].innerText == "O") && (casee[5].children[0].innerText == "")){ return "5"}
                        else if( (casee[0].children[0].innerText == "O") && (casee[4].children[0].innerText == "X") && (casee[7].children[0].innerText == "O") && (casee[3].children[0].innerText == "")){ return "3"}
                        else if( (casee[1].children[0].innerText == "O") && (casee[4].children[0].innerText == "X") && (casee[7].children[0].innerText == "O") && (casee[2].children[0].innerText == "")){return "2"}
                        else if( (casee[3].children[0].innerText == "O") && (casee[4].children[0].innerText == "X") && (casee[1].children[0].innerText == "O") && (casee[2].children[0].innerText == "")){  return "2"}
                        else if( (casee[5].children[0].innerText == "O") && (casee[4].children[0].innerText == "X") && (casee[1].children[0].innerText == "O") && (casee[2].children[0].innerText == "")){ return "2";}
                        else if( (casee[7].children[0].innerText == "O") && (casee[4].children[0].innerText == "X") && (casee[5].children[0].innerText == "O") && (casee[8].children[0].innerText == "")){  return "8";}
                        else if( (casee[3].children[0].innerText == "O") && (casee[4].children[0].innerText == "X") && (casee[7].children[0].innerText == "O") && (casee[6].children[0].innerText == "")){ return "6";}
                        else if( (casee[3].children[0].innerText == "O") && (casee[4].children[0].innerText == "X") && ( (casee[8].children[0].innerText == "O") || (casee[2].children[0].innerText == "O") ) && (casee[6].children[0].innerText == "")){ return "6";}
                        else if( (casee[3].children[0].innerText == "O") && (casee[4].children[0].innerText == "X") && ( (casee[8].children[0].innerText == "O") || (casee[2].children[0].innerText == "O") ) && (casee[2].children[0].innerText == "")){return "2";}
                        else if( (casee[5].children[0].innerText == "O") && (casee[4].children[0].innerText == "X") && ( (casee[6].children[0].innerText == "O") || (casee[0].children[0].innerText == "O") ) && (casee[8].children[0].innerText == "")){ return "8";}
                        else if( (casee[5].children[0].innerText == "O") && (casee[4].children[0].innerText == "X") && ( (casee[6].children[0].innerText == "O") || (casee[0].children[0].innerText == "O") ) && (casee[0].children[0].innerText == "")){  return "0"; }
                        else if( (casee[7].children[0].innerText == "O") && (casee[4].children[0].innerText == "X") && ( (casee[2].children[0].innerText == "O") || (casee[0].children[0].innerText == "O") ) && (casee[3].children[0].innerText == "")){return "3";}
                        else {
                            console.log("generated -- uu");
                            return FreeIndexNum();
                        }
   
                    
                }
                
            }
    } 
    function generateNum(data) {
        return data[getRandomizer(0,data.length-1)];
    }
    function FreeIndexNum(data = getStats()) {
        let FreeIndex = generateNum(filteredNum(data))
        return FreeIndex;

    }
    function return_easy_response() {
        setTimeout(
            () => {
                let NumAleatoire = FreeIndexNum();
                DoMove(NumAleatoire);
            }, 500
        )
    }
    function colormyback(x,y,z) {
        document.getElementsByClassName("board__cell")[x].style.backgroundColor = "red";
        document.getElementsByClassName("board__cell")[y].style.backgroundColor = "red";
        document.getElementsByClassName("board__cell")[z].style.backgroundColor = "red";
        // board__container
        document.getElementsByClassName("board__container")[0].style.pointerEvents = "none";
    }
    function checkWin() {
        var casee = document.getElementsByClassName("board__cell");
        for (let i=0; i<CheckMat.length; i+=3){
            if(  ( (casee[CheckMat[i][0]].children[0].innerText == "O") && 
                   (casee[CheckMat[i][1]].children[0].innerText == "O") && 
                   (casee[CheckMat[i][2]].children[0].innerText == "O") ) ) {
                Swal.fire(
                    'You Win',
                    'Good job!',
                    'success'
                    );
                colormyback(CheckMat[i][0],CheckMat[i][1],CheckMat[i][2]);
                return false;
            }
        } 
        return true;
    }
    function checkLose() {
        var casee = document.getElementsByClassName("board__cell");
        for (let i=0; i<CheckMat.length; i+=3){
            if(  ( (casee[CheckMat[i][0]].children[0].innerText == "X") && 
                   (casee[CheckMat[i][1]].children[0].innerText == "X") && 
                   (casee[CheckMat[i][2]].children[0].innerText == "X") ) ) {
                Swal.fire(
                    'You Lose',
                    'Next One ? (glhf)',
                    'error'
                  );
                colormyback(CheckMat[i][0],CheckMat[i][1],CheckMat[i][2]);
                return false;
            }
        } 
        return true;
    }
    function return_hard_response() {
        setTimeout(
            () => {
                if(!checkWeCanWin()) {
                    let newfilterednum = algo_du_bot_imbattable();
                    // console.log();
                    DoMove(newfilterednum);
                }
            }, 500
        )
    }
    function startGame(mode_dif){
        if(mode_dif === "Facile") {
            console.log("EASY mode started");
            firstCommand("FACILE",1);
            var arrayelements=Array.prototype.slice.call(document.getElementsByClassName('board__cell'));
            var arrlength=arrayelements.length;
                for(var i=0;i<arrlength;i++){
                    document.getElementsByClassName("board__cell")[i].addEventListener("click", function(e) {
                        if (e.target.children[0].innerText === "") {
                            e.target.children[0].innerText = "O";
                            e.target.children[0].dataset.id = "1";
                            document.getElementsByClassName("board__container")[0].classList.add('dapnone');
                            setTimeout(() => {
                                document.getElementsByClassName("board__container")[0].classList.remove('dapnone');
                            }, 1000);
                            if(checkWin() === true){
                                return_easy_response();
                            }else {
                                console.log("Restarting in 5sec");
                                document.getElementsByClassName('restart-box')[0].classList.remove('d-none');
                            }
                            
                        }else{
                            alert("you can't edit");

                        }
                    }); 
                }
               
        }else if (mode_dif === "Difficile") {
            console.log("Difficile Mode Started");
            firstCommand("DIFFICILE",2);
            var cell = document.getElementsByClassName('board__cell');
            var arrlength=cell.length;
                for(var i=0;i<arrlength;i++){
                    document.getElementsByClassName("board__cell")[i]
                            .addEventListener("click", function(e) {
                        if (e.target.children[0].innerText === "") {
                            e.target.children[0].innerText = "O";
                            e.target.children[0].dataset.id = "1";
                            if (checkWin()) {
                                return_hard_response();
                            }else {
                                document.getElementsByClassName('restart-box')[0].classList.remove('d-none');
                            }
                            setTimeout(() => {
                                document.getElementsByClassName("board__container")[0].classList.remove('dapnone');
                            }, 1000);
                            document.getElementsByClassName("board__container")[0].classList.add('dapnone');
                        } else {
                            alert("you can't edit");
                        }
                    }); 
                }
        }else if (mode_dif === "MED") {
            console.log("MEDIUM Mode Started");
        }else {
            console.log("No Mode Detected");
        }
    }
}); // FIN
