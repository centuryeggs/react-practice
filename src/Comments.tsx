import { useState, useEffect } from "react";
import { Loading } from './Loading.tsx'
import axios from 'axios'
import dayjs from 'dayjs'

type Comment = {
  createdTime: string,
  content: string,
  userId: string,
  username: string,
  profilePicture: string,
  likeCount: number,
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
  const [activeTag, setActiveTag] = useState(0)

  const activeCls = "text-blue-500 hover:text-blue-4"
  const noActiveCls = "hover:text-blue-400" 

  function rearrange(params: number) {
    let newList
    activeTag !== params && setActiveTag(params)
    if (params === 0) {
      newList = list.sort((a: Comment, b: Comment) => {
        return dayjs(b.createdTime).valueOf() - dayjs(a.createdTime).valueOf()
      })
    } else {
      newList = list.sort((a: Comment, b: Comment) => {
        return b.likeCount - a.likeCount
      })
    }
    setList([...newList])
  }
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
        <div>
          <button className={!activeTag ? activeCls : noActiveCls} onClick={() => rearrange(0)}>Hotest</button>
          <span className="mx-2">|</span>
          <button className={activeTag ? activeCls : noActiveCls} onClick={() => rearrange(1)}>Newest</button>
        </div>
      </div>
      <div></div>
      <ul>
        {list.map((i:Comment) => <li key={i.id}>{i.content} | {i.createdTime} | {i.likeCount}</li>)}
      </ul>
      </div>
  )
}

export { Comments }
