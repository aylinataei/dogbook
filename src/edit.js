import { useState, useEffect } from "react";


const EditDog = ({ setView, dog, setDog, dogs }) => {

  const [name, setName] = useState(dog.name || '')
  const [age, setAge] = useState(dog.age || '')
  const [bio, setBio] = useState(dog.bio || '')
  const [friends, setFriends] = useState(dog.friends || [])
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [present, setPresent] = useState(dog.present || false);

  const id = dog.id;




  const save = () => {

    setDog({ ...dog, name, age, bio, id, present, friends })
    setView("DOG")
  }


  const removeFriend = (friendId) => {
    setSelectedFriend(friendId);
  };

  useEffect(() => {
    if (selectedFriend !== null) {
      const updatedFriends = friends.filter((friend) => friend.id !== selectedFriend);
      setFriends(updatedFriends);
      setSelectedFriend(null);
    }
  }, [selectedFriend, friends]);

  const addFriend = (friendId) => {
    if (friendId !== id) {
      const foundDog = dogs.find((dog) => dog.id === friendId);
      if (foundDog) {
        setFriends([...friends, foundDog]);
      }
    }
  };



  return (
    <div >
      <h1>Edit Dog</h1>
      <form className="edit">

        <p>name:<input value={name} id="name" placeholder="name" onChange={e => setName(e.target.value)}></input> </p>
        <p>age: <input value={age} id="age" placeholder="Age" onChange={e => setAge(e.target.value)}></input> </p>
        <p>bio:<input value={bio} id="bio" placeholder="bio" onChange={e => setBio(e.target.value)}></input></p>
        <p>Present:<input type="checkbox" checked={present} id="present" placeholder="note" onChange={e => setPresent(e.target.checked)}></input></p>



        <label>
          Friends:
          {friends.map((friend) => (
            <span key={friend.id}>
              {friend.name}{' '}
              <button type="button" onClick={() => removeFriend(friend.id)}>
                x
              </button>{' '}
            </span>
          ))}
          <select onChange={(e) => addFriend(e.target.value)}>
            <option value="">Add friend</option>
            {dogs
              .filter((dog) => !friends.some((friend) => friend.id === dog.id) && dog.id !== id)
              .map((dog) => (
                <option key={dog.id} value={dog.id}>
                  {dog.name}
                </option>
              ))}
          </select>
        </label>


        <button className="button" type="button" onClick={() => setView("DOGS")}>Home</button>

        <button className="button" type="button" onClick={() => save()}>Save</button>
      </form>
    </div>
  )
}


export default EditDog;