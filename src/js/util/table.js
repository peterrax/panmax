class panmaxTable extends HTMLElement{

    constructor(){
        super();
    }

    connectedCallback(){
        
        let options = this.querySelectorAll('option');
        let dataLength = 0;

        this.innerHTML = `
        <div class="head">
            <div class="cell">
                ${Object.keys(options).map((key) => {
                    let option = options[key];
                    return `<div class="list ${option.getAttribute('size')}">${option.getAttribute('tag')}</div>`;
                }).join('')}
            </div>
        </div>
        <div class="body"></div>
        <div class="footer">
            <div class="pagination">
                <table-paginator></table-paginator>
                <button class="btn-pagination prev"></button>
                <input name="page" class="input-pagination" type="number" value="1" disabled>
                <button class="btn-pagination next"></button>
            </div>
        </div>`;

        var generateBody = () => {

            console.log('generate!')

            let datas = JSON.parse(this.getAttribute('datas'));
            if(!datas) return 0;

            dataLength = datas.length;
            this.removeAttribute('datas');

            this.querySelector('div.body').innerHTML =
            datas.map((data) => {

                return `
                <div class="cell">
                    ${
                        Object.keys(options).map((key) => {
                            let dataKey = options[key].getAttribute('variable');
                            let size = options[key].getAttribute('size');
                            let tooltip = options[key].getAttribute('tooltip') ? true : false;

                            return `<div class="list ${size} ${tooltip ? 'tooltip' : ''}"
                            ${tooltip ? `content="${data[dataKey]}"` : ''}>
                                <div>
                                    ${data[dataKey]}
                                </div>
                            </div>`;

                        }).join('')
                    }
                </div>`;
                
            }).join('');

        }

        var dataObserver = new MutationObserver((mutations) => {
            mutations.forEach((m) => {
                console.log(m)
                if(m.type === 'attributes' && m.attributeName == 'datas'){
                    generateBody();
                }
            });
        });
        dataObserver.observe(this, { attributes: true });

        setTimeout(() => {
            
            this.querySelectorAll('input[name=max-table-pagination]')
            .forEach((input) => {
                input.addEventListener('change', (e) => {
                    
                    this.querySelector('input[name=page]').value = 1;
                    this.dispatchEvent(new Event('update'));
    
                })
            })

        }, 0);

        document.querySelector('button.btn-pagination.prev').addEventListener('click', () => {

            if(this.querySelector('input[name=page]').value == 1) return 0;

            this.querySelector('input[name=page]').value--;
            this.dispatchEvent(new Event('update'));

        });

        document.querySelector('button.btn-pagination.next').addEventListener('click', () => {

            let max = this.querySelector('input[name=max-table-pagination]') ? 
            Number(this.querySelector('input[name=max-table-pagination]:checked').value) : 50;

            if(dataLength < max) return 0;

            this.querySelector('input[name=page]').value++;
            this.dispatchEvent(new Event('update'));

        });

        generateBody();

    }

}
customElements.define('panmax-table', panmaxTable);

class tablePaginator extends HTMLElement{
    
    constructor(){
        super();
    }

    connectedCallback(){

        let options = [
            {
                name: 'max-options-50',
                value: 50
            },
            {
                name: 'max-options-100',
                value: 100
            },
            {
                name: 'max-options-250',
                value: 250
            }
        ]
        
        this.innerHTML = `
        <p>
            페이지당 행 수: <span>${options[0].value}</span>
        </p>
        <div class="options">
            <div class="container">
                ${

                    options.map((option, index) => {

                        return `
                        <div class="node">
                            <input id="${option.name}" type="radio" name="max-table-pagination" value="${option.value}" ${index == 0 ? 'checked' : ''}>
                            <label for="${option.name}">${option.value}</label>
                        </div>`

                    }).join('')

                }
            </div>
        </div>`;

        this.querySelector('p').addEventListener('click', (e) => {
            openDropDown(e);
        })

        this.querySelector('div.options').addEventListener('click', (e) => {
            updateDropDown(e);
        })

        var openDropDown = (e) => {
        
            clearTimeout(closeDropDownTimeout);
            
            let selectOptions = this.querySelector('div.options');
            let containerOptions = selectOptions.querySelector('div.container');
        
            let height = containerOptions.offsetHeight;
            let width = containerOptions.offsetWidth;
        
            $(selectOptions).css('height', `${height}px`);
            $(selectOptions).css('width', `${width}px`);
        
        };
        
        let closeDropDownTimeout;
        var closeDropDown = () => {
            
            $(this.querySelector('div.options')).css('height', '0px');
            closeDropDownTimeout = setTimeout(() => {
                $(this.querySelector('div.options')).css('height', '');
                $(this.querySelector('div.options')).css('width', '');
            }, 400);
        
        };
        
        
        var updateDropDown = (e) => {

            let target = e.target;
            let label = target.parentNode.querySelector('label');
            let string = label.innerHTML;
        
            let span = this.querySelector('p span');
            span.innerHTML = string;
        
            closeDropDown();
        
        };

        document.querySelector('body').addEventListener('click', (e) => {
            const target = e.target;
            if(!$(target).is(this.querySelector('p'))
            && !$(target).is(this.querySelector('div.container'))
            && !$(target).is(this.querySelector('input[type=radio]'))){
                closeDropDown();
            }
        }, true);

    }

}
customElements.define('table-paginator', tablePaginator);