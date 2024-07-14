const faceIcon = {
    'document/check': `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100.24 124">
        <path d="M2331,455.43a12.37,12.37,0,0,0-1.41-4.14,20.25,20.25,0,0,0-3.12-4l-28.33-28.85a18.11,18.11,0,0,0-3.81-3.06,12.56,12.56,0,0,0-4-1.44,30.09,30.09,0,0,0-5.06-.38h-24.43q-8,0-12,4.06t-4,12.09v56.9a30.11,30.11,0,0,1,8.28-1.16V429.87a8.13,8.13,0,0,1,2-5.91c1.35-1.41,3.37-2.11,6-2.11h22.89v29.88q0,4.83,2.41,7.25c1.62,1.61,4,2.41,7.26,2.41h29.31v46.19a8.07,8.07,0,0,1-2,5.91c-1.36,1.37-3.37,2.06-6,2.06h-31.77a29.79,29.79,0,0,1-1.17,8.28h33.36q8,0,12-4t4-12.06V461A36.61,36.61,0,0,0,2331,455.43Zm-36.31-1.8a2.9,2.9,0,0,1-2.18-.67,3.1,3.1,0,0,1-.65-2.21V423.44l29.63,30.19Z" transform="translate(-2231.15 -413.57)"/>
        <path d="M2307.06,481.91a3,3,0,0,0,2.24-.92,3.12,3.12,0,0,0,.9-2.26,3.08,3.08,0,0,0-3.14-3.14h-39a3.16,3.16,0,0,0-2.31.9,3,3,0,0,0-.93,2.24,3.16,3.16,0,0,0,3.24,3.18Z" transform="translate(-2231.15 -413.57)"/>
        <path d="M2309.3,499a3,3,0,0,0,.9-2.18,3.2,3.2,0,0,0-.9-2.32,3,3,0,0,0-2.24-.92h-33.39a30,30,0,0,1,5.18,6.32h28.21A3,3,0,0,0,2309.3,499Z" transform="translate(-2231.15 -413.57)"/>
        <path d="M2253.17,493.53a22,22,0,1,0,22,22A22,22,0,0,0,2253.17,493.53Zm11.77,16.28-14.36,14.35a2,2,0,0,1-2.87,0l-6.32-6.31a2,2,0,0,1,0-2.88h0a2,2,0,0,1,2.88,0l4.88,4.89,12.92-12.93a2,2,0,0,1,2.87,2.88Z" transform="translate(-2231.15 -413.57)"/>
    </svg>`,

    'circle/error': `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 110.26 110.26">
        <path d="M2915.37,519.5A56.57,56.57,0,0,1,2885.84,490a54.41,54.41,0,0,1,0-42.54,56.58,56.58,0,0,1,29.48-29.54,54.57,54.57,0,0,1,42.56,0,56.61,56.61,0,0,1,29.57,29.54,54.52,54.52,0,0,1,0,42.54,56.63,56.63,0,0,1-29.54,29.53,54.41,54.41,0,0,1-42.54,0Zm39.19-8.43a46,46,0,0,0,24.49-24.48,45.4,45.4,0,0,0,3.54-17.89,44.9,44.9,0,0,0-3.57-17.89,46.49,46.49,0,0,0-9.89-14.65,45.91,45.91,0,0,0-14.65-9.86,45.86,45.86,0,0,0-50.38,9.86,46.23,46.23,0,0,0-9.8,14.65,46.85,46.85,0,0,0,0,35.78,45.64,45.64,0,0,0,9.83,14.62,46.21,46.21,0,0,0,14.62,9.86,46.69,46.69,0,0,0,35.81,0Zm-39.46-20.81a4.27,4.27,0,0,1-1.27-3.08,4,4,0,0,1,1.3-3l15.35-15.41-15.35-15.4a4.06,4.06,0,0,1-1.3-3,4.11,4.11,0,0,1,1.27-3,4.26,4.26,0,0,1,3.06-1.24,3.94,3.94,0,0,1,3,1.3l15.4,15.35,15.57-15.41a4,4,0,0,1,3-1.35,4.34,4.34,0,0,1,4.32,4.33,4.14,4.14,0,0,1-1.29,3l-15.41,15.46,15.35,15.35a4.2,4.2,0,0,1,1.3,3.08,4.27,4.27,0,0,1-1.27,3.08,4.22,4.22,0,0,1-6.14-.05l-15.4-15.35-15.3,15.35a4.07,4.07,0,0,1-3.13,1.35A4.12,4.12,0,0,1,2915.1,490.26Z" transform="translate(-2881.51 -413.57)"/>
    </svg>`
}

class AlertPopUp extends HTMLElement{
    
    constructor(){
        super();
    }

    connectedCallback(){

        let face = this.getAttribute('face');
        let head = this.getAttribute('head');
        let copy = this.getAttribute('copy');


        this.innerHTML = `
            ${faceIcon[face]}
            <h4>${head}</h4>
            <p>${copy}</p>
        `;

        this.addEventListener('click', (e) => {
            closeAlertPopup();
        })
        
        setTimeout(() => {
            $(this).addClass('active');
        }, 10);

    }

}
customElements.define('alert-popup', AlertPopUp);

let alertPopupTimeout;
var openAlertPopup = (color, face, head, copy, speed) => {

    let interval = 0;

    speed = speed ? speed : '4000';

    if(document.querySelector('alert-popup')){
        closeAlertPopup();
        interval = 400;
    }

    setTimeout(() => {
        let target = document.querySelector('body').childNodes[0];
        $(`<alert-popup class="${color}" face="${face}" head="${head}" copy="${copy}"></alert-popup>`).insertAfter(target);

        clearTimeout(alertPopupTimeout);
        alertPopupTimeout = setTimeout(() => {
            closeAlertPopup();
        }, speed);
    }, interval);

};
var closeAlertPopup = () => {

    let target = document.querySelector('alert-popup');

    $(target).removeClass('active');
    setTimeout(() => {
        $(target).remove();
    }, 400);

};