const ip_local = window.location.hostname;
const htp = window.location.protocol;
const fil = "biala-lista";
//Pobieranie portu jeśli jest.
const ports = () => {
    const ports = window.location.port;
    !ports ? portsr =  "" : portsr = `:${ports}`;
        return `${portsr}`;
}

//Pobieranie elementu po ID 
const elid = d => document.getElementById(d);

//Tworzenie elementu
const elc = d => document.createElement(d);

//Pobieranie elementu po name
const elna = d => document.getElementsByName(d);

//Pobieranie elementu po class name
const elcm = d => document.getElementsByClassName(d);


//Usuwanie elementu po ID
const removed = (d) => {
    d.forEach((i) => {
        const removed = elid(i);
        if (removed != null) {
            removed.remove();
        }
    });
}

//Usuwanie artybuntu po ID
const removattr = (d, i) => {
    d.forEach((a) => {
        const removattr = elid(a.id);
        if (removattr != null) {
            removattr.removeAttribute(i);
        }
    });
}


const elem = (add, i) => {
    i.forEach((a) => {
        if (a[0] === null) {
            add[a[1]] = `${a[2]}`;
        } else if (a[0] === "style") {
            add.style[a[1]] = `${a[2]}`;
        } else if (a[0] === "set") {
            add.setAttribute(`${[a[1]]}`, `${a[2]}`);
        } else if (a[0] === "append") {
            add.appendChild(a[1]);
        }
    });
    return add;
}


const cretorele = (d, i) => elem(elc(d), i);

const adde = (d, i) => elem(elid(d), i);

const dates = () => {
    dateObj = new Date();
    year = dateObj.getFullYear();
    month = dateObj.getMonth() + 1;
    numDay = dateObj.getDate();
    hour = dateObj.getHours();
    minute = dateObj.getMinutes();
    second = dateObj.getSeconds();
    if (minute < 10) minute = "0" + minute;
    if (second < 10) second = "0" + second;
    if (month < 10) month = "0" + month;
    if (numDay < 10) numDay = "0" + numDay;
}

dates();
elid("date").value = `${numDay}-${month}-${year}`


const timese = () =>  setInterval(Timer, 500);


const Timer = () => {
    dates();
    if (elid("serh") != null) {
        elid("serh").innerHTML = `Data wyszukania: ${numDay}-${month}-${year} ${hour}:${minute}:${second}`;
    }
}

const stopTimes = () => clearInterval(setInterval(Timer, 500));


