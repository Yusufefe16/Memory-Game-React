import { createSlice, nanoid } from "@reduxjs/toolkit";

const cardImages = [
    {src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Logo_C_sharp.svg/1200px-Logo_C_sharp.svg.png"},
    {src: "https://seeklogo.com/images/G/go-logo-046185B647-seeklogo.com.png"},
    {src: "https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Java_programming_language_logo.svg/1200px-Java_programming_language_logo.svg.png"},
    {src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/640px-JavaScript-logo.png"},
    {src: "https://seeklogo.com/images/N/nodejs-logo-FBE122E377-seeklogo.com.png"},
    {src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PHP-logo.svg/2560px-PHP-logo.svg.png"},
    {src: "https://img.freepik.com/free-icon/snakes_318-368381.jpg"},
    {src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"},
    {src: "https://user-images.githubusercontent.com/4249331/52232852-e2c4f780-28bd-11e9-835d-1e3cf3e43888.png"},
    {src: "https://cdn-icons-png.flaticon.com/512/5968/5968371.png"},
];

export const cardSlice = createSlice({
	name: "cards",
	initialState: {
		gameStatus: "continue",
		point: 0,
		items: [],
	},
	reducers: {
		shuffleCards: (state) => {
			let shuffledCard = [...cardImages]
				.map((card) => ({ ...card, id: nanoid() }));
	
			shuffledCard = [...shuffledCard, ...shuffledCard]
				.sort(() => Math.random() - 0.5);

			state.items = shuffledCard;
		},incrementPoint: (state, action) => {
			state.point += action.payload; // action.payload ile ne kadar artırılacağını belirleyebilirsiniz
		},
		decrementPoint: (state, action) => {
			state.point -= action.payload; // action.payload ile ne kadar azaltılacağını belirleyebilirsiniz
		},
		resetPoint:(state)=>{
			state.point=0;
		}
	}
	
});

export const { shuffleCards, incrementPoint, decrementPoint, resetPoint } = cardSlice.actions;
export default cardSlice.reducer;




