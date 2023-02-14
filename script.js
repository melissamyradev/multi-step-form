
// Pages
const body = document.getElementById('body');
const pages = document.getElementsByClassName('pages');
const pages_plan = pages[1];
const pages_addons = pages[2];
const summaryPage = pages[3];
const thankYouPage = pages[4];

// Detect Active Page
const numbering = document.getElementsByClassName('numbering');
const pages_radio = document.getElementsByClassName('numbering_radio');
const page_1_radio = document.getElementById('page_1_radio');
const page_2_radio = document.getElementById('page_2_radio');
const page_3_radio = document.getElementById('page_3_radio');
const page_4_radio = document.getElementById('page_4_radio');

// Page Buttons
const buttons_container = document.getElementById('buttons_container');
const button_back = document.getElementById('button_back');
const button_next = document.getElementById('button_next');

// Contact Form
const contact_form_labels = document.getElementsByClassName('contact_form_label');
const contact_form_inputs = document.getElementsByClassName('contact_form_input');

// Plans Toggling

// -- Plans radio
const plans_radio = document.getElementsByClassName('plans_radio');

// -- buttons
const toggle_monthly = document.getElementById('toggle_monthly');
const toggle_yearly = document.getElementById('toggle_yearly');
const toggle_yearly_radio = document.getElementById('toggle_yearly_radio');
const plans_toggle_container = document.getElementById('plans_toggle');

// -- toggle switch
const toggle_button = document.getElementById('toggle_button');
const toggle_base = document.getElementById('toggle_base');

// Addons
const form = document.getElementById('form');
const addons_checkboxes = document.getElementsByClassName('addons_checkbox');
const addons_pricing = document.getElementsByClassName('addons_pricing');

// Summary 

// -- multiple
const summary_addons_item = document.getElementsByClassName('summary_addons_item');
const summary_plan_dur = document.getElementsByClassName('summary_plan_dur');
const summary_addons_amount = document.getElementsByClassName('summary_addons_amount');

// -- singular
const summary_plan_title = document.getElementById('summary_plan_title');
const summary_plan_duration = document.getElementById('summary_plan_duration');
const summary_plan_pricing = document.getElementById('summary_plan_pricing');
const summary_plan_total = document.getElementById('summary_plan_total');
const summary_button_change = document.getElementById('summary_button_change');
const summary_addons = document.getElementById('summary_addons');
const summary_total_duration = document.getElementById('summary_total_duration');
const summary_total_amount = document.getElementById('summary_total_amount');

// Plans Pricing

const planPricing = {
    monthly: {
        rates: {
            arcade: 9,
            advanced:12,
            pro: 15
        },
        addons: {
            'online service': 1,
            'larger storage': 2,
            'customizable profile': 2
        }
    }
        ,
    yearly: {
        rates: {
            arcade: 90,
            advanced: 120,
            pro: 150,
            promo: '2 months free'
        },
        addons: {
            'online service': 10,
            'larger storage': 20,
            'customizable profile': 20
        }
    }

    
};

const chosenPlan = {
    duration: null,
    plan: {
        name: null,
        amount: 0
    },
    addons: {
        
    },
    total: 0
};

// ====================================================================

// Make sure first page is showing
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('page_1_radio').checked = true;
    plans_radio[0].checked = true;
    chosenPlan.duration = 'monthly';
    chosenPlan.plan.name = 'arcade';
    chosenPlan.plan.amount = planPricing[chosenPlan.duration].rates[chosenPlan.plan.name];
});

// ====================================================================

// SAVE CHOSEN PLANS + ADDONS

// ====================================================================
function setPrice(dur) { 

    addons_pricing[0].textContent = `+\$${planPricing[dur].addons['online service']}`;
    addons_pricing[1].textContent = `+\$${planPricing[dur].addons['larger storage']}`;
    addons_pricing[2].textContent = `+\$${planPricing[dur].addons['customizable profile']}`;

}

function setDur(dur) {

    if (dur === 'yearly') {
        summary_total_duration.textContent = 'year';
        summary_plan_duration.textContent = 'Yearly';

        for (let i = 0; i < addons_pricing.length; i++) {
            addons_pricing[i].textContent += '/yr';
        }
        for (let i = 0; i < summary_plan_dur.length; i++) {
            summary_plan_dur[i].textContent = 'yr';
        }
    } else if (dur === 'monthly') {
        summary_total_duration.textContent = 'month';
        summary_plan_duration.textContent = 'Monthly';

        for (let i = 0; i < addons_pricing.length; i++) {
            addons_pricing[i].textContent += '/mo';
        }
        for (let i = 0; i < summary_plan_dur.length; i++) {
            summary_plan_dur[i].textContent = 'mo';
        }
    }

}

