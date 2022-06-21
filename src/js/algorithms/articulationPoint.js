import { colorEdge, colorVertex } from "../utilities/colorElements";
import { red, green, yellow, white, black } from "../utilities/constants";
import clearTerminal from "../utilities/clearTerminal.js";

export default async function articulationPoint(G){
    
    const terminal = clearTerminal();

    var timer = [0], vis = [], tin = [], low = [], points = [];

    await dfs(1, -1, vis, tin, low, timer, points, G);

    if(points.length === 0)
        terminal.innerHTML = "<p>No articulation points found</p>";
    else{
        for(let u=0;u<points.length;u++){
            var get_List = G.AdjList.get(points[u]);
            for (let i in get_List) {
                let v;
                if(Array.isArray(get_List[i]))
                    v = get_List[i][0];
                else
                    v = get_List[i];

                document.getElementById("e"+Math.min(points[u],v)+Math.max(points[u],v)).style.display = "none";
            }
        }
        terminal.innerHTML = `<p>Cut-Vertices: ${points.toString()}</p>`;
    }
}

async function dfs(u, p, vis, tin, low, timer, points, G){
    vis[u] = true;
    tin[u] = low[u] = timer[0]++;

    var children = 0, ap = false;

    var get_List = G.AdjList.get(u);

    await colorVertex(u,red);

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
            await dfs(v, u, vis, tin, low, timer, points, G);
            low[u] = Math.min(low[u],low[v]);
            if(low[v] >= tin[u])
                ap = true;
            children++;
        }
        else
            low[u] = Math.min(low[u],tin[v]);
    }

    if (ap && (p != -1 || children > 1)){
        await colorVertex(u,green);
        points.push(u);
    }
    else
        await colorVertex(u,white);
}