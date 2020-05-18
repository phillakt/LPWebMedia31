const validator = require('validator');
const axios = require('axios');

// Footer form

const fCheckboxLabel = document.querySelectorAll('.f-checkbox-label');
const btnFooter = document.querySelector('#btn-footer');

fCheckboxLabel.forEach((item, i) => {
    item.addEventListener('change', function () {
        !this.childNodes[2].classList[3] ? this.childNodes[2].classList.add('f-checkbox__view_on') : this.childNodes[2].classList.remove('f-checkbox__view_on');
    });
});

function validateNodeError(param, type) {

    //  Удаляем лишний error element при нескольких запросах
    let node = document.querySelector("input[name=" + param + "]");
    if (node.nextElementSibling) {
        node.parentElement.removeChild(node.nextElementSibling);
    }
    let nodeError = document.createElement('span');
    if (!type) {
        // for inputs footer
        nodeError.classList.add('f-error-input');
    } else {
        // for inputs modal
        nodeError.classList.add('m-error-input');
    }

    nodeError.innerHTML = 'Введите корректные данные *';
    node.parentElement.append(nodeError);
}

function validateNodeErrorRemove(param) {
    let node = document.querySelector("input[name=" + param + "]");
    if (node.nextElementSibling) {
        node.parentElement.removeChild(node.nextElementSibling);
    }
}

// Footer validate fields

