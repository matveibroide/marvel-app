import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList extends Component {


    state = {
    chars: [],
    loading:true,
    error:false
    }


    marvelService = new MarvelService()


    componentDidMount() {

        this.marvelService.getAllCharacters()
        .then(res=>this.setState({chars:res}))
        .then(this.onCharsLoaded)
        .catch(this.onError)
        
    
    }

    onError = () => {
        this.setState({
            loading:false,
            error:true}
        )
    }

    onCharsLoaded = () => {

        this.setState({loading:false})
    }



    render() {

    const {chars,loading,error} = this.state

    const contentChars = chars.map((item)=>{
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

        <li  
        onClick={()=>this.props.onCharSelected(item.id)}
        key={item.id} className="char__item">
        <img style = {{objectFit:change()}}  src={thumbnail} alt="abyss"/>
        <div className="char__name">{name}</div>
    </li>   
    )
    });

   

    const contentSpinners  = loading ? [...Array(8)].map((item,i)=>(
        <Spinner key={i}/>
    )) : null

    const contentErrors = error ? [...Array(8)].map((item,i)=>(
        <ErrorMessage key={i}/>
    )) : null

    
    const contentToShow = !(loading || error) ? contentChars : null

       
 
    return (

        <div className="char__list">
            <ul  className="char__grid">
            {contentErrors}
            {contentSpinners}    
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