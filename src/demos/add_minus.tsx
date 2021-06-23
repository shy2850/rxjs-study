import * as React from 'react'
import { from, fromEvent, interval, merge, Subscription } from 'rxjs'
import { map, mapTo, scan, startWith, switchMapTo, takeUntil, throttleTime, withLatestFrom } from 'rxjs/operators'

const WORDS = 'RxJS is Awasome!'
export default () => {
    const [result, setResult] = React.useState(0)
    const btnAdd = React.useRef<HTMLButtonElement>()
    const btnMinus = React.useRef<HTMLButtonElement>()

    const [word, updateWord] = React.useState('')

    React.useEffect(() => {
        const addClick = fromEvent(btnAdd.current, 'click').pipe(mapTo(1))
        const minusClick = fromEvent(btnMinus.current, 'click').pipe(mapTo(-1))
        const s = merge(addClick, minusClick).pipe(
            throttleTime(1000),
            scan((cur, value) => cur + value)
        ).subscribe(setResult)

        const s1 = interval(200).pipe(
            map(t => WORDS.substring(0, t % (WORDS.length + 5) + 1))
        ).subscribe(updateWord)
        return () => {
            s.unsubscribe()
            s1.unsubscribe()
        }
    }, [])
    return (
        <>
            <h2>{word}</h2>
            <p >
                <button ref={btnAdd}> +1 </button> &nbsp; <button ref={btnMinus}> -1 </button>
            </p>
            <p>
                结果是： {result}
            </p>
        </>
    )
}