import * as React from 'react'
import { fromEvent, Subscription } from 'rxjs'
import { map, switchMapTo, takeUntil, withLatestFrom } from 'rxjs/operators'

const W = 400
const H = 250
export default () => {
    let s1: Subscription;
    let s2: Subscription;

    const init_image: React.LegacyRef<HTMLImageElement> = (img) => {
        if (!img) return
        const scroll = fromEvent(document, 'scroll')
        s1 = scroll.pipe(map(e => img.parentElement.getBoundingClientRect().bottom < 0))
        .subscribe(fixed => {
            if (fixed) {
                img.style.position = 'fixed'
                img.style.cursor = 'move'
            } else {
                img.style.position = 'static'
                img.style.cursor = 'default'
            }
        })
        
        const mouseDown = fromEvent(img, 'mousedown')
        const mouseUp = fromEvent(document, 'mouseup')
        const mouseMove = fromEvent(document, 'mousemove')

        s2 = mouseDown.pipe(
            switchMapTo(mouseMove.pipe(takeUntil(mouseUp))),
            withLatestFrom(mouseDown),
            map(([move, down]: [MouseEvent, MouseEvent]) => {
                return {
                    x: move.clientX - down.offsetX,
                    y: move.clientY - down.offsetY,
                }
            }),
        )
        .subscribe(pos => {
            let left = Math.min(Math.max(6, pos.x), window.innerWidth - W - 20)
            let top = Math.min(Math.max(6, pos.y), window.innerHeight - H - 6)
            img.style.left = `${left}px`
            img.style.top = `${top}px`
        })
    }

    React.useEffect(() => () => {
        s1.unsubscribe()
        s2.unsubscribe()
    })

    return <div>
        <p>内容内容</p>
        <p>内容内容</p>
        <p>内容内容</p>
        <div style={{ width: W, height: H }}>
            <img ref={init_image} style={{
                width: W,
                height: H,
                left: window.innerWidth - (W + 40),
                top: window.innerHeight - (H + 20),
            }} src="https://dss0.bdstatic.com/l4oZeXSm1A5BphGlnYG/skin/19.jpg?2" draggable={false}/>
        </div>
        <p style={{height: 200}}>内容内容</p>
        <p style={{height: 200}}>内容内容</p>
        <p style={{height: 200}}>内容内容</p>
        <p style={{height: 200}}>内容内容</p>
        <p style={{height: 200}}>内容内容</p>
        <p style={{height: 200}}>内容内容</p>
        <p style={{height: 200}}>内容内容</p>
    </div>
}