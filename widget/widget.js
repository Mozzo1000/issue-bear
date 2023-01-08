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

function goToListPage() {
    document.getElementById("button-list").style.display = "block";
    document.getElementById("issue-page").style.display = "none";
}

function goToIssuePage() {
    document.getElementById("button-list").style.display = "none";
    document.getElementById("issue-page").style.display = "block";

    const back_button = document.createElement("button");
    back_button.classList = "button-icon";
    back_button.innerText = "Back";
    back_button.addEventListener("click", goToListPage)

    document.getElementById("issue-page").appendChild(back_button);


}

function takeScreenshot() {
    var screenshot = document.documentElement
        .cloneNode(true);
    screenshot.style.pointerEvents = 'none';
    screenshot.style.overflow = 'hidden';
    screenshot.style.webkitUserSelect = 'none';
    screenshot.style.mozUserSelect = 'none';
    screenshot.style.msUserSelect = 'none';
    screenshot.style.oUserSelect = 'none';
    screenshot.style.userSelect = 'none';
    screenshot.dataset.scrollX = window.scrollX;
    screenshot.dataset.scrollY = window.scrollY;
    var blob = new Blob([screenshot.outerHTML], {
        type: 'text/html'
    });
    return blob;
}

function generate() {
    window.URL = window.URL || window.webkitURL;
    window.open(window.URL
        .createObjectURL(takeScreenshot()));
}