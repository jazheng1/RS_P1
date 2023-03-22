let baseUrl = window.location.href;
let inputArr = [];
let tagGroup = document.querySelector("#tagGroup");

// get createTags attribute, and have the inputted form communicate with backend
$("#createTag").submit(async (e) => {
    // prevent default behavior (the loading of a new page)
    e.preventDefault();
    let input = document.getElementById("user-input").value;
    let url = baseUrl;
    fetch(url, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "input": input, "inputArr": inputArr })
    }).then(
        function (res) {
            return res.json()
        }
    ).then(
        function (data) {
            // generate tags
            generateTags(data);
            // make generate stores button visible
            showGenerateStoresButton();
        }
    )
})

function getArr() {
    return inputArr;
}

function generateTags(data) {
    $('#createTag')[0].reset();
    //checks to see if the input is blank
    if (data.fromServerInput != '') {
        // checks to see if data already there then create a tag for it
        if (!inputArr.includes(data.fromServerInput)) {
            inputArr.push(data.fromServerInput);
            console.log(inputArr);
            //creates button element for the tag
            var button = document.createElement("button");
            button.innerHTML = data.fromServerInput;
            button.setAttribute("id", "tag");
            button.setAttribute("class", "btn btn-primary");
            tagGroup.appendChild(button);
        }
    }
}

function showGenerateStoresButton() {
    if ( inputArr.length > 1 && getLocationCheck() ) {
        let generateButton = document.getElementById("generateStores");

        generateButton.style.visibility = "visible";
    }
}