import React from "react";


const initialState = {
  description: "",
  amount: "",
  date: "",
  
  type:  "" ,// Make it a radio!
  
}
var currencyFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency :'USD'
})

const commishArr = []  // Seperating different type in arrays
const expensesArr=[]
const payrollArr  = []

class InputSpace extends React.Component{
  constructor(props){
   
    super(props);
    this.state = {
     description: "",
     amount: "",
     date: "",
     array : [],
     type:  "", // Make it a radio!
     id : .313,
     commissionArr : [],
     payrollArr : [],
     expenseArr : []
    }
    
    this.userDateChanged = this.userDateChanged.bind(this)
    this.userDescriptionChanged = this.userDescriptionChanged.bind(this)
    this.userAmountChanged = this.userAmountChanged.bind(this)
    this.userTypeChanged= this.userTypeChanged.bind(this)
    this.userArrayChanged = this.userArrayChanged.bind(this)
    this.userCommissionArrChanged = this.userCommissionArrChanged.bind(this)
    this.userPayrollArrChanged = this.userPayrollArrChanged.bind(this)
    this.userExpenseArrChanged = this.userExpenseArrChanged.bind(this)
  } 
  
  userDateChanged(x){
    this.setState({date : x.target.value})
  }
  userTypeChanged(x){
    this.setState({type : x.target.value})
  }
  userDescriptionChanged(x){
    this.setState({ description : x.target.value});
  }
  userAmountChanged(x){
    this.setState({amount : x.target.value})
  }
  userArrayChanged(){
    this.setState({array : [...this.state.array]})
  }
  userCommissionArrChanged(){
    this.setState({commissionArr : [...this.state.commissionArr]})
  }
  userPayrollArrChanged(){
    this.setState({payrollArr : [...this.state.payrollArr]})
  }
  userExpenseArrChanged(){
    this.setState({expenseArr : [...this.state.expenseArr]})
  }
  
  render(){ 
    
    const TotalAmount = ()=> {
      const newArr =  this.state.array.map((x) => {
        return  {type: x.type, amount : x.amount}    
      })
      .map( x => { 
        (x.type == "Commissions") ? x.type = 1 
       :(x.type == "Expenses" || "Payroll") ? x.type = -1
       :alert("Need to enter type")
       return x.type * x.amount 
      })
      .reduce((accumulator, eachNumInArr) =>  accumulator + eachNumInArr, 0) // This may be the prior number 
      const TotalNumber = currencyFormat.format( newArr)
      const commishTotal = currencyFormat.format(commishArr.reduce((accumulator, eachNumInArr) =>  accumulator + eachNumInArr, 0))
      const expensesTotal = currencyFormat.format(expensesArr.reduce((accumulator, eachNumInArr) =>  accumulator + eachNumInArr, 0))
      const payrollTotal = currencyFormat.format(payrollArr.reduce((accumulator, eachNumInArr) =>  accumulator + eachNumInArr, 0)) 
      return(
        <div>
          <h2>Total</h2>
            <h3> {TotalNumber}</h3>               
          <table>
            <thead>
              <tr>
                <th>Commissions</th>
                <th>Payroll</th>
                <th>Expenses</th>
                </tr>
              </thead>
              <tbody>
                <td>{commishTotal}</td>
                <td>{payrollTotal}</td>
                <td>{expensesTotal}</td>
                </tbody>
            </table>             
        </div>    
      )
    }

    const NewEntryRow = this.state.array
      .map((x)=> 
        <tr key={x.id}>
         <td>{x.date.toDateString().slice(4)}</td>
          <td>{x.type}</td>
          <td>{x.description}</td>
          <td>{currencyFormat.format(x.amount)}</td> 
          <td> 
            <button id={x.id} 
              onClick={e => {
                const buttonID = e.target.id
                const copiedArr= [...this.state.array]
                const updatedArr = copiedArr.filter(x => x.id != buttonID)
                if (x.type === "Commissions"){commishArr.push((x.amount * -1))
                } 
                else if (x.type === "Payroll"){payrollArr.push((x.amount * -1))
                }
                else {expensesArr.push((x.amount * -1))
                }
                //console.log(this.state.array.findIndex(x => x.id != buttonID))
                this.setState({array : updatedArr })
              }}
            >X</button>
          </td>
        </tr>
      )
    
    return(
      <div className="App">
          <input type="date" 
                value={this.state.date}
                onChange={this.userDateChanged} 
          /> 

        <select id="TypeList" value={this.state.type} onChange={this.userTypeChanged} > Type
                <option value="" >  Select Type  </option>
                <option value="Commissions"> Commissions </option>
                <option value="Expenses" > Expenses  </option>
                <option value="Payroll"> Payroll </option>
                <option value="Expenses" > Other   </option>
                <option value="Commissions" > Income  </option>
        </select>
                
                
        <input type="text" placeholder="Description" style={{width : 200}} 
                value={this.state.description}
                onChange={this.userDescriptionChanged}/>
        <input type="number" style={{width : 75}} placeholder="Amount" 
                value={this.state.amount}
                onChange={this.userAmountChanged}/> 
        <button type="button" onClick={()=>{  //  New Entry Function
                if (this.state.date.length  < 3){alert("PLEASE SELECT A DATE")}
                else if( this.state.type.length <3){alert("PLEASE SELECT A TYPE")}
                else if(this.state.amount <= 0){ alert("PLEASE ENTER AN AMOUNT")}
                else{ 
                  this.setState({id : 1 + Math.random()})// Can't put function as variable cant read this or x
                  this.state.array.push({   //            Push object into an array
                    date : new Date (this.state.date),
                    type : this.state.type,
                    description : this.state.description,
                    amount : Math.round( this.state.amount * 100) / 100,
                    id : this.state.id,
                    commissionArr : [],
                    payrollArr : [],
                    expenseArr : []
                  })
                  this.state.array.sort((a,b) => a.date - b.date ) // sorted Array       

                  if (this.state.type === "Commissions"){            // Adding type to specified Array
                  commishArr.push(parseFloat(this.state.amount))
                  } 
                  else if (this.state.type === "Payroll"){
                    payrollArr.push(parseFloat(this.state.amount))
                  } else if(this.state.type === "Expenses"){
                    expensesArr.push(parseFloat(this.state.amount))
                  }
                  console.log(this.state.type)
                }
                  this.setState(initialState) //clear input value
                }}
                >New Entry 
        </button>
        <hr/>
            <table>
                <thead> 
                  <tr>
                    <th> Date</th>
                    <th> Type</th>
                    <th> Description</th>
                    <th> Amount</th>
                    <th> </th>
                  </tr>
                </thead>
                <tbody> 
                    {NewEntryRow}
                </tbody> 
            </table>
        <TotalAmount/>
      </div>
    )
  }
}




function App() {
  return (
    <InputSpace/>
    
  );
}
export default App;
