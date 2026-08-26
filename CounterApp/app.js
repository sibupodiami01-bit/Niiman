let count = 0;

document.getElementById("count").innerText = count;

function increase() {
    count = count + 1;
    document.getElementById("count").innerText = count;
}
