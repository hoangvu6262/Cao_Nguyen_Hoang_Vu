import { RouterProvider } from 'react-router-dom'

import router from './routes'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(window as any).global = window

function App() {
    return (
        <>
            {/* <ToastContainer /> */}
            <RouterProvider router={router} />
        </>
    )
}

export default App
