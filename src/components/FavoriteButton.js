import favoriteButton from '../images/favouriteButtonRed.png';
import unfavoriteButton from '../images/unfavouriteButtonRed.png';
import { useEffect, useState } from 'react';

const FavoriteButton = props => {

    const [ favorite, setFavorite ] = useState(false)
    var tempArray = []

    useEffect(() => {
        tempArray = JSON.parse(localStorage.getItem('favorites'))
        if ( !tempArray ) {
            tempArray = []
        }
        var i
        setFavorite(false)
        for (i = 0; i < tempArray.length; i++) {
            if (tempArray[i] === props.movieID) {
                setFavorite(true)
            }
        }
    }, [tempArray, props.movieID])

    const addFav = props => {
        tempArray = JSON.parse(localStorage.getItem('favorites'))
        if ( !tempArray ) {
            tempArray = []
        }
        var exists = false
        var i  
        for (i = 0; i < tempArray.length; i++) {
            if (tempArray[i] === props.movieID) {
                exists = true
                var index = i
            }
        }
        if (!exists) {
            tempArray.push(props.movieID)
            setFavorite(true)
        } else {
            tempArray.splice(index, 1)
            setFavorite(false)
        }
        localStorage.setItem('favorites', JSON.stringify(tempArray))
    }

    const movieID = props.movieID
    
    return (
        <div>
            {favorite ? (
                <img    className="favorite-button"
                        src={favoriteButton}
                        alt="Favorited movie icon"
                        onClick={() => addFav({ movieID })} />
            ) : (
                <img    className="favorite-button"
                        src={unfavoriteButton}
                        alt="Not favorited movie icon"
                        onClick={() => addFav({ movieID })} />
            )}
        </div>
    )
}

export default FavoriteButton;