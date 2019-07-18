function makeCounter(n)
{
   return function()
   {
      return ++n;
   }  
}

let myCounter = makeCounter(5);

console.log(myCounter());
console.log(myCounter());
