import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  shuffleCards,
  incrementPoint,
  decrementPoint,
  resetPoint,
} from "../redux/cardSlice";

function CardsComponent() {
  const [flippedCardIds, setFlippedCardIds] = useState([]);
  const [coiseone, setCoiseone] = useState();
  const [cardsToUnflip, setCardsToUnflip] = useState([]);
  const [clicked, setClicked] = useState(false);

  const cardItems = useSelector((state) => state.cards.items);
  const score = useSelector((state) => state.cards.point);

  const dispatch = useDispatch();

  const timerRef = useRef(null);

  const handleCardClick = (id) => {
    if (timerRef.current) {
      // Eğer zamanlayıcı çalışıyorsa, temizle
      clearTimeout(timerRef.current);
      setFlippedCardIds((prevIds) =>
        prevIds.filter((cardId) => !cardsToUnflip.includes(cardId))
      );
      setCardsToUnflip([]);
    }

    if (!flippedCardIds.includes(id)) {
      setFlippedCardIds((prevIds) => {
        let updatedIds = [...prevIds, id];

        if (coiseone) {
          // Kartların eşleşip eşleşmediğini kontrol et
          if (isMatch(coiseone, id)) {
            updatedIds.push(coiseone, id);
            dispatch(incrementPoint(50));
          } else {
            setCardsToUnflip([coiseone, id]);
            dispatch(decrementPoint(10));
          }
          setCoiseone(null);
        } else {
          setCoiseone(id);
        }
        return updatedIds;
      });
    }
  };

  useEffect(() => {
    console.log("useEffect çalışıyor", cardsToUnflip);
    if (cardsToUnflip.length === 2 && cardsToUnflip[0] && cardsToUnflip[1]) {
      timerRef.current = setTimeout(() => {
        setFlippedCardIds((prevIds) =>
          prevIds.filter((cardId) => !cardsToUnflip.includes(cardId))
        );
        setCardsToUnflip([]);
      }, 1000);

      return () => {
        // useEffect temizleme fonksiyonunda zamanlayıcıyı temizle
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }
  }, [cardsToUnflip]);

  const removeLastPart = (str) => {
    const index = str.lastIndexOf("-");

    if (index !== -1) {
      return str.substring(0, index);
    }

    return str;
  };

  const isMatch = (id1, id2) => {
    // id'lerin sonundaki '-' karakterinden itibaren tüm karakterleri at
    const newId1 = removeLastPart(id1);
    const newId2 = removeLastPart(id2);

    // Yeni id'leri karşılaştır
    return newId1 === newId2;
  };

  const handleShuffle = () => {
    dispatch(shuffleCards());
    setFlippedCardIds([]);
    setClicked(true);
    dispatch(resetPoint());
  };

  return (
    <div className="container">
      <div className="title">
        {clicked && (
          <div className="point">
            {" "}
            <div>correct match +50 point</div>{" "}
            <div>incorrect match -10 point</div>
          </div>
        )}
        <h1>Memory Game</h1>
        <button onClick={handleShuffle}>
          <span>{clicked === true ? "Restart" : "Kartları karıştır"}</span>
        </button>
        {clicked && <div className="score">score: {score}</div>}
      </div>
      <div className="App">
        {cardItems.map((card, index) => (
          <div
            key={`${card.id}-${index}`}
            className={`card-container ${
              flippedCardIds.includes(`${card.id}-${index}`) ? "flipped" : ""
            }`}
          >
            <div
              className="card card-back"
              onClick={() => handleCardClick(`${card.id}-${index}`)}
            >
              <img src={card.src} width="45px" height="45px" alt="card" />
            </div>

            <div
              className="card card-front"
              onClick={() => handleCardClick(`${card.id}-${index}`)}
            >
              <img
                src="https://i.pinimg.com/originals/05/5b/a9/055ba99aaffbabe3b1387376a77aff76.png"
                width="45px"
                height="45px"
                alt="card"
              />
            </div>
          </div>
        ))}
      </div>
      {clicked && <ul class="infoli">
        <li>
          <a href="https://www.linkedin.com/in/yusuf-efe-30513222b/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              data-supported-dps="24x24"
              fill="currentColor"
              class="mercado-match"
              width="28"
              height="28"
              focusable="false"
            >
              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
            </svg>
          </a>
        </li>
        <li>
          <a href="https://github.com/Yusufefe16">
            <svg
              height="28"
              aria-hidden="true"
              viewBox="0 0 16 16"
              version="1.1"
              width="28"
              data-view-component="true"
              class="octicon octicon-mark-github v-align-middle color-fg-default"
            >
              <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
            </svg>
          </a>
        </li>
      </ul>}
    </div>
  );
}

export default CardsComponent;
