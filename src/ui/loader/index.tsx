import React from 'react'
import cls from "./loader.module.scss"
export default function Loader({ onClick }: any) {
    return (
        <div className={cls.Loader}>
            <div className={cls.Loader__wrap}>
                <div className={cls.Loader__top}>
                    <div>
                        <div class={cls.ldsring}><div></div><div></div><div></div><div></div></div>
                        <p>loading...</p>
                    </div>
                </div>
                <button onClick={onClick} className={cls.Loader__btn}>cancel</button>
            </div>
        </div>
    )
}
