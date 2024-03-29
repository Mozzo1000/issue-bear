injectCSS("style.css")

/*  
* Register open widget button
* It finds the first button on the page with the attribute data-issue-bear
* and hooks onto a event listener that fires off when the user clicks on the button.
* If there is no button with said attribute then log a warning letting the developer know.
*/
const button_open_widget = document.querySelector("[data-issue-bear]")
if (button_open_widget) {
    button_open_widget.addEventListener("click", openWidget)
} else {
    console.warn("[ISSUE-BEAR] - No button/element with the data attribute 'data-issue-bear' found.")
}

const div_widget_popup = document.createElement("div");
div_widget_popup.classList = "widget-popup";

const button_close_widget = document.createElement("button");
button_close_widget.classList = "button-icon no-stretch";
button_close_widget.addEventListener("click", closeWidget);
button_close_widget.innerHTML = '<svg class="icon" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 47.971 47.971" style="enable-background:new 0 0 47.971 47.971;" xml:space="preserve"><g><path d="M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88   c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242   C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879   s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z" /></g></svg>';

const ul_button_list = document.createElement("ul");
ul_button_list.classList = "list";

const li_1 = document.createElement("li");
li_1.classList = "list-item";

const button_issue = document.createElement("button")
button_issue.classList = "button-icon";
button_issue.addEventListener("click", goToIssuePage);
button_issue.innerHTML = '<svg class="icon text" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512.001 512.001" style="enable-background:new 0 0 512.001 512.001;" xml:space="preserve"> <g> <path style="fill:#565164;" d="M387.184,124.822c12.533,12.531,23.284,26.853,31.831,42.545 c10.825-2.54,21.103-8.026,29.546-16.467c14.721-14.722,20.469-35.016,17.246-54.087c-2.066-12.22-7.819-23.938-17.246-33.368 c-9.431-9.432-21.15-15.18-33.368-17.246c-19.072-3.222-39.368,2.526-54.087,17.246c-8.443,8.441-13.931,18.716-16.47,29.543 C360.328,101.536,374.65,112.282,387.184,124.822z" /> <g> <path style="fill:#DD2645;" d="M124.823,387.179l262.361-262.357c-12.534-12.54-26.856-23.285-42.548-31.834 c-26.334-14.354-56.534-22.505-88.635-22.505c-33.797,0-65.481,9.037-92.775,24.829c-28.152,16.289-51.626,39.762-67.914,67.914 c-15.792,27.291-24.829,58.978-24.829,92.775C70.489,307.227,91.254,353.605,124.823,387.179z" /> <path style="fill:#DD2645;" d="M387.184,124.822L124.823,387.179c33.571,33.57,79.95,54.334,131.179,54.336 c33.797,0,65.485-9.037,92.775-24.829c28.152-16.287,51.627-39.762,67.919-67.914c15.787-27.289,24.824-58.978,24.824-92.775 c0-32.1-8.151-62.298-22.504-88.632C410.468,151.674,399.718,137.352,387.184,124.822z" /> </g> <g> <path style="fill:#565164;" d="M239.546,71.204c0.317,1.804,0.486,3.66,0.486,5.554c0,17.705-14.355,32.058-32.06,32.058 c-13.857,0-25.666-8.799-30.139-21.112C196.873,78.849,217.663,73.126,239.546,71.204z" /> <path style="fill:#565164;" d="M176.98,273.155c17.658,0,32.058-14.402,32.058-32.057c0-17.658-14.4-32.057-32.058-32.057 c-17.658,0-32.057,14.399-32.057,32.057C144.923,258.753,159.324,273.155,176.98,273.155z" /> <path style="fill:#565164;" d="M328.464,215.6c17.658,0,32.057-14.402,32.057-32.058c0-17.658-14.4-32.059-32.057-32.059 c-17.659,0-32.057,14.402-32.057,32.059C296.407,201.198,310.805,215.6,328.464,215.6z" /> <path style="fill:#565164;" d="M337.435,376.559c17.659,0,32.057-14.4,32.057-32.057c0-17.656-14.399-32.06-32.057-32.06 c-17.658,0-32.057,14.404-32.057,32.06C305.378,362.159,319.777,376.559,337.435,376.559z" /> <path style="fill:#565164;" d="M161.076,383.365c17.705,0,32.058,14.353,32.058,32.057c0,5.012-1.15,9.756-3.202,13.981 c-20.218-7.707-38.748-18.855-54.864-32.724C140.889,388.615,150.373,383.365,161.076,383.365z" /> </g> </g> <g> <path style="fill:#000003;" d="M114.646,236.21c0.774,0.168,1.546,0.249,2.306,0.249c4.954,0,9.413-3.439,10.513-8.477 c5.38-24.673,17.662-47.151,35.517-65.003c4.206-4.205,4.207-11.024,0.001-15.231c-4.202-4.206-11.023-4.207-15.231-0.002 c-20.779,20.775-35.072,46.934-41.333,75.647C105.152,229.205,108.836,234.943,114.646,236.21z" /> <path style="fill:#000003;" d="M397.351,275.788c-5.807-1.27-11.551,2.417-12.816,8.229 c-13.076,59.994-67.131,103.537-128.533,103.537c-5.947,0-10.77,4.822-10.77,10.77c0,5.947,4.823,10.77,10.77,10.77 c34.815,0,68.921-12.028,96.036-33.869c27.114-21.84,46.129-52.603,53.543-86.622C406.847,282.793,403.163,277.055,397.351,275.788 z" /> <path style="fill:#000003;" d="M113.679,244.526c-5.947,0-10.77,4.822-10.77,10.77v0.704c0,5.948,4.823,10.77,10.77,10.77 s10.77-4.822,10.77-10.77v-0.704C124.449,249.348,119.627,244.526,113.679,244.526z" /> <path style="fill:#000003;" d="M398.325,245.23c-5.947,0-10.77,4.822-10.77,10.77v0.704c0,5.948,4.823,10.77,10.77,10.77 c5.948,0,10.77-4.822,10.77-10.77v-0.704C409.095,250.052,404.272,245.23,398.325,245.23z" /> <path style="fill:#000003;" d="M501.23,245.23h-49.241c-1.383-25.458-7.646-49.636-17.856-71.624 c8.168-3.604,15.646-8.7,22.039-15.092c13.619-13.619,21.152-31.693,21.258-50.933h23.8c5.947,0,10.77-4.823,10.77-10.77 c0-5.949-4.823-10.77-10.77-10.77h-26.897c-3.417-11.29-9.583-21.635-18.161-30.212c-8.576-8.578-18.921-14.745-30.213-18.162 V10.771c0-5.948-4.822-10.77-10.77-10.77c-5.947,0-10.77,4.822-10.77,10.77v23.8c-19.239,0.108-37.314,7.642-50.928,21.258 c-6.393,6.394-11.491,13.872-15.094,22.042c-21.988-10.211-46.166-16.474-71.624-17.857V10.771c0-5.948-4.823-10.77-10.77-10.77 h-33.913c-5.948,0-10.77,4.822-10.77,10.77s4.822,10.77,10.77,10.77h23.143v38.473c-27.897,1.515-54.261,8.883-77.886,20.893 l-24.63-42.665c-1.041-1.805-2.531-3.183-4.241-4.098c-2.882-1.543-6.4-1.75-9.532-0.326c-0.317,0.144-0.631,0.303-0.939,0.48 c-0.003,0.002-0.005,0.004-0.009,0.005l-29.362,16.95c-5.151,2.975-6.918,9.561-3.943,14.712c1.995,3.456,5.614,5.387,9.338,5.387 c1.826,0,3.678-0.465,5.373-1.444l20.044-11.57l19.269,33.375c-22.693,14.87-42.129,34.307-57,56.999l-42.701-24.655 c-5.152-2.976-11.738-1.208-14.712,3.942L17.344,157.37c-2.975,5.151-1.209,11.737,3.942,14.712 c1.696,0.979,3.548,1.444,5.374,1.444c3.722,0,7.343-1.931,9.338-5.386l11.571-20.044l33.339,19.248 c-12.011,23.625-19.378,49.988-20.893,77.885H10.77c-5.948,0-10.77,4.822-10.77,10.77c0,0.014,0.002,0.027,0.002,0.041v33.873 c0,5.947,4.823,10.77,10.77,10.77c5.948,0,10.77-4.823,10.77-10.77V266.77h38.473c2.681,49.327,23.66,93.86,56.248,126.928 c0.29,0.38,0.599,0.75,0.946,1.099c0.347,0.347,0.718,0.655,1.099,0.945c33.066,32.588,77.6,53.566,126.926,56.248v38.472h-23.143 c-5.948,0-10.77,4.822-10.77,10.77c0,5.947,4.822,10.77,10.77,10.77h33.913c5.947,0,10.77-4.823,10.77-10.77v-49.241 c27.897-1.516,54.261-8.883,77.885-20.894l19.247,33.339l-20.041,11.571c-5.151,2.975-6.917,9.561-3.942,14.712 c1.995,3.455,5.614,5.386,9.338,5.386c1.827,0,3.679-0.465,5.374-1.444l29.361-16.953c0.002-0.001,0.004-0.002,0.006-0.003 c1.61-0.928,2.89-2.212,3.795-3.693c1.997-3.258,2.191-7.478,0.146-11.02c-0.002-0.003-0.004-0.005-0.005-0.009l-24.647-42.694 c22.691-14.869,42.129-34.306,57-56.999l33.375,19.268l-11.572,20.041c-2.975,5.151-1.209,11.738,3.942,14.713 c1.695,0.979,3.548,1.444,5.374,1.444c3.722,0,7.342-1.931,9.338-5.386l16.959-29.37c1.674-2.897,1.847-6.25,0.761-9.158 c-0.001-0.001-0.001-0.002-0.002-0.003c-0.12-0.322-0.255-0.639-0.406-0.948c-0.909-1.865-2.364-3.488-4.295-4.604l-42.668-24.631 c12.011-23.625,19.378-49.988,20.893-77.884h38.471v23.144c0,5.947,4.823,10.77,10.77,10.77s10.77-4.823,10.77-10.77v-33.914 C512,250.052,507.177,245.23,501.23,245.23z M368.721,71.06c9.645-9.646,22.469-14.959,36.109-14.959s26.464,5.313,36.109,14.96 c9.647,9.646,14.96,22.47,14.96,36.111c0,13.64-5.313,26.464-14.959,36.111c-4.864,4.863-10.612,8.666-16.903,11.218 c-16.489-27.277-39.257-50.045-66.535-66.539C360.055,81.672,363.859,75.924,368.721,71.06z M256.002,81.254 c44.31,0,84.813,16.586,115.649,43.865L125.123,371.652C97.843,340.815,81.256,300.312,81.256,256 C81.255,159.646,159.646,81.254,256.002,81.254z M256.002,430.747c-44.31,0-84.812-16.586-115.649-43.865l246.53-246.531 c27.278,30.836,43.865,71.339,43.865,115.65C430.748,352.356,352.357,430.747,256.002,430.747z" /> </g> </svg> I found an issue';
li_1.appendChild(button_issue)

