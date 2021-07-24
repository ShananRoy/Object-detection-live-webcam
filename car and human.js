img=""
status=""
objects=[]
function preload(){
    img=loadImage("https://image.shutterstock.com/image-photo/young-couple-excited-about-buying-600w-1668414958.jpg")
}

function setup(){
    canvas=createCanvas(600,400)
    canvas.center()
    objectDetector=ml5.objectDetector('cocossd',modelLoaded)
    document.getElementById("status").innerHTML="status: detcting objects"
}

function modelLoaded(){
    console.log("modelLoaded")
    status=true;
    objectDetector.detect(img,gotResults)
}

function gotResults(error,results){
if(error){
    console.log(error)
}
console.log(results)
objects=results
}

function draw(){
    image(img,0,0,600,400)
if(status != ""){
    for (let i = 0; i < objects.length; i++) {
        document.getElementById("status").innerHTML="status: detcting objects"
        fill("red");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
    noFill()
    stroke("red") 
    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
}
}