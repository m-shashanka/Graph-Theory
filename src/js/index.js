import Graph from "./graph.js";
import drawGraph from "./createGraph.js";
import checkBipartite from "./bipartite.js";

var G;

document.getElementById("form-input").addEventListener("submit",handleInput);

function handleInput(e){
    e.preventDefault();
    var myForm = document.getElementById("form-input");
    var v = +myForm.vnum.value
    var e = +myForm.enum.value;
    var edges = null;
    var e1 = myForm.edges.value.match(/[-]?\d+/g);
    if(e1)
        edges = e1.map(Number);
    if(Number.isInteger(v) && Number.isInteger(e) && edges && (edges.length == 2*e || edges.length == 3*e)){
        var Edges = [];
        let incr;
        if(edges.length === 2*e)
            incr = 2;
        else
            incr = 3;
        for(let i=0;i<edges.length;i+=incr){
            if(edges[i] < 1 || edges[i] > v || edges[i+1] < 1 || edges[i+1] > v){
                alert("Error: Invalid input");
                return false;
            }
            if(incr === 2)
                Edges.push([edges[i],edges[i+1]]);
            else
                Edges.push([edges[i],edges[i+1],edges[i+2]]);
        }
        G = new Graph(v);
        for(let i=0;i<Edges.length;i++){
            if(Edges[i].length === 2)
                G.addEdge(Edges[i][0],Edges[i][1]);
            else
                G.addEdge(Edges[i][0],Edges[i][1],Edges[i][2]);
        }
        drawGraph(Edges,v,G);
        // setTimeout(function(){
        //     checkBipartite(G);
        // },1000);
    } else{
        alert("Error: Invalid input");
    }
    return false;
}
