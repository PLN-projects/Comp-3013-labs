import './App.css'
import { useState } from 'react'
import { foods } from './foods'

function App() {
  const [searchItem, setSearchItem] = useState("")
  function handleSearch(e, foodItem){
    e.preventDefault()
    setSearchItem(foodItem.toLowerCase())
  }

  return (
    <>
      <div>
        <div>
          <form className='food-form'>
            <label htmlFor="item">Search Recipe:</label>
            <input onChange={(e) => handleSearch(e, e.target.value)} type="text" id="item" name='item' />
          </form>
        </div>
        <ul className='food-list'>
          {foods.filter(foodName => foodName.name.toLowerCase().includes(searchItem)).map(filteredFoods => (
            <li key={filteredFoods.id}>
              {/* use string replace to replace  searchItem with searchItem in a mark tag, for some reason it always shows as plain text though an I'm not sure why...*/}
              <span>{filteredFoods.name}</span>
              {/* {searchItem.length > 0 ? <span>{filteredFoods.name.replace(searchItem, `` )}</span> : <span>{filteredFoods.name}</span>}  */}
              <span>{filteredFoods.description}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
