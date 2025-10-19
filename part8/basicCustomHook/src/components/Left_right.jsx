import React from 'react'
import useCounter from '../hooks/useCounter'

const Left_right = () => {

    const left = useCounter();
    const right = useCounter();
    return (
        <div>
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h2>Left Counter: {left.value}</h2>
                <button onClick={left.increase}>Left +</button>
                <button onClick={left.decrease}>Left -</button>
                <button onClick={left.zero}>Reset Left</button>

                <hr style={{ margin: "30px 0" }} />

                <h2>Right Counter: {right.value}</h2>
                <button onClick={right.increase}>Right +</button>
                <button onClick={right.decrease}>Right -</button>
                <button onClick={right.zero}>Reset Right</button>
            </div>
        </div>
    )
}

export default Left_right