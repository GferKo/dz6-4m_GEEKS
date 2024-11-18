// import React from 'react';
// import { Controller, useForm } from 'react-hook-form';
// import * as Yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import classes from './FormPage.module.scss';
//
// const regex = /^\d+$/
//
// const schema = Yup.object().shape({
//     name: Yup.string().required('обязательное поле').min(3, 'минимальное 3'),
//     age: Yup.string().required('обязательное поле').matches(regex, 'только цифры').min(2, 'минимальное 2'),
// });
// const FormPage = () => {
//     const {
//         register,
//         handleSubmit,
//         watch,
//         formState: { errors, isValid },
//         clearErrors,
//         setValue,
//         reset,
//         control
//     } = useForm({
//         defaultValues: {
//             name: 'Bakyt'
//         },
//         resolver: yupResolver(schema)
//     });
//
//     console.log(isValid, 'isValid');
//
//     const name = watch('name');
//     const submit = (data) => {
//         console.log(data);
//     };
//     const error = (data) => {
//         console.log(data);
//     };
//
//     return (
//         <div>
//             <form onSubmit={handleSubmit(submit, error)} className={classes.form}>
//                 <div>{name}</div>
//                 <Controller
//                     name={'age2'}
//                     control={control}
//                     render={({ field }) =>
//                         <input
//                             {...field}
//                             type="text"
//                             onInput={(e)=> {
//                                 e.target.value = e.target.value.replace(/[^0-9]/g, '')
//                             }}
//                         />
//                 //         <input
//                 //         name="name2"
//                 //         value={field.value}
//                 //     onChange={field.onChange}
//                 //     onBlur={field.onBlur}
//                 //     ref={field.ref}
//                 // />
//                     }/>
//                 <input
//                     type="text"
//                     placeholder="Напишите имя"
//                     aria-invalid={errors.name ? true : false}
//                     {
//                         ...register('name')
//                     }
//                 />
//                 {
//                     errors?.name?.message && <p>{errors.name.message}</p>
//                 }
//                 <input
//                     type="text"
//                     placeholder="Напишите возраст"
//                     aria-invalid={errors.age ? true : false}
//
//                     {
//                         ...register('age')
//                     }
//                 />
//
//                 {
//                     errors?.age?.message && <p>{errors.age.message}</p>
//                 }
//                 <button type="button" onClick={() => setValue('name', 'Адилет')}>Адилет</button>
//                 <button type="button" onClick={() => clearErrors()}>clearErrors</button>
//                 <button type="button" onClick={() => reset()}>очистить</button>
//                 <button>Отправить</button>
//             </form>
//         </div>
//     );
// };
//
// export default FormPage;

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import classes from './FormPage.module.scss'

const schema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup
        .string()
        .email('Invalid email format')
        .required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    reEnterPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Re-enter password is required'),
}).required();

const Form = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Register with</h1>
                <div className={classes.box}>
                    <div className={classes.miniForm}>
                        <div>
                            <p htmlFor="name">Name</p>
                            <input
                                id="name"
                                type="text"
                                placeholder="Your full name"
                                {...register('name')}
                            />
                            {errors.name && <p>{errors.name.message}</p>}
                        </div>
                    </div>

                    <div className={classes.miniForm}>
                        <div>
                            <p htmlFor="email">Email</p>
                            <input
                                id="email"
                                type="email"
                                placeholder="Your email"
                                {...register('email')}
                            />
                            {errors.email && <p>{errors.email.message}</p>}
                        </div>
                    </div>


                    <div className={classes.miniForm}>
                        <div>
                            <p htmlFor="password">Password</p>
                            <input
                                id="password"
                                type="password"
                                placeholder="Your password"
                                {...register('password')}
                            />
                            {errors.password && <p>{errors.password.message}</p>}
                        </div>
                    </div>


                    <div className={classes.miniForm}>
                        <div>
                            <p htmlFor="reEnterPassword">Re-enter Password</p>
                            <input
                                id="reEnterPassword"
                                type="password"
                                placeholder="Your password"
                                {...register('reEnterPassword')}
                            />
                            {errors.reEnterPassword && <p>{errors.reEnterPassword.message}</p>}
                        </div>
                    </div>

                </div>

                <div>
                    <button type="submit">Continue</button>
                </div>

            </form>
        </div>
    );
};

export default Form;
