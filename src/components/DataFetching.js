import React,{useReducer, useEffect} from 'react'
import axios from 'axios'

const initialState = {
    loading: true,
    error: '',
    post: {}
}
const reducer = (state, action) => {
    switch(action.type){
        case 'Fetch_Success':
            return{
                loading : false,
                error:'',
                post : action.payload
            }
        case 'Fetch_Error':
            return{
                loading: false,
                error: 'Error Fetching Data',
                post : {}
            }
        default:
            return state
    }
}
const DataFetching2 = () => {

const [state, dispatch] = useReducer(reducer, initialState)

useEffect(() => {
    axios.get('https://api.giphy.com/v1/gifs/trending?api_key=fs2OukFUnEUMppPvkOltUzcLSgosvTaC&limit=25&rating=g')
        .then(res => {
          dispatch({type: 'Fetch_Success',payload: res.data})
          console.log(res.data)
          
        })
        .catch(err => 
          {
            dispatch({type: 'Fetch_Error'})
          })
  }, [])

  return (
    <div>
         
        {state.loading ? <h1>Loading ..</h1>:
       <div>
         <img src={state.post.data[0].images.original.url} width="300" height="300"/>
        <h3>Title: {state.post.data[0].title}</h3>
        <h3>Type: {state.post.data[0].type}</h3>
        </div>} 
        
        {state.error ? <h1>{state.error}</h1>: null}
    </div>
  )
}

export default DataFetching2