btnFooter.addEventListener('click', function (e) {
    e.preventDefault();

    let name = validator.isLength(document.querySelector("input[name=f-name]").value, { min: 2, max: 100 });
    !name ? validateNodeError('f-name') : validateNodeErrorRemove('f-name');

    let phone = validator.isMobilePhone(document.querySelector("input[name=f-phone]").value, ['ru-RU']);
    !phone ? validateNodeError('f-phone') : validateNodeErrorRemove('f-phone');

    let mail = validator.isEmail(document.querySelector("input[name=f-mail]").value);
    !mail ? validateNodeError('f-mail') : validateNodeErrorRemove('f-mail');

    let company = validator.isLength(document.querySelector("input[name=f-company]").value, { min: 3, max: 100 });
    !company ? validateNodeError('f-company') : validateNodeErrorRemove('f-company');

    let bussines = validator.isLength(document.querySelector("input[name=f-bussines]").value, { min: 3, max: 100 });
    !bussines ? validateNodeError('f-bussines') : validateNodeErrorRemove('f-bussines');

    let work = validator.isLength(document.querySelector("input[name=f-work]").value, { min: 1, max: 100 });
    !work ? validateNodeError('f-work') : validateNodeErrorRemove('f-work');

    if (name && phone && mail && company && bussines && work) {

        let user = {
            name: document.querySelector("input[name=f-name]").value,
            phone: document.querySelector("input[name=f-phone]").value,
            mail: document.querySelector("input[name=f-mail]").value,
            company: document.querySelector("input[name=f-company]").value,
            bussines: document.querySelector("input[name=f-bussines]").value,
            work: document.querySelector("input[name=f-work]").value,
            options: []
        };

        let fCheckboxHidden = document.querySelectorAll(".f-checkbox__hidden");

        fCheckboxHidden.forEach(function (item, i) {

            if (item.checked) {
                user.options.push(item.value);
            }
        });

        axios({
            method: 'post',
            url: 'http://start.webmedia31.ru/',
            data: 'data=' + JSON.stringify(user),
        })
            .then(function (response) {
                if (response.status === 200) {
                    //  Чистим поля
                    const fInputs = document.querySelectorAll('.f-input');
                    fInputs.forEach(function (item, i) {
                        item.value = '';
                    })

                    //  Чистим чекбоксы
                    const fCheckboxView = document.querySelectorAll('.f-checkbox__view');
                    fCheckboxView.forEach(function (item, i) {
                        item.classList.remove('f-checkbox__view_on');
                    })

                    // Modal Callback
                    modalCallback();
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }

});

// Footer validate fields

// Modal form
const mCheckboxLabel = document.querySelector('.m-checkbox-label');
const btnModal = document.querySelector('#btn-modal');

mCheckboxLabel.addEventListener('click', function (e) {
    e.preventDefault();

    if (!this.childNodes[2].classList[3]) {
        this.childNodes[2].classList.add('m-checkbox__view_on');
        btnModal.classList.remove('button-disabled');
        btnModal.disabled = false;
    } else {
        this.childNodes[2].classList.remove('m-checkbox__view_on');
        btnModal.classList.add('button-disabled');
        btnModal.disabled = true;
    }
});


btnModal.addEventListener('click', function (e) {
    e.preventDefault();

    let name = validator.isLength(document.querySelector("input[name=m-name]").value, { min: 2, max: 100 });
    !name ? validateNodeError('m-name', 'modal') : validateNodeErrorRemove('m-name', 'modal');

    let phone = validator.isMobilePhone(document.querySelector("input[name=m-phone]").value, ['ru-RU']);
    !phone ? validateNodeError('m-phone', 'modal') : validateNodeErrorRemove('m-phone', 'modal');

    let mail = validator.isEmail(document.querySelector("input[name=m-mail]").value);
    !mail ? validateNodeError('m-mail', 'modal') : validateNodeErrorRemove('m-mail', 'modal');

    let comment = validator.isLength(document.querySelector("input[name=m-comment]").value, { min: 3, max: 100 });
    !comment ? validateNodeError('m-comment', 'modal') : validateNodeErrorRemove('m-comment', 'modal');

    if (name && phone && mail && comment) {

        let user = {
            name: document.querySelector("input[name=m-name]").value,
            phone: document.querySelector("input[name=m-phone]").value,
            mail: document.querySelector("input[name=m-mail]").value,
            comment: document.querySelector("input[name=m-comment]").value,
        };

        axios({
            method: 'post',
            url: 'http://start.webmedia31.ru/',
            data: 'data=' + JSON.stringify(user),
        })
            .then(function (response) {
                if (response.status === 200) {
                    //  Чистим поля
                    const fInputs = document.querySelectorAll('.m-input');
                    fInputs.forEach(function (item, i) {
                        item.value = '';
                    });

                    mFormModal.classList.remove('m-form-modal__view_on');
                    document.body.style = 'overflow: inherit';

                    // Modal Callback
                    modalCallback();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

});


const mFormModal = document.querySelector('#m-form-modal__form.m-form-modal');
const mFormModalWrapp = document.querySelector('#m-form-modal__form .m-form-modal-wrapp');
const mFormModalClose = document.querySelector('#m-form-modal__form .m-form-modal-close');
const btnShowModal = document.querySelectorAll('.show-modal');

btnShowModal.forEach((item, i) => {

    item.addEventListener('click', function (e) {
        e.preventDefault();

        mFormModal.classList.add('m-form-modal__view_on');
        document.body.style = 'overflow: hidden';
    });
});

mFormModalClose.addEventListener('click', function (e) {
    e.preventDefault();

    mFormModal.classList.remove('m-form-modal__view_on');
    document.body.style = 'overflow: inherit';
});

mFormModalWrapp.addEventListener('click', function (e) {
    e.preventDefault();

    if (e.target.classList[0] === 'm-form-modal-wrapp') {
        mFormModal.classList.remove('m-form-modal__view_on');
        document.body.style = 'overflow: inherit';
    }
});

// Modal form end


//  Modal Callback 

function modalCallback() {
    //  Вызываем CallBack по успешно отправке
    const mFormModalCallback = document.querySelector('#m-form-modal__callback.m-form-modal');
    mFormModalCallback.classList.add('m-form-modal__view_on');
    document.body.style = 'overflow: hidden';


    const mFormModalCloseCB = document.querySelector('#m-form-modal__callback .m-form-modal-close');
    const mFormModalWrappCB = document.querySelector('#m-form-modal__callback .m-form-modal-wrapp');

    mFormModalCloseCB.addEventListener('click', function (e) {
        e.preventDefault();

        mFormModalCallback.classList.remove('m-form-modal__view_on');
        document.body.style = 'overflow: inherit';
    });

    mFormModalWrappCB.addEventListener('click', function (e) {
        e.preventDefault();

        if (e.target.classList[0] === 'm-form-modal-wrapp') {
            mFormModalCallback.classList.remove('m-form-modal__view_on');
            document.body.style = 'overflow: inherit';
        }
    });
}

//  Modal Callback end

// Menu 
const menuItems = document.querySelectorAll('.menu-el');
const menuBox = document.querySelector('.menu__box');
const menuBar = document.querySelector('.menu-bar');

menuBar.addEventListener('click', function () {

    if (menuBox.classList[3] === 'menu__box_view') {
        menuBox.classList.remove('menu__box_view');
    } else {
        menuBox.classList.add('menu__box_view');
    }

});

// scroll for node layers
menuItems.forEach(function (item, i) {
    item.addEventListener('click', function (e) {
        e.preventDefault();
        const nodeElem = e.target.attributes[0].nodeValue;
        document.querySelector(nodeElem).scrollIntoView({ behavior: 'smooth' });
    })
});

// Menu end