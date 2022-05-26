export default function clearTerminal(){
    const op = document.getElementById("console");
    while(op.firstChild)
        op.removeChild(op.lastChild);
    return op;
}