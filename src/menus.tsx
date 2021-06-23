import ScrollFixed from './demos/scroll_fixed'

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
    }
]