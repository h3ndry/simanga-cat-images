import { FC } from "react"

const Layout: FC <{children: any}> = ({ children }) => {
    return (
    <main>
        { children }
    </main>

    )
}

export default Layout
