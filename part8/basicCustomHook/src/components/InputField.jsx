import React from 'react'
import useField from '../hooks/useField';

const InputField = () => {
    const name = useField("text");
    const born = useField("date");
    const height = useField("number");
    return (
        <div>
            <div style={{ textAlign: "center", marginTop: "40px" }}>
                <form>
                    <div>
                        name:
                        <input {...name} /> {/* 🔥 magic line */}
                    </div>

                    <div>
                        birthdate:
                        <input {...born} />
                    </div>

                    <div>
                        height:
                        <input {...height} />
                    </div>
                </form>

                <div style={{ marginTop: "20px" }}>
                    <strong>Output:</strong> {name.value} {born.value} {height.value}
                </div>
            </div>
        </div>
    )
}

export default InputField