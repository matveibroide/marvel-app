import './randomChar.scss';
import thor from '../../resources/img/thor.jpeg';
import mjolnir from '../../resources/img/mjolnir.png';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';


class RandomChar extends Component {
    

    state = {
        char:{},
        loading:true,
        error:false
    }

    marvelService = new MarvelService()

    

    componentDidMount() {

        this.updateChar()
     /*   const this.timerID = setInterval(this.updateChar,3000) */

    }

    /* componentWillUnmount(this.timerID) */

    

    onCharLoaded = (char) => {

    if(!char.description) {char.description = 'Sorry! No info about this character.'}
    if (char.description.length) {
    let about = char.description.split(' ')
    
    if(about.length>32) {
        about = about.slice(0,about.length - 12)
        about.push('...')
        char.description = about.join(' ')
    }
    }


    this.setState({
        char,
        loading:false,
        error:false})

    }


    onError = () => {
        this.setState({
            loading:false,
            error:true}
        )
    }


    updateChar = () => {

        this.setState({
            loading:true
        })

        const id = Math.floor(Math.random() * Math.max(1011400 - 1011000) + 1011000)
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }


    render() {

        const {char,loading,error} = this.state
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char = {char}/> : null
        return (
            
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div onClick={this.updateChar} className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
   
}

const View = ({char}) => {

    const {name,description,homepage,wiki,thumbnail} = char

    let style = ''

    const change = () => {
        if (thumbnail === 
            "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ) {
    
                style = 'contain'

                return style   
            }
    }
    

    return (
        <div className="randomchar__block">
            <img src={thumbnail} style = {{objectFit:change()}} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href="#" className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href="#" className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )

    }

export default RandomChar;
