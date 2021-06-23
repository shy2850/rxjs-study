import ScrollFixed from './demos/scroll_fixed'
import AddMinus from './demos/add_minus'

interface MenuItem {
    title: string,
    hash: string,
    component: any
}

export const menus: MenuItem[] = [
    {
        title: '滚动转化拖拽',
        hash: '#scroll_fixed',
        component: ScrollFixed,
    },
    {
        title: '控制增减数字',
        hash: '#add_minus',
        component: AddMinus,
    },
]