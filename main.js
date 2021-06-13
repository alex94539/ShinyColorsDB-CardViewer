const DTG = "data-toggle",
    DTA = "data-target";
const CLP = "collapse";
const LGI = "list-group-item",
    LG = "list-group";

async function GetIdolUnitList() {
    const UnitIdolList = (await axios.get("http://localhost:3000/General/GetIdolUnitList")).data;

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
        UnitDiv.id = `unit${k}`

        for (let m = 0; m < UnitIdolList[k].UnitIdols.length; m++) {
            const IdolEle = document.createElement("a");
            IdolEle.href = `./${UnitIdolList[k].UnitIdols[m].IdolID}`;
            IdolEle.classList.add(LGI);
            IdolEle.classList.add("pl-5");
            IdolEle.appendChild(document.createTextNode(UnitIdolList[k].UnitIdols[m].IdolName));

            UnitDiv.appendChild(IdolEle);
        }

        SideBar.appendChild(UnitDiv);

    }

    console.log(UnitIdolList, SideBar);
}

/**
 *              <a href="#" class="list-group-item" data-toggle="collapse" data-target="#unit1">
                    <i class="glyphicon glyphicon-chevron-right"></i>Illumination Stars
                </a>
                <div class="list-group collapse" id="unit1">
                    <a href="./1" class="list-group-item">櫻木真乃</a>
                    <a href="./2" class="list-group-item">風野灯織</a>
                    <a href="./3" class="list-group-item">八宮めぐる</a>
                </div>
 */