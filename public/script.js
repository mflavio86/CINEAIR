function imgADD(id) {
    var element = document.getElementById(id);
    element.classList.toggle("mystyle");

};
function imgRemove(id) {
    var element = document.getElementById(id);

    element.classList.toggle("mystyle");

};

function toggle_visibility(id) {
    var e = document.getElementById(id);
    if (e.innerText == 'A')
        e.innerText = 'B';
    else
        e.innerText = 'A';
}