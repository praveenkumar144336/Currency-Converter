const BASEURL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(" button");
const fromCurr=document.querySelector('.from select');
const toCurr=document.querySelector('.to select')
// for writing msg:
const msg=document.querySelector(".msg");

for (let select of dropdown) {
    for (currcode in countryList) {
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value = currcode;

        select.append(newoption);

        // for making defalut selection:

        if (select.name === "from" && currcode === "USD") {
            newoption.selected = "selected";
        } else if (select.name === "to" && currcode === "INR") {
            newoption.selected = "selected";
        }

    }

    // for flag updation:

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });

}

// for flag change:
const updateFlag=(element)=>{
  let currcode=element.value;

  let countrycode=countryList[currcode];
  let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
  let img=element.parentElement.querySelector("img");
  img.src=newsrc;

}
// for exchange rate:

btn.addEventListener('click', async (evt)=>{
  evt.preventDefault();
  let amount=document.querySelector('.amount input');
  let amtVal=amount.value;

  if(amtVal==="" || amtVal <1){
    amtVal=1;
    amount.value="1";
  }
  
  console.log(fromCurr.value,toCurr.value);

  const URL=`${BASEURL}/${fromCurr.value.toLowerCase()}/${toCurr.value.
  toLowerCase()}.json`;

  console.log(URL);

  let response= await fetch(URL);
  let data=await response.json();

  let rate=data[toCurr.value.toLowerCase()];

  console.log(rate);
 

  let finalamount= amtVal*rate;
  msg.innerText=`${amtVal} ${fromCurr.value}=${finalamount} ${toCurr.value}`;




})




