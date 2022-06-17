import clearTerminal from "../utilities/clearTerminal";
import { red } from "../utilities/constants";
import { colorVertex } from "../utilities/colorElements";

export default async function preorder(G){
    const terminal = clearTerminal();
    var str = [];
    str[0] = "";
    await dfs(1, -1, G, str)
    str[0] = str[0].substring(0,str[0].length - 7);
    terminal.innerHTML = `<p>Traversal: ${str[0]} </p>`
}

async function dfs(u, p, G, str){
    await colorVertex(u, red);

    str[0] += u;
    str[0] += " &rarr; ";

    var get_List = G.AdjList.get(u);

    for (var i in get_List) {
        var v;
        if(Array.isArray(get_List[i]))
            v = get_List[i][0];
        else
            v = get_List[i];

        if(v == p)
            continue;

        await dfs(v, u, G, str);
    }
    
}