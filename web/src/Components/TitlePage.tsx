import './CssComponents/TitlePage.css';

const TitlePage = (props: { title: string, description: string }) => {

    return (
        <div className='info-page'>
            <span className="title-page">{props.title}</span>
            <div className='subtitle-page'>
                <span>{props.description}</span>
            </div>
        </div>
    )
}

export default TitlePage;