const pole = (k) => {
    if (k.value === "bank-account") {
        len = { max: 32, min: 9 }
    } else if (k.value === "nip") {
        len = { max: 10, min: 9 }
    } else if (k.value === "regon") {
        len = { max: 14, min: 9 }
    }
    const { max, min } = len;

    adde("inputType", [[null, "placeholder", k.title],["set", "maxlength", max],["set", "minlength", min],[null, "value", ""]]);
}

    const rdo = (z) => {
        if (z.checked === true) {
            pole(z);
            z.setAttribute("checked", "checked");
        }
    }



    const check = (l) => {
        if (l[0] != undefined) {
            if (l != null) {
                for (let i = 0; i < l.length; i++) {
                    if (l[i].checked == true) {
                        return l[i].dataset.type;
                    }
                }
            }
        }
    }

    const noNumbers = () =>  {
        if (elid("inputType") != undefined) {
                elid("inputType").addEventListener("input", e => {
                if( (/^\d*\.?\d*$/.test(e.data) === true) && (e.inputType === "insertText") ) {
                } else if ((/^\d*\.?\d*$/.test(e.data) === false) && ((e.inputType === "deleteContentBackward") || (e.inputType === "deleteContentForward") || (e.inputType === "insertFromPaste") || (e.inputType === "historyUndo") || (e.inputType === "deleteByCut"))) {

                } else {
                    //console.log(`${/^\d*\.?\d*$/.test(e.data)} == ${e.inputType}`)
                    const val = e.target.value;
                    e.target.value = val.substring(0, val.length - 1);
                    console.log(val.substring(0, val.length - 1))
                }
            });
        }
    }

    const bank = (nr) => {
        const boxg = nr.replace(/\s/g, '');
         lk = '';
        const ll0 = boxg.slice(0, 2);
        const ll1 = ll0 + " " + boxg.slice(2, 6);
        const ll2 = ll1 + " " + boxg.slice(6, 10);
        const ll3 = ll2 + " " + boxg.slice(10, 14);
        const ll4 = ll3 + " " + boxg.slice(14, 18);
        const ll5 = ll4 + " " + boxg.slice(18, 22);
        const ll6 = ll5 + " " + boxg.slice(22, 26);

        if (boxg.length <= 2) { lk += ll0; } else if (boxg.length <= 6) { lk += ll1; } else if (boxg.length <= 10) { lk += ll2; } else if (boxg.length <= 14) { lk += ll3; } else if (boxg.length <= 18) { lk += ll4; } else if (boxg.length <= 22) { lk += ll5; } else { lk += ll6; }

        return lk;
    }

    const inputType0 = (p) => {
        if (p.value === "bank-account") {
            if (elid("inputType") != undefined) {
                elid("inputType").addEventListener("keydown", e => {
                    if (p.checked == true) {
                        e.target.value = bank(e.target.value);
                    }
                });
            }
        } 
    }

    const inputTypep = (inty) => {
        const val = inty.value.replace(/\s/g, '');
        if (elid("date") == '') {
            time = datw1;
        } else {
            time = elid("date").value;
        }
        const datd = time.split("-");
        const dat = `${datd[2]}-${datd[1]}-${datd[0]}`;
        sendmu(check(elna("rdo")), val, dat);
    }

    const files = (s, t) => {
        if (t == 1) {
        adde("filepdf", [["style", "display", s],[null, "innerHTML", ""]]);
        } else {
        adde("filepdf", [["style", "display", s]]);    
        }
        
        //adde("filepdf", [[null, "value", ""]]);
    }

    const filename = (id) => { 
        if (id == "null") {
            input = cretorele("input", [[null,"type", "text"], ["set","id","files"], [null,"name", "files"], [null,"className", "input-form dateInput"],[null,"placeholder", "Nazwa przyszłego pliku"] ]);
        } else {
            input = cretorele("input", [[null,"type", "text"], ["set","id","files"], [null,"name", "files"], [null,"className", "input-form dateInput"],[null,"disabled", "disabled"], [null,"value", id]]);
        }
        
        const label = cretorele("label", [["append", input]]);   
        const div0 = cretorele("div", [[null,"className", "form-container-selecta sizeInputForBigSize"], ["style", "position", "relative"], ["append", label]]);
        const button = cretorele("input", [[null,"type", "submit"], ["set","id","searchButton2"], [null,"className", "btn btn-primaryAk searchButtonClick"],[null, "innerHTML", "Generuj PDF"] ]);
        const div1 = cretorele("div", [[null,"className", "sendButtonAKa"], ["append", button]]);
        return cretorele("div", [[null,"className", "m-12"], ["append", div0], ["append", div1]]);
    }

    const radioform = () => {

        const input0 = cretorele("input", [[null,"type", "radio"], ["set","id","nf1"], [null,"name", "nf"], [null,"className", "hidden1 radioAK"], [null,"data-type", "identyfikator-wyszukiwania"], [null,"value", "identyfikator-wyszukiwania"], [null,"aria-label", "Identyfikator wyszukiwania"], [null,"title", "Identyfikator wyszukiwania"], [null,"checked", "checked"] ]);
        const span0 = cretorele("span", [[null,"className", "control-label"], [null,"title", "Identyfikator wyszukiwania"]]);
        const span0a = cretorele("span", [[null, "innerHTML", "Identyfikator wyszukiwania"]]);
        const label0 = cretorele("label", [[null,"for", "opt2"], [null,"className", "radio-control-container"], [null,"title", "Identyfikator wyszukiwania"], ["append", input0], ["append", span0], ["append", span0a]]);

        const input1 = cretorele("input", [[null,"type", "radio"], ["set","id","nf2"], [null,"name", "nf"], [null,"className", "hidden1 radioAK"], [null,"data-type", "nazwa-przyszlego-pliku"], [null,"value", "nazwa-przyszlego-pliku"], [null,"aria-label", "Nazwa przyszłego pliku"], [null,"title", "Nazwa przyszłego pliku"]]);
        const span1 = cretorele("span", [[null,"className", "control-label"], [null,"title", "Nazwa przyszłego pliku"]]);
        const span1a = cretorele("span", [[null, "innerHTML", "Nazwa przyszłego pliku"]]);
        const label1 = cretorele("label", [[null,"for", "opt2"], [null,"className", "radio-control-container"], [null,"title", "Nazwa przyszłego pliku"], ["append", input1], ["append", span1], ["append", span1a]]);

        const legend = cretorele("legend", [["append", label0], ["append", label1]]);   
        const fieldset = cretorele("fieldset", [["append", legend]]);   
        return cretorele("div", [[null,"className", "radio-form-control mt49"], ["append", fieldset]]);
    }

    const result1 = () => {  
        //const filepdf = cretorele("div", [["set","id","filepdf"], [null,"className", "container"], ["append", filename()]]);
        const filepdf = cretorele("div", [["set","id","filename"]]);
        const result = cretorele("div", [["set","id","result"], [null,"className", "container"], ["append", radioform()], ["append", filepdf]]);
        const searchResultBox = cretorele("div", [["set","id","searchResultBox"]]);
        return adde("result1", [ ["append", result], ["append", searchResultBox]]);
    }

    if (elid("searchButton") != undefined) {
            elid("searchButton").addEventListener("click", () => {
            inputTypep(elid("inputType"));
            adde("result1", [[null, "innerHTML", ""]]);
            result1()
            keyclick1a();
        });
    }

    const keyclick = () => {
        elid("inputType").addEventListener("keydown", event => {    
            if (event.key == "Enter") {
                inputTypep(elid("inputType"));
                adde("result1", [[null, "innerHTML", ""]]);
                result1()
                keyclick1a();
            }
        });
    }


    if (elna("rdo")[0] != undefined) {
        const contf = elna("rdo");
        if (contf != null) {
            contf.forEach((i) => {
                i.addEventListener("click", () => {
                    removattr(contf, "checked");
                    adde("result1", [[null, "innerHTML", ""]]);
                    stopTimes();
                    rdo(i);
                    inputType0(i);
                });
            });
        }
    }

    

    if (elna("rdo")[0] != undefined) {
        const contf = elna("rdo");
        if (contf != null) {
            contf.forEach((i) => {
                rdo(i);
                inputType0(i);
            });
        }
    }

    const radioform1 = (id) => {
        if (elna("nf")[0] != undefined) {
            const contf = elna("nf");
            
            if (contf != null) {
                contf.forEach((i) => {
                    i.addEventListener("click", () => {
                        console.log(contf);
                        removattr(contf, "checked");
                        console.log(contf);
                        stopTimes();
                        nf(i,id);
                        //filename();
                        /*adde("result1", [[null, "innerHTML", ""]]);
                        
                        inputType0(i);*/
                    });
                });
            }
        }

        if (elna("nf")[0] != undefined) {
            const contf = elna("nf");
            
            if (contf != null) {
                contf.forEach((i) => {
                    nf(i,id);
                    //console.log(contf);
                   /* 
                    inputType0(i);*/
                });
            }
        }
    }

    const pole1 = (k, id) => {
        console.log(k.value, id);
        adde("filename", [[null, "innerHTML", ""]]);
        
        if (k.value === "identyfikator-wyszukiwania") {
            adde("filename", [["append", filename(id)]]);
        } else if (k.value === "nazwa-przyszlego-pliku") {
            adde("filename", [["append", filename("null")]]);
        }
        keyclick1a();
    }

    const nf = (z, id) => {
        if (z.checked === true) {
            pole1(z, id);
            z.setAttribute("checked", "checked");
        }
    }

    noNumbers();
    keyclick();



    const td = (c) => cretorele("td", [[null,"className", c]]);
    const tda = (c, a) => cretorele("td", [[null,"className", c], ["append", a]]);
    const tdi = (c, t) => cretorele("td", [[null,"className", c], [null,"innerHTML", t]]);

    const modalcontent = (d) => {    
        const div = cretorele("div", [["set","id","exampleModalScrollableTitle"], [null,"className", "modal-title"], [null,"innerHTML", d]]);
        const td = cretorele("td", [[null,"className", "modal-header"], ["append", div]]);
        const tr = cretorele("tr", [["append", td]]);
        const tbody = cretorele("tbody", [["append", tr]]);
        return cretorele("table", [["set","id","chow"], [null,"className", "modal-content"], ["append", tbody]]);
    }
    
    const tableadd = (td0, td1, td2, td3, id) => {
        id ? chow = ["set","id","chow"] : chow = [];

        const tr = cretorele("tr", [["append", td0], ["append", td1], ["append", td2], ["append", td3]]);
        const tbody = cretorele("tbody", [["append", tr]]);
        return cretorele("table", [chow, [null,"className", "tableAK"], ["append", tbody]]);
    }
    
    const stan = (d) => {
        const td1 = cretorele("td", [["set","id","sers"], [null,"className", "twofirst1"], [null,"innerHTML", `Stan na dzień: ${d}`]]);
        const td2 = cretorele("td", [["set","id","serh"], [null,"className", "twosecond"]]);
        return tableadd(td("tableAKa"), td1, td2, td("tableAKa"), "chow");
    }
    
    const tableHeader = () => {
        const h4 = cretorele("h4", [[null,"className", "pw"], [null,"innerHTML", "&nbsp;&nbsp; Figuruje w rejestrze VAT"]]);
        const td = cretorele("td", [[null,"className", "tableAKa"], ["append", h4]]);
        const tr = cretorele("tr", [["append", td]]);
        const tbody = cretorele("tbody", [["append", tr]]);
        return cretorele("table", [[null,"className", "tableHeaderAK"], ["append", tbody]])
    }

    const konto = (d) => {
        const div = cretorele("div", [[null,"className", "count1"]]);
        d.forEach((i) => {
            const o = `${i.substring(0, 2)} ${i.substring(2, 6)} ${i.substring(6, 10)} ${i.substring(10, 14)} ${i.substring(14, 18)} ${i.substring(18, 22)} ${i.substring(22, 26)}`;
            const divw = cretorele("div", [["style","fontWeight", "Bold"], [null,"innerHTML", o]]);
            div.appendChild(divw);
        });
        return div;
    }

    const twofirstb = (d) => {
        const div = elc('div');
        d.forEach((i) => {
            const span = cretorele("span", [["style","display", "block"], [null,"innerHTML", `${i}`]]);
            div.appendChild(span);
        });
        return div;
    }

    const twosecondb = (d, i) => {
        const div = cretorele("div", [[null,"className", "rtext"]]);
        i.forEach((x) => {
            d[x] ? chow = `${d[x]}` : chow = "-";
            const span = cretorele("span", [["style","display", "block"], [null,"innerHTML", chow]]);
            div.appendChild(span);
        });
        return div;
    }

    const tableAK = (data, text, classi) => {
        classi ? chow = ['counta1','twofirst count', 'twosecond count'] : chow = ['tableAKa', 'twofirst', 'twosecond'];
        data ? classi ? chow2b = [] : chow2b = ["style","fontWeight", "normal"] : chow2b = ["style","fontWeight", "normal"];

        if ((data == null) || (data == "null") || (data == "")) {
            chow2a = [null,"innerHTML", "-"];      
        } else {         
            classi ? chow2a = ["append", konto(data)] : chow2a = [null,"innerHTML", data]
        }

        const td2 = cretorele("td", [[null,"className", chow[2]], ["set","valign","middle"], chow2a, chow2b]);
        return tableadd(td(chow[0]), tdi(chow[1], text), td2, td(chow[0]), null);
    }

    const tableAK2 = data => tableadd(td("countSpecial1"), tdi("twofirst countSpecial", data), tdi("twosecond countSpecialLas", ""), td("countSpecial1"), null);
    
    const tableAK1 = (data, item, text) =>  tableadd(td("tableAKa"), tda("twofirst", twofirstb(text)), tda("twosecond", twosecondb(data, item)), td("tableAKa"), null);

    const successinfo = (info, dat, id) => {
        stopTimes();
        timese();
        radioform1(id);

        const textp = [
            "Firma (nazwa) lub imię i nazwisko",
            "Numer, za pomocą którego podmiot został zidentyfikowany na potrzeby podatku, jeżeli taki numer został przyznany",
            "Numer PESEL, o ile podmiot posiada",
            "Status podatnika (wg stanu na dzień sprawdzenia)",
            "Numer identyfikacyjny REGON, o ile został nadany",
            "Numer w Krajowym Rejestrze Sądowym, o ile został nadany",
            "Adres siedziby – w przypadku podmiotu niebędącego osobą fizyczną",
            "Adres stałego miejsca prowadzenia działalności albo adres miejsca zamieszkania, w przypadku braku adresu stałego miejsca prowadzenia działalności - w odniesieniu do osoby fizycznej",
            "Imiona i nazwiska prokurentów oraz ich numery identyfikacji podatkowej lub numery PESEL",
            "Imiona i nazwiska osób wchodzących w skład organu uprawnionego do reprezentowania podmiotu oraz ich numery identyfikacji podatkowej lub numery PESEL",
            "Imię i nazwisko lub firma (nazwa) wspólnika oraz jego numer identyfikacji podatkowej lub numer PESEL&nbsp;&nbsp;",
            "Numery rachunków rozliczeniowych lub imiennych rachunków w SKOK",
            "Podmiot może posiadać inne rachunki bankowe, które są przyporządkowane do rachunków wyświetlonych w wykazie",
            "Data rejestracji jako podatnika VAT",
            ["Data odmowy rejestracji jako podatnika VAT", "Podstawa prawna odmowy rejestracji"],
            ["Data wykreślenia rejestracji jako podatnika VAT", "Podstawa prawna wykreślenia"],
            ["ata przywrócenia rejestracji jako podatnika VAT", "Podstawa prawna przywrócenia"]
        ];
    
        const statinfo = ["name", "nip", "pesel", "statusVat", "regon", "krs", "workingAddress", "residenceAddress", "authorizedClerks", "representatives", "partners", "accountNumbers", "hasVirtualAccounts", "registrationLegalDate", ["registrationDenialDate", "registrationDenialBasis"], ["removalDate", "removalBasis"], ["restorationDate", "restorationBasis"]];
    
        const divForm = cretorele("div", [["set","id", "tableOne"], [null,"className", "container"]]);
        divForm.appendChild(modalcontent(`NAZWA: ${info.name} NIP: ${info.nip}`));
        divForm.appendChild(stan(`${dat}`));
        divForm.appendChild(tableHeader());

        statinfo.forEach((s,i) => {
            //console.log(s, i, info[s])
            if (s === "pesel") {
                if (info[s] !== null) {
                    divForm.appendChild(tableAK(info[s], textp[i], null));
                }            
            } else if(s === "hasVirtualAccounts") {
                if (info[s] === true) {
                divForm.appendChild(tableAK2(textp[i])); 
                }            
            } else if (s === "accountNumbers") {
                divForm.appendChild(tableAK(info[s], textp[i], "count"));
            } else {
                if (s.length === 2) {
                    divForm.appendChild(tableAK1(info, s, textp[i]));
                } else {
                    divForm.appendChild(tableAK(info[s], textp[i], null));
                }
            }
        });

    const div2 = cretorele("div", [[null,"className", "searchFooterAK toLeftBox"], [null,"innerHTML", `Identyfikator wyszukiwania: ${id}`]]);
    const div1 = cretorele("div", [[null,"className", "col"], ["append", div2]]);
    const div0 = cretorele("div", [[null,"className", "row"], ["append", div1]]);
    const div = cretorele("div", [[null,"className", "container boxSearc"], ["append", div0]]);
    divForm.appendChild(div);

        adde("searchResultBox", [["append", divForm]]);
    }

    const errorinfo = (info) => {

        stopTimes();

        const errorh = cretorele("h4", [[null,"innerHTML", info]]);
        const divinfo = cretorele("div", [[null,"className", "tableHeaderAK error"], ["append", errorh]]);
        const divForm = cretorele("div", [["set","id", "tableOne"], [null,"className", "container"], ["append", divinfo]]);
        const errorBox = cretorele("div", [["set","id","errorBox"], ["append", divForm]]);
        adde("result1", [["append", errorBox]]);
    }

    const sendmu = (type, val, dat) => {
        let url = new URL(`https://wl-api.mf.gov.pl/api/search/${type}/${val}`),
            params = { date: dat }
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        fetch(url)
            .then(response => response.json())
            .then(json => {
                if (type === "bank-account") {
                    console.log(json);
                    if (json.message != null) {
                        removed("result");
                        removed("searchResultBox");
                        errorinfo(json.message);
                    } else {
                        if (json.result.subjects[0] != null) {
                            //removed("errorBox");

                            successinfo(json.result.subjects[0], dat, json.result.requestId);
                        } else {
                            removed("result");
                            removed("searchResultBox");
                            errorinfo("Rachunek nie figuruje na wykazie");
                        }

                    }
                } else if ((type === "nip") || (type === "regon")) {
                    
                    if (json.message != null) {
                        console.log(json);
                        removed(["result"]);
                        removed(["searchResultBox"]);
                        errorinfo(json.message);
                    } else {
                        if (json.result.subject != null) {
                            //removed("errorBox");
                            successinfo(json.result.subject, dat, json.result.requestId);
                        } else {
                            console.log(json);
                            removed("result");
                            removed("searchResultBox");
                            errorinfo("Nie figuruje w rejestrze VAT");
                        }
                    }
                } else {
                    //console.log(json);
                }
            })
            .catch(error => console.log('błąd: ', error));

    }

    const filec = () => {
        const divToPrint = elid("searchResultBox").innerHTML;
        const np = elid("files").value;
        const datt0 = elid("date").value;
        dates();
        const datw1 = `${numDay}-${month}-${year}`;
        if (datt0 == '') {
            datt = datw1;
        } else {
            datt = datt0;
        }

        const se = { name: divToPrint, pli: np, dat: datt }
        cretorfile(se, np, datt);
    }