const li_2 = document.createElement("li");
li_2.classList = "list-item"
const button_question = document.createElement("button")
button_question.classList = "button-icon";
button_question.addEventListener("click", goToQuestionPage);
button_question.innerHTML = '<svg class="icon text" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 496.158 496.158" style="enable-background:new 0 0 496.158 496.158;" xml:space="preserve"> <path style="fill:#25B7D3;" d="M496.158,248.085c0-137.022-111.069-248.082-248.075-248.082C111.07,0.003,0,111.063,0,248.085 c0,137.001,111.07,248.07,248.083,248.07C385.089,496.155,496.158,385.086,496.158,248.085z" /> <path style="fill:#FFFFFF;" d="M138.216,173.592c0-13.915,4.467-28.015,13.403-42.297c8.933-14.282,21.973-26.11,39.111-35.486 c17.139-9.373,37.134-14.062,59.985-14.062c21.238,0,39.99,3.921,56.25,11.755c16.26,7.838,28.818,18.495,37.683,31.97 c8.861,13.479,13.293,28.125,13.293,43.945c0,12.452-2.527,23.367-7.581,32.739c-5.054,9.376-11.062,17.469-18.018,24.279 c-6.959,6.812-19.446,18.275-37.463,34.388c-4.981,4.542-8.975,8.535-11.975,11.976c-3.004,3.443-5.239,6.592-6.702,9.447 c-1.466,2.857-2.603,5.713-3.406,8.57c-0.807,2.855-2.015,7.875-3.625,15.051c-2.784,15.236-11.501,22.852-26.147,22.852 c-7.618,0-14.028-2.489-19.226-7.471c-5.201-4.979-7.8-12.377-7.8-22.192c0-12.305,1.902-22.962,5.713-31.97 c3.808-9.01,8.861-16.92,15.161-23.73c6.296-6.812,14.794-14.904,25.488-24.28c9.373-8.202,16.15-14.392,20.325-18.567 c4.175-4.175,7.69-8.823,10.547-13.953c2.856-5.126,4.285-10.691,4.285-16.699c0-11.718-4.36-21.605-13.074-29.663 c-8.717-8.054-19.961-12.085-33.728-12.085c-16.116,0-27.981,4.065-35.596,12.195c-7.618,8.13-14.062,20.105-19.336,35.925 c-4.981,16.555-14.43,24.829-28.345,24.829c-8.206,0-15.127-2.891-20.764-8.679C141.035,186.593,138.216,180.331,138.216,173.592z M245.442,414.412c-8.937,0-16.737-2.895-23.401-8.68c-6.667-5.784-9.998-13.877-9.998-24.279c0-9.229,3.22-16.991,9.668-23.291 c6.444-6.297,14.354-9.448,23.73-9.448c9.229,0,16.991,3.151,23.291,9.448c6.296,6.3,9.448,14.062,9.448,23.291 c0,10.255-3.296,18.312-9.888,24.17C261.7,411.481,254.084,414.412,245.442,414.412z" /> </svg> I have a question';
li_2.appendChild(button_question)


