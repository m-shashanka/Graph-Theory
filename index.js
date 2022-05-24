class Graph{
    constructor(noOfVertices)
    {
        this.noOfVertices = noOfVertices;
        this.AdjList = new Map();
        for(var i=1;i<=noOfVertices;i++)
            this.addVertex(i);
    }

    addVertex(v)
    {
        this.AdjList.set(v, []);
    }

    addEdge(u, v)
    {
        this.AdjList.get(u).push(v);
        this.AdjList.get(v).push(u);
    }
}

class Queue {
    constructor()
    {
        this.items = [];
    }
    enqueue(element)
    {    
        this.items.push(element);
    }
    dequeue()
    {
        if(this.isEmpty())
            return "Underflow";
        return this.items.shift();
    }
    isEmpty()
    {
        return this.items.length == 0;
    }
}

var G;

function handleInput(e){
    e.preventDefault();
    var myForm = document.getElementById("form-input");
    var v = +myForm.vnum.value
    var e = +myForm.enum.value;
    var edges = myForm.edges.value.match(/\d+/g).map(Number);
    if(Number.isInteger(v) && Number.isInteger(e) && edges.length == 2*e){
        var Edges = [];
        for(let i=0;i<edges.length;i+=2){
            if(edges[i] < 1 || edges[i] > v || edges[i+1] < 1 || edges[i+1] > v){
                alert("Error: Invalid input");
                return false;
            }
            Edges.push([edges[i],edges[i+1]]);
        }
        G = new Graph(v);
        for(let i=0;i<Edges.length;i++)
            G.addEdge(Edges[i][0],Edges[i][1]);
        drawGraph(Edges);
    } else{
        alert("Error: Invalid input");
    }
    return false;
}

const getOffset = (el) => {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.pageXOffset,
        top: rect.top + window.pageYOffset,
        width: rect.width || el.offsetWidth,
        height: rect.height || el.offsetHeight
    };
}

const connect = (div1, div2, color, thickness) => {
    const off1 = getOffset(div1);
    const off2 = getOffset(div2);

    const x1 = off1.left + off1.width/2;
    const y1 = off1.top + off1.height/2;

    const x2 = off2.left + off2.width/2;
    const y2 = off2.top + off2.height/2;

    const length = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));

    const cx = ((x1 + x2) / 2) - (length / 2);
    const cy = ((y1 + y2) / 2) - (thickness / 2);

    const angle = Math.atan2((y1 - y2), (x1 - x2)) * (180 / Math.PI);

    const htmlLine = "<div style='padding:0px; margin:0px; height:" + thickness + "px; background-color:" + color + "; line-height:1px; position:absolute; left:" + cx + "px; top:" + cy + "px; width:" + length + "px; -moz-transform:rotate(" + angle + "deg); -webkit-transform:rotate(" + angle + "deg); -o-transform:rotate(" + angle + "deg); -ms-transform:rotate(" + angle + "deg); transform:rotate(" + angle + "deg);' />";

    document.body.innerHTML += htmlLine;
}

function drawEdge(id1,id2){
    const d1 = document.getElementById(id1);
    const d2 = document.getElementById(id2);
    connect(d1, d2, 'black', 5);
}

function drawGraph(Edges){
    var visited = {};
 
    var q = new Queue();
 
    visited[1] = true;
    q.enqueue([1,0]);
 
    while (!q.isEmpty()) {
        var node = q.dequeue();

        var u = node[0];
        var level = node[1];

        var canvas = document.getElementById("output");
        var row = canvas.getElementsByClassName("level")[Math.abs(level)];
        if(!row){
            row = document.createElement('div');
            row.setAttribute('id',level);
            row.setAttribute('class','level');
            canvas.appendChild(row);
        }

        var element = document.createElement('div');
        element.setAttribute('id',u);
        element.setAttribute('class','node');
        element.innerHTML = `<h2>${u}</h2>`;
        row.appendChild(element);
 
        var get_List = G.AdjList.get(u);
 
        for (var i in get_List) {
            var v = get_List[i];
 
            if (!visited[v]) {
                visited[v] = true;
                q.enqueue([v,level-1]);
            }
        }
    }

    for(let i=0;i<Edges.length;i++)
        drawEdge(Edges[i][0],Edges[i][1]);

}