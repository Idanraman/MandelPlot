function setup() {
  createCanvas(800, 800);
  pixelDensity(1);
  loadPixels();

}
let zoom = 1;
var min_w = -2.5;
var max_w = 1.5;
var min_h = -2;
var max_h = 2;

function calcscope(zoom,mx,my){
  zoom = zoom*0.03
  if(zoom<0){
    zoom = -1/zoom
  }
  var a = map(mx, 0, width, min_w, max_w);
  var b = map(my, 0 ,height, min_h, max_h);
  min_w = (min_w - a) * zoom + a;
  max_w = (max_w - a) * zoom + a;
  
  min_h = (min_h - b) * zoom + b;
  max_h = (max_h - b) * zoom + b;

}

function draw() {
  colorMode(HSB, 100);

  var max_iters = 100;
  for (var x=0; x<width; x++)
  {
    for (var y=0; y<height; y++)
    {
      
      var a = map(x, 0, width, min_w, max_w);
      var b = map(y, 0 ,height, min_h, max_h);
      
      var orig_a = a;
      var orig_b = b;
      
      var n = 0 ;
      var z = 0;
      
      while (n < max_iters){
        var aa = a*a -b*b;
        var bb = 2*a*b;
        a = aa + orig_a;
        b = bb + orig_b;
        
        if(abs(a+b)>16 )
        {
          break;
        }
        
        n++;
      }
      
      var bright = map(n,0,max_iters,0,100);
      let c = color(bright, 100, 100);
      
      if (n == max_iters){
        c = color(0, 0, 0);
      }

      var pix = (x+y*width)*4;
      pixels[pix+0] = red(c);
      pixels[pix+1] = green(c);
      pixels[pix+2] = blue(c);
      pixels[pix+3]= alpha(c);
    }
  }
  updatePixels();
}

function mouseWheel(event) {
  //print(event.delta);
  //move the square according to the vertical scroll amount
  if (event.delta%25!=0){
    calcscope(event.delta,mouseX,mouseY)
  }
  //uncomment to block page scrolling
  //return false;
}
