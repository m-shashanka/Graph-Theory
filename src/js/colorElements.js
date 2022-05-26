import sleep from "./sleep.js";

export async function colorVertex (v,color){
    await sleep(1000);
    document.getElementById("v"+v).style.backgroundColor = color;
}

export async function colorEdge(v1,v2,color){
    if(v1 > v2){
        var temp = v2;
        v1 = v2;
        v2 = temp;
    }
    await sleep(1000);
    document.getElementById("e"+v1+v2).style.backgroundColor = color;
}