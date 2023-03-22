
const Dogs = ({ setView, dogs, setDog }) => {
  const viewDog = (dog) => {
    setDog(dog)
    setView("DOG")
  }
  const deleteHandler = async (id) => {
    try {
       await fetch(`http://localhost:3000/dogs/${id}`, {
        method: "DELETE"
      });
    } catch (error) {
      console.error(error);
    }
    
    setDog(dogs.filter(d => d.id !== id))
   localStorage.removeItem(dogs);
  }
  // const HandleDelete = (id) => {
  //   const newDogs = dogs.filter((dog) => dog.id !== id);
  //   // localStorage.removeItem(dogs);
  //   setDog(newDogs);
  //   setDeletedDogId(id);
  // };
  
  return (
    <div>
      <h1>DogCenter 🐕 </h1>
      <ul class="firstpage">
        <h3>Users</h3>
        {/* <li>
        <p>Name: <a href="#" onClick= {() => viewDog(dogs)}>Aylin</a></p>
        <p>age:15</p>
        </li> */}

        {dogs.map((dog, i) =>
          <li key={i}>
            {/* <img src={dog.img} /> */}
            <p> {dog.name && <a href="#" onClick={() => viewDog(dog)}>{dog.name}</a>}
              <button className="delete-button" onClick={() => deleteHandler(dog.id)} >delete dog</button> 
            </p>
            
            {/* <p>Age: {dog.age} </p>
            <p>Bio: {dog.bio}</p> */}
          </li>
        )}
        <br></br><br></br><br></br>
{/* 
        <button className="button" onClick={() => HandleDelete(dogs.id)} ></button> */}
        {/* <button className="delete-button" onClick={() => handleDelete(dog)} >DELETE</button> */}
        
        <button className="button" onClick={() => setView("CREATE")}>Create New Dog</button>
      </ul>

    </div>
  )
}
export default Dogs