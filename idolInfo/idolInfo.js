let count = 0;
let imgP, imgS, imgL;
let isInPCardList = true;
let pNavLink, sNavLink;
let SSRNavLink, SRNavLink, RNavLink, NNavLink;
let PSSRCardList, PSRCardList, PRCardList, SSSRCardList, SSRCardList, SRCardList, SNCardList;
let cardPicture;
let cardTypeTitle;

function Main() {
    imgP = document.getElementById("imgP");
    imgS = document.getElementById("imgS");
    imgL = document.getElementById("imgL");

    pNavLink = document.getElementById("PList");
    sNavLink = document.getElementById("SList");

    SSRNavLink = document.getElementById("SSRList");
    SRNavLink = document.getElementById("SRList");
    RNavLink = document.getElementById("RList");
    NNavLink = document.getElementById("NList");

    cardTypeTitle = document.getElementById("cardTypeTitle");

    PSSRCardList = document.getElementById("PSSRCardList");
    PSRCardList = document.getElementById("PSRCardList");
    PRCardList = document.getElementById("PRCardList");

    SSSRCardList = document.getElementById("SSSRCardList");
    SSRCardList = document.getElementById("SSRCardList");
    SRCardList = document.getElementById("SRCardList");
    SNCardList = document.getElementById("SNCardList");

    cardPicture = document.getElementById("cardPicture");

    pNavLink.addEventListener('click', ToggleToPCardList, false);
    sNavLink.addEventListener('click', ToggleToSCardList, false);

    SSRNavLink.addEventListener('click', ToggleCardListSSR, false);
    SRNavLink.addEventListener('click', ToggleCardListSR, false);
    RNavLink.addEventListener('click', ToggleCardListR, false);
    NNavLink.addEventListener('click', ToggleCardListN, false);

    ToggleCardListSSR(false);
}

