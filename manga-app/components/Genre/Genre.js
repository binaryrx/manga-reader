import MangaPreview from "../MangaPreview";
import { Main, Section, Title } from "./styled";


const Genre = ({ mangas, title } = props ) => {

    return (
        <>
            <Main>
                <Section>
                    <Title>{title} Mangas</Title>
                    <div className="mangas">
                        {mangas.map( ( manga, i) => 
                            ( <MangaPreview manga={manga} page="genre" index={i} key={i} page="genre" classes="genre"/> )
                        )}
                    </div>
                </Section>
            </Main>
        </>
    );
};

export default Genre;
