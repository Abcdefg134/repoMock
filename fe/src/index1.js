const learn = ()=>{
    console.log('1');
}
const eat = ()=>{
    console.log('2');
}
const wake = ()=>{
    console.log('4');
}

const man = async ()=>{
    await wake()
    await eat()
    await learn()
}

man()

function f1 (){
    var a = 2
    console.log(a);
    function f2 (){
        a += 1
        console.log(a);
    }
    return f2
}
 const result = f1()
 result()
 result()
 result()


 const arr = [1,2,3,0,6,2,5,,6,10]
 arr.filter(x=>x>3)

 const bill = (meatPrice)=>{
    const tip = meatPrice*0.15
    return a ={
        meatPrice,
        tip: tip,
        sum: meatPrice + tip
    }
    console.log(a);
 }
bill(1000)
 