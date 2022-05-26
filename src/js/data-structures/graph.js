export default class Graph{
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

    addEdge(u, v, w)
    {
        if(w === undefined){
            this.AdjList.get(u).push(v);
            this.AdjList.get(v).push(u);
        }
        else{
            this.AdjList.get(u).push([v,w]);
            this.AdjList.get(v).push([u,w]);
        }
    }

    get size(){
        return this.noOfVertices;
    }
}