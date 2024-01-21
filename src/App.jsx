import {Button, Form} from 'react-bootstrap'
import './App.css'
import { useCallback, useEffect, useRef, useState } from 'react'
import axios from 'axios'

const API='https://api.unsplash.com/search/photos'
const IMAGE_PER_PAGE=20

function App() {
  const searchInput=useRef(null)
  const[image,setImage]=useState([])
  const [page,setPage]=useState(1)
  const[totalPages,setTotalPages]=useState(0)
  
  
  const handleImage= useCallback(async ()=>{
    try {
      if(searchInput.current.value){
      
        const {data}= await axios.get(`${API}?query=${searchInput.current.value}
        &page=${page}&per_page=${IMAGE_PER_PAGE}
        &client_id=${import.meta.env.VITE_API_KEY}`)
        setImage(data.results)
        setTotalPages(data.total_pages)
      } 
  
    } catch (error) {
      console.log('error')
    }

},[page])

  
  useEffect(()=>{
    handleImage()
  },[handleImage, page]) 
  
  
  const handleSearch=e=>{
    e.preventDefault();
    console.log(searchInput.current.value)
    
    setPage(1)
    handleImage();
    
  }

  const handleSelection=(selection)=>{
    searchInput.current.value=selection
    setPage(1)
    
    handleImage();
    
  }

  console.log(page)

  return(
    <div className="app">
      <h1>Search an Image</h1>
      <div className="search-bar">
        <Form onSubmit={handleSearch}>
        <Form.Control 
        type='search' 
        placeholder='Type something to search'
        className='search-image' 
        ref={searchInput}/>
        </Form>
      </div>
      <div className='quick-options'>
        <div onClick={()=>handleSelection('Nature')}>Nature</div>
        <div onClick={()=>handleSelection('Future')}>Future</div>
        <div onClick={()=>handleSelection('Jwellery')}>Jewellery</div>
        <div onClick={()=>handleSelection('Cars')}>Cars</div>
      </div>
      <div className="images">
        {image.map(image=>{
          return(
            <img  className='image'key={image.id} src={image.urls.small} alt={image.alt_descripiton}/>
          )
        })}
      </div>
      <div className="button">
        {page>1&&<Button className='button'onClick={()=>{
          setPage(page-1)
        }}>Previous</Button>}
        {page<totalPages &&<Button className='button' onClick={()=>{
          setPage(page+1)
        }}>Next</Button>}
      </div>
    </div>
  )
}

export default App