function ChangeTachie() {
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

async function GetIdolInfo() {

    const [isInIdolDetail, idolID] = checkInIdolInfo();

    if (isInIdolDetail) {
        const idolInfo = (await axios.get(`https://api.shinycolors.moe/general/getIdolInfo/${idolID}`)).data;
        console.log(idolInfo);

        //change Picture part
        imgP.src = `https://static.shinycolors.moe/pictures/tachie/private/${idolInfo.NickName}.png`;
        imgS.src = `https://static.shinycolors.moe/pictures/tachie/same/${idolInfo.NickName}.png`;
        imgL.src = `https://static.shinycolors.moe/pictures/tachie/live/${idolInfo.NickName}.png`;
        //render table part
        const idolTable = document.getElementById("idolInfo");

        const table = document.createElement("table");
        table.classList.add("table");
        table.classList.add("d-inline-block");
        table.classList.add("w-100");
        const tbody = document.createElement("tbody");
        tbody.classList.add("w-100");
        const tr1 = generateTableRow([{ key: "??????", value: idolInfo.IdolName }, { key: "??????", value: idolInfo.BirthDay }, { key: "?????????", value: idolInfo.UsedHand }]);
        tbody.appendChild(tr1);

        const tr2 = generateTableRow([{ key: "", value: idolInfo.Hiragana }, { key: "??????", value: idolInfo.StarSign }, { key: "??????", value: idolInfo.Hirameki }]);
        tbody.appendChild(tr2);

        const tr3 = generateTableRow([{ key: "??????", value: idolInfo.UnitName }, { key: "??????", value: idolInfo.Interest }, { key: "?????????", value: idolInfo.Color1 }], true);
        tbody.appendChild(tr3);

        const tr4 = generateTableRow([{ key: "??????", value: idolInfo.Age }, { key: "??????", value: idolInfo.SpecialSkill }]);
        const block = document.createElement("td");
        block.classList.add("col-md-4");
        block.setAttribute("colspan", 2);
        block.setAttribute("rowspan", 4);
        tr4.appendChild(block);
        tbody.appendChild(tr4);

        const tr5 = generateTableRow([{ key: "??????", value: idolInfo.Height }, { key: "??????", value: idolInfo.BloodType }]);
        tbody.appendChild(tr5);

        const tr6 = generateTableRow([{ key: "??????", value: idolInfo.Weight }, { key: "?????????", value: idolInfo.BirthPlace }]);
        tbody.appendChild(tr6);

        const tr7 = generateTableRow([{ key: "??????", value: idolInfo.ThreeSize }, { key: "CV", value: idolInfo.CV }]);
        tbody.appendChild(tr7);

        table.appendChild(tbody);
        idolTable.appendChild(table);

        //generate card list part
        idolInfo.CardInfo.forEach(element => {
            generateCardList(element);
        });
        cardPicture.src = `https://static.shinycolors.moe/pictures/bigPic/${idolInfo.CardInfo[0].BigPic1}`;
    }
}

function ToggleToPCardList(e) {
    e.preventDefault();
    if (isInPCardList) return;

    isInPCardList = true;

    pNavLink.classList.add("active", "disabled");
    sNavLink.classList.remove("active", "disabled");

    ToggleCardListSSR(false);

    NNavLink.classList.add("disabled");
}

function ToggleToSCardList(e) {
    e.preventDefault();
    if (!isInPCardList) return;

    isInPCardList = false;

    pNavLink.classList.remove("active", "disabled");
    sNavLink.classList.add("active", "disabled");

    ToggleCardListSSR(false);

    NNavLink.classList.remove("disabled");
}

function ToggleCardListSSR(e) {
    if (e) e.preventDefault();
    [PSSRCardList, PSRCardList, PRCardList, SSSRCardList, SSRCardList, SRCardList, SNCardList].forEach(element => {
        element.classList.add("d-none");
    });
    [SSRNavLink, SRNavLink, RNavLink, NNavLink].forEach(element => {
        element.classList.remove("active");
    });
    SSRNavLink.classList.add("active");
    if (isInPCardList) {
        cardTypeTitle.textContent = "P-SSR";
        PSSRCardList.classList.remove("d-none");
    } else {
        cardTypeTitle.textContent = "S-SSR";
        SSSRCardList.classList.remove("d-none");
    }
}

function ToggleCardListSR(e) {
    if (e) e.preventDefault();
    [PSSRCardList, PSRCardList, PRCardList, SSSRCardList, SSRCardList, SRCardList, SNCardList].forEach(element => {
        element.classList.add("d-none");
    });
    [SSRNavLink, SRNavLink, RNavLink, NNavLink].forEach(element => {
        element.classList.remove("active");
    });
    SRNavLink.classList.add("active");
    if (isInPCardList) {
        cardTypeTitle.textContent = "P-SR";
        PSRCardList.classList.remove("d-none");
    } else {
        cardTypeTitle.textContent = "S-SR";
        SSRCardList.classList.remove("d-none");
    }
}

function ToggleCardListR(e) {
    if (e) e.preventDefault();
    [PSSRCardList, PSRCardList, PRCardList, SSSRCardList, SSRCardList, SRCardList, SNCardList].forEach(element => {
        element.classList.add("d-none");
    });
    [SSRNavLink, SRNavLink, RNavLink, NNavLink].forEach(element => {
        element.classList.remove("active");
    });
    RNavLink.classList.add("active");
    if (isInPCardList) {
        cardTypeTitle.textContent = "P-R";
        PRCardList.classList.remove("d-none");
    } else {
        cardTypeTitle.textContent = "S-R";
        SRCardList.classList.remove("d-none");
    }
}

function ToggleCardListN(e) {
    if (e) e.preventDefault();
    [PSSRCardList, PSRCardList, PRCardList, SSSRCardList, SSRCardList, SRCardList, SNCardList].forEach(element => {
        element.classList.add("d-none");
    });
    [SSRNavLink, SRNavLink, RNavLink, NNavLink].forEach(element => {
        element.classList.remove("active");
    });
    NNavLink.classList.add("active");
    cardTypeTitle.textContent = "S-N";
    SNCardList.classList.remove("d-none");
}

function toggleDisplay(img, type) {
    if (type) {
        img.classList.remove("d-none");
    } else {
        img.classList.add("d-none");
    }
}

function checkInIdolInfo() {
    const URI = location.pathname.substr(1);
    console.log(URI);
    if (URI.match(/idolInfo\/(\d+)/g)) {
        return [true, URI.match(/idolInfo\/(\d+)/)[1]];
    } else {
        return [false, 0];
    }
}

function generateTableRow(arr, isColSpan = false) {
    const tr = document.createElement("tr");
    arr.forEach((element, index) => {
        const [td1, td2] = (index == 2 && isColSpan) ? generateTableCell(element, true): generateTableCell(element);
        tr.appendChild(td1);
        tr.appendChild(td2);
    });
    return tr;
}

function generateTableCell(obj, colorBox = false) {
    const td1 = document.createElement("td");
    td1.setAttribute("scope", "row");
    td1.classList.add("col-md-1");
    td1.appendChild(document.createTextNode(obj.key));

    const td2 = document.createElement("td");
    td2.classList.add("col-md-3");

    if (!colorBox) {
        td2.appendChild(document.createTextNode(obj.value));
    } else {
        const div1 = document.createElement('div');
        div1.classList.add("color-box");
        div1.classList.add("d-inline-block");
        div1.style.backgroundColor = obj.value;
        div1.style.height = "10px";
        div1.style.width = "10px";

        const div2 = document.createElement("div");
        div2.classList.add("d-inline-block");
        div2.appendChild(document.createTextNode(obj.value));

        td2.appendChild(div1);
        td2.appendChild(div2);
    }

    return [td1, td2];
}

function generateCardList(obj, index) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.classList.add("nav-link", "pl-2", "pt-1", "pb-1", "list-group-item");
    a.appendChild(document.createTextNode(obj.CardName));
    a.setAttribute("onclick", `changePicture("${obj.BigPic1}")`);
    //a.addEventListener('click', changePicture());

    li.appendChild(a);

    switch (obj.CardType) {
        case "P_SSR":
            PSSRCardList.appendChild(li);
            break;
        case "P_SR":
            PSRCardList.appendChild(li);
            break;
        case "P_R":
            PRCardList.appendChild(li);
            break;
        case "S_SSR":
            SSSRCardList.appendChild(li);
            break;
        case "S_SR":
            SSRCardList.appendChild(li);
            break;
        case "S_R":
            SRCardList.appendChild(li);
            break;
        case "S_N":
            SNCardList.appendChild(li);
            break;

    }
}

function changePicture(link) {
    cardPicture.src = `https://static.shinycolors.moe/pictures/bigPic/${link}`;
}