// $(document).ready(function() {
    function Calendar(input, options) {
        this.now = new Date();
        this.day = this.now.getDate();
        this.month = this.now.getMonth();
        this.year = this.now.getFullYear();
        this.input = input;
    
        this.divCnt = null;
        this.divHeader = null; //header kalendarza
        this.divTable = null; //div z tabelą kalendarza
        this.divFooter = null; //footer kalendarza z przyciskiem "dziś"
        this.divDateSelects = null; //div z selektami daty
        this.divButtons = null; //div z buttonami poprzedni-następny
        this.selectMonth = null; //selekt miesiąca
        this.selectYear = null; //selekt roku
    
        const defaultOptions = {
            yearStep : 3, //co ile lat dodawać do selekta
            markActualDay : true, //czy zaznaczać aktualny dzień
            closeOnSelect : false, //czy zamykać kalendarz po wybraniu daty
            showTodayBtn : true, //czy pokazywać przycisk "dziś"
            todayBtnText : "dziś", //tekst przycisku "dziś"
            onDateSelect : function(day, month, year) { //funkcja wykonywana po wybraniu daty
                const monthText = ((month + 1) < 10) ? "0" + (month + 1) : month + 1;
                 const dayText = ((day) < 10) ? "0" + (day) : day;
                this.input.value = dayText + '-' + monthText + '-' + this.year;
            }.bind(this)
        };
        this.options = Object.assign({}, defaultOptions, options);
    
        //selekt z wyborem roku ma lata od x do y - np. od 2013 do 2020
        //jeżeli przyciskami prev-next dojdziesz do grudnia maksymalnego roku i przejdziesz na następny miesiąc
        //to trzeba dodac do tego selekta nowe lata. To samo dla poprzednich lat
        this.yearStep = this.options.yearStep; //co ile lat dodawać do selekta
        this.minYear = this.year - this.options.yearStep; //minimalny rok w selekcie
        this.maxYear = this.year + this.options.yearStep; //maksymalny rok w selekcie
    
        //metoda tworząca przyciski prev-next
        this.createPrevNextButtons = function () {
            //poprzedni miesiąc
            const buttonPrev = document.createElement('button');
            buttonPrev.innerText = '<';
            buttonPrev.type = "button";
            buttonPrev.classList.add('input-prev');
            buttonPrev.addEventListener('click', function () {
                this.month--;
                if (this.month < 0) {
                    this.month = 11;
                    this.year--;
                }
                this.createCalendarTable();
                this.actualizeDateSelects();
            }.bind(this));
            this.divButtons.appendChild(buttonPrev);
    
            //następny miesiąc
            const buttonNext = document.createElement('button');
            buttonNext.classList.add('input-next');
            buttonNext.innerText = '>';
            buttonNext.type = "button";
            buttonNext.addEventListener('click', function () {
                this.month++;
                if (this.month > 11) {
                    this.month = 0;
                    this.year++;
                }
                this.createCalendarTable();
                this.actualizeDateSelects();
            }.bind(this));
            this.divButtons.appendChild(buttonNext);
        };
    
        //metoda tworząca selekty do wybory miesiąca i lat
        this.createDateSelects = function () {
            const monthNames = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'];
    
            //selekt miesięcy
            this.selectMonth1 = document.createElement('span');
            this.selectMonth1.classList.add('hiden');
            this.selectMonth1.innerText = "null";
            this.divDateSelects.appendChild(this.selectMonth1);
            this.selectMonth = document.createElement('select');
            this.selectMonth.setAttribute("id", "select");
            for (let i=0; i<monthNames.length; i++) {
                const opt = document.createElement('option');
                opt.value = i;
                opt.text = monthNames[i];
                this.selectMonth.appendChild(opt);
            }
            this.selectMonth.addEventListener('change', function(e) {
                this.month = parseInt(e.target.options[e.target.selectedIndex].value, 10);
                this.createCalendarTable();
            }.bind(this));
            this.divDateSelects.appendChild(this.selectMonth);
    
            //selekt lat
            this.selectYear = document.createElement('select');
            this.selectYear.setAttribute("id", "select");
            for (let i=this.minYear; i<=this.maxYear; i++) {
                const opt = document.createElement('option');
                opt.value = i;
                opt.text = i;
                this.selectYear.appendChild(opt);
            }
            this.selectYear.addEventListener('change', function(e) {
                this.year = parseInt(e.target.options[e.target.selectedIndex].value, 10);
                this.createCalendarTable();
            }.bind(this));
            this.divDateSelects.appendChild(this.selectYear);
    
            this.actualizeDateSelects();
        };
    
        //aktualizuje dane w selektach do wyboru miesiaca i roku
        this.actualizeDateSelects = function() {
            this.selectMonth.selectedIndex = this.month;
    
            this.appendYearToYearSelect();
    
            for (let j=0; j<this.selectYear.options.length; j++) {
                if (parseInt(this.selectYear.options[j].value, 10) === parseInt(this.year, 10)) {
                    this.selectYear.selectedIndex = j;
                    break;
                }
            }
        };
    
        //dodaje nowe lata do selekta z wyborem lat
        //dzialanie podobne co w jquery ui:
        //https://jqueryui.com/datepicker/#dropdown-month-year
        this.appendYearToYearSelect = function() {
            if (this.year < this.minYear) {
                this.minYear -= this.options.yearStep;
                for (let i=this.year; i>=this.minYear; i--) {
                    const opt = document.createElement('option');
                    opt.value = i;
                    opt.text = i;
                    this.selectYear.insertBefore(opt, this.selectYear.options[0]);
                }
            }
            if (this.year > this.maxYear) {
                this.maxYear += this.options.yearStep;
                for (let i=this.year; i<=this.maxYear; i++) {
                    const opt = document.createElement('option');
                    opt.value = i;
                    opt.text = i;
                    this.selectYear.appendChild(opt);
                }
            }
        };
    
        //tworzy nowy przycisk "Dziś" w footerze kalendarza
        this.createTodayBtn = function() {
            const btn = document.createElement('button');
    
            btn.classList.add('calendar-button-today');
            btn.innerText = this.options.todayBtnText;
            this.divFooter.appendChild(btn);
    
            btn.addEventListener('click', function() {
                this.month = this.now.getMonth();
                this.year = this.now.getFullYear();
                this.actualizeDateSelects();
                this.createCalendarTable();
            }.bind(this));
        };
    
        //tworze tabele z kalendarzem
        this.createCalendarTable = function () {
            this.divTable.innerHTML = '';
    
            //tworzymy nazwy dni
            const tab = document.createElement('table');
            tab.classList.add('calendar-table');
    
            //tworzymy nagłówki dni
            let tr = document.createElement('tr');
            tr.classList.add('calendar-table-days-names');
            const days = ['Pon', 'Wto', 'Śro', 'Czw', 'Pią', 'Sob', 'Nie'];
            for (let i=0; i<days.length; i++) {
                const th = document.createElement('th');
                th.innerHTML = days[i];
                tr.appendChild(th);
            }
            tab.appendChild(tr);
    
            //tworzymy rzędy dni
            const daysInMonth = new Date(this.year, this.month+1, 0).getDate();
    
            const tempDate = new Date(this.year, this.month, 1);
            let firstMonthDay = tempDate.getDay();
    
            if (firstMonthDay === 0) {
                firstMonthDay = 7;
            }
    
            const j = daysInMonth + firstMonthDay - 1;
    
            if (firstMonthDay - 1 !== 0) {
                tr = document.createElement('tr');
                tab.appendChild(tr);
            }
    
            //tworzymy puste komórki przed dniami miesiąca
            for (let i=0; i < firstMonthDay - 1; i++) {
                const td = document.createElement('td');
                td.innerHTML = '';
                tr.appendChild(td);
            }
    
            //tworzymy komórki dni
            for (let i = firstMonthDay-1; i<j; i++) {
                if(i % 7 === 0){
                    tr = document.createElement('tr');
                    tab.appendChild(tr);
                }
    
                const td = document.createElement('td');
                td.innerText = i - firstMonthDay + 2;
                td.dayNr = i - firstMonthDay + 2;
                td.classList.add('day');
            
    
                if (this.options.markActualDay) {
                    if (this.year === this.now.getFullYear() && this.month === this.now.getMonth() && this.day === i - firstMonthDay + 2) {
                        td.classList.add('current-day')
                    }
                }
    
                tr.appendChild(td);
            }
    
            tab.appendChild(tr);
    
            this.divTable.appendChild(tab);
        };
    
        //podpinamy klik pod dni w tabeli kalendarza
        this.bindTableDaysEvent = function() {
            this.divTable.addEventListener('click', function(e) {
                if (e.target.tagName.toLowerCase() === 'td' && e.target.classList.contains('day')) {
                    const month2 = ((this.month + 1) < 10) ? "0" + (this.month + 1) : this.month + 1;
    
                    if (this.options.closeOnSelect) {
                        this.hide();
                    }
                    this.options.onDateSelect(e.target.dayNr, this.month + 1, this.year);
                }
            }.bind(this));
        };
    
        //ukrywa/pokazuje kalendarz
        this.toggleShow = function() {
            this.divCnt.classList.toggle('calendar-show');
        };
    
        //pokazuje kalendarz
        this.show = function() {
            this.divCnt.classList.add('calendar-show');
        };
    
        //ukrywa kalendarz
        this.hide = function() {
            this.divCnt.classList.remove('calendar-show');
        };
    
        //inicjuje obiekt
        this.init = function () {
            if (typeof this.input.calendarExist !== 'undefined') {
                throw (new Error('Próbujesz drugi raz dołączyć kalendarz do tego samego inputa'));
            }
    
            //dodajemy klasę calendar
            this.input.classList.add('input-calendar');
            this.input.type = 'text';
            this.input.calendarExist = true;
    
            //tworzymy div z całą zawartością
            this.divCnt = document.createElement('div');
            this.divCnt.classList.add('calendar');
    
            //tworzymy div z guzikami
            this.divButtons = document.createElement('div');
            this.divButtons.className = "calendar-prev-next";
            this.createPrevNextButtons();
    
            //tworzymy div z nazwą miesiąca
            this.divDateSelects = document.createElement('label');
            this.divDateSelects.setAttribute("for", "select");
            // this.divDateSelects.className = 'date-name';

            this.divDateSelects1 = document.createElement('div');
            this.divDateSelects1.className = 'date-name';
            this.divDateSelects1.appendChild(this.divDateSelects);
            
            this.createDateSelects();
    
            //tworzymy nagłówek kalendarza
            this.divHeader = document.createElement('div');
            this.divHeader.classList.add('calendar-header');
    
            this.divHeader.appendChild(this.divButtons);
            this.divHeader.appendChild(this.divDateSelects1);

            this.divCnt.appendChild(this.divHeader);
    
            //tworzymy div z tabelą.calendara
            this.divTable = document.createElement('div');
            this.divTable.className = 'calendar-table-cnt';
            this.divCnt.appendChild(this.divTable);
            this.createCalendarTable();
            this.bindTableDaysEvent();
    
            //tworzymy wrapper dla input
            
            this.calendarWrapper1 = document.createElement('span');
            this.calendarWrapper1.classList.add('hiden');
            this.calendarWrapper1.innerText = "null";
            this.calendarWrapper = document.createElement('label');
            this.calendarWrapper.appendChild(this.calendarWrapper1);
            this.input.parentElement.insertBefore(this.calendarWrapper, this.input);
            this.calendarWrapper.appendChild(this.input);
            document.getElementById('datep').append(this.divCnt);
            // this.calendarWrapper.appendChild(this.divCnt);

            //podpinamy zdarzenia do pokazywania/ukrywania kalendarza
            this.input.addEventListener('click', function() {
                this.toggleShow();
            }.bind(this));
    
            //nie chcemy by click z kalendarza szedł aż do dokumentu
            this.divCnt.addEventListener('click', function(e) {
                e.stopImmediatePropagation();
            });
            this.input.addEventListener('click', function(e) {
                e.stopImmediatePropagation();
            });
    
            //ukrywanie kalendarza po kliku poza obszar kalendarza
            document.addEventListener('click', function() {
                this.hide();
            }.bind(this));
        };
    }
    
    
    
    //użycie w praktyce
    // document.querySelector('#demo').addEventListener('click', function() {
    /*	function printDiv1() 
    {
    */
        this.disabled = true;
    
        const btn1 = document.querySelector('.dateInput');
        const cal1 = new Calendar(btn1, {
            closeOnSelect : true,
            todayBtnText : 'Today',
            onDateSelect : function(day, month, year) {
                const dayText = ((day) < 10) ? "0" + (day) : day;
                const monthText = (month < 10) ? "0" + month : month;
    
                btn1.value = dayText + '-' + monthText + '-' + year;
            }
        });
        cal1.init();
    
    //}
    // });