pages_plan.addEventListener('click', (e) => {

    let chosen;

    if (toggle_yearly_radio.checked) {
        chosenPlan.duration = 'yearly';
        setPrice('yearly');
        setDur('yearly');

    } else {
        chosenPlan.duration = 'monthly';
        setPrice('monthly');
        setDur('monthly');
    }

    if (e.target.tagName.toLowerCase() === 'input') {
       
        for (let i = 0; i < plans_radio.length; i++) {
            if (plans_radio[i].checked) {
                chosen = plans_radio[i].value.toLowerCase();
            }
        }

        chosenPlan.plan.name = chosen;
        chosenPlan.plan.amount = planPricing[chosenPlan.duration].rates[chosen];
    }

});

pages_addons.addEventListener('click', (e) => {

    if (e.target.tagName.toLowerCase() === 'input' && e.target.checked) {
       
        let chosen = e.target.value.toLowerCase();

        chosenPlan.addons[chosen] = planPricing[chosenPlan.duration].addons[chosen];

    } else if (e.target.tagName.toLowerCase() === 'input' && !e.target.checked) {
        
        let unchosen = e.target.value.toLowerCase();
        delete chosenPlan.addons[unchosen];
    }

});

// ====================================================================

// PAGE BUTTONS

// ====================================================================

body.addEventListener('click', () => {

    // If at Summary Page, change button to Confirm
    if (page_4_radio.checked) {
        button_next.textContent = 'Confirm';
        button_next.style.background = 'var(--accent)';
    } else {
        button_next.textContent = 'Next Step';
    }

});

buttons_container.addEventListener('click', (e) => {

    // if back button pressed show last page
    if (e.target === button_back) {
        let lastPage;

        for (let i = 0; i < pages_radio.length; i++) {
            if (pages_radio[i].checked) {
                lastPage = pages_radio[i-1];
            }
        }

        lastPage.checked = true;
    }

    if (e.target === button_back && page_2_radio.checked) {
        for (let i = 0; i < addons_checkboxes.length; i++) {
            addons_checkboxes[i].checked = false;
            chosenPlan.addons = {};
        }
    }

    if (e.target === button_next && page_3_radio.checked) {

        let addonsList = chosenPlan.addons;
        let addonsSum = 0;
        summary_addons.innerHTML = '';

        for (const addon in addonsList) {

            addonsSum += addonsList[addon];

            let item = `<div class="summary_addons_item_container">
                            <span class="summary_addons_item">${addon}</span>
                            <span class="summary_addons_item_pricing">+$<span class="summary_addons_amount">${addonsList[addon]}</span>/<span
                                class="summary_plan_dur">mo</span></span>
                        </div>`;

            summary_addons.innerHTML += item;
            
        }

        if (toggle_yearly_radio.checked) {
            chosenPlan.duration = 'yearly';
            setPrice('yearly');
            setDur('yearly');

        } else {
            chosenPlan.duration = 'monthly';
            setPrice('monthly');
            setDur('monthly');
        }

        summary_plan_title.textContent = chosenPlan.plan.name;

        summary_plan_total.textContent = chosenPlan.plan.amount;

        

        chosenPlan.total = chosenPlan.plan.amount + addonsSum;
        summary_total_amount.textContent = chosenPlan.total;

    }

    // if next button pressed show next page
    if (e.target === button_next) {
        let nextPage;

        if (contact_form_inputs[0].value !== '' && contact_form_inputs[1].value !== '' && contact_form_inputs[2].value !== '') {
            
            for (let i = 0; i < contact_form_inputs.length; i++) {
                contact_form_labels[i].classList.remove('warning');
            }

            for (let i = 0; i < pages_radio.length; i++) {
                if (pages_radio[i].checked) {
                    nextPage = pages_radio[i+1];
                }
            }

            if (nextPage !== pages_radio[pages_radio.length]) {
                nextPage.checked = true;
            }

        } else {

            for (let i = 0; i < contact_form_inputs.length; i++) {
                if (contact_form_inputs[i].value === '') {
                    contact_form_labels[i].classList.add('warning');
                } else {
                    contact_form_labels[i].classList.remove('warning');
                }
            }

        }
    }

    // if Confirm button pressed, hide buttons and disable clicking
    if (e.target.textContent === 'Confirm') {

        summaryPage.style.display = 'none';
        thankYouPage.style.display = 'flex';
        buttons_container.style.display = 'none';

    }

});

// ====================================================================

// PLANS TOGGLING

// ====================================================================

function toggleButton() {
    if (toggle_yearly_radio.checked) {
        toggle_yearly_radio.checked = false;
    } else {
        toggle_yearly_radio.checked = true;
    }
}


plans_toggle_container.addEventListener('click', (e) => {
    
    if (e.target.id === "toggle_base" || e.target.id === "toggle_button") {
          
        toggleButton();

    }

});

summary_button_change.addEventListener('click', () => {
    page_2_radio.checked = true;
    for (let i = 0; i < addons_checkboxes.length; i++) {
        addons_checkboxes[i].checked = false;
        chosenPlan.addons = {};
    }
});