const li_3 = document.createElement("li");
li_3.classList = "list-item"
const button_other = document.createElement("button")
button_other.classList = "button-icon";
button_other.addEventListener("click", goToOtherPage);
button_other.innerHTML = '<svg class="icon text" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48"> <circle cx="9.5" cy="24.5" r="3.5" fill="#2D3748"></circle> <circle cx="23.5" cy="24.5" r="3.5" fill="#2D3748"></circle> <circle cx="37.5" cy="24.5" r="3.5" fill="#2D3748"></circle> </svg> Other';
li_3.appendChild(button_other)

ul_button_list.appendChild(li_1)
ul_button_list.appendChild(li_2)
ul_button_list.appendChild(li_3)

const div_footer = document.createElement("div");
div_footer.classList = "footer";
const span_footer = document.createElement("span");
span_footer.innerHTML = 'Powered by <a class="link" href="https://github.com/Mozzo1000/issue-bear" target="_blank">Issue Bear</a>';
div_footer.appendChild(span_footer);


/* Issue page */

const div_issue_page = document.createElement("div");
div_issue_page.style.display = "none";

const button_back = document.createElement("button");
button_back.classList = "button-icon no-stretch";
button_back.addEventListener("click", goToListPage);
button_back.innerText = "Back";

const h2_title = document.createElement("h2");
h2_title.classList = "title";
h2_title.innerText = "Report an issue";

