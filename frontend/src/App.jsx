import { RouterProvider } from 'react-router-dom'
import { router } from './router/index.jsx'
import ProductContext from './context/ProductContext.jsx'
import UserContex from './context/UserContex.jsx'




function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <UserContex>
        <ProductContext>
          <RouterProvider router={router} />
        </ProductContext>
      </UserContex>
    </>
  )
}

export default App
