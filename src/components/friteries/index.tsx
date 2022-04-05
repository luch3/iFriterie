import { useEffect, useState } from "react";
import ICoordinates from "../../core/models/iCoordinates";
import IFriterie from "../../core/models/iFriterie";
import FriteriesList from "./friteriesList";
import { getDistance } from "geolib";
import NearestFriterie from "./nearestFriterie";
import friterieFacade from "../../core/facades/friterieFacade";

export default function Friteries() {
    
    const [friteries, setFriteries] = useState<IFriterie[]>([]);
    const [coords, setCoords] = useState<ICoordinates>();

    const fetchData = async () => {
        const friteries = await friterieFacade.getAll();
        if(coords){
            const sortedFriteries = friteries.map(friterie => {
                return {...friterie,
                    distance: getDistance(
                        {lat: coords.latitude, lng: coords.longitude},
                        {lat: friterie.latitude, lng: friterie.longitude},
                        coords.accuracy,
                        )};
            }).sort((a,b) => a.distance-b.distance);
            setFriteries(sortedFriteries);}
    }
    
    //ICI ON VA CHERCHER LES DONNEES
    useEffect(() => {
        if('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((value) => {
                setCoords(value.coords);
            },
            (error) => {
                console.error(error);
            })
        }
    }, []);

    useEffect(() => {
        if(coords) {
            fetchData();
        }
    }, [coords]);

    return (
        <>
        {friteries?.length ? <NearestFriterie friterie={friteries[0]}/> : ""}
        <FriteriesList friteries={friteries}/>
        </>
    );
}