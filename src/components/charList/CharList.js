import './charList.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList extends Component {


    state = {
    chars: [],
    loading:true,
    error:false,
    newItemLoading:false,
    offset:210,
    charsEnded:false
    }


    marvelService = new MarvelService()


    componentDidMount() {

        this.onRequest()
        
    }

    onRequest = (offset) => {
        this.onCharsListLoading()
        this.marvelService.getAllCharacters(offset)
        .then(this.onCharsLoaded)
        .catch(this.onError)
        
    }


    onError = () => {
        this.setState(
        {
        loading:false,
        error:true
        }
        )
    }

    onCharsLoaded = (newCharList) => {

        let ended = false
        if (newCharList.length <9) {

            ended = true
        }

        this.setState(({offset,chars})=>({
            chars:[...chars,...newCharList],
            loading:false,
            newItemLoading:false,
            offset:offset + 9,
            charsEnded:ended
            

        }))  
    }

    onCharsListLoading = () => {
        this.setState({newItemLoading:true})
    }
    
    

    render() {

    const {chars,loading,error,offset,newItemLoading,charsEnded} = this.state

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

    const buttonContent = newItemLoading ? 'Wait...' : 'Load more'

    return (

        <div className="char__list">
            <ul  className="char__grid">
            {contentErrors}
            {contentSpinners}    
            {contentToShow}
            </ul>
            <button onClick={() => this.onRequest(offset)} 
                className="button button__main button__long"
                disabled = {newItemLoading}
                style ={{'display':charsEnded? 'none' : 'block'}}>
                <div className="inner">{buttonContent}</div>
            </button>
        </div>
    )
    }
    }



export default CharList;