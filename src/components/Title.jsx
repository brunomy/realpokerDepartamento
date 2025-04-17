import '~/assets/scss/Title.scss';

export default function Title({ title, icon }) {
    return (
        <div className="title">
            <div className="icon">
                {icon}
            </div>
            <h1>{title}</h1>
        </div>
    )
}

