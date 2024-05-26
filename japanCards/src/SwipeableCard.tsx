import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import TinderCard from 'react-tinder-card';
import FlippableCard, { CardValues } from './FlippableCard';
import vocaboli from '../public/vocaboli.json'
import { useCheckboxContext } from './CheckboxContext';

const TABLE_NOMI:CardValues[] = vocaboli.NOMI
const TABLE_AGGETTIVII:CardValues[] = vocaboli['AGGETTIVI - I']
const TABLE_AGGETTIVINA:CardValues[] = vocaboli['AGGETTIVI - NA']
const TABLE_VERBI:CardValues[] = vocaboli.VERBI
const TABLE_AVVTEMPORALI:CardValues[] = vocaboli['AVV. TEMPORALI']
const TABLE_AVVLUOGO:CardValues[] = vocaboli['AVV. LUOGO']
const TABLE_AVVERBI:CardValues[] = vocaboli.AVVERBI
const TABLE_SUFFISSI:CardValues[] = vocaboli.SUFFISSI
const TABLE_ESPRESSIONI:CardValues[] = vocaboli.ESPRESSIONI

const MAXCARDS=50
//const db = [{ id: 1, kanji: 'kanji', hiragana: 'hiragana', romanji: 'romanji', traduzione: 'traduzione', }]
type TinderCardInstance = {
    swipe: (dir?: string) => Promise<void>;
    restoreCard: () => Promise<void>;
};
const SwipeableCard: React.FC = () => {
    const [cards,setCards]=useState<CardValues[]>([])
    const [currentIndex, setCurrentIndex] = useState(MAXCARDS-1)
    const { checkboxes } = useCheckboxContext()
    useEffect(()=>{
        updateCurrentIndex(MAXCARDS-1)
    },[cards])

    const [NOMI, setNOMI] = useState<boolean>(checkboxes[2])
    const [AGGETTIVI, setAGGETTIVI] = useState<boolean>(checkboxes[3])
    const [VERBI, setVERBI] = useState<boolean>(checkboxes[4])
    const [AVVERBI, setAVVERBI] = useState<boolean>(checkboxes[5])
    const [SUFFISSI, setSUFFISSI] = useState<boolean>(checkboxes[6])
    const [ESPRESSIONI, setESPRESSIONI] = useState<boolean>(checkboxes[7])
    useEffect(() => {
        setNOMI(checkboxes['NOMI'])
        setAGGETTIVI(checkboxes['AGGETTIVI'])
        setVERBI(checkboxes['VERBI'])
        setAVVERBI(checkboxes['AVVERBI'])
        setSUFFISSI(checkboxes['SUFFISSI'])
        setESPRESSIONI(checkboxes['ESPRESSIONI'])
    }, [checkboxes, checkboxes['NOMI'], checkboxes['AGGETTIVI'], checkboxes['VERBI'], checkboxes['AVVERBI'], checkboxes['SUFFISSI'], checkboxes['ESPRESSIONI']])
    
    useEffect(()=>{
        resetFilters()
    },[NOMI,AGGETTIVI, VERBI,AVVERBI,SUFFISSI,ESPRESSIONI])

    // used for outOfFrame closure
    const currentIndexRef = useRef(currentIndex)

    const childRefs = useMemo<React.RefObject<TinderCardInstance>[]>(() =>
        Array(cards.length).fill(0).map(() => React.createRef<TinderCardInstance>()), [cards]
    );

    const updateCurrentIndex = (val: number) => {
        setCurrentIndex(val)
        currentIndexRef.current = val
    }

    const canGoBack = currentIndex < MAXCARDS-1

    const canSwipe = currentIndex >= 0

    // set last direction and decrease current index
    const swiped = ( index: number) => {
        updateCurrentIndex(index - 1)
    }
    const resetFilters = () => {
        let db:CardValues[] = []
        if(NOMI){
            db = db.concat(TABLE_NOMI)
        }
        if(AGGETTIVI){
            db = db.concat(TABLE_AGGETTIVII)
            db = db.concat(TABLE_AGGETTIVINA)
        }
        if(VERBI){
            db = db.concat(TABLE_VERBI)
        }
        if(AVVERBI){
            db = db.concat(TABLE_AVVTEMPORALI)
            db = db.concat(TABLE_AVVLUOGO)
            db = db.concat(TABLE_AVVERBI)
        }
        if(SUFFISSI){
            db = db.concat(TABLE_SUFFISSI)
        }
        if(ESPRESSIONI){
            db = db.concat(TABLE_ESPRESSIONI)
        }

        if(!NOMI && !AGGETTIVI && !VERBI &&!AVVERBI&&!SUFFISSI&&!ESPRESSIONI){
            
            db = db.concat(TABLE_NOMI)
            db = db.concat(TABLE_AGGETTIVII)
            db = db.concat(TABLE_AGGETTIVINA)
            db = db.concat(TABLE_VERBI)
            db = db.concat(TABLE_AVVTEMPORALI)
            db = db.concat(TABLE_AVVLUOGO)
            db = db.concat(TABLE_AVVERBI)
            db = db.concat(TABLE_SUFFISSI)
            db = db.concat(TABLE_ESPRESSIONI)
        }
        setCards(db.sort(() => Math.random() - 0.5))    }

    const outOfFrame = (idx: number) => {
        //console.log(`(${idx}) left the screen!`, currentIndexRef.current)
        // handle the case in which go back is pressed before card goes outOfFrame
        currentIndexRef.current >= idx && childRefs[idx].current?.restoreCard()
        // TODO: when quickly swipe and restore multiple times the same card,
        // it happens multiple outOfFrame events are queued and the card disappear
        // during latest swipes. Only the last outOfFrame event should be considered valid
    }

    const swipe = async () => {
        if (canSwipe && currentIndex < cards.length) {
            await childRefs[currentIndex].current?.swipe() // Swipe the card!
        }
    }

    // increase current index and show card
    const goBack = async () => {
        if (!canGoBack) return
        const newIndex = currentIndex + 1
        updateCurrentIndex(newIndex)
        await childRefs[newIndex].current?.restoreCard()
    }

    return (
        <Box>
            <Box className='cardContainer' sx={{ width: 350, height: 400, marginTop: 5, marginBottom: 5 }}>
                {cards.slice(0, MAXCARDS).map((card, index) => (
                    <TinderCard
                        ref={childRefs[index]}
                        className='swipe'
                        key={index}
                        onSwipe={() => swiped(index)}
                        onCardLeftScreen={() => outOfFrame(index)}
                    >
                        <FlippableCard card={card}/>
                    </TinderCard>
                ))}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                <Button sx={{ margin: '10px 5px' }} variant="contained" onClick={() => goBack()}>Indietro</Button>
                <Button sx={{ margin: '10px 5px' }} variant="contained" onClick={() => resetFilters()}>Refresh</Button>
                <Button sx={{ margin: '10px 5px' }} variant="contained" onClick={() => swipe()}>Swipe</Button>
            </Box>
        </Box>
    )
}
export default SwipeableCard;
//
//const SwipeableCard: React.FC = () => {
//    const [cards, setCards] = useState([
//      { id: 1, isVisible: true },
//      { id: 2, isVisible: true },
//      { id: 3, isVisible: true },
//    ]);
//
//    const handleCardButtonClick = (cardId: number) => {
//      setCards((prevCards) =>
//        prevCards.map((card) =>
//          card.id === cardId ? { ...card, isVisible: false } : card
//        )
//      );
//    };
//
//    return (
//      <Box width={450}>
//        {cards.map((card) => (
//          <div key={card.id} style={{position:'absolute'}}>
//            {card.isVisible && (
//              <Card>
//                <CardContent>
//                  <Typography variant="h5" component="div">
//                    Card {card.id}
//                  </Typography>
//                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
//                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                  </Typography>
//                  <Button
//                    onClick={() => handleCardButtonClick(card.id)}
//                    variant="contained"
//                    color="primary"
//                  >
//                    Nascondi questa carta
//                  </Button>
//                </CardContent>
//              </Card>
//            )}
//          </div>
//        ))}
//      </Box>
//    );
//  };
//
//  export default SwipeableCard;