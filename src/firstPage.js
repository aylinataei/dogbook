
const Dogs = ({ setView, dogs, setDog, setDogs }) => {
  const viewDog = (dog) => {
    setDog(dog)
    setView("DOG")
  }

  const deleteHandler = async (id) => {
    setDogs(dogs.filter(d => d.id !== id));

    setDogs(prevDogs => {
      return prevDogs.map(d => {
        if (d.id === id) return d;
        const updatedFriends = d.friends.filter(f => f.id !== id);
        return { ...d, friends: updatedFriends };
      });
    });
  }



  return (
    <div>
      <h1>DogCenter 🐕 </h1>
      <ul class="firstpage">
        <h3>Users</h3>


        {dogs.map((dog, i) =>
          <li key={i}>

            <p> {dog && <a href="#" onClick={() => viewDog(dog)}>{dog.name}</a>}
              <button className="delete-button" onClick={() => deleteHandler(dog.id)} >x</button>
            </p>


          </li>
        )}
        <br></br><br></br><br></br>

        <button className="button" onClick={() => setView("CREATE")}>Create New Dog</button>
      </ul>

    </div>
  )
}
export default Dogs