const form_issue_page = document.createElement("form");
form_issue_page.addEventListener("submit", sendIssue)
const textarea_issue_description = document.createElement("textarea");
textarea_issue_description.classList = "input";
textarea_issue_description.setAttribute("rows", "5")
textarea_issue_description.setAttribute("cols", "33")
textarea_issue_description.setAttribute("placeholder", "What is your issue?")
textarea_issue_description.setAttribute("required", "")

const input_issue_email = document.createElement("input");
input_issue_email.classList = "input";
input_issue_email.setAttribute("type", "email")
input_issue_email.setAttribute("placeholder", "Your email adress (optional)")

const button_screenshot = document.createElement("button");
button_screenshot.classList = "button-icon no-stretch";
button_screenshot.setAttribute("title", "Take a screenshot");
button_screenshot.addEventListener("click", generate);
button_screenshot.innerHTML = '<svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 11.5V14.6C22 16.8402 22 17.9603 21.564 18.816C21.1805 19.5686 20.5686 20.1805 19.816 20.564C18.9603 21 17.8402 21 15.6 21H8.4C6.15979 21 5.03969 21 4.18404 20.564C3.43139 20.1805 2.81947 19.5686 2.43597 18.816C2 17.9603 2 16.8402 2 14.6V9.4C2 7.15979 2 6.03969 2.43597 5.18404C2.81947 4.43139 3.43139 3.81947 4.18404 3.43597C5.03969 3 6.15979 3 8.4 3H12.5M19 8V2M16 5H22M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'

