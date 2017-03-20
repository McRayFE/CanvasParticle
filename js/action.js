/**
 * Created by 佳锐 on 2017/3/20.
 */
window.onload = function(){
  var canvas = document.createElement("canvas");
  var context = canvas.getContext('2d');
  var canvasHeight = window.innerHeight;
  var canvasWidth = window.innerWidth;
  //初始化一个数组存放粒子
  var particles = [];
  init();
  function init(){
      document.body.appendChild(canvas);
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
  }
  document.onclick = function(e){
      var x = e.clientX;
      var y = e.clientY;
      console.log(e.clientX);
      console.log(e.clientY);
      setInterval(function(){
          loop(x,y);
      },1000/30);
  };
  function loop(x,y){
     //清除canvas中的内容
      context.fillStyle = "rgba(0,0,0,1)";
      context.fillRect(0,0,canvasWidth,canvasHeight);
      //随机产生一个粒子
      var particle = new Particle(x,y);
      particle.xVel = Math.random()*4-2;//给粒子一个水平位置变化量
      particles.push(particle);//加入数组中
      if(particles.length > 2000){
          particles.shift();
      }
      for(var i=0;i<particles.length;i++){
          var particle = particles[i];
          //绘制数组中的每一个粒子
          particle.render(context);
          //更新数组中的每一个粒子
          particle.update();
      }
  }
  //粒子类
  function Particle(x,y){
      this.x = x;
      this.y = y;
      this.step = -5;//加入垂直方向的增量,负值就向上运动
      this.xVel = 0;
      this.gravity = 0.1;//增加重力影响
      this.counter = 0;//影响颜色
      this.render = function(context){
          //hsl(H,S,L)
          //H:0-360,S:饱和度0.0%-100.0%，L：亮度0.0%-100.0%
          context.fillStyle = "hsl("+this.counter+",100%,50%)";
          context.beginPath();
          context.arc(this.x,this.y,3,0,2*Math.PI,true);
          context.fill();
      };
      this.update = function(){
          this.y += this.step;
          this.step += this.gravity;
          this.x += this.xVel;
          this.counter += 2;
      };
  }
};