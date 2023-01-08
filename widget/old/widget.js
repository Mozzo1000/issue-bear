function openWidget() {
    if (document.getElementById("myWidget").style.display == "block") {
        closeWidget();
    } else {
        document.getElementById("myWidget").style.display = "block";
        document.getElementById("widget-button").innerText = "Close widget"
    }
}

function closeWidget() {
    document.getElementById("myWidget").style.display = "none";
    document.getElementById("widget-button").innerText = "Open widget"
} 