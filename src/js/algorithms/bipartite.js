import Queue from "../data-structures/queue";
import clearTerminal from "../utilities/clearTerminal";
import { colorVertex, colorEdge } from "../utilities/colorElements";
import { blue, red, yellow, black } from "../utilities/constants";

export default async function checkBipartite(G){

    const terminal = clearTerminal();

    var color = [], set1 = [], set2 = [];
 
    var q = new Queue();
 
    q.enqueue(1);
    color[1] = 0;

    await colorVertex(1,red);
 
    while (!q.isEmpty()) {
        var u = q.dequeue();

        if(color[u] === 0)
            set1.push(u);
        else    
            set2.push(u);
 
        var get_List = G.AdjList.get(u);
 
        for (var i in get_List) {
            var v;
            if(Array.isArray(get_List[i]))
                v = get_List[i][0];
            else
                v = get_List[i];
 
            if (color[v] === undefined) {
                await colorEdge(u,v,yellow);
                await colorEdge(u,v,black);
                color[v] = 1 - color[u];
                if(color[v] === 0)
                    await colorVertex(v,red);
                else
                    await colorVertex(v,blue);
                q.enqueue(v);
            }
            else if(color[v] === color[u]){
                await colorEdge(u,v,yellow);
                await colorEdge(u,v,black);
                terminal.innerHTML = "<p>Graph is not bipartite</p>";
                return;
            }
        }
    }

    terminal.innerHTML += `<p>Set 1: &nbsp ${set1.toString()}</p>`;
    terminal.innerHTML += `<p>Set 2: &nbsp ${set2.toString()}</p>`;
}