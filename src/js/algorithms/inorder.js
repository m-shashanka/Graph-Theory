import clearTerminal from "../utilities/clearTerminal";
import { red } from "../utilities/constants";
import { colorVertex } from "../utilities/colorElements";

export default async function inorder(G){
    const terminal = clearTerminal();
    var str = [];
    str[0] = "";
    await dfs(1, -1, G, str)
    str[0] = str[0].substring(0,str[0].length - 7);
    terminal.innerHTML = `<p>Traversal: ${str[0]} </p>`
}

async function dfs(u, p, G, str){

    var get_List = G.AdjList.get(u);

    var children = [];

    for (var i in get_List) {
        var v;
        if(Array.isArray(get_List[i]))
            v = get_List[i][0];
        else
            v = get_List[i];

        if(v == p)
            continue;

        children.push([v,u]);
    }

    if(children.length >= 1)
        await dfs(children[0][0], children[0][1], G, str);
    
    await colorVertex(u, red);
    str[0] += u;
    str[0] += " &rarr; ";

    if(children.length == 2)
        await dfs(children[1][0], children[1][1], G, str);
}