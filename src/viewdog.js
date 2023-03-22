import { useState, useEffect } from "react";

const Dog = ({ setView, dog,  }) => {


  const [randomDog, setDogImg] = useState("")
  const [trigger] = useState(0);
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
    <div className="viewDog" >
      <h3>View A Dog 🐶 </h3>
      
      <img className='bild' alt="dog" src={randomDog} />
      {/* <button type="button" onClick={() => setTrigger(trigger + 1)}>Change</button> */}

      {/* <p>bild:{dog.img}</p> */}
      <p>Name:{dog.name} </p>
      <p>Age: {dog.age} </p>
      <p>Bio:{dog.bio} </p>
      <p>Present:{dog.present}</p>
      <p>friends:{dog.friend} </p>

    
      
      <button className="button" onClick={() => setView("DOGS")}>Home</button>

      <button className="button" onClick={() => setView("EDIT")}>edit</button>
    </div>
  )
}

export default Dog
