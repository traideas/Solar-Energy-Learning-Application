import React from 'react'
import { useForm } from 'react-hook-form'

const Registration = () => {
    const { register, handleSubmit, errors } = useForm()
    const onSubmit = data => console.log(data)
    console.log(errors)
    return (
        <div>
            <h2>Register Your Account</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="firstName" name="firstName" ref={register({required: true})} />
                <input type="text" placeholder="lastName" name="lastName" ref={register({required: true})} />
                <input type="datetime" placeholder="birthDate" name="birthDate" ref={register({required: true})} />
                <input type="email" placeholder="email" name="email" ref={register({required: true})} />
                <input type="text" placeholder="password" name="password" ref={register({required: true})} />
                <input type="text" placeholder="userName" name="userName" ref={register} />

                <input type="submit" />
            </form>
        </div>
    )
}

export default Registration
