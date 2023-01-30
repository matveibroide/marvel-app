import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';
import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton'
import MarvelService from '../../services/MarvelService';


class CharInfo extends Component {

    state = {
        char:null,
        error:false,
        loading:false
    }

    marvelService = new MarvelService()

    componentDidMount() {
        this.updateChar()
        
    }

    componentDidUpdate(prevProps) {

        if (this.props.charId !== prevProps.charId ) { 
            this.updateChar()
        }
    }

    componentDidCatch(err,info) {
        console.log(err,info)
        this.setState({error:true})
    }

    updateChar = () => {

    const {charId} = this.props
    if(!charId) {
        return
    }

    this.onCharLoading()

    this.marvelService.getCharacter(charId)
    .then(this.onCharLoaded)
    .catch(this.onError)

    }

    onCharLoading = () => {
        this.setState({loading:true})
    }


    onCharLoaded = (char) => {

        this.setState({char:char,loading:false})
        
    }

    onError = () => {
        this.setState({error:true})
    }

    render() {

        const {char,loading,error} = this.state

        const skeleton = char || loading || error ? null : <Skeleton/>
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View char = {char}/> : null

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
    
}

const View = ({char}) => {

    const {name,description,wiki,thumbnail,comics} = char

    const content = comics.length === 0 ? 'No comics about this character was found' : comics.slice(0,9).map((item,i)=>{
                
        return (
            <li key = {i} className="char__comics-item">
                {item.name}
            </li>
            )
        });
        
        

    const change = () => {
        let style = ''
        if (thumbnail === 
            "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ) {
    
                style = 'contain'

                return style   
            }
    }

    return (
    <>
    <div className="char__basics">
                <img style = {{objectFit:change()}} src={thumbnail} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href="#" className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">

            {content}

            </ul>
        </>
    )

}

export default CharInfo;