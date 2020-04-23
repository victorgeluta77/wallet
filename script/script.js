// genrate ramdom number for ID
const generateId = ()=>`glo${Math.round(Math.random()*1e8).toString(16)}`

const totalBalance=document.querySelector('.total__balance'),
      totalMoneyExpenses=document.querySelector('.total__money-expenses'),
      totalMoneyIncome=document.querySelector('.total__money-income'),
      historyList=document.querySelector('.history__list'),
      form=document.querySelector('#form'),
      operationName=document.querySelector('.operation__name'),
      operationAmount=document.querySelector('.operation__amount');



// if localStorig has data we read them to array      
let  dbOperation = JSON.parse(localStorage.getItem('calc')) || [];

// if (localStorage.getItem('calc')){
//     dbOperation = JSON.parse(localStorage.getItem('calc'));
// };


// rendering list with datas
const renderOperation = (desc,amount,id)=>{

    const listItem = document.createElement('section');

    listItem.classList.add('history__item');
    (amount>0) ? listItem.classList.add('history__item-plus') : listItem.classList.add('history__item-minus');
    listItem.innerHTML = `
    ${desc}
    <span class="history__money"> ${amount} грн</span>
    <button class="history_delete" data-id = "${id}">x</button>
    
    `;
    historyList.append(listItem);

};


// count Balance, income and outlay
const updateBalance =()=>{
    const resultIncome = dbOperation
    .filter((item)=>item.amount>0)
    .reduce((result,item)=>result + item.amount,0);

    const resultExpenses = dbOperation
    .filter((item)=>item.amount<0)
    .reduce((result,item)=>result + item.amount,0);

    totalMoneyIncome.textContent = resultIncome+ ' грн';
    totalMoneyExpenses.textContent = resultExpenses + ' грн';
    totalBalance.textContent = (resultIncome+resultExpenses) + ' грн';

    
}



//  add datas to affay and rendering them
const addOperation = (event)=>{
    event.preventDefault();

    const operationNameValue =  operationName.value,
          operationAmountValue = operationAmount.value;

          operationName.style.borderColor = '';
          operationAmount.style.borderColor = '';

    if (operationNameValue && operationAmountValue ){

        const operation = {
            id: generateId(),
            description: operationNameValue,
            amount: +operationAmountValue,
        }

        dbOperation.push(operation);
        console.log(dbOperation);
        init();
        
       
    } else {
        if (!operationNameValue) operationName.style.borderColor = 'red';
        if (!operationAmountValue) operationAmount.style.borderColor = 'red';
    }
        operationAmount.value = '';
        operationName.value = ''; 
    };
 

// delete data from list
const deleteOperation = (event)=>{
      const target = event.target;
    if(target.classList.contains('history_delete')){
        console.log(target.dataset.id);

        dbOperation = dbOperation
          .filter(operation => operation.id != target.dataset.id );
        init(); 
    }
    
    
};


// initialization datas
const init = ()=>{
    historyList.textContent='';

    dbOperation.forEach((item)=>{
       renderOperation(item.description,item.amount,item.id);
    });
    updateBalance();
    localStorage.setItem('calc',JSON.stringify(dbOperation));

};


// if click button submit 
form.addEventListener('submit',addOperation);

// if click =X= near list
historyList.addEventListener('click',deleteOperation);

init();