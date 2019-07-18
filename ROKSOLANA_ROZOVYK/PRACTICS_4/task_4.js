function getProtoChain(obj)
{
   if(obj === null)
   {
      return 'null';
   }
   return typeof(obj) + ' > ' + getProtoChain(obj.__proto__);
}

console.log(getProtoChain([]));
console.log(getProtoChain(Object));
console.log(getProtoChain(1));