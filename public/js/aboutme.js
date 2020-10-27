

export const introHoa = () => {
    const arr = ['I AM A WEB DEVELOPER','WEB DESIGNER','IM READLY GOOD AT :', '1/ FRONT END DEVELOPER', '2/ BACK END DEVELOPER', 'MY TARGET: FULL STACK DEVELOPER'];
   
    let i = 0;
    let elArray = 0;
    let tam = true;
    
    function a() {
    
    
      var id = setInterval(() => {
    
        if (i === arr[elArray].length) {
          // LUOT VE
          clearInterval(id);
    
          i = (arr[elArray].length - 1);
          tam = false;
          a();
    
        } else {
          // LUOT DI
          if (tam) {
            plus();
          } else {
            minus();
          }
    
        }
    
      }, 100);
    
    }
    
    a();
    
    
    function plus() {
      introMe.innerHTML += arr[elArray].charAt(i++);
    }
    function minus() {
      if(i < 0){
        i = 0;
        tam = true;
        introMe.innerHTML = "";
        // chuyen el array
        elArray++;
        if(elArray >= arr.length){
          elArray = 0;
        }
      }else{
        introMe.innerHTML = arr[elArray].slice(0, i--);
      }
    }
}
