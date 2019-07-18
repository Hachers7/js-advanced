function sum(...args){
    let sum_var = 0;
    for(let i = 0; i < args.length; i++)
    {
        sum_var += args[i];
    }
    console.log(sum_var);
    return;
}

sum(1, 2, 3, 4, 5);
sum(255, 11, 200);
sum(10, -2);