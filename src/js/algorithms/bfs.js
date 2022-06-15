import Queue from "../data-structures/queue";
import clearTerminal from "../utilities/clearTerminal";
import { colorEdge, colorVertex } from "../utilities/colorElements";
import { red, yellow } from "../utilities/constants";

export default async function bfs(G){

    const terminal = clearTerminal();

    var visited = {};
 
    var q = new Queue();

    visited[1] = true;
    q.enqueue([1,0]);

    var str = "";

    while (!q.isEmpty()) {
        var node = q.dequeue();

        var u = node[0], par = node[1];

        str += u;
        str += " &rarr; ";

        if(par != 0)
            await colorEdge(u, par, yellow);

        await colorVertex(u, red);
 
        var get_List = G.AdjList.get(u);
 
        for (var i in get_List) {
            var v;
            if(Array.isArray(get_List[i]))
                v = get_List[i][0];
            else
                v = get_List[i];
 
            if (!visited[v]) {
                visited[v] = true;
                q.enqueue([v,u]);
            }
        }
    }

    str = str.substring(0,str.length - 7);

    terminal.innerHTML = `<p>Traversal: ${str} </p>`
}