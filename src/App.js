import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import React from "react"
import { useState, useEffect } from "react";
import Dogs from './firstPage';
import EditDog from './edit';
import CreateDog from './createdog';
import Dog from './viewdog'



const App = () => {
  const savedDogs = JSON.parse(localStorage.getItem('dogs'))
  const [view, setView] = useState("DOGS")
  const [dogs, setDogs] = useState(savedDogs || []);
  const [dog, setDog] = useState({});
  const [edit, setEdit] = useState({});
  // const [isPresent, setIsPresent] = useState(false);

  const id = dog.id;



  useEffect(() => {
    if (dog.id) {
      const newDogs = dogs.map(dogInList => {
        if (dogInList.id === id) {
          return dog
        }
        return dogInList
      })

      setDogs(newDogs)
      console.log(newDogs)
      console.log(dogs)

    }

  }, [dog])


  useEffect(() => {
    localStorage.setItem('dogs', JSON.stringify(dogs))
  }, [dogs])


  switch (view) {
    case "DOGS":
      return <Dogs setView={setView} dogs={dogs} setDog={setDog} setDogs={setDogs} />
    case "DOG":
      return <Dog setView={setView} dog={dog} setDog={setDog} />
    case "EDIT":
      return <EditDog setView={setView} edit={edit} setEdit={setEdit} dog={dog} setDog={setDog} dogs={dogs} />
    default:
      return <CreateDog setView={setView} setDogs={setDogs} dogs={dogs} dog={dog} />
  }
}

export default App;