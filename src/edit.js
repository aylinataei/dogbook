import { useState } from "react";


const EditDog = ({ setView, dog, setDog, dogs}) =>{

  const [name, setName] = useState(dog.name || '')
  const [age, setAge] = useState(dog.age || '')
  const [bio, setBio] = useState(dog.bio || '')
  // const [present, setPresent] = useState(dog.present || '')
  const [friends, setFriends] = useState(dog.friends || [])
  const [present, setPresent] = useState(false);

  const id = dog.id;

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setPresent(isChecked);
  };
  //   if (present) {
  //     <div>
  //       <p1>you are now present</p1>
  //     </div>
  //   } else {
  //     <div>
  //       <p1>you are NOT present</p1>
  //     </div>
  //   }
  // };
 
 
 
  // const fakeDogs = [{id: 928374, name: 'buu'}, {id: 283746827346, name: 'bää'}]


  const save = () => {

    setDog({...dog, name, age, bio , id, present })
    setView("DOG")
  }

  const addAsFriend = (event) => {
    console.log(event.target.value)
    const friendId = event.target.value
    const foundDog = dogs.find(dogs => {
      return dogs.id === parseInt(friendId, 0)
    })
    console.log(foundDog)
    if(foundDog) {
      setFriends([...friends,foundDog] )
    }
    
  }

  console.log(setFriends)

  const friendsIds = friends.map(friend => friend.id )

  // present: present.checked


return (
    <div >
      <h1>Edit Dog</h1>
      <form className="edit">
    
      <p>name:<input value={name} id="name" placeholder="name" onChange={e => setName(e.target.value)}></input> </p>
      <p>age: <input value={age} id="age" placeholder="Age" onChange={e => setAge(e.target.value)}></input> </p>
      <p>bio:<input value={bio} id="bio" placeholder="bio" onChange={e => setBio(e.target.value)}></input></p>
      {/* <p>Present:<input value= {present} checked id="present" type="checkbox" placeholder="note" onChange={e => setPresent(e.target.value)} ></input></p> */}

      <label>
        Present:
        <input value={present} id="present" type="checkbox" checked={present} onChange={handleCheckboxChange}/>
      </label>
      {present && (
        
        <div>
          <p1>Present</p1>
        </div>
      )}
      

      <p>friends: {friends.map(friend => (<span>{friend.name},</span>))} </p>
      <select onChange={(e) => addAsFriend(e)} >
        <option>None</option>
        {dogs.filter(d => !friendsIds.includes(d.id) ).map((dogInList, i) => (<option key={i} value={dogInList.id}>{dogInList.name}</option>))}
      </select>
      
        <button className="button" type="button" onClick={() => setView("DOGS")}>Home</button>

        <button className="button" type="button"onClick={() => save()}>Save</button>
    </form>
    </div>
  )
}


export default EditDog;