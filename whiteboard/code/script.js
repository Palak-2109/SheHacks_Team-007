var colorr;
var bg;
var socket;


// // https://www.w3schools.com/jsref/prop_loc_search.asp  --- window.location.search 
const querystring = window.location.search; //to get a particular part(after ?) of the url of the cuurent window , we store it into this variable
console.log(querystring);
// // const x= "key=12345";


// // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams --- URLSearchParams
const url= new URLSearchParams(querystring); //return object of the querystring part..mtlb ek string bna deta taki hm usme kch particular functions perform kr ske
var roomID=url.get("key"); //each url will have a different key therefore a different roomID.
console.log(roomID);


// // https://www.geeksforgeeks.org/p5-js-setup-function/ --- setup function
function setup() {
    createCanvas(windowWidth, windowHeight-4.5);
    background(255);
    bg=0;
    strokee=document.getElementById('stroke');
    colorr="#000000";
    socket=io();
    socket.emit('create',roomID);//us room me aa jyga ye client
    socket.on('move',drawing);
}



//jb draw krenge to mouseDragged wala function call hoga or wo data me sari values assign kr dega or fir wha se move wala event emit hoga or jb server side ye wala event receive hoga tb ye draw wala function call hoga :)
function drawing(data)
{
    bg=data.bgcolor;//bg color 
    if(bg==1){
        background(255);
        bg=0;
    }

    stroke(data.color);
    strokeWeight(data.stroke_Weight);
    line(data.x, data.y, data.px, data.py);
}

function mouseDragged(){
    console.log(mouseX," ",mouseY," ",pmouseX," ",pmouseY);
    data={
        x:mouseX,//current x position of the mouse pointer
        y:mouseY,//current y position of the mouse pointer
        px:pmouseX,//x position wrt the previous frame..mane just pehle wale instance pr kidar tha
        py:pmouseY,//y position in the previous frame
        color:colorr,//color of the stroke
        stroke_Weight:strokee.value//weight of the stroke
    }
    socket.emit('move',data);//server.js me ye event ko server receive krega or fir draw krega
    stroke(colorr);//p5 me stroke fn h jo color set kr deta stroke ka
    strokeWeight(strokee.value);//stroke ka weight set kr deta..already defined in p5
    line(mouseX,mouseY,pmouseX,pmouseY);//(mouseX,mouseY) or (pmouseX,pmouseY) inke beech straight line kheech dega
}


function deleteDrawing(){
    background(255);
    bg=1;
    data2={
        bgcolor:bg
    }
    socket.emit('move',data2);
}

function changeColorToBlack(){
    colorr="#000000";
    strokee.value=3;
}

function changeColorToRed(){
    colorr="#ff0000";
    strokee.value=3;
}

function changeColorToGreen(){
    colorr="#008000";
    strokee.value=3;
}

function changeColorToBlue(){
    colorr="#0000ff";
    strokee.value=3;
}

function activateEraser(){
    colorr="#ffffff";
    strokee.value=20;
}