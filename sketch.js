let form = ["box", "cone", "sphere", "plane", "cylinder", "torus", "ellipsoid","vertex", "female", "male", "skull", "hand"]
let formVar;
let skull;
let checkbox;
let checkboxVar = false;

let myFont;
function preload() {
  myFont = loadFont('mono.otf');
  male = loadModel("3d/male.obj");
  female = loadModel("3d/female.obj");
  skull = loadModel("3d/skull.obj");
  hand = loadModel("3d/hands.obj");
  skullTexture = loadImage("3d/skull.jpg")
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  //ortho(); // SANS PERSPECTIVE
  //debugMode()

  let r = Math.floor(random(0,form.length))
  formVar = form[r]  

  for (let i = 0; i< form.length; i++){
    button = createButton(form[i]);
    button.position(20, 20 + (i*30));
    button.mousePressed(function(){myForm(i)});
  }
  sizeSlider = createSlider(10, 100);
  sizeSlider.position(100, 20);
  sizeSlider.addClass("mySliders");

  speedSlider = createSlider(0, 100, 20);
  speedSlider.position(100, 40);
  speedSlider.addClass("mySliders");

  numberSlider = createSlider(1, 100);
  numberSlider.position(100, 60);
  numberSlider.addClass("mySliders");

  lightSliderR = createSlider(0, 255,255);
  lightSliderR.position(300, 20);
  lightSliderR.addClass("mySliders");

  lightSliderV = createSlider(0, 255,0);
  lightSliderV.position(300, 40);
  lightSliderV.addClass("mySliders");

  lightSliderB = createSlider(0, 255,255);
  lightSliderB.position(300, 60);
  lightSliderB.addClass("mySliders");

  lightSliderR2 = createSlider(0, 255,255);
  lightSliderR2.position(500, 20);
  lightSliderR2.addClass("mySliders");

  lightSliderV2 = createSlider(0, 255,255);
  lightSliderV2.position(500, 40);
  lightSliderV2.addClass("mySliders");

  lightSliderB2 = createSlider(0, 255,0);
  lightSliderB2.position(500, 60);
  lightSliderB2.addClass("mySliders");

  backgroundR = createSlider(0, 255,255);
  backgroundR.position(700, 20);
  backgroundR.addClass("mySliders");

  backgroundV = createSlider(0, 255,255);
  backgroundV.position(700, 40);
  backgroundV.addClass("mySliders");

  backgroundB = createSlider(0, 255,255);
  backgroundB.position(700, 60);
  backgroundB.addClass("mySliders");

 

  checkbox = createCheckbox('stroke', false);
  checkbox.position(20, windowHeight - 30);
  checkbox.changed(checkboxStroke);

  textFont(myFont);
  textAlign(LEFT)
  textSize(12);
}



let speedBig = 0.005
let numberForms
let marginBottom = 2;
function draw() {
  background(backgroundR.value(),backgroundV.value(),backgroundB.value())
  fill(0)
  
  text('Size', sizeSlider.x -(windowWidth/2), sizeSlider.y -(windowHeight/2)-marginBottom);

  text('Quantity', numberSlider.x -(windowWidth/2), numberSlider.y -(windowHeight/2)-marginBottom);


  text('R light 1', lightSliderR.x -(windowWidth/2), lightSliderR.y -(windowHeight/2)-marginBottom);
  text('G light 1', lightSliderV.x -(windowWidth/2), lightSliderV.y-(windowHeight/2)-marginBottom);
  text('B light 1', lightSliderB.x -(windowWidth/2), lightSliderB.y-(windowHeight/2)-marginBottom);

  text('R light 2', lightSliderR2.x -(windowWidth/2), lightSliderR2.y -(windowHeight/2)-marginBottom);
  text('G light 2', lightSliderV2.x -(windowWidth/2), lightSliderV2.y-(windowHeight/2)-marginBottom);
  text('B light 2', lightSliderB2.x -(windowWidth/2), lightSliderB2.y-(windowHeight/2)-marginBottom);

  text('R background', backgroundR.x -(windowWidth/2), backgroundR.y -(windowHeight/2)-marginBottom);
  text('G background', backgroundV.x -(windowWidth/2), backgroundV.y-(windowHeight/2)-marginBottom);
  text('B background', backgroundB.x -(windowWidth/2), backgroundB.y-(windowHeight/2)-marginBottom);

  text('Speed', speedSlider.x -(windowWidth/2), speedSlider.y-(windowHeight/2)-marginBottom);

  let speedSmall = speedSlider.value()/200000

  
  //orbitControl();
  if (checkboxVar==false) {
    noStroke()
  } else{
    stroke(0)
  }

  push();
  rotateX(sin(frameCount * speedBig))
  rotateY(cos(frameCount * speedBig))
  // rotateZ(-sin(frameCount * speedBig))

  ambientMaterial(255, 255, 255)
  //specularMaterial(255, 0, 255)

  pointLight(lightSliderR.value(), lightSliderV.value(), lightSliderB.value(), 0, -windowWidth/2, 4000)
  pointLight(lightSliderR2.value(), lightSliderV2.value(), lightSliderB2.value(), 0, windowWidth/2, 4000)
  // directionalLight(255, 0, 255, x, y, 0)
  

  numberForms = map(numberSlider.value(),1,100, 200,45)

  //numberForms = 200-numberForms
  if (formVar =="vertex"){
    beginShape();
    numberForms = numberForms /4
    scale(2)
    speedBig = speedSmall * 50

  }

 for (let x = -150; x <= 150; x +=numberForms){
    for (let y = -150; y <= 150; y +=numberForms){
        for (let z = -150; z <= 150; z +=numberForms){

          push()
          fill(255)

          translate(x,y,z)
          rotateX(frameCount * x * speedSmall)
          rotateY(frameCount * y * speedSmall)
          rotateZ(frameCount * z * speedSmall)

          let size = sizeSlider.value();

          //text("S", 0 ,0);
          if (formVar == "cone"){
            cone(size)
          } else if (formVar =="sphere"){
            sphere(size)
          } else if (formVar =="box"){
            box(size)
          } else if (formVar =="plane"){
            plane(size,size)
          } else if (formVar =="cylinder"){
            cylinder(size,size)
          } else if (formVar =="torus"){
            torus(size)
          } else if (formVar =="ellipsoid"){
            ellipsoid(size, size*2, size*2);
          } else if (formVar =="vertex"){
            fill(0)
            point(x*size /100,y*size /100,z*size /100);
            vertex(x*size /100, y*size /100, z*size /100)
          } else if (formVar =="male"){
            rotateX(PI)
            rotateY(PI)
            scale(size/4)
            model(male)
          } else if (formVar =="female"){
            rotateX(PI)
            rotateY(PI)
            scale(size/4)
            model(female)
          } else if (formVar =="skull"){
            rotateX(PI)
            rotateY(PI)
            scale(size/10)
            //texture(skullTexture)
            model(skull)
          } else if (formVar =="hand"){
            rotateX(PI)
            rotateY(PI)
            scale(size*7)
            //texture(skullTexture)
            model(hand)
          }
          pop()
          //vertex(x, y, z)
        }
    }


  }
  if (formVar =="vertex"){endShape(CLOSE);}

  
  pop();

  let zMap = map(sin(frameCount* 0.01) ,-1,1, 0,1000)
  

  //camera(0, 0, zMap)
  
}

function myForm(i){
  console.log(form[i])
  formVar = form[i]
}

function checkboxStroke(){
  if(checkboxVar == true){
    checkboxVar = false;

  } else{
    checkboxVar = true;

  }
}
