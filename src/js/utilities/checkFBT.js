export default function checkFBT(G){
    var vis = [];
    return dfs(1, -1, vis, G);
}

function dfs(u, p, vis, G){
    vis[u] = true;

    var get_List = G.AdjList.get(u);

    if(p == -1 && get_List.length != 2)
        return false;
    if(p != -1 && get_List.length == 2)
        return false;

    for (var i in get_List) {
        var v;
        if(Array.isArray(get_List[i]))
            v = get_List[i][0];
        else
            v = get_List[i];

        if(!vis[v]){
            if(!dfs(v, u, vis, G))
                return false;
        }
        else if(v != p)
            return false;
    }

    return true;
}