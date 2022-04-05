import IFriterie from "../../../core/models/iFriterie";

interface NearestFriterieProps {
    friterie: IFriterie;
}
export default function NearestFriterie(props: NearestFriterieProps) {
    return (
        <div className="p-card p-4">
                            <h3>{props.friterie.name}</h3>
            <div className="flex justify-content-between">
                <div>
                <p>
                    {props.friterie.description}
                </p>
                </div>
                <div>
                    <div>                    
                        {props.friterie.address}
                    </div>
                    {props.friterie.distance && <div className="bold">
                        Votre friterie près de votre position à seulement {Math.round(props.friterie.distance)} mètres !
                    </div>}
                </div>
            </div>
        </div>
    );
}