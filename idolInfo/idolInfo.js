let count = 0;
let imgP, imgS, imgL;

async function GetIdolInfo() {
    const UnitIdolList = (await axios.get("https://api.shinycolors.moe/general/getIdolUnitList")).data;


}

function ChangePicture() {
    count = count + 1 < 3 ? count + 1 : 0;
    switch (count) {
        case 0:
            toggleDisplay(imgP, true);
            toggleDisplay(imgL, false);
            toggleDisplay(imgS, false);
            break;
        case 1:
            toggleDisplay(imgP, false);
            toggleDisplay(imgL, true);
            toggleDisplay(imgS, false);
            break;
        case 2:
            toggleDisplay(imgP, false);
            toggleDisplay(imgL, false);
            toggleDisplay(imgS, true);
            break;
    }
}

function Main() {
    imgP = document.getElementById("imgP");
    imgS = document.getElementById("imgS");
    imgL = document.getElementById("imgL");
}


function checkInIdolInfo() {
    const URI = location.pathname.substr(1);
    if (URI.match(/idolInfo\/(d+)/)) {
        return [true, URI.match(/idolInfo\/(d+)/)[1]];
    } else {
        return [false, 0];
    }
}

function toggleDisplay(img, type) {
    if (type) {
        img.classList.remove("d-none");
    } else {
        img.classList.add("d-none");
    }
}