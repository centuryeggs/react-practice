import { useState, useEffect } from "react";
import { Loading } from './Loading.tsx'
import axios from 'axios'

type Comment = {
  createdTime: string,
  content: string,
  userId: string,
  username: string,
  profilePicture: string,
  id: string
}
// const userInfo = {
//   username: '东郭皮蛋',
//   profilePicture: 'https://i0.hdslb.com/bfs/face/d83bb1a6015f31933fb9104141243ce9e6ad929d.jpg@240w_240h_1c_1s_!web-avatar-space-header.avif'
// }

function Comments() {
  const [list, setList] = useState([])
  const [count, setCount] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    axios.get('http://localhost:3000/comments').then(res => {
      setList(res.data.list)
      setCount(res.data.count)
      setLoading(false)
    }).catch(err => {
      throw new Error(err)
    })
  }, [])
  return (
    loading ? <Loading /> :
    <div className="border border-slate-50 rounded-lg p-5">
      <div className="flex items-center">
        <div className="text-3xl font-bold mr-10">{count} Comments</div>
        <div><span>Hotest</span> | <span>Newest</span></div>
      </div>
      <div></div>
      <ul>
        {list.map((i:Comment) => <li key={i.id}>{i.content}</li>)}
      </ul>
      </div>
  )
}

export { Comments }
