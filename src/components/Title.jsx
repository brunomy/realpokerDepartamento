import '~/assets/scss/Title.scss';
import Breadcrumbs from "~/components/Breadcrumbs";

export default function Title({ title, icon, breadcrumbs = [] }) {
    return (
        <div className="title">
            <div className="icon">
                {icon}
            </div>
            <h1>{title}</h1>
            { breadcrumbs &&
                <Breadcrumbs links={breadcrumbs} />
            }
        </div>
    )
}

