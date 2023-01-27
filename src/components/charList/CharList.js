import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';

class CharList extends Component {


    state = {
    chars: [],
    loading:true
    }


    marvelService = new MarvelService()


    componentDidMount() {

        this.marvelService.getAllCharacters()
        .then(res=>this.setState({chars:res}))
        .then(this.onCharsLoaded)
        
    
    }

    onCharsLoaded = () => {

        this.setState({loading:false})
    }

    
    render() {

    const {chars,loading} = this.state

    const contentChars = chars.map((item,i)=>{
    const {name,thumbnail} = item
    let style = ''

    const change = () => {
        if (thumbnail === 
            "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ) {
                style = 'fill'
                return style
    }
    }

    return (

        <li key={i} className="char__item">
        <img style = {{objectFit:change()}}  src={thumbnail} alt="abyss"/>
        <div className="char__name">{name}</div>
    </li>   
    )
    });

   

    const contentSpinners  = [...Array(8)].map((item,i)=>(
        <Spinner key={i}/>
    ));


    const contentToShow = loading ? contentSpinners : contentChars
       
 
    return (

        <div className="char__list">
            <ul  className="char__grid">
            {contentToShow}
            </ul>
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
    }
    }



export default CharList;