import clearTerminal from "../utilities/clearTerminal";
import { colorEdge, colorVertex } from "../utilities/colorElements";
import { yellow, green } from "../utilities/constants";

export default async function prim(G){

    var terminal = clearTerminal();

    var n = G.size;
    var key = new Array(n+1), included = [], parent = [];
    key.fill(Number.MAX_SAFE_INTEGER,1);

    key[1] = 0;
    parent[1] = -1;

    await colorVertex(1,yellow);

    var edges = "", cost = 0, taken = 0;

    while(true){
        var min = Number.MAX_SAFE_INTEGER, u;
        for(let v=1;v<=n;v++)
            if(!included[v] && key[v] < min)
                min = key[v],u = v;

        included[u] = true;

        if(parent[u] != -1){
            taken++;
            cost += key[u];
            edges += "( ";
            edges += u;
            edges += " - "
            edges += parent[u];
            edges += " )  &nbsp";
            await colorEdge(u, parent[u], green);
        }

        if(taken == n-1)
            break;

        var get_List = G.AdjList.get(u);

        for (var j in get_List) {
            var v = get_List[j][0];
            var wt = get_List[j][1];
            if(!included[v] && wt < key[v]){
                parent[v] = u, key[v] = wt;
                await colorVertex(v,yellow);
            }
        }
    }

    terminal.innerHTML += `<p>Edges: ${edges}</p>`
    terminal.innerHTML += `<p>Cost: ${cost}</p>`
}