import Queue from "../data-structures/queue.js";
import drawEdge from "./createLine";

export default function drawGraph(Edges,G){

    var radius = screen.height/18;

    var visited = {};
 
    var q = new Queue();
 
    visited[1] = true;
    q.enqueue([1,0]);
 
    while (!q.isEmpty()) {
        var node = q.dequeue();

        var u = node[0];
        var level = node[1];

        var canvas = document.getElementById("graph");
        var row = canvas.getElementsByClassName("level")[Math.abs(level)];
        if(!row){
            row = document.createElement('div');
            row.setAttribute('id',`l${level}`);
            row.setAttribute('class','level');
            canvas.appendChild(row);
        }

        var element = document.createElement('div');
        element.setAttribute('id',`v${u}`);
        element.setAttribute('class','node');
        element.style.width = radius;
        element.style.height = radius;
        element.innerHTML = `<h2>${u}</h2>`;
        row.appendChild(element);
 
        var get_List = G.AdjList.get(u);
 
        for (var i in get_List) {
            var v;
            if(Array.isArray(get_List[i]))
                v = get_List[i][0];
            else
                v = get_List[i];
 
            if (!visited[v]) {
                visited[v] = true;
                q.enqueue([v,level-1]);
            }
        }
    }

    for(let i=0;i<Edges.length;i++){
        if(Edges[i].length === 2)
            drawEdge(Math.min(Edges[i][0],Edges[i][1]),Math.max(Edges[i][0],Edges[i][1]));
        else
            drawEdge(Math.min(Edges[i][0],Edges[i][1]),Math.max(Edges[i][0],Edges[i][1]), Edges[i][2]);
    }

}