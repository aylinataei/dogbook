import './App.css';
import 'bootstrap/dist/css/bootstrap.css'; 
import React from "react"
import { useState, useEffect } from "react";


const Dogs = ({ setView, dogs, setDog }) => {
  const viewDog = (dog) => {
    setDog(dog)
    setView("DOG")
  }
  return (
    <div>
      <h1>Aylins DogCenter</h1>
      <h3>Users</h3>
      <ul>
        {/* <li>
        <p>Name: <a href="#" onClick= {() => viewDog(dogs)}>Aylin</a></p>
        <p>age:15</p>
        </li> */}

        {dogs.map((dog, i) =>
          <li key={i}>
            {/* <img src={dog.img} /> */}
            <p>Name: <a href="#" onClick={() => viewDog(dog)}>{dog.name}</a></p>
            <p>Age: {dog.age} </p>
            <p>Bio: {dog.bio}</p>
          </li>
        )}
      </ul>

      <button onClick={() => setView("CREATE")}>Create New Dog</button>
    </div>
  )
}
const CreateDog = ({ setView, setDogs, dogs}) => {
  const submitHandler = (event) => {
    event.preventDefault();
    // const img = event.target.img.value;
    const name = event.target.name.value;
    const age = event.target.age.value;
    const bio = event.target.bio.value;
    
    setDogs(prev => [...prev, {  name, age,bio, id: `${name}${dogs.length + 1}`}]) // ny hund läggs till
    setView("DOGS") // byt vy till DOGS
  }
  // const [dogImage, setDogImage] = useState('')

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
 
 
  return (
    <div>
      <h1>Aylins DogCenter</h1>
      <h3 class="h3">Create your dog here:</h3>
      <form  onSubmit={submitHandler}>
      {/* <img src={dogImage} />
        <strong>Image:</strong>
        <input  placeholder="image" id="img" type="text" onChange={e => setDogImage(e.target.value)}></input> */}
        
        <img src={randomDog} />
        <button onClick={() => setTrigger(trigger + 1)}>trigger</button>
        
        <strong>Name:</strong>
        <input placeholder="name" id="name" type="text"></input>
        <strong>Age:</strong>
        <input placeholder="age" id="age" type="number"></input>
        <strong>Bio:</strong>
        <input placeholder="Bio" id="bio" type="text"></input>
        <strong>Friends:</strong>

        {/* <button>Add dogs friend</button> */}

        <button>Save</button>
      </form>
    </div>
  )
}


const Dog = ({ setView, dog }) => {
  // const submitHandl = (event) => {
  //   event.preventDefault();
  //   // const img = event.target.img.value;
  //   const name = event.target.name.value;
  //   const age = event.target.age.value;
  //   const bio = event.target.bio.value;

  //   dog(prev => [...prev, { name, age, bio }]) // ny hund läggs till
  //   setView("DOGS") // byt vy till DOGS
  // }


  const [edit, setEdit] = useState(false)
  const [Text, setText] = useState("")
  const [age, setAge] = useState("")
  const [bio, setBio] = useState("")
  return (
    <div >
      <h1>View A Dog</h1>

      {/* <img src={dog.img}  /> */}

      <p>name:{dog.name} </p>
      <p>age: {dog.age} </p>
      <p>bio:{dog.bio} </p>
      <p>present:<input id="important" type="checkbox" placeholder="note"></input></p>
      <button onClick={() => setView("DOGS")}>Home</button>

      <button onClick={() => setView("EDIT")}>edit</button>
    </div>
  )
}

const EditDog = ({ setView, dog, setDog, dogs}) =>{

  const [name, setName] = useState(dog.name || '')
  const [age, setAge] = useState(dog.age || '')
  const [bio, setBio] = useState(dog.bio || '')
  const [friends, setFriends] = useState(dog.friends || [])
  const fakeDogs = [{id: 928374, name: 'buu'}, {id: 283746827346, name: 'bää'}]


  const save = () => {

    setDog({...dog, name, age, bio})
    setView("DOG")
  }

  const addAsFriend = (event) => {
    console.log(event.target.value)
    const friendId = event.target.value
    const foundDog = fakeDogs.find(fake => {
      return fake.id === parseInt(friendId, 0)
    })
    console.log(foundDog)
    if(foundDog) {
      setFriends([...friends,foundDog] )
    }
    
  }

  console.log(friends)

  const friendsIds = friends.map(friend => friend.id )



  return (
    <div >
      <h1>View A Dog</h1>
      {/* <img src={dog.img} /> */}

      <p>name:<input value={name} id="name" placeholder="name" onChange={e => setName(e.target.value)}></input> </p>
      <p>age: <input value={age} id="age" placeholder="Age" onChange={e => setAge(e.target.value)}></input> </p>
      <p>bio:<input value={bio} id="bio" placeholder="bio" onChange={e => setBio(e.target.value)}></input></p>
      <p>friends: {friends.map(friend => (<span>{friend.name},</span>))} </p>
      <select onChange={(e) => addAsFriend(e)} >
        <option>None</option>
        {fakeDogs.filter(d => !friendsIds.includes(d.id) ).map((dogInList, i) => (<option key={i} value={dogInList.id}>{dogInList.name}</option>))}
      </select>
      
      <button onClick={() => setView("DOGS")}>Home</button>

      <button onClick={() => save()}>Save</button>
    </div>
  )
}

// { dog.name }
// { dog.age }
const App = () => {
  const savedDogs = JSON.parse(localStorage.getItem('dogs'))
  const [view, setView] = useState("DOGS")
  const [dogs, setDogs] = useState(savedDogs || []);
  const [dog, setDog] = useState({});
  const [edit, setEdit] = useState({});

  // 2867
  // 'lakhdaksd'
  // true | false

  useEffect (() => {
    if(dog.id) {
      const newDogs = dogs.map(dogInList => 
        {
          if(dogInList.id === dog.id){
            return dog
          }
        } )
      setDogs(newDogs)
    }

  }, [dog])


  useEffect (() => {
    localStorage.setItem('dogs', JSON.stringify(dogs))
  }, [dogs])
  
  switch (view) {
    case "DOGS":
      return <Dogs setView={setView} dogs={dogs} setDog={setDog} />
    case "DOG":
      return <Dog setView={setView} dog={dog} />
    case "EDIT":
      return <EditDog setView={setView} setEdit={setEdit} dog={dog} setDog={setDog} dogs={dogs} />
    default:
      return <CreateDog setView={setView} setDogs={setDogs} dogs={dogs}/>
  }
}

export default App;
























// const Component = () => {
//   const dogs = ["stephanie", "aylin", "kate"]
//   const newdogs = dogs.map(name => <li>{name}</li>)
//   return (
//     <div>
//       <ul>
//         {newdogs}
//       </ul>
//     </div>
//   )
// }




// const App = () => {
//   const [activePage, setActivePage] = useState("HOME");
  
//   return (
//     <div className="App">
//       <h1>Dogbook </h1>
//       <h3>Users</h3>
//       <button onClick={() => setActivePage("HOME")}> create newdogs</button>
     
//       {/* <img src='../images/hund.jfif' alt='hund' width='200' height={150}></img>
//       <img src='../images/R.jfif' alt='hund' width='200' height={150}></img>
//       <img src='../images/dog3.jpg' alt='hund' width='200' height={150}></img> */}
//       <Component />
     
//     </div>
//   );
// }

// export default App;






// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <h1>DogBook</h1>
//         <h3>users</h3>
//         <button>test</button>
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }