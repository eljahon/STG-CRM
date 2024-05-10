import cls from "./loader.module.scss"
export default function Loader() {
    return (
        <div className={cls.Loader}>
             <div>
                        <div className={cls.ldsring}><div></div><div></div><div></div><div></div></div>
                        <p>loading...</p>
            </div>
        </div>
    )
}
