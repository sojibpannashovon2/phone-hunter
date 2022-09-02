const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
    console.log(phones);

    //show-all button
    const showButton = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        // get the 10 phones only
        phones = phones.slice(0, 10);
        showButton.classList.remove('d-none');
    }
    else {
        showButton.classList.add('d-none');
    }
    // no-phone-found
    const noFoundPhone = document.getElementById('no-phone-found');
    if (phones.length == 0) {
        noFoundPhone.classList.remove('d-none');
        toggleLoader(false);
    }
    else {
        noFoundPhone.classList.add('d-none');
    }
    // get all phone phone
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = ``;
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `<div class="card p-5 border border-danger shadow-sm ">
    <img src="${phone.image}" class="card-img-top " alt="...">
    <div class="card-body">
    <h5 class="card-title">${phone.phone_name}</h5>
    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    <button onclick="phoneDetails('${phone.slug}')" href="#" class="btn btn-primary mx-auto"  data-bs-toggle="modal" data-bs-target="#phoneDetails">Show Details</button>
    </div>
 
    </div>`;
        phoneContainer.appendChild(phoneDiv);
        //stop loading
        toggleLoader(false);
    });

}
//common function
const processOfSearch = (dataLimit) => {
    //start loading
    toggleLoader(true);
    const inputField = document.getElementById('input-field')
    const searchText = inputField.value;
    loadPhones(searchText, dataLimit);
}
//Search button event handeller
document.getElementById('btn-search').addEventListener('click', function () {

    processOfSearch(10);

})
// Enter key event handallar
document.getElementById('input-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        // code for enter
        processOfSearch(10);
    }
});

const toggleLoader = isLoading => {

    const loderSection = document.getElementById('loader')

    if (isLoading) {
        loderSection.classList.remove('d-none')
    }
    else {
        loderSection.classList.add('d-none');
    }

}
//Show all button
document.getElementById('btn-showAll').addEventListener('click', function () {
    processOfSearch();
})

//details button
const phoneDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    phoneDetailShows(data.data);
}
const phoneDetailShows = (phone2) => {
    console.log(phone2)
    const phoneDetails2 = document.getElementById('phoneDetailsLabel');
    phoneDetails2.innerText = phone2.name;
    const mobileDetails = document.getElementById('mobile-details');
    mobileDetails.innerHTML = `
      <p> ReleaseDate: ${phone2.releaseDate ? phone2.releaseDate : 'No release date Found !!'}</p>
      <p> MainFeatures: 
      <span> Storage: ${phone2.mainFeatures ? phone2.mainFeatures.storage : 'No storage Found !!'}</span><span>  displaySize: ${phone2.mainFeatures.displaySize}</span><span>  chipSet: ${phone2.mainFeatures.chipSet}</span></p>
      `;
}

loadPhones('iphone');