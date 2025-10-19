import React, { useState } from 'react'

const useCounter = () => {
    const [value, setValue] = useState(0);

    const increase = () => {
        setValue((state) => state + 1);
    }

    const decrease = () => {
        setValue((state) => state - 1)
    }

    const zero = () => {
        setValue(0)
    }

    return {
        value, increase, decrease,zero
    }
}

export default useCounter