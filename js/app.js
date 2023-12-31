const ip_local = window.location.hostname;
const htp = window.location.protocol;
const pathname = window.location.pathname;
//console.log(window.location);

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

//Tworzenie elemetów
const cretorele = (d, i) => elem(elc(d), i);

//Dodawniw elemetów
const adde = (d, i) => elem(elid(d), i);

//Tworzenie daty i czasu
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

//Tworzenie czasu
const timese = () =>  setInterval(Timer, 500);

//Odświerzanie daty i czasu
const Timer = () => {
    dates();
    if (elid("serh") != null) {
        elid("serh").innerHTML = `Data wyszukania: ${numDay}-${month}-${year} ${hour}:${minute}:${second}`;
    }
}

const stopTimes = () => clearInterval(setInterval(Timer, 500));

//tworzenie pól wyborów
const dataSelection = (k) => {
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


    //Które pole zostało wybrane
    const rdo = (z) => {
        if (z.checked === true) {
            dataSelection(z);
            z.setAttribute("checked", "checked");
        }
    }


    //Jakie pole zostało wybrane
    const check = (l) => {
        if (l[0] != undefined) {
            if (l != null) {
                for (let i = 0; i < l.length; i++) {
                    if (l[i].checked == true) {
                        console.log(l[i].dataset.type);
                        return l[i].dataset.type;
                    }
                }
            }
        }
    }

    //Mozliwość pisania tylko samych cyfr
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

    //Format konta bankowego
    const accountNumber = (nr) => {
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

    //Pole input dla konta bankowego
    const inputType0 = (p) => {
        if (p.value === "bank-account") {
            if (elid("inputType") != undefined) {
                elid("inputType").addEventListener("keydown", e => {
                    if (p.checked == true) {
                        e.target.value = accountNumber(e.target.value);
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


    const result1 = () => {  
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

    noNumbers();
    keyclick();

/*Początek modułu związanym z pobieraniem nazwy pliku z api lub wmyślona nazwa pliku z datą*/

    //Gotowa lub wmyślona nazwa pliku z datą
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

    const radioformlabel = (n, t, h) => {

        legend = elc("legend");
        t.forEach((i, w) => {
            if (w == 0) {ch = [null,"checked", "checked"] } else {ch = "" }
            const input = cretorele("input", [[null,"type", "radio"], ["set","id",`${n}${w+1}`], [null,"name", "nf"], [null,"className", "hidden1 radioAK"], [null,"data-type", `${t[w]}`], [null,"value", `${t[w]}`], [null,"aria-label", `${h[w]}`], [null,"title", `${h[w]}`], ch]);
            const span = cretorele("span", [[null,"className", "control-label"], [null,"title", `${h[w]}`]]);
            const spana = cretorele("span", [[null, "innerHTML", `${h[w]}`]]);
            const label = cretorele("label", [[null,"for", `${n}${w+1}`], [null,"className", "radio-control-container"], [null,"title", `${h[w]}`], ["append", input], ["append", span], ["append", spana]]);
            legend.appendChild(label);
        })
 
        return legend;
        
    }

    const radioform = () => {  
        const fieldset = cretorele("fieldset", [["append", radioformlabel("nf", ["identyfikator-wyszukiwania", "nazwa-przyszlego-pliku"], ["Identyfikator wyszukiwania", "Nazwa przyszłego pliku"])]]);   
        return cretorele("div", [[null,"className", "radio-form-control mt49"], ["append", fieldset]]);
    }

    
    const radioform1 = (id) => {
        if (elna("nf")[0] != undefined) {
            const contf = elna("nf");
            
            if (contf != null) {
                contf.forEach((i) => {
                    i.addEventListener("click", () => {
                        removattr(contf, "checked");
                        stopTimes();
                        //console.log(i,id);
                        nameFiles(i,id);
                    });
                });
            }
        }

        if (elna("nf")[0] != undefined) {
            const contf = elna("nf");        
            if (contf != null) {
                contf.forEach((i) => {
                    //console.log(i,id);
                    nameFiles(i,id);
                });
            }
        }
    }

    //Określenie przyszłej nazwy pliku
    const selectFilename = (k, id) => {
        //console.log(k.value, id);
        adde("filename", [[null, "innerHTML", ""]]);
        
        if (k.value === "identyfikator-wyszukiwania") {
            adde("filename", [["append", filename(id)]]);
        } else if (k.value === "nazwa-przyszlego-pliku") {
            adde("filename", [["append", filename("null")]]);
        }
        keyclick1a();
    }

    const nameFiles = (z, id) => {
        if (z.checked === true) {
            selectFilename(z, id);
            z.setAttribute("checked", "checked");
        }
    }

    
 /*Koniec modułu związanym z pobieraniem nazwy pliku z api lub wmyślona nazwa pliku z datą*/

/*Początek modułu związanym z pobieraniem danych z api i przetwarzaniem tych danych jako tabela*/

    const td = (className) => cretorele("td", [[null,"className", className]]);
    const tda = (className, a) => cretorele("td", [[null,"className", className], ["append", a]]);
    const tdi = (className, data) => cretorele("td", [[null,"className", className], [null,"innerHTML", data]]); 

    //Tworzenie tabeli z nazwą firmy i NIP-em
    const importantData = (data) => {    
        const div = cretorele("div", [[null,"className", "modal-title"], [null,"innerHTML", data]]);
        const td = cretorele("td", [[null,"className", "modal-header"], ["append", div]]);
        const tr = cretorele("tr", [["append", td]]);
        const tbody = cretorele("tbody", [["append", tr]]);
        return cretorele("table", [["set","id","chow"], [null,"className", "modal-content"], ["append", tbody]]);
    }
    
    //Tworzenie tabel z danymi
    const tableadd = (td0, td1, td2, td3, id) => {
        id ? chow = ["set","id","chow"] : chow = [];

        const tr = cretorele("tr", [["append", td0], ["append", td1], ["append", td2], ["append", td3]]);
        const tbody = cretorele("tbody", [["append", tr]]);
        return cretorele("table", [chow, [null,"className", "tableAK"], ["append", tbody]]);
    }
    
    //Stan danych na określony dzień
    const state = (d) => {
        const td1 = cretorele("td", [["set","id","sers"], [null,"className", "twofirst1"], [null,"innerHTML", `Stan na dzień: ${d}`]]);
        const td2 = cretorele("td", [["set","id","serh"], [null,"className", "twosecond"]]);
        return tableadd(td("tableAKa"), td1, td2, td("tableAKa"), "chow");
    }
    
    //Status podatnika
    const tableHeader = (s, t) => {
        const h4 = cretorele("h4", [[null,"className", "pw"], [null,"innerHTML", `&nbsp;&nbsp; ${t}`]]);
        const td = cretorele("td", [[null,"className", "tableAKa"], ["append", h4]]);
        const tr = cretorele("tr", [["append", td]]);
        const tbody = cretorele("tbody", [["append", tr]]);
        return cretorele("table", [[null,"className", `tableHeaderAK${s}`], ["append", tbody]])
    }

    //Tworznie struktury do wyświetlina infomacji o kontach bankowy
    const account = (d) => {
        const div = cretorele("div", [[null,"className", "count1"]]);
        d.forEach((i) => {
            const o = `${i.substring(0, 2)} ${i.substring(2, 6)} ${i.substring(6, 10)} ${i.substring(10, 14)} ${i.substring(14, 18)} ${i.substring(18, 22)} ${i.substring(22, 26)}`;
            const divw = cretorele("div", [["style","fontWeight", "Bold"], [null,"innerHTML", o]]);
            div.appendChild(divw);
        });
        return div;
    }

    //Lewa tabela informacji
    const twofirstb = (d) => {
        const div = elc('div');
        d.forEach((i) => {
            const span = cretorele("span", [["style","display", "block"], [null,"innerHTML", `${i}`]]);
            div.appendChild(span);
        });
        return div;
    }

    //Prawa tabela infomacji
    const twosecondb = (d, i) => {
        const div = cretorele("div", [[null,"className", "rtext"]]);
        i.forEach((x) => {
            d[x] ? chow = `${d[x]}` : chow = "-";
            const span = cretorele("span", [["style","display", "block"], [null,"innerHTML", chow]]);
            div.appendChild(span);
        });
        return div;
    }

    //Tworzenie głównych informacji 
    const tableAK = (data, text, classi) => {
        classi ? chow = ['counta1','twofirst count', 'twosecond count'] : chow = ['tableAKa', 'twofirst', 'twosecond'];
        data ? classi ? chow2b = [] : chow2b = ["style","fontWeight", "normal"] : chow2b = ["style","fontWeight", "normal"];

        if ((data == null) || (data == "null") || (data == "")) {
            chow2a = [null,"innerHTML", "-"];      
        } else {         
            classi ? chow2a = ["append", account(data)] : chow2a = [null,"innerHTML", data]
        }

        const td2 = cretorele("td", [[null,"className", chow[2]], ["set","valign","middle"], chow2a, chow2b]);
        return tableadd(td(chow[0]), tdi(chow[1], text), td2, td(chow[0]), null);
    }

    //Tworzenie pozostałych informacji 
    const tableAK1 = (data, item, text) =>  tableadd(td("tableAKa"), tda("twofirst", twofirstb(text)), tda("twosecond", twosecondb(data, item)), td("tableAKa"), null);

    //Tworzenie infomacji o kontach wituralnych
    const tableAK2 = data => tableadd(td("countSpecial1"), tdi("twofirst countSpecial", data), tdi("twosecond countSpecialLast", ""), td("countSpecial1"), null);
    
    
    //Wyciągnięcie prawidłowych danaych z API
    const successinfo = (info, dat, id, statusVat) => {
        stopTimes();
        timese();
        radioform1(id);

        if (statusVat === "Niezarejestrowany") {statusVatStyle = " error"; statusVatText = "Nie figuruje w rejestrze VAT"; } else {statusVatStyle = ""; statusVatText = "Figuruje w rejestrze VAT";}

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
            ["Data przywrócenia rejestracji jako podatnika VAT", "Podstawa prawna przywrócenia"]
        ];
    
        const statinfo = ["name", "nip", "pesel", "statusVat", "regon", "krs", "workingAddress", "residenceAddress", "authorizedClerks", "representatives", "partners", "accountNumbers", "hasVirtualAccounts", "registrationLegalDate", ["registrationDenialDate", "registrationDenialBasis"], ["removalDate", "removalBasis"], ["restorationDate", "restorationBasis"]];
    
        const divForm = cretorele("div", [["set","id", "tableOne"], [null,"className", "container"]]);
        divForm.appendChild(importantData(`NAZWA: ${info.name} NIP: ${info.nip}`));
        divForm.appendChild(state(`${dat}`));
        divForm.appendChild(tableHeader(statusVatStyle, statusVatText));

        statinfo.forEach((s,i) => {
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
                    //console.log(info, s, textp[i])
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

    //Wyświetlanie błędu
    const errorinfo = (info) => {

        stopTimes();

        const errorh = cretorele("h4", [[null,"innerHTML", info]]);
        const divinfo = cretorele("div", [[null,"className", "tableHeaderAK error"], ["append", errorh]]);
        const divForm = cretorele("div", [["set","id", "tableOne"], [null,"className", "container"], ["append", divinfo]]);
        const errorBox = cretorele("div", [["set","id","errorBox"], ["append", divForm]]);
        adde("result1", [["append", errorBox]]);
    }

    //Pobieranie danych z API
    const sendmu = (type, val, dat) => {
        let url = new URL(`https://wl-api.mf.gov.pl/api/search/${type}/${val}`),
            params = { date: dat }
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        fetch(url)
            .then(response => response.json())
            .then(json => {
                if (type === "bank-account") {
                    if (json.message != null) {
                        removed(["result"]);
                        removed(["searchResultBox"]);
                        errorinfo(json.message);
                    } else {
                        if (json.result.subjects[0] != null) {
                            successinfo(json.result.subjects[0], dat, json.result.requestId, json.result.subjects[0].statusVat);
                            //console.log(json.result.subjects[0].statusVat)
                        } else {
                            removed(["result"]);
                            removed(["searchResultBox"]);
                            errorinfo("Rachunek nie figuruje na wykazie");
                        }

                    }
                } else if ((type === "nip") || (type === "regon")) {
                    
                    if (json.message != null) {
                        removed(["result"]);
                        removed(["searchResultBox"]);
                        errorinfo(json.message);
                    } else {
                        if (json.result.subject != null) {
                            successinfo(json.result.subject, dat, json.result.requestId, json.result.subject.statusVat);
                            //console.log(json.result.subject.statusVat)
                        } else {
                            removed(["result"]);
                            removed(["searchResultBox"]);
                            errorinfo("Nie figuruje w rejestrze VAT");
                        }
                    }
                } else {
                    //console.log(json);
                }
            })
            .catch(error => console.log('błąd: ', error));

    }


    /*Koniec modułu związanym z pobieraniem danych z api i przetwarzaniem tych danych jako tabela*/


    /*Początek modułu związanym z tworzeniem, otwieraniem oraz usuwaniem pliku pdf*/

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

            const url1 = `${htp}//${ip_local}${ports()}${pathname}files/addpdf`;
            fetch(url1, options)
                .then(response => response.text())
                .then(() => {
                    openfile(np, datt);
                })
                .catch(error => console.log('błąd: ', error));
    }

    const openfile = (np, datt) => {
        setTimeout(() => {
            const urlp = `${htp}//${ip_local}${ports()}${pathname}files/view/${np} ${datt}`;
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
        const url = `${htp}//${ip_local}${ports()}${pathname}files/del`;
        fetch(url, options)
            .then(response => response.text())
            .then(() => {
            })
            .catch(error => console.log('błąd: ', error));
    }

    /*Koniec modułu związanym z tworzeniem, otwieraniem oraz usuwaniem pliku pdf*/