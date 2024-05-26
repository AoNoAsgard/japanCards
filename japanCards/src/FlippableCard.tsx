import { Card, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";
import { useCheckboxContext } from "./CheckboxContext";

export type CardValues= {
    ITALIANO:string,
    KANJI:string,
    KANA:string,
    ROMAJI:string,
    FUKUSHI?:string,
    AVV?:string,
    PARTICELLA?:string,
    TIPO?:string,
    CATEGORIA?:string,
    id:number
}

interface FlippableCardProps {
    card: CardValues
}

const MAX_CLICK_DURATION = 200; // Durata massima in millisecondi

const FlippableCard: React.FC<FlippableCardProps> = (props: FlippableCardProps) => {
    const {card} = props
    const [flipped, setFlipped] = useState<boolean>(false)
    const [clickStartTime, setClickStartTime] = useState<number | null>(null);
    const {checkboxes} = useCheckboxContext()

    const [kanji,setKanji] = useState<boolean>(checkboxes[0])
    const [hiragana,setHiragana] = useState<boolean>(checkboxes[1])
    useEffect(()=>{
        setHiragana(checkboxes['hiragana'])
        setKanji(checkboxes['kanji'])
    },[checkboxes,checkboxes['hiragana'],checkboxes['kanji']])
    console.log(checkboxes)

    const handleMouseDown = useCallback(() => {
        setClickStartTime(Date.now());
    }, []);

    const handleMouseUp = useCallback(() => {
        if (clickStartTime) {
            const clickEndTime = Date.now();
            const clickDuration = clickEndTime - clickStartTime;

            if (clickDuration <= MAX_CLICK_DURATION) {
                setFlipped(!flipped)
            }

            setClickStartTime(null);
        }
    }, [clickStartTime]);


    return (
        <ReactCardFlip isFlipped={flipped} flipDirection="horizontal" flipSpeedBackToFront={0.1} flipSpeedFrontToBack={0.1}>
            <Card sx={{
                position: 'absolute',
                width: 350,
                height: 400,
                textAlign: 'center',
                userSelect: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
                {card.CATEGORIA&&<Typography fontSize={15}>categoria: {card.CATEGORIA}</Typography>}
                {kanji&&<Typography fontSize={45}>{card.KANJI}</Typography>}
                {hiragana&&<Typography fontSize={30}>{card.KANA}</Typography>}
                {hiragana&&card.FUKUSHI&&<Typography fontSize={25}>{card.FUKUSHI}</Typography>}
                {hiragana&&card.AVV&&<Typography fontSize={25}>{card.AVV}</Typography>}
            </Card>
            <Card sx={{
                position: 'absolute',
                width: 350,
                height: 400,
                textAlign: 'center',
                userSelect: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
                <Typography fontSize={45}>{card.ITALIANO}</Typography>
                <Typography fontSize={30}>{card.ROMAJI}</Typography>
                {card.PARTICELLA&&<Typography fontSize={25}>Particella: {card.PARTICELLA}</Typography>}
            </Card>
        </ReactCardFlip >
    )
}

export default FlippableCard;