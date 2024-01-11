const amount = express.argv[2];

if(amount > 10){
    console.log("Large number!");
}else{
    console.log("Small number!");
}

console.log(__filename);