const button_send = document.createElement("button");
button_send.classList = "button-icon no-stretch primary";
button_send.setAttribute("type", "submit")
button_send.innerText = "Send"

/* Success page */
const div_success_page = document.createElement("div");
div_success_page.style.display = "none";

const text_success = document.createTextNode("Thank you!\nYour issue has been submitted.")

div_success_page.appendChild(text_success)

form_issue_page.appendChild(textarea_issue_description)
form_issue_page.appendChild(document.createElement("br")) /* line break */
form_issue_page.appendChild(document.createElement("br")) /* line break */
form_issue_page.appendChild(input_issue_email)
form_issue_page.appendChild(document.createElement("br")) /* line break */
form_issue_page.appendChild(document.createElement("br")) /* line break */
form_issue_page.appendChild(button_screenshot);
form_issue_page.appendChild(button_send);

div_issue_page.appendChild(button_back);
div_issue_page.appendChild(h2_title)
div_issue_page.appendChild(form_issue_page);

div_widget_popup.appendChild(button_close_widget);
div_widget_popup.appendChild(ul_button_list);

div_widget_popup.appendChild(div_issue_page);
div_widget_popup.appendChild(div_success_page);

div_widget_popup.appendChild(document.createElement("br")) /* line break */
div_widget_popup.appendChild(div_footer)
document.body.appendChild(div_widget_popup);


const token = document.currentScript.getAttribute("token")
const api_url = (document.currentScript.getAttribute("api") + "/" + token) || ("http://localhost:5000/v1/issues/" + token)
let tag = ""

function sendIssue(event) {
    event.preventDefault();
    console.log(event)
    fetch("http://localhost:5000/v1/issues/" + token, {
        method: "POST",
        mode: "cors",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            description: textarea_issue_description.value,
            tag: tag,
            email: input_issue_email.value
        }),

    }).then((response) => {
        if (!response.ok) {
            console.log(response.error)
        }
        return response.json();
    })
        .then(data => {
            console.log(data);
            showSuccess();
        })
        .catch(function (error) {
            console.log(error);
        });
}

function openWidget() {
    if (div_widget_popup.style.display == "block") {
        closeWidget();
    } else {
        div_widget_popup.style.display = "block";
    }
}

function closeWidget() {
    goToListPage();
    div_widget_popup.style.display = "none";
    div_success_page.style.display = "none";
}

function showSuccess() {
    ul_button_list.style.display = "none";
    div_issue_page.style.display = "none";
    button_close_widget.style.display = "block";
    tag = ""
    textarea_issue_description.value = ""
    input_issue_email.value = ""

    div_success_page.style.display = "block";


}

function goToListPage() {
    ul_button_list.style.display = "block";
    div_issue_page.style.display = "none";
    button_close_widget.style.display = "block";
    tag = ""
}

function goToIssuePage() {
    button_close_widget.style.display = "none";
    ul_button_list.style.display = "none";
    div_issue_page.style.display = "block";
    h2_title.innerText = "Report an issue"
    button_screenshot.style.display = "inline-block";
    textarea_issue_description.setAttribute("placeholder", "What is your issue?")
    tag = "bug"
}

function goToQuestionPage() {
    button_close_widget.style.display = "none";
    ul_button_list.style.display = "none";
    div_issue_page.style.display = "block";
    button_screenshot.style.display = "none";
    h2_title.innerText = "Question";
    textarea_issue_description.setAttribute("placeholder", "What is your question?")
    tag = "question"
}

function goToOtherPage() {
    button_close_widget.style.display = "none";
    ul_button_list.style.display = "none";
    div_issue_page.style.display = "block";
    button_screenshot.style.display = "none";
    h2_title.innerText = "Other";
    textarea_issue_description.setAttribute("placeholder", "What is on your mind?")
    tag = "other"
}

function takeScreenshot() {
    var screenshot = document.documentElement
        .cloneNode(true);
    screenshot.querySelector("div.widget-popup").style.display = "none";
    var blob = new Blob([screenshot.innerHTML], {
        type: 'text/html'
    });
    return blob;
}

function generate() {
    window.URL = window.URL || window.webkitURL;
    window.open(window.URL
        .createObjectURL(takeScreenshot()));
}

function injectCSS(fileName) {
    var head = document.head;
    var link = document.createElement("link");

    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = fileName;

    head.appendChild(link);
}