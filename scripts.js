const Modal = {
    open(){
        // Abre o Modal (add o active)
        document
            .querySelector('.modal-overlay')
            .classList
            .add('active')
    },
    close(){
        // Fecha o Modal (remove o active)
        document
            .querySelector('.modal-overlay')
            .classList
            .remove('active')
    }
}


//atribue valores
const transactions = [
    {
        id: 1,
        description: 'Aluguel',
        amount: -130000,
        date: '23/01/2022'
    },
    {
        id: 2,
        description: 'Internet',
        amount: -20000,
        date: '23/01/2022'
    },
    {
        id: 3,
        description: 'Luz',
        amount: -50000,
        date: '23/01/2022'
    },{
        id: 4,
        description: 'Salário',
        amount: 500000,
        date: '20/01/2022'
    }
]

//calcula valor das transacoes
const Transaction = {
    all: transactions,

    add(transaction){
        Transaction.all.push(transaction)
        
        App.reload()
    },

    incomes(){
        let income = 0;
        Transaction.all.forEach(transaction => {
            if( transaction.amount > 0) {
                income += transaction.amount;
            }
        })
        return income
    },

    expenses(){
        let expense = 0;
        Transaction.all.forEach(transaction => {
            if( transaction.amount < 0) {
                expense += transaction.amount;
            }
        })
        return expense
    },

    total(){
        return Transaction.incomes() + Transaction.expenses()
    }
}


const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""
        
        //   /\D/ -> SELECIONA TUDO QUE NAO É NUMERO
        value = String(value).replace(/\D/g, "")
        value = Number(value) / 100
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value
    }
}


const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),
    addTransaction(transaction, index){
        
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)
    },

    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        const html = 
        `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img src="./assets/minus.svg" alt="Remover Transação">
            </td>
        `
        return html
    },

    updateBalance() {
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes())
        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses())
        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransactions(){
        DOM.transactionsContainer.innerHTML = ""
    }
}


const App = {
    init(){
        Transaction.all.forEach(function(transaction) {
            //adiciona todos os elementos no html
            DOM.addTransaction(transaction)
        })
        
        DOM.updateBalance()
    },
    reload(){
        DOM.clearTransactions()
        App.init()
    }
}

App.init()

Transaction.add({
    id: 777,
    description: 'Allah Hur Akbar',
    amount: -9100,
    date: '01/01/2021'
})


//vídeo 1:45:35