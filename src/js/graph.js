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

    addEdge(u, v)
    {
        this.AdjList.get(u).push(v);
        this.AdjList.get(v).push(u);
    }
}