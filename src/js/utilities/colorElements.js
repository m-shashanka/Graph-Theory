import sleep from "./sleep.js";

export async function colorVertex (v,color){
    const node = document.getElementById("v"+v);
    if(window.getComputedStyle(node).backgroundColor == color)
        return;
    await sleep(1000);
    node.style.backgroundColor = color;
}

export async function colorEdge(v1,v2,color){
    if(v1 > v2){
        var temp = v2;
        v2 = v1;
        v1 = temp;
    }
    await sleep(1000);
    document.getElementById("e"+v1+v2).style.backgroundColor = color;
}