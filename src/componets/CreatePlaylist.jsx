import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { useDispatch } from "react-redux"
import { publishSong } from "../Reducer/songSlice"
import { createPlaylist } from "../Reducer/playlistSlice"




function CreatePlaylist(){



    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [uploadData,setUploadData] = useState({
        name:"",
        description:"",
        thumbnail:"",
    })


    function getFile(event){
        event.preventDefault()

        const uploadedFile = event.target.files[0] 

        const {name} = event.target
        if(uploadedFile){
            setUploadData({
                ...uploadData,
                [name]:uploadedFile 
            })
        }
    }

    function create(e){
        e.preventDefault()
        console.log("came here")

        const formdata = new FormData()
        formdata.append("name",uploadData.name)
        formdata.append("description",uploadData.description),
        formdata.append("thumbnail",uploadData.thumbnail)
        
        dispatch(createPlaylist(formdata)).then(()=>{
            navigate("/")
        })

    }
    

    function handleUserInput(e){
        console.log(e.target)
        const {name,value} = e.target 
        setUploadData({
          ...uploadData,
          [name]:value
        })
      }

  
  
    return(
        <>
         <div className="flex min-h-full flex-col justify-center px-6 py-2 lg:px-8 mx-auto my-20">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
 
    <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create Playlist</h2>
   

  </div>

  <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
    <form noValidate onSubmit={create} className="space-y-6" method="POST" action="#"> 
        {/* no validate to stop the html validations */}

        <div>
        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name </label>
        <div className="mt-2">
          <input id="name" name="name" type="text" autoComplete="name" required className="block w-full 
          rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
          focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={handleUserInput} value={uploadData.name}/>
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
        <div className="mt-2">
          <input id="description" name="description" type="text" autoComplete="description" required className="block w-full 
          rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
          focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={handleUserInput} value={uploadData.description}/>
        </div>
      </div>

      <div>
        <label htmlFor="thumbnail" className="block text-sm font-medium leading-6 text-gray-900">PlaylistImage</label>
        <div className="mt-2">
          <input id="thumbnail" name="thumbnail" type="file" autoComplete="" required className="block w-full rounded-md border-0 py-1.5
           text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
           focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={getFile}/>
        </div>
      </div>

    
    
      <div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create Playlist</button>
      </div>
    </form>

    <p className="mt-5 text-center text-sm text-gray-500">
      Not a member?
      <a href="#" className="font-semibold leading-6 text-red-600 hover:text-indigo-500">Start a 14 day free trial</a>
    </p>
  </div>
</div>
        
        </>
    )

}

export default CreatePlaylist

