import { white, black } from "./constants";

export default function resetGraph(G){
    const n = G.size;
    for(let u=1;u<=n;u++){
        var get_List = G.AdjList.get(u);
        document.getElementById("v"+u).style.backgroundColor = white;
        for (let i in get_List) {
            let v;
            if(Array.isArray(get_List[i]))
                v = get_List[i][0];
            else
                v = get_List[i];

            var edge = document.getElementById("e"+Math.min(u,v)+Math.max(u,v));
            edge.style.display = "block";
            edge.style.backgroundColor = black;
        }
    }
}