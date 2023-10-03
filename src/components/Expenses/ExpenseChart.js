import React from "react";
import { useSelector } from "react-redux";
import { PieChart } from "react-minimal-pie-chart";
import Layout from '../store/Layout/Layout'
function ExpensesChart() {
  const expenses = useSelector((state) => state.expense.expenses);

  // Calculate the total expenses
  let totalExpenses = 0;
  expenses.forEach((expense) => {
    totalExpenses += parseFloat(expense.price); // Ensure that expense.price is a number
  });

  // Prepare data for the pie chart
  const data = expenses.map((expense) => ({
    title: expense.category,
    value: parseFloat(expense.price), // Use expense price as the value (ensure it's a number)
    color: getRandomColor(),
  }));

  // Function to generate random colors
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (

    <Layout>
      <div className="d-flex flex-column align-items-center gap-5">
        <h3 className="my-4">Total Expenses: {totalExpenses.toFixed(2)} Rs.</h3>
        <div className=" d-flex justify-content-center align-items-center mt-5">
          <div className="d-flex flex-column align-items-center">
            <PieChart
              data={data}
              label={() => null} // Disable default labels inside the pie chart
            />
            <div className="mt-5">
              {data.map((dataEntry, index) => (
                <div key={index} className="d-flex align-items-center">
                  <div
                    className="rounded-circle"
                    style={{
                      backgroundColor: dataEntry.color,
                      width: "12px",
                      height: "12px",
                      marginRight: "5px",
                    }}
                  ></div>
                  <span style={{ fontSize: "16px" }} className="my-1">
                    {dataEntry.title}: {dataEntry.value.toFixed(2)} Rs.
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>



  );
}

export default ExpensesChart;
