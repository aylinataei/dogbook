import { useState, useEffect } from "react";


const CreateDog = ({ setView, setDogs, dogs,  }) => {
  const submitHandler = (event) => {
    event.preventDefault();
  //  const fetchDog = event.target.fetchDog.value;
    const name = event.target.name.value;
    const age = event.target.age.value;
    const bio = event.target.bio.value;

    setDogs(prev => [...prev, { name, age, bio, id: `${name}${dogs.length + 1}` }]) // ny hund läggs till
    setView("DOGS") // byt vy till DOGS
  }

 

  const [randomDog, setDogImg] = useState("")
  const [trigger, setTrigger] = useState(0);
  const fetchDog = async () => {
    const resp = await fetch("https://dog.ceo/api/breeds/image/random");
    const randomDog = await resp.json();
    setDogImg(randomDog.message)
  }
  useEffect(() => {

    fetchDog();
  }, [trigger]);
  console.log(trigger)


  return (
    <div>
      <h1>Aylins DogCenter</h1>
      <h3 className="h3">Create your dog here:</h3>
      <form onSubmit={submitHandler}>
        <img className='bild' alt="dog" src={randomDog} />
        <button type="button" onClick={() => setTrigger(trigger + 1)}>Change</button>

        <strong>Name:</strong>
        <input placeholder="name" id="name" type="text"></input>
        <strong>Age:</strong>
        <input placeholder="age" id="age" type="number"></input>
        <strong>Bio:</strong>
        <input placeholder="Bio" id="bio" type="text"></input>
        <strong>Friends:</strong>


        <button className="button">Save</button>

      </form>
    </div>
  )
}

export default CreateDog