const keyclick1a = () => {
    if (elid("searchButton2") != undefined) {
            elid("searchButton2").addEventListener("click", () => {
            filec();
        });
    }
}
    const keyclick1 = () => {
        if (elid("files") != undefined) {
            elid("files").addEventListener("keydown", event => {    
                if (event.key == "Enter") {
                    filec();;
                }
            });
        }
    }


    keyclick1();

    const cretorfile = (se, np, datt) => {
        const options = {
            method: 'POST',
            body: JSON.stringify(se),
            headers: {
                'Content-Type': 'text/html'
            }
        };

            const url1 = `${htp}//${ip_local}${ports()}/${fil}/files/addpdf`;
            fetch(url1, options)
                .then(response => response.text())
                .then(() => {
                    openfile(np, datt);
                })
                .catch(error => console.log('błąd: ', error));
    }

    const openfile = (np, datt) => {
        setTimeout(() => {
            const urlp = `${htp}//${ip_local}${ports()}/${fil}/files/view/${np} ${datt}`;
            window.open(urlp);
        }, 300);
        setTimeout(() => {
            const se = { pli: np, dat: datt }
            deletefile(se);
        }, 10000);

    }

    const deletefile = (se) => {
        const options = {
            method: 'POST',
            body: JSON.stringify(se),
            headers: {
                'Content-Type': 'text/html'
            }
        };
        const url = `${htp}//${ip_local}${ports()}/${fil}/files/del`;
        fetch(url, options)
            .then(response => response.text())
            .then(() => {
            })
            .catch(error => console.log('błąd: ', error));
    }