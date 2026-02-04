import {useState,useEffect} from 'react'
import axios from '../api/axios'
import useRefreshToken from '../hooks/useRefreshToken';
function Users() {
    const [users,setUsers]=useState(null);
    const [loading,setLoading] = useState(true)
    const refresh = useRefreshToken()
    useEffect(()=>{
        let isMounted = true;
        const controller = new AbortController();

        const getUser=async()=>{
            try{
                const response = await axios.get('/api/v1/users/getusers',{
                    signal:controller.signal
                })
                isMounted && setUsers(response.data.users)
            }catch(err){
                console.error(err)
            }finally{setLoading(false)}
        }

        getUser()

        return()=>{
            isMounted=false;
            controller.abort()
        }
    },[])
  return (
    <article>
        <h2>Users List</h2>
        {loading
        ? <p>Loading users..</p>
        :users?.length
            ? (
                <ul>
                    {users.map((user,i)=> <li key={i}>{user?.username}</li>)}
                </ul>
            ):<p>No users to display</p>
        }
        <button onClick={()=>refresh()}>Refresh Access Token</button>
    </article>
  )
}

export default Users