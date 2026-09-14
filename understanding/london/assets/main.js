(function(){
  var bar=document.querySelector('.progress');
  if(bar){
    var tick=function(){
      var h=document.documentElement.scrollHeight-window.innerHeight;
      bar.style.width=(h>0?(window.scrollY/h)*100:0)+'%';
    };
    tick();window.addEventListener('scroll',tick,{passive:true});
    window.addEventListener('resize',tick);
  }
})();
