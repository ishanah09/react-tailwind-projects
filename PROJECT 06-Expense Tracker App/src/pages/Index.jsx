import ExpenseProvider from "../context/ExpenseContext"
import Layout from "../layout/Layout"
export default function Index()
{
  return(
  <ExpenseProvider>
<Layout></Layout>
  </ExpenseProvider>

  )
}

