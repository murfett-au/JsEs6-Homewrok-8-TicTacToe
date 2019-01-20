const state=[];
let nextClickX=true;
let messageClearTimer;
function handleClick(e) {

	const id=e.target.id;
	if (!id.startsWith('cellcol_')) {
		return true;
	}
	const col = parseInt(id.substring(8,9));
	
	const row = parseInt(id.substring(13,14));
	if (state[row][col]===0) {
		let XorO=nextClickX?"X":"O";
		state[row][col]=XorO;
		e.target.innerText=XorO;
		e.target.style.color = nextClickX?"red":"black";
		nextClickX = ! nextClickX;
		const whoWon = checkWhoWon();
		console.log("who won:" + whoWon);
		if (whoWon) {
			setTimeout(()=>{// I put this in to give the X or O time to render from the innerText above.
				alert('Yay! Go ' + whoWon);
				buildBoard();
			},10);
			
		}
	} else {
		const msgDiv=document.getElementById('message');
		msgDiv.innerText = "Taken! Try another square";
		clearTimeout(messageClearTimer);
		messageClearTimer = setTimeout(()=>{msgDiv.innerText="";},1000);
	}

}
function checkWhoWon() {
	console.log(state);
	let allXsColRow;
	let allOIsColRow;
	let allXsRowCol;
	let allOsRowCol;
	for (let i=0;i<3;i++) {
		allXsColRow=true;
		allOsColRow=true;
		allXsRowCol=true;
		allOsRowCol=true;
		for(let j=0;j<3;j++) {
			console.log("i="+i);
			console.log("j="+j);
			if (state[i][j]===0) {
				allXsRowCol=false;
				allOsRowCol=false;
			} else if (state[i][j]==='X') {
				allOsRowCol = false;
			} else if (state[i][j]==='O') {
				allXsRowCol = false;
			}
			if (state[j][i]===0) {
				allXsColRow=false;
				allOsColRow=false;
			} else if (state[j][i]==='X') {
				allOsColRow = false;
			} else if (state[j][i]==='O') {
				allXsColRow = false;
			}
		}
		if (allXsColRow) return 'X';
		if (allOsColRow) return 'O';

	}
	// last check the diagonal:
	let allXsTopLeftToBottomRight = true;
	let allOsTopLeftToBottomRight = true;
	let allXsTopRightToBottomLeft = true;
	let allOsTopRightToBottomLeft = true;
	
	for (let i=0;i<3;i++) {
		
		if (state[i][i]===0) {
			allXsTopLeftToBottomRight = false;
			allOsTopLeftToBottomRight = false;
		} else if (state[i][i]==='X') {
			allOsTopLeftToBottomRight = false;
		} else if (state[i][i]==='O') {
			allXsTopLeftToBottomRight = false;
		}
		let j=2-i;
		if (state[i][j]===0) {
			allXsTopRightToBottomLeft = false;
			allOsTopRightToBottomLeft = false;
		} else if (state[i][j]==='X') {
			allOsTopRightToBottomLeft = false;
		} else if (state[i][j]==='O') {
			allXsTopRightToBottomLeft = false;
		}
	}
	if (allXsTopRightToBottomLeft || allXsTopLeftToBottomRight) return 'X';
	if (allOsTopRightToBottomLeft || allOsTopLeftToBottomRight) return 'O';
	return false;
}
function buildBoard() {
	const parentDivId='ttt';
	const parentDiv = document.getElementById(parentDivId);
	
	while (parentDiv.firstChild) {
	    parentDiv.removeChild(parentDiv.firstChild);
	}
	parentDiv.addEventListener("click",handleClick);// will this add a second listener?
	console.log(parentDiv);
	if (!parentDiv) return false;
	for (let row=0;row<3;row++) {
		let rowDiv = document.createElement('div');
		rowDiv.classList.add('row');
		parentDiv.appendChild(rowDiv);
		state[row]=[];
		for (let col=0;col<3;col++) {
			let cell = document.createElement('span');
			const id="cellcol_" + col + "row_" + row;
			cell.id = id;
			cell.classList.add("cell");
			
			cell.innerHTML="&nbsp;";
			rowDiv.appendChild(cell);
			state[row][col]=0;
		}
	}
}
document.addEventListener('DOMContentLoaded',buildBoard);