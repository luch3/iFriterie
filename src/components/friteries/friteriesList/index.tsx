import IFriterie from "../../../core/models/iFriterie";
import FriterieItem from "./friterieItem";

interface FriteriesListProps {
    friteries: IFriterie[];
}

export default function FriteriesList(props: FriteriesListProps) {
    return (
        <div>
            <h1>Liste des friteries:</h1>
            {props.friteries?.length ? props.friteries
                .map(friterie => <FriterieItem key={friterie.id} friterie={friterie}/>)
                : "Rien à afficher"
            }
        </div>
    );
}