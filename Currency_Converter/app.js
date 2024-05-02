const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"
const country = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.min.json"

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button")
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")



for (let select of dropdowns) {
    for (currCode in countryList) {
      let newOption = document.createElement("option");
      newOption.innerText = currCode;
      newOption.value = currCode;
      if (select.name === "from" && currCode === "USD") {
        newOption.selected = "selected";
      } else if (select.name === "to" && currCode === "INR") {
        newOption.selected = "selected";
      }
      select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target)
    })
}

const updateExchangeRate = async()=>{
    let amount = document.querySelector(".amount input")
    let amtval = amount.value;
    if (amtval === "" || amtval < 1){
        amtval = 1;
        amount.value = "1";
    }  
    let formCurrVal = fromCurr.value.toLowerCase()
    let toCurrVal = toCurr.value.toLowerCase()
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

    try{
        const response =await fetch(URL);
        if(!response.ok){
            throw new console.error("Network response was not ok");
        }
        const data = await response.json();
        const rate = data[formCurrVal][toCurrVal] // Accessing dynamic properties
        let finalAmount = amtval * rate;
        msg.innerText = `${amtval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
    }catch(err){
        console.log("error fetching data :",err)
    }
   
}

const updateFlag = (element)=>{
    let currCode=element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img =element.parentElement.querySelector("img")
    img.src=newSrc
};

btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
})

window.addEventListener("load",()=>{
    updateExchangeRate();
})