import HomeTitle from "./styled";
import LatestMangas from "#/components/LatestMangas";

const Root = ({ mangas } = props ) => {

    return (
        <>
            <HomeTitle>Home</HomeTitle>
            <LatestMangas mangas={mangas}/>
        </>
    );
};
export default Root;