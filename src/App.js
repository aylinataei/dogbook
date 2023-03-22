import './App.css';
import 'bootstrap/dist/css/bootstrap.css'; 
import React from "react"
import { useState, useEffect } from "react";
import  Dogs    from './firstPage';
import EditDog from './edit';
import CreateDog from './createdog';
import Dog from './viewdog'






const App = () => {
  const savedDogs = JSON.parse(localStorage.getItem('dogs'))
  const [view, setView] = useState("DOGS")
  const [dogs, setDogs] = useState(savedDogs || []);
  const [dog, setDog] = useState({});
  const [edit, setEdit] = useState({});

  const id= dog.id;

  

  useEffect (() => {
    if(dog.id) {
      const newDogs = dogs.map(dogInList =>
        {
        if (dogInList.id === id){
            return dogs
          }
        } )
        
      setDogs(newDogs)
      console.log(newDogs)
      console.log(dogs) 
     
    }

  }, [dogs])


  useEffect (() => {
    localStorage.setItem('dogs', JSON.stringify(dogs))
  }, [dogs])
  

  switch (view) {
    case "DOGS":
      return <Dogs setView={setView} dogs={dogs} setDog={setDog} />
    case "DOG":
      return <Dog setView={setView} dog={dog} />
    case "EDIT":
      return <EditDog setView={setView} edit={edit} setEdit={setEdit} dog={dog} setDog={setDog} dogs={dogs} />
    default:
      return <CreateDog setView={setView} setDogs={setDogs} dogs={dogs}/>
  }
}

export default App;








// const Dogs = ({ setView, dogs, setDog }) => {
//   const viewDog = (dog) => {
//     setDog(dog)
//     setView("DOG")
//   }
//   return (
//     <div>
//       <h1>DogCenter  </h1>
//         <ul class="firstpage">
//           <h3>Users</h3>
//         {/* <li>
//         <p>Name: <a href="#" onClick= {() => viewDog(dogs)}>Aylin</a></p>
//         <p>age:15</p>
//         </li> */}

//         {dogs.map((dog, i) =>
//           <li key={i}>
//             {/* <img src={dog.img} /> */}
//               <p> <a href="#" onClick={() => viewDog(dog)}>{dog.name}</a></p>
//             {/* <p>Age: {dog.age} </p>
//             <p>Bio: {dog.bio}</p> */}
//           </li>
//         )}
//     <br></br><br></br><br></br>

//       <button className="button" onClick={() => setView("CREATE")}>Create New Dog</button>
//       </ul>
      
//     </div>
//   )
// }




// const CreateDog = ({ setView, setDogs, dogs}) => {
//   const submitHandler = (event) => {
//     event.preventDefault();
//     // const img = event.target.img.value;
//     const name = event.target.name.value;
//     const age = event.target.age.value;
//     const bio = event.target.bio.value;
    
//     setDogs(prev => [...prev, {  name, age,bio, id: `${name}${dogs.length + 1}`}]) // ny hund läggs till
//     setView("DOGS") // byt vy till DOGS
//   }
  

//   const [randomDog, setDogImg] = useState("")
//   const [trigger, setTrigger] = useState(0);
//   const fetchDog = async () => {
//     const resp = await fetch("https://dog.ceo/api/breeds/image/random");
//     const randomDog = await resp.json();
//     setDogImg(randomDog.message)
//   }
//   useEffect(() => {
   
//     fetchDog();
//   }, [trigger]);
 

//   return (
//     <div>
//       <h1>Aylins DogCenter</h1>
//       <h3 className="h3">Create your dog here:</h3>
//       <form  onSubmit={submitHandler}>
//         <img className='bild'  src={randomDog}/>
//         <button type="button" onClick={() => setTrigger(trigger + 1)}>Change</button>
        
//         <strong>Name:</strong>
//         <input placeholder="name" id="name" type="text"></input>
//         <strong>Age:</strong>
//         <input placeholder="age" id="age" type="number"></input>
//         <strong>Bio:</strong>
//         <input placeholder="Bio" id="bio" type="text"></input>
//         <strong>Friends:</strong>


//         <button className="button">Save</button>
     
//       </form>
//     </div>
//   )
// }




// const Dog = ({ setView, dog }) => {
//   return (
//     <div className="viewDog" >
//       <h3>View A Dog  </h3>

//      {/* <p>bild:{dog.img}</p> */}
//       <p>Name:{dog.name} </p>
//       <p>Age: {dog.age} </p>
//       <p>Bio:{dog.bio} </p>
//       <p>Present:{dog.present}</p>
//       <button className="button" onClick={() => setView("DOGS")}>Home</button>

//       <button className="button" onClick={() => setView("EDIT")}>edit</button>
//     </div>
//   )
// }



// const EditDog = ({ setView, dog, setDog, dogs}) => {

//   const [name, setName] = useState(dog.name || '')
//   const [age, setAge] = useState(dog.age || '')
//   const [bio, setBio] = useState(dog.bio || '')
//   const [present, setPresent] = useState(dog.present || '')
//   const [friends, setFriends] = useState(dog.friends || [])
//   const id = dog.id;
 
  // const fakeDogs = [{id: 928374, name: 'buu'}, {id: 283746827346, name: 'bää'}]


//   const save = () => {

//     setDog({...dog, name, age, bio , id })
//     setView("DOG")
//   }

//   const addAsFriend = (event) => {
//     console.log(event.target.value)
//     // const friendId = event.target.value
//     // const foundDog = fakeDogs.find(fake => {
//     //   return fake.id === parseInt(friendId, 0)
//     // })
//     // console.log(foundDog)
//     // if(foundDog) {
//     //   setFriends([...friends,foundDog] )
//     // }
    
//   }

//   console.log(friends)

//   const friendsIds = friends.map(friend => friend.id )

//   // present: present.checked


// return (
//     <div >
//       <h1>Edit Dog</h1>
//       <form className="edit">
    
//       <p>name:<input value={name} id="name" placeholder="name" onChange={e => setName(e.target.value)}></input> </p>
//       <p>age: <input value={age} id="age" placeholder="Age" onChange={e => setAge(e.target.value)}></input> </p>
//       <p>bio:<input value={bio} id="bio" placeholder="bio" onChange={e => setBio(e.target.value)}></input></p>
//       <p>Present:<input checked id="present" type="checkbox" placeholder="note" onChange={e => setPresent(e.target.value)} ></input></p>

     

//       <p>friends: {friends.map(friend => (<span>{friend.name},</span>))} </p>
//       <select onChange={(e) => addAsFriend(e)} >
//         <option>None</option>
//         {dogs.filter(d => !friendsIds.includes(d.id) ).map((dogInList, i) => (<option key={i} value={dogInList.id}>{dogInList.name}</option>))}
//       </select>
      
//         <button className="button" type="button" onClick={() => setView("DOGS")}>Home</button>

//         <button className="button" type="button"onClick={() => save()}>Save</button>
//     </form>
//     </div>
//   )
// }









