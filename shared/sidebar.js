const DTG = "data-toggle",
    DTA = "data-target";
const CLP = "collapse";
const LGI = "list-group-item",
    LG = "list-group";


async function GetIdolUnitList() {
    const UnitIdolList = (await axios.get("https://api.shinycolors.moe/general/getIdolUnitList")).data;

    const SideBar = document.getElementById("divIdolUnitList");

    for (let k = 1; k < UnitIdolList.UnitCount; k++) {
        console.log(k);
        const UnitTitle = document.createElement("a");
        UnitTitle.href = "#";
        UnitTitle.classList.add(LGI);
        UnitTitle.setAttribute(DTG, CLP);
        UnitTitle.setAttribute(DTA, `#unit${k}`);

        const UnitI = document.createElement("i");
        UnitI.classList.add("glyphicon");
        UnitTitle.appendChild(UnitI);
        UnitTitle.appendChild(document.createTextNode(UnitIdolList[k].UnitName));

        SideBar.appendChild(UnitTitle);

        const UnitDiv = document.createElement("div");
        UnitDiv.classList.add(LG);
        UnitDiv.classList.add(CLP);
        UnitDiv.id = `unit${k}`;

        const [isInIdolDetail, idolID] = checkInIdolInfo();

        for (let m = 0; m < UnitIdolList[k].UnitIdols.length; m++) {
            const IdolEle = document.createElement("a");
            IdolEle.href = `./idolInfo/${UnitIdolList[k].UnitIdols[m].IdolID}`;

            console.log(isInIdolDetail, idolID);
            if (isInIdolDetail && idolID == UnitIdolList[k].UnitIdols[m].IdolID) {
                IdolEle.classList.add("active");
            }

            IdolEle.classList.add(LGI);
            IdolEle.classList.add("pl-5");
            IdolEle.appendChild(document.createTextNode(UnitIdolList[k].UnitIdols[m].IdolName));

            UnitDiv.appendChild(IdolEle);
        }

        SideBar.appendChild(UnitDiv);

    }

    console.log(UnitIdolList, SideBar);
}

function checkInIdolInfo() {
    const URI = location.pathname.substr(1);
    if (URI.match(/idolInfo\/(d+)/)) {
        return [true, URI.match(/idolInfo\/(d+)/)[1]];
    } else {
        return [false, 0];
    }
}