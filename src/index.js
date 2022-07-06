import "./styles.css";

import Graph from "./js/data-structures/graph.js";
import drawGraph from "./js/utilities/createGraph.js";
import checkBipartite from "./js/algorithms/bipartite.js";
import articulationPoint from "./js/algorithms/articulationPoint.js";
import sleep from "./js/utilities/sleep.js";
import resetGraph from "./js/utilities/resetGraph.js";
import findBridges from "./js/algorithms/bridges.js";
import kruskal from "./js/algorithms/kruskal.js";
import prim from "./js/algorithms/prim.js";
import bfs from "./js/algorithms/bfs.js";
import dfs from "./js/algorithms/dfs.js";
import checkFBT from "./js/utilities/checkFBT.js";
import preorder from "./js/algorithms/preorder.js";
import inorder from "./js/algorithms/inorder.js";
import postorder from "./js/algorithms/postorder.js";
import checkConnected from "./js/utilities/checkConnected.js";

var G, Edges, isFBT;

document.getElementById("form-input").addEventListener("submit",handleInput);

export async function handleInput(e){
    e.preventDefault();
    var myForm = document.getElementById("form-input");
    var v = +myForm.vnum.value
    var e = +myForm.enum.value;
    var edges = null;
    var e1 = myForm.edges.value.match(/[-]?\d+/g);
    const visEdges = new Map();
    if(e1)
        edges = e1.map(Number);
    if(Number.isInteger(v) && Number.isInteger(e) && edges && (edges.length == 2*e || edges.length == 3*e)){
        Edges = [];
        let incr;
        if(edges.length === 2*e)
            incr = 2;
        else
            incr = 3;
        for(let i=0;i<edges.length;i+=incr){
            let u1 = edges[i], u2 = edges[i+1];
            if(u1 < 1 || u1 > v || u2 < 1 || u2 > v || visEdges.get([Math.min(u1,u2),Math.max(u1,u2)].toString())){
                alert("Error: Vertices should be between 1 and n with no edge repetition");
                return false;
            }
            visEdges.set([Math.min(u1,u2),Math.max(u1,u2)].toString(),true);
            if(incr === 2)
                Edges.push([u1,u2]);
            else
                Edges.push([u1,u2,edges[i+2]]);
        }
        G = new Graph(v);
        for(let i=0;i<Edges.length;i++){
            if(Edges[i].length === 2)
                G.addEdge(Edges[i][0],Edges[i][1]);
            else
                G.addEdge(Edges[i][0],Edges[i][1],Edges[i][2]);
        }
        if(!checkConnected(G, v)){
            alert("Graph should not be disconnected");
            return;
        }
        document.getElementById("input").style.transform = "translateY(-60%)";
        document.getElementById("graph").innerHTML += "<h1>Building graph....</h1>";
        await sleep(2100);
        isFBT = checkFBT(G);
        const g1 = document.getElementById("graph");
        g1.removeChild(g1.firstElementChild);
        drawGraph(Edges,G);
    } else{
        alert("Error: Invalid input");
    }
    return false;
}


export async function handleChoice(val){

    document.querySelectorAll('#menu button').forEach(ele =>{
        ele.disabled = true;
    });

    await sleep(500);

    resetGraph(G);

    if(val == "preorder"){
        if(!isFBT)
            alert("This graph is not a full binary tree");
        else
            await preorder(G);
    }
    else if(val == "inorder"){
        if(!isFBT)
            alert("This graph is not a full binary tree");
        else
            await inorder(G);
    }
    else if(val == "postorder"){
        if(!isFBT)
            alert("This graph is not a full binary tree");
        else
            await postorder(G);
    }
    else if(val == "dfs")
        await dfs(G);
    else if(val == "bfs")
        await bfs(G);
    else if(val == "bipartite")
        await checkBipartite(G);
    else if(val == "cut-vertex")
        await articulationPoint(G);
    else if(val == "cut-edge")
        await findBridges(G);
    else if(val == "kruskals"){
        if(Edges[0].length != 3)
            alert("Enter a graph with weighted edges");
        else
            await kruskal(G,Edges);
    }
    else if(val == "prims"){
        if(Edges[0].length != 3)
            alert("Enter a graph with weighted edges");
        else
            await prim(G);
    }

    document.querySelectorAll('#menu button').forEach(ele =>{
        ele.disabled = false;
    });
}