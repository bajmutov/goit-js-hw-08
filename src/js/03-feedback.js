import throttle from 'lodash.throttle';

const STORAGE_KEY = "feedback-form-state";

const filterForm = document.querySelector('.feedback-form');

initFotm()

filterForm.addEventListener('input', throttle((onFormInput),500));
filterForm.addEventListener('submit', onFormSubmit);

function onFormInput(evt) {
    let localText = localStorage.getItem(STORAGE_KEY);
    localText = localText ? JSON.parse(localText) : {};
    localText[evt.target.name] = evt.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(localText));
}

function initFotm() {
    let localText = localStorage.getItem(STORAGE_KEY);
    if (localText) {
        localText = JSON.parse(localText);
        Object.entries(localText).forEach(([name, value]) => {
            filterForm.elements[name].value = value;
        })
    }    
}

function onFormSubmit(evt) {
    evt.preventDefault();
    // const { email, message } = evt.currentTarget.elements;
    // const values = {
    //     email: email.value,
    //     message: message.value,
    // }
    const formData = new FormData(filterForm);
    const values = Object.fromEntries(formData.entries())

     if (values.email === "" || values.message === "") {
    alert("Please fill in all the fields!");
    } else {
    console.log(values);
    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
 }  
}