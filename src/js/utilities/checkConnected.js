export default function checkConnected(G, n){
    var vis = [];
    dfs(1, vis, G);
    for(let i=1;i<=n;i++)
        if(!vis[i])
            return false;
    return true;
}

function dfs(u, vis, G){
    vis[u] = true;

    var get_List = G.AdjList.get(u);

    for (var i in get_List) {
        var v;
        if(Array.isArray(get_List[i]))
            v = get_List[i][0];
        else
            v = get_List[i];

        if(!vis[v])
            dfs(v, vis, G)
    }
}