import clearTerminal from "../utilities/clearTerminal";
import { colorEdge, colorVertex } from "../utilities/colorElements";
import { red, yellow } from "../utilities/constants";

export default async function dfs(G){
    const terminal = clearTerminal();
    var str = [];
    str[0] = "";
    await dfs1(1,-1,[],G,str);
    str[0] = str[0].substring(0,str[0].length - 7);
    terminal.innerHTML = `<p>Traversal: ${str[0]} </p>`
}

async function dfs1(u, p, vis, G, str){
    vis[u] = true;

    str[0] += u;
    str[0] += " &rarr; ";

    if(p != -1)
        await colorEdge(u,p,yellow);
    await colorVertex(u,red);
    
    var get_List = G.AdjList.get(u);

    for (var i in get_List) {
        var v;
        if(Array.isArray(get_List[i]))
            v = get_List[i][0];
        else
            v = get_List[i];

        if(!vis[v])
            await dfs1(v, u, vis, G, str);
    }
}