import { colorEdge } from "../utilities/colorElements";
import { yellow, green, red} from "../utilities/constants";
import clearTerminal from "../utilities/clearTerminal";

var parent = [], rank = [];

function makeSet(n){
    for(let i=1;i<=n;i++){
        parent[i] = i;
        rank[i] = 0;
    }
}

function findPar(node){
    if (node == parent[node])
		return node;
	return parent[node] = findPar(parent[node]);
}

function union(u, v) {
	u = findPar(u);
	v = findPar(v);

	if (rank[u] < rank[v])
		parent[u] = v;
	else if (rank[v] < rank[u])
		parent[v] = u;
	else {
		parent[v] = u;
		rank[u]++;
	}
}

export default async function kruskal(G,Edges){

    const terminal = clearTerminal();

    Edges.sort(function(e1,e2){
        if(e1[2] < e2[2])
            return -1;
        return 1;
    });

    let n = G.size;

    makeSet(n);

    var cost = 0, edges = "";

    for(let i=0;i<Edges.length;i++){
        let u = Edges[i][0], v = Edges[i][1], wt = Edges[i][2];
        await colorEdge(u,v,red);
        if(findPar(u) != findPar(v)){
            cost += wt;
            edges += "( ";
            edges += u;
            edges += " - ";
            edges += v;
            edges += " )  &nbsp";
            union(u,v);
            await colorEdge(u, v, green);
            document.getElementById("v"+u).style.backgroundColor = yellow;
            document.getElementById("v"+v).style.backgroundColor = yellow;
        }
        else
            document.getElementById("e"+Math.min(u,v)+Math.max(u,v)).style.display = "none";
    }

    terminal.innerHTML += `<p>Edges: ${edges}</p>`
    terminal.innerHTML += `<p>Cost: ${cost}</p>`
}