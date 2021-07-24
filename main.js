img=""
status=""
objects=[]
function preload(){
    img=loadImage("https://image.shutterstock.com/image-photo/golden-retriever-dog-lies-on-260nw-1908100978.jpg")
}

function setup(){
    canvas=createCanvas(600,400)
    canvas.center()
    video=createCapture(VIDEO)
    video.size(600,400)
    video.hide()
    objectDetector=ml5.objectDetector('cocossd',modelLoaded)
    document.getElementById("status").innerHTML="status: detcting objects"
}

function modelLoaded(){
    console.log("modelLoaded")
    status=true;
}

function gotResults(error,results){
if(error){
    console.log(error)
}
console.log(results)
objects=results
}

function draw(){
   image(video,0,0,600,400) 
if(status != ""){
    objectDetector.detect(video,gotResults())
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