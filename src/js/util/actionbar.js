class DashboardHeader extends HTMLElement{

    constructor(){
        super();
    }

    connectedCallback(){

        this.innerHTML = `
        <div class="container">
            <button class="btn-menu">
                <span><span class="top"></span></span>
                <span><span class="bottom"></span></span>
            </button>
            <a style="background-image: url();" href="/member"></a>
        </div>`;

        let sidebar = document.querySelector('side-bar');
        let btnMenu = this.querySelector('.btn-menu');

        btnMenu.addEventListener('click', () => {
            $(sidebar).toggleClass('open');
        })
        
        // Close Sidebar when scroll
        $(window).scroll(() => {
            $(sidebar).removeClass('open');
        });

        var openedObserver = new MutationObserver((mutations) => {
            mutations.forEach((m) => {
                if(m.type === 'attributes' && m.attributeName == 'class'){
                    
                    if(sidebar.classList.contains('open'))
                        $(btnMenu).addClass('active');
                    else
                        $(btnMenu).removeClass('active');

                }
            })
        })
        openedObserver.observe(sidebar, { attributes: true });



    }

}
customElements.define('dashboard-header', DashboardHeader);

class Sidebar extends HTMLElement{

    constructor(){
        super();
    }

    connectedCallback(){
        
        this.innerHTML = `
            <div class="container">
                <a href="">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 84.91 28">
                        <path style="fill:#005fe8;" d="M27.3,11.69l-5.54-8.32c-.77-1.16-2.07-1.85-3.46-1.85H4.16C1.86,1.52,0,3.39,0,5.68v16.63C0,24.61,1.86,26.48,4.16,26.48h14.14c1.39,0,2.69-.69,3.46-1.85l5.54-8.32c.93-1.4.93-3.22,0-4.61Z"/>
                        <path style="fill:#fff;" d="M18.78,11.77v-.02c0-1.23-.26-2.3-.78-3.2-.52-.91-1.25-1.61-2.2-2.11-.95-.5-2.07-.75-3.37-.75h-7.43v16.63h4.89v-4.54h2.55c1.3,0,2.42-.24,3.37-.73.95-.49,1.68-1.18,2.2-2.08.52-.9.78-1.96.78-3.19ZM13.84,11.77c0,.79-.23,1.39-.69,1.79-.46.4-1.09.61-1.9.61h-1.38v-4.81h1.38c.81,0,1.44.2,1.9.59s.69.99.69,1.79v.02Z"/>
                        <path style="fill:#1d1d1d;stroke-width:0px;" d="M46.7,15.47c-3.26.58-7,.65-9.76.65l-.25-1.93,1.73-.02v-4.81h-1.3v-1.89h8.84v1.89h-1.31v4.57c.65-.05,1.28-.13,1.89-.2l.16,1.73ZM41.51,20.51h8.91v1.89h-11.29v-5.22h2.38v3.33ZM40.7,14.14c.56-.02,1.12-.04,1.67-.07v-4.7h-1.67v4.77ZM52.02,10.79v1.96h-2.2v5.56h-2.38V6.11h2.38v4.68h2.2Z"/>
                        <path style="fill:#1d1d1d;stroke-width:0px;" d="M60.48,15.06h-6.57v-7.49h6.57v7.49ZM56.05,16.77h11.42v5.94h-2.38v-4.07h-9.04v-1.87ZM58.29,9.39h-2.16v3.85h2.16v-3.85ZM67.47,6.11v9.89h-2.25v-3.96h-1.3v3.91h-2.21V6.42h2.21v3.71h1.3v-4.02h2.25Z"/>
                        <path style="fill:#1d1d1d;stroke-width:0px;" d="M84.91,18.75v1.93h-15.02v-1.93h15.02ZM83.38,15.9c-2.88-.58-5.01-2.18-6.07-4.29-1.06,2.11-3.17,3.73-6.05,4.29l-1.01-1.98c3.73-.65,5.8-3.28,5.8-5.65v-1.19h2.54v1.19c0,2.43,2.05,5.01,5.8,5.65l-1.01,1.98Z"/>
                    </svg>
                </a>
                <div class="main">
                    <a class="btn-router" href="">메인 페이지</a>
                </div>

                <div class="chest">
                    <section>
                        <button class="btn-router">상품관리</button>
                        <a class="btn-router" href="">판매 내역</a>
                        <a class="btn-router" href="">무슨 내역</a>
                        <a class="btn-router" href="">둥가 내역</a>
                        <a class="btn-router" href="">붕가 내역</a>
                        <a class="btn-router" href="">딩다 내역</a>
                    </section>
                </div>

                <div class="chest">
                    <section>
                        <button class="btn-router">주문관리</button>
                        <a class="btn-router" href="">판매 내역</a>
                        <a class="btn-router" href="">무슨 내역</a>
                        <a class="btn-router" href="">둥가 내역</a>
                        <a class="btn-router" href="">붕가 내역</a>
                        <a class="btn-router" href="">딩다 내역</a>
                    </section>
                </div>

                <div class="chest">
                    <section>
                        <button class="btn-router">문의관리</button>
                        <a class="btn-router" href="">판매 내역</a>
                        <a class="btn-router" href="">무슨 내역</a>
                        <a class="btn-router" href="">둥가 내역</a>
                        <a class="btn-router" href="">붕가 내역</a>
                        <a class="btn-router" href="">딩다 내역</a>
                    </section>
                </div>

                <div class="chest">
                    <section>
                        <button class="btn-router">통계</button>
                        <a class="btn-router" href="/html/analytics/sales.html">판매 내역</a>
                        <a class="btn-router" href="">무슨 내역</a>
                        <a class="btn-router" href="">둥가 내역</a>
                        <a class="btn-router" href="">붕가 내역</a>
                        <a class="btn-router" href="">딩다 내역</a>
                    </section>
                </div>

                <div class="chest">
                    <section>
                        <button class="btn-router">설정</button>
                        <a class="btn-router" href="">판매 내역</a>
                        <a class="btn-router" href="">무슨 내역</a>
                        <a class="btn-router" href="">둥가 내역</a>
                        <a class="btn-router" href="">붕가 내역</a>
                        <a class="btn-router" href="">딩다 내역</a>
                    </section>
                </div>
            </div>
        `;

        var chestOpen = (e) =>{

            $(e).addClass('open');
            $(e).css('height', `${e.querySelector('section').offsetHeight}px`);
            setTimeout(() => {
                $(e).css('height', 'auto');
            }, 400);

        }

        var chestClose = (e) => {

            $(e).removeClass('open');
            $(e).css('height', `${e.querySelector('section').offsetHeight}px`);
            setTimeout(() => { $(e).css('height', '') }, 0);

        }

        // chest open
        this.querySelectorAll('div.chest').forEach((chest) => {

            chest.querySelector('button')
            .addEventListener('click', (e) => {

                let opened = chest.classList.contains('open');

                if(!opened){

                    let prevOpened = this.querySelector('div.chest.open');
                    if(prevOpened) chestClose(prevOpened);

                    chestOpen(chest);

                }else{

                    chestClose(chest);

                }

            })

        })

        // 현재 페이지의 버튼을 활성화. '메인'의 경우 chestOpen 제외
        let currentPageBtn = this.querySelector(`a[href="${window.location.pathname}"]`);
        if($(currentPageBtn.parentNode.parentNode).is('.chest'))
            chestOpen(currentPageBtn.parentNode.parentNode);
        $(currentPageBtn).addClass('active');
        

        // close sidebar when table or mobile
        $(this).before().click((e) => {
            if(!this.querySelector('div.container').contains(e.target))
                $(this).removeClass('open');
        });

    }

}
customElements.define('side-bar', Sidebar);