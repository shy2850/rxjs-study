import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { menus } from './menus'

const base_title = document.title

const Page404 = () => <div style={{ textAlign: 'center', padding: 32 }}>
    <h2>404</h2>
    <p>页面不存在</p>
</div>

const App = () => {
    const [menu, setMenu] = React.useState(menus[0])

    addEventListener('hashchange', () => {
        const menu = menus.find(m => m.hash === location.hash)
        setMenu(menu)
    })

    React.useEffect(() => {
        if (menu) {
            document.title = base_title + ' - ' + menu.title
        } else {
            document.title = base_title
        }
    }, [menu])

    return <>
        <div style={{
            width: 160,
            position: 'fixed',
            boxSizing: 'border-box',
            padding: 6,
            top: 24,
            left: '50%',
            marginLeft: -600,
            lineHeight: '24px',
        }}>
            {menus.map(m => <div key={m.hash} style={{
                fontWeight: menu?.hash === m.hash ? 'bold' : 'normal'
            }}><a href={m.hash}>{m.title}</a></div>)}
        </div>
        <div style={{
            width: 800,
            padding: 30,
            lineHeight: '24px',
            margin: '0 auto',
        }}>
            {menu ? <menu.component /> : <Page404/>}
        </div>
    </>
}

ReactDOM.render(<App/>, document.getElementById('app'))