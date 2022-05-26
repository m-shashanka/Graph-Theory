import Queue from "./queue";
import { colorVertex, colorEdge } from "./colorElements";

const blue = "#1BA8F0";
const red = "#F20000";
const yellow = "#F7D716";

export default async function checkBipartite(G){
    var color = [];
 
    var q = new Queue();
 
    q.enqueue(1);
    color[1] = 0;

    await colorVertex(1,red)
 
    while (!q.isEmpty()) {
        var u = q.dequeue();
 
        var get_List = G.AdjList.get(u);
 
        for (var i in get_List) {
            var v;
            if(Array.isArray(get_List[i]))
                v = get_List[i][0];
            else
                v = get_List[i];
 
            if (color[v] === undefined) {
                await colorEdge(u,v,yellow);
                await colorEdge(u,v,"black");
                color[v] = 1 - color[u];
                if(color[v] == 0)
                    await colorVertex(v,red);
                else
                    await colorVertex(v,blue);
                q.enqueue(v);
            }
            else if(color[v] === color[u]){
                await colorEdge(u,v,yellow);
                await colorEdge(u,v,"black");
                alert("Not Bipartite");
                return;
            }
        }
    }
}