function preload(){
    classifier=ml5.imageClassifier("DoodleNet");
}

function setup(){
    canvas=createCanvas(300,300);
    background("white");
    canvas.center();

    canvas.mouseReleased(classifyCanvas);
    synth=window.speechSynthesis;
}

function draw(){
    strokeWeight(10);
    stroke("purple");
    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function clear_canvas(){
    background("white");
}

function classifyCanvas(){
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);

        document.getElementById("label").innerHTML="Label: "+results[0].label;

        document.getElementById("confidence").innerHTML="Confidence: "+Math.round(results[0].confidence*100)+"%";
        
        utterThis=new SpeechSynthesisUtterance(results[0].label);
        synth.speak(utterThis);
    }
}