import clearTerminal from "../utilities/clearTerminal";
import { colorEdge } from "../utilities/colorElements";
import { yellow, black, green } from "../utilities/constants";

export default async function findBridges(G){
    const terminal = clearTerminal();

    var timer = [0], vis = [], tin = [], low = [], edges = [];

    await dfs(1, -1, vis, tin, low, timer, edges, G);

    if(edges.length === 0)
        terminal.innerHTML = "<p>No bridges found</p>";
    else{
        var str = "";
        edges.forEach(function(e){
            str += "  (";
            str += e[0];
            str += " - "
            str += e[1];
            str += ")  &nbsp";
        });
        terminal.innerHTML = `<p>Bridges: ${str}</p>`
    }
}

async function dfs(u, p, vis, tin, low, timer, edges, G){
    vis[u] = true;
    tin[u] = low[u] = timer[0]++;

    var get_List = G.AdjList.get(u);

    for (var i in get_List) {
        var v;
        if(Array.isArray(get_List[i]))
            v = get_List[i][0];
        else
            v = get_List[i];

        if(v == p)
            continue;

        await colorEdge(u,v,yellow);
        await colorEdge(u,v,black);

        if(!vis[v]){
            await dfs(v, u, vis, tin, low, timer, edges, G);
            low[u] = Math.min(low[u],low[v]);
            if(low[v] > tin[u]){
                await colorEdge(u,v,green);
                edges.push([Math.min(u,v),Math.max(u,v)]);
            }
        }
        else
            low[u] = Math.min(low[u],tin[v]);
    }
}