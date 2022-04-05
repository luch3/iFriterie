import IFriterie from "../../../../core/models/iFriterie";
import { Button } from "primereact/button";

interface FriterieItemProps {
    friterie: IFriterie;
}

export default function FriterieItem(props: FriterieItemProps) {
    function openInGMap(): void {
        window.open(`https://maps.google.com/?q=${props.friterie.latitude},${props.friterie.longitude}`, "_blank");
    }

    return (
        <div>
            <span className="p-2">
                {props.friterie.name}
            </span>
            <span className="p-2">
                {props.friterie.address}
            </span>
            {props.friterie?.distance && <span className="p-2"> à {Math.round(props.friterie.distance)} mètres</span>}
            <Button label="Ouvrir dans GMap" onClick={openInGMap}/>
        </div>
    );
}