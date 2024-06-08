class periodViewport extends HTMLElement{

    constructor(){
        super();
    }

    connectedCallback(){

        let today = new Date();
        let weekLater = new Date(today.getTime() + 1000 * 60 * 60 * 24 * 7);

        var formatValue = (date) => {

            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();

            if(month < 10) month = `0${month}`;
            if(day < 10) day = `0${day}`;
            return `${year}${month}${day}`;

        }

        this.innerHTML = `
        <button class="indicator">
            ${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일 ~ ${weekLater.getFullYear()}년 ${weekLater.getMonth() + 1}월 ${weekLater.getDate()}일
        </button>
        <period-selector name="period" selected="${formatValue(today)},${formatValue(weekLater)}"></period-selector>`

        this.setAttribute('selected',  `${formatValue(today)},${formatValue(weekLater)}`);

        this.querySelector('button.indicator').addEventListener('click', () => {

            this.style.overflow = 'visible';

        })


    }

}
customElements.define('period-viewport', periodViewport);


class periodSelector extends HTMLElement{

    constructor(){
        super();
    }

    connectedCallback(){


        let viewedMonth, viewedYear;
        let name = this.getAttribute('name');
        let today = new Date();
        let weekAgo = new Date(today.getTime() - 1000 * 60 * 60 * 24 * 7);
        let twoWeeksAgo = new Date(today.getTime() - 1000 * 60 * 60 * 24 * 14);
        let daysOfMonth = [31, new Date(today.getFullYear(), 2, 0).getDate(), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        this.innerHTML = `
            <div class="content">
                <div class="shortcut">
                    <button>어제</button>
                    <button>지난 7일</button>
                    <button>지난 14일</button>
                    <button>지난 주</button>
                    <button>지난 달</button>
                    <button>이번 주</button>
                    <button>이번 달</button>
                </div>

                <div class="calendars">
                    <div class="nav-buttons">
                        <div>
                            <button class="prevYear"></button>
                            <button class="prevMonth"></button>
                        </div>
                        <div>
                            <button class="nextMonth"></button>
                            <button class="nextYear"></button>
                        </div>
                    </div>

                    <div class="calendar">
                        <div class="title"></div>
                        <div class="head">
                            <p>일</p><p>월</p><p>화</p><p>수</p><p>목</p><p>금</p><p>토</p>
                        </div>
                        <div class="action"></div>
                    </div>

                    <div class="calendar">
                        <div class="title"></div>
                        <div class="head">
                            <p>일</p><p>월</p><p>화</p><p>수</p><p>목</p><p>금</p><p>토</p>
                        </div>
                        <div class="action"></div>
                    </div>

                </div>
            </div>
            <div class="footer">
                <button class="action apply">적용</button>
                <button class="action cancel">취소</button>
            </div>`;


        // 어제
        this.querySelectorAll('div.shortcut button')[0].addEventListener('click', () => {

            let selected = [
                formatValue(today.getFullYear(), (today.getMonth()+1).toString(), (today.getDate()-1).toString()),
                formatValue(today.getFullYear(), (today.getMonth()+1).toString(), (today.getDate()).toString()),
            ];
            
            setBySelected(selected);

        });
        // 지난 7일
        this.querySelectorAll('div.shortcut button')[1].addEventListener('click', () => {
            let selected = [
                formatValue(today.getFullYear(), (today.getMonth()+1).toString(), (today.getDate()-1).toString()),
                formatValue(weekAgo.getFullYear(), (weekAgo.getMonth()+1).toString(), (weekAgo.getDate()).toString()),
            ];

            setBySelected(selected);

        });
        // 지난 14일
        this.querySelectorAll('div.shortcut button')[2].addEventListener('click', () => {

            let selected = [
                formatValue(today.getFullYear(), (today.getMonth()+1).toString(), (today.getDate()-1).toString()),
                formatValue(twoWeeksAgo.getFullYear(), (twoWeeksAgo.getMonth()+1).toString(), (twoWeeksAgo.getDate()).toString()),
            ];

            setBySelected(selected);

        });
        // 지난 주
        this.querySelectorAll('div.shortcut button')[3].addEventListener('click', () => {
            
            let temp = today.getDay(); 
            let lastMon = new Date(today.getTime() - 1000 * 60 * 60 * 24 * (6+temp));
            let lastSun =  new Date(lastMon.getTime() + 1000 * 60 * 60 * 24 * 6);

            let selected = [
                formatValue(lastMon.getFullYear(), (lastMon.getMonth()+1).toString(), (lastMon.getDate()).toString()),
                formatValue(lastSun.getFullYear(), (lastSun.getMonth()+1).toString(), (lastSun.getDate()).toString()),
            ];

            setBySelected(selected);

        });
        // 지난 달
        this.querySelectorAll('div.shortcut button')[4].addEventListener('click', () => {

            let selected;

            if(today.getMonth() == 0){

                selected = [
                    formatValue(today.getFullYear() - 1, '11', '1'),
                    formatValue(today.getFullYear() - 1, '11', '31'),
                ]

            }else{

                selected = [
                    formatValue(today.getFullYear(), (today.getMonth()).toString(), '1'),
                    formatValue(today.getFullYear(), (today.getMonth()).toString(), daysOfMonth[today.getMonth()-1]),
                ]

            }

            setBySelected(selected);

        });
        // 이번 주
        this.querySelectorAll('div.shortcut button')[5].addEventListener('click', () => {

            let selected;
            let thisMon = new Date(today.getTime() - 1000 * 60 * 60 * 24 * (today.getDay()-1));

            if(thisMon.getDate() == today.getDate()){
                selected = [
                    formatValue(today.getFullYear(), (today.getMonth()+1).toString(), (today.getDate()-1).toString()),
                    formatValue(today.getFullYear(), (today.getMonth()+1).toString(), (today.getDate()).toString()),
                ]
            }else{
                selected = [
                    formatValue(thisMon.getFullYear(), (thisMon.getMonth()+1).toString(), (thisMon.getDate()).toString()),
                    formatValue(today.getFullYear(), (today.getMonth()+1).toString(), (today.getDate()).toString()),
                ]

            }

            setBySelected(selected);

        });
        // 이번 달
        this.querySelectorAll('div.shortcut button')[6].addEventListener('click', () => {

            let selected = [
                formatValue(today.getFullYear(), (today.getMonth()+1).toString(), '1'),
                formatValue(today.getFullYear(), (today.getMonth()+1).toString(), daysOfMonth[today.getMonth()]),
            ]

            setBySelected(selected);

        });


        this.querySelectorAll('.nav-buttons button')[0].addEventListener('click', () => { previousYear(); });
        this.querySelectorAll('.nav-buttons button')[1].addEventListener('click', () => { previousMonth(); });
        this.querySelectorAll('.nav-buttons button')[2].addEventListener('click', () => { nextMonth(); });
        this.querySelectorAll('.nav-buttons button')[3].addEventListener('click', () => { nextYear(); });

        // apply button
        this.querySelectorAll('div.footer button.action')[0].addEventListener('click', () => {

            let selected = this.getAttribute('selected') ? this.getAttribute('selected').split(',') : [];
            if(selected.length < 2){
                alert('날짜를 모두 선택해주세요.');
                return 0;
            }

            var YYYYMMDDToString = (YYYYMMDD) => {
                let year = YYYYMMDD.substring(0, 4);
                
                let month = YYYYMMDD.substring(4, 6);
                if(month.substring(0,1) == 0) month = month.substring(1,2);
                
                let day = YYYYMMDD.substring(6, 8);
                if(day.substring(0,1) == 0) day = day.substring(1,2);
            
                return `${year}년 ${month}월 ${day}일`;
            
            }

            document.querySelector('period-viewport button.indicator').innerHTML = `${YYYYMMDDToString(selected[0])} ~ ${YYYYMMDDToString(selected[1])}`;
            document.querySelector('period-viewport')
            .setAttribute('selected', selected);
            document.querySelector('period-viewport')
            .style.overflow = 'hidden';

        });

        // cancel button
        this.querySelectorAll('div.footer button.action')[1].addEventListener('click', () => {


            let genesis = document.querySelector('period-viewport').getAttribute('selected').split(',');
            let year = genesis[0].substring(0, 4);
            let month = genesis[0].substring(4, 6);
            if(month.substring(0,1) == 0) month = month.substring(1,2);
            setBySelected(genesis);

            document.querySelector('period-viewport')
            .style.overflow = 'hidden';

        });
        

        var generateCalendar = (year, month) => {

            if(month === undefined) month = today.getMonth();
            if(year === undefined) year = today.getFullYear();

            for(let i = 0; i < 2; i++){

                let tempMonth = month + i;
                let tempYear = year;
                tempYear = tempMonth == 12 ? tempYear + 1 : tempYear;
                tempMonth = tempMonth == 12 ? 0 : tempMonth;

                let calendar = this.querySelectorAll('div.calendar')[i];

                calendar.querySelector('div.title').innerHTML = `<p>${tempYear}.${tempMonth+1 < 10 ? `0${tempMonth+1}` : tempMonth+1 }</p>`;

                let firstDay = new Date(tempYear, tempMonth, 1).getDay();
                let actionCells = '';
                for(let j = 0; j < firstDay; j++){
                    actionCells += `<div></div>`;
                    // actionCells += `<div>
                    //     <label>
                    //         <span class="period-selector-span">
                    //             ${daysOfMonth[month == 0 ? 0 : month-1] - firstDay + 2 + j}
                    //         </span>
                    //     </label>
                    // </div>`;
                }
    
                for(let j = 1; j <= daysOfMonth[tempMonth];j++){
                    let value = formatValue(tempYear, (tempMonth+1).toString(), (j).toString());
                    actionCells += `
                    <div>
                        <label for="j${value}">
                            <input id="j${value}" type="checkbox" name="${name}" value="${value}">
                            <span class="period-selector-span">${j}</span>
                        </label>
                    </div>`;
                }
    
                calendar.querySelector('div.action').innerHTML = actionCells;
    
                calendar.querySelectorAll(`input[name=${name}]`).forEach((i) => {
                    i.addEventListener('input', (e) => { inputAction(e); })
                })

            }

            viewedMonth = month;
            viewedYear = year;
    
            inputAction('generateCalendar');
            fillSelected();

        }


        var setBySelected = (selected) => {

            this.setAttribute('selected', '');
            setTimeout(() => {

                this.setAttribute('selected', selected);
                generateCalendar(Number(selected[0].substring(0, 4)),
                Number(selected[0].substring(4, 6))-1);

            }, 0);

        }

        var previousYear = () => {

            generateCalendar(viewedYear - 1, viewedMonth);

        }
        var nextYear = () => {

            generateCalendar(viewedYear + 1, viewedMonth);

        }


        var previousMonth = () => {

            if(viewedMonth == 0){
                generateCalendar(viewedYear - 1, 11);
            }else{
                generateCalendar(viewedYear, viewedMonth - 1);
            }

        }
        var nextMonth = () => {

            if(viewedMonth == 11){
                generateCalendar(viewedYear + 1, 0);
            }else{
                generateCalendar(viewedYear, viewedMonth + 1)
            }

        }


        var formatValue = (year, month, day) => {

            if(month.length == 1) month = `0${month}`;
            if(day.length == 1) day = `0${day}`;
            return `${year}${month}${day}`;

        }


        var inputAction = (from) => {

            let selected = this.getAttribute('selected') ? this.getAttribute('selected').split(',') : [];
            if(selected.length == 2 && from !== 'generateCalendar'){
                for(let i = 0; i < selected.length; i++){
                    let target = this.querySelector(`input[id=j${selected[i]}]`);
                    if(!target) continue;
                    target.checked = false;
                }
                selected = [];
            }

            for(let i = 0; i < selected.length; i++){
                let target = this.querySelector(`input[id=j${selected[i]}]`);
                if(!target) continue;
                target.checked = true;
            }

            let checked = this.querySelectorAll(`input[name=${name}]:checked`);
            for(let i = 0; i < checked.length; i++){
                if(!selected.includes(checked[i].value)){
                    selected.push(checked[i].value);
                }
            }
            
            selected.sort();
            this.setAttribute('selected', selected);

        }

        var fillSelected = () => {
            let selected = this.getAttribute('selected') ? this.getAttribute('selected').split(',') : [];

            if(selected.length == 2){

                this.querySelectorAll('div.action')
                .forEach((action) => {

                    action.querySelectorAll('div').forEach((div) => {

                        let input = div.querySelector('input');
                        if(input){
                            input.checked = false;
                            let addingClass = '';
                            if(input.value > selected[0] && input.value < selected[1]){
                                addingClass = 'checked'
                            }else if(input.value == selected[0]){
                                input.checked = true;
                                addingClass = 'checked start';
                            }else if(input.value == selected[1]){
                                input.checked = true;
                                addingClass = 'checked end';
                            }
        
                            $(div).addClass(addingClass);
                        }
    
                    })

                })

            }else{
                this.querySelectorAll('div.checked').forEach((e) => {
                    e.classList = '';
                })
            }
        }

        var selectedObserver = new MutationObserver((mutations) => {
            mutations.forEach((m) => {
                if(m.type === 'attributes' && m.attributeName == 'selected'){
                    fillSelected();
                }
            });
        });
        selectedObserver.observe(this, { attributes: true });

        generateCalendar();

    }


}
customElements.define('period-selector', periodSelector);


// 기간 변경 적용 후 트리거
var periodChangeObserver = new MutationObserver((mutations) => {
    mutations.forEach((m) => {
        if(m.type === 'attributes' && m.attributeName == 'selected'){
            
            let selected = document.querySelector('period-viewport')
            .getAttribute('selected').split(',');

            console.log(selected)


        }
    });
});
periodChangeObserver.observe(document.querySelector('period-viewport'), { attributes: true });


var init = () => {

    // 데이터만 채우는 거임. 그래서, <a> 태그 쓰고 싶으면 테이블에 넣기 전에 미리 만들어줘야 됨.
    // 쉼표나 원화도 미리 변형 시켜줘야됨.
    var dummyData = [
        {
            orderNumber: `<a class="text-orderNumber panmax" href="">245168904</a>`,
            productCode: '둥가둥가3270',
            productName: '비트코인 대폭락 카펫',
            productCost: 19000,
            productSell: 299000,
            sellAmt: 32790,
            sellDate: '2024-05-03'
        },
        {
            orderNumber: `<a class="text-orderNumber naver" href="">245168904</a>`,
            productCode: '둥가둥가3270',
            productName: '비트코인 대폭락 카펫',
            productCost: 19000,
            productSell: 299000,
            sellAmt: 90,
            sellDate: '2024-05-22'
        },
        {
            orderNumber: `<a class="text-orderNumber coupang" href="">245168904</a>`,
            productCode: '둥가둥가3270',
            productName: '비트코인 대폭락 카펫',
            productCost: 19000,
            productSell: 299000,
            sellAmt: 90,
            sellDate: '2024-05-22'
        }
    ]



    for(let i = 0; i < 120; i++){
        dummyData.push(dummyData[i%3]);
    }

    document.querySelector('panmax-table')
    .setAttribute('datas', JSON.stringify(dummyData